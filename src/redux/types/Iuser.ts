import { Iorg } from "./Iorg"

export interface Iuser{
    _id: string;
    username:string
    password:string
    org?:Iorg 
    location?:string
    role:string
}