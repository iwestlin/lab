// 完全背包
// tab[j] = Math.max(
//   tab[j-weight[i]]+value[i],
//   tab[j]
// )
// things      a,b,c,d,e
var weights = [5,4,1,2,3]
var values  = [9,6,1,3,5]
// var numbers = [3,2,4,5,3]
var limit = 10
var tab = new Array(limit+1)
tab.fill(0)
for (let i = 0; i < values.length; i++) {
  for (let j = weights[i]; j <= limit; j++) {
    tab[j] = Math.max(tab[j-weights[i]]+values[i],tab[j])
  }
}
console.log(tab)
