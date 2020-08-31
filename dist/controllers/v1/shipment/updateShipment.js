"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
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
        let response = await config_1.HttpRequest.put(`https://digitalapi.auspost.com.au/test/shipping/v1/shipments/${shipmentId}`, { ...shipmentData.shipments[0] }, {
            headers: {
                "Account-Number": accountNumber
            }
        });
        console.log('response', response.data);
        const result = response.data;
        const updateShipmentQuery = `update shipments set deliver_to = '${deliver_to}' , country = '${country}',province='${province}',address='${address}',phone='${phone}',consignment_weight='${consignment_weight}',product_id='${product_id}',contents='${contents}',value='${value}',city='${city}',modified_date='${result.shipment_modified_date}',district='${district}'  where shipment_id = "${result.shipment_id}"`;
        const updateItemsQuery = `update items set weight='${consignment_weight}',product_id='${product_id}',total_cost='${result.shipment_summary.total_cost}' where shipment_id='${shipmentId}'`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlU2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvc2hpcG1lbnQvdXBkYXRlU2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5REFBMkQ7QUFFM0QsbURBQW1EO0FBQ25ELHNDQUFrQztBQUVsQyxNQUFNLGNBQWMsR0FBQyxLQUFLLEVBQUUsR0FBVyxFQUFDLEdBQVksRUFBQyxFQUFFO0lBQ25ELE1BQU0sTUFBTSxHQUFHLG9DQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbkIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsTUFBTSxFQUFDLFVBQVUsRUFBQyxHQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDL0IsTUFBTSxFQUNGLFVBQVUsRUFDVixVQUFVLEVBQ1YsT0FBTyxFQUNQLFFBQVEsRUFDUixPQUFPLEVBQ1AsS0FBSyxFQUNMLElBQUksRUFDSixrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLEtBQUssRUFDTCxRQUFRLEVBQ1IsT0FBTyxFQUNWLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM5QixNQUFNLGFBQWEsR0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbEQsTUFBTSxZQUFZLEdBQUc7UUFDakIsV0FBVyxFQUFFO1lBQ1Q7Z0JBQ0ksb0JBQW9CLEVB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