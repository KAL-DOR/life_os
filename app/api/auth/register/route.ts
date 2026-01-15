import * as db from '@/lib/db/'
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  
    const data = await request.json();
    const username = data.username;
    const email = data.email;
    const pin = data.pin;
    const uuid = crypto.randomUUID();
    const enc_pin = await hash(pin, 10);
    const valuesArr = [];
    valuesArr.push(username, email, enc_pin, uuid)

    const insertQuery = await db.query('INSERT INTO pinsAndUsers (username, email, enc_pin, user_id) VALUES    ($1, $2, $3, $4)', valuesArr)
    
    return Response.json({
      success: true,
      data: console.log(valuesArr)
    })
}