"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env["NODE_CONFIG_DIR"] = "/Users/mingwu/Projects/devconnector/dist/config";
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../../models/User"));
const gravatar_1 = __importDefault(require("gravatar"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const users = async (req, res) => {
    //console.log('users',req.body);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        // see if user exists
        let user = await User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        // get users gravatar
        const avatar = gravatar_1.default.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User_1.default({
            name, email, avatar, password
        });
        // Encrypt password
        const salt = await bcryptjs_1.default.genSalt(10);
        //@ts-ignore
        user.password = await bcryptjs_1.default.hash(password, salt);
        await user.save();
        // return jsonwebtoken
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
exports.default = users;
