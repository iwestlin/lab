// 先登录 https://m.weibo.cn, 点击「xxx关注」进入关注页面，打开浏览器控制台（F12），复制以下代码到控制台后，按 enter 执行。
var url = 'https://m.weibo.cn/api/container/getSecond?containerid=1005052140504395_-_FOLLOWERS'
var pages = 0
var index = 1
var followingData = []
getPage()

function getPage (n) {
  if (n > pages) {
    createMarkDown()
    return
  }
  var theurl = url
  if (n) {
    theurl = url + '&page=' + n
  }
  window.fetch(theurl, {method: 'get', credentials: 'include'}).then((res) => {
    if (res.ok) {
      return res.text()
    }
  }).then(function (data) {
    var o = JSON.parse(data)
    if (o.ok === 1) {
      pages = o.maxPage
      getInfo(o)
    }
    index++
    getPage(index)
  })
}

function getInfo (o) {
  var cards = o.cards
  for (let i = 0; i < cards.length; i++) {
    var card = cards[i]
    var link = card.scheme.replace(/\?.+/, '')
    var username = card.user.screen_name
    followingData.push({username: username, link: link})
  }
}

function createMarkDown () {
  var result = ''
  for (let i = 0; i < followingData.length; i++) {
    result += '- [' + followingData[i].username + '](' + followingData[i].link + ')\n'
  }
  download('我的关注.md', result)
}

function download (filename, text) {
  var pom = document.createElement('a')
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  pom.setAttribute('download', filename)
  if (document.createEvent) {
    var event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    pom.dispatchEvent(event)
  } else {
    pom.click()
  }
}
