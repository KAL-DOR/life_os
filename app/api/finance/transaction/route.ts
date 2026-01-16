import * as db from '@/lib/db'

export async function GET(request: Request) {
    const data = await request.json();
    const user_id = data.id;
    const values = [];
    values.push(user_id)
    const transactions = await db.query('SELECT * FROM public.transactions WHERE user_id = $1', values);

    return Response.json({
            success: true,
            data: transactions.rows
        });
    
}