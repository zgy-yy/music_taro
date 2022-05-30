
interface Banner{
  imageUrl:string,
  url:string,
  targetId:number,
  titleColor: string
  typeTitle: string
}

//歌单简介
interface PlayList{
  alg: string
  canDislike: boolean
  copywriter:string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}
interface PlaylistDetail{
  commentThreadId: number
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  createTime: number
  id: number
  name: string
  newImported: boolean
  description:string
  tags:string[]
  tracks:Song[]
}

interface Song{
  al: {id: number, name: string, picUrl: string, tns: string[], pic: number}
  alia: string[]
  ar:Array<{id:number,name:string}>
  cd: string
  cf: string
  copyright: number
  cp: number
  djId: number
  dt: number
  id:number
  name:string
}
