function H (program, input) {} // 假想的万能程序，判定 program(input) 是否会死循环，如果会则输出 true，反之输出 false

function paradox (input) {
  if (H(input, input)) {
    return false
  } else {
    return true
  }
}

H(paradox, paradox) // 产生矛盾，如果 H(paradox, paradox) 为真则输出假，如果假则输出真
// = paradox(paradox)
// = if H(paradox, paradox) return false
//   else return true 
