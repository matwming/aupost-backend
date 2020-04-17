import {Request} from 'express';

export  interface DefinedRequest extends Request{
    body:any,
    user:{
        id:string
    }
}
