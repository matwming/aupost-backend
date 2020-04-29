import { Request, Response } from "express";
import { HttpRequest } from "../../../../config/config";
import {AxiosResponse} from "axios";

const createShipment = (shipmentInfo) => {
  const {
    charge_code,
    deliver_to,
    country,
    residence,
    address,
    phone,
    consignment_weight,
    product_classification,
    expected_dispatch,
    contents,
    unit_value,
    value,
  } = shipmentInfo;
  const body = {
    shipments: [
      {
        shipment_reference: "My second shipment ref",
        customer_reference_1: "cb1234",
        customer_reference_2: "cb2345",
        from: {
          "name":"Christy Chen",
          "lines":[
            "420 Station Street"
          ],
          "suburb": "Box Hill",
          "postcode": "3128",
          "state": "VIC"
        },
        to: {
          name: deliver_to,
          business_name: "Test",
          lines: [address],
          suburb: residence[2],
          state: residence[1],
          country: country,
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
            classification_type: product_classification,
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
  return HttpRequest.post("https://digitalapi.auspost.com.au/test/shipping/v1/shipments", { ...body })
    .then((res:AxiosResponse) => {
      console.log("createShipment", res.data);
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
};
export default createShipment;
