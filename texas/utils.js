function toPercent (n) {
  n = Number(n) * 100
  n = n.toFixed(2)
  return n + '%'
}

function id (s) {
  return document.getElementById(s)
}

function randomPick (n, m) {
  if (Math.abs(parseInt(n)) !== n || Math.abs(parseInt(m)) !== m || n < m || n === 0 || m === 0) {
    console.log('randomPick的参数为两个正整数，且前者不能小于后者！')
    return
  }
  var result = []
  while (true) {
    var r = Math.floor(Math.random() * n)
    if (result.indexOf(r) === -1) {
      result.push(r)
    }
    if (result.length === m) {
      return result
    }
  }
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

function arrayWithout (arr, deletes) {
  for (var i = 0; i < deletes.length; i++) {
    arr.remove(deletes[i])
  }
  return arr
}

function myConcat (arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i].join('_'))
  }
  return result
}

function combNumber (x, y) {
  var a = 1
  var b = 1
  for (var i = y; i > 0; i--) {
    a *= x
    x -= 1
    b *= i
  }
  return a / b
}

function combination (arr, num) {
  var r = [];
  (function f (t, a, n) {
    if (n === 0) {
      return r.push(t)
    }
    for (var i = 0, l = a.length; i <= l - n; i++) {
      f(t.concat(a[i]), a.slice(i + 1), n - 1)
    }
  })([], arr, num)
  return r
}

function arrayMultiply (a1, a2) {
  var result = []
  for (var i = 0; i < a1.length; i++) {
    for (var j = 0; j < a2.length; j++) {
      result.push([a1[i], a2[j]])
    }
  }
  return result
}

function arrayize (arr) {
  let mysuits = Array(4).fill(0)
  let myvalues = Array(13).fill(0)
  for (let i = 0; i < arr.length; i++) {
    if (SUITS.indexOf(arr[i][0]) > -1) {
      mysuits[SUITS.indexOf(arr[i][0])] += 1
    }
    if (VALUES.indexOf(arr[i][1]) > -1) {
      myvalues[VALUES.indexOf(arr[i][1])] += 1
    }
  }
  return [mysuits, myvalues]
  // like [[2,1,2,0], [1,1,1,1,1,0,0,0,0,0,0,0,0]]
  // which means 2 spades, 1 heart, 2 club, with value of A,K,Q,J,10
}

// function getCardsValue (arr) {
//   return detect(arrayize(arr))[1]
// }

function gen () {
  var cache = {}
  function getCardsValue (arr) {
    arr = arrayize(arr)
    var flush = isFlush(arr[0])
    var index = getIndex(flush, arr[1])
    var cached = cache[index]
    if (cached) return cached
    var value = detect(arr)[1]
    cache[index] = value
    return value
  }
  return getCardsValue
}

var getCardsValue = gen()

function isFlush (arr) {
  return Math.max(...arr) === 5
}

function getIndex (bool, arr) {
  var s = '0123456789abc'
  var result = bool ? '1' : '0'
  // return result += arr.map((v, i) => (v ? Array(v).fill(s[i]).join('') : '')).join('')
  return result += arr.join('')
}
