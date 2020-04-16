import { Request, Response, RequestHandler } from "express";
import Profile from "../../../models/Profile";
import { check, validationResult } from "express-validator";

const createProfile = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
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
    facebook,
  } = req.body;

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
    profileFields.user=req.user.id;
  try {
    //@ts-ignore
    let profile = await Profile.findOne({ user: req.user.id });
    console.log('profile_is_found',profile,req.user);
    if (profile) {

      profile = await Profile.findOneAndUpdate(
          //@ts-ignore
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      console.log('found a profile',profile);

      return res.json(profile);
    }
    //create a profile
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server Error");
  }
};

export default createProfile;
