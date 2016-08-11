// 方块信息
function Node(name, img, x, y, w, h) {
  this.name = name;
  this.image = img;
  this.x = x; //x坐标，从左至右依次为012345
  this.y = y; //y坐标，从上至下依次为012345
  this.w = w; //width,格子宽度
  this.h = h; //height,格子高度
}

// 所有方块
var nodes = new Array();
//浅塘375关
nodes[0] = new Node("red", new Image(), 0, 2, 2, 1)
nodes[1] = new Node("1x2", new Image(), 3, 0, 1, 2)
nodes[2] = new Node("2x1", new Image(), 4, 0, 2, 1)
nodes[3] = new Node("1x2", new Image(), 2, 2, 1, 2)
nodes[4] = new Node("1x2", new Image(), 3, 2, 1, 2)
nodes[5] = new Node("1x3", new Image(), 4, 2, 1, 3)
nodes[6] = new Node("1x2", new Image(), 5, 2, 1, 2)
nodes[7] = new Node("1x2", new Image(), 0, 4, 1, 2)
nodes[8] = new Node("3x1", new Image(), 1, 4, 3, 1)
nodes[9] = new Node("2x1", new Image(), 1, 5, 2, 1)
nodes[10] = new Node("2x1", new Image(), 3, 5, 2, 1)
nodes[11] = new Node("1x2", new Image(), 5, 4, 1, 2)


var index12 = new Array(); //存储1x2的格子编号
var index21 = new Array(); //存储2x1的格子编号
var index13 = new Array(); //存储1x3的格子编号
var index31 = new Array(); //存储3x1的格子编号

for (var i = 0; i < nodes.length; i++) {
  if (nodes[i].w == 1 && nodes[i].h == 3)
    index13[index13.length] = i;
  else if (nodes[i].w == 1 && nodes[i].h == 2)
    index12[index12.length] = i;
  else if (nodes[i].w == 2 && nodes[i].h == 1)
    index21[index21.length] = i;
  else if (nodes[i].w == 3 && nodes[i].h == 1)
    index31[index31.length] = i;
}

// 角色位置
function NodePos(x, y) {
  this.x = x;
  this.y = y;
  this.index = function() {
    return this.x + this.y * 6;
  }
}

// 所有空点位置
var emptyNodes = new Array();
emptyNodes[0] = new NodePos(0, 0);
emptyNodes[1] = new NodePos(1, 0);
emptyNodes[2] = new NodePos(2, 0);
emptyNodes[3] = new NodePos(0, 1);
emptyNodes[4] = new NodePos(1, 1);
emptyNodes[5] = new NodePos(2, 1);
emptyNodes[6] = new NodePos(4, 1);
emptyNodes[7] = new NodePos(5, 1);
emptyNodes[8] = new NodePos(0, 3);
emptyNodes[9] = new NodePos(1, 3);

// 游戏相关变量
var clickIndex = -1;
var clickX = -1;
var clickY = -1;

// 搜索相关变量

// 判断位置是否为空
function isEmpty(x, y) {
  for (var i = 0; i < emptyNodes.length; i++) {
    if (emptyNodes[i].x == x && emptyNodes[i].y == y) {
      return true;
    }
  }
  return false;
}

// x1y1设置为非空，x2y2设置为空
function switchEmpty(x1, y1, x2, y2) {
  for (var i = 0; i < emptyNodes.length; i++) {
    if (emptyNodes[i].x == x1 && emptyNodes[i].y == y1) {
      emptyNodes[i].x = x2;
      emptyNodes[i].y = y2;
    }
  }
}

// 判断是否能移动以及移动操作函数
function canMoveUp() {
  var n = nodes[clickIndex];
  if (n.y == 0) {
    return false;
  }
  if (n.w > 1) {
    return false;
  }
  if (!isEmpty(n.x, n.y - 1)) {
    return false;
  }
  return true;
}

function moveUp() {
  if (canMoveUp()) {
    nodes[clickIndex].y = nodes[clickIndex].y - 1;
    switchEmpty(nodes[clickIndex].x, nodes[clickIndex].y, nodes[clickIndex].x, nodes[clickIndex].y + nodes[clickIndex].h);
  }
}

