/*
  注意，有考虑不完善的地方，重复几千次后财富值总数可能会大于初始值，原因是财富值没有设置负数。
 */

var n = 26
var m = 100
var a = Array(n).fill(m)
// change(1000)
// console.log(a.slice().sort((x,y) => x - y))
// console.log(a.reduce((x,y) => x + y))

function change (times) {
  for (var count = 0; count < times; count++) {
    a = a.map(x => minusOne(x))
    // a = a.map(x => x - 1)
    for (var i = 0; i < n; i++) {
      a[randomRange(0, n)]++
    }
  }
}

function randomRange (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function minusOne (x) {
  if (x > 0) {
    return x - 1
  } else {
    return 0
  }
}
