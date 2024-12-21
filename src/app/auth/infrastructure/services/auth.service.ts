import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../repositories/auth.repository';
import { ILoginUser, IRegisterUser, ITokenUser } from '../../Models/AuthUser.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authrep = inject(AuthRepository);
  /**
 * Realiza una llamada al método `login` del `AuthRepository` para autenticar al usuario.
 * 
 * Este método pasa las credenciales del usuario (`ILoginUser`) al repositorio de autenticación (`AuthRepository`),
 * que se encarga de enviar la solicitud al backend. El backend devuelve un objeto `ITokenUser` que contiene
 * el `token` de autenticación y la información del usuario.
 * 
 * @param authUser Objeto que contiene las credenciales del usuario (email y password) para la autenticación.
 * @returns Un `Observable<ITokenUser>` que emite un objeto `ITokenUser`, el cual contiene el token y la información del usuario.
 */
  login(authUser:ILoginUser): Observable<ITokenUser> {
    return this.authrep.login(authUser)
  }
/**
 * Realiza una llamada al método `register` del `AuthRep ository` para registrar un nuevo usuario.
 * 
 * Este método pasa la información del nuevo usuario (`IRegisterUser`) al repositorio de autenticación (`AuthRepository`),
 * que se encarga de enviar la solicitud de registro al backend. El backend devuelve una respuesta (por ejemplo, un mensaje de éxito o error)
 * que es procesada y devuelta al componente o servicio que invoca este método.
 * 
 * @param authUser Objeto que contiene los datos del usuario (email, password, name, nickname) para el registro.
 * @returns Un `Observable<string>` que emite un mensaje de confirmación del servidor (por ejemplo, "Registro exitoso").
 */
  register(authUser:IRegisterUser): Observable<String> {
    return this.authrep.register(authUser)
  }
  
}
