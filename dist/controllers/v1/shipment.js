"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuShipment = void 0;
const app_1 = require("../../app");
const express_validator_1 = require("express-validator");
const config_1 = require("../../config/config");
const axios_1 = __importDefault(require("axios"));
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
        // @ts-ignore
        const authorization = config_1.accountNumberToAuthProd[post_account_number];
        let response = await axios_1.default.post("https://digitalapi.auspost.com.au/shipping/v1/shipments", { ...shipmentData }, {
            headers: {
                "Account-Number": post_account_number,
                "Authorization": `Basic ${authorization}`,
                "Content-type": "application/json",
                "Accept": "application/json"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvc2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsbUNBQStCO0FBRS9CLHlEQUFtRDtBQUNuRCxnREFBeUU7QUFFekUsa0RBQTBCO0FBRTFCLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUNuQyxnQ0FBZ0M7SUFDaEMsTUFBTSxFQUFDLEtBQUssRUFBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzlCLE1BQU0sZ0JBQWdCLEdBQUcsdWRBQXVkLEtBQUssK0VBQStFLENBQUM7SUFFcmtCLFVBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ2xELElBQUksR0FBRyxFQUFFO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEUsT0FBTztTQUNWO1FBQ0Qsa0NBQWtDO1FBQ2xDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLGlDQUFpQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1NBQ2hHO1FBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUN0RCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQztBQUVXLFFBQUEsZ0JBQWdCLEdBQUcsS0FB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