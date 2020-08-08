"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const express_validator_1 = require("express-validator");
const gravatar_1 = __importDefault(require("gravatar"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// create user post api
const users = async (req, res) => {
    //console.log('users',req.body);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let { name, email, password } = req.body;
    try {
        // see if user exists
        app_1.pool.query(`select * from users where email="${email}"`, async (err, results, fields) => {
            if (err) {
                console.log("select user error", err);
                return;
            }
            console.log("result", results);
            if (results.length > 0) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }
            const avatar = gravatar_1.default.url(email, {
                s: "200",
                r: "pg",
                d: "mm",
            });
            const salt = await bcryptjs_1.default.genSalt(10);
            password = await bcryptjs_1.default.hash(password, salt);
            app_1.pool.query(`insert into users(name, email,password,avatar) values("${name}","${email}","${password}","${avatar}")`, (err, results, fields) => {
                if (err) {
                    console.log("inserting users table has an error", err.message);
                    return;
                }
                console.log("result", results);
                const payload = {
                    user: {
                        token: "error",
                    },
                };
                jsonwebtoken_1.default.sign(payload, "aupost_project", {
                    expiresIn: 36000,
                }, (errBack, token) => {
                    if (errBack)
                        throw errBack;
                    payload.user.token = token;
                    return res.json(payload);
                });
            });
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Server error");
    }
};
exports.default = users;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBaUM7QUFFakMseURBQXFEO0FBQ3JELHdEQUFnQztBQUNoQyx3REFBOEI7QUFDOUIsZ0VBQStCO0FBRS9CLHVCQUF1QjtBQUN2QixNQUFNLEtBQUssR0FBbUIsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNsRSxnQ0FBZ0M7SUFDaEMsTUFBTSxNQUFNLEdBQUcsb0NBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDekQ7SUFFRCxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3pDLElBQUk7UUFDRixxQkFBcUI7UUFDckIsVUFBSSxDQUFDLEtBQUssQ0FDUixvQ0FBb0MsS0FBSyxHQUFHLEVBQzVDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdCLElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLE9BQU87YUFDUjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLE9BQU8sR0FBRztxQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdkQ7WUFDRCxNQUFNLE1BQU0sR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pDLENBQUMsRUFBRSxLQUFLO2dCQUNSLENBQUMsRUFBRSxJQUFJO2dCQUNQLENBQUMsRUFBRSxJQUFJO2FBQ1IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxrQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxRQUFRLEdBQUcsTUFBTSxrQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0MsVUFBSSxDQUFDLEtBQUssQ0FDUiwwREFBMEQsSUFBSSxNQUFNLEtBQUssTUFBTSxRQUFRLE1BQU0sTUFBTSxJQUFJLEVBQ3ZHLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQy9ELE9BQU87aUJBQ1I7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sT0FBTyxHQUFHO29CQUNkLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsT0FBTztxQkFDZjtpQkFDRixDQUFDO2dCQUNGLHNCQUFHLENBQUMsSUFBSSxDQUNOLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEI7b0JBQ0UsU0FBUyxFQUFFLEtBQUs7aUJBQ2pCLEVBQ0QsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQ2pCLElBQUksT0FBTzt3QkFBRSxNQUFNLE9BQU8sQ0FBQztvQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBZSxDQUFDO29CQUNyQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNCLENBQUMsQ0FDRixDQUFDO1lBQ0osQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQ0YsQ0FBQztLQUNIO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUN0QztBQUNILENBQUMsQ0FBQztBQUVGLGtCQUFlLEtBQUssQ0FBQyJ9