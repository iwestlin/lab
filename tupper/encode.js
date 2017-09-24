var jieshu = (height, width) => Array(height).fill().map((_, h) => Array(width).fill().map((_, w) => w * height + (height - 1 - h)))

function getNumber (a) {
  // var js = jieshu(a.length, a[0].length)
  var js = jieshu(height, width)
  var sum = bigInt(0)
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      // sum += a[i][j] << js[i][j]
      if (a[i][j]) {
        sum = sum.plus(bigInt(2).pow(js[i][j]))
      }
    }
  }
  return sum.multiply(height).toString()
}
// var a = [[0,1,0],[1,1,1],[1,1,0]]
// getNumber(a) // 187

function getArray (s) {
  var a = s.split('\n')
  return a.map(v => v.split('').map(vv => {
    if (vv === '*') {
      return 1
    } else {
      return 0
    }
  }))
}
