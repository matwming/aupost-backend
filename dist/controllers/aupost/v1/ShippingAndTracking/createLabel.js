"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const createLabel = () => {
    const body = {
        wait_for_label_url: true,
        preferences: [
            {
                type: "PRINT",
                format: "PDF",
                groups: [
                    {
                        group: "Parcel Post",
                        layout: "A4-1pp",
                        branded: true,
                        left_offset: 0,
                        top_offset: 0,
                    },
                ],
            },
        ],
        shipments: [
            {
                shipment_id: "b98K0E7CW.UAAAFxdQghEb8Y",
                items: [
                    {
                        item_id: "RmQK0E7COHsAAAFxdwghEb8Y",
                    },
                ],
            },
        ],
    };
    return config_1.HttpRequest.post("https://digitalapi.auspost.com.au/test/shipping/v1/labels", { ...body })
        .then((res) => {
        console.log("createLabel", res.data);
        return res;
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = createLabel;
