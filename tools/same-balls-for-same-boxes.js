function haha(n, m) {
  var result = [];

  function nm(balls, boxes, former, limits) {
    if (balls < 0 || boxes < 0) {
      return;
    }
    if (balls === 0) {
      for (let i = 0; i < boxes; i++) {
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
    for (let i = limits; i > 0; i--) {
      if (i * boxes >= balls) { //避免出现重复的情况
        //比如假设7放3已经记录了[4，2，1]这种情况，那么在下一轮循环放入了4个球和1个球到两个盒子里，还剩2个球，1个盒子，此时limit为1，limit*boxes = 1*1 = 1 < balls = 2，程序不再分配，直接返回。
        var copy = former.slice();
        copy.push(i);
        nm(balls - i, boxes - 1, copy, i);
      } else {
        return;
      }
    }
  }
  nm(n, m, [], n);
  console.table(result);
  return result;
}
haha(7, 3);
