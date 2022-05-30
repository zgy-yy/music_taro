import React, {useContext, useEffect, useMemo, useState} from "react";
import {View} from "@tarojs/components";
import sty from './index.scss'
import {getBackgroundAudioManager} from "@tarojs/taro";
import {DataContext} from "@/context/index";

const audio = getBackgroundAudioManager()

const Index: React.FC = () => {

  const context = useContext(DataContext)
  useEffect(()=>{
    console.log(audio)
    audio.onPlay(()=>{
      console.log('1')
      setcunt(1)
    })
    audio.onPause(()=>{
      setcunt(2)
    })
  },[context.curSong,context.songs,context.songIndex])

  useMemo(()=>{
    console.log('memo')
  },[context.curSong])

  const[cunt,setcunt] = useState(0)
  return <View className={sty.main}>
    {cunt}
  </View>
}

export default Index
