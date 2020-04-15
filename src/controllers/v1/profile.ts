import {Request, Response, RequestHandler} from "express";
import ProfileSchema from "../../models/Profile";
const getProfile=async (req:Request,res:Response)=>{
    try{
        const profile= await ProfileSchema
    }catch (e) {
console.error(e.message);
return res.status(500).send('Server Error');
    }
};

