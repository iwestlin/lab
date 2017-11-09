// http://yanhaijing.com/inverter/
var rows = document.getElementsByClassName('row')
play('101000000101')

function fakeClick (x, y) {
  var tile = rows[x].getElementsByClassName('square')[y]
  tile.click()
  tile.style.opacity = 0.7
}

function play (str) {
  var solutions = solveAll(str)
  var delay = 0
  solutions.forEach((v, x) => {
    v.forEach((vv, y) => {
      if (vv) {
        delay += 100
        setTimeout(() => {
          fakeClick(x, y)
        }, delay)
      }
    })
  })
}

function solveAll (str) {
  var n = str.length
  var clicked = []
  var row = str.split('').map(Number)
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
