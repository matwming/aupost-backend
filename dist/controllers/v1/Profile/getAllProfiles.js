"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(require("../../../models/Profile"));
const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile_1.default.find().populate('user', ['name', 'avatar']);
        return res.json(profiles);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
};
exports.default = getAllProfiles;
