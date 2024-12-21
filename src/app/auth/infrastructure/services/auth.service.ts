import { Injectable } from '@angular/core';
import { AuthRepository } from '../repositories/auth.repository';
import { ILoginUser, IRegisterUser } from '../../Models/AuthUser.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authrep:AuthRepository ) {
    
  }

  login(authUser:ILoginUser): Observable<ILoginUser> {
    return this.authrep.login(authUser)
  }

  register(authUser:IRegisterUser): Observable<IRegisterUser> {
    return this.authrep.register(authUser)
  }
  
}
