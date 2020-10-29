import {Request, Response} from "express";
import {accountNumberToAuthProd,API_Endpoint} from "../../../../config/config";
import axios,{AxiosResponse} from "axios";
import fs from 'fs';
import path from 'path';


const getOrderSummary = async (req: Request, res: Response) => {
    const {orderId} = req.params;
    const accountNumber = req.headers['account-number'];
    if (orderId === undefined) {
        return res.json({msg: 'Please provide a valid order id', success: false});
    }
    let tempFilePath = path.join(process.cwd(),'ordersummary.pdf');
    console.log('tempFilePath',tempFilePath);
    let file=fs.createWriteStream(tempFilePath);
    //@ts-ignore
    const authorization=accountNumberToAuthProd[accountNumber];
    let stream:AxiosResponse =  await axios({
        url:`${API_Endpoint}/shipping/v1/orders/${orderId}/summary`,
        responseType:'stream',
        headers:{
            "Account-Number":accountNumber,
            "Authorization":`Basic ${authorization}`,
            "Content-type":"application/json",
            "Accept":"application/json"
        }
    });
    stream.data.pipe(file).on('finish',()=>{
        console.log('thie file is finished downloading...')
        res.sendFile(tempFilePath,()=>{
            fs.unlink(tempFilePath,(err)=>{
                if(err){
                    console.log('there is an error in delete file',err);
                    return;
                }
                console.log('download file success');
            })
        })
    })
};
export default getOrderSummary;
