var a = [
  [0, 1],
  [1, 1]
]
console.table(matrixPower(a, 10))

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
  if (!isSquareMatrix(m1) || !isSquareMatrix(m2)) {
    console.log('arguments must be square matrixes!')
  } else {
    var len = m1.length
    return Array(len).fill().map((_, i) => Array(len).fill().map((v, j) => time(m1[i], getColumn(m2, j))))
  }
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
