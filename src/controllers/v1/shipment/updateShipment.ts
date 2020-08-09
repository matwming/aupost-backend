import {Request,Response} from 'express';
import {validationResult} from "express-validator";
import {AxiosResponse} from "axios";
import {HttpRequest} from "../../../config/config";

const updateShipment=async (req:Request,res:Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {shipmentId}= req.params;
    const {
        product_id,
        deliver_to,
        country,
        province,
        address,
        phone,
        city,
        consignment_weight,
        contents,
        value,
        district,
    } = req.body;
    console.log('create-aushipment', req.body);
    const {email} = req.body.user;
    const shipmentData = {
        "shipments": [
            {
                "shipment_reference": "My second shipment ref",
                "customer_reference_1": "cb1234",
                "customer_reference_2": "cb2345",
                "from": {
                    "name": "Lynn",
                    "lines": [
                        "420 Station Street"
                    ],
                    "suburb": "Box Hill",
                    "postcode": "3128",
                    "state": "VIC"

                },
                "to": {
                    "name": `${deliver_to}`,
                    "business_name": "",
                    "lines": [
                        `${address}`
                    ],
                    "suburb": `${district}`,
                    "state": `${province}`,
                    "country": "CN",
                    "postcode": `1000`,
                    "phone": `${phone}`,
                    "email": `${email}`,
                    "delivery_instructions": "NA"
                },
                "items": [
                    {
                        "item_id":"",
                        "length": "",
                        "height": "",
                        "width": "",
                        "weight": `${consignment_weight}`,
                        "item_reference": "blocked",
                        "product_id": `${product_id}`,
                        "commercial_value": false,
                        "classification_type": "GIFT",
                        "description_of_other": `${contents}`,
                        "item_contents": [
                            {
                                "description": `${contents}`,
                                "quantity": 1,
                                "value": 1.23,
                                "country_of_origin": "AU",
                            }
                        ]
                    }
                ]
            }
        ]
    }
    let response:AxiosResponse = await HttpRequest.put(
        `https://digitalapi.auspost.com.au/test/shipping/v1/shipments/${shipmentId}`,
        {...shipmentData}
    )
    console.log('response',response);
};

export default updateShipment;
