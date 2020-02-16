import axios from 'axios';

const API_KEY:string = "ba3c114b6fe336e9a558bb40b4cc2ca949d5c15eb6396fcaebdf3fa937045483";
const API_Endpoint = "​https://sandbox.ridx.io";
const API_Path = 'international';

export const HttpRequest = axios.create({
    baseURL: '',
    timeout: 3000,
    headers: {'token': API_KEY, "Content-Type": 'application/json'}
});

