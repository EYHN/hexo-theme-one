interface translateRes{
  result:string,
  voice1:string,
  voice2:string
}

// Power by http://www.tastemylife.com/. Copyright EYHN
export function googleTranslate(SourceLanguages:string,TargetLanguages:string,text:string|string[]){
  let payload = {
      sl:SourceLanguages,
      tl:TargetLanguages,
      q: text,
      p: 1
  };
  return new Promise<translateRes>((r)=>{
    $.post(`http://www.tastemylife.com/gtr.php`,payload,(res)=>{
      r(JSON.parse(res))
    })
  })
}