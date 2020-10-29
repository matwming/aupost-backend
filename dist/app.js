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
// @ts-ignore
const cors_1 = __importDefault(require("cors"));
// rookout.start({
//     token: '6922556455a7eaad3bf66522a762ca474a5423d8eceebb85d86888962d8670d2'
// })
const app = express_1.default();
const port = 8180;
//localhost
// export const pool=mysql.createPool({
//     connectionLimit:100,
//     host:'127.0.0.1',
//     port:3306,
//     user:'root',
//     password:'Zhaoying@8604',
//     database:'aupost_project',
//     debug:false
// });
//production
// export const pool = mysql.createPool({
//     connectionLimit:100,
//     host:'13.75.232.156',
//     port:3306,
//     user:'root',
//     password:'Zhaoying@8604',
//     database:'aupost_project',
//     debug:false,
//     multipleStatements:true
// });
//aws
exports.pool = mysql_1.default.createPool({
    connectionLimit: 100,
    host: 'aupost.cv8raqlzj5t5.ap-southeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'root',
    password: 'qaz123456',
    database: 'aupost_project',
    debug: false,
    multipleStatements: true
});
exports.pool.getConnection((err, connection) => {
    if (err) {
        console.error('error connecting: ', err.stack);
        return;
    }
    console.log('successfully connected to aupost_project');
    //connection.release();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBaUU7QUFDakUsNkRBQXFDO0FBQ3JDLDhEQUFxQztBQUNyQyxrREFBd0Q7QUFDeEQsYUFBYTtBQUNiLGdEQUF3QjtBQUV4QixrQkFBa0I7QUFDbEIsZ0ZBQWdGO0FBQ2hGLEtBQUs7QUFDTCxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdEIsTUFBTSxJQUFJLEdBQUUsSUFBSSxDQUFDO0FBRWpCLFdBQVc7QUFFWCx1Q0FBdUM7QUFDdkMsMkJBQTJCO0FBQzNCLHdCQUF3QjtBQUN4QixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLGdDQUFnQztBQUNoQyxpQ0FBaUM7QUFDakMsa0JBQWtCO0FBQ2xCLE1BQU07QUFFTixZQUFZO0FBQ1oseUNBQXlDO0FBQ3pDLDJCQUEyQjtBQUMzQiw0QkFBNEI7QUFDNUIsaUJBQWlCO0FBQ2pCLG1CQUFtQjtBQUNuQixnQ0FBZ0M7QUFDaEMsaUNBQWlDO0FBQ2pDLG1CQUFtQjtBQUNuQiw4QkFBOEI7QUFDOUIsTUFBTTtBQUVOLEtBQUs7QUFDUSxRQUFBLElBQUksR0FBRyxlQUFLLENBQUMsVUFBVSxDQUFDO0lBQ2pDLGVBQWUsRUFBQyxHQUFHO0lBQ25CLElBQUksRUFBQyxzREFBc0Q7SUFDM0QsSUFBSSxFQUFDLElBQUk7SUFDVCxJQUFJLEVBQUMsTUFBTTtJQUNYLFFBQVEsRUFBQyxXQUFXO0lBQ3BCLFFBQVEsRUFBQyxnQkFBZ0I7SUFDekIsS0FBSyxFQUFDLEtBQUs7SUFDWCxrQkFBa0IsRUFBQyxJQUFJO0NBQzFCLENBQUMsQ0FBQztBQUVILFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFjLEVBQUMsVUFBeUIsRUFBQyxFQUFFO0lBQzNELElBQUcsR0FBRyxFQUFDO1FBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsT0FBTztLQUNWO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQ3hELHVCQUF1QjtJQUN2Qix1QkFBdUI7QUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFFSCxZQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBQyxDQUFDLFVBQTBCLEVBQUMsRUFBRTtJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7QUFDaEUsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7QUFDaEI7O0lBRUk7QUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUUzQjs7SUFFSTtBQUNKLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGdCQUFNLENBQUMsQ0FBQztBQUVyQjs7SUFFSTtBQUNKLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFVLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDcEUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxrQkFBa0IsRUFBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMifQ==