import React, {useContext} from "react";
import {Image, Swiper, SwiperItem, View} from "@tarojs/components";
import Header from "@/components/header";
import {useRequest, useRouter} from "taro-hooks";
import {getBanner, getPersonalized} from "@/api/index";
import Player from "@/components/player";
import {DataContext} from "@/context/index";
import Loading from "@/components/loading";
import './index.scss'


const Index = () => {
  const {data, error, loading} = useRequest(getBanner);
  const {data: playList, loading: playListLoading} = useRequest(getPersonalized)

  const context = useContext(DataContext)

  const [, {navigateTo}] = useRouter();
  return (
    <View className='index'>
      <Header></Header>
      <View className='scroll'>
        <Swiper indicatorDots autoplay circular>
          {
            error ? '图片加载失败' : loading ? 'loading...' : data?.map(item => {
              return <SwiperItem key={item.targetId}>
                <Image style={{width: '100%'}} src={item.imageUrl} mode='heightFix'></Image>
              </SwiperItem>
            })
          }
        </Swiper>
        <View style={{textAlign: 'center', margin: '20px'}}>热门歌单推荐</View>
        {
          playListLoading ? <Loading></Loading> : <View>
            {playList?.map(item => {
              return <View className='lists' key={item.id}
                onClick={() => {
                             navigateTo('/pages/playList/index', {...item}).then()
                           }}
              >
                <Image mode='aspectFill' src={item.picUrl}></Image>
                <View className='text'>
                  <View className='name'>{item.name}</View>
                  <View className='title'>{Math.floor(item.playCount/10000)}万次播放</View>
                </View>
              </View>
            })}
          </View>
        }
      </View>
      {
        context.songs.length!=0?<Player></Player>:''
      }
    </View>
  );
};

export default Index;
