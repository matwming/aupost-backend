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
        let response = await config_1.HttpRequest.put(`https://digitalapi.auspost.com.au/test/shipping/v1/shipments/${shipmentId}`, { ...shipmentData.shipments[0] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlU2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvc2hpcG1lbnQvdXBkYXRlU2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5REFBbUQ7QUFFbkQsbURBQW1EO0FBQ25ELHNDQUFrQztBQUVsQyxNQUFNLGNBQWMsR0FBQyxLQUFLLEVBQUUsR0FBVyxFQUFDLEdBQVksRUFBQyxFQUFFO0lBQ25ELE1BQU0sTUFBTSxHQUFHLG9DQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbkIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsTUFBTSxFQUFDLFVBQVUsRUFBQyxHQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDL0IsTUFBTSxFQUNGLFVBQVUsRUFDVixVQUFVLEVBQ1YsT0FBTyxFQUNQLFFBQVEsRUFDUixPQUFPLEVBQ1AsS0FBSyxFQUNMLElBQUksRUFDSixrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLEtBQUssRUFDTCxRQUFRLEVBQ1IsT0FBTyxFQUNWLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM5QixNQUFNLFlBQVksR0FBRztRQUNqQixXQUFXLEVBQUU7WUFDVDtnQkFDSSxvQkFBb0IsRUFBRSx3QkFBd0I7Z0JBQzlDLHNCQUFzQixFQUFFLFFBQVE7Z0JBQ2hDLHNCQUFzQixFQUFFLFFBQVE7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