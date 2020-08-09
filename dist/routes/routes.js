"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
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
const shipment_1 = __importStar(require("../controllers/v1/shipment"));
const label_1 = __importDefault(require("../controllers/v1/label"));
const order_1 = __importDefault(require("../controllers/v1/order"));
const getOrder_1 = __importDefault(require("../controllers/v1/order/getOrder"));
const getOrderSummary_1 = __importDefault(require("../controllers/aupost/v1/ShippingAndTracking/getOrderSummary"));
// @ts-ignore
const deleteShipment_1 = __importDefault(require("../controllers/v1/shipment/deleteShipment"));
const updateShipment_1 = __importDefault(require("../controllers/v1/shipment/updateShipment"));
const router = express_1.Router();
const currentAPIversion = "v1";
/**
 * @method Get
 * @header
 * @return
 * @desc Test
 * @access Public
 */
router.get("/", (req, res) => res.send("<h1>MERN Project API is working</h1>"));
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
router.get('/api/v1/get-shipment', auth_1.default, shipment_1.default);
router.post('/api/v1/create-aushipment', auth_1.default, shipment_1.createAuShipment);
router.put('/api/v1/update-shipment/:shipmentId', auth_1.default, updateShipment_1.default);
router.post('/api/v1/create-label', auth_1.default, label_1.default);
/**
 * @method put
 * @param shipment id:string
 * @desc call aupost api to create an order
 * @access Private
 * @return order info
 */
router.put('/api/v1/create-order', auth_1.default, order_1.default);
router.get('/api/v1/get-orders', auth_1.default, getOrder_1.default);
router.get('/api/v1/get-order-summary/:orderId', auth_1.default, getOrderSummary_1.default);
router.delete('/api/v1/delete-shipment/:shipmentId', auth_1.default, deleteShipment_1.default);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWtEO0FBQ2xELDZEQUErQztBQUMvQyxvRUFBNEM7QUFDNUMsb0RBSTZCO0FBQzdCLDhEQUE0QztBQUM1Qyx1REFBa0U7QUFDbEUsdUVBQXlFO0FBQ3pFLG9FQUFtRDtBQUNuRCxvRUFBbUQ7QUFDbkQsZ0ZBQXdEO0FBQ3hELG1IQUEyRjtBQUMzRixhQUFhO0FBQ2IsK0ZBQXVFO0FBQ3ZFLCtGQUF1RTtBQUV2RSxNQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFDeEIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDL0I7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUUsQ0FDNUMsR0FBRyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUNuRCxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsaUJBQWlCLE9BQU8sRUFBRSxjQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXRFOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxpQkFBaUIsUUFBUSxFQUFFLHVCQUFVLEVBQUUsRUFBRSxlQUFLLENBQUMsQ0FBQztBQUVwRTs7Ozs7R0FLRztBQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxpQkFBaUIsT0FBTyxFQUFFLDRCQUFlLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFN0U7Ozs7Ozs7R0FPRztBQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsY0FBVSxFQUFFLG9CQUFVLENBQUMsQ0FBQztBQUV0RDs7Ozs7O0dBTUc7QUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLGNBQVUsRUFBRSxxQkFBVyxDQUFDLENBQUM7QUFFN0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxjQUFVLEVBQUUsa0JBQVcsQ0FBQyxDQUFDO0FBRTVELE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsY0FBVSxFQUFFLDJCQUFnQixDQUFDLENBQUM7QUFFdkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBQyxjQUFVLEVBQUMsd0JBQWMsQ0FBQyxDQUFDO0FBRTVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsY0FBVSxFQUFFLGVBQVksQ0FBQyxDQUFDO0FBRTlEOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsY0FBVSxFQUFFLGVBQVksQ0FBQyxDQUFDO0FBRTdELE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsY0FBVSxFQUFFLGtCQUFRLENBQUMsQ0FBQztBQUV2RCxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLGNBQVUsRUFBRSx5QkFBZSxDQUFDLENBQUM7QUFFOUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUMsRUFBRSxjQUFVLEVBQUUsd0JBQWMsQ0FBQyxDQUFDO0FBQ2pGLGtCQUFlLE1BQU0sQ0FBQyJ9