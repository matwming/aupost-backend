import {Request, Response} from "express";
import {HttpRequest} from "../../../../config/config";
import {AxiosResponse} from "axios";
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
    let stream:AxiosResponse =  await HttpRequest({
        url:`https://digitalapi.auspost.com.au/test/shipping/v1/orders/${orderId}/summary`,
        responseType:'stream',
        headers:{
            "Account-Number":accountNumber
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
