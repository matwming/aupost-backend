import {Request,Response} from "express";
import {validationResult} from "express-validator";
import {pool} from "../../app";

const getAddress=async (req:Request,res:Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email} = req.body.user;

    pool.query(`select * from address where email ="${email}"`,(err,results,fields)=>{
        if(err) {
            console.log('querying address table has an error',err.message);
            return;
        }
        if(results.length>0){
            return res.json({msg:results})
        }
        return res.status(400).json({msg:'no address found!'})

    });
};

export default getAddress;
