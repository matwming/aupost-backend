"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env["NODE_CONFIG_DIR"] = "/Users/mingwu/Projects/devconnector/dist/config";
const User_1 = __importDefault(require("../../models/User"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
exports.verify = async (req, res) => {
    try {
        //@ts-ignore
        const user = await User_1.default.findById(req.user.id).select('-password');
        return res.json(user);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ msg: 'Server Error' });
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
        let user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        //@ts-ignore
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const payload = {
            user: {
                id: user.id,
                token: 'error'
            }
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.get('jwtSecret'), {
            expiresIn: 36000
        }, (errBack, token) => {
            if (errBack)
                throw errBack;
            payload.user.token = token;
            return res.json(payload);
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
};
