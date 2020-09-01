"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuShipment = void 0;
const app_1 = require("../../app");
const express_validator_1 = require("express-validator");
const config_1 = require("../../config/config");
const getShipment = (req, res) => {
    console.log('getting shipments...');
    //console.log('email', req.body)
    const { email } = req.body.user;
    const getShipmentQuery = `select shipments.deliver_to, shipments.country, shipments.province, shipments.address, shipments.phone, shipments.consignment_weight, shipments.product_id, shipments.contents, value, shipments.shipment_id, shipments.sender_email, shipments.city, shipments.create_date, shipments.label_url, shipments.order_id, shipments.district, i.tracking_details_consignment_id,i.item_id from shipments left join items i on shipments.shipment_id = i.shipment_id where sender_email="${email}" and is_deleted = 0 and order_id is null order by shipments.create_date desc`;
    app_1.pool.query(getShipmentQuery, (err, results, fields) => {
        if (err) {
            console.log('searching sender_email shipments has errors', err.message);
            return;
        }
        //console.log('results', results);
        if (results.length === 0) {
            return res.json({ msg: `No shipment is found for user ${email}`, success: true, results: [] });
        }
        return res.json({ success: true, results: results });
    });
};
exports.createAuShipment = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { product_id, deliver_to, country, province, address, phone, city, consignment_weight, contents, value, district, } = req.body;
    console.log('create-aushipment', req.body);
    const { email } = req.body.user;
    const post_account_number = req.headers['account-number'];
    console.log('post-account-number', post_account_number);
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
    };
    try {
        let response = await config_1.HttpRequest.post("https://digitalapi.auspost.com.au/test/shipping/v1/shipments", { ...shipmentData }, {
            headers: {
                "Account-Number": post_account_number
            }
        });
        //console.log("createShipment", response.data);
        const shipmentCreatedResponse = response.data.shipments;
        for await (const shipmentRes of shipmentCreatedResponse) {
            app_1.pool.query(`insert into shipments (deliver_to,country,province,address,phone,consignment_weight,product_id,contents,value,shipment_id,sender_email,city,create_date,is_deleted,district) 
         values("${deliver_to}","${country}","${province}","${address}","${phone}","${consignment_weight}","${product_id}","${contents}","${value}","${shipmentRes.shipment_id}","${email}","${city}","${shipmentRes.shipment_creation_date}",0,"${district}");`, async (err, result, fields) => {
                try {
                    if (err) {
                        console.log("insert into shippments has errors", err);
                        return;
                    }
                    //console.log(result);
                    if (result.hasOwnProperty("affectedRows")) {
                        for await (const singleItem of shipmentRes.items) {
                            const { item_id, weight, item_reference, tracking_details, product_id, item_summary } = singleItem;
                            app_1.pool.query(`insert into items (item_id, shipment_id,weight,item_reference, tracking_details_consignment_id,product_id,total_cost,status,contents) values ("${item_id}","${shipmentRes.shipment_id}","${weight}","${item_reference}","${tracking_details.consignment_id}","${product_id}","${item_summary.total_cost}","${item_summary.status}","")`, (err, result) => {
                                if (err) {
                                    console.log('insert into items has errors', err);
                                    return;
                                }
                                if (result.hasOwnProperty('affectedRows')) {
                                    return result["affectedRows"] === 1 &&
                                        res.json({
                                            msg: "successfully created a shipment.",
                                            success: true,
                                        });
                                }
                            });
                        }
                    }
                }
                catch (e) {
                    console.log('create shipment error', e);
                    // return res.json({
                    //      msg:'shipment failed to create',
                    //      success:false,
                    //      err:e.message
                    //  })
                }
            });
        }
    }
    catch (e) {
        console.log('create shipment error', e);
        return res.json({ success: false, msg: e.response.statusText });
    }
};
exports.default = getShipment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvc2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQStCO0FBRS9CLHlEQUFtRDtBQUNuRCxnREFBZ0Q7QUFHaEQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQ25DLGdDQUFnQztJQUNoQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDOUIsTUFBTSxnQkFBZ0IsR0FBRyx1ZEFBdWQsS0FBSywrRUFBK0UsQ0FBQztJQUVya0IsVUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbEQsSUFBSSxHQUFHLEVBQUU7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RSxPQUFPO1NBQ1Y7UUFDRCxrQ0FBa0M7UUFDbEMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsaUNBQWlDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7U0FDaEc7UUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBQ3RELENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDO0FBRVcsUUFBQSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFF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