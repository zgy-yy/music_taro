import React from "react";
import {getMenuButtonBoundingClientRect} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {useRouter} from "taro-hooks";
import './index.scss'


const Index: React.FC<{ msg?: string }> = (props) => {


  const {msg} = props
  const capsule = getMenuButtonBoundingClientRect();

  const [, {navigateBack}] = useRouter()

  return <View className='main' style={{paddingTop: capsule.top + 'px', height: capsule.height + 'px'}}>
    {msg ? <>
        <Text className='back iconfont  icon-fanhui' onClick={() => {
          navigateBack().then()
        }}
        >
          <Text className='title' style={{width: capsule.left - 50 + 'px'}}>{msg}</Text>
        </Text>
      </>
      : <>
        <Text className='logo iconfont  icon-suishenting'></Text>
        <View className='text'>Music</View>
      </>
    }
  </View>
}

export default Index
