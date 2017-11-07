function genAllBin (n) {
  var result = []
  var limit = 1 << (n * n)
  for (let i = limit - 1; i >= 0; i--) {
    result.push(i.toString(2))
  }
  return result.map(v => Array(n * n - v.length).fill('0').join('') + v)
}
genAllBin(3)

function strToBoard (str, width) {
  return Array(width).fill().map((v, i) => Array(width).fill().map((vv, j) => Number(str[i * width + j])))
}

function getNeighbours (row, col, arr) {
  var directions = [[-1, 0], [1, 0], [0, 1], [0, -1]]
  var result = [arr[row][col]]
  var height = arr.length
  var width = arr[0].length
  directions.forEach(xy => {
    var x = row + xy[0]
    var y = col + xy[1]
    if (0 <= x && x < height && 0 <= y && y < width) {
      result.push(arr[x][y])
    }
  })
  return result
}

function oneLightOn (x, y, arr, state) { // return 1 if light on
  state = state || 1
  var nbs = getNeighbours(x, y, arr)
  return nbs.reduce((acc, val) => acc ^ val, state)
}

function allLightsOut (str) {
  var width = Math.sqrt(str.length)
  var clickArray = strToBoard(str, width)
  for (let i = 0; i < clickArray.length; i++) {
    for (let j = 0; j < clickArray[0].length; j++) {
      if (oneLightOn(i, j, clickArray)) {
        return false
      }
    }
  }
  return true
}
// allLightsOut('0100000110000010') // true

function solve (n) {
  var all = genAllBin(n)
  for (let i = 0; i < all.length; i++) {
    var str = all[i]
    if (allLightsOut(str)) {
      return str
    }
  }
  throw new Error('no solution!')
}
solve(4) // take 1 sec, slove(5) will not stop...
