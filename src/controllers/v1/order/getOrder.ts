import {Response, Request} from "express";
import {pool} from "../../../app";

const getOrder = (req: Request, res: Response) => {
    const getOrdersSql = `select * from orders order by order_creation_date desc`;
    pool.query(getOrdersSql, (err, response) => {
        if (err) {
            console.log(err);
            throw (err);
        }
        console.log('get orders', response);
        return res.json({orders:response,success:true});
    })
};

export default getOrder;
