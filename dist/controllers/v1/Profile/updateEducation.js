"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Profile_1 = __importDefault(require("../../../models/Profile"));
const updateEducation = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //@ts-ignore
    const { school, degree, fieldofstudy, from, to, current, description, } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    };
    try {
        //@ts-ignore
        const profile = await Profile_1.default.findOne({ user: req.user.id });
        //@ts-ignore
        console.log("profile", profile, req.user);
        //@ts-ignore
        profile.education.unshift(newEdu);
        //@ts-ignore
        await profile.save();
        return res.json(profile);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
};
exports.default = updateEducation;
