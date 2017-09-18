var state, loop
var tiles = document.getElementsByClassName('tile')
var inp = document.getElementById('inp')
start(333)

function delay (t) {
  clearInterval(loop)
  loop = setInterval(refresh, t)
}

function change () {
  var p = parseInt(inp.value) || 50
  // var t = parseInt(inp2.value) || 333
  initState(p)
  paint()
  // start(t)
}

function randomOneZero (p) {
  var cutoff = p / 100
  return Math.random() < cutoff ? 1 : 0
}

function initState (probability) {
  state = []
  for (let i = 0; i < HEIGHT; i++) {
    var row = []
    for (let j = 0; j < WIDTH; j++) {
      row.push(randomOneZero(probability))
    }
    state.push(row)
  }
}

// function glinder () {
//   state = state.map(v => Array(v.length).fill(0))
//   state[0][2] = 1
//   state[1][0] = 1
//   state[1][2] = 1
//   state[2][1] = 1
//   state[2][2] = 1
// }

function paint () {
  for (var i = 0; i < HEIGHT; i++) {
    for (var j = 0; j < WIDTH; j++) {
      var index = i * WIDTH + j
      if (state[i][j]) {
        tiles[index].style.backgroundColor = '#666'
      } else {
        tiles[index].style.backgroundColor = '#ddd'
      }
    }
  }
}

function updateState () {
  var stateCopy = state.map(v => v.slice())
  for (var i = 0; i < HEIGHT; i++) {
    for (var j = 0; j < WIDTH; j++) {
      var liveNbs = checkNeighbour(i, j)
      if (state[i][j]) {
        if (liveNbs < 2 || liveNbs > 3) {
          stateCopy[i][j] = 0
        }
      } else {
        if (liveNbs === 3) {
          stateCopy[i][j] = 1
        }
      }
    }
  }
  state = stateCopy
}

function checkNeighbour (i, j) {
  var count = 0
  var nbs = [[-1, -1], [1, -1], [1, 1], [-1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]
  nbs.forEach(v => {
    var ni = i + v[0]
    var nj = j + v[1]
    if (0 <= ni && ni < HEIGHT && 0 <= nj && nj < WIDTH) {
      state[ni][nj] && count++
    }
  })
  return count
}

function refresh () {
  updateState()
  paint()
}

function start (t) {
  clearInterval(loop)
  initState(50)
  paint()
  loop = setInterval(refresh, t)
}
