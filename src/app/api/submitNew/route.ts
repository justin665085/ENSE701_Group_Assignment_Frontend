import {BASE_URL} from "@/common/const";

export async function POST(request: Request) {
  const body = await request.json()
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(
      `${BASE_URL}/api/insertNewPaper`,
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

  return Response.json({code})
}