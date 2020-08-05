"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysql_1 = __importDefault(require("mysql"));
const rookout = require('rookout');
// @ts-ignore
const cors_1 = __importDefault(require("cors"));
// rookout.start({
//     token: '6922556455a7eaad3bf66522a762ca474a5423d8eceebb85d86888962d8670d2'
// })
const app = express_1.default();
const port = 8180;
// export const pool=mysql.createPool({
//     host:'13.75.232.156',
//     port:3306,
//     user:'root',
//     password:'Zhaoying@8604',
//     database:'aupost_project'
// });
exports.pool = mysql_1.default.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Zhaoying@8604',
    database: 'aupost_project',
    debug: false
});
exports.pool.getConnection((err, connection) => {
    if (err) {
        console.error('error connecting: ', err.stack);
        return;
    }
    console.log('successfully connected to aupost_project');
    connection.release();
    //connection.destroy();
});
exports.pool.on('connection', (connection) => {
    console.log('successfully triggered poll connection event');
});
app.use(cors_1.default());
/*
* middleware to parse body content
* */
app.use(body_parser_1.default.json());
/*
* middleware to redirect all requests to router
* */
app.use('/', routes_1.default);
/*
* middleware to catch any errors and send to the front end
* */
app.use((err, req, res, next) => {
    res.json({ error: err.message, msg: 'unhandled routes' });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
