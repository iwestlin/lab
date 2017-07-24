var players = '一个人的命运啊当然要靠自我奋斗但是也要考虑到历史的行程'
var n = players.length
var m = 100 // 初始财富值
var a = Array(n).fill(m) // 存储所有人财富值的数组
// change(1000)
// console.log(a.slice().sort((x,y) => x - y))
// console.log(a.reduce((x,y) => x + y))

function change (times) {
  for (var count = 0; count < times; count++) {
    a.forEach((value, index) => giveAway(value, index))
    // a = a.map(x => x - 1) // 允许财富值为负数
    // for (var i = 0; i < n; i++) {
    //   a[randomRange(0, n)]++
    // }
  }
}

function randomRange (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function giveAway (value, index) {
  if (value > 0) {
    a[index]--
    a[randomRange(0, n)]++
  }
}
