import express from 'express';
import { SERVER_PORT } from '../global/environments';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {//clase que se exporta para otras clases
    //se crea un objeto estatico de la instancia para evitar que se creen instancias nuevas por cada llamado de la clase server
    private static _instance : Server;

    public app : express.Application;
    public port: number;

    public io: socketIO.Server;
    //se crea un httpServer para poder enviarle alio cuando lo inicializemos, ya que no es posible utilizar el server express
    private httpServer : http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        //socket necesita recibir la configuracion del servidor
        this.httpServer = new http.Server (this.app);
        //Se inicializa el io enviandole el server http ya que es la unica manera, no se le puede enviar el server express
        //this.io = socketIO( this.httpServer);
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );

        this.escucharSockets();
    }

    public static get instance(){
        //si ya existe la instancia la regresa si no la crea  nueva
        return this._instance || (this._instance = new this());
    }
    //metodo que escucha cuando se conecta un cliente
    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');
        
        //this.io.on para saber cuando se conecta alguien
        this.io.on('connection' , cliente => {
            //console.log(cliente.id);//id cliente por cada conexion
            //conectarCliente
            socket.conectarCliente(cliente);
            //login - configurar usuario
            socket.configurarUsuario(cliente, this.io);
            //escuchar mensaje
            socket.mensaje(cliente, this.io);
            //para saber cuando se desconecta un cliente
            /*cliente.on('disconnect' , () => {
                console.log('Cliente Desconectado');
            });*/
            //se utiliza la funcion desconectar de escuchar de la clase socket.ts
            
            socket.desconectar(cliente);
        });

    }

    start(callback: VoidFunction){
        //this.app.listen(this.port, callback);//para levantar un servidor express
        this.httpServer.listen(this.port, callback);//para levantar un servidor http
    }

}