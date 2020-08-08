"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUF3RDtBQUUzQyxRQUFBLElBQUksR0FBQyxlQUFLLENBQUMsVUFBVSxDQUFDO0lBQ2pDLElBQUksRUFBQyxlQUFlO0lBQ3BCLElBQUksRUFBQyxJQUFJO0lBQ1QsUUFBUSxFQUFDLGVBQWU7SUFDeEIsUUFBUSxFQUFDLGdCQUFnQjtDQUMxQixDQUFDLENBQUM7QUFDSCxNQUFNLGtCQUFrQixHQUFDLEdBQUUsRUFBRTtJQUMzQixPQUFPLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFjLEVBQUMsVUFBeUIsRUFBQyxFQUFFO1FBQ3BFLElBQUcsR0FBRyxFQUFDO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsT0FBTztTQUNSO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQ3hELFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLGtCQUFlLGtCQUFrQixDQUFDIn0=