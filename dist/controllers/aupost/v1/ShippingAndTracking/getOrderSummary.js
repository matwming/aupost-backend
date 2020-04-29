"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const getOrderSummary = () => {
    return config_1.HttpRequest.get(`https://digitalapi.auspost.com.au/test/shipping/v1/orders/TB00290543/summary`)
        .then((res) => {
        console.log("getOrderSummary", res.data);
        return res;
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = getOrderSummary;
