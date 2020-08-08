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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtQ0FBK0I7QUFDL0IseURBQW1EO0FBQ25ELGdEQUFnRDtBQWlCaEQsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTs7SUFDdkQsTUFBTSxNQUFNLEdBQUcsb0NBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNuQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLENBQUM7S0FDekQ7SUFDRCxNQUFNLFdBQVcsR0FBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQU0sRUFBQyxFQUFFLENBQUEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQyxNQUFNLHVCQUF1QixHQUFnQixFQUFFLENBQUM7SUFDaEQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQzdCLHVCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxTQUFTLEdBQUc7UUFDZCxlQUFlLEVBQUUsb0JBQW9CO1FBQ3JDLGNBQWMsRUFBRSxtQkFBbUI7UUFDbkMsU0FBUyxFQUFFLHVCQUF1QjtLQUNyQyxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUMsU0FBUyxDQUFD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