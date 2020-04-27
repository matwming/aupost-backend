"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const app_1 = require("../../app");
exports.getAddress = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body.user;
    app_1.pool.query(`select * from address where email ="${email}"`, (err, results, fields) => {
        if (err) {
            console.log("querying address table has an error", err.message);
            return;
        }
        if (results.length > 0) {
            return res.json({ msg: results });
        }
        return res.status(400).json({ msg: "no address found!" });
    });
};
exports.saveAddress = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { charge_code, deliver_to, country, residence, address, phone, consignment_weight, product_classification, expected_dispatch, contents, unit_value, value, } = req.body;
    console.log("charge_code", charge_code, "country", country, "deliver_to", deliver_to);
    app_1.pool.query(`insert into shippments (charge_code,deliver_to,country,residence,detail_address,phone,consignment_weight,product_id,expected_dispatch,contents,unit_value,value) 
         values("${charge_code}","${deliver_to}","${country}","${residence}","${address}","${phone}","${consignment_weight}","${product_classification}","${expected_dispatch}","${contents}","${unit_value}","${value}")`, async (err, result, fields) => {
        if (err) {
            console.log('insert into shippments has errors', err);
            return;
        }
        console.log(result);
    });
};
