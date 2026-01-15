import * as db from '@/lib/db/'
import { compare } from 'bcrypt';

export async function POST(request: Request) {
  
    const data = await request.json();
    const hashPin = await db.query('SELECT enc_pin FROM public.pinsAndUsers WHERE username = $1', [data.username]);
    const match = await compare(data.pin, hashPin.rows[0].enc_pin);
    if(match == true){
      return Response.json({
        success: true,
        data: console.log(hashPin)
      })
    } return Response.json({
      success: false,
      data: console.log(hashPin)
    })
}