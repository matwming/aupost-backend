"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const app_1 = require("../../app");
const getAddress = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body.user;
    app_1.pool.query(`select * from address where email ="${email}"`, (err, results, fields) => {
        if (err) {
            console.log('querying address table has an error', err.message);
            return;
        }
        if (results.length > 0) {
            return res.json({ msg: results });
        }
        return res.status(400).json({ msg: 'no address found!' });
    });
};
exports.default = getAddress;
