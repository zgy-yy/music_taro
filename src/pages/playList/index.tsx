import React, {useContext} from "react";
import {View, Image} from "@tarojs/components";
import Header from "@/components/header";
import Player from "@/components/player";
import {usePage, useRequest} from "taro-hooks";
import {getMenuButtonBoundingClientRect} from "@tarojs/taro";
import {getAllSongs, getPlaylistDetail} from "@/api/index";
import {DataContext} from "@/context/index";
import {mergeSinger} from "@/utils/index";
import Loading from "@/components/loading";
import './index.scss'

const Index: React.FC = () => {
  const capsule = getMenuButtonBoundingClientRect();
  const [, {pageInstance}] = usePage();
  let {id, name, picUrl} = pageInstance.router?.params as unknown as PlayList
  name = decodeURIComponent(name)
  picUrl = decodeURIComponent(picUrl)
  const {data} = useRequest(() => {
    return getPlaylistDetail(id)
  })

  const {data: songs, loading: songsLoading} = useRequest(() => {
    return getAllSongs(id)
  })


  const context = useContext(DataContext);

  return (

    <View className='index'>
      <View className='header'>
        <Header msg={name}>
        </Header>
      </View>
      <View style={{
        backgroundImage: `url(${picUrl})`,
        height: `${capsule.top + capsule.height}px`,
        // transform: `scale(${offset >= 0 ? 1 : 1 - offset / 100}) translateZ(0px)`
      }} className='bg'
      >
      </View>

        <View className='dec' style={{marginTop: `${capsule.top + capsule.height}px`}}>
            <View className='img'>{
              data?.coverImgUrl?<Image mode='heightFix' src={data?.coverImgUrl}></Image>:''
            }</View>
            <View className='context'>{data?.description}</View>
        </View>

      <View className='scroll'>
        <View className='list-top'></View>
        {
          songsLoading ? <Loading></Loading> : <View className='lists'>
            {songs?.map((item, index) => {
              return <View key={item.id} className={context.curSong?.id == item.id ? 'selected song' : 'song'}
                onClick={() => {
                             context.setSongs(songs)
                             context.setSong(item)
                             context.setSongIndex(index)
                           }}
              >
                <View className='index-number'>
                  {index + 1}
                </View>
                <View>
                  <View className={context.curSong?.id == item.id ? 'name selected' : 'name'}>{item.name}</View>
                  <View className='singer'>{mergeSinger(item.ar)}</View>
                </View>
              </View>
            })
            }
          </View>
        }
        {/*{context.songs.length == 0 ? '' : <View className='lists-bottom'></View>}*/}
      </View>
      {
        context.curSong ? <View className='playerBar'>
          <Player></Player>
        </View> : ''
      }
    </View>
  );
};

export default Index;
