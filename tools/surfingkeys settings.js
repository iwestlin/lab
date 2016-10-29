// an example to create a new mapping `ctrl-y`
mapkey('<Ctrl-y>', 'Show me the money', function() {
    Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});

mapkey('zz', 'show jpeg on oiegg', function() {
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

mapkey('za', 'open hongbao page', function() {
    window.open('http://www.oiegg.com/plugin.php?identifier=get_money&module=money&action=money_get&hid=59');
}, {domain: /oiegg\.com/i});

mapkey('zz', 'download origin pictures', function() {
      var imgs = document.getElementsByClassName('a-show');
      for (var i = 0, len = imgs.length; i < len; i++) {
          var a = document.createElement('a');
          a.href = imgs[i].src;
          a.download = '';
          a.click();
      }
}, {domain: /lofter\.com/i});

// an example to replace `u` with `?`, click `Default mappings` to see how `u` works.
map('?', 'u');

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
