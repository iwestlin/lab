var gameArr, level, prefectSteps, gameStr, tiles
var selectedColor = ''
var usedSteps = 0
var WIDTH = 10
var HEIGHT = 16
var colors = [
  '#6AC6AF', // blue
  '#FF676C', // red
  '#28343A', // gray
  '#FFBD68', // yellow
  '#D9A989', // pale
  '#315960', // dark
  '#FF854A', // orange
  '#352E26', // ninght
  '#241606', // pattern
  '#E0BEC3'
]

var board = document.getElementById('board')
var us = document.getElementById('us')
var ps = document.getElementById('ps')
var levels = document.getElementById('levels')
var selects = document.getElementById('selects')
var choose = document.getElementById('chooseLevel')
var win = document.getElementById('win')

window.onload = function () {
  for (let i = 0; i < levelsData.length; i++) {
    var butt = document.createElement('button')
    butt.innerText = i + 1
    butt.onclick = function () {
      init(i)
    }
    choose.appendChild(butt)
  }
  init(4)
}

function init (n) {
  selectedColor = ''
  usedSteps = 0
  level = levelsData[n].level
  prefectSteps = levelsData[n].prefectSteps
  gameStr = levelsData[n].gameStr
  levels.innerText = level
  ps.innerText = prefectSteps
  us.innerText = usedSteps
  win.innerText = ''
  gameArr = createBoardArray(gameStr)
  createBoard(gameArr)
  createSelects(gameStr)
  tiles = []
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      let id = i + '-' + j
      tiles[id] = document.getElementById(id)
    }
  }
}

function createSelects (s) {
  selects.innerHTML = ''
  s = new Set(s)
  s = Array.from(s)
  var h = parseInt(getComputedStyle(board).height) / s.length + 'px'
  for (let i = 0; i < s.length; i++) {
    var elem = document.createElement('div')
    elem.setAttribute('data-color', s[i])
    elem.style.backgroundColor = colors[parseInt(s[i])]
    elem.style.height = h
    elem.onclick = function () {
      selectedColor = parseInt(this.dataset.color)
      var ss = document.getElementsByClassName('selected')
      for (let i = 0; i < ss.length; i++) {
        ss[i].className = ''
      }
      this.className = 'selected'
    }
    selects.appendChild(elem)
  }
}

function createBoardArray (game) {
  var r = []
  for (let i = 0; i < HEIGHT; i++) {
    var temp = []
    for (let j = 0; j < WIDTH; j++) {
      temp.push(parseInt(game[i * WIDTH + j]))
    }
    r.push(temp)
  }
  return r
}

function createBoard (arr) {
  board.innerHTML = ''
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      var elem = document.createElement('div')
      elem.setAttribute('class', 'tile')
      elem.setAttribute('id', i + '-' + j)
      elem.style.backgroundColor = colors[arr[i][j]]
      elem.onclick = function () {
        if (selectedColor === '') { return }
        changeColor(i, j, colors[selectedColor])
        usedSteps++
        us.innerText = usedSteps
        if (isDone(gameArr)) {
          doneWithClick()
          setTimeout(function () {
            if (usedSteps <= prefectSteps) {
              win.innerText = 'Prefect!'
            } else if (usedSteps - prefectSteps < 3) {
              win.innerText = 'OK'
            } else {
              win.innerText = 'Just so so'
            }
          }, 2000)
        }
      }
      board.appendChild(elem)
    }
  }
}

function getGroup (arr, x, y, color) {
  var result = []
  var checked = []
  var type = arr[x][y]
  connect(x, y)
  var delay = 100
  var changed = [x + '-' + y]
  change(x, y)
  return result

  function connect (x, y) {
    var str = x + '-' + y
    if (checked.indexOf(str) < 0) {
      checked.push(str)
      result.push([x, y])
      if (arr[x - 1] && arr[x - 1][y] === type) {
        connect(x - 1, y)
      }
      if (arr[x + 1] && arr[x + 1][y] === type) {
        connect(x + 1, y)
      }
      if (arr[x][y - 1] === type) {
        connect(x, y - 1)
      }
      if (arr[x][y + 1] === type) {
        connect(x, y + 1)
      }
    }
  }
  function change (x, y) {
    var id = x + '-' + y
    // document.getElementById(id).style.backgroundColor = color
    tiles[id].style.backgroundColor = color
    var shang = (x - 1) + '-' + y
    if (checked.indexOf(shang) >= 0 && changed.indexOf(shang) < 0) {
      changed.push(shang)
      setTimeout(function () {
        change(x - 1, y)
      }, delay)
    }
    var xia = (x + 1) + '-' + y
    if (checked.indexOf(xia) >= 0 && changed.indexOf(xia) < 0) {
      changed.push(xia)
      setTimeout(function () {
        change(x + 1, y)
      }, delay)
    }
    var zuo = x + '-' + (y - 1)
    if (checked.indexOf(zuo) >= 0 && changed.indexOf(zuo) < 0) {
      changed.push(zuo)
      setTimeout(function () {
        change(x, y - 1)
      }, delay)
    }
    var you = x + '-' + (y + 1)
    if (checked.indexOf(you) >= 0 && changed.indexOf(you) < 0) {
      changed.push(you)
      setTimeout(function () {
        change(x, y + 1)
      }, delay)
    }
  }
}

function changeColor (x, y, color) {
  var c = color
  var groups = getGroup(gameArr, x, y, color)
  for (let i = 0; i < groups.length; i++) {
    gameArr[groups[i][0]][groups[i][1]] = colors.indexOf(c)
  }
}

function isDone (arr) {
  arr = Array.prototype.concat.apply([], arr)
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] !== arr[i + 1]) {
      return false
    }
  }
  return true
}

function doneWithClick () {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      tiles[i + '-' + j].onclick = ''
    }
  }
}
