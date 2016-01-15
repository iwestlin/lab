var Decode = function(b) {
  var e;
  e = [];
  var a = b.width,
    c = b.height,
    d = document.createElement("canvas");
  d.width = a;
  d.height = c;
  d = d.getContext("2d");
  d.drawImage(b, 0, 0);
  b = d.getImageData(0, 0, a, c);
  for (d = 0; d < a * c * 4; d += 4)[].push.apply(e, [].slice.call(b.data, d, d + 3));
  for (a = e.length - 1; 0 === e[a];) e = e.slice(0, a), a--;
  a = "";
  for (c = 0; c < e.length; c += 7)
    for (b = 0; 8 > b; b++) d = ((0 == b ? 0 : e[c + b - 1]) << 7 - b & 127) + ((7 == b ? 0 : e[c + b]) >> b + 1), a += 0 == d ? "" : String.fromCharCode(d);
  return a
}

var img = new Image();
img.onload = function() {
  Function(Decode(img))();
  alert(md5('hello'));
};
img.crossOrigin = '*';
img.src = 'https://imququ.com/static/other/code.png';
