import {BASE_URL, noCacheHeader} from "@/common/const";
import {headers} from "next/headers";

export async function GET() {
  const res = await fetch(
      `${BASE_URL}/api/browseAllReviewedPaper`,
      {
        headers: noCacheHeader
      }
  )
  const data = await res.json()

  let code = 1;
  if (res.ok) {
    code = 0;
  }

  return Response.json({code, data})
}