import {Response,Request} from 'express';
import Profile from "../../../models/Profile";
const deleteEducation=async(req:Request,res:Response)=>{
    try{
        //@ts-ignore
        const profile=await Profile.findOne({user:req.user.id});
        // @ts-ignore
        const removeIndex:number=profile.education.map(item=>item.id).findIndex(el=>req.params.exp_id);
        // @ts-ignore
        profile.education.splice(removeIndex,1);
        // @ts-ignore
        await profile.save();
        return res.json(profile);
    }catch (e) {
        console.error(e.message);
        return res.status(500).json('Server Error');
    }
};
export default deleteEducation;
