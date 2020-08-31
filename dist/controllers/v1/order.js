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
    const accountNumber = req.headers['account-number'];
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
        let response = await config_1.HttpRequest.put('https://digitalapi.auspost.com.au/test/shipping/v1/orders', { ...orderInfo }, {
            headers: {
                "Account-Number": accountNumber
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtQ0FBK0I7QUFDL0IseURBQW1EO0FBQ25ELGdEQUFnRDtBQWlCaEQsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTs7SUFDdkQsTUFBTSxNQUFNLEdBQUcsb0NBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNuQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLENBQUM7S0FDekQ7SUFDRCxNQUFNLFdBQVcsR0FBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQU0sRUFBQyxFQUFFLENBQUEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQyxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsTUFBTSx1QkFBdUIsR0FBZ0IsRUFBRSxDQUFDO0lBQ2hELFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUM3Qix1QkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxXQUFXLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQTtJQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sU0FBUyxHQUFHO1FBQ2QsZUFBZSxFQUFFLG9CQUFvQjtRQUNyQyxjQUFjLEVBQUUsbUJBQW1CO1FBQ25DLFNBQVMsRUFBRSx1QkFB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