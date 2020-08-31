import {Request, Response} from "express";
import {HttpRequest} from "../../../../config/config";
import {AxiosResponse} from "axios";
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
    let res = await HttpRequest.post(
        "https://digitalapi.auspost.com.au/test/shipping/v1/labels",
        {...body},{
            headers:{
                ['Account-Number']:accountNumber
            }
        }
    );
    console.log("createLabel", res.data.labels);
    return res.data.labels;
};
export default createLabel;
