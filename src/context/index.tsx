import React from "react";
import {useMusic} from "@/hooks/useMusic";

interface DataType {
  color: string,
  songs: Song[],
  curSong: Song | undefined,
  setColor?: (color: string) => void,
  setSongs: (songs: Song[] | []) => void,
  setSong: (song: Song) => void
  songIndex:number
  setSongIndex:(index:number)=>void
}

const data: DataType = {
  setSongIndex(index: number): void {
    console.log(index)
  }, songIndex: 0,
  setColor(color: string): void {
    console.log(color)
  }, setSong(song: Song): void {
    console.log(song)
  }, setSongs(songs: Song[] | []): void {
    console.log(songs)
  },
  curSong: undefined,
  songs: [],
  color: 'red'
}

export const DataContext = React.createContext<DataType>(data)

const DataContextProvider: React.FC = (props) => {

  const [songs, curSong, setSongsSate, setCurSongState,songIndex,setSongIndex] = useMusic([], undefined)

  function setCurSong(song: Song) {
    setCurSongState(song)
  }

  function setSongs(songsList: Song[]) {
    setSongsSate(songsList)
  }

  return <DataContext.Provider
    value={{color: 'black', songs: songs, curSong: curSong,songIndex:songIndex,setSongIndex, setSongs: setSongs, setSong: setCurSong,}}
  >
    {props.children}
  </DataContext.Provider>
}

export default DataContextProvider
