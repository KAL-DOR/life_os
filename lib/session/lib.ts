import { SessionOptions } from "iron-session";

export interface SessionData {
    user_id?:any;
    username?:string;
    is_logged_in:boolean;
}

export const defaultSession:SessionData={
    is_logged_in:false
}


export const sessionOptions: SessionOptions ={
    password: process.env.SECRET_KEY_SES!,
    cookieName:"life_session",
    cookieOptions:{
        httpOnly:true,
        secure:process.env.SECURE_ENV
    }
}