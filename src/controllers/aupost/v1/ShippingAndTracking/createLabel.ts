import { Request, Response } from "express";
import { HttpRequest } from "../../../../config/config";
import { AxiosResponse } from "axios";

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
  return HttpRequest.post(
    "https://digitalapi.auspost.com.au/test/shipping/v1/labels",
    { ...body }
  )
    .then((res: AxiosResponse) => {
      console.log("createLabel", res.data);
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
};
export default createLabel;
