

export function mergeSinger(singers:Array<{id: number, name: string}>):string{
  return singers.map((singer, index) =>{
    if (index==singers.length-1){
      return singer.name
    }
    return singer.name + ' | '
  }).toLocaleString().replace(',','')
}
