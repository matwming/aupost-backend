"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(require("../../../models/Profile"));
const deleteEducation = async (req, res) => {
    try {
        //@ts-ignore
        const profile = await Profile_1.default.findOne({ user: req.user.id });
        // @ts-ignore
        const removeIndex = profile.education.map(item => item.id).findIndex(el => req.params.exp_id);
        // @ts-ignore
        profile.education.splice(removeIndex, 1);
        // @ts-ignore
        await profile.save();
        return res.json(profile);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json('Server Error');
    }
};
exports.default = deleteEducation;
