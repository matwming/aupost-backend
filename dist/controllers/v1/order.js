"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const express_validator_1 = require("express-validator");
const config_1 = require("../../config/config");
const orderService = async (req, res) => {
    var _a;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const shipmentIds = req.body.selectedShipments.map((el) => el.shipment_id);
    console.log('orderService', req.body);
    const shipmentsToSendForOrder = [];
    shipmentIds.forEach((shipment) => {
        shipmentsToSendForOrder.push({ shipment_id: shipment });
    });
    const orderInfo = {
        order_reference: 'my order reference',
        payment_method: 'CHARGE_TO_ACCOUNT',
        shipments: shipmentsToSendForOrder
    };
    console.log('order info', orderInfo);
    try {
        let response = await config_1.HttpRequest.put('https://digitalapi.auspost.com.au/test/shipping/v1/orders', { ...orderInfo });
        if ((_a = response.data) === null || _a === void 0 ? void 0 : _a.order) {
            const { order_id, order_reference, order_creation_date, order_summary } = response.data.order;
            console.log('order_response_data', response.data);
            app_1.pool.query(`insert into orders (order_id,order_reference,order_creation_date,total_cost,total_cost_ex_gst,total_gst,number_of_shipments,number_of_items,total_weight) 
                values ("${order_id}","${order_reference}","${order_creation_date}","${order_summary.total_cost}","${order_summary.total_cost_ex_gst}","${order_summary.total_gst}","${order_summary.number_of_shipments}","${order_summary.number_of_items}","${order_summary.total_weight}")`, async (err, result) => {
                if (err) {
                    return res.send(err);
                }
                if ((result === null || result === void 0 ? void 0 : result['affectedRows']) === 1) {
                    let ordersSuccess = [];
                    const numberOfShipments = response.data.order.shipments.length;
                    for await (let shipment of response.data.order.shipments) {
                        app_1.pool.query(`update shipments set order_id = "${order_id}" where shipment_id = "${shipment.shipment_id}"`, async (err, result) => {
                            if (err) {
                                return res.send(err);
                            }
                            console.log();
                            if (result === null || result === void 0 ? void 0 : result['affectedRows']) {
                                // res.json({
                                //     msg:'Order已经成功创建',
                                //     success:true
                                // })
                                ordersSuccess.push(order_id);
                            }
                            console.log('ordersSuccess', ordersSuccess);
                            if (ordersSuccess.length === numberOfShipments) {
                                res.json({
                                    msg: 'order已经成功创建',
                                    success: true
                                });
                            }
                        });
                    }
                }
            });
        }
    }
    catch (e) {
        console.log('create order failed', e);
    }
};
exports.default = orderService;
