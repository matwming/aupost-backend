import {Response, Request} from "express";
import {pool} from "../../app";
import createShipment from "../aupost/v1/ShippingAndTracking/createShipment";
import {validationResult} from "express-validator";
import {HttpRequest} from "../../config/config";
import {AxiosResponse} from "axios";

const getShipment = (req: Request, res: Response) => {
    console.log('getting shipments...')
    //console.log('email', req.body)
    const {email} = req.body.user;
    const getShipmentQuery = `select shipments.deliver_to, shipments.country, shipments.province, shipments.address, shipments.phone, shipments.consignment_weight, shipments.product_id, shipments.contents, value, shipments.shipment_id, shipments.sender_email, shipments.city, shipments.create_date, shipments.label_url, shipments.order_id, shipments.district, i.tracking_details_consignment_id,i.item_id from shipments left join items i on shipments.shipment_id = i.shipment_id where sender_email="${email}" and is_deleted = 0 and order_id is null order by shipments.create_date desc`;

    pool.query(getShipmentQuery, (err, results, fields) => {
        if (err) {
            console.log('searching sender_email shipments has errors', err.message);
            return;
        }
        //console.log('results', results);
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
    const post_account_number = req.headers['account-number'];
    console.log('post-account-number',post_account_number)
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
                    "name": `n${deliver_to}`,
                    "business_name": "",
                    "lines": [
                        `n${address}`
                    ],
                    "suburb": `n${district}`,
                    "state": `n${province}`,
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
                        "product_id": `${product_id}`,
                        "commercial_value": false,
                        "classification_type": "GIFT",
                        "description_of_other": `${contents}`,
                        "item_contents": [
                            {
                                "description": `${contents}`,
                                "quantity": 1,
                                "value": `${value}`,
                                "country_of_origin": "AU",
                            }
                        ]
                    }
                ]
            }
        ]
    }
    try {
        let response:AxiosResponse = await HttpRequest.post(
            "https://digitalapi.auspost.com.au/test/shipping/v1/shipments",
            {...shipmentData},{
                headers: {
                    "Account-Number":post_account_number
                }
            }
        )
        //console.log("createShipment", response.data);
        const shipmentCreatedResponse = response.data.shipments;
        for await (const shipmentRes of shipmentCreatedResponse) {
            pool.query(
                `insert into shipments (deliver_to,country,province,address,phone,consignment_weight,product_id,contents,value,shipment_id,sender_email,city,create_date,is_deleted,district) 
         values("${deliver_to}","${country}","${province}","${address}","${phone}","${consignment_weight}","${product_id}","${contents}","${value}","${shipmentRes.shipment_id}","${email}","${city}","${shipmentRes.shipment_creation_date}",0,"${district}");`,
                async (err, result, fields) => {
                    try {
                        if (err) {
                            console.log("insert into shippments has errors", err);
                            return;
                        }
                        //console.log(result);
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
                        // return res.json({
                        //      msg:'shipment failed to create',
                        //      success:false,
                        //      err:e.message
                        //  })
                    }
                }
            );
        }
    } catch (e) {
        console.log('create shipment error', e);
        return res.json({success: false,msg:e.response.statusText});
    }
};

export default getShipment;
