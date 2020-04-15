"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(require("../../models/Profile"));
const getProfile = async (req, res) => {
    try {
        const profile = await Profile_1.default;
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).send('Server Error');
    }
};
