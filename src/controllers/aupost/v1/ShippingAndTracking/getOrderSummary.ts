import {Request, Response} from "express";
import {HttpRequest} from "../../../../config/config";
import {AxiosResponse} from "axios";
import fs from 'fs';

const getOrderSummary = (req: Request, res: Response) => {
    const {orderId} = req.params;
    if (orderId === undefined) {
        return res.json({msg: 'Please provide a valid order id', success: false});
    }
    HttpRequest.get(
        `https://digitalapi.auspost.com.au/test/shipping/v1/orders/${orderId}/summary`
    )
        .then((response: AxiosResponse) => {
            console.log("getOrderSummary", response);
            fs.writeFile("C://pdf/ne1w.pdf",response.data,(err)=>{
                if(err) console.log(err);
            });

            // let write = fs.createWriteStream("C://pdf/output.pdf");
            // write.write(response.data,'UTF8');
            // write.end();
            // write.on('finish',()=>{
            //     console.log('completed')
            // })
            //res.setHeader("Content-Type", "application/pdf")

            return res.send(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
};
export default getOrderSummary;
