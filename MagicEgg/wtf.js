function lazyLoad(e) {
  var t, n, r, i = {
    selector: null,
    height: 200
  };
  Object.mix(i, e || {}, !0), t = i.height, n = W(i.selector).query("img"), r = function() {
    var e = Dom.getDocRect(),
      r = e.scrollY,
      i = e.height + r;
    n.forEach(function(e) {
      var n, o = W(e),
        a = o.getRect();
      a.bottom < r - t || a.top > i + t || (n = o.attr("data-src"), n && (o.on("load", function() {
        this.style.minHeight = "initial"
      }), o.attr("src", o.attr("data-src")).removeAttr("data-src")))
    })
  }, n.length && (W(window).on("resize", r).on("scroll", r), r())
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: "zh-CN",
    includedLanguages: "en,zh-TW,de,fr,ru,ja,ko",
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: !1
  }, "google_translate_element")
}
if (function() {
    var e = {
      VERSION: "1.1.6",
      RELEASE: "2014-01-06",
      PATH: function() {
        var e = document.getElementsByTagName("script");
        return e[e.length - 1].src.replace(/(^|\/)[^\/]+\/[^\/]+$/, "$1")
      }(),
      namespace: function(t, n) {
        var r, i = t.split("."),
          o = 0;
        for (0 == t.indexOf(".") && (o = 1, n = n || e), n = n || window; r = i[o++];) n[r] || (n[r] = {}), n = n[r];
        return n
      },
      loadJs: function(e, t, n) {
        n = n || {};
        var r = document.getElementsByTagName("head")[0] || document.documentElement,
          i = document.createElement("script"),
          o = !1;
        i.src = e, n.charset && (i.charset = n.charset), "async" in n && (i.async = n.async || ""), i.onerror = i.onload = i.onreadystatechange = function() {
          o || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (o = !0, t && t(), i.onerror = i.onload = i.onreadystatechange = null, r.removeChild(i))
        }, r.insertBefore(i, r.firstChild)
      },
      loadJsonp: function() {
        var t = 1 * new Date;
        return function(n, r, i) {
          i = i || {};
          var o = "QWJsonp" + t++,
            a = i.callbackReplacer || /%callbackfun%/gi;
          window[o] = function(e) {
            r && r(e), window[o] = null
          }, a.test(n) ? n = n.replace(a, o) : n += (/\?/.test(n) ? "&" : "?") + "callback=" + o, e.loadJs(n, i.oncomplete, i)
        }
      }(),
      loadCss: function(e) {
        var t = document.getElementsByTagName("head")[0] || document.documentElement,
          n = document.createElement("link");
        n.rel = "stylesheet", n.type = "text/css", n.href = e, t.insertBefore(n, t.firstChild)
      }
    };
    window.QW = e
  }(), function() {
    function e(e) {
      return !!e && e.constructor == Object
    }
    var t = {
      provideDomains: [QW],
      provide: function(n, r) {
        var i, o;
        if ("string" == typeof n)
          for (i = t.provideDomains, o = 0; o < i.length; o++) i[o][n] || (i[o][n] = r);
        else if (e(n))
          for (o in n) t.provide(o, n[o])
      }
    };
    QW.ModuleH = t, QW.provide = t.provide
  }(), QW.Browser = function() {
    var e, t = window.navigator,
      n = t.userAgent.toLowerCase(),
      r = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos|trident)[ \/os]*([\d_.]+)/gi,
      i = {
        platform: t.platform
      };
    return n.replace(r, function(e, t, n) {
      i[t] || (i[t] = n)
    }), i.opera && n.replace(/opera.*version\/([\d.]+)/, function(e, t) {
      i.opera = t
    }), !i.msie && i.trident && n.replace(/trident\/[0-9].*rv[ :]([0-9.]+)/gi, function(e, t) {
      i.msie = t
    }), i.msie && (i.ie = i.msie, e = parseInt(i.msie, 10), i["ie" + e] = !0), i
  }(), QW.Browser.ie) try {
    document.execCommand("BackgroundImageCache", !1, !0)
  } catch (e) {}! function() {
    var e = {
      trim: function(e) {
        return e.replace(/^[\s\uFEFF\xa0\u3000]+|[\uFEFF\xa0\u3000\s]+$/g, "")
      },
      mulReplace: function(e, t) {
        for (var n = 0; n < t.length; n++) e = e.replace(t[n][0], t[n][1]);
        return e
      },
      format: function(e) {
        var t = arguments;
        return e.replace(/\{(\d+)\}/gi, function(e, n) {
          var r = t[(0 | n) + 1];
          return null == r ? "" : r
        })
      },
      tmpl: function(e, t) {
        return e.replace(/\{\$(\w+)\}/g, function(e, n) {
          return t[n]
        })
      },
      dbc2sbc: function(t) {
        return e.mulReplace(t, [
          [/[\uff01-\uff5e]/g, function(e) {
            return String.fromCharCode(e.charCodeAt(0) - 65248)
          }],
          [/\u3000/g, " "],
          [/\u3002/g, "."]
        ])
      },
      byteLen: function(e) {
        return e.replace(/[^\x00-\xff]/g, "--").length
      },
      subByte: function(t, n, r) {
        return e.byteLen(t) <= n ? t : (r = r || "", n -= e.byteLen(r), t.substr(0, n).replace(/([^\x00-\xff])/g, "$1 ").substr(0, n).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + r)
      },
      camelize: function(e) {
        return e.replace(/\-(\w)/gi, function(e, t) {
          return t.toUpperCase()
        })
      },
      decamelize: function(e) {
        return e.replace(/[A-Z]/g, function(e) {
          return "-" + e.toLowerCase()
        })
      },
      encode4Js: function(t) {
        return e.mulReplace(t, [
          [/\\/g, "\\u005C"],
          [/"/g, "\\u0022"],
          [/'/g, "\\u0027"],
          [/\//g, "\\u002F"],
          [/\r/g, "\\u000A"],
          [/\n/g, "\\u000D"],
          [/\t/g, "\\u0009"]
        ])
      },
      escapeChars: function(t) {
        return e.mulReplace(t, [
          [/\\/g, "\\\\"],
          [/"/g, '\\"'],
          [/\r/g, "\\r"],
          [/\n/g, "\\n"],
          [/\t/g, "\\t"]
        ])
      },
      encode4Html: function(e) {
        var t = document.createElement("pre"),
          n = document.createTextNode(e);
        return t.appendChild(n), t.innerHTML
      },
      encode4HtmlValue: function(t) {
        return e.encode4Html(t).replace(/"/g, "&quot;").replace(/'/g, "&#039;")
      },
      decode4Html: function(t) {
        var n = document.createElement("div");
        return n.innerHTML = e.stripTags(t), n.childNodes[0] ? n.childNodes[0].nodeValue || "" : ""
      },
      stripTags: function(e) {
        return e.replace(/<[^>]*>/gi, "")
      },
      evalJs: function(e, t) {
        return Function("opts", e)(t)
      },
      evalExp: function(e, t) {
        return Function("opts", "return (" + e + ");")(t)
      },
      queryUrl: function(e, t) {
        e = e.replace(/^[^?=]*\?/gi, "").split("#")[0];
        var n = {};
        return e.replace(/(^|&)([^&=]+)=([^&]*)/g, function(e, t, r, i) {
          try {
            r = decodeURIComponent(r)
          } catch (o) {}
          try {
            i = decodeURIComponent(i)
          } catch (o) {}
          r in n ? n[r] instanceof Array ? n[r].push(i) : n[r] = [n[r], i] : n[r] = /\[\]$/.test(r) ? [i] : i
        }), t ? n[t] : n
      }
    };
    QW.StringH = e
  }(),
  function() {
    function e(e) {
      return null != e && null != e.constructor ? Object.prototype.toString.call(e).slice(8, -1) : ""
    }
    var t = QW.StringH.escapeChars,
      n = {
        isString: function(t) {
          return "String" == e(t)
        },
        isFunction: function(t) {
          return "Function" == e(t)
        },
        isArray: function(t) {
          return "Array" == e(t)
        },
        isObject: function(e) {
          return null !== e && "object" == typeof e
        },
        isPlainObject: function(t) {
          return "Object" == e(t)
        },
        isWrap: function(e, t) {
          return !(!e || !e[t || "core"])
        },
        isElement: function(e) {
          return !!e && 1 == e.nodeType
        },
        set: function(e, t, r) {
          var i, o, a, u, s;
          if (n.isArray(t))
            for (i = 0; i < t.length; i++) n.set(e, t[i], r[i]);
          else if (n.isPlainObject(t))
            for (i in t) n.set(e, i, t[i]);
          else if (n.isFunction(t)) o = [].slice.call(arguments, 1), o[0] = e, t.apply(null, o);
          else {
            for (a = t.split("."), i = 0, u = e, s = a.length - 1; s > i; i++) u = u[a[i]];
            u[a[i]] = r
          }
          return e
        },
        get: function(e, t, r) {
          var i, o, a, u;
          if (n.isArray(t))
            for (i = [], o = 0; o < t.length; o++) i[o] = n.get(e, t[o], r);
          else {
            if (n.isFunction(t)) return a = [].slice.call(arguments, 1), a[0] = e, t.apply(null, a);
            for (u = t.split("."), i = e, o = 0; o < u.length; o++) {
              if (!r && null == i) return;
              i = i[u[o]]
            }
          }
          return i
        },
        mix: function(e, t, r) {
          if (n.isArray(t)) {
            for (var i = 0, o = t.length; o > i; i++) n.mix(e, t[i], r);
            return e
          }
          if ("function" == typeof r)
            for (i in t) e[i] = r(e[i], t[i], i);
          else
            for (i in t)(r || !(e[i] || i in e)) && (e[i] = t[i]);
          return e
        },
        dump: function(e, t) {
          var n, r, i, o = {};
          for (n = 0, r = t.length; r > n; n++) n in t && (i = t[n], i in e && (o[i] = e[i]));
          return o
        },
        map: function(e, t, n) {
          var r, i = {};
          for (r in e) i[r] = t.call(n, e[r], r, e);
          return i
        },
        keys: function(e) {
          var t, n = [];
          for (t in e) e.hasOwnProperty(t) && n.push(t);
          return n
        },
        values: function(e) {
          var t, n = [];
          for (t in e) e.hasOwnProperty(t) && n.push(e[t]);
          return n
        },
        create: function(e, t) {
          var r = function(e) {
            e && n.mix(this, e, !0)
          };
          return r.prototype = e, new r(t)
        },
        stringify: function(r) {
          var i, o, a, u;
          if (null == r) return "null";
          if ("string" != typeof r && r.toJSON) return r.toJSON();
          switch (i = e(r).toLowerCase()) {
            case "string":
              return '"' + t(r) + '"';
            case "number":
              return o = "" + r, /N/.test(o) ? "null" : o;
            case "boolean":
              return "" + r;
            case "date":
              return "new Date(" + r.getTime() + ")";
            case "array":
              for (a = [], u = 0; u < r.length; u++) a[u] = n.stringify(r[u]);
              return "[" + a.join(",") + "]";
            case "object":
              if (n.isPlainObject(r)) {
                a = [];
                for (u in r) a.push('"' + t(u) + '":' + n.stringify(r[u]));
                return "{" + a.join(",") + "}"
              }
          }
          return "null"
        },
        encodeURIJson: function(e) {
          var t, n, r = [];
          for (t in e)
            if (null != e[t])
              if (e[t] instanceof Array)
                for (n = 0; n < e[t].length; n++) r.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t][n]));
              else r.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
          return r.join("&")
        }
      };
    QW.ObjectH = n
  }(),
  function() {
    var e = {
      map: function(e, t, n) {
        var r, i = e.length,
          o = Array(i);
        for (r = 0; i > r; r++) r in e && (o[r] = t.call(n, e[r], r, e));
        return o
      },
      forEach: function(e, t, n) {
        for (var r = 0, i = e.length; i > r; r++) r in e && t.call(n, e[r], r, e)
      },
      filter: function(e, t, n) {
        var r, i, o = [];
        for (r = 0, i = e.length; i > r; r++) r in e && t.call(n, e[r], r, e) && o.push(e[r]);
        return o
      },
      some: function(e, t, n) {
        for (var r = 0, i = e.length; i > r; r++)
          if (r in e && t.call(n, e[r], r, e)) return !0;
        return !1
      },
      every: function(e, t, n) {
        for (var r = 0, i = e.length; i > r; r++)
          if (r in e && !t.call(n, e[r], r, e)) return !1;
        return !0
      },
      indexOf: function(e, t, n) {
        var r = e.length;
        for (n |= 0, 0 > n && (n += r), 0 > n && (n = 0); r > n; n++)
          if (n in e && e[n] === t) return n;
        return -1
      },
      lastIndexOf: function(e, t, n) {
        var r = e.length;
        for (n |= 0, (!n || n >= r) && (n = r - 1), 0 > n && (n += r); n > -1; n--)
          if (n in e && e[n] === t) return n;
        return -1
      },
      contains: function(t, n) {
        return e.indexOf(t, n) >= 0
      },
      clear: function(e) {
        e.length = 0
      },
      remove: function(e) {
        var t, n, r, i = -1;
        for (t = 1; t < arguments.length; t++)
          for (n = arguments[t], r = 0; r < e.length; r++) n === e[r] && (0 > i && (i = r), e.splice(r--, 1));
        return i
      },
      unique: function(t) {
        var n, r, i = [],
          o = null,
          a = Array.indexOf || e.indexOf;
        for (n = 0, r = t.length; r > n; n++) a(i, o = t[n]) < 0 && i.push(o);
        return i
      },
      reduce: function(e, t, n) {
        var r, i = e.length,
          o = 0;
        if (arguments.length < 3) {
          for (r = 0; i > o; o++)
            if (o in e) {
              n = e[o++], r = 1;
              break
            }
          if (!r) throw Error("No component to reduce")
        }
        for (; i > o; o++) o in e && (n = t(n, e[o], o, e));
        return n
      },
      toArray: function(e) {
        var t, n = [];
        for (t = 0; t < e.length; t++) n[t] = e[t];
        return n
      }
    };
    QW.ArrayH = e
  }(),
  function() {
    var e = {
      format: function(e, t) {
        var n, r, i;
        t = t || "yyyy-MM-dd", n = "" + e.getFullYear(), r = {
          M: e.getMonth() + 1,
          d: e.getDate(),
          h: e.getHours(),
          m: e.getMinutes(),
          s: e.getSeconds()
        }, t = t.replace(/(y+)/gi, function(e, t) {
          return n.substr(4 - Math.min(4, t.length))
        });
        for (i in r) t = t.replace(RegExp("(" + i + "+)", "g"), function(e, t) {
          return r[i] < 10 && t.length > 1 ? "0" + r[i] : r[i]
        });
        return t
      }
    };
    QW.DateH = e
  }(),
  function() {
    var e = {
      methodize: function(e, t) {
        return t ? function() {
          return e.apply(null, [this[t]].concat([].slice.call(arguments)))
        } : function() {
          return e.apply(null, [this].concat([].slice.call(arguments)))
        }
      },
      mul: function(e, t) {
        var n = 1 == t,
          r = 2 == t,
          i = 3 == t;
        return n ? function() {
          var t, n = arguments[0];
          return n instanceof Array ? n.length ? (t = [].slice.call(arguments), t[0] = n[0], e.apply(this, t)) : void 0 : e.apply(this, arguments)
        } : function() {
          var t, n, o, a, u, s = arguments[0];
          if (s instanceof Array) {
            for (t = [].slice.call(arguments), n = [], o = 0, a = s.length; a > o; o++)
              if (t[0] = s[o], u = e.apply(this, t), r) null != u && (n = n.concat(u));
              else if (i) {
              if (void 0 !== u) return u
            } else n.push(u);
            return i ? void 0 : n
          }
          return e.apply(this, arguments)
        }
      },
      rwrap: function(e, t, n, r) {
        return null == n && (n = 0),
          function() {
            var i = e.apply(this, arguments);
            return r && void 0 !== i ? i : (n >= 0 ? i = arguments[n] : ("this" == n || "context" == n) && (i = this), t ? new t(i) : i)
          }
      },
      hook: function(e, t, n) {
        if ("before" == t) return function() {
          var r = [].slice.call(arguments);
          return !1 !== n.call(this, r, e, t) ? e.apply(this, r) : void 0
        };
        if ("after" == t) return function() {
          var r = [].slice.call(arguments),
            i = e.apply(this, r);
          return n.call(this, i, e, t)
        };
        throw Error("unknow hooker:" + t)
      },
      bind: function(e, t) {
        var n = [].slice,
          r = n.call(arguments, 2),
          i = function() {},
          o = function() {
            return e.apply(this instanceof i ? this : t || {}, r.concat(n.call(arguments)))
          };
        return i.prototype = e.prototype, o.prototype = new i, o
      },
      lazyApply: function(e, t, n, r, i) {
        i = i || function() {
          return !0
        };
        var o = function() {
            var r = i();
            1 == r && e.apply(t, n || []), (1 == r || -1 == r) && clearInterval(a)
          },
          a = setInterval(o, r);
        return a
      }
    };
    QW.FunctionH = e
  }(),
  function() {
    var e = QW.FunctionH,
      t = QW.ObjectH.create,
      n = QW.ObjectH.isPlainObject,
      r = function() {},
      i = {
        rwrap: function(n, i, o) {
          var a, u, s, l = t(n);
          o = o || "operator";
          for (a in n) u = o, s = n[a], s instanceof Function && ("string" != typeof u && (u = o[a] || ""), "queryer" == u ? l[a] = e.rwrap(s, i, "returnValue") : "operator" == u ? n instanceof r ? l[a] = e.rwrap(s, i, "this") : l[a] = e.rwrap(s, i, 0) : "gsetter" == u && (n instanceof r ? l[a] = e.rwrap(s, i, "this", !0) : l[a] = e.rwrap(s, i, 0, !0)));
          return l
        },
        gsetter: function(e, i) {
          var o, a = t(e);
          i = i || {};
          for (o in i) a[o] = function(e, t) {
            return function() {
              var r = arguments.length;
              return r -= t, n(arguments[t]) && r++, a[e[Math.min(r, e.length - 1)]].apply(this, arguments)
            }
          }(i[o], e instanceof r ? 0 : 1);
          return a
        },
        mul: function(n, r) {
          var i, o, a, u, s, l, c, f = t(n);
          r = r || {}, i = 0, o = 1, a = 2, u = 3;
          for (s in n) l = n[s], l instanceof Function && (c = r, "string" != typeof c && (c = r[s] || ""), "getter" == c || "getter_first" == c || "getter_first_all" == c ? f[s] = e.mul(l, o) : "getter_all" == c ? f[s] = e.mul(l, i) : "gsetter" == c ? f[s] = e.mul(l, u) : f[s] = e.mul(l, a), ("getter" == c || "getter_first_all" == c) && (f[s + "All"] = e.mul(l, i)));
          return f
        },
        methodize: function(t, n, i) {
          var o, a, u = new r;
          for (o in t) a = t[o], a instanceof Function ? u[o] = e.methodize(a, n) : i && (u[o] = a);
          return u
        }
      };
    QW.HelperH = i
  }(),
  function() {
    QW.JSON = {
      parse: function(e) {
        if (/^[[\],:{}\s0]*$/.test(e.replace(/\\\\|\\"|\\'|\w+\s*\:|null|true|false|[+\-eE.]|new Date(\d*)/g, "0").replace(/"[^"]*"|'[^']*'|\d+/g, "0"))) return Function("return (" + e + ");")();
        throw "Invalid JSON format in executing JSON.parse"
      },
      stringify: function(e) {
        return QW.ObjectH.stringify(e)
      }
    }
  }(),
  function() {
    var e, t, n, r = QW.ObjectH.mix,
      i = QW.ArrayH.indexOf,
      o = function(e, t, n) {
        this.target = e, this.type = t, r(this, n || {})
      };
    r(o.prototype, {
      target: null,
      currentTarget: null,
      type: null,
      returnValue: void 0,
      preventDefault: function() {
        this.returnValue = !1
      }
    }), e = {
      on: function(t, n, r) {
        var o = t.__custListeners && t.__custListeners[n];
        return o || (e.createEvents(t, n), o = t.__custListeners && t.__custListeners[n]), i(o, r) > -1 ? !1 : (o.push(r), !0)
      },
      un: function(e, t, n) {
        var r, o = e.__custListeners && e.__custListeners[t];
        if (!o) return !1;
        if (n) {
          if (r = i(o, n), 0 > r) return !1;
          o.splice(r, 1)
        } else o.length = 0;
        return !0
      },
      fire: function(t, n, i) {
        var a, u, s, l, c;
        for (n instanceof o ? (a = r(n, i), n = n.type) : a = new o(t, n, i), u = t.__custListeners && t.__custListeners[n], u || (e.createEvents(t, n), u = t.__custListeners && t.__custListeners[n]), "*" != n && (u = u.concat(t.__custListeners["*"] || [])), a.returnValue = void 0, a.currentTarget = t, s = a.currentTarget, s && s["on" + a.type] && (l = s["on" + a.type].call(s, a)), c = 0; c < u.length; c++) u[c].call(s, a);
        return a.returnValue !== !1 && (l !== !1 || void 0 !== a.returnValue)
      },
      createEvents: function(e, t) {
        var n, r;
        for (t = t || [], "string" == typeof t && (t = t.split(",")), n = e.__custListeners, n || (n = e.__custListeners = {}), r = 0; r < t.length; r++) n[t[r]] = n[t[r]] || [];
        return n["*"] = n["*"] || [], e
      }
    }, t = function() {
      this.__custListeners = {}
    }, n = QW.HelperH.methodize(e), r(t.prototype, n), o.createEvents = function(t, i) {
      return e.createEvents(t, i), r(t, n)
    }, QW.CustEvent = o, QW.CustEventTargetH = e, QW.CustEventTarget = t
  }(),
  function() {
    function e() {
      return !0
    }

    function t(t, n) {
      var r, i = [],
        o = t.length,
        a = 0;
      if (n == e) {
        if (t instanceof Array) return t.slice(0);
        for (; o > a; a++) i[a] = t[a]
      } else
        for (; o > a;) r = t[a++], n(r) && i.push(r);
      return i
    }

    function n(e) {
      for (var t = e.children || e.childNodes, n = t.length, r = [], i = 0; n > i; i++) 1 == t[i].nodeType && r.push(t[i]);
      return r
    }

    function r(e) {
      var t, n, r = document.getElementById(e);
      if (r && r.id != e) {
        for (t = document.getElementsByName(e), n = 0; n < t.length; n++)
          if (t[n].id == e) return t[n];
        return null
      }
      return r
    }

    function i(e, t, n) {
      var r, i, o, a, u, s, l;
      if ("n" == t) return !0;
      if ("number" == typeof e) r = e;
      else {
        if (i = e.parentNode, i.__queryStamp != p) {
          for (o = {
              nextSibling: i.firstChild
            }, a = 1; o = o.nextSibling;) 1 == o.nodeType && (o.__siblingIdx = a++);
          i.__queryStamp = p, i.__childrenNum = a - 1
        }
        r = n ? i.__childrenNum - e.__siblingIdx + 1 : e.__siblingIdx
      }
      switch (t) {
        case "even":
        case "2n":
          return r % 2 == 0;
        case "odd":
        case "2n+1":
          return r % 2 == 1;
        default:
          return /n/.test(t) ? (u = t.replace(/(^|\D+)n/g, "$11n").split("n"), s = 0 | u[0], l = r - u[1] | 0, s * l >= 0 && l % s == 0) : r == t
      }
    }

    function o(n, r) {
      var i, o, a, u, s, l;
      if (!r && d[n]) return d[n];
      if (i = [], o = m(n), a = /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/g, u = [], o = o.replace(/\:([\w\-]+)(\(([^)]+)\))?/g, function(e, t, n, r) {
          return i.push([t, r]), ""
        }).replace(/^\*/g, function() {
          return u.push("el.nodeType==1"), ""
        }).replace(/^([\w\-]+)/g, function(e) {
          return u.push('(el.tagName||"").toUpperCase()=="' + e.toUpperCase() + '"'), ""
        }).replace(/([\[(].*)|#([\w\-]+)|\.([\w\-]+)/g, function(e, t, n, r) {
          return t || n && '[id="' + n + '"]' || r && '[className~="' + r + '"]'
        }).replace(a, function(e, t, n, r, i) {
          var o = y._attrGetters[t] || 'el.getAttribute("' + t + '")';
          return u.push(y._operators[n || ""].replace(/aa/g, o).replace(/vv/g, i || "")), ""
        }), !/^\s*$/.test(o)) throw "Unsupported Selector:\n" + n + "\n-" + o;
      for (s = 0; l = i[s]; s++) {
        if (!y._pseudos[l[0]]) throw "Unsupported Selector:\n" + l[0] + "\n" + o;
        u.push('__SltPsds["' + l[0] + '"](el,"' + (null != l[1] ? v(l[1]) : "") + '",i,els)')
      }
      return u.length ? r ? Function("els", "var els2=[];for(var i=0,el;el=els[i];i++){if(" + u.join("&&") + ") els2.push(el);} return els2;") : d[n] = Function("el, i, els", "return " + u.join("&&") + ";") : r ? function(n) {
        return t(n, e)
      } : d[n] = e
    }

    function a(e, t) {
      var n, r, i, o, a, u;
      if (f && /^((^|,)\s*[.\w-][.\w\s\->+~]*)+$/.test(t)) {
        if (n = e.id, i = [], !n && e.parentNode) {
          r = e.id = "__QW_slt_" + g++;
          try {
            o = e.querySelectorAll("#" + r + " " + t)
          } finally {
            e.removeAttribute("id")
          }
        } else o = e.querySelectorAll(t);
        for (a = 0, u = o.length; u > a; a++) i.push(o[a]);
        return i
      }
      return null
    }

    function u(e, t) {
      var i, d, p, g, m, v, y, b, E, w, S, _, W, T, C, H, N;
      if (h++, i = a(e, t)) return i;
      for (d = s(t), p = [e]; y = d[0];) {
        if (!p.length) return [];
        if (E = y[0], i = [], "+" == E) {
          for (b = o(y[1]), g = 0; m = p[g++];)
            for (; m = m.nextSibling;)
              if (m.tagName) {
                b(m) && i.push(m);
                break
              }
          p = i, d.splice(0, 1)
        } else {
          if ("~" != E) break;
          for (b = o(y[1]), g = 0; m = p[g++];)
            if (!(g > 1 && m.parentNode == p[g - 2].parentNode))
              for (; m = m.nextSibling;) m.tagName && b(m) && i.push(m);
          p = i, d.splice(0, 1)
        }
      }
      if (w = d.length, !w || !p.length) return p;
      for (S = 0; W = d[S]; S++)
        if (/^[.\w-]*#([\w-]+)/i.test(W[1])) {
          _ = RegExp.$1, W[1] = W[1].replace("#" + _, "");
          break
        }
      if (w > S) {
        if (T = r(_), !T) return [];
        for (g = 0, v; v = p[g++];)
          if (!v.parentNode || c(v, T)) return i = l(v, [T], d.slice(0, S + 1)), i.length && S != w - 1 ? u(T, d.slice(S + 1).join(",").replace(/,/g, " ")) : i;
        return []
      }
      if (C = function(e) {
          return e.getElementsByTagName(H)
        }, H = "*", N = "", t = d[w - 1][1], t = t.replace(/^[\w\-]+/, function(e) {
          return H = e, ""
        }), f && (t = t.replace(/^[\w\*]*\.([\w\-]+)/, function(e, t) {
          return N = t, ""
        })), N && (C = function(e) {
          return e.querySelectorAll(H + "." + N)
        }), 1 == w) {
        for (">" == d[0][0] ? (C = n, b = o(d[0][1], !0)) : b = o(t, !0), i = [], g = 0; v = p[g++];) i = i.concat(b(C(v)));
        return i
      }
      for (d[d.length - 1][1] = t, i = [], g = 0; v = p[g++];) i = i.concat(l(v, C(v), d));
      return i
    }

    function s(e) {
      var t = [],
        n = /(^|\s*[>+~ ]\s*)(([\w\-\:.#*]+|\([^\)]*\)|\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\6|)\s*\])+)(?=($|\s*[>+~ ]\s*))/g,
        r = m(e).replace(n, function(e, n, r) {
          return t.push([m(n), r]), ""
        });
      if (!/^\s*$/.test(r)) throw "Unsupported Selector:\n" + e + "\n--" + r;
      return t
    }

    function l(e, n, r) {
      var i, a, u, s, l, c, f = r[0],
        d = r.length,
        p = !f[0],
        g = [],
        h = [],
        m = [],
        v = "";
      for (i = 0; d > i; i++) f = r[i], g[i] = o(f[1], i == d - 1), h[i] = y._relations[f[0]], ("" == f[0] || "~" == f[0]) && (m[i] = !0), v += f[0] || " ";
      if (n = g[d - 1](n), " " == v) return n;
      if (/[+>~] |[+]~/.test(v)) return t(n, function(t) {
        for (var n = [], r = d - 1, i = n[r] = t; r > -1; r--) {
          if (r > 0) i = h[r](i, g[r - 1], e);
          else {
            if (p || i.parentNode == e) return !0;
            i = null
          }
          for (; !i;) {
            if (++r == d) return !1;
            m[r] && (i = n[r - 1], r++)
          }
          n[r - 1] = i
        }
      });
      for (a = [], u = n.length, i = 0; u > i;) {
        for (s = l = n[i++], c = d - 1; c > 0 && (s = h[c](s, g[c - 1], e)); c--);
        s && (p || s.parentNode == e) && a.push(l)
      }
      return a
    }
    var c, f, d, p, g, h, m = QW.StringH.trim,
      v = QW.StringH.encode4Js,
      y = {
        queryStamp: 0,
        _operators: {
          "": "aa",
          "=": 'aa=="vv"',
          "!=": 'aa!="vv"',
          "~=": 'aa&&(" "+aa+" ").indexOf(" vv ")>-1',
          "|=": 'aa&&(aa+"-").indexOf("vv-")==0',
          "^=": 'aa&&aa.indexOf("vv")==0',
          "$=": 'aa&&aa.lastIndexOf("vv")==aa.length-"vv".length',
          "*=": 'aa&&aa.indexOf("vv")>-1'
        },
        _pseudos: {
          "first-child": function(e) {
            return !(e = e.previousSibling) || !e.tagName && !e.previousSibling
          },
          "last-child": function(e) {
            return !(e = e.nextSibling) || !e.tagName && !e.nextSibling
          },
          "only-child": function(e) {
            var t;
            return !((t = e.previousSibling) && (t.tagName || t.previousSibling) || (t = e.nextSibling) && (t.tagName || t.nextSibling))
          },
          "nth-child": function(e, t) {
            return i(e, t)
          },
          "nth-last-child": function(e, t) {
            return i(e, t, !0)
          },
          "first-of-type": function(e) {
            for (var t = e.tagName, n = e; n = n.previousSlibling;)
              if (n.tagName == t) return !1;
            return !0
          },
          "last-of-type": function(e) {
            for (var t = e.tagName, n = e; n = n.nextSibling;)
              if (n.tagName == t) return !1;
            return !0
          },
          "only-of-type": function(e) {
            var t, n = e.parentNode.childNodes;
            for (t = n.length - 1; t > -1; t--)
              if (n[t].tagName == e.tagName && n[t] != e) return !1;
            return !0
          },
          "nth-of-type": function(e, t) {
            for (var n = 1, r = e; r = r.previousSibling;) r.tagName == e.tagName && n++;
            return i(n, t)
          },
          "nth-last-of-type": function(e, t) {
            for (var n = 1, r = e; r = r.nextSibling;) r.tagName == e.tagName && n++;
            return i(n, t)
          },
          empty: function(e) {
            return !e.firstChild
          },
          parent: function(e) {
            return !!e.firstChild
          },
          not: function(e, t) {
            return !o(t)(e)
          },
          enabled: function(e) {
            return !e.disabled
          },
          disabled: function(e) {
            return e.disabled
          },
          checked: function(e) {
            return e.checked
          },
          focus: function(e) {
            return e == e.ownerDocument.activeElement
          },
          indeterminate: function(e) {
            return e.indeterminate
          },
          input: function(e) {
            return /input|select|textarea|button/i.test(e.nodeName)
          },
          contains: function(e, t) {
            return (e.textContent || e.innerText || "").indexOf(t) >= 0
          }
        },
        _attrGetters: function() {
          var e, t, n = {
              "class": "el.className",
              "for": "el.htmlFor",
              href: 'el.getAttribute("href",2)'
            },
            r = "name,id,className,value,selected,checked,disabled,type,tagName,readOnly,offsetWidth,offsetHeight,innerHTML".split(",");
          for (e = 0; t = r[e]; e++) n[t] = "el." + t;
          return n
        }(),
        _relations: {
          "": function(e, t, n) {
            for (;
              (e = e.parentNode) && e != n;)
              if (t(e)) return e;
            return null
          },
          ">": function(e, t, n) {
            return e = e.parentNode, e != n && t(e) ? e : null
          },
          "+": function(e, t) {
            for (; e = e.previousSibling;)
              if (e.tagName) return t(e) && e;
            return null
          },
          "~": function(e, t) {
            for (; e = e.previousSibling;)
              if (e.tagName && t(e)) return e;
            return null
          }
        },
        selector2Filter: function(e) {
          return o(e)
        },
        test: function(e, t) {
          return o(t)(e)
        },
        filter: function(e, t, n) {
          var r, i, o, a, u, c, f, d;
          if (n = n || document, r = m(t).split(","), r.length < 2) return l(n || document, e, s(t));
          if (i = l(n || document, e, s(r[0])), i.length == e.length) return i;
          for (o = 0, a = e.length; a > o; o++) e[o].__QWSltFlted = 0;
          for (o = 0, a = i.length; a > o; o++) i[o].__QWSltFlted = 1;
          for (u = e, f = 1; f < r.length; f++) {
            for (c = [], o = 0, a = u.length; a > o; o++) u[o].__QWSltFlted || c.push(u[o]);
            for (u = c, i = l(n || document, u, s(r[f])), o = 0, a = i.length; a > o; o++) i[o].__QWSltFlted = 1
          }
          for (d = [], o = 0, a = e.length; a > o; o++) e[o].__QWSltFlted && d.push(e[o]);
          return d
        },
        query: function(e, t) {
          var n, r, i, o, s;
          if (y.queryStamp = p++, e = e || document, n = a(e, t)) return n;
          for (r = m(t).split(","), n = u(e, r[0]), i = 1; o = r[i]; i++) s = u(e, o), n = n.concat(s);
          return n
        },
        one: function(e, t) {
          var n = y.query(e, t);
          return n[0]
        }
      };
    window.__SltPsds = y._pseudos,
      function() {
        var e = document.createElement("div");
        e.innerHTML = '<div class="aaa"></div>', f = e.querySelectorAll && 1 == e.querySelectorAll(".aaa").length, c = e.contains ? function(e, t) {
          return e != t && e.contains(t)
        } : function(e, t) {
          return 16 & e.compareDocumentPosition(t)
        }
      }(), d = {}, p = 0, g = 0, h = 0, QW.Selector = y
  }(),
  function() {
    var e = QW.Selector,
      t = QW.Browser,
      n = {
        query: function(t, n) {
          return e.query(n || document.documentElement, t)
        },
        getDocRect: function(e) {
          e = e || document;
          var n = e.defaultView || e.parentWindow,
            r = e.compatMode,
            i = e.documentElement,
            o = n.innerHeight || 0,
            a = n.innerWidth || 0,
            u = n.pageXOffset || 0,
            s = n.pageYOffset || 0,
            l = i.scrollWidth,
            c = i.scrollHeight;
          return "CSS1Compat" != r && (i = e.body, l = i.scrollWidth, c = i.scrollHeight), r && !t.opera && (a = i.clientWidth, o = i.clientHeight), l = Math.max(l, a), c = Math.max(c, o), u = Math.max(u, e.documentElement.scrollLeft, e.body.scrollLeft), s = Math.max(s, e.documentElement.scrollTop, e.body.scrollTop), {
            width: a,
            height: o,
            scrollWidth: l,
            scrollHeight: c,
            scrollX: u,
            scrollY: s
          }
        },
        create: function() {
          var e = document.createElement("div"),
            t = {
              option: [1, '<select multiple="multiple">', "</select>"],
              optgroup: [1, '<select multiple="multiple">', "</select>"],
              legend: [1, "<fieldset>", "</fieldset>"],
              thead: [1, "<table>", "</table>"],
              tbody: [1, "<table>", "</table>"],
              tfoot: [1, "<table>", "</table>"],
              tr: [2, "<table><tbody>", "</tbody></table>"],
              td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
              th: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
              col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
              _default: [0, "", ""]
            },
            n = /<(\w+)/i;
          return function(r, i, o) {
            var a, u, s = o && o.createElement("div") || e,
              l = s,
              c = (n.exec(r) || ["", ""])[1],
              f = t[c] || t._default,
              d = f[0];
            for (s.innerHTML = f[1] + r + f[2]; d--;) s = s.firstChild;
            if (a = s.firstChild, a && i) {
              for (o = o || document, u = o.createDocumentFragment(); a = s.firstChild;) u.appendChild(a);
              return u
            }
            for (; l.firstChild;) l.removeChild(l.firstChild);
            return a
          }
        }(),
        isElement: function(e) {
          return !(!e || 1 != e.nodeType)
        },
        ready: function(e, t) {
          function n() {
            if (clearTimeout(t.__QWDomReadyTimer), i.length) {
              var e = i.shift();
              i.length && (t.__QWDomReadyTimer = setTimeout(n, 0)), e()
            }
          }
          t = t || document;
          var r = t.defaultView || t.parentWindow,
            i = t.__QWDomReadyCbs = t.__QWDomReadyCbs || [];
          i.push(e), setTimeout(function() {
            "complete" == t.readyState ? n() : t.addEventListener ? (t.addEventListener("DOMContentLoaded", n, !1), r.addEventListener("load", n, !1)) : (! function() {
              try {
                t.body.doScroll("left")
              } catch (e) {
                return setTimeout(arguments.callee, 1)
              }
              n()
            }(), t.attachEvent("onreadystatechange", function() {
              "complete" == t.readyState && n()
            }))
          }, 1)
        },
        createElement: function(e, t, n) {
          n = n || document;
          var r = n.createElement(e);
          return t && QW.NodeH.setAttr(r, t), r
        },
        insertCssText: function(e) {
          var t = document.createElement("style");
          return t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)), (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(t)
        }
      };
    QW.DomU = n
  }(),
  function() {
    function e(e, t) {
      var n, r, o;
      if ("string" == typeof e) {
        if (e = e.replace(/^\s+/, ""), 0 == e.indexOf("<")) return a.create(e, !1, t);
        if (n = (t || document).getElementById(e), n && n.id != e) {
          for (r = (t || document).getElementsByName(e), o = 0; o < r.length; o++)
            if (r[o].id == e) return r[o];
          return null
        }
        return n
      }
      return i.isWrap(e) ? arguments.callee(e[0]) : e
    }

    function t(e) {
      return (e + "").replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
    }

    function n(e, t) {
      var n, r, i;
      return /px$/.test(t) || !t ? parseInt(t, 10) || 0 : (n = e.style.right, r = e.runtimeStyle.right, e.runtimeStyle.right = e.currentStyle.right, e.style.right = t, i = e.style.pixelRight || 0, e.style.right = n, e.runtimeStyle.right = r, i)
    }

    function r(e, t, n) {
      var r, i = o.camelize(t);
      return u.ie ? e.currentStyle[i] : (r = e.ownerDocument.defaultView.getComputedStyle(e, n || null), r ? r.getPropertyValue(o.decamelize(t)) : null)
    }
    var i = QW.ObjectH,
      o = QW.StringH,
      a = QW.DomU,
      u = QW.Browser,
      s = QW.Selector,
      l = s.selector2Filter,
      c = {
        fillOpacity: 1,
        fontWeight: 1,
        lineHeight: 1,
        opacity: 1,
        orphans: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
      },
      f = {
        outerHTML: function() {
          var t = document.createElement("div");
          return function(n, r) {
            if (n = e(n), "outerHTML" in n) return n.outerHTML;
            t.innerHTML = "";
            var i = r && r.createElement("div") || t;
            return i.appendChild(n.cloneNode(!0)), i.innerHTML
          }
        }(),
        hasClass: function(t, n) {
          return t = e(t), (" " + t.className + " ").indexOf(" " + n + " ") > -1
        },
        addClass: function(t, n) {
          t = e(t), f.hasClass(t, n) || (t.className = t.className ? t.className + " " + n : n)
        },
        removeClass: function(n, r) {
          n = e(n), f.hasClass(n, r) && (n.className = n.className.replace(RegExp("(?:^|\\s)" + t(r) + "(?=\\s|$)", "ig"), ""))
        },
        replaceClass: function(n, r, i) {
          n = e(n), f.hasClass(n, r) ? n.className = n.className.replace(RegExp("(^|\\s)" + t(r) + "(?=\\s|$)", "ig"), "$1" + i) : f.addClass(n, i)
        },
        toggleClass: function(e, t, n) {
          n = n || "", f.hasClass(e, t) ? f.replaceClass(e, t, n) : f.replaceClass(e, n, t)
        },
        show: function() {
          function t(e) {
            if (!n[e]) {
              var t = document.createElement(e),
                r = document.body;
              f.insertSiblingBefore(r.firstChild, t), display = f.getCurrentStyle(t, "display"), f.removeChild(r, t), r = t = null, ("none" === display || "" === display) && (display = "block"), n[e] = display
            }
            return n[e]
          }
          var n = {};
          return function(n, r) {
            if (n = e(n), !r) {
              var i = n.style.display;
              "none" === i && (i = n.style.display = ""), "" === i && "none" === f.getCurrentStyle(n, "display") && (i = t(n.nodeName))
            }
            n.style.display = r || i
          }
        }(),
        hide: function(t) {
          t = e(t), t.style.display = "none"
        },
        wrap: function(t, n) {
          t = e(t), n = e(n, t.ownerDocument), t.parentNode && t.parentNode.insertBefore(n, t), n.appendChild(t)
        },
        unwrap: function(t) {
          var n, r;
          if (t = e(t), n = t.parentNode, n && "BODY" != n.tagName) {
            for (r = n.parentNode; n.firstChild;) r.insertBefore(n.firstChild, n);
            r.removeChild(n)
          }
        },
        empty: function(t) {
          for (t = e(t); t.firstChild;) t.removeChild(t.firstChild)
        },
        toggle: function(e, t) {
          f.isVisible(e) ? f.hide(e) : f.show(e, t)
        },
        isVisible: function(t) {
          return t = e(t), !!(t.offsetHeight + t.offsetWidth && "none" != f.getStyle(t, "display"))
        },
        getXY: function() {
          var e = function(e, t) {
            var n = parseInt(f.getCurrentStyle(e, "borderTopWidth"), 10) || 0,
              r = parseInt(f.getCurrentStyle(e, "borderLeftWidth"), 10) || 0;
            return u.gecko && /^t(?:able|d|h)$/i.test(e.tagName) && (n = r = 0), t[0] += r, t[1] += n, t
          };
          return u.ie6 || u.ie7 || !document.documentElement.getBoundingClientRect ? function(t) {
            for (var n = [t.offsetLeft, t.offsetTop], r = t, i = t.ownerDocument, o = a.getDocRect(i), s = !!(u.gecko || parseFloat(u.webkit) > 519), l = 0, c = 0; r = r.offsetParent;) n[0] += r.offsetLeft, n[1] += r.offsetTop, s && (n = e(r, n));
            if ("fixed" != f.getCurrentStyle(t, "position"))
              for (r = t; r = r.parentNode;) l = r.scrollTop, c = r.scrollLeft, u.gecko && "visible" !== f.getCurrentStyle(r, "overflow") && (n = e(r, n)), (l || c) && (n[0] -= c, n[1] -= l);
            return n[0] += o.scrollX, n[1] += o.scrollY, n
          } : function(e) {
            var t, n, r, i = e.ownerDocument,
              o = a.getDocRect(i),
              s = o.scrollX,
              l = o.scrollY,
              c = e.getBoundingClientRect(),
              f = [c.left, c.top];
            return u.ie && (n = i.documentElement.clientLeft, r = i.documentElement.clientTop, t = i.compatMode, "BackCompat" == t && (n = i.body.clientLeft, r = i.body.clientTop), f[0] -= n, f[1] -= r), (l || s) && (f[0] += s, f[1] += l), f
          }
        }(),
        setXY: function(t, n, r) {
          t = e(t), n = parseInt(n, 10), r = parseInt(r, 10), isNaN(n) || f.setStyle(t, "left", n), isNaN(r) || f.setStyle(t, "top", r)
        },
        setSize: function(t, n, r) {
          var i, o;
          t = e(t), n = parseFloat(n, 10), r = parseFloat(r, 10), isNaN(n) && isNaN(r) || (i = f.borderWidth(t), o = f.paddingWidth(t), isNaN(n) || f.setStyle(t, "width", Math.max(+n - i[1] - i[3] - o[1] - o[3], 0)), isNaN(r) || f.setStyle(t, "height", Math.max(+r - i[0] - i[2] - o[0] - o[2], 0)))
        },
        setInnerSize: function(t, n, r) {
          t = e(t), n = parseFloat(n, 10), r = parseFloat(r, 10), isNaN(n) || f.setStyle(t, "width", n), isNaN(r) || f.setStyle(t, "height", r)
        },
        setRect: function(e, t, n, r, i) {
          f.setXY(e, t, n), f.setSize(e, r, i)
        },
        setInnerRect: function(e, t, n, r, i) {
          f.setXY(e, t, n), f.setInnerSize(e, r, i)
        },
        getSize: function(t) {
          return t = e(t), {
            width: t.offsetWidth,
            height: t.offsetHeight
          }
        },
        getRect: function(t) {
          var n, r, i, o, a;
          return t = e(t), n = f.getXY(t), r = n[0], i = n[1], o = t.offsetWidth, a = t.offsetHeight, {
            width: o,
            height: a,
            left: r,
            top: i,
            bottom: i + a,
            right: r + o
          }
        },
        nextSibling: function(t, n) {
          var r = l(n || "");
          t = e(t);
          do t = t.nextSibling; while (t && !r(t));
          return t
        },
        previousSibling: function(t, n) {
          var r = l(n || "");
          t = e(t);
          do t = t.previousSibling; while (t && !r(t));
          return t
        },
        previousSiblings: function(t, n) {
          var r = l(n || ""),
            i = [];
          for (t = e(t); t = t.previousSibling;) r(t) && i.push(t);
          return i.reverse()
        },
        nextSiblings: function(t, n) {
          var r = l(n || ""),
            i = [];
          for (t = e(t); t = t.nextSibling;) r(t) && i.push(t);
          return i
        },
        siblings: function(e, t) {
          for (var n = l(t || ""), r = e.parentNode.firstChild, i = []; r;) e != r && n(r) && i.push(r), r = r.nextSibling;
          return i
        },
        ancestorNode: function(t, n) {
          var r = l(n || "");
          t = e(t);
          do t = t.parentNode; while (t && !r(t));
          return t
        },
        parentNode: function(e, t) {
          return f.ancestorNode(e, t)
        },
        ancestorNodes: function(t, n) {
          var r = l(n || ""),
            i = [];
          for (t = e(t); t = t.parentNode;) r(t) && i.push(t);
          return i.reverse()
        },
        firstChild: function(t, n) {
          var r = l(n || "");
          for (t = e(t).firstChild; t && !r(t);) t = t.nextSibling;
          return t
        },
        lastChild: function(t, n) {
          var r = l(n || "");
          for (t = e(t).lastChild; t && !r(t);) t = t.previousSibling;
          return t
        },
        contains: function(t, n) {
          return t = e(t), n = e(n), t.contains ? t != n && t.contains(n) : !!(16 & t.compareDocumentPosition(n))
        },
        insertAdjacentHTML: function(t, n, r) {
          if (t = e(t), t.insertAdjacentHTML) t.insertAdjacentHTML(n, r);
          else {
            var i, o = t.ownerDocument.createRange();
            o.setStartBefore(t), i = o.createContextualFragment(r), f.insertAdjacentElement(t, n, i)
          }
        },
        insertAdjacentElement: function(t, n, r) {
          if (t = e(t), r = e(r), t.insertAdjacentElement) t.insertAdjacentElement(n, r);
          else switch ((n + "").toLowerCase()) {
            case "beforebegin":
              t.parentNode.insertBefore(r, t);
              break;
            case "afterbegin":
              t.insertBefore(r, t.firstChild);
              break;
            case "beforeend":
              t.appendChild(r);
              break;
            case "afterend":
              t.parentNode.insertBefore(r, t.nextSibling || null)
          }
          return r
        },
        insert: function(e, t, n) {
          f.insertAdjacentElement(e, t, n)
        },
        insertTo: function(e, t, n) {
          f.insertAdjacentElement(n, t, e)
        },
        appendChild: function(t, n) {
          return e(t).appendChild(e(n))
        },
        appendTo: function(t, n) {
          return e(n).appendChild(e(t))
        },
        prepend: function(t, n) {
          return t = e(t), t.insertBefore(e(n), t.firstChild)
        },
        prependTo: function(e, t) {
          return f.prepend(t, e)
        },
        insertSiblingBefore: function(t, n) {
          return t = e(t), t.parentNode.insertBefore(e(n), t)
        },
        insertSiblingAfter: function(t, n) {
          t = e(t), t.parentNode.insertBefore(e(n), t.nextSibling || null)
        },
        insertBefore: function(t, n, r) {
          return e(t).insertBefore(e(n), r && e(r) || null)
        },
        insertAfter: function(t, n, r) {
          return e(t).insertBefore(e(n), r && e(r).nextSibling || null)
        },
        insertParent: function(e, t) {
          return f.insertSiblingBefore(e, t), f.appendChild(t, e)
        },
        replaceNode: function(t, n) {
          return t = e(t), t.parentNode.replaceChild(e(n), t)
        },
        replaceChild: function(t, n, r) {
          return e(t).replaceChild(e(n), e(r))
        },
        removeNode: function(t) {
          return t = e(t), t.parentNode && t.parentNode.removeChild(t)
        },
        removeChild: function(t, n) {
          var n = e(n);
          return n && e(t).removeChild(e(n))
        },
        get: function(t) {
          return t = e(t), i.get.apply(null, arguments)
        },
        set: function(t) {
          t = e(t), i.set.apply(null, arguments)
        },
        getAttr: function(t, n, r) {
          return t = e(t), n = f.attrMap[n] || n, n in t && "href" != n ? t[n] : t.getAttribute(n, r || "A" == t.nodeName && "href" == n.toLowerCase() && 2 || null);

        },
        setAttr: function(t, n, r, i) {
          if (t = e(t), "object" != typeof n) n = f.attrMap[n] || n, n in t ? t[n] = r : t.setAttribute(n, r, i || null);
          else
            for (var o in n) f.setAttr(t, o, n[o])
        },
        removeAttr: function(t, n, r) {
          return t = e(t), t.removeAttribute(n, r || 0)
        },
        query: function(t, n) {
          return t = e(t), s.query(t, n || "")
        },
        one: function(t, n) {
          return t = e(t), s.one(t, n || "")
        },
        getElementsByClass: function(t, n) {
          return t = e(t), s.query(t, "." + n)
        },
        getValue: function(t) {
          return t = e(t), t.value
        },
        setValue: function(t, n) {
          e(t).value = n
        },
        getHtml: function(t) {
          return t = e(t), t.innerHTML
        },
        setHtml: function() {
          var t = /<(?:object|embed|option|style)/i,
            n = function(e, t) {
              f.empty(e), f.appendChild(e, a.create(t, !0))
            };
          return function(r, i) {
            if (r = e(r), t.test(i)) n(r, i);
            else try {
              r.innerHTML = i
            } catch (o) {
              n(r, i)
            }
          }
        }(),
        encodeURIForm: function(t, n) {
          var r, i, o, a, u, s, l, c;
          for (t = e(t), n = n || function() {
              return !1
            }, r = [], i = t.elements, o = i.length, a = 0, u = function(e, t) {
              r.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
            }; o > a; ++a)
            if (t = i[a], s = t.name, !t.disabled && s && !n(t)) switch (t.type) {
              case "text":
              case "hidden":
              case "password":
              case "textarea":
                u(s, t.value);
                break;
              case "radio":
              case "checkbox":
                t.checked && u(s, t.value);
                break;
              case "select-one":
                t.selectedIndex > -1 && u(s, t.value);
                break;
              case "select-multiple":
                for (l = t.options, c = 0; c < l.length; ++c) l[c].selected && u(s, l[c].value)
            }
            return r.join("&")
        },
        isFormChanged: function(t, n) {
          t = e(t), n = n || function() {
            return !1
          };
          for (var r, i = t.elements, o = i.length, a = 0, u = 0; o > a; ++a, u = 0)
            if (t = i[a], !n(t)) switch (t.type) {
              case "text":
              case "hidden":
              case "password":
              case "textarea":
                if (t.defaultValue != t.value) return !0;
                break;
              case "radio":
              case "checkbox":
                if (t.defaultChecked != t.checked) return !0;
                break;
              case "select-one":
                u = 1;
              case "select-multiple":
                for (r = t.options; u < r.length; ++u)
                  if (r[u].defaultSelected != r[u].selected) return !0
            }
            return !1
        },
        cloneNode: function(t, n) {
          return e(t).cloneNode(n || !1)
        },
        removeStyle: function(t, n) {
          t = e(t);
          var r = o.camelize(n),
            i = f.cssHooks[r];
          i && i.remove ? i.remove(t) : t.style.removeProperty ? t.style.removeProperty(o.decamelize(n)) : t.style.removeAttribute(r)
        },
        getStyle: function(t, n) {
          t = e(t), n = o.camelize(n);
          var r, i = f.cssHooks[n];
          return r = i && i.get ? i.get(t) : t.style[n]
        },
        getCurrentStyle: function(t, n, i) {
          t = e(t);
          var a = o.camelize(n),
            u = f.cssHooks[a];
          return u && u.get ? u.get(t, !0, i) : r(t, n, i)
        },
        setStyle: function(t, n, r) {
          var i, a, u;
          if (t = e(t), "object" != typeof n) i = o.camelize(n), a = f.cssHooks[i], a && a.set ? a.set(t, r) : ("number" != typeof r || c[i] || (r += "px"), t.style[i] = r);
          else
            for (u in n) f.setStyle(t, u, n[u])
        },
        borderWidth: function() {
          var t = {
              thin: 2,
              medium: 4,
              thick: 6
            },
            n = function(e, n) {
              var r = f.getCurrentStyle(e, n);
              return r = t[r] || parseFloat(r), r || 0
            };
          return function(t) {
            return t = e(t), [n(t, "borderTopWidth"), n(t, "borderRightWidth"), n(t, "borderBottomWidth"), n(t, "borderLeftWidth")]
          }
        }(),
        paddingWidth: function(t) {
          return t = e(t), [n(t, f.getCurrentStyle(t, "paddingTop")), n(t, f.getCurrentStyle(t, "paddingRight")), n(t, f.getCurrentStyle(t, "paddingBottom")), n(t, f.getCurrentStyle(t, "paddingLeft"))]
        },
        marginWidth: function(t) {
          return t = e(t), [n(t, f.getCurrentStyle(t, "marginTop")), n(t, f.getCurrentStyle(t, "marginRight")), n(t, f.getCurrentStyle(t, "marginBottom")), n(t, f.getCurrentStyle(t, "marginLeft"))]
        },
        tmpl: function(t, n) {
          return t = e(t), o.tmpl(t.innerHTML, n)
        },
        attrMap: {
          "class": "className",
          "for": "htmlFor",
          tabindex: "tabIndex",
          readonly: "readOnly",
          maxlength: "maxLength",
          cellspacing: "cellSpacing",
          cellpadding: "cellPadding",
          rowspan: "rowSpan",
          colspan: "colSpan",
          usemap: "useMap",
          frameborder: "frameBorder",
          contenteditable: "contentEditable"
        },
        cssHooks: function() {
          var e, t, n, i, o = {
            "float": {
              get: function(e, t, n) {
                if (t) {
                  var r = e.ownerDocument.defaultView.getComputedStyle(e, n || null);
                  return r ? r.getPropertyValue("float") : null
                }
                return e.style.cssFloat
              },
              set: function(e, t) {
                e.style.cssFloat = t
              },
              remove: function(e) {
                e.style.removeProperty("float")
              }
            },
            width: {
              get: function(e, t, n) {
                if (!t) return e.style.width;
                var i = r(e, "width", n);
                return i && /^\d*(px)*$/.test(i) ? i : f.getSize(e).width + "px"
              }
            },
            height: {
              get: function(e, t, n) {
                if (!t) return e.style.height;
                var i = r(e, "height", n);
                return i && /^\d*(px)*$/.test(i) ? i : f.getSize(e).height + "px"
              }
            }
          };
          return u.ie && (o["float"] = {
            get: function(e, t) {
              return e[t ? "currentStyle" : "style"].styleFloat
            },
            set: function(e, t) {
              e.style.styleFloat = t
            },
            remove: function(e) {
              e.style.removeAttribute("styleFloat")
            }
          }, e = document.createElement("div"), e.innerHTML = "<a href='#' style='opacity:.55;'>a</a>", t = e.getElementsByTagName("a")[0], t && !/^0.55$/.test(t.style.opacity) && (n = /alpha\([^)]*\)/i, i = /opacity=([^)]*)/, o.opacity = {
            get: function(e, t) {
              return i.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : t ? "1" : ""
            },
            set: function(e, t) {
              var r, i, o = e.style,
                a = e.currentStyle;
              o.zoom = 1, r = "alpha(opacity=" + 100 * t + ")", i = a && a.filter || o.filter || "", o.filter = n.test(i) ? i.replace(n, r) : i + " " + r
            },
            remove: function(e) {
              var t = e.style,
                r = e.currentStyle,
                i = r && r.filter || t.filter || "";
              n.test(i) && (t.filter = i.replace(n, "")), t.removeAttribute("opacity")
            }
          })), o
        }()
      };
    f.g = e, QW.NodeH = f
  }(),
  function() {
    var e = QW.ObjectH,
      t = e.mix,
      n = e.isString,
      r = e.isArray,
      i = Array.prototype.push,
      o = QW.NodeH,
      a = o.g,
      u = o.query,
      s = o.one,
      l = QW.DomU.create,
      c = function(e) {
        var t, o, s, f, d;
        if (!e) return this instanceof c ? new c([]) : null;
        if (e instanceof c) return e;
        if (t = arguments[1], n(e)) {
          if (e = e.replace(/^\s+/, ""), /^</.test(e)) {
            for (o = l(e, !0, t).childNodes, s = [], f = 0; d = o[f]; f++) s[f] = d;
            return new c(s)
          }
          return new c(u(t, e))
        }
        return e = a(e, t), this instanceof c ? (this.core = e, void(r(e) ? (this.length = 0, i.apply(this, e)) : (this.length = 1, this[0] = e))) : new c(e)
      };
    c.one = function(e) {
      if (!e) return null;
      var t = arguments[1];
      return n(e) ? (e = e.replace(/^\s+/, ""), new c(/^</.test(e) ? l(e, !1, t) : s(t, e))) : (e = a(e, t), new c(r(e) ? e[0] : e))
    }, c.pluginHelper = function(e, n, r, i) {
      var o, a, u = QW.HelperH;
      e = u.mul(e, n), o = u.rwrap(e, c, n), r && (o = u.gsetter(o, r)), t(c, o, i), a = u.methodize(e, "core"), a = u.rwrap(a, c, n), r && (a = u.gsetter(a, r)), t(c.prototype, a, i)
    }, t(c.prototype, {
      first: function() {
        return c(this[0])
      },
      last: function() {
        return c(this[this.length - 1])
      },
      item: function(e) {
        return c(this[e])
      },
      filter: function(e, t) {
        return e === !0 ? c(this.core) : e === !1 ? c([]) : ("string" == typeof e && (e = QW.Selector.selector2Filter(e)), c(ArrayH.filter(this, e, t)))
      }
    }), QW.NodeW = c
  }(),
  function() {
    function e(e) {
      var n = t.getTarget(e),
        r = document;
      return n && (r = n.ownerDocument || n.document || (n.defaultView || n.window) && n || document), r
    }
    var t = {
      getPageX: function(n) {
        n = n || t.getEvent.apply(t, arguments);
        var r = e(n);
        return "pageX" in n ? n.pageX : n.clientX + (r.documentElement.scrollLeft || r.body.scrollLeft) - 2
      },
      getPageY: function(n) {
        n = n || t.getEvent.apply(t, arguments);
        var r = e(n);
        return "pageY" in n ? n.pageY : n.clientY + (r.documentElement.scrollTop || r.body.scrollTop) - 2
      },
      getDetail: function(e) {
        return e = e || t.getEvent.apply(t, arguments), e.detail || -(e.wheelDelta || 0)
      },
      getKeyCode: function(e) {
        return e = e || t.getEvent.apply(t, arguments), "keyCode" in e ? e.keyCode : e.charCode || e.which || 0
      },
      stopPropagation: function(e) {
        e = e || t.getEvent.apply(t, arguments), e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
      },
      preventDefault: function(e) {
        e = e || t.getEvent.apply(t, arguments), e.preventDefault ? e.preventDefault() : e.returnValue = !1
      },
      getCtrlKey: function(e) {
        return e = e || t.getEvent.apply(t, arguments), e.ctrlKey
      },
      getShiftKey: function(e) {
        return e = e || t.getEvent.apply(t, arguments), e.shiftKey
      },
      getAltKey: function(e) {
        return e = e || t.getEvent.apply(t, arguments), e.altKey
      },
      getTarget: function(e) {
        e = e || t.getEvent.apply(t, arguments);
        var n = e.srcElement || e.target;
        return n && 3 == n.nodeType && (n = n.parentNode), n
      },
      getRelatedTarget: function(e) {
        return e = e || t.getEvent.apply(t, arguments), "relatedTarget" in e ? e.relatedTarget : "mouseover" == e.type ? e.fromElement : "mouseout" == e.type ? e.toElement : void 0
      },
      getEvent: function(e, t) {
        if (e) return e;
        if (t) {
          if (t.document) return t.document.parentWindow.event;
          if (t.parentWindow) return t.parentWindow.event
        }
        if (window.event) return window.event;
        var n = arguments.callee;
        do
          if (/Event/.test(n.arguments[0])) return n.arguments[0];
        while (n = n.caller)
      },
      _EventPro: {
        stopPropagation: function() {
          this.cancelBubble = !0
        },
        preventDefault: function() {
          this.returnValue = !1
        }
      },
      standardize: function(e) {
        e = e || t.getEvent.apply(t, arguments), "target" in e || (e.target = t.getTarget(e)), "relatedTarget" in e || (e.relatedTarget = t.getRelatedTarget(e)), "pageX" in e || (e.pageX = t.getPageX(e), e.pageY = t.getPageY(e)), "detail" in e || (e.detail = t.getDetail(e)), "keyCode" in e || (e.keyCode = t.getKeyCode(e));
        for (var n in t._EventPro) null == e[n] && (e[n] = t._EventPro[n]);
        return e
      }
    };
    QW.EventH = t
  }(),
  function() {
    function e(e, t, r, i) {
      return a.get(e, t + (i ? "." + i : ""), r) || function(o) {
        return !i || i && u._EventHooks[i][t](e, o, r) ? n(e, o, r, t) : void 0
      }
    }

    function t(e, t, r, i, o) {
      return a.get(e, r + (o ? "." + o : ""), i, t) || function(a) {
        var s, l, c = [],
          f = a.srcElement || a.target;
        if (f) {
          for (3 == f.nodeType && (f = f.parentNode); f && f != e;) c.push(f), f = f.parentNode;
          for (c = QW.Selector.filter(c, t, e), s = 0, l = c.length; l > s; ++s)
            if ((!o || o && u._DelegateHooks[o][r](c[s], a || window.event, i)) && n(c[s], a, i, r), c[s].parentNode && 11 == c[s].parentNode.nodeType) {
              a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
              break
            }
        }
      }
    }

    function n() {
      return u.fireHandler.apply(null, arguments)
    }
    var r = QW.NodeH.g,
      i = QW.ObjectH.mix,
      o = QW.EventH.standardize,
      a = function() {
        var e = 1,
          t = "__QWETH_id";
        return {
          get: function(e, n, r, i) {
            var o = e[t] && this[e[t]];
            return o && r[t] ? o[n + r[t] + (i || "")] : void 0
          },
          add: function(n, r, i, o, a) {
            r[t] || (r[t] = e++), o[t] || (o[t] = e++);
            var u = this[r[t]] || (this[r[t]] = {});
            u[i + o[t] + (a || "")] = n
          },
          remove: function(e, n, r, i) {
            var o = e[t] && this[e[t]];
            o && r[t] && delete o[n + r[t] + (i || "")]
          },
          removeEvents: function(e, n) {
            var r, i, o = e[t] && this[e[t]];
            if (o) {
              r = RegExp("^[a-zA-Z.]*" + (n || "") + "\\d+$");
              for (i in o) r.test(i) && (u.removeEventListener(e, i.split(/[^a-zA-Z]/)[0], o[i]), delete o[i])
            }
          },
          removeDelegates: function(e, n, r) {
            var i, o, a, s, l = e[t] && this[e[t]];
            if (l) {
              i = RegExp("^([a-zA-Z]+\\.)?" + (n || "\\w+") + "\\d+.+");
              for (o in l) !i.test(o) || r && o.substr(o.length - r.length) != r || (a = o.split(/\d+/)[0].split("."), s = u._DelegateCpatureEvents.indexOf(a[1] || a[0]) > -1, u.removeEventListener(e, o.split(/[^a-zA-Z]/)[0], l[o], s), delete l[o])
            }
          }
        }
      }(),
      u = {
        _EventHooks: {},
        _DelegateHooks: {},
        _DelegateCpatureEvents: "change,focus,blur",
        fireHandler: function(e, t, n, r) {
          return t = o(t), t.userType = r, n.call(e, t)
        },
        addEventListener: function() {
          return document.addEventListener ? function(e, t, n, r) {
            e.addEventListener(t, n, r || !1)
          } : function(e, t, n) {
            e.attachEvent("on" + t, n)
          }
        }(),
        removeEventListener: function() {
          return document.removeEventListener ? function(e, t, n, r) {
            e.removeEventListener(t, n, r || !1)
          } : function(e, t, n) {
            e.detachEvent("on" + t, n)
          }
        }(),
        on: function(t, n, i) {
          var o, s, l, c;
          if (n && n.indexOf(",") > -1)
            for (o = n.split(/\s*,\s*/), s = 0; s < o.length; s++) u.on(t, o[s], i);
          else if (t = r(t), l = u._EventHooks[n])
            for (s in l) c = e(t, s, i, n), a.add(c, t, s + "." + n, i), s == n ? u.addEventListener(t, s, c) : u.on(t, s, c);
          else c = e(t, n, i), u.addEventListener(t, n, c), a.add(c, t, n, i)
        },
        un: function(t, n, i) {
          var o, s, l, c;
          if (n && n.indexOf(",") > -1)
            for (o = n.split(/\s*,\s*/), s = 0; s < o.length; s++) u.un(t, o[s], i);
          else {
            if (t = r(t), !i) return a.removeEvents(t, n);
            if (l = u._EventHooks[n])
              for (s in l) c = e(t, s, i, n), s == n ? u.removeEventListener(t, s, c) : u.un(t, s, c), a.remove(t, s + "." + n, i);
            else c = e(t, n, i), u.removeEventListener(t, n, c), a.remove(t, n, i)
          }
        },
        once: function(e, t, n) {
          e = r(e);
          var i = function() {
            n.apply(this, arguments), u.un(e, t, i)
          };
          u.on(e, t, i)
        },
        delegate: function(e, n, i, o) {
          var s, l, c, f, d;
          if (i && i.indexOf(",") > -1)
            for (s = i.split(/\s*,\s*/), l = 0; l < s.length; l++) u.delegate(e, n, s[l], o);
          else if (e = r(e), c = u._DelegateHooks[i], f = u._DelegateCpatureEvents.indexOf(i) > -1, c)
            for (l in c) d = t(e, n, l, o, i), a.add(d, e, l + "." + i, o, n), l == i ? u.addEventListener(e, l, d, f) : u.delegate(e, n, l, d);
          else d = t(e, n, i, o), u.addEventListener(e, i, d, f), a.add(d, e, i, o, n)
        },
        undelegate: function(e, n, i, o) {
          var s, l, c, f, d;
          if (i && i.indexOf(",") > -1)
            for (s = i.split(/\s*,\s*/), l = 0; l < s.length; l++) u.undelegate(e, n, s[l], o);
          else {
            if (e = r(e), !o) return a.removeDelegates(e, i, n);
            if (c = u._DelegateHooks[i], f = u._DelegateCpatureEvents.indexOf(i) > -1, c)
              for (l in c) d = t(e, n, l, o, i), l == i ? u.removeEventListener(e, l, d, f) : u.undelegate(e, n, l, d), a.remove(e, l + "." + i, o, n);
            else d = t(e, n, i, o), u.removeEventListener(e, i, d, f), a.remove(e, i, o, n)
          }
        },
        fire: function() {
          return document.dispatchEvent ? function(e, t) {
            var n = null,
              r = e.ownerDocument || e;
            return /mouse|click/i.test(t) ? (n = r.createEvent("MouseEvents"), n.initMouseEvent(t, !0, !0, r.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null)) : (n = r.createEvent("Events"), n.initEvent(t, !0, !0, r.defaultView)), e.dispatchEvent(n)
          } : function(e, t) {
            return e.fireEvent("on" + t)
          }
        }()
      };
    u._defaultExtend = function() {
      function e(e) {
        var t, n, r;
        switch (e.type) {
          case "checkbox":
          case "radio":
            return e.checked;
          case "select-multiple":
            for (t = [], n = e.options, r = 0; r < n.length; ++r) n[r].selected && t.push(n[r].value);
            return t.join(",");
          default:
            return e.value
        }
      }

      function t(t, r) {
        var i = r.target || r.srcElement;
        return e(i) != i.__QWETH_pre_val ? (n(t, r), !0) : void 0
      }

      function n(t, n) {
        var r = n.target || n.srcElement;
        r.__QWETH_pre_val = e(r)
      }
      var o, a = function(e) {
        function t(e) {
          u[e] = function(t, n) {
            if (n) u.on(t, e, n);
            else if (t[e]) try {
              t[e]()
            } catch (r) {} else u.fire(t, e)
          }
        }
        for (var n = 0, r = e.length; r > n; ++n) t(e[n])
      };
      a("submit,reset,click,focus,blur,change,select".split(",")), u.hover = function(e, t, n) {
        e = r(e), u.on(e, "mouseenter", t), u.on(e, "mouseleave", n || t)
      }, o = navigator.userAgent, /firefox/i.test(o) && (u._EventHooks.mousewheel = u._DelegateHooks.mousewheel = {
        DOMMouseScroll: function() {
          return !0
        }
      }), i(u._EventHooks, {
        mouseenter: {
          mouseover: function(e, t) {
            var n = t.relatedTarget || t.fromElement;
            return n && (e.contains ? e.contains(n) : e == n || 16 & e.compareDocumentPosition(n)) ? void 0 : !0
          }
        },
        mouseleave: {
          mouseout: function(e, t) {
            var n = t.relatedTarget || t.toElement;
            return n && (e.contains ? e.contains(n) : e == n || 16 & e.compareDocumentPosition(n)) ? void 0 : !0
          }
        }
      }), i(u._DelegateHooks, u._EventHooks), document.addEventListener || i(u._DelegateHooks, {
        change: {
          beforeactivete: n,
          deactivate: t,
          focusout: t,
          click: t,
          keyup: function(e, n) {
            return n.srcElement && "SELECT" == n.srcElement.tagName ? t(e, n) : void 0
          }
        },
        focus: {
          focusin: function() {
            return !0
          }
        },
        blur: {
          focusout: function() {
            return !0
          }
        }
      })
    }, u._defaultExtend(), QW.EventTargetH = u
  }(),
  function() {
    var e = "queryer",
      t = "operator",
      n = "getter_first",
      r = "getter_first_all";
    QW.NodeC = {
      getterType: n,
      arrayMethods: "map,forEach,toArray".split(","),
      wrapMethods: {
        g: e,
        one: e,
        query: e,
        getElementsByClass: e,
        outerHTML: n,
        hasClass: n,
        addClass: t,
        removeClass: t,
        replaceClass: t,
        toggleClass: t,
        show: t,
        hide: t,
        toggle: t,
        isVisible: n,
        getXY: r,
        setXY: t,
        setSize: t,
        setInnerSize: t,
        setRect: t,
        setInnerRect: t,
        getSize: r,
        getRect: r,
        nextSibling: e,
        previousSibling: e,
        nextSiblings: e,
        previousSiblings: e,
        siblings: e,
        ancestorNode: e,
        ancestorNodes: e,
        parentNode: e,
        firstChild: e,
        lastChild: e,
        contains: n,
        insertAdjacentHTML: t,
        insertAdjacentElement: t,
        insert: t,
        insertTo: t,
        appendChild: t,
        appendTo: t,
        insertSiblingBefore: t,
        insertSiblingAfter: t,
        insertBefore: t,
        insertAfter: t,
        replaceNode: t,
        replaceChild: t,
        removeNode: t,
        empty: t,
        removeChild: t,
        get: r,
        set: t,
        getAttr: r,
        setAttr: t,
        removeAttr: t,
        getValue: r,
        setValue: t,
        getHtml: r,
        setHtml: t,
        encodeURIForm: n,
        isFormChanged: n,
        cloneNode: e,
        getStyle: r,
        getCurrentStyle: r,
        setStyle: t,
        removeStyle: t,
        borderWidth: n,
        paddingWidth: n,
        marginWidth: n,
        tmpl: r,
        wrap: t,
        unwrap: t,
        prepend: t,
        prependTo: t,
        forEach: t
      },
      gsetterMethods: {
        val: ["getValue", "setValue"],
        html: ["getHtml", "setHtml"],
        attr: ["", "getAttr", "setAttr"],
        css: ["", "getCurrentStyle", "setStyle"],
        size: ["getSize", "setInnerSize"],
        xy: ["getXY", "setXY"]
      }
    }
  }(),
  function() {
    var e = QW.HelperH.methodize,
      t = QW.ObjectH.mix;
    t(Object, QW.ObjectH), t(Array, QW.ArrayH), t(Array.prototype, e(QW.ArrayH)), t(Function, QW.FunctionH), t(Date, QW.DateH), t(Date.prototype, e(QW.DateH)), t(String, QW.StringH), t(String.prototype, e(QW.StringH))
  }(),
  function() {
    var e, t, n = QW.ObjectH.mix,
      r = QW.HelperH.methodize,
      i = QW.HelperH.rwrap,
      o = QW.NodeC,
      a = QW.NodeH,
      u = QW.EventTargetH,
      s = QW.JssTargetH,
      l = QW.DomU,
      c = QW.NodeW;
    c.pluginHelper(a, o.wrapMethods, o.gsetterMethods), c.pluginHelper(u, "operator"), c.pluginHelper(s, o.wrapMethods, {
      jss: ["", "getJss", "setJss"]
    }), e = QW.ObjectH.dump(QW.ArrayH, o.arrayMethods), e = r(e), e = i(e, c, o.wrapMethods), n(c.prototype, e), t = QW.Dom = {}, n(t, [l, a, u, s])
  }(),
  function() {
    var e = function(e, t) {
      var n = 0 | (e.getAttribute && e.getAttribute("data--ban"));
      return n ? !e.__BAN_preTime || new Date - e.__BAN_preTime > n ? (setTimeout(function() {
        e.__BAN_preTime = 1 * new Date
      }), !0) : void QW.EventH.preventDefault(t) : !0
    };
    QW.EventTargetH._DelegateHooks.click = QW.EventTargetH._EventHooks.click = {
      click: e
    }, QW.EventTargetH._EventHooks.submit = {
      submit: e
    }
  }(), window.g = QW.g = QW.NodeH.g, window.W = QW.W = QW.NodeW, QW.ObjectH.mix(window, QW), QW.ModuleH.provideDomains.push(window),
  function() {
    function e(e) {
      this.options = e, this._initialize()
    }
    var t = QW.ObjectH.mix,
      n = QW.ObjectH.encodeURIJson,
      r = QW.NodeH.encodeURIForm,
      i = QW.CustEvent;
    t(e, {
      STATE_INIT: 0,
      STATE_REQUEST: 1,
      STATE_SUCCESS: 2,
      STATE_ERROR: 3,
      STATE_TIMEOUT: 4,
      STATE_CANCEL: 5,
      defaultHeaders: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest"
      },
      EVENTS: ["succeed", "error", "cancel", "timeout", "complete"],
      getXHR: function() {
        function e() {
          try {
            return new window.XMLHttpRequest
          } catch (e) {}
        }

        function t() {
          try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
          } catch (e) {}
        }
        var n, r;
        try {
          n = location.href
        } catch (i) {
          n = document.createElement("a"), n.href = "", n = n.href
        }
        return r = /^(about|app|app\-storage|.+\-extension|file|res|widget):/i.test(n), window.ActiveXObject ? function() {
          return !r && e() || t()
        } : e
      }(),
      request: function(t, n, r, i) {
        if (t.constructor == Object) var o = new e(t);
        else "function" == typeof n && (i = r, r = n, t && "FORM" == t.tagName ? (i = i || t.method, n = t, t = t.action) : n = ""), o = new e({
          url: t,
          method: i,
          data: n,
          onsucceed: function() {
            r.call(this, this.requester.responseText)
          }
        });
        return o.send(), o
      },
      get: function() {
        var t = [].slice.call(arguments, 0);
        return t.push("get"), e.request.apply(null, t)
      },
      post: function() {
        var t = [].slice.call(arguments, 0);
        return t.push("post"), e.request.apply(null, t)
      }
    }), t(e.prototype, {
      url: "",
      method: "get",
      async: !0,
      user: "",
      pwd: "",
      requestHeaders: null,
      data: "",
      useLock: 0,
      timeout: 3e4,
      isLocked: 0,
      state: e.STATE_INIT,
      send: function(t, i, o) {
        var a, u, s = this;
        if (s.isLocked) throw Error("Locked.");
        if (s.isProcessing() && s.cancel(), a = s.requester, !a && (a = s.requester = e.getXHR(), !a)) throw Error("Fail to get HTTPRequester.");
        t = t || s.url, t = t.split("#")[0], i = (i || s.method || "").toLowerCase(), o = o || s.data, "object" == typeof o && (o = "FORM" == o.tagName ? r(o) : n(o)), o && "post" != i && (t += (-1 != t.indexOf("?") ? "&" : "?") + o), s.user ? a.open(i, t, s.async, s.user, s.pwd) : a.open(i, t, s.async);
        for (u in s.requestHeaders) a.setRequestHeader(u, s.requestHeaders[u]);
        return s.isLocked = 0, s.state = e.STATE_INIT, s.async && (s._sendTime = new Date, s.useLock && (s.isLocked = 1), this.requester.onreadystatechange = function() {
          var e = s.requester.readyState;
          4 == e && s._execComplete()
        }, s._checkTimeout()), "post" == i ? (o || (o = " "), a.send(o)) : a.send(null), s.async ? void 0 : (s._execComplete(), s.requester.responseText)
      },
      isSuccess: function() {
        var e = this.requester.status;
        return !e || e >= 200 && 300 > e || 304 == e
      },
      isProcessing: function() {
        var e = this.requester ? this.requester.readyState : 0;
        return e > 0 && 4 > e
      },
      get: function(e, t) {
        this.send(e, "get", t)
      },
      post: function(e, t) {
        this.send(e, "post", t)
      },
      cancel: function() {
        var t = this;
        return t.requester && t.isProcessing() ? (t.state = e.STATE_CANCEL, t.requester.abort(), t._execComplete(), t.fire("cancel"), !0) : !1
      },
      _initialize: function() {
        var n = this;
        i.createEvents(n, e.EVENTS), t(n, n.options, 1), n.requestHeaders = t(n.requestHeaders || {}, e.defaultHeaders)
      },
      _checkTimeout: function() {
        var t = this;
        t.async && (clearTimeout(t._timer), this._timer = setTimeout(function() {
          t.requester && t.isProcessing() && (t.state = e.STATE_TIMEOUT, t.requester.abort(), t._execComplete("timeout"))
        }, t.timeout))
      },
      _execComplete: function(t) {
        var n, r = this,
          i = r.requester;
        i.onreadystatechange = function() {}, r.isLocked = 0, clearTimeout(this._timer), n = null;
        try {
          n = r.requester.responseText
        } catch (o) {}
        "timeout" == t && r.fire("timeout"), r.state == e.STATE_CANCEL || r.state == e.STATE_TIMEOUT || (r.isSuccess() ? (r.state = e.STATE_SUCCESS, r.fire("succeed", {
          responseText: n
        })) : (r.state = e.STATE_ERROR, r.fire("error", {
          responseText: n
        }))), r.fire("complete", {
          responseText: n
        })
      }
    }), QW.provide("Ajax", e)
  }(),
  function() {
    var e, t = QW.Ajax,
      n = QW.NodeW;
    t.Delay = 1e3, t.prototype.opResults = function() {
      var e, t, n = this;
      if (!n.isSuccess()) return alert("\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002"), {
        isop: !0,
        err: "inter"
      };
      e = n.requester.responseText;
      try {
        t = Function("return (" + e + ");")()
      } catch (r) {
        return alert("\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002"), {
          isop: !0,
          err: "inter"
        }
      }
      switch (t.isop = !0, t.err) {
        default: t.isop = !1
      }
      return t
    }, t.prototype.execJs = function() {
      QW.StringH.execJs(this.requester.responseText)
    }, e = {
      ajaxForm: function(e, n) {
        var r = {
          data: e,
          url: e.action,
          method: e.method
        };
        "function" == typeof n ? r.onsucceed = function() {
          n.call(this, this.requester.responseText)
        } : (r.onsucceed = t.opResults, QW.ObjectH.mix(r, n || {}, !0)), new t(r).send()
      }
    }, n.pluginHelper(e, "operator")
  }(),
  function() {
    function e(e) {
      e.step(), e.isPlaying() && (e._interval = window.setInterval(function() {
        e.step()
      }, e.frameTime))
    }

    function t(e) {
      window.clearInterval(e._interval)
    }

    function n(e, t) {
      e.per = t, e._startDate = 1 * new Date - t * e.dur, e.byStep && (e._totalStep = e.dur / e.frameTime, e._currentStep = t * e._totalStep)
    }
    var r = QW.CustEvent,
      i = QW.ObjectH.mix,
      o = function(e, t, a) {
        i(this, a), i(this, {
          animFun: e,
          dur: t,
          byStep: !1,
          per: 0,
          frameTime: 28,
          _status: 0
        }), n(this, this.per), r.createEvents(this, o.EVENTS)
      };
    o.EVENTS = "beforeplay,play,step,pause,resume,end,reset".split(","), i(o.prototype, {
      isPlaying: function() {
        return 1 == this._status
      },
      play: function() {
        var t = this;
        return t.isPlaying() && t.pause(), n(t, 0), t.fire("beforeplay") ? (t._status = 1, t.fire("play"), e(t), !0) : !1
      },
      step: function(e) {
        var t = this;
        return null != e ? n(t, e) : (e = t.byStep ? t._currentStep++/t._totalStep:(new Date-t._startDate)/t.dur, this.per = e), this.per > 1 && (this.per = 1), t.animFun(this.per), t.fire("step"), this.per >= 1 ? void this.end() : void 0
      },
      end: function() {
        n(this, 1), this.animFun(1), this._status = 2, t(this), this.fire("end")
      },
      pause: function() {
        this._status = 4, t(this), this.fire("pause")
      },
      resume: function() {
        n(this, this.per), this._status = 1, this.fire("resume"), e(this)
      },
      reset: function() {
        n(this, 0), this.animFun(0), this.fire("reset")
      }
    }), QW.provide("Anim", o)
  }(),
  function() {
    function e(e, t) {
      var n, r;
      for (n in e)
        if (r = RegExp(n, "i"), r.test(t)) return e[n];
      return null
    }
    var t, n, r, i, o = QW.NodeH,
      a = QW.ObjectH.mix,
      u = QW.ObjectH.isObject,
      s = a,
      l = o.g,
      c = o.getCurrentStyle,
      f = o.setStyle,
      d = QW.DomU.isElement,
      p = QW.ArrayH.forEach,
      g = QW.ArrayH.map,
      h = QW.Anim,
      m = o.show,
      v = o.hide,
      y = o.isVisible,
      b = function(e, t, n) {
        this.el = e, this.attr = n, u(t) || (t = {
          to: t
        }), a(this, t)
      };
    a(b.prototype, {
      getValue: function() {
        return c(this.el, this.attr)
      },
      setValue: function(e) {
        this.unit ? f(this.el, this.attr, e + this.unit) : f(this.el, this.attr, e)
      },
      getUnit: function() {
        var e, t;
        return this.unit ? this.unit : (e = this.getValue(), e && (t = ("" + e).replace(/^[+-]?[\d\.]+/g, ""), t && t != e) ? t : "")
      },
      init: function() {
        var e, t, n;
        e = null != this.from ? parseFloat(this.from) : parseFloat(this.getValue()) || 0, t = parseFloat(this.to), n = null != this.by ? parseFloat(this.by) : t - e, this.from = e, this.by = n, this.unit = this.getUnit()
      },
      action: function(e) {
        var t;
        void 0 !== this.end && e >= 1 ? t = this.end : (t = this.from + this.by * this.easing(e), t = parseFloat(t.toFixed(6))), this.setValue(t)
      }
    }), t = function(e, t, n) {
      var r = new b(e, t, n);
      s(this, r)
    }, t.MENTOR_CLASS = b, a(t.prototype, {
      getValue: function() {
        return 0 | this.el[this.attr]
      },
      setValue: function(e) {
        this.el[this.attr] = Math.round(e)
      }
    }, !0), n = function(e, t, n) {
      var r = new b(e, t, n);
      s(this, r)
    }, n.MENTOR_CLASS = b, a(n.prototype, {
      parseColor: function(e) {
        var t, n = {
          rgb: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
          hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
          hex3: /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i
        };
        return 3 == e.length ? e : (t = n.hex.exec(e), t && 4 == t.length ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : (t = n.rgb.exec(e), t && 4 == t.length ? [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)] : (t = n.hex3.exec(e), t && 4 == t.length ? [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] : [0, 0, 0])))
      },
      init: function() {
        var e, t, n, r = this.parseColor;
        e = null != this.from ? this.from : this.getValue(), e = r(e), t = this.to || [0, 0, 0], t = r(t), n = this.by ? r(this.by) : g(t, function(t, n) {
          return t - e[n]
        }), this.from = e, this.to = t, this.by = n, this.unit = ""
      },
      getValue: function() {
        var e = c(this.el, this.attr);
        return this.parseColor(e)
      },
      setValue: function(e) {
        "string" == typeof e ? f(this.el, this.attr, e) : f(this.el, this.attr, "rgb(" + e.join(",") + ")")
      },
      action: function(e) {
        var t, n = this;
        t = void 0 !== this.end && e >= 1 ? this.end : this.from.map(function(t, r) {
          return Math.max(Math.floor(t + n.by[r] * n.easing(e)), 0)
        }), this.setValue(t)
      }
    }, !0), r = {
      color$: n,
      "^scroll": t,
      ".*": b
    }, i = function(t, n, o, a) {
      var u, c, f, g, m, v, y;
      if (t = l(t), !d(t)) throw Error(["Animation", "Initialize Error", "Element Not Found!"]);
      o = o || i.DefaultEasing, a = "function" == typeof a ? a : i.DefaultEasing, u = [], c = [];
      for (f in n) "string" == typeof n[f] && i.agentHooks[n[f]] && (g = i.agentHooks[n[f]](f, t), g.callback && (c.push(g.callback), delete g.callback), n[f] = g), m = e(r, f), v = new m(t, n[f], f), v && (v.init(), v.easing = v.easing || a, u.push(v));
      y = new h(function(e) {
        p(u, function(t) {
          t.action(e)
        })
      }, o), p(c, function(e) {
        y.on("end", e)
      }), s(this, y)
    }, i.MENTOR_CLASS = h, i.DefaultEasing = function(e) {
      return e
    }, i.DefaultDur = 500, i.Sequence = !1, i.agentHooks = function() {
      return {
        show: function(e, t) {
          var n = 0,
            r = t["__anim" + e];
          return y(t) ? (n = c(t, e), r = void 0 === r ? c(t, e) : r) : (m(t), r = void 0 === r ? c(t, e) : r, f(t, e, 0)), {
            from: n,
            to: r
          }
        },
        hide: function(e, t) {
          var n, r = c(t, e),
            i = "__anim" + e,
            o = t[i];
          return void 0 === o && (y(t) ? o = r : (m(t), o = c(t, e), v(t)), t[i] = o), n = function() {
            v(t), f(t, e, t[i])
          }, {
            from: r,
            to: 0,
            callback: n
          }
        },
        toggle: function(e, t) {
          return y(t) ? i.agentHooks.hide.apply(this, arguments) : i.agentHooks.show.apply(this, arguments)
        }
      }
    }(), QW.provide({
      ElAnim: i,
      ScrollAnim: i,
      ColorAnim: i
    })
  }(),
  function() {
    var e = {
      easeNone: function(e) {
        return e
      },
      easeIn: function(e) {
        return e * e
      },
      easeOut: function(e) {
        return e * (2 - e)
      },
      easeBoth: function(e) {
        return (e /= .5) < 1 ? .5 * e * e : -0.5 * (--e * (e - 2) - 1)
      },
      easeInStrong: function(e) {
        return e * e * e * e
      },
      easeOutStrong: function(e) {
        return -((e -= 1) * e * e * e - 1)
      },
      easeBothStrong: function(e) {
        return (e /= .5) < 1 ? .5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2)
      },
      elasticIn: function(e) {
        if (0 == e) return 0;
        if (1 == e) return 1;
        var t = .3,
          n = t / 4;
        return -(Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - n) * Math.PI / t))
      },
      elasticOut: function(e) {
        if (0 == e) return 0;
        if (1 == e) return 1;
        var t = .3,
          n = t / 4;
        return Math.pow(2, -10 * e) * Math.sin(2 * (e - n) * Math.PI / t) + 1
      },
      elasticBoth: function(e) {
        if (0 == e) return 0;
        if (2 == (e /= .5)) return 1;
        var t = .3 * 1.5,
          n = t / 4;
        return 1 > e ? -.5 * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - n) * Math.PI / t) : Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - n) * Math.PI / t) * .5 + 1
      },
      backIn: function(e) {
        var t = 1.70158;
        return e * e * ((t + 1) * e - t)
      },
      backOut: function(e) {
        var t = 1.70158;
        return (e -= 1) * e * ((t + 1) * e + t) + 1
      },
      backBoth: function(e) {
        var t = 1.70158;
        return (e /= .5) < 1 ? .5 * e * e * (((t *= 1.525) + 1) * e - t) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
      },
      bounceIn: function(t) {
        return 1 - e.bounceOut(1 - t)
      },
      bounceOut: function(e) {
        return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
      },
      bounceBoth: function(t) {
        return .5 > t ? .5 * e.bounceIn(2 * t) : .5 * e.bounceOut(2 * t - 1) + .5
      }
    };
    QW.provide("Easing", e)
  }(),
  function() {
    function e(e, t, r, i, o) {
      e = n(e), a.stop(e, !1, !1);
      var u = new QW.ElAnim(e, t, i || 400, o);
      return r && u.on("end", function() {
        r.call(e, null)
      }), u.play(), e.__preAnim = u, u
    }
    var t = QW.NodeH,
      n = t.g,
      r = t.isVisible,
      i = QW.ObjectH.mix,
      o = "_animation",
      a = {
        animate: function(t, n, r, i, a, u) {
          var s, l;
          for (s = arguments.length - 1; s > 0; s--)
            if (arguments[s] === !!arguments[s]) {
              l = arguments[s], arguments[s] = null, u = l;
              break
            }
          return QW.Async && (u || QW.ElAnim.Sequence) ? void W(t).wait(o, function() {
            var u = e(t, n, i, r, a);
            return u.on("end", function() {
              W(t).signal(o)
            }), u
          }) : e(t, n, i, r, a)
        },
        fadeIn: function(e, t, n, r, i) {
          var o = {
            opacity: "show"
          };
          return a.animate(e, o, t, n, r, i)
        },
        fadeOut: function(e, t, n, r, i) {
          var o = {
            opacity: "hide"
          };
          return a.animate(e, o, t, n, r, i)
        },
        fadeToggle: function(e, t, n, i, o) {
          return a[r(e) ? "fadeOut" : "fadeIn"](e, t, n, i, o)
        },
        slideUp: function(e, t, n, r, i) {
          var o = {
            height: "hide"
          };
          return a.animate(e, o, t, n, r, i)
        },
        slideDown: function(e, t, n, r, i) {
          var o = {
            height: "show"
          };
          return a.animate(e, o, t, n, r, i)
        },
        slideToggle: function(e, t, n, i, o) {
          return a[r(e) ? "slideUp" : "slideDown"](e, t, n, i, o)
        },
        shine4Error: function(e, t, n, r, i) {
          var o = {
            backgroundColor: {
              from: "#f33",
              to: "#fff",
              end: ""
            }
          };
          return a.animate(e, o, t, n, r, i)
        },
        stop: function(e, t, n) {
          var r = e.__preAnim;
          r && (t && QW.Async && QW.AsyncH.clearSignals(e, o), n ? r.end() : r.pause())
        }
      };
    QW.Async && i(a, {
      sleep: function(e, t, n) {
        return a.animate(e, {}, t, n, null, !0)
      }
    }), QW.NodeW.pluginHelper(a, "operator"), QW.Dom && i(QW.Dom, a)
  }(),
  function() {
    window.disqus_shortname = "jerryqu", ["CURRENT_PAGE"].forEach(function(e) {
      window[e] = "";
      var t = W("#" + e);
      t.length && (window[e] = t.val().trim())
    })
  }(), Dom.ready(function() {
    setTimeout(function() {
      W("pre").forEach(function(e, t) {
        var n, r;
        if (e = W(e), n = e.query("code"), n.get("className") && (n.get("className").indexOf("lang-html") > -1 && (n.set("id", "__HTML_CODE_" + t), e.insertSiblingAfter(W('<input data-id="' + n.get("id") + '" class="runcode" type="button" value="\u5728\u65b0\u7a97\u53e3\u8fd0\u884c\u4ee5\u4e0a\u4ee3\u7801" />'))), n.html().split("\n").length > 3 && n.get("className").indexOf("lang") > -1)) {
          switch (r = n.get("className").replace("lang-", "").toUpperCase()) {
            case "XML":
              r = "HTML"
          }
          e.insertBefore(W('<b class="name">' + r + "</b>"), e[0].firstChild)
        }
      }), W(document.body).delegate("input.runcode", "click", function(e) {
        e.preventDefault();
        var t = W("#" + W(this).attr("data-id")).html().stripTags().decode4Html(),
          n = window.open("", "_preview", ""),
          r = n.document;
        r.open(), r.write(t), r.close()
      })
    }, 10)
  }),
  function() {
    W(".entry-content img[data-replace]").on("click", function() {
      var e, t, n, r, i = W(this),
        o = 1e3 * (i.attr("data-dur") || 20);
      i.css("cursor") && (e = i.attr("src"), t = "/static/img/blog/blank.gif", n = i.attr("data-replace"), i.attr("src", t).css("cursor", ""), r = new Image, r.onload = function() {
        i.attr("src", n), setTimeout(function() {
          i.attr("src", e).css("cursor", "pointer")
        }, o)
      }, r.src = n)
    }).css("cursor", "pointer")
  }(), Dom.ready(function() {
    lazyLoad({
        selector: "body",
        height: 100
      }),
      function() {
        "search-post" == CURRENT_PAGE && (W("#keyword").val() || W("#keyword").focus())
      }(), QW.Browser.ie && parseInt(QW.Browser.ie) < 9 && W('link[rel="stylesheet"]').removeNode()
  }), W(window).on("load", function() {
    var e, t = W("#disqus_thread");
    if (t.length) return QW.Browser.ie && parseInt(QW.Browser.ie) < 9 ? void t.html("\u8bf7\u4f7f\u7528\u73b0\u4ee3\u6d4f\u89c8\u5668\uff08Chrome\u3001Firefox\u3001Opera\u3001IE 9+\uff09\u53d1\u8868\u548c\u67e5\u770b\u8bc4\u8bba\uff01") : void(e = setInterval(function() {
      var n = Dom.getDocRect(),
        r = n.scrollY + n.height,
        i = t.getRect().top;
      (location.hash.indexOf("#comment") > -1 || Math.abs(i - r) < 1e3) && (clearTimeout(e), window.disqus_config = function() {
        this.page.url = t.attr("data-url"), this.page.identifier = t.attr("data-identifier")
      }, QW.loadJs("//jerryqu.disqus.com/embed.js"))
    }, 300))
  }), W(window).on("load", function() {
    W("#google_translate_element").length && setTimeout(function() {
      var e = navigator,
        t = (e.language || e.browserLanguage || "").toLowerCase();
      "zh-cn" != t && QW.loadJs("//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit")
    }, 200)
  });
