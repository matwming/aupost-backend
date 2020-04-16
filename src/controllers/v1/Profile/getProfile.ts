import { Request, Response, RequestHandler } from "express";
import Profile from "../../../models/Profile";

const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
        //@ts-ignore
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    return res.json(profile);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server Error");
  }
};

export default getProfile;
