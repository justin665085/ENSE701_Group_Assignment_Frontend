export async function GET() {
  // const res = await fetch('https://backend-aex1qbiui-justin665085.vercel.app/api/browseAllNewPaper', )
  // const data = await res.text()
  const code = 1;
  await new Promise((res) => setTimeout(res, Math.random()*1000 + 500));

  return Response.json({code})
}