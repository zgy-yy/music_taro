import React, {useContext, useEffect} from "react";
import {getBackgroundAudioManager} from "@tarojs/taro";
import {mergeSinger} from "@/utils/index";
import {checkMusicURl} from "@/api/index";
import "./app.scss";
import DataContextProvider, {DataContext} from "./context";


const audioManager = getBackgroundAudioManager();

const Audio: React.FC = (props) => {
  const context = useContext(DataContext)
  useEffect(() => {
    if (context.curSong) {
      const song: Song = context.curSong
      const songId = context.curSong.id
      checkMusicURl(context.curSong?.id).then(data => {
        if (data.success) {
          audioManager.src = 'https://music.163.com/song/media/outer/url?id=' + songId + '.mp3'
          audioManager.title = song.name
          audioManager.coverImgUrl = song.al.picUrl
          audioManager.singer = mergeSinger(song.ar)
          audioManager.play()
        }
      })
    }
  }, [context.curSong])

  return <>
    {props.children}
  </>
}

const App: React.FC = (props) => {

  return <DataContextProvider>
    <Audio>
      {props.children}
    </Audio>
  </DataContextProvider>

}

export default App;
