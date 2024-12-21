import { ILoginUser, IRegisterUser, ITokenUser } from "../../Models";

export class AuthAdapter {

    /**
   * Adapta los datos de login para ser enviados al backend.
   * 
   * @param loginData Datos de login (email y password).
   * @returns Objeto con formato adecuado para el backend.
   */
  static toAuthUser(loginData: ILoginUser): any {//Convertir para mandar al API
    return {
      email: loginData.email,
      password: loginData.password,
    };
  }
  /**
   * Adapta los datos de registro para ser enviados al backend.
   * 
   * @param registerData Datos de registro (email, password, name, nickname).
   * @returns Objeto con formato adecuado para el backend.
   */
  static toRegisterUser(registerData: IRegisterUser): any { //Convertir para mandar al API
    return {
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      nickname: registerData.nickname,
    }
  }
  /**
   * Adapta la respuesta del backend a un objeto `ITokenUser` para el frontend.
   * 
   * @param apiResponse Respuesta del backend que contiene el token y el nombre del usuario.
   * @returns Objeto `ITokenUser` con la información relevante para el frontend.
   */
  static toTokenUser(apiResponse: any): ITokenUser { // Token recibido y formateado
    return {
      name: apiResponse.name,
      token: apiResponse.token
    }
  }
  /**
   * Adapta la respuesta del backend (mensaje de confirmación) a un formato legible para el frontend.
   * 
   * @param apiResponse Respuesta del backend que contiene un mensaje de éxito o error.
   * @returns Mensaje recibido del backend.
   */
  static toResponse(apiResponse: any): string {
    return apiResponse.message;
  }
}


