import { Request, Response } from "express";
import { HttpRequest } from "../../../../config/config";
import { AxiosResponse } from "axios";

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
  return HttpRequest.get(
    `https://digitalapi.auspost.com.au/test/shipping/v1/labels/${id}`
  )
    .then((res: AxiosResponse) => {
      console.log("getLabel", res.data);
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
};
export default getLabel;
