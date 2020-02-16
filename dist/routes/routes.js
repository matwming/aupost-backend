"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_1 = require("../controllers/check");
const router = express_1.Router();
/**
 * @method Get
 * @header
 * @return
 */
router.get('/', (req, res) => res.send('<h1>This is Customer Checks API</h1>'));
/**
 * @method Post
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @return {"KYCresult": true / false} or error message {"error":error message}
 */
router.post('/check', check_1.check);
exports.default = router;
