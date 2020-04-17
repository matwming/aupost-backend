import { Request, Response } from "express";
import Profile from "../../../models/Profile";
import User from "../../../models/User";

const deleteProfile = async (req: Request, res: Response) => {
  try {
      //@ts-ignore
    const userId = req.user.id;
    await Profile.findOneAndRemove({ user: userId });
    await User.findOneAndRemove({ _id: userId });
    return res.json({
      msg: `User id : ${userId} is successfully deleted.`,
      success: true,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json("Server Error");
  }
};

export default deleteProfile;
