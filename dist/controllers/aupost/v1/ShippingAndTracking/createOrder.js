"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../../config/config");
const createOrder = () => {
    const body = {
        order_reference: "My order reference",
        payment_method: "CHARGE_TO_ACCOUNT",
        shipments: [
            {
                shipment_id: "b98K0E7CW.UAAAFxdQghEb8Y",
            },
        ],
    };
    return config_1.HttpRequest.put(`https://digitalapi.auspost.com.au/test/shipping/v1/orders`)
        .then((res) => {
        console.log("createOrder", res.data);
        return res;
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = createOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlT3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYXVwb3N0L3YxL1NoaXBwaW5nQW5kVHJhY2tpbmcvY3JlYXRlT3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBd0Q7QUFHeEQsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO0lBQ3ZCLE1BQU0sSUFBSSxHQUFHO1FBQ1gsZUFBZSxFQUFFLG9CQUFvQjtRQUNyQyxjQUFjLEVBQUUsbUJBQW1CO1FBQ25DLFNBQVMsRUFBRTtZQUNUO2dCQUNFLFdBQVcsRUFBRSwwQkFBMEI7YUFDeEM7U0FDRjtLQUNGLENBQUM7SUFFRixPQUFPLG9CQUFXLENBQUMsR0FBRyxDQUNwQiwyREFBMkQsQ0FDNUQ7U0FDRSxJQUFJLENBQUMsQ0FBQyxHQUFrQixFQUFFLEVBQUU7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsV0FBVyxDQUFDIn0=