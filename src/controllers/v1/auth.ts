import { pool } from "../../app";
import { Request, Response, RequestHandler } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const verify: RequestHandler = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  //console.log('users',req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
    // @ts-ignore
    console.log('req.header.account-number',req.headers['account-number']);
  try {
    // see if user exists
    pool.query(
      `select * from users where email="${email}"`,
      async (err, result, field) => {
        if (err) {
          console.log("auth.login has error", err.message);
          return;
        }
        //console.log("result", result);
        if (result.length === 0) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const isMatch: boolean = await bcrypt.compare(
          password,
          result[0].password
        );
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const payload = {
          user: {
            email,
            token: "",
          },
        };
        jwt.sign(
          payload,
          "aupost_project",
          {
            expiresIn: 36000,
          },
          (errBack, token) => {
            if (errBack) throw errBack;
            payload.user.token = token as string;
            Object.assign(payload,{success:true});
            return res.json(payload);
          }
        );
      }
    );
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server error");
  }
};
