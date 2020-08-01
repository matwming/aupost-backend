"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequest = void 0;
const axios_1 = __importDefault(require("axios"));
let API_Endpoint = "https://digitalapi.auspost.com.au/test/shipping/​";
const HttpRequestHeader = {
    'Account-Number': '1003471228',
    "Authorization": "Basic NWJjZTQ3MjYtODIxYi00NWFjLWExNGMtYjkyMjdkMTI5MzFiOnhiZGU0N2VlZGVjNzUwODUwYTVl",
    "Content-type": "application/json",
    "Accept": "application/json"
};
exports.HttpRequest = axios_1.default.create({
    baseURL: API_Endpoint,
    timeout: 10000,
    headers: { ...HttpRequestHeader }
});
