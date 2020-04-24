import { pool } from "../../app";
import { Request, Response, RequestHandler } from "express";
import { validationResult } from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// create user post api
const users: RequestHandler = async (req: Request, res: Response) => {
  //console.log('users',req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, email, password } = req.body;
  try {
    // see if user exists
    pool.query(
      `select * from users where email="${email}"`,
      async (err, results, fields) => {
        if (err) {
          console.log("select user error", err);
          return;
        }
        console.log("result", results);
        if (results.length > 0) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }
        const avatar = gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        });

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        pool.query(
          `insert into users(name, email,password,avatar) values("${name}","${email}","${password}","${avatar}")`,
          (err, results, fields) => {
            if (err) {
              console.log("inserting users table has an error", err.message);
              return;
            }
            console.log("result", results);
            const payload = {
              user: {
                token: "error",
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
                return res.json(payload);
              }
            );
          }
        );
      }
    );
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server error");
  }
};

export default users;
