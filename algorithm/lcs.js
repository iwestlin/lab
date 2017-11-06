var a = '1234helloworld2j3293gdgdg6464642093jdklwjflwewt423412897491274uhrf12rfr12'
var b = '03424helloworldfdfcp043p92jflkf79hhedhey464w6hsry4648721fjbmcvszfq39wnf39804'
console.log(lcs(a, b)) // 24helloworld2j9d64646429wf384

function lcs (a, b) {
  var cache = {}
  function rec (m, n) {
    var key = m + '-' + n
    if (cache[key]) {
      return cache[key]
    }
    if (m === 0 || n === 0) {
      cache[key] = ''
    } else if (a[m] === b[n]) {
      cache[key] = rec(m - 1, n - 1) + a[m]
    } else {
      cache[key] = longer(rec(m - 1, n), rec(m, n - 1))
    }
    return cache[key]
  }
  return rec(a.length - 1, b.length - 1)
}

function longer (a, b) {
  return a.length >= b.length ? a : b
}
