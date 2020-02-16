import {Request, Response, RequestHandler} from "express";
import {HttpRequest} from "../config";
import {checkResponse, message} from "../models/checkResponse";


export const check: RequestHandler = (req: Request, res: Response) => {
    let requestData = req.body;
    //console.log('requesData',requestData);
    let KYCresult: boolean = false;
    HttpRequest.post(`https://sandbox.ridx.io/international`, {...requestData})
        .then((response: { data: checkResponse }) => {
            //console.log('axiosResponse', response.data);
            const messages: message[] = response.data.codes.messages;
            messages.forEach((el: message, index: number): void => {
                // console.log('el.value',el.value);
                if (el.value === 'Full Match for 1+1 verification' || el.value === 'Full Match for 2+2 verification') {
                    KYCresult = true;
                }
            });
            return res.json({
                KYCresult: KYCresult
            })
        })
        .catch((e: { response: { data: string } }) => {
            console.log('there is an error', e.response.data);
            return res.json(e.response.data);
        })
};
