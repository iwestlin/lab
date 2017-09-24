// https://zhuanlan.zhihu.com/p/29576756
// 假设你不断扔一个等概率的六面骰子，直到扔出6停止。求在骰子只出现过偶数的条件下扔骰子次数的期望。
// 等价于
// 假设你不断扔一个等概率的六面骰子，直到扔出1, 3, 5, 6停止。求扔骰子次数的期望。

// 假设你不断扔一个等概率的六面骰子，直到扔出6停止。求在骰子只出现过偶数的概率？ 1/4

function roll () {
  return Math.ceil(Math.random() * 6)
}

function game (count) {
  count = count || 1
  var t = roll()
  if (t % 2 === 1) {
    return 0
  } else if (t === 6) {
    return count
  } else {
    return game(++count)
  }
}

function expect (n) {
  var fenzi = fenmu = 0
  for (let i = 0; i < n; i++) {
    var t = game() // 在扔出奇数时为 0
    if (t === 0) {
      continue
    } else {
      fenzi += t
      fenmu++ // 只在扔出偶数时加一
    }
  }
  // console.log(fenmu / n) // 约等于 0.25
  return fenzi / fenmu
}
expect (10000) // 约等于 1.5
