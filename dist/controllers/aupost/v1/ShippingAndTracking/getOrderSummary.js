"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const getOrderSummary = (req, res) => {
    const { orderId } = req.params;
    if (orderId === undefined) {
        return res.json({ msg: 'Please provide a valid order id', success: false });
    }
    config_1.HttpRequest.get(`https://digitalapi.auspost.com.au/test/shipping/v1/orders/${orderId}/summary`)
        .then((response) => {
        console.log("getOrderSummary", response.data);
        res.setHeader("Content-Type", "application/pdf");
        return res.send(response.data);
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = getOrderSummary;
