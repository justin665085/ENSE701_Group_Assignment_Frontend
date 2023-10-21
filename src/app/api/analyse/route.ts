export async function POST(request: Request) {
  const body = await request.json()

  const code = 0;
  console.log(body)
  await new Promise((res) => setTimeout(res, Math.random() * 1000 + 500));

  return Response.json({ code, data: body })
}