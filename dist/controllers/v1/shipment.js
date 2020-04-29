"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const getShipment = (req, res) => {
    console.log('getting shipments...');
    console.log('email', req.body);
    const { email } = req.body.user;
    app_1.pool.query(`select * from shipments where sender_email="${email}"`, (err, results, fields) => {
        if (err) {
            console.log('searching sender_email shipments has errors', err.message);
            return;
        }
        console.log('results', results);
        if (results.length === 0) {
            return res.json({ msg: `No shipment is found for user ${email}`, success: true });
        }
        return res.json({ success: true, results: results });
    });
};
exports.default = getShipment;
