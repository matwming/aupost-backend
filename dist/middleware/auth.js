"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env["NODE_CONFIG_DIR"] = "/Users/mingwu/Projects/devconnector/dist/config";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleAuth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "No token,Authorization denied" });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, 'aupost_project');
        console.log('decode', decode);
        //@ts-ignore
        req.body.user = decode.user;
        next();
    }
    catch (e) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
};
exports.default = handleAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUMsaURBQWlELENBQUM7QUFFakYsZ0VBQStCO0FBSS9CLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckUsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN6QyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSwrQkFBK0IsRUFBRSxDQUFDLENBQUM7S0FDdkU7SUFDRCxJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcsc0JBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUIsWUFBWTtRQUNaLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxFQUFFLENBQUM7S0FDUjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7S0FDNUQ7QUFDSCxDQUFDLENBQUM7QUFDRixrQkFBZSxVQUFVLENBQUMifQ==