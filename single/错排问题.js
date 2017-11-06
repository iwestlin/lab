// https://zh.wikipedia.org/wiki/%E9%94%99%E6%8E%92%E9%97%AE%E9%A2%98
// 考虑一个有n个元素的排列，若一个排列中所有的元素都不在自己原来的位置上，那么这样的排列就称为原排列的一个错排。 n个元素的错排数记为 Dn
// https://oeis.org/A000166

function factorial (n) {
  n = parseInt(n) || 1
  for (let i = n - 1; i > 0; i--) { n *= i }
  return n
}

function derangement (n) {
  return Math.round(factorial(n) / Math.E)
}
derangement(7) // 1854

function d (n) {
  var sum = 0
  for (let i = 0; i <= n; i++) {
    sum += ((-1) ** i) * (1 / factorial(i))
  }
  return parseInt(factorial(n) * sum)
}
d(7) // 1854

var ds = [0, 0, 1]
function dd (n) {
  if (ds[n] !== undefined) {
    return ds[n]
  } else {
    return ds[n] = (n - 1) * (dd(n - 1) + dd(n - 2))
  }
}
dd(7) // 1854
