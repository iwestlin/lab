// 错误的多重背包
// 问题在于 重量循环 在内层 实际应该在外层
var weights = [2,2,4,5,6]
var values  = [6,3,6,4,5]
var numbers = [1,1,1,1,1]
var weightLimit = 11
var tab = []
for (let i = 0; i < weightLimit; i++) {
  tab[i] = []
}

function count (arr, val) {
  var r = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      r++
    }
  }
  return r  // val 在 arr 中出现次数
}

function sum (arr) {
  var r = 0
  for (let i = 0; i < arr.length; i++) {
    r += values[arr[i]]
  }
  return r // arr 包含 index， 返回总价值
}

for (let i = 0; i < values.length; i++) { // i<-[0..4]
  for (let j = weights[i]; j < weightLimit; j++) { // j<-[1..10]
    let temp = sum(tab[j-weights[i]]) + values[i] //放i的总价值
    if ((temp >= sum(tab[j]))) {
      if ((count(tab[j-weights[i]], i) < numbers[i])) {
        tab[j] = tab[j-weights[i]].slice()
        tab[j].push(i)
      } else {
        // tab[j] = tab[j-weights[i]].slice()
      }
    } else if (sum(tab[j]) <= sum(tab[j-1])) {
      tab[j] = tab[j-1].slice()
    }
  }
}
console.table(tab)
