export async function POST(request: Request) {
  const body = await request.json()

  const res = await fetch(
      'https://backend-aex1qbiui-justin665085.vercel.app/api/insertNewPaper',
      {
        method: 'post',
        body: body,
      }
  )

  let code = 0;
  if (res.ok) {
    code = 1;
  }

  return Response.json({code})
}