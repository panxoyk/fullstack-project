export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface User {
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    gender: Gender,
    birth: string,
}

export type UserEntry = Omit<User, "id">

export interface UserLogin {
    email: string,
    passwordHash: string,
}

export interface HttpError extends Error {
    status?: number
}

export interface Config {
    nodeEnv: string,
    port: number,
    dbUri: string,
    accessTokenKey: string,
    refreshTokenKey: string,
}

export interface Session {
    id: string,
    name: string,
    email: string,
}