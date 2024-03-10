import { CredentialResponse } from "@react-oauth/google";
import apiClient from "./api-client";

export interface IUser{
    name: string,
    email: string,
    password?: string,
    imgUrl?: string,
    _id?:string,
    accessToken?: string,
    refreshToken?: string
  }
export const registerUser = (user:IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log('Register');
        console.log(user);
        apiClient.post("/auth/register", user).then(res => {
            console.log(res);
            resolve(res.data)
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    })
  }

  export const GoogleSignin = (credentialResponse: CredentialResponse) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log('Google sign in');
        apiClient.post("/auth/google", credentialResponse).then(res => {
            console.log(res);
            resolve(res.data)
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    })
  }
   
