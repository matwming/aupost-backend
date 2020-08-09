"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const app_1 = require("../../../../app");
const createShipment = async (req, response) => {
    const { charge_code, deliver_to, country, province, address, phone, city, consignment_weight, contents, value, district, product_id } = req.body;
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
    let res = await config_1.HttpRequest.post("https://digitalapi.auspost.com.au/test/shipping/v1/shipments", { ...shipmentData });
    console.log("createShipment", res.data);
    const shipmentCreatedResponse = res.data.shipments;
    for await (const shipmentRes of shipmentCreatedResponse) {
        app_1.pool.query(`insert into shipments (charge_code,deliver_to,country,province,address,phone,consignment_weight,product_id,contents,value,shipment_id,sender_email,city,create_date,is_deleted,district) 
         values("${charge_code}","${deliver_to}","${country}","${province}","${address}","${phone}","${consignment_weight}","${product_id}","${contents}","${value}","${shipmentRes.shipment_id}","${email}","${city}","${shipmentRes.shipment_creation_date}",0,"${district}");`, async (err, result, fields) => {
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
                                    response.json({
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
exports.default = createShipment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlU2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYXVwb3N0L3YxL1NoaXBwaW5nQW5kVHJhY2tpbmcvY3JlYXRlU2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBc0Q7QUFHdEQseUNBQXFDO0FBRXJDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxHQUFRLEVBQUUsUUFBa0IsRUFBRSxFQUFFO0lBRTFELE1BQU0sRUFDRixXQUFXLEVBQ1gsVUFBVSxFQUNWLE9BQU8sRUFDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLEtBQUssRUFDTCxJQUFJLEVBQ0osa0JBQWtCLEVBQ2xCLFFBQVEsRUFDUixLQUFLLEVBQ0wsUUFBUSxFQUNSLFVBQVUsRUFDYixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDOUIsTUFBTSxZQUFZLEdBQUc7UUFDakIsV0FBVyxFQUFFO1lBQ1Q7Z0JBQ0ksb0JBQW9CLEVBQUUsd0JBQXdCO2dCQUM5QyxzQkFBc0IsRUFBRSxRQUFRO2dCQUNoQyxzQkFBc0IsRUFBRSxRQUFRO2dCQUNoQyxNQUFNLEVBQUU7b0JBQ0osTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFO3dCQUNMLG9CQUFvQjtxQkFDdkI7b0JBQ0QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFVBQVUsRUFBRSxNQUFNO29CQUNsQixPQUFPLEVBQUUsS0FBSztpQkFFakI7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxHQUFHLFVBQVUsRUFBRTtvQkFDdkIsZUFBZSxFQUFFLEVBQUU7b0JBQ25CLE9BQU8sRUFBRTt3QkFDTCxHQUFH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