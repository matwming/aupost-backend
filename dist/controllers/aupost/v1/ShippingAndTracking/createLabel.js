"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const createLabel = async (shipmentId, itemId) => {
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
                shipment_id: `${shipmentId}`,
                items: [
                    {
                        item_id: `${itemId}`,
                    },
                ],
            },
        ],
    };
    let res = await config_1.HttpRequest.post("https://digitalapi.auspost.com.au/test/shipping/v1/labels", { ...body });
    console.log("createLabel", res.data.labels);
    return res.data.labels;
};
exports.default = createLabel;
