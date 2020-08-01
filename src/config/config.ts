import axios from 'axios';

let API_Endpoint = "https://digitalapi.auspost.com.au/test/shipping/​";

const HttpRequestHeader={
    'Account-Number':'1003471228',
    "Authorization":"Basic NWJjZTQ3MjYtODIxYi00NWFjLWExNGMtYjkyMjdkMTI5MzFiOnhiZGU0N2VlZGVjNzUwODUwYTVl",
    "Content-type":"application/json",
    "Accept":"application/json"
}
export const HttpRequest = axios.create({
    baseURL: API_Endpoint,
    timeout: 10000,
    headers: {...HttpRequestHeader}
});

