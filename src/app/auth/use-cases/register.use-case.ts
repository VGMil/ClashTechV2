import { Injectable } from '@angular/core';
import { AuthService } from '../infrastructure/services';
import { IRegisterUser } from '../Models/AuthUser.model';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterUseCase{

  constructor(private auth:AuthService) { }

  execute(authUser:IRegisterUser): Observable<IRegisterUser> {
    return this.auth.register(authUser);
  }
}
