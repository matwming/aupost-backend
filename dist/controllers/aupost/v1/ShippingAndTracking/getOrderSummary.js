"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const fs_1 = __importDefault(require("fs"));
const getOrderSummary = (req, res) => {
    const { orderId } = req.params;
    if (orderId === undefined) {
        return res.json({ msg: 'Please provide a valid order id', success: false });
    }
    config_1.HttpRequest.get(`https://digitalapi.auspost.com.au/test/shipping/v1/orders/${orderId}/summary`)
        .then((response) => {
        console.log("getOrderSummary", response);
        fs_1.default.writeFile("C://pdf/ne1w.pdf", response.data, (err) => {
            if (err)
                console.log(err);
        });
        // let write = fs.createWriteStream("C://pdf/output.pdf");
        // write.write(response.data,'UTF8');
        // write.end();
        // write.on('finish',()=>{
        //     console.log('completed')
        // })
        //res.setHeader("Content-Type", "application/pdf")
        return res.send(response.data);
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = getOrderSummary;
