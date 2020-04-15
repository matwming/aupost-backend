"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
exports.check = (req, res) => {
    let requestData = req.body;
    //console.log('requesData',requestData);
    let KYCresult = false;
    config_1.HttpRequest.post(`https://sandbox.ridx.io/international`, { ...requestData })
        .then((response) => {
        //console.log('axiosResponse', response.data);
        const messages = response.data.codes.messages;
        messages.forEach((el, index) => {
            // console.log('el.value',el.value);
            if (el.value === 'Full Match for 1+1 verification' || el.value === 'Full Match for 2+2 verification') {
                KYCresult = true;
            }
        });
        return res.json({
            KYCresult: KYCresult
        });
    })
        .catch((e) => {
        console.log('there is an error', e.response.data);
        return res.json(e.response.data);
    });
};
