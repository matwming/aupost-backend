import {Router, Response, Request} from "express";
import * as auth from "../controllers/v1/auth";
import users from "../controllers/v1/users";
import {
    validation,
    validationLogin,
    validationProfile, validationUpdateEducation, validationUpdateProfile,
} from "../utils/validation";
import handleAuth from "../middleware/auth";
import {getAddress, saveAddress} from "../controllers/v1/address";
import getShipment, {createAuShipment} from "../controllers/v1/shipment";
import labelService from "../controllers/v1/label";
import orderService from "../controllers/v1/order";
import getOrder from "../controllers/v1/order/getOrder";
import getOrderSummary from "../controllers/aupost/v1/ShippingAndTracking/getOrderSummary";
// @ts-ignore
import deleteShipment from "../controllers/v1/shipment/deleteShipment";
import updateShipment from "../controllers/v1/shipment/updateShipment";

const router = Router();
const currentAPIversion = "v1";
/**
 * @method Get
 * @header
 * @return
 * @desc Test
 * @access Public
 */
router.get("/", (req: Request, res: Response) =>
    res.send("<h1>MERN Project API is working</h1>")
);

/**
 * @method Post
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @return {"KYCresult": true / false} or error message {"error":error message}
 */
router.get(`/api/${currentAPIversion}/auth`, handleAuth, auth.verify);

/**
 * @method Post- create users
 * @header
 * @return
 * @desc create a user
 * @access Public
 */
router.post(`/api/${currentAPIversion}/users`, validation(), users);

/**
 * @method Post-Login with email and password
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @return
 */

router.post(`/api/${currentAPIversion}/auth`, validationLogin(), auth.login);

/**
 * @method get address
 * @header api_key
 * @param customer information, please refer to interface definition in models/checkResponse
 * @desc Get current users profile
 * @access Private
 * @return
 */

router.get(`/api/address/me`, handleAuth, getAddress);

/**
 * @method post address
 * @param
 * @desc save user address to database
 * @access Private
 * @return
 */

router.post(`/api/v1/save-address`, handleAuth, saveAddress);

router.get('/api/v1/get-shipment', handleAuth, getShipment);

router.post('/api/v1/create-aushipment', handleAuth, createAuShipment);

router.put('/api/v1/update-shipment/:shipmentId',handleAuth,updateShipment);

router.post('/api/v1/create-label', handleAuth, labelService);

/**
 * @method put
 * @param shipment id:string
 * @desc call aupost api to create an order
 * @access Private
 * @return order info
 */
router.put('/api/v1/create-order', handleAuth, orderService);

router.get('/api/v1/get-orders', handleAuth, getOrder);

router.get('/api/v1/get-order-summary/:orderId', handleAuth, getOrderSummary);

router.delete('/api/v1/delete-shipment/:shipmentId', handleAuth, deleteShipment);
export default router;
