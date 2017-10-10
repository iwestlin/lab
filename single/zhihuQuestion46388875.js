// https://www.zhihu.com/question/46388875/answer/104348996
var results = []

function getP (n) {
  n = parseInt(n) || 0
  if (n < 10) {
    return 0
  } else if (n === 10) {
    return 0.5 ** 10
  } else {
    if (results[n] !== undefined) {
      return results[n]
    } else {
      var temp = getP(n - 1) + (1 - getP(n - 10)) / (2 ** 11)
      results[n] = temp
      return temp
    }
  }
}

console.log(getP(1000)) // 0.38530372394547274 (JavaScript 误差？)

// https://www.zhihu.com/question/46388875/answer/101108234
var matrix = [
  [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0],
  [0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 1]
]

function mySum (a, b) {
  a = a.map((v, i) => v * b[i])
  return a.reduce((x, y) => x + y, 0)
}

function repeat (n) {
  n = parseInt(n) || 0
  var state = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let i = 0; i < n; i++) {
    var copy = state.slice()
    state = state.map((_, index) => mySum(copy, matrix[index]))
  }
  return state
}

console.log(repeat(1000)[10]) // 0.3854497524124812 (应该是准确值)
