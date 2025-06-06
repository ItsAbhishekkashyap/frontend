export async function GET() {
  return new Response(
    JSON.stringify({ 
      MONGODB_URI: process.env.MONGODB_URI ?? 'NOT DEFINED' 
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
