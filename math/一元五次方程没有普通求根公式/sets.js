// rewrite in JS from ruby, source: https://www.zhihu.com/question/29316970/answer/151649630

function permute(permutation) { // https://stackoverflow.com/a/37580979/3469145
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
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

function C (a) {
  var result = []
  for (let p1 of a) {
    for (let p2 of a) {
      result.push(commutate(p1, p2).join('-'))
    }
  }
  result = Array.from(new Set(result))
  return result.map(v => v.split('-').map(vv => parseInt(vv)))
}

var s5 = permute([1,2,3,4,5])
// console.table(s5)
var a5 = C(s5) // commutators of s5
// console.table(a5)
var commutators_of_a5 = C(a5)
// console.table(commutators_of_a5)

// prove a5 equals to commutators_of_a5
var t = a5.map(v => v.join('')).sort()
var t2 = commutators_of_a5.map(v => v.join('')).sort()
console.log(t.join('-') === t2.join('-')) // true
