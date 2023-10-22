import {BASE_URL} from "@/common/const";

export async function GET() {
  const res = await fetch(`${BASE_URL}/api/browseAllNewPaper`, )
  const data = await res.json()

  let code = 1;
  if (res.ok) {
    code = 0;
  }

  return Response.json({code, data})
}