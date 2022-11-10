import { Usuario } from './usuario';



export class UsuariosLista{

    private lista: Usuario[] = [];

    constructor(){

    }

    //agregar un nuevo usuario
    public agregar( usuario: Usuario){
        this.lista.push (usuario);
        console.log('this.lista', this.lista);
        return usuario;
    }

    public actualizarNombre( id:string, nombre:string){
        for (let usuario of this.lista){
            if( usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('==== actualizando usario =====');
        console.log(this.lista);
    }

    //obtener lista de usuario
    public getLista(){
        return this.lista;
    }

    public getUsuario(id:string){
        return this.lista.find( usuario => usuario.id===id);
    }

    //obtener usuario en una sala particular
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(usuario =>{
            usuario.sala===sala
        });
    }

    //borrar usuario
    public borrarUsuario(id:string){
        const tempUsuario= this.getUsuario(id);
        this.lista = this.lista.filter( usuario =>{
            return usuario.id !== id;
        });
        console.log(this.lista);
        return tempUsuario;
    }
}