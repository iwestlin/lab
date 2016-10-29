function haha(n, m) {
  var result = [];

  function nm(balls, boxes, former, limits) {
    if (balls < 0 || boxes < 0) {
      return;
    }
    if (balls === 0) {
      for (var i = 0; i < boxes; i++) {
        former.push(0);
      }
      result.push(former);
      return;
    }
    if (boxes === 1) {
      former.push(balls);
      result.push(former);
      return;
    }
    for (var i = limits; i > 0; i--) {
      if (i * boxes >= balls) {
        var copy = former.slice();
        copy.push(i);
        nm(balls - i, boxes - 1, copy, i);
      }
    }
  }
  nm(n, m, [], n);
  // for (let i = 0; i < result.length; i++) {
  //   result[i] = result[i].join().split(',');
  // }
  console.table(result);
  return result;
}
haha(7, 3);
