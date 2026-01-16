"use server"
import { getIronSession } from "iron-session";
import { defaultSession, SessionData, sessionOptions } from "./lib";
import { cookies } from "next/headers";

export const getSession = async () => {
    const session = await getIronSession<SessionData>(await cookies(),sessionOptions)
    if(!session.is_logged_in){
        session.is_logged_in = defaultSession.is_logged_in;
    }
    return session;
};
export const login = async (formData:FormData) => {
    const session = await getSession();

    const formUsername = formData.get("username") as string
    const formPin = formData.get("pin") as string
    handleSubmit
};
export const logout = async () => {};