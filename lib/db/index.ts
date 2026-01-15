import { Pool } from 'pg'

const pool = new Pool()

export const query = (text:string, params:Array<any>): Promise<any> =>{
    return pool.query(text, params);
}