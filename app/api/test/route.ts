import { query } from '@/lib/db'

export async function GET() {
  // 1. Run the query
  const result = await query('SELECT * FROM public.reminder', [])

  // 2. Return a JSON response
  //    - result.rows contains the actual data from PostgreSQL
  //    - Response.json() creates a proper HTTP response with JSON content
  return Response.json({
    success: true,
    time: result.rows[0]
  })
}
