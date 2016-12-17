var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.log = function(t) {
      var e = [];
      for (var i = 1; i < arguments.length; i++) {
        e[i - 1] = arguments[i]
      }
      if (typeof console !== "undefined" && typeof console.log !== "undefined") {
        if (e && e.length) {
          console.log(t, e)
        } else {
          console.log(t)
        }
      }
    };
    t.error = function(e) {
      var i = [];
      for (var n = 1; n < arguments.length; n++) {
        i[n - 1] = arguments[n]
      }
      if (typeof console !== "undefined" && typeof console.error !== "undefined") {
        if (i && i.length) {
          console.error(e, i)
        } else {
          console.error(e)
        }
      } else {
        t.log(e, i)
      }
      if (typeof window["_errs"] !== "undefined" && typeof window["_errs"].push !== "undefined") {
        window["_errs"].push(e)
      }
    };
    return t
  }();
  t.Debug = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.printTimeline = function(e) {
      var i = e.getChildren(true, true, true);
      var n = i.map(function(e) {
        return t.tweenProps(e)
      });
      console.table(n)
    };
    t.tweenProps = function(t) {
      return {
        element: t.target,
        start: t.startTime(),
        duration: t.duration(),
        vars: JSON.stringify(t.vars)
      }
    };
    t.tweenToString = function(t) {
      var e = $(t.target)[0].outerHTML;
      if (e && e.length > 100) {
        e = e.substr(0, 100)
      }
      var i = "";
      i += t.startTime() + "	" + t.duration() + "	";
      i += "target: " + e;
      i += ", vars: " + JSON.stringify(t.vars);
      return i
    };
    t.getOffsetFromNumber = function(t) {
      return t < 0 ? "-=" + Math.abs(t) : "+=" + t
    };
    t.getPauseTween = function(t) {
      return TweenMax.to({}, t, {
        x: 100
      })
    };
    return t
  }();
  t.GSAPTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.debounced = function(t, e, i) {
      if (e === void 0) {
        e = 100
      }
      if (i === void 0) {
        i = false
      }
      var n;
      return function s() {
        var s = this,
            r = arguments;

        function a() {
          if (!i) t.apply(s, r);
          n = null
        }
        if (n) clearTimeout(n);
        else if (i) t.apply(s, r);
        n = setTimeout(a, e)
      }
    };
    return t
  }();
  t.Debounce = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    return t
  }();
  t.box = e;
  var i = function() {
    function t() {}
    return t
  }();
  t.point = i;
  var n = function() {
    function t() {}
    t.debug = function(t, e, i) {
      var n = $("<div/>").addClass("debugThing").css({
        position: "absolute",
        top: e,
        left: t,
        backgroundColor: i,
        height: "16px",
        width: "16px",
        zIndex: "999999999"
      });
      $(document.body).append(n)
    };
    t.getFreePositions = function(t, e, i, n, s, r, a, o) {
      if (e < 0 || e + n > t.width || i < 0 || i + s > t.height) {
        return []
      }
      var u = null;
      for (var h = 0; h < o.length; h++) {
        var l = o[h];
        if (!(e >= l.x + l.width || e + n <= l.x || i >= l.y + l.height || i + s <= l.y)) {
          u = l;
          break
        }
      }
      if (u == null) {
        return [{
          x: e,
          y: i
        }]
      } else {
        var c = [];
        if (r == null || r) {
          var g = l.x + l.width;
          c = c.concat(this.getFreePositions(t, g, i, n, s, true, a, o))
        }
        if (r == null || !r) {
          var g = l.x - n;
          c = c.concat(this.getFreePositions(t, g, i, n, s, false, a, o))
        }
        if (a == null || a) {
          var d = l.y + l.height;
          c = c.concat(this.getFreePositions(t, e, d, n, s, r, true, o))
        }
        if (a == null || !a) {
          var d = l.y - s;
          c = c.concat(this.getFreePositions(t, e, d, n, s, r, false, o))
        }
        return c
      }
    };
    t.getClosestPosition = function(t, e, i) {
      var n = {
        x: t,
        y: e
      };
      var s = Infinity;
      for (var r = 0; r < i.length; r++) {
        var a = i[r];
        var o = Math.sqrt(Math.pow(t - a.x, 2) + Math.pow(e - a.y, 2));
        if (o < s) {
          n = a;
          s = o
        }
      }
      return n
    };
    t.getClosestFreePosition = function(t, e, i, n, s, r) {
      var a = e;
      var o = i;
      var u = null;
      var h = null;
      if (e < 0) {
        u = true;
        a = 0
      } else if (e + n > t.width) {
        u = false;
        a = t.width - n
      }
      if (i < 0) {
        h = true;
        o = 0
      } else if (i + s > t.height) {
        h = false;
        o = t.height - s
      }
      var l = this.getFreePositions(t, a, o, n, s, u, h, r);
      return this.getClosestPosition(e, i, l)
    };
    t.getClosestFreePositionByBox = function(t, e, i) {
      return this.getClosestFreePosition(t, e.x, e.y, e.width, e.height, i)
    };
    return t
  }();
  t.FreePositionFinder = n
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t(t) {
      var e = this;
      this.promise = $.Deferred();
      this.url = t;
      this.img = new Image;
      this.img.onabort = function() {
        e.promise.reject(e)
      };
      this.img.onerror = function() {
        e.promise.reject(e)
      };
      this.img.onload = function() {
        if (e.img.naturalHeight == 0 || e.img.naturalWidth == 0) {
          e.promise.reject(e)
        } else {
          e.promise.resolve(e)
        }
      };
      window.setTimeout(function() {
        return e.promise.reject(e)
      }, 6e4);
      this.img.src = t
    }
    t.prototype.getPromise = function() {
      return this.promise.promise()
    };
    t.prototype.getImage = function() {
      return this.img
    };
    t.prototype.getUrl = function() {
      return this.url
    };
    return t
  }();
  t.PreloadedImage = e;
  var i = function() {
    function t() {}
    t.preload = function(t) {
      var i;
      if (arguments.length > 1) {
        i = $.makeArray(arguments)
      } else {
        i = $.isArray(arguments[0]) ? arguments[0] : [arguments[0]]
      }
      return $.when.apply($, i.map(function(t) {
        return new e(t).getPromise()
      }))
    };
    return t
  }();
  t.ImagePreloader = i
})(beam || (beam = {}));
if (!Object.create) {
  Object.create = function() {
    function t() {}
    function e(t) {}
    function i(t, e) {}
    return function(n) {
      if (arguments.length == 1) {
        t.prototype = n;
        return new t
      } else if (arguments.length == 2) {
        e.prototype = n;
        return new e(arguments[1])
      } else if (arguments.length == 3) {
        i.prototype = n;
        return new i(arguments[1], arguments[2])
      } else {
        if (arguments.length > 3) {
          throw new Error("Object.create implementation only accepts 1 to 3 parameters.")
        }
      }
    }
  }()
}
var beam;
(function(t) {
  var e = function() {
    function e() {}
    e.createInstance = function(e) {
      var i = [];
      for (var n = 1; n < arguments.length; n++) {
        i[n - 1] = arguments[n]
      }
      var s = t.JSONTool.getJsonElementByPath(window, e);
      var r = Object.create(s.prototype);
      r.constructor.apply(r, i);
      return r
    };
    return e
  }();
  t.InstanceLoader = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.shuffle = function(t) {
      for (var e, i, n = t.length; n; e = Math.floor(Math.random() * n), i = t[--n], t[n] = t[e], t[e] = i);
      return t
    };
    t.copy = function(t) {
      return t.slice(0)
    };
    t.getRandom = function(t) {
      return t[Math.floor(Math.random() * t.length)]
    };
    t.getRandomWeighted = function(t, e) {
      return t[Math.floor(1 / Math.exp(e * Math.random()) * t.length)]
    };
    t.getWeightedRandomFunction = function(e) {
      return function(i) {
        return t.getRandomWeighted(i, e)
      }
    };
    t.remove = function(t, e) {
      var i = t.indexOf(e);
      if (i != -1) {
        t.splice(i, 1)
      }
      return i
    };
    t.removeAt = function(t, e) {
      t.splice(e, 1)
    };
    t.max = function(t) {
      return Math.max.apply(null, t)
    };
    return t
  }();
  t.ArrayTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.getQueryParameters = function() {
      var t = window.location.search.substr(1).split("&");
      var e = {};
      for (var i = 0; i < t.length; ++i) {
        var n = t[i].split("=");
        if (n.length != 2) continue;
        e[n[0]] = decodeURIComponent(n[1].replace(/\+/g, " "))
      }
      return e
    };
    return t
  }();
  t.BrowserInfo = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function e() {}
    e.refresh = function(e) {
      var i = window["Socialite"];
      try {
        i.setup({
          facebook: {
            lang: "en_US",
            appId: 0xd67e65a8b0f0,
            onlike: function(e) {
              t.Analytics.trackSocialPlugin("facebook", "like", e)
            },
            onunlike: function(t) {},
            onsend: function(t) {}
          },
          twitter: {
            lang: "en",
            onclick: function(t) {},
            ontweet: function(e) {
              t.Analytics.trackSocialPlugin("twitter", "share", window.location.href)
            },
            onretweet: function(t) {},
            onfavorite: function(t) {},
            onfollow: function(t) {}
          },
          googleplus: {
            lang: "en-US",
            onstartinteraction: function(t, e) {},
            onendinteraction: function(t, e) {},
            callback: function(e, i) {
              t.Analytics.trackSocialPlugin("Google", "+1", window.location.href)
            }
          }
        });
        i.load(e)
      } catch (n) {
        t.Debug.error(n)
      }
    };
    return e
  }();
  t.SocialButtons = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.getHashCode = function(t) {
      var e = 0,
          i, n, s;
      if (this.length == 0) return e;
      for (i = 0, s = t.length; i < s; i++) {
        n = t.charCodeAt(i);
        e = (e << 5) - e + n;
        e |= 0
      }
      return e
    };
    t.numberToString = function(t, e) {
      if (e === void 0) {
        e = false
      }
      var i = e ? "." : ",";
      var n = e ? "," : ".";
      var s = t + "";
      var r = s.split(".");
      var a = r[0];
      var o = r.length > 1 ? n + r[1] : "";
      var u = /(\d+)(\d{3})/;
      while (u.test(a)) {
        a = a.replace(u, "$1" + i + "$2")
      }
      return a + o
    };
    t.dropAfterInclusive = function(t, e) {
      var i = t;
      if (t.indexOf(e) > -1) {
        i = t.substr(0, t.indexOf(e))
      }
      return i
    };
    t.trim = function(t, e) {
      var i = !e ? new RegExp("^\\s+|\\s+$", "g") : new RegExp("^" + e + "+|" + e + "+$", "g");
      return t.replace(i, "")
    };
    t.rtrim = function(t, e) {
      var i = !e ? new RegExp("\\s+$") : new RegExp(e + "+$");
      return t.replace(i, "")
    };
    t.removeURLsEndOfString = function(t) {
      var e = /(https?:\/\/[^\s]+)\s*$/g;
      while (e.test(t)) {
        t = t.replace(e, "")
      }
      return t
    };
    t.ltrim = function(t, e) {
      var i = !e ? new RegExp("^\\s+") : new RegExp("^" + e + "+");
      return t.replace(i, "")
    };
    t.utf8_encode = function(t) {
      if (t === null || typeof t === "undefined") {
        return ""
      }
      var e = t + "";
      var i = "",
          n, s, r = 0;
      n = s = 0;
      r = e.length;
      for (var a = 0; a < r; a++) {
        var o = e.charCodeAt(a);
        var u = null;
        if (o < 128) {
          s++
        } else if (o > 127 && o < 2048) {
          u = String.fromCharCode(o >> 6 | 192, o & 63 | 128)
        } else {
          u = String.fromCharCode(o >> 12 | 224, o >> 6 & 63 | 128, o & 63 | 128)
        }
        if (u !== null) {
          if (s > n) {
            i += e.slice(n, s)
          }
          i += u;
          n = s = a + 1
        }
      }
      if (s > n) {
        i += e.slice(n, r)
      }
      return i
    };
    t.crc32 = function(e) {
      e = t.utf8_encode(e);
      var i = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
      var n = 0;
      var s = 0;
      var r = 0;
      n = n ^ -1;
      for (var a = 0, o = e.length; a < o; a++) {
        r = (n ^ e.charCodeAt(a)) & 255;
        s = "0x" + i.substr(r * 9, 8);
        n = n >>> 8 ^ s
      }
      n = n ^ -1;
      if (n < 0) {
        n += 4294967296
      }
      return n
    };
    t.removeDiacritics = function(t) {
      var e = this.diacriticsRemovalMap;
      for (var i = 0; i < e.length; i++) {
        t = t.replace(e[i].letters, e[i].base)
      }
      return t
    };
    t.createRandomId = function(t) {
      if (t === void 0) {
        t = 5
      }
      var e = "";
      var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var n = 0; n < t; n++) {
        e += i.charAt(Math.floor(Math.random() * i.length))
      }
      return e
    };
    t.diacriticsRemovalMap = [{
      base: "A",
      letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
    }, {
      base: "AA",
      letters: /[\uA732]/g
    }, {
      base: "AE",
      letters: /[\u00C6\u01FC\u01E2]/g
    }, {
      base: "AO",
      letters: /[\uA734]/g
    }, {
      base: "AU",
      letters: /[\uA736]/g
    }, {
      base: "AV",
      letters: /[\uA738\uA73A]/g
    }, {
      base: "AY",
      letters: /[\uA73C]/g
    }, {
      base: "B",
      letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
    }, {
      base: "C",
      letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
    }, {
      base: "D",
      letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
    }, {
      base: "DZ",
      letters: /[\u01F1\u01C4]/g
    }, {
      base: "Dz",
      letters: /[\u01F2\u01C5]/g
    }, {
      base: "E",
      letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
    }, {
      base: "F",
      letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
    }, {
      base: "G",
      letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
    }, {
      base: "H",
      letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
    }, {
      base: "I",
      letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
    }, {
      base: "J",
      letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
    }, {
      base: "K",
      letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
    }, {
      base: "L",
      letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
    }, {
      base: "LJ",
      letters: /[\u01C7]/g
    }, {
      base: "Lj",
      letters: /[\u01C8]/g
    }, {
      base: "M",
      letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
    }, {
      base: "N",
      letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
    }, {
      base: "NJ",
      letters: /[\u01CA]/g
    }, {
      base: "Nj",
      letters: /[\u01CB]/g
    }, {
      base: "O",
      letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
    }, {
      base: "OI",
      letters: /[\u01A2]/g
    }, {
      base: "OO",
      letters: /[\uA74E]/g
    }, {
      base: "OU",
      letters: /[\u0222]/g
    }, {
      base: "P",
      letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
    }, {
      base: "Q",
      letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
    }, {
      base: "R",
      letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
    }, {
      base: "S",
      letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
    }, {
      base: "T",
      letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
    }, {
      base: "TZ",
      letters: /[\uA728]/g
    }, {
      base: "U",
      letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
    }, {
      base: "V",
      letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
    }, {
      base: "VY",
      letters: /[\uA760]/g
    }, {
      base: "W",
      letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
    }, {
      base: "X",
      letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
    }, {
      base: "Y",
      letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
    }, {
      base: "Z",
      letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
    }, {
      base: "a",
      letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
    }, {
      base: "aa",
      letters: /[\uA733]/g
    }, {
      base: "ae",
      letters: /[\u00E6\u01FD\u01E3]/g
    }, {
      base: "ao",
      letters: /[\uA735]/g
    }, {
      base: "au",
      letters: /[\uA737]/g
    }, {
      base: "av",
      letters: /[\uA739\uA73B]/g
    }, {
      base: "ay",
      letters: /[\uA73D]/g
    }, {
      base: "b",
      letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
    }, {
      base: "c",
      letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
    }, {
      base: "d",
      letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
    }, {
      base: "dz",
      letters: /[\u01F3\u01C6]/g
    }, {
      base: "e",
      letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
    }, {
      base: "f",
      letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
    }, {
      base: "g",
      letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
    }, {
      base: "h",
      letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
    }, {
      base: "hv",
      letters: /[\u0195]/g
    }, {
      base: "i",
      letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
    }, {
      base: "j",
      letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
    }, {
      base: "k",
      letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
    }, {
      base: "l",
      letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
    }, {
      base: "lj",
      letters: /[\u01C9]/g
    }, {
      base: "m",
      letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
    }, {
      base: "n",
      letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
    }, {
      base: "nj",
      letters: /[\u01CC]/g
    }, {
      base: "o",
      letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
    }, {
      base: "oi",
      letters: /[\u01A3]/g
    }, {
      base: "ou",
      letters: /[\u0223]/g
    }, {
      base: "oo",
      letters: /[\uA74F]/g
    }, {
      base: "p",
      letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
    }, {
      base: "q",
      letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
    }, {
      base: "r",
      letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
    }, {
      base: "s",
      letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
    }, {
      base: "t",
      letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
    }, {
      base: "tz",
      letters: /[\uA729]/g
    }, {
      base: "u",
      letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
    }, {
      base: "v",
      letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
    }, {
      base: "vy",
      letters: /[\uA761]/g
    }, {
      base: "w",
      letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
    }, {
      base: "x",
      letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
    }, {
      base: "y",
      letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
    }, {
      base: "z",
      letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
    }];
    return t
  }();
  t.StringTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function e() {
      this.unsafe = ["view.classic.branding_settings", "view.classic.branding_style", "view.classic.branding_content", "view.classic.licensed"]
    }
    e.prototype.isNumber = function(t) {
      return !isNaN(parseFloat(t)) && isFinite(t)
    };
    e.prototype.getObjectFromProps = function(t) {
      var e = {};
      for (var i in t) {
        if (this.unsafe.indexOf(i) > -1) {
          continue
        }
        var n = i.split(".");
        var s = e;
        for (var r = 0; r < n.length - 1; r++) {
          if (!s[n[r]]) {
            s[n[r]] = {}
          }
          s = s[n[r]]
        }
        var a = t[i];
        if (this.isNumber(a)) {
          a = parseFloat(a)
        } else if (a == "true") {
          a = true
        } else if (a == "false") {
          a = false
        }
        s[n[n.length - 1]] = a
      }
      return e
    };
    e.prototype.load = function(e, i) {
      var n = this;
      $.getJSON(e, function(e) {
        var s = t.BrowserInfo.getQueryParameters();
        if (s) {
          e = $.extend(true, {}, e, n.getObjectFromProps(s))
        }
        i(e)
      }).fail(function(e, i, n) {
        t.Debug.error("unable to load settings", i)
      })
    };
    return e
  }();
  t.SettingsLoader = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function e(e, i) {
      var n = this;
      if (i === void 0) {
        i = null
      }
      this.settingsLoader = new t.SettingsLoader;
      this.requestsDone = 0;
      this.enableRequestAnimationFrame();
      if (typeof Handlebars !== "undefined") {
        t.HandlebarsTool.registerHelpers()
      }
      if (i) {
        this.onSettingsLoaded(i)
      } else {
        this.settingsLocation = e;
        if (this.settingsLocation.indexOf("http") > -1 && window.location.host.indexOf("localhost") > -1) {
          this.settingsLocation = "http://localhost:3000/?" + this.settingsLocation
        }
        if (this.settingsLocation.indexOf("?") > -1) {
          this.settingsLocation += "&"
        } else {
          this.settingsLocation += "?"
        }
        this.settingsLoader.load(this.getUrl(), function(t) {
          return n.onSettingsLoaded(t)
        })
      }
    }
    e.prototype.getUrl = function() {
      return this.settingsLocation + "rnd=" + Math.random() + "&c=" + this.requestsDone+++"&s=" + e.SESSION_ID
    };
    e.prototype.onSettingsLoaded = function(e) {
      var i = this;
      $(".beam-loading").remove();
      var n = e["view"]["type"];
      if (e["messageprovider"]) {
        var s = e["messageprovider"]["type"];
        this.messageProvider = t.InstanceLoader.createInstance(s, e["messageprovider"])
      }
      this.view = t.InstanceLoader.createInstance(n, this.messageProvider, e["view"]);
      t.Debug.log("settings loaded");
      var r = 3e4;
      if (e["settings_refresh"]) {
        r = parseInt(e["settings_refresh"])
      }
      if (this.settingsLocation) {
        window.setInterval(function() {
          return i.settingsLoader.load(i.getUrl(), function(t) {
            return i.onSettingsRefresh(t)
          })
        }, r)
      }
    };
    e.prototype.onSettingsRefresh = function(t) {
      if (this.messageProvider) {
        this.messageProvider.updateSettings(t["messageprovider"])
      }
    };
    e.prototype.enableRequestAnimationFrame = function() {
      (function() {
        var t = 0;
        var e = ["ms", "moz", "webkit", "o"];
        for (var i = 0; i < e.length && !window.requestAnimationFrame; ++i) {
          window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"];
          window.cancelAnimationFrame = window[e[i] + "CancelRequestAnimationFrame"]
        }
        if (!window.requestAnimationFrame) window.requestAnimationFrame = function(e) {
          var i = (new Date).getTime();
          var n = Math.max(0, 16 - (i - t));
          var s = window.setTimeout(function() {
            e(i + n)
          }, n);
          t = i + n;
          return s
        };
        if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(t) {
          clearTimeout(t)
        }
      })()
    };
    e.ROOT = "";
    e.SESSION_ID = t.StringTool.createRandomId();
    return e
  }();
  t.App = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function e() {
      this.id = Math.random() + "";
      this.globalIds = [];
      this.originalObject = null;
      this.screenNamePrefix = ""
    }
    e.prototype.getURL = function() {
      return "about:blank"
    };
    e.prototype.hasEmbeddedImage = function() {
      return typeof this.embeddedImageUrl !== "undefined" && this.embeddedImageUrl != null
    };
    e.prototype.getPrimaryImageUrl = function() {
      return this.hasEmbeddedImage() ? this.embeddedImageUrl : this.userImageUrl
    };
    e.prototype.getUserImageUrl = function() {
      return this.userImageUrl
    };
    e.prototype.getUserImageUrlViaTBProxy = function(e, i) {
      return t.ImageProxy.getTweetBeamUrl(this.getUserImageUrl(), e, i)
    };
    e.prototype.toString = function() {
      return this.id
    };
    e.prototype.getUserName = function() {
      return this.user
    };
    e.prototype.getScreenName = function() {
      return this.user
    };
    e.prototype.getMessage = function(t) {
      var e = this.message;
      if (t && e.length > t) {
        e = e.substr(0, t) + "â€¦"
      }
      return e
    };
    e.prototype.getMessage160 = function() {
      return this.getMessage(160)
    };
    e.prototype.getMessageTrimmedRemoveURLsEnd = function(e) {
      var i = this.getMessage(e);
      i = t.StringTool.removeURLsEndOfString(i);
      if (i.length < 5) {
        i = this.getMessage(e)
      }
      return i
    };
    e.prototype.getMessage160TrimmedRemoveURLsEnd = function() {
      return this.getMessageTrimmedRemoveURLsEnd(160)
    };
    e.prototype.getHTMLMessage = function(t) {
      return this.getMessage(t)
    };
    e.prototype.getTimeAgo = function() {
      return t.DateTool.timeAgo(this.date)
    };
    e.prototype.getTimeAgoNL = function() {
      return t.DateTool.timeAgoNL(this.date)
    };
    e.prototype.getNLDate = function() {
      return this.date.getDate() + " " + t.DateTool.getMonthNameNL(this.date).toLowerCase()
    };
    e.prototype.getTime = function() {
      var t = this.date.getHours() + ":";
      var e = this.date.getMinutes();
      if (e < 10) {
        t += "0"
      }
      t += e;
      return t
    };
    e.prototype.getSociconClass = function() {
      return null
    };
    return e
  }();
  t.Message = e
})(beam || (beam = {}));
var __extends = this && this.__extends ||
function(t, e) {
  for (var i in e) if (e.hasOwnProperty(i)) t[i] = e[i];

  function n() {
    this.constructor = t
  }
  n.prototype = e.prototype;
  t.prototype = new n
};
var beam;
(function(t) {
  var e = function(e) {
    __extends(i, e);

    function i(i, n) {
      if (n === void 0) {
        n = true
      }
      e.call(this);
      if (i["retweeted_status"] && n) {
        i = i["retweeted_status"]
      }
      this.tweetObject = i;
      this.user = i["user"]["screen_name"];
      this.id = i["id_str"];
      this.globalIds.push(this.id);
      this.userImageUrl = i["user"]["profile_image_url"].replace("_normal", "");
      this.date = t.DateTool.parseTwitterDate(i["created_at"]);
      this.message = i["text"];
      this.message = this.message.replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
      this.setupImageUrl();
      this.screenNamePrefix = "@"
    }
    i.prototype.getMessage = function(t, e) {
      if (e === void 0) {
        e = true
      }
      var i = this.message;
      if (e) {
        i = this.replaceURLsWithEntityDisplayUrl(i, this.tweetObject["entities"]["urls"]);
        i = this.replaceURLsWithEntityDisplayUrl(i, this.tweetObject["entities"]["media"])
      }
      if (t && i.length > t) {
        i = i.substr(0, t) + "â€¦"
      }
      return i
    };
    i.prototype.getMessageTrimmedRemoveURLsEnd = function(e) {
      var i = this.getMessage(e, false);
      i = t.StringTool.removeURLsEndOfString(i);
      i = this.replaceURLsWithEntityDisplayUrl(i, this.tweetObject["entities"]["urls"]);
      i = this.replaceURLsWithEntityDisplayUrl(i, this.tweetObject["entities"]["media"]);
      if (i.length < 5) {
        i = this.getMessage(e)
      }
      return i
    };
    i.prototype.replaceURLsWithEntityDisplayUrl = function(t, e) {
      if (!e || !e.length) {
        return t
      }
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        if (n.url && n.display_url) {
          t = t.replace(n.url, n.display_url)
        }
      }
      return t
    };
    i.prototype.setupImageUrl = function() {
      var t = this.getImageUrlFromString(this.message);
      if (t === null) {
        t = this.getPhotoEntityUrl();
        if (t === null) {
          var e = this.getEntityUrls();
          for (var i = 0; i < e.length; i++) {
            t = this.getImageUrlFromString(e[i]);
            if (t != null) {
              break
            }
          }
        }
      }
      if (t != null) {
        this.embeddedImageUrl = t
      }
    };
    i.prototype.getEntityUrls = function() {
      var t = [];
      try {
        for (var e in this.tweetObject["entities"]["urls"]) {
          t.push(this.tweetObject["entities"]["urls"][e]["expanded_url"])
        }
      } catch (i) {}
      return t
    };
    i.prototype.getPhotoEntityUrl = function() {
      try {
        var t = this.tweetObject["entities"]["media"];
        if (t) {
          for (var e = 0; e < t.length; e++) {
            if (t[e]["type"] === "photo") {
              var i = t[e]["media_url"];
              if (t[e]["sizes"] && t[e]["sizes"]["large"] && t[e]["sizes"]["large"]["resize"] == "fit") {
                i += ":large"
              }
              return i
            }
          }
        }
      } catch (n) {}
      return null
    };
    i.prototype.getImageUrlFromString = function(t) {
      var e = null;
      var i = /twitpic\.com\/(\w+)/gi.exec(t);
      if (i) {
        return "http://twitpic.com/show/thumb/" + i[1]
      }
      i = /p\.twimg\.com\/(\w+)\.(jpg|png)\b/gi.exec(t);
      if (i) {
        return "http://p.twimg.com/" + i[1] + "." + i[2]
      }
      i = /(\w+)\.twimg\.com\/media\/(\w+)\.(jpg|png)\b/gi.exec(t);
      if (i) {
        return "http://" + i[1] + ".twimg.com/media/" + i[2] + "." + i[3]
      }
      i = /instagr\.am\/p\/([-_\w]+)/gi.exec(t);
      if (!i) {
        i = /instagram\.com\/p\/([-_\w]+)/gi.exec(t)
      }
      if (i) {
        this.globalIds.push(i[1]);
        return "http://instagram.com/p/" + i[1] + "/media/"
      }
      i = /yfrog\.com\/(\w+)j\b/gi.exec(t);
      if (i) {
        return "http://yfrog.com/" + i[1] + "j:iphone"
      }
      return e
    };
    i.prototype.parseURLs = function(t) {
      var e = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var i = t.match(e);
      if (i == null) return t;
      for (var n in i) {
        var s = '<a href="' + i[n] + '">' + i[n] + "</a>";
        t = t.replace(i[n], s)
      }
      return t
    };
    i.prototype.getURL = function() {
      return "http://twitter.com/" + this.user + "/statuses/" + this.id
    };
    i.prototype.getUserName = function() {
      try {
        return this.tweetObject["user"]["name"]
      } catch (t) {
        return this.getScreenName()
      }
    };
    i.prototype.getUserImageUrlViaTBProxy = function(e, i) {
      return t.ImageProxy.getTweetBeamUrl(this.getUserImageUrl(), e, i, this.getScreenName())
    };
    i.prototype.getHTMLMessage = function(t) {
      if (window["twttrTxt"] && window["twttrTxt"].txt) {
        return window.twttrTxt.txt.autoLinkWithJSON(this.tweetObject["text"], this.tweetObject["entities"])
      } else {
        return e.prototype.getHTMLMessage.call(this, t)
      }
    };
    i.prototype.isVerifiedUser = function() {
      return this.tweetObject["user"]["verified"]
    };
    i.prototype.isTweet = function() {
      return true
    };
    i.prototype.getSociconClass = function() {
      return "socicon socicon-twitter"
    };
    return i
  }(t.Message);
  t.TwitterMessage = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function(t) {
    __extends(e, t);

    function e(e) {
      t.call(this);
      this.instagramObject = e;
      this.userImageUrl;
      this.user = e.user.username;
      this.id = e.id;
      this.userImageUrl = e.user.profile_picture;
      this.date = new Date(e.created_time * 1e3);
      if (e.caption) {
        this.message = e.caption.text
      } else {
        this.message = "#" + e.tags.join(" #")
      }
      this.embeddedImageUrl = e.images.standard_resolution.url;
      this.globalIds = [this.id];
      var i = /instagram\.com\/p\/([-_\w]+)/gi.exec(e.link);
      if (i) {
        this.globalIds.push(i[0])
      }
    }
    e.prototype.getURL = function() {
      return this.instagramObject.link
    };
    e.prototype.getSociconClass = function() {
      return "socicon socicon-instagram"
    };
    e.prototype.getHTMLMessage = function(e) {
      if (window["twttrTxt"] && window["twttrTxt"].txt) {
        var i = {
          hashtagUrlBase: "https://instagram.com/explore/tags/",
          usernameUrlBase: "https://instagram.com/"
        };
        return window.twttrTxt.txt.autoLink(this.message, i)
      } else {
        return t.prototype.getHTMLMessage.call(this, e)
      }
    };
    return e
  }(t.Message);
  t.InstagramMessage = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i = function() {
      function t() {
        this.block_words = "";
        this.block_users = "";
        this.blocked_message_ids = [];
        this.highlight_message = null
      }
      return t
    }();
    var n = function() {
      function n(e) {
        this.block_words_split = null;
        this.block_users_split = null;
        this.firstPolling = true;
        this.settings = $.extend({}, new i, e);
        this.updateSplitFromSettings();
        this.block_messages_ids_set = t.CollectionTool.setFromArray(this.settings.blocked_message_ids);
        if (this.settings.highlight_message != null) {
          this.highlight_message_id = this.settings.highlight_message.original_id
        }
      }
      n.prototype.updateSplitFromSettings = function() {
        this.block_words_split = this.settings.block_words.trim().toLowerCase().split(/[\s,]*,[\s,]*/);
        this.block_users_split = this.settings.block_users.trim().toLowerCase().split(/[\s,]*,[\s,]*/)
      };
      n.prototype.start = function(t) {
        throw new Error("This method is abstract")
      };
      n.prototype.reset = function() {
        this.messageCallback = null;
        this.highlightCallback = null;
        this.filterChangedCallback = null;
        this.firstPolling = true
      };
      n.prototype.updateSettings = function(e) {
        var n = $.extend({}, new i, e);
        var s = t.CollectionTool.setFromArray(n.blocked_message_ids);
        var r = n.block_users != this.settings.block_users || n.block_words != this.settings.block_words || !t.CollectionTool.setEquals(s, this.block_messages_ids_set);
        var a = null;
        if (n.highlight_message != null) {
          a = n.highlight_message.original_id
        }
        if (r || a != this.highlight_message_id) {
          this.settings = n;
          if (a != this.highlight_message_id) {
            this.highlight_message_id = a;
            this.updateHighlightedMessageFromSettings()
          }
          if (r) {
            this.block_messages_ids_set = s;
            this.updateSplitFromSettings();
            if (this.filterChangedCallback != null) {
              try {
                this.filterChangedCallback()
              } catch (o) {
                t.Debug.error(o)
              }
            }
          }
        }
      };
      n.prototype.updateHighlightedMessageFromSettings = function() {
        var t = null;
        if (this.settings.highlight_message != null) {
          t = e.APIMessageProvider.getMessageFromJson(this.settings.highlight_message, true)
        }
        this.raiseHighlightCallback(t)
      };
      n.prototype.removeBlockedMessage = function(t) {
        if (t.originalObject && t.originalObject._id) {
          this.block_messages_ids_set.remove(t.originalObject._id)
        }
      };
      n.prototype.setNoMessagesCallback = function(t) {
        this.onNoMessagesCallback = t
      };
      n.prototype.setMessagesCallback = function(t) {
        this.messageCallback = t
      };
      n.prototype.setHighlightCallback = function(t) {
        this.highlightCallback = t
      };
      n.prototype.setFilterChangedCallback = function(t) {
        this.filterChangedCallback = t
      };
      n.prototype.raiseNoMessagesCallback = function() {
        if (this.onNoMessagesCallback != null) {
          try {
            this.onNoMessagesCallback()
          } catch (e) {
            t.Debug.error(e)
          }
        }
      };
      n.prototype.raiseHighlightCallback = function(e) {
        if (this.highlightCallback != null) {
          try {
            this.highlightCallback(e)
          } catch (i) {
            t.Debug.error(i)
          }
        }
      };
      n.prototype.raiseMessagesCallback = function(e) {
        if (this.firstPolling && this.highlight_message_id != null) {
          this.updateHighlightedMessageFromSettings()
        }
        if (this.messageCallback != null) {
          if (e.length > 0) {
            try {
              this.messageCallback(e)
            } catch (i) {
              t.Debug.error(i)
            }
          } else {
            if (this.firstPolling) {
              this.raiseNoMessagesCallback()
            }
          }
        }
        this.firstPolling = false
      };
      n.prototype.removedByFilter = function(t) {};
      n.prototype.passesFilter = function(t) {
        if (t.originalObject && t.originalObject._id) {
          if (this.block_messages_ids_set.contains(t.originalObject._id)) {
            return false
          }
        }
        var e = t.user.toLowerCase().trim();
        for (var i = 0; i < this.block_users_split.length; i++) {
          if (this.block_users_split[i].length > 0 && e == this.block_users_split[i]) {
            return false
          }
        }
        var n = t.message.toLowerCase();
        for (var i = 0; i < this.block_words_split.length; i++) {
          if (this.block_words_split[i].length > 0 && n.indexOf(this.block_words_split[i]) > -1) {
            return false
          }
        }
        return true
      };
      return n
    }();
    e.MessageProvider = n
  })(e = t.messageprovider || (t.messageprovider = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i = function() {
      function t() {}
      return t
    }();
    var n = function() {
      function t() {
        this.no_messages = false;
        this.interval = 5e3;
        this.min_messages = 0;
        this.max_messages = 10
      }
      return t
    }();
    var s = function(e) {
      __extends(i, e);

      function i(t) {
        e.call(this, t);
        this.images = [this.getBase() + "view/classic/res/default_1.png", this.getBase() + "view/classic/res/default_2.png", this.getBase() + "view/classic/res/default_3.png"];
        this.dummySettings = $.extend({}, new n, t["dummymessageprovider"])
      }
      i.prototype.getBase = function() {
        return "http://www.tweetbeam.com/test3/"
      };
      i.prototype.schedule = function(t, e) {
        var i = this;
        setTimeout(function() {
          return i.raiseMessagesCallback(t)
        }, e)
      };
      i.prototype.start = function(e) {
        this.checkForMessages();
        if (this.dummySettings.timeline) {
          for (var i = 0; i < this.dummySettings.timeline.length; i++) {
            var n = this.dummySettings.timeline[i];
            var s = n.messages.map(function(e) {
              return $.extend(new t.Message, e)
            });
            this.schedule(s, n.timestamp)
          }
        }
      };
      i.prototype.reset = function() {};
      i.prototype.checkForMessages = function() {
        var t = this;
        if (this.dummySettings.no_messages) {
          return
        }
        this.raiseMessagesCallback(this.randomMessagesPlease(Math.floor(Math.random() * this.dummySettings.min_messages) + this.dummySettings.max_messages));
        setTimeout(function() {
          return t.checkForMessages()
        }, this.dummySettings.interval)
      };
      i.prototype.randomMessage = function() {
        var e = new t.Message;
        e.message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non ante a nisi aliquam porta in non turpis.";
        e.user = "user" + Math.floor(Math.random() * 1337);
        e.userImageUrl = this.images[Math.floor(this.images.length * Math.random())];
        return e
      };
      i.prototype.randomMessagesPlease = function(t) {
        var e = [];
        for (var i = 0; i < t; i++) {
          var n = this.randomMessage();
          if (this.passesFilter(n)) {
            e.push(n)
          }
        }
        return e
      };
      return i
    }(e.MessageProvider);
    e.DummyMessageProvider = s
  })(e = t.messageprovider || (t.messageprovider = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i = function() {
      function t() {
        this.search = null;
        this.language = null;
        this.list = null;
        this.home = false;
        this.include_retweets = false;
        this.pictures_only = false;
        this.poll_interval = 3e4;
        this.retweets_as_original = true
      }
      return t
    }();
    var n = function(e) {
      __extends(n, e);

      function n(t) {
        e.call(this, t);
        this.base_url = window.location.host.indexOf("localhost") > -1 ? "https://quiet-basin-6088.herokuapp.com/http://www.tweetbeam.com/2/messages" : window.location.host.indexOf("afwall.herokuapp.com") > -1 ? "https://quiet-basin-6088.herokuapp.com/http://www.tweetbeam.com/2/messages" : "https://quiet-basin-6088.herokuapp.com/http://www.tweetbeam.com/2/messages";
        this.sinceId = null;
        this.pollingIntervalID = 0;
        this.twitterSettings = $.extend({}, new i, t["twittermessageprovider"])
      }
      n.prototype.start = function(t) {
        this.poll()
      };
      n.prototype.reset = function() {
        e.prototype.reset.call(this);
        if (this.pendingXhr != null) {
          var t = this.pendingXhr;
          this.pendingXhr = null;
          t.abort("abort")
        }
        this.sinceId = null;
        clearTimeout(this.pollingIntervalID)
      };
      n.prototype.parseTweetsAndFilter = function(e) {
        var i = [];
        for (var n = 0; n < e["length"]; n++) {
          var s = e[n];
          var r = new t.TwitterMessage(s, this.twitterSettings.retweets_as_original);
          if (this.passesFilter(r)) {
            i.push(r)
          }
        }
        return i
      };
      n.prototype.onTweets = function(t) {
        try {
          this.sinceId = t["next_since_id"];
          var e = this.parseTweetsAndFilter(t["messages"]);
          this.raiseMessagesCallback(e)
        } catch (i) {}
      };
      n.prototype.setNextPoll = function() {
        var t = this;
        if (this.pendingXhr != null) {
          this.pendingXhr = null;
          this.pollingIntervalID = setTimeout(function() {
            return t.poll()
          }, this.twitterSettings.poll_interval)
        }
      };
      n.prototype.poll = function() {
        var e = this;
        t.Debug.log("polling tweets");
        this.pendingXhr = $.getJSON(this.buildURL(), function(t) {
          return e.onTweets(t)
        });
        this.pendingXhr.always(function(t) {
          return e.setNextPoll()
        })
      };
      n.prototype.encodeQueryData = function(t) {
        var e = [];
        for (var i in t) {
          if (t[i] != null) {
            e.push(encodeURIComponent(i) + "=" + encodeURIComponent(t[i]))
          }
        }
        return e.join("&")
      };
      n.prototype.buildURL = function() {
        var t = $.extend({}, this.twitterSettings);
        delete t["poll_interval"];
        t.since_id = this.sinceId;
        return this.base_url + "?" + this.encodeQueryData(t)
      };
      n.prototype.passesFilter = function(t) {
        if (!this.twitterSettings.include_retweets) {
          if (/\bRT\b/i.test(t.message)) {
            return false
          }
        }
        if (this.twitterSettings.pictures_only && !t.hasEmbeddedImage()) {
          return false
        }
        return e.prototype.passesFilter.call(this, t)
      };
      return n
    }(e.MessageProvider);
    e.TwitterMessageProvider = n
  })(e = t.messageprovider || (t.messageprovider = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i = function() {
      function t() {}
      return t
    }();
    var n = function() {
      function t() {
        this.pictures_only = false;
        this.poll_interval = 3e4;
        this.retweets_as_original = false;
        this.prevent_duplicate_messages = true
      }
      return t
    }();
    var s = function(e) {
      __extends(i, e);

      function i(t) {
        e.call(this, t);
        this.base_url = window.location.host.indexOf("localhost") > -1 ? "https://quiet-basin-6088.herokuapp.com/http://www.tweetbeam.com/2/messages" : window.location.host.indexOf("afwall.herokuapp.com") > -1 ? "https://quiet-basin-6088.herokuapp.com/http://www.tweetbeam.com/2/messages" : "https://quiet-basin-6088.herokuapp.com/http://www.tweetbeam.com/2/messages";
        this.pollingIntervalID = 0;
        this.next_request = null;
        this.sessionCount = 0;
        this.requestCount = 0;
        this.apiSettings = $.extend({}, new n, t["apimessageprovider"]);
        this.next_request = this.apiSettings.api_request
      }
      i.prototype.start = function(t) {
        this.startCount = t;
        this.poll()
      };
      i.prototype.reset = function() {
        e.prototype.reset.call(this);
        if (this.pendingXhr != null) {
          var t = this.pendingXhr;
          this.pendingXhr = null;
          t.abort("abort")
        }
        this.next_request = this.apiSettings.api_request;
        this.seenIds = {};
        clearTimeout(this.pollingIntervalID);
        this.sessionCount++;
        this.requestCount = 0
      };
      i.prototype.hasSeen = function(t) {
        var e = false;
        for (var i = 0; i < t.globalIds.length; i++) {
          if (this.seenIds[t.globalIds[i]]) {
            return true
          }
        }
        for (var i = 0; i < t.globalIds.length; i++) {
          this.seenIds[t.globalIds[i]] = true
        }
        return false
      };
      i.prototype.undoHasSeen = function(t) {
        for (var e = 0; e < t.globalIds.length; e++) {
          delete this.seenIds[t.globalIds[e]]
        }
      };
      i.prototype.parseMessagesAndFilter = function(t) {
        var e = [];
        for (var n = 0; n < t.length; n++) {
          var s = i.getMessageFromJson(t[n], this.apiSettings.retweets_as_original);
          this.removeBlockedMessage(s);
          if (this.passesFilter(s) && (!this.apiSettings.prevent_duplicate_messages || !this.hasSeen(s))) {
            e.push(s)
          }
        }
        return e
      };
      i.getMessageFromJson = function(e, i) {
        var n = null;
        var s = e["status_type"];
        if (s == "tweet") {
          n = new t.TwitterMessage(e["tweet"], i)
        } else if (s == "instagram") {
          n = new t.InstagramMessage(e["instagram"])
        } else if (s == "mailgun") {
          n = new t.MailgunMessage(e)
        } else if (s == "feeditem") {
          n = new t.FeedItemMessage(e)
        } else if (s == "youtube") {
          n = new t.YoutubeMessage(e)
        }
        if (n != null) {
          n.originalObject = e
        }
        return n
      };
      i.prototype.onResponse = function(e) {
        try {
          this.next_request = e["next_request"];
          var i = this.parseMessagesAndFilter(e["messages"]);
          this.raiseMessagesCallback(i)
        } catch (n) {
          t.Debug.error(n)
        }
      };
      i.prototype.setNextPoll = function() {
        var t = this;
        if (this.pendingXhr != null) {
          this.pendingXhr = null;
          this.pollingIntervalID = setTimeout(function() {
            return t.poll()
          }, this.apiSettings.poll_interval)
        }
      };
      i.prototype.poll = function() {
        var e = this;
        t.Debug.log("polling tweets");
        if (this.firstPolling) {
          this.next_request.count = this.startCount
        } else {
          this.next_request.count = null
        }
        this.pendingXhr = $.post(this.buildURL(), {
          payload: JSON.stringify(this.next_request)
        }, function(t) {
          return e.onResponse(t)
        });
        this.pendingXhr.always(function(t) {
          return e.setNextPoll()
        })
      };
      i.prototype.buildURL = function() {
        return this.base_url + "?s=" + t.App.SESSION_ID + "&sc=" + this.sessionCount + "&rc=" + this.requestCount++
      };
      i.prototype.removedByFilter = function(t) {
        if (t) {
          for (var i = 0; i < t.length; i++) {
            this.undoHasSeen(t[i])
          }
        }
        e.prototype.removedByFilter.call(this, t)
      };
      i.prototype.passesFilter = function(t) {
        if (this.apiSettings.pictures_only && !t.hasEmbeddedImage()) {
          return false
        }
        return e.prototype.passesFilter.call(this, t)
      };
      return i
    }(e.MessageProvider);
    e.APIMessageProvider = s
  })(e = t.messageprovider || (t.messageprovider = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e = function() {
      function t() {}
      t.prototype.start = function() {
        throw new Error("This method is abstract")
      };
      t.prototype.reset = function() {
        throw new Error("This method is abstract")
      };
      t.prototype.setDataCallback = function(t) {
        throw new Error("This method is abstract")
      };
      return t
    }();
    t.DataProvider = e
  })(e = t.messageprovider || (t.messageprovider = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i = function() {
      function t() {
        this.poll_interval = 3e4
      }
      return t
    }();
    var n = function(e) {
      __extends(n, e);

      function n(t) {
        e.call(this);
        this.pollingIntervalID = 0;
        this.settings = $.extend({}, new i, t)
      }
      n.prototype.start = function() {
        var t = this;
        window.setTimeout(function() {
          return t.raiseDataCallback(t.settings.data)
        }, 0)
      };
      n.prototype.reset = function() {
        this.dataCallback = null
      };
      n.prototype.setDataCallback = function(t) {
        this.dataCallback = t
      };
      n.prototype.raiseDataCallback = function(e) {
        if (this.dataCallback != null) {
          try {
            this.dataCallback(e)
          } catch (i) {
            t.Debug.error(i)
          }
        }
      };
      return n
    }(e.DataProvider);
    e.StaticDataProvider = n
  })(e = t.messageprovider || (t.messageprovider = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i = function() {
      function t() {
        this.poll_interval = 3e4
      }
      return t
    }();
    var n = function(e) {
      __extends(n, e);

      function n(t) {
        e.call(this);
        this.base_url = window.location.host.indexOf("localhost") > -1 ? "http://localhost:8080/2/data" : window.location.host.indexOf("staging.tweetbeam.com") > -1 ? "http://staging.tweetbeam.com/2/data" : "http://www.tweetbeam.com/2/data";
        this.sessionCount = 0;
        this.requestCount = 0;
        this.pollingIntervalID = 0;
        this.previousData = null;
        this.settings = $.extend({}, new i, t)
      }
      n.prototype.start = function() {
        this.poll()
      };
      n.prototype.reset = function() {
        this.dataCallback = null;
        this.sessionCount++;
        this.requestCount = 0;
        this.previousData = null;
        clearTimeout(this.pollingIntervalID);
        if (this.pendingXhr != null) {
          var t = this.pendingXhr;
          this.pendingXhr = null;
          t.abort("abort")
        }
      };
      n.prototype.setDataCallback = function(t) {
        this.dataCallback = t
      };
      n.prototype.raiseDataCallback = function(e) {
        if (this.dataCallback != null) {
          try {
            this.dataCallback(e)
          } catch (i) {
            t.Debug.error(i)
          }
        }
      };
      n.prototype.onResponse = function(e) {
        try {
          if (this.settings.data_path) {
            e = t.JSONTool.getJsonElementByPath(e, this.settings.data_path)
          }
          var i = JSON.stringify(e);
          if (this.previousData != i) {
            this.previousData = i;
            t.Debug.log("data changed");
            this.raiseDataCallback(e)
          }
        } catch (n) {
          t.Debug.error(n)
        }
      };
      n.prototype.setNextPoll = function() {
        var t = this;
        if (this.pendingXhr != null) {
          this.pendingXhr = null;
          if (this.settings.poll_interval > 0) {
            this.pollingIntervalID = setTimeout(function() {
              return t.poll()
            }, this.settings.poll_interval)
          }
        }
      };
      n.prototype.buildURL = function() {
        return this.base_url + "?s=" + t.App.SESSION_ID + "&sc=" + this.sessionCount + "&rc=" + this.requestCount++
      };
      n.prototype.poll = function() {
        var e = this;
        t.Debug.log("polling data");
        this.pendingXhr = $.post(this.buildURL(), {
          payload: JSON.stringify(this.settings.api_request)
        }, function(t) {
          return e.onResponse(t)
        });
        this.pendingXhr.always(function(t) {
          return e.setNextPoll()
        })
      };
      return n
    }(e.DataProvider);
    e.APIDataProvider = n
  })(e = t.messageprovider || (t.messageprovider = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e() {
          this.highlight_resume_time = 5e3;
          this.highlight_interval = 1e4;
          this.highlight_start_time = 2500;
          this.small_mode_width = 500;
          this.swap_interval = 500;
          this.highlight_debug = false;
          this.unhighlight_after_time = -1;
          this.background_items = new t.components.grid.backgrounditem.Settings;
          this.message_custom = null;
          this.message_prefix = "Tag your tweets with";
          this.message_tag = "";
          this.branding_settings = null;
          this.branding_content = null;
          this.branding_style = null
        }
        return e
      }();
      e.Settings = i
    })(i = e.base || (e.base = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(e) {
        __extends(i, e);

        function i() {
          e.apply(this, arguments);
          this.highlight_start_time = 2e3;
          this.highlight_interval = 11e3;
          this.highlight_resume_time = 18e3;
          this.highlight_clip_time = 500;
          this.unhighlight_clip_time = 300;
          this.unhighlight_after_time = 8e3;
          this.background_items = $.extend(new t.components.grid.backgrounditem.Settings, {
            swap_fade_in_time: 500
          });
          this.split_chars = true;
          this.background_images = null
        }
        return i
      }(e.base.Settings);
      i.Settings = n
    })(i = e.lens || (e.lens = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t() {}
        return t
      }();
      t.Settings = e
    })(e = t.radar || (t.radar = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t() {
          this.fullscreen = false;
          this.fps = 30;
          this.timescale = null;
          this.primary_color = "#3a92c8";
          this.secondary_color = "white";
          this.latitude = 4.8922;
          this.longitude = 52.3731;
          this.eventname = null;
          this.eventdate = null;
          this.eventhashtag = null;
          this.count_users = 0;
          this.count_tweets = 0;
          this.count_impressions = 0;
          this.count_reach = 0;
          this.show_tweetbeam_screen = true;
          this.tweets = []
        }
        return t
      }();
      t.Settings = e
    })(e = t.review || (t.review = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(e) {
        __extends(i, e);

        function i() {
          e.apply(this, arguments);
          this.highlight_start_time = 2e3;
          this.highlight_interval = 11e3;
          this.highlight_resume_time = 18e3;
          this.message_prefix = "Tag your photos with";
          this.unhighlight_after_time = 8e3;
          this.background_items = $.extend(new t.components.grid.backgrounditem.Settings, {
            swap_fade_in_time: 200
          });
          this.show_instagram_logo = true;
          this.show_twitter_bird = false
        }
        return i
      }(e.base.Settings);
      i.Settings = n
    })(i = e.wedding || (e.wedding = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i = function() {
      function e() {}
      e.load = function(i, n) {
        t.Debug.log("load", i);
        $.get(i, function(t) {
          e.data = $(t);
          n()
        })
      };
      e.get = function(t) {
        return e.data.find(t).html()
      };
      return e
    }();
    e.Templates = i
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function e(t, e, i) {
      if (i === void 0) {
        i = null
      }
      this.fpsActive = false;
      this.getTime = Date.now ||
      function() {
        return (new Date).getTime()
      };
      if (!i) {
        i = $(".beam")[0]
      }
      this.container = i;
      this.messageProvider = t;
      if (e["fps_active"] === true) {
        this.activateFPS()
      }
      if (e["animate_instead_of_transition"] === true) {
        $.fn.transition = $.fn.animate
      }
      if (e["gsap_instead_of_animate"] === true) {
        try {
          $["gsap"].enabled(true)
        } catch (n) {}
      }
    }
    e.prototype.loadCSS = function(e) {
      t.Debug.log("loading css : " + e);
      if (document.createStyleSheet) {
        document.createStyleSheet(e)
      } else {
        $(document.head).append($('<link rel="stylesheet">').attr("href", e))
      }
    };
    e.prototype.activateFPS = function() {
      var t = this;
      this.fpsActive = true;
      var e = $('<div id="fps" style="position:absolute; right:0px;top:200px;width:100px;height:50px;z-index:1000;background:white"></div>');
      $(document.body).append(e);
      this.frames = 0;
      this.lastUpdate = this.getTime();
      this.fpsIntervalID = setInterval(function() {
        return t.updateFPS()
      }, 9)
    };
    e.prototype.updateFPS = function() {
      this.frames++;
      var t = this.getTime() - this.lastUpdate;
      if (this.fpsActive && t > 1e3) {
        document.getElementById("fps").innerHTML = Number(this.frames / t * 1e3).toFixed(1) + " fps";
        this.lastUpdate += t;
        this.frames = 0
      }
    };
    return e
  }();
  t.View = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(i) {
        __extends(n, i);

        function n(n, s, r) {
          var a = this;
          i.call(this, n, {});
          this.previousWidth = null;
          this.previousHeight = null;
          this.branding_style = null;
          this.highlightedItem = null;
          this.manualMessage = null;
          this._isSmallMode = null;
          this.baseSettings = s;
          if (r) {
            e.Templates.load(r, function() {
              return a.initialize()
            })
          } else {
            this.initialize()
          }
          window.onresize = t.Debounce.debounced(function() {
            return a.handleResize()
          }, 300)
        }
        n.prototype.getWidth = function() {
          throw "Not Implemented"
        };
        n.prototype.onDestroy = function() {
          throw "Not Implemented"
        };
        n.prototype.onInitialize = function() {
          throw "Not Implemented"
        };
        n.prototype.onHighlightMessage = function(t) {
          throw "Not Implemented"
        };
        n.prototype.onHighlight = function(t) {
          throw "Not Implemented"
        };
        n.prototype.unHighlight = function(t) {
          this.highlightedItem = null
        };
        n.prototype.onFilterChanged = function() {};
        n.prototype.onNoMessages = function() {};
        n.prototype.handleResize = function() {
          if (this.previousHeight != window.innerHeight || this.previousWidth != window.innerWidth) {
            this.initialize()
          }
        };
        n.prototype.isSmallMode = function() {
          if (this._isSmallMode == null) {
            this._isSmallMode = this.getWidth() <= this.baseSettings.small_mode_width
          }
          return this._isSmallMode
        };
        n.prototype.destroy = function() {
          this._isSmallMode = null;
          this.highlightedItem = null;
          this.positionManager = null;
          clearTimeout(this.showTimeout);
          clearTimeout(this.highlightTimeout);
          clearTimeout(this.hideTimeout);
          this.firstMessageLoaded = false;
          this.messageProvider.reset();
          this.started = false;
          this.manualMessage = null;
          if (this.branding_style) {
            this.branding_style.remove();
            this.branding_style = null
          }
          this.onDestroy()
        };
        n.prototype.initialize = function() {
          var t = this;
          this.destroy();
          this.previousHeight = window.innerHeight;
          this.previousWidth = window.innerWidth;
          this.onInitialize();
          this.messageProvider.setNoMessagesCallback(function() {
            return t.onNoMessages()
          });
          this.messageProvider.setFilterChangedCallback(function() {
            return t.onFilterChanged()
          });
          this.messageProvider.setMessagesCallback(function(e) {
            return t.onMessages(e)
          });
          this.messageProvider.setHighlightCallback(function(e) {
            return t.onManualHighlightMessageServerSide(e)
          });
          this.messageProvider.start(this.positionManager.getItemCount());
          this.setFullscreen()
        };
        n.prototype.createBranding = function(t) {
          if (this.baseSettings.branding_style) {
            this.branding_style = $("<style/>").append(this.baseSettings.branding_style);
            $("head").append(this.branding_style)
          }
          if (this.baseSettings.branding_content) {
            var e = Mustache.render(this.baseSettings.branding_content, this.baseSettings);
            t.append(e)
          }
        };
        n.prototype.isReadyToStart = function() {
          return this.firstMessageLoaded
        };
        n.prototype.startIfReady = function() {
          var t = this;
          if (this.isReadyToStart() && !this.started) {
            this.showTimeout = setTimeout(function() {
              return t.showNextItem()
            }, this.baseSettings.swap_interval);
            if (this.manualMessage == null) {
              this.highlightTimeout = setTimeout(function() {
                return t.highlightNextItem()
              }, this.baseSettings.highlight_start_time)
            }
            this.started = true
          }
        };
        n.prototype.onMessages = function(t) {
          this.positionManager.addMessages(t);
          if (!this.firstMessageLoaded) {
            this.firstMessageLoaded = true;
            this.startIfReady()
          }
        };
        n.prototype.isFullscreen = function() {
          var e = t.BrowserInfo.getQueryParameters()["fullscreen"] || document["fullScreen"] || document["webkitIsFullScreen"] || document["mozIsFullscreen"];
          if (typeof e === "undefined" && bowser.msie) {
            e = window.innerHeight + 40 >= window.screen.height
          }
          if (!e && !this.isSmallMode()) {
            e = window.innerHeight == window.screen.height
          }
          return e
        };
        n.prototype.setFullscreen = function() {
          if (this.isFullscreen()) {
            $(document.body).addClass("fullscreen")
          } else {
            $(document.body).removeClass("fullscreen")
          }
          var t = $(".btn-fullscreen");
          t.off("click");
          var e = document.body["webkitRequestFullScreen"] || document.body["requestFullScreen"] || document.body["mozRequestFullScreen"] || document.body["msRequestFullscreen"];
          if (e === undefined) {
            if (bowser.ipad) {
              t.click(function(t) {
                window.location.href += window.location.href.indexOf("?") > -1 ? "&fullscreen=true" : "?fullscreen=true";
                return false
              })
            } else if (this.isSmallMode()) {} else {
              t.click(function(t) {
                t.preventDefault();
                $(".ui-fullscreen-tip").toggle();
                return false
              })
            }
          } else {
            t.click(function(t) {
              t.preventDefault();
              e.call(document.documentElement);
              return false
            })
          }
        };
        n.prototype.manualHighlightItem = function(t) {
          var e = this;
          this.highlight(t);
          clearTimeout(this.highlightTimeout);
          this.highlightTimeout = setTimeout(function() {
            return e.highlightNextItem()
          }, this.baseSettings.highlight_resume_time)
        };
        n.prototype.highlightNextItem = function() {
          var e = this;
          try {
            var i = this.positionManager.getItemToHighlight();
            if (i) {
              this.highlight(i);
              if (this.baseSettings.highlight_debug) {
                t.Debug.log((new Date).getTime() + "," + i.getMessage().id + "," + i.getMessage().message)
              }
            }
          } catch (n) {
            t.Debug.error(n)
          }
          this.highlightTimeout = setTimeout(function() {
            return e.highlightNextItem()
          }, this.baseSettings.highlight_interval)
        };
        n.prototype.showNextItem = function() {
          var e = this;
          try {
            this.positionManager.showNewMessage()
          } catch (i) {
            t.Debug.error(i)
          }
          this.showTimeout = setTimeout(function() {
            return e.showNextItem()
          }, this.baseSettings.swap_interval)
        };
        n.prototype.onManualHighlightMessageServerSide = function(e) {
          window.clearTimeout(this.hideTimeout);
          this.manualMessage = e;
          if (e == null) {
            this.highlightNextItem()
          } else {
            clearTimeout(this.highlightTimeout);
            try {
              this.onHighlightMessage(e)
            } catch (i) {
              t.Debug.error(i)
            }
          }
        };
        n.prototype.highlight = function(e) {
          var i = this;
          window.clearTimeout(this.hideTimeout);
          try {
            this.onHighlight(e)
          } catch (n) {
            t.Debug.error(n)
          }
          this.highlightedItem = e;
          if (this.baseSettings.unhighlight_after_time > -1) {
            this.hideTimeout = window.setTimeout(function() {
              i.unHighlight(e)
            }, this.baseSettings.unhighlight_after_time)
          }
        };
        return n
      }(t.View);
      i.BaseView = n
    })(i = e.base || (e.base = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t(t) {
          this.colorChangeInterval = 2e3;
          this.settings = t;
          this.colorChangeInterval = this.settings.bg_fade_time;
          this.create()
        }
        t.prototype.create = function() {
          this.dom = $("<div/>").addClass("fader");
          return this.dom
        };
        t.prototype.appendTo = function(t) {
          t.prepend(this.dom)
        };
        t.prototype.getColor = function(t) {
          if (t.charAt(0) == "#") t = t.substr(1, t.length);
          return {
            r: parseInt(t.substr(0, 2), 16),
            g: parseInt(t.substr(2, 2), 16),
            b: parseInt(t.substr(4, 2), 16)
          }
        };
        t.prototype.lerpColor = function(t, e, i) {
          t = this.getColor(t);
          e = this.getColor(e);
          return {
            r: t["r"] + (e["r"] - t["r"]) * i,
            g: t["g"] + (e["g"] - t["g"]) * i,
            b: t["b"] + (e["b"] - t["b"]) * i
          }
        };
        return t
      }();
      t.Fader = e
    })(e = t.classic || (t.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(t) {
        __extends(e, t);

        function e(e) {
          t.call(this, e);
          this.target_frame_delta = 1e3 / 20;
          this.old_time = 0;
          this.delta = 0;
          this.colorID = 0;
          this.progress = 0;
          this.start()
        }
        e.prototype.setFramerate = function(t) {
          this.target_frame_delta = 1e3 / t
        };
        e.prototype.start = function() {
          this.frame(0)
        };
        e.prototype.frame = function(t) {
          var e = this;
          this.delta = t - this.old_time;
          if (this.delta >= this.target_frame_delta) {
            this.old_time = t;
            this.onFrame(this.delta)
          }
          requestAnimationFrame(function(t) {
            return e.frame(t)
          })
        };
        e.prototype.onFrame = function(t) {
          this.progress += t / this.colorChangeInterval;
          if (this.progress >= 1) {
            this.colorID++;
            this.colorID %= this.settings.bg_colors.length;
            this.progress = 0
          }
          var e = (this.colorID + 1) % this.settings.bg_colors.length;
          var i = this.lerpColor(this.settings.bg_colors[this.colorID] + "", this.settings.bg_colors[e] + "", this.progress);
          if (typeof console !== "undefined" && typeof console["timeStamp"] !== "undefined") {}
          this.renderColor(i)
        };
        e.prototype.renderColor = function(t) {};
        return e
      }(t.Fader);
      t.FaderAnimation = e
    })(e = t.classic || (t.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(e) {
        var i = function() {
          function e(t) {
            this.settings = t
          }
          e.prototype.raiseHover = function() {
            if (this.hoverCallback && this.message) {
              this.hoverCallback(this)
            }
          };
          e.prototype.setHoverCallback = function(t) {
            this.hoverCallback = t
          };
          e.prototype.appendTo = function(t) {
            this.dom.appendTo(t)
          };
          e.prototype.setPosition = function(t, e) {
            this.x = t;
            this.y = e;
            if (this.dom) {
              this.dom.css({
                left: t + "px",
                top: e + "px"
              })
            }
          };
          e.prototype.setSize = function(t, e) {
            this.size = t;
            this.borderWidth = e;
            if (this.dom) {
              var i = t + "px";
              this.dom.css({
                width: i,
                height: i
              })
            }
          };
          e.prototype.getItemSize = function() {
            return this.size - this.borderWidth * 2
          };
          e.prototype.getItemSizeAfterGrow = function() {
            return Math.ceil(this.getItemSize() * this.growRatio)
          };
          e.prototype.getImageX = function() {
            return this.x + this.borderWidth
          };
          e.prototype.getImageY = function() {
            return this.y + this.borderWidth
          };
          e.prototype.getMessage = function() {
            return this.message
          };
          e.prototype.swapMessage = function(t, e, i) {
            if (i === void 0) {
              i = true
            }
            var n = this.message == null;
            this.message = t;
            this.colorImage = e[0].getImage();
            if (i) {
              this.startTransition(n)
            }
          };
          e.prototype.getImagesToPreload = function(e) {
            var i = this.settings.highlight_image_source;
            if (i == "CLOUDINARY") {
              return [t.ImageProxy.getCloudinaryUrl(this.getItemSizeAfterGrow(), this.getItemSizeAfterGrow(), e.getPrimaryImageUrl())]
            } else if (i == "TWEETBEAM") {
              var n = undefined;
              if (!e.hasEmbeddedImage() && e instanceof t.TwitterMessage) {
                n = e.user
              }
              return [t.ImageProxy.getTweetBeamUrl(e.getPrimaryImageUrl(), this.getItemSizeAfterGrow(), this.getItemSizeAfterGrow(), n, true)]
            } else if (i == "ORIGINAL") {
              return [e.getPrimaryImageUrl()]
            }
            throw "unknown image proxy"
          };
          e.prototype.provideHighlightedImage = function() {
            var t = this.getItemSizeAfterGrow();
            var e = $("<canvas/>").attr({
              width: t,
              height: t
            }).css("backgroundColor", "white");
            var i = e.get(0).getContext("2d");
            var n = this.settings.highlight_image_source;
            if (n == "ORIGINAL") {
              this.drawImageCentered(this.colorImage, i)
            } else if (n == "CLOUDINARY" || n == "TWEETBEAM") {
              i.drawImage(this.colorImage, 0, 0, t, t, 0, 0, t, t)
            } else {
              throw "unknown image proxy"
            }
            return e[0]
          };
          e.prototype.drawImageCentered = function(t, e) {
            var i = this.getItemSizeAfterGrow();
            var n = t.width < t.height ? t.width : t.height;
            var s = this.colorImage.width - n;
            var r = this.colorImage.height - n;
            e.drawImage(t, s / 2, r / 2, n, n, 0, 0, i, i)
          };
          e.prototype.provideHighlightedImageNonSquare = function() {
            var t = this.getItemSizeAfterGrow();
            var e = this.colorImage.width < this.colorImage.height;
            var i = e ? t / this.colorImage.width : t / this.colorImage.height;
            var n = e ? this.colorImage.height * i : this.colorImage.width * i;
            var s = false;
            if (n > t * 5) {
              s = true;
              n = t * 5
            }
            var r = e ? t : n;
            var a = e ? n : t;
            var o = $("<canvas/>").attr({
              width: r,
              height: a
            }).css("backgroundColor", "white");
            var u = o.get(0).getContext("2d");
            var h = this.settings.highlight_image_source;
            if (h == "ORIGINAL" || h == "CLOUDINARY" || h == "TWEETBEAM") {
              u.drawImage(this.colorImage, 0, 0, r, a)
            } else {
              throw "unknown image proxy"
            }
            return o[0]
          };
          e.prototype.getColorImage = function() {
            return this.colorImage
          };
          e.prototype.startTransition = function(t) {
            if (t) {
              this.startFadeIn()
            } else {
              this.startBlinds()
            }
          };
          e.prototype.startBlinds = function() {
            var t = this;
            this.dom.css("scaleX", "1");
            this.dom.transition({
              scaleX: "0"
            }, {
              duration: this.settings.swap_disappear_time,
              easing: "linear",
              queue: false,
              cleanup: true,
              complete: function() {
                return t.startFadeIn()
              }
            })
          };
          e.prototype.startFadeIn = function() {
            this.dom.css({
              opacity: 0
            });
            this.dom.css({
              scaleX: 1
            });
            this.dom.transition({
              opacity: 1
            }, {
              duration: this.settings.swap_fade_in_time,
              queue: false,
              easing: "linear",
              cleanup: true
            })
          };
          return e
        }();
        e.BackgroundItem = i
      })(i = e.backgrounditem || (e.backgrounditem = {}))
    })(i = e.grid || (e.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(e) {
        __extends(i, e);

        function i(t) {
          e.call(this, t);
          this.opacity = 0;
          this.blindsWidth = 0;
          this.preloadedImages = null
        }
        i.prototype.appendTo = function(t) {
          this.canvas = i.canvas;
          this.context = this.canvas.get(0).getContext("2d")
        };
        i.prototype.checkHover = function(t, e) {
          if (t > this.getImageX() && t < this.getImageX() + this.getItemSize() && e > this.getImageY() && e < this.getImageY() + this.getItemSize()) {
            this.raiseHover();
            return true
          }
          return false
        };
        i.prototype.getImagesToPreload = function(i) {
          var n = e.prototype.getImagesToPreload.call(this, i);
          var s = undefined;
          if (!i.hasEmbeddedImage() || this.settings.force_profile_image) {
            s = i.user
          }
          var r = i.getPrimaryImageUrl();
          if (this.settings.force_profile_image && i.userImageUrl && i.userImageUrl.length) {
            r = i.userImageUrl
          }
          if (this.settings.background_image_source == "CLOUDINARY") {
            if (this.settings.background_grayscale) {
              n.push(t.ImageProxy.getCloudinaryGrayscaleUrl(this.getItemSize(), this.getItemSize(), r, this.settings.background_crop_mode))
            } else {
              n.push(t.ImageProxy.getCloudinaryUrl(this.getItemSize(), this.getItemSize(), r, this.settings.background_crop_mode))
            }
          } else if (this.settings.background_image_source == "TWEETBEAM") {
            n.push(t.ImageProxy.getTweetBeamGrayscaleUrl(r, this.getItemSize(), this.getItemSize(), s))
          } else {
            throw "unknown image source"
          }
          return n
        };
        i.prototype.getPreloadedImages = function() {
          return this.preloadedImages
        };
        i.prototype.swapMessage = function(i, n, s) {
          if (s === void 0) {
            s = true
          }
          this.preloadedImages = t.ArrayTool.copy(n);
          this.grayscaleImage = n.pop().getImage();
          e.prototype.swapMessage.call(this, i, n, s)
        };
        i.prototype.getBlindsWidth = function() {
          return this.blindsWidth
        };
        i.prototype.getOpacity = function() {
          return this.opacity
        };
        i.prototype.setOpacity = function(t) {
          this.opacity = t;
          var e = this.context;
          e.clearRect(this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.globalAlpha = t;
          e.drawImage(this.grayscaleImage, 0, 0, this.getItemSize(), this.getItemSize(), this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.globalAlpha = 1
        };
        i.prototype.setBlindsWidth = function(t) {
          this.blindsWidth = t;
          var e = this.context;
          e.fillStyle = "black";
          e.fillRect(this.getImageX(), this.getImageY(), t, this.getItemSize());
          e.fillRect(this.getImageX() + this.getItemSize() - t, this.getImageY(), t, this.getItemSize())
        };
        i.prototype.startFadeIn = function() {
          this.setOpacity(0);
          TweenLite.to(this, this.settings.swap_fade_in_time / 1e3, {
            setOpacity: 1,
            ease: "linear"
          })
        };
        i.prototype.startBlinds = function() {
          var t = this;
          this.setBlindsWidth(0);
          TweenLite.to(this, this.settings.swap_disappear_time / 1e3, {
            setBlindsWidth: this.getItemSize() / 2,
            onComplete: function() {
              return t.startFadeIn()
            }
          })
        };
        return i
      }(t.components.grid.backgrounditem.BackgroundItem);
      e.BackgroundItemLargeCanvas = i
    })(i = e.classic || (e.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(t) {
        __extends(e, t);

        function e(e) {
          var i = this;
          t.call(this, e);
          this.canvas = $("<canvas/>").addClass("SItem").attr({
            width: "100%",
            height: "100%"
          }).css({
            width: "100%",
            height: "100%"
          });
          this.context = this.canvas.get(0).getContext("2d");
          this.dom = this.canvas;
          this.dom.mouseover(function(t) {
            i.raiseHover()
          })
        }
        e.prototype.swapMessage = function(e, i) {
          var n = this;
          t.prototype.swapMessage.call(this, e, i);
          var s = document.createElementNS("http://www.w3.org/2000/svg", "image");
          s["height"]["baseVal"] = s["width"]["baseVal"] = "100%";
          s["href"]["baseVal"] = this.colorImage.src;
          var r = $('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter id="gray"><feComposite in="SourceGraphic" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0"></feComposite><feColorMatrix id="filter_38" type="saturate" values="0"></feColorMatrix></filter></defs>' + '<image filter="url(#gray)"width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xlink:href="' + this.colorImage.src + '"></image></svg>').attr({
            width: this.getItemSize(),
            height: this.getItemSize()
          }).get(0)["toDataURL"]();
          var a = document.createElement("img");
          a.onload = function() {
            n.canvas.attr({
              width: n.getItemSize(),
              height: n.getItemSize()
            });
            n.context.drawImage(a, 0, 0, n.getItemSize(), n.getItemSize())
          };
          a.src = r
        };
        return e
      }(t.components.grid.backgrounditem.BackgroundItem);
      e.BackgroundItemSVGtoCanvas = i
    })(i = e.classic || (e.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var GreensockAnimation = com.greensock.core.Animation;
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(e) {
        var i = function() {
          function i(t, e) {
            this.settings = t;
            this.element = e;
            this.container = this.element.parentElement
          }
          i.prototype.getTween = function() {
            throw "not implemented"
          };
          i.prototype.getSetPreValuesTween = function() {
            throw "not implemented"
          };
          i.prototype.getSetPostValuesTween = function() {
            throw "not implemented"
          };
          i.fromSettings = function(i, n) {
            if (i instanceof Array) {
              var s = new e.ParallelAnimationSettings;
              s.animations = i;
              var r = s.target ? $(s.target)[0] : n;
              if (!r) {
                console.error("empty target")
              }
              return new e.ParallelAnimation(s, r)
            }
            if (Object.keys(i).length != 1) {
              throw "invalid animation settings"
            }
            var a = Object.keys(i)[0];
            var o = i[a];
            var r = o.target ? $(o.target)[0] : n;
            if (!r) {
              console.error("empty target")
            }
            return t.InstanceLoader.createInstance("beam.components.slides.animation." + a, o, r)
          };
          return i
        }();
        e.Animation = i
      })(i = e.animation || (e.animation = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function() {
          function t() {
            this.target = null
          }
          return t
        }();
        t.AnimationSettings = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(e) {
          __extends(i, e);

          function i(i, n) {
            e.call(this, i, n);
            this.settings = $.extend(new t.SimpleAnimationSettings, i)
          }
          i.prototype.getPreValues = function() {
            return null
          };
          i.prototype.getPostValues = function() {
            return null
          };
          i.prototype.getSetPreValuesTween = function() {
            if (this.getPreValues() != null) {
              return TweenMax.to(this.element, 1e-4, this.getPreValues())
            }
            return null
          };
          i.prototype.getSetPostValuesTween = function() {
            if (!this.getPostValues()) {
              throw "post values of animation must not be null"
            }
            return TweenMax.to(this.element, 1e-4, this.getPostValues())
          };
          i.prototype.getTween = function() {
            var t = this.getPostValues();
            t["ease"] = this.settings.easing;
            t["delay"] = this.settings.delay / 1e3;
            if (this.getPreValues() != null) {
              return TweenMax.fromTo(this.element, this.settings.duration / 1e3, this.getPreValues(), t)
            } else {
              return TweenMax.to(this.element, this.settings.duration / 1e3, t)
            }
          };
          return i
        }(t.Animation);
        t.SimpleAnimation = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments);
            this.easing = "Power1.easeOut";
            this.duration = 1e3;
            this.delay = 0
          }
          return e
        }(t.AnimationSettings);
        t.SimpleAnimationSettings = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              x: this.settings.startX || this.container.offsetWidth
            }
          };
          e.prototype.getPostValues = function() {
            return {
              x: 0
            }
          };
          return e
        }(t.SimpleAnimation);
        t.InRight = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return null
          };
          e.prototype.getPostValues = function() {
            return {
              x: -$(this.container).width()
            }
          };
          return e
        }(t.SimpleAnimation);
        t.OutLeft = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t() {
          this.enter = {
            FadeIn: {
              duration: 1,
              target: null
            }
          };
          this.exit = {
            FadeOut: {
              duration: 1,
              target: null
            }
          };
          this.render_html = '<div class="slide"></div>'
        }
        return t
      }();
      t.SlideSettings = e
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function i(t, i, n) {
          if (n === void 0) {
            n = null
          }
          this.container = t;
          this.dataContext = n;
          this.settings = $.extend(new e.SlideSettings, i)
        }
        i.prototype.getEnterTween = function() {
          return this.enter.getTween()
        };
        i.prototype.getExitTween = function() {
          return this.exit.getTween()
        };
        i.prototype.getContentAnimation = function() {
          if (this.settings.duration > 0) {
            return t.GSAPTool.getPauseTween(this.settings.duration / 1e3)
          }
          return null
        };
        i.prototype.getEnterAnimation = function() {
          var t = this.getEnterTween();
          return t
        };
        i.prototype.getExitAnimation = function() {
          var t = new TimelineMax;
          var e = this.getExitTween();
          if (e) {
            t.add(e)
          }
          t.add(this.getSetPreValuesTween());
          return t
        };
        i.prototype.getSetPreValuesTween = function() {
          return this.enter.getSetPreValuesTween()
        };
        i.prototype.getSetShowValuesTween = function() {
          return this.enter.getSetPostValuesTween()
        };
        i.prototype.renderToContainer = function() {
          if (!this.element) {
            this.element = this.render()
          }
          this.container.appendChild(this.element);
          this.enter = e.animation.Animation.fromSettings(this.settings.enter, this.element);
          this.exit = e.animation.Animation.fromSettings(this.settings.exit, this.element);
          this.getSetPreValuesTween()
        };
        i.prototype.render = function() {
          var t = $(this.settings.render_html)[0];
          var e = this.renderContent();
          if (e) {
            t.appendChild(e)
          }
          if (this.settings.styles) {
            this.applyStyles(t, this.settings.styles)
          }
          return t
        };
        i.prototype.renderContent = function() {
          return null
        };
        i.prototype.applyStyles = function(t, e) {
          Object.keys(e).forEach(function(i) {
            var n = i == "_self" ? $(t) : $(i, t);
            n.each(function(t, n) {
              var s = n.getAttribute("style");
              if (s && s.length) {
                s = s + ";"
              } else {
                s = ""
              }
              s += e[i];
              n.setAttribute("style", s)
            })
          })
        };
        i.prototype.destroy = function() {
          this.container.removeChild(this.element)
        };
        return i
      }();
      e.Slide = i
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(t) {
        __extends(e, t);

        function e() {
          t.apply(this, arguments);
          this.slides = {}
        }
        return e
      }(t.SlideSettings);
      t.ContainerSlideSettings = e
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(i) {
        __extends(n, i);

        function n(t, n, s) {
          if (s === void 0) {
            s = null
          }
          i.call(this, t, n, s);
          this.slides = [];
          this.containerSettings = $.extend(new e.ContainerSlideSettings, n)
        }
        n.prototype.destroy = function() {
          this.slides.forEach(function(t) {
            return t.destroy()
          });
          this.slides = [];
          i.prototype.destroy.call(this)
        };
        n.prototype.getEnterAnimation = function() {
          var t = new TimelineMax;
          var e = this.slides.map(function(t) {
            return t.getEnterAnimation()
          });
          e.push(i.prototype.getEnterAnimation.call(this));
          t.add(e);
          return t
        };
        n.prototype.getContentAnimation = function() {
          var n = e.htmlslide.HtmlSlide.processHtmlEffects(this.element);
          var s = i.prototype.getContentAnimation.call(this);
          if (s) {
            n.add(s, t.GSAPTool.getOffsetFromNumber(-n.duration()))
          }
          return n
        };
        n.prototype.renderToContainer = function() {
          var e = this;
          i.prototype.renderToContainer.call(this);
          Object.keys(this.containerSettings.slides).forEach(function(i) {
            var n = e.containerSettings.slides[i];
            var s = $(i, e.view);
            s.each(function(i, s) {
              var r = t.InstanceLoader.createInstance(n.type, s, n, e.dataContext);
              e.slides.push(r);
              r.renderToContainer();
              r.getSetShowValuesTween()
            })
          })
        };
        n.prototype.render = function() {
          this.view = $('<div class="slide-container">');
          var e = this.containerSettings.html;
          if (this.containerSettings.html_src) {
            e = Mustache.render(t.view.Templates.get(this.containerSettings.html_src), {
              base: t.App.ROOT
            })
          }
          this.view.append(e);
          return this.view[0]
        };
        return n
      }(e.Slide);
      e.ContainerSlide = i
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(e) {
        var i = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          return e
        }(t.SlideSettings);
        e.VideoSlideSettings = i
      })(e = t.videoslide || (t.videoslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(i) {
        var n = function(e) {
          __extends(i, e);

          function i(i, n, s) {
            if (s === void 0) {
              s = null
            }
            t.JSONTool.applyBindings(s, n);
            e.call(this, i, n, s)
          }
          i.prototype.getSetPreValuesTween = function() {
            var t = this;
            var i = function() {
              try {
                t.video.currentTime = 0
              } catch (e) {}
            };
            var n = e.prototype.getSetPreValuesTween.call(this);
            return [n, TweenMax.delayedCall(0, i)]
          };
          i.prototype.getContentAnimation = function() {
            var t = this;
            var e = TweenMax.delayedCall(0, function() {
              var i = e.timeline;
              console.log("paused");
              i.pause();
              t.video.play();
              t.video.onended = function() {
                i.resume(i.time() + .001);
                console.log("resume")
              }
            });
            return e
          };
          i.prototype.renderContent = function() {
            this.video = document.createElement("video");
            var t = document.createElement("source");
            t.src = this.settings.url;
            t.type = this.settings.videotype;
            this.video.appendChild(t);
            this.video.className = "full-size";
            return this.video
          };
          return i
        }(e.Slide);
        i.VideoSlide = n
      })(i = e.videoslide || (e.videoslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(e) {
        var i = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          return e
        }(t.SlideSettings);
        e.DataSlideSettings = i
      })(e = t.dataslide || (t.dataslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(i) {
        var n = function(e) {
          __extends(n, e);

          function n(n, s, r) {
            var a = this;
            if (r === void 0) {
              r = null
            }
            e.call(this, n, s, r);
            this.dataProvider = null;
            this.dataSettings = $.extend(new i.DataSlideSettings, s);
            this.dataProvider = t.InstanceLoader.createInstance(this.dataSettings.dataprovider.type, this.dataSettings.dataprovider);
            this.dataProvider.setDataCallback(function(t) {
              return a.dataChanged(t)
            });
            this.dataProvider.start()
          }
          n.prototype.dataChanged = function(t) {};
          n.prototype.destroy = function() {
            this.dataProvider.reset();
            e.prototype.destroy.call(this)
          };
          return n
        }(e.Slide);
        i.DataSlide = n
      })(i = e.dataslide || (e.dataslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(e) {
        var i = function(i) {
          __extends(n, i);

          function n(t, n, s) {
            if (s === void 0) {
              s = null
            }
            i.call(this, t, n);
            this.histogramSettings = $.extend(new e.HistogramSlideSettings, n, s)
          }
          n.prototype.getEnterAnimation = function() {
            var t = this;
            var e = new TimelineMax;
            e.addCallback(function() {
              if (t.bars) {
                var e = t.bars.data();
                t.bars.remove();
                t.valueTexts.remove();
                t.valueTexts = null;
                t.bars = null;
                t.setFirstData(e)
              }
            }, undefined);
            e.add(i.prototype.getEnterAnimation.call(this));
            return e
          };
          n.prototype.dataChanged = function(e) {
            var i = this;
            window.updateHist = function() {
              return i.updateData(e)
            };
            if (!this.bars) {
              this.setFirstData(e)
            } else {
              t.Debug.log("hist data changed");
              this.updateData(e)
            }
          };
          n.prototype.setFirstData = function(e) {
            var i = parseInt(this.svg.attr("width"));
            var n = parseInt(this.svg.attr("height"));
            var s = d3.scale.ordinal().domain(d3.range(e.length)).rangeRoundBands([0, i], this.histogramSettings.bar_margin, 0);
            var r = d3.scale.linear().domain([0, d3.max(e, function(t) {
              return t.doc_count
            })]).range([0, n - 50]);
            this.bars = this.barContainer.selectAll("rect").data(e);
            this.bars.enter().append("rect").attr("x", function(t, e) {
              return s(e)
            }).attr("y", n).attr("height", 0).attr("width", s.rangeBand()).attr("fill", function(t) {
              return "#E20074"
            });
            this.bars.transition().delay(function(t, e) {
              return e * 100
            }).duration(1e3).attr("height", function(t) {
              return r(t.doc_count)
            }).attr("y", function(t) {
              return n - r(t.doc_count)
            });
            this.bars.exit().transition().remove();
            var a = this.textContainer.selectAll("text").data(e);
            a.enter().append("text").text(function(t) {
              return t.key
            }).attr("text-anchor", "middle").attr("x", function(t, e) {
              return s(e) + s.rangeBand() / 2
            }).attr("y", function(t) {
              return n - 14
            }).attr("fill", "white");
            this.valueTexts = this.textValuesContainer.selectAll("text").data(e);
            this.valueTexts.enter().append("text").text(function(e) {
              return e.doc_count > 0 ? t.StringTool.numberToString(e.doc_count, true) : ""
            }).attr("text-anchor", "middle").attr("x", function(t, e) {
              return s(e) + s.rangeBand() / 2
            }).attr("y", function(t) {
              return n - r(t.doc_count) - 10
            }).attr("fill", "white");
            this.valueTexts.transition().delay(function(t, e) {
              return 1e3 + e * 100
            }).duration(500).attr("fill", "#E20074")
          };
          n.prototype.updateData = function(t) {
            var e = parseInt(this.svg.attr("width"));
            var i = parseInt(this.svg.attr("height"));
            var n = d3.scale.ordinal().domain(d3.range(t.length)).rangeRoundBands([0, e], .05);
            var s = d3.scale.linear().domain([0, d3.max(t, function(t) {
              return t.doc_count
            })]).range([0, i - 50]);
            this.bars.data(t).transition().attr("y", function(t, e) {
              return i - s(t.doc_count)
            }).attr("height", function(t, e) {
              return s(t.doc_count)
            }).attr("fill", function(t) {
              return "#E20074"
            });
            this.valueTexts.data(t).transition().text(function(t) {
              return t.doc_count
            }).attr("text-anchor", "middle").attr("y", function(t) {
              return i - s(t.doc_count) - 10
            })
          };
          n.prototype.drawChart = function(t) {
            var e = $(t).width();
            var i = $(t).height();
            this.svg = d3.select(t).append("svg").attr("width", e).attr("height", i);
            this.barContainer = this.svg.append("g");
            this.textContainer = this.svg.append("g");
            this.textValuesContainer = this.svg.append("g");
            this.textValuesContainer.attr("class", "doc_counts")
          };
          n.prototype.render = function() {
            var t;
            if (this.settings.container_template) {
              t = $(this.settings.container_template)
            } else {
              t = $("<div class='histogram-slide'><div class='svg-container'></div></div>")
            }
            return t[0]
          };
          n.prototype.renderToContainer = function() {
            i.prototype.renderToContainer.call(this);
            this.drawChart($(".svg-container", this.element)[0])
          };
          return n
        }(e.DataSlide);
        e.HistogramSlide = i
      })(i = e.dataslide || (e.dataslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments);
            this.update_immediately = false;
            this.expand_array_to_viewslide = false;
            this.convert_to_messages = false
          }
          return e
        }(t.DataSlideSettings);
        t.HtmlDataSlideSettings = e
      })(e = t.dataslide || (t.dataslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(i) {
        var n = function(n) {
          __extends(s, n);

          function s(t, e, s) {
            if (s === void 0) {
              s = null
            }
            n.call(this, t, e);
            this.htmlDataSettings = $.extend(new i.HtmlDataSlideSettings, e, s)
          }
          s.prototype.dataChanged = function(t) {
            t = t;
            if (!this.dataset) {
              this.setFirstData(t)
            } else {
              this.updateData(t)
            }
            this.dataset = t
          };
          s.prototype.updateCurrentSlide = function(i) {
            var n = this.htmlDataSettings.slide_settings;
            var s;
            if (this.htmlDataSettings.expand_array_to_viewslide) {
              var r = new e.ViewSlideSettings;
              r.enter = {
                FadeIn: {
                  duration: 1,
                  target: null
                }
              };
              r.exit = {
                FadeOut: {
                  duration: 1,
                  target: null
                }
              };
              r.slides = [];
              for (var a = 0; a < i.length; a++) {
                var o = $.extend(true, n instanceof Array ? [] : {}, n);
                r.slides.push(o)
              }
              s = new e.ViewSlide(this.element, r, this.dataContext, i);
              s.renderToContainer()
            } else {
              var u = i;
              if (this.htmlDataSettings.convert_to_messages) {
                u = i.map(function(e) {
                  return t.messageprovider.APIMessageProvider.getMessageFromJson(e._source, false)
                })
              }
              s = t.InstanceLoader.createInstance(this.htmlDataSettings.slide_settings.type, this.element, n, u);
              s.renderToContainer()
            }
            var h = new TimelineMax;
            var l = [s.getEnterAnimation()];
            if (this.currentSlide) {
              l.push(this.currentSlide.getExitAnimation())
            }
            h.add(l);
            if (this.currentSlide) {
              var c = this.currentSlide;
              h.addCallback(function(t) {
                return c.destroy()
              }, undefined)
            }
            var g = s.getContentAnimation();
            if (g) {
              h.add(g)
            }
            this.currentSlide = s
          };
          s.prototype.setFirstData = function(t) {
            this.updateCurrentSlide(t)
          };
          s.prototype.updateData = function(e) {
            if (this.htmlDataSettings.update_immediately) {
              this.updateCurrentSlide(e)
            } else {
              this.slideDirty = true;
              t.Debug.log("slideDirty")
            }
          };
          s.prototype.getEnterAnimation = function() {
            var t = this;
            var e = new TimelineMax;
            e.addCallback(function() {
              if (t.slideDirty) {
                t.updateCurrentSlide(t.dataset);
                t.slideDirty = false
              } else {
                var e = new TimelineMax;
                e.add(t.currentSlide.getEnterAnimation());
                e.add(t.currentSlide.getContentAnimation())
              }
            }, undefined);
            var i = n.prototype.getEnterAnimation.call(this);
            if (i.duration() > .01) {
              e.add(n.prototype.getEnterAnimation.call(this))
            } else {
              i.kill()
            }
            return e
          };
          return s
        }(i.DataSlide);
        i.HtmlDataSlide = n
      })(i = e.dataslide || (e.dataslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(e) {
        var i = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments);
            this.message_count = 5;
            this.remove_more_messages = true
          }
          return e
        }(t.SlideSettings);
        e.ScrollSlideSettings = i
      })(e = t.messageslide || (t.messageslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(i) {
        var n = function(n) {
          __extends(s, n);

          function s(t, e, s) {
            if (s === void 0) {
              s = null
            }
            n.call(this, t, e);
            this.messageSettings = $.extend(new i.ScrollSlideSettings, e, s);
            this.queue = new collections.Queue
          }
          s.prototype.onMessages = function(t) {
            var e = this;
            t.reverse();
            t.forEach(function(t) {
              return e.queue.enqueue(t)
            });
            if (!this.started && t.length > 0) {
              this.started = true
            }
            this.addNext()
          };
          s.prototype.addNext = function() {
            var i = this;
            if (this.queue.isEmpty()) {
              return
            }
            $(this.element).children().each(function(t, e) {
              if ($(e).position().top > $(i.element).outerHeight() + 500) {
                $(e).remove()
              }
            });
            var n = this.queue.dequeue();
            var s = t.view.Templates.get(this.messageSettings.item_html_src);
            if (s == null || s == "") {
              t.Debug.error("MessageScrollSlide empty item_html_src")
            }
            s = Handlebars.compile(s)(n);
            var r = $(s);
            r.css("visibility", "hidden");
            $(this.element).prepend(r);
            var a = TweenMax.fromTo(this.element, 1, {
              y: -r.outerHeight(true)
            }, {
              y: 0,
              onComplete: function() {
                window.setTimeout(function() {
                  return i.addNext()
                }, 500)
              }
            });
            var o = e.htmlslide.HtmlSlide.processHtmlEffects(r[0]);
            o.add(a, t.GSAPTool.getOffsetFromNumber(-o.duration()));
            if ($(this.element).children().length > this.messageSettings.message_count && this.messageSettings.remove_more_messages) {
              var u = $(this.element).children()[this.messageSettings.message_count];
              var h = e.htmlslide.HtmlSlide.processHtmlEffects(u, "data-effect-out");
              h.add(TweenMax.delayedCall(0, function() {
                return $(u).remove()
              }));
              o.add(h, t.GSAPTool.getOffsetFromNumber(-o.duration()))
            }
            r.css("visibility", "visible")
          };
          return s
        }(e.Slide);
        i.ScrollSlide = n
      })(i = e.messageslide || (e.messageslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          return e
        }(t.ScrollSlideSettings);
        t.MessageScrollSlideSettings = e
      })(e = t.messageslide || (t.messageslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(e) {
        var i = function(i) {
          __extends(n, i);

          function n(n, s, r) {
            var a = this;
            if (r === void 0) {
              r = null
            }
            i.call(this, n, s, r);
            this.messageProvider = null;
            this.messageScrollSlideSettings = $.extend(new e.MessageScrollSlideSettings, s, r);
            this.messageProvider = t.InstanceLoader.createInstance(this.messageScrollSlideSettings.messageprovider.type, this.messageScrollSlideSettings.messageprovider);
            this.messageProvider.reset();
            this.messageProvider.setMessagesCallback(function(t) {
              return a.onMessages(t)
            });
            this.messageProvider.start(this.messageScrollSlideSettings.message_count)
          }
          n.prototype.destroy = function() {
            this.messageProvider.reset();
            i.prototype.destroy.call(this)
          };
          return n
        }(e.ScrollSlide);
        e.MessageScrollSlide = i
      })(i = e.messageslide || (e.messageslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(e) {
        var i = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments);
            this.slide_time = 1e4;
            this.message_count = 20;
            this.preload_images_tdf = false
          }
          return e
        }(t.SlideSettings);
        e.MessageSlideSettings = i
      })(e = t.messageslide || (t.messageslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(i) {
        var n = function(e) {
          __extends(n, e);

          function n(n, s, r) {
            var a = this;
            if (r === void 0) {
              r = null
            }
            e.call(this, n, s, r);
            this.messageProvider = null;
            this.messageSettings = $.extend(new i.MessageSlideSettings, s);
            this.queue = new t.BackupQueue(this.messageSettings.message_count);
            this.messageProvider = t.InstanceLoader.createInstance(this.messageSettings.messageprovider.type, this.messageSettings.messageprovider);
            this.messageProvider.reset();
            this.messageProvider.setMessagesCallback(function(t) {
              return a.onMessages(t)
            });
            this.messageProvider.start(this.messageSettings.message_count)
          }
          n.prototype.preloadMessageIfNecessary = function(e) {
            if (this.messageSettings.preload_images_tdf) {
              var i = [];
              i.push(e.getUserImageUrlViaTBProxy(240, 240));
              if (e.hasEmbeddedImage()) {
                i.push(e.getPrimaryImageUrl())
              }
              t.ImagePreloader.preload(i)
            }
          };
          n.prototype.onMessages = function(t) {
            var e = this;
            if (!this.started) {
              t.forEach(function(t) {
                e.queue.enqueueAsBackup(t);
                e.preloadMessageIfNecessary(t)
              })
            } else {
              t.forEach(function(t) {
                e.queue.enqueue(t);
                e.preloadMessageIfNecessary(t)
              })
            }
            if (!this.started && t.length > 0) {
              this.started = true;
              this.highlightNext()
            }
          };
          n.prototype.highlightMessage = function(e) {
            var i = this.messageSettings.slide_settings;
            var n = t.InstanceLoader.createInstance(this.messageSettings.slide_settings.type, this.element, i, e);
            n.renderToContainer();
            var s = new TimelineMax;
            var r = 0;
            var a = [n.getEnterAnimation()];
            if (this.currentSlide) {
              a.push(this.currentSlide.getExitAnimation())
            }
            s.add(a);
            if (this.currentSlide) {
              var o = this.currentSlide;
              s.addCallback(function(t) {
                return o.destroy()
              }, undefined)
            }
            var u = n.getContentAnimation();
            s.add(u);
            this.currentSlide = n;
            if (e && e.originalObject && e.originalObject.vineinfo && e.originalObject.vineinfo.data) {
              $("video").attr("poster", e.originalObject.vineinfo.data.vineImageURL);
              $("video").attr("src", e.originalObject.vineinfo.data.vineVideoURL)
            }
          };
          n.prototype.highlightNext = function() {
            var e = this;
            try {
              this.highlightMessage(this.queue.dequeueAndReadd())
            } catch (i) {
              t.Debug.error(i)
            }
            window.setTimeout(function() {
              return e.highlightNext()
            }, this.messageSettings.slide_time)
          };
          n.prototype.destroy = function() {
            this.messageProvider.reset();
            e.prototype.destroy.call(this)
          };
          return n
        }(e.Slide);
        i.MessageSlide = n
      })(i = e.messageslide || (e.messageslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(e) {
        var i = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          return e
        }(t.components.slides.ContainerSlideSettings);
        e.ContainerScrollSlideSettings = i
      })(i = e.messageslide || (e.messageslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(e) {
        var i = function(i) {
          __extends(n, i);

          function n(n, s, r) {
            var a = this;
            if (r === void 0) {
              r = null
            }
            i.call(this, n, s, r);
            this.messageProvider = null;
            this.nextSlideToReceiveMessage = 0;
            this.messageSettings = $.extend(new e.ContainerScrollSlideSettings, s, r);
            this.messageProvider = t.InstanceLoader.createInstance(this.messageSettings.messageprovider.type, this.messageSettings.messageprovider);
            this.messageProvider.reset();
            this.messageProvider.setMessagesCallback(function(t) {
              return a.onMessages(t)
            });
            this.queue = new collections.Queue
          }
          n.prototype.renderToContainer = function() {
            i.prototype.renderToContainer.call(this);
            this.messageProvider.start(20)
          };
          n.prototype.preloadMessageIfNecessary = function(e) {
            try {
              if (this.messageSettings.preload_images_tdf) {
                var i = [];
                i.push(e.getUserImageUrlViaTBProxy(80, 80));
                if (e.hasEmbeddedImage()) {
                  i.push(e.getPrimaryImageUrl())
                }
                t.ImagePreloader.preload(i)
              }
            } catch (n) {}
          };
          n.prototype.onMessages = function(t) {
            var e = this;
            t.reverse();
            t.forEach(function(t) {
              e.preloadMessageIfNecessary(t);
              e.queue.enqueue(t)
            });
            window.setTimeout(function() {
              return e.addNext()
            }, 1e3)
          };
          n.prototype.addNext = function() {
            var t = this;
            if (this.queue.isEmpty()) {
              return
            }
            this.slides[this.nextSlideToReceiveMessage].onMessages([this.queue.dequeue()]);
            this.nextSlideToReceiveMessage = (this.nextSlideToReceiveMessage + 1) % this.slides.length;
            window.setTimeout(function() {
              return t.addNext()
            }, 1e3)
          };
          n.prototype.destroy = function() {
            this.messageProvider.reset();
            i.prototype.destroy.call(this)
          };
          return n
        }(t.components.slides.ContainerSlide);
        e.ContainerScrollSlide = i
      })(i = e.messageslide || (e.messageslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(i) {
        var n;
        (function(i) {
          var n = function(e) {
            __extends(n, e);

            function n(n, s, r) {
              var a = this;
              if (r === void 0) {
                r = null
              }
              e.call(this, n, s, r);
              this.bikes = [];
              this.positions_visible = 0;
              this.bikes_start_offset_x = 0;
              this.messagesToShow = new collections.Queue;
              this.cameraPosition = 0;
              this.seenMessages = false;
              this.pendingFakeVotes = new collections.Queue;
              this.movingCamera = false;
              window.zoomIn = function() {
                return a.zoomIn()
              };
              window.zoomOut = function() {
                return a.zoomOut()
              };
              window.moveBikeXTest = function(t, e) {
                return a.moveBikeXTest(t, e)
              };
              window.fakeVote = function(t) {
                return a.fakeVote(t)
              };
              this.riders = t.ArrayTool.copy(i.Riders.getRiders());
              var o = {
                type: "beam.messageprovider.APIDataProvider",
                data_path: "aggregations.votes.buckets",
                poll_interval: 0,
                api_request: {
                  index: "tdf2015goriders",
                  request: {
                    query: {
                      filtered: {
                        query: {
                          match_all: {}
                        },
                        filter: {
                          and: [{
                            missing: {
                              field: "tweet_meta.is_retweet"
                            }
                          }, {
                            exists: {
                              field: "tdfutrecht_mountain.data.riderTag"
                            }
                          }]
                        }
                      }
                    },
                    aggs: {
                      votes: {
                        terms: {
                          field: "tdfutrecht_mountain.data.riderTag",
                          size: 500
                        }
                      }
                    },
                    size: 0
                  }
                }
              };
              this.initialDataProvider = new t.messageprovider.APIDataProvider(o);
              this.initialDataProvider.reset();
              this.initialDataProvider.setDataCallback(function(t) {
                return a.onInitialData(t)
              });
              this.initialDataProvider.start()
            }
            n.GET_VW = function(t) {
              return window.outerWidth / 1920 * t
            };
            n.prototype.onInitialData = function(e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i].key;
                var s = this.riders.filter(function(t) {
                  return t.getHashtag() == n.toLowerCase()
                });
                if (s && s.length) {
                  s[0].addVotes(e[i].doc_count)
                } else {
                  t.Debug.error("rider not found: " + n)
                }
              }
              this.renderTicker();
              this.renderBikes();
              this.startListeningLive()
            };
            n.prototype.renderTicker = function() {
              var e = this;
              window.ticker = function() {
                return e.renderTicker()
              };
              var i = t.ArrayTool.copy(this.riders).sort(function(t, e) {
                var i = e.getVotePosition() - t.getVotePosition();
                if (i == 0) {
                  i = t.getHashtag().localeCompare(e.getHashtag())
                }
                return i
              });
              var n = $(".cta-inner");
              var s = $("<div>")[0];
              s.appendChild($("<span>Vote for your favorite rider, the top 10 are racing live!</span>")[0]);
              var r = 1;
              for (var a = 0; a < i.length; a++) {
                var o = i[a];
                var u = r + ". #" + o.getHashtag();
                if (o.getVotes() > 0) {
                  u += " (" + o.getVotes() + ")"
                }
                s.appendChild($("<span>" + u + "</span>")[0]);
                r++
              }
              n[0].replaceChild(s, $("div", n)[0])
            };
            n.prototype.startListeningLive = function() {
              var e = this;
              var i = {
                apimessageprovider: {
                  api_request: {
                    sources: [{
                      "store.Store": {
                        approved_only: false,
                        index: "tdf2015goriders",
                        filter: {
                          exists: {
                            field: "tdfutrecht_mountain.data.riderTag"
                          }
                        }
                      }
                    }],
                    filters: [{
                      ExcludeRetweets: {}
                    }]
                  },
                  poll_interval: 5e3
                }
              };
              this.liveMessageProvider = new t.messageprovider.APIMessageProvider(i);
              this.liveMessageProvider.reset();
              this.liveMessageProvider.setMessagesCallback(function(t) {
                return e.onLiveMessages(t)
              });
              this.liveMessageProvider.start(20);
              this.moveCameraIntervalId = window.setTimeout(function() {
                return e.moveCameraToNextBike()
              }, 5e3)
            };
            n.prototype.onLiveMessages = function(e) {
              if (!this.seenMessages) {
                this.seenMessages = true;
                return
              }
              e = t.ArrayTool.copy(e).reverse();
              for (var i = 0; i < e.length; i++) {
                this.messagesToShow.add(e[i])
              }
              this.showNextMessageIfPossible()
            };
            n.prototype.getRiderFromMessage = function(t) {
              var e = t.originalObject.tweet.entities.hashtags;
              if (e && e.length) {
                for (var i = 0; i < e.length; i++) {
                  var n = e[i].text.toLowerCase();
                  var s = this.riders.filter(function(t) {
                    return t.getHashtag() == n
                  });
                  if (s && s.length > 0) {
                    return s[0]
                  }
                }
              }
              return null
            };
            n.prototype.fakeVote = function(t) {
              this.pendingFakeVotes.enqueue(t);
              this.showNextMessageIfPossible()
            };
            n.prototype.showNextMessageIfPossible = function() {
              if (this.movingBike == null && !this.movingCamera) {
                var t = this.messagesToShow.dequeue();
                if (t) {
                  var e = this.getRiderFromMessage(t);
                  if (e != null) {
                    this.voteRider(e, t)
                  }
                } else {
                  var i = this.pendingFakeVotes.dequeue();
                  if (i) {
                    var n = this.riders.filter(function(t) {
                      return t.getHashtag() == i
                    });
                    this.voteRider(n[0], null)
                  }
                }
              }
            };
            n.prototype.getBikeForRider = function(t) {
              var e = this.bikes.filter(function(e) {
                return e.getRider() == t
              });
              if (e && e.length > 0) {
                return e[0]
              } else {
                return null
              }
            };
            n.prototype.voteRider = function(e, n) {
              var s = this.getBikeForRider(e);
              if (s) {
                s.getRider().addVote();
                this.moveBike(s, i.Bike.MOVE_PER_VOTE, n)
              } else {
                var r = t.ArrayTool.copy(this.bikes).sort(function(t, e) {
                  return t.getRider().getVotePosition() - e.getRider().getVotePosition()
                });
                var a = r[0];
                if (e.getVotePosition() + 1 > a.getRider().getVotePosition()) {
                  var o = a.getBikeNumber();
                  t.ArrayTool.remove(this.bikes, a);
                  a.destroy();
                  var u = new i.Bike($(".bikes", this.stage)[0], o, this.bikes_start_offset_x, e, this.bikes);
                  this.bikes.push(u);
                  u.getRider().addVote();
                  this.moveBike(u, 23, n)
                } else {
                  e.addVote()
                }
              }
              this.renderTicker()
            };
            n.prototype.initRoad = function() {
              var t = $(".route");
              t.append("<div></div><div></div>")
            };
            n.prototype.renderToContainer = function() {
              e.prototype.renderToContainer.call(this);
              var i = $(".bikes", this.stage);
              var s = window.outerWidth * Math.cos(t.MathTool.degToRad(n.ANGLE));
              this.positions_visible = s / n.GET_VW(n.PX_PER_POSITION);
              this.stage_left_extra = .2 * window.outerWidth;
              this.stage = $(".stage", this.view);
              this.bikes_start_offset_x = this.stage_left_extra + window.outerWidth / 2;
              this.setStageSize(0)
            };
            n.prototype.renderBikes = function() {
              var e = $(".bikes", this.stage);
              var n = t.ArrayTool.copy(this.riders).sort(function(t, e) {
                return e.getVotePosition() - t.getVotePosition()
              });
              n = n.slice(0, 10);
              var s = t.ArrayTool.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
              for (var r = 0; r < 10; r++) {
                var a = new i.Bike(e[0], s[r], this.bikes_start_offset_x, n[r], this.bikes);
                this.bikes.push(a)
              }
              this.setStageSize(this.getMaxPositionOfBikes());
              this.moveCamera(0, 0);
              this.initRoad()
            };
            n.prototype.setStageSize = function(t) {
              t = n.GET_VW(1e4);
              var e = t * n.GET_VW(n.PX_PER_POSITION) + this.stage_left_extra + window.outerWidth * 2;
              this.stage.css("width", e + "px")
            };
            n.prototype.getMaxPositionOfBikes = function() {
              return t.ArrayTool.max(this.bikes.map(function(t) {
                return t.getPosition()
              }))
            };
            n.prototype.zoomIn = function() {
              TweenMax.to(this.stage, 5, {
                height: "100%"
              })
            };
            n.prototype.zoomOut = function() {
              TweenMax.to(this.stage, 5, {
                height: "30%"
              })
            };
            n.prototype.moveBikeXTest = function(t, e) {
              var i = this.bikes[t];
              this.moveBike(i, e, null)
            };
            n.prototype.moveBikeX = function(t, e, i) {
              var n = this.bikes[t];
              this.moveBike(n, e, i)
            };
            n.prototype.moveBike = function(t, e, i) {
              var n = this;
              var s = t.getPosition() + e;
              this.setStageSize(Math.max(this.getMaxPositionOfBikes(), s));
              var r = new TimelineMax;
              if (this.getCameraPosition() != t.getPosition()) {
                r.add(this.moveCameraToStaticBikeGetAnimation(t))
              }
              r.addCallback(function() {
                r.pause();
                var e = new TimelineMax;
                e.add(t.setPosition(s, n.moveCamera(s), i));
                e.addCallback(function() {
                  n.movingBike = null;
                  n.showNextMessageIfPossible()
                }, "+=3");
                e.play()
              }, "+=0.01");
              this.movingBike = t;
              r.play()
            };
            n.prototype.moveCamera = function(e, i) {
              if (i === void 0) {
                i = 5
              }
              var s = e * n.GET_VW(n.PX_PER_POSITION);
              s = Math.min(23 * 400 * n.GET_VW(n.PX_PER_POSITION), s);
              var r = -this.stage_left_extra - Math.cos(t.MathTool.degToRad(n.ANGLE)) * s;
              var a = .1 * r;
              a = n.GET_VW(250) + s * Math.sin(t.MathTool.degToRad(n.ANGLE));
              var o = e + "%";
              var u = [TweenMax.to(this.stage, i, {
                x: r,
                y: a,
                force3D: true
              }), TweenMax.to(this, i, {
                setCameraPosition: e
              })];
              if (this.road) {}
              return u
            };
            n.prototype.getCameraPosition = function() {
              return this.cameraPosition
            };
            n.prototype.setCameraPosition = function(e) {
              var i = this;
              var n = this.cameraPosition;
              var s = Math.round(e);
              this.cameraPosition = s;
              if (s != n) {
                var r = s - Math.floor(this.positions_visible / 2);
                var a = s + Math.floor(this.positions_visible / 2);
                $(".names-left").empty();
                $(".names-right").empty();
                t.ArrayTool.copy(this.bikes).sort(function(t) {
                  return t.getPosition()
                }).reverse().map(function(t) {
                  var e = t.getPosition();
                  if (t == i.movingBike) {
                    t.showNameInBar()
                  } else if (e < r) {
                    t.renderNameToBox($(".names-left"))
                  } else if (e > a) {
                    t.renderNameToBox($(".names-right"))
                  } else {
                    t.showNameInBar()
                  }
                })
              }
            };
            n.prototype.moveCameraToStaticBikeGetAnimation = function(t) {
              this.cameraAtBike = t;
              return this.moveCamera(t.getPosition())
            };
            n.prototype.moveCameraToStaticBike = function(t) {
              var e = this;
              this.cameraAtBike = t;
              this.movingCamera = true;
              var i = new TimelineMax;
              i.add(this.moveCamera(t.getPosition()));
              i.addCallback(function() {
                e.movingCamera = false;
                e.showNextMessageIfPossible()
              }, "+=0.01");
              i.play()
            };
            n.prototype.moveCameraToNextBike = function() {
              var e = this;
              this.moveCameraIntervalId = window.setTimeout(function() {
                return e.moveCameraToNextBike()
              }, 6200);
              if (this.movingBike || this.movingCamera) {
                return
              }
              var i = t.ArrayTool.copy(this.bikes).sort(function(t, e) {
                return t.getPosition() - e.getPosition()
              });
              var n;
              if (this.cameraAtBike != null) {
                for (var s = 0; s < i.length; s++) {
                  if (i[s] == this.cameraAtBike) {
                    n = i[s + 1]
                  }
                }
              }
              if (!n) {
                n = i[0]
              }
              this.moveCameraToStaticBike(n)
            };
            n.prototype.destroy = function() {
              this.liveMessageProvider.reset();
              window.clearInterval(this.moveCameraIntervalId);
              e.prototype.destroy.call(this)
            };
            n.PX_PER_POSITION = 50;
            n.ANGLE = 12;
            return n
          }(e.ContainerSlide);
          i.MountainSlide = n
        })(n = i.mountain || (i.mountain = {}))
      })(i = e.tdfutrecht || (e.tdfutrecht = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e(t) {
          this.ctx = t;
          this.width = t.width();
          this.height = t.height();
          this.zoom = this.height / 2;
          this.setupWorld();
          this.projection = d3.geo.orthographic().scale(this.getZoom()).translate([this.width / 2, this.height / 2]).clipAngle(90)
        }
        e.prototype.setZoom = function(t) {
          this.zoom = t;
          this.draw()
        };
        e.prototype.getZoom = function() {
          return this.zoom
        };
        e.prototype.setupWorld = function() {
          var e = this;
          var i = $("<canvas>").attr("width", this.width).attr("height", this.height);
          this.ctx.append(i);
          this.canvas = i[0];
          window["queue"]().defer(d3.json, t.App.ROOT + "lib/world-110m.js").await(function(t, i, n) {
            return e.ready(t, i, n)
          })
        };
        e.prototype.zoomTo = function(t, e) {
          var i = this;
          var n = this.projection;
          var s = this.width;
          var r = this.height;
          var a = function() {
            return i.draw()
          };
          var o = function(t) {
            return i.setZoom(t)
          };
          this.target = t;
          var u = t;
          var h = u,
              l = d3.interpolate(n.rotate(), [-h[0], -h[1]]),
              c = d3.interpolate(n.scale(), 1e3);
          var g = {
            progress: 0,
            setProgress: function(t) {
              g.progress = t;
              g.update()
            },
            getProgress: function() {
              return g.progress
            },
            update: function() {
              var t = g.progress;
              n.rotate(l(t));
              var e = c(t);
              o(e);
              n.scale(e);
              a()
            }
          };
          return TweenMax.to(g, e / 1e3, {
            setProgress: 1
          })
        };
        e.prototype.draw = function() {
          var t = {
            type: "Sphere"
          },
              e = window["topojson"];
          var t = {
            type: "Sphere"
          },
              i = e.feature(this.world, this.world.objects.land),
              n = e.feature(this.world, this.world.objects.countries).features,
              s = e.mesh(this.world, this.world.objects.countries, function(t, e) {
              return t !== e
            });
          var r = this.canvas.getContext("2d");
          var a = d3.geo.path().projection(this.projection).context(r).pointRadius(this.zoom / (this.height / 2));
          r.clearRect(0, 0, this.width, this.height);
          r.fillStyle = "#bbb", r.beginPath(), a(i), r.fill();
          r.strokeStyle = "#fff", r.lineWidth = .5, r.beginPath(), a(s), r.stroke();
          if (this.target) {
            var o = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: this.target
              }
            };
            r.fillStyle = "#FF0000", r.beginPath(), a(o), r.fill()
          }
        };
        e.prototype.ready = function(t, e, i) {
          this.world = e;
          this.draw()
        };
        return e
      }();
      e.Globe = i
    })(i = e.globe || (e.globe = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t(t, e, i, n, s, r) {
          if (s === void 0) {
            s = -1
          }
          if (r === void 0) {
            r = -1
          }
          this.rect_margin = 0;
          this.block_border_width = 1;
          this.grow_ratios = [1, 1, 1, 1];
          this.container = t;
          this.block_size = e;
          this.block_border_width = i;
          this.grow_ratios = n;
          this.offset_x = s;
          this.offset_y = r
        }
        t.prototype.render = function(t) {
          throw "not implemented"
        };
        return t
      }();
      t.Grid = e
    })(e = t.grid || (t.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t(t, e) {
          if (e === void 0) {
            e = 0
          }
          this.offset = 0;
          this.begin = t;
          this.offset = e
        }
        return t
      }();
      t.DrawRow = e
    })(e = t.grid || (t.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      (function(t) {
        t[t["SKIP"] = 0] = "SKIP";
        t[t["DRAW"] = 1] = "DRAW";
        t[t["END"] = 2] = "END"
      })(t.VItemType || (t.VItemType = {}));
      var e = t.VItemType;
      var i = function() {
        function t() {
          this.type = e.END;
          this.size = 0
        }
        t.prototype.draw = function(i) {
          this.type = e.DRAW;
          this.size = i;
          this.next = new t;
          return this.next
        };
        t.prototype.skip = function(i) {
          this.type = e.SKIP;
          this.size = i;
          this.next = new t;
          return this.next
        };
        t.prototype.computeSize = function() {
          var t = this.size;
          if (this.type != e.END) {
            t += this.next.computeSize()
          }
          return t
        };
        return t
      }();
      t.VItem = i
    })(e = t.grid || (t.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(e) {
        __extends(i, e);

        function i(t, i, n, s, r, a) {
          if (r === void 0) {
            r = -1
          }
          if (a === void 0) {
            a = -1
          }
          e.call(this, t, i, n, s, r, a)
        }
        i.prototype.getTopRows = function() {
          throw "not implemented"
        };
        i.prototype.getRows = function() {
          throw "not implemented"
        };
        i.prototype.render = function(t) {
          return this.renderByPattern(this.getTopRows(), this.getRows(), t)
        };
        i.prototype.renderByPattern = function(e, i, n) {
          var s = [];
          var r = Math.ceil((this.container.width() - this.offset_x) / (this.rect_margin + this.block_size));
          var a = Math.ceil((this.container.height() - this.offset_y) / (this.rect_margin + this.block_size));
          for (var o = 0; o < a + e.length; o++) {
            var u = (o + 7) % i.length;
            var h = o >= e.length ? i[u] : e[o];
            var l = 0;
            var c = null;
            while (l + h.offset < r) {
              if (c == null) {
                c = h.begin
              }
              if (c.type == t.VItemType.DRAW) {
                var g = n();
                var d = this.block_size;
                var p = (l + h.offset) * d + this.offset_x;
                var m = (o - e.length) * d + this.offset_y;
                g.setPosition(p, m);
                g.setSize(this.block_size * c.size - this.rect_margin, this.block_border_width);
                g.growRatio = this.grow_ratios[c.size - 1];
                g.appendTo(this.container);
                s.push(g);
                l += c.size
              } else if (c.type == t.VItemType.SKIP) {
                l += c.size
              }
              c = c.next
            }
          }
          return s
        };
        return i
      }(t.Grid);
      t.PatternGrid = e
    })(e = t.grid || (t.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(e) {
        __extends(i, e);

        function i(t, i, n, s, r, a) {
          if (r === void 0) {
            r = -1
          }
          if (a === void 0) {
            a = -1
          }
          e.call(this, t, i, n, s, r, a)
        }
        i.prototype.getTopRows = function() {
          var e = new t.VItem;
          e.skip(3).skip(1).skip(1).draw(3).skip(4);
          var i = new t.VItem;
          i.draw(3).skip(1).skip(1).skip(3).draw(3).skip(1);
          var n = [new t.DrawRow(e), new t.DrawRow(i)];
          return n
        };
        i.prototype.getRows = function() {
          var e = new t.VItem;
          e.skip(3).draw(1).draw(1).draw(1).draw(1).draw(1).skip(3).draw(1);
          var i = new t.VItem;
          i.draw(1).draw(1).draw(1).draw(3).draw(4).draw(1).draw(1);
          var n = new t.VItem;
          n.draw(3).draw(1).skip(3).skip(4).draw(1);
          var s = new t.VItem;
          s.skip(2).draw(1).skip(3).skip(4).draw(1).skip(1);
          var r = new t.VItem;
          r.skip(2).draw(3).draw(1).skip(4).draw(1).skip(1);
          var a = new t.VItem;
          a.draw(3).draw(1).skip(3).draw(1).draw(1).draw(1).draw(1).draw(1);
          var o = new t.VItem;
          o.skip(1).draw(1).skip(3).draw(1).draw(1).draw(1).draw(1).draw(1).skip(2);
          var u = new t.VItem;
          u.skip(1).draw(1).draw(1).draw(1).draw(1).draw(3).draw(1).draw(1).skip(2);
          var h = new t.VItem;
          h.draw(3).draw(1).draw(1).skip(3).draw(3).draw(1);
          var l = new t.VItem;
          l.skip(3).draw(1).draw(1).skip(3).skip(3).draw(1);
          var c = [new t.DrawRow(e), new t.DrawRow(i), new t.DrawRow(n, -1), new t.DrawRow(s), new t.DrawRow(r), new t.DrawRow(a, -2), new t.DrawRow(o), new t.DrawRow(u), new t.DrawRow(h), new t.DrawRow(l)];
          return c
        };
        return i
      }(t.PatternGrid);
      t.ClassicGrid = e
    })(e = t.grid || (t.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(e) {
        __extends(i, e);

        function i(t, i, n, s, r, a) {
          if (r === void 0) {
            r = -1
          }
          if (a === void 0) {
            a = -1
          }
          e.call(this, t, i, n, s, r, a)
        }
        i.prototype.getTopRows = function() {
          return []
        };
        i.prototype.getRows = function() {
          var e = new t.VItem;
          e.draw(1).draw(1);
          var i = [new t.DrawRow(e)];
          return i
        };
        return i
      }(t.PatternGrid);
      t.SmallGrid = e
    })(e = t.grid || (t.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(t) {
        __extends(e, t);

        function e(e, i, n, s, r, a) {
          if (r === void 0) {
            r = -1
          }
          if (a === void 0) {
            a = -1
          }
          t.call(this, e, i, n, s, r, a)
        }
        e.prototype.render = function(t) {
          var e = [{
            x: 0,
            y: 0,
            size: 2
          }, {
            x: 2,
            y: 0,
            size: 1
          }, {
            x: 3,
            y: 0,
            size: 1
          }, {
            x: 4,
            y: 0,
            size: 1.5
          }, {
            x: 5.5,
            y: 0,
            size: 2.1
          }, {
            x: 7.6,
            y: 0,
            size: 2.1
          }, {
            x: 9.7,
            y: 0,
            size: 2.3
          }, {
            x: 12,
            y: 0,
            size: 1.3
          }, {
            x: 12,
            y: 1.3,
            size: 1.3
          }, {
            x: 13.3,
            y: 0,
            size: 2.7
          }, {
            x: 13.7,
            y: 2.7,
            size: 2.3
          }, {
            x: 14.55,
            y: 5,
            size: 1.45
          }, {
            x: 2,
            y: 1,
            size: 2
          }, {
            x: 0,
            y: 2,
            size: 2
          }, {
            x: 0,
            y: 4,
            size: 1
          }, {
            x: 0,
            y: 5,
            size: 1
          }, {
            x: 0,
            y: 6,
            size: 3
          }, {
            x: 3,
            y: 8,
            size: 1
          }, {
            x: 4,
            y: 8,
            size: 1
          }, {
            x: 3,
            y: 7,
            size: 1
          }, {
            x: 4,
            y: 7,
            size: 1
          }, {
            x: 5,
            y: 7.5,
            size: 1.5
          }, {
            x: 6.5,
            y: 7.5,
            size: 1.5
          }, {
            x: 8,
            y: 8,
            size: 1
          }, {
            x: 9,
            y: 8,
            size: 1
          }, {
            x: 8,
            y: 7,
            size: 1
          }, {
            x: 9,
            y: 7,
            size: 1
          }, {
            x: 10,
            y: 7.2,
            size: 1.8
          }, {
            x: 11.8,
            y: 6.5,
            size: 2.5
          }, {
            x: 14.3,
            y: 6.45,
            size: 1.7
          }, {
            x: 14.3,
            y: 8.15,
            size: .85
          }, {
            x: 15.15,
            y: 8.15,
            size: .85
          }];
          return this.initRectangles(e, t)
        };
        e.prototype.initRectangles = function(t, e) {
          var i = [];
          var n = Math.ceil((this.container.width() - this.offset_x) / (this.rect_margin + this.block_size));
          var s = Math.ceil((this.container.height() - this.offset_y) / (this.rect_margin + this.block_size));
          n = 16;
          s = 9;
          this.block_size = Math.ceil(this.container.height() / s);
          for (var r = 0; r < t.length; r++) {
            var a = t[r];
            var o = this.block_size;
            var u = e();
            u.setPosition(Math.ceil(a.x * this.block_size), Math.ceil(a.y * this.block_size));
            u.setSize(Math.floor(a.size * this.block_size), this.block_border_width);
            var h = Math.max(0, Math.min(this.grow_ratios.length - 1, Math.round(a.size) - 1));
            u.growRatio = this.grow_ratios[h];
            u.appendTo(this.container);
            i.push(u)
          }
          return i
        };
        return e
      }(t.Grid);
      t.EmptyCenterGrid = e
    })(e = t.grid || (t.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(n) {
        __extends(s, n);

        function s(s, r) {
          var a = this;
          n.call(this, s, r);
          this.currentTintColor = 0;
          this.branding_style = null;
          this.firstMessagesLoaded = false;
          this.previousWidth = null;
          this.previousHeight = null;
          this.rawSettings = $.extend(true, {}, JSON.parse(JSON.stringify(new i.Settings)), r["classic"]);
          e.Templates.load(t.App.ROOT + "view/templates?" + Math.random(), function() {
            return a.initialize()
          });
          window.onresize = t.Debounce.debounced(function() {
            return a.handleResize()
          }, 300)
        }
        s.prototype.handleResize = function() {
          if (this.previousHeight != window.innerHeight || this.previousWidth != window.innerWidth) {
            this.initialize()
          }
        };
        s.prototype.destroy = function() {
          clearTimeout(this.showTimeout);
          clearTimeout(this.highlightTimeout);
          if (this.wrapper) {
            this.wrapper.remove();
            this.wrapper[0].innerHTML = ""
          }
          this.messageProvider.reset();
          this.firstMessagesLoaded = false;
          if (this.branding_style) {
            this.branding_style.remove();
            this.branding_style = null
          }
        };
        s.prototype.createFader = function() {
          if (this.settings.fader_type != "auto") {
            return t.InstanceLoader.createInstance(this.settings.fader_type, this.settings)
          }
          try {
            if (bowser.chrome) {
              return new i.FaderCanvas(this.settings)
            } else if (bowser.msie) {
              if (bowser.version >= 10) {
                return new i.FaderTransition(this.settings)
              } else {
                return new i.FaderStatic(this.settings)
              }
            } else if (bowser.firefox) {
              return new i.FaderCanvas(this.settings)
            } else if (bowser.safari || bowser.ipad || bowser.iphone) {
              if (bowser.version < 6) {
                return new i.FaderStatic(this.settings)
              } else {
                return new i.FaderCanvas(this.settings)
              }
            }
          } catch (e) {
            t.Debug.error(e)
          }
          return new i.FaderStatic(this.settings)
        };
        s.prototype.createBackgroundItem = function() {
          return new i.BackgroundItemLargeCanvas(this.settings.background_items)
        };
        s.prototype.initialize = function() {
          var e = this;
          t.Debug.log("INIT");
          this.destroy();
          this.previousHeight = window.innerHeight;
          this.previousWidth = window.innerWidth;
          this.visibleItems = new Array;
          this.wrapper = $("<div/>").addClass("overflow-wrapper");
          $(document.body).append(this.wrapper);
          this.ctx = $("<div/>", {
            id: "classic-view"
          });
          this.singleItemContainer = $("<div/>", {
            id: "classic-sitem-container",
            "class": "see-through"
          });
          this.singleItemContainer.appendTo(this.ctx);
          this.wrapper.append(this.ctx);
          this.settings = $.extend({}, this.rawSettings);
          if (this.isSmallMode()) {
            $.extend(this.settings, this.rawSettings.small_mode_settings)
          }
          this.overlay = this.createOverlay();
          this.wrapper.append(this.overlay);
          t.SocialButtons.refresh($(".social-buttons")[0]);
          this.fader = this.createFader();
          if (this.fader != null) {
            this.fader.appendTo(this.ctx)
          }
          this.highlightItemViews = new t.BackupQueue(this.settings.highlight_simultaneous);
          for (var n = 0; n < this.settings.highlight_simultaneous; n++) {
            var s;
            s = new i.HighlightItemView(this.settings, function() {
              return e.highlightItemViews.backupQueue
            });
            s.appendTo(this.ctx);
            this.highlightItemViews.enqueueAsBackup(s)
          }
          this.initializeCanvas(this.singleItemContainer);
          this.initRectangles();
          var r = t.ArrayTool.shuffle(t.ArrayTool.copy(this.visibleItems));
          if (this.settings.random_arg != null) {}
          this.positionManager = new t.view.classic.PositionManager2(r, 0, false, this.settings.fake_swaps);
          $(".progress-loading").show();
          this.messageProvider.setMessagesCallback(function(t) {
            return e.onMessages(t)
          });
          this.messageProvider.setFilterChangedCallback(function() {
            return e.onFilterChanged()
          });
          this.messageProvider.setNoMessagesCallback(function() {
            return e.onNoMessagesFound()
          });
          this.messageProvider.setHighlightCallback(function(t) {
            return e.onManualHighlight(t)
          });
          this.messageProvider.start(r.length)
        };
        s.prototype.initializeCanvas = function(t) {
          var e = this;
          this.canvas = $('<canvas style="position:absolute;top:0px;left:0px;"></canvas>').attr("width", t.width()).attr("height", t.height());
          t.append(this.canvas);
          i.BackgroundItemLargeCanvas.canvas = this.canvas;
          this.canvas.mousemove(function(t) {
            return e.checkHover(t)
          })
        };
        s.prototype.checkHover = function(t) {
          var e = t.offsetX === undefined ? t.originalEvent.layerX : t.offsetX;
          var i = t.offsetY === undefined ? t.originalEvent.layerY : t.offsetY;
          if (e == this.lastMouseX && i == this.lastMouseY) {
            return
          }
          this.lastMouseX = e;
          this.lastMouseY = i;
          for (var n = 0; n < this.visibleItems.length; n++) {
            if (this.visibleItems[n].checkHover(e, i)) {
              break
            }
          }
        };
        s.prototype.createBranding = function(t) {
          if (this.settings.branding_style) {
            this.branding_style = $("<style/>").append(this.settings.branding_style);
            $("head").append(this.branding_style)
          }
          if (this.settings.branding_content) {
            var e = Mustache.render(this.settings.branding_content, this.settings);
            t.append(e)
          }
        };
        s.prototype.createOverlay = function() {
          var t = $("<div/>", {
            id: "ui-overlay"
          });
          if (this.isFullscreen()) {
            $(document.body).addClass("fullscreen")
          } else {
            $(document.body).removeClass("fullscreen")
          }
          if (this.settings.licensed) {
            $(document.body).addClass("licensed")
          }
          t.append(Mustache.render(e.Templates.get("#ui-overlay"), this.settings));
          t.find(".btn-info-toggle").click(function(t) {
            $(".ui-info").toggle();
            return false
          });
          var i = t.find(".btn-fullscreen");
          var n = document.body["webkitRequestFullScreen"] || document.body["requestFullScreen"] || document.body["mozRequestFullScreen"] || document.body["msRequestFullscreen"];
          if (n === undefined) {
            if (bowser.ipad) {
              i.click(function(t) {
                window.location.href += window.location.href.indexOf("?") > -1 ? "&fullscreen=true" : "?fullscreen=true";
                return false
              })
            } else if (this.isSmallMode()) {
              i.hide()
            } else {
              i.click(function(t) {
                t.preventDefault();
                $(".ui-fullscreen-tip").toggle();
                return false
              })
            }
          } else {
            i.click(function(t) {
              t.preventDefault();
              n.call(document.body)
            })
          }
          this.createBranding(t);
          return t
        };
        s.prototype.isFullscreen = function() {
          var e = t.BrowserInfo.getQueryParameters()["fullscreen"] || document["fullScreen"] || document["webkitIsFullScreen"] || document["mozIsFullscreen"];
          if (typeof e === "undefined" && bowser.msie) {
            e = window.innerHeight + 40 >= window.screen.height
          }
          if (!e && !this.isSmallMode()) {
            e = window.innerHeight == window.screen.height
          }
          return e
        };
        s.prototype.onBackgroundItemHover = function(t) {
          var e = this;
          if (this.last_highlighted != t) {
            this.last_highlighted = t;
            this.highlightItemViews.dequeueAndReadd().show(t);
            clearTimeout(this.highlightTimeout);
            this.highlightTimeout = setTimeout(function() {
              return e.highlightNextItem()
            }, this.settings.highlight_resume_time)
          }
        };
        s.prototype.highlightNextItem = function() {
          var e = this;
          try {
            var i = this.highlightItemViews.backupQueue.filter(function(t) {
              return t.highlightedBackgroundItem != null
            });
            var n = t.CollectionTool.setFromArray(i.map(function(t) {
              return t.highlightedBackgroundItem.getMessage().id
            }));
            var s = this.positionManager.getItemToHighlight(n);
            if (s) {
              this.last_highlighted = s;
              this.highlightItemViews.dequeueAndReadd().show(s);
              if (this.settings.highlight_debug) {
                t.Debug.log((new Date).getTime() + "," + s.getMessage().id + "," + s.getMessage().message)
              }
            }
          } catch (r) {
            t.Debug.error(r)
          }
          this.highlightTimeout = setTimeout(function() {
            return e.highlightNextItem()
          }, this.settings.highlight_interval)
        };
        s.prototype.showNextItem = function() {
          var e = this;
          try {
            this.positionManager.showNewMessage()
          } catch (i) {
            t.Debug.error(i)
          }
          this.showTimeout = setTimeout(function() {
            return e.showNextItem()
          }, this.settings.swap_interval)
        };
        s.prototype.isSmallMode = function() {
          return this.ctx.width() <= this.settings.small_mode_width
        };
        s.prototype.initRectangles = function() {
          var e = this;
          var i = function() {
            var t = e.createBackgroundItem();
            t.setHoverCallback(function(t) {
              return e.onBackgroundItemHover(t)
            });
            return t
          };
          var n;
          if (this.settings.empty_center_grid) {
            n = new t.components.grid.EmptyCenterGrid(this.singleItemContainer, this.settings.block_size, this.settings.block_border_width, this.settings.grow_ratios)
          } else {
            if (this.isSmallMode()) {
              n = new t.components.grid.SmallGrid(this.singleItemContainer, this.settings.block_size, this.settings.block_border_width, this.settings.grow_ratios)
            } else {
              n = new t.components.grid.ClassicGrid(this.singleItemContainer, this.settings.block_size, this.settings.block_border_width, this.settings.grow_ratios)
            }
          }
          Array.prototype.push.apply(this.visibleItems, n.render(i))
        };
        s.prototype.hideProgressContainer = function() {
          $(".progress-container").fadeOut("slow")
        };
        s.prototype.onFilterChanged = function() {
          this.positionManager.filterMessages(this.messageProvider)
        };
        s.prototype.onMessages = function(t) {
          this.positionManager.addMessages(t);
          if (!this.firstMessagesLoaded) {
            this.onFirstMessages(t);
            this.firstMessagesLoaded = true
          }
        };
        s.prototype.onFirstMessages = function(t) {
          var e = this;
          this.showTimeout = setTimeout(function() {
            return e.showNextItem()
          }, this.settings.swap_interval);
          this.highlightTimeout = setTimeout(function() {
            return e.highlightNextItem()
          }, this.settings.highlight_start_time);
          this.hideProgressContainer()
        };
        s.prototype.onNoMessagesFound = function() {
          this.hideProgressContainer();
          $(".progress-no-messages").fadeIn();
          t.Analytics.trackEvent("show", "empty", undefined, undefined, true)
        };
        s.prototype.onManualHighlight = function(e) {
          var n = this;
          if (e == null) {
            this.highlightNextItem()
          } else {
            clearTimeout(this.highlightTimeout);
            try {
              var s = new i.BackgroundItemLargeCanvas(this.settings.background_items);
              s.setSize(this.settings.block_size * 3, this.settings.block_border_width);
              var r = window.outerWidth / 2 - 100 + Math.round(Math.random() * 200);
              var a = window.outerHeight / 2 - 100 + Math.round(Math.random() * 200);
              s.setPosition(r, a);
              s.growRatio = 1.15;
              t.ImagePreloader.preload(s.getImagesToPreload(e)).always(function() {
                var t = [];
                for (var e = 0; e < arguments.length; e++) {
                  t[e - 0] = arguments[e]
                }
              }).done(function() {
                var t = [];
                for (var i = 0; i < arguments.length; i++) {
                  t[i - 0] = arguments[i]
                }
                s.swapMessage(e, t, false);
                n.highlightItemViews.dequeueAndReadd().show(s)
              }).fail(function() {
                var t = [];
                for (var e = 0; e < arguments.length; e++) {
                  t[e - 0] = arguments[e]
                }
                n.highlightNextItem()
              })
            } catch (o) {
              t.Debug.error(o)
            }
          }
        };
        return s
      }(t.View);
      i.ClassicView = n
    })(i = e.classic || (e.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(t) {
        __extends(e, t);

        function e(e) {
          t.call(this, e)
        }
        e.prototype.create = function() {
          this.ctxel = $("<canvas/>").attr({
            width: "1px",
            height: "1px"
          }).css({
            width: "100%",
            height: "100%"
          });
          this.ctx = this.ctxel.get(0).getContext("2d");
          return t.prototype.create.call(this).append(this.ctxel)
        };
        e.prototype.renderColor = function(t) {
          this.ctx.fillStyle = "rgb(" + parseInt(t["r"]) + "," + parseInt(t["g"]) + "," + parseInt(t["b"]) + ")";
          this.ctx.fillRect(0, 0, 1, 1)
        };
        return e
      }(t.FaderAnimation);
      t.FaderCanvas = e
    })(e = t.classic || (t.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(t) {
        __extends(e, t);

        function e(e) {
          t.call(this, e)
        }
        e.prototype.renderColor = function(t) {
          this.dom[0].style.backgroundColor = "rgb(" + parseInt(t["r"]) + "," + parseInt(t["g"]) + "," + parseInt(t["b"]) + ")"
        };
        return e
      }(t.FaderAnimation);
      t.FaderCSS = e
    })(e = t.classic || (t.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(t) {
        __extends(e, t);

        function e(e) {
          t.call(this, e)
        }
        e.prototype.create = function() {
          t.prototype.create.call(this);
          var e = 0;
          var i = this.settings.bg_colors[e];
          this.dom.css({
            "background-color": i
          });
          return this.dom
        };
        return e
      }(t.Fader);
      t.FaderStatic = e
    })(e = t.classic || (t.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(t) {
        __extends(e, t);

        function e(e) {
          t.call(this, e)
        }
        e.prototype.create = function() {
          var e = this;
          t.prototype.create.call(this);
          var i = 0;
          this.dom.css({
            backgroundColor: this.settings.bg_colors[i]
          });
          var n = function() {
            i = (i + 1) % e.settings.bg_colors.length;
            e.dom.transition({
              backgroundColor: e.settings.bg_colors[i]
            }, {
              duration: e.colorChangeInterval,
              easing: "linear",
              complete: n
            })
          };
          n();
          return this.dom
        };
        return e
      }(t.Fader);
      t.FaderTransition = e
    })(e = t.classic || (t.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e(t, e) {
          this.target_frame_delta = 1e3 / 60;
          this.settings = t;
          this.createDOM();
          this.additionalBoxProviders = e
        }
        e.prototype.createDOM = function() {
          var t = this.dom;
          this.dom = $('<div id="selected-item">\n                    <div id="content-outer">\n                        <div id="content-inner">\n                            <div class="header"></div>\n                            <div class="message-text"></div>\n                            <div class="date-text"></div>\n                        </div>\n                    </div>\n                </div>');
          this.contentOuter = $("#content-outer", this.dom);
          this.contentInner = $("#content-inner", this.dom);
          this.contentInner.css({
            x: -this.settings.highlight_slide_width
          });
          this.messageText = $(".message-text", this.dom);
          this.dateText = $(".date-text", this.dom);
          this.header = $(".header", this.dom);
          this.img = null;
          if (t != null) {
            t.replaceWith(this.dom)
          }
        };
        e.prototype.appendTo = function(t) {
          this.dom.appendTo(t)
        };
        e.prototype.show = function(t) {
          if (this.currentAnimation) {
            this.currentAnimation.cancel()
          }
          this.highlightedBackgroundItem = t;
          this.createDOM();
          this.updateDOMWithMessage(this.highlightedBackgroundItem.getMessage());
          this.x = this.highlightedBackgroundItem.getImageX();
          this.y = this.highlightedBackgroundItem.getImageY();
          this.dom[0].style.display = "block";
          this.dom[0].style.left = this.x + "px";
          this.dom[0].style.top = this.y + "px";
          this.dom[0].style.margin = "0";
          this.startAnimations()
        };
        e.prototype.getHighlightedImage = function() {
          return this.highlightedBackgroundItem.provideHighlightedImageNonSquare()
        };
        e.prototype.updateDOMWithMessage = function(e) {
          if (e == undefined) {
            return
          }
          var i = this.getHighlightedImage();
          i.className = "image";
          if (this.img != null) {
            this.dom[0].removeChild(this.img)
          }
          this.dom[0].appendChild(i);
          this.img = i;
          var n = "";
          if (this.settings.highlight_show_date) {
            n = t.DateTool.timeAgo(e.date)
          }
          if (this.settings.highlight_show_source) {
            var s = e instanceof t.InstagramMessage ? "Instagram" : "Twitter";
            if (n.length) {
              n += " on " + s
            } else {
              n = "On " + s
            }
          }
          if (this.settings.highlight_twitter_text_entities) {
            this.messageText[0].innerHTML = e.getHTMLMessage(150)
          } else {
            var r = e.getMessage(150);
            if (this.settings.highlight_hide_urls_end) {
              r = e.getMessageTrimmedRemoveURLsEnd(150)
            }
            if (document.body.className.indexOf("fullscreen") == -1) {
              var a = $('<a target="_blank"></a>').attr("href", e.getURL());
              this.setTextContent(a[0], r);
              this.messageText[0].appendChild(a[0])
            } else {
              this.setTextContent(this.messageText[0], r)
            }
          }
          var o = document.createElement("span");
          o.appendChild(document.createTextNode(e.getUserName()));
          this.header[0].appendChild(o);
          var u = e.getSociconClass();
          if (u) {
            this.header[0].appendChild(document.createTextNode(" "));
            var h = document.createElement("span");
            h.className = u;
            this.header[0].appendChild(h)
          }
          if (e instanceof t.TwitterMessage) {
            var l = document.createElement("span");
            l.className = "header-subline";
            l.appendChild(document.createTextNode("@" + e.getScreenName()));
            this.header[0].appendChild(l)
          }
          if (n && n.length) {
            this.dateText[0].style.display = "block";
            this.setTextContent(this.dateText[0], n)
          } else {
            this.dateText[0].style.display = "none"
          }
        };
        e.prototype.setTextContent = function(t, e) {
          t.innerHTML = "";
          t.appendChild(document.createTextNode(e))
        };
        e.prototype.setFramerate = function(t) {
          this.target_frame_delta = 1e3 / t
        };
        e.prototype.startAnimations = function() {
          var t = this;
          if (this.settings.avoid_collision_enabled) {
            this.avoidCollision(this.x, this.y)
          }
          this.currentAnimation = new n(this, this.target_frame_delta, this.settings.highlight_image_grow_time, function() {
            return t.slideOutMessage()
          })
        };
        e.prototype.getBoundingBox = function() {
          if (this.highlightedBackgroundItem == null) {
            return null
          }
          var t = 10;
          var e = this.getImageWidthAfterGrowIncludingBorders() + this.settings.highlight_slide_width + t * 2;
          var i = this.getImageHeightAfterGrowIncludingBorders() + t * 2;
          var n = this.highlightedBackgroundItem.getItemSize();
          var s = (this.getImageWidthAfterGrowIncludingBorders() - n) / 2;
          var r = (this.getImageHeightAfterGrowIncludingBorders() - n) / 2;
          return {
            x: this.x - t - s,
            y: this.y - t - r,
            width: e,
            height: i
          }
        };
        e.prototype.avoidCollision = function(e, i) {
          var n = this;
          var s = this.dom.offset().left - e;
          var r = this.dom.offset().top - i;
          var a = this.highlightedBackgroundItem.getItemSize();
          var o = (this.getImageWidthAfterGrowIncludingBorders() - a) / 2;
          var u = (this.getImageHeightAfterGrowIncludingBorders() - a) / 2;
          var h = 10;
          var l = $(".collide").filter(function() {
            return $(this).css("display") != "none"
          }).map(function() {
            return {
              x: $(this).offset().left - s,
              y: $(this).offset().top - r,
              width: parseInt($(this).css("width")),
              height: parseInt($(this).css("height"))
            }
          }).get();
          var c = this.additionalBoxProviders().filter(function(t) {
            return t != n
          }).map(function(t) {
            return t.getBoundingBox()
          }).filter(function(t) {
            return t != null
          });
          Array.prototype.push.apply(l, c);
          var g = {
            x: 0,
            y: 0,
            width: this.dom.parent().width(),
            height: this.dom.parent().height()
          };
          var d = t.FreePositionFinder.getClosestFreePositionByBox(g, this.getBoundingBox(), l);
          var p = d.x + h + o;
          var m = d.y + h + u;
          this.x = p;
          this.y = m;
          var f = this.dom;
          var v = {
            x: p - e,
            y: m - i
          };
          var w = {
            left: p,
            top: m
          };
          this.dom.transition(bowser.msie && bowser.version >= 10 ? w : v, {
            duration: this.settings.highlight_avoid_collision_time,
            queue: false,
            easing: "easeOutQuad",
            cleanup: true,
            complete: function() {
              return f.css({
                x: 0,
                y: 0,
                left: p,
                top: m
              })
            }
          })
        };
        e.prototype.slideOutMessage = function() {
          this.contentOuter.css({
            left: $(this.img).outerWidth(),
            width: this.settings.highlight_slide_width
          });
          this.contentInner.css({
            width: this.settings.highlight_slide_width
          });
          this.contentOuter.show();
          this.contentInner.transition({
            x: 0
          }, {
            cleanup: false,
            duration: this.settings.highlight_content_slide_time,
            easing: "linear"
          })
        };
        e.prototype.getLeftBorderWidth = function() {
          return this.settings.highlight_border_width
        };
        e.prototype.getImageSizeBeforeExcludingBorders = function() {
          return this.highlightedBackgroundItem.getItemSize()
        };
        e.prototype.getImageSizeBeforeGrowIncludingBorders = function() {
          return this.highlightedBackgroundItem.getItemSize() + this.getLeftBorderWidth() * 2
        };
        e.prototype.getImageWidthAfterGrowIncludingBorders = function() {
          return this.img.width + this.getLeftBorderWidth() * 2
        };
        e.prototype.getImageHeightAfterGrowIncludingBorders = function() {
          return this.img.height + this.getLeftBorderWidth() * 2
        };
        return e
      }();
      e.HighlightItemView = i;
      var n = function() {
        function t(t, e, i, n) {
          var s = this;
          this.isCancelled = false;
          this.old_time = 0;
          this.delta = 0;
          this.progress = 0;
          var r = t.getLeftBorderWidth();
          this.parent = t;
          this.sizeFrom = t.getImageSizeBeforeExcludingBorders();
          this.sizeToSmallest = t.img.width < t.img.height ? t.img.width : t.img.height;
          this.marginToY = -(t.getImageHeightAfterGrowIncludingBorders() - this.sizeFrom) / 2;
          this.marginToX = -(t.getImageWidthAfterGrowIncludingBorders() - this.sizeFrom) / 2;
          this.wrapStyle = t.dom[0].style;
          this.imgStyle = t.img.style;
          this.target_frame_delta = e;
          this.animation_time = i;
          this.onCompleteHandler = n;
          this.imgStyle.width = t.getImageWidthAfterGrowIncludingBorders() + "px";
          this.imgStyle.height = t.getImageHeightAfterGrowIncludingBorders() + "px";
          this.wrapStyle.marginLeft = this.marginToX + "px";
          this.wrapStyle.marginTop = this.marginToY + "px";
          $(t.img).css("transform", "scale(" + this.sizeFrom / this.sizeToSmallest + ")");
          t.dom.find("#content-outer").hide();
          $(t.img).transition({
            scale: 1
          }, {
            duration: this.animation_time,
            queue: false,
            cleanup: false,
            easing: "linear",
            complete: function() {
              if (!s.isCancelled) {
                s.onCompleteHandler()
              }
            }
          })
        }
        t.prototype.cancel = function() {
          this.parent.dom.stop();
          $(this.parent.img).stop();
          this.isCancelled = true
        };
        return t
      }()
    })(i = e.classic || (e.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e() {
          this.block_size = 60;
          this.block_border_width = 1;
          this.highlight_border_width = 10;
          this.rect_margin = 0;
          this.bg_fade_time = 1e4;
          this.bg_colors = ["#124049", "#451249", "#491912"];
          this.highlight_avoid_collision_time = 1e3;
          this.highlight_image_grow_time = 500;
          this.highlight_content_slide_time = 500;
          this.highlight_slide_width = 400;
          this.highlight_start_time = 5e3;
          this.highlight_interval = 1e4;
          this.highlight_resume_time = 5e3;
          this.highlight_show_date = false;
          this.highlight_show_source = false;
          this.highlight_debug = false;
          this.highlight_twitter_text_entities = false;
          this.highlight_hide_urls_end = false;
          this.highlight_simultaneous = 1;
          this.grow_ratios = [3.3, 2, 1.25, 1.15];
          this.swap_interval = 500;
          this.fake_swaps = false;
          this.message_custom = null;
          this.message_prefix = "Tag your tweets with";
          this.message_tag = "";
          this.show_instagram_logo = false;
          this.show_twitter_bird = true;
          this.branding_settings = null;
          this.branding_content = '\n            <div class="ui-credits show-fullscreen collide">\n                <table>\n                    <tr>\n                        <td style="padding-bottom:8px">\n                            <div class="ui-block ui-header ui-block-parent stretch-width">\n                                <div class="ui-block-white stretch-width">\n                                    <table class="stretch-width">\n                                        <tr>\n                                            <td style="width:34%;display:table-cell">\n                                                <object data="http://www.tweetbeam.com/resources/img/tweetbeam.svg"></object>\n                                            </td>\n                                            <td style="padding-left:10%;vertical-align:middle;display: table-cell">\n                                                <object data="http://www.tweetbeam.com/resources/beam/view/classic/res/poweredby.svg"></object>\n                                            </td>\n                                        </tr>\n                                    </table>\n                                </div>\n                            </div>\n                        </td>\n                    </tr>\n                    <tr class="ui-license">\n                        <td>\n                            <div class="ui-block ui-block-content">\n                                <a href="http://www.tweetbeam.com/commercial?ref=free_link_fs_close" target="_blank" class="btn-close"></a>\n                                <p class="anim-switch-children">\n                                    <a href="http://www.tweetbeam.com/commercial?ref=free_link_fs_anim_1" target="_blank">Free version: for evaluation only</a>\n                                    <a href="http://www.tweetbeam.com/commercial?ref=free_link_fs_anim_2" target="_blank">Get your event or display license</a>\n                                </p>\n                            </div>\n                        </td>\n                    </tr>\n                </table>\n            </div>';
          this.branding_style = null;
          this.licensed = false;
          this.fader_type = "auto";
          this.background_items = new t.components.grid.backgrounditem.Settings;
          this.avoid_collision_enabled = true;
          this.small_mode_width = 500;
          this.small_mode_settings = {
            grow_ratios: [1.5],
            highlight_slide_width: 180
          };
          this.random_arg = null;
          this.empty_center_grid = false
        }
        return e
      }();
      e.Settings = i
    })(i = e.classic || (e.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e(t) {
          this.max = 2e3;
          this.keep_after_max = 1500;
          this.itemsHighlighted = [];
          this.itemsToHighlight = [];
          this.messagesToAdd = [];
          this.preloadingMessages = [];
          this.emptyItems = t;
          this.itemCount = t.length
        }
        e.prototype.getItemCount = function() {
          return this.itemCount
        };
        e.prototype.getItemToSwap = function() {
          var t = this.itemsHighlighted.shift();
          if (!t) {
            t = this.itemsToHighlight.shift()
          }
          return t
        };
        e.prototype.fillEmptyItem = function(e, i) {
          var n = this;
          this.preloadingMessages.push(i);
          t.ImagePreloader.preload(e.getImagesToPreload(i)).always(function() {
            var e = [];
            for (var s = 0; s < arguments.length; s++) {
              e[s - 0] = arguments[s]
            }
            t.ArrayTool.remove(n.preloadingMessages, i)
          }).done(function() {
            var t = [];
            for (var s = 0; s < arguments.length; s++) {
              t[s - 0] = arguments[s]
            }
            e.swapMessage(i, t);
            n.itemsHighlighted.push(e)
          }).fail(function() {
            var t = [];
            for (var i = 0; i < arguments.length; i++) {
              t[i - 0] = arguments[i]
            }
            n.emptyItems.unshift(e)
          })
        };
        e.prototype.fillEmptyItems = function() {
          if (this.emptyItems.length > 0) {
            t.Debug.log("empty:" + this.emptyItems.length + " messages:" + this.messagesToAdd.length)
          }
          while (this.emptyItems.length > 0) {
            var e = this.emptyItems.pop();
            var i = this.getMessageOrBackupMessage();
            if (i) {
              this.fillEmptyItem(e, i)
            }
          }
        };
        e.prototype.getMessageOrBackupMessage = function() {
          var e = null;
          if (this.messagesToAdd.length) {
            e = this.messagesToAdd.shift()
          } else {
            e = t.ArrayTool.getRandom(this.itemsHighlighted.concat(this.itemsToHighlight).map(function(t) {
              return t.getMessage()
            }).concat(this.preloadingMessages))
          }
          return e
        };
        e.prototype.addMessages = function(t) {
          this.messagesToAdd.push.apply(this.messagesToAdd, t);
          if (this.messagesToAdd.length > this.max) {
            this.messagesToAdd.splice(0, this.keep_after_max)
          }
          this.fillEmptyItems()
        };
        e.prototype.getItemToHighlight = function() {
          var e = this.itemsToHighlight.shift();
          if (!e) {
            e = t.ArrayTool.getRandom(this.itemsHighlighted)
          } else {
            this.itemsHighlighted.push(e)
          }
          return e
        };
        e.prototype.showNewMessage = function() {
          var e = this;
          var i = this.messagesToAdd.shift();
          if (i) {
            var n = this.getItemToSwap();
            if (!n) {
              this.messagesToAdd.unshift(i);
              return
            }
            this.preloadingMessages.push(i);
            t.ImagePreloader.preload(n.getImagesToPreload(i)).always(function() {
              var n = [];
              for (var s = 0; s < arguments.length; s++) {
                n[s - 0] = arguments[s]
              }
              t.ArrayTool.remove(e.preloadingMessages, i)
            }).done(function() {
              var t = [];
              for (var s = 0; s < arguments.length; s++) {
                t[s - 0] = arguments[s]
              }
              n.swapMessage(i, t);
              e.itemsToHighlight.push(n)
            }).fail(function() {
              var t = [];
              for (var i = 0; i < arguments.length; i++) {
                t[i - 0] = arguments[i]
              }
              e.itemsHighlighted.unshift(n)
            })
          }
          this.fillEmptyItems()
        };
        e.prototype.filterMessages = function(t) {
          this.messagesToAdd = this.messagesToAdd.filter(function(e) {
            return t.passesFilter(e)
          });
          var e = [];
          this.itemsHighlighted = this.itemsHighlighted.filter(function(i) {
            var n = t.passesFilter(i.getMessage());
            if (!n) {
              e.push(i)
            }
            return n
          });
          this.itemsToHighlight = this.itemsToHighlight.filter(function(i) {
            var n = t.passesFilter(i.getMessage());
            if (!n) {
              e.push(i)
            }
            return n
          });
          this.emptyItems.push.apply(this.emptyItems, e);
          this.fillEmptyItems()
        };
        return e
      }();
      e.PositionManager = i
    })(i = e.classic || (e.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(n) {
        __extends(s, n);

        function s(t, s) {
          var r = this;
          n.call(this, t, s);
          this.settings = new i.Settings;
          this.messages = [];
          this.settings = $.extend({}, new i.Settings, s["lens"]);
          this.messageProvider.setMessagesCallback(function(t) {
            r.onMessages(t)
          });
          this.loadCSS("view/radar/radarview.css?" + Math.random());
          e.Templates.load("view/radar/res/templates.html", function() {
            return r.init()
          });
          var a = this;
          window["gmaps_initialize"] = function() {
            a.init_map()
          };
          this.loadScript()
        }
        s.prototype.loadScript = function() {
          var t = document.createElement("script");
          t.type = "text/javascript";
          t.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&" + "callback=gmaps_initialize";
          document.body.appendChild(t)
        };
        s.prototype.init_map = function() {
          var t = [{
            stylers: [{
              visibility: "simplified"
            }]
          }, {
            featureType: "water",
            stylers: [{
              color: "#021019",
              visibility: "simplified"
            }]
          }, {
            featureType: "landscape",
            stylers: [{
              color: "#08304b"
            }]
          }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{
              color: "#0c4152"
            }, {
              lightness: 5
            }]
          }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
              color: "#000000"
            }]
          }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
              color: "#0b434f"
            }, {
              lightness: 25
            }]
          }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
              color: "#000000"
            }]
          }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
              color: "#0b3d51"
            }, {
              lightness: 16
            }]
          }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
              color: "#000000"
            }]
          }, {
            elementType: "labels.text.fill",
            stylers: [{
              color: "#ffffff"
            }]
          }, {
            elementType: "labels.text.stroke",
            stylers: [{
              color: "#000000"
            }, {
              lightness: 13
            }]
          }, {
            featureType: "transit",
            stylers: [{
              color: "#146474"
            }]
          }, {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{
              color: "#000000"
            }]
          }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
              color: "#144b53"
            }, {
              lightness: 14
            }, {
              weight: 1.4
            }]
          }];
          var e = [{
            stylers: [{
              visibility: "simplified"
            }, {
              hue: "#08ff00"
            }, {
              gamma: .43
            }, {
              saturation: -69
            }, {
              lightness: -66
            }]
          }, {
            featureType: "water",
            stylers: [{
              hue: "#08ff00"
            }, {
              gamma: .05
            }, {
              visibility: "simplified"
            }]
          }];
          var i = {
            styles: t,
            zoom: 2,
            center: new google.maps.LatLng(-0, 0)
          };
          this.map = new google.maps.Map($(".background")[0], i);
          if (!this.overlay) {
            this.overlay = new google.maps.OverlayView;
            this.overlay.draw = function() {};
            this.overlay.setMap(this.map)
          }
        };
        s.prototype.init = function() {
          var t = '<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=API_KEY&sensor=false"></script>';
          $(document.body).append($('<div class="highlight"><div class="line-h1"></div><div class="line-v1"></div><div class="line-h2"></div><div class="line-v2"></div></div><div class="background"></div>'))
        };
        s.prototype.highlightMap = function(e) {
          t.Debug.log(e);
          var i = this.overlay.getProjection();
          var n = i.fromLatLngToContainerPixel(e);
          var s = this.map.getCenter();
          var r = i.fromLatLngToContainerPixel(s);
          var a = r.x - 200;
          var o = i.fromContainerPixelToLatLng(new google.maps.Point(n.x + a, n.y));
          this.map.panTo(o)
        };
        s.prototype.onMessages = function(t) {
          var e = this.messages.length == 0;
          for (var i = 0; i < t.length; i++) {
            if (t[i].tweetObject["coordinates"] != null) {
              this.messages.push(t[i])
            }
          }
          if (e) {}
        };
        return s
      }(t.View);
      i.RadarView = n
    })(i = e.radar || (e.radar = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(n) {
        __extends(s, n);

        function s(t, s) {
          var r = this;
          n.call(this, t, s);
          this.settings = new i.Settings;
          this.settings = $.extend({}, new i.Settings, s["minimal"]);
          this.messageProvider.setMessagesCallback(function(t) {
            r.onMessages(t)
          });
          this.loadCSS("view/minimal/minimalview.css?" + Math.random());
          e.Templates.load("view/minimal/res/templates.html", function() {
            return r.init()
          });
          window.onresize = function() {
            r.sizeText()
          }
        }
        s.prototype.sizeText = function() {
          var t = document.getElementsByClassName("content")[0];
          var e = 300;
          do {
            e = e - 1;
            t.style["font-size"] = e + "px"
          } while ((document.body.scrollHeight > document.body.offsetHeight || document.body.scrollWidth > document.body.offsetWidth) && e > 0)
        };
        s.prototype.init = function() {
          var t = this;
          var i = e.Templates.get("#minimal");
          $(document.body).empty();
          $(document.body).html(i);
          setInterval(function() {
            return t.swapMessage()
          }, 5e3);
          this.swapMessage();
          document.body.style.background = this.settings.background_color;
          document.body.style.color = this.settings.foreground_color;
          if (this.settings.bold) {
            $(".content").css("font-weight", "bold")
          }
        };
        s.prototype.swapMessage = function() {
          t.Debug.log("swapMessage");
          var e;
          try {} catch (i) {}
          if (e == undefined) {
            return
          }
          this.showMessage(e)
        };
        s.prototype.showMessage = function(t) {
          $(".content > div").empty();
          $(".content div").text(t.message).addClass("tosplit");
          $(".screenname").text(t.tweetObject["user"]["name"]);
          $(".username").text("@" + t.user);
          $(".avatar img").attr("src", t.getPrimaryImageUrl());
          this.sizeText();
          var e = new window["SplitText"](".tosplit", {
            type: "words,chars"
          });
          var i = e.chars;
          TweenLite.set(".tosplit", {
            perspective: 400
          });
          (new TimelineLite).staggerFrom(i, .8, {
            opacity: 0,
            scale: 0,
            y: 80,
            rotationX: 180,
            transformOrigin: "0% 50% -50"
          }, .01)
        };
        s.prototype.onMessages = function(t) {};
        return s
      }(t.View);
      i.MinimalView = n
    })(i = e.minimal || (e.minimal = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t() {
          this.background_color = "white";
          this.foreground_color = "black";
          this.bold = false
        }
        return t
      }();
      t.Settings = e
    })(e = t.minimal || (t.minimal = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(n) {
        __extends(s, n);

        function s(e, s) {
          this.settings = $.extend(true, {}, JSON.parse(JSON.stringify(new i.Settings)), s["lens"]);
          n.call(this, e, this.settings, t.App.ROOT + "view/lens/res/templates.html?" + Math.random());
          this.items = []
        }
        s.prototype.onDestroy = function() {
          $(".beam").empty();
          this.items = []
        };
        s.prototype.getWidth = function() {
          return this.view.width()
        };
        s.prototype.onInitialize = function() {
          TweenMax.ticker.fps(30);
          this.view = $(".beam").append(Mustache.render(e.Templates.get("#view-wrapper"), this.settings));
          this.itemsContainer = $(".items", this.view);
          this.initGrid();
          this.createBranding($(".highlight", this.view));
          t.SocialButtons.refresh($(".social-buttons")[0])
        };
        s.prototype.setMessageInfo = function(e) {
          var i = null;
          $(".background-img", this.view).removeClass("image-stock");
          if (e.hasEmbeddedImage()) {
            i = e.getPrimaryImageUrl()
          } else if (this.settings.background_images && this.settings.background_images.length) {
            i = t.ArrayTool.getRandom(this.settings.background_images);
            $(".background-img", this.view).addClass("image-stock")
          }
          if (i) {
            $(".highlight", this.view).addClass("has-image-2");
            $(".background-img", this.view).css("background-image", 'url("' + i + '")')
          } else {
            $(".highlight", this.view).removeClass("has-image-2")
          }
          var n = $(".message p", this.view);
          var s = e.message;
          s = s.replace(/\n/g, " ");
          n.text(s);
          n.off("click");
          n.click(function() {
            window.open(e.getURL())
          });
          $(".author-text", this.view).text("" + t.StringTool.removeDiacritics(e.getUserName()));
          $(".timeago", this.view).text(t.DateTool.timeAgo(e.date))
        };
        s.prototype.unHighlight = function(t) {
          var e = $(".foreground", this.view);
          var i = new TimelineLite;
          i.add(TweenLite.to(e, this.settings.unhighlight_clip_time / 1e3, {
            clip: "rect(0px," + e.width() + "px," + e.height() + "px, 0px)"
          }));
          i.add(t.startFadeInTo(.45));
          n.prototype.unHighlight.call(this, t)
        };
        s.prototype.onHighlight = function(t) {
          var e = t;
          var n = $(".foreground", this.view);
          var s = Math.ceil(n.height() / 2 - .5 * this.itemSize);
          var r = this.isSmallMode() ? .25 * this.itemSize : this.itemSize;
          var a = r + this.itemSize;
          var o = s + this.itemSize;
          var u = i.BackgroundItemInfiniteCanvas.infiniteCanvas.getCurrentX(e.getImageX());
          var h = i.BackgroundItemInfiniteCanvas.infiniteCanvas.getCurrentY(e.getImageY());
          var l = -u + i.BackgroundItemInfiniteCanvas.infiniteCanvas.getDx() + r;
          var c = -h + i.BackgroundItemInfiniteCanvas.infiniteCanvas.getDy() + s;
          this.setMessageInfo(e.getMessage());
          var g = new TimelineLite;
          g.add(e.startFadeInTo(1));
          g.add(i.BackgroundItemInfiniteCanvas.infiniteCanvas.panTo(l, c));
          g.add(TweenLite.fromTo(n, this.settings.highlight_clip_time / 1e3, {
            clip: "rect(0px," + n.width() + "px," + n.height() + "px, 0px)"
          }, {
            clip: "rect(" + s + "px," + a + "px," + o + "px," + r + "px)"
          }));
          var d = $(".message p", this.view);
          var p;
          if (this.settings.split_chars) {
            var m = new window["SplitText"](d, {
              type: "words,chars"
            });
            p = m.chars
          } else {
            var m = new window["SplitText"](d, {
              type: "lines"
            });
            p = m.lines
          }
          TweenLite.set(d, {
            perspective: 400
          });
          g.staggerFrom(p, .8, {
            opacity: 0,
            scale: 0,
            y: 80,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: Back.easeOut
          }, .005, "+=0")
        };
        s.prototype.initGrid = function() {
          var e = this;
          var n = this.view;
          var s = this.isSmallMode() ? 5 : 10;
          var r = Math.ceil(n.width() / s);
          var a = r;
          this.itemSize = r;
          var o = Math.ceil(n.height() / a) + 1;
          this.itemsContainer.width(s * r).height(o * a).css({
            left: 0,
            top: 0,
            position: "absolute"
          });
          this.grid = new t.components.grid.SmallGrid(this.itemsContainer, r, 0, [1], 0, 0);
          this.grid.render(function() {
            var t = new i.BackgroundItemInfiniteCanvas(e.settings);
            e.items.push(t);
            t.setHoverCallback(function(t) {
              return e.manualHighlightItem(t)
            });
            return t
          });
          t.ArrayTool.shuffle(this.items);
          this.positionManager = new t.view.classic.PositionManager2(this.items, 20, true);
          var u = Math.ceil(n.height() / 2 - .5 * this.itemSize);
          $(".square", this.view).width(this.itemSize).height(this.itemSize).css({
            left: (this.isSmallMode() ? this.itemSize * .25 : this.itemSize) + "px",
            top: u + "px"
          })
        };
        return s
      }(t.view.base.BaseView);
      i.LensView = n
    })(i = e.lens || (e.lens = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(n) {
        __extends(s, n);

        function s(e, s) {
          this.settings = $.extend(true, {}, JSON.parse(JSON.stringify(new i.Settings)), s["wedding"]);
          n.call(this, e, this.settings, t.App.ROOT + "view/wedding/res/templates.html?" + Math.random());
          this.items = []
        }
        s.prototype.onInitialize = function() {
          this.view = $(".beam").append(Mustache.render(e.Templates.get("#view-wrapper"), this.settings));
          this.itemsContainer = $(".items", this.view);
          this.initGrid();
          this.createBranding($(".below-tag", this.view));
          if ($(".social-buttons")) {
            t.SocialButtons.refresh($(".social-buttons")[0])
          }
          var i = $(".tag-container", this.view);
          var n = $(".below-tag", this.view);
          var s = $(".image-placeholder", this.view);
          var r = $(".text-placeholder", this.view);
          n[0].style.height = n.parent()[0].offsetHeight - i[0].offsetHeight + "px";
          var a = s[0].offsetHeight;
          var o = n.width() - a;
          if (o > 300) {
            s[0].style.width = a + "px";
            r[0].style.width = o - 5 + "px"
          } else {
            $(".content-container").addClass("vertical-layout");
            s[0].style.width = a - 150 + "px";
            s[0].style.height = a - 150 + "px";
            r[0].style.height = 150 + "px"
          }
        };
        s.prototype.onMessages = function(t) {
          $(".nomessages").css("display", "none");
          n.prototype.onMessages.call(this, t)
        };
        s.prototype.onNoMessages = function() {
          if (window.location.href.indexOf("demo") > -1) {
            t.Analytics.trackEvent("demo", "empty", undefined, undefined, true)
          }
          $(".nomessages").css("display", "block")
        };
        s.prototype.onDestroy = function() {
          $(".beam").empty()
        };
        s.prototype.getWidth = function() {
          return this.view.width()
        };
        s.prototype.onFilterChanged = function() {
          this.positionManager.filterMessages(this.messageProvider)
        };
        s.prototype.setMessageInfo = function(e) {
          var i = $(".message-content", this.view);
          var n = e.message;
          n = n.replace(/\n/g, " ");
          i.text(n);
          $(".author-text", this.view).text("- " + t.StringTool.removeDiacritics(e.getUserName()));
          t.SizeText.sizeText($(".text-placeholder", this.view)[0], 100)
        };
        s.prototype.manualHighlightItem = function(t) {
          if (this.highlightedItem != null) {
            var e = this.highlightedItem;
            e.setOpacity(1)
          }
          n.prototype.manualHighlightItem.call(this, t)
        };
        s.prototype.setupHighlightItem = function(t, e, i) {
          $(".highlight-item").width(this.itemSize);
          $(".highlight-item").height(this.itemSize);
          $(".highlight-item").css("background-image", 'url("' + i.getPrimaryImageUrl() + '")')
        };
        s.prototype.unHighlight = function(t) {
          var e = $(".items", this.view);
          var s = $(".highlight-item", this.view);
          var r = t;
          var a = $(".text-placeholder", this.view);
          var o = i.BackgroundItemInfiniteCanvas.infiniteCanvas.getCurrentX(r.getImageX());
          var u = i.BackgroundItemInfiniteCanvas.infiniteCanvas.getCurrentY(r.getImageY());
          var h = new TimelineLite;
          h.appendMultiple([TweenLite.to(a, .5, {
            opacity: 0
          }), TweenLite.to(e, .5, {
            opacity: 1
          }), TweenLite.to(s, .8, {
            left: o,
            top: u,
            width: this.itemSize,
            height: this.itemSize,
            ease: Quad.easeInOut
          })]);
          h.add(TweenLite.delayedCall(0, function() {
            r.setOpacity(1);
            s[0].style.left = "10000px"
          }));
          n.prototype.unHighlight.call(this, t)
        };
        s.prototype.onHighlight = function(t) {
          var e = t;
          var n = $(".items", this.view);
          var s = $(".highlight-item", this.view);
          var r = $(".text-placeholder", this.view);
          var a = i.BackgroundItemInfiniteCanvas.infiniteCanvas.getCurrentX(e.getImageX());
          var o = i.BackgroundItemInfiniteCanvas.infiniteCanvas.getCurrentY(e.getImageY());
          this.setMessageInfo(e.getMessage());
          this.setupHighlightItem(a, o, e.getMessage());
          e.clearImage();
          var u = new TimelineLite;
          var h = $(".image-placeholder");
          var l = h.offset();
          u.appendMultiple([TweenLite.fromTo(r, .5, {
            opacity: 0
          }, {
            opacity: 1
          }), TweenLite.to(n, .5, {
            opacity: .25
          }), TweenLite.fromTo(s, .8, {
            left: a,
            top: o
          }, {
            left: l.left,
            top: l.top,
            width: h[0].offsetWidth,
            height: h[0].offsetHeight,
            ease: Quad.easeInOut
          })])
        };
        s.prototype.initGrid = function() {
          var e = this;
          var n = this.view;
          var s = this.isSmallMode() ? 5 : 10;
          var r = Math.ceil(n.width() / s);
          var a = r;
          this.itemSize = r;
          var o = Math.ceil(n.height() / a);
          this.itemsContainer.width(s * r).height(o * a).css({
            left: 0,
            top: 0,
            position: "absolute"
          });
          this.grid = new t.components.grid.SmallGrid(this.itemsContainer, r, 0, [1], 0, 0);
          this.grid.render(function() {
            var t = new i.BackgroundItemInfiniteCanvas(e.settings);
            e.items.push(t);
            t.setHoverCallback(function(t) {
              return e.manualHighlightItem(t)
            });
            return t
          });
          t.ArrayTool.shuffle(this.items);
          this.positionManager = new t.view.classic.PositionManager2(this.items, 20);
          var u = Math.ceil(n.height() / 2 - .5 * this.itemSize);
          $(".square", this.view).width(this.itemSize).height(this.itemSize).css({
            left: (this.isSmallMode() ? this.itemSize * .25 : this.itemSize) + "px",
            top: u + "px"
          })
        };
        return s
      }(t.view.base.BaseView);
      i.WeddingView = n
    })(i = e.wedding || (e.wedding = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e(t, e, i) {
          this.element = t;
          t.data("slide", this);
          this.container = e;
          this.container.append(this.element);
          this.duration = i
        }
        e.prototype.getDuration = function() {
          return this.duration
        };
        e.prototype.getDurationIncludingChildren = function() {
          return this.timeline.duration() * 1e3 - this.slideOutDuration
        };
        e.prototype.getElement = function() {
          return this.element
        };
        e.prototype.getTimeline = function() {
          if (this.timeline) {
            return this.timeline
          }
          var t = new TimelineLite;
          var i = this.element[0].className.replace("next", "").replace("present", "").replace("past", "");
          var n = parseFloat(this.element.css("transition-duration"));
          var s = parseFloat(this.element.css("transition-delay"));
          t.insert(TweenMax.to(this.element, e.USE_TWEEN ? n : 1e-4, {
            css: {
              className: i + " present",
              force3D: true
            }
          }));
          var r = $(".effect", this.element).not($(".slide .effect", this.element));
          r.each(function(i, n) {
            var s = parseFloat($(n).css("transition-duration"));
            var r = parseFloat($(n).css("transition-delay"));
            var a = $(n).css("transition-timing-function");
            if (a == "linear") {
              t.insert(TweenMax.to(n, e.USE_TWEEN ? s : 1e-4, {
                css: {
                  className: "+=play",
                  force3D: true
                },
                ease: Linear.easeNone
              }), r)
            } else {
              t.insert(TweenMax.to(n, e.USE_TWEEN ? s : 1e-4, {
                css: {
                  className: "+=play",
                  force3D: true
                }
              }), r)
            }
          });
          this.slideOutDuration = e.USE_TWEEN ? n * 1e3 : 1e-4;
          var a = e.getCompleteTimeline(this.element[0]);
          if (a) {
            t.insert(a, this.duration / 1e3);
            t.add(TweenMax.to(this.element, this.slideOutDuration / 1e3, {
              css: {
                className: i + " past",
                force3D: true
              }
            }))
          } else {
            t.insert(TweenMax.to(this.element, this.slideOutDuration / 1e3, {
              css: {
                className: i + " past",
                force3D: true
              }
            }), this.duration / 1e3)
          }
          this.timeline = t;
          return t
        };
        e.getCompleteTimeline = function(e, i) {
          if (i === void 0) {
            i = false
          }
          var n = $(e).children(".slide");
          if (!n.length) {
            return null
          }
          var s = new TimelineLite;
          var r = 0;
          for (var a = 0; a < n.length; a++) {
            var o = $(n[a]).data("slide");
            if (a == 0 && i) {}
            if (a + 1 < n.length) {
              var u = $(n[a + 1]);
              s.set(u, {
                className: "+=next"
              }, r / 1e3)
            }
            var h = $(n[a]).children(".slide").first();
            if (h.length) {
              s.set(h, {
                className: "+=next"
              }, r / 1e3)
            }
            t.Debug.log(r);
            s.insert(o.getTimeline(), r / 1e3);
            r += o.getDurationIncludingChildren();
            t.Debug.log("d" + o.getDurationIncludingChildren() + " " + o.duration)
          }
          return s
        };
        e.USE_TWEEN = true;
        return e
      }();
      e.Slide = i
    })(i = e.review || (e.review = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(e) {
        __extends(i, e);

        function i(i, n, s, r, a) {
          e.call(this, s, r, a);
          this.zoomDuration = n;
          this.target = i;
          this.globe = new t.components.globe.Globe(s)
        }
        i.prototype.getTimeline = function() {
          var t = e.prototype.getTimeline.call(this);
          t.insert(this.globe.zoomTo(this.target, this.zoomDuration), 0);
          return t
        };
        return i
      }(e.Slide);
      e.GlobeSlide = i
    })(i = e.review || (e.review = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(e) {
        __extends(i, e);

        function i(i, n, s, r) {
          e.call(this, n, s, r);
          this.messages = i;
          var a = $("<div class='effect effect-pan-right blur gridslide'>");
          n.append(a);
          var o = new t.components.grid.ClassicGrid(a, 60, 1, [1, 1, 1, 1]);
          var u = $('<canvas style="position:absolute;top:0px;left:0px;"></canvas>').attr("width", a.width()).attr("height", a.height());
          a.append(u);
          t.view.classic.BackgroundItemLargeCanvas.canvas = u;
          var h = new t.components.grid.backgrounditem.Settings;
          var l = o.render(function() {
            return new t.view.classic.BackgroundItemLargeCanvas(h)
          });
          for (var c = 0; c < l.length; c++) {
            var g = t.ArrayTool.getRandom(this.messages);
            this.loadItem(l[c], g)
          }
        }
        i.prototype.loadItem = function(e, i) {
          t.ImagePreloader.preload(e.getImagesToPreload(i)).done(function() {
            var t = [];
            for (var n = 0; n < arguments.length; n++) {
              t[n - 0] = arguments[n]
            }
            e.swapMessage(i, t)
          })
        };
        return i
      }(e.Slide);
      e.GridSlide = i
    })(i = e.review || (e.review = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(n) {
        __extends(s, n);

        function s(i, s) {
          var r = this;
          n.call(this, i, s);
          this.rawSettings = $.extend({}, new t.view.review.Settings, s["review"]);
          this.settings = this.rawSettings;
          t.view.Templates.load("view/review/res/templates.html?" + Math.random(), function() {
            var t = Mustache.render(e.Templates.get("#style"), r.settings);
            $(document.head).append($(t))
          });
          this.messageProvider.reset();
          this.messageProvider.setMessagesCallback(function(t) {
            return r.onMessages(t)
          });
          this.messageProvider.start(300)
        }
        s.prototype.onMessages = function(t) {
          this.messages = t;
          this.initialize();
          this.messageProvider.reset()
        };
        s.prototype.addTime = function() {
          var t = (new Date).getTime();
          var e = $('<div id="fps" style="position:absolute; right:0px;top:200px;width:100px;height:50px;z-index:1000;background:white"></div>');
          $(document.body).append(e);
          window.setInterval(function() {
            e[0].innerHTML = (new Date).getTime() - t + ""
          }, 30)
        };
        s.prototype.initialize = function() {
          var e = this;
          this.ctx = $("<div/>", {
            "class": "review-view"
          });
          if (this.settings.fullscreen) {
            $(document.body).addClass("fullscreen")
          }
          $(document.body).append(this.ctx);
          this.createSlides();
          if (!this.settings.fullscreen) {
            this.audio = $("<audio><source src='" + t.App.ROOT + "view/review/res/audio.mp3' type='audio/mpeg'></audio>")[0];
            $(document.body).append(this.audio);
            var i = $('<div class="controls">');
            i.append($("<a>play </a>").click(function() {
              return e.timeline.play()
            }));
            i.append($("<a>pause </a>").click(function() {
              return e.timeline.pause()
            }));
            var n = $('<input type="range" min="0" step="0.1" max="100">');
            i.append(n);
            n.change(function(t) {
              if (window["timeline"]) {
                window["timeline"].pause();
                window["timeline"].progress(n.val() / 100)
              }
            });
            $(document.body).append(i)
          }
          if (this.settings.fps) {
            TweenMax.ticker["fps"](this.settings.fps)
          }
          if (this.settings.timescale) {
            TweenMax["globalTimeScale"](this.settings.timescale)
          }
          this.timeline = this.createTimeline()
        };
        s.prototype.createSlides = function() {
          new i.Slide($('<div class="primary slide slide-out-top"><div class="slide-content"><h2>' + this.settings.eventname + "</h2><p>" + this.settings.eventdate + "</p></div></div>"), this.ctx, 1e3);
          new i.GlobeSlide([this.settings.longitude, this.settings.latitude], 2500, $('<div class="primary map slide slide-in-bottom slide-out-partial-left"></div>'), this.ctx, 2800);
          var e = new i.Slide($('<div class="secondary slide slide-in-partial-right"><div class="slide-content effect effect-zoom-in"><h1>' + this.settings.eventhashtag + "</h1><h3>A Hashtag in Review</h3></div></div>"), this.ctx, 2400);
          new i.InfoSlide($('<div class="primary slide slide-in-bottom slide-out-right slide-info"></div>'), this.ctx, this.settings.show_tweetbeam_screen, this.settings.count_users, this.settings.count_tweets, this.settings.count_impressions, 12600);
          var n = new i.GridSlide(this.messages, $('<div class="slide slide-in-left slide-out-top"></div>'), this.ctx, 2e3);
          for (var s in this.settings.tweets) {
            var r = new t.TwitterMessage(this.settings.tweets[s]);
            var a;
            if (r.hasEmbeddedImage()) {
              a = $('<div class="slide slide-in-right slide-out-left slide-photo"><div class="table effect effect-zoom-out"><div><div class="slide-content secondary"></div></div></div</div>')
            } else {
              a = $('<div class="slide slide-in-right slide-out-left slide-tweet"><div class="table effect effect-zoom-out"><div><div class="slide-content secondary"></div></div></div></div>')
            }
            $(".slide-content", a).append(this.getTweetEl(r));
            new i.Slide(a, n.getElement(), 4340)
          }
          var o = t.StringTool.numberToString(this.settings.count_reach);
          new i.Slide($('<div class="slide primary slide-in-bottom slide-out-top slide-reached"><div class="slide-content content-fill effect effect-zoom-in"><h3>' + o + " people reached</h3></div></div>"), this.ctx, 2400);
          new i.Slide($('<div class="slide  slide-in-bottom primary same-color-fix"><div class="slide-content"><h1>' + this.settings.eventhashtag + '</h1><h3 class="effect">Thanks for connecting</h3></div></div>'), this.ctx, 800)
        };
        s.prototype.pauseAt = function(t) {
          this.timeline.pause(t / 1e3)
        };
        s.prototype.totalDuration = function() {
          return this.timeline.totalDuration() * 1e3
        };
        s.prototype.step = function() {
          var t = this.timeline.totalDuration() * this.settings.fps;
          var e = this.timeline.progress();
          var i = e + 1 / t;
          this.timeline.progress(i);
          this.timeline.pause()
        };
        s.prototype.stepByStep = function() {
          while (this.timeline.progress() < 1) {
            document.body.offsetLeft;
            this.step()
          }
        };
        s.prototype.createTimeline = function() {
          var t = this;
          var e = i.Slide.getCompleteTimeline(this.ctx[0], true);
          var n = true;
          var s = new TimelineLite({
            paused: true,
            onUpdate: function() {
              $("input[type=range]").val(s.progress() * 100 + "");
              if (!s.paused() && n && t.audio) {
                t.audio.currentTime = s.time();
                t.audio.play()
              }
              if (s.paused() && t.audio) {
                t.audio.pause()
              }
              n = s.paused()
            }
          });
          s.add(e);
          window["timeline"] = s;
          return s
        };
        s.prototype.getTweetEl = function(i) {
          var n = e.Templates.get("#tweet");
          var s = $(n);
          if (i.hasEmbeddedImage()) {
            var r = $("<img>").attr("src", i.getPrimaryImageUrl());
            $(".photo", s).append(r)
          }
          $(".content > div", s).empty();
          $(".content div", s).text(t.EmojiTool.removeEmoji(i.message));
          $(".screenname", s).text(i.tweetObject["user"]["name"]);
          $(".username", s).text("@" + i.user);
          $(".avatar", s).css("background-image", "url(" + i.userImageUrl + ")");
          return s
        };
        return s
      }(t.View);
      i.ReviewView = n
    })(i = e.review || (e.review = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(e) {
        __extends(i, e);

        function i(t, i, n, s) {
          e.call(this, i, n, s);
          this.messages = t;
          var r = $('<div class="hashtagdiv effect"></div>');
          i.append(r);
          this.createElements(r);
          this.hashtagdiv = r[0]
        }
        i.prototype.getTimeline = function() {
          var t = e.prototype.getTimeline.call(this);
          return t
        };
        i.prototype.createBlock = function(t, e, i, n) {
          return $('<div class="block effect"></div>').css({
            left: t * i - t * n + "px",
            top: e * i - e * n + "px",
            height: +i + "px",
            width: +i + "px"
          })
        };
        i.prototype.setPresent = function() {};
        i.prototype.createElements = function(e) {
          var i = 96;
          var n = 30;
          var s = 96;
          var r = Math.ceil(e.height() / s);
          var a = Math.ceil(e.width() / s);
          s += n;
          var o = $('<div class="parts"></div>');
          var u = $('<div class="bgparts"></div>');
          e.append(u);
          e.append(o);
          var h = Math.floor(a / 2);
          var l = Math.floor(r / 2);
          var c = 0;
          for (var g = 0; g < r; g++) {
            for (var d = 0; d < a; d++) {
              if (d >= h - 1 && d <= h + 1 && g >= l - 1 && g <= l + 1) {
                var p = this.createBlock(d, g, s, n);
                p.addClass("part");
                p.addClass("part-" + c);
                c++;
                o.append(p)
              }
              var m = t.ArrayTool.getRandom(this.messages);
              var p = this.createBlock(d, g, s, n).css({
                backgroundImage: "url(" + m.getPrimaryImageUrl() + ")"
              });
              var f = 1 + Math.random() * .5;
              p.css("transition-delay", f + "s");
              p.css("-webkit-transition-delay", f + "s");
              u.append(p)
            }
          }
        };
        return i
      }(e.Slide);
      e.HashtagGridSlide = i
    })(i = e.review || (e.review = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e = function() {
      function t(t, e) {
        this.dx = 0;
        this.dy = 0;
        this.patternX = 0;
        this.patternY = 0;
        this.pattern = null;
        this.patternImage = null;
        this.offsetX = 0;
        this.element = t;
        this.context = this.element.getContext("2d");
        this.patternImage = e
      }
      t.prototype.getPattern = function() {
        if (this.pattern == null) {
          this.updatePattern()
        }
        return this.pattern
      };
      t.prototype.updatePattern = function() {
        if (this.pattern == null) {
          this.pattern = this.context.createPattern(this.patternImage, "repeat");
          this.patternX = this.dx;
          this.patternY = this.dy
        }
      };
      t.prototype.setDx = function(t) {
        this.newDx = Math.round(t)
      };
      t.prototype.setDy = function(t) {
        this.newDy = Math.round(t)
      };
      t.prototype.getDx = function() {
        return this.dx
      };
      t.prototype.getDy = function() {
        return this.dy
      };
      t.prototype.setOffsetX = function(t) {
        this.offsetX = t
      };
      t.prototype.getOffsetX = function() {
        return this.offsetX
      };
      t.prototype.update = function(t, e) {
        this.context.fillStyle = this.getPattern();
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        this.dx = t;
        this.dy = e;
        var i = this.dx - this.patternX - this.offsetX;
        var n = this.dy - this.patternY;
        this.context.translate(i, n);
        this.context.fillRect(-i, -n, this.element.width, this.element.height);
        this.context.translate(-i, -n)
      };
      t.prototype.rerender = function() {
        this.update(this.newDx, this.newDy)
      };
      t.prototype.startLoop = function() {
        var t = this;
        var e = new TimelineMax;
        e.add(TweenMax.fromTo(this, 13, {
          setDx: 0
        }, {
          setDx: -this.patternImage.naturalWidth,
          setDy: 0,
          ease: Linear.easeNone,
          onUpdate: function() {
            return t.rerender()
          },
          repeat: -1
        }));
        e.repeat()
      };
      return t
    }();
    t.PanningInfiniteBackground = e
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                clip: "rect(0px " + this.element.clientWidth + "px " + this.element.clientHeight + "px 0px)"
              }
            }
          };
          e.prototype.getPostValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                clip: "rect(0px 0px " + this.element.clientHeight + "px 0px)"
              }
            }
          };
          return e
        }(t.SimpleAnimation);
        t.ClipOutRight = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                clip: "rect(0px 0px " + this.element.clientHeight + "px 0px)"
              }
            }
          };
          e.prototype.getPostValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                clip: "rect(0px " + this.element.clientWidth + "px " + this.element.clientHeight + "px 0px)"
              }
            }
          };
          return e
        }(t.SimpleAnimation);
        t.ClipInRight = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e(e, i) {
            t.call(this, e, i);
            this.initial = this.getNumericValue()
          }
          e.prototype.setNumericValue = function(t) {
            this.element.textContent = Math.round(t * 100) / 100 + ""
          };
          e.prototype.getNumericValue = function() {
            return parseFloat(this.element.textContent)
          };
          e.prototype.getSetPreValuesTween = function() {
            return TweenMax.to(this, .001, {
              setNumericValue: 0
            })
          };
          e.prototype.getSetPostValuesTween = function() {
            return TweenMax.to(this, .001, {
              setNumericValue: this.initial
            })
          };
          e.prototype.getTween = function() {
            return TweenMax.fromTo(this, .5, {
              setNumericValue: 0
            }, {
              setNumericValue: this.initial
            })
          };
          return e
        }(t.Animation);
        t.CountIn = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              y: -this.settings.startY || -$(this.container).height()
            }
          };
          e.prototype.getPostValues = function() {
            return {
              y: 0
            }
          };
          return e
        }(t.SimpleAnimation);
        t.InTop = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              y: this.settings.startY || $(this.container).height()
            }
          };
          e.prototype.getPostValues = function() {
            return {
              y: 0
            }
          };
          return e
        }(t.SimpleAnimation);
        t.InBottom = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return null
          };
          e.prototype.getPostValues = function() {
            return {
              y: $(this.container).height()
            }
          };
          return e
        }(t.SimpleAnimation);
        t.OutBottom = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return null
          };
          e.prototype.getPostValues = function() {
            return {
              y: -$(this.container).height()
            }
          };
          return e
        }(t.SimpleAnimation);
        t.OutTop = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(e) {
          __extends(i, e);

          function i(i, n) {
            e.call(this, i, n);
            this.classnameSettings = $.extend(new t.ClassnameAnimationSettings, i)
          }
          i.prototype.getPreOperator = function() {
            return this.classnameSettings.remove ? "+=" : "-="
          };
          i.prototype.getPostOperator = function() {
            return this.classnameSettings.remove ? "-=" : "+="
          };
          i.prototype.getPreValues = function() {
            return {
              className: this.getPreOperator() + this.classnameSettings.name
            }
          };
          i.prototype.getPostValues = function() {
            return {
              className: this.getPostOperator() + this.classnameSettings.name
            }
          };
          i.prototype.getSetPreValuesTween = function() {
            if (this.getPreValues() != null) {
              return this.classnameSettings.cascade ? CSSPlugin.cascadeTo(this.element, 1e-4, this.getPreValues()) : TweenMax.to(this.element, 1e-4, this.getPreValues())
            }
            return null
          };
          i.prototype.getSetPostValuesTween = function() {
            if (!this.getPostValues()) {
              throw "post values of animation must not be null"
            }
            return this.classnameSettings.cascade ? CSSPlugin.cascadeTo(this.element, 1e-4, this.getPostValues()) : TweenMax.to(this.element, 1e-4, this.getPostValues())
          };
          i.prototype.getTween = function() {
            var t = this.getPostValues();
            t["ease"] = this.classnameSettings.easing;
            if (this.classnameSettings.cascade) {
              return CSSPlugin.cascadeTo(this.element, this.classnameSettings.duration / 1e3, t)
            } else {
              return TweenMax.fromTo(this.element, this.classnameSettings.duration / 1e3, this.getPreValues(), t)
            }
          };
          return i
        }(t.Animation);
        t.ClassnameAnimation = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          return e
        }(t.SimpleAnimationSettings);
        t.ClassnameAnimationSettings = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              x: 0,
              css: {
                opacity: 0,
                transform: "translate3d(0, 200%, 0) rotateX(-90deg) translate3d(0, 200%, 0)"
              }
            }
          };
          e.prototype.getPostValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                transform: ""
              }
            }
          };
          return e
        }(t.SimpleAnimation);
        t.RotateInBottom = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                transform: ""
              }
            }
          };
          e.prototype.getPostValues = function() {
            return {
              x: 0,
              css: {
                opacity: 0,
                transform: "translate3d(0, -200%, 0) rotateX(90deg) translate3d(0,-200%, 0)"
              }
            }
          };
          return e
        }(t.SimpleAnimation);
        t.RotateOutTop = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(e) {
          __extends(i, e);

          function i(i, n) {
            e.call(this, i, n);
            this.settings = $.extend(new t.ParallelAnimationSettings, i);
            this.animations = this.settings.animations.map(function(e) {
              return t.Animation.fromSettings(e, n)
            })
          }
          i.prototype.getSetPreValuesTween = function() {
            var t = new TimelineMax;
            var e = this.animations.map(function(t) {
              return t.getSetPreValuesTween()
            });
            t.add(e);
            return t
          };
          i.prototype.getSetPostValuesTween = function() {
            var t = new TimelineMax;
            var e = this.animations.map(function(t) {
              return t.getSetPostValuesTween()
            });
            t.add(e);
            return t
          };
          i.prototype.getTween = function() {
            var t = new TimelineMax;
            var e = this.animations.map(function(t) {
              return t.getTween()
            });
            t.add(e);
            return t
          };
          return i
        }(t.Animation);
        t.ParallelAnimation = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          return e
        }(t.AnimationSettings);
        t.ParallelAnimationSettings = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              css: {
                zIndex: 1e3
              }
            }
          };
          e.prototype.getPostValues = function() {
            return {
              css: {
                zIndex: 1e3
              }
            }
          };
          return e
        }(t.SimpleAnimation);
        t.TMOut = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              x: this.settings.startX || -$(this.container).width()
            }
          };
          e.prototype.getPostValues = function() {
            return {
              x: 0
            }
          };
          return e
        }(t.SimpleAnimation);
        t.InLeft = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              opacity: 1,
              x: 0
            }
          };
          e.prototype.getPostValues = function() {
            return {
              opacity: 1,
              x: 0
            }
          };
          return e
        }(t.SimpleAnimation);
        t.None = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return null
          };
          e.prototype.getPostValues = function() {
            return {
              opacity: 0
            }
          };
          return e
        }(t.SimpleAnimation);
        t.FadeOut = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              opacity: 0,
              x: 0
            }
          };
          e.prototype.getPostValues = function() {
            return {
              opacity: 1
            }
          };
          return e
        }(t.SimpleAnimation);
        t.FadeIn = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                clip: "rect(0px 0px 0px 0px)"
              }
            }
          };
          e.prototype.getPostValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                clip: "rect(0px " + this.element.clientWidth + "px " + this.element.clientHeight + "px 0px)"
              }
            }
          };
          return e
        }(t.SimpleAnimation);
        t.ClipInTopRight = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e(e, i) {
            t.call(this, e, i);
            this.slide1 = $('<div class="tm-slide">');
            this.slide2 = $('<div class="tm-slide">');
            this.container.appendChild(this.slide1[0]);
            this.container.appendChild(this.slide2[0])
          }
          e.prototype.getSetPreValuesTween = function() {
            return TweenMax.to(this.element, .001, {
              x: 0,
              opacity: 1,
              clip: "rect(0px 0px 5000px 0px)"
            })
          };
          e.prototype.getSetPostValuesTween = function() {
            return TweenMax.to(this.element, .001, {
              x: 0,
              opacity: 1,
              clip: "rect(0px 5000px 5000px 0px)"
            })
          };
          e.prototype.getTween = function() {
            var t = this.element.clientWidth / 4;
            var e = new TimelineMax;
            e.set(this.element, {
              css: {
                zIndex: 2e3
              }
            }, "+=0.01");
            var i = this.element.clientHeight;
            var n = TweenMax.fromTo(this.element, .5, {
              clip: "rect(0px 0px 5000px 0px)"
            }, {
              clip: "rect(0px " + 3 * t + "px 5000px 0px)",
              ease: Power2.easeIn
            });
            var s = TweenMax.to(this.slide1, .5, {
              width: t,
              x: 2 * t,
              ease: Power2.easeIn
            });
            var r = TweenMax.to(this.slide2, .5, {
              width: t * 2,
              x: t,
              ease: Power2.easeIn
            });
            e.appendMultiple([s, r, n]);
            var a = TweenMax.to(this.element, .5, {
              clip: "rect(0px " + 4 * t + "px 5000px 0px)",
              ease: Power2.easeOut
            });
            var o = TweenMax.to(this.slide1, .5, {
              width: 0,
              x: 4 * t,
              ease: Power2.easeOut
            });
            var u = TweenMax.to(this.slide2, .5, {
              width: 0,
              x: 4 * t,
              ease: Power2.easeOut
            });
            e.appendMultiple([o, u, a]);
            return e
          };
          return e
        }(t.Animation);
        t.TMInLeft = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                transform: ""
              }
            }
          };
          e.prototype.getPostValues = function() {
            return {
              x: 0,
              css: {
                opacity: 0,
                transform: "translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0)"
              }
            }
          };
          return e
        }(t.SimpleAnimation);
        t.RotateOutLeft = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          e.prototype.getPreValues = function() {
            return {
              x: 0,
              css: {
                opacity: 0,
                transform: "translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0)"
              }
            }
          };
          e.prototype.getPostValues = function() {
            return {
              x: 0,
              css: {
                opacity: 1,
                transform: ""
              }
            }
          };
          return e
        }(t.SimpleAnimation);
        t.RotateInRight = e
      })(e = t.animation || (t.animation = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          return e
        }(t.DataSlideSettings);
        t.LineSlideSettings = e
      })(e = t.dataslide || (t.dataslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(e) {
          __extends(i, e);

          function i(i, n, s) {
            if (s === void 0) {
              s = null
            }
            e.call(this, i, n, s);
            this.lineSettings = $.extend(new t.LineSlideSettings, n)
          }
          i.prototype.getEnterAnimation = function() {
            var t = this;
            var i = new TimelineMax;
            i.addCallback(function() {
              if (t.lines) {
                t.svg.selectAll("*").remove();
                t.setFirstData()
              }
            }, undefined);
            i.add(e.prototype.getEnterAnimation.call(this));
            return i
          };
          i.prototype.dataChanged = function(t) {
            this.dataset = t;
            if (!this.lines) {
              this.setFirstData()
            }
          };
          i.prototype.setFirstData = function() {
            var t = 30;
            var e = 60;
            var i = 40;
            var n = parseInt(this.svg.attr("width"));
            var s = parseInt(this.svg.attr("height"));
            var r = d3.time.format("%Y/%W/%w").parse;
            var a = d3.time.scale().range([t, n - t - e]);
            var o = d3.scale.linear().range([s - i, 0]);
            var u = d3.scale.ordinal().range(["#090", "#e60000", "#E20074"]);
            var h = function(t) {
              var e = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
              return e[t.getMonth()]
            };
            var l = d3.svg.axis().scale(a).orient("bottom").tickFormat(h);
            var c = d3.svg.axis().scale(o).orient("left");
            var g = d3.svg.line().interpolate("basis").x(function(t) {
              return a(t.date)
            }).y(function(t) {
              return o(t.val)
            });
            this.dataset = this.dataset.replace(/ NL/gi, "").trim();
            var d = d3.tsv.parse(this.dataset);
            if (d && d.length) {
              u.domain(["KPN", "Vodafone", "T-Mobile"]);
              d.forEach(function(t) {
                t.date = r(t["Week"] + "/1");
                t.val = parseFloat(((t["Download (Kbps)"] || t["Upload (Kbps)"] || t["Download  (Kbps)"] || t["Upload  (Kbps)"]) + "").replace(",", "")) / 1e3
              });
              var p = u.domain().map(function(t) {
                return {
                  name: t,
                  values: d.filter(function(e) {
                    return e.OPERATOR_ALL == t
                  })
                }
              });
              a.domain(d3.extent(d, function(t) {
                return t.date
              }));
              o.domain([0, d3.max(d, function(t) {
                return t.val
              })]);
              this.svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + (s - i) + ")").call(l);
              this.svg.append("g").attr("class", "y axis").attr("transform", "translate(" + t + ",0)").call(c).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Mbps");
              this.lines = this.svg.selectAll(".city").data(p).enter().append("g").attr("class", "city");
              this.lines.append("path").attr("class", "line").attr("d", function(t) {
                return g(t.values)
              }).attr("fill", "none").style("stroke", function(t) {
                return u(t.name)
              });
              var m = this.lines.append("text").datum(function(t) {
                return {
                  name: t.name,
                  value: t.values[t.values.length - 1]
                }
              }).attr("transform", function(t) {
                return "translate(" + a(t.value.date) + "," + o(t.value.val) + ")"
              }).attr("x", 3).attr("dy", ".35em").style("font-size", "25px").text(function(t) {
                return t.name
              });
              var f = m[0];
              f.sort(function(t) {
                return t.getBoundingClientRect().top
              });
              if (f[0].getBoundingClientRect().bottom > f[1].getBoundingClientRect().top) {
                d3.select(f[0]).attr("dy", "-0.65em")
              }
              if (f[2].getBoundingClientRect().top < f[1].getBoundingClientRect().bottom) {
                d3.select(f[2]).attr("dy", "1.15em")
              }
              var v = this.svg.append("rect").attr("x", -1 * n).attr("y", -1 * s + i).attr("height", s - i).attr("width", n - t).attr("class", "curtain").attr("transform", "rotate(180)").style("fill", "white").transition().duration(2e3).attr("width", 0)
            }
          };
          i.prototype.drawChart = function(t) {
            var e = $(t).width();
            var i = $(t).height();
            this.svg = d3.select(t).append("svg").attr("width", e).attr("height", i)
          };
          i.prototype.render = function() {
            var t;
            if (this.settings.container_template) {
              t = $(this.settings.container_template)
            } else {
              t = $("<div class='line-slide'><div class='svg-container'></div></div>")
            }
            return t[0]
          };
          i.prototype.renderToContainer = function() {
            e.prototype.renderToContainer.call(this);
            this.drawChart($(".svg-container", this.element)[0])
          };
          return i
        }(t.DataSlide);
        t.LineSlide = e
      })(e = t.dataslide || (t.dataslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e(e, i, n) {
            if (n === void 0) {
              n = null
            }
            t.call(this, e, i, n)
          }
          e.prototype.getEnterAnimation = function() {
            var e = this;
            var i = new TimelineMax;
            i.addCallback(function() {
              if (e.svg) {
                e.svg.selectAll(".label, .prov").remove();
                e.setFirstData()
              }
            }, undefined);
            i.add(t.prototype.getEnterAnimation.call(this));
            return i
          };
          e.prototype.dataChanged = function(t) {
            this.dataset = Object.keys(t).map(function(e) {
              return {
                province: e,
                data: t[e]
              }
            });
            this.dataset = this.dataset.sort(function(t, e) {
              return (e.data.avg_speed.value || 0) - (t.data.avg_speed.value || 0)
            });
            if (!this.provs) {
              this.setFirstData()
            }
          };
          e.prototype.setFirstData = function() {
            var t = d3.scale.linear().domain([0, d3.max(this.dataset, function(t) {
              return t.data.avg_speed.value || 0
            })]).range(["white", "#E20074"]);
            this.provs = this.pathContainer.selectAll(".prov").data(this.dataset).enter().append("g").attr("class", function(t) {
              return "prov prov-" + t.province
            });
            this.provs.append("path").attr("class", "state").attr("d", function(t) {
              return e.province_paths[t.province]
            }).attr("fill", "white").attr("opacity", 0).attr("stroke", "white").transition().delay(function(t, e) {
              return 1e3 + e * 100
            }).duration(1e3).attr("fill", function(e) {
              return t(e.data.avg_speed.value || 0)
            }).attr("stroke", "#A4A4A4").attr("opacity", 1);
            var i = d3.scale.ordinal().domain(d3.range(this.dataset.length)).rangeRoundBands([60, 400], 5, 0);
            var n = this.textValuesContainer.selectAll(".label").data(this.dataset).enter().append("text").attr("fill", "#ffffff").attr("class", "label").attr("x", 630).attr("y", function(t, e) {
              return i(e)
            }).text(function(t) {
              return "#" + t.province + ": " + (t.data.avg_speed.value ? Math.round(t.data.avg_speed.value * 100) / 100 + " Mbps" : "-")
            }).transition().delay(function(t, e) {
              return 1e3 + e * 100
            }).duration(1e3).attr("fill", "#E20074")
          };
          e.prototype.drawChart = function(t) {
            var e = $(t).width();
            var i = $(t).height();
            this.svg = d3.select(t).append("svg").attr("viewBox", "-20 0 1210 750").attr("width", e).attr("height", i);
            this.pathContainer = this.svg.append("g");
            this.textValuesContainer = this.svg.append("g");
            this.textValuesContainer.attr("class", "doc_counts")
          };
          e.prototype.render = function() {
            var t;
            if (this.settings.container_template) {
              t = $(this.settings.container_template)
            } else {
              t = $("<div class='nlmap-slide'><div class='svg-container'></div></div>")
            }
            return t[0]
          };
          e.prototype.renderToContainer = function() {
            t.prototype.renderToContainer.call(this);
            this.drawChart($(".svg-container", this.element)[0])
          };
          e.province_paths = {
            friesland: "M233.9,90.9 L230.2,94.3 L225.5,92.3 L231.5,84.0 L241.0,74.8 L250.9,68.6 L258.4,69.4 L258.5,71.1 L254.5,71.2 L248.4,74.1 L237.0,85.9 Z M305.5,43.9 L299.0,47.0 L293.7,48.5 L273.5,58.3 L269.2,58.3 L267.3,54.6 L268.9,50.3 L276.7,47.2 L279.3,44.7 L282.6,44.7 L302.4,40.0 L306.7,36.4 L328.5,31.4 L325.2,36.3 L321.1,37.9 L312.5,38.5 L313.5,42.1 L311.6,43.2 Z M376.9,24.5 L383.1,27.4 L368.6,31.4 L353.3,32.0 L349.6,33.1 L342.6,36.7 L338.8,35.9 L336.1,32.3 L336.8,28.6 L339.2,26.4 L341.5,27.3 Z M412.4,24.2 L409.6,28.1 L409.4,24.6 L407.7,21.2 L411.3,17.8 L416.7,15.1 L420.6,13.9 L435.2,11.9 L439.3,13.0 L437.4,14.8 Z M439.8,116.6 L439.7,119.9 L446.9,123.3 L449.2,131.9 L457.8,142.4 L459.8,146.1 L459.3,148.6 L454.6,156.7 L447.7,161.8 L442.5,158.6 L435.1,158.1 L427.8,166.6 L415.5,176.9 L409.3,179.7 L404.0,180.9 L401.3,185.6 L395.4,185.4 L391.3,181.3 L386.2,182.7 L382.8,187.4 L378.5,190.3 L372.2,190.1 L369.8,188.4 L364.3,191.4 L362.7,187.6 L357.3,182.9 L353.7,183.6 L352.7,182.2 L341.7,179.5 L337.0,180.7 L332.3,183.9 L327.5,183.9 L322.0,181.2 L312.4,181.2 L307.7,180.1 L301.2,175.1 L300.6,171.0 L303.8,166.9 L307.4,163.5 L305.3,159.6 L307.7,156.7 L308.1,152.7 L305.8,146.0 L306.7,139.8 L301.9,131.1 L300.1,125.9 L287.7,134.3 L273.1,148.0 L272.2,144.6 L271.8,143.6 L286.3,129.8 L291.1,124.7 L298.0,122.8 L300.9,120.8 L303.8,114.5 L307.3,97.5 L310.1,89.8 L315.1,83.5 L318.2,80.5 L323.6,78.0 L330.8,68.7 L340.8,66.1 L345.8,61.4 L369.2,50.9 L374.4,46.8 L377.8,46.4 L387.5,40.9 L417.9,38.3 L415.8,44.6 L417.5,49.9 L422.5,51.4 L426.1,54.5 L428.8,53.4 L431.6,54.2 L432.5,56.3 L432.3,61.9 L434.0,62.7 L429.3,68.3 L428.2,72.7 L424.5,80.4 L425.6,86.3 L420.4,93.9 L419.0,97.0 L418.2,102.4 L419.1,107.7 L422.6,111.1 L433.0,112.6 Z",
            groningen: "M456.0,0.0 L464.2,3.2 L462.3,5.1 L457.0,3.6 L454.3,2.1 Z M557.2,172.8 L553.3,168.1 L548.6,166.1 L551.3,157.6 L550.0,155.4 L542.2,146.6 L534.6,137.5 L523.0,126.5 L516.3,120.7 L503.9,108.5 L501.5,107.2 L497.6,107.0 L487.7,110.9 L485.3,106.3 L479.9,99.7 L477.0,97.9 L471.6,90.4 L470.0,90.7 L462.2,87.6 L454.4,94.6 L450.4,99.6 L446.3,112.2 L444.1,116.7 L439.8,116.6 L433.0,112.6 L422.6,111.1 L419.1,107.7 L418.2,102.4 L419.0,97.0 L420.4,93.9 L425.6,86.3 L424.5,80.4 L428.2,72.7 L429.3,68.3 L434.0,62.7 L432.3,61.9 L432.5,56.3 L431.6,54.2 L428.8,53.4 L426.1,54.5 L422.5,51.4 L417.5,49.9 L415.8,44.6 L417.9,38.3 L430.9,37.3 L435.1,40.0 L437.8,40.0 L441.5,36.8 L463.2,29.3 L497.8,22.1 L512.6,23.8 L515.7,25.1 L518.4,27.6 L524.5,47.7 L529.0,50.4 L532.0,53.7 L536.7,55.0 L542.9,58.1 L545.4,57.0 L548.6,58.8 L552.5,56.6 L550.9,60.2 L552.4,67.3 L557.1,69.6 L568.0,71.8 L569.7,71.7 L570.9,82.7 L569.9,90.9 L568.1,96.5 L568.1,101.5 L570.3,106.4 L572.7,124.1 L573.0,133.0 L572.1,140.9 L569.3,149.4 L558.1,169.5 Z",
            flevoland: "M374.7,248.9 L378.2,259.8 L378.3,264.6 L376.5,271.1 L371.2,281.1 L367.4,285.1 L358.7,287.8 L351.6,291.5 L345.9,293.6 L342.9,298.5 L336.1,300.8 L331.9,303.2 L333.5,310.8 L332.7,317.0 L329.7,321.6 L324.4,323.9 L314.4,324.7 L310.2,323.2 L300.9,316.2 L296.0,313.6 L285.4,310.0 L276.0,310.3 L272.8,308.6 L269.4,298.4 L272.0,296.9 L276.2,292.5 L285.5,287.1 L291.7,280.4 L302.9,275.6 L309.5,269.0 L315.1,266.5 L317.1,264.7 L320.4,255.2 L321.5,254.2 L326.1,254.1 L332.5,247.2 L335.1,245.3 L343.7,242.1 L346.3,239.8 L350.6,244.1 Z M364.3,191.4 L375.6,197.0 L382.8,202.4 L385.8,206.4 L388.2,212.6 L389.6,218.9 L386.9,223.3 L397.8,227.2 L401.3,231.1 L396.6,234.0 L389.4,236.8 L382.7,236.4 L374.8,240.7 L369.7,238.5 L349.8,240.4 L347.4,239.7 L342.2,231.3 L337.4,225.7 L336.8,216.0 L337.5,205.6 L338.6,199.4 L341.4,193.2 L344.8,188.2 L349.1,184.8 L353.7,183.6 L357.3,182.9 L362.7,187.6 Z",
            zeeland: "M102.2,471.7 L105.5,475.6 L112.0,477.3 L115.0,479.3 L115.3,483.3 L113.8,485.8 L108.5,488.7 L96.7,491.2 L94.0,491.1 L88.2,489.0 L84.9,486.7 L82.3,480.2 L79.9,478.3 L73.8,476.0 L70.5,472.6 L68.4,472.5 L63.8,477.9 L56.9,478.4 L53.7,477.5 L51.6,474.5 L51.9,466.5 L57.5,462.8 L70.5,460.8 L75.7,461.8 L90.4,462.0 L93.8,462.8 L96.4,464.7 Z M135.4,553.9 L133.4,563.2 L127.4,571.7 L119.8,577.9 L100.7,587.9 L93.6,593.5 L90.2,594.7 L71.7,595.1 L67.4,591.6 L66.5,583.0 L63.6,581.1 L44.5,575.0 L36.7,574.6 L25.8,576.8 L24.1,578.5 L23.8,586.9 L16.4,588.1 L11.4,587.5 L6.7,585.4 L2.9,581.3 L0.7,575.1 L1.4,563.1 L0.0,553.6 L25.0,545.3 L29.7,543.1 L39.6,549.4 L54.7,553.6 L59.8,558.0 L63.1,559.3 L69.4,559.3 L75.3,560.9 L79.0,560.3 L94.1,553.6 L96.2,551.1 L96.9,546.2 L98.4,543.9 L101.7,544.1 L107.6,546.8 L111.9,553.7 L117.4,554.7 L119.9,556.3 L125.3,556.7 L128.9,551.7 L131.9,552.0 Z M136.1,516.3 L130.6,515.4 L124.1,512.7 L114.5,512.8 L110.8,510.7 L98.4,499.4 L106.5,495.3 L110.6,494.1 L124.4,494.6 L128.5,495.8 L132.2,498.8 L136.9,504.3 L138.1,507.4 L137.9,511.4 Z M144.6,553.5 L141.5,553.5 L139.6,549.8 L138.8,542.3 L137.2,541.2 L135.4,543.6 L132.0,544.7 L118.1,544.5 L111.7,541.6 L103.1,534.3 L100.5,533.3 L94.0,532.8 L91.9,534.1 L85.7,545.5 L83.3,546.8 L77.7,547.5 L74.1,549.1 L68.1,543.9 L58.7,539.4 L52.6,533.6 L50.2,533.4 L43.8,535.8 L40.3,536.0 L31.5,534.1 L28.7,532.6 L22.4,522.3 L17.2,517.8 L15.5,515.2 L14.9,511.2 L16.5,508.9 L32.3,499.0 L73.7,494.1 L77.2,494.5 L82.0,498.1 L85.7,504.7 L80.5,508.2 L80.5,509.7 L95.3,511.1 L102.9,514.0 L109.3,519.5 L111.4,523.4 L114.6,531.9 L117.0,534.9 L120.7,536.0 L128.7,534.7 L131.8,536.2 L134.8,535.2 L141.6,534.9 L142.4,538.6 L141.4,541.2 L142.3,548.8 Z M128.9,492.3 L122.8,492.2 L118.3,489.0 L117.1,485.0 L120.1,482.2 L130.6,487.1 L130.5,487.2 Z",
            noordholland: "M228.2,119.5 L228.3,121.1 L231.3,121.0 L228.5,128.2 L224.5,134.7 L217.6,140.7 L214.4,147.4 L209.4,149.0 L204.1,146.9 L201.1,140.7 L201.9,134.2 L204.7,126.8 L208.2,120.7 L215.1,114.4 L218.4,106.9 L222.0,100.7 L226.7,100.8 L227.7,103.5 L226.8,105.9 L230.7,113.6 L230.7,117.5 Z M215.0,340.7 L210.3,344.0 L208.6,343.2 L207.3,338.4 L206.2,337.5 L196.8,341.3 L190.3,343.2 L186.6,343.4 L181.3,339.8 L183.1,336.5 L184.3,329.1 L190.4,318.3 L187.0,317.6 L183.9,319.3 L181.1,318.8 L173.5,315.6 L174.9,313.0 L183.5,285.8 L184.6,276.9 L187.4,270.5 L192.7,222.2 L195.1,209.9 L196.7,198.3 L202.7,181.7 L203.9,173.5 L204.4,163.0 L205.4,157.9 L207.1,155.7 L219.0,157.2 L216.9,164.8 L220.5,169.3 L226.7,171.0 L232.6,170.4 L236.0,168.4 L242.2,162.7 L245.3,161.4 L251.2,160.5 L257.0,157.7 L271.8,143.6 L272.2,144.6 L273.1,148.0 L264.6,156.0 L258.3,160.2 L252.1,162.9 L255.3,165.5 L263.2,180.6 L264.2,185.9 L265.0,201.8 L267.2,205.0 L272.4,208.9 L277.7,204.8 L282.1,204.5 L289.9,207.7 L291.0,209.0 L292.8,217.9 L287.9,220.6 L285.8,222.7 L284.0,228.7 L281.7,231.6 L272.5,237.6 L268.2,239.0 L264.4,235.6 L260.3,234.2 L255.0,235.2 L252.9,239.5 L253.3,245.7 L255.6,253.0 L260.9,263.9 L262.2,270.0 L259.2,273.3 L260.5,276.9 L256.3,278.5 L260.3,284.1 L262.8,285.3 L260.4,290.1 L255.4,294.2 L253.1,300.7 L246.5,299.1 L244.5,302.7 L254.1,308.2 L263.5,309.3 L266.6,310.4 L274.5,315.4 L280.9,316.9 L290.5,316.1 L301.5,323.6 L292.0,324.1 L290.1,325.0 L287.5,329.7 L284.6,337.5 L284.2,340.4 L281.4,347.2 L278.4,349.4 L270.0,349.2 L264.2,350.4 L257.6,352.7 L255.7,343.7 L256.7,338.7 L259.1,335.5 L255.9,331.5 L255.4,327.0 L260.0,325.1 L253.8,324.7 L251.4,325.8 L247.8,323.9 L244.1,326.0 L239.8,326.6 L236.6,331.6 L230.6,332.6 L222.0,338.4 Z",
            zuidholland: "M117.1,485.0 L117.3,479.1 L121.9,475.7 L127.2,475.2 L121.6,470.8 L110.8,467.7 L108.5,464.5 L107.5,456.3 L104.8,451.2 L96.6,444.9 L93.8,447.1 L89.9,448.4 L85.9,448.4 L79.8,450.5 L78.3,443.6 L82.7,440.5 L92.3,437.5 L93.6,435.7 L96.6,435.4 L101.8,436.5 L107.8,438.7 L111.3,436.4 L106.1,428.8 L104.2,426.9 L104.1,423.4 L105.8,420.3 L105.3,416.5 L100.4,402.6 L102.3,399.1 L109.4,400.6 L115.3,399.5 L120.5,396.0 L141.9,369.0 L160.0,341.3 L173.5,315.6 L181.1,318.8 L183.9,319.3 L187.0,317.6 L190.4,318.3 L184.3,329.1 L183.1,336.5 L181.3,339.8 L186.6,343.4 L190.3,343.2 L196.8,341.3 L206.2,337.5 L207.3,338.4 L208.6,343.2 L210.3,344.0 L215.0,340.7 L218.8,346.0 L222.2,347.3 L229.8,353.5 L228.4,354.7 L230.4,361.5 L229.5,362.1 L225.1,360.2 L223.6,360.7 L219.1,365.7 L223.6,368.3 L225.8,377.5 L232.7,377.4 L231.6,379.1 L225.7,382.2 L221.0,389.8 L221.8,391.3 L228.7,390.2 L229.5,393.2 L225.0,396.1 L235.0,409.6 L236.0,408.0 L241.0,407.5 L245.2,402.9 L250.3,399.5 L256.7,400.8 L261.7,396.1 L267.9,393.2 L271.9,395.0 L275.6,400.4 L280.1,402.0 L276.5,409.9 L270.7,421.0 L271.2,424.7 L258.0,431.1 L253.6,431.5 L254.6,433.0 L254.5,437.9 L250.9,438.3 L243.0,437.0 L239.1,437.1 L233.3,442.7 L229.5,444.0 L221.0,444.3 L216.7,447.8 L213.4,451.5 L211.3,455.9 L203.8,465.4 L199.0,465.6 L189.1,469.9 L183.8,471.7 L177.9,472.0 L161.9,469.1 L157.4,477.8 L151.5,482.0 L143.2,484.3 L136.9,484.9 L130.6,487.1 L120.1,482.2 Z",
            drenthe: "M557.2,172.8 L555.9,177.2 L555.0,185.6 L555.1,212.4 L554.5,221.2 L552.1,226.6 L544.3,224.4 L536.9,225.9 L528.8,224.0 L514.5,224.9 L509.5,226.8 L506.9,228.9 L505.2,227.9 L504.7,224.1 L503.2,222.8 L492.0,218.3 L485.7,219.4 L478.6,223.6 L476.5,226.8 L477.3,234.2 L470.9,231.5 L467.1,233.0 L463.1,230.7 L457.9,233.4 L456.2,233.2 L453.4,227.8 L447.0,221.6 L439.2,222.0 L430.7,217.8 L427.6,219.8 L425.5,219.6 L422.6,216.4 L416.8,202.9 L418.1,200.3 L422.0,198.2 L427.2,192.6 L427.8,190.5 L415.5,176.9 L427.8,166.6 L435.1,158.1 L442.5,158.6 L447.7,161.8 L454.6,156.7 L459.3,148.6 L459.8,146.1 L457.8,142.4 L449.2,131.9 L446.9,123.3 L439.7,119.9 L439.8,116.6 L444.1,116.7 L446.3,112.2 L450.4,99.6 L454.4,94.6 L462.2,87.6 L470.0,90.7 L471.6,90.4 L477.0,97.9 L479.9,99.7 L485.3,106.3 L487.7,110.9 L497.6,107.0 L501.5,107.2 L503.9,108.5 L516.3,120.7 L523.0,126.5 L534.6,137.5 L542.2,146.6 L550.0,155.4 L551.3,157.6 L548.6,166.1 L553.3,168.1 Z",
            gelderland: "M521.5,356.8 L518.3,358.5 L515.8,361.3 L512.9,367.6 L508.2,369.5 L507.2,372.2 L507.7,375.9 L513.7,378.4 L523.9,383.4 L528.1,387.4 L529.4,393.3 L526.4,395.8 L523.2,402.3 L519.9,406.8 L515.8,409.2 L502.3,410.3 L487.3,416.3 L480.0,422.5 L474.4,423.9 L464.4,421.4 L465.9,427.0 L465.4,429.5 L459.7,431.4 L459.1,427.5 L456.5,426.2 L450.6,425.5 L448.0,421.8 L445.6,420.6 L440.9,421.9 L435.6,420.0 L430.5,416.2 L425.4,414.1 L420.3,417.1 L428.3,424.3 L430.5,427.5 L419.3,425.1 L413.1,427.0 L405.0,432.2 L398.7,433.5 L396.2,435.4 L395.8,437.7 L399.4,440.2 L401.7,444.9 L401.6,449.9 L399.2,452.5 L393.9,449.8 L390.2,445.2 L386.2,446.5 L386.2,449.8 L370.4,449.6 L359.4,442.6 L354.9,440.9 L351.9,435.1 L345.0,433.8 L335.2,435.7 L329.9,433.1 L321.0,438.0 L314.7,437.8 L311.7,439.5 L309.9,448.6 L308.0,451.8 L302.5,455.7 L274.4,459.7 L273.1,459.3 L274.7,455.2 L274.6,451.2 L268.8,447.5 L263.3,448.1 L255.0,441.3 L254.5,437.9 L254.6,433.0 L253.6,431.5 L258.0,431.1 L271.2,424.7 L270.7,421.0 L276.5,409.9 L280.1,402.0 L286.0,401.4 L291.0,398.6 L299.7,403.2 L302.9,402.2 L307.2,398.6 L310.6,397.7 L316.4,399.1 L322.7,395.5 L329.3,396.6 L341.4,403.3 L346.6,404.4 L347.0,399.3 L344.6,393.8 L339.3,387.1 L337.7,379.6 L337.7,373.7 L335.6,365.9 L333.1,366.6 L333.6,370.4 L331.9,372.8 L327.8,374.9 L322.9,372.0 L325.1,369.2 L327.1,364.0 L328.7,364.0 L329.2,358.4 L323.1,352.5 L316.3,350.8 L315.3,349.1 L317.4,344.0 L310.8,338.2 L311.8,328.9 L318.2,329.3 L331.2,325.6 L332.9,323.6 L337.4,311.8 L344.1,303.2 L348.6,299.2 L357.3,296.2 L362.4,293.3 L367.2,289.5 L370.4,285.7 L376.2,276.8 L378.9,271.6 L380.5,265.8 L380.6,260.8 L383.1,261.0 L388.6,269.8 L390.8,270.9 L395.3,269.3 L400.0,265.0 L404.3,262.4 L407.2,263.7 L409.5,267.6 L414.5,272.7 L417.3,279.6 L420.7,284.0 L421.2,288.2 L419.2,294.3 L413.5,296.9 L414.5,299.7 L413.1,301.8 L411.9,309.1 L414.8,313.0 L418.0,314.3 L421.1,321.4 L421.1,325.0 L424.3,326.7 L424.1,330.1 L426.1,332.4 L429.8,329.2 L442.0,330.9 L451.6,330.3 L460.4,325.6 L465.0,325.9 L473.9,337.9 L478.5,342.0 L482.2,341.4 L488.1,341.9 L494.1,341.0 L494.9,344.0 L501.6,342.7 L504.8,343.9 L505.9,349.3 L504.6,353.1 L519.6,355.5 Z",
            limburg: "M386.2,449.8 L386.2,446.5 L390.2,445.2 L393.9,449.8 L399.2,452.5 L398.3,456.2 L404.3,456.4 L411.2,461.2 L409.5,468.3 L413.2,472.7 L423.8,476.8 L421.6,486.0 L422.4,489.0 L433.3,502.7 L439.8,509.7 L442.2,522.2 L440.9,532.5 L440.9,537.0 L443.4,539.7 L442.3,547.4 L440.2,552.8 L434.8,557.4 L427.5,572.4 L422.9,579.4 L421.7,584.4 L421.5,589.9 L422.8,594.4 L426.6,596.3 L434.1,590.7 L437.7,591.7 L433.1,595.6 L436.5,598.5 L434.3,601.7 L425.6,606.9 L411.6,618.8 L409.6,621.3 L406.9,627.7 L405.1,629.9 L402.2,630.3 L398.1,626.2 L395.9,625.0 L391.6,627.5 L392.7,633.3 L395.4,640.3 L395.8,646.6 L404.0,643.2 L410.3,644.6 L415.9,643.7 L414.9,649.2 L415.8,654.7 L420.8,658.1 L426.0,659.7 L424.7,663.7 L426.3,668.8 L425.4,673.3 L423.8,675.5 L420.2,675.4 L416.8,679.2 L417.5,683.6 L416.8,686.6 L414.6,688.8 L412.2,688.3 L413.0,691.4 L417.0,696.0 L416.8,699.2 L413.6,699.9 L402.2,700.0 L398.7,699.0 L385.0,699.9 L378.4,694.9 L374.7,699.8 L371.4,699.9 L368.5,698.4 L370.1,689.7 L364.1,687.5 L360.5,685.2 L357.8,681.5 L357.3,676.0 L368.1,662.9 L371.7,661.4 L374.4,657.6 L378.5,648.7 L375.5,647.9 L372.0,648.9 L377.8,638.9 L380.0,632.7 L377.8,629.9 L378.8,624.2 L381.9,624.8 L384.8,617.9 L383.6,614.4 L387.0,614.2 L390.0,612.5 L386.3,608.8 L386.7,606.0 L388.8,603.7 L386.8,599.5 L379.4,600.8 L373.9,594.7 L369.3,593.1 L360.1,594.8 L354.7,590.6 L345.8,588.3 L343.0,586.1 L351.8,583.2 L353.7,580.2 L354.8,571.8 L358.3,565.1 L361.5,560.7 L387.3,551.6 L392.1,550.2 L401.0,542.2 L396.9,534.3 L391.3,527.2 L387.3,513.1 L384.3,497.6 L389.8,498.0 L395.8,499.7 L401.8,498.8 L409.2,495.9 L414.6,498.7 L416.9,496.5 L413.7,485.1 L409.5,478.2 L405.7,474.7 L406.6,472.3 L404.1,469.7 L401.7,460.9 L399.2,459.0 L393.0,458.6 L390.5,457.2 L389.0,454.2 L389.4,451.2 Z",
            overijssel: "M506.9,228.9 L504.4,230.9 L505.8,233.4 L505.0,237.8 L506.3,241.4 L511.5,245.3 L503.3,250.0 L500.8,250.3 L502.9,254.1 L504.1,262.9 L505.2,266.5 L508.4,269.9 L512.5,271.6 L524.6,272.7 L532.5,275.3 L536.8,275.7 L544.5,273.9 L547.7,270.3 L557.7,284.8 L560.2,291.1 L559.4,300.2 L555.9,311.2 L556.0,315.8 L558.7,324.6 L552.2,329.1 L547.4,337.1 L544.5,339.9 L538.1,343.2 L535.3,346.4 L532.3,353.5 L530.5,355.4 L521.5,356.8 L519.6,355.5 L504.6,353.1 L505.9,349.3 L504.8,343.9 L501.6,342.7 L494.9,344.0 L494.1,341.0 L488.1,341.9 L482.2,341.4 L478.5,342.0 L473.9,337.9 L465.0,325.9 L460.4,325.6 L451.6,330.3 L442.0,330.9 L429.8,329.2 L426.1,332.4 L424.1,330.1 L424.3,326.7 L421.1,325.0 L421.1,321.4 L418.0,314.3 L414.8,313.0 L411.9,309.1 L413.1,301.8 L414.5,299.7 L413.5,296.9 L419.2,294.3 L421.2,288.2 L420.7,284.0 L417.3,279.6 L414.5,272.7 L409.5,267.6 L407.2,263.7 L404.3,262.4 L400.0,265.0 L395.3,269.3 L390.8,270.9 L388.6,269.8 L383.1,261.0 L380.6,260.8 L379.7,256.3 L376.3,243.2 L374.8,240.7 L382.7,236.4 L389.4,236.8 L396.6,234.0 L401.3,231.1 L397.8,227.2 L386.9,223.3 L389.6,218.9 L388.2,212.6 L385.8,206.4 L382.8,202.4 L375.6,197.0 L364.3,191.4 L369.8,188.4 L372.2,190.1 L378.5,190.3 L382.8,187.4 L386.2,182.7 L391.3,181.3 L395.4,185.4 L401.3,185.6 L404.0,180.9 L409.3,179.7 L415.5,176.9 L427.8,190.5 L427.2,192.6 L422.0,198.2 L418.1,200.3 L416.8,202.9 L422.6,216.4 L425.5,219.6 L427.6,219.8 L430.7,217.8 L439.2,222.0 L447.0,221.6 L453.4,227.8 L456.2,233.2 L457.9,233.4 L463.1,230.7 L467.1,233.0 L470.9,231.5 L477.3,234.2 L476.5,226.8 L478.6,223.6 L485.7,219.4 L492.0,218.3 L503.2,222.8 L504.7,224.1 L505.2,227.9 Z",
            noordbrabant: "M144.6,553.5 L142.3,548.8 L141.4,541.2 L142.4,538.6 L141.6,534.9 L144.6,534.0 L146.6,528.3 L145.2,523.0 L141.9,519.0 L136.1,516.3 L137.9,511.4 L138.1,507.4 L136.9,504.3 L132.2,498.8 L131.4,494.2 L128.9,492.3 L130.5,487.2 L130.6,487.1 L136.9,484.9 L143.2,484.3 L151.5,482.0 L157.4,477.8 L161.9,469.1 L177.9,472.0 L183.8,471.7 L189.1,469.9 L199.0,465.6 L203.8,465.4 L211.3,455.9 L213.4,451.5 L216.7,447.8 L221.0,444.3 L229.5,444.0 L233.3,442.7 L239.1,437.1 L243.0,437.0 L250.9,438.3 L254.5,437.9 L255.0,441.3 L263.3,448.1 L268.8,447.5 L274.6,451.2 L274.7,455.2 L273.1,459.3 L274.4,459.7 L302.5,455.7 L308.0,451.8 L309.9,448.6 L311.7,439.5 L314.7,437.8 L321.0,438.0 L329.9,433.1 L335.2,435.7 L345.0,433.8 L351.9,435.1 L354.9,440.9 L359.4,442.6 L370.4,449.6 L386.2,449.8 L389.4,451.2 L389.0,454.2 L390.5,457.2 L393.0,458.6 L399.2,459.0 L401.7,460.9 L404.1,469.7 L406.6,472.3 L405.7,474.7 L409.5,478.2 L413.7,485.1 L416.9,496.5 L414.6,498.7 L409.2,495.9 L401.8,498.8 L395.8,499.7 L389.8,498.0 L384.3,497.6 L387.3,513.1 L391.3,527.2 L396.9,534.3 L401.0,542.2 L392.1,550.2 L387.3,551.6 L361.5,560.7 L358.3,565.1 L354.8,571.8 L353.7,580.2 L351.8,583.2 L343.0,586.1 L342.1,585.3 L340.1,575.0 L337.1,571.3 L333.4,569.1 L330.0,568.8 L320.6,575.2 L317.4,576.6 L299.0,576.4 L293.2,578.0 L290.4,577.4 L290.1,568.6 L287.2,565.2 L278.4,565.7 L275.6,564.3 L272.2,555.1 L266.7,549.4 L265.6,547.0 L266.0,541.6 L267.6,537.6 L268.1,533.4 L264.9,527.7 L259.7,524.2 L257.3,524.9 L255.0,531.8 L249.2,540.8 L245.4,544.7 L242.1,545.7 L233.2,542.4 L222.3,542.3 L219.0,541.0 L219.8,538.0 L221.5,537.7 L228.4,540.7 L227.1,536.4 L228.6,529.0 L228.2,525.3 L223.9,521.6 L218.8,520.4 L213.8,523.2 L202.1,538.2 L198.5,540.2 L191.1,539.3 L184.6,540.1 L181.6,538.0 L183.1,532.5 L183.2,528.3 L181.9,526.3 L175.4,526.8 L167.2,530.0 L159.2,534.9 L161.1,536.9 L159.7,543.2 L164.5,549.5 L165.5,551.9 L164.9,556.2 L161.9,557.8 L154.7,557.5 L146.0,553.6 Z",
            utrecht: "M301.5,323.6 L305.0,326.0 L311.8,328.9 L310.8,338.2 L317.4,344.0 L315.3,349.1 L316.3,350.8 L323.1,352.5 L329.2,358.4 L328.7,364.0 L327.1,364.0 L325.1,369.2 L322.9,372.0 L327.8,374.9 L331.9,372.8 L333.6,370.4 L333.1,366.6 L335.6,365.9 L337.7,373.7 L337.7,379.6 L339.3,387.1 L344.6,393.8 L347.0,399.3 L346.6,404.4 L341.4,403.3 L329.3,396.6 L322.7,395.5 L316.4,399.1 L310.6,397.7 L307.2,398.6 L302.9,402.2 L299.7,403.2 L291.0,398.6 L286.0,401.4 L280.1,402.0 L275.6,400.4 L271.9,395.0 L267.9,393.2 L261.7,396.1 L256.7,400.8 L250.3,399.5 L245.2,402.9 L241.0,407.5 L236.0,408.0 L235.0,409.6 L225.0,396.1 L229.5,393.2 L228.7,390.2 L221.8,391.3 L221.0,389.8 L225.7,382.2 L231.6,379.1 L232.7,377.4 L225.8,377.5 L223.6,368.3 L219.1,365.7 L223.6,360.7 L225.1,360.2 L229.5,362.1 L230.4,361.5 L228.4,354.7 L229.8,353.5 L222.2,347.3 L218.8,346.0 L215.0,340.7 L222.0,338.4 L230.6,332.6 L236.6,331.6 L239.8,326.6 L244.1,326.0 L247.8,323.9 L251.4,325.8 L253.8,324.7 L260.0,325.1 L255.4,327.0 L255.9,331.5 L259.1,335.5 L256.7,338.7 L255.7,343.7 L257.6,352.7 L264.2,350.4 L270.0,349.2 L278.4,349.4 L281.4,347.2 L284.2,340.4 L284.6,337.5 L287.5,329.7 L290.1,325.0 L292.0,324.1 Z"
          };
          return e
        }(t.DataSlide);
        t.NLMapSlide = e
      })(e = t.dataslide || (t.dataslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(e) {
        var i = function(i) {
          __extends(n, i);

          function n(t, n, s) {
            if (s === void 0) {
              s = null
            }
            i.call(this, t, n, s);
            this.histogramSettings = $.extend(new e.HistogramSlideSettings, n)
          }
          n.prototype.getEnterAnimation = function() {
            var t = this;
            var e = new TimelineMax;
            e.addCallback(function() {
              if (t.bars) {
                var e = t.bars.data();
                t.bars.remove();
                t.bars = null;
                t.setFirstData(e)
              }
            }, undefined);
            e.add(i.prototype.getEnterAnimation.call(this));
            return e
          };
          n.prototype.dataChanged = function(e) {
            e = e.follower_counts.buckets;
            if (!this.bars) {
              this.setFirstData(e)
            } else {
              t.Debug.log("hist data changed");
              this.updateData(e)
            }
          };
          n.prototype.setFirstData = function(e) {
            var i = this;
            var n = window["topojson"];
            var s = d3.geo.mercator().center([5.5, 55]).scale(1e5);
            var r = d3.scale.log().domain([10, 500]).range(["brown", "steelblue"]);
            d3.json(t.App.ROOT + "lib/nl-all.geojson.js", function(t, e) {
              var n = 300;
              var s = 300;
              var r = d3.geo.centroid(e);
              var a = 150;
              var o = [n / 2, s / 2];
              var u = d3.geo.mercator().scale(a).center(r).translate(o);
              var h = d3.geo.path().projection(u);
              var l = h.bounds(e);
              var c = a * n / (l[1][0] - l[0][0]);
              var g = a * s / (l[1][1] - l[0][1]);
              var a = c < g ? c : g;
              var o = [n - (l[0][0] + l[1][0]) / 2, s - (l[0][1] + l[1][1]) / 2];
              u = d3.geo.mercator().center(r).scale(a).translate(o);
              h = h.projection(u);
              i.pathContainer.attr("class", "counties").selectAll("path").data(e.features).enter().append("path").attr("d", h)
            })
          };
          n.prototype.updateData = function(t) {};
          n.prototype.drawChart = function(t) {
            var e = $(t).width();
            var i = $(t).height();
            this.svg = d3.select(t).append("svg").attr("width", e).attr("height", i);
            this.pathContainer = this.svg.append("g");
            this.textContainer = this.svg.append("g");
            this.textValuesContainer = this.svg.append("g");
            this.textValuesContainer.attr("class", "doc_counts")
          };
          n.prototype.render = function() {
            var t = $("<div class='map-slide'></div>");
            return t[0]
          };
          n.prototype.renderToContainer = function() {
            i.prototype.renderToContainer.call(this);
            this.drawChart(this.element)
          };
          return n
        }(e.DataSlide);
        e.MapSlide = i
      })(i = e.dataslide || (e.dataslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments);
            this.bar_margin = .05
          }
          return e
        }(t.DataSlideSettings);
        t.HistogramSlideSettings = e
      })(e = t.dataslide || (t.dataslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e;
        (function(t) {
          var e = function() {
            function t(t, e, i) {
              this.bonusVotes = 0;
              this.votes = 0;
              this.hashtag = t.toLowerCase();
              this.team = e;
              this.bonusVotes = i
            }
            t.prototype.getTeam = function() {
              return this.team
            };
            t.prototype.getHashtag = function() {
              return this.hashtag
            };
            t.prototype.getSignColor = function() {
              return this.getTeam()
            };
            t.prototype.getBonusVotes = function() {
              return this.bonusVotes
            };
            t.prototype.getVotes = function() {
              return this.votes
            };
            t.prototype.addVote = function() {
              this.votes++
            };
            t.prototype.addVotes = function(t) {
              this.votes += t
            };
            t.prototype.getVotePosition = function() {
              return this.votes + this.bonusVotes / 100
            };
            return t
          }();
          t.Rider = e;
          var i = function() {
            function t() {}
            t.getRiders = function() {
              return [new e("GoGesink", "TLJ", 3), new e("GoKelderman", "TLJ", 0), new e("GoTenDam", "TLJ", 8), new e("GoTankink", "TLJ", 0), new e("GoVanEmden", "TLJ", 0), new e("GoKruijswijk", "TLJ", 0), new e("GoLeezer", "TLJ", 0), new e("GoVanmarcke", "TLJ", 0), new e("GoMartens", "TLJ", 0), new e("GoBoassonHagen", "MTN", 0), new e("GoCummings", "MTN", 0), new e("GoFarrar", "MTN", 0), new e("GoJVanRensburg", "MTN", 0), new e("GoRVanRensburg", "MTN", 0), new e("GoKudus", "MTN", 0), new e("GoMeintjes", "MTN", 0), new e("GoPauwels", "MTN", 0), new e("GoTeklehaimanot", "MTN", 0), new e("GoBarta", "BOA", 0), new e("GoBennett", "BOA", 0), new e("GoBuchmann", "BOA", 0), new e("GoDempster", "BOA", 0), new e("GoHuzarski", "BOA", 0), new e("GoJMendes", "BOA", 0), new e("GoNerz", "BOA", 0), new e("GoSchillinger", "BOA", 0), new e("GoPVoss", "BOA", 0), new e("GoCancellara", "TFR", 0), new e("GoDevolder", "TFR", 0), new e("GoJungels", "TFR", 0), new e("GoDidier", "TFR", 0), new e("GoMollema", "TFR", 2), new e("GoZubeldia", "TFR", 0), new e("GoIrizar", "TFR", 0), new e("GoRast", "TFR", 0), new e("GoArredondo", "TFR", 0), new e("GoVanGarderen", "BMC", 1), new e("GoDCaruso", "BMC", 0), new e("GoRDennis", "BMC", 0), new e("GoDOss", "BMC", 0), new e("GoQuinziato", "BMC", 0), new e("GoSanchez", "BMC", 0), new e("GoSchar", "BMC", 0), new e("GoVanAvermaet", "BMC", 0), new e("GoDWyss", "BMC", 0), new e("GoLBak", "LTS", 0), new e("GoDeGendt", "LTS", 0), new e("GoDebusschere", "LTS", 0), new e("GoGallopin", "LTS", 0), new e("GoGreipel", "LTS", 0), new e("GoHansen", "LTS", 0), new e("GoSieberg", "LTS", 0), new e("GoWellens", "LTS", 0), new e("GoGHenderson", "LTS", 0), new e("GoMFrank", "IAM", 0), new e("GoClement", "IAM", 0), new e("GoBrandle", "IAM", 0), new e("GoSylChavanel", "IAM", 0), new e("GoCoppel", "IAM", 0), new e("GoElmiger", "IAM", 0), new e("GoHollenstein", "IAM", 0), new e("GoPantano", "IAM", 0), new e("GoMWyss", "IAM", 0), new e("GoPinot", "FDJ", 0), new e("GoJRoy", "FDJ", 0), new e("GoDemare", "FDJ", 0), new e("GoSebChavanel", "FDJ", 0), new e("GoBonnet", "FDJ", 0), new e("GoLadagnous", "FDJ", 0), new e("GoMorabito", "FDJ", 0), new e("GoGeniez", "FDJ", 0), new e("GoVaugrenard", "FDJ", 0), new e("GoKristoff", "KAT", 0), new e("GoRodriguez", "KAT", 0), new e("GoLosada", "KAT", 0), new e("GoGCaruso", "KAT", 0), new e("GoMachado", "KAT", 0), new e("GoHaller", "KAT", 0), new e("GoKozontsjoek", "KAT", 0), new e("GoGuarnieri", "KAT", 0), new e("GoPaolini", "KAT", 0), new e("GoBarguil", "TGA", 0), new e("GoCurvers", "TGA", 0), new e("GoDegenkolb", "TGA", 0), new e("GoDumoulin", "TGA", 5), new e("GoGeschke", "TGA", 0), new e("GoDeKort", "TGA", 0), new e("GoPreidler", "TGA", 0), new e("GoSinkeldam", "TGA", 0), new e("GoTimmer", "TGA", 0), new e("GoCavendish", "EQS", 0), new e("GoUran", "EQS", 4), new e("GoKwiatkowski", "EQS", 0), new e("GoGolas", "EQS", 0), new e("GoMartin", "EQS", 0), new e("GoStybar", "EQS", 0), new e("GoTrentin", "EQS", 0), new e("GoRenshaw", "EQS", 0), new e("GoVermote", "EQS", 0), new e("GoFedrigo", "BSE", 0), new e("GoFeillu", "BSE", 0), new e("GoSepulveda", "BSE", 0), new e("GoBrun", "BSE", 0), new e("GoDelaplace", "BSE", 0), new e("GoFonseca", "BSE", 0), new e("GoAGerard", "BSE", 0), new e("GoPerichon", "BSE", 0), new e("GoVachon", "BSE", 0), new e("GoPeraud", "ALM", 0), new e("GoBardet", "ALM", 0), new e("GoRiblon", "ALM", 0), new e("GoCherel", "ALM", 0), new e("GoVuillermoz", "ALM", 0), new e("GoGastauer", "ALM", 0), new e("GoGaudin", "ALM", 0), new e("GoVansummeren", "ALM", 0), new e("GoBakelants", "ALM", 0), new e("GoNibali", "AST", 10), new e("GoLBoom", "AST", 0), new e("GoFuglsang", "AST", 0), new e("GoGrivko", "AST", 0), new e("GoGruzdev", "AST", 0), new e("GoKangert", "AST", 0), new e("GoScarponi", "AST", 0), new e("GoTaaramae", "AST", 0), new e("GoWestra", "AST", 0), new e("GoQuintana", "MOV", 9), new e("GoValverde", "MOV", 0), new e("GoErviti", "MOV", 0), new e("GoCastroviejo", "MOV", 0), new e("GoDowsett", "MOV", 0), new e("GoMalori", "MOV", 0), new e("GoAnacona", "MOV", 0), new e("GoIzagirre", "MOV", 0), new e("GoHerrada", "MOV", 0), new e("GoFroome", "SKY", 6), new e("GoKennaugh", "SKY", 0), new e("GoRowe", "SKY", 0), new e("GoGThomas", "SKY", 0), new e("GoRoche", "SKY", 0), new e("GoKonig", "SKY", 0), new e("GoPorte", "SKY", 0), new e("GoStannard", "SKY", 0), new e("GoPoels", "SKY", 0), new e("GoCosta", "LAM", 0), new e("GoMBono", "LAM", 0), new e("GoCimolai", "LAM", 0), new e("GoDurasek", "LAM", 0), new e("GoPlazaMolina", "LAM", 0), new e("GoPozzato", "LAM", 0), new e("GoSerpaPerez", "LAM", 0), new e("GoVallsFerri", "LAM", 0), new e("GoOliveira", "LAM", 0), new e("GoTalansky", "TCG", 0), new e("GoDMartin", "TCG", 0), new e("GoHesjedal", "TCG", 0), new e("GoBauer", "TCG", 0), new e("GoKoren", "TCG", 0), new e("GoLangeveld", "TCG", 0), new e("GoNavardauskas", "TCG", 0), new e("GoBaarle", "TCG", 0), new e("GoNHaas", "TCG", 0), new e("GoContador", "TTS", 7), new e("GoBasso", "TTS", 0), new e("GoKreuziger", "TTS", 0), new e("GoMajka", "TTS", 0), new e("GoBennati", "TTS", 0), new e("GoTosatto", "TTS", 0), new e("GoValgren", "TTS", 0), new e("GoSagan", "TTS", 0), new e("GoMRogers", "TTS", 0), new e("GoBouhanni", "COF", 0), new e("GoLaporte", "COF", 0), new e("GoSenechal", "COF", 0), new e("GoSoupe", "COF", 0), new e("GoJSimon", "COF", 0), new e("GoEdet", "COF", 0), new e("GoNavarro", "COF", 0), new e("GoLMate", "COF", 0), new e("GoVanbilsen", "COF", 0), new e("GoVoeckler", "EUC", 0), new e("GoRolland", "EUC", 0), new e("GoGene", "EUC", 0), new e("GoQuemeneur", "EUC", 0), new e("GoSicard", "EUC", 0), new e("GoTulik", "EUC", 0), new e("GoCoquard", "EUC", 0), new e("GoGautier", "EUC", 0), new e("GoNauleau", "EUC", 0), new e("GoAlbasini", "OGE", 0), new e("GoDurbridge", "OGE", 0), new e("GoGerrans", "OGE", 0), new e("GoImpey", "OGE", 0), new e("GoMatthews", "OGE", 0), new e("GoTuft", "OGE", 0), new e("GoWeening", "OGE", 0), new e("GoAYates", "OGE", 0), new e("GoSYates", "OGE", 0)]
            };
            return t
          }();
          t.Riders = i
        })(e = t.mountain || (t.mountain = {}))
      })(e = t.tdfutrecht || (t.tdfutrecht = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(e) {
        var i;
        (function(e) {
          var i = function() {
            function i(n, s, r, a, o) {
              this.start_offset_x = 0;
              this.allBikeArr = o;
              this.rider = a;
              var u = 2;
              var h = Math.floor(Math.random() * u);
              this.position = a.getBonusVotes() * u + h + a.getVotes() * i.MOVE_PER_VOTE;
              var l = Mustache.render(t.view.Templates.get("#bike"), {
                base: t.App.ROOT,
                team: a.getTeam()
              });
              this.start_offset_x = r;
              this.bikeNumber = s;
              this.element = $(l);
              this.element.addClass("bike" + s);
              this.container = n;
              $(n).append(this.element);
              this.nameContainer = $(".name-container");
              this.element.css("top", "calc(26% + " + s * e.MountainSlide.GET_VW(35) + "px)");
              TweenMax.set(this.element, {
                x: this.getXForPosition() + "px"
              });
              var c = Mustache.render(t.view.Templates.get("#name"), {
                title: this.rider.getHashtag(),
                color: this.rider.getSignColor()
              });
              this.nameEl = $(c);
              this.nameContainer.append(this.nameEl);
              var g = this.getNameFreePosition();
              this.nameX = g.x;
              this.nameY = g.y;
              this.nameEl.css({
                x: g.x,
                y: g.y
              });
              TweenMax.fromTo(this.element, 2, {
                opacity: 0
              }, {
                opacity: 1
              })
            }
            i.prototype.getBikeNumber = function() {
              return this.bikeNumber
            };
            i.prototype.getRider = function() {
              return this.rider
            };
            i.prototype.renderNameToBox = function(e) {
              var i = Mustache.render(t.view.Templates.get("#name-side"), {
                title: this.rider.getHashtag(),
                color: this.rider.getSignColor()
              });
              this.sideNameEl = $(i);
              e.append(this.sideNameEl);
              this.nameEl.hide()
            };
            i.prototype.showNameInBar = function() {
              this.nameEl.show()
            };
            i.prototype.getXForPosition = function(t) {
              if (t === void 0) {
                t = this.getPosition()
              }
              var i = t * e.MountainSlide.GET_VW(e.MountainSlide.PX_PER_POSITION) + this.start_offset_x;
              i = Math.min(23 * 400 * e.MountainSlide.GET_VW(e.MountainSlide.PX_PER_POSITION) + this.start_offset_x, i);
              return i
            };
            i.prototype.getNameFreePosition = function() {
              var e = this;
              var i = this.allBikeArr.filter(function(t) {
                return t != e
              }).map(function(t) {
                return t.getNameBox()
              });
              var n = {
                x: 0,
                y: 0,
                width: this.nameContainer.width(),
                height: this.nameContainer.height()
              };
              var s = {
                x: this.getXForPosition(),
                y: 0,
                width: this.nameEl.outerWidth() + 10,
                height: this.nameEl.outerHeight() + 10
              };
              return t.FreePositionFinder.getClosestFreePositionByBox(n, s, i)
            };
            i.prototype.getNameBox = function() {
              return {
                x: this.nameX,
                y: this.nameY,
                width: this.nameEl.outerWidth() + 10,
                height: this.nameEl.outerHeight() + 10
              }
            };
            i.prototype.setPosition = function(t, e, i) {
              this.position = t;
              var n = new TimelineMax;
              n.add([TweenMax.to(this.nameContainer, .01, {
                className: "+=faded"
              }), TweenMax.to($(".cta-mountain")[0], .01, {
                className: "+=faded"
              })]);
              n.add(this.getHighlightTween(i));
              n.add([TweenMax.to(this.element, 5, {
                x: this.getXForPosition() + "px",
                force3D: true
              }), e]);
              n.add(this.getUnhighlightTween());
              n.add([TweenMax.to(this.nameContainer, .01, {
                className: "-=faded"
              }), TweenMax.to($(".cta-mountain")[0], .01, {
                className: "-=faded"
              })]);
              return n
            };
            i.prototype.getPosition = function() {
              return this.position
            };
            i.prototype.getHighlightTween = function(i) {
              var n;
              if (i == null) {
                n = Handlebars.compile(t.view.Templates.get("#message-fake"))(i)
              } else {
                n = Handlebars.compile(t.view.Templates.get("#message-template"))(i);
                n = n.replace(new RegExp("#" + this.rider.getHashtag(), "i"), '<span class="name ' + this.rider.getSignColor() + '">#' + this.rider.getHashtag() + "</span>")
              }
              var s = $(n);
              $(".slide-container").append(s);
              s.css("visibility", "hidden");
              var r = $(".name", s);
              r.text(this.nameEl.text());
              var a = this.nameEl.offset();
              var o = a.left;
              var u = a.top;
              var h = u + Math.sin(t.MathTool.degToRad(e.MountainSlide.ANGLE)) * this.nameEl.outerWidth();
              var l = $(".active-name");
              l.text(this.nameEl.text());
              l[0].className = this.nameEl[0].className;
              l.addClass("active-name");
              this.nameEl.css("visibility", "hidden");
              TweenMax.set(l, {
                visibility: "visible",
                x: o,
                y: h,
                rotation: -e.MountainSlide.ANGLE,
                transformOrigin: "top left"
              });
              var c = new TimelineMax;
              c.add(TweenMax.to(l, 1, {
                x: r.offset().left,
                y: r.offset().top,
                rotation: 0
              }));
              c.add(TweenMax.fromTo(s, .5, {
                scale: 0,
                visibility: "visible"
              }, {
                scale: 1,
                visibility: "visible",
                ease: Bounce.easeOut
              }));
              return c
            };
            i.prototype.getUnhighlightTween = function() {
              var i = this;
              var n = this.getNameFreePosition();
              this.nameX = n.x;
              this.nameY = n.y;
              TweenMax.set(this.nameEl, {
                y: n.y,
                x: n.x,
                force3D: true
              });
              var s = new TimelineMax;
              s.add(new TweenMax($(".block"), 1, {
                opacity: 0
              }));
              s.addCallback(function() {
                s.pause();
                var n = i.nameEl.offset();
                var r = n.left;
                var a = n.top;
                var o = a + Math.sin(t.MathTool.degToRad(e.MountainSlide.ANGLE)) * i.nameEl.outerWidth();
                var u = new TimelineMax;
                u.add(TweenMax.to($(".active-name"), 1, {
                  x: r,
                  y: o,
                  rotation: -e.MountainSlide.ANGLE,
                  transformOrigin: "top left"
                }));
                u.add([TweenMax.to(i.nameEl, .001, {
                  visibility: "visible"
                }), TweenMax.to($(".active-name"), .001, {
                  visibility: "hidden"
                })]);
                u.addCallback(function() {
                  return s.resume()
                }, "+=0.01")
              }, "+=0.01");
              return s
            };
            i.prototype.destroy = function() {
              var t = this;
              if (this.nameEl && this.nameEl.length) {
                this.nameEl.remove()
              }
              if (this.sideNameEl && this.sideNameEl.length) {
                this.sideNameEl.remove()
              }
              var e = new TimelineMax;
              e.add(TweenMax.to(this.element, 2, {
                opacity: 0
              }));
              e.addCallback(function() {
                t.element.remove()
              }, "+=0.01")
            };
            i.MOVE_PER_VOTE = 23;
            return i
          }();
          e.Bike = i
        })(i = e.mountain || (e.mountain = {}))
      })(i = e.tdfutrecht || (e.tdfutrecht = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(e) {
        var i = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments);
            this.html = "<div><div class='placeholder'></div></div>"
          }
          return e
        }(t.SlideSettings);
        e.YoutubeSlideSettings = i
      })(e = t.videoslide || (t.videoslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(i) {
        var n = function(e) {
          __extends(n, e);

          function n(n, s, r) {
            if (r === void 0) {
              r = null
            }
            t.JSONTool.applyBindings(r, s);
            e.call(this, n, s, r);
            this.youtubeSettings = $.extend(new i.YoutubeSlideSettings, s)
          }
          n.prototype.getSetPreValuesTween = function() {
            var i = this;
            var n = function() {
              try {
                if (i.playerLoaded) {
                  i.player.seekTo(0, true);
                  window.setTimeout(function() {
                    if (i.player) {
                      i.player.pauseVideo()
                    } else {
                      t.Debug.error("unexpected player == null")
                    }
                  }, 100)
                }
              } catch (e) {
                console.error(e)
              }
            };
            var s = e.prototype.getSetPreValuesTween.call(this);
            return [s, TweenMax.delayedCall(0, n)]
          };
          n.prototype.play = function(t) {
            var e = this;
            this.player.playVideo();
            this.player.addEventListener("onStateChange", function(i) {
              if (i.data == window["YT"].PlayerState.ENDED) {
                t.resume(t.time() + .001);
                e.player.pauseVideo();
                console.log("resume");
                e.player.removeEventListener("onStateChange")
              }
            })
          };
          n.prototype.getContentAnimation = function() {
            var t = this;
            var e = TweenMax.delayedCall(0, function() {
              var i = e.timeline;
              console.log("paused");
              i.pause();
              if (!t.playerLoaded) {
                t.player.addEventListener("onReady", function() {
                  return t.play(i)
                })
              } else {
                t.play(i)
              }
            });
            return e
          };
          n.prototype.renderToContainer = function() {
            var t = this;
            e.prototype.renderToContainer.call(this);
            this.player = new window["YT"].Player(this.placeholder, {
              height: this.element.offsetHeight,
              width: this.element.offsetWidth,
              playerVars: {
                autoplay: 0,
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
                wmode: "transparent"
              },
              wmode: "transparent",
              videoId: this.youtubeSettings.youtubeId,
              events: {
                onReady: function() {
                  t.player.mute();
                  t.player.pauseVideo();
                  t.playerLoaded = true
                }
              }
            })
          };
          n.prototype.renderContent = function() {
            var e = this.youtubeSettings;
            var i = e.html;
            if (e.html_src) {
              i = t.view.Templates.get(e.html_src);
              if (i == null || i == "") {
                console.error("not found: " + e.html_src)
              }
            }
            i = Mustache.render(i, this.dataContext);
            var n = $(i)[0];
            this.placeholder = $(".placeholder", n)[0];
            return n
          };
          n.prototype.destroy = function() {
            if (this.player) {
              this.player.destroy();
              this.player = null
            }
            e.prototype.destroy.call(this)
          };
          return n
        }(e.Slide);
        i.YoutubeSlide = n
      })(i = e.videoslide || (e.videoslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function(t) {
        __extends(e, t);

        function e() {
          t.apply(this, arguments)
        }
        return e
      }(t.SlideSettings);
      t.ViewSlideSettings = e
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i;
      (function(i) {
        var n = function(i) {
          __extends(n, i);

          function n() {
            i.apply(this, arguments)
          }
          n.prototype.renderContent = function() {
            var e = this.settings;
            var i = e.html;
            if (e.html_src) {
              i = t.view.Templates.get(e.html_src);
              if (i == null || i == "") {
                console.error("not found: " + e.html_src)
              }
            }
            if (typeof Handlebars !== "undefined") {
              i = Handlebars.compile(i)(this.dataContext)
            } else {
              i = Mustache.render(i, this.dataContext)
            }
            return $(i)[0]
          };
          n.processSplit = function(t) {
            var e = t.getAttribute("data-split");
            t.removeAttribute("data-split");
            var i = new SplitText(t, {
              type: e
            })
          };
          n.processWidthEqualsHeight = function(t) {
            $(".width-equals-height", t).each(function(t, e) {
              $(e).width($(e).height())
            })
          };
          n.processFittext = function(e) {
            var i = this;
            e.removeAttribute("data-fittext");
            var n = parseFloat(window.getComputedStyle(e, null).getPropertyValue("font-size"));
            t.SizeText.sizeText(e, n, function() {
              return i.processWidthEqualsHeight(e)
            })
          };
          n.prototype.processSplits = function() {};
          n.processEffect = function(t, i) {
            var n = JSON.parse(t.getAttribute(i));
            t.removeAttribute(i);
            if (t.hasAttribute(i + "-selector")) {
              var s = new TimelineMax;
              var r = t.getAttribute(i + "-stagger");
              if (r) {
                r = parseFloat(r)
              } else {
                r = 0
              }
              var a = [];
              var o = $(t.getAttribute(i + "-selector"), t);
              o.each(function(t, i) {
                var s = e.animation.Animation.fromSettings(n, i);
                var o = s.getTween();
                o.delay(t * r / 1e3);
                a.push(o)
              });
              s.add(a);
              return s
            } else {
              var u = e.animation.Animation.fromSettings(n, t);
              return u.getTween()
            }
          };
          n.selectIncludingSelf = function(t, e) {
            var i = $(t, e);
            if ($(e).is(t)) {
              i = i.add(e)
            }
            return i
          };
          n.processHtmlEffects = function(t, e) {
            if (e === void 0) {
              e = "data-effect"
            }
            var i = new TimelineMax;
            this.processWidthEqualsHeight(t);
            var s = n.selectIncludingSelf("[data-split]", t).each(function(t, e) {
              return n.processSplit(e)
            });
            var s = n.selectIncludingSelf("[data-fittext]", t).each(function(t, e) {
              return n.processFittext(e)
            });
            var r = n.selectIncludingSelf("[" + e + "]", t).map(function(t, i) {
              return n.processEffect(i, e)
            }).toArray();
            i.add(r);
            return i
          };
          n.prototype.getContentAnimation = function() {
            var e = n.processHtmlEffects(this.element);
            var s = i.prototype.getContentAnimation.call(this);
            if (s) {
              e.add(s, t.GSAPTool.getOffsetFromNumber(-e.duration()))
            }
            return e
          };
          return n
        }(e.Slide);
        i.HtmlSlide = n
      })(i = e.htmlslide || (e.htmlslide = {}))
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(e) {
        var i = function(t) {
          __extends(e, t);

          function e() {
            t.apply(this, arguments)
          }
          return e
        }(t.SlideSettings);
        e.HtmlSlideSettings = i
      })(e = t.htmlslide || (t.htmlslide = {}))
    })(e = t.slides || (t.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(i) {
        __extends(n, i);

        function n(t, n, s, r) {
          if (s === void 0) {
            s = null
          }
          if (r === void 0) {
            r = null
          }
          i.call(this, t, n, s);
          this.slides = [];
          this.subDataContexts = r;
          this.viewSettings = $.extend(new e.ViewSlideSettings, n)
        }
        n.prototype.render = function() {
          var t = $('<div class="slide-view">');
          return t[0]
        };
        n.prototype.renderToContainer = function() {
          i.prototype.renderToContainer.call(this);
          this.createSlides();
          this.createTimeline()
        };
        n.prototype.createSlides = function() {
          for (var i = 0; i < this.viewSettings.slides.length; i++) {
            var n = this.subDataContexts && this.subDataContexts[i] ? this.subDataContexts[i] : this.dataContext;
            var s = this.viewSettings.slides[i];
            var r;
            if (Array.isArray(s)) {
              r = new e.MultiSlide(this.element, s, n)
            } else {
              r = t.InstanceLoader.createInstance(s.type, this.element, s, n)
            }
            this.slides.push(r);
            r.renderToContainer()
          }
        };
        n.prototype.createTimeline = function() {
          var e = new TimelineMax({
            repeat: -1,
            repeatDelay: 0
          });
          var i = 0;
          for (var n = 0; n < this.slides.length; n++) {
            var s = this.slides[n];
            if (n > 0) {
              var r = s.getEnterAnimation();
              e.add(r, t.GSAPTool.getOffsetFromNumber(-i))
            } else {
              e.add(s.getSetShowValuesTween())
            }
            var a = s.getContentAnimation();
            if (a) {
              e.add(a)
            }
            if (this.slides.length > 1) {
              var o = s.getExitAnimation();
              i = o.duration();
              e.add(o)
            }
          }
          if (this.slides.length > 1) {
            var r = this.slides[0].getEnterAnimation();
            e.add(r, t.GSAPTool.getOffsetFromNumber(-i))
          } else {
            e.repeat(0)
          }
          e.play();
          if (!window["timeline"]) {
            window["timeline"] = e
          }
          this.timeline = e
        };
        n.prototype.destroy = function() {
          this.slides.forEach(function(t) {
            return t.destroy()
          });
          this.slides = [];
          this.timeline.kill();
          i.prototype.destroy.call(this)
        };
        return n
      }(e.Slide);
      e.ViewSlide = i
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e(e, i, n) {
          if (n === void 0) {
            n = null
          }
          this.slides = [];
          this.container = e;
          for (var s = 0; s < i.length; s++) {
            var r = t.InstanceLoader.createInstance(i[s].type, this.container, i[s], n);
            this.slides.push(r)
          }
        }
        e.prototype.renderToContainer = function() {
          this.slides.forEach(function(t) {
            return t.renderToContainer()
          })
        };
        e.prototype.getExitAnimation = function() {
          var t = new TimelineMax;
          var e = this.slides.map(function(t) {
            return t.getExitAnimation()
          });
          t.add(e);
          return t
        };
        e.prototype.getEnterAnimation = function() {
          var t = new TimelineMax;
          var e = this.slides.map(function(t) {
            return t.getEnterAnimation()
          });
          t.add(e);
          return t
        };
        e.prototype.getSetShowValuesTween = function() {
          var t = this.slides.map(function(t) {
            return t.getSetShowValuesTween()
          });
          return t
        };
        e.prototype.getContentAnimation = function() {
          var t = new TimelineMax;
          var e = this.slides.map(function(t) {
            return t.getContentAnimation()
          });
          t.add(e);
          return t
        };
        e.prototype.destroy = function() {
          this.slides.forEach(function(t) {
            return t.destroy()
          });
          this.slides = []
        };
        return e
      }();
      e.MultiSlide = i
    })(i = e.slides || (e.slides = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function(e) {
    __extends(i, e);

    function i(i) {
      e.call(this);
      this.youtubeObject = i.youtube;
      this.id = i.original_id;
      this.user = "";
      this.date = t.DateTool.parseTwitterDate(i["created_at"]);
      this.message = "";
      this.globalIds = [this.id]
    }
    return i
  }(t.Message);
  t.YoutubeMessage = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function(e) {
    __extends(i, e);

    function i(i) {
      e.call(this);
      this.feeditemObject = i.feeditem;
      this.id = i.original_id;
      this.user = i.feeditem_meta.clean_source;
      this.date = t.DateTool.parseTwitterDate(i["created_at"]);
      this.message = i.feeditem_meta.clean_title;
      this.globalIds = [this.id]
    }
    return i
  }(t.Message);
  t.FeedItemMessage = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function(e) {
    __extends(i, e);

    function i(i) {
      e.call(this);
      var n = i.mailgun;
      this.mailgunObject = n;
      this.id = n.token;
      this.user = n.from;
      this.user = t.StringTool.dropAfterInclusive(this.user, "<").trim();
      this.user = t.StringTool.trim(this.user, '"');
      this.date = new Date(n.timestamp * 1e3);
      this.message = t.StringTool.dropAfterInclusive(n["stripped-text"], "\r\n\r\n").trim();
      this.globalIds = [this.id]
    }
    return i
  }(t.Message);
  t.MailgunMessage = e
})(beam || (beam = {}));
var FontDetect = function() {
  var t = false;
  var e = ["serif", "sans-serif", "monospace", "cursive", "fantasy"];
  var i = null;
  var n = "en";
  var s = {
    en: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    fa: "Ø§Ø¨Ù¾ØªØ¬Ú†Ø­Ø®Ø¯Ø°Ø±Ø²Ø³Ø´ØµØ¶Ø·Ø·Ø¹ØºÙÙ‚Ú©Ú¯Ù„Ù…Ù†ÙˆÙ‡ÛŒ"
  };

  function r() {
    if (t) {
      return
    }
    t = true;
    var e = document.body;
    var r = document.body.firstChild;
    var a = document.createElement("div");
    a.id = "fontdetectHelper";
    i = document.createElement("span");
    i.innerText = s[n];
    a.appendChild(i);
    e.insertBefore(a, r);
    a.style.position = "absolute";
    a.style.visibility = "hidden";
    a.style.top = "-200px";
    a.style.left = "-100000px";
    a.style.width = "100000px";
    a.style.height = "200px";
    a.style.fontSize = "100px"
  }
  function a(t, e) {
    if (t instanceof Element) {
      return window.getComputedStyle(t).getPropertyValue(e)
    } else if (window["jQuery"]) {
      return $(t).css(e)
    } else {
      return ""
    }
  }
  return {
    onFontLoaded: function(e, i, a, o) {
      if (!e) {
        return
      }
      var u = o && o.msInterval ? o.msInterval : 100;
      var h = o && o.msTimeout ? o.msTimeout : 2e3;
      n = o && o.eLang && o.eLang in s ? o.eLang : "en";
      if (!i && !a) {
        return
      }
      if (!t) {
        r()
      }
      if (this.isFontLoaded(e)) {
        if (i) {
          i(e)
        }
        return
      }
      var l = this;
      var c = (new Date).getTime();
      var g = setInterval(function() {
        if (l.isFontLoaded(e)) {
          clearInterval(g);
          i(e);
          return
        } else {
          var t = (new Date).getTime();
          if (t - c > h) {
            clearInterval(g);
            if (a) {
              a(e)
            }
          }
        }
      }, u)
    },
    isFontLoaded: function(n) {
      var s = 0;
      var a = 0;
      if (!t) {
        r()
      }
      for (var o = 0; o < e.length; ++o) {
        i.style.fontFamily = '"' + n + '",' + e[o];
        s = i.offsetWidth;
        if (o > 0 && s != a) {
          return false
        }
        a = s
      }
      return true
    },
    whichFont: function(t) {
      var i = a(t, "font-family");
      var n = i.split(",");
      var s = n.shift();
      while (s) {
        s = s.replace(/^\s*['"]?\s*([^'"]*)\s*['"]?\s*$/, "$1");
        for (var r = 0; r < e.length; r++) {
          if (s == e[r]) {
            return s
          }
        }
        if (this.isFontLoaded(s)) {
          return s
        }
        s = n.shift()
      }
      return null
    }
  }
}();
var beam;
(function(t) {
  var e = function() {
    function e() {}
    e.registerHelpers = function() {
      Handlebars.registerHelper("math", function(t, e, i, n) {
        t = parseFloat(t);
        i = parseFloat(i);
        return {
          "+": t + i,
          "-": t - i,
          "*": t * i,
          "/": t / i,
          "%": t % i
        }[e]
      });
      Handlebars.registerHelper("cycle", function() {
        var t = {};
        return function(e, i) {
          if (!i || !i.length) {
            i = e
          }
          var n = e.split("|");
          var s = 0;
          if (typeof t[i] !== "undefined") {
            s = t[i]
          }
          t[i] = (s + 1) % n.length;
          return n[s]
        }
      }());
      Handlebars.registerHelper("randomEl", function(e) {
        return t.ArrayTool.getRandom(e.split("|"))
      })
    };
    return e
  }();
  t.HandlebarsTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.degToRad = function(t) {
      return t * Math.PI / 180
    };
    return t
  }();
  t.MathTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.removeEmoji = function(e) {
      return e.replace(t.EMOJI_REGEX, "")
    };
    t.EMOJI_REGEX = new RegExp("ðŸ‡¬ðŸ‡§|ðŸ‡ºðŸ‡¸|ðŸ‡©ðŸ‡ª|ðŸ‡ªðŸ‡¸|" + "ðŸ‡«ðŸ‡·|ðŸ‡¨ðŸ‡³|ðŸ‡®ðŸ‡¹|ðŸ‡¯ðŸ‡µ|" + "ðŸ‡°ðŸ‡·|ðŸ‡·ðŸ‡º|ðŸ‘º|ðŸ†”|ðŸ†•|ðŸ†–|" + "ðŸ†—|ðŸ†˜|ðŸ†™|ðŸ†š|ðŸ‡¦|ðŸ‡§|ðŸ’ƒ|ðŸ‡¨|" + "ðŸƒ|ðŸ‡©|ðŸ…°|ðŸ‡ª|ðŸ…±|ðŸ‡«|ðŸ…¾|ðŸ‡¬|" + "ðŸ‡­|ðŸ‡®|ðŸ†Ž|ðŸ‡¯|ðŸ†‘|ðŸ‡°|ðŸ‡±|ðŸ‡²|" + "ðŸ‡³|ðŸ‡´|ðŸ‡µ|ðŸ‡¶|ðŸ†’|ðŸ‡·|ðŸ‡¸|ðŸ‡¹|" + "ðŸ†“|ðŸ‡º|ðŸ‡»|ðŸ‡¼|ðŸ‡½|ðŸ‡¾|ðŸ‡¿|ðŸˆ|" + "ðŸˆ‚|ðŸˆ²|ðŸˆ³|ðŸˆ´|ðŸˆµ|ðŸˆ¶|ðŸˆ·|ðŸˆ¸|" + "ðŸˆ¹|ðŸˆº|ðŸ‰|ðŸ‰‘|ðŸŒ€|ðŸŒ|ðŸŒ‚|ðŸŒƒ|" + "ðŸŒ„|ðŸŒ…|ðŸŒ†|ðŸŒ‡|ðŸŒˆ|ðŸŒ‰|ðŸŒŠ|ðŸŒ‹|" + "ðŸŒŒ|ðŸŒ|ðŸŒŽ|ðŸŒ|ðŸŒ|ðŸŒ‘|ðŸŒ’|ðŸŒ“|" + "ðŸŒ”|ðŸŒ•|ðŸŒ–|ðŸŒ—|ðŸŒ˜|ðŸŒ™|ðŸŒš|ðŸŒ›|" + "ðŸŒœ|ðŸŒ|ðŸŒž|ðŸŒŸ|ðŸŒ |ðŸŒ°|ðŸŒ±|ðŸŒ²|" + "ðŸŒ³|ðŸŒ´|ðŸŒµ|ðŸŒ·|ðŸŒ¸|ðŸŒ¹|ðŸŒº|ðŸŒ»|" + "ðŸŒ¼|ðŸŒ½|ðŸŒ¾|ðŸŒ¿|ðŸ€|ðŸ|ðŸ‚|ðŸƒ|" + "ðŸ„|ðŸ…|ðŸ†|ðŸ‡|ðŸˆ|ðŸ‰|ðŸŠ|ðŸ‹|" + "ðŸŒ|ðŸ|ðŸŽ|ðŸ|ðŸ|ðŸ‘|ðŸ’|ðŸ“|" + "ðŸ”|ðŸ•|ðŸ–|ðŸ—|ðŸ˜|ðŸ™|ðŸš|ðŸ›|" + "ðŸœ|ðŸ|ðŸž|ðŸŸ|ðŸ |ðŸ¡|ðŸ¢|ðŸ£|" + "ðŸ¤|ðŸ¥|ðŸ¦|ðŸ§|ðŸ¨|ðŸ©|ðŸª|ðŸ«|" + "ðŸ¬|ðŸ­|ðŸ®|ðŸ¯|ðŸ°|ðŸ±|ðŸ²|ðŸ³|" + "ðŸ´|ðŸµ|ðŸ¶|ðŸ·|ðŸ¸|ðŸ¹|ðŸº|ðŸ»|" + "ðŸ¼|ðŸŽ€|ðŸŽ|ðŸŽ‚|ðŸŽƒ|ðŸŽ„|ðŸŽ…|ðŸŽ†|" + "ðŸŽ‡|ðŸŽˆ|ðŸŽ‰|ðŸŽŠ|ðŸŽ‹|ðŸŽŒ|ðŸŽ|ðŸŽŽ|" + "ðŸŽ|ðŸŽ|ðŸŽ‘|ðŸŽ’|ðŸŽ“|ðŸŽ |ðŸŽ¡|ðŸŽ¢|" + "ðŸŽ£|ðŸŽ¤|ðŸŽ¥|ðŸŽ¦|ðŸŽ§|ðŸŽ¨|ðŸŽ©|ðŸŽª|" + "ðŸŽ«|ðŸŽ¬|ðŸŽ­|ðŸŽ®|ðŸŽ¯|ðŸŽ°|ðŸŽ±|ðŸŽ²|" + "ðŸŽ³|ðŸŽ´|ðŸŽµ|ðŸŽ¶|ðŸŽ·|ðŸŽ¸|ðŸŽ¹|ðŸŽº|" + "ðŸŽ»|ðŸŽ¼|ðŸŽ½|ðŸŽ¾|ðŸŽ¿|ðŸ€|ðŸ|ðŸ‚|" + "ðŸƒ|ðŸ„|ðŸ†|ðŸ‡|ðŸˆ|ðŸ‰|ðŸŠ|ðŸ |" + "ðŸ¡|ðŸ¢|ðŸ£|ðŸ¤|ðŸ¥|ðŸ¦|ðŸ§|ðŸ¨|" + "ðŸ©|ðŸª|ðŸ«|ðŸ¬|ðŸ­|ðŸ®|ðŸ¯|ðŸ°|" + "ðŸ€|ðŸ|ðŸ‚|ðŸƒ|ðŸ„|ðŸ…|ðŸ†|ðŸ‡|" + "ðŸˆ|ðŸ‰|ðŸŠ|ðŸ‹|ðŸŒ|ðŸ|ðŸŽ|ðŸ|" + "ðŸ|ðŸ‘|ðŸ’|ðŸ“|ðŸ”|ðŸ•|ðŸ–|ðŸ—|" + "ðŸ˜|ðŸ™|ðŸš|ðŸ›|ðŸœ|ðŸ|ðŸž|ðŸŸ|" + "ðŸ |ðŸ¡|ðŸ¢|ðŸ£|ðŸ¤|ðŸ¥|ðŸ¦|ðŸ§|" + "ðŸ¨|ðŸ©|ðŸª|ðŸ«|ðŸ¬|ðŸ­|ðŸ®|ðŸ¯|" + "ðŸ°|ðŸ±|ðŸ²|ðŸ³|ðŸ´|ðŸµ|ðŸ¶|ðŸ·|" + "ðŸ¸|ðŸ¹|ðŸº|ðŸ»|ðŸ¼|ðŸ½|ðŸ¾|ðŸ‘€|" + "ðŸ‘‚|ðŸ‘ƒ|ðŸ‘„|ðŸ‘…|ðŸ‘†|ðŸ‘‡|ðŸ‘ˆ|ðŸ‘‰|" + "ðŸ‘Š|ðŸ‘‹|ðŸ‘Œ|ðŸ‘|ðŸ‘Ž|ðŸ‘|ðŸ‘|ðŸ‘‘|" + "ðŸ‘’|ðŸ‘“|ðŸ‘”|ðŸ‘•|ðŸ‘–|ðŸ‘—|ðŸ‘˜|ðŸ‘™|" + "ðŸ‘š|ðŸ‘›|ðŸ‘œ|ðŸ‘|ðŸ‘ž|ðŸ‘Ÿ|ðŸ‘ |ðŸ‘¡|" + "ðŸ‘¢|ðŸ‘£|ðŸ‘¤|ðŸ‘¥|ðŸ‘¦|ðŸ‘§|ðŸ‘¨|ðŸ‘©|" + "ðŸ‘ª|ðŸ‘«|ðŸ‘¬|ðŸ‘­|ðŸ‘®|ðŸ‘¯|ðŸ‘°|ðŸ‘±|" + "ðŸ‘²|ðŸ‘³|ðŸ‘´|ðŸ‘µ|ðŸ‘¶|ðŸ‘·|ðŸ‘¸|ðŸ‘¹|" + "ðŸ‘»|ðŸ‘¼|ðŸ‘½|ðŸ‘¾|ðŸ‘¿|ðŸ’€|ðŸ’|ðŸ’‚|" + "ðŸ’„|ðŸ’…|ðŸ’†|ðŸ’‡|ðŸ’ˆ|ðŸ’‰|ðŸ’Š|ðŸ’‹|" + "ðŸ’Œ|ðŸ’|ðŸ’Ž|ðŸ’|ðŸ’|ðŸ’‘|ðŸ’’|ðŸ’“|" + "ðŸ’”|ðŸ’•|ðŸ’–|ðŸ’—|ðŸ’˜|ðŸ’™|ðŸ’š|ðŸ’›|" + "ðŸ’œ|ðŸ’|ðŸ’ž|ðŸ’Ÿ|ðŸ’ |ðŸ’¡|ðŸ’¢|ðŸ’£|" + "ðŸ’¤|ðŸ’¥|ðŸ’¦|ðŸ’§|ðŸ’¨|ðŸ’©|ðŸ’ª|ðŸ’«|" + "ðŸ’¬|ðŸ’­|ðŸ’®|ðŸ’¯|ðŸ’°|ðŸ’±|ðŸ’²|ðŸ’³|" + "ðŸ’´|ðŸ’µ|ðŸ’¶|ðŸ’·|ðŸ’¸|ðŸ’¹|ðŸ’º|ðŸ’»|" + "ðŸ’¼|ðŸ’½|ðŸ’¾|ðŸ’¿|ðŸ“€|ðŸ“|ðŸ“‚|ðŸ“ƒ|" + "ðŸ“„|ðŸ“…|ðŸ“†|ðŸ“‡|ðŸ“ˆ|ðŸ“‰|ðŸ“Š|ðŸ“‹|" + "ðŸ“Œ|ðŸ“|ðŸ“Ž|ðŸ“|ðŸ“|ðŸ“‘|ðŸ“’|ðŸ““|" + "ðŸ“”|ðŸ“•|ðŸ“–|ðŸ“—|ðŸ“˜|ðŸ“™|ðŸ“š|ðŸ“›|" + "ðŸ“œ|ðŸ“|ðŸ“ž|ðŸ“Ÿ|ðŸ“ |ðŸ“¡|ðŸ“¢|ðŸ“£|" + "ðŸ“¤|ðŸ“¥|ðŸ“¦|ðŸ“§|ðŸ“¨|ðŸ“©|ðŸ“ª|ðŸ“«|" + "ðŸ“¬|ðŸ“­|ðŸ“®|ðŸ“¯|ðŸ“°|ðŸ“±|ðŸ“²|ðŸ“³|" + "ðŸ“´|ðŸ“µ|ðŸ“¶|ðŸ“·|ðŸ“¹|ðŸ“º|ðŸ“»|ðŸ“¼|" + "ðŸ”€|ðŸ”|ðŸ”‚|ðŸ”ƒ|ðŸ”„|ðŸ”…|ðŸ”†|ðŸ”‡|" + "ðŸ”ˆ|ðŸ”‰|ðŸ”Š|ðŸ”‹|ðŸ”Œ|ðŸ”|ðŸ”Ž|ðŸ”|" + "ðŸ”|ðŸ”‘|ðŸ”’|ðŸ”“|ðŸ””|ðŸ”•|ðŸ”–|ðŸ”—|" + "ðŸ”˜|ðŸ”™|ðŸ”š|ðŸ”›|ðŸ”œ|ðŸ”|ðŸ”ž|ðŸ”Ÿ|" + "ðŸ” |ðŸ”¡|ðŸ”¢|ðŸ”£|ðŸ”¤|ðŸ”¥|ðŸ”¦|ðŸ”§|" + "ðŸ”¨|ðŸ”©|ðŸ”ª|ðŸ”«|ðŸ”¬|ðŸ”­|ðŸ”®|ðŸ”¯|" + "ðŸ”°|ðŸ”±|ðŸ”²|ðŸ”³|ðŸ”´|ðŸ”µ|ðŸ”¶|ðŸ”·|" + "ðŸ”¸|ðŸ”¹|ðŸ”º|ðŸ”»|ðŸ”¼|ðŸ”½|ðŸ•|ðŸ•‘|" + "ðŸ•’|ðŸ•“|ðŸ•”|ðŸ••|ðŸ•–|ðŸ•—|ðŸ•˜|ðŸ•™|" + "ðŸ•š|ðŸ•›|ðŸ•œ|ðŸ•|ðŸ•ž|ðŸ•Ÿ|ðŸ• |ðŸ•¡|" + "ðŸ•¢|ðŸ•£|ðŸ•¤|ðŸ•¥|ðŸ•¦|ðŸ•§|ðŸ—»|ðŸ—¼|" + "ðŸ—½|ðŸ—¾|ðŸ—¿|ðŸ˜€|ðŸ˜|ðŸ˜‚|ðŸ˜ƒ|ðŸ˜„|" + "ðŸ˜…|ðŸ˜†|ðŸ˜‡|ðŸ˜ˆ|ðŸ˜‰|ðŸ˜Š|ðŸ˜‹|ðŸ˜Œ|" + "ðŸ˜|ðŸ˜Ž|ðŸ˜|ðŸ˜|ðŸ˜‘|ðŸ˜’|ðŸ˜“|ðŸ˜”|" + "ðŸ˜•|ðŸ˜–|ðŸ˜—|ðŸ˜˜|ðŸ˜™|ðŸ˜š|ðŸ˜›|ðŸ˜œ|" + "ðŸ˜|ðŸ˜ž|ðŸ˜Ÿ|ðŸ˜ |ðŸ˜¡|ðŸ˜¢|ðŸ˜£|ðŸ˜¤|" + "ðŸ˜¥|ðŸ˜¦|ðŸ˜§|ðŸ˜¨|ðŸ˜©|ðŸ˜ª|ðŸ˜«|ðŸ˜¬|" + "ðŸ˜­|ðŸ˜®|ðŸ˜¯|ðŸ˜°|ðŸ˜±|ðŸ˜²|ðŸ˜³|ðŸ˜´|" + "ðŸ˜µ|ðŸ˜¶|ðŸ˜·|ðŸ˜¸|ðŸ˜¹|ðŸ˜º|ðŸ˜»|ðŸ˜¼|" + "ðŸ˜½|ðŸ˜¾|ðŸ˜¿|ðŸ™€|ðŸ™…|ðŸ™†|ðŸ™‡|ðŸ™ˆ|" + "ðŸ™‰|ðŸ™Š|ðŸ™‹|ðŸ™Œ|ðŸ™|ðŸ™Ž|ðŸ™|ðŸš€|" + "ðŸš|ðŸš‚|ðŸšƒ|ðŸš„|ðŸš…|ðŸš†|ðŸš‡|ðŸšˆ|" + "ðŸš‰|ðŸšŠ|ðŸš‹|ðŸšŒ|ðŸš|ðŸšŽ|ðŸš|ðŸš|" + "ðŸš‘|ðŸš’|ðŸš“|ðŸš”|ðŸš•|ðŸš–|ðŸš—|ðŸš˜|" + "ðŸš™|ðŸšš|ðŸš›|ðŸšœ|ðŸš|ðŸšž|ðŸšŸ|ðŸš |" + "ðŸš¡|ðŸš¢|ðŸš£|ðŸš¤|ðŸš¥|ðŸš¦|ðŸš§|ðŸš¨|" + "ðŸš©|ðŸšª|ðŸš«|ðŸš¬|ðŸš­|ðŸš®|ðŸš¯|ðŸš°|" + "ðŸš±|ðŸš²|ðŸš³|ðŸš´|ðŸšµ|ðŸš¶|ðŸš·|ðŸš¸|" + "ðŸš¹|ðŸšº|ðŸš»|ðŸš¼|ðŸš½|ðŸš¾|ðŸš¿|ðŸ›€|" + "ðŸ›|ðŸ›‚|ðŸ›ƒ|ðŸ›„|ðŸ›…|#âƒ£|0âƒ£|1âƒ£|" + "2âƒ£|3âƒ£|4âƒ£|5âƒ£|6âƒ£|7âƒ£|8âƒ£|9âƒ£|" + "ã€°|âœ…|âœ¨|â„¢|â©|âª|â«|â¬|â°|â³|â›Ž|âœŠ|âœ‹|âŒ|âŽ|" + "âž°|âž¿|â“|â”|â•|âž•|âž–|âž—|Â©|Â®|î”Š|" + "(ðŸ…¿|ðŸˆš|ðŸˆ¯|ðŸ€„|â¤µ|ãŠ—|ãŠ™|â‰|â„¹|â†”|â†•|" + "â†–|â†—|â†˜|â†™|â˜€|â˜|â˜‘|â˜”|â˜•|â™ˆ|â™‰|â™|â™‘|â™’|â™“|" + "â™ |â™£|â™¥|â™¦|â™¨|âš“|âœ‚|âœˆ|âœ‰|âœ’|âœ”|âœ–|âœ³|âœ´|â€¼|" + "â†©|â†ª|â„|âŒš|âŒ›|â“‚|â–ª|â–«|â–¶|â—€|â—»|â—¼|â—½|â—¾|â˜Ž|" + "â˜|â˜º|â™Š|â™‹|â™Œ|â™|â™Ž|â™|â™»|â™¿|âš |âš¡|âšª|âš«|âš½|" + "âš¾|â›„|â›…|â›”|â›ª|â›²|â›³|â›µ|â›º|â›½|âœŒ|âœ|âž¡|â¬…|â¬†|" + "â¬‡|â¬›|â¬œ|â­|â­•|â‡|ã€½|â—|â¤|â¤´)([ï¸Žï¸]?)", "g");
    return t
  }();
  t.EmojiTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function e(t) {
      this.insertedQueue = [];
      this.backupQueue = [];
      this.newQueue = [];
      this.max = t
    }
    e.prototype.stabilize = function() {
      if (this.insertedQueue.length > this.max) {
        var e = this.insertedQueue.shift();
        t.ArrayTool.remove(this.backupQueue, e);
        t.ArrayTool.remove(this.newQueue, e)
      }
    };
    e.prototype.enqueue = function(t) {
      if (this.insertedQueue.indexOf(t) == -1) {
        this.insertedQueue.push(t);
        this.newQueue.push(t);
        this.stabilize()
      }
    };
    e.prototype.enqueueAsBackup = function(t) {
      if (this.insertedQueue.indexOf(t) == -1) {
        this.insertedQueue.push(t);
        this.backupQueue.push(t);
        this.stabilize()
      }
    };
    e.prototype.dequeueAndReadd = function() {
      var t = this.newQueue.shift();
      if (!t) {
        t = this.backupQueue.shift()
      }
      this.backupQueue.push(t);
      return t
    };
    return e
  }();
  t.BackupQueue = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.fillSet = function(t, e) {
      for (var i = 0; i < t.length; i++) {
        e.add(t[i])
      }
    };
    t.setFromArray = function(t) {
      var e = new collections.Set;
      this.fillSet(t, e);
      return e
    };
    t.setEquals = function(t, e) {
      if (t == null && e == null) {
        return true
      }
      if (t == null || e == null) {
        return false
      }
      if (t.size() != e.size()) {
        return false
      }
      return t.isSubsetOf(e)
    };
    return t
  }();
  t.CollectionTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.createCookie = function(t, e, i) {
      if (i) {
        var n = i;
        if (!(n instanceof Date)) {
          n = new Date;
          n.setTime(n.getTime() + i * 24 * 60 * 60 * 1e3)
        }
        var s = "; expires=" + n.toGMTString()
      } else
      var s = "";
      document.cookie = t + "=" + e + s + "; path=/"
    };
    t.readCookie = function(t) {
      var e = t + "=";
      var i = document.cookie.split(";");
      for (var n = 0; n < i.length; n++) {
        var s = i[n];
        while (s.charAt(0) == " ") s = s.substring(1, s.length);
        if (s.indexOf(e) == 0) return s.substring(e.length, s.length)
      }
      return null
    };
    t.eraseCookie = function(t) {
      this.createCookie(t, "", -1)
    };
    t.oneDay = function() {
      var t = new Date;
      return new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1)
    };
    t.nextWeek = function() {
      var t = new Date;
      return new Date(t.getFullYear(), t.getMonth(), t.getDate() + 7)
    };
    t.fourWeeks = function() {
      var t = new Date;
      return new Date(t.getFullYear(), t.getMonth(), t.getDate() + 28)
    };
    return t
  }();
  t.CookieTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.parseTwitterDateManual = function(t) {
      var e = t.split(" ");
      return new Date(Date.parse(e[1] + " " + e[2] + ", " + e[5] + " " + e[3] + " UTC"))
    };
    t.parseTwitterDate = function(t) {
      var e = null;
      try {
        e = new Date(t)
      } catch (i) {}
      if (e == null || isNaN(e.getTime())) {
        e = this.parseTwitterDateManual(t)
      }
      return e
    };
    t.timeAgo = function(t) {
      var e = ((new Date).getTime() - t.getTime()) / 1e3,
          i = Math.floor(e / 86400);
      if (isNaN(i) || i < 0) return;
      return i == 0 && (e < 60 && "just now" || e < 120 && "1 minute ago" || e < 3600 && Math.floor(e / 60) + " minutes ago" || e < 7200 && "1 hour ago" || e < 86400 && Math.floor(e / 3600) + " hours ago") || i == 1 && "Yesterday" || i < 14 && i + " days ago" || i < 31 && Math.ceil(i / 7) + " weeks ago" || i < 365 * 2 && Math.ceil(i / 30) + " months ago" || Math.round(i / 365) + " years ago"
    };
    t.timeAgoNL = function(t) {
      var e = ((new Date).getTime() - t.getTime()) / 1e3,
          i = Math.floor(e / 86400);
      if (isNaN(i) || i < 0) return;
      return i == 0 && (e < 60 && "zojuist" || e < 120 && "1 minuut geleden" || e < 3600 && Math.floor(e / 60) + " minuten geleden" || e < 7200 && "1 uur geleden" || e < 86400 && Math.floor(e / 3600) + " uur geleden") || i == 1 && "gisteren" || i < 14 && i + " dagen geleden" || i < 31 && Math.ceil(i / 7) + " weken geleden" || i < 365 * 2 && Math.ceil(i / 30) + " maanden geleden" || Math.round(i / 365) + " jaar geleden"
    };
    t.getMonthNameNL = function(t) {
      var e = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
      return e[t.getMonth()]
    };
    t.getMonthName = function(t) {
      var e = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return e[t.getMonth()]
    };
    return t
  }();
  t.DateTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t(t) {
          this.dx = 0;
          this.dy = 0;
          this.patternX = 0;
          this.patternY = 0;
          this.pattern = null;
          this.element = t;
          this.context = this.element.getContext("2d")
        }
        t.prototype.getPattern = function() {
          if (this.pattern == null) {
            this.updatePattern()
          }
          return this.pattern
        };
        t.prototype.updatePattern = function() {
          if (this.pattern == null) {
            this.pattern = this.context.createPattern(this.element, "repeat");
            this.patternX = this.dx;
            this.patternY = this.dy
          }
        };
        t.prototype.getDx = function() {
          return this.dx
        };
        t.prototype.getDy = function() {
          return this.dy
        };
        t.prototype.getOriginalX = function(t) {
          var e = t - this.dx % this.element.width;
          if (e < 0) {
            e += this.element.width
          }
          if (e > this.element.width) {
            e -= this.element.width
          }
          return e
        };
        t.prototype.getOriginalY = function(t) {
          var e = t - this.dy % this.element.height;
          if (e < 0) {
            e += this.element.height
          }
          if (e > this.element.height) {
            e -= this.element.height
          }
          return e
        };
        t.prototype.getCurrentX = function(t) {
          var e = t + this.dx % this.element.width;
          if (e < 0) {
            e += this.element.width
          }
          if (e >= this.element.width) {
            e -= this.element.width
          }
          return e
        };
        t.prototype.getCurrentY = function(t) {
          var e = t + this.dy % this.element.height;
          if (e < 0) {
            e += this.element.height
          }
          if (e >= this.element.height) {
            e -= this.element.height
          }
          return e
        };
        t.prototype.update = function(t, e) {
          this.context.fillStyle = this.getPattern();
          this.context.clearRect(0, 0, this.element.width, this.element.height);
          this.dx = t;
          this.dy = e;
          var i = this.dx - this.patternX;
          var n = this.dy - this.patternY;
          this.context.translate(i, n);
          this.context.fillRect(-i, -n, this.element.width, this.element.height);
          this.context.translate(-i, -n)
        };
        t.prototype.setDx = function(t) {
          this.newDx = Math.round(t)
        };
        t.prototype.setDy = function(t) {
          this.newDy = Math.round(t)
        };
        t.prototype.panBy = function(t, e) {
          return this.panTo(t + this.dx, e + this.dy)
        };
        t.prototype.rerender = function() {
          this.update(this.newDx, this.newDy)
        };
        t.prototype.panTo = function(t, e) {
          var i = this;
          return TweenLite.to(this, .3, {
            setDx: t,
            setDy: e,
            onUpdate: function() {
              return i.rerender()
            }
          })
        };
        t.prototype.getRects = function(t, e, i, n) {
          t += this.dx % this.element.width;
          e += this.dy % this.element.height;
          if (t + i > this.element.width) {
            t -= this.element.width
          }
          if (e + n > this.element.height) {
            e -= this.element.height
          }
          var s = [{
            x: t,
            y: e,
            w: i,
            h: n
          }];
          if (t < 0 && e < 0) {
            s.push({
              x: t + this.element.width,
              y: e + this.element.height,
              w: i,
              h: n
            })
          }
          if (t < 0) {
            s.push({
              x: t + this.element.width,
              y: e,
              w: i,
              h: n
            })
          }
          if (e < 0) {
            s.push({
              x: t,
              y: e + this.element.height,
              w: i,
              h: n
            })
          }
          return s
        };
        t.prototype.clearRect = function(t, e, i, n) {
          var s = this.getRects(t, e, i, n);
          for (var r = 0; r < s.length; r++) {
            this.context.clearRect(s[r].x, s[r].y, s[r].w, s[r].h)
          }
          this.pattern = null
        };
        t.prototype.drawImage = function(t, e, i, n, s, r, a, o, u) {
          var h = this.getRects(r, a, o, u);
          for (var l = 0; l < h.length; l++) {
            this.context.drawImage(t, e, i, n, s, h[l].x, h[l].y, h[l].w, h[l].h)
          }
          this.pattern = null
        };
        t.prototype.fillRect = function(t, e, i, n) {
          var s = this.getRects(t, e, i, n);
          for (var r = 0; r < s.length; r++) {
            this.context.fillRect(s[r].x, s[r].y, s[r].w, s[r].h)
          }
          this.pattern = null
        };
        t.prototype.setFillStyle = function(t) {
          this.context.fillStyle = t
        };
        t.prototype.setGlobalAlpha = function(t) {
          this.context.globalAlpha = t
        };
        return t
      }();
      t.InfiniteCanvas = e
    })(e = t.grid || (t.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function e() {}
    e.getChecksumNumber = function(e) {
      return t.StringTool.crc32(e) % 5 + 1
    };
    e.getTweetBeamUrl = function(t, i, n, s, r) {
      if (r === void 0) {
        r = false
      }
      var a = "";
      var o = "http://a" + e.getChecksumNumber(t) + ".img.tweetbeam.com";
      if (s != undefined) {
        a = o + "/twitter?user=" + encodeURIComponent(s) + "&suggested_url=" + encodeURIComponent(t)
      } else {
        a = o + "/image?url=" + encodeURIComponent(t)
      }
      if (i != undefined && n != undefined) {
        a += "&w=" + i + "&h=" + n
      }
      if (!r) {
        a += "&keep_aspect_ratio=false"
      }
      return a
    };
    e.getTweetBeamGrayscaleUrl = function(t, i, n, s) {
      return e.getTweetBeamUrl(t, i, n, s) + "&grayscale=true"
    };
    e.getCloudinaryGrayscaleUrl = function(t, i, n, s) {
      if (s === void 0) {
        s = "fill"
      }
      return "http://a" + e.getChecksumNumber(n) + ".res.cloudinary.com/tweetbeam/image/fetch/w_" + t + ",h_" + i + ",c_" + s + ",e_grayscale,f_auto/" + encodeURIComponent(n)
    };
    e.getCloudinaryUrl = function(t, i, n, s) {
      if (s === void 0) {
        s = "fill"
      }
      return "http://a" + e.getChecksumNumber(n) + ".res.cloudinary.com/tweetbeam/image/fetch/w_" + t + ",h_" + i + ",c_" + s + ",f_auto/" + encodeURIComponent(n)
    };
    return e
  }();
  t.ImageProxy = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.getJsonElementByPath = function(t, e) {
      if (e == "") {
        return t
      }
      var i = e.split(".");
      var n = t;
      for (var s = 0; s < i.length; s++) {
        n = n[i[s]]
      }
      return n
    };
    t.applyBindings = function(e, i) {
      if (e == null) {
        return
      }
      for (var n in i) {
        if (typeof i[n] === "object") {
          t.applyBindings(e, i[n])
        } else if (typeof i[n] === "string" && i[n].indexOf("{{") > -1) {
          i[n] = Handlebars.compile(i[n])(e)
        }
      }
    };
    return t
  }();
  t.JSONTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.solve = function() {
      var t = Math.abs;

      function e(t, i, n, s) {
        if (n === i.length - 1) return s(t);
        var r, a = i[n],
            o = Array(a);
        for (r = a - 1; r >= 0; --r) o[r] = e(t[r], i, n + 1, s);
        return o
      }
      function i(t) {
        var e = [];
        while (typeof t === "object") e.push(t.length), t = t[0];
        return e
      }
      function n(t) {
        var e, n;
        if (typeof t === "object") {
          e = t[0];
          if (typeof e === "object") {
            n = e[0];
            if (typeof n === "object") {
              return i(t)
            }
            return [t.length, e.length]
          }
          return [t.length]
        }
        return []
      }
      function s(t) {
        var e = t.length,
            i, n = Array(e);
        for (i = e - 1; i !== -1; --i) n[i] = t[i];
        return n
      }
      function r(t) {
        return typeof t !== "object" ? t : e(t, n(t), 0, s)
      }
      function a(e, i) {
        i = i || false;
        var n, s, a, o, u, h, l, c, g, d = e.length,
            p = d - 1,
            m = new Array(d);
        if (!i) e = r(e);
        for (a = 0; a < d; ++a) {
          l = a;
          h = e[a];
          g = t(h[a]);
          for (s = a + 1; s < d; ++s) {
            o = t(e[s][a]);
            if (g < o) {
              g = o;
              l = s
            }
          }
          m[a] = l;
          if (l != a) {
            e[a] = e[l];
            e[l] = h;
            h = e[a]
          }
          u = h[a];
          for (n = a + 1; n < d; ++n) {
            e[n][a] /= u
          }
          for (n = a + 1; n < d; ++n) {
            c = e[n];
            for (s = a + 1; s < p; ++s) {
              c[s] -= c[a] * h[s];
              ++s;
              c[s] -= c[a] * h[s]
            }
            if (s === p) c[s] -= c[a] * h[s]
          }
        }
        return {
          LU: e,
          P: m
        }
      }
      function o(t, e) {
        var i, n, s = t.LU,
            a = s.length,
            o = r(e),
            u = t.P,
            h, l, c;
        for (i = a - 1; i !== -1; --i) o[i] = e[i];
        for (i = 0; i < a; ++i) {
          h = u[i];
          if (u[i] !== i) c = o[i], o[i] = o[h], o[h] = c;
          l = s[i];
          for (n = 0; n < i; ++n) {
            o[i] -= o[n] * l[n]
          }
        }
        for (i = a - 1; i >= 0; --i) {
          l = s[i];
          for (n = i + 1; n < a; ++n) {
            o[i] -= o[n] * l[n]
          }
          o[i] /= l[i]
        }
        return o
      }
      return function(t, e, i) {
        return o(a(t, i), e)
      }
    }();
    return t
  }();
  t.NumericTool = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e = function() {
    function t() {}
    t.sizeText = function(t, e, i) {
      var n = e;
      do {
        n = n - 10;
        t.style["font-size"] = n + "px";
        if (i) {
          i()
        }
      } while (t.scrollHeight > t.clientHeight && n - 10 > 0);
      n = n + 11;
      do {
        n = n - 1;
        t.style["font-size"] = n + "px";
        if (i) {
          i()
        }
      } while (t.scrollHeight > t.clientHeight && n > 0)
    };
    return t
  }();
  t.SizeText = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e;
      (function(t) {
        var e = function() {
          function t() {
            this.swap_fade_in_time = 200;
            this.swap_disappear_time = 200;
            this.background_crop_mode = "fill";
            this.background_image_source = "TWEETBEAM";
            this.highlight_image_source = "TWEETBEAM";
            this.background_grayscale = true;
            this.force_profile_image = false
          }
          return t
        }();
        t.Settings = e
      })(e = t.backgrounditem || (t.backgrounditem = {}))
    })(e = t.grid || (t.grid = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e(t) {
          this.target_frame_delta = 1e3 / 60;
          this.currentAnimation = null;
          this.settings = t;
          this.createDOM()
        }
        e.prototype.createDOM = function() {
          var t = this.dom;
          this.dom = $('<div id="selected-item"><div id="content-outer"><div id="content-inner"><div class="header"></div><div class="message-text"></div></div></div></div>');
          this.contentOuter = $("#content-outer", this.dom);
          this.contentInner = $("#content-inner", this.dom);
          this.messageText = $(".message-text", this.dom);
          this.header = $(".header", this.dom);
          this.img = null;
          if (t != null) {
            t.replaceWith(this.dom)
          }
        };
        e.prototype.appendTo = function(t) {
          this.dom.appendTo(t)
        };
        e.prototype.show = function(t, e) {
          if (e) {
            if (t == this.highlightedBackgroundItem) {
              return
            }
          }
          this.highlightedBackgroundItem = t;
          this.createDOM();
          this.updateDOM()
        };
        e.prototype.getHighlightedImage = function() {
          var t = $('<div class="image" />').css({
            width: this.highlightedBackgroundItem.getItemSize() + this.getLeftBorderWidth(),
            height: this.highlightedBackgroundItem.getItemSize() + this.getLeftBorderWidth()
          }).css("display", "block").css("background-image", "url(" + this.highlightedBackgroundItem.getColorImage().src + ")");
          return t
        };
        e.prototype.updateDOM = function() {
          var e = this.highlightedBackgroundItem.getMessage();
          if (e == undefined) {
            return
          }
          var i = this.getHighlightedImage();
          i[0].className = "image";
          if (this.img != null) {
            this.dom[0].removeChild(this.img[0])
          }
          this.dom[0].appendChild(i[0]);
          this.img = i;
          var n = e.getMessage(150);
          if (this.settings.highlight_show_date) {
            n += " " + t.DateTool.timeAgo(e.date)
          }
          if (document.body.className.indexOf("fullscreen") == -1) {
            var s = $('<a target="_blank"></a>').attr("href", e.getURL());
            this.setTextContent(s[0], n);
            this.messageText[0].appendChild(s[0])
          } else {
            this.setTextContent(this.messageText[0], n)
          }
          this.setTextContent(this.header[0], "@" + e.user);
          this.initAnim()
        };
        e.prototype.setTextContent = function(t, e) {
          t.innerHTML = "";
          t.appendChild(document.createTextNode(e))
        };
        e.prototype.setFramerate = function(t) {
          this.target_frame_delta = 1e3 / t
        };
        e.prototype.initAnim = function() {
          var e = this;
          var i = this.highlightedBackgroundItem.getImageX();
          var s = this.highlightedBackgroundItem.getImageY();
          this.dom[0].style.display = "block";
          this.dom[0].style.left = i + "px";
          this.dom[0].style.top = s + "px";
          this.dom[0].style.marginLeft = -this.highlightedBackgroundItem.borderWidth + "px";
          this.dom[0].style.marginTop = -this.highlightedBackgroundItem.borderWidth + "px";
          var r = this.highlightedBackgroundItem.getColorImage();
          var a = r.width / r.height;
          var o;
          var u;
          if (a < 0) {
            o = this.highlightedBackgroundItem.getItemSizeAfterGrow();
            u = o / a
          } else {
            u = this.highlightedBackgroundItem.getItemSizeAfterGrow();
            o = u * a
          }
          if (this.settings.avoid_collision_enabled) {
            var h = this.dom.offset().left - i;
            var l = this.dom.offset().top - s;
            var c = this.highlightedBackgroundItem.getItemSize();
            var g = o + 2 * this.getLeftBorderWidth();
            var d = u + 2 * this.getLeftBorderWidth();
            var p = 0;
            var m = 0;
            var f = 10;
            var v = $(".collide").filter(function() {
              return this.style.display != "none"
            }).map(function() {
              return {
                x: $(this).offset().left - h,
                y: $(this).offset().top - l,
                width: parseInt($(this).css("width")),
                height: parseInt($(this).css("height"))
              }
            }).get();
            var w = {
              x: 0,
              y: 0,
              width: this.dom.parent().width(),
              height: this.dom.parent().height()
            };
            var y = t.FreePositionFinder.getClosestFreePosition(w, i - f - p, s - f - m, g + this.settings.highlight_slide_width + f * 2, d + f * 2, v);
            var b = y["x"] + f + p;
            var L = y["y"] + f + m;
            var x = this.dom;
            var _ = {
              x: b - i,
              y: L - s
            };
            var T = {
              left: b,
              top: L
            };
            this.dom.transition(bowser.msie && bowser.version >= 10 ? T : _, {
              duration: this.settings.highlight_avoid_collision_time,
              queue: false,
              easing: "easeOutQuad",
              cleanup: true,
              complete: function() {
                return x.css({
                  x: 0,
                  y: 0,
                  left: b,
                  top: L
                })
              }
            })
          }
          this.currentAnimation = new n(this, o, u, this.settings.highlight_image_grow_time, function() {
            return e.initContent()
          })
        };
        e.prototype.initContent = function() {
          this.contentOuter.css({
            left: this.img.outerWidth(),
            width: this.settings.highlight_slide_width
          }).show();
          this.contentInner.css({
            width: this.settings.highlight_slide_width,
            x: -this.settings.highlight_slide_width
          }).transition({
            x: 0
          }, {
            cleanup: false,
            duration: this.settings.highlight_content_slide_time,
            easing: "linear"
          })
        };
        e.prototype.getLeftBorderWidth = function() {
          return this.settings.highlight_border_width
        };
        return e
      }();
      e.DivBgHighlightItemView = i;
      var n = function() {
        function t(t, e, i, n, s) {
          var r = this;
          this.isCancelled = false;
          var a = t.getLeftBorderWidth();
          this.parent = t;
          this.marginFrom = -a;
          this.sizeFrom = t.highlightedBackgroundItem.getItemSize() + a * 2;
          this.marginToLeft = -(e - this.sizeFrom) / 2 - a;
          this.marginToTop = -(i - this.sizeFrom) / 2 - a;
          this.wrapStyle = t.dom[0].style;
          this.imgStyle = t.img[0].style;
          this.animation_time = n;
          this.onCompleteHandler = s;
          t.dom.find("#content-outer").hide();
          t.img.transition({
            width: e,
            height: i
          }, {
            duration: this.animation_time,
            queue: false,
            cleanup: false,
            easing: "linear",
            complete: function() {
              if (!r.isCancelled) {
                r.onCompleteHandler()
              }
            }
          })
        }
        t.prototype.cancel = function() {
          this.parent.dom.stop();
          $(this.parent.img).stop();
          this.isCancelled = true
        };
        return t
      }()
    })(i = e.classic || (e.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e(t, e, i, n) {
          if (i === void 0) {
            i = true
          }
          if (n === void 0) {
            n = false
          }
          this.max = 2e3;
          this.keep_after_max = 1500;
          this.itemsHighlightedByMessage = new collections.MultiDictionary;
          this.messagesHighlighted = [];
          this.itemsToHighlight = [];
          this.messagesToAdd = [];
          this.preloadingMessages = [];
          this.show_messages_initially = 0;
          this.messages_to_show_initially = [];
          this.messages_to_show_initially_order = [];
          this.prevent_swap_when_highlighting = true;
          this.fake_swaps = false;
          this.previousMessageToHighlightId = null;
          this.emptyItems = t;
          this.show_messages_initially = e;
          this.prevent_swap_when_highlighting = i;
          this.itemCount = t.length;
          this.fake_swaps = n
        }
        e.prototype.insertInitialInItemsToHighlight = function(t) {
          var e = 0;
          while (e < this.itemsToHighlight.length) {
            if (this.messages_to_show_initially_order.indexOf(this.itemsToHighlight[e].getMessage()) < this.messages_to_show_initially_order.indexOf(t.getMessage())) {
              e++
            } else {
              break
            }
          }
          this.itemsToHighlight.splice(e, 0, t)
        };
        e.selectMessage = function(e) {
          return t.ArrayTool.getRandom(e)
        };
        e.prototype.getItemCount = function() {
          return this.itemCount
        };
        e.prototype.getItemToSwap = function() {
          var t;
          if (!this.prevent_swap_when_highlighting || this.messagesHighlighted.length > 1 || this.itemsToHighlight.length == 0) {
            var e = this.messagesHighlighted.shift();
            if (e) {
              var i = this.itemsHighlightedByMessage.getValue(e);
              t = i[0];
              if (i.length > 1) {
                this.messagesHighlighted.unshift(e)
              }
              this.itemsHighlightedByMessage.remove(t.getMessage(), t)
            }
          }
          if (!t) {
            t = this.itemsToHighlight.shift()
          }
          return t
        };
        e.prototype.fillEmptyItem = function(e, i) {
          var n = this;
          this.preloadingMessages.push(i);
          t.ImagePreloader.preload(e.getImagesToPreload(i)).always(function() {
            var e = [];
            for (var s = 0; s < arguments.length; s++) {
              e[s - 0] = arguments[s]
            }
            t.ArrayTool.remove(n.preloadingMessages, i)
          }).done(function() {
            var s = [];
            for (var r = 0; r < arguments.length; r++) {
              s[r - 0] = arguments[r]
            }
            e.swapMessage(i, s);
            if (t.ArrayTool.remove(n.messages_to_show_initially, i) > -1) {
              n.insertInitialInItemsToHighlight(e)
            } else {
              if (n.messagesHighlighted.indexOf(i) == -1) {
                n.messagesHighlighted.push(i)
              }
              n.itemsHighlightedByMessage.setValue(e.getMessage(), e)
            }
          }).fail(function() {
            var t = [];
            for (var i = 0; i < arguments.length; i++) {
              t[i - 0] = arguments[i]
            }
            n.emptyItems.unshift(e)
          })
        };
        e.prototype.fillEmptyItems = function() {
          if (this.emptyItems.length > 0) {
            t.Debug.log("empty:" + this.emptyItems.length + " messages:" + this.messagesToAdd.length)
          }
          while (this.emptyItems.length > 0) {
            var e = this.getMessageOrBackupMessage();
            if (!e) {
              break
            }
            var i = this.emptyItems.pop();
            this.fillEmptyItem(i, e)
          }
        };
        e.prototype.getMessageOrBackupMessage = function() {
          var e = null;
          if (this.messagesToAdd.length) {
            e = this.messagesToAdd.shift()
          } else {
            e = t.ArrayTool.getRandom(this.itemsToHighlight.map(function(t) {
              return t.getMessage()
            }).concat(this.preloadingMessages).concat(this.itemsHighlightedByMessage.keys()))
          }
          return e
        };
        e.prototype.addMessages = function(t) {
          for (var e = 0; e < this.show_messages_initially; e++) {
            if (e < t.length) {
              this.messages_to_show_initially.push(t[e]);
              this.messages_to_show_initially_order.push(t[e])
            }
          }
          this.show_messages_initially = 0;
          this.messagesToAdd.push.apply(this.messagesToAdd, t.reverse());
          if (this.messagesToAdd.length > this.max) {
            this.messagesToAdd.splice(0, this.keep_after_max)
          }
          this.fillEmptyItems()
        };
        e.prototype.getItemToHighlight = function(i) {
          if (i === void 0) {
            i = new collections.Set
          }
          i.add(this.previousMessageToHighlightId);
          var n = this.itemsToHighlight.shift();
          if (n) {
            this.messagesHighlighted.push(n.getMessage());
            this.itemsHighlightedByMessage.setValue(n.getMessage(), n)
          } else {
            var s;
            var r = 0;
            do {
              s = e.selectMessage(this.messagesHighlighted)
            } while (s && i.contains(s.id) && r++ < 5);
            n = t.ArrayTool.getRandom(this.itemsHighlightedByMessage.getValue(s))
          }
          if (n) {
            this.previousMessageToHighlightId = n.getMessage().id
          }
          return n
        };
        e.prototype.showNewMessage = function() {
          var e = this;
          var i = this.messagesToAdd.shift();
          if (i) {
            var n = this.getItemToSwap();
            if (!n) {
              this.messagesToAdd.unshift(i);
              return
            }
            this.preloadingMessages.push(i);
            t.ImagePreloader.preload(n.getImagesToPreload(i)).always(function() {
              var n = [];
              for (var s = 0; s < arguments.length; s++) {
                n[s - 0] = arguments[s]
              }
              t.ArrayTool.remove(e.preloadingMessages, i)
            }).done(function() {
              var t = [];
              for (var s = 0; s < arguments.length; s++) {
                t[s - 0] = arguments[s]
              }
              n.swapMessage(i, t);
              e.itemsToHighlight.push(n)
            }).fail(function() {
              var t = [];
              for (var i = 0; i < arguments.length; i++) {
                t[i - 0] = arguments[i]
              }
              e.messagesHighlighted.unshift(n.getMessage());
              e.itemsHighlightedByMessage.setValue(n.getMessage(), n)
            })
          } else {
            if (this.emptyItems.length == 0 && this.fake_swaps) {
              if (this.itemsHighlightedByMessage.size() > 10) {
                var s = t.ArrayTool.getRandom(this.itemsHighlightedByMessage.values());
                var r = t.ArrayTool.getRandom(this.itemsHighlightedByMessage.values().filter(function(t) {
                  return t.getItemSize() == s.getItemSize()
                }));
                if (s.getMessage().id != r.getMessage().id && s != r) {
                  this.itemsHighlightedByMessage.remove(s.getMessage(), s);
                  this.itemsHighlightedByMessage.remove(r.getMessage(), r);
                  var a = s.getPreloadedImages();
                  var o = r.getPreloadedImages();
                  var u = s.getMessage();
                  var h = r.getMessage();
                  s.swapMessage(h, o);
                  r.swapMessage(u, a);
                  this.itemsHighlightedByMessage.setValue(s.getMessage(), s);
                  this.itemsHighlightedByMessage.setValue(r.getMessage(), r)
                }
              }
            }
          }
          this.fillEmptyItems()
        };
        e.prototype.filterMessages = function(t) {
          var e = this;
          this.messagesToAdd = this.messagesToAdd.filter(function(e) {
            return t.passesFilter(e)
          });
          var i = [];
          this.messagesHighlighted = this.messagesHighlighted.filter(function(n) {
            var s = t.passesFilter(n);
            if (!s) {
              var r = e.itemsHighlightedByMessage.getValue(n);
              for (var a = 0; a < r.length; a++) {
                i.push(r[a])
              }
              e.itemsHighlightedByMessage.remove(n)
            }
            return s
          });
          this.itemsToHighlight = this.itemsToHighlight.filter(function(e) {
            var n = t.passesFilter(e.getMessage());
            if (!n) {
              i.push(e)
            }
            return n
          });
          this.emptyItems.push.apply(this.emptyItems, i);
          t.removedByFilter(i.map(function(t) {
            return t.getMessage()
          }));
          this.fillEmptyItems()
        };
        return e
      }();
      e.PositionManager2 = i
    })(i = e.classic || (e.classic = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(i) {
        __extends(n, i);

        function n(e, n) {
          this.settings = $.extend({}, new t.view.game2k.Settings, n["game2k"]);
          i.call(this, e, this.settings, t.App.ROOT + this.settings.template_url + "?" + Math.random());
          this.items = []
        }
        n.prototype.onInitialize = function() {
          $(".beam").empty();
          this.view = $(".beam").append(Mustache.render(e.Templates.get("#view-wrapper"), this.settings));
          this.itemsContainer = $(".items", this.view);
          var i = $('<canvas style="position:absolute;top:0px;left:0px;"></canvas>').attr("width", this.itemsContainer.width()).attr("height", this.itemsContainer.height());
          this.itemsContainer.append(i);
          t.view.classic.BackgroundItemLargeCanvas.canvas = i;
          this.initGrid();
          var n = new e.classic.FaderCanvas(this.settings);
          n.create().appendTo(this.view);
          this.createBranding($(".beam", this.view))
        };
        n.prototype.onDestroy = function() {
          $(".beam").empty();
          this.items = []
        };
        n.prototype.unHighlight = function(t) {
          var e = $(".items", this.view);
          var n = $(".highlight-container", this.view);
          var s = new TimelineLite;
          s.appendMultiple([TweenLite.to(n, .5, {
            opacity: 0
          })]);
          i.prototype.unHighlight.call(this, t)
        };
        n.prototype.onHighlightMessage = function(i) {
          if (this.first) {}
          this.first = true;
          var n = $(".items", this.view);
          var s = $(".highlight-container", this.view);
          s.empty();
          var r = $(Handlebars.compile(e.Templates.get("#message-template"))(i))[0];
          s.append(r);
          t.SizeText.sizeText(s[0], 50);
          var a = new TimelineLite;
          a.appendMultiple([TweenLite.to(s, .5, {
            opacity: 1
          })])
        };
        n.prototype.onHighlight = function(t) {
          this.onHighlightMessage(t.getMessage())
        };
        n.prototype.getWidth = function() {
          return this.view.width()
        };
        n.prototype.onFilterChanged = function() {
          this.positionManager.filterMessages(this.messageProvider)
        };
        n.prototype.initGrid = function() {
          var i = this;
          var n = this.view;
          var s = 12;
          var r = Math.ceil(n.width() / s);
          var a = r;
          var o = Math.ceil(n.height() / a);
          this.itemsContainer.width(s * r).height(o * a).css({
            left: 0,
            top: 0,
            position: "absolute"
          });
          if (this.settings.square_grid) {
            this.grid = new t.components.grid.SmallGrid(this.itemsContainer, r, this.settings.block_border_width, [1], 0, 0)
          } else {
            this.grid = new t.components.grid.ClassicGrid(this.itemsContainer, this.settings.block_size, this.settings.block_border_width, this.settings.grow_ratios)
          }
          this.grid.render(function() {
            var t = new e.classic.BackgroundItemLargeCanvas(i.settings.background_items);
            i.items.push(t);
            t.setHoverCallback(function(t) {});
            return t
          });
          this.items = t.ArrayTool.shuffle(this.items);
          this.positionManager = new t.view.classic.PositionManager2(this.items, 20)
        };
        return n
      }(t.view.base.BaseView);
      i.Game2KView = n
    })(i = e.game2k || (e.game2k = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(e) {
        __extends(i, e);

        function i() {
          e.apply(this, arguments);
          this.template_url = "view/game2k/res/templates.html";
          this.highlight_start_time = 2e3;
          this.highlight_interval = 11e3;
          this.highlight_resume_time = 18e3;
          this.message_prefix = "Tag your photos with";
          this.unhighlight_after_time = 8e3;
          this.background_items = $.extend(new t.components.grid.backgrounditem.Settings, {
            swap_fade_in_time: 200,
            force_profile_image: true
          });
          this.square_grid = false
        }
        return i
      }(e.classic.Settings);
      i.Settings = n
    })(i = e.game2k || (e.game2k = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = t.components.slides;
      var s = function(s) {
        __extends(r, s);

        function r(n, r, a) {
          var o = this;
          s.call(this, n, r, a);
          this.slides = [];
          this.previousWidth = null;
          this.previousHeight = null;
          this.settings = $.extend(true, {}, JSON.parse(JSON.stringify(new i.Settings)), r["slide"]);
          if (this.settings.template_src) {
            e.Templates.load(t.App.ROOT + this.settings.template_src + "?r=" + Math.random(), function() {
              o.onInitialize()
            })
          } else {
            this.onInitialize()
          }
          window.onresize = t.Debounce.debounced(function() {
            return o.handleResize()
          }, 300)
        }
        r.prototype.handleResize = function() {
          if (this.previousHeight != window.innerHeight || this.previousWidth != window.innerWidth) {
            this.onInitialize()
          }
        };
        r.prototype.onDestroy = function() {
          $(this.container).empty();
          for (var t = 0; t < this.slides.length; t++) {
            this.slides[t].destroy()
          }
          this.slides = [];
          if (this.timeline) {
            this.timeline.clear();
            this.timeline = null
          }
        };
        r.prototype.getWidth = function() {
          return this.view.width()
        };
        r.prototype.createSlides = function() {
          for (var e = 0; e < this.settings.slides.length; e++) {
            var i = this.settings.slides[e];
            var s;
            if (Array.isArray(i)) {
              s = new n.MultiSlide(this.view[0], i)
            } else {
              s = t.InstanceLoader.createInstance(i.type, this.view[0], i)
            }
            this.slides.push(s);
            s.renderToContainer()
          }
        };
        r.prototype.createTimeline = function() {
          var e = new TimelineMax({
            repeat: -1,
            repeatDelay: 0
          });
          var i = 0;
          for (var n = 0; n < this.slides.length; n++) {
            var s = this.slides[n];
            if (n > 0) {
              var r = s.getEnterAnimation();
              e.add(r, t.GSAPTool.getOffsetFromNumber(-i))
            } else {
              s.getSetShowValuesTween()
            }
            var a = s.getContentAnimation();
            if (a) {
              e.add(a)
            }
            if (this.slides.length > 1) {
              var o = s.getExitAnimation();
              i = o.duration();
              e.add(o)
            }
          }
          if (this.slides.length > 1) {
            var r = this.slides[0].getEnterAnimation();
            e.add(r, t.GSAPTool.getOffsetFromNumber(-i))
          } else {
            e.repeat(0)
          }
          e.play();
          if (!window["timeline"]) {
            window["timeline"] = e
          }
          this.timeline = e
        };
        r.prototype.onInitialize = function() {
          var t = this;
          this.onDestroy();
          this.view = $('<div class="slide-view">');
          $(this.container).append(this.view);
          if (this.settings.preload_fonts.length > 0) {
            FontDetect.onFontLoaded(this.settings.preload_fonts[0], function() {
              return t.createContent()
            }, function() {
              return t.createContent()
            }, {
              msTimeout: 3e4
            })
          } else {
            this.createContent()
          }
        };
        r.prototype.createContent = function() {
          this.createSlides();
          this.createTimeline()
        };
        return r
      }(t.View);
      i.SlideView = s
    })(i = e.slide || (e.slide = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t() {
          this.preload_fonts = []
        }
        return t
      }();
      t.Settings = e
    })(e = t.slide || (t.slide = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t(t, e) {
          this.x = t;
          this.y = e
        }
        return t
      }();
      t.Point = e
    })(e = t.stair || (t.stair = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t(t, e, i, n) {
          this.topleft = t;
          this.topright = e;
          this.bottomright = i;
          this.bottomleft = n
        }
        t.prototype.toArray = function() {
          return [this.topleft, this.topright, this.bottomright, this.bottomleft].map(function(t) {
            return [t.x, t.y]
          })
        };
        t.prototype.toArrayNormalized = function(t) {
          var e = this;
          if (t === void 0) {
            t = 1
          }
          return [this.topleft, this.topright, this.bottomright, this.bottomleft].map(function(i) {
            return [(i.x - e.topleft.x) * t, (i.y - e.topleft.y) * t]
          })
        };
        return t
      }();
      t.Box = e
    })(e = t.stair || (t.stair = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function i(i, n, s, r) {
          this.marginLeft = 50;
          this.endRight = n + (r.width() - n) / 3;
          this.container = r;
          var a = $('<div class="box highlight-box"></div>');
          var o = i.topleft.y * s;
          var u = i.topleft.x * s;
          var h = new e.Point(0, 0);
          var l = new e.Box(h, new e.Point(h.x + 300, h.y), new e.Point(h.x + 300, h.y + 200), new e.Point(h.x, h.y + 200));
          a.css("left", n + u);
          a.css("top", o);
          var c = l.toArrayNormalized();
          var g = i.toArrayNormalized(s);
          for (var d = [], p = [], m = 0, f = c.length; m < f; ++m) {
            var v = c[m],
                w = g[m];
            d.push([v[0], v[1], 1, 0, 0, 0, -v[0] * w[0], -v[1] * w[0]]), p.push(w[0]);
            d.push([0, 0, 0, v[0], v[1], 1, -v[0] * w[1], -v[1] * w[1]]), p.push(w[1])
          }
          var y = t.NumericTool.solve(d, p, true);
          var b = [y[0], y[3], 0, y[6], y[1], y[4], 0, y[7], 0, 0, 1, 0, y[2], y[5], 0, 1].map(function(t) {
            return t.toFixed(6)
          });
          a.css("-webkit-transform", "matrix3d(" + b + ")");
          r.append(a);
          a.css("display", "none");
          this.dom = a;
          this.highlightTextDom = $('<div class="highlight"><div class="text"></div><div class="user"></div></div>');
          this.highlightTextDom.width(this.endRight - this.marginLeft);
          this.highlightTextDom.height((r.height() - 100) * .5);
          this.highlightTextDom.css("top", "20px");
          this.highlightTextDom.css("left", this.marginLeft + "px");
          this.highlightTextDom.css("display", "none")
        }
        i.prototype.getImagesToPreload = function(t) {
          return [t.getPrimaryImageUrl()]
        };
        i.prototype.getMessage = function() {
          return this.message
        };
        i.prototype.getPreloadedImages = function() {
          return this.preloadedImages
        };
        i.prototype.swapMessage = function(e, i) {
          this.dom[0].style.backgroundImage = "url(" + e.getPrimaryImageUrl() + ")";
          var n = this.dom.clone();
          n.css("display", "block");
          this.container.append(n);
          var s = i[0].getImage().naturalWidth;
          var r = i[0].getImage().naturalHeight;
          var a = 200;
          var o = a / r;
          var u = s * o;
          var h = this.highlightTextDom.clone();
          h.css("display", "block");
          h.css("opacity", 0);
          $(".text", h).text(e.message);
          $(".user", h).text("@" + e.getScreenName());
          this.container.append(h);
          t.SizeText.sizeText(h[0], 100);
          var l = (this.endRight - this.marginLeft) / 2 + this.marginLeft - u / 2;
          l = 50;
          TweenLite.to(n, 1, {
            left: l,
            width: u,
            height: a,
            ease: Quad.easeInOut,
            "-webkit-transform": "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"
          });
          TweenLite.to(h, 1, {
            opacity: 1
          });
          this.message = e;
          this.preloadedImages = i;
          this.currentHighlight = n;
          this.currentText = h
        };
        i.prototype.unhighlight = function() {
          if (this.currentHighlight) {
            var t = this.currentHighlight;
            TweenLite.to(this.currentHighlight, .5, {
              opacity: 0,
              onComplete: function() {
                return t.remove()
              }
            })
          }
          if (this.currentText) {
            var e = this.currentText;
            TweenLite.to(this.currentText, .5, {
              opacity: 0,
              onComplete: function() {
                return e.remove()
              }
            })
          }
        };
        return i
      }();
      e.HighlightItem = i
    })(i = e.stair || (e.stair = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e(e) {
          this.backupQueue = new t.BackupQueue(20);
          this.messagesToAdd = [];
          this.max = 100;
          this.keep_after_max = 50;
          this.preloadingMessage = null;
          this.items = e
        }
        e.prototype.addMessages = function(t) {
          this.messagesToAdd.push.apply(this.messagesToAdd, t.reverse());
          if (this.messagesToAdd.length > this.max) {
            this.messagesToAdd.splice(0, this.keep_after_max)
          }
        };
        e.prototype.getMessageTopStairs = function() {
          var t = null;
          if (this.messagesToAdd.length) {
            t = this.messagesToAdd.shift();
            this.backupQueue.enqueue(t)
          } else {
            t = this.backupQueue.dequeueAndReadd()
          }
          return t
        };
        e.prototype.AddMessageTopStairs = function(t, e) {
          if (this.preloadingMessage != t) {
            return
          }
          for (var i = this.items.length - 1; i > 0; i--) {
            var n = this.items[i - 1].getMessage();
            if (n) {
              this.items[i].swapMessage(n, this.items[i - 1].getPreloadedImages())
            }
          }
          this.items[0].swapMessage(t, e)
        };
        e.prototype.doShowNewMessage = function() {
          var e = this;
          var i = this.getMessageTopStairs();
          this.preloadingMessage = i;
          t.ImagePreloader.preload(this.items[0].getImagesToPreload(i)).always(function() {
            var t = [];
            for (var e = 0; e < arguments.length; e++) {
              t[e - 0] = arguments[e]
            }
          }).done(function() {
            var t = [];
            for (var n = 0; n < arguments.length; n++) {
              t[n - 0] = arguments[n]
            }
            e.AddMessageTopStairs(i, t)
          }).fail(function() {
            var t = [];
            for (var e = 0; e < arguments.length; e++) {
              t[e - 0] = arguments[e]
            }
          })
        };
        e.prototype.getItemToHighlight = function() {
          this.doShowNewMessage();
          return null
        };
        e.prototype.showNewMessage = function() {
          if (!this.items[this.items.length - 2].getMessage()) {
            this.doShowNewMessage()
          }
        };
        e.prototype.filterMessages = function(t) {};
        e.prototype.getItemCount = function() {
          return 20
        };
        return e
      }();
      e.StairPositionManager = i
    })(i = e.stair || (e.stair = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function e(e) {
          this.backupQueue = new t.BackupQueue(10);
          this.messagesToAdd = [];
          this.max = 100;
          this.keep_after_max = 50;
          this.preloadingMessage = null;
          this.items = e
        }
        e.prototype.addMessages = function(t) {
          this.messagesToAdd.push.apply(this.messagesToAdd, t.reverse());
          if (this.messagesToAdd.length > this.max) {
            this.messagesToAdd.splice(0, this.keep_after_max)
          }
        };
        e.prototype.getMessageTopStairs = function() {
          var t = null;
          if (this.messagesToAdd.length) {
            t = this.messagesToAdd.shift();
            this.backupQueue.enqueue(t)
          } else {
            t = this.backupQueue.dequeueAndReadd()
          }
          return t
        };
        e.prototype.AddMessageTopStairs = function(t, e) {
          if (this.preloadingMessage != t) {
            return
          }
          this.items[0].swapMessage(t, e)
        };
        e.prototype.doShowNewMessage = function() {
          var e = this;
          var i = this.getMessageTopStairs();
          this.preloadingMessage = i;
          t.ImagePreloader.preload(this.items[0].getImagesToPreload(i)).always(function() {
            var t = [];
            for (var e = 0; e < arguments.length; e++) {
              t[e - 0] = arguments[e]
            }
          }).done(function() {
            var t = [];
            for (var n = 0; n < arguments.length; n++) {
              t[n - 0] = arguments[n]
            }
            e.AddMessageTopStairs(i, t)
          }).fail(function() {
            var t = [];
            for (var e = 0; e < arguments.length; e++) {
              t[e - 0] = arguments[e]
            }
          })
        };
        e.prototype.getItemToHighlight = function() {
          this.doShowNewMessage();
          return this.items[this.items.length - 1]
        };
        e.prototype.showNewMessage = function() {
          for (var t = this.items.length - 1; t > 0; t--) {
            var e = this.items[t - 1].getMessage();
            if (e) {
              if (t == 3) {
                this.items[this.items.length - 1].unhighlight()
              }
              this.items[t].swapMessage(e, this.items[t - 1].getPreloadedImages());
              this.items[t - 1].swapMessage(null, null);
              break
            }
          }
        };
        e.prototype.filterMessages = function(t) {};
        e.prototype.getItemCount = function() {
          return 20
        };
        return e
      }();
      e.StairSinglePositionManager = i
    })(i = e.stair || (e.stair = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function i(i, n, s, r, a) {
          this.bg_color = a;
          var o = $('<div class="box"></div>');
          var u = i.topleft.y * s;
          var h = i.topleft.x * s;
          var l = new e.Point(0, 0);
          var c = new e.Box(l, new e.Point(l.x + 300, l.y), new e.Point(l.x + 300, l.y + 200), new e.Point(l.x, l.y + 200));
          o.css("left", n + h);
          o.css("top", u);
          var g = c.toArrayNormalized();
          var d = i.toArrayNormalized(s);
          for (var p = [], m = [], f = 0, v = g.length; f < v; ++f) {
            var w = g[f],
                y = d[f];
            p.push([w[0], w[1], 1, 0, 0, 0, -w[0] * y[0], -w[1] * y[0]]), m.push(y[0]);
            p.push([0, 0, 0, w[0], w[1], 1, -w[0] * y[1], -w[1] * y[1]]), m.push(y[1])
          }
          var b = t.NumericTool.solve(p, m, true);
          var L = [b[0], b[3], 0, b[6], b[1], b[4], 0, b[7], 0, 0, 1, 0, b[2], b[5], 0, 1].map(function(t) {
            return t.toFixed(6)
          });
          o.css("-webkit-transform", "matrix3d(" + L + ")");
          r.append(o);
          this.dom = o
        }
        i.prototype.getImagesToPreload = function(t) {
          return [t.getPrimaryImageUrl()]
        };
        i.prototype.getMessage = function() {
          return this.message
        };
        i.prototype.getPreloadedImages = function() {
          return this.preloadedImages
        };
        i.prototype.swapMessage = function(t, e) {
          this.message = t;
          this.preloadedImages = e;
          if (t == null) {
            this.dom[0].style.backgroundImage = "";
            return
          }
          this.dom[0].style.backgroundImage = "url(" + t.getPrimaryImageUrl() + ")"
        };
        return i
      }();
      e.StepItem = i
    })(i = e.stair || (e.stair = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(n) {
        __extends(s, n);

        function s(e, s) {
          this.settings = $.extend(true, {}, JSON.parse(JSON.stringify(new i.Settings)), s["stair"]);
          n.call(this, e, this.settings, t.App.ROOT + "view/stair/res/templates.html?" + Math.random())
        }
        s.prototype.onDestroy = function() {
          $(".beam").empty();
          this.bg_items = null;
          this.bg_positionManager = null
        };
        s.prototype.getWidth = function() {
          return this.view.width()
        };
        s.prototype.onInitialize = function() {
          this.view = $(Mustache.render(e.Templates.get("#view-wrapper"), this.settings));
          $(".beam").append(this.view);
          this.items = [];
          this.initGrid();
          if (this.settings.stair_queue) {
            this.positionManager = new i.StairPositionManager(this.items)
          } else {
            this.positionManager = new i.StairSinglePositionManager(this.items)
          }
          this.initBackgroundGrid()
        };
        s.prototype.initGrid = function() {
          var t = [new i.Box(new i.Point(1693, 944), new i.Point(1754, 1030), new i.Point(1754, 1103), new i.Point(1693, 1112)), new i.Box(new i.Point(1934, 1100), new i.Point(2065, 1165), new i.Point(2065, 1238), new i.Point(1934, 1278)), new i.Box(new i.Point(2145, 1250), new i.Point(2356, 1290), new i.Point(2356, 1426), new i.Point(2145, 1440)), new i.Box(new i.Point(2304, 1418), new i.Point(2602, 1424), new i.Point(2602, 1620), new i.Point(2304, 1630)), new i.Box(new i.Point(2363, 1630), new i.Point(2748, 1612), new i.Point(2748, 1894), new i.Point(2363, 1908)), new i.Box(new i.Point(2257, 1921), new i.Point(2685, 1907), new i.Point(2685, 2291), new i.Point(2257, 2267)), new i.Box(new i.Point(1940, 2309), new i.Point(2253, 2362), new i.Point(2253, 2828), new i.Point(1940, 2699))];
          var e = ["#BBBEC3", "#C2C6C9", "#C6CACD", "#CCCFD4", "#D9DCE1", "#EBECF0", "#F6F7FB"];
          var n = 4e3;
          var s = 3e3;
          var r = $(".bottom").height();
          var a = r / n;
          var o = $(".bottom").width() - s * a;
          for (var u = 0; u < t.length; u++) {
            var h = t[u];
            this.items.push(new i.StepItem(h, o, a, $(".bottom"), e[u]))
          }
          var l = new i.HighlightItem(t[t.length - 1], o, a, $(".bottom"));
          this.items.push(l)
        };
        s.prototype.initBackgroundGrid = function() {
          var i = this;
          var n = new t.components.grid.ClassicGrid($(".bg-grid-container", this.view), 60, 1, [1, 1, 1, 1]);
          var s = new t.components.grid.backgrounditem.Settings;
          this.bg_items = n.render(function() {
            return new t.view.classic.BackgroundItemLargeCanvas(s)
          });
          this.bg_positionManager = new e.classic.PositionManager2(this.bg_items, 0, false);
          setInterval(function() {
            i.bg_positionManager.showNewMessage()
          }, 500)
        };
        s.prototype.onMessages = function(t) {
          n.prototype.onMessages.call(this, t);
          this.bg_positionManager.addMessages(t)
        };
        return s
      }(t.view.base.BaseView);
      i.StairView = n
    })(i = e.stair || (e.stair = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(e) {
      var i = function(t) {
        __extends(e, t);

        function e() {
          t.apply(this, arguments);
          this.swap_interval = 500;
          this.highlight_interval = 15e3;
          this.stair_unhighlight_after_time = 16500;
          this.stair_queue = false
        }
        return e
      }(t.base.Settings);
      e.Settings = i
    })(e = t.stair || (t.stair = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = t.components.grid.backgrounditem.BackgroundItem;
      var n = function(e) {
        __extends(i, e);

        function i(t) {
          e.call(this, t.background_items);
          this.opacity = 0;
          this.blindsWidth = 0
        }
        i.prototype.appendTo = function(e) {
          var n = this;
          if (i.canvas == null || i.parent != e[0]) {
            i.canvas = this.initializeCanvas(e);
            i.parent = e[0];
            e.append(i.canvas);
            i.infiniteCanvas = new t.components.grid.InfiniteCanvas(i.canvas)
          }
          this.context = i.infiniteCanvas;
          $(i.canvas).click(function(t) {
            return n.checkHover(t)
          })
        };
        i.prototype.initializeCanvas = function(t) {
          return $('<canvas style="position:absolute;top:0px;left:0px;"></canvas>').attr("width", t.width()).attr("height", t.height())[0]
        };
        i.prototype.checkHover = function(t) {
          var e = i.infiniteCanvas.getOriginalX(t.pageX);
          var n = i.infiniteCanvas.getOriginalY(t.pageY);
          if (e > this.getImageX() && e < this.getImageX() + this.getItemSize() && n > this.getImageY() && n < this.getImageY() + this.getItemSize()) {
            this.raiseHover();
            t.stopImmediatePropagation();
            return false
          }
        };
        i.prototype.getImagesToPreload = function(e) {
          var i = [t.ImageProxy.getTweetBeamUrl(e.userImageUrl, this.getItemSize(), this.getItemSize(), e.user)];
          if (e.hasEmbeddedImage()) {
            i.push(e.getPrimaryImageUrl())
          }
          return i
        };
        i.prototype.swapMessage = function(t, i) {
          e.prototype.swapMessage.call(this, t, i)
        };
        i.prototype.getBlindsWidth = function() {
          return this.blindsWidth
        };
        i.prototype.getOpacity = function() {
          return this.opacity
        };
        i.prototype.setOpacity = function(t) {
          this.opacity = t;
          var e = this.context;
          e.clearRect(this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.setGlobalAlpha(t);
          e.drawImage(this.colorImage, 0, 0, this.getItemSize(), this.getItemSize(), this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.setGlobalAlpha(1)
        };
        i.prototype.setBlindsWidth = function(t) {
          this.blindsWidth = t;
          var e = this.context;
          e.setFillStyle("black");
          e.fillRect(this.getImageX(), this.getImageY(), t, this.getItemSize());
          e.fillRect(this.getImageX() + this.getItemSize() - t, this.getImageY(), t, this.getItemSize())
        };
        i.prototype.startFadeIn = function() {
          this.opacity = 0;
          TweenLite.to(this, this.settings.swap_fade_in_time / 1e3, {
            setOpacity: .45,
            ease: "linear"
          })
        };
        i.prototype.startFadeInTo = function(t) {
          return TweenLite.to(this, this.settings.swap_fade_in_time / 1e3, {
            setOpacity: t,
            ease: "linear"
          })
        };
        i.prototype.startBlinds = function() {
          var t = this;
          this.setBlindsWidth(0);
          TweenLite.to(this, this.settings.swap_disappear_time / 1e3, {
            setBlindsWidth: this.getItemSize() / 2,
            onComplete: function() {
              return t.startFadeIn()
            }
          })
        };
        return i
      }(i);
      e.BackgroundItemInfiniteCanvas = n
    })(i = e.lens || (e.lens = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(t) {
        __extends(e, t);

        function e(e) {
          t.call(this, e)
        }
        e.prototype.getImagesToPreload = function(t) {
          return [t.getPrimaryImageUrl()]
        };
        e.prototype.initializeCanvas = function(t) {
          return $("<canvas></canvas>").attr("width", t.width()).attr("height", t.height())
        };
        e.prototype.swapMessage = function(t, e) {
          var i = this.message == null;
          this.message = t;
          this.colorImage = e[0].getImage();
          this.startTransition(i)
        };
        e.prototype.setOpacity = function(t) {
          var e = this.context;
          e.globalAlpha = t;
          e.clearRect(this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          var i = this.colorImage.width / this.colorImage.height;
          var n = i - 1;
          n *= .25;
          var s = n > 0 ? this.colorImage.width * n : 0;
          var r = n < 0 ? this.colorImage.height * -n : 0;
          var a = this.colorImage.width - s;
          var o = this.colorImage.height - r;
          e.drawImage(this.colorImage, s, r, a, o, this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.globalAlpha = 1
        };
        return e
      }(t.view.classic.BackgroundItemLargeCanvas);
      e.Item = i
    })(i = e.lens || (e.lens = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(t) {
        __extends(e, t);

        function e() {
          t.apply(this, arguments);
          this.block_size = 90;
          this.highlight_start_time = 2500;
          this.block_border_width = 1
        }
        return e
      }(t.view.base.Settings);
      e.Settings = i
    })(i = e.silver || (e.silver = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(e) {
        __extends(i, e);

        function i(t) {
          e.call(this, t)
        }
        i.prototype.getImagesToPreload = function(e) {
          var i = undefined;
          if (!e.hasEmbeddedImage()) {
            i = e.user
          }
          return [t.ImageProxy.getTweetBeamUrl(e.getPrimaryImageUrl(), this.getItemSize(), this.getItemSize(), i), e.getPrimaryImageUrl()]
        };
        i.prototype.swapMessage = function(t, e) {
          var i = this.message == null;
          this.message = t;
          this.colorImage = e[0].getImage();
          this.startTransition(i)
        };
        i.prototype.setOpacity = function(t) {
          var e = this.context;
          e.globalAlpha = t;
          e.clearRect(this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          var i = this.getItemSize();
          var n = this.colorImage.width < this.colorImage.height ? this.colorImage.width : this.colorImage.height;
          var s = this.colorImage.width - n;
          var r = this.colorImage.height - n;
          e.drawImage(this.colorImage, s / 2, r / 2, n, n, this.getImageX(), this.getImageY(), i, i);
          e.globalAlpha = 1
        };
        return i
      }(t.view.classic.BackgroundItemLargeCanvas);
      e.Item = i
    })(i = e.silver || (e.silver = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function() {
        function i(t, e) {
          this.currentItem = null;
          this.sidesSwitched = false;
          this.settings = e;
          this.parent = t;
          this.create();
          this.appendTo(t.overlayWrapper)
        }
        i.prototype.create = function() {
          this.dom = $(e.Templates.get("#message-overlay")).hide();
          this.wrapper = $(".overlay-wrapper");
          this.messageElement = this.dom.find(".message-container");
          this.imageWrapperElement = this.dom.find(".image-wrapper");
          this.imageElement = this.dom.find(".image-container");
          this.messageTemplate = e.Templates.get("#message-template");
          this.init()
        };
        i.prototype.init = function() {
          var t = 100;
          this.wrapper.attr("style", "");
          var e = this.wrapper.width() / 2;
          if (this.parent.dom.height() - t < e) {
            this.wrapper.css("width", (this.parent.dom.height() - t) * 2);
            e = this.wrapper.width() / 2
          }
          var i = (this.parent.dom.height() - e) / 2;
          var n = (this.parent.dom.width() - this.wrapper.width()) / 2;
          this.wrapper.css({
            height: e,
            marginTop: i,
            marginBottom: i,
            marginLeft: n,
            marginRight: n
          })
        };
        i.prototype.appendTo = function(t) {
          t.append(this.dom);
          return this
        };
        i.prototype.show = function(t) {
          if (this.currentItem == null) {
            this.onFirstItem()
          }
          this.currentItem = t;
          this.switchSides();
          this.setMessage(this.currentItem.message)
        };
        i.prototype.switchSides = function() {
          this.messageElement.transition({
            x: this.sidesSwitched ? "0%" : "100%",
            queue: false
          });
          this.imageWrapperElement.transition({
            x: !this.sidesSwitched ? "0%" : "100%",
            queue: false
          });
          this.sidesSwitched = !this.sidesSwitched
        };
        i.prototype.setMessage = function(e) {
          var i = this;
          if (e.date != undefined) {
            try {
              e["prettyTime"] = t.DateTool.timeAgo(e.date)
            } catch (n) {
              t.Debug.log(n)
            }
          }
          this.messageElement.html(Mustache.render(this.messageTemplate, e));
          var s = this.messageElement.height() - this.messageElement.find(".title").height() - this.messageElement.find(".info").height();
          var r = this.messageElement.find(".content");
          r.css("height", s + "px");
          t.SizeText.sizeText(r[0], 80);
          this.imageWrapperElement.css({
            transformOrigin: this.sidesSwitched ? "0% 50%" : "100% 50%"
          }).transition({
            rotateY: this.sidesSwitched ? "-90deg" : "90deg"
          }, function() {
            i.imageElement.css("background-image", "url(" + e.getPrimaryImageUrl() + ")");
            i.imageWrapperElement.transition({
              rotateY: "0deg"
            })
          })
        };
        i.prototype.onFirstItem = function() {
          this.dom.fadeIn("slow")
        };
        return i
      }();
      i.HighlightItemView = n
    })(i = e.silver || (e.silver = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t(t, e, i, n, s) {
          var r = this;
          if (n === void 0) {
            n = 1.2
          }
          if (s === void 0) {
            s = 1.2
          }
          this.margin_bottom = s;
          this.margin_right = n;
          this.container = t;
          this.canvas = $("<canvas>").attr("width", t.width()).attr("height", t.height())[0];
          this.context = this.canvas.getContext("2d");
          t.append(this.canvas);
          this.icon = document.createElement("img");
          this.icon.onload = function() {
            r.renderIcons(i)
          };
          this.icon.src = e
        }
        t.prototype.renderIcons = function(t) {
          var e = this.canvas.offsetWidth;
          var i = this.canvas.offsetHeight;
          var n = i * e / t;
          var s = this.icon.naturalWidth * this.margin_right;
          var r = this.icon.naturalHeight * this.margin_bottom;
          var a = s * r;
          var o = Math.sqrt(n / a);
          var u = s * o;
          var h = r * o;
          var l = e / u;
          l = Math.ceil(l);
          u = e / l;
          o = u / s;
          h = r * o;
          for (var c = 0; c + u <= e; c += u) {
            for (var g = 0; g + h <= i; g += h) {
              this.context.drawImage(this.icon, c, g, u / this.margin_right, h / this.margin_bottom)
            }
          }
        };
        return t
      }();
      t.IconCanvas = e
    })(e = t.iconcanvas || (t.iconcanvas = {}))
  })(e = t.components || (t.components = {}))
})(beam || (beam = {}));
var collections;
(function(t) {
  function e(t, e) {
    if (t < e) {
      return -1
    } else if (t === e) {
      return 0
    } else {
      return 1
    }
  }
  t.defaultCompare = e;

  function i(t, e) {
    return t === e
  }
  t.defaultEquals = i;

  function n(e) {
    if (e === null) {
      return "COLLECTION_NULL"
    } else if (t.isUndefined(e)) {
      return "COLLECTION_UNDEFINED"
    } else if (t.isString(e)) {
      return e
    } else {
      return e.toString()
    }
  }
  t.defaultToString = n;

  function s(e, i) {
    if (i === void 0) {
      i = ","
    }
    if (e === null) {
      return "COLLECTION_NULL"
    } else if (t.isUndefined(e)) {
      return "COLLECTION_UNDEFINED"
    } else if (t.isString(e)) {
      return e.toString()
    } else {
      var n = "{";
      var s = true;
      for (var r in e) {
        if (e.hasOwnProperty(r)) {
          if (s) s = false;
          else n = n + i;
          n = n + r + ":" + e[r]
        }
      }
      return n + "}"
    }
  }
  t.makeString = s;

  function r(t) {
    return typeof t === "function"
  }
  t.isFunction = r;

  function a(t) {
    return typeof t === "undefined"
  }
  t.isUndefined = a;

  function o(t) {
    return Object.prototype.toString.call(t) === "[object String]"
  }
  t.isString = o;

  function u(e) {
    if (!t.isFunction(e)) {
      return function(t, e) {
        if (t < e) {
          return 1
        } else if (t === e) {
          return 0
        } else {
          return -1
        }
      }
    } else {
      return function(t, i) {
        return e(t, i) * -1
      }
    }
  }
  t.reverseCompareFunction = u;

  function h(t) {
    return function(e, i) {
      return t(e, i) === 0
    }
  }
  t.compareToEquals = h;
  var l;
  (function(e) {
    function i(e, i, n) {
      var s = n || t.defaultEquals;
      var r = e.length;
      for (var a = 0; a < r; a++) {
        if (s(e[a], i)) {
          return a
        }
      }
      return -1
    }
    e.indexOf = i;

    function n(e, i, n) {
      var s = n || t.defaultEquals;
      var r = e.length;
      for (var a = r - 1; a >= 0; a--) {
        if (s(e[a], i)) {
          return a
        }
      }
      return -1
    }
    e.lastIndexOf = n;

    function s(t, i, n) {
      return e.indexOf(t, i, n) >= 0
    }
    e.contains = s;

    function r(t, i, n) {
      var s = e.indexOf(t, i, n);
      if (s < 0) {
        return false
      }
      t.splice(s, 1);
      return true
    }
    e.remove = r;

    function a(e, i, n) {
      var s = n || t.defaultEquals;
      var r = e.length;
      var a = 0;
      for (var o = 0; o < r; o++) {
        if (s(e[o], i)) {
          a++
        }
      }
      return a
    }
    e.frequency = a;

    function o(e, i, n) {
      var s = n || t.defaultEquals;
      if (e.length !== i.length) {
        return false
      }
      var r = e.length;
      for (var a = 0; a < r; a++) {
        if (!s(e[a], i[a])) {
          return false
        }
      }
      return true
    }
    e.equals = o;

    function u(t) {
      return t.concat()
    }
    e.copy = u;

    function h(t, e, i) {
      if (e < 0 || e >= t.length || i < 0 || i >= t.length) {
        return false
      }
      var n = t[e];
      t[e] = t[i];
      t[i] = n;
      return true
    }
    e.swap = h;

    function l(t) {
      return "[" + t.toString() + "]"
    }
    e.toString = l;

    function c(t, e) {
      var i = t.length;
      for (var n = 0; n < i; n++) {
        if (e(t[n]) === false) {
          return
        }
      }
    }
    e.forEach = c
  })(l = t.arrays || (t.arrays = {}));
  var c = function() {
    function e() {
      this.firstNode = null;
      this.lastNode = null;
      this.nElements = 0
    }
    e.prototype.add = function(e, i) {
      if (t.isUndefined(i)) {
        i = this.nElements
      }
      if (i < 0 || i > this.nElements || t.isUndefined(e)) {
        return false
      }
      var n = this.createNode(e);
      if (this.nElements === 0) {
        this.firstNode = n;
        this.lastNode = n
      } else if (i === this.nElements) {
        this.lastNode.next = n;
        this.lastNode = n
      } else if (i === 0) {
        n.next = this.firstNode;
        this.firstNode = n
      } else {
        var s = this.nodeAtIndex(i - 1);
        n.next = s.next;
        s.next = n
      }
      this.nElements++;
      return true
    };
    e.prototype.first = function() {
      if (this.firstNode !== null) {
        return this.firstNode.element
      }
      return undefined
    };
    e.prototype.last = function() {
      if (this.lastNode !== null) {
        return this.lastNode.element
      }
      return undefined
    };
    e.prototype.elementAtIndex = function(t) {
      var e = this.nodeAtIndex(t);
      if (e === null) {
        return undefined
      }
      return e.element
    };
    e.prototype.indexOf = function(e, i) {
      var n = i || t.defaultEquals;
      if (t.isUndefined(e)) {
        return -1
      }
      var s = this.firstNode;
      var r = 0;
      while (s !== null) {
        if (n(s.element, e)) {
          return r
        }
        r++;
        s = s.next
      }
      return -1
    };
    e.prototype.contains = function(t, e) {
      return this.indexOf(t, e) >= 0
    };
    e.prototype.remove = function(e, i) {
      var n = i || t.defaultEquals;
      if (this.nElements < 1 || t.isUndefined(e)) {
        return false
      }
      var s = null;
      var r = this.firstNode;
      while (r !== null) {
        if (n(r.element, e)) {
          if (r === this.firstNode) {
            this.firstNode = this.firstNode.next;
            if (r === this.lastNode) {
              this.lastNode = null
            }
          } else if (r === this.lastNode) {
            this.lastNode = s;
            s.next = r.next;
            r.next = null
          } else {
            s.next = r.next;
            r.next = null
          }
          this.nElements--;
          return true
        }
        s = r;
        r = r.next
      }
      return false
    };
    e.prototype.clear = function() {
      this.firstNode = null;
      this.lastNode = null;
      this.nElements = 0
    };
    e.prototype.equals = function(e, i) {
      var n = i || t.defaultEquals;
      if (!(e instanceof t.LinkedList)) {
        return false
      }
      if (this.size() !== e.size()) {
        return false
      }
      return this.equalsAux(this.firstNode, e.firstNode, n)
    };
    e.prototype.equalsAux = function(t, e, i) {
      while (t !== null) {
        if (!i(t.element, e.element)) {
          return false
        }
        t = t.next;
        e = e.next
      }
      return true
    };
    e.prototype.removeElementAtIndex = function(t) {
      if (t < 0 || t >= this.nElements) {
        return undefined
      }
      var e;
      if (this.nElements === 1) {
        e = this.firstNode.element;
        this.firstNode = null;
        this.lastNode = null
      } else {
        var i = this.nodeAtIndex(t - 1);
        if (i === null) {
          e = this.firstNode.element;
          this.firstNode = this.firstNode.next
        } else if (i.next === this.lastNode) {
          e = this.lastNode.element;
          this.lastNode = i
        }
        if (i !== null) {
          e = i.next.element;
          i.next = i.next.next
        }
      }
      this.nElements--;
      return e
    };
    e.prototype.forEach = function(t) {
      var e = this.firstNode;
      while (e !== null) {
        if (t(e.element) === false) {
          break
        }
        e = e.next
      }
    };
    e.prototype.reverse = function() {
      var t = null;
      var e = this.firstNode;
      var i = null;
      while (e !== null) {
        i = e.next;
        e.next = t;
        t = e;
        e = i
      }
      i = this.firstNode;
      this.firstNode = this.lastNode;
      this.lastNode = i
    };
    e.prototype.toArray = function() {
      var t = [];
      var e = this.firstNode;
      while (e !== null) {
        t.push(e.element);
        e = e.next
      }
      return t
    };
    e.prototype.size = function() {
      return this.nElements
    };
    e.prototype.isEmpty = function() {
      return this.nElements <= 0
    };
    e.prototype.toString = function() {
      return t.arrays.toString(this.toArray())
    };
    e.prototype.nodeAtIndex = function(t) {
      if (t < 0 || t >= this.nElements) {
        return null
      }
      if (t === this.nElements - 1) {
        return this.lastNode
      }
      var e = this.firstNode;
      for (var i = 0; i < t; i++) {
        e = e.next
      }
      return e
    };
    e.prototype.createNode = function(t) {
      return {
        element: t,
        next: null
      }
    };
    return e
  }();
  t.LinkedList = c;
  var g = function() {
    function e(e) {
      this.table = {};
      this.nElements = 0;
      this.toStr = e || t.defaultToString
    }
    e.prototype.getValue = function(e) {
      var i = this.table[this.toStr(e)];
      if (t.isUndefined(i)) {
        return undefined
      }
      return i.value
    };
    e.prototype.setValue = function(e, i) {
      if (t.isUndefined(e) || t.isUndefined(i)) {
        return undefined
      }
      var n;
      var s = this.toStr(e);
      var r = this.table[s];
      if (t.isUndefined(r)) {
        this.nElements++;
        n = undefined
      } else {
        n = r.value
      }
      this.table[s] = {
        key: e,
        value: i
      };
      return n
    };
    e.prototype.remove = function(e) {
      var i = this.toStr(e);
      var n = this.table[i];
      if (!t.isUndefined(n)) {
        delete this.table[i];
        this.nElements--;
        return n.value
      }
      return undefined
    };
    e.prototype.keys = function() {
      var t = [];
      for (var e in this.table) {
        if (this.table.hasOwnProperty(e)) {
          var i = this.table[e];
          t.push(i.key)
        }
      }
      return t
    };
    e.prototype.values = function() {
      var t = [];
      for (var e in this.table) {
        if (this.table.hasOwnProperty(e)) {
          var i = this.table[e];
          t.push(i.value)
        }
      }
      return t
    };
    e.prototype.forEach = function(t) {
      for (var e in this.table) {
        if (this.table.hasOwnProperty(e)) {
          var i = this.table[e];
          var n = t(i.key, i.value);
          if (n === false) {
            return
          }
        }
      }
    };
    e.prototype.containsKey = function(e) {
      return !t.isUndefined(this.getValue(e))
    };
    e.prototype.clear = function() {
      this.table = {};
      this.nElements = 0
    };
    e.prototype.size = function() {
      return this.nElements
    };
    e.prototype.isEmpty = function() {
      return this.nElements <= 0
    };
    e.prototype.toString = function() {
      var t = "{";
      this.forEach(function(e, i) {
        t = t + "\n	" + e.toString() + " : " + i.toString()
      });
      return t + "\n}"
    };
    return e
  }();
  t.Dictionary = g;
  var d = function() {
    function e(e, i, n) {
      if (n === void 0) {
        n = false
      }
      this.dict = new g(e);
      this.equalsF = i || t.defaultEquals;
      this.allowDuplicate = n
    }
    e.prototype.getValue = function(e) {
      var i = this.dict.getValue(e);
      if (t.isUndefined(i)) {
        return []
      }
      return t.arrays.copy(i)
    };
    e.prototype.setValue = function(e, i) {
      if (t.isUndefined(e) || t.isUndefined(i)) {
        return false
      }
      if (!this.containsKey(e)) {
        this.dict.setValue(e, [i]);
        return true
      }
      var n = this.dict.getValue(e);
      if (!this.allowDuplicate) {
        if (t.arrays.contains(n, i, this.equalsF)) {
          return false
        }
      }
      n.push(i);
      return true
    };
    e.prototype.remove = function(e, i) {
      if (t.isUndefined(i)) {
        var n = this.dict.remove(e);
        return !t.isUndefined(n)
      }
      var s = this.dict.getValue(e);
      if (t.arrays.remove(s, i, this.equalsF)) {
        if (s.length === 0) {
          this.dict.remove(e)
        }
        return true
      }
      return false
    };
    e.prototype.keys = function() {
      return this.dict.keys()
    };
    e.prototype.values = function() {
      var t = this.dict.values();
      var e = [];
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        for (var s = 0; s < n.length; s++) {
          e.push(n[s])
        }
      }
      return e
    };
    e.prototype.containsKey = function(t) {
      return this.dict.containsKey(t)
    };
    e.prototype.clear = function() {
      this.dict.clear()
    };
    e.prototype.size = function() {
      return this.dict.size()
    };
    e.prototype.isEmpty = function() {
      return this.dict.isEmpty()
    };
    return e
  }();
  t.MultiDictionary = d;
  var p = function() {
    function e(e) {
      this.data = [];
      this.compare = e || t.defaultCompare
    }
    e.prototype.leftChildIndex = function(t) {
      return 2 * t + 1
    };
    e.prototype.rightChildIndex = function(t) {
      return 2 * t + 2
    };
    e.prototype.parentIndex = function(t) {
      return Math.floor((t - 1) / 2)
    };
    e.prototype.minIndex = function(t, e) {
      if (e >= this.data.length) {
        if (t >= this.data.length) {
          return -1
        } else {
          return t
        }
      } else {
        if (this.compare(this.data[t], this.data[e]) <= 0) {
          return t
        } else {
          return e
        }
      }
    };
    e.prototype.siftUp = function(e) {
      var i = this.parentIndex(e);
      while (e > 0 && this.compare(this.data[i], this.data[e]) > 0) {
        t.arrays.swap(this.data, i, e);
        e = i;
        i = this.parentIndex(e)
      }
    };
    e.prototype.siftDown = function(e) {
      var i = this.minIndex(this.leftChildIndex(e), this.rightChildIndex(e));
      while (i >= 0 && this.compare(this.data[e], this.data[i]) > 0) {
        t.arrays.swap(this.data, i, e);
        e = i;
        i = this.minIndex(this.leftChildIndex(e), this.rightChildIndex(e))
      }
    };
    e.prototype.peek = function() {
      if (this.data.length > 0) {
        return this.data[0]
      } else {
        return undefined
      }
    };
    e.prototype.add = function(e) {
      if (t.isUndefined(e)) {
        return undefined
      }
      this.data.push(e);
      this.siftUp(this.data.length - 1);
      return true
    };
    e.prototype.removeRoot = function() {
      if (this.data.length > 0) {
        var t = this.data[0];
        this.data[0] = this.data[this.data.length - 1];
        this.data.splice(this.data.length - 1, 1);
        if (this.data.length > 0) {
          this.siftDown(0)
        }
        return t
      }
      return undefined
    };
    e.prototype.contains = function(e) {
      var i = t.compareToEquals(this.compare);
      return t.arrays.contains(this.data, e, i)
    };
    e.prototype.size = function() {
      return this.data.length
    };
    e.prototype.isEmpty = function() {
      return this.data.length <= 0
    };
    e.prototype.clear = function() {
      this.data.length = 0
    };
    e.prototype.forEach = function(e) {
      t.arrays.forEach(this.data, e)
    };
    return e
  }();
  t.Heap = p;
  var m = function() {
    function t() {
      this.list = new c
    }
    t.prototype.push = function(t) {
      return this.list.add(t, 0)
    };
    t.prototype.add = function(t) {
      return this.list.add(t, 0)
    };
    t.prototype.pop = function() {
      return this.list.removeElementAtIndex(0)
    };
    t.prototype.peek = function() {
      return this.list.first()
    };
    t.prototype.size = function() {
      return this.list.size()
    };
    t.prototype.contains = function(t, e) {
      return this.list.contains(t, e)
    };
    t.prototype.isEmpty = function() {
      return this.list.isEmpty()
    };
    t.prototype.clear = function() {
      this.list.clear()
    };
    t.prototype.forEach = function(t) {
      this.list.forEach(t)
    };
    return t
  }();
  t.Stack = m;
  var f = function() {
    function t() {
      this.list = new c
    }
    t.prototype.enqueue = function(t) {
      return this.list.add(t)
    };
    t.prototype.add = function(t) {
      return this.list.add(t)
    };
    t.prototype.dequeue = function() {
      if (this.list.size() !== 0) {
        var t = this.list.first();
        this.list.removeElementAtIndex(0);
        return t
      }
      return undefined
    };
    t.prototype.peek = function() {
      if (this.list.size() !== 0) {
        return this.list.first()
      }
      return undefined
    };
    t.prototype.size = function() {
      return this.list.size()
    };
    t.prototype.contains = function(t, e) {
      return this.list.contains(t, e)
    };
    t.prototype.isEmpty = function() {
      return this.list.size() <= 0
    };
    t.prototype.clear = function() {
      this.list.clear()
    };
    t.prototype.forEach = function(t) {
      this.list.forEach(t)
    };
    return t
  }();
  t.Queue = f;
  var v = function() {
    function e(e) {
      this.heap = new p(t.reverseCompareFunction(e))
    }
    e.prototype.enqueue = function(t) {
      return this.heap.add(t)
    };
    e.prototype.add = function(t) {
      return this.heap.add(t)
    };
    e.prototype.dequeue = function() {
      if (this.heap.size() !== 0) {
        var t = this.heap.peek();
        this.heap.removeRoot();
        return t
      }
      return undefined
    };
    e.prototype.peek = function() {
      return this.heap.peek()
    };
    e.prototype.contains = function(t) {
      return this.heap.contains(t)
    };
    e.prototype.isEmpty = function() {
      return this.heap.isEmpty()
    };
    e.prototype.size = function() {
      return this.heap.size()
    };
    e.prototype.clear = function() {
      this.heap.clear()
    };
    e.prototype.forEach = function(t) {
      this.heap.forEach(t)
    };
    return e
  }();
  t.PriorityQueue = v;
  var w = function() {
    function e(t) {
      this.dictionary = new g(t)
    }
    e.prototype.contains = function(t) {
      return this.dictionary.containsKey(t)
    };
    e.prototype.add = function(e) {
      if (this.contains(e) || t.isUndefined(e)) {
        return false
      } else {
        this.dictionary.setValue(e, e);
        return true
      }
    };
    e.prototype.intersection = function(t) {
      var e = this;
      this.forEach(function(i) {
        if (!t.contains(i)) {
          e.remove(i)
        }
        return true
      })
    };
    e.prototype.union = function(t) {
      var e = this;
      t.forEach(function(t) {
        e.add(t);
        return true
      })
    };
    e.prototype.difference = function(t) {
      var e = this;
      t.forEach(function(t) {
        e.remove(t);
        return true
      })
    };
    e.prototype.isSubsetOf = function(t) {
      if (this.size() > t.size()) {
        return false
      }
      var e = true;
      this.forEach(function(i) {
        if (!t.contains(i)) {
          e = false;
          return false
        }
        return true
      });
      return e
    };
    e.prototype.remove = function(t) {
      if (!this.contains(t)) {
        return false
      } else {
        this.dictionary.remove(t);
        return true
      }
    };
    e.prototype.forEach = function(t) {
      this.dictionary.forEach(function(e, i) {
        return t(i)
      })
    };
    e.prototype.toArray = function() {
      return this.dictionary.values()
    };
    e.prototype.isEmpty = function() {
      return this.dictionary.isEmpty()
    };
    e.prototype.size = function() {
      return this.dictionary.size()
    };
    e.prototype.clear = function() {
      this.dictionary.clear()
    };
    e.prototype.toString = function() {
      return t.arrays.toString(this.toArray())
    };
    return e
  }();
  t.Set = w;
  var y = function() {
    function e(e) {
      this.toStrF = e || t.defaultToString;
      this.dictionary = new g(this.toStrF);
      this.nElements = 0
    }
    e.prototype.add = function(e, i) {
      if (i === void 0) {
        i = 1
      }
      if (t.isUndefined(e) || i <= 0) {
        return false
      }
      if (!this.contains(e)) {
        var n = {
          value: e,
          copies: i
        };
        this.dictionary.setValue(e, n)
      } else {
        this.dictionary.getValue(e).copies += i
      }
      this.nElements += i;
      return true
    };
    e.prototype.count = function(t) {
      if (!this.contains(t)) {
        return 0
      } else {
        return this.dictionary.getValue(t).copies
      }
    };
    e.prototype.contains = function(t) {
      return this.dictionary.containsKey(t)
    };
    e.prototype.remove = function(e, i) {
      if (i === void 0) {
        i = 1
      }
      if (t.isUndefined(e) || i <= 0) {
        return false
      }
      if (!this.contains(e)) {
        return false
      } else {
        var n = this.dictionary.getValue(e);
        if (i > n.copies) {
          this.nElements -= n.copies
        } else {
          this.nElements -= i
        }
        n.copies -= i;
        if (n.copies <= 0) {
          this.dictionary.remove(e)
        }
        return true
      }
    };
    e.prototype.toArray = function() {
      var t = [];
      var e = this.dictionary.values();
      var i = e.length;
      for (var n = 0; n < i; n++) {
        var s = e[n];
        var r = s.value;
        var a = s.copies;
        for (var o = 0; o < a; o++) {
          t.push(r)
        }
      }
      return t
    };
    e.prototype.toSet = function() {
      var t = new w(this.toStrF);
      var e = this.dictionary.values();
      var i = e.length;
      for (var n = 0; n < i; n++) {
        var s = e[n].value;
        t.add(s)
      }
      return t
    };
    e.prototype.forEach = function(t) {
      this.dictionary.forEach(function(e, i) {
        var n = i.value;
        var s = i.copies;
        for (var r = 0; r < s; r++) {
          if (t(n) === false) {
            return false
          }
        }
        return true
      })
    };
    e.prototype.size = function() {
      return this.nElements
    };
    e.prototype.isEmpty = function() {
      return this.nElements === 0
    };
    e.prototype.clear = function() {
      this.nElements = 0;
      this.dictionary.clear()
    };
    return e
  }();
  t.Bag = y;
  var b = function() {
    function e(e) {
      this.root = null;
      this.compare = e || t.defaultCompare;
      this.nElements = 0
    }
    e.prototype.add = function(e) {
      if (t.isUndefined(e)) {
        return false
      }
      if (this.insertNode(this.createNode(e)) !== null) {
        this.nElements++;
        return true
      }
      return false
    };
    e.prototype.clear = function() {
      this.root = null;
      this.nElements = 0
    };
    e.prototype.isEmpty = function() {
      return this.nElements === 0
    };
    e.prototype.size = function() {
      return this.nElements
    };
    e.prototype.contains = function(e) {
      if (t.isUndefined(e)) {
        return false
      }
      return this.searchNode(this.root, e) !== null
    };
    e.prototype.remove = function(t) {
      var e = this.searchNode(this.root, t);
      if (e === null) {
        return false
      }
      this.removeNode(e);
      this.nElements--;
      return true
    };
    e.prototype.inorderTraversal = function(t) {
      this.inorderTraversalAux(this.root, t, {
        stop: false
      })
    };
    e.prototype.preorderTraversal = function(t) {
      this.preorderTraversalAux(this.root, t, {
        stop: false
      })
    };
    e.prototype.postorderTraversal = function(t) {
      this.postorderTraversalAux(this.root, t, {
        stop: false
      })
    };
    e.prototype.levelTraversal = function(t) {
      this.levelTraversalAux(this.root, t)
    };
    e.prototype.minimum = function() {
      if (this.isEmpty()) {
        return undefined
      }
      return this.minimumAux(this.root).element
    };
    e.prototype.maximum = function() {
      if (this.isEmpty()) {
        return undefined
      }
      return this.maximumAux(this.root).element
    };
    e.prototype.forEach = function(t) {
      this.inorderTraversal(t)
    };
    e.prototype.toArray = function() {
      var t = [];
      this.inorderTraversal(function(e) {
        t.push(e);
        return true
      });
      return t
    };
    e.prototype.height = function() {
      return this.heightAux(this.root)
    };
    e.prototype.searchNode = function(t, e) {
      var i = null;
      while (t !== null && i !== 0) {
        i = this.compare(e, t.element);
        if (i < 0) {
          t = t.leftCh
        } else if (i > 0) {
          t = t.rightCh
        }
      }
      return t
    };
    e.prototype.transplant = function(t, e) {
      if (t.parent === null) {
        this.root = e
      } else if (t === t.parent.leftCh) {
        t.parent.leftCh = e
      } else {
        t.parent.rightCh = e
      }
      if (e !== null) {
        e.parent = t.parent
      }
    };
    e.prototype.removeNode = function(t) {
      if (t.leftCh === null) {
        this.transplant(t, t.rightCh)
      } else if (t.rightCh === null) {
        this.transplant(t, t.leftCh)
      } else {
        var e = this.minimumAux(t.rightCh);
        if (e.parent !== t) {
          this.transplant(e, e.rightCh);
          e.rightCh = t.rightCh;
          e.rightCh.parent = e
        }
        this.transplant(t, e);
        e.leftCh = t.leftCh;
        e.leftCh.parent = e
      }
    };
    e.prototype.inorderTraversalAux = function(t, e, i) {
      if (t === null || i.stop) {
        return
      }
      this.inorderTraversalAux(t.leftCh, e, i);
      if (i.stop) {
        return
      }
      i.stop = e(t.element) === false;
      if (i.stop) {
        return
      }
      this.inorderTraversalAux(t.rightCh, e, i)
    };
    e.prototype.levelTraversalAux = function(t, e) {
      var i = new f;
      if (t !== null) {
        i.enqueue(t)
      }
      while (!i.isEmpty()) {
        t = i.dequeue();
        if (e(t.element) === false) {
          return
        }
        if (t.leftCh !== null) {
          i.enqueue(t.leftCh)
        }
        if (t.rightCh !== null) {
          i.enqueue(t.rightCh)
        }
      }
    };
    e.prototype.preorderTraversalAux = function(t, e, i) {
      if (t === null || i.stop) {
        return
      }
      i.stop = e(t.element) === false;
      if (i.stop) {
        return
      }
      this.preorderTraversalAux(t.leftCh, e, i);
      if (i.stop) {
        return
      }
      this.preorderTraversalAux(t.rightCh, e, i)
    };
    e.prototype.postorderTraversalAux = function(t, e, i) {
      if (t === null || i.stop) {
        return
      }
      this.postorderTraversalAux(t.leftCh, e, i);
      if (i.stop) {
        return
      }
      this.postorderTraversalAux(t.rightCh, e, i);
      if (i.stop) {
        return
      }
      i.stop = e(t.element) === false
    };
    e.prototype.minimumAux = function(t) {
      while (t.leftCh !== null) {
        t = t.leftCh
      }
      return t
    };
    e.prototype.maximumAux = function(t) {
      while (t.rightCh !== null) {
        t = t.rightCh
      }
      return t
    };
    e.prototype.heightAux = function(t) {
      if (t === null) {
        return -1
      }
      return Math.max(this.heightAux(t.leftCh), this.heightAux(t.rightCh)) + 1
    };
    e.prototype.insertNode = function(t) {
      var e = null;
      var i = this.root;
      var n = null;
      while (i !== null) {
        n = this.compare(t.element, i.element);
        if (n === 0) {
          return null
        } else if (n < 0) {
          e = i;
          i = i.leftCh
        } else {
          e = i;
          i = i.rightCh
        }
      }
      t.parent = e;
      if (e === null) {
        this.root = t
      } else if (this.compare(t.element, e.element) < 0) {
        e.leftCh = t
      } else {
        e.rightCh = t
      }
      return t
    };
    e.prototype.createNode = function(t) {
      return {
        element: t,
        leftCh: null,
        rightCh: null,
        parent: null
      }
    };
    return e
  }();
  t.BSTree = b
})(collections || (collections = {}));
var beam;
(function(t) {
  var e = function() {
    function e() {}
    e.trackSocialPlugin = function(e, i, n) {
      try {
        window["ga"]("send", "social", e, i, n);
        window["ga"]("b.send", "social", e, i, n)
      } catch (s) {
        t.Debug.error(s)
      }
    };
    e.trackEvent = function(e, i, n, s, r) {
      if (r === void 0) {
        r = false
      }
      try {
        window["ga"]("send", {
          hitType: "event",
          eventCategory: e,
          eventAction: i,
          eventLabel: n,
          eventValue: s,
          nonInteraction: r ? 1 : 0
        });
        window["ga"]("b.send", {
          hitType: "event",
          eventCategory: e,
          eventAction: i,
          eventLabel: n,
          eventValue: s,
          nonInteraction: r ? 1 : 0
        })
      } catch (a) {
        t.Debug.error(a)
      }
    };
    return e
  }();
  t.Analytics = e
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(e) {
        __extends(i, e);

        function i(i, n, s, r, a, o, u) {
          e.call(this, i, n, u);
          var h = $('<div style="padding:50px;height:100%;overflow:hidden;"></div>');
          this.element.append(h);
          var l = $("<p><span>" + t.StringTool.numberToString(r) + " people</span></p>");
          var c = $("<p>Sent <span>" + t.StringTool.numberToString(a) + " tweets</span>" + (s ? " to the <span>TweetBeam</span> show" : "") + "</p>");
          var g = $("<p>Generating <span>" + t.StringTool.numberToString(o) + " potential impressions</span></p>");
          h.append(l);
          h.append(c);
          h.append(g);
          var d = $('<div class="canvas-container" style="visibility:hidden">');
          d.css("height", 385 + "px");
          d.css("width", 860 + "px");
          d.css("clip", "rect(0px " + d.width() + "px 0px 0px)");
          d.css("position", "absolute");
          h.append(d);
          new t.components.iconcanvas.IconCanvas(d, t.App.ROOT + "view/review/res/user_white.svg", r);
          var d = $('<div class="canvas-container" style="visibility:hidden">');
          d.css("height", 345 + "px");
          d.css("width", 860 + "px");
          d.css("clip", "rect(0px " + d.width() + "px 0px 0px)");
          d.css("position", "absolute");
          h.append(d);
          new t.components.iconcanvas.IconCanvas(d, t.App.ROOT + "view/review/res/speech_white.svg", a);
          var d = $('<div class="canvas-container" style="visibility:hidden">');
          d.css("height", 305 * 20 + "px");
          d.css("width", 860 * 20 + "px");
          d.css("clip", "rect(0px 860px 0px 0px)");
          d.css("position", "absolute");
          h.append(d);
          new t.components.iconcanvas.IconCanvas(d, t.App.ROOT + "view/review/res/eye_white.svg", Math.min(o, 5e5))
        }
        i.prototype.addClipTimeline = function(t, e, i, n) {
          if (i === void 0) {
            i = 0
          }
          if (n === void 0) {
            n = false
          }
          var s = "rect(0px " + e.width() + "px " + e.height() + "px 0px)";
          if (n) {
            s = "rect(0px 860px 305px 0px)"
          }
          var r = e.css("clip");
          t.add(TweenMax.to(e, 1, {
            clip: s,
            display: "block",
            visibility: "visible",
            delay: i
          }));
          if (n) {
            t.add(TweenMax.to($("canvas", e), 1, {
              scale: "0.05",
              transformOrigin: "left top"
            }))
          } else {
            t.add(TweenMax.to(e, .5, {
              clip: r,
              display: "none",
              delay: .5
            }))
          }
        };
        i.prototype.getTimeline = function() {
          var t = new TimelineLite;
          t.add(TweenMax.to($("p", this.element)[0], 1, {
            opacity: 1,
            display: "block"
          }));
          var i = $(".canvas-container", this.element).eq(0);
          this.addClipTimeline(t, i, 1);
          t.add(TweenMax.to($("p", this.element)[1], 1, {
            opacity: 1,
            display: "block",
            delay: .5
          }));
          i = $(".canvas-container", this.element).eq(1);
          this.addClipTimeline(t, i);
          t.add(TweenMax.to($("p", this.element)[2], 1, {
            opacity: 1,
            display: "block",
            delay: .5
          }));
          i = $(".canvas-container", this.element).eq(2);
          this.addClipTimeline(t, i, 0, true);
          var n = e.prototype.getTimeline.call(this);
          n.insert(t);
          return n
        };
        return i
      }(e.Slide);
      e.InfoSlide = i
    })(i = e.review || (e.review = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(n) {
        __extends(s, n);

        function s(e, i) {
          this.settings = $.extend({}, new t.view.silver.Settings, i["silver"]);
          n.call(this, e, this.settings, t.App.ROOT + "view/silver/res/templates.html?" + Math.random())
        }
        s.prototype.onInitialize = function() {
          this.initDOM();
          this.setFullscreen();
          this.createHighlightItemView();
          this.createItems();
          this.items = t.ArrayTool.shuffle(this.items);
          this.positionManager = new t.view.classic.PositionManager2(this.items, 0)
        };
        s.prototype.onDestroy = function() {
          $(".view-wrapper").remove()
        };
        s.prototype.onHighlight = function(t) {
          this.highlightItemView.show(t)
        };
        s.prototype.getWidth = function() {
          return this.dom.width()
        };
        s.prototype.onFilterChanged = function() {
          this.positionManager.filterMessages(this.messageProvider)
        };
        s.prototype.initDOM = function() {
          if ($("#view-wrapper").length == 0) {
            $(document.body).append(e.Templates.get("#view-wrapper"))
          } else {
            $("#view-wrapper").append(e.Templates.get("#view-wrapper"))
          }
          this.dom = $(".view-wrapper");
          this.itemsWrapper = this.dom.find(".items-wrapper");
          this.overlayWrapper = this.dom.find(".overlay-wrapper")
        };
        s.prototype.createHighlightItemView = function() {
          this.highlightItemView = new i.HighlightItemView(this, this.settings)
        };
        s.prototype.createItem = function() {
          var t = new i.Item(this.settings.background_items);
          this.items.push(t);
          return t
        };
        s.prototype.createItems = function() {
          var e = $('<canvas style="position:absolute;top:0px;left:0px;"></canvas>').attr("width", this.itemsWrapper.width()).attr("height", this.itemsWrapper.height());
          this.itemsWrapper.append(e);
          t.view.classic.BackgroundItemLargeCanvas.canvas = e;
          this.items = new Array;
          var i = this.settings.block_size;
          var n = Math.ceil(this.dom.width() / i);
          var s = Math.ceil(this.dom.height() / i);
          for (var r = 0; r < n; r++) {
            for (var a = 0; a < s; a++) {
              var o = this.createItem();
              o.setPosition(r * i, a * i);
              o.setSize(i, this.settings.block_border_width);
              o.appendTo(this.itemsWrapper)
            }
          }
        };
        return s
      }(t.view.base.BaseView);
      i.SilverView = n
    })(i = e.silver || (e.silver = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t() {
          this.messages_count = 10;
          this.pixels_per_second = 200;
          this.branding_content = "";
          this.show_time = 5e3
        }
        return t
      }();
      t.Settings = e
    })(e = t.ticker || (t.ticker = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function() {
        function i(i, n) {
          var s = this;
          this.previousWidth = null;
          this.previousHeight = null;
          this.messages = [];
          this.settings = $.extend(true, {}, JSON.parse(JSON.stringify(new e.Settings)), n["ticker"]);
          this.messageProvider = i;
          this.initialize();
          window.onresize = t.Debounce.debounced(function() {
            return s.handleResize()
          }, 300)
        }
        i.prototype.handleResize = function() {
          if (this.previousHeight != window.innerHeight || this.previousWidth != window.innerWidth) {
            this.initialize()
          }
        };
        i.prototype.destroy = function() {
          this.messageProvider.reset();
          this.messages = [];
          this.marquee = null;
          this.backupQueue = null;
          if (this.highlightTimeout) {
            window.clearInterval(this.highlightTimeout);
            this.highlightTimeout = null
          }
        };
        i.prototype.initialize = function() {
          var e = this;
          this.destroy();
          this.view = $(".beam");
          this.view.empty();
          this.previousHeight = window.innerHeight;
          this.previousWidth = window.innerWidth;
          this.backupQueue = new t.BackupQueue(this.settings.messages_count);
          this.messageProvider.setMessagesCallback(function(t) {
            return e.onMessages(t)
          });
          this.messageProvider.start(this.settings.messages_count)
        };
        i.prototype.onMessages = function(t) {
          var e = this;
          for (var i = t.length - 1; i >= 0; i--) {
            this.backupQueue.enqueue(t[i])
          }
          if (!this.highlightTimeout) {
            this.highlightTimeout = window.setInterval(function() {
              return e.highlightNext()
            }, this.settings.show_time)
          }
        };
        i.prototype.highlightNext = function() {
          if (this.marquee) {
            var t = this.marquee;
            TweenLite.to(this.marquee[0], 1, {
              top: -this.getHeight(),
              ease: Linear.easeNone,
              onComplete: function() {
                t.remove()
              }
            })
          }
          this.createMarquee()
        };
        i.prototype.createMarquee = function() {
          this.marquee = $('<div class="ticker-item"></div>');
          var e = this.backupQueue.dequeueAndReadd();
          var i = $('<span class="user">').text("@" + e.getScreenName() + ": ");
          var n = $('<span class="msg">').text(e.message);
          this.marquee.append(i, " ", n);
          this.marquee.css("top", this.getHeight() + "px");
          this.view.append(this.marquee);
          t.SizeText.sizeText(this.marquee[0], 128);
          TweenLite.to(this.marquee[0], 1, {
            top: 0,
            ease: Linear.easeNone
          })
        };
        i.prototype.getWidth = function() {
          return this.view.width()
        };
        i.prototype.getHeight = function() {
          return this.view.height()
        };
        return i
      }();
      e.TickerView = i
    })(i = e.ticker || (e.ticker = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(e) {
        __extends(i, e);

        function i() {
          e.apply(this, arguments);
          this.highlight_start_time = 2e3;
          this.highlight_interval = 11e3;
          this.highlight_resume_time = 18e3;
          this.message_prefix = "Tag your photos with";
          this.unhighlight_after_time = 8e3;
          this.background_items = $.extend(new t.components.grid.backgrounditem.Settings, {
            swap_fade_in_time: 200,
            force_profile_image: true
          })
        }
        return i
      }(e.base.Settings);
      i.Settings = n
    })(i = e.maybank || (e.maybank = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(i) {
        __extends(n, i);

        function n(e, n) {
          this.settings = $.extend({}, new t.view.maybank.Settings, n["maybank"]);
          i.call(this, e, this.settings, t.App.ROOT + "view/maybank/res/templates.html?" + Math.random());
          this.items = []
        }
        n.prototype.onInitialize = function() {
          $(".beam").empty();
          this.view = $(".beam").append(Mustache.render(e.Templates.get("#view-wrapper"), this.settings));
          this.itemsContainer = $(".items", this.view);
          var i = $('<canvas style="position:absolute;top:0px;left:0px;"></canvas>').attr("width", this.itemsContainer.width()).attr("height", this.itemsContainer.height());
          this.itemsContainer.append(i);
          t.view.classic.BackgroundItemLargeCanvas.canvas = i;
          this.initGrid()
        };
        n.prototype.onDestroy = function() {
          $(".beam").empty();
          this.items = []
        };
        n.prototype.unHighlight = function(t) {
          var e = $(".items", this.view);
          var n = $(".highlight-container", this.view);
          var s = new TimelineLite;
          s.appendMultiple([TweenLite.to(n, .5, {
            opacity: 0
          }), TweenLite.to(e, .5, {
            opacity: 1
          })]);
          i.prototype.unHighlight.call(this, t)
        };
        n.prototype.onHighlightMessage = function(i) {
          var n = $(".items", this.view);
          var s = $(".highlight-container", this.view);
          s.empty();
          var r = $(Mustache.render(e.Templates.get("#message-template"), i))[0];
          s.append(r);
          t.SizeText.sizeText(s[0], 50);
          var a = new TimelineLite;
          a.appendMultiple([TweenLite.to(s, .5, {
            opacity: 1
          }), TweenLite.to(n, .5, {
            opacity: .5
          })])
        };
        n.prototype.onHighlight = function(t) {
          this.onHighlightMessage(t.getMessage())
        };
        n.prototype.getWidth = function() {
          return this.view.width()
        };
        n.prototype.onFilterChanged = function() {
          this.positionManager.filterMessages(this.messageProvider)
        };
        n.prototype.initGrid = function() {
          var i = this;
          var n = this.view;
          var s = 12;
          var r = Math.ceil(n.width() / s);
          var a = r;
          var o = Math.ceil(n.height() / a);
          this.itemsContainer.width(s * r).height(o * a).css({
            left: 0,
            top: 0,
            position: "absolute"
          });
          this.grid = new t.components.grid.SmallGrid(this.itemsContainer, r, 2, [1], 0, 0);
          this.grid.render(function() {
            var t = new e.classic.BackgroundItemLargeCanvas(i.settings.background_items);
            i.items.push(t);
            t.setHoverCallback(function(t) {});
            return t
          });
          this.items = t.ArrayTool.shuffle(this.items);
          this.positionManager = new t.view.classic.PositionManager2(this.items, 20)
        };
        return n
      }(t.view.base.BaseView);
      i.MaybankView = n
    })(i = e.maybank || (e.maybank = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = t.components.grid.backgrounditem.BackgroundItem;
      var n = function(e) {
        __extends(i, e);

        function i(t) {
          e.call(this, t.background_items);
          this.opacity = 0;
          this.blindsWidth = 0
        }
        i.prototype.appendTo = function(e) {
          var n = this;
          if (i.canvas == null || i.parent != e[0]) {
            i.canvas = this.initializeCanvas(e);
            i.parent = e[0];
            e.append(i.canvas);
            i.infiniteCanvas = new t.components.grid.InfiniteCanvas(i.canvas)
          }
          this.context = i.infiniteCanvas;
          $(i.canvas).click(function(t) {
            return n.checkHover(t)
          })
        };
        i.prototype.initializeCanvas = function(t) {
          return $('<canvas style="position:absolute;top:0px;left:0px;"></canvas>').attr("width", t.width()).attr("height", t.height())[0]
        };
        i.prototype.checkHover = function(t) {
          var e = i.infiniteCanvas.getOriginalX(t.pageX);
          var n = i.infiniteCanvas.getOriginalY(t.pageY);
          if (e > this.getImageX() && e < this.getImageX() + this.getItemSize() && n > this.getImageY() && n < this.getImageY() + this.getItemSize()) {
            this.raiseHover();
            t.stopImmediatePropagation();
            return false
          }
        };
        i.prototype.getImagesToPreload = function(e) {
          var i = [t.ImageProxy.getTweetBeamUrl(e.getPrimaryImageUrl(), this.getItemSize(), this.getItemSize())];
          if (e.hasEmbeddedImage()) {
            i.push(e.getPrimaryImageUrl())
          }
          return i
        };
        i.prototype.swapMessage = function(t, i) {
          e.prototype.swapMessage.call(this, t, i)
        };
        i.prototype.getBlindsWidth = function() {
          return this.blindsWidth
        };
        i.prototype.getOpacity = function() {
          return this.opacity
        };
        i.prototype.clearImage = function() {
          var t = this.context;
          t.clearRect(this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize())
        };
        i.prototype.setOpacity = function(t) {
          this.opacity = t;
          var e = this.context;
          e.clearRect(this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.setGlobalAlpha(t);
          e.drawImage(this.colorImage, 0, 0, this.getItemSize(), this.getItemSize(), this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.setGlobalAlpha(1)
        };
        i.prototype.setBlindsWidth = function(t) {
          this.blindsWidth = t;
          var e = this.context;
          e.setFillStyle("black");
          e.fillRect(this.getImageX(), this.getImageY(), t, this.getItemSize());
          e.fillRect(this.getImageX() + this.getItemSize() - t, this.getImageY(), t, this.getItemSize())
        };
        i.prototype.startFadeIn = function() {
          this.opacity = 0;
          TweenLite.to(this, this.settings.swap_fade_in_time / 1e3, {
            setOpacity: 1,
            ease: "linear"
          })
        };
        i.prototype.startFadeInTo = function(t) {
          return TweenLite.to(this, this.settings.swap_fade_in_time / 1e3, {
            setOpacity: t,
            ease: "linear"
          })
        };
        i.prototype.startBlinds = function() {
          var t = this;
          this.setBlindsWidth(0);
          TweenLite.to(this, this.settings.swap_disappear_time / 1e3, {
            setBlindsWidth: this.getItemSize() / 2,
            onComplete: function() {
              return t.startFadeIn()
            }
          })
        };
        return i
      }(i);
      e.BackgroundItemInfiniteCanvas = n
    })(i = e.wedding || (e.wedding = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(e) {
        __extends(i, e);

        function i(t) {
          e.call(this, t);
          this.opacity = 0;
          this.blindsWidth = 0
        }
        i.prototype.appendTo = function(e) {
          var n = this;
          if (i.canvas == null || i.parent != e[0]) {
            i.canvas = this.initializeCanvas(e);
            i.parent = e[0];
            e.append(i.canvas);
            i.infiniteCanvas = new t.components.grid.InfiniteCanvas(i.canvas)
          }
          this.context = i.infiniteCanvas;
          $(i.canvas).click(function(t) {
            return n.checkHover(t)
          })
        };
        i.prototype.initializeCanvas = function(t) {
          return $('<canvas style="position:absolute;top:0px;left:0px;"></canvas>').attr("width", t.width()).attr("height", t.height())[0]
        };
        i.prototype.checkHover = function(t) {
          var e = i.infiniteCanvas.getOriginalX(t.pageX);
          var n = i.infiniteCanvas.getOriginalY(t.pageY);
          if (e > this.getImageX() && e < this.getImageX() + this.getItemSize() && n > this.getImageY() && n < this.getImageY() + this.getItemSize()) {
            this.raiseHover();
            t.stopImmediatePropagation();
            return false
          }
        };
        i.prototype.getImagesToPreload = function(e) {
          var i = [t.ImageProxy.getTweetBeamUrl(e.userImageUrl, this.getItemSize(), this.getItemSize(), e.user)];
          if (e.hasEmbeddedImage()) {
            i.push(e.getPrimaryImageUrl())
          }
          return i
        };
        i.prototype.swapMessage = function(t, i) {
          e.prototype.swapMessage.call(this, t, i)
        };
        i.prototype.getBlindsWidth = function() {
          return this.blindsWidth
        };
        i.prototype.getOpacity = function() {
          return this.opacity
        };
        i.prototype.setOpacity = function(t) {
          this.opacity = t;
          var e = this.context;
          e.clearRect(this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.setGlobalAlpha(t);
          e.drawImage(this.colorImage, 0, 0, this.getItemSize(), this.getItemSize(), this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.setGlobalAlpha(1)
        };
        i.prototype.setBlindsWidth = function(t) {
          this.blindsWidth = t;
          var e = this.context;
          e.setFillStyle("black");
          e.fillRect(this.getImageX(), this.getImageY(), t, this.getItemSize());
          e.fillRect(this.getImageX() + this.getItemSize() - t, this.getImageY(), t, this.getItemSize())
        };
        i.prototype.startFadeIn = function() {
          this.opacity = 0;
          TweenLite.to(this, this.settings.swap_fade_in_time / 1e3, {
            setOpacity: .45,
            ease: "linear"
          })
        };
        i.prototype.startFadeInTo = function(t) {
          return TweenLite.to(this, this.settings.swap_fade_in_time / 1e3, {
            setOpacity: t,
            ease: "linear"
          })
        };
        i.prototype.startBlinds = function() {
          var t = this;
          this.setBlindsWidth(0);
          TweenLite.to(this, this.settings.swap_disappear_time / 1e3, {
            setBlindsWidth: this.getItemSize() / 2,
            onComplete: function() {
              return t.startFadeIn()
            }
          })
        };
        return i
      }(t.components.grid.backgrounditem.BackgroundItem);
      e.BackgroundItemLargeCanvas = i
    })(i = e.worldcup || (e.worldcup = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(t) {
    var e;
    (function(t) {
      var e = function() {
        function t() {}
        return t
      }();
      t.HighlightItemView = e
    })(e = t.worldcup || (t.worldcup = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(e) {
      var i = function(t) {
        __extends(e, t);

        function e(e) {
          t.call(this, e)
        }
        e.prototype.getImagesToPreload = function(t) {
          return [t.getPrimaryImageUrl()]
        };
        e.prototype.initializeCanvas = function(t) {
          return $("<canvas></canvas>").attr("width", t.width()).attr("height", t.height())
        };
        e.prototype.swapMessage = function(t, e) {
          var i = this.message == null;
          this.message = t;
          this.colorImage = e[0].getImage();
          this.startTransition(i)
        };
        e.prototype.setOpacity = function(t) {
          var e = this.context;
          e.globalAlpha = t;
          e.clearRect(this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          var i = this.colorImage.width / this.colorImage.height;
          var n = i - 1;
          n *= .25;
          var s = n > 0 ? this.colorImage.width * n : 0;
          var r = n < 0 ? this.colorImage.height * -n : 0;
          var a = this.colorImage.width - s;
          var o = this.colorImage.height - r;
          e.drawImage(this.colorImage, s, r, a, o, this.getImageX(), this.getImageY(), this.getItemSize(), this.getItemSize());
          e.globalAlpha = 1
        };
        return e
      }(t.view.classic.BackgroundItemLargeCanvas);
      e.Item = i
    })(i = e.worldcup || (e.worldcup = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(e) {
        __extends(i, e);

        function i() {
          e.apply(this, arguments);
          this.swap_fade_in_time = 500;
          this.highlight_start_time = 2e3;
          this.highlight_interval = 11e3;
          this.highlight_resume_time = 18e3;
          this.highlight_show_time = 8e3;
          this.background_items = $.extend(new t.components.grid.backgrounditem.Settings, {
            swap_fade_in_time: 500
          });
          this.split_chars = true
        }
        return i
      }(e.classic.Settings);
      i.Settings = n
    })(i = e.worldcup || (e.worldcup = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));
var beam;
(function(t) {
  var e;
  (function(e) {
    var i;
    (function(i) {
      var n = function(n) {
        __extends(s, n);

        function s(s, r) {
          var a = this;
          n.call(this, s, r);
          this.items = [];
          this.previousWidth = null;
          this.previousHeight = null;
          this._isSmallMode = null;
          this.settings = $.extend({}, new i.Settings, r["worldcup"]);
          e.Templates.load(t.App.ROOT + "view/worldcup/res/Templates.html?" + Math.random(), function() {
            return a.initialize()
          });
          window.onresize = t.Debounce.debounced(function() {
            return a.handleResize()
          }, 300)
        }
        s.prototype.isSmallMode = function() {
          if (this._isSmallMode == null) {
            this._isSmallMode = this.view.width() <= this.settings.small_mode_width
          }
          return this._isSmallMode
        };
        s.prototype.handleResize = function() {
          if (this.previousHeight != window.innerHeight || this.previousWidth != window.innerWidth) {
            this.initialize()
          }
        };
        s.prototype.destroy = function() {
          $(".beam").empty();
          this._isSmallMode = null;
          this.positionManager = null;
          clearTimeout(this.showTimeout);
          clearTimeout(this.highlightTimeout);
          clearTimeout(this.hideTimeout);
          this.firstMessageLoaded = false;
          this.messageProvider.reset();
          this.started = false
        };
        s.prototype.isFullscreen = function() {
          var e = t.BrowserInfo.getQueryParameters()["fullscreen"] || document["fullScreen"] || document["webkitIsFullScreen"] || document["mozIsFullscreen"];
          if (typeof e === "undefined" && bowser.msie) {
            e = window.innerHeight + 40 >= window.screen.height
          }
          if (!e && !this.isSmallMode()) {
            e = window.innerHeight == window.screen.height
          }
          return e
        };
        s.prototype.setFullscreen = function() {
          if (this.isFullscreen()) {
            $(document.body).addClass("fullscreen")
          } else {
            $(document.body).removeClass("fullscreen")
          }
          var t = $(".btn-fullscreen");
          t.off("click");
          var e = document.body["webkitRequestFullScreen"] || document.body["requestFullScreen"] || document.body["mozRequestFullScreen"] || document.body["msRequestFullscreen"];
          if (e === undefined) {
            if (bowser.ipad) {
              t.click(function(t) {
                window.location.href += window.location.href.indexOf("?") > -1 ? "&fullscreen=true" : "?fullscreen=true";
                return false
              })
            } else if (this.isSmallMode()) {} else {
              t.click(function(t) {
                t.preventDefault();
                $(".ui-fullscreen-tip").toggle();
                return false
              })
            }
          } else {
            t.click(function(t) {
              t.preventDefault();
              e.call(document.documentElement);
              return false
            })
          }
        };
        s.prototype.initialize = function() {
          var i = this;
          TweenMax.ticker.fps(30);
          this.destroy();
          this.view = $(".beam").append(e.Templates.get("#view-wrapper"));
          if (window.location.href.indexOf("twelftal") > -1) {
            this.boxDismissed = true
          } else if (!this.boxDismissed) {
            this.view = $(".beam").append(e.Templates.get("#view-info-box"))
          }
          this.itemsContainer = $(".items", this.view);
          this.initGrid();
          this.messageProvider.setMessagesCallback(function(t) {
            return i.onMessages(t)
          });
          this.messageProvider.start(this.positionManager.getItemCount());
          t.SocialButtons.refresh($(".social-buttons")[0]);
          if (t.CookieTool.readCookie("boxDismissed") != null) {
            this.boxDismissed = true;
            $(".intro-initial", this.view).remove()
          }
          $(".intro-initial a", this.view).click(function() {
            t.CookieTool.createCookie("boxDismissed", "true", t.CookieTool.oneDay());
            i.boxDismissed = true;
            $(".intro-initial", i.view).remove();
            i.startIfDone();
            return false
          });
          this.setFullscreen()
        };
        s.prototype.startIfDone = function() {
          var t = this;
          if (this.firstMessageLoaded && this.boxDismissed && !this.started) {
            this.showTimeout = setTimeout(function() {
              return t.showNextItem()
            }, this.settings.swap_interval);
            this.highlightTimeout = setTimeout(function() {
              return t.highlightNextItem()
            }, this.settings.highlight_start_time);
            this.started = true
          }
        };
        s.prototype.onMessages = function(t) {
          this.positionManager.addMessages(t);
          if (!this.firstMessageLoaded) {
            this.firstMessageLoaded = true;
            this.startIfDone()
          }
        };
        s.prototype.initDOM = function() {};
        s.prototype.onBackgroundItemHover = function(e) {
          var i = this;
          if (!this.boxDismissed) {
            t.CookieTool.createCookie("boxDismissed", "true", t.CookieTool.oneDay());
            this.boxDismissed = true;
            $(".intro-initial", this.view).remove();
            this.startIfDone();
            return
          }
          this.highlight(e);
          clearTimeout(this.highlightTimeout);
          this.highlightTimeout = setTimeout(function() {
            return i.highlightNextItem()
          }, this.settings.highlight_resume_time)
        };
        s.prototype.highlightNextItem = function() {
          var e = this;
          try {
            var i = this.positionManager.getItemToHighlight();
            if (i) {
              this.highlight(i);
              if (this.settings.highlight_debug) {
                t.Debug.log((new Date).getTime() + "," + i.getMessage().id + "," + i.getMessage().message)
              }
            }
          } catch (n) {
            t.Debug.error(n)
          }
          this.highlightTimeout = setTimeout(function() {
            return e.highlightNextItem()
          }, this.settings.highlight_interval)
        };
        s.prototype.showNextItem = function() {
          var e = this;
          try {
            this.positionManager.showNewMessage()
          } catch (i) {
            t.Debug.error(i)
          }
          this.showTimeout = setTimeout(function() {
            return e.showNextItem()
          }, this.settings.swap_interval)
        };
        s.prototype.setMessageInfo = function(e) {
          var i = e.tweetObject;
          var n = "";
          try {
            n = e.originalObject.wc2014.team;
            if (n == "Costa-rica") {
              n = "Costa Rica"
            }
          } catch (s) {
            n = ""
          }
          var r = n.toLowerCase().replace(" ", "_");
          $(".flag-active").removeClass("flag-active");
          if (e.hasEmbeddedImage()) {
            $(".highlight", this.view).addClass("has-image-2");
            $(".background-img", this.view).css("background-image", 'url("' + e.getPrimaryImageUrl() + '")')
          } else if (n && n != "") {
            $(".highlight", this.view).removeClass("has-image").removeClass("has-image-2");
            $(".flag-" + r)[0].className += " flag-active"
          } else {
            $(".highlight", this.view).removeClass("has-image").removeClass("has-image-2")
          }
          var a = $(".message p", this.view);
          var o = e.message;
          o = o.replace(/\n/g, " ");
          a.text(o);
          if (n && n != "") {
            $(".author-text", this.view).text("" + t.StringTool.removeDiacritics(i.user.name + ", " + n))
          } else {
            $(".author-text", this.view).text("" + t.StringTool.removeDiacritics(i.user.name))
          }
          $(".timeago", this.view).text(t.DateTool.timeAgo(e.date))
        };
        s.prototype.unHighlight = function(t) {
          var e = $(".foreground", this.view);
          var i = new TimelineLite;
          i.add(TweenLite.to(e, .3, {
            clip: "rect(0px," + e.width() + "px," + e.height() + "px, 0px)"
          }));
          i.add(t.startFadeInTo(.45))
        };
        s.prototype.highlight = function(t) {
          var e = this;
          window.clearTimeout(this.hideTimeout);
          var n = $(".foreground", this.view);
          var s = Math.ceil(n.height() / 2 - .5 * this.itemSize);
          var r = this.isSmallMode() ? .25 * this.itemSize : this.itemSize;
          var a = r + this.itemSize;
          var o = s + this.itemSize;
          var u = i.BackgroundItemLargeCanvas.infiniteCanvas.getCurrentX(t.getImageX());
          var h = i.BackgroundItemLargeCanvas.infiniteCanvas.getCurrentY(t.getImageY());
          var l = -u + i.BackgroundItemLargeCanvas.infiniteCanvas.getDx() + r;
          var c = -h + i.BackgroundItemLargeCanvas.infiniteCanvas.getDy() + s;
          this.setMessageInfo(t.getMessage());
          var g = new TimelineLite;
          g.add(t.startFadeInTo(1));
          g.add(i.BackgroundItemLargeCanvas.infiniteCanvas.panTo(l, c));
          g.add(TweenLite.fromTo(n, .5, {
            clip: "rect(0px," + n.width() + "px," + n.height() + "px, 0px)"
          }, {
            clip: "rect(" + s + "px," + a + "px," + o + "px," + r + "px)"
          }));
          var d = $(".message p", this.view);
          var p;
          if (this.settings.split_chars) {
            var m = new window["SplitText"](d, {
              type: "words,chars"
            });
            p = m.chars
          } else {
            var m = new window["SplitText"](d, {
              type: "words"
            });
            p = m.words
          }
          TweenLite.set(d, {
            perspective: 400
          });
          g.staggerFrom(p, .8, {
            opacity: 0,
            scale: 0,
            y: 80,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: Back.easeOut
          }, .005, "+=0");
          this.hideTimeout = window.setTimeout(function() {
            return e.unHighlight(t)
          }, this.settings.highlight_show_time)
        };
        s.prototype.initGrid = function() {
          var e = this;
          var n = this.view;
          var s = this.isSmallMode() ? 5 : 10;
          var r = Math.ceil(n.width() / s);
          var a = r;
          this.itemSize = r;
          var o = Math.ceil(n.height() / a) + 1;
          this.itemsContainer.width(s * r).height(o * a).css({
            left: 0,
            top: 0,
            position: "absolute"
          });
          this.grid = new t.components.grid.SmallGrid(this.itemsContainer, r, 0, [1], 0, 0);
          this.grid.render(function() {
            var t = new i.BackgroundItemLargeCanvas(e.settings.background_items);
            e.items.push(t);
            t.setHoverCallback(function(t) {
              return e.onBackgroundItemHover(t)
            });
            return t
          });
          t.ArrayTool.shuffle(this.items);
          this.positionManager = new t.view.classic.PositionManager2(this.items, 20, true);
          var u = Math.ceil(n.height() / 2 - .5 * this.itemSize);
          $(".square", this.view).width(this.itemSize).height(this.itemSize).css({
            left: (this.isSmallMode() ? this.itemSize * .25 : this.itemSize) + "px",
            top: u + "px"
          })
        };
        return s
      }(t.View);
      i.WorldCupView = n
    })(i = e.worldcup || (e.worldcup = {}))
  })(e = t.view || (t.view = {}))
})(beam || (beam = {}));