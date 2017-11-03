var a = [
  [0, 1],
  [1, 1]
]
console.table(matrixPower(a, 10)) // 斐波那契数列
// https://www.zhihu.com/question/25217301

function matrixPower (a, n) {
  var copy = a.map(v => v.slice())
  for (let i = 0; i < n; i++) {
    a = times(a, copy)
  }
  return a
}

function time (a, b) {
  a = a.map((v, i) => v * b[i])
  return a.reduce((x, y) => x + y, 0)
}

function getColumn (m, j) {
  return Array(m.length).fill().map((_, i) => m[i][j])
}

function times (m1, m2) {
  // if (isSquareMatrix(m1) && isSquareMatrix(m2) && m1.length === m2.length) {
  if (isMatrix(m1) && isMatrix(m2) && m1[0].length === m2.length) {
    return Array(m1.length).fill().map((_, i) => Array(m2[0].length).fill().map((v, j) => time(m1[i], getColumn(m2, j))))
  } else {
    // console.log('arguments must be 2 square matrixes with same order!')
    throw new Error('Can not multiply!')
  }
}

function isMatrix (a) {
  if (a.length > 0) {
    var len = a[0].length || 1
    for (let i = 1; i < a.length; i++) {
      if (a[i].length !== len) {
        return false
      }
    }
    return true
  }
  return false
}

function isSquareMatrix (a) {
  var len = a.length
  if (len) {
    for (let i = 0; i < len; i++) {
      if (len !== a[i].length) {
        return false
      }
    }
    return true
  }
  return false
}
