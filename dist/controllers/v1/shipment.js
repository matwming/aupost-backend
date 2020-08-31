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
    const { product_id, deliver_to, country, province, address, phone, city, consignment_weight, contents, value, district, post_account_number } = req.body;
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
                                "value": 1.23,
                                "country_of_origin": "AU",
                            }
                        ]
                    }
                ]
            }
        ]
    };
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
};
exports.default = getShipment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvc2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQStCO0FBRS9CLHlEQUFtRDtBQUNuRCxnREFBZ0Q7QUFHaEQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQ25DLGdDQUFnQztJQUNoQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDOUIsTUFBTSxnQkFBZ0IsR0FBRyx1ZEFBdWQsS0FBSywrRUFBK0UsQ0FBQztJQUVya0IsVUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbEQsSUFBSSxHQUFHLEVBQUU7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RSxPQUFPO1NBQ1Y7UUFDRCxrQ0FBa0M7UUFDbEMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsaUNBQWlDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7U0FDaEc7UUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFBO0lBQ3RELENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDO0FBRVcsUUFBQSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFF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