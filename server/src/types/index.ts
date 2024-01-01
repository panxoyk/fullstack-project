export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export type User = {
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    gender: Gender,
    birth: string,
}

export type UserEntry = Omit<User, "id">

export type UserLogin = {
    email: string,
    passwordHash: string,
}

export interface HttpError extends Error {
    status?: number
}

export type Config = {
    nodeEnv: string,
    port: number,
    dbUri: string,
    accessTokenKey: string,
    refreshTokenKey: string,
}

export type Session = {
    id: string,
    name: string,
    email: string,
}