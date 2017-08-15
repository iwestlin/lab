// http://blog.csdn.net/masibuaa/article/details/8171082

function swap (arr, x, y) {
  var t = arr[x]
  arr[x] = arr[y]
  arr[y] = t
  return arr
}

function heap (arr) { // 生成数组 arr 的全排列
  var len = arr.length
  var result = []
  function generate(n) {
    if (n === 1) {
      result.push(arr.slice())
    } else {
      for (var i = 0; i < n; i++) {
        generate(n - 1)
        if (n % 2 === 1) {
          arr = swap(arr, 0, n - 1)
        } else {
          arr = swap(arr, i, n - 1)
        }
      }
    }
  }
  generate(len)
  return result
}

console.table(heap([1,2,3]))
