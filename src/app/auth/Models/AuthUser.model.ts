export interface ILoginUser{
    email:string,
    password:string
}

export interface IRegisterUser extends ILoginUser{
    name: string,
    nickname: string,
}

export interface ITokenUser{
    name: string,
    token:string
}