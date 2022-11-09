import Server from "./classes/server";
import { SERVER_PORT } from "./global/environments";
import { router } from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors';

const server = Server.instance;
//bodyParser
server.app.use(bodyParser.urlencoded({extended:true}));//permitir recuperar datos enviados en el request
server.app.use(bodyParser.json())//parsear a json
//CORS
server.app.use( cors({ origin:true, credentials:true }));//se permite que cualquier persona llame los servicios

server.app.use('/', router);//se define que clase se utiliza para definit los metodos REST

//levanta el server express
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);

});