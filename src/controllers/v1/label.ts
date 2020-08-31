import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {pool} from "../../app";
import createLabel from "../aupost/v1/ShippingAndTracking/createLabel";

interface IIterms {
    item_id: string,
    shipment_id: string,
    weight: number,
    item_reference: string,
    tracking_details_consignment_id: string,
    product_id: string,
    total_cost: number,
    status: string,
    contents: string
}

const labelService = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {shipment_id} = req.body;
    const accountNumber:string = <string>req.headers['account-number'];
    if (shipment_id == undefined) {
        res.json({
            error: 'shipment_id is undefined',
            message: 'make sure call me from web'
        });
        return;
    }
    const findItems = `select * from items where shipment_id = "${shipment_id}"`;
    console.log('findItems', findItems);
    pool.query(findItems,  (err, result: IIterms[]) => {
        const itemId = result[0].item_id;
         createLabel(shipment_id, itemId,accountNumber)
            .then((response) => {
                console.log('labelService', response);
                if(response[0].hasOwnProperty('url')){
                    const updateUrlSql=`update shipments set label_url ="${response[0].url}" where shipment_id="${shipment_id}"`;
                    console.log('updateUrl',updateUrlSql);
                    pool.query(updateUrlSql,(err,result)=>{
                        console.log('update_url',result);
                        if(result.affectedRows===1){
                            return response;
                        }
                    })
                }
                return res.send(response);
            })
            .catch((e) => res.json(e.message));
    });

};

export default labelService;
