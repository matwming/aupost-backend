"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const config_2 = require("../../../../config/config");
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
    return config_1.HttpRequest.get(`${config_2.API_Endpoint}/shipping/v1/labels/${id}`)
        .then((res) => {
        console.log("getLabel", res.data);
        return res;
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = getLabel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYXVwb3N0L3YxL1NoaXBwaW5nQW5kVHJhY2tpbmcvZ2V0TGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBd0Q7QUFFeEQsc0RBQXVEO0FBRXZELE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUNwQixNQUFNLElBQUksR0FBRztRQUNYLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxNQUFNO1NBQ2pCO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsUUFBUSxFQUFFLE1BQU07U0FDakI7UUFDRCxLQUFLLEVBQUU7WUFDTDtnQkFDRSxNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztnQkFDVCxjQUFjLEVBQUUsU0FBUztnQkFDekIsUUFBUSxFQUFFO29CQUNSLGFBQWEsRUFBRTt3QkFDYixVQUFVLEVBQUU7NEJBQ1YsWUFBWSxFQUFFLElBQUk7eUJBQ25CO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGLENBQUM7SUFDSixJQUFJLEVBQUUsQ0FBQztJQUNMLE9BQU8sb0JBQVcsQ0FBQyxHQUFHLENBQ3BCLEdBQUcscUJBQVksdUJBQXVCLEVBQUUsRUFBRSxDQUMzQztTQUNFLElBQUksQ0FBQyxDQUFDLEdBQWtCLEVBQUUsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFDRixrQkFBZSxRQUFRLENBQUMifQ==