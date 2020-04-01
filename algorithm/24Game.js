function equal_to_24 (n) {
  return Math.abs(24 - n) < 1e-10
}

const jia = (a, b) => a + b
const jian = (a, b) => a - b
const chen = (a, b) => a * b
const chu = (a, b) => a / b

const oprators = [jia, jian, chen, chu]
const ops = oprators.map(v => {
  return oprators.map(vv => {
    return oprators.map(vvv => [vvv, vv])
  }).reduce((acc, val) => acc.concat(val), []).map(arr => arr.concat(v))
}).reduce((acc, val) => acc.concat(val), [])
// console.log(ops)

// 各操作符只能用一次
// const ops = oprators.map(v => [v]).map(arr => {
//   const lefts = oprators.filter(v => v !== arr[0])
//   return lefts.map(left => arr.concat(left))
// }).reduce((acc, val) => acc.concat(val), []).map(arr => {
//   const lefts = oprators.filter(v => !arr.includes(v))
//   return lefts.map(left => arr.concat(left))
// }).reduce((acc, val) => acc.concat(val), [])

const catalan = arr => {
  const [a, b, c, d] = arr
  return ops.map(([op1, op2, op3]) => {
    const r1 = op1(a, op2(b, op3(c, d)))
    const r2 = op1(a, op2(op3(b, c), d))
    const r3 = op1(op2(a, b), op3(c, d))
    const r4 = op1(op2(a, op3(b, c)), d)
    const r5 = op1(op2(op3(a, b), c), d)
    return [r1, r2, r3, r4, r5]
  }).reduce((acc, val) => acc.concat(val), [])
}

// console.log('check(8,3,8,3):', check(8,3,8,3)) // true
function check (arr) {
  const results = catalan(arr)
  return results.filter(equal_to_24)
}

// console.log(check_all([1,1,1,11])) // (1 + 1) * (1 + 11) true
function check_all (cards) {
  let all = permutateWithoutRepetitions(cards)
  const t = []
  all = all.filter(arr => {
    const [a, b, c, d] = arr
    const value = a * 1000000 + b * 10000 + c * 100 + d
    if (t.includes(value)) {
      return false
    } else {
      t.push(value)
      return true
    }
  })
  // console.log(all)

  // return all.map(check)
  for (let arr of all) {
    if (check(arr).length) return true
  }
  return false
}

main()
function main () {
  const now = Date.now()
  const all_cards = get_all()
  // for (let cards of all_cards) {
  //   if (!check_all(cards)) console.log(cards)
  // }
  let not_goods = all_cards.filter(cards => !check_all(cards))
  // not_goods = not_goods.sort()
  console.log('all done, bad cards:', not_goods.length)
  console.log('time spent:', Date.now() - now)
}

// function get_all () {
//   const cards = Array(13).fill(1).map((v, i) => v + i)
//   const all = []
//   const four_in_one = cards.map(v => ([v, v, v, v]))
//   const three_in_one = cards.map(v => ([v, v, v])).map(arr => {
//     return cards.map(v => v === arr[0] ? false : arr.concat(v)).filter(v => v)
//   }).reduce((acc, val) => acc.concat(val), [])
//   const two_in_one = cards.map(v => ([v, v])).map(arr => {
//   })
// }

// console.log(get_all().length) // 1820
function get_all () {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  let result = k_combinations(cards.concat(cards, cards, cards), 4)
  result = result.map(arr => arr.sort()).map(arr => arr.join())
  result = new Set(result)
  return Array.from(result).map(v => v.split(',')).map(arr => arr.map(Number))
}

// https://gist.github.com/axelpale/3118596
function k_combinations(set, k) {
  var i, j, combs, head, tailcombs;
  
  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }
  
  // K-sized set has only one K-sized subset.
  if (k == set.length) {
    return [set];
  }
  
  // There is N 1-sized subsets in a N-sized set.
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

// https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/permutations/permutateWithoutRepetitions.js
function permutateWithoutRepetitions(permutationOptions) {
  if (permutationOptions.length === 1) {
    return [permutationOptions];
  }

  // Init permutations array.
  const permutations = [];

  // Get all permutations for permutationOptions excluding the first element.
  const smallerPermutations = permutateWithoutRepetitions(permutationOptions.slice(1));

  // Insert first option into every possible position of every smaller permutation.
  const firstOption = permutationOptions[0];

  for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1) {
    const smallerPermutation = smallerPermutations[permIndex];

    // Insert first option into every possible position of smallerPermutation.
    for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex += 1) {
      const permutationPrefix = smallerPermutation.slice(0, positionIndex);
      const permutationSuffix = smallerPermutation.slice(positionIndex);
      permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
    }
  }

  return permutations;
}
