"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const app_1 = require("../../app");
const createLabel_1 = __importDefault(require("../aupost/v1/ShippingAndTracking/createLabel"));
const labelService = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { shipment_id } = req.body;
    if (shipment_id == undefined) {
        res.json({
            error: 'shipment_id is undefined',
            message: 'make sure call me from web'
        });
        return;
    }
    const findItems = `select * from items where shipment_id = "${shipment_id}"`;
    console.log('findItems', findItems);
    app_1.pool.query(findItems, (err, result) => {
        const itemId = result[0].item_id;
        createLabel_1.default(shipment_id, itemId)
            .then((response) => {
            console.log('labelService', response);
            if (response[0].hasOwnProperty('url')) {
                const updateUrlSql = `update shipments set label_url ="${response[0].url}" where shipment_id="${shipment_id}"`;
                console.log('updateUrl', updateUrlSql);
                app_1.pool.query(updateUrlSql, (err, result) => {
                    console.log('update_url', result);
                    if (result.affectedRows === 1) {
                        return response;
                    }
                });
            }
            return res.send(response);
        })
            .catch((e) => res.json(e.message));
    });
};
exports.default = labelService;
