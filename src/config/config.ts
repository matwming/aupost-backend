import axios from 'axios';

export let API_Endpoint = "";
let API_Endpoint_Test ="https://digitalapi.auspost.com.au/test";
let API_Endpoint_Prod="https://digitalapi.auspost.com.au";
const isTest:boolean = true;
if(isTest){
    API_Endpoint=API_Endpoint_Test
} else {
    API_Endpoint=API_Endpoint_Prod;
}

const accountNumberToAuthTest={
    "1003471228":"NWJjZTQ3MjYtODIxYi00NWFjLWExNGMtYjkyMjdkMTI5MzFiOnhiZGU0N2VlZGVjNzUwODUwYTVl",
}
export const accountNumberToAuthProd={
    "1003471228":"NWJjZTQ3MjYtODIxYi00NWFjLWExNGMtYjkyMjdkMTI5MzFiOnhiZGU0N2VlZGVjNzUwODUwYTVl",
    "0006983030":"MDFmZWYwYjItNTBkOS00OThkLWE5M2UtNWE3Mzc4OTNkOTBkOnhmZjAyNjVlZWZhZDdlNWMzZmIy",
    "0006812659":"NjE3OTcyY2YtMzY0Yi00YmM3LTlkNDgtNjQ3ZGYyOWMxNTY1OnhhZmUyNmJmMGYwYjIzZWZjOWVl",
    "0009658282":"ZWJiM2VlYTgtMGQ4NC00M2IxLWI0YWMtOWQxNWRjYmM2ZDU4Ong4YWYzMmRkOWUwNzA5Y2I5NDBh",
    "0009802413":"ZmRmYWVjMWMtZjQzNC00MWY0LThjYjctM2NlMjA5ZGViYTNmOnhiYWYxN2YwMjZhYzAzNzVmZDRh",
    "0007220007":'MDg3ZDBlZGUtNjkzZS00MmRjLWFlM2ItNWQyNzlhODUxY2E2Ong1MzQ2NzY5NTNmNjk1YjA3MmNh',
    "0007465689":'ODc2MDhlNDgtZjgyZC00Mzc4LTliYzYtOGQ3OWIxYTQyZjQ0Ong5OTEzYjJlOTJkYjllMGNhYjgy',
    "0007569279":'ZTE4ODY3YjctMWU1OC00MDlmLTg3ZGItYTIwNGU3NjVmNzA5Ong1NzFjYWVhZDU4YzM3ZjhkNGEw',
    "0007625851":"NGQ0MTE2MjAtMDFlYi00YmI2LWE4NjAtODRhOGZmYWFjZDI2OnhkMmExODFlMGJmMzE2NjkwZjcy",
    "0008329999":"YWYzZDBlZDgtNGRlYi00Y2Y1LTg4MTQtMTA4MTcyNDZkZTJiOngxMWZkZjZmNGExN2M5YjkxNGJh"
}
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
