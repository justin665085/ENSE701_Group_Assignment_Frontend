import {NextRequest} from "next/server";
import {BASE_URL} from "@/common/const";

export async function GET(
    request: NextRequest
) {
  const searchParams = request.nextUrl.searchParams
  const res = await fetch(
      `${BASE_URL}/api/searchPaper?practice=${searchParams.get('practice')}&year=${searchParams.get('year')}`
  )
  const data = await res.json()

  let code = 1;
  if (res.ok) {
    code = 0;
  }

  return Response.json({code, data})
}