"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.verify = void 0;
const app_1 = require("../../app");
const User_1 = __importDefault(require("../../models/User"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.verify = async (req, res) => {
    try {
        //@ts-ignore
        const user = await User_1.default.findById(req.user.id).select("-password");
        return res.json(user);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ msg: "Server Error" });
    }
};
exports.login = async (req, res) => {
    //console.log('users',req.body);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // @ts-ignore
    console.log('req.header.account-number', req.headers['account-number']);
    try {
        // see if user exists
        app_1.pool.query(`select * from users where email="${email}"`, async (err, result, field) => {
            if (err) {
                console.log("auth.login has error", err.message);
                return;
            }
            //console.log("result", result);
            if (result.length === 0) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            const isMatch = await bcryptjs_1.default.compare(password, result[0].password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            const payload = {
                user: {
                    email,
                    token: "",
                },
            };
            jsonwebtoken_1.default.sign(payload, "aupost_project", {
                expiresIn: 36000,
            }, (errBack, token) => {
                if (errBack)
                    throw errBack;
                payload.user.token = token;
                Object.assign(payload, { success: true });
                return res.json(payload);
            });
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Server error");
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy92MS9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFpQztBQUVqQyw2REFBcUM7QUFDckMseURBQXFEO0FBQ3JELHdEQUE4QjtBQUM5QixnRUFBK0I7QUFFbEIsUUFBQSxNQUFNLEdBQW1CLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDMUUsSUFBSTtRQUNGLFlBQVk7UUFDWixNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDdEQ7QUFDSCxDQUFDLENBQUM7QUFFVyxRQUFBLEtBQUssR0FBbUIsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN6RSxnQ0FBZ0M7SUFDaEMsTUFBTSxNQUFNLEdBQUcsb0NBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDekQ7SUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDbkMsYUFBYTtJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDekUsSUFBSTtRQUNGLHFCQUFxQjtRQUNyQixVQUFJLENBQUMsS0FBSyxDQUNSLG9DQUFvQyxLQUFLLEdBQUcsRUFDNUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pELE9BQU87YUFDUjtZQUNELGdDQUFnQztZQUNoQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUN2QixPQUFPLEdBQUc7cUJBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsTUFBTSxPQUFPLEdBQVksTUFBTSxrQkFBTSxDQUFDLE9BQU8sQ0FDM0MsUUFBUSxFQUNSLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQ25CLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE9BQU8sR0FBRztxQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdkQ7WUFDRCxNQUFNLE9BQU8sR0FBRztnQkFDZCxJQUFJLEVBQUU7b0JBQ0osS0FBSztvQkFDTCxLQUFLLEVBQUUsRUFBRTtpQkFDVjthQUNGLENBQUM7WUFDRixzQkFBRyxDQUFDLElBQUksQ0FDTixPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCO2dCQUNFLFNBQVMsRUFBRSxLQUFLO2FBQ2pCLEVBQ0QsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLElBQUksT0FBTztvQkFBRSxNQUFNLE9BQU8sQ0FBQztnQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBZSxDQUFDO2dCQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUN0QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQ0YsQ0FBQztLQUNIO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUN0QztBQUNILENBQUMsQ0FBQyJ9