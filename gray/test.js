var s1 = require('./baguenaudier')
var s2 = require('./grayCode')

function test (n) {
  for (var i = 1; i <= n; i++) {
    var a = Array(i).fill(0).join('')
    var b = Array(i).fill(1).join('')
    var r1 = s1(b, a)
    var r2 = s2(a, b)
    for (var j = 0; j < r1.length; j++) {
      if (r1[j] !== r2[j]) {
        return false
      }
    }
  }
  console.log('equal')
  return true
}
test(9) // equal
