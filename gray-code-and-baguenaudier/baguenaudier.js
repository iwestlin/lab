function nextStepOf (s) {
  var a = s.split('').map(v => parseInt(v))
  var limit = a.length - 1
  expect(0, 0)
  return a.join('')
  function expect (index, value) {
    if (index === limit) {
      if (value === a[index]) {
        a[index - 1] = a[index - 1] ^ 1
      } else {
        a[index] = a[index] ^ 1
      }
      return
    }
    if (a[index] !== value) {
      if (oneWithAllZero(index + 1)) {
        a[index] = value
      } else {
        expect(index + 1, 1)
      }
    } else {
      expect(index + 1, 0)
    }
  }
  function oneWithAllZero (index) { // index 位是 1, index 右边所有位都为 0
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
// solve('11111', '00000')
module.exports = solve
