import { Injectable } from '@angular/core';
import { ILoginUser, IRegisterUser, ITokenUser } from '../../Models';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthAdapter } from '../adapters/';
import { environment } from '../../../../environments/environment.development';

export const AUTH_ENDPOINTS = {
    login:environment.apiUsers,
    register:environment.apiUsers
    
};

@Injectable({
  providedIn: 'root',
  
})

export class AuthRepository {
  constructor(private readonly http:HttpClient) { }

  /**
 * Realiza una solicitud HTTP POST al endpoint de login con las credenciales del usuario.
 * 
 * Este método envía un objeto `ILoginUser` al backend, el cual contiene la información de inicio de sesión (como el correo y la contraseña).
 * Luego, transforma la respuesta recibida, que contiene un `token` y los datos del usuario, en un objeto de tipo `ITokenUser`
 * utilizando el adaptador `AuthAdapter.toTokenUser`.
 * 
 * @param authUser Objeto que contiene las credenciales del usuario (email y password) necesarias para iniciar sesión.
 * @returns Un `Observable` que emite un objeto `ITokenUser`, el cual incluye el token de autenticación y los datos del usuario.
 */
  login(authUser:ILoginUser):Observable<ITokenUser> { 
    return this.http.post(AUTH_ENDPOINTS.login,AuthAdapter.toAuthUser(authUser))
    .pipe(
        map(res => {
          return AuthAdapter.toTokenUser(res)
        })
    );
  }

  /**
 * Realiza una solicitud HTTP POST al endpoint de registro para crear una nueva cuenta de usuario.
 * 
 * Este método envía un objeto `IRegisterUser` al backend, que contiene los datos necesarios para registrar a un nuevo usuario
 * (como el email, la contraseña, el nombre y el nickname). Después de recibir la respuesta del servidor, el método transforma la respuesta
 * en un objeto de tipo `IRegisterUser` utilizando el adaptador `AuthAdapter.toRegisterUser`.
 * 
 * @param registerUser Objeto que contiene la información del usuario (email, password, name y nickname) para el registro.
 * @returns Un `Observable` que emite un mensaje o confirmación de éxito por parte del servidor.
 */
  register(registerUser:IRegisterUser):Observable<String> {
    return this.http.post(AUTH_ENDPOINTS.register,AuthAdapter.toRegisterUser(registerUser))
    .pipe(
      map(res => {
        return AuthAdapter.toResponse(res);
      })
    )
  }



}


