"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const createLabel = async (shipmentId, itemId) => {
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
    let res = await config_1.HttpRequest.post("https://digitalapi.auspost.com.au/test/shipping/v1/labels", { ...body });
    console.log("createLabel", res.data.labels);
    return res.data.labels;
};
exports.default = createLabel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlTGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYXVwb3N0L3YxL1NoaXBwaW5nQW5kVHJhY2tpbmcvY3JlYXRlTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBc0Q7QUFLdEQsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLFVBQWtCLEVBQUUsTUFBYyxFQUFFLEVBQUU7SUFDN0QsTUFBTSxJQUFJLEdBQUc7UUFDVCxrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFdBQVcsRUFBRTtZQUNUO2dCQUNJLElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxLQUFLLEVBQUUsYUFBYTt3QkFDcEIsTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLE9BQU8sRUFBRSxJQUFJO3dCQUNiLFdBQVcsRUFBRSxDQUFDO3dCQUNkLFVBQVUsRUFBRSxDQUFDO3FCQUNoQjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxTQUFTLEVBQUU7WUFDUDtnQkFDSSxXQUFXLEVBQUUsR0FBRyxVQUFVLEVBQUU7Z0JBQzVCLEtBQUssRUFBRTtvQkFDSDt3QkFDSSxPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUU7cUJBQ3ZCO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUM7SUFDRixJQUFJLEdBQUcsR0FBRyxNQUFNLG9CQUFXLENBQUMsSUFBSSxDQUM1QiwyREFBMkQsRUFDM0QsRUFBQyxHQUFHLElBQUksRUFBQyxDQUNaLENBQUM7SUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsV0FBVyxDQUFDIn0=