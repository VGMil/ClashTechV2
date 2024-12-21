export interface ILoginUser{
    email:string,
    password:string
}

export interface IRegisterUser extends ILoginUser{
    name: string,
    nickname: string,
}