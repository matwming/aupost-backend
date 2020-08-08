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
    try {
        // see if user exists
        app_1.pool.query(`select * from users where email="${email}"`, async (err, result, field) => {
            if (err) {
                console.log("auth.login has error", err.message);
                return;
            }
            console.log("result", result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy92MS9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFpQztBQUVqQyw2REFBcUM7QUFDckMseURBQXFEO0FBQ3JELHdEQUE4QjtBQUM5QixnRUFBK0I7QUFFbEIsUUFBQSxNQUFNLEdBQW1CLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDMUUsSUFBSTtRQUNGLFlBQVk7UUFDWixNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDdEQ7QUFDSCxDQUFDLENBQUM7QUFFVyxRQUFBLEtBQUssR0FBbUIsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN6RSxnQ0FBZ0M7SUFDaEMsTUFBTSxNQUFNLEdBQUcsb0NBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDekQ7SUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDckMsSUFBSTtRQUNGLHFCQUFxQjtRQUNyQixVQUFJLENBQUMsS0FBSyxDQUNSLG9DQUFvQyxLQUFLLEdBQUcsRUFDNUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pELE9BQU87YUFDUjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTlCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sR0FBRztxQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdkQ7WUFDRCxNQUFNLE9BQU8sR0FBWSxNQUFNLGtCQUFNLENBQUMsT0FBTyxDQUMzQyxRQUFRLEVBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FDbkIsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxHQUFHO3FCQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2RDtZQUNELE1BQU0sT0FBTyxHQUFHO2dCQUNkLElBQUksRUFBRTtvQkFDSixLQUFLO29CQUNMLEtBQUssRUFBRSxFQUFFO2lCQUNWO2FBQ0YsQ0FBQztZQUNGLHNCQUFHLENBQUMsSUFBSSxDQUNOLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEI7Z0JBQ0UsU0FBUyxFQUFFLEtBQUs7YUFDakIsRUFDRCxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxPQUFPO29CQUFFLE1BQU0sT0FBTyxDQUFDO2dCQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFlLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FDRixDQUFDO0tBQ0g7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3RDO0FBQ0gsQ0FBQyxDQUFDIn0=