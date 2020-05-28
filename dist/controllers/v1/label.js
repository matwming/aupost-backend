"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const createLabel_1 = __importDefault(require("../aupost/v1/ShippingAndTracking/createLabel"));
const labelService = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { charge_code, deliver_to, country, province, address, phone, city, consignment_weight, product_classification, contents, value, } = req.body;
    console.log("labelService", req.body);
    const { email } = req.body.user;
    createLabel_1.default()
        .then((response) => {
        console.log('labelService', response);
        return res.send(response);
    })
        .catch((e) => res.json(e.message));
};
exports.default = labelService;
