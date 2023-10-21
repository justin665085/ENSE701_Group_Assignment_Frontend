export async function GET() {
  const res = await fetch('https://backend-aex1qbiui-justin665085.vercel.app/api/browseAllNewPaper', )
  const data = await res.json()
  // const data = new Array(Math.floor(Math.random() * 100 + 10)).fill(0).map((_,id) => (
  //     {
  //       id,
  //       authors: 'L.L. Beck,T.E. Perkins',
  //       doi: `10.1109/TSE.1983.${Math.floor(133134*Math.random() + 112847)}`,
  //       jName: 'IEEE Transactions on Software Engineering',
  //       number: '5',
  //       pages: '541-561',
  //       title: 'A Survey of Software Engineering Practice: Tools, Methods, and Results',
  //       volume: 'SE-9',
  //       yop: '1983',
  //     }
  // ))

  return Response.json({data})
}