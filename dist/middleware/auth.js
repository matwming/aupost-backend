"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const handleAuth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token,Authorization denied' });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
        //@ts-ignore
        req.user = decode.user;
        next();
    }
    catch (e) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};
exports.default = handleAuth;
