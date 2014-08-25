window.onload = function() {
    var e = document.getElementById("id_css");
    var q = document.getElementById("id_header");
    var a = getElementByClass(q, "search_input");
    var l = getElementByClass(q, "search_baidu_btn");
    var j = getElementByClass(q, "search_google_btn");
    var s = getElementByClass(q, "search_refresh");
    var t = getElementByClass(q, "toolNav_option");
    var u = t.getElementsByTagName("li");
    var k = getElementByClass(q, "toolNav_sildeBox");
    var n = document.getElementById("id_time");
    var h = document.getElementById("id_tips");
    a.value = "";
    a.focus();
    var v = null;
    var o = 0;
    var m = 0;
    var b = ["\u51cc\u66680\u70b9\u4e86\uff0c\u4f60\u8fd8\u4e0d\u53bb\u7761\u5417\uff1f\u56f0\u6b7b\u4e86\uff01", "\u51cc\u66681\u70b9\u4e86\uff0c\u8fd8\u4e0d\u53bb\u7761\u89c9\u554a\uff0c\u6253\u4f60\u54e6\uff01", "\u51cc\u66682\u70b9\u4e86\uff0c\u6709\u4ec0\u4e48\u4e8b\u7559\u5230\u660e\u5929\u518d\u505a\u5427\uff01", "\u51cc\u66683\u70b9\u4e86\uff0c\u4f60\u5931\u7720\u4e86\u5417\uff1f\u5355\u72ec\u800c\u4e0d\u5b64\u72ec\u3002", "\u51cc\u66684\u70b9\u4e86\uff0c\u809a\u5b50\u997f\u4e0d\u997f\uff0c\u8981\u5403\u70b9\u4e1c\u897f\u5417\uff1f", "\u65e9\u4e0a5\u70b9\u4e86\uff0c\u5594\u5594\u5594\uff01\u5929\u90fd\u5feb\u4eae\u4e86\uff01", "\u65e9\u4e0a6\u70b9\u4e86\uff0c\u65e9\u5b89\uff0c\u53bb\u770b\u770b\u7b2c\u4e00\u7f15\u6668\u66e6\u5427\uff01", "\u65e9\u4e0a7\u70b9\u4e86\uff0c\u795d\u4f60\u4e00\u5929\u597d\u5fc3\u60c5\uff01", "\u65e9\u4e0a8\u70b9\u4e86\uff0c\u8bb0\u5f97\u8981\u5403\u65e9\u9910\u54e6\uff01", "\u4e0a\u53489\u70b9\u4e86\uff0c\u5f00\u59cb\u5de5\u4f5c\u5566\uff01\u52a0\u6cb9\uff01\u52a0\u6cb9\uff01", "\u4e0a\u534810\u70b9\u4e86\uff0c\u8981\u52aa\u529b\u5de5\u4f5c\u54e6\uff01", "\u4e0a\u534811\u70b9\u4e86\uff0c\u518d\u575a\u6301\u4e00\u4f1a\u5c31\u53ef\u4ee5\u5403\u996d\u5566\uff01", "\u4e2d\u534812\u70b9\u4e86\uff0c\u5348\u996d\u8981\u5403\u597d\u54e6\uff01", "\u4e2d\u53481\u70b9\u4e86\uff0c\u4f11\u606f\u4e00\u4f1a\uff0c\u7cbe\u795e\u767e\u500d\uff01", "\u4e0b\u53482\u70b9\u4e86\uff0c\u7ee7\u7eed\u52a0\u6cb9\uff0c\u522b\u6253\u778c\u7761\u54e6\uff01", "\u4e0b\u53483\u70b9\u4e86\uff0c\u72b6\u6001\u5f88\u597d\uff0c\u641e\u5b9a\u6240\u6709\u4e8b\u60c5\uff01", "\u4e0b\u53484\u70b9\u4e86\uff0c\u7d2f\u4e0d\u7d2f\uff1f\u8981\u4f11\u606f\u4e00\u4e0b\u5417\uff1f", "\u4e0b\u53485\u70b9\u4e86\uff0c\u53bb\u8fd0\u52a8\u4e00\u4e0b\uff0c\u7ed9\u8eab\u4f53\u5145\u5145\u7535\uff01", "\u4e0b\u53486\u70b9\u4e86\uff0c\u5145\u5b9e\u7684\u4e00\u5929\u8f9b\u82e6\u4e86\uff01", "\u665a\u4e0a7\u70b9\u4e86\uff0c\u5956\u52b1\u81ea\u5df1\u4e00\u987f\u4e30\u76db\u7684\u665a\u9910\u5427\uff01", "\u665a\u4e0a8\u70b9\u4e86\uff0c\u5728\u5c5e\u4e8e\u81ea\u5df1\u7684\u65f6\u95f4\u597d\u597d\u653e\u677e\uff01", "\u665a\u4e0a9\u70b9\u4e86\uff0c\u4f60\u662f\u5728\u770b\u4e66\u8fd8\u662f\u4e0a\u7f51\u5462\uff1f", "\u665a\u4e0a10\u70b9\u4e86\uff0c\u4f60\u6709\u6ca1\u6709\u5728\u60f3\u8c01\u554a\uff1f", "\u665a\u4e0a11\u70b9\u4e86\uff0c\u8be5\u53bb\u7761\u89c9\u5566\uff0c\u8981\u4e56\u54e6\uff01"];
    c();

    function c() {
        var i = new Date();
        var w = parseInt("" + i.getHours() + f(i.getMinutes()) + f(i.getSeconds()));
        if (w >= 60000 && w < 80000) {
            e.href = "css/pink.css"
        } else {
            if (w >= 80000 && w < 120000) {
                e.href = "css/yellow.css"
            } else {
                if (w >= 120000 && w < 170000) {
                    e.href = "css/blue.css"
                } else {
                    if (w >= 170000 && w < 190000) {
                        e.href = "css/orange.css"
                    } else {
                        if (w >= 190000 || w < 60000) {
                            e.href = "css/purple.css"
                        }
                    }
                }
            }
        }
    }
    for (var r = 0; r < u.length; r++) {
        u[r].index = r;
        u[r].onclick = function() {
            for (var w = 0; w < u.length; w++) {
                u[w].className = ""
            }
            this.className = "active";
            k.style.left = this.index * 50 + "px";
            o = this.index;
            m = this.index * 50;
            switch (this.index) {
                case 0:
                    l.value = "\u767e\u5ea6\u4e00\u4e0b";
                    j.value = "\u8c37\u6b4c\u641c\u7d22";
                    break;
                case 1:
                    l.value = "\u767e\u5ea6\u56fe\u7247";
                    j.value = "\u8c37\u6b4c\u56fe\u7247";
                    break;
                case 2:
                    l.value = "\u767e\u5ea6\u7ffb\u8bd1";
                    j.value = "\u8c37\u6b4c\u7ffb\u8bd1";
                    break;
                case 3:
                    l.value = "\u767e\u5ea6\u767e\u79d1";
                    j.value = "\u7ef4\u57fa\u767e\u79d1";
                    break;
                case 4:
                    l.value = "\u767e\u5ea6\u5730\u56fe";
                    j.value = "\u8c37\u6b4c\u5730\u56fe";
                    break
            }
        };
        u[r].onmouseover = function() {
            animation(k, {
                left: this.index * 50
            }, 20, "buffer")
        };
        u[r].onmouseout = function() {
            animation(k, {
                left: m
            }, 20, "buffer")
        }
    }
    s.onclick = function() {
        a.value = "";
        a.focus();
        this.style.display = "none"
    };
    l.onclick = function() {
        p()
    };
    j.onclick = function() {
        g()
    };
    document.onkeypress = function(w) {
        var i = w || window.event;
        if (i.ctrlKey && i.keyCode == 13 || i.keyCode == 10) {
            g()
        } else {
            if (i.keyCode == 13) {
                p()
            }
        }
    };
    document.onkeyup = function() {
        if (a.value.length != 0) {
            s.style.display = "block"
        } else {
            s.style.display = "none"
        }
    };

    function p() {
        v = a.value;
        switch (o) {
            case 0:
                window.open("http://www.baidu.com/s?word=" + v + "", "_blank");
                break;
            case 1:
                window.open("http://image.baidu.com/i?tn=baiduimage&ie=utf-8&word=" + v + "", "_blank");
                break;
            case 2:
                window.open("http://fanyi.baidu.com/#auto2auto|" + v + "", "_blank");
                break;
            case 3:
                v = encodeToGb2312(v);
                window.open("http://baike.baidu.com/search?word=" + v + "", "_blank");
                break;
            case 4:
                window.open("http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D" + v + "", "_blank")
        }
    }

    function g() {
        v = a.value;
        switch (o) {
            case 0:
                window.open("http://www.google.com/search?q=" + v + "", "_blank");
                break;
            case 1:
                window.open("http://www.google.com/search?q=" + v + "&biw=1600&bih=809&sei=n7qkUeCdHYbtiAfknoDACw&tbm=isch", "_blank");
                break;
            case 2:
                var i = new RegExp("[\u4e00-\u9fa5]", "i");
                if (i.test(v)) {
                    window.open("http://translate.google.cn/#auto/en/" + v + "", "_blank")
                } else {
                    window.open("http://translate.google.cn/#auto/zh-CN/" + v + "", "_blank")
                }
                break;
            case 3:
                window.open("http://zh.wikipedia.org/wiki/" + v + "", "_blank");
                break;
            case 4:
                window.open("http://maps.google.com/maps?q=" + v + "&rdo_search=on&biw=1600&bih=809&ie=UTF-8&hl=zh-CN&sa=N&tab=il", "_blank")
        }
    }
    d();
    setInterval(d, 1000);

    function d() {
        var i = new Date();
        n.innerHTML = f(i.getHours()) + " : " + f(i.getMinutes()) + " : " + f(i.getSeconds());
        h.innerHTML = b[i.getHours()];
        var w = parseInt("" + i.getHours() + f(i.getMinutes()) + f(i.getSeconds()));
        if (w == 60000) {
            e.href = "css/pink.css"
        } else {
            if (w == 80000) {
                e.href = "css/yellow.css"
            } else {
                if (w == 120000) {
                    e.href = "css/blue.css"
                } else {
                    if (w == 170000) {
                        e.href = "css/orange.css"
                    } else {
                        if (w == 190000) {
                            e.href = "css/purple.css"
                        }
                    }
                }
            }
        }
    }

    function f(i) {
        if (i < 10) {
            return "0" + i
        } else {
            return i
        }
    }
};
