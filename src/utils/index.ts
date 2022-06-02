export function mergeSinger(singers: Array<{ id: number, name: string }>): string {
  return singers.map((singer, index) => {
    if (index == singers.length - 1) {
      return singer.name
    }
    return singer.name + ' | '
  }).toLocaleString().replace(',', '')
}

export function formatTime(interval:number) {
  interval = interval | 0
  const minute = ((interval / 60 | 0) + '').padStart(2, '0')
  const second = (interval % 60 + '').padStart(2, '0')
  return `${minute}:${second}`
}







const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

const STATE_PAUSE = 0
const STATE_PLAYING = 1

const tagRegMap = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by'
}

function noop(txt: string, lineNum: number) {
  console.log(txt,lineNum)
}

export default class Lyric {
  lrc: string
  tags: {}
  lines: Array<{ time: number, txt: string }>
  handler: (txt: string, lineNum: number) => void
  state: number
  curLine: number
  curNum: number;
  private startStamp: number;
  private timer: NodeJS.Timeout;
  private pauseStamp: number;

  constructor(lrc, handler: (txt: string, lineNum: number) => void=noop) {
    this.lrc = lrc
    this.tags = {}
    this.lines = []
    this.handler = handler
    this.state = STATE_PAUSE
    this.curLine = 0

    this._init()
  }

  _init() {
    this._initTag()
    this._initLines()
  }

  _initTag() {
    for (let tag in tagRegMap) {
      const matches = this.lrc.match(new RegExp(`\\[${tagRegMap[tag]}:([^\\]]*)]`, 'i'))
      this.tags[tag] = matches && matches[1] || ''
    }
  }

  _initLines() {
    const lines = this.lrc.split('\n')
    const offset = parseInt(this.tags['offset']) || 0
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let result: number[] = timeExp.exec(line) as unknown as number[]
      if (result) {
        const txt: string = line.replace(timeExp, '').trim()
        if (txt) {
          this.lines.push({
            time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10 + offset,
            txt
          })
        }
      }
    }

    this.lines.sort((a, b) => {
      return a.time - b.time
    })
  }

  _findCurNum(time) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i
      }
    }
    return this.lines.length - 1
  }

  _callHandler(i) {
    if (i < 0) {
      return
    }
    this.handler(this.lines[i].txt,i)
  }

  _playRest() {
    let line = this.lines[this.curNum]
    let delay = line.time - (+new Date() - this.startStamp)

    this.timer = setTimeout(() => {
      this._callHandler(this.curNum++)
      if (this.curNum < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest()
      }
    }, delay)
  }

  play(startTime = 0, skipLast) {
    if (!this.lines.length) {
      return
    }
    this.state = STATE_PLAYING

    this.curNum = this._findCurNum(startTime)
    this.startStamp = +new Date() - startTime

    if (!skipLast) {
      this._callHandler(this.curNum - 1)
    }

    if (this.curNum < this.lines.length) {
      // console.log('清除timer')
      clearTimeout(this.timer)
      this._playRest()
    }
  }

  togglePlay() {
    const now = +new Date()
    if (this.state === STATE_PLAYING) {
      this.stop()
      this.pauseStamp = now
    } else {
      this.state = STATE_PLAYING
      this.play((this.pauseStamp || now) - (this.startStamp || now), true)
      this.pauseStamp = 0
    }
  }

  stop() {
    this.state = STATE_PAUSE
    // console.log('stop_清除timer')
    clearTimeout(this.timer)
  }

  seek(offset) {
    this.play(offset,true)
  }

}
