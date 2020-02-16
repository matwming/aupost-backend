"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const API_KEY = "ba3c114b6fe336e9a558bb40b4cc2ca949d5c15eb6396fcaebdf3fa937045483";
const API_Endpoint = "​https://sandbox.ridx.io";
const API_Path = 'international';
exports.HttpRequest = axios_1.default.create({
    baseURL: '',
    timeout: 3000,
    headers: { 'token': API_KEY, "Content-Type": 'application/json' }
});
