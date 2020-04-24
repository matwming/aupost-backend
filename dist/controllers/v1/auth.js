"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const User_1 = __importDefault(require("../../models/User"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.verify = async (req, res) => {
    try {
        //@ts-ignore
        const user = await User_1.default.findById(req.user.id).select("-password");
        return res.json(user);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ msg: "Server Error" });
    }
};
exports.login = async (req, res) => {
    //console.log('users',req.body);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // see if user exists
        app_1.pool.query(`select * from users where email="${email}"`, async (err, result, field) => {
            if (err) {
                console.log("auth.login has error", err.message);
                return;
            }
            console.log("result", result);
            if (result.length === 0) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            const isMatch = await bcryptjs_1.default.compare(password, result[0].password);
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
            jsonwebtoken_1.default.sign(payload, "aupost_project", {
                expiresIn: 36000,
            }, (errBack, token) => {
                if (errBack)
                    throw errBack;
                payload.user.token = token;
                return res.json(payload);
            });
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Server error");
    }
};
