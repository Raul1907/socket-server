/*se agrega la logica para los sockets*/
import {Socket} from 'socket.io';
import socketIO from 'socket.io';


export const desconectar = (cliente : Socket) =>{
    //escuchar al cliente
    cliente.on('disconnect', () =>{
        console.log('Cliente desconectado');
    });
}

//escuchar mensajes
export const mensaje = (cliente:Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de:string, cuerpo:string} ) => {
        console.log('Mensaje recibido',payload);

        io.emit('mensaje-nuevo', payload);
    })
}