// http://poj.org/problem?id=1088
var board = [
  [1, 2, 3, 4, 5],
  [16,17,18,19,6],
  [15,24,25,20,7],
  [14,23,22,21,8],
  [13,12,11,10,9]
]
var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

getLongestSteps(board) // 24

function getLongestSteps (board) {
  var HEIGHT = board.length
  var WIDTH = board[0].length
  var cache = Array(board.length).fill().map(v => Array(board[0].length).fill(0))
  traversal(cache, board)
  console.table(cache)
  return Math.max(...flatten(cache))
}

function flatten (arr) {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
}

function getValue (x, y, board) {
  return (0 <= x && x < board.length && 0 <= y && y < board[0].length) ? board[x][y] : Infinity
}

function traversal (cache, board) {
  var changed = false
  directions.forEach(xy => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        var ii = i + xy[0]
        var jj = j + xy[1]
        if (board[i][j] > getValue(ii, jj, board)) {
          if (cache[ii][jj] + 1 > cache[i][j]) {
            changed = true
            cache[i][j] = cache[ii][jj] + 1
          }
        }
      }
    }
  })
  changed && traversal(cache, board)
}

// function generateBoard (height, width) {
//   return Array(height).fill().map(_ => Array(width).fill().map(v => parseInt(Math.random() * 100)))
// }

// function test (h, w) {
//   var board = generateBoard(h, w)
//   console.table(board)
//   getLongestSteps(board)
// }
// test(5, 5)
