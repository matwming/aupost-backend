import express, {Request, Response, NextFunction} from 'express';
import router from './routes/routes';
import bodyParser from "body-parser";
import mysql, {MysqlError, PoolConnection} from "mysql";

const app = express();
const port =8180;

export const pool=mysql.createPool({
    host:'13.70.105.218',
    port:3306,
    user:'root',
    password:'Zhaoying@8604',
    database:'aupost_project'
});
pool.getConnection((err:MysqlError,connection:PoolConnection)=>{
    if(err){
        console.error('error connecting: ', err.stack);
        return;
    }
    console.log('successfully connected to aupost_project');
    connection.release();
});
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
