import {request} from "@tarojs/taro";

const baseURL = 'http://zgy.ink:3001'
const ERR_OK = 200

//推荐歌单
export function getPersonalized(): Promise<PlayList[]> {
  return get('/personalized').then(data => {
    return data.result
  }) as Promise<PlayList[]>
}

//歌单详情
export function getPlaylistDetail(id: number): Promise<PlaylistDetail> {
  return get('/playlist/detail?id=' + id).then(data => {
    // console.log(data)
    return data.playlist
  }) as Promise<PlaylistDetail>
}

//歌单内所有歌曲
export function getAllSongs(id: number): Promise<Song[]> {
  return get('/playlist/track/all?id=' + id).then(data => {
    return data.songs
  }) as Promise<Song[]>
}

export function checkMusicURl(id: number) {
  return get('/check/music?id=' + id).then(data => {
    // console.log(data)
    return data
  }) as Promise<{ success: boolean, message: string }>
}

//轮播图
export function getBanner(): Promise<Banner[]> {
  return get('/banner').then(data => {
    return data.banners
  }) as Promise<Banner[]>
}

export function getLyric(id:number){
  return get('/lyric?id='+id).then(res=>{
    return res.lrc.lyric
  })as Promise<string>
}

export function get(url: string, params: any = {}): Promise<any> {
  return new Promise(function (resolve, reject) {
    request({
      url: baseURL + url,
      data: params,
      method: 'GET',
      success(res) {
        const serverData: any = res.data
        if (res.statusCode === ERR_OK) {
          resolve(serverData)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
