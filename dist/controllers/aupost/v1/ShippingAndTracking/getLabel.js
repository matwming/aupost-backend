"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const getLabel = () => {
    const body = {
        from: {
            postcode: "3207",
        },
        to: {
            postcode: "2001",
        },
        items: [
            {
                length: 5,
                height: 5,
                width: 5,
                weight: 5,
                item_reference: "abc xyz",
                features: {
                    TRANSIT_COVER: {
                        attributes: {
                            cover_amount: 1000,
                        },
                    },
                },
            },
        ],
    };
    let id;
    return config_1.HttpRequest.get(`https://digitalapi.auspost.com.au/test/shipping/v1/labels/${id}`)
        .then((res) => {
        console.log("getLabel", res.data);
        return res;
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = getLabel;
