"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config/config");
const axios_1 = __importDefault(require("axios"));
const app_1 = require("../../../app");
const deleteShipment = (req, res) => {
    const { shipmentId } = req.params;
    const accountNumber = req.headers['account-number'];
    console.log('shipment id', shipmentId);
    if (shipmentId !== undefined) {
        console.log('delete shipment started');
        // @ts-ignore
        const authorization = config_1.accountNumberToAuthProd[accountNumber];
        axios_1.default.delete(`${config_1.API_Endpoint}/shipping/v1/shipments/${shipmentId}`, {
            headers: {
                'Account-Number': accountNumber,
                "Authorization": `Basic ${authorization}`,
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            console.log('delete shipment', response.status);
            if (response.status == 200) {
                const deleteShipment = `delete from shipments where shipment_id ="${shipmentId}"`;
                app_1.pool.query(deleteShipment, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('delete-shipments', result);
                    if ((result === null || result === void 0 ? void 0 : result['affectedRows']) == 1) {
                        return res.json({ msg: `shipment id ${shipmentId} is successfully deleted`, success: true });
                    }
                });
            }
        }).catch((e) => {
            var _a, _b;
            console.log('delete shipment error', (_a = e.response) === null || _a === void 0 ? void 0 : _a.data.errors);
            return res.send((_b = e.response) === null || _b === void 0 ? void 0 : _b.data.errors[0]);
        });
    }
};
exports.default = deleteShipment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlU2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvc2hpcG1lbnQvZGVsZXRlU2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxtREFBNEU7QUFDNUUsa0RBQXNEO0FBQ3RELHNDQUFrQztBQUVsQyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNuRCxNQUFNLEVBQUMsVUFBVSxFQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUNoQyxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsVUFBVSxDQUFDLENBQUE7SUFDckMsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN2QyxhQUFhO1FBQ2IsTUFBTSxhQUFhLEdBQUUsZ0NBQXVCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsZUFBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLHFCQUFZLDBCQUEwQixVQUFVLEVBQUUsRUFBQztZQUMvRCxPQUFPLEVBQUM7Z0JBQ0osZ0JBQWdCLEVBQUMsYUFBYTtnQkFDOUIsZUFBZSxFQUFDLFNBQVMsYUFBYSxFQUFFO2dCQUN4QyxjQUFjLEVBQUMsa0JBQWtCO2dCQUNqQyxRQUFRLEVBQUMsa0JBQWtCO2FBQzlCO1NBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQXVCLEVBQUUsRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxJQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUUsR0FBRyxFQUFDO2dCQUNwQixNQUFNLGNBQWMsR0FBRSw2Q0FBNkMsVUFBVSxHQUFHLENBQUM7Z0JBQ2pGLFVBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFDLENBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxFQUFFO29CQUNwQyxJQUFHLEdBQUcsRUFBQzt3QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixPQUFPO3FCQUNWO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3ZDLElBQUcsQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUcsY0FBYyxNQUFHLENBQUMsRUFBQzt3QkFDM0IsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFDLGVBQWUsVUFBVSwwQkFBMEIsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztxQkFDM0Y7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7YUFDTDtRQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQWEsRUFBRSxFQUFFOztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixRQUFFLENBQUMsQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5RCxPQUFPLEdBQUcsQ0FBQyxJQUFJLE9BQUMsQ0FBQyxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQTtLQUNMO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsY0FBYyxDQUFDIn0=