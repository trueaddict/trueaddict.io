import * as bodyParser from 'body-parser';
import * as express from 'express';
import File from './file';


class Routes {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware() : void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes() : void {
        // Files route
        this.express.use('/', File);

        // Time example
        this.express.get('/time', (reg, res) => {
            res.json({time: new Date().toISOString()});
        });
    }
}

export default new Routes().express;