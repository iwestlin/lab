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
let total
const counts = {}
main()

function main () {
  const now = Date.now()
  const all_cards = get_all()
  let not_goods = all_cards.filter(cards => !check_all(cards))
  const all_bad_counts = not_goods.map(v => {
    const key = v.join()
    return counts[key]
  }).reduce((acc, val) => acc + val)
  console.log('all done, bad cards:', not_goods.length) // 458
  console.log('all_bad_counts:', all_bad_counts) // 52908
  console.log('total:', total) // 270725
  console.log('percent:', all_bad_counts / total) // 0.19543078769969527
  console.log('time spent:', Date.now() - now) // 879ms
}

function catalan (arr) {
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
  const exists = {}
  all = all.filter(arr => {
    const key = arr.join()
    if (exists[key]) {
      return false
    } else {
      return exists[key] = true
    }
  })
  // console.log(all)
  for (let arr of all) {
    if (check(arr).length) return true
  }
  return false
}

function get_all () {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  const all = k_combinations(cards.concat(cards, cards, cards), 4)
  total = all.length
  let result = all.map(arr => arr.sort()).map(arr => arr.join())
  for (let v of result) {
    if (counts[v]) {
      counts[v] += 1
    } else {
      counts[v] = 1
    }
  }
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
