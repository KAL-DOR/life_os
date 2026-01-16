import { query } from '@/lib/db'
import { getSession } from '@/lib/session/actions'

export async function GET() {
  // 1. Run the query
  const session = await getSession();

  // 2. Return a JSON response
  //    - result.rows contains the actual data from PostgreSQL
  //    - Response.json() creates a proper HTTP response with JSON content
  return Response.json({
    success: true,
    time: session,
  })
}
