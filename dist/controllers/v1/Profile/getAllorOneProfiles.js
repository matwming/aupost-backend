"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(require("../../../models/Profile"));
const getAllorOneProfiles = async (req, res) => {
    try {
        let user_id = req.params.user_id;
        console.log("user_id", user_id);
        let profile;
        if (user_id && user_id !== "all") {
            profile = await Profile_1.default.findOne({ user: user_id }).populate("user", [
                "name",
                "avatar",
            ]);
            return res.json(profile);
        }
        if (user_id === "all") {
            profile = await Profile_1.default.find().populate("user", ["name", "avatar"]);
            return res.json(profile);
        }
        return res.json({
            msg: 'invalid parameters, please type user id or just "all"',
        });
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
};
exports.default = getAllorOneProfiles;
