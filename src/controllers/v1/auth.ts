process.env["NODE_CONFIG_DIR"]="/Users/mingwu/Projects/devconnector/dist/config";
import {Request, Response, RequestHandler} from "express";
import User from "../../models/User";
import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";


export const verify: RequestHandler = async (req: Request, res: Response) => {
    try{
        //@ts-ignore
        const user=await User.findById(req.user.id).select('-password');
        return res.json(user);
    }catch (e) {
        console.error(e.message);
        return res.status(500).json({msg:'Server Error'});
    }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
    //console.log('users',req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;
    try{
        // see if user exists
        let user=await User.findOne({email});
        if(!user){
            return  res.status(400).json({errors:[{msg:'Invalid Credentials'}]})
        }

        //@ts-ignore
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return  res.status(400).json({errors:[{msg:'Invalid Credentials'}]})
        }
        const payload={
            user:{
                id:user.id,
                token:'error'
            }
        };
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:36000
        },(errBack,token)=>{
            if(errBack)throw errBack;
            payload.user.token = token as string;
            return res.json(payload);
        });
    }catch(e){
        console.log(e.message);
        res.status(500).send('Server error');
    }

};

