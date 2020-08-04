"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config/config");
const app_1 = require("../../../app");
const deleteShipment = (req, res) => {
    const { shipmentId } = req.params;
    console.log('shipment id', shipmentId);
    if (shipmentId !== undefined) {
        console.log('delete shipment started');
        config_1.HttpRequest.delete(`https://digitalapi.auspost.com.au/test/shipping/v1/shipments/${shipmentId}`).then((response) => {
            console.log('delete shipment', response.status);
            if (response.status == 200) {
                const deleteShipment = `delete from shipments where shipment_id ="${shipmentId}"`;
                app_1.pool.query(deleteShipment, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('delete-shipments', result);
                    if ((result === null || result === void 0 ? void 0 : result['affectedRows']) == 1) {
                        return res.json({ msg: `shipment id ${shipmentId} is successfully deleted`, success: true });
                    }
                });
            }
        }).catch((e) => {
            var _a, _b;
            console.log('delete shipment error', (_a = e.response) === null || _a === void 0 ? void 0 : _a.data.errors);
            return res.send((_b = e.response) === null || _b === void 0 ? void 0 : _b.data.errors[0]);
        });
    }
};
exports.default = deleteShipment;
