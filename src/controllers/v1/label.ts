import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { pool } from "../../app";
import createLabel from "../aupost/v1/ShippingAndTracking/createLabel";

const labelService = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    charge_code,
    deliver_to,
    country,
    province,
    address,
    phone,
    city,
    consignment_weight,
    product_classification,
    contents,
    value,
  } = req.body;
  console.log("labelService", req.body);
  const { email } = req.body.user;
  createLabel()
    .then((response) => {
      console.log('labelService',response)
      return res.send(response);
    })
    .catch((e) => res.json(e.message));
};

export default labelService;
