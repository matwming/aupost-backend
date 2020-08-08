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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBRTFCLElBQUksWUFBWSxHQUFHLG1EQUFtRCxDQUFDO0FBRXZFLE1BQU0saUJBQWlCLEdBQUM7SUFDcEIsZ0JBQWdCLEVBQUMsWUFBWTtJQUM3QixlQUFlLEVBQUMsb0ZBQW9GO0lBQ3BHLGNBQWMsRUFBQyxrQkFBa0I7SUFDakMsUUFBUSxFQUFDLGtCQUFrQjtDQUM5QixDQUFBO0FBQ1ksUUFBQSxXQUFXLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxPQUFPLEVBQUUsWUFBWTtJQUNyQixPQUFPLEVBQUUsS0FBSztJQUNkLE9BQU8sRUFBRSxFQUFDLEdBQUcsaUJBQWlCLEVBQUM7Q0FDbEMsQ0FBQyxDQUFDIn0=