import {Dispatch, SetStateAction, useEffect, useState} from "react";


export function useMusic(songLists: Song[] | [], song: Song | undefined,index:number=-1): [Song[] | [], Song | undefined,
  Dispatch<SetStateAction<Song[] | undefined>>, Dispatch<SetStateAction<Song | undefined>>,number,Dispatch<SetStateAction<number>>] {
  const [songs, setSongs] = useState<Song[] | []>(songLists);
  const [curSong, setCurSong] = useState(song)
  const [songIndex,setSongIndex] = useState(index)
  useEffect(() => {
    // console.log('useMusic,efft')
    return () => {
      // console.log('disc useMusic')
    }
  },[])

  return [songs, curSong, setSongs, setCurSong,songIndex,setSongIndex]
}
