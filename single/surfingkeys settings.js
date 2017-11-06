// an example to create a new mapping `ctrl-y`
mapkey('<Ctrl-y>', 'Show me the money', function() {
    Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});

// an example to replace `u` with `?`, click `Default mappings` to see how `u` works.
map('?', 'u');

mapkey('za', 'show jpeg on oiegg', function() {
    var a = document.querySelectorAll('a[href^="attachment.php"]');
    for (var j = 0; j < a.length; j++) {
      try {
        if (/\.jpeg<\/|\.jpeg$/.test(a[j].innerHTML)) {
            if (a[j].parentElement.className != 't_attach') {
                var img = document.createElement('img');
                img.src = a[j].href;
                a[j].parentElement.appendChild(img);
            }
        }
      } catch(e) {}
    }
}, {domain: /oiegg\.com/i});

mapkey('za', 'fuck zhihu', function () {
  if (window.sortFlag === undefined) {
    window.sortFlag = true
    window.defaultAnswers = document.querySelectorAll('div.List-item')
  }

  var answers = document.querySelectorAll('div.List-item')
  if (answers.length === 0) {
    return
  }
  var parent = answers[0].parentElement
  if (sortFlag) {
    sortByLikes()
  } else {
    sortByDefault()
  }
  sortFlag = !sortFlag

  function sortByLikes() {
    var likes = []
    for (let i = 0; i < answers.length; i++) {
      var temp = answers[i].getElementsByClassName('Voters')[0]
      var n = temp ? temp.innerText : '0'
      n = parseInt(n.split(' ')[0])
      likes.push([n, i])
    }
    likes = likes.sort(descendByFirst)
    for (let i = 0; i < likes.length; i++) {
      parent.appendChild(answers[likes[i][1]])
    }
  }

  function sortByDefault() {
    for (let i = 0; i < defaultAnswers.length; i++) {
      parent.appendChild(defaultAnswers[i])
    }
  }

  function descendByFirst(x, y) {
    return y[0] - x[0]
  }
}, { domain: /zhihu\.com/i });

mapkey('za', 'get words', function() {
    var script = document.createElement('script');
    script.src = '//js007-1253509220.costj.myqcloud.com/srt.js';
    document.body.appendChild(script);
}, {domain: /shanbay\.com/i})

mapkey('za', 'download pics', function() {
    var imgs = document.querySelectorAll('li.WB_pic img')
    var a = document.createElement('a')
    a.download = ''

    for (let i = 0, len = imgs.length; i < len; i++) {
      a.href = imgs[i].src.replace('thumb150', 'large')
      a.click()
    }
}, {domain: /weibo\.com/i})

mapkey('za', 'download origin pictures', function() {
      var imgs = document.getElementsByClassName('a-show');
      for (var i = 0, len = imgs.length; i < len; i++) {
          var a = document.createElement('a');
          a.href = imgs[i].src;
          a.download = '';
          a.click();
      }
}, {domain: /lofter\.com/i});

// an example to remove mapkey `Ctrl-i`
unmap('<Ctrl-i>');

// click `Save` button to make above settings to take effect.
// set theme
settings.theme = '\
.sk_theme { \
    background: #fff; \
    color: #000; \
} \
.sk_theme tbody { \
    color: #000; \
} \
.sk_theme input { \
    color: #000; \
} \
.sk_theme .url { \
    color: #555; \
} \
.sk_theme .annotation { \
    color: #555; \
} \
.sk_theme .focused { \
    background: #f0f0f0; \
}';
