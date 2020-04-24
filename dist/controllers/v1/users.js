"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const express_validator_1 = require("express-validator");
const gravatar_1 = __importDefault(require("gravatar"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// create user post api
const users = async (req, res) => {
    //console.log('users',req.body);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let { name, email, password } = req.body;
    try {
        // see if user exists
        app_1.pool.query(`select * from users where email="${email}"`, async (err, results, fields) => {
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
            const avatar = gravatar_1.default.url(email, {
                s: "200",
                r: "pg",
                d: "mm",
            });
            const salt = await bcryptjs_1.default.genSalt(10);
            password = await bcryptjs_1.default.hash(password, salt);
            app_1.pool.query(`insert into users(name, email,password,avatar) values("${name}","${email}","${password}","${avatar}")`, (err, results, fields) => {
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
                jsonwebtoken_1.default.sign(payload, "aupost_project", {
                    expiresIn: 36000,
                }, (errBack, token) => {
                    if (errBack)
                        throw errBack;
                    payload.user.token = token;
                    return res.json(payload);
                });
            });
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Server error");
    }
};
exports.default = users;
