import express, {Request, Response, NextFunction} from 'express';
import router from './routes/routes';
import bodyParser from "body-parser";
import mysql, {MysqlError, PoolConnection} from "mysql";
const rookout = require('rookout');
// @ts-ignore
import cors from 'cors';

// rookout.start({
//     token: '6922556455a7eaad3bf66522a762ca474a5423d8eceebb85d86888962d8670d2'
// })
const app = express();
const port =8180;

export const pool=mysql.createPool({
    connectionLimit:100,
    host:'13.75.232.156',
    port:3306,
    user:'root',
    password:'Zhaoying@8604',
    database:'aupost_project',
    debug:false
});
// export const pool = mysql.createPool({
//     connectionLimit:100,
//     host:'127.0.0.1',
//     port:3306,
//     user:'root',
//     password:'Zhaoying@8604',
//     database:'aupost_project',
//     debug:false
// });
pool.getConnection((err:MysqlError,connection:PoolConnection)=>{
    if(err){
        console.error('error connecting: ', err.stack);
        return;
    }
    console.log('successfully connected to aupost_project');
    connection.release();
});

app.use(cors());
/*
* middleware to parse body content
* */
app.use(bodyParser.json());

/*
* middleware to redirect all requests to router
* */
app.use('/', router);

/*
* middleware to catch any errors and send to the front end
* */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({error: err.message,msg:'unhandled routes'});
});

app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`));
