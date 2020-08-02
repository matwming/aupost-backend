import {Request, Response} from "express";
import {HttpRequest} from "../../../../config/config";
import {AxiosResponse} from "axios";
import fs from 'fs';


const getOrderSummary = async (req: Request, res: Response) => {
    const {orderId} = req.params;
    if (orderId === undefined) {
        return res.json({msg: 'Please provide a valid order id', success: false});
    }
    let tempFilePath = process.cwd() + 'ordersummary.pdf';
    console.log('tempFilePath',tempFilePath);
    let file=fs.createWriteStream(tempFilePath);
    let stream:AxiosResponse =  await HttpRequest({
        url:`https://digitalapi.auspost.com.au/test/shipping/v1/orders/${orderId}/summary`,
        responseType:'stream'
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
