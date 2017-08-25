// rewrite in JS from ruby, source: https://www.zhihu.com/question/29316970/answer/151649630
// see animation in https://www.youtube.com/watch?v=RhpVSV6iCko&feature=youtu.be

function powerset (permutation) { // copied from https://stackoverflow.com/a/37580979/3469145
  var length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1, k, p

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i]
      p = permutation[i]
      permutation[i] = permutation[k]
      permutation[k] = p
      ++c[i]
      i = 1
      result.push(permutation.slice())
    } else {
      c[i] = 0
      ++i
    }
  }
  return result
}

function compose (a, b) {
  return Array(a.length).fill().map((v, i) => b[a[i] - 1])
}

function invert (a) {
  return Array(a.length).fill().map((v, i) => a.indexOf(i + 1) + 1)
}

function commutate (a, b) {
  return compose(compose(compose(a, b), invert(a)), invert(b))
}

function getAllCommutators (a) {
  var result = []
  for (let p1 of a) {
    for (let p2 of a) {
      result.push(commutate(p1, p2).join('-'))
    }
  }
  result = Array.from(new Set(result))
  return result.map(v => v.split('-').map(vv => parseInt(vv)))
}

// var s5 = powerset([1, 2, 3, 4, 5])
// var a5 = getAllCommutators(s5) // commutators of s5
// var commutatorsOfA5 = getAllCommutators(a5)
// var t = a5.map(v => v.join('')).sort()
// var t2 = commutatorsOfA5.map(v => v.join('')).sort()
// console.log(t.join('-') === t2.join('-')) // true, which proved a5 equals to commutators_of_a5

// ===== explanation =====
// s5 中每一个元素都意味着一次根与根之间的移动
// 任举一例： [2,4,3,1,5] 意味着：
// 把第一个根移到位置 2，即 x1 移到 x2，记作 x1 -> x2
// 把第二个根移到位置 4，即 x2 移到 x4，记作 x2 -> x4
// 后续同理，将每个数字都表示为箭头：
// x1 -> x2
// x2 -> x4
// x3 -> x3
// x4 -> x1
// x5 -> x5
// 那么 invert([2,4,3,1,5]) 求得的是以上移动的逆操作，即
// x2 -> x1
// x4 -> x2
// x3 -> x3
// x1 -> x4
// x5 -> x5
// 将箭头左边的变量按数字排序后得
// x1 -> x4
// x2 -> x1
// x3 -> x3
// x4 -> x2
// x5 -> x5
// 所以 invert([2,4,3,1,5]) 的结果为 [4,1,3,2,5]

// compose([3,2,1,5,4],[2,4,3,1,5]) // [3, 4, 2, 5, 1]
// [3,2,1,5,4]    [2,4,3,1,5]
// x1 -> x3       x1 -> x2
// x2 -> x2       x2 -> x4
// x3 -> x1       x3 -> x3
// x4 -> x5       x4 -> x1
// x5 -> x4       x5 -> x5
// compose: (a, b) => b[a[i] - 1]
// x1 -> x3 -> x3
// x2 -> x2 -> x4
// x3 -> x1 -> x2
// x4 -> x5 -> x5
// x5 -> x4 -> x1
// i.e. [3,4,2,5,1]
