"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config/config");
const app_1 = require("../../../app");
const deleteShipment = (req, res) => {
    const { shipmentId } = req.params;
    const accountNumber = req.headers['account-number'];
    console.log('shipment id', shipmentId);
    if (shipmentId !== undefined) {
        console.log('delete shipment started');
        config_1.HttpRequest.delete(`https://digitalapi.auspost.com.au/test/shipping/v1/shipments/${shipmentId}`, {
            headers: {
                ['Account-Number']: accountNumber
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlU2hpcG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvc2hpcG1lbnQvZGVsZXRlU2hpcG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtREFBbUQ7QUFFbkQsc0NBQWtDO0FBRWxDLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ25ELE1BQU0sRUFBQyxVQUFVLEVBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ2hDLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxVQUFVLENBQUMsQ0FBQTtJQUNyQyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1FBQ3RDLG9CQUFXLENBQUMsTUFBTSxDQUFDLGdFQUFnRSxVQUFVLEVBQUUsRUFBQztZQUM1RixPQUFPLEVBQUM7Z0JBQ0osQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLGFBQWE7YUFDbkM7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBdUIsRUFBRSxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELElBQUcsUUFBUSxDQUFDLE1BQU0sSUFBRSxHQUFHLEVBQUM7Z0JBQ3BCLE1BQU0sY0FBYyxHQUFFLDZDQUE2QyxVQUFVLEdBQUcsQ0FBQztnQkFDakYsVUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUMsQ0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLEVBQUU7b0JBQ3BDLElBQUcsR0FBRyxFQUFDO3dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pCLE9BQU87cUJBQ1Y7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxNQUFNLENBQUMsQ0FBQztvQkFDdkMsSUFBRyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRyxjQUFjLE1BQUcsQ0FBQyxFQUFDO3dCQUMzQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUMsZUFBZSxVQUFVLDBCQUEwQixFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO3FCQUMzRjtnQkFDTCxDQUFDLENBQUMsQ0FBQTthQUNMO1FBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBYSxFQUFFLEVBQUU7O1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLFFBQUUsQ0FBQyxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlELE9BQU8sR0FBRyxDQUFDLElBQUksT0FBQyxDQUFDLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFBO0tBQ0w7QUFDTCxDQUFDLENBQUM7QUFFRixrQkFBZSxjQUFjLENBQUMifQ==