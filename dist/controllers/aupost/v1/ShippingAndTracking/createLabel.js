"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const axios_1 = __importDefault(require("axios"));
const createLabel = async (shipmentId, itemId, accountNumber) => {
    const body = {
        wait_for_label_url: true,
        preferences: [
            {
                type: "PRINT",
                format: "PDF",
                groups: [
                    {
                        group: "Parcel Post",
                        layout: "A4-1pp",
                        branded: true,
                        left_offset: 0,
                        top_offset: 0,
                    },
                ],
            },
        ],
        shipments: [
            {
                shipment_id: `${shipmentId}`,
                items: [
                    {
                        item_id: `${itemId}`,
                    },
                ],
            },
        ],
    };
    // @ts-ignore
    const authorization = config_1.accountNumberToAuthProd[accountNumber];
    let res = await axios_1.default.post(`${config_1.API_Endpoint}/shipping/v1/labels`, { ...body }, {
        headers: {
            ['Account-Number']: accountNumber,
            "Authorization": `Basic ${authorization}`,
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    });
    console.log("createLabel", res.data.labels);
    return res.data.labels;
};
exports.default = createLabel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlTGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYXVwb3N0L3YxL1NoaXBwaW5nQW5kVHJhY2tpbmcvY3JlYXRlTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxzREFBK0U7QUFDL0Usa0RBQTBDO0FBRzFDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBRSxVQUFrQixFQUFFLE1BQWMsRUFBQyxhQUFxQixFQUFFLEVBQUU7SUFDbkYsTUFBTSxJQUFJLEdBQUc7UUFDVCxrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFdBQVcsRUFBRTtZQUNUO2dCQUNJLElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxLQUFLLEVBQUUsYUFBYTt3QkFDcEIsTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLE9BQU8sRUFBRSxJQUFJO3dCQUNiLFdBQVcsRUFBRSxDQUFDO3dCQUNkLFVBQVUsRUFBRSxDQUFDO3FCQUNoQjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxTQUFTLEVBQUU7WUFDUDtnQkFDSSxXQUFXLEVBQUUsR0FBRyxVQUFVLEVBQUU7Z0JBQzVCLEtBQUssRUFBRTtvQkFDSDt3QkFDSSxPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUU7cUJBQ3ZCO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUM7SUFDRixhQUFhO0lBQ2IsTUFBTSxhQUFhLEdBQUMsZ0NBQXVCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0QsSUFBSSxHQUFHLEdBQUcsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUN0QixHQUFHLHFCQUFZLHFCQUFxQixFQUNwQyxFQUFDLEdBQUcsSUFBSSxFQUFDLEVBQUM7UUFDTixPQUFPLEVBQUM7WUFDSixDQUFDLGdCQUFnQixDQUFDLEVBQUMsYUFBYTtZQUNoQyxlQUFlLEVBQUMsU0FBUyxhQUFhLEVBQUU7WUFDeEMsY0FBYyxFQUFDLGtCQUFrQjtZQUNqQyxRQUFRLEVBQUMsa0JBQWtCO1NBQzlCO0tBQ0osQ0FDSixDQUFDO0lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLENBQUMsQ0FBQztBQUNGLGtCQUFlLFdBQVcsQ0FBQyJ9