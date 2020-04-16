process.env["NODE_CONFIG_DIR"]="/Users/mingwu/Projects/devconnector/dist/config";

import jwt from "jsonwebtoken";
import config from "config";
import { NextFunction, Request, Response } from "express";

const handleAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token,Authorization denied" });
  }
  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));
    console.log('decode',decode)
    //@ts-ignore
    req.user = decode.user;
    next();
  } catch (e) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
export default handleAuth;
