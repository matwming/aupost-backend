"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getOrderSummary = async (req, res) => {
    const { orderId } = req.params;
    if (orderId === undefined) {
        return res.json({ msg: 'Please provide a valid order id', success: false });
    }
    let tempFilePath = path_1.default.join(process.cwd(), 'ordersummary.pdf');
    console.log('tempFilePath', tempFilePath);
    let file = fs_1.default.createWriteStream(tempFilePath);
    let stream = await config_1.HttpRequest({
        url: `https://digitalapi.auspost.com.au/test/shipping/v1/orders/${orderId}/summary`,
        responseType: 'stream'
    });
    stream.data.pipe(file).on('finish', () => {
        console.log('thie file is finished downloading...');
        res.sendFile(tempFilePath, () => {
            fs_1.default.unlink(tempFilePath, (err) => {
                if (err) {
                    console.log('there is an error in delete file', err);
                    return;
                }
                console.log('download file success');
            });
        });
    });
};
exports.default = getOrderSummary;
