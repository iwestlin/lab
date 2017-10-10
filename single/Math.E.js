function factorial (n) {
  n = parseInt(n) || 1
  if (n <= 1) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}

function getE (n) {
  n = parseInt(n) || 0
  var a = Array(n).fill().map((_, i) => 1 / factorial(i))
  return a.reduce((acc, val) => acc + val, 0)
}

console.log(Math.E)    // 2.718281828459045
console.log(getE(100)) // 2.7182818284590455
