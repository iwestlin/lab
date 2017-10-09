function myRandom (m, n) {
  m = parseInt(m) || 0
  n = parseInt(n) || 0
  return Array(m).fill(0).map(v => Math.round(Math.random() * n))
}

function mySearch (num) {
  num = parseInt(num) || -1
  var a = myRandom(20, 30)
  a = new Set(a)
  a = Array.from(a)
  a = a.sort((a, b) => a - b)
  // console.log(num, a, getIndex(num, a), a.indexOf(num))
  return getIndex(num, a) === a.indexOf(num)
}
// Array(100).fill().forEach(v => mySearch(15) || alert('wrong'))

function getIndex(v, a) {
  var result = -1
  var start = 0
  var final = a.length - 1
  function mustBeIn(start, final) {
    while(start <= final) {
      var middle = Math.floor((start + final) / 2)
      var am = a[middle]
      if (am < v) {
        start = middle + 1
      } else if (am === v) {
        result = middle
        return
      } else {
        final = middle - 1
      }
    }
  }
  mustBeIn(start, final)
  return result
}
