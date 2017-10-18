var weeks = 1 // 自种子发布起到现在的时间 单位周 应该是向上取整 下同
var size = 1 // 种子大小 单位GB
var seeders = 1 // 种子当前做种人数
var range = 200

function bonusPerHour (weeks, size, seeders) {
  var a = (1 - 10 ** ((-1) * weeks/4)) * size * (1 + 2 ** 0.5 * (10 ** ((-1) * (seeders - 1) / 6)))
  var b = 60 * (2 / Math.PI) * Math.atan(a / 300)
  return b
}

var a = Array(range).fill(1).map((v, i) => v + i)

var weeksChange = a.map(v => bonusPerHour(v, size, seeders))
var sizeChange = a.map(v => bonusPerHour(weeks, v, seeders))
var seedersChange = a.map(v => bonusPerHour(weeks, size, v))

// console.table([weeksChange, sizeChange, seedersChange])
