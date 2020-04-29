import {Response,Request} from "express";
import {pool} from "../../app";

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

export default getShipment;
