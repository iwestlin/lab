function H (program, input) {} // 假想的万能程序，判定 program(input) 是否会死循环，如果会则输出 true，反之输出 false

function paradox (input) { // 将 paradox 本身输入，将产生矛盾
  if (H(input, input)) {
    return // 如果 H(paradox, paradox) 为真，则直接返回，并不产生死循环，与 H 函数的定义相悖
  } else {
    while(true) {} // 如果 H(paradox, paradox) 为假，产生死循环，与 H 相悖
  }
}

H(paradox, paradox)
// 判定 paradox(paradox) 是否会产生死循环
