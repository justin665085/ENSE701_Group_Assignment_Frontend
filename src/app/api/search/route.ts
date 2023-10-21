import {NextRequest} from "next/server";

export async function GET(
    request: NextRequest
) {
  // const res = await fetch('https://backend-aex1qbiui-justin665085.vercel.app/api/browseAllNewPaper', )
  // const data = await res.text()
  const searchParams = request.nextUrl.searchParams
  const code = 0;
  console.log(searchParams)

  const data = new Array(Math.floor(Math.random() * 100 + 10)).fill(0).map((_, id) => (
      {
        id,
        authors: 'L.L. Beck,T.E. Perkins',
        jName: 'IEEE Transactions on Software Engineering',
        title: 'A Survey of Software Engineering Practice: Tools, Methods, and Results',
        yop: '1983',
        SEpractice: "string",
        claim: "string",
        ROE: "string",
        TOR: "string",
        TOP: "string"
      }
  ))

  await new Promise((res) => setTimeout(res, Math.random() * 1000 + 500));

  return Response.json({code, data})
}