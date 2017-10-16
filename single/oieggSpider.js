String.prototype.fuckme = function () { return this.replace(/</g, '&lt;').replace(/>/g, '&gt;') }

function getPosts (doc) {
  var result = []
  var posts = doc.getElementsByClassName('mainbox')
  posts = Array.prototype.slice.call(posts)
  posts.forEach(v => {
    var author = v.querySelector('cite a')
    if (author === null) {
      author = '匿名'
    } else {
      author = author.innerText.fuckme()
    }
    var floor = v.querySelector('.postinfo strong').innerText.fuckme()
    var date = v.getElementsByClassName('postinfo')[0].innerText.fuckme()
    date = date.match(/\d+\-\d+\-\d+ \d+:\d+/)[0]
    var content = v.getElementsByClassName('t_msgfont')[0]
    var text = ''
    var children = Array.prototype.slice.call(content.childNodes)
    children.forEach(v => {
      switch (v.nodeName.toLowerCase()) {
        case 'a':
          text += '[' + v.innerText.fuckme() + '](' + v.href + ')  \n'
          break
        case '#text':
          text += v.data.replace(/[\s\[\]]+/g, '') ? (v.data.fuckme() + '  \n') : ''
          break
        case 'img':
          text += '![](' + v.src + ')' + '  \n'
          break
        case 'div':
          if (v.className === 'quote') {
            var s = v.innerText.fuckme().trim()
            text += '<blockquote>' + s + '</blockquote>\n'
          } else if (v.className === 'blockcode') {
            var s = v.getElementsByTagName('code')[0].innerText.fuckme().trim()
            s = s.replace(/\n+/g, '\n')
            text += '<pre>' + s + '</pre>\n'
          }
          break
        case 'embed':
          break
        default:
          text += v.innerText.fuckme().replace(/\s+/g, '') ? (v.innerText.fuckme() + '  \n') : ''
      }
    })
    var comments = v.getElementsByTagName('fieldset')
    if (comments.length) {
      text += '<blockquote>' + comments[0].innerText.fuckme().replace(/\t/g,'') + '</blockquote>\n'
    }
    text = text.replace(/\n\n\n+/g, '\n\n')
    var attachments = v.querySelectorAll('a[href^=attachment]')
    attachments = Array.prototype.slice.call(attachments)
    attachments = attachments.map(v => v.href)
    attachments = arrayUnique(attachments)
    attachments = attachments.map((v, i) => '[' + (i + 1) + '](' + v + ')')
    result.push({author, date, floor, text, attachments})
    // var text = content.innerText.fuckme()
    // var imgs = content.querySelectorAll('.t_msgfont>img')
    // imgs = Array.prototype.slice.call(imgs)
    // imgs = imgs.map(v => v.src)
    // result.push({author, date, text, imgs})
  })
  return result
  // console.log(result)
  // copy(JSON.stringify(result))
}

function arrayUnique (arr) {
  arr = new Set(arr)
  return Array.from(arr)
}

function arrayFlatten (arr) {
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? arrayFlatten(b) : b), [])
}

function toMarkdown (arr) {
  arr = arrayFlatten(arr)
  var r = '# ' + document.getElementsByTagName('h1')[0].innerText.fuckme() + '\n\n'
  arr.forEach(v => {
    var temp = '<b>作者： ' + v.author + ' '
    temp += '日期： ' + v.date + ' '
    temp += '楼层： ' + v.floor + '</b>  \n'
    temp += v.text + '  \n'
    if (v.attachments.length) {
      temp += '附件： ' + v.attachments.join(' ')
    }
    r += temp + '\n<hr>\n'
  })
  return r
}
// var result = getPosts(document)
// copy(toMarkdown(result))

function getPageNumber () {
  var pgs = document.querySelector('.pages_btns .pages')
  if (pgs === null) {
    return 1
  } else {
    var n = pgs.getElementsByTagName('em')[0].innerText.fuckme().trim()
    n = parseInt(n)
    n = Math.ceil(n / 15)
    return n
  }
}

function generateURL (tid, page) {
  return 'https://www.oiegg.com/viewthread.php?tid=' + tid + '&page=' + page
}

function httpRequest (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText)
    }
  }
  xhr.send()
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

function start (pageLimit) {
  var all = []
  var tid = document.location.href.match(/tid=(\d+)/)[1]
  var pageNumber = pageLimit || getPageNumber()
  var pages = Array(pageNumber).fill(1).map((v, i) => v + i)
  pages.forEach(v => {
    var url = generateURL(tid, v)
    setTimeout(() => {
      httpRequest(url, html => {
        var doc = document.createElement('html')
        doc.innerHTML = html
        try {
          all[v - 1] = getPosts(doc)
        }
        catch (e) {}
      })
    }, v * 1000)
  })

  setTimeout(() => {
    var title = document.getElementsByTagName('h1')[0].innerText.fuckme()
    var md = toMarkdown(all)
    download(title, md)
  }, pageNumber * 1000 + 2000)
}
start()
