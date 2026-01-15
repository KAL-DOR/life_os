import * as db from '@/lib/db/'

export async function GET() {
 const result = await db.query('SELECT * FROM public.reminder', [])

    return Response.json({
        success: true,
        data: result.rows[0]
})
}
