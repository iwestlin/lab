// https://github.com/njpipeorgan/LightsOut
Array.prototype.xor = function (arr) {
  return this.map((v, i) => v ^ arr[i])
}

Array.prototype.times = function (arr) {
  return this.map((v, i) => v * arr[i])
}

function solveFirstRow (n) {
  n = parseInt(n) || 1
  if (n === 1) {
    return '1'
  }
  // 暴力穷举，可用高斯消元法(即解n元一次方程)提高效率
  var limit = Math.pow(2, n)
  var magic = iteration(n)
  for (var i = 0; i < limit; i++) {
    var str = i.toString(2)
    str = Array(n - str.length).fill('0').join('') + str
    if (checkStr(str, magic)) {
      return str
    }
  }
  throw new Error('no solution!')
}

// solveAll(5)
function solveAll (n) {
  var clicked = []
  var row = solveFirstRow(n).split('').map(Number)
  clicked.push(row.slice())
  var status = Array(n).fill().map(v => Array(n).fill().map(vv => 1))
  row.forEach((v, i) => {
    v && (status = click(0, i, status))
  })
  for (let i = 0; i < n - 1; i++) {
    var temp = []
    for (let j = 0; j < status[i].length; j++) {
      if (status[i][j]) {
        temp.push(1)
        status = click(i + 1, j, status)
      } else {
        temp.push(0)
      }
    }
    clicked.push(temp)
  }
  return clicked
}

function click (x, y, arr) {
  arr[x][y] ^= 1
  var len = arr.length
  var directions = [[-1, 0], [1, 0], [0, 1], [0, -1]]
  directions.forEach(xy => {
    var xx = x + xy[0]
    var yy = y + xy[1]
    if (0 <= xx && xx < len && 0 <= yy && yy < len) {
      arr[xx][yy] ^= 1
    }
  })
  return arr
}

function initA (n) {
  var a = Array(n).fill().map((v, i) => {
    return Array(n).fill().map((vv, j) => {
      return Math.abs(i - j) < 2 ? 1 : 0
    })
  })
  a.forEach(v => v.push(1))
  return a
}
// console.table(initA(5))

function initB (n) {
  var a = Array(n).fill().map((v, i) => {
    return Array(n).fill().map((vv, j) => {
      return i === j ? 1 : 0
    })
  })
  a.forEach(v => v.push(1))
  return a
}
// console.table(initB(5))

// A(n,·) = B(n,·) ^ A(n-1,·) ^ A(n,·) ^ A(n+1,·)
// B(n,·) = A(n,·) ^ ( 0 0 ... 0 | 1 )
function iteration (n) {
  var a = initA(n)
  var b = initB(n)
  for (let count = 0; count < n - 1; count++) {
    var bCopy = b.map(v => v.slice())
    b = b.map((v, i) => {
      var temp = Array(n).fill(0).concat(1)
      return a[i].xor(temp)
    })
    a = a.map((v, i) => {
      var result = v.xor(bCopy[i])
      if (i - 1 >= 0) {
        result = result.xor(a[i - 1])
      }
      if (i + 1 < a.length) {
        result = result.xor(a[i + 1])
      }
      return result
    })
  }
  return a.map(v => v.join(''))
}
// console.table(iteration(5))

function checkStr (str, arr) {
  str = str.split('').map(Number)
  var lastIndex = arr[0].length - 1
  for (let i = 0; i < arr.length; i++) {
    var temp = str.times(arr[i]).reduce((acc, val) => acc ^ val, 0)
    if (temp.toString() !== arr[i][lastIndex]) {
      return false
    }
  }
  return true
}
// checkStr('11000', iteration(5)) // true
