import { Injectable } from '@angular/core';
import { ILoginUser, IRegisterUser } from '../../Models';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthAdapter } from '../adapters/';

export const AUTH_ENDPOINTS = {
    login:'http://localhost:3000/users',
    register:'http://localhost:3000/users',
};

@Injectable({
  providedIn: 'root',
  
})

export class AuthRepository {
  constructor(private readonly http:HttpClient) { }


  login(authUser:ILoginUser):Observable<ILoginUser> {
    return this.http.post(AUTH_ENDPOINTS.login,authUser)
    .pipe(
        map(res => {
          return AuthAdapter.toAuthUser(res)
        })
    );
  }

  register(authUser:IRegisterUser){
    return this.http.post(AUTH_ENDPOINTS.register,authUser)
    .pipe(
      map(res => {
        return AuthAdapter.toRegisterUser(res)
      })
    )
  }



}


