import React, {useState} from "react";
import {Image, View, Text} from "@tarojs/components";
import {getMenuButtonBoundingClientRect} from "@tarojs/taro";
import {mergeSinger} from "@/utils/index";
import sty from './index.module.scss'


const Index: React.FC<{
  hiddenCallBack: () => void, playCb: () => void, lastSong: () => void,
  nextSong: () => void, music: Song,paused:boolean
}> = (props) => {

  const [fadeOut, setFadeOut] = useState(false)

  const {hiddenCallBack, music, playCb, lastSong, nextSong,paused} = props
  const capsule = getMenuButtonBoundingClientRect();
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
        <View style={{fontSize: 'x-large'}}>{music.name}</View>
        <View style={{fontSize: 'small'}}>{mergeSinger(music.ar)}</View>
      </View>
      {/*wrapper*/}
      <View className={sty.wrapper}>
        <Image className={sty.img} mode='heightFix' src={music.al.picUrl}></Image>
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
