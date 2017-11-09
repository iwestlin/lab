// doing all good while running gauss(iteration(n)), n<=30
// but when n getting larger than 30, something went wrong
// 一开始我打算利用 JavaScript 自带的异或运算以提高效率，却没考虑到当整数超过某个界限时会影响到符号位，所以当 n 大于 30 时，iteration(n) 生成的数组会包含负号……
// 早就应该定义一个像下面这样的异或运算。。
Array.prototype.xor = function (arr) {
  return this.map((v, i) => v ^ arr[i])
}

Array.prototype.times = function (arr) {
  return this.map((v, i) => v * arr[i]).reduce((acc, val) => acc + val, 0)
}

Array.prototype.remove = function (n) {
  var result = []
  this.forEach(v => {
    if (v !== n) {
      result.push(v)
    }
  })
  return result
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

function initB (n) {
  var a = Array(n).fill().map((v, i) => {
    return Array(n).fill().map((vv, j) => {
      return i === j ? 1 : 0
    })
  })
  a.forEach(v => v.push(1))
  return a
}

function iteration (n) {
  var a = initA(n).map(v => {
    v = v.join('')
    return parseInt(v, 2)
  })
  var b = initB(n).map(v => {
    v = v.join('')
    return parseInt(v, 2)
  })
  for (let count = 0; count < n - 1; count++) {
    var bCopy = b.slice()
    b = b.map((v, i) => {
      return a[i] ^ 1
    })
    a = a.map((v, i) => {
      var result = v ^ bCopy[i]
      if (i - 1 >= 0) {
        result ^= a[i - 1]
      }
      if (i + 1 < a.length) {
        result ^= a[i + 1]
      }
      return result
    })
  }
  return a.map(v => v.toString(2)).map(v => Array(n + 1 - v.length).fill('0').join('') + v)
}

var arr = iteration(5) // ["011011", "111000", "110110", "001110", "101101"]
// gauss(arr) // '11000'
function gauss (arr) {
  var len = arr.length
  arr = arr.map(v => parseInt(v, 2))
  arr.sort((a, b) => b - a)
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i].toString(2).length === arr[j].toString(2).length) {
        arr[j] ^= arr[i]
      }
    }
    arr.sort((a, b) => b - a)
  }
  arr.sort((a, b) => a - b)
  arr = arr.remove(0)
  var theRow = arr[0] || 0 // 14
  if (theRow === 0) { // like iteration(4)
    return Array(len).fill('0').join('')
  }
  var solution = solveRow(theRow) // [0,0,0] 相当于添加行使矩阵满秩
  // which means last 3 buttons in first row should not be clicked
  if (solution.length === len) {
    return solution.join('')
  }
  arr = arr.remove(theRow) // [56, 27]
  if (solution.length + arr.length < len) { // 如果A还不满秩，递归调用本函数
    solution = solution.map((v, i) => {
      var a = Array(len).fill(0)
      a[i] = 1
      a.push(v)
      return parseInt(a.join(''), 2)
    })
    return gauss(arr.concat(solution).map(v => v.toString(2)))
  }
  // 前五列所组成的矩阵满秩后，可用其逆矩阵乘以最后一列得到结果
  return solveFullRank(arr, solution.reverse(), len) // some string like '11000'
  // which means click 1st and 2nd button in first row
}

function solveFullRank (arr, solution, rank) {
  // console.log(arr, solution)
  if (arr.length <= 1 && arr[0] <= 1) {
    console.log(arr, solution)
    return
  }
  var temp = solution.map((v, i) => {
    var a = Array(rank).fill(0)
    a[rank - 1 - i] = 1
    a.push(v)
    return parseInt(a.join(''), 2)
  })
  arr = arr.map(v => {
    for (let i = 0; i < temp.length; i++) {
      if ((v >> (i + 1)) % 2) {
        v ^= temp[i]
      }
    }
    return v
  })
  arr.sort((a, b) => a - b)
  var toBeRemoved = []
  for (let i = 0; i < arr.length; i++) {
    var power = Math.log2(arr[i] >> 1)
    if (power === parseInt(power)) {
      // solution.push(arr[i] % 2)
      solution[power] = arr[i] % 2
      toBeRemoved.push(arr[i])
    }
  }
  if (arr.indexOf(0) >= 0) {
    arr = arr.remove(0)
    solution.push(0)
  }
  if (solution.length === rank) {
    return solution.join('')
  } else {
    toBeRemoved.forEach(v => {
      arr = arr.remove(v)
    })
    return solveFullRank(arr, solution, rank)
  }
}

// solveRow(14) // [0,0,0]
function solveRow (n) {
  if (n <= 1) {
    return [0]
  }
  n = n.toString(2) // '1110'
  var l = n.length - 1
  var right = parseInt(n[l]) // 0
  var left = n.slice(0, l).split('').map(Number) // [1,1,1]
  var len = left.length
  for (let i = 0; i < 2 ** len; i++) {
    var a = i.toString(2)
    a = Array(len - a.length).fill('0').join('') + a
    a = a.split('').map(Number)
    if (a.times(left)[0] === right) {
      return a
    }
  }
  throw new Error('no solution for ' + n)
}
