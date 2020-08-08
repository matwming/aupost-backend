import {Response, Request} from "express";
import {pool} from "../../app";
import createShipment from "../aupost/v1/ShippingAndTracking/createShipment";
import {validationResult} from "express-validator";
import {HttpRequest} from "../../config/config";
import {AxiosResponse} from "axios";

const getShipment = (req: Request, res: Response) => {
    console.log('getting shipments...')
    console.log('email', req.body)
    const {email} = req.body.user;
    pool.query(`select * from shipments where sender_email="${email}" and is_deleted = 0 and order_id is null`, (err, results, fields) => {
        if (err) {
            console.log('searching sender_email shipments has errors', err.message);
            return;
        }
        console.log('results', results);
        if (results.length === 0) {
            return res.json({msg: `No shipment is found for user ${email}`, success: true, results: []});
        }
        return res.json({success: true, results: results})
    })
};

export const createAuShipment = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
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
                        "length": "",
                        "height": "",
                        "width": "",
                        "weight": `${consignment_weight}`,
                        "item_reference": "blocked",
                        "product_id": "ECM8",
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
    let response:AxiosResponse = await HttpRequest.post(
        "https://digitalapi.auspost.com.au/test/shipping/v1/shipments",
        {...shipmentData}
    )
    console.log("createShipment", response.data);
    const shipmentCreatedResponse = response.data.shipments;
    for await (const shipmentRes of shipmentCreatedResponse) {
        pool.query(
            `insert into shipments (deliver_to,country,province,detail_address,phone,consignment_weight,product_id,contents,value,shipment_id,sender_email,city,create_date,is_deleted) 
         values("${deliver_to}","${country}","${province}","${address}","${phone}","${consignment_weight}","${product_id}","${contents}","${value}","${shipmentRes.shipment_id}","${email}","${city}","${shipmentRes.shipment_creation_date}",0);`,
            async (err, result, fields) => {
                try {
                    if (err) {
                        console.log("insert into shippments has errors", err);
                        return;
                    }
                    console.log(result);
                    if (result.hasOwnProperty("affectedRows")) {
                        for await (const singleItem of shipmentRes.items) {
                            const {item_id, weight, item_reference, tracking_details, product_id, item_summary} = singleItem;
                            pool.query(`insert into items (item_id, shipment_id,weight,item_reference, tracking_details_consignment_id,product_id,total_cost,status,contents) values ("${item_id}","${shipmentRes.shipment_id}","${weight}","${item_reference}","${tracking_details.consignment_id}","${product_id}","${item_summary.total_cost}","${item_summary.status}","")`, (err, result) => {
                                if (err) {
                                    console.log('insert into items has errors', err);
                                    return;
                                }
                                if (result.hasOwnProperty('affectedRows')) {
                                    return result["affectedRows"] === 1 &&
                                        res.json({
                                            msg: "successfully created a shipment.",
                                            success: true,
                                        })
                                }
                            })
                        }
                    }
                } catch (e) {
                    console.log('create shipment error', e);
                }
            }
        );
    }

};

export default getShipment;