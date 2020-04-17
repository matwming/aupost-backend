import { Router, Response, Request } from "express";
import * as auth from "../controllers/v1/auth";
import users from "../controllers/v1/users";
import {
  validation,
  validationLogin,
  validationProfile, validationUpdateEducation, validationUpdateProfile,
} from "../utils/validation";
import handleAuth from "../middleware/auth";
import getProfile from "../controllers/v1/Profile/getProfile";
import createProfile from "../controllers/v1/Profile/createProfile";
import getAllorOneProfiles from "../controllers/v1/Profile/getAllorOneProfiles";
import deleteProfile from "../controllers/v1/Profile/deleteProfile";
import updateProfile from "../controllers/v1/Profile/updateProfile";
import deleteExperience from "../controllers/v1/Profile/deleteExperience";
import updateEducation from "../controllers/v1/Profile/updateEducation";
import deleteEducation from "../controllers/v1/Profile/deleteEducation";
import getRepos from "../controllers/v1/github/getRepos";

const router = Router();
const currentAPIversion = "v1";
/**
 * @method Get
 * @header
 * @return
 * @desc Test
 * @access Public
 */
router.get("/", (req: Request, res: Response) =>
  res.send("<h1>MERN Project API</h1>")
);
/**
 * @method Post
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @return {"KYCresult": true / false} or error message {"error":error message}
 */
router.get(`/api/${currentAPIversion}/auth`, handleAuth, auth.verify);

/**
 * @method Post
 * @header
 * @return
 * @desc create a user
 * @access Public
 */
router.post(`/api/${currentAPIversion}/users`, validation(), users);

/**
 * @method Post-Login with email and password
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @return
 */

router.post(`/api/${currentAPIversion}/auth`, validationLogin(), auth.login);

/**
 * @method Get api/profile/me
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @desc Get current users profile
 * @access Private
 * @return
 */

router.get(`/api/profile/me`, handleAuth, getProfile);

/**
 * @method Post api/profile
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @desc Get current users profile
 * @access Private
 * @return
 */

router.post(`/api/profile`, handleAuth, validationProfile(), createProfile);

/**
 * @method Post api/profile
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @desc Get current users profile
 * @access Private
 * @return
 */

router.get(`/api/profile/:user_id`, getAllorOneProfiles);

/**
 * @method Delete api/profile
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @desc Delete profile,user, posts
 * @access Private
 * @return
 */

router.delete(`/api/profile`, handleAuth, deleteProfile);

/**
 * @method Delete api/profile
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @desc Delete profile,user, posts
 * @access Private
 * @return
 */

router.put(`/api/profile/experience`, handleAuth,validationUpdateProfile(),updateProfile);

router.delete(`/api/profile/experience/:exp_id`, handleAuth,deleteExperience);

router.put(`/api/profile/education`, handleAuth,validationUpdateEducation(),updateEducation);

router.delete(`/api/profile/education/:exp_id`, handleAuth,deleteEducation);

router.get('/api/github/:username',getRepos);
export default router;
