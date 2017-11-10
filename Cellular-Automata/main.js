function drawLines (start, rule, limit) {
  var result = start + '\n'
  for (let i = 1; i < limit; i++) {
    start = nextLine(start, rule)
    result += start + '\n'
  }
  return result
}
// var start = Array(100).fill('1').join('')
// drawLines(start, 110, 100)

function nextLine (s, n) { // '100101101'
  var result = []
  for (let i = 0; i < s.length; i++) {
    var temp = ''
    var left = i - 1
    var right = i + 1
    if (left >= 0) {
      temp += s[left]
    }
    temp += s[i]
    if (right < s.length) {
      temp += s[right]
    }
    result.push(temp)
  }
  var rule = genRule(n)
  return result.map(v => {
    v = parseInt(v, 2)
    return rule[v]
  }).join('')
}
// nextLine('100101101', 90) // '011001101'

function genRule (n) {
  n = parseInt(n) || 0
  n = n.toString(2)
  n = Array(8 - n.length).fill('0').join('') + n
  return n.split('').reverse()
}
// genRule(90)