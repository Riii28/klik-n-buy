import { Product } from "./product"
import { UserData } from "./user"

export interface Response {
    success?: boolean
    message?: string
}

export interface ResponseWithUser extends Response {
    data?: UserData[]
}

export interface ResponseWithProduct extends Response {
    data?: Product[]
}