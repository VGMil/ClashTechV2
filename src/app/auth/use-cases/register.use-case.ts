import { Injectable } from '@angular/core';
import { AuthService } from '../infrastructure/services';
import { IRegisterUser } from '../Models/AuthUser.model';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterUseCase{

  constructor(private auth:AuthService) { }
/**
 * Ejecuta el proceso de registro de un nuevo usuario.
 * 
 * Este método invoca el método `register` del repositorio de autenticación, que envía los 
 * datos del usuario (como email, password, nombre, y nickname) al backend para crear 
 * una nueva cuenta de usuario. La respuesta del backend es un mensaje que indica si 
 * el registro fue exitoso o no. El método retorna un `Observable` con este mensaje.
 * 
 * @param authUser Datos del nuevo usuario que se desea registrar (email, password, name, nickname).
 * @returns Un `Observable<string>` que emite el mensaje de respuesta del backend, indicando el estado del registro.
 */
  execute(authUser:IRegisterUser): Observable<String> {
    return this.auth.register(authUser);
  }
}
