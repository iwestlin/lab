function generateGrayCode (n) {
  var start = Array(n).fill(0)
  var flag = true
  var result = []
  result.push(start.slice())
  for (var i = 0; i < (1 << n) - 1; i++) {
    if (flag) {
      start = changeRightMost(start)
      result.push(start.slice())
    } else {
      start = changeOther(start)
      result.push(start.slice())
    }
    flag = !flag
  }
  return result
}

// console.table(generateGrayCode(4))

function changeRightMost (arr) { // 改变最右边的位元
  arr[arr.length - 1] = arr[arr.length - 1] ^ 1
  return arr
}

function changeOther (arr) { // 改变右起第一个为1的位元的左边位元
  for (var i = arr.length - 1; i > 0; i--) {
    if (arr[i]) {
      arr[i - 1] = arr[i - 1] ^ 1
      break
    }
  }
  return arr
}

function howManySteps (a, b) {
  var r = generateGrayCode(a.length).map(v => v.join(''))
  var ai = r.findIndex(v => v === a)
  var bi = r.findIndex(v => v === b)
  return Math.abs(ai - bi)
}
// howManySteps('000000000','111111111') // 341

function grayToBinary (s) {
  var r = [0]
  for (var i = 1; i <= s.length; i++) {
    r[i] = r[i - 1] ^ s[i - 1]
  }
  r.shift()
  return r.join('')
}
grayToBinary('0111') // '0101'

function binaryToGray (s) {
  var r = []
  var a = s.split('').map(v => parseInt(v))
  a.unshift(0)
  for (var i = 0; i < s.length; i++) {
    r[i] = a[i] ^ a[i + 1]
  }
  return r.join('')
}
binaryToGray('0101') // '0111'

function nextStep (s) { // aka. lastNumber
  var b = grayToBinary(s)
  b = parseInt(b, 2) - 1
  b = b.toString(2)
  var diff = s.length - b.length
  for (var i = 0; i < diff; i++) {
    b = '0' + b
  }
  return binaryToGray(b)
}
nextStep('0111') // '0110'

function nextNumber (s) {
  var a = s.split('').map(v => parseInt(v))
  if (parseInt(grayToBinary(s), 2) % 2) {
    return changeOther(a).join('')
  } else {
    return changeRightMost(a).join('')
  }
}
// nextNumber('0111') // '0101'

function solve (start, final) {
  var result = [start]
  while (start !== final) {
    start = nextNumber(start)
    result.push(start)
  }
  result.reverse()
  return result
}
// solve('0000', '1111')
module.exports = solve
