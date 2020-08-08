"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const app_1 = require("../../app");
const createLabel_1 = __importDefault(require("../aupost/v1/ShippingAndTracking/createLabel"));
const labelService = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { shipment_id } = req.body;
    if (shipment_id == undefined) {
        res.json({
            error: 'shipment_id is undefined',
            message: 'make sure call me from web'
        });
        return;
    }
    const findItems = `select * from items where shipment_id = "${shipment_id}"`;
    console.log('findItems', findItems);
    app_1.pool.query(findItems, (err, result) => {
        const itemId = result[0].item_id;
        createLabel_1.default(shipment_id, itemId)
            .then((response) => {
            console.log('labelService', response);
            if (response[0].hasOwnProperty('url')) {
                const updateUrlSql = `update shipments set label_url ="${response[0].url}" where shipment_id="${shipment_id}"`;
                console.log('updateUrl', updateUrlSql);
                app_1.pool.query(updateUrlSql, (err, result) => {
                    console.log('update_url', result);
                    if (result.affectedRows === 1) {
                        return response;
                    }
                });
            }
            return res.send(response);
        })
            .catch((e) => res.json(e.message));
    });
};
exports.default = labelService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvdjEvbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx5REFBbUQ7QUFDbkQsbUNBQStCO0FBQy9CLCtGQUF1RTtBQWN2RSxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ3ZELE1BQU0sTUFBTSxHQUFHLG9DQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbkIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsTUFBTSxFQUFDLFdBQVcsRUFBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDL0IsSUFBSSxXQUFXLElBQUksU0FBUyxFQUFFO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDTCxLQUFLLEVBQUUsMEJBQTBCO1lBQ2pDLE9BQU8sRUFBRSw0QkFBNEI7U0FDeEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTztLQUNWO0lBQ0QsTUFBTSxTQUFTLEdBQUcsNENBQTRDLFdBQVcsR0FBRyxDQUFDO0lBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLFVBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHLENBQUMsR0FBRyxFQUFFLE1BQWlCLEVBQUUsRUFBRTtRQUM5QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2hDLHFCQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzthQUM1QixJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLElBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBQztnQkFDakMsTUFBTSxZQUFZLEdBQUMsb0NBQW9DLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLHdCQUF3QixXQUFXLEdBQUcsQ0FBQztnQkFDN0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3RDLFVBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFDLENBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxFQUFFO29CQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBQyxNQUFNLENBQUMsQ0FBQztvQkFDakMsSUFBRyxNQUFNLENBQUMsWUFBWSxLQUFHLENBQUMsRUFBQzt3QkFDdkIsT0FBTyxRQUFRLENBQUM7cUJBQ25CO2dCQUNMLENBQUMsQ0FBQyxDQUFBO2FBQ0w7WUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsWUFBWSxDQUFDIn0=