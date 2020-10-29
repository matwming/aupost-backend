import {Request, Response} from "express";
import {accountNumberToAuthProd,API_Endpoint} from "../../../../config/config";
import axios,{AxiosResponse} from "axios";
import {pool} from "../../../../app";

const createLabel = async (shipmentId: string, itemId: string,accountNumber?:string) => {
    const body = {
        wait_for_label_url: true,
        preferences: [
            {
                type: "PRINT",
                format: "PDF",
                groups: [
                    {
                        group: "Parcel Post",
                        layout: "A4-1pp",
                        branded: true,
                        left_offset: 0,
                        top_offset: 0,
                    },
                ],
            },
        ],
        shipments: [
            {
                shipment_id: `${shipmentId}`,
                items: [
                    {
                        item_id: `${itemId}`,
                    },
                ],
            },
        ],
    };
    // @ts-ignore
    const authorization=accountNumberToAuthProd[accountNumber];
    let res = await axios.post(
        `${API_Endpoint}/shipping/v1/labels`,
        {...body},{
            headers:{
                ['Account-Number']:accountNumber,
                "Authorization":`Basic ${authorization}`,
                "Content-type":"application/json",
                "Accept":"application/json"
            }
        }
    );
    console.log("createLabel", res.data.labels);
    return res.data.labels;
};
export default createLabel;
