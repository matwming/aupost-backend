import { Request, Response } from "express";
import { HttpRequest } from "../../../../config/config";
import { AxiosResponse } from "axios";
import {API_Endpoint} from '../../../../config/config';
const createOrder = () => {
  const body = {
    order_reference: "My order reference",
    payment_method: "CHARGE_TO_ACCOUNT",
    shipments: [
      {
        shipment_id: "b98K0E7CW.UAAAFxdQghEb8Y",
      },
    ],
  };

  return HttpRequest.put(
    `${API_Endpoint}/shipping/v1/orders`
  )
    .then((res: AxiosResponse) => {
      console.log("createOrder", res.data);
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
};
export default createOrder;
