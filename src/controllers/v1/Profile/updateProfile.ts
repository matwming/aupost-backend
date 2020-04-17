import {Request, Response} from "express";
import { validationResult } from "express-validator";
import Profile from "../../../models/Profile";
import { DefinedRequest } from "../../../models/definedTypes";


const updateProfile = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
//@ts-ignore
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    //@ts-ignore
    const profile = await Profile.findOne({ user: req.user.id });
    //@ts-ignore
    console.log('profile',profile,req.user);
    //@ts-ignore
    profile.experience.unshift(newExp);
    //@ts-ignore
    await profile.save();
    return res.json(profile)
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
};

export default updateProfile;
