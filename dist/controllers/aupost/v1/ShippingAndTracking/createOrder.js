"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const createOrder = () => {
    const body = {
        order_reference: "My order reference",
        payment_method: "CHARGE_TO_ACCOUNT",
        shipments: [
            {
                shipment_id: "b98K0E7CW.UAAAFxdQghEb8Y",
            },
        ],
    };
    return config_1.HttpRequest.put(`https://digitalapi.auspost.com.au/test/shipping/v1/orders`)
        .then((res) => {
        console.log("createOrder", res.data);
        return res;
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = createOrder;
