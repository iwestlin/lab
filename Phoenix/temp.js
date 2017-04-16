function haha (a, limit) {
  var s = 0
  for (let v = 0; v <= limit; v += a) {
    s += v
  }
  return Math.floor(s) + 1
}
haha(0.3, 6) // 63 < max

/*
birdY // 小鸟当前 y 位置
topY // 下一个上方管子的底部位置
gap // 120 上下管子之间的空隙
jumpY // 63 跳跃一次向上移动的距离
*/

if (birdY > (topY + jumpY)) {
  bird.jump()
}