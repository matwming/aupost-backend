"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const createShipment = (shipmentInfo) => {
    const { deliver_to, country, residence, address, province, city, district, phone, consignment_weight, contents, unit_value, value, } = shipmentInfo;
    const body = {
        shipments: [
            {
                shipment_reference: "My second shipment ref",
                customer_reference_1: "cb1234",
                customer_reference_2: "cb2345",
                from: {
                    "name": "Christy Chen",
                    "lines": [
                        "420 Station Street"
                    ],
                    "suburb": "Box Hill",
                    "postcode": "3128",
                    "state": "VIC"
                },
                to: {
                    name: `a${deliver_to}`,
                    business_name: "Test",
                    lines: [address],
                    suburb: district,
                    state: province,
                    country: 'China',
                    postcode: "100000",
                    phone: phone,
                    email: "carl@gmai.co",
                    delivery_instructions: "NA",
                },
                items: [
                    {
                        length: "10",
                        height: "10",
                        width: "10",
                        weight: consignment_weight,
                        item_reference: "blocked",
                        product_id: "PTI8",
                        commercial_value: false,
                        classification_type: 'gift',
                        description_of_other: "A pair of shoes",
                        item_contents: [
                            {
                                description: contents,
                                quantity: 1,
                                value: value,
                                tariff_code: 123456,
                                country_of_origin: "AU",
                                weight: 0.34,
                            },
                        ],
                    },
                ],
            },
        ],
    };
    return config_1.HttpRequest.post("https://digitalapi.auspost.com.au/test/shipping/v1/shipments", { ...body })
        .then((res) => {
        console.log("createShipment", res.data);
        return res;
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = createShipment;
