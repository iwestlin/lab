var n = 26 // 人数
var m = 100 // 初始财富值
var t = 0 // 临时记录每一轮有多少人财富值本该变成负数
var a = Array(n).fill(m) // 存储所有人财富值的数组
// change(1000)
// console.log(a.slice().sort((x,y) => x - y))
// console.log(a.reduce((x,y) => x + y))

function change (times) {
  for (var count = 0; count < times; count++) {
    a = a.map(x => minusOne(x))
    // a = a.map(x => x - 1)
    for (var i = 0; i < n - t; i++) {
      a[randomRange(0, n)]++
    }
    t = 0
  }
}

function randomRange (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function minusOne (x) {
  if (x > 0) {
    return x - 1
  } else {
    t++
    return 0
  }
}