function canMoveDown() {
  var n = nodes[clickIndex];
  if ((n.y + n.h) >= 6) {
    return false;
  }
  if (n.w > 1) {
    return false;
  }
  if (!isEmpty(n.x, n.y + n.h)) {
    return false;
  }
  return true;
}

function moveDown() {
  if (canMoveDown()) {
    nodes[clickIndex].y = nodes[clickIndex].y + 1;
    switchEmpty(nodes[clickIndex].x, nodes[clickIndex].y + nodes[clickIndex].h - 1, nodes[clickIndex].x, nodes[clickIndex].y - 1)
  }
}

function canMoveLeft() {
  var n = nodes[clickIndex];
  if (n.x == 0) {
    return false;
  }
  if (n.h > 1) {
    return false;
  }
  if (!isEmpty(n.x - 1, n.y)) {
    return false;
  }
  return true;
}

function moveLeft() {
  if (canMoveLeft()) {
    nodes[clickIndex].x = nodes[clickIndex].x - 1;
    switchEmpty(nodes[clickIndex].x, nodes[clickIndex].y, nodes[clickIndex].x + nodes[clickIndex].w, nodes[clickIndex].y)
  }
}

function canMoveRight() {
  var n = nodes[clickIndex];
  if ((n.x + n.w) >= 6) {
    return false;
  }
  if (n.h > 1) {
    return false;
  }
  if (!isEmpty(n.x + n.w, n.y)) {
    return false;
  }
  return true;
}

function moveRight() {
  if (canMoveRight()) {
    nodes[clickIndex].x = nodes[clickIndex].x + 1;
    switchEmpty(nodes[clickIndex].x + nodes[clickIndex].w - 1, nodes[clickIndex].y, nodes[clickIndex].x - 1, nodes[clickIndex].y);
  }
}

// 输出调试信息到info1
function showstr1(s) {
  document.getElementById("info1").innerHTML = s
}

// 输出调试信息到info2
function showstr2(s) {
  document.getElementById("info2").innerHTML = s
}

// 鼠标在画布上按下响应函数
function mouseDown(e) {
  clickIndex = -1;
  clickX = -1;
  clickY = -1;
  var x = e.offsetX;
  var y = e.offsetY;
  for (var i = 0; i < nodes.length; i++) {
    if (x > nodes[i].x * 50 && x < (nodes[i].x + nodes[i].w) * 50 && y > nodes[i].y * 50 && y < (nodes[i].y + nodes[i].h) * 50) {
      clickIndex = i;
      clickX = x;
      clickY = y;
      break;
    }
  }
}
// 鼠标在画布上抬起操作响应函数
function mouseUp(e) {
  if (clickIndex < 0) {
    return;
  }
  var x = e.offsetX;
  var y = e.offsetY;
  if (Math.abs(x - clickX) > Math.abs(y - clickY)) {
    if (x > clickX) {
      moveRight();
    } else {
      moveLeft();
    }
  } else {
    if (y > clickY) {
      moveDown();
    } else {
      moveUp();
    }
  }
  DisplayGame()
}

// 初始化图片资源
for (var i = 0; i < nodes.length; i++) {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = nodes[i].image;
  img.src = "images/" + nodes[i].name + ".png";
  var x = nodes[i].x;
  var y = nodes[i].y;
}

// 刷新canvas显示
function DisplayGame() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, 300, 300);

  for (var i = 0; i < nodes.length; i++) {
    ctx.drawImage(nodes[i].image, nodes[i].x * 50, nodes[i].y * 50, nodes[i].w * 50, nodes[i].h * 50);
  }
}

function SortNum(a) { //将传入的数组a中的元素按从小到大排列
  for (var i = 0; i < a.length - 1; i++) {
    for (var j = i + 1; j < a.length; j++) {
      if (a[i] > a[j]) {
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
      }
    }
  }
}

