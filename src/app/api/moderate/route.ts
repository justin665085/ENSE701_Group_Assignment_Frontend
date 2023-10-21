import {NextRequest} from "next/server";

export async function GET(
    request: NextRequest
) {
  // const res = await fetch('https://backend-aex1qbiui-justin665085.vercel.app/api/browseAllNewPaper', )
  // const data = await res.text()
  const searchParams = request.nextUrl.searchParams
  const code = 0;
  console.log(searchParams)
  const data = {
    id: searchParams.get('id'),
    opinion: searchParams.get('opinion')
  }
  await new Promise((res) => setTimeout(res, Math.random() * 1000 + 500));

  return Response.json({code, data })
}