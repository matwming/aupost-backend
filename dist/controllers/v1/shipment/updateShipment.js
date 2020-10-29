"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../../config/config");
const app_1 = require("../../../app");
const updateShipment = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { shipmentId } = req.params;
    const { product_id, deliver_to, country, province, address, phone, city, consignment_weight, contents, value, district, item_id } = req.body;
    console.log('create-aushipment', req.body);
    const { email } = req.body.user;
    const accountNumber = req.headers['account-number'];
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
                        "item_id": `${item_id}`,
                        "commercial_value": false,
                        "classification_type": "GIFT",
                        "description_of_other": `n${contents}`,
                        "item_contents": [
                            {
                                "description": `n${contents}`,
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
    try {
        // @ts-ignore
        const authorization = config_1.accountNumberToAuthProd[accountNumber];
        let response = await axios_1.default.put(`${config_1.API_Endpoint}/shipping/v1/shipments/${shipmentId}`, { ...shipmentData.shipments[0] }, {
            headers: {
                "Account-Number": accountNumber,
                "Authorization": `Basic ${authorization}`,
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        });
        console.log('response', response.data);
        const result = response.data;
        const updateShipmentQuery = `update shipments set deliver_to = '${deliver_to}' , country = '${country}',province='${province}',address='${address}',phone='${phone}',consignment_weight='${consignment_weight}',product_id='${product_id}',contents='${contents}',value='${value}',city='${city}',modified_date='${result.shipment_modified_date}',district='${district}', label_url=''  where shipment_id = "${result.shipment_id}"`;
        const updateItemsQuery = `update items set weight='${consignment_weight}',product_id='${product_id}',total_cost='${result.shipment_summary.total_cost}',tracking_details_consignment_id='' where shipment_id='${shipmentId}'`;
        console.log('updateShipmentQuery', updateShipmentQuery);
        console.log('updateItemsQuery', updateItemsQuery);
        app_1.pool.query(`${updateShipmentQuery};${updateItemsQuery}`, (err, results) => {
            if (err) {
                return res.send(err);
            }
            console.log('results', results[0]);
            console.log('results', results[1]);
            return res.json({
                msg: '该订单已经成功更新',
                success: true
            });
        });
    }
    catch (e) {
        console.log('update-shipment-error', e.data.response.data.errors);
    }
};
exports.default = updateShipment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlU2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvc2hpcG1lbnQvdXBkYXRlU2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx5REFBMkQ7QUFDM0Qsa0RBQTBDO0FBQzFDLG1EQUE0RTtBQUM1RSxzQ0FBa0M7QUFFbEMsTUFBTSxjQUFjLEdBQUMsS0FBSyxFQUFFLEdBQVcsRUFBQyxHQUFZLEVBQUMsRUFBRTtJQUNuRCxNQUFNLE1BQU0sR0FBRyxvQ0FBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ25CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFDLENBQUMsQ0FBQztLQUN6RDtJQUNELE1BQU0sRUFBQyxVQUFVLEVBQUMsR0FBRSxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQy9CLE1BQU0sRUFDRixVQUFVLEVBQ1YsVUFBVSxFQUNWLE9BQU8sRUFDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLEtBQUssRUFDTCxJQUFJLEVBQ0osa0JBQWtCLEVBQ2xCLFFBQVEsRUFDUixLQUFLLEVBQ0wsUUFBUSxFQUNSLE9BQU8sRUFDVixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDOUIsTUFBTSxhQUFhLEdBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sWUFBWSxHQUFHO1FBQ2pCLFdBQVcsRUFBRTtZQUNU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