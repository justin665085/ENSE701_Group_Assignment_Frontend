import {BASE_URL, noCacheHeader} from "@/common/const";

export async function GET() {
  let headers = new Headers(noCacheHeader);
  headers.append("Pragma", "no-cache");

  const res = await fetch(`${BASE_URL}/api/browseAllNewPaper`, {headers})
  const data = await res.json()

  let code = 1;
  if (res.ok) {
    code = 0;
  }

  return Response.json({code, data})
}