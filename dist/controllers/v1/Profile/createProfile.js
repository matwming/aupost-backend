"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(require("../../../models/Profile"));
const express_validator_1 = require("express-validator");
const createProfile = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { company, website, location, bio, status, githubusername, skills, youtube, twitter, instagram, linkedin, facebook, } = req.body;
    const profileFields = {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        social: {
            twitter,
            youtube,
            facebook,
        },
    };
    console.log("profileFields", profileFields);
    //@ts-ignore
    profileFields.user = req.user.id;
    try {
        //@ts-ignore
        let profile = await Profile_1.default.findOne({ user: req.user.id });
        console.log('profile_is_found', profile, req.user);
        if (profile) {
            profile = await Profile_1.default.findOneAndUpdate(
            //@ts-ignore
            { user: req.user.id }, { $set: profileFields }, { new: true });
            console.log('found a profile', profile);
            return res.json(profile);
        }
        //create a profile
        profile = new Profile_1.default(profileFields);
        await profile.save();
        return res.json(profile);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).send("Server Error");
    }
};
exports.default = createProfile;
