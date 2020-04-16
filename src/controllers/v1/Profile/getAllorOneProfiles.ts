import { Response, Request } from "express";
import Profile from "../../../models/Profile";
const getAllorOneProfiles = async (req: Request, res: Response) => {
  try {
    let user_id = req.params.user_id;
    console.log("user_id", user_id);
    let profile;
    if (user_id && user_id !== "all") {
      profile = await Profile.findOne({ user: user_id }).populate("user", [
        "name",
        "avatar",
      ]);
      return res.json(profile);
    }
    if (user_id === "all") {
      profile = await Profile.find().populate("user", ["name", "avatar"]);
      return res.json(profile);
    }
    return res.json({
      msg: 'invalid parameters, please type user id or just "all"',
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
};

export default getAllorOneProfiles;
