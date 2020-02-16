import express, {Request, Response, NextFunction} from 'express';
import router from './routes/routes';
import bodyParser from "body-parser";

const app = express();
const port: number = 8180;


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
