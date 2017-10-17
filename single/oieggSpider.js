String.prototype.fuckme = function () { return this.replace(/</g, '&lt;').replace(/>/g, '&gt;') }
start()

function getPosts (doc) {
  var result = []
  var posts = doc.getElementsByClassName('mainbox')
  posts = Array.prototype.slice.call(posts)
  posts.forEach(v => {
    try {
      var author = v.querySelector('cite a')
      if (author === null) {
        author = '匿名'
      } else {
        author = '[' + author.innerText.fuckme() + '](' + author.href + ')'
      }
      var floor = v.querySelector('.postinfo strong').innerText
      var date = v.getElementsByClassName('postinfo')[0].innerText
      date = date.match(/\d+-\d+-\d+ \d+:\d+/)[0]
      var content = v.getElementsByClassName('defaultpost')[0]
      var text = getDivText(content).replace(/\n[\s\-]+\n/g, '\n\n')
      var attachments = v.querySelectorAll('a[href^=attachment]')
      attachments = Array.prototype.slice.call(attachments)
      attachments = attachments.map(v => v.href)
      attachments = arrayUnique(attachments)
      attachments = attachments.map((v, i) => '[' + (i + 1) + '](' + v + ')')
      result.push({author, date, floor, text, attachments})
    } catch (e) {
      console.log(e)
    }
  })
  return result
}

function getDivText (div) {
  var text = ''
  var children = Array.prototype.slice.call(div.childNodes)
  children.forEach(v => {
    switch (v.nodeName.toLowerCase()) {
      case 'a':
        text += '[' + v.innerText.fuckme() + '](' + v.href + ')  \n'
        break
      case '#text':
        text += v.data.replace(/[\s[\]]+/g, '') ? (v.data + '  \n') : ''
        break
      case 'img':
        text += '![](' + v.src + ')'
        break
      case 'fieldset':
        text += '<blockquote>' + v.innerText.fuckme().replace(/\t/g, '') + '</blockquote>\n'
        break
      case 'div':
        if (v.className === 'notice') {
          text += '<blockquote>' + v.innerText + '</blockquote>\n'
        } else if (v.className === 'quote') {
          var s = v.innerText.trim().fuckme()
          text += '<blockquote>' + s + '</blockquote>\n'
        } else if (v.className === 'blockcode') {
          s = v.getElementsByTagName('code')[0].innerText.trim().fuckme()
          s = s.replace(/\n+/g, '\n')
          text += '<pre>' + s + '</pre>\n'
        } else {
          text += getDivText(v) + '  \n'
        }
        break
      case 'embed':
        break
      default:
        text += v.innerText.fuckme().replace(/\t/g, '') + '  \n'
    }
  })
  return text
}

function arrayUnique (arr) {
  arr = new Set(arr)
  return Array.from(arr)
}

function arrayFlatten (arr) {
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? arrayFlatten(b) : b), [])
}

function toMarkdown (arr, title, link) {
  arr = arrayFlatten(arr)
  var r = '# [' + title + '](' + link + ')\n\n'
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

function getPageNumber () {
  var pgs = document.querySelector('.pages_btns .pages')
  if (pgs === null) {
    return 1
  } else {
    var n = pgs.getElementsByTagName('em')[0].innerText.trim()
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
  var title = document.getElementsByTagName('h1')[0].innerText.fuckme()
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
        } catch (e) {
          console.log(e)
        }
      })
    }, v * 1000)
  })

  setTimeout(() => {
    download(title, toMarkdown(all, title, document.location.href))
  }, pageNumber * 1000 + 2000)
}
