"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const getLabel = () => {
    const body = {
        from: {
            postcode: "3207",
        },
        to: {
            postcode: "2001",
        },
        items: [
            {
                length: 5,
                height: 5,
                width: 5,
                weight: 5,
                item_reference: "abc xyz",
                features: {
                    TRANSIT_COVER: {
                        attributes: {
                            cover_amount: 1000,
                        },
                    },
                },
            },
        ],
    };
    let id;
    return config_1.HttpRequest.get(`https://digitalapi.auspost.com.au/test/shipping/v1/labels/${id}`)
        .then((res) => {
        console.log("getLabel", res.data);
        return res;
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = getLabel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYXVwb3N0L3YxL1NoaXBwaW5nQW5kVHJhY2tpbmcvZ2V0TGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBd0Q7QUFHeEQsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO0lBQ3BCLE1BQU0sSUFBSSxHQUFHO1FBQ1gsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLE1BQU07U0FDakI7UUFDRCxFQUFFLEVBQUU7WUFDRixRQUFRLEVBQUUsTUFBTTtTQUNqQjtRQUNELEtBQUssRUFBRTtZQUNMO2dCQUNFLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2dCQUNULGNBQWMsRUFBRSxTQUFTO2dCQUN6QixRQUFRLEVBQUU7b0JBQ1IsYUFBYSxFQUFFO3dCQUNiLFVBQVUsRUFBRTs0QkFDVixZQUFZLEVBQUUsSUFBSTt5QkFDbkI7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0YsQ0FBQztJQUNKLElBQUksRUFBRSxDQUFDO0lBQ0wsT0FBTyxvQkFBVyxDQUFDLEdBQUcsQ0FDcEIsNkRBQTZELEVBQUUsRUFBRSxDQUNsRTtTQUNFLElBQUksQ0FBQyxDQUFDLEdBQWtCLEVBQUUsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFDRixrQkFBZSxRQUFRLENBQUMifQ==