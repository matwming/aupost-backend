import { Request, Response } from "express";
import { HttpRequest } from "../../../../config/config";
import {AxiosResponse} from "axios";

const createShipment = () => {
  const body = {
    shipments: [
      {
        shipment_reference: "My second shipment ref",
        customer_reference_1: "cb1234",
        customer_reference_2: "cb2345",
        from: {
          name: "Christy Chen",
          lines: ["420 Station Street"],
          suburb: "Box Hill",
          postcode: "3128",
          state: "VIC",
        },
        to: {
          name: "Test",
          business_name: "Test",
          lines: ["Test"],
          suburb: "Beijing",
          state: "Beijing",
          country: "CN",
          postcode: "100000",
          phone: "13900008888",
          email: "carl@gmai.co",
          delivery_instructions: "NA",
        },
        items: [
          {
            length: "10",
            height: "10",
            width: "10",
            weight: "1",
            item_reference: "blocked",
            product_id: "PTI8",

            commercial_value: false,
            classification_type: "GIFT",
            description_of_other: "A pair of shoes",

            item_contents: [
              {
                description: "Some stuff",
                quantity: 1,
                value: 1.23,
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
