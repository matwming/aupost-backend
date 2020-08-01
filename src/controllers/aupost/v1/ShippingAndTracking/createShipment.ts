import {Request, Response} from "express";
import {HttpRequest} from "../../../../config/config";
import {AxiosResponse} from "axios";
import {validationResult} from "express-validator";
import {pool} from "../../../../app";

const createShipment = async (req: any, response: Response) => {

    const {
        charge_code,
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
        product_id
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
    let res = await HttpRequest.post(
        "https://digitalapi.auspost.com.au/test/shipping/v1/shipments",
        {...shipmentData}
    )
    console.log("createShipment", res.data);
    const shipmentCreatedResponse = res.data.shipments;
    for await (const shipmentRes of shipmentCreatedResponse) {
        pool.query(
            `insert into shipments (charge_code,deliver_to,country,province,detail_address,phone,consignment_weight,product_id,contents,value,shipment_id,sender_email,city,create_date) 
         values("${charge_code}","${deliver_to}","${country}","${province}","${address}","${phone}","${consignment_weight}","${product_id}","${contents}","${value}","${shipmentRes.shipment_id}","${email}","${city}","${shipmentRes.shipment_creation_date}");`,
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
                                        response.json({
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
export default createShipment;
