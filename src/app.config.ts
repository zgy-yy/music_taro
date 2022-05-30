export default defineAppConfig({
  pages: ["pages/index/index", "pages/rank/index", "pages/singer/index", "pages/search/index", "pages/playList/index"],
  requiredBackgroundModes:['audio'],
  window: {
    navigationStyle: 'custom',
  },
  tabBar: {
    borderStyle: 'black',
    backgroundColor:'black',
    list: [{
      pagePath: "pages/index/index",
      text: '推荐'
    }, {
      pagePath: "pages/rank/index",
      text: '排行'
    }, {
      pagePath: "pages/singer/index",
      text: '歌手'
    }, {
      pagePath: "pages/search/index",
      text: '搜索'
    }]
  }
})
