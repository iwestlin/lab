function fib (n) {
  n = parseInt(n) || 1
  if (n < 3) {
    return 1
  } else {
    return fib(n - 1) + fib(n - 2)
  }
}

function fib2 (n) {
  n = parseInt(n) || 1
  if (n < 3) {
    return 1
  } else {
    return fib2(n - 1) + fib2(n - 2)
  }
}

function memoize (fn) {
  var cache = {}
  return function () {
    var key = JSON.stringify(arguments)
    cache[key] = cache[key] || fn.apply(fn, arguments)
    return cache[key]
  }
}

function memoize2 (fn) {
  var memoize = function (key) {
    var cache = memoize.cache
    key = JSON.stringify(key)
    cache[key] = cache[key] || fn.apply(this, arguments)
    return cache[key]
  }
  memoize.cache = {}
  return memoize
}

fib = memoize(fib)
fib2 = memoize2(fib2)
console.log(fib(100), fib2(100))

var test = memoize(n => {
  n = parseInt(n) || 1
  if (n < 3) {
    return 1
  } else {
    return test(n - 1) + test(n - 2)
  }
})
test(100)
