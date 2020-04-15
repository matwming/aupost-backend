process.env["NODE_CONFIG_DIR"]="/Users/mingwu/Projects/devconnector/dist/config";
import {Request, Response, RequestHandler} from "express";
import {validationResult} from "express-validator";
import User,{IUser} from "../../models/User";
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config'

const users: RequestHandler = async (req: Request, res: Response) => {
    //console.log('users',req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password}=req.body;
    try{
        // see if user exists
        let user=await User.findOne({email});
        if(user){
          return  res.status(400).json({errors:[{msg:'User already exists'}]})
        }
        // get users gravatar
        const avatar=gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        user=new User({
            name,email,avatar,password
        });

        // Encrypt password

        const salt=await bcrypt.genSalt(10);
        //@ts-ignore
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        // return jsonwebtoken
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

export default users;
