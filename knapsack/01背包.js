var things = [
    [], // 方便计算 添加占位
    [4, 6],
    [5, 4],
    [6, 5],
    [2, 3],
    [2, 6]
  ] // 5 件物品，[重量,价值]
var limit = 10 // 背包最大承重
var tab = new Array(things.length)
var temp = new Array(limit + 1)
for (let i = 0; i < temp.length; i++) {
  temp[i] = [0] // 存储最大价值和物品 index
}
for (let i = 0; i < tab.length; i++) {
  tab[i] = temp.slice()
}

for (let i = 1; i <= 5; i++) { // 可放入的物品种类
  for (let j = 1; j <= 10; j++) { // 背包的最大承重
    let leftWeight = j - things[i][0]
    if ((leftWeight >= 0) && ((tab[i - 1][leftWeight][0] + things[i][1]) > tab[i - 1][j][0])) {
      tab[i][j] = (tab[i - 1][leftWeight]).slice()
      tab[i][j].push(i)
      tab[i][j][0] = (tab[i - 1][leftWeight][0] + things[i][1])
    } else {
      tab[i][j] = tab[i - 1][j].slice()
    }
  }
}
console.log(tab[5][10]) // [15, 1, 4, 5]
// 最大价值为 15，放入的物品 things[index] 为  1, 4, 5

// for (let i = 0; i < tab.length; i++) {
//   for (let j = 0; j < tab[i].length; j++)
//     tab[i][j] = tab[i][j].join()
// }
// console.table(tab)