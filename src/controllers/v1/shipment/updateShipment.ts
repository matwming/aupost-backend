import {Request,Response} from 'express';
import {validationResult} from "express-validator";
import {AxiosResponse} from "axios";
import {HttpRequest} from "../../../config/config";
import {pool} from "../../../app";

const updateShipment=async (req:Request,res:Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {shipmentId}= req.params;
    const {
        product_id,
        deliver_to,
        country,
        province,
        address,
        phone,
        city,
        consignment_weight,
        contents,
        value,
        district,
        item_id
    } = req.body;
    console.log('create-aushipment', req.body);
    const {email} = req.body.user;
    const shipmentData = {
        "shipments": [
            {
                "shipment_reference": "My second shipment ref",
                "customer_reference_1": "cb1234",
                "customer_reference_2": "cb2345",
                "from": {
                    "name": "Lynn",
                    "lines": [
                        "420 Station Street"
                    ],
                    "suburb": "Box Hill",
                    "postcode": "3128",
                    "state": "VIC"

                },
                "to": {
                    "name": `n${deliver_to}`,
                    "business_name": "",
                    "lines": [
                        `n${address}`
                    ],
                    "suburb": `n${district}`,
                    "state": `n${province}`,
                    "country": "CN",
                    "postcode": `1000`,
                    "phone": `${phone}`,
                    "email": `${email}`,
                    "delivery_instructions": "NA"
                },
                "items": [
                    {
                        "length": "",
                        "height": "",
                        "width": "",
                        "weight": `${consignment_weight}`,
                        "item_reference": "blocked",
                        "product_id": `${product_id}`,
                        "item_id":`${item_id}`,
                        "commercial_value": false,
                        "classification_type": "GIFT",
                        "description_of_other": `n${contents}`,
                        "item_contents": [
                            {
                                "description": `n${contents}`,
                                "quantity": 1,
                                "value": 1.23,
                                "country_of_origin": "AU",
                            }
                        ]
                    }
                ]
            }
        ]
    }
    try {
        let response:AxiosResponse = await HttpRequest.put(
            `https://digitalapi.auspost.com.au/test/shipping/v1/shipments/${shipmentId}`,
            {...shipmentData.shipments[0]}
        )
        console.log('response',response.data);
        const result = response.data;
        const updateShipmentQuery=`update shipments set deliver_to = '${deliver_to}' , country = '${country}',province='${province}',address='${address}',phone='${phone}',consignment_weight='${consignment_weight}',product_id='${product_id}',contents='${contents}',value='${value}',city='${city}',modified_date='${result.shipment_modified_date}',district='${district}'  where shipment_id = "${result.shipment_id}"`;
        const updateItemsQuery=`update items set weight='${consignment_weight}',product_id='${product_id}',total_cost='${result.shipment_summary.total_cost}' where shipment_id='${shipmentId}'`;
        console.log('updateShipmentQuery',updateShipmentQuery);
        console.log('updateItemsQuery',updateItemsQuery);
        pool.query(`${updateShipmentQuery};${updateItemsQuery}`,(err,results)=>{
            if(err){
                return res.send(err);
            }
            console.log('results',results[0]);
            console.log('results',results[1]);
            return res.json({
                msg:'该订单已经成功更新',
                success:true
            })
        })
    }
    catch (e) {
        console.log('update-shipment-error',e.data.response.data.errors);
    }

};

export default updateShipment;
