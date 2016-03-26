document.body.innerHTML = '';
var textarea1 = document.createElement('TEXTAREA');
textarea1.setAttribute('id', 'one');
textarea1.setAttribute('cols', '30');
textarea1.setAttribute('rows', '10');
var button1 = document.createElement('BUTTON');
button1.onclick = function() {
  str2arr();
};
button1.innerText = '开始爬虫';
document.body.appendChild(textarea1);
document.body.appendChild(button1);

var word;
var loop;
var i = 0;
var notfound = [];
var url = 'https://www.shanbay.com/api/v1/bdc/search/?word=';
var url2 = 'https://www.shanbay.com/bdc/vocabulary/';

function str2arr() {
  var str = document.getElementById("one").value;
  str = str.replace(/\n\n+/g, "\n");
  word = str.split("\n");
  loop = setInterval(haha, 500);
}

function httpRequest(url, callback, www) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    } else if(xhr.status == 404) {
      // console.log('无法获取：' + www);
      notfound.push(www);
    }
  };
  xhr.send();
}

function getWordInfo(result) {
  var html = document.createElement('html');
  html.innerHTML = result;
  getWordInfo2(html);
}

function getWordInfo2(html) {
  var word = (html.getElementsByTagName("h1")[0].firstChild.textContent).trim();
  var yinbiao = (html.getElementsByTagName("small")[0].firstChild.textContent).trim();
  var shiyi = (html.getElementsByClassName("text")[0].firstChild.textContent).trim();
  var engliju1 = (html.getElementsByClassName("enex")[0].firstChild.textContent).trim();
  var engliju2 = (html.getElementsByClassName("enex")[1].firstChild.textContent).trim();
  var engliju3 = (html.getElementsByClassName("enex")[2].firstChild.textContent).trim();
  var chiliju1 = (html.getElementsByClassName("cnex")[0].firstChild.textContent).trim();
  var chiliju2 = (html.getElementsByClassName("cnex")[1].firstChild.textContent).trim();
  var chiliju3 = (html.getElementsByClassName("cnex")[2].firstChild.textContent).trim();
  var output = word + '|' + yinbiao + '|' + shiyi + '|' + engliju1 + '|' + chiliju1 + '|' + engliju2 + '|' + chiliju2 + '|' + engliju3 + '|' + chiliju3 + '<br>';
  document.write(output);
}

function haha() {
  if (i < word.length) {
    try {
      httpRequest((url + word[i]), getWord, word[i-1]);
    } catch (e) {}
  } else {
    clearInterval(loop);
    document.write('<br><br>没找到的单词：'+removeOnlyOneEmpty(notfound.unique()));
  }
  i++;
}

function getWord(result) {
  var wordObj = JSON.parse(result);
  var link = url2 + wordObj.data.conent_id + '/';
  try {
    httpRequest(link, getWordInfo, word[i-1]);
  } catch (e) {}
}

Array.prototype.unique = function(){
    var ret = [];
    var o = {};
    var len = this.length;
    for (var i=0; i<len; i++){
        var v = this[i];
        if (!o[v]){
            o[v] = 1;
            ret.push(v);
        }
    }
    return ret;
};

function removeOnlyOneEmpty(somearr) {
  var i = somearr.indexOf('');
  if (i>=0) {
    somearr.splice(i, i+1);
    return somearr;
  } else {
    return somearr;
  }
}