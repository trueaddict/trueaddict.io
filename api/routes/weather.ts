import * as express from 'express';
import * as bodyParser from 'body-parser';

import Controller from '../controller/weather.controller';

class Weather {
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
        this.express.get('/', Controller.getWeatherCameras);
        this.express.get('/:location', Controller.getWeatherCameras);
    }
}

export default new Weather().express;