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
    const accountNumber = req.headers['account-number'];
    if (orderId === undefined) {
        return res.json({ msg: 'Please provide a valid order id', success: false });
    }
    let tempFilePath = path_1.default.join(process.cwd(), 'ordersummary.pdf');
    console.log('tempFilePath', tempFilePath);
    let file = fs_1.default.createWriteStream(tempFilePath);
    let stream = await config_1.HttpRequest({
        url: `https://digitalapi.auspost.com.au/test/shipping/v1/orders/${orderId}/summary`,
        responseType: 'stream',
        headers: {
            "Account-Number": accountNumber
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3JkZXJTdW1tYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2F1cG9zdC92MS9TaGlwcGluZ0FuZFRyYWNraW5nL2dldE9yZGVyU3VtbWFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUFzRDtBQUV0RCw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBRXhCLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDMUQsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDN0IsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUN2QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsaUNBQWlDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7S0FDN0U7SUFDRCxJQUFJLFlBQVksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pDLElBQUksSUFBSSxHQUFDLFlBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxJQUFJLE1BQU0sR0FBa0IsTUFBTSxvQkFBVyxDQUFDO1FBQzFDLEdBQUcsRUFBQyw2REFBNkQsT0FBTyxVQUFVO1FBQ2xGLFlBQVksRUFBQyxRQUFRO1FBQ3JCLE9BQU8sRUFBQztZQUNKLGdCQUFnQixFQUFDLGFBQWE7U0FDakM7S0FDSixDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFDLEdBQUUsRUFBRTtRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUE7UUFDbkQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUMsR0FBRSxFQUFFO1lBQzFCLFlBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFDLENBQUMsR0FBRyxFQUFDLEVBQUU7Z0JBQzFCLElBQUcsR0FBRyxFQUFDO29CQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BELE9BQU87aUJBQ1Y7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQztBQUNGLGtCQUFlLGVBQWUsQ0FBQyJ9