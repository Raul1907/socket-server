import express from 'express';
import { SERVER_PORT } from '../global/environments';

export default class Server {//clase que se exporta para otras clases

    public app : express.Application;
    public port: number;

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
    }

    start(callback: VoidFunction){
        this.app.listen(this.port, callback);//para levantar un servidor express
    }

}