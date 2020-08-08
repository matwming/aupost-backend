"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationUpdateEducation = exports.validationUpdateProfile = exports.validationProfile = exports.validationLogin = exports.validation = void 0;
const express_validator_1 = require("express-validator");
exports.validation = () => {
    return [
        express_validator_1.check('name', 'Name is required').not().isEmpty(),
        express_validator_1.check('email', 'Please include a valid email').isEmail(),
        express_validator_1.check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ];
};
exports.validationLogin = () => {
    return [
        express_validator_1.check('email', 'Please include a valid email').isEmail(),
        express_validator_1.check('password', 'Password is required').exists()
    ];
};
exports.validationProfile = () => {
    return [
        express_validator_1.check('status', 'Status is required').not().isEmpty(),
        express_validator_1.check('skills', 'Skills are required').not().isEmpty()
    ];
};
exports.validationUpdateProfile = () => {
    return [
        express_validator_1.check('title', 'Title is required').not().isEmpty(),
        express_validator_1.check('company', 'Company is required').not().isEmpty(),
        express_validator_1.check('from', 'From date is required').not().isEmpty()
    ];
};
exports.validationUpdateEducation = () => {
    return [
        express_validator_1.check('school', 'School is required').not().isEmpty(),
        express_validator_1.check('degree', 'Degree is required').not().isEmpty(),
        express_validator_1.check('fieldofstudy', 'Fields of Study is required').not().isEmpty(),
        express_validator_1.check('from', 'From date is required').not().isEmpty()
    ];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUEwRDtBQUU3QyxRQUFBLFVBQVUsR0FBQyxHQUFFLEVBQUU7SUFDeEIsT0FBTztRQUNILHlCQUFLLENBQUMsTUFBTSxFQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ2hELHlCQUFLLENBQUMsT0FBTyxFQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3ZELHlCQUFLLENBQUMsVUFBVSxFQUFDLG1EQUFtRCxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDO0tBQzFGLENBQUE7QUFDTCxDQUFDLENBQUM7QUFDVyxRQUFBLGVBQWUsR0FBQyxHQUFFLEVBQUU7SUFDN0IsT0FBTztRQUNILHlCQUFLLENBQUMsT0FBTyxFQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3ZELHlCQUFLLENBQUMsVUFBVSxFQUFDLHNCQUFzQixDQUFDLENBQUMsTUFBTSxFQUFFO0tBQ3BELENBQUE7QUFDTCxDQUFDLENBQUM7QUFFVyxRQUFBLGlCQUFpQixHQUFDLEdBQUUsRUFBRTtJQUMvQixPQUFPO1FBQ0gseUJBQUssQ0FBQyxRQUFRLEVBQUMsb0JBQW9CLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFDcEQseUJBQUssQ0FBQyxRQUFRLEVBQUMscUJBQXFCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUU7S0FDeEQsQ0FBQTtBQUNMLENBQUMsQ0FBQztBQUVXLFFBQUEsdUJBQXVCLEdBQUMsR0FBRSxFQUFFO0lBQ3JDLE9BQU87UUFDSCx5QkFBSyxDQUFDLE9BQU8sRUFBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNsRCx5QkFBSyxDQUFDLFNBQVMsRUFBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUN0RCx5QkFBSyxDQUFDLE1BQU0sRUFBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRTtLQUN4RCxDQUFBO0FBQ0wsQ0FBQyxDQUFDO0FBQ1csUUFBQSx5QkFBeUIsR0FBQyxHQUFFLEVBQUU7SUFDdkMsT0FBTztRQUNILHlCQUFLLENBQUMsUUFBUSxFQUFDLG9CQUFvQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ3BELHlCQUFLLENBQUMsUUFBUSxFQUFDLG9CQUFvQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ3BELHlCQUFLLENBQUMsY0FBYyxFQUFDLDZCQUE2QixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ25FLHlCQUFLLENBQUMsTUFBTSxFQUFDLHVCQUF1QixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFO0tBQ3hELENBQUE7QUFDTCxDQUFDLENBQUMifQ==