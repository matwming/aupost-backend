"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../app");
const getOrder = (req, res) => {
    const getOrdersSql = `select * from orders order by order_creation_date desc`;
    app_1.pool.query(getOrdersSql, (err, response) => {
        if (err) {
            console.log(err);
            throw (err);
        }
        console.log('get orders', response);
        return res.json({ orders: response, success: true });
    });
};
exports.default = getOrder;
