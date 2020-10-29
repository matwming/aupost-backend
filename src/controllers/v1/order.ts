import {Response, Request} from "express";
import {pool} from "../../app";
import {validationResult} from "express-validator";
import {HttpRequest} from "../../config/config";
import axios,{AxiosResponse} from "axios";
import {API_Endpoint,accountNumberToAuthProd} from '../../config/config';

interface IShipment {
    shipment_id: string
}

interface IOrderSummary {
    total_cost: string,
    total_cost_ex_gst: string,
    total_gst: string,
    status: string,
    tracking_summary: {
        Sealed: number
    }
}

const orderService = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const shipmentIds: string[] = req.body.selectedShipments.map((el:any)=>el.shipment_id);
    console.log('orderService',req.body)
    const accountNumber = req.headers['account-number'];
    const shipmentsToSendForOrder: IShipment[] = [];
    shipmentIds.forEach((shipment) => {
        shipmentsToSendForOrder.push({shipment_id: shipment})
    });
    const orderInfo = {
        order_reference: 'my order reference',
        payment_method: 'CHARGE_TO_ACCOUNT',
        shipments: shipmentsToSendForOrder
    }
    // @ts-ignore
    const authorization=accountNumberToAuthProd[accountNumber];
    console.log('order info',orderInfo);
    try {
        let response: AxiosResponse = await axios.put(`${API_Endpoint}/shipping/v1/orders`, {...orderInfo},{
            headers:{
                "Account-Number":accountNumber,
                "Authorization":`Basic ${authorization}`,
                "Content-type":"application/json",
                "Accept":"application/json"
            }
        });
        if (response.data?.order) {
            const {order_id, order_reference, order_creation_date, order_summary} = response.data.order;
            console.log('order_response_data',response.data)
            pool.query(`insert into orders (order_id,order_reference,order_creation_date,total_cost,total_cost_ex_gst,total_gst,number_of_shipments,number_of_items,total_weight) 
                values ("${order_id}","${order_reference}","${order_creation_date}","${order_summary.total_cost}","${order_summary.total_cost_ex_gst}","${order_summary.total_gst}","${order_summary.number_of_shipments}","${order_summary.number_of_items}","${order_summary.total_weight}")`,async (err,result)=>{
                if(err){
                    return res.send(err);
                }
                if(result?.['affectedRows']===1){
                    let ordersSuccess:string[] = [];
                    const numberOfShipments:number = response.data.order.shipments.length;
                   for await (let shipment of response.data.order.shipments){
                       pool.query(`update shipments set order_id = "${order_id}" where shipment_id = "${shipment.shipment_id}"`,async (err,result)=>{
                           if(err){
                               return res.send(err);
                           }
                           console.log()
                           if(result?.['affectedRows']){
                               // res.json({
                               //     msg:'Order已经成功创建',
                               //     success:true
                               // })
                               ordersSuccess.push(order_id);
                           }
                           console.log('ordersSuccess',ordersSuccess);
                           if(ordersSuccess.length===numberOfShipments){
                               res.json({
                                   msg:'order已经成功创建',
                                   success:true
                               })
                           }
                       })

                   }
                }
            })
        }
    } catch (e) {
        console.log('create order failed', e);
    }
};

export default orderService;
