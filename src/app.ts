import express, {Request, Response, NextFunction} from 'express';
import router from './routes/routes';
import bodyParser from "body-parser";
import connectDB from "./config/db";

const app = express();
const port = process.env.PORT||8180;

connectDB().then(r => console.log(r)).catch(e=>console.log(e));
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
    res.json({error: err.message});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
