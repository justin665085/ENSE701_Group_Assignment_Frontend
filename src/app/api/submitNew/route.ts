export async function POST(request: Request) {
  const body = await request.json()

  const res = await fetch(
      'https://backend-aex1qbiui-justin665085.vercel.app/api/insertNewPaper',
      {
        method: 'post',
        body: body,
      }
  )

  let code = 1;
  if (res.ok) {
    code = 0;
  }

  return Response.json({code})
}