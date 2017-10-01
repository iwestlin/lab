function shuffle (arr) {
  arr = arr.slice()
  var i = arr.length - 1
  while (i) {
    var j = Math.floor(Math.random() * i)
    // [arr[j], arr[i]] = [arr[i], arr[j]]
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    i--
  }
  return arr
}

function genArr (n) {
  n = parseInt(n) || 0
  return Array(n).fill(0).map((v, i) => i + 1)
}

function p (k, n) {
  k = parseInt(k) || 0
  n = parseInt(n) || 0
  if (k > n || n <= 0 || k <= 0) {
    throw new Error('k 和 n 必须为正整数，且 k 不大于 n')
  }
  var x = k / n
  var sum = 0
  for (let i = k + 1; i <= n ; i++) {
    sum += 1 / (i - 1)
  }
  return x * sum
}

function best (n) {
  n = parseInt(n) || 0
  if (n !== n || n <= 0) {
    throw new Error('n 必须是正整数')
  }
  var a = genArr(n)
  var max = 0
  var index = 0
  for (let i = 1; i <= n; i++) {
    var temp = p(i, n)
    if (temp > max) {
      max = temp
      index = i
    }
  }
  return index
}
best(100) // 37

// function best2 (n) {
//   return Math.round(n * (1/Math.E))
// }
