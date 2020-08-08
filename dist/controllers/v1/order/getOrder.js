"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../app");
const getOrder = (req, res) => {
    const getOrdersSql = `select * from orders order by order_creation_date desc`;
    app_1.pool.query(getOrdersSql, (err, response) => {
        if (err) {
            console.log(err);
            throw (err);
        }
        console.log('get orders', response);
        return res.json({ orders: response, success: true });
    });
};
exports.default = getOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvb3JkZXIvZ2V0T3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBa0M7QUFFbEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDN0MsTUFBTSxZQUFZLEdBQUcsd0RBQXdELENBQUM7SUFDOUUsVUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUU7UUFDdkMsSUFBSSxHQUFHLEVBQUU7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNmO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQztBQUVGLGtCQUFlLFFBQVEsQ0FBQyJ9