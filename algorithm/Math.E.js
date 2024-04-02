function factorial (n) {
  n = parseInt(n) || 1
  if (n <= 1) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}
// https://zh.wikipedia.org/zh-cn/E_(%E6%95%B0%E5%AD%A6%E5%B8%B8%E6%95%B0)#%E5%AE%9A%E7%BE%A9
// 定义 e 为阶乘倒数之无穷级数的和
// https://www.zhihu.com/question/307132448
// 考虑 f(x) = e^x 在 x = 0 处的泰勒展开式
// https://www.bilibili.com/video/BV1Gx411Y7cz
function getE (n) {
  n = parseInt(n) || 0
  var a = Array(n).fill().map((_, i) => 1 / factorial(i))
  return a.reduce((acc, val) => acc + val, 0)
}

console.log(Math.E)    // 2.718281828459045
console.log(getE(100)) // 2.7182818284590455


// https://www.bilibili.com/video/BV11x411e7FN
// e = (1 + 1/n) ^ n (n -> +∞)
// slow
function calcE(n) {
  const v = 1 + 1 / n
  return Array(n).fill(v).reduce((acc, val) => {
    return acc * val
  }, 1)
}
console.log(calcE(1000000)) // 2.7182804690959363
