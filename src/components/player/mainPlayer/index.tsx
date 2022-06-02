import React, {useEffect, useState} from "react";
import {Image, View, Text, ScrollView, Slider} from "@tarojs/components";
import {getBackgroundAudioManager, getMenuButtonBoundingClientRect} from "@tarojs/taro";
import Lyric, {formatTime, mergeSinger} from "@/utils/index";
import {getLyric} from "@/api/index";
import sty from './index.module.scss'

const audioManager = getBackgroundAudioManager();
let lyic: Lyric

const Index: React.FC<{
  hiddenCallBack: () => void, playCb: () => void, lastSong: () => void,
  nextSong: () => void, music: Song, paused: boolean
}> = (props) => {

  const [fadeOut, setFadeOut] = useState(false)

  const {hiddenCallBack, music, playCb, lastSong, nextSong, paused} = props
  const capsule = getMenuButtonBoundingClientRect();
  const [lyric, setLyric] = useState<Array<{ time: number, txt: string }>>([])
  const [curLyricIndex, setCurLyricIndex] = useState(0)
  const [animationStart,setAnimationStart] = useState(0)
  const [curPlayTime,setCurPlayTime] = useState(0)
  const [seeking,setSeeking] = useState(false)
  if (lyic) {
    if (paused) {
      lyic.stop()
    } else {
      lyic.togglePlay()
    }
  }
  function handler(_txt: string, lineNum: number,) {
    console.log(lineNum, _txt)
    setCurLyricIndex(lineNum)
  }

  audioManager.onTimeUpdate(() => {
    const curTime = audioManager.currentTime
    setCurPlayTime(curTime)
    if (lyic) {
      lyic.seek(curTime * 1000)
    }
  })

  useEffect(() => {
    getLyric(music.id).then(r => {
      lyic = new Lyric(r, handler)
      setLyric(lyic.lines)
      const curTime = audioManager.currentTime
      lyic.play(curTime * 1000,false)
      console.log('eff')
      setAnimationStart(Math.random)
    })
    return () => {
      lyic.stop()
      // @ts-ignore
      lyic = undefined

    }
  }, [music])

  return <View className={sty.backPage}
    style={fadeOut ? {
                 transform: 'translateY(100%)',
                 backgroundImage: `url(${music?.al.picUrl})`
               } : {
                 backgroundImage: `url(${music?.al.picUrl})`
               }}
  >
    <View className={sty.main} style={{paddingTop: capsule.top + 'px'}}>
      <View style={{textAlign: 'center', position: 'relative'}}>
        <View className='iconfont icon-CZ_004' style={{position: 'absolute', left: '20px'}}
          onClick={() => {
                setFadeOut(true)
                setTimeout(() => {
                  hiddenCallBack()
                  setFadeOut(false)
                }, 600)
              }}
        ></View>
        <View className={sty.songName} style={{fontSize: 'large'}}>{music.name}</View>
        <View className={sty.songSinger} style={{fontSize: 'small'}}>{mergeSinger(music.ar)}</View>
      </View>
      {/*wrapper*/}
      <View className={sty.wrapper}>
        <Image  style={{animationPlayState:paused?'paused':'running'}} className={sty.img} key={animationStart} mode='aspectFill' src={music.al.picUrl}></Image>
      </View>
      {/*Lyric*/}
      <ScrollView className={sty.lyric} scrollY scrollIntoView={`L${curLyricIndex - 2}`}
        scrollWithAnimation
        showScrollbar={false}
        enhanced
      >
        {
          lyric?.map((ly, index) => {
            return <View id={`L${index}`} key={ly.time}
              className={curLyricIndex == index ? sty.curLy : sty.lyItem}
            >{ly.txt}</View>
          })
        }
      </ScrollView>
     <View className={sty.slider}>
       <Text>{formatTime(curPlayTime)}</Text>
       <Slider className={sty.press} blockSize={12}
         value={seeking?undefined:curPlayTime}
         max={audioManager.duration}
         onChanging={(event)=>{
                 setSeeking(true)
           lyic.seek(event.detail.value * 1000)
               }}
         onChange={(event)=>{
           setSeeking(false)
           setCurPlayTime(event.detail.value)
           audioManager.seek(event.detail.value)
                 // audioManager.seek()
               }}
       >
       </Slider>
       <Text>{formatTime(audioManager.duration)}</Text>
     </View>
      {/*options*/}
      <View className={sty.opts}>
        <Text className='iconfont icon-suijibofang'></Text>
        <Text className='iconfont icon-shangyishouge' onClick={() => {
          lastSong()
        }
        }
        ></Text>
        <Text className={paused ? 'iconfont icon-bofang' : 'iconfont icon-zanting'}
          onClick={() => {
                playCb()
              }}
          style={{fontSize: '35px'}}
        ></Text>
        <Text className='iconfont icon-xiayishou' onClick={() => {
          nextSong()
        }
        }
        ></Text>
        <Text className='iconfont icon-guanbishengyin'></Text>
      </View>
    </View>
  </View>
}
export default Index
