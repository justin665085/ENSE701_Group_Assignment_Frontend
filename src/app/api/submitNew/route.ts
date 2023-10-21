export async function GET() {
  const res = await fetch('https://backend-aex1qbiui-justin665085.vercel.app/api/browseAllNewPaper', )
  let code = 0;
  if (res.ok) {
    code = 1;
  }

  return Response.json({code})
}