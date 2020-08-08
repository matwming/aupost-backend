"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAddress = exports.getAddress = void 0;
const express_validator_1 = require("express-validator");
const app_1 = require("../../app");
exports.getAddress = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body.user;
    app_1.pool.query(`select * from address where email ="${email}"`, (err, results, fields) => {
        if (err) {
            console.log("querying address table has an error", err.message);
            return;
        }
        if (results.length > 0) {
            return res.json({ msg: results });
        }
        return res.status(400).json({ msg: "no address found!" });
    });
};
exports.saveAddress = async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { charge_code, deliver_to, country, province, address, phone, city, consignment_weight, product_classification, contents, value, } = req.body;
    console.log('body', req.body);
    const { email } = req.body.user;
    app_1.pool.query(`insert into shipments (charge_code,deliver_to,country,province,detail_address,phone,consignment_weight,product_id,contents,value,shipment_id,sender_email,city) 
         values("${charge_code}","${deliver_to}","${country}","${province}","${address}","${phone}","${consignment_weight}","${product_classification}","${contents}","${value}","","${email}","${city}")`, async (err, result, fields) => {
        if (err) {
            console.log("insert into shippments has errors", err);
            return;
        }
        console.log(result);
        if (result.hasOwnProperty("affectedRows")) {
            return (result["affectedRows"] === 1 &&
                res.json({
                    msg: "successfully created a shipment.",
                    success: true,
                }));
        }
    });
    // createShipment(req.body)
    //   .then((response: AxiosResponse | void) => {
    //     //@ts-ignore
    //     console.log("address", response.data);
    //     //@ts-ignore
    //     if (response.status === 200||201) {
    //       //@ts-ignore
    //       const { shipment_id } = response.data.shipments[0];
    //       console.log("shipment_id", shipment_id);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("an error in address file", e.message);
    //     return res.json({
    //       msg: "An error occurred.Please try again later",
    //       success: false,
    //     });
    //   });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy92MS9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlEQUFxRDtBQUNyRCxtQ0FBaUM7QUFJcEIsUUFBQSxVQUFVLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUM5RCxNQUFNLE1BQU0sR0FBRyxvQ0FBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3JCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN6RDtJQUVELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUVoQyxVQUFJLENBQUMsS0FBSyxDQUNSLHVDQUF1QyxLQUFLLEdBQUcsRUFDL0MsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3ZCLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEUsT0FBTztTQUNSO1FBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUMsQ0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRVcsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUMvRCxNQUFNLE1BQU0sR0FBRyxvQ0FBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3JCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN6RDtJQUNELE1BQU0sRUFDSixXQUFXLEVBQ1gsVUFBVSxFQUNWLE9BQU8sRUFDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLEtBQUssRUFDSCxJQUFJLEVBQ04sa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0QixRQUFRLEVBQ1IsS0FBSyxHQUNOLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbEMsVUFBSSxDQUFDLEtBQUssQ0FDTjttQkFDYSxXQUFXLE1BQU0sVUFBVSxNQUFNLE9BQU8sTUFBTSxRQUFRLE1BQU0sT0FBTyxNQUFNLEtBQUssTUFBTSxrQkFBa0IsTUFBTSxzQkFBc0IsTUFBTSxRQUFRLE1BQU0sS0FBSyxTQUFTLEtBQUssTUFBTSxJQUFJLElBQUksRUFDcE0sS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDNUIsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RELE9BQU87U0FDUjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sQ0FDSCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztnQkFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDUCxHQUFHLEVBQUUsa0NBQWtDO29CQUN2QyxPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQ0wsQ0FBQztTQUNIO0lBQ0gsQ0FBQyxDQUNKLENBQUM7SUFDRiwyQkFBMkI7SUFDM0IsZ0RBQWdEO0lBQ2hELG1CQUFtQjtJQUNuQiw2Q0FBNkM7SUFDN0MsbUJBQW1CO0lBQ25CLDBDQUEwQztJQUMxQyxxQkFBcUI7SUFDckIsNERBQTREO0lBQzVELGlEQUFpRDtJQUNqRCxRQUFRO0lBQ1IsT0FBTztJQUNQLG9CQUFvQjtJQUNwQiwwREFBMEQ7SUFDMUQsd0JBQXdCO0lBQ3hCLHlEQUF5RDtJQUN6RCx3QkFBd0I7SUFDeEIsVUFBVTtJQUNWLFFBQVE7QUFDVixDQUFDLENBQUMifQ==