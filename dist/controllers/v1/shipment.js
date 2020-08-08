"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuShipment = void 0;
const app_1 = require("../../app");
const express_validator_1 = require("express-validator");
const config_1 = require("../../config/config");
const getShipment = (req, res) => {
    console.log('getting shipments...');
    console.log('email', req.body);
    const { email } = req.body.user;
    app_1.pool.query(`select * from shipments where sender_email="${email}" and is_deleted = 0 and order_id is null`, (err, results, fields) => {
        if (err) {
            console.log('searching sender_email shipments has errors', err.message);
            return;
        }
        console.log('results', results);
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
    };
    let response = await config_1.HttpRequest.post("https://digitalapi.auspost.com.au/test/shipping/v1/shipments", { ...shipmentData });
    console.log("createShipment", response.data);
    const shipmentCreatedResponse = response.data.shipments;
    for await (const shipmentRes of shipmentCreatedResponse) {
        app_1.pool.query(`insert into shipments (deliver_to,country,province,detail_address,phone,consignment_weight,product_id,contents,value,shipment_id,sender_email,city,create_date,is_deleted) 
         values("${deliver_to}","${country}","${province}","${address}","${phone}","${consignment_weight}","${product_id}","${contents}","${value}","${shipmentRes.shipment_id}","${email}","${city}","${shipmentRes.shipment_creation_date}",0);`, async (err, result, fields) => {
            try {
                if (err) {
                    console.log("insert into shippments has errors", err);
                    return;
                }
                console.log(result);
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
            }
        });
    }
};
exports.default = getShipment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvc2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQStCO0FBRS9CLHlEQUFtRDtBQUNuRCxnREFBZ0Q7QUFHaEQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM5QixNQUFNLEVBQUMsS0FBSyxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDOUIsVUFBSSxDQUFDLEtBQUssQ0FBQywrQ0FBK0MsS0FBSywyQ0FBMkMsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDakksSUFBSSxHQUFHLEVBQUU7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RSxPQUFPO1NBQ1Y7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxpQ0FBaUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztTQUNoRztRQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDdEQsQ0FBQyxDQUFDLENBQUE7QUFDTixD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