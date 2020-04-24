"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
exports.pool = mysql_1.default.createPool({
    host: '13.70.105.218',
    port: 3306,
    password: 'Zhaoying@8604',
    database: 'aupost_project'
});
const getMysqlConnection = () => {
    return exports.pool.getConnection((err, connection) => {
        if (err) {
            console.error('error connecting: ', err.stack);
            return;
        }
        console.log('successfully connected to aupost_project');
        connection.release();
    });
};
exports.default = getMysqlConnection;
