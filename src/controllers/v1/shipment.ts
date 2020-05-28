import {Response,Request} from "express";
import {pool} from "../../app";
import createShipment from "../aupost/v1/ShippingAndTracking/createShipment";

const getShipment=(req:Request,res:Response)=>{
    console.log('getting shipments...')
    console.log('email',req.body)
    const { email } = req.body.user;
    pool.query(`select * from shipments where sender_email="${email}"`,(err,results,fields)=>{
        if(err){
            console.log('searching sender_email shipments has errors',err.message);
            return;
        }
        console.log('results',results);
        if(results.length===0){
            return res.json({msg:`No shipment is found for user ${email}`,success:true});
        }
        return res.json({success:true,results:results})
    })
};

export const createAuShipment=(req:Request,res:Response)=>{
    createShipment(req.body).then(response=>{
        console.log('shipments_create',response)
        return res.send(response);
    }).catch((e:Error)=>{
        res.json(e.message);
    })
};

export default getShipment;
