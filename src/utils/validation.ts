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
