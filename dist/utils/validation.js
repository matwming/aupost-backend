"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.validation = () => {
    return [
        express_validator_1.check('name', 'Name is required').not().isEmpty(),
        express_validator_1.check('email', 'Please include a valid email').isEmail(),
        express_validator_1.check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ];
};
exports.validationLogin = () => {
    return [
        express_validator_1.check('email', 'Please include a valid email').isEmail(),
        express_validator_1.check('password', 'Password is required').exists()
    ];
};
