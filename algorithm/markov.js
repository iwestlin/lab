// https://www.zhihu.com/question/46388875/answer/522000121
var results = []
console.log(getP(1000)) // 0.38544975241248125
function getP (n) {
  n = parseInt(n) || 0
  if (n < 10) {
    return 0
  } else if (n === 10) {
    return 0.5 ** 10
  } else {
    if (results[n] !== undefined) {
      return results[n]
    } else {
      var temp = getP(n - 1) + (1 - getP(n - 11)) / (2 ** 11)
      results[n] = temp
      return temp
    }
  }
}

// https://www.zhihu.com/question/46388875/answer/101108234
// 马尔可夫链
// 矩阵迭代1000次就是做了1000次转换，初始状态在1上，所以状态1的概率是100%，其他都是0
// 矩阵按列来看，表示5个状态的跳转概率
// 状态1【上一次结果不是正面（或者没有上一次，当状态1和状态5的条件同时满足时，取为状态5】，有0.5的概率到达状态1（反面），有0.5的概率到达状态2（正面）
// 状态2【刚好连续1次正面】，有0.5的概率到达状态1（反面），有0.5的概率到达状态3（正面）
// 状态3【刚好连续2次正面】，有0.5的概率到达状态1（反面），有0.5的概率到达状态4（正面）
// 状态4【刚好连续3次正面】，有0.5的概率到达状态1（反面），有0.5的概率到达状态5（正面）
// 状态5【曾经至少连续4次正面】，以1的概率转移到状态5

// 状态转移矩阵
var matrix = [
  [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0],
  [0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 1]
]

// 对应位置的数相乘，最后求和
function mySum (a, b) {
  a = a.map((v, i) => v * b[i])
  return a.reduce((x, y) => x + y, 0)
}

function repeat (n) {
  n = parseInt(n) || 0
  // 初始状态，表示以100%的概率处于状态1
  //（即还没有扔硬币，或者说上一次结果不是正面
  // state表示的是各个状态的概率分布
  // 它每乘一次状态转移矩阵，就相当于扔了一次硬币
  // 同时各个状态的概率分布都会更新一次
  var state = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let i = 0; i < n; i++) {
    var copy = state.slice()
    // 矩阵乘法满足结合律
    state = state.map((_, index) => mySum(copy, matrix[index]))
  }
  return state
}
// console.log(repeat(1000).reduce((acc, val) => acc + val, 0)) // 0.9999999999999996
console.log(repeat(1000)[10])
// 0.3854497524124812 js浮点数计算精度问题导致和第一种解法不完全一样