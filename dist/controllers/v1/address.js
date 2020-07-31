"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAddress = exports.getAddress = void 0;
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
    const { charge_code, deliver_to, country, province, address, phone, city, consignment_weight, product_classification, contents, value, } = req.body;
    console.log('body', req.body);
    const { email } = req.body.user;
    app_1.pool.query(`insert into shipments (charge_code,deliver_to,country,province,detail_address,phone,consignment_weight,product_id,contents,value,shipment_id,sender_email,city) 
         values("${charge_code}","${deliver_to}","${country}","${province}","${address}","${phone}","${consignment_weight}","${product_classification}","${contents}","${value}","","${email}","${city}")`, async (err, result, fields) => {
        if (err) {
            console.log("insert into shippments has errors", err);
            return;
        }
        console.log(result);
        if (result.hasOwnProperty("affectedRows")) {
            return (result["affectedRows"] === 1 &&
                res.json({
                    msg: "successfully created a shipment.",
                    success: true,
                }));
        }
    });
    // createShipment(req.body)
    //   .then((response: AxiosResponse | void) => {
    //     //@ts-ignore
    //     console.log("address", response.data);
    //     //@ts-ignore
    //     if (response.status === 200||201) {
    //       //@ts-ignore
    //       const { shipment_id } = response.data.shipments[0];
    //       console.log("shipment_id", shipment_id);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("an error in address file", e.message);
    //     return res.json({
    //       msg: "An error occurred.Please try again later",
    //       success: false,
    //     });
    //   });
};
