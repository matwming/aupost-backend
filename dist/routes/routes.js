"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth = __importStar(require("../controllers/v1/auth"));
const users_1 = __importDefault(require("../controllers/v1/users"));
const validation_1 = require("../utils/validation");
const auth_1 = __importDefault(require("../middleware/auth"));
const address_1 = require("../controllers/v1/address");
const router = express_1.Router();
const currentAPIversion = "v1";
/**
 * @method Get
 * @header
 * @return
 * @desc Test
 * @access Public
 */
router.get("/", (req, res) => res.send("<h1>MERN Project API</h1>"));
/**
 * @method Post
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @return {"KYCresult": true / false} or error message {"error":error message}
 */
router.get(`/api/${currentAPIversion}/auth`, auth_1.default, auth.verify);
/**
 * @method Post- create users
 * @header
 * @return
 * @desc create a user
 * @access Public
 */
router.post(`/api/${currentAPIversion}/users`, validation_1.validation(), users_1.default);
/**
 * @method Post-Login with email and password
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @return
 */
router.post(`/api/${currentAPIversion}/auth`, validation_1.validationLogin(), auth.login);
/**
 * @method get address
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @desc Get current users profile
 * @access Private
 * @return
 */
router.get(`/api/address/me`, auth_1.default, address_1.getAddress);
/**
 * @method post address
 * @param
 * @desc save user address to database
 * @access Private
 * @return
 */
router.post(`/api/v1/save-address`, auth_1.default, address_1.saveAddress);
exports.default = router;
