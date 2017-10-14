// https://github.com/chuduyunhuan/dataStructure-for-JS/issues/1
function sameString (str1, str2) {
  var result = ''
  for (let i = 0; i < str1.length; i++) {
    let char = str1[i]
    let idx = str2.indexOf(char, 0)
    while (idx !== -1) {
      let j = 1
      while (str1[i + j] === str2[idx + j] && (i + j) < str1.length && (idx + j) < str2.length) {
        j++
      }
      result = result.length < j ? str1.slice(i, i + j) : result
      idx = str2.indexOf(char, idx + 1)
    }
  }
  return result
}

var a = '1234helloworld2j3293gdgdg6464642093jdklwjflwewt423412897491274uhrf12rfr12'
var b = '03424helloworldfdfcp043p92jflkf79hhedhey464w6hsry4648721fjbmcvszfq39wnf39804'
console.time('sameString')
console.log(sameString(a, b))
console.timeEnd('sameString')

function longestCommonSubstring (a, b) {
  function lcs (m, n) {
    var r = ''
    for (let i = m; i < a.length; i++) {
      if (a[i] === b[n]) {
        r += a[i]
        n++
      } else {
        break
      }
    }
    return r
  }
  var result = ''
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      var temp = lcs(i, j)
      result = temp.length > result.length ? temp : result
    }
  }
  return result
}

console.time('longestCommonSubstring')
console.log(longestCommonSubstring(a, b))
console.timeEnd('longestCommonSubstring')
