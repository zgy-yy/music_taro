import React, {useContext, useMemo, useState} from "react";
import {Image, Swiper, SwiperItem, View, Text} from "@tarojs/components";
import {DataContext} from "@/context/index";
import {getBackgroundAudioManager} from "@tarojs/taro";
import {mergeSinger} from "@/utils/index";
import style from './index.module.scss'


const audioManager = getBackgroundAudioManager();

const Index: React.FC = () => {

  const {curSong, songIndex, songs, setSongIndex, setSong} = useContext(DataContext)
  const [paused, setPaused] = useState<boolean>(audioManager.paused)
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [showList, setShowList] = useState(false)
  const [showListAnimation, setShowListAnimation] = useState(false)


  audioManager.onPause(() => {
    setPaused(true)
  })
  audioManager.onPlay(() => {
    setPaused(false)
  })


  const musicList = useMemo(() => {
    return makeMusicList(swiperIndex)
  }, [swiperIndex, songIndex])

  function makeMusicList(swIndex: number) {
    const len = songs.length
    switch (swIndex) {
      case 0: {
        return [songs[songIndex], songs[(songIndex + len + 1) % len], songs[(songIndex + len - 1) % len]]
      }
      case 1: {
        return [songs[(songIndex + len - 1) % len], songs[songIndex], songs[(songIndex + len + 1) % len]]
      }

      case 2: {
        return [songs[(songIndex + len + 1) % len], songs[(songIndex + len - 1) % len], songs[songIndex]]
      }

    }
  }


  function playNextMusic() {
    if (songs) {
      const len = songs.length
      const nextIndex = (songIndex + 1) % len
      setSongIndex(nextIndex)
      setSong(songs[nextIndex])
    }
  }

  function playLastMusic() {
    if (songs) {
      const len = songs.length
      const nextIndex = (songIndex + len - 1) % len
      setSongIndex(nextIndex)
      setSong(songs[nextIndex])
    }
  }

  function playState() {
    if (audioManager.paused) {
      audioManager.play()
      setPaused(false)
    } else {
      audioManager.pause()
      setPaused(true)
    }
  }

  return <View className={style.main}>
    <View className={style.coverImage}>
      <Image mode='heightFix' src={curSong ? curSong.al.picUrl : ''}></Image>
    </View>
    <Swiper className={style.msg} circular
      onChange={(e) => {
              const dx = e.detail.current - swiperIndex
              setSwiperIndex(e.detail.current)
              if (dx == 1 || dx == -2) {
                playNextMusic()
              } else if (dx == -1 || dx == 2) {
                playLastMusic()
              }
            }}
    >
      {
        musicList?.map((item) => {
          return (<SwiperItem className={style.swiper} key={item?.id}>{item?.name}</SwiperItem>)
        })

      }
    </Swiper>
    {/*<View className={style.msg}>{curSong?.name}</View>*/}

    <View className={style.option}>
      <View className={paused ? 'iconfont icon-bofang' : 'iconfont icon-zanting'}
        onClick={() => {
              playState()
            }}
      ></View>
      <View className='iconfont icon-gedan' onClick={() => {
        if (showList){
          setShowListAnimation(true)
          setTimeout(()=>{
            setShowList(false)
            setShowListAnimation(false)
          },600)
        }else {
          setShowList(true)
        }
      }}
      ></View>
    </View>
    {
      showList ? <View className={style.musicList}
        style={showListAnimation?{transform:'translateY(100%)'}:''}
      >
        {
          songs.map((music, index) => {
            return <View className={style.music} key={music.id}
              style={songIndex == index ? {color: 'greenyellow'} : ''}
              onClick={() => {
                           setSong(songs[index])
                           setSongIndex(index)
                         }}
            >
              <Text>{music.name}</Text>
              <Text className={style.singer}> - {mergeSinger(music.ar)}</Text>
            </View>
          })
        }
      </View> : ''
    }

  </View>
}

export default Index
