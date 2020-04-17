import {check, validationResult} from "express-validator";

export const validation=()=>{
    return [
        check('name','Name is required').not().isEmpty(),
        check('email','Please include a valid email').isEmail(),
        check('password','Please enter a password with 6 or more characters').isLength({min:6})
    ]
};
export const validationLogin=()=>{
    return [
        check('email','Please include a valid email').isEmail(),
        check('password','Password is required').exists()
    ]
};

export const validationProfile=()=>{
    return [
        check('status','Status is required').not().isEmpty(),
        check('skills','Skills are required').not().isEmpty()
    ]
};

export const validationUpdateProfile=()=>{
    return [
        check('title','Title is required').not().isEmpty(),
        check('company','Company is required').not().isEmpty(),
        check('from','From date is required').not().isEmpty()
    ]
};
export const validationUpdateEducation=()=>{
    return [
        check('school','School is required').not().isEmpty(),
        check('degree','Degree is required').not().isEmpty(),
        check('fieldofstudy','Fields of Study is required').not().isEmpty(),
        check('from','From date is required').not().isEmpty()
    ]
};
