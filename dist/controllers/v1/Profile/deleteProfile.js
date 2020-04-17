"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(require("../../../models/Profile"));
const User_1 = __importDefault(require("../../../models/User"));
const deleteProfile = async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.user.id;
        await Profile_1.default.findOneAndRemove({ user: userId });
        await User_1.default.findOneAndRemove({ _id: userId });
        return res.json({
            msg: `User id : ${userId} is successfully deleted.`,
            success: true,
        });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("Server Error");
    }
};
exports.default = deleteProfile;
