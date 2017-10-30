// https://www.zhihu.com/question/65949119/answer/250824571
// myEncode('CAADB ADDAC BCDAB DDCCA') // '834F26C7E8'
// myDecode('834F26C7E8') // 'CAADBADDACBCDABDDCCA'

function myEncode (s) {
  var abcd = 'ABCD'
  var dic = '0123456789ABCDEF'
  s = s.replace(/\s/g, '').toUpperCase()
  s = s.split('').map(v => abcd.indexOf(v))
  var a = []
  for (let i = 0; i < s.length; i += 2) {
    if (s[i + 1] !== undefined) {
      a.push(s[i] * 4 + s[i + 1])
    } else {
      a.push(s[i])
    }
  }
  return a.map(v => dic[v]).join('')
}

function myDecode (s) {
  var abcd = 'ABCD'
  var dic = '0123456789ABCDEF'
  s = s.toString().toUpperCase().split('')
  s = s.map(v => dic.indexOf(v)).map(toBin).map(v => parseInt(v, 2))
  var a = []
  for (let i = 0; i < s.length; i++) {
    a.push(s[i] >> 2, s[i] % 4)
  }
  return a.map(v => abcd[v]).join('')
}

function toBin (n) {
  n = n.toString(2)
  var a = Array(4 - n.length).fill('0')
  return a.join('') + n
}
