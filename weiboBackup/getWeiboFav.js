var url = 'https://api.weibo.com/2/favorites.json?access_token=2.008y1r1C6aMrBCf016c21f88leKCyC&count=50'
var favs = []
var limit = 0
var index = 1
getPage()

function getPage (n) {
  if (n > limit) {
    createMarkdown()
    return
  }
  var theurl = url
  if (n) {
    theurl = url + '&page=' + n
  }
  window.fetch(theurl).then((res) => {
    if (res.ok) {
      return res.text()
    }
  }).then(function (data) {
    var o = JSON.parse(data)
    limit = Math.floor(o.total_number / 50) + 1
    getInfoFrom(o)
    index++
    setTimeout(function () {
      getPage(index)
    }, 1000)
  })
}

function getInfoFrom (o) {
  for (let i = 0; i < o.favorites.length; i++) {
    var fav = o.favorites[i]
    if (fav.status.deleted !== '1') {
      var obj = {}
      obj.date = fav.status.created_at
      obj.username = fav.status.user ? fav.status.user.name : 'unknown'
      obj.content = fav.status.text.trim()
      obj.link = 'http://weibo.com/' +
      (fav.status.user ? fav.status.user.idstr : 'unknown') +
      '/' + id2mid(fav.status.idstr)
      var imgs = []
      for (let j = 0; j < fav.status.pic_urls.length; j++) {
        var href = fav.status.pic_urls[j].thumbnail_pic
        imgs.push(href.replace('thumbnail', 'large'))
      }
      obj.imgs = imgs
      var repost = {}
      var temp = fav.status.retweeted_status
      if (temp && temp.deleted !== '1') {
        repost.username = temp.user ? temp.user.name : 'unknown'
        repost.content = temp.text ? temp.text.trim() : ''
        imgs = []
        for (let j = 0; j < temp.pic_urls.length; j++) {
          imgs.push(temp.pic_urls[j].thumbnail_pic.replace('thumbnail', 'large'))
        }
        repost.imgs = imgs
        obj.repost = repost
      }
      favs.push(obj)
    }
  }
}

function createMarkdown () {
  var result = ''
  for (let i = 0; i < favs.length; i++) {
    var fav = favs[i]
    result += '- 链接：[' + fav.username + '](' + fav.link + ')' + '\n'
    result += '- 时间：' + fav.date + '\n'
    result += '- 内容：' + fav.content.replace('#', '\\#').replace(/\n+/g, ' ') + '\n'
    var imgs = fav.imgs
    if (imgs.length) {
      var s = '- 图片：'
      for (let j = 0; j < imgs.length; j++) {
        s += ' [' + (j + 1) + '](' + imgs[j] + ') '
      }
      result += s + '\n'
    }
    var repost = fav.repost
    if (repost) {
      result += '\n> - 源头：' + repost.username + '\n'
      result += '- 内容：' + repost.content.replace('#', '\\#').replace(/\n+/g, ' ') + '\n'
      imgs = repost.imgs
      if (imgs.length) {
        s = '- 图片：'
        for (let j = 0; j < imgs.length; j++) {
          s += ' [' + (j + 1) + '](' + imgs[j] + ') '
        }
        result += s + '\n'
      }
    }
    result += '\n***\n'
  }
  document.body.innerText = result
  download('我的收藏.md', result)
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

function num2str (n, jinzhi) {
  var a = []
  var s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (var i = 0; ; i++) {
    if (n < jinzhi ** i) break
  }
  var digits = i - 1
  for (let i = digits; i >= 0; i--) {
    var shang = Math.floor(n / (jinzhi ** i))
    a.push(shang)
    n -= shang * (jinzhi ** i)
  }
  var result = ''
  for (let i = 0; i < a.length; i++) {
    result += s[a[i]]
  }
  return result
}

function splitStringBy (str, n) {
  var result = []
  for (let i = str.length; i >= 0; i -= n) {
    var tmp = i - n
    tmp = tmp >= 0 ? tmp : 0
    result.push(str.slice(tmp, i))
  }
  return result.reverse().map(x => parseInt(x))
}

function id2mid (s) {
  var r = ''
  var a = splitStringBy(s, 7)
  for (let i = 0; i < a.length; i++) {
    r += num2str(parseInt(a[i]), 62)
  }
  return r
}
