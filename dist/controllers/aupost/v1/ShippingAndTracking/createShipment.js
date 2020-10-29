"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const app_1 = require("../../../../app");
const config_2 = require("../../../../config/config");
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
    console.log('api-endpoint', config_2.API_Endpoint);
    let res = await config_1.HttpRequest.post(`${config_2.API_Endpoint}/shipping/v1/shipments`, { ...shipmentData });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlU2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYXVwb3N0L3YxL1NoaXBwaW5nQW5kVHJhY2tpbmcvY3JlYXRlU2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBc0Q7QUFHdEQseUNBQXFDO0FBQ3JDLHNEQUF1RDtBQUN2RCxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsR0FBUSxFQUFFLFFBQWtCLEVBQUUsRUFBRTtJQUUxRCxNQUFNLEVBQ0YsV0FBVyxFQUNYLFVBQVUsRUFDVixPQUFPLEVBQ1AsUUFBUSxFQUNSLE9BQU8sRUFDUCxLQUFLLEVBQ0wsSUFBSSxFQUNKLGtCQUFrQixFQUNsQixRQUFRLEVBQ1IsS0FBSyxFQUNMLFFBQVEsRUFDUixVQUFVLEVBQ2IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsTUFBTSxFQUFDLEtBQUssRUFBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzlCLE1BQU0sWUFBWSxHQUFHO1FBQ2pCLFdBQVcsRUFBRTtZQUNUO2dCQUNJLG9CQUFvQixFQUFFLHdCQUF3QjtnQkFDOUMsc0JBQXNCLEVBQUUsUUFBUTtnQkFDaEMsc0JBQXNCLEVBQUUsUUFBUTtnQkFDaEMsTUFBTSxFQUFFO29CQUNKLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRTt3QkFDTCxvQkFBb0I7cUJBQ3ZCO29CQUNELFFBQVEsRUFBRSxVQUFVO29CQUNwQixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsT0FBTyxFQUFFLEtBQUs7aUJBRWpCO2dCQUNELElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsR0FBRyxVQUFVLEVBQUU7b0JBQ3ZCLGVBQWUsRUFBRSxFQUFFO29CQUNuQixPQUFPLEVB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