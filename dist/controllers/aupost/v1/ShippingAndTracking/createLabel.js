"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
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
    let res = await config_1.HttpRequest.post("https://digitalapi.auspost.com.au/test/shipping/v1/labels", { ...body }, {
        headers: {
            ['Account-Number']: accountNumber
        }
    });
    console.log("createLabel", res.data.labels);
    return res.data.labels;
};
exports.default = createLabel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlTGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYXVwb3N0L3YxL1NoaXBwaW5nQW5kVHJhY2tpbmcvY3JlYXRlTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBc0Q7QUFLdEQsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLFVBQWtCLEVBQUUsTUFBYyxFQUFDLGFBQXFCLEVBQUUsRUFBRTtJQUNuRixNQUFNLElBQUksR0FBRztRQUNULGtCQUFrQixFQUFFLElBQUk7UUFDeEIsV0FBVyxFQUFFO1lBQ1Q7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87Z0JBQ2IsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFO29CQUNKO3dCQUNJLEtBQUssRUFBRSxhQUFhO3dCQUNwQixNQUFNLEVBQUUsUUFBUTt3QkFDaEIsT0FBTyxFQUFFLElBQUk7d0JBQ2IsV0FBVyxFQUFFLENBQUM7d0JBQ2QsVUFBVSxFQUFFLENBQUM7cUJBQ2hCO2lCQUNKO2FBQ0o7U0FDSjtRQUNELFNBQVMsRUFBRTtZQUNQO2dCQUNJLFdBQVcsRUFBRSxHQUFHLFVBQVUsRUFBRTtnQkFDNUIsS0FBSyxFQUFFO29CQUNIO3dCQUNJLE9BQU8sRUFBRSxHQUFHLE1BQU0sRUFBRTtxQkFDdkI7aUJBQ0o7YUFDSjtTQUNKO0tBQ0osQ0FBQztJQUNGLElBQUksR0FBRyxHQUFHLE1BQU0sb0JBQVcsQ0FBQyxJQUFJLENBQzVCLDJEQUEyRCxFQUMzRCxFQUFDLEdBQUcsSUFBSSxFQUFDLEVBQUM7UUFDTixPQUFPLEVBQUM7WUFDSixDQUFDLGdCQUFnQixDQUFDLEVBQUMsYUFBYTtTQUNuQztLQUNKLENBQ0osQ0FBQztJQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixDQUFDLENBQUM7QUFDRixrQkFBZSxXQUFXLENBQUMifQ==