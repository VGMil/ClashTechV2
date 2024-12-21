import { Injectable } from '@angular/core';
import { ITokenUser } from '../../Models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
/**
 * Guarda el token y los datos del usuario en `localStorage` si están presentes.
 * 
 * Este método recibe un objeto `ITokenUser`, verifica que contenga el `token`, 
 * y si es así, lo guarda en el `localStorage` bajo la clave `currentUser`. Esto 
 * permite que la sesión del usuario se mantenga activa entre recargas de página.
 * 
 * @param userCredentials Objeto que contiene el `token` y los datos del usuario.
 */
  saveToken(userCredentials: ITokenUser){
    if(userCredentials && userCredentials.token){
      localStorage.setItem('currentUser', JSON.stringify(userCredentials));
    }
  }
}
