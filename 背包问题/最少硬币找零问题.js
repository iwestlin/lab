// http://blog.csdn.net/kangroger/article/details/36036101
function showMeTheMoney(money, coin) {
  var coin = new Set(coin)
  coin = Array.from(coin)
  coin = coin.sort((x, y) => x - y)
  if (coin[0] === 0) coin.shift()

  var n = coin.length
  var coinNum = new Array(money + 1) // 存储所需硬币最小数量，比如 coinNum[7] 的值为凑成 7 所需的最少硬币数量
  var coinValue = new Array(money + 1) // 存储找零所需的硬币，比如 coinValue[7] 等于 5, 则凑成 7 至少需要一枚面值为 5 的硬币
  coinNum[0] = 0 // 初始化，兑换 0 需要 0 个硬币

  for (let i = 0; i <= money; i++) { // 设 money 为 18，则兑换 18 不需要考虑 18 以上的组合
    var minNum = i // 存储至少需要的硬币数目，此数目不会大于所需的价值本身
    var usedMoney = 0 // 存储兑换所需的硬币面额，默认为 0; 假设只有偶数面额的硬币，却需要兑换奇数金额，则默认使用面额为 0

    for (let j = 0; j < n; j++) { // 一次考虑所有面额的硬币
      if (i >= coin[j]) { // 只考虑面额不大于所需兑换金额的硬币
        if (coinNum[i - coin[j]] + 1 <= minNum && (i === coin[j] || coinValue[i - coin[j]] !== 0)) {
          // 最关键的地方，动态规划，考虑要不要使用 第 j 种面额的硬币：假设用了，则其需要的方案数为没加上这枚硬币之前的最少方案数 + 1
          // 如果算的所需的方案数小于存储的最小方案数 minNum，则将其设为最小方案数，且可以肯定兑换时使用了这枚硬币 coin[j]
          // && 后的条件是排除不能兑换余额的情况，设需要兑换金额为 8 ，能用的硬币为 [5,10],如果使用了面额为 5 的硬币，则还剩下需要兑换的
          // 金额为 3，3 无法兑换成任何硬币，所以 coinValue[3] 为默认值 0, 我们需要排除默认值为 0 的情况，只有以下例外
          // 而如果需要兑换的金额为 5，则使用了 5 以后还需要兑换的金额为 0，虽然 coinValue[0] 也等于 0，但是好在此时 i === coin[j] === 5
          minNum = coinNum[i - coin[j]] + 1
          usedMoney = coin[j]
        }
      }
    }
    coinNum[i] = minNum
    coinValue[i] = usedMoney
  }
  // console.log(coinNum, coinValue)
  if (coinValue[money] === 0) {
    console.log('找不开零钱')
  } else {
    console.log('最少需要 ' + coinNum[money] + ' 个硬币\n')
    var r = []
    while (money > 0) {
      r.push(coinValue[money])
      money -= coinValue[money]
    }
    console.log('硬币组合为 ' + r.join('+'))
  }
}
showMeTheMoney(18, [1, 2, 5, 10])
