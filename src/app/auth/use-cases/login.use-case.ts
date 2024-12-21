import { Injectable } from '@angular/core';
import { AuthService } from '../infrastructure/services';
import { ILoginUser } from '../Models/AuthUser.model';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginUseCase{

  constructor(private auth:AuthService) { }

  execute(authUser:ILoginUser): Observable<ILoginUser> {
    return this.auth.login(authUser).pipe(
      tap((user:ILoginUser) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }),
    )
  }
}
