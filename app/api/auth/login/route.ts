import * as db from '@/lib/db/'
import { compare } from 'bcrypt';
import { getSession } from '@/lib/session/actions';

export async function POST(request: Request) {
  
    const data = await request.json();
    const hashPin = await db.query('SELECT enc_pin, user_id FROM public.pinsAndUsers WHERE username = $1', [data.username]);
    const match = await compare(data.pin, hashPin.rows[0].enc_pin);
    if(match == true){
      const session = await getSession();
      session.user_id = hashPin.rows[0].user_id;
      session.username = data.username;
      session.is_logged_in = true;
      await session.save();
      return Response.json({
        success: true,
        data: session
      })
    } return Response.json({
      success: false,
    })
}

