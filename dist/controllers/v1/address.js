"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const app_1 = require("../../app");
const createShipment_1 = __importDefault(require("../aupost/v1/ShippingAndTracking/createShipment"));
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
    console.log("expected_dispatch", expected_dispatch);
    createShipment_1.default()
        .then((response) => {
        //@ts-ignore
        console.log("address", response.data);
        //@ts-ignore
        if (response.status === 200 || 201) {
            //@ts-ignore
            const { shipment_id } = response.data.shipments[0];
            console.log("shipment_id", shipment_id);
            app_1.pool.query(`insert into shippments (charge_code,deliver_to,country,residence,detail_address,phone,consignment_weight,product_id,expected_dispatch,contents,unit_value,value,shipment_id) 
         values("${charge_code}","${deliver_to}","${country}","${residence}","${address}","${phone}","${consignment_weight}","${product_classification}","${expected_dispatch}","${contents}","${unit_value}","${value}","${shipment_id}")`, async (err, result, fields) => {
                if (err) {
                    console.log("insert into shippments has errors", err);
                    return;
                }
                console.log(result);
                if (result.hasOwnProperty("affectedRows")) {
                    return (result["affectedRows"] === 1 &&
                        res.json({
                            msg: "successfully created a shippment.",
                            success: true,
                            shipment_id: shipment_id,
                        }));
                }
            });
        }
    })
        .catch((e) => {
        console.log("an error in address file", e.message);
        return res.json({
            msg: "An error occurred.Please try again later",
            success: false,
        });
    });
};
