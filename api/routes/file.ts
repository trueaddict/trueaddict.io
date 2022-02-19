import * as bodyParser from 'body-parser';
import * as express from 'express';

import Controller from '../controller/file.controller';

class File {
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
        this.express.get('/files', Controller.getFileList);
        this.express.get('/file/:name', Controller.download);
    }
}

export default new File().express;