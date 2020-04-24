"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env["NODE_CONFIG_DIR"] = "/Users/mingwu/Projects/devconnector/dist/config";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleAuth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "No token,Authorization denied" });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, 'aupost_project');
        console.log('decode', decode);
        //@ts-ignore
        req.body.user = decode.user;
        next();
    }
    catch (e) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
};
exports.default = handleAuth;
