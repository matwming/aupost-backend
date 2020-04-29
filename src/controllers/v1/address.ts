import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { pool } from "../../app";
import { AxiosResponse } from "axios";
import createShipment from "../aupost/v1/ShippingAndTracking/createShipment";

export const getAddress = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body.user;

  pool.query(
    `select * from address where email ="${email}"`,
    (err, results, fields) => {
      if (err) {
        console.log("querying address table has an error", err.message);
        return;
      }
      if (results.length > 0) {
        return res.json({ msg: results });
      }
      return res.status(400).json({ msg: "no address found!" });
    }
  );
};

export const saveAddress = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
  } = req.body;
  console.log("expected_dispatch", expected_dispatch);
  createShipment()
    .then((response: AxiosResponse | void) => {
      //@ts-ignore
      console.log("address", response.data);
      //@ts-ignore
      if (response.status === 200||201) {
        //@ts-ignore
        const { shipment_id } = response.data.shipments[0];
        console.log("shipment_id", shipment_id);
        pool.query(
          `insert into shippments (charge_code,deliver_to,country,residence,detail_address,phone,consignment_weight,product_id,expected_dispatch,contents,unit_value,value,shipment_id) 
         values("${charge_code}","${deliver_to}","${country}","${residence}","${address}","${phone}","${consignment_weight}","${product_classification}","${expected_dispatch}","${contents}","${unit_value}","${value}","${shipment_id}")`,
          async (err, result, fields) => {
            if (err) {
              console.log("insert into shippments has errors", err);
              return;
            }
            console.log(result);
            if (result.hasOwnProperty("affectedRows")) {
              return (
                result["affectedRows"] === 1 &&
                res.json({
                  msg: "successfully created a shippment.",
                  success: true,
                  shipment_id: shipment_id,
                })
              );
            }
          }
        );
      }
    })
    .catch((e) => {
      console.log("an error in address file", e.message);
      return res.json({
        msg: "An error occurred.Please try again later",
        success: false,
      });
    });
};
