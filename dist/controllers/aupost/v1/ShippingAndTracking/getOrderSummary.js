"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getOrderSummary = async (req, res) => {
    const { orderId } = req.params;
    if (orderId === undefined) {
        return res.json({ msg: 'Please provide a valid order id', success: false });
    }
    let tempFilePath = path_1.default.join(process.cwd(), 'ordersummary.pdf');
    console.log('tempFilePath', tempFilePath);
    let file = fs_1.default.createWriteStream(tempFilePath);
    let stream = await config_1.HttpRequest({
        url: `https://digitalapi.auspost.com.au/test/shipping/v1/orders/${orderId}/summary`,
        responseType: 'stream'
    });
    stream.data.pipe(file).on('finish', () => {
        console.log('thie file is finished downloading...');
        res.sendFile(tempFilePath, () => {
            fs_1.default.unlink(tempFilePath, (err) => {
                if (err) {
                    console.log('there is an error in delete file', err);
                    return;
                }
                console.log('download file success');
            });
        });
    });
};
exports.default = getOrderSummary;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3JkZXJTdW1tYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2F1cG9zdC92MS9TaGlwcGluZ0FuZFRyYWNraW5nL2dldE9yZGVyU3VtbWFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUFzRDtBQUV0RCw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBRXhCLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDMUQsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDN0IsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQ3ZCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxpQ0FBaUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztLQUM3RTtJQUNELElBQUksWUFBWSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUMsWUFBWSxDQUFDLENBQUM7SUFDekMsSUFBSSxJQUFJLEdBQUMsWUFBRSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVDLElBQUksTUFBTSxHQUFrQixNQUFNLG9CQUFXLENBQUM7UUFDMUMsR0FBRyxFQUFDLDZEQUE2RCxPQUFPLFVBQVU7UUFDbEYsWUFBWSxFQUFDLFFBQVE7S0FDeEIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBQyxHQUFFLEVBQUU7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO1FBQ25ELEdBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFDLEdBQUUsRUFBRTtZQUMxQixZQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO2dCQUMxQixJQUFHLEdBQUcsRUFBQztvQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxPQUFPO2lCQUNWO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUM7QUFDRixrQkFBZSxlQUFlLENBQUMifQ==