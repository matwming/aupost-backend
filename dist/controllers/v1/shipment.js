"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuShipment = void 0;
const app_1 = require("../../app");
const createShipment_1 = __importDefault(require("../aupost/v1/ShippingAndTracking/createShipment"));
const express_validator_1 = require("express-validator");
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
            return res.json({ msg: `No shipment is found for user ${email}`, success: true, results: [] });
        }
        return res.json({ success: true, results: results });
    });
};
exports.createAuShipment = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // @ts-ignore
    await createShipment_1.default(req, res).then(response => {
        console.log('shipments_create', response);
        return res.send(response);
    }).catch((e) => {
        res.json(e.message);
    });
};
exports.default = getShipment;
