function coin (n) {
  n = parseInt(n) || 1
  if (Math.random() > 1 / 2) {
    return n
  } else {
    return coin(++n)
  }
}

function rollCoin (n) {
  n = parseInt(n)
  var r = []
  for (let i = 0; i < n; i++) {
    var index = coin()
    if (r[index] !== undefined) {
      r[index] += 1
    } else {
      r[index] = 0
    }
  }
  r =  Array(r.length).fill(0).map((_, i) => r[i] || 0)
  var sum = 0
  r.forEach((v, i) => {
    sum += v * i
  })
  return sum / n
}
rollCoin(10000) // 约等于2
