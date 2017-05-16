// 先登录 https://m.weibo.cn, 点击自己 ID 进入个人微博页面，打开浏览器控制台（F12），复制以下代码到控制台后，按 enter 执行。
var oldsh = 0
var backupData = []
var loop = setInterval(scrollToBottom, 1000)
// 如果网速较慢，最好设置比 1000 更大的数字，比如 2000，即每 2 秒向下滚动一次

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
function createCardObj (privacy, date, comefrom, content, imgs) {
  return {
    privacy: privacy,
    date: date,
    comefrom: comefrom,
    content: content,
    imgs: imgs
  }
}
function scrollToBottom () {
  var sh = document.body.scrollHeight
  if (oldsh !== sh) {
    window.scroll(0, sh)
    oldsh = sh
  } else {
    clearInterval(loop)
    getAllWeibo()
  }
}
function getAllWeibo () {
  backupData = []
  var cards = document.getElementsByClassName('card9')
  for (let i = 0; i < cards.length; i++) {
    var card = cards[i]
    var privacy = card.getElementsByTagName('h4')[0].textContent
    var date = card.getElementsByClassName('time')[0].textContent
    var comefromArr = card.getElementsByClassName('from')[0].textContent.trim().split(' ')
    var comefrom = comefromArr.pop().replace('#', '\\#') // 转义微博 hashtag，防止识别成 h1
    var contentElem = card.getElementsByClassName('weibo-main')[0]
    var content = contentElem.innerText.trim().replace('#', '\\#')
    var imgs = []
    var imgsElem = contentElem.querySelectorAll('.weibo-media img')
    for (let j = 0; j < imgsElem.length; j++) {
      imgs.push(imgsElem[j].src.replace('/orj360/', '/large/'))
    }
    backupData.push(createCardObj(privacy, date, comefrom, content, imgs))
  }
  generateMarkdown()
}
function generateMarkdown () {
  var result = ''
  for (let i = 0; i < backupData.length; i++) {
    var s = ''
    var data = backupData[i]
    var imgstr = ''
    for (let j = 0; j < data.imgs.length; j++) {
      imgstr += ' ' + '[' + (j + 1) + '](' + data.imgs[j] + ')'
    }
    s += '- 隐私： ' + data.privacy + '\n'
    s += '- 来自： ' + data.comefrom + '\n'
    s += '- 时间： ' + data.date + '\n'
    s += '- 内容： ' + data.content + '\n'
    if (imgstr) {
      s += '- 图片：' + imgstr + '\n'
    }
    s += '***\n'
    result += s
  }
  download('微博备份.md', result)
}
