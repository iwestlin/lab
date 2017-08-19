function plus (a, b) {
  return [a[0] + b[0], a[1] + b[1]]
}
function times (a, b) {
  return [a[0]*b[0] - a[1]*b[1], a[0]*b[1] + a[1]*b[0]]
}

Array.prototype.plus = function (b) {
  return plus(this, b)
}
Array.prototype.times = function (b) {
  return times(this, b)
}

// x1 = 2, x2 = 1+3i, x3 = 3, x4 = 3+2i, x5 = 1
var x1 = [2,0],
    x2 = [1,3],
    x3 = [3,0],
    x4 = [3,2],
    x5 = [1,0]
var xs = [x1, x2, x3, x4, x5]

// (x-2)(x-1-3i)(x-3)(x-3-2i)(x-1) = 0
// a(x^5) + b(x^4) + c(x^3) + d(x^2) + e(x^1) + f = 0
function getA () { // a = 1
  return [1, 0]
}

function getB (x1, x2, x3, x4, x5) { // b = -x1-x2-x3-x4-x5
  return x1.plus(x2).plus(x3).plus(x4).plus(x5).times([-1, 0])
}

function getC (x1, x2, x3, x4, x5) {
  var r = x1.times(x2)
  r = r.plus(x1.times(x3))
  r = r.plus(x1.times(x4))
  r = r.plus(x1.times(x5))
  r = r.plus(x2.times(x3))
  r = r.plus(x2.times(x4))
  r = r.plus(x2.times(x5))
  r = r.plus(x3.times(x4))
  r = r.plus(x3.times(x5))
  r = r.plus(x4.times(x5))
  return r
}

function getD (x1, x2, x3, x4, x5) {
  var r = x1.times(x2).times(x3)
  r = r.plus(x1.times(x2).times(x4))
  r = r.plus(x1.times(x2).times(x5))
  r = r.plus(x1.times(x3).times(x4))
  r = r.plus(x1.times(x3).times(x5))
  r = r.plus(x1.times(x4).times(x5))
  r = r.plus(x2.times(x3).times(x4))
  r = r.plus(x2.times(x3).times(x5))
  r = r.plus(x2.times(x4).times(x5))
  r = r.plus(x3.times(x4).times(x5))
  return r.times([-1, 0])
}

function getE (x1, x2, x3, x4, x5) {
  var r = x1.times(x2).times(x3).times(x4)
  r = r.plus(x1.times(x2).times(x3).times(x5))
  r = r.plus(x1.times(x2).times(x4).times(x5))
  r = r.plus(x1.times(x3).times(x4).times(x5))
  r = r.plus(x2.times(x3).times(x4).times(x5))
  return r
}

function getF (x1, x2, x3, x4, x5) {
  return x1.times(x2).times(x3).times(x4).times(x5).times([-1, 0])
}

var f1 = (x1, x2, x3, x4, x5) => getB(x1, x2, x3, x4, x5).times(getB(x1, x2, x3, x4, x5)).plus(getA(x1, x2, x3, x4, x5).times(getC(x1, x2, x3, x4, x5)).times([-4, 0])) // b^2 - 4ac
