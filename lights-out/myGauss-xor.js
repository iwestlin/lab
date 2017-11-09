// doing all good while running gauss(iteration(n)), n<=30
// but when n getting larger than 30, something went wrong
// 一开始我打算利用 JavaScript 自带的异或运算以提高效率，却没考虑到当整数超过某个界限时会影响到符号位，所以当 n 大于 30 时，iteration(n) 生成的数组会包含负号……
// 早就应该定义一个下面这种的异或运算。。
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
  return a
}

function arraySort (a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) {
      return 1
    } else if (a[i] < b[i]) {
      return -1
    }
  }
  return 0
}

// solveRow([0,0,1,1,1,0])
function solveRow (n) {
  if (parseInt(n.join('')) <= 1) {
    return [0]
  }
  n = n.join('').replace(/^0+/g, '') // '1110'
  var l = n.length - 1
  var right = parseInt(n[l]) // 0
  var left = n.slice(0, l).split('').map(Number) // [1,1,1]
  var len = left.length
  for (let i = 0; i < 2 ** len; i++) {
    var a = i.toString(2)
    a = Array(len - a.length).fill('0').join('') + a
    a = a.split('').map(Number)
    if (a.times(left) % 2 === right) {
      return a // [0,0,0]
    }
  }
  throw new Error('no solution for ' + n)
}

function removeAllZero (arr) {
  arr = arr.map(v => v.join(''))
  var result = []
  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i])) {
      result.push(arr[i])
    }
  }
  return arr.map(v => v.split('').map(Number))
}

// var arr = iteration(5) // ["011011", "111000", "110110", "001110", "101101"]
// console.log(gauss(arr)) // '11000'
function gauss (arr) {
  var len = arr.length
  arr.sort((a, b) => arraySort(b, a))
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i].indexOf(1) === arr[j].indexOf(1)) {
        arr[j] = arr[j].xor(arr[i])
      }
    }
    arr.sort((a, b) => arraySort(b, a))
  }
  arr.sort((a, b) => arraySort(a, b))
  arr = removeAllZero(arr)
  var theRow = arr[0] || 0 // like iteration(4), arr is []
  if (theRow === 0) {
    return Array(len).fill('0').join('')
  }
  var solution = solveRow(theRow) // [0,0,0] 相当于添加行使矩阵满秩
  // which means last 3 buttons in first row should not be clicked
  if (solution.length === len) {
    return solution.join('')
  }
  arr = arr.slice(1)
  if (solution.length + arr.length < len) {
  // 如果A还不满秩，则递归调用本函数
    solution = solution.map((v, i) => {
      var a = Array(len).fill(0)
      a[i] = 1
      a.push(v)
      return a
    })
    console.log('gauss recur')
    return gauss(arr.concat(solution))
  }
  // 前五列所组成的矩阵满秩后，可用其逆矩阵乘以最后一列得到结果
  return solveFullRank(arr, solution.reverse(), len)
}

// arr双重数组,solution一重数组,rank矩阵的秩
// return some string like '11000' which means click 1st and 2nd button in first row
function solveFullRank (arr, solution, rank) {
  if (arr.length <= 1 && parseInt(arr[0].join('')) <= 1) {
    console.log(arr, solution)
    throw new Error('wtf?')
  }
  var temp = solution.map((v, i) => {
    var a = Array(rank).fill(0)
    a[rank - 1 - i] = 1
    a.push(v)
    return a
  })
  arr = arr.map(v => {
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === undefined) break
      var index = temp[i].indexOf(1) // 报错
      if (v[index]) {
        v = v.xor(temp[i])
      }
    }
    return v
  })
  arr.sort((a, b) => arraySort(a, b))
  arr = arr.map(v => v.join(''))
  var toBeRemoved = []
  for (let i = 0; i < arr.length; i++) {
    var n = arr[i].slice(0, -1).split('')
    var sum = n.map(Number).reduce((x, y) => x + y, 0)
    if (sum === 1) {
      solution[rank - 1 - n.indexOf('1')] = Number(arr[i][arr[i].length - 1])
      toBeRemoved.push(arr[i])
    }
    if (arr[i].replace(/0/g, '') === '') {
      // solution = solution.map((v, i) => ...
      // return gauss(arr.map(v => v.split('').map(Number)).concat(solution))
      solution.push(0)
      // console.log('solution pushed 0')
      toBeRemoved.push(arr[i])
    }
  }
  if (solution.length === rank) {
    return solution.join('')
  }
  toBeRemoved.forEach(v => {
    arr = arr.remove(v)
  })
  arr = arr.map(v => v.split('').map(Number))
  return solveFullRank(arr, solution, rank)
}

// check('11000', iteration(5)) // true
function check (str, arr) {
  str = str.split('').map(Number)
  var lastIndex = arr[0].length - 1
  for (let i = 0; i < arr.length; i++) {
    var temp = str.times(arr[i]) % 2
    if (temp !== arr[i][lastIndex]) {
      return false
    }
  }
  return true
}

// checkRange(1, 200) // all true
function checkRange (m, n) {
  for (let i = m; i <= n; i++) {
    var a = iteration(i)
    if (check(gauss(a.map(v => v.slice())), a)) {
      console.log('true on ' + i)
    } else {
      console.log('false on ' + i)
    }
  }
}
