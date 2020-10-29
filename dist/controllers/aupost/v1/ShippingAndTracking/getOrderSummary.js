"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const axios_1 = __importDefault(require("axios"));
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
    //@ts-ignore
    const authorization = config_1.accountNumberToAuthProd[accountNumber];
    let stream = await axios_1.default({
        url: `${config_1.API_Endpoint}/shipping/v1/orders/${orderId}/summary`,
        responseType: 'stream',
        headers: {
            "Account-Number": accountNumber,
            "Authorization": `Basic ${authorization}`,
            "Content-type": "application/json",
            "Accept": "application/json"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3JkZXJTdW1tYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2F1cG9zdC92MS9TaGlwcGluZ0FuZFRyYWNraW5nL2dldE9yZGVyU3VtbWFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHNEQUErRTtBQUMvRSxrREFBMEM7QUFDMUMsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUd4QixNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzFELE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzdCLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDdkIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLGlDQUFpQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0tBQzdFO0lBQ0QsSUFBSSxZQUFZLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUN6QyxJQUFJLElBQUksR0FBQyxZQUFFLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUMsWUFBWTtJQUNaLE1BQU0sYUFBYSxHQUFDLGdDQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNELElBQUksTUFBTSxHQUFrQixNQUFNLGVBQUssQ0FBQztRQUNwQyxHQUFHLEVBQUMsR0FBRyxxQkFBWSx1QkFBdUIsT0FBTyxVQUFVO1FBQzNELFlBQVksRUFBQyxRQUFRO1FBQ3JCLE9BQU8sRUFBQztZQUNKLGdCQUFnQixFQUFDLGFBQWE7WUFDOUIsZUFBZSxFQUFDLFNBQVMsYUFBYSxFQUFFO1lBQ3hDLGNBQWMsRUFBQyxrQkFBa0I7WUFDakMsUUFBUSxFQUFDLGtCQUFrQjtTQUM5QjtLQUNKLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUMsR0FBRSxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtRQUNuRCxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBQyxHQUFFLEVBQUU7WUFDMUIsWUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtnQkFDMUIsSUFBRyxHQUFHLEVBQUM7b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDcEQsT0FBTztpQkFDVjtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsZUFBZSxDQUFDIn0=