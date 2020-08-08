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
exports.pool = mysql_1.default.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Zhaoying@8604',
    database: 'aupost_project',
    debug: false
});
// export const pool = mysql.createPool({
//     connectionLimit:100,
//     host:'127.0.0.1',
//     port:3306,
//     user:'root',
//     password:'Zhaoying@8604',
//     database:'aupost_project',
//     debug:false
// });
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
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBaUU7QUFDakUsNkRBQXFDO0FBQ3JDLDhEQUFxQztBQUNyQyxrREFBd0Q7QUFDeEQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLGFBQWE7QUFDYixnREFBd0I7QUFFeEIsa0JBQWtCO0FBQ2xCLGdGQUFnRjtBQUNoRixLQUFLO0FBQ0wsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBQ3RCLE1BQU0sSUFBSSxHQUFFLElBQUksQ0FBQztBQUVKLFFBQUEsSUFBSSxHQUFDLGVBQUssQ0FBQyxVQUFVLENBQUM7SUFDL0IsZUFBZSxFQUFDLEdBQUc7SUFDbkIsSUFBSSxFQUFDLFdBQVc7SUFDaEIsSUFBSSxFQUFDLElBQUk7SUFDVCxJQUFJLEVBQUMsTUFBTTtJQUNYLFFBQVEsRUFBQyxlQUFlO0lBQ3hCLFFBQVEsRUFBQyxnQkFBZ0I7SUFDekIsS0FBSyxFQUFDLEtBQUs7Q0FDZCxDQUFDLENBQUM7QUFFSCx5Q0FBeUM7QUFDekMsMkJBQTJCO0FBQzNCLHdCQUF3QjtBQUN4QixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLGdDQUFnQztBQUNoQyxpQ0FBaUM7QUFDakMsa0JBQWtCO0FBQ2xCLE1BQU07QUFFTixZQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBYyxFQUFDLFVBQXlCLEVBQUMsRUFBRTtJQUMzRCxJQUFHLEdBQUcsRUFBQztRQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLE9BQU87S0FDVjtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUN4RCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckIsdUJBQXVCO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBRUgsWUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUMsQ0FBQyxVQUEwQixFQUFDLEVBQUU7SUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCOztJQUVJO0FBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFM0I7O0lBRUk7QUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQkFBTSxDQUFDLENBQUM7QUFFckI7O0lBRUk7QUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBVSxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3BFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDIn0=