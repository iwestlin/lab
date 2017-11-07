// http://yanhaijing.com/inverter/
var rows = document.getElementsByClassName('row')
var solutions = [
  [1,1,0,1,0,1,1],
  [1,1,1,0,1,1,1],
  [0,1,1,0,1,1,0],
  [1,0,0,1,0,0,1],
  [0,1,1,0,1,1,0],
  [1,1,1,0,1,1,1],
  [1,1,0,1,0,1,1]
]

function fakeClick (x, y) {
  var tile = rows[x].getElementsByClassName('square')[y]
  tile.click()
  tile.style.opacity = 0.7
}

function play (n) {
  var solutions = solveAll(n)
  var delay = 0
  solutions.forEach((v, x) => {
    v.forEach((vv, y) => {
      if (vv) {
        delay += 200
        setTimeout(() => {
          fakeClick(x, y)
        }, delay)
      }
    })
  })
}
play(12)
