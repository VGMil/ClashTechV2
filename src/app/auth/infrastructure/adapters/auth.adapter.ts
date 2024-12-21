import { ILoginUser, IRegisterUser } from "../../Models";

export class AuthAdapter {
    static toAuthUser(apiResponse: any): ILoginUser {
      return {
        email: apiResponse.email || apiResponse.mail,
        password: apiResponse.password, 
      };
    }

    static toRegisterUser(apiResponse:any):IRegisterUser{
      return {
        email: apiResponse.email || apiResponse.mail,
        password: apiResponse.password, 
        name: apiResponse.name,
        nickname: apiResponse.nickname,
      }
    }
  }
  