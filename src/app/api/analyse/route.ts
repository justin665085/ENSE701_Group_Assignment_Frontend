import {BASE_URL, noCacheHeader} from "@/common/const";

export async function POST(request: Request) {
  const body = await request.json()
  let headers = new Headers(noCacheHeader);
  headers.append("Content-Type", "application/json");

  const res = await fetch(
      `${BASE_URL}/api/AnalysePaper`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: headers
      }
  )

  let code = 1;
  if (res.ok) {
    code = 0;
  }
  console.log(res.ok, res.statusText)
  return Response.json({code})
}