function GraphNode(nodesPos, edges, checked, p) {
  this.p = p; //变化成此盘面的前一个盘面
  this.nodesPos = nodesPos;
  this.edges = edges;
  this.checked = checked;
  this.isEmpty = function(x, y) {
    for (var i = 0; i < this.nodesPos.length; i++) {
      var dx = x - this.nodesPos[i].x;
      var dy = y - this.nodesPos[i].y;
      if (dx >= 0 && dx < nodes[i].w && dy >= 0 && dy < nodes[i].h) {
        return false;
      }
    }
    return true;
  }
  this.m1 = 0; //特征值，用于判断两种盘面是否等同
  this.m2 = 0; //特征值，同上
  var mult = 1;
  var index = 0;

  var pos12 = new Array(); //1x2方块的位置
  for (var i = 0; i < index12.length; i++) {
    pos12[pos12.length] = nodesPos[index12[i]].index();
  }
  SortNum(pos12);
  for (var i = 0; i < pos12.length; i++) {
    if (index < 5)
      this.m1 = this.m1 + pos12[i] * mult;
    else
      this.m2 = this.m2 + pos12[i] * mult;
    index = index + 1;
    mult = mult * 100;
    if (index == 5)
      mult = 1;
  }

  var pos21 = new Array(); //2x1的位置
  for (var i = 0; i < index21.length; i++) {
    pos21[pos21.length] = nodesPos[index21[i]].index();
  }
  SortNum(pos21);
  for (var i = 0; i < pos21.length; i++) {
    if (index < 5)
      this.m1 = this.m1 + pos21[i] * mult;
    else
      this.m2 = this.m2 + pos21[i] * mult;
    index = index + 1;
    mult = mult * 100;
    if (index == 5)
      mult = 1;
  }

  var pos13 = new Array(); //1x3的位置
  for (var i = 0; i < index13.length; i++) {
    pos13[pos13.length] = nodesPos[index13[i]].index();
  }
  SortNum(pos13);
  for (var i = 0; i < pos13.length; i++) {
    if (index < 5)
      this.m1 = this.m1 + pos13[i] * mult;
    else
      this.m2 = this.m2 + pos13[i] * mult;
    index = index + 1;
    mult = mult * 100;
    if (index == 5)
      mult = 1;
  }

  var pos31 = new Array(); //3x1的位置
  for (var i = 0; i < index31.length; i++) {
    pos31[pos31.length] = nodesPos[index31[i]].index();
  }
  SortNum(pos31);
  for (var i = 0; i < pos31.length; i++) {
    if (index < 5)
      this.m1 = this.m1 + pos31[i] * mult;
    else
      this.m2 = this.m2 + pos31[i] * mult;
    index = index + 1;
    mult = mult * 100;
    if (index == 5)
      mult = 1;
  }
}

var graphNodes = new Array();

var buildGraphFinish = false;
var isWin = false

function CopyNodesPos(nodesPos) {
  var r = new Array;
  for (var i = 0; i < nodesPos.length; i++) {
    r[i] = new NodePos(nodesPos[i].x, nodesPos[i].y);
  }
  return r;
}

// 对于判断节点每一个位置，查看待判断表中是否有相应大小元素
function AddOneGraphNode(nodesPos, p) {
  var newNode = new GraphNode(nodesPos, new Array, false, p);
  var i;
  for (i = 0; i < graphNodes.length; i++) {
    if (newNode.m1 == graphNodes[i].m1 && newNode.m2 == graphNodes[i].m2)
      return i; //若graphNodes已经存储了此种盘面，则直接返回
  }
  if (i == graphNodes.length) {
    graphNodes[graphNodes.length] = newNode; //将新盘面数据存入graphNodes中
    if (nodesPos[0].x == 4 && nodesPos[0].y == 2) //红鱼到达目的地
      isWin = true;
    return graphNodes.length;
  }
}

