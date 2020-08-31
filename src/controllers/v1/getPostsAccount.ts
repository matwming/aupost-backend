import {Request, Response} from "express";
import {pool} from "../../app";

const getPostsAccount=(req:Request,res:Response)=>{
    let getPostsAccountSql=`select * from post_accounts`;
    pool.query(getPostsAccountSql,(err,result)=>{
        console.log('getPostsAccount',result);
        return res.json(result);
    })
};

export default getPostsAccount;
