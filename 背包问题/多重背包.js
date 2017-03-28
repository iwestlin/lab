// https://github.com/lo-enterprise/bkp/blob/master/index.js
// data.length = 38; maxWeight = 400
var bounded = function (data, maxWeight) {
  var m = [[0]] // maximum pack value found so far
  // [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
  var b = [[0]] // best combination found so far
  var opts = [0] // item index for 0 of item 0
  // [0, 1, 2, 4, 6, 8, 11, 14, 17, 18, 21, 22, 23, 25, 27, 28, 29, 30, 31, 32, 34, 35, 37]
  var P = [1] // item encoding for 0 of item 0
  // [1, 2, 4, 12, 36, 108, 432, 1728, 6912, 13824, 55296, 110592, 221184, 663552, 1990656, 3981312, 7962624, 15925248, 31850496, 63700992, 191102976, 382205952, 1146617856]
  var choose = 0
  var j
  for (j = 0; j < data.length; j++) {
    opts[j + 1] = opts[j] + data[j].pieces // item index for 0 of item j+1
    P[j + 1] = P[j] * (1 + data[j].pieces) // item encoding for 0 of item j+1
  }
  for (j = 0; j < opts[data.length]; j++) {
    m[0][j + 1] = b[0][j + 1] = 0 // best values and combos for empty pack: nothing
  }
  for (var w = 1; w <= maxWeight; w++) {
    m[w] = [0]
    b[w] = [0]
    for (j = 0; j < data.length; j++) {
      var N = data[j].pieces // how many of these can we have?
      var base = opts[j] // what is the item index for 0 of these?
      // 0, 1, 2, 4, 6, 8, 11 ...
      for (var n = 1; n <= N; n++) {
        var W = n * data[j].weight // how much do these items weigh?
        var s = w >= W ? 1 : 0 // can we carry this many?
        var v = s * n * data[j].value // how much are they worth?
        var I = base + n // what is the item number for this many?
        var wN = w - s * W // how much other stuff can we be carrying?
        var C = n * P[j] + b[wN][base] // encoded combination
        m[w][I] = Math.max(m[w][I - 1], v + m[wN][base]) // best value
        choose = b[w][I] = m[w][I] > m[w][I - 1] ? C : b[w][I - 1]
      }
    }
  }
  var best = []
  for (j = data.length - 1; j >= 0; j--) {
    best[j] = Math.floor(choose / P[j])
    choose -= best[j] * P[j]
  }
  var result = []
  var wgt = 0
  var val = 0
  for (var i = 0; i < best.length; i++) {
    if (best[i] === 0) continue
    result[result.length] = { count: best[i], item: data[i].item }
    wgt += best[i] * data[i].weight
    val += best[i] * data[i].value
  }
  return { totalWeight: wgt, totalValue: val, items: result }
}

var list = [
  { item: 'map', weight: 9, value: 150, pieces: 1 },
  { item: 'compass', weight: 13, value: 35, pieces: 1 },
  { item: 'water', weight: 153, value: 200, pieces: 2 },
  { item: 'sandwich', weight: 50, value: 60, pieces: 2 },
  { item: 'glucose', weight: 15, value: 60, pieces: 2 },
  { item: 'tin', weight: 68, value: 45, pieces: 3 },
  { item: 'banana', weight: 27, value: 60, pieces: 3 },
  { item: 'apple', weight: 39, value: 40, pieces: 3 },
  { item: 'cheese', weight: 23, value: 30, pieces: 1 },
  { item: 'beer', weight: 52, value: 10, pieces: 3 },
  { item: 'suntan, cream', weight: 11, value: 70, pieces: 1 },
  { item: 'camera', weight: 32, value: 30, pieces: 1 },
  { item: 'T-shirt', weight: 24, value: 15, pieces: 2 },
  { item: 'trousers', weight: 48, value: 10, pieces: 2 },
  { item: 'umbrella', weight: 73, value: 40, pieces: 1 },
  { item: 'waterproof, trousers', weight: 42, value: 70, pieces: 1 },
  { item: 'waterproof, overclothes', weight: 43, value: 75, pieces: 1 },
  { item: 'note-case', weight: 22, value: 80, pieces: 1 },
  { item: 'sunglasses', weight: 7, value: 20, pieces: 1 },
  { item: 'towel', weight: 18, value: 12, pieces: 2 },
  { item: 'socks', weight: 4, value: 50, pieces: 1 },
  { item: 'book', weight: 30, value: 10, pieces: 2 }
]

// bounded(list, 400)
