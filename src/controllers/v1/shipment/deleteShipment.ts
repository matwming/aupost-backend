import {Response, Request} from "express";
import {HttpRequest} from "../../../config/config";
import {AxiosError, AxiosResponse} from "axios";
import {pool} from "../../../app";

const deleteShipment = (req: Request, res: Response) => {
    const {shipmentId} = req.params;
    console.log('shipment id',shipmentId)
    if (shipmentId !== undefined) {
        console.log('delete shipment started')
        HttpRequest.delete(`https://digitalapi.auspost.com.au/test/shipping/v1/shipments/${shipmentId}`).then((response: AxiosResponse) => {
            console.log('delete shipment', response.status);
            if(response.status==200){
                const deleteShipment =`delete from shipments where shipment_id ="${shipmentId}"`;
                pool.query(deleteShipment,(err,result)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log('delete-shipments',result);
                    if(result?.['affectedRows']==1){
                        return res.json({msg:`shipment id ${shipmentId} is successfully deleted`,success:true});
                    }
                })
            }
        }).catch((e: AxiosError) => {
            console.log('delete shipment error', e.response?.data.errors);
            return res.send(e.response?.data.errors[0]);
        })
    }
};

export default deleteShipment;
