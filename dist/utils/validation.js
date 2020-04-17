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
exports.validationProfile = () => {
    return [
        express_validator_1.check('status', 'Status is required').not().isEmpty(),
        express_validator_1.check('skills', 'Skills are required').not().isEmpty()
    ];
};
exports.validationUpdateProfile = () => {
    return [
        express_validator_1.check('title', 'Title is required').not().isEmpty(),
        express_validator_1.check('company', 'Company is required').not().isEmpty(),
        express_validator_1.check('from', 'From date is required').not().isEmpty()
    ];
};
exports.validationUpdateEducation = () => {
    return [
        express_validator_1.check('school', 'School is required').not().isEmpty(),
        express_validator_1.check('degree', 'Degree is required').not().isEmpty(),
        express_validator_1.check('fieldofstudy', 'Fields of Study is required').not().isEmpty(),
        express_validator_1.check('from', 'From date is required').not().isEmpty()
    ];
};
