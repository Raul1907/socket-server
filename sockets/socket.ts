/*se agrega la logica para los sockets*/
import {Socket} from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente : Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente : Socket) =>{
    //escuchar al cliente
    cliente.on('disconnect', () =>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
    });
}

//escuchar mensajes
export const mensaje = (cliente:Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de:string, cuerpo:string} ) => {
        console.log('Mensaje recibido',payload);

        io.emit('mensaje-nuevo', payload);
    })
}

export const configurarUsuario = (cliente:Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre:string}, callback: Function ) => {
        console.log('Mensaje configurar-usaurio recibido',payload.nombre);
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        //io.emit('mensaje-configurar-usuario', payload);
        //si se desea regresar algo al cliente se agrega un callback y dentro, el mensaje a regresar
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    })
}