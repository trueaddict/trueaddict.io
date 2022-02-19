import * as bodyParser from 'body-parser';
import * as express from 'express';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(process.cwd() + '/client/build/' ));
    }

    private routes(): void {
        this.express.get('/', (req, res, next) => {
            res.sendFile(process.cwd() + '/client/build/index.html' );
        });

        this.express.get('/api/time', (reg, res) => {
            res.json({time: new Date().toISOString()});
        })

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Undefined url address");
        });
    }
}

export default new App().express;