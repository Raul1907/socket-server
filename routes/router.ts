
import {Router, Request, Response} from 'express';
import Server from '../classes/server';
//Router se utiliza para crear los api restfulls

export const router = Router();//export para que se use en otras clases

//se crea un servicio 'mensajes' tipo get
router.get('/mensajes', (req:Request, res:Response)=>{
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!!'
    })
})

//se crea un servicio 'mensajes' tipo post
router.post('/mensajes', (req:Request, res:Response)=>{
    //para leer los datos de entrada en el mensaje del request
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    //in envia un mensaje privado a un id
    server.io.emit( 'mensaje-nuevo', payload );

    res.json({
        ok: true,
        cuerpo,
        de
    })
})

//se crea un servicio 'mensajes' tipo post con argumento ID
router.post('/mensajes/:id', (req:Request, res:Response)=>{
    //para leer los datos de entrada en el mensaje del request
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    //in envia un mensaje privado a un id
    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
})
