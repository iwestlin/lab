function nextStepOf (s) {
  var a = s.split('').map(v => parseInt(v))
  var limit = a.length - 1
  expect(0, 0)
  return a.join('')
  function expect (index, value) { // 期望 a[index] 值为 value
    if (index === limit) {
      if (a[index] === value) {
        a[index - 1] = a[index - 1] ^ 1
      } else {
        a[index] = value
      }
      return
    }
    if (a[index] !== value) {
      if (oneWithAllZero(index + 1)) { // 右边状态为 1(0...)
        a[index] = value
      } else {
        expect(index + 1, 1)
      }
    } else {
      expect(index + 1, 0)
    }
  }
  function oneWithAllZero (index) {
    if (!a[index]) return false
    for (var i = index + 1; i <= limit; i++) {
      if (a[i]) {
        return false
      }
    }
    return true
  }
}
// nextStepOf('1111') // '1101'

function solve (start, final) {
  var result = [start]
  while (start !== final) {
    start = nextStepOf(start)
    result.push(start)
  }
  return result
}
// console.log(solve('1111', '0000'))
module.exports = solve
