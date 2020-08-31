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
exports.pool = mysql_1.default.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Zhaoying@8604',
    database: 'aupost_project',
    debug: false,
    multipleStatements: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBaUU7QUFDakUsNkRBQXFDO0FBQ3JDLDhEQUFxQztBQUNyQyxrREFBd0Q7QUFDeEQsYUFBYTtBQUNiLGdEQUF3QjtBQUV4QixrQkFBa0I7QUFDbEIsZ0ZBQWdGO0FBQ2hGLEtBQUs7QUFDTCxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdEIsTUFBTSxJQUFJLEdBQUUsSUFBSSxDQUFDO0FBRUosUUFBQSxJQUFJLEdBQUMsZUFBSyxDQUFDLFVBQVUsQ0FBQztJQUMvQixlQUFlLEVBQUMsR0FBRztJQUNuQixJQUFJLEVBQUMsV0FBVztJQUNoQixJQUFJLEVBQUMsSUFBSTtJQUNULElBQUksRUFBQyxNQUFNO0lBQ1gsUUFBUSxFQUFDLGVBQWU7SUFDeEIsUUFBUSxFQUFDLGdCQUFnQjtJQUN6QixLQUFLLEVBQUMsS0FBSztJQUNYLGtCQUFrQixFQUFDLElBQUk7Q0FDMUIsQ0FBQyxDQUFDO0FBRUgseUNBQXlDO0FBQ3pDLDJCQUEyQjtBQUMzQix3QkFBd0I7QUFDeEIsaUJBQWlCO0FBQ2pCLG1CQUFtQjtBQUNuQixnQ0FBZ0M7QUFDaEMsaUNBQWlDO0FBQ2pDLGtCQUFrQjtBQUNsQixNQUFNO0FBRU4sWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQWMsRUFBQyxVQUF5QixFQUFDLEVBQUU7SUFDM0QsSUFBRyxHQUFHLEVBQUM7UUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxPQUFPO0tBQ1Y7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7SUFDeEQsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JCLHVCQUF1QjtBQUMzQixDQUFDLENBQUMsQ0FBQztBQUVILFlBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFDLENBQUMsVUFBMEIsRUFBQyxFQUFFO0lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztBQUNoQjs7SUFFSTtBQUNKLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRTNCOztJQUVJO0FBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0JBQU0sQ0FBQyxDQUFDO0FBRXJCOztJQUVJO0FBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVUsRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNwRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGtCQUFrQixFQUFDLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyJ9