import * as bodyParser from 'body-parser';
import * as express from 'express';
import axios from 'axios';

class Auth {
    public express: express.Application;

    private access_token: string;

    private clientID: string = process.env.GITHUB_CLIENT_ID || 'b43705303347e55f06f8';
    private clientSecret: string = process.env.GITHUB_CLIENT_SECRET || '';

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
        // Get client id
        this.express.get('/client_id', (req, res) => {
            res.json({client_id: this.clientID});
        })

        // Login
        this.express.get('/login', (req, res) => {
            res.redirect(`https://github.com/login/oauth/authorize?client_id=${this.clientID}`);
        })

        // Callback
        this.express.get('/callback', (req, res) => {
            const requestToken = req.query.code;

            axios({
                method: 'post',
                url: `https://github.com/login/oauth/access_token?client_id=${this.clientID}&client_secret=${this.clientSecret}&code=${requestToken}`,
                headers: {
                    accept: 'application/json'
               }
            }).then( (resp) => {
                this.access_token = resp.data.access_token;
                res.redirect('/auth/success');
            })
        });

        this.express.get('/success', (req, res) => {
            axios({
                method: 'get',
                url: `https://api.github.com/user`,
                headers: {
                    Authorization: 'token ' + this.access_token
                }
            }).then((response) => {
                res.json({ userData: response.data });
            })
        })
    }
}

export default new Auth().express;