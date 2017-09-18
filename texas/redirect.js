(function () {
  var regCN = /^zh/
  if (regCN.test(navigator.language)) {
    if (location.href[location.href.length - 1] === '/') {
      location.href += 'cn.html'
    } else {
      location.href = location.href.replace('index.html', 'cn.html')
    }
  }
})()
