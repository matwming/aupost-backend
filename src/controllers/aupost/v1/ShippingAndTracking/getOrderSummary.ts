import { Request, Response } from "express";
import { HttpRequest } from "../../../../config/config";
import { AxiosResponse } from "axios";

const getOrderSummary = () => {
  return HttpRequest.get(
    `https://digitalapi.auspost.com.au/test/shipping/v1/orders/TB00290543/summary`
  )
    .then((res: AxiosResponse) => {
      console.log("getOrderSummary", res.data);
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
};
export default getOrderSummary;
