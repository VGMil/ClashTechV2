import { inject, Injectable } from '@angular/core';
import { AuthService, StorageService } from '../infrastructure/services';
import { ILoginUser, ITokenUser } from '../Models/AuthUser.model';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginUseCase{
  private auth = inject(AuthService)
  private storage = inject(StorageService)
/**
 * Ejecuta el proceso de login y almacena el token y los datos del usuario en `localStorage`.
 * 
 * Este método llama al método `login` del repositorio de autenticación, el cual devuelve un objeto
 * `ITokenUser` que contiene el `token` de autenticación y los datos del usuario. Luego, si el `token`
 * está presente en la respuesta, se guarda el objeto `ITokenUser` en `localStorage` bajo la clave `currentUser`,
 * permitiendo que la sesión del usuario se mantenga activa entre recargas de página.
 * 
 * @param authUser Datos de autenticación del usuario (email y password).
 * @returns Un `Observable<ITokenUser>` que emite el objeto `ITokenUser` con los datos del usuario y el token.
 */
  execute(authUser: ILoginUser): Observable<ITokenUser> {
    return this.auth.login(authUser).pipe(
      tap((userCredentials: ITokenUser) => this.storage.saveToken(userCredentials))
    );
  }

}
