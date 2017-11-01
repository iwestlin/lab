// first run 2~13 lines in pages like https://movie.douban.com/celebrity/1325852/photos/
copy(getImgLinks().join('|'))
window.open('https://img1.doubanio.com/')

function getImgLinks () {
  var imgs = document.querySelectorAll('.cover img')
  var a = Array(imgs.length).fill().map((_, i) => imgs[i].src)
  return a.map(getRawImageLink)
}

function getRawImageLink (s) {
  return s.replace('/m/', '/raw/').replace('.webp', '.jpg')
}

// then paste below and run script in the new opened tab's console

var s = 'paste here'
start(s)

var getFileName = (function () {
  var i = 0
  return function () {
    i++
    return i + '.jpg'
  }
})()

function cb (response, fileName) {
  fileName = fileName || 'douban.jpg'
  var bb = new Blob([response], {type: 'image/jpeg'})
  var a = document.createElement('a')
  a.download = fileName
  a.href = URL.createObjectURL(bb)
  a.click()
}

function httpRequest (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.response, getFileName())
    }
  }
  xhr.send()
}

function start (s) {
  s = s.split('|')
  s.forEach((v, i) => {
    setTimeout(() => {
      httpRequest(v, cb)
    }, i * 500)
  })
}