function SearchOne(index) {
//对盘面的所有格子尝试上下左右移动，并将移动结果与存储的所有盘面进行对比；
//若无此盘面，则将新盘面存入grapgNodes中，若将曹操移动到指定位置，则跳出循环
  var n = graphNodes[index]
  n.checked = true;
  for (var i = 0; i < nodes.length; i++) {
    // up
    if (n.nodesPos[i].y > 0) {
      if (n.isEmpty(n.nodesPos[i].x, n.nodesPos[i].y - 1)) {
        if (nodes[i].w == 1) {
          var newNodesPos = CopyNodesPos(n.nodesPos);
          newNodesPos[i].y = newNodesPos[i].y - 1;
          var insertPos = AddOneGraphNode(newNodesPos, n);
          n.edges[n.edges.length] = insertPos
        }
      }
    }
    // down
    if ((n.nodesPos[i].y + nodes[i].h) < 6) {
      if (n.isEmpty(n.nodesPos[i].x, n.nodesPos[i].y + nodes[i].h)) {
        if (nodes[i].w == 1) {
          var newNodesPos = CopyNodesPos(n.nodesPos);
          newNodesPos[i].y = newNodesPos[i].y + 1;
          var insertPos = AddOneGraphNode(newNodesPos, n);
          n.edges[n.edges.length] = insertPos
        }
      }
    }
    // left
    if (n.nodesPos[i].x > 0) {
      if (n.isEmpty(n.nodesPos[i].x - 1, n.nodesPos[i].y)) {
        if (nodes[i].h == 1) {
          var newNodesPos = CopyNodesPos(n.nodesPos);
          newNodesPos[i].x = newNodesPos[i].x - 1;
          var insertPos = AddOneGraphNode(newNodesPos, n);
          n.edges[n.edges.length] = insertPos
        }
      }
    }
    // right
    if ((n.nodesPos[i].x + nodes[i].w) < 6) {
      if (n.isEmpty(n.nodesPos[i].x + nodes[i].w, n.nodesPos[i].y)) {
        if (nodes[i].h == 1) {
          var newNodesPos = CopyNodesPos(n.nodesPos);
          newNodesPos[i].x = newNodesPos[i].x + 1;
          var insertPos = AddOneGraphNode(newNodesPos, n);
          n.edges[n.edges.length] = insertPos
        }
      }
    }
    if (isWin)
      break;
  }

}

// 搜索解
function FindPath() {
  var nodesPos = new Array();
  for (var i = 0; i < nodes.length; i++) {
    nodesPos[i] = new NodePos(nodes[i].x, nodes[i].y);
  }

  graphNodes[0] = new GraphNode(nodesPos, new Array(), false);
  var counter = 0;

  var d1 = new Date();
  while (true)
  {
    counter = counter + 1
    var i;
    for (i = 0; i < graphNodes.length; i++) {
      if (!graphNodes[i].checked) {
        SearchOne(i);
        break;
      }
    }
    if (isWin) { //红鱼到达目的地，跳出循环
      break;
    }
    if (i == graphNodes.length) { //穷尽所有可能盘面，红鱼也无法逃脱
      showstr1("红鱼插翅难飞！");
      break;
    }
  }
  var d2 = new Date();
  showstr1("已搜索盘面数:" + graphNodes.length + " 花费时间:" + (d2.getTime() - d1.getTime())/1000 +'秒');
  DisplaySolution();
}

function DisplaySolution() {
  var solutionNodes = new Array();
  var n = graphNodes[graphNodes.length - 1];
  solutionNodes[0] = n;
  while (n != graphNodes[0]) {
    n = n.p;
    solutionNodes[solutionNodes.length] = n;
  }
  var tbl = document.getElementById("deallist");
  var col = 0;
  var row = 1;
  var r = tbl.insertRow(i);
  for (var i = solutionNodes.length - 1; i >= 0; i--) {
    if (col >= 5) {
      col = 0;
      r = tbl.insertRow(row);
      row = row + 1;
    }
    var c = r.insertCell(col);
    col = col + 1;
    c.innerHTML = "<canvas id=\"graphcanvas" + i + "\" width=\"180\" height=\"180\" style=\"border:1px solid #d3d3d3;background:#ffffff;\"> </canvas>";
    var c = document.getElementById("graphcanvas" + i);
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 180, 180);
    for (var k = 0; k < nodes.length; k++) {
      ctx.drawImage(nodes[k].image, solutionNodes[i].nodesPos[k].x * 30, solutionNodes[i].nodesPos[k].y * 30, nodes[k].w * 30, nodes[k].h * 30);
    }
  }
  showstr2("最少步数:" + solutionNodes.length);
}
