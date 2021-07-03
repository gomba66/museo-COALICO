//////////////////////////////////////////////////////////////////////
// Pano2VR 6.0.2/17253 HTML5/CSS3 & WebGL Panorama Player           //
// License: BKYM.COM                                                //
// (c) 2018, Garden Gnome Software, http://ggnome.com               //
//////////////////////////////////////////////////////////////////////

var G =
    "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (m, f, h) {
          m != Array.prototype && m != Object.prototype && (m[f] = h.value);
        },
  N =
    "undefined" != typeof window && window === this
      ? this
      : "undefined" != typeof global && null != global
      ? global
      : this;
function O(m, f) {
  if (f) {
    var h = N;
    m = m.split(".");
    for (var d = 0; d < m.length - 1; d++) {
      var b = m[d];
      b in h || (h[b] = {});
      h = h[b];
    }
    m = m[m.length - 1];
    d = h[m];
    f = f(d);
    f != d &&
      null != f &&
      G(h, m, { configurable: !0, writable: !0, value: f });
  }
}
var P;
if ("function" == typeof Object.setPrototypeOf) P = Object.setPrototypeOf;
else {
  var Q;
  a: {
    var R = { Xm: !0 },
      S = {};
    try {
      S.__proto__ = R;
      Q = S.Xm;
      break a;
    } catch (m) {}
    Q = !1;
  }
  P = Q
    ? function (m, f) {
        m.__proto__ = f;
        if (m.__proto__ !== f) throw new TypeError(m + " is not extensible");
        return m;
      }
    : null;
}
var T = P;
O("Object.setPrototypeOf", function (m) {
  return m || T;
});
O("Array.prototype.fill", function (m) {
  return m
    ? m
    : function (f, h, d) {
        var b = this.length || 0;
        0 > h && (h = Math.max(0, b + h));
        if (null == d || d > b) d = b;
        d = Number(d);
        0 > d && (d = Math.max(0, b + d));
        for (h = Number(h || 0); h < d; h++) this[h] = f;
        return this;
      };
});
var __extends =
  (this && this.__extends) ||
  (function () {
    function m(f, h) {
      m =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var a in b) b.hasOwnProperty(a) && (d[a] = b[a]);
        };
      return m(f, h);
    }
    return function (f, h) {
      function d() {
        this.constructor = f;
      }
      m(f, h);
      f.prototype =
        null === h ? Object.create(h) : ((d.prototype = h.prototype), new d());
    };
  })();
function U() {
  var m = "perspective",
    f = ["Webkit", "Moz", "O", "ms", "Ms"],
    h;
  for (h = 0; h < f.length; h++)
    "undefined" !==
      typeof document.documentElement.style[f[h] + "Perspective"] &&
      (m = f[h] + "Perspective");
  "undefined" !== typeof document.documentElement.style[m]
    ? "webkitPerspective" in document.documentElement.style
      ? ((m = document.createElement("style")),
        (f = document.createElement("div")),
        (h = document.head || document.getElementsByTagName("head")[0]),
        (m.textContent =
          "@media (-webkit-transform-3d) {#ggswhtml5{height:5px}}"),
        h.appendChild(m),
        (f.id = "ggswhtml5"),
        document.documentElement.appendChild(f),
        (h = 5 === f.offsetHeight),
        m.parentNode.removeChild(m),
        f.parentNode.removeChild(f))
      : (h = !0)
    : (h = !1);
  return h;
}
function V() {
  var m;
  if ((m = !!window.WebGLRenderingContext))
    try {
      var f = document.createElement("canvas");
      f.width = 100;
      f.height = 100;
      var h = f.getContext("webgl");
      h || (h = f.getContext("experimental-webgl"));
      m = !!h;
    } catch (d) {
      m = !1;
    }
  return m;
}
var ggP2VR;
(function (m) {
  var f = (function () {
    function d(b) {
      this.g = null;
      this.mg = this.hl = this.eb = !1;
      this.fb = !0;
      this.kb = this.Ea = this.wa = 0;
      this.f = 70;
      this.Ua = 0;
      this.autoplay = this.rg = !1;
      this.id = "";
      this.i = this.pan = 0;
      this.g = b;
      this.fd = this.Ic = 100;
      this.xd = 1;
    }
    d.prototype.Ob = function (b) {
      var a;
      if ((a = b.getAttributeNode("id"))) this.id = a.nodeValue.toString();
      if ((a = b.getAttributeNode("pan"))) this.pan = Number(a.nodeValue);
      if ((a = b.getAttributeNode("tilt"))) this.i = Number(a.nodeValue);
    };
    d.prototype.Cm = function (b) {
      var a = "",
        c = this.g,
        k = !0;
      if (c.ff) {
        var d = new m.xa(0, 0, -100);
        d.wa((-this.i * Math.PI) / 180);
        d.Ea((this.pan * Math.PI) / 180);
        d.Ea((-c.pan.c * Math.PI) / 180);
        d.wa((c.i.c * Math.PI) / 180);
        d.kb((c.O.c * Math.PI) / 180);
        0.01 <= d.z && (k = !1);
      }
      c.Bc && (a += "perspective(" + b + "px) ");
      a =
        a +
        ("translate3d(0px,0px," + b + "px) ") +
        ("rotateZ(" + c.O.c.toFixed(10) + "deg) ");
      a += "rotateX(" + c.i.c.toFixed(10) + "deg) ";
      a += "rotateY(" + (-c.pan.c).toFixed(10) + "deg) ";
      a += "rotateY(" + this.pan.toFixed(10) + "deg) ";
      a += "rotateX(" + (-this.i).toFixed(10) + "deg) ";
      b = 1e4;
      d = this.b.videoWidth;
      var e = this.b.videoHeight;
      if (0 == d || 0 == e) (d = 640), (e = 480);
      0 < this.Ic && (d = this.Ic);
      0 < this.fd && (e = this.fd);
      0 < d &&
        0 < e &&
        ((this.b.width = d),
        (this.b.height = e),
        (this.b.style.width = d + "px"),
        (this.b.style.height = e + "px"));
      0 < this.f && (b = d / (2 * Math.tan(((this.f / 2) * Math.PI) / 180)));
      a += "translate3d(0px,0px," + (-b).toFixed(10) + "px) ";
      a += "rotateZ(" + this.kb.toFixed(10) + "deg) ";
      a += "rotateY(" + (-this.Ea).toFixed(10) + "deg) ";
      a += "rotateX(" + this.wa.toFixed(10) + "deg) ";
      this.xd && 1 != this.xd && (a += "scaleY(" + this.xd + ") ");
      a += "translate3d(" + -d / 2 + "px," + -e / 2 + "px,0px) ";
      this.b.style[c.Ra + "Origin"] = "0% 0%";
      this.eb &&
        ((a = ""),
        1 == this.Ua &&
          (a += "scale(" + Math.min(c.o.width / d, c.o.height / e) + ") "),
        (a += "translate3d(" + -d / 2 + "px," + -e / 2 + "px,0px) "));
      this.xo != a &&
        ((this.xo = a),
        (this.b.style[c.Ra] = a),
        (this.b.style.visibility = k && this.fb ? "visible" : "hidden"),
        this.mg &&
          this.hl == this.eb &&
          (this.b.style[c.cd] = "all 0s linear 0s"),
        (this.hl = this.eb));
    };
    d.prototype.Bf = function (b) {
      this.b && (this.b.style.visibility = b ? "visible" : "hidden");
    };
    d.prototype.Ke = function () {
      var b = this.g;
      b.Y
        ? ((this.b.style.left = b.o.width / 2 + "px"),
          (this.b.style.top = b.o.height / 2 + "px"))
        : ((this.b.style.left = b.margin.left + b.o.width / 2 + "px"),
          (this.b.style.top = b.margin.top + b.o.height / 2 + "px"));
    };
    return d;
  })();
  m.Aq = f;
  var h = (function (d) {
    function b(a) {
      a = d.call(this, a) || this;
      a.ja = !1;
      a.pm = !1;
      a.Ml = !1;
      a.Hf = !1;
      a.wh = !1;
      a.zj = !1;
      a.yi = !1;
      a.Gb = null;
      a.Sf = null;
      a.Ug = 0;
      a.ze = 0;
      a.Be = !1;
      a.yj = !1;
      a.stopped = !1;
      a.url = [];
      a.loop = 0;
      a.level = 1;
      a.cc = 0;
      a.mode = 1;
      a.xh = 10;
      a.tb = 0;
      a.Gf = 0;
      a.la = 1;
      a.Uc = 0;
      a.Dc = 0;
      a.Ec = 0;
      a.Vc = 0;
      return a;
    }
    __extends(b, d);
    b.prototype.lm = function () {
      if (this.ja && this.stopped) this.stopped = !1;
      else {
        if (!this.ja && this.g.ff) {
          this.Gd();
          var a = this.sc;
          this.addElement();
          this.sc = a;
          this.b.pause();
        }
        0 == this.loop
          ? this.ja
            ? ((this.Gb = null), this.Yc())
            : this.b.play()
          : 0 < this.sc
          ? (this.sc--,
            this.ja || (this.b.currentTime = 0),
            (this.wh &&
              ((this.dd && 0 == this.dd.gain.value) ||
                (0 == this.uc.gain.value &&
                  0 == this.xc.gain.value &&
                  0 == this.vc.gain.value &&
                  0 == this.wc.gain.value))) ||
              (this.ja ? ((this.Gb = null), this.Yc()) : this.b.play()))
          : this.ja && ((this.Gb = null), (this.Be = !1));
      }
    };
    b.prototype.Pf = function () {
      this.yi = !1;
      var a = this.g.sa;
      a &&
        (this.ja || (this.source = a.createMediaElementSource(this.b)),
        2 == this.mode || 3 == this.mode || 5 == this.mode
          ? ((this.Te = a.createChannelSplitter(2)),
            (this.uc = a.createGain()),
            (this.vc = a.createGain()),
            (this.wc = a.createGain()),
            (this.xc = a.createGain()),
            (this.Xf = a.createChannelMerger(2)),
            this.ja || this.source.connect(this.Te),
            this.Te.connect(this.uc, 0),
            this.Te.connect(this.vc, 0),
            this.Te.connect(this.wc, 1),
            this.Te.connect(this.xc, 1),
            this.uc.connect(this.Xf, 0, 0),
            this.vc.connect(this.Xf, 0, 1),
            this.wc.connect(this.Xf, 0, 0),
            this.xc.connect(this.Xf, 0, 1),
            this.Xf.connect(a.destination))
          : ((this.dd = a.createGain()),
            this.ja || this.source.connect(this.dd),
            this.dd.connect(a.destination)));
    };
    b.prototype.Rg = function () {
      var a = this.g.sa;
      this.eb ||
        this.zj ||
        (this.uc.gain.setValueAtTime(this.Uc, a.currentTime),
        this.xc.gain.setValueAtTime(this.Vc, a.currentTime),
        this.vc.gain.setValueAtTime(this.Dc, a.currentTime),
        this.wc.gain.setValueAtTime(this.Ec, a.currentTime));
    };
    b.prototype.wi = function () {
      if (!this.yi) {
        var a = this.g,
          c = this.g.sa;
        if (this.b || this.ja) {
          var b,
            d = this.pan - a.pan.c;
          for (b = this.i - a.i.c; -180 > d; ) d += 360;
          for (; 180 < d; ) d -= 360;
          var e = this.cc,
            p = this.xh;
          0 == p && (p = 0.01);
          0 > p && (p = a.f.c);
          this.Rb || ((this.Rb = new m.xa()), this.Rb.Kk(this.pan, this.i));
          (0 != this.mode && 1 != this.mode) ||
            !c ||
            (this.dd &&
              this.dd.gain.setValueAtTime(
                this.level * a.V * this.la,
                c.currentTime
              ));
          if (2 == this.mode && c) {
            var t = 0.5 * Math.cos((d * Math.PI) / 180) + 0.5;
            this.Uc = Math.sqrt(t) * this.la * this.level * a.V;
            this.Vc = Math.sqrt(t) * this.la * this.level * a.V;
            this.Dc = Math.sqrt(1 - t) * this.la * this.level * a.V;
            this.Ec = Math.sqrt(1 - t) * this.la * this.level * a.V;
            this.Rg();
          }
          if (3 == this.mode) {
            0 > d
              ? d < -this.tb
                ? (d += this.tb)
                : (d = 0)
              : (d = d > this.tb ? d - this.tb : 0);
            var g = this.level;
            b = Math.abs(b);
            b = b < this.Gf ? 0 : b - this.Gf;
            var h = 1 - b / p;
            if (Math.abs(d) > p || 0 > h)
              (t = g * e * a.V),
                c
                  ? ((this.Uc = t * this.la),
                    (this.Vc = t * this.la),
                    (this.Ec = this.Dc = 0),
                    this.Rg())
                  : (this.b.volume = g * e * a.V);
            else if (((t = 1 - Math.abs(d / p)), c)) {
              var f = g * (e + (1 - e) * h * t) * a.V;
              t = g * e * a.V;
              0 <= d
                ? ((this.Uc = f * this.la), (this.Vc = t * this.la))
                : ((this.Uc = t * this.la), (this.Vc = f * this.la));
              2 * Math.abs(d) < p
                ? ((t = 1 - Math.abs(2 * d) / p),
                  (f = g * (e + (1 - e) * h * t) * a.V),
                  (t = 0.5 * g * (1 - e) * h * (1 - t) * a.V),
                  0 <= d
                    ? ((this.Vc = f * this.la),
                      (this.Ec = t * this.la),
                      (this.Dc = 0))
                    : ((this.Uc = f * this.la),
                      (this.Dc = t * this.la),
                      (this.Ec = 0)))
                : ((t = 1 - (Math.abs(2 * d) - p) / p),
                  (f = 0.5 * g * (1 - e) * h * t * a.V),
                  0 <= d
                    ? ((this.Ec = f * this.la), (this.Dc = 0))
                    : ((this.Dc = f * this.la), (this.Ec = 0)));
              this.Rg();
            } else this.b.volume = g * (e + (1 - e) * h * t) * a.V;
          }
          4 == this.mode &&
            (Math.abs(d) < this.tb && Math.abs(b) < this.Gf
              ? this.Hf ||
                ((this.Hf = !0),
                (this.sc = this.loop - 1),
                this.ja ? this.Be || this.Yc() : this.b.play())
              : (this.Hf = !1));
          5 == this.mode &&
            ((b = (180 * Math.acos(a.Si.ai(this.Rb))) / Math.PI),
            b < this.tb
              ? c
                ? ((this.Uc = this.level * a.V * this.la),
                  (this.Vc = this.level * a.V * this.la),
                  (this.Ec = this.Dc = 0),
                  this.Rg())
                : (this.b.volume = this.level * a.V)
              : c
              ? (b < this.tb + p
                  ? (0 > d
                      ? (d = d > -this.tb ? 0 : d + this.tb)
                      : (d = d < this.tb ? 0 : d - this.tb),
                    (f = 1 - Math.max(b - this.tb, 0) / p),
                    (t = Math.max(
                      1 -
                        (Math.abs(d) * Math.cos((this.i * Math.PI) / 180)) / p,
                      0
                    )),
                    0 < d
                      ? ((this.Uc =
                          this.level *
                          (f * (1 - this.cc) + this.cc) *
                          a.V *
                          this.la),
                        (this.Vc =
                          this.level *
                          (f * t * (1 - this.cc) + this.cc) *
                          a.V *
                          this.la),
                        (this.Dc = 0),
                        (this.Ec = this.level * f * (1 - t) * a.V * this.la))
                      : ((this.Uc =
                          this.level *
                          (f * t * (1 - this.cc) + this.cc) *
                          a.V *
                          this.la),
                        (this.Vc =
                          this.level *
                          (f * (1 - this.cc) + this.cc) *
                          a.V *
                          this.la),
                        (this.Dc = this.level * f * (1 - t) * a.V * this.la),
                        (this.Ec = 0)))
                  : ((f = this.level * this.cc * a.V),
                    (this.Uc = f * this.la),
                    (this.Vc = f * this.la),
                    (this.Ec = this.Dc = 0)),
                this.Rg())
              : ((b -= this.tb),
                b < p && 0 < p
                  ? ((t = 1 - Math.abs(b / p)),
                    (this.b.volume = this.level * (e + (1 - e) * t) * a.V))
                  : (this.b.volume = e * a.V)));
          6 == this.mode &&
            ((b = (180 * Math.acos(a.Si.ai(this.Rb))) / Math.PI),
            Math.abs(b) < this.tb
              ? this.Hf ||
                ((this.Hf = !0),
                (this.sc = this.loop - 1),
                this.ja ? this.Be || this.Yc() : this.b.play())
              : (this.Hf = !1));
        }
      }
    };
    b.prototype.vk = function () {
      var a = this;
      a.Gb = this.g.sa.createBufferSource();
      a.Gb.addEventListener(
        "ended",
        function () {
          a.lm();
        },
        !1
      );
      2 == a.mode || 3 == a.mode || 5 == a.mode
        ? a.Gb.connect(a.Te)
        : a.Gb.connect(a.dd);
    };
    b.prototype.hp = function (a) {
      var c = this,
        b = this.g.sa;
      c.vk();
      this.g.M("createBufferSoundSource()");
      b.decodeAudioData(a, function (a) {
        c.Sf = a;
        c.Gb.buffer = a;
        c.g.M("audio Data decoded");
        c.yj && (c.Yc(), (c.yj = !1));
      });
    };
    b.prototype.Yc = function () {
      var a = this.g.sa,
        c = this.ze;
      this.Sf
        ? (null == this.Gb && (this.vk(), (this.Gb.buffer = this.Sf)),
          (this.Ug = a.currentTime - c),
          (this.ze = 0),
          (this.Be = !0),
          (this.stopped = !1),
          this.Gb.start(0, c),
          this.g.M("buffer Source started"))
        : (this.g.M("bufferSoundPlay() -> no audio buffer -> playWhenReady"),
          (this.yj = !0));
    };
    b.prototype.Ii = function () {
      var a = this.g.sa.currentTime - this.Ug;
      this.Se();
      this.ze = a;
    };
    b.prototype.Se = function () {
      this.Gb &&
        this.Be &&
        ((this.stopped = !0),
        this.Gb.disconnect(),
        this.Gb.stop(0),
        (this.Gb = null));
      this.Ug = this.ze = 0;
      this.Be = !1;
    };
    b.prototype.gn = function () {
      var a = this.g.sa;
      return this.ze ? this.ze : this.Ug ? a.currentTime - this.Ug : 0;
    };
    b.prototype.hn = function (a) {
      this.Se();
      this.ze = a;
      this.Yc();
    };
    b.prototype.addElement = function () {
      var a = -1,
        c = this,
        b = this.g,
        d = this.g.sa;
      try {
        for (var e = !1, p = 0; p < b.N.length; p++)
          b.N[p].id == c.id &&
            ((a = p),
            (null == b.N[p].b && !b.N[p].ja) ||
              b.N[p].url.join() != c.url.join() ||
              b.N[p].loop != c.loop ||
              b.N[p].mode != c.mode ||
              ((e = !0),
              (b.N[p].pan = c.pan),
              (b.N[p].i = c.i),
              (b.N[p].level = c.level),
              (b.N[p].cc = c.cc),
              (b.N[p].xh = c.xh),
              (b.N[p].tb = c.tb),
              (b.N[p].Gf = c.Gf)));
        if (e) b.M("Keep playing " + c.id);
        else {
          if (0 <= a) {
            var t = b.N[a];
            if (null != t.b || t.ja)
              if (d && b.La.enabled)
                b.La.Yg.push(t), 1 != b.B.Oa && 2 != b.B.Oa && b.La.Gk(t);
              else {
                try {
                  t.ja ? t.Ii() : t.b.pause();
                } catch (q) {
                  b.M(q);
                }
                try {
                  t.Gd();
                } catch (q) {
                  b.M(q);
                }
              }
          }
          if (
            d &&
            b.Bd &&
            (2 == this.mode || 3 == this.mode || 5 == this.mode)
          ) {
            if (0 < c.url.length) {
              c.ja = !0;
              c.Pf();
              var g = new XMLHttpRequest();
              g.open("GET", b.kc(c.url[0]), !0);
              g.responseType = "arraybuffer";
              g.onload = function () {
                c.hp(g.response);
              };
              g.send();
              c.wh = !1;
            }
          } else {
            c.b = document.createElement("audio");
            c.b.crossOrigin = b.crossOrigin;
            c.b.setAttribute("class", "ggmedia");
            b.ef && c.b.setAttribute("id", b.ef + c.id);
            for (p = 0; p < c.url.length; p++)
              (e = void 0),
                (e = document.createElement("source")),
                "" != c.url[p] &&
                  "#" != c.url[p] &&
                  ((e.crossOrigin = b.crossOrigin),
                  e.setAttribute("src", b.kc(c.url[p])),
                  c.b.appendChild(e));
            c.b.volume = c.level * b.V;
            0 < c.b.childNodes.length &&
              (b.T.appendChild(c.b),
              c.b.addEventListener(
                "ended",
                function () {
                  c.lm();
                },
                !1
              ),
              d &&
                (c.Pf(),
                (c.wh = !1),
                0 == c.loop &&
                  c.source.mediaElement &&
                  (c.source.mediaElement.loop = !0)));
          }
          1 <= c.loop && (c.sc = c.loop - 1);
          0 <= a ? (b.N[a] = c) : b.N.push(c);
          c.wi();
          -1 != this.g.Qc.indexOf(c.id) ||
            (-1 != this.g.Qc.indexOf("_main") &&
              -1 == this.g.ce.indexOf(c.id)) ||
            ((1 != c.mode && 2 != c.mode && 3 != c.mode && 5 != c.mode) ||
              !(0 <= c.loop) ||
              (d && b.La.enabled) ||
              (c.ja || (c.b.autoplay = !0), (c.autoplay = !0)),
            0 == c.mode && 0 <= c.loop && (c.autoplay = !0));
        }
      } catch (q) {
        this.g.M(q);
      }
    };
    b.prototype.Gd = function () {
      try {
        this.g.M("Remove Snd:" + this.id),
          this.ja || (this.g.T.removeChild(this.b), (this.b = null));
      } catch (a) {
        this.g.M(a);
      }
    };
    b.prototype.Ob = function (a) {
      d.prototype.Ob.call(this, a);
      var c;
      (c = a.getAttributeNode("url")) && this.url.push(c.nodeValue.toString());
      if ((c = a.getAttributeNode("level"))) this.level = Number(c.nodeValue);
      if ((c = a.getAttributeNode("loop"))) this.loop = Number(c.nodeValue);
      if ((c = a.getAttributeNode("mode"))) this.mode = Number(c.nodeValue);
      if ((c = a.getAttributeNode("nodechangekeep")))
        this.Ml = 1 == Number(c.nodeValue);
      if ((c = a.getAttributeNode("field"))) this.xh = Number(c.nodeValue);
      if ((c = a.getAttributeNode("ambientlevel")))
        this.cc = Number(c.nodeValue);
      if ((c = a.getAttributeNode("pansize"))) this.tb = Number(c.nodeValue);
      if ((c = a.getAttributeNode("tiltsize"))) this.Gf = Number(c.nodeValue);
      for (a = a.firstChild; a; )
        "source" == a.nodeName &&
          (c = a.getAttributeNode("url")) &&
          this.url.push(c.nodeValue.toString()),
          (a = a.nextSibling);
    };
    return b;
  })(f);
  m.Vm = h;
  h = (function (d) {
    function b(a) {
      a = d.call(this, a) || this;
      a.poster = "";
      a.wa = 0;
      a.Ea = 0;
      a.kb = 0;
      a.f = 50;
      a.Ua = 0;
      a.rg = !1;
      a.md = !1;
      return a;
    }
    __extends(b, d);
    b.prototype.re = function () {
      (1 != this.Ua && 4 != this.Ua) || this.ng(!this.eb);
      2 == this.Ua && this.g.Rl(this.id);
    };
    b.prototype.ng = function (a) {
      var c = this.g,
        b = c.sa;
      if (1 == this.Ua || 4 == this.Ua)
        if (((this.eb = a), this.g.Fb))
          (c = c.ia) && c.activateSound(this.id, this.eb ? 1 : 0);
        else {
          if (this.eb)
            (this.b.style.pointerEvents = "auto"),
              (this.b.style.cursor = "pointer"),
              (this.b.style.zIndex = (c.jh + 8e4).toString()),
              (this.b.style[this.g.cd] = "all 1s ease 0s"),
              this.g.Ub(this.id) || c.Ae(this.id);
          else {
            this.b.style.pointerEvents = "none";
            this.b.style.cursor = "default";
            this.b.style.zIndex = c.jh.toString();
            this.b.style[this.g.cd] = "all 1s ease 0s";
            this.g.Ub(this.id) && c.ni(this.id);
            this.zj = !0;
            var d = this;
            setTimeout(function () {
              d.zj = !1;
            }, 1e3);
          }
          if (b && (2 == this.mode || 3 == this.mode || 5 == this.mode)) {
            b = b.currentTime;
            var e = this.uc.gain.value,
              p = this.xc.gain.value,
              t = this.vc.gain.value,
              g = this.wc.gain.value;
            this.eb
              ? (this.uc.gain.linearRampToValueAtTime(e, b),
                this.uc.gain.linearRampToValueAtTime(this.level * c.V, b + 1),
                this.xc.gain.linearRampToValueAtTime(p, b),
                this.xc.gain.linearRampToValueAtTime(this.level * c.V, b + 1),
                this.vc.gain.linearRampToValueAtTime(t, b),
                this.vc.gain.linearRampToValueAtTime(0, b + 1),
                this.wc.gain.linearRampToValueAtTime(g, b),
                this.wc.gain.linearRampToValueAtTime(0, b + 1))
              : (this.uc.gain.linearRampToValueAtTime(e, b),
                this.uc.gain.linearRampToValueAtTime(this.Uc, b + 1),
                this.xc.gain.linearRampToValueAtTime(p, b),
                this.xc.gain.linearRampToValueAtTime(this.Vc, b + 1),
                this.vc.gain.linearRampToValueAtTime(t, b),
                this.vc.gain.linearRampToValueAtTime(this.Dc, b + 1),
                this.wc.gain.linearRampToValueAtTime(g, b),
                this.wc.gain.linearRampToValueAtTime(this.Ec, b + 1));
          }
          this.mg = !0;
          this.g.Dm();
        }
      2 == this.Ua && (a ? this.g.Ae(this.id) : this.g.xj(this.id));
    };
    b.prototype.og = function () {
      this.mg = !1;
      this.b.style[this.g.cd] = "none";
    };
    b.prototype.rq = function () {
      0 == this.loop
        ? this.b.play()
        : 0 < this.sc
        ? (this.sc--, (this.b.currentTime = 0), this.b.play())
        : (this.vl = !1);
    };
    b.prototype.Ob = function (a) {
      d.prototype.Ob.call(this, a);
      var c;
      if ((c = a.getAttributeNode("poster"))) this.poster = String(c.nodeValue);
      if ((c = a.getAttributeNode("rotx"))) this.wa = Number(c.nodeValue);
      if ((c = a.getAttributeNode("roty"))) this.Ea = Number(c.nodeValue);
      if ((c = a.getAttributeNode("rotz"))) this.kb = Number(c.nodeValue);
      if ((c = a.getAttributeNode("fov"))) this.f = Number(c.nodeValue);
      if ((c = a.getAttributeNode("width"))) this.Ic = Number(c.nodeValue);
      if ((c = a.getAttributeNode("height"))) this.fd = Number(c.nodeValue);
      this.xd = (c = a.getAttributeNode("stretch")) ? Number(c.nodeValue) : 1;
      if ((c = a.getAttributeNode("clickmode"))) this.Ua = Number(c.nodeValue);
      if ((c = a.getAttributeNode("handcursor")))
        this.rg = 1 == Number(c.nodeValue);
      if ((c = a.getAttributeNode("startmutedmobile")))
        this.pm = 1 == Number(c.nodeValue);
    };
    b.prototype.addElement = function () {
      var a = this,
        c = this.g;
      try {
        a.b = document.createElement("video");
        a.b.setAttribute("class", "ggmedia");
        a.b.crossOrigin = c.crossOrigin;
        a.b.hidden = !0;
        a.b.addEventListener("click", function (a) {
          a.stopPropagation();
        });
        c.ef && a.b.setAttribute("id", c.ef + a.id);
        if (c.eh)
          a.b.setAttribute("playsinline", "playsinline"),
            a.b.setAttribute("style", "display: none; max-width:none;");
        else if (
          (a.b.setAttribute("style", "max-width:none;pointer-events:none;"),
          a.b.setAttribute("playsinline", "playsinline"),
          1 == a.Ua || 4 == a.Ua)
        )
          a.b.addEventListener(
            c.Km(),
            function () {
              a.og();
            },
            !1
          ),
            a.b.addEventListener(
              "transitionend",
              function () {
                a.og();
              },
              !1
            );
        var b = void 0;
        for (b = 0; b < a.url.length; b++) {
          var d = void 0;
          d = document.createElement("source");
          d.crossOrigin = c.crossOrigin;
          d.setAttribute("src", c.kc(a.url[b]));
          a.b.appendChild(d);
        }
        "" != a.poster &&
          ((a.b.poster = c.kc(a.poster)), 0 > a.loop && (a.b.preload = "none"));
        a.b.volume = a.level * c.V;
        1 <= a.loop && (a.sc = a.loop - 1);
        if (
          (1 == a.mode || 2 == a.mode || 3 == a.mode || 5 == a.mode) &&
          0 <= a.loop
        ) {
          a.b.autoplay = !0;
          a.vl = !0;
          this.yi = a.autoplay = !0;
          var e = a.b.play();
          if (void 0 !== e)
            e.then(function () {
              a.Pf();
            })["catch"](function () {
              a.pm && ((a.b.muted = !0), a.b.play());
            });
        } else a.Pf();
        c.I.push(this);
        c.eh
          ? c.T.appendChild(a.b)
          : ((a.b.style.position = "absolute"),
            a.Ic && (a.b.width = a.Ic),
            a.fd && (a.b.height = a.fd),
            c.D.appendChild(a.b));
        a.b.addEventListener(
          "ended",
          function () {
            a.rq();
          },
          !1
        );
      } catch (p) {
        c.M(p);
      }
    };
    b.prototype.registerElement = function (a, c) {
      this.md = !0;
      this.b = c;
      this.id = a;
      this.level = 1;
      this.g.I.push(this);
    };
    b.prototype.Gd = function () {
      var a = this.g;
      a.eh &&
        (a.H.deleteTexture(this.oc), (this.oc = 0), a.T.removeChild(this.b));
      a.Em && a.D.removeChild(this.b);
      this.b = null;
    };
    return b;
  })(h);
  m.gk = h;
  h = (function (d) {
    function b(a) {
      a = d.call(this, a) || this;
      a.url = "";
      a.wa = 0;
      a.Ea = 0;
      a.kb = 0;
      a.f = 50;
      a.Ua = 0;
      a.rg = !1;
      a.Ic = 100;
      a.fd = 100;
      a.xd = 1;
      return a;
    }
    __extends(b, d);
    b.prototype.Ob = function (a) {
      d.prototype.Ob.call(this, a);
      var c;
      if ((c = a.getAttributeNode("url"))) this.url = c.nodeValue.toString();
      if ((c = a.getAttributeNode("rotx"))) this.wa = Number(c.nodeValue);
      if ((c = a.getAttributeNode("roty"))) this.Ea = Number(c.nodeValue);
      if ((c = a.getAttributeNode("rotz"))) this.kb = Number(c.nodeValue);
      if ((c = a.getAttributeNode("fov"))) this.f = Number(c.nodeValue);
      if ((c = a.getAttributeNode("width"))) this.Ic = Number(c.nodeValue);
      if ((c = a.getAttributeNode("height"))) this.fd = Number(c.nodeValue);
      this.xd = (c = a.getAttributeNode("stretch")) ? Number(c.nodeValue) : 1;
      if ((c = a.getAttributeNode("clickmode"))) this.Ua = Number(c.nodeValue);
      if ((c = a.getAttributeNode("handcursor")))
        this.rg = 1 == Number(c.nodeValue);
      for (a = a.firstChild; a; )
        "source" == a.nodeName &&
          (c = a.getAttributeNode("url")) &&
          (this.url = c.nodeValue.toString()),
          (a = a.nextSibling);
    };
    b.prototype.og = function () {
      this.mg = !1;
      this.b.style[this.g.cd] = "none";
    };
    b.prototype.re = function () {
      (1 !== this.Ua && 4 !== this.Ua) || this.ng(!this.eb);
    };
    b.prototype.ng = function (a) {
      var c = this.g;
      if (1 === this.Ua || 4 === this.Ua)
        (this.eb = a),
          this.g.Fb
            ? (a = this.g.ia) && a.activateSound(this.id, this.eb ? 1 : 0)
            : (this.eb
                ? ((this.b.style.pointerEvents = "auto"),
                  (this.b.style.cursor = "pointer"),
                  (this.b.style.zIndex = (c.jh + 8e4).toString()))
                : ((this.b.style.pointerEvents = "none"),
                  (this.b.style.cursor = "default"),
                  (this.b.style.zIndex = c.jh.toString())),
              (this.b.style[c.cd] = "all 1s ease 0s"),
              (this.mg = !0),
              c.ym());
    };
    b.prototype.addElement = function () {
      var a = this,
        c = this.g;
      try {
        a.b = document.createElement("img");
        a.b.setAttribute(
          "style",
          "-webkit-user-drag:none; max-width:none; pointer-events:none;"
        );
        a.b.setAttribute("class", "ggmedia");
        a.b.hidden = !0;
        a.b.addEventListener("click", function (a) {
          a.stopPropagation();
        });
        c.ef && a.b.setAttribute("id", c.ef + a.id);
        a.b.ondragstart = function () {
          return !1;
        };
        if (1 === a.Ua || 4 === a.Ua)
          a.b.addEventListener(
            c.Km(),
            function () {
              a.og();
            },
            !1
          ),
            a.b.addEventListener(
              "transitionend",
              function () {
                a.og();
              },
              !1
            );
        a.b.setAttribute("src", c.kc(a.url));
        a.Ic && (a.b.width = a.Ic);
        a.fd && (a.b.height = a.fd);
        c.Sa.push(a);
        a.b.style.position = "absolute";
        c.D.appendChild(a.b);
      } catch (k) {
        c.M("Error addimage:" + k);
      }
    };
    b.prototype.Gd = function () {
      this.g.D.removeChild(this.b);
      this.b = null;
    };
    return b;
  })(f);
  m.Tm = h;
  f = (function (d) {
    function b(a) {
      a = d.call(this, a) || this;
      a.mk = 50;
      a.alpha = 50;
      a.type = 0;
      a.color = 16777215;
      return a;
    }
    __extends(b, d);
    b.prototype.Ob = function (a) {
      d.prototype.Ob.call(this, a);
      var c;
      if ((c = a.getAttributeNode("blinding"))) this.mk = Number(c.nodeValue);
      if ((c = a.getAttributeNode("alpha"))) this.alpha = Number(c.nodeValue);
      if ((c = a.getAttributeNode("type"))) this.type = Number(c.nodeValue);
      if ((c = a.getAttributeNode("color"))) this.color = Number(c.nodeValue);
    };
    return b;
  })(f);
  m.Um = f;
  f = (function () {
    function d(b) {
      this.type = "empty";
      this.Mj =
        this.id =
        this.target =
        this.description =
        this.title =
        this.url =
          "";
      this.ih = 100;
      this.qg = 20;
      this.Ai = !1;
      this.b = null;
      this.vb = this.Nb = this.nb = this.pa = this.i = this.pan = 0;
      this.visible = !0;
      this.hc = b.A.hc;
      this.ec = b.A.ec;
      this.gc = b.A.gc;
      this.dc = b.A.dc;
      this.bf = b.A.bf;
      this.Mf = [];
    }
    d.prototype.Ye = function () {
      this.id = this.id;
      this.pan = this.pan;
      this.tilt = this.i;
      this.url = this.url;
      this.target = this.target;
      this.title = this.title;
      this.description = this.description;
      this.skinid = this.Mj;
      this.obj = this.b;
    };
    d.prototype.Ob = function (b) {
      var a;
      if ((a = b.getAttributeNode("url"))) this.url = a.nodeValue.toString();
      if ((a = b.getAttributeNode("target")))
        this.target = a.nodeValue.toString();
      if ((a = b.getAttributeNode("title")))
        this.title = a.nodeValue.toString();
      if ((a = b.getAttributeNode("description")))
        this.description = a.nodeValue.toString();
      if ((a = b.getAttributeNode("id"))) this.id = a.nodeValue.toString();
      if ((a = b.getAttributeNode("skinid"))) this.Mj = a.nodeValue.toString();
      if ((a = b.getAttributeNode("width"))) this.ih = Number(a.nodeValue);
      if ((a = b.getAttributeNode("height"))) this.qg = Number(a.nodeValue);
      if ((a = b.getAttributeNode("wordwrap")))
        this.Ai = 1 == Number(a.nodeValue);
      this.pan = (a = b.getAttributeNode("pan")) ? Number(a.nodeValue) : 0;
      this.i = (a = b.getAttributeNode("tilt")) ? Number(a.nodeValue) : 0;
      if ((a = b.getAttributeNode("bordercolor")))
        this.hc = Number(a.nodeValue);
      if ((a = b.getAttributeNode("backgroundcolor")))
        this.ec = Number(a.nodeValue);
      if ((a = b.getAttributeNode("borderalpha")))
        this.gc = Number(a.nodeValue);
      if ((a = b.getAttributeNode("backgroundalpha")))
        this.dc = Number(a.nodeValue);
      if ((a = b.getAttributeNode("handcursor")))
        this.bf = 1 == Number(a.nodeValue);
      for (b = b.firstChild; b; ) {
        if ("polystring" == b.nodeName) {
          a = b.textContent.toString().split("|");
          for (var c = 0; c < a.length; c++) {
            var d = a[c].split("/");
            if (2 == d.length) {
              var l = { pan: 0, i: 0 };
              l.pan = Number(d[0]);
              l.i = Number(d[1]);
              this.Mf.push(l);
            }
          }
        }
        "vertex" == b.nodeName &&
          ((l = { pan: 0, i: 0 }),
          (a = b.getAttributeNode("pan")),
          (l.pan = a ? Number(a.nodeValue) : 0),
          (a = b.getAttributeNode("tilt")),
          (l.i = a ? Number(a.nodeValue) : 0),
          this.Mf.push(l));
        b = b.nextSibling;
      }
      this.Ye();
    };
    return d;
  })();
  m.mh = f;
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  var f = (function () {
    function f(d, b) {
      this.x = d;
      this.y = b;
    }
    f.prototype.Za = function (d, b) {
      this.x = d;
      this.y = b;
    };
    f.prototype.zd = function (d, b, a) {
      var c = b.y - d.y;
      this.x = d.x + (b.x - d.x) * a;
      this.y = d.y + c * a;
    };
    f.prototype.fn = function (d, b, a, c, k) {
      var l = new f();
      l.zd(d, a, k);
      d = new f();
      d.zd(a, c, k);
      a = new f();
      a.zd(c, b, k);
      b = new f();
      b.zd(l, d, k);
      l = new f();
      l.zd(d, a, k);
      d = new f();
      d.zd(b, l, k);
      this.x = d.x;
      this.y = d.y;
    };
    f.prototype.Fi = function (d, b, a, c, k) {
      var l = new f(),
        e = 0.5,
        p = 0.25;
      do {
        l.fn(d, b, a, c, e);
        var t = l.x - k;
        e = 0 < t ? e - p : e + p;
        p /= 2;
      } while (0.01 < Math.abs(t));
      this.x = l.x;
      this.y = l.y;
    };
    return f;
  })();
  m.rc = f;
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  var f = (function () {
    function f(d, b, a, c, k) {
      this.x = d;
      this.y = b;
      this.z = a;
      this.td = c;
      this.Rb = k;
    }
    f.prototype.Za = function (d, b, a) {
      this.x = d;
      this.y = b;
      this.z = a;
      this.Rb = this.td = void 0;
    };
    f.prototype.toString = function () {
      return (
        "(" +
        this.x +
        "," +
        this.y +
        "," +
        this.z +
        ") - (" +
        this.td +
        "," +
        this.Rb +
        ")"
      );
    };
    f.prototype.wa = function (d) {
      var b = Math.sin(d);
      d = Math.cos(d);
      var a = this.y,
        c = this.z;
      this.y = d * a - b * c;
      this.z = b * a + d * c;
    };
    f.prototype.np = function () {
      var d = this.y;
      this.y = -this.z;
      this.z = d;
    };
    f.prototype.mp = function () {
      var d = this.y;
      this.y = this.z;
      this.z = -d;
    };
    f.prototype.Ea = function (d) {
      var b = Math.sin(d);
      d = Math.cos(d);
      var a = this.x,
        c = this.z;
      this.x = d * a + b * c;
      this.z = -b * a + d * c;
    };
    f.prototype.op = function () {
      var d = this.x;
      this.x = -this.z;
      this.z = d;
    };
    f.prototype.kb = function (d) {
      var b = Math.sin(d);
      d = Math.cos(d);
      var a = this.x,
        c = this.y;
      this.x = d * a - b * c;
      this.y = b * a + d * c;
    };
    f.prototype.cm = function () {
      var d = this.x;
      this.x = -this.y;
      this.y = d;
    };
    f.prototype.Hd = function (d) {
      this.wa((d * Math.PI) / 180);
    };
    f.prototype.Ce = function (d) {
      this.Ea((d * Math.PI) / 180);
    };
    f.prototype.De = function (d) {
      this.kb((d * Math.PI) / 180);
    };
    f.prototype.clone = function () {
      return new f(this.x, this.y, this.z, this.td, this.Rb);
    };
    f.prototype.length = function () {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    f.prototype.normalize = function () {
      var d = this.length();
      0 < d && ((d = 1 / d), (this.x *= d), (this.y *= d), (this.z *= d));
    };
    f.prototype.ai = function (d) {
      return this.x * d.x + this.y * d.y + this.z * d.z;
    };
    f.prototype.Kk = function (d, b) {
      var a = Math.cos((b * Math.PI) / 180);
      this.x = a * Math.sin((d * Math.PI) / 180);
      this.y = Math.sin((b * Math.PI) / 180);
      this.z = a * Math.cos((d * Math.PI) / 180);
    };
    f.prototype.bn = function () {
      return (180 * Math.atan2(-this.x, -this.z)) / Math.PI;
    };
    f.prototype.cn = function () {
      return (180 * Math.asin(this.y / this.length())) / Math.PI;
    };
    f.prototype.zd = function (d, b, a) {
      this.x = d.x * a + b.x * (1 - a);
      this.y = d.y * a + b.y * (1 - a);
      this.z = d.z * a + b.z * (1 - a);
      this.td = d.td * a + b.td * (1 - a);
      this.Rb = d.Rb * a + b.Rb * (1 - a);
    };
    return f;
  })();
  m.xa = f;
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  var f = (function () {
    function f() {
      this.gm();
    }
    f.prototype.gm = function () {
      this.Vb = 1;
      this.lc = this.Wb = this.Db = 0;
      this.Xb = 1;
      this.Yb = this.Kb = this.mc = 0;
      this.Lb = 1;
    };
    f.prototype.clone = function (d) {
      this.Vb = d.Vb;
      this.Db = d.Db;
      this.Wb = d.Wb;
      this.lc = d.lc;
      this.Xb = d.Xb;
      this.mc = d.mc;
      this.Kb = d.Kb;
      this.Yb = d.Yb;
      this.Lb = d.Lb;
    };
    f.prototype.Cp = function (d) {
      var b = Math.cos(d);
      d = Math.sin(d);
      this.Vb = 1;
      this.lc = this.Wb = this.Db = 0;
      this.Xb = b;
      this.mc = -d;
      this.Kb = 0;
      this.Yb = d;
      this.Lb = b;
    };
    f.prototype.Dp = function (d) {
      var b = Math.cos(d);
      d = Math.sin(d);
      this.Vb = b;
      this.Db = 0;
      this.Wb = d;
      this.lc = 0;
      this.Xb = 1;
      this.mc = 0;
      this.Kb = -d;
      this.Yb = 0;
      this.Lb = b;
    };
    f.prototype.Ep = function (d) {
      var b = Math.cos(d);
      d = Math.sin(d);
      this.Vb = b;
      this.Db = -d;
      this.Wb = 0;
      this.lc = d;
      this.Xb = b;
      this.Yb = this.Kb = this.mc = 0;
      this.Lb = 1;
    };
    f.prototype.zp = function (d) {
      this.Cp((d * Math.PI) / 180);
    };
    f.prototype.Ap = function (d) {
      this.Dp((d * Math.PI) / 180);
    };
    f.prototype.Bp = function (d) {
      this.Ep((d * Math.PI) / 180);
    };
    f.prototype.Hd = function (d) {
      this.Nc || ((this.Nc = new f()), (this.Td = new f()));
      this.Nc.zp(d);
      this.Td.clone(this);
      this.multiply(this.Nc, this.Td);
    };
    f.prototype.Ce = function (d) {
      this.Nc || ((this.Nc = new f()), (this.Td = new f()));
      this.Nc.Ap(d);
      this.Td.clone(this);
      this.multiply(this.Nc, this.Td);
    };
    f.prototype.De = function (d) {
      this.Nc || ((this.Nc = new f()), (this.Td = new f()));
      this.Nc.Bp(d);
      this.Td.clone(this);
      this.multiply(this.Nc, this.Td);
    };
    f.prototype.multiply = function (d, b) {
      this.Vb = d.Vb * b.Vb + d.Db * b.lc + d.Wb * b.Kb;
      this.Db = d.Vb * b.Db + d.Db * b.Xb + d.Wb * b.Yb;
      this.Wb = d.Vb * b.Wb + d.Db * b.mc + d.Wb * b.Lb;
      this.lc = d.lc * b.Vb + d.Xb * b.lc + d.mc * b.Kb;
      this.Xb = d.lc * b.Db + d.Xb * b.Xb + d.mc * b.Yb;
      this.mc = d.lc * b.Wb + d.Xb * b.mc + d.mc * b.Lb;
      this.Kb = d.Kb * b.Vb + d.Yb * b.lc + d.Lb * b.Kb;
      this.Yb = d.Kb * b.Db + d.Yb * b.Xb + d.Lb * b.Yb;
      this.Lb = d.Kb * b.Wb + d.Yb * b.mc + d.Lb * b.Lb;
    };
    f.prototype.Oo = function (d) {
      var b = d.x;
      var a = d.y;
      var c = d.z;
      d.x = b * this.Vb + a * this.Db + c * this.Wb;
      d.y = b * this.lc + a * this.Xb + c * this.mc;
      d.z = b * this.Kb + a * this.Yb + c * this.Lb;
    };
    return f;
  })();
  m.dk = f;
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  m.$ = {
    create: function (f) {
      var h;
      "undefined" != typeof Float32Array
        ? (h = new Float32Array(16))
        : (h = Array(16));
      f &&
        ((h[0] = f[0]),
        (h[1] = f[1]),
        (h[2] = f[2]),
        (h[3] = f[3]),
        (h[4] = f[4]),
        (h[5] = f[5]),
        (h[6] = f[6]),
        (h[7] = f[7]),
        (h[8] = f[8]),
        (h[9] = f[9]),
        (h[10] = f[10]),
        (h[11] = f[11]),
        (h[12] = f[12]),
        (h[13] = f[13]),
        (h[14] = f[14]),
        (h[15] = f[15]));
      return h;
    },
    set: function (f, h) {
      h[0] = f[0];
      h[1] = f[1];
      h[2] = f[2];
      h[3] = f[3];
      h[4] = f[4];
      h[5] = f[5];
      h[6] = f[6];
      h[7] = f[7];
      h[8] = f[8];
      h[9] = f[9];
      h[10] = f[10];
      h[11] = f[11];
      h[12] = f[12];
      h[13] = f[13];
      h[14] = f[14];
      h[15] = f[15];
      return h;
    },
    te: function (f) {
      f[0] = 1;
      f[1] = 0;
      f[2] = 0;
      f[3] = 0;
      f[4] = 0;
      f[5] = 1;
      f[6] = 0;
      f[7] = 0;
      f[8] = 0;
      f[9] = 0;
      f[10] = 1;
      f[11] = 0;
      f[12] = 0;
      f[13] = 0;
      f[14] = 0;
      f[15] = 1;
      return f;
    },
    multiply: function (f, h, d) {
      d || (d = f);
      var b = f[0],
        a = f[1],
        c = f[2],
        k = f[3],
        l = f[4],
        e = f[5],
        p = f[6],
        t = f[7],
        g = f[8],
        q = f[9],
        n = f[10],
        m = f[11],
        r = f[12],
        v = f[13],
        u = f[14];
      f = f[15];
      var x = h[0],
        A = h[1],
        w = h[2],
        B = h[3],
        z = h[4],
        C = h[5],
        D = h[6],
        E = h[7],
        F = h[8],
        H = h[9],
        I = h[10],
        J = h[11],
        K = h[12],
        L = h[13],
        M = h[14];
      h = h[15];
      d[0] = x * b + A * l + w * g + B * r;
      d[1] = x * a + A * e + w * q + B * v;
      d[2] = x * c + A * p + w * n + B * u;
      d[3] = x * k + A * t + w * m + B * f;
      d[4] = z * b + C * l + D * g + E * r;
      d[5] = z * a + C * e + D * q + E * v;
      d[6] = z * c + C * p + D * n + E * u;
      d[7] = z * k + C * t + D * m + E * f;
      d[8] = F * b + H * l + I * g + J * r;
      d[9] = F * a + H * e + I * q + J * v;
      d[10] = F * c + H * p + I * n + J * u;
      d[11] = F * k + H * t + I * m + J * f;
      d[12] = K * b + L * l + M * g + h * r;
      d[13] = K * a + L * e + M * q + h * v;
      d[14] = K * c + L * p + M * n + h * u;
      d[15] = K * k + L * t + M * m + h * f;
      return d;
    },
    translate: function (f, h, d) {
      var b = h[0],
        a = h[1];
      h = h[2];
      if (!d || f == d)
        return (
          (f[12] = f[0] * b + f[4] * a + f[8] * h + f[12]),
          (f[13] = f[1] * b + f[5] * a + f[9] * h + f[13]),
          (f[14] = f[2] * b + f[6] * a + f[10] * h + f[14]),
          (f[15] = f[3] * b + f[7] * a + f[11] * h + f[15]),
          f
        );
      var c = f[0],
        k = f[1],
        l = f[2],
        e = f[3],
        p = f[4],
        t = f[5],
        g = f[6],
        q = f[7],
        n = f[8],
        m = f[9],
        r = f[10],
        v = f[11];
      d[0] = c;
      d[1] = k;
      d[2] = l;
      d[3] = e;
      d[4] = p;
      d[5] = t;
      d[6] = g;
      d[7] = q;
      d[8] = n;
      d[9] = m;
      d[10] = r;
      d[11] = v;
      d[12] = c * b + p * a + n * h + f[12];
      d[13] = k * b + t * a + m * h + f[13];
      d[14] = l * b + g * a + r * h + f[14];
      d[15] = e * b + q * a + v * h + f[15];
      return d;
    },
    scale: function (f, h, d) {
      var b = h[0],
        a = h[1];
      h = h[2];
      if (!d || f == d)
        return (
          (f[0] *= b),
          (f[1] *= b),
          (f[2] *= b),
          (f[3] *= b),
          (f[4] *= a),
          (f[5] *= a),
          (f[6] *= a),
          (f[7] *= a),
          (f[8] *= h),
          (f[9] *= h),
          (f[10] *= h),
          (f[11] *= h),
          f
        );
      d[0] = f[0] * b;
      d[1] = f[1] * b;
      d[2] = f[2] * b;
      d[3] = f[3] * b;
      d[4] = f[4] * a;
      d[5] = f[5] * a;
      d[6] = f[6] * a;
      d[7] = f[7] * a;
      d[8] = f[8] * h;
      d[9] = f[9] * h;
      d[10] = f[10] * h;
      d[11] = f[11] * h;
      d[12] = f[12];
      d[13] = f[13];
      d[14] = f[14];
      d[15] = f[15];
      return d;
    },
    rotate: function (f, h, d, b) {
      var a = d[0],
        c = d[1];
      d = d[2];
      var k = Math.sqrt(a * a + c * c + d * d);
      if (!k) return null;
      1 != k && ((k = 1 / k), (a *= k), (c *= k), (d *= k));
      var l = Math.sin(h),
        e = Math.cos(h),
        p = 1 - e;
      h = f[0];
      k = f[1];
      var t = f[2],
        g = f[3],
        q = f[4],
        n = f[5],
        m = f[6],
        r = f[7],
        v = f[8],
        u = f[9],
        x = f[10],
        A = f[11],
        w = a * a * p + e,
        B = c * a * p + d * l,
        z = d * a * p - c * l,
        C = a * c * p - d * l,
        D = c * c * p + e,
        E = d * c * p + a * l,
        F = a * d * p + c * l;
      a = c * d * p - a * l;
      c = d * d * p + e;
      b
        ? f != b &&
          ((b[12] = f[12]), (b[13] = f[13]), (b[14] = f[14]), (b[15] = f[15]))
        : (b = f);
      b[0] = h * w + q * B + v * z;
      b[1] = k * w + n * B + u * z;
      b[2] = t * w + m * B + x * z;
      b[3] = g * w + r * B + A * z;
      b[4] = h * C + q * D + v * E;
      b[5] = k * C + n * D + u * E;
      b[6] = t * C + m * D + x * E;
      b[7] = g * C + r * D + A * E;
      b[8] = h * F + q * a + v * c;
      b[9] = k * F + n * a + u * c;
      b[10] = t * F + m * a + x * c;
      b[11] = g * F + r * a + A * c;
      return b;
    },
    En: function (f, h, d, b, a, c, k) {
      k || (k = m.$.create());
      var l = h - f,
        e = b - d,
        p = c - a;
      k[0] = (2 * a) / l;
      k[1] = 0;
      k[2] = 0;
      k[3] = 0;
      k[4] = 0;
      k[5] = (2 * a) / e;
      k[6] = 0;
      k[7] = 0;
      k[8] = (h + f) / l;
      k[9] = (b + d) / e;
      k[10] = -(c + a) / p;
      k[11] = -1;
      k[12] = 0;
      k[13] = 0;
      k[14] = -(c * a * 2) / p;
      k[15] = 0;
      return k;
    },
    perspective: function (f, h, d, b, a) {
      f = d * Math.tan((f * Math.PI) / 360);
      h = f * h;
      return m.$.En(-h, h, -f, f, d, b, a);
    },
    Dq: function (f, h, d, b, a, c, k) {
      k || (k = m.$.create());
      var l = h - f,
        e = b - d,
        p = c - a;
      k[0] = 2 / l;
      k[1] = 0;
      k[2] = 0;
      k[3] = 0;
      k[4] = 0;
      k[5] = 2 / e;
      k[6] = 0;
      k[7] = 0;
      k[8] = 0;
      k[9] = 0;
      k[10] = -2 / p;
      k[11] = 0;
      k[12] = -(f + h) / l;
      k[13] = -(b + d) / e;
      k[14] = -(c + a) / p;
      k[15] = 1;
      return k;
    },
  };
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  var f = (function () {
    function f(d) {
      this.ma = m.$.create();
      this.sb = m.$.create();
      this.gd = 0;
      this.Va = [];
      this.vg = !1;
      this.Qj = this.aj = this.Dj = 1;
      this.Ve = 1e6;
      this.rh = [!1, !1, !1, !1, !1, !1];
      this.mi = !1;
      this.Wi = [];
      this.ek = 8;
      this.Ho = new m.dk();
      this.Qd = [];
      this.g = d;
      if (d.Bd || d.tg) d.Wg = 2;
    }
    f.prototype.sg = function () {
      var d = this.g.H;
      if (d) {
        var b = d.createShader(d.FRAGMENT_SHADER);
        d.shaderSource(
          b,
          "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\n\t\t\t\t\tuniform sampler2D uSampler;\n\t\t\t\t\tvoid main(void) {\n\t\t\t\t\t\tgl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n\t\t\t\t\t}"
        );
        d.compileShader(b);
        d.getShaderParameter(b, d.COMPILE_STATUS) ||
          (console && console.log(d.getShaderInfoLog(b)),
          alert(d.getShaderInfoLog(b)),
          (b = null));
        var a = d.createShader(d.VERTEX_SHADER);
        this.Hc(
          a,
          "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\n\t\t\t\tattribute vec2 aTextureCoord;\n\t\t\t\tuniform mat4 uMVMatrix;\n\t\t\t\tuniform mat4 uPMatrix;\n\t\t\t\tuniform float uZoffset;\n\t\t\t\tvarying vec2 vTextureCoord;\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\t\t\tgl_Position.z += uZoffset;\n\t\t\t\t\tvTextureCoord = aTextureCoord;\n\t\t\t\t}"
        );
        this.F = d.createProgram();
        this.kf(this.F, a, b);
        this.F.Z = d.getAttribLocation(this.F, "aVertexPosition");
        d.enableVertexAttribArray(this.F.Z);
        this.F.Ca = d.getAttribLocation(this.F, "aTextureCoord");
        d.enableVertexAttribArray(this.F.Ca);
        this.F.Vd = d.getUniformLocation(this.F, "uPMatrix");
        this.F.Jg = d.getUniformLocation(this.F, "uMVMatrix");
        this.F.vf = d.getUniformLocation(this.F, "uSampler");
        this.F.Bi = d.getUniformLocation(this.F, "uZoffset");
        b = d.createShader(d.VERTEX_SHADER);
        this.Hc(
          b,
          "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\n\t\t\t\tuniform vec2 uCanvasDimensions;\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tvec2 pointNorm = (aVertexPosition.xy / uCanvasDimensions) * 2.0 - vec2(1.0, 1.0);\n\t\t\t\t\tgl_Position = vec4(pointNorm.x, pointNorm.y * -1.0, 0.0, 1.0);\n\t\t\t\t}"
        );
        a = d.createShader(d.FRAGMENT_SHADER);
        this.Hc(
          a,
          "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform vec3 uColor;\n\t\t\t\tuniform float uAlpha;\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tgl_FragColor = vec4(uColor, uAlpha);\n\t\t\t\t}"
        );
        this.Ed = d.createProgram();
        this.kf(this.Ed, b, a);
        this.Ed.Z = d.getAttribLocation(this.Ed, "aVertexPosition");
        d.enableVertexAttribArray(this.Ed.Z);
        a = d.createShader(d.VERTEX_SHADER);
        this.Hc(
          a,
          "precision highp float;\n\t\t\t\tattribute vec3 aVertexPosition;\n\t\t\t\tvarying vec2 vTextureCoord;\n\t\t\t\tuniform vec2 uCanvasDimensions;\n\t\t\t\tuniform vec4 uRect;\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tvec2 pos = vec2(uRect.x + uRect.z*aVertexPosition.x,uRect.y + uRect.w*aVertexPosition.y);\n\t\t\t\t\tvec2 pointNorm = (pos / uCanvasDimensions) * 2.0 - vec2(1.0, 1.0);\n\t\t\t\t\tgl_Position = vec4(pointNorm.x, pointNorm.y * -1.0, 1.0, 1.0);\n\t\t\t\t\tvTextureCoord.s=aVertexPosition.x;\n\t\t\t\t\tvTextureCoord.t=1.0-aVertexPosition.y;\n\t\t\t\t}"
        );
        b = d.createShader(d.FRAGMENT_SHADER);
        this.Hc(
          b,
          "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\n\t\t\t\tuniform sampler2D uSampler;\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tgl_FragColor = texture2D(uSampler,vTextureCoord);\n\t\t\t\t}"
        );
        this.eg = d.createProgram();
        this.kf(this.eg, a, b);
      }
    };
    f.prototype.Gh = function () {
      var d = this.g,
        b = d.H;
      if (b) {
        var a = b.createShader(b.FRAGMENT_SHADER);
        var c = this.fj(13);
        this.Hc(a, c);
        c = b.createShader(b.VERTEX_SHADER);
        this.Hc(
          c,
          "precision highp float;\nattribute vec3 aVertexPosition;\nuniform vec2 uCanvasDimensions;\nvarying vec2 dst;\nuniform vec2 dstSize;\nuniform float zOffset;\nvoid main(void) {\n vec2 pointNorm = (aVertexPosition.xy / uCanvasDimensions) * 2.0 - vec2(1.0, 1.0);\n gl_Position = vec4(pointNorm.x, pointNorm.y * -1.0, zOffset, 1.0);\n dst.x= -1.0 + 2.0*((aVertexPosition.x + 0.5) / uCanvasDimensions.x);\n dst.y= (-1.0 * uCanvasDimensions.y + 2.0*(aVertexPosition.y + 0.5)) / uCanvasDimensions.x;\n}\n"
        );
        this.Xl = b.createProgram();
        this.kf(this.Xl, c, a);
        a = b.createShader(b.FRAGMENT_SHADER);
        c = this.fj(4);
        this.Hc(a, c);
        c = b.createShader(b.VERTEX_SHADER);
        this.Hc(
          c,
          "precision highp float;\nattribute vec3 aVertexPosition;\nuniform vec2 uCanvasDimensions;\nvarying vec2 dst;\nuniform vec2 dstSize;\nuniform float zOffset;\nvoid main(void) {\n vec2 pointNorm = (aVertexPosition.xy / uCanvasDimensions) * 2.0 - vec2(1.0, 1.0);\n gl_Position = vec4(pointNorm.x, pointNorm.y * -1.0, zOffset, 1.0);\n dst.x= -1.0 + 2.0*((aVertexPosition.x + 0.5) / uCanvasDimensions.x);\n dst.y= (-1.0 * uCanvasDimensions.y + 2.0*(aVertexPosition.y + 0.5)) / uCanvasDimensions.x;\n}\n"
        );
        this.Yl = b.createProgram();
        this.kf(this.Yl, c, a);
        a = b.createShader(b.FRAGMENT_SHADER);
        c = this.fj(d.s.format);
        this.Hc(a, c);
        c = b.createShader(b.VERTEX_SHADER);
        this.Hc(
          c,
          "precision highp float;\nattribute vec3 aVertexPosition;\nuniform vec2 uCanvasDimensions;\nvarying vec2 dst;\nuniform vec2 dstSize;\nvoid main(void) {\n vec2 pointNorm = (aVertexPosition.xy / uCanvasDimensions) * 2.0 - vec2(1.0, 1.0);\n gl_Position = vec4(pointNorm.x, pointNorm.y * -1.0, 0.0, 1.0);\n dst.x= -1.0 + 2.0*((aVertexPosition.x + 0.5) / uCanvasDimensions.x);\n dst.y= (-1.0 * uCanvasDimensions.y + 2.0*(aVertexPosition.y + 0.5)) / uCanvasDimensions.x;\n}\n"
        );
        this.Zl = b.createProgram();
        this.kf(this.Zl, c, a);
        this.ci || (this.ci = b.createBuffer());
      } else this.g.M("No WebGL to initRemapShader!");
    };
    f.prototype.Hc = function (d, b) {
      var a = this.g.H;
      a.shaderSource(d, b);
      a.compileShader(d);
      a.getShaderParameter(d, a.COMPILE_STATUS) ||
        (console && console.log(a.getShaderInfoLog(d)),
        W && alert(a.getShaderInfoLog(d)));
    };
    f.prototype.kf = function (d, b, a) {
      var c = this.g.H;
      c.attachShader(d, b);
      c.attachShader(d, a);
      c.linkProgram(d);
      c.getProgramParameter(d, c.LINK_STATUS) ||
        (alert("Could not initialise shader program"),
        console && console.log(c.getError()));
      c.useProgram(d);
    };
    f.prototype.fj = function (d) {
      var b = this.g;
      var a =
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define M_PI 3.14159265358979323846\nvarying vec2 dst;\nuniform vec2 srcScale;\nuniform vec2 srcOffset;\nuniform float rectDstDistance;\nuniform float fisheyeDistance;\nuniform float stereoDistance;\nuniform float directionBlend;\nuniform mat4 matRotate; // = mat4( 1.0,0.0,0.0,0.0, 0.0,1.0,0.0,0.0, 0.0,0.0,1.0,0.0, 0.0,0.0,0.0,1.0 );\nconst float rectSrcDistance = 1.0;\nuniform vec2 tonemap;\n";
      a =
        (13 == d
          ? a + "uniform samplerCube cubeTexture;"
          : a + "uniform sampler2D tileTexture;\n") + "void main()\n{\n";
      a += "vec4 direction;\n";
      a += "vec2 src;\n";
      a += "vec2 srcCord;\n";
      a += "vec2 texc;\n";
      var c = this.cl(b.ra());
      b.ra() != b.nc && 0 != b.nc
        ? ((b = this.cl(b.nc)),
          (a += "vec4 direction1,direction2;\n"),
          (a += c.replace("direction=", "direction1=")),
          (a += b.replace("direction=", "direction2=")),
          (a +=
            "direction=normalize(mix(direction1, direction2,1.0-directionBlend));\n"))
        : (a += c);
      a += "direction=direction*matRotate;\n";
      13 == d &&
        ((a += "direction.z=-direction.z;"),
        (a += "gl_FragColor = textureCube(cubeTexture, direction.xyz);"));
      4 == d &&
        ((a += "float iz=1.0/(direction.z * rectSrcDistance);\n"),
        (a += "src.x=-direction.x*iz;\n"),
        (a += "src.y= direction.y*iz;\n"),
        (a += "texc=src * srcScale + srcOffset;\n"),
        (a += "if ("),
        (a += "(direction.z<0.0) && "),
        (a +=
          "(texc.x>=0.0) && (texc.x<=1.0) && (texc.y>=0.0) && (texc.y<=1.0)) {\n"),
        (a += "  gl_FragColor = texture2D(tileTexture, texc);\n"),
        (a += "} else {\n"),
        (a += "  discard;\n"),
        (a += "}\n"));
      1 == d &&
        ((a += "src.x=atan(float(-direction.x), float(-direction.z));"),
        (a += "src.y=asin(direction.y);\n"),
        (a += "texc=src * srcScale + srcOffset;\n"),
        (a += "gl_FragColor = texture2D(tileTexture, texc);\n"));
      14 == d &&
        ((a += "vec2 cf;\n"),
        (a +=
          "if ((direction.z<0.0) && (direction.z<=-abs(direction.x)) && (direction.z<=-abs(direction.y))) {\n"),
        (a += "  src.x=-direction.x/direction.z;\n"),
        (a += "  src.y=+direction.y/direction.z;\n"),
        (a += "  cf.x=1.0;cf.y=3.0;\n"),
        (a += "}\n"),
        (a +=
          "if ((direction.x>=0.0) && (direction.x>=abs(direction.y)) && (direction.x>=abs(direction.z))) {\n"),
        (a += "  src.x=+direction.z/direction.x;\n"),
        (a += "  src.y=-direction.y/direction.x;\n"),
        (a += "  cf.x=3.0;cf.y=3.0;\n"),
        (a += "}\n"),
        (a +=
          "if ((direction.z>=0.0) && (direction.z>=abs(direction.x)) && (direction.z>=abs(direction.y))) {\n"),
        (a += "  src.x=-direction.x/direction.z;\n"),
        (a += "  src.y=-direction.y/direction.z;\n"),
        (a += "  cf.x=5.0;cf.y=3.0;\n"),
        (a += "}\n"),
        (a +=
          "if ((direction.x<=0.0) && (direction.x<=-abs(direction.y)) && (direction.x<=-abs(direction.z))) {\n"),
        (a += "  src.x=+direction.z/direction.x;\n"),
        (a += "  src.y=+direction.y/direction.x;\n"),
        (a += "  cf.x=1.0;cf.y=1.0;\n"),
        (a += "}\n"),
        (a +=
          "if ((direction.y>=0.0) && (direction.y>=abs(direction.x)) && (direction.y>=abs(direction.z))) {\n"),
        (a += "  src.x=+direction.x/direction.y;\n"),
        (a += "  src.y=-direction.z/direction.y;\n"),
        (a += "  cf.x=5.0;cf.y=1.0;\n"),
        (a += "}\n"),
        (a +=
          "if ((direction.y<=0.0) && (direction.y<=-abs(direction.x)) && (direction.y<=-abs(direction.z))) {\n"),
        (a += "  src.x=-direction.x/direction.y;\n"),
        (a += "  src.y=-direction.z/direction.y;\n"),
        (a += "  cf.x=3.0;cf.y=1.0;\n"),
        (a += "}\n"),
        (a += "texc.x=(cf.x+src.x*srcScale.x) / 6.0;\n"),
        (a += "texc.y=(cf.y+src.y*srcScale.y) / 4.0;\n"),
        (a += "gl_FragColor = texture2D(tileTexture, texc);\n"));
      return (a += "}\n");
    };
    f.prototype.cl = function (d) {
      var b = "";
      switch (d) {
        case 4:
          b +=
            "direction.x=dst.x*rectDstDistance;\ndirection.y=dst.y*rectDstDistance;\ndirection.z=-1.0;\n";
          break;
        case 12:
          b +=
            "float r,ph,ro;\nr=length(dst.xy)*0.5;\nro=atan(float(dst.x),float(-dst.y));\nph=r / fisheyeDistance;\ndirection.x= sin(ph) * sin(ro);\ndirection.y=-sin(ph) * cos(ro);\ndirection.z=-cos(ph);\n";
          break;
        case 9:
          b +=
            "float n;\nvec2 ind;\nind=dst*stereoDistance;\nn=1.0 + ind.x*ind.x + ind.y*ind.y;\ndirection.x=2.0*ind.x/n;\ndirection.y=2.0*ind.y/n;\ndirection.z=(n-2.0)/n;\n";
      }
      return b + "direction.w=0.0;\ndirection=normalize(direction);\n";
    };
    f.prototype.nl = function (d) {
      var b,
        a,
        c = this.g,
        k = this.g.H;
      this.Ri = k.createBuffer();
      k.bindBuffer(k.ARRAY_BUFFER, this.Ri);
      var l = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
      for (b = 0; 12 > b; b++) 2 > b % 3 && (l[b] *= d);
      k.bufferData(k.ARRAY_BUFFER, new Float32Array(l), k.STATIC_DRAW);
      this.je = k.createBuffer();
      k.bindBuffer(k.ARRAY_BUFFER, this.je);
      var e = [1, 0, 0, 0, 0, 1, 1, 1];
      k.bufferData(k.ARRAY_BUFFER, new Float32Array(e), k.STATIC_DRAW);
      this.$c = k.createBuffer();
      k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, this.$c);
      var p = [0, 1, 2, 0, 2, 3];
      k.bufferData(k.ELEMENT_ARRAY_BUFFER, new Uint16Array(p), k.STATIC_DRAW);
      l = [];
      p = [];
      e = [];
      var f = new m.xa();
      for (d = 0; 6 > d; d++) {
        var g = d % 3;
        var q = 3 > d ? 1 : 0;
        for (a = 0; 4 > a; a++) {
          f.x = -1;
          f.y = -1;
          f.z = 1;
          for (b = 0; b < a; b++) f.cm();
          e.push(
            (0 > f.x ? 0.33 : 0) + 0.33 * g,
            (0 > f.y ? 0 : 0.5) + 0.5 * q
          );
          if (4 > d) for (b = 0; b < d; b++) f.op();
          else 5 == d ? f.np() : f.mp();
          l.push(f.x, f.y, f.z);
        }
        b = 4 * d;
        p.push(b, 1 + b, 2 + b, b, 2 + b, 3 + b);
      }
      c.s.$j = k.createBuffer();
      k.bindBuffer(k.ARRAY_BUFFER, c.s.$j);
      k.bufferData(k.ARRAY_BUFFER, new Float32Array(l), k.STATIC_DRAW);
      c.s.oi = k.createBuffer();
      k.bindBuffer(k.ARRAY_BUFFER, c.s.oi);
      k.bufferData(k.ARRAY_BUFFER, new Float32Array(e), k.STATIC_DRAW);
      c.s.kj = k.createBuffer();
      k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, c.s.kj);
      k.bufferData(k.ELEMENT_ARRAY_BUFFER, new Uint16Array(p), k.STATIC_DRAW);
      this.zo = k.createBuffer();
      this.yo = k.createBuffer();
    };
    f.prototype.gj = function (d) {
      var b = this;
      return function () {
        try {
          if (d.So) return;
          var a = b.g.H;
          a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, 1);
          var c = !1;
          null != d.ve && d.ve.complete
            ? d.il ||
              (a.bindTexture(a.TEXTURE_2D, d),
              a.texImage2D(
                a.TEXTURE_2D,
                0,
                a.RGBA,
                a.RGBA,
                a.UNSIGNED_BYTE,
                d.ve
              ),
              (c = d.il = !0))
            : null != d.pf &&
              d.pf.complete &&
              (a.bindTexture(a.TEXTURE_2D, d),
              a.texImage2D(
                a.TEXTURE_2D,
                0,
                a.RGBA,
                a.RGBA,
                a.UNSIGNED_BYTE,
                d.pf
              ),
              (c = !0));
          c && (d.loaded = !0);
          a.bindTexture(a.TEXTURE_2D, null);
          a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, 0);
        } catch (k) {
          b.g.M(k);
        }
        b.g.update(2);
      };
    };
    f.prototype.ol = function () {
      var d = this.g,
        b = d.H;
      if (this.Va) for (; 0 < this.Va.length; ) b.deleteTexture(this.Va.pop());
      this.Va = [];
      for (var a = 0; 6 > a; a++) {
        var c = b.createTexture();
        this.gd++;
        c.pf = null;
        c.ve = null;
        c.il = !1;
        b.bindTexture(b.TEXTURE_2D, c);
        b.texImage2D(
          b.TEXTURE_2D,
          0,
          b.RGB,
          1,
          1,
          0,
          b.RGB,
          b.UNSIGNED_BYTE,
          null
        );
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
        if (d.We[a]) {
          var k = new Image();
          k.crossOrigin = d.crossOrigin;
          k.src = d.kc(d.We[a]);
          c.pf = k;
          k.addEventListener && k.addEventListener("load", this.gj(c), !1);
          d.Sb.push(k);
        }
        this.Va.push(c);
      }
      for (a = 0; 6 > a; a++)
        d.sh[a] &&
          ((k = new Image()),
          (k.crossOrigin = d.crossOrigin),
          (k.src = d.kc(d.sh[a])),
          k.addEventListener
            ? k.addEventListener("load", this.gj(this.Va[a]), !1)
            : (k.onload = this.gj(this.Va[a])),
          (this.Va[a].ve = k),
          d.Sb.push(k));
      for (a = 0; a < d.I.length; a++)
        d.I[a].md ||
          ((d.I[a].oc = b.createTexture()),
          d.gd++,
          b.bindTexture(b.TEXTURE_2D, d.I[a].oc),
          b.texImage2D(
            b.TEXTURE_2D,
            0,
            b.RGB,
            1,
            1,
            0,
            b.RGB,
            b.UNSIGNED_BYTE,
            null
          ),
          b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR),
          b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE),
          b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE));
      d.s.oc = b.createTexture();
      d.gd++;
      b.bindTexture(b.TEXTURE_2D, d.s.oc);
      b.texImage2D(
        b.TEXTURE_2D,
        0,
        b.RGB,
        1,
        1,
        0,
        b.RGB,
        b.UNSIGNED_BYTE,
        null
      );
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
      b.bindTexture(b.TEXTURE_2D, null);
    };
    f.prototype.xq = function () {
      var d = this.g;
      if (d.o.width != d.D.offsetWidth || d.o.height != d.D.offsetHeight)
        (d.o.width = d.D.offsetWidth), (d.o.height = d.D.offsetHeight);
      d.ne && (d.Jc(0), d.Sc());
      if (d.H) {
        var b = d.H;
        this.ui();
        b.clear(b.DEPTH_BUFFER_BIT);
        b.useProgram(this.F);
        this.Cf(0);
        b.uniform1i(this.F.vf, 0);
        b.enableVertexAttribArray(this.F.Z);
        b.enableVertexAttribArray(this.F.Ca);
        b.bindBuffer(b.ARRAY_BUFFER, this.je);
        b.vertexAttribPointer(this.F.Ca, 2, b.FLOAT, !1, 0, 0);
        b.activeTexture(b.TEXTURE0);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.$c);
        b.uniform1f(this.F.Bi, 1e-4);
        b.vertexAttribPointer(this.F.Z, 3, b.FLOAT, !1, 0, 0);
        m.$.te(this.sb);
        m.$.perspective(d.Jb(), d.rb.width / d.rb.height, 0.1, 100, this.sb);
        b.uniformMatrix4fv(this.F.Vd, !1, this.sb);
        for (d = 0; 6 > d; d++)
          this.Cf(d),
            b.bindBuffer(b.ARRAY_BUFFER, this.Ri),
            b.vertexAttribPointer(this.F.Z, 3, b.FLOAT, !1, 0, 0),
            b.bindBuffer(b.ARRAY_BUFFER, this.je),
            b.vertexAttribPointer(this.F.Ca, 2, b.FLOAT, !1, 0, 0),
            6 <= this.Va.length &&
              this.Va[d].loaded &&
              (b.activeTexture(b.TEXTURE0),
              b.bindTexture(b.TEXTURE_2D, this.Va[d]),
              b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.$c),
              b.uniform1i(this.F.vf, 0),
              b.uniformMatrix4fv(this.F.Jg, !1, this.ma),
              b.uniformMatrix4fv(this.F.Vd, !1, this.sb),
              b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
      }
    };
    f.prototype.ui = function () {
      var d = this.g;
      if (d.h.rf && 6 < d.h.rf.length) {
        var b = parseInt(d.h.rf);
        d.H.clearColor(
          ((b >> 16) & 255) / 255,
          ((b >> 8) & 255) / 255,
          ((b >> 0) & 255) / 255,
          1
        );
      }
    };
    f.prototype.Cf = function (d, b) {
      void 0 === b && (b = 1);
      var a = this.g;
      m.$.te(this.ma);
      m.$.rotate(this.ma, (b * -a.O.c * Math.PI) / 180, [0, 0, 1]);
      m.$.rotate(this.ma, (b * -a.i.c * Math.PI) / 180, [1, 0, 0]);
      -1 == b
        ? m.$.rotate(this.ma, (-a.pan.c * Math.PI) / 180, [0, 1, 0])
        : m.$.rotate(this.ma, ((180 - a.pan.c) * Math.PI) / 180, [0, 1, 0]);
      a.$a &&
        (m.$.rotate(this.ma, (-a.$a.pitch * Math.PI) / 180, [1, 0, 0]),
        m.$.rotate(this.ma, (a.$a.O * Math.PI) / 180, [0, 0, 1]));
      4 > d
        ? m.$.rotate(this.ma, (-Math.PI / 2) * d, [0, 1, 0])
        : m.$.rotate(this.ma, (Math.PI / 2) * (5 == d ? 1 : -1), [1, 0, 0]);
    };
    f.prototype.$p = function (d) {
      var b = this;
      return function () {
        b.Wi.push(d);
      };
    };
    f.prototype.wn = function (d) {
      this.g.Da = !0;
      this.g.ad = !0;
      d.loaded = !0;
      d.Ej = 0;
      d.Xd = 0;
      var b = this.g.H;
      this.Bk();
      b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, 1);
      if (null != d.h && d.h.complete) {
        d.gb = b.createTexture();
        this.g.gd++;
        b.bindTexture(b.TEXTURE_2D, d.gb);
        try {
          b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, d.h);
        } catch (a) {
          b.texImage2D(
            b.TEXTURE_2D,
            0,
            b.RGBA,
            1,
            1,
            0,
            b.RGBA,
            b.UNSIGNED_BYTE,
            new Uint8Array([128, 128, 128, 250])
          ),
            this.g.M(a);
        }
      }
      this.g.update(2);
    };
    f.prototype.Bk = function () {
      this.g.Qb && this.g.Qb--;
    };
    f.prototype.xn = function () {
      if (0 < this.Wi.length) {
        var d = this.Wi.shift();
        this.wn(d);
      }
    };
    f.prototype.Po = function (d) {
      var b = this;
      return function () {
        b.g.Da = !0;
        b.g.ad = !0;
        var a = b.g.h;
        try {
          if (null != d && d.complete) {
            var c = a.J[a.J.length - 1],
              k = a.Ja;
            c.height = c.width = d.width - 2 * k;
            c.L = c.fa = 1;
            for (var l = 0; 6 > l; l++) {
              var e = new m.Kd();
              e.K = document.createElement("canvas");
              b.g.Y
                ? ((e.K.width = c.width + 2 * k),
                  (e.K.height = c.height + 2 * k))
                : ((e.K.width = a.G + 2 * k), (e.K.height = a.G + 2 * k));
              e.Pa = e.K.getContext("2d");
              e.K.style[b.g.Ra + "Origin"] = "0% 0%";
              e.K.style.overflow = "hidden";
              e.K.style.position = "absolute";
              e.h = d;
              var p = c.width + 2 * k,
                f = c.height + 2 * k;
              e.Pa && e.Pa.drawImage(d, 0, l * f, p, f, 0, 0, p, f);
              if (b.g.Y && b.g.H) {
                var g = b.g.H;
                g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, 1);
                e.gb = g.createTexture();
                b.g.gd++;
                g.bindTexture(g.TEXTURE_2D, e.gb);
                try {
                  g.texImage2D(
                    g.TEXTURE_2D,
                    0,
                    g.RGBA,
                    g.RGBA,
                    g.UNSIGNED_BYTE,
                    e.K
                  );
                } catch (q) {
                  b.g.M(q);
                }
                g.bindTexture(g.TEXTURE_2D, null);
                g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, 0);
              }
              b.g.Tc &&
                ((e.K.Sd = -1), b.g.D.insertBefore(e.K, b.g.D.firstChild));
              c.U[l] = e;
            }
            c.loaded = !0;
          }
        } catch (q) {
          b.g.M(q);
        }
        b.g.update(2);
      };
    };
    f.prototype.um = function (d) {
      var b = this;
      return function () {
        b.g.Da = !0;
        b.g.ad = !0;
        b.Bk();
        d.h = null;
      };
    };
    f.prototype.vq = function () {
      var d = this.g,
        b = d.h,
        a = d.h.J;
      d.ne && (d.Jc(0), d.Sc());
      if (d.H) {
        var c = d.H;
        c.useProgram(this.F);
        this.ui();
        c.clear(c.DEPTH_BUFFER_BIT);
        c.enable(c.DEPTH_TEST);
        m.$.te(this.sb);
        m.$.perspective(d.Jb(), d.rb.width / d.rb.height, 0.1, 100, this.sb);
        c.uniformMatrix4fv(this.F.Vd, !1, this.sb);
        d.Am();
        d.rj();
        var k = d.Zi();
        var l = a.length - 1;
        for (d.pc = 0; l >= k; ) {
          var e = a[l],
            p = 1;
          l == a.length - 1 && 0 == b.Ja && (p = b.G / (b.G - 0.5));
          for (var f = 0; 6 > f; f++) {
            var g = d.ob.cb[f];
            var q = g.mf;
            if ((g.fb && 0 < q.Lf && 0 < q.hh && 0 < q.scale) || e.cache) {
              g.Da = !1;
              g.Re[l] || (g.Re[l] = { Ya: 0, zb: 0, Bb: 0, Cb: 0 });
              var n = g.Re[l];
              e.cache
                ? ((n.Ya = 0), (n.zb = 0), (n.Bb = e.L - 1), (n.Cb = e.fa - 1))
                : d.dl(e, q, n);
              q = !0;
              for (var h = n.zb; h <= n.Cb; h++)
                for (var r = n.Ya; r <= n.Bb; r++) {
                  var v = r + h * e.L + f * e.L * e.fa,
                    u = e.U[v];
                  u || (u = e.U[v] = new m.Kd());
                  this.vh()
                    ? u.h ||
                      (u.Xd
                        ? u.Xd--
                        : (this.Ph(u, e, d.He(f, l, r, h)), (d.Da = !0)))
                    : d.pc++;
                  if (u.gb) {
                    if (!u.af) {
                      v = 0.5 * l + 1;
                      u.af = c.createBuffer();
                      c.bindBuffer(c.ARRAY_BUFFER, u.af);
                      var x = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
                      x[3] = r * b.G - b.Ja;
                      x[0] = Math.min((r + 1) * b.G, e.width) + b.Ja;
                      x[7] = h * b.G - b.Ja;
                      x[1] = Math.min((h + 1) * b.G, e.height) + b.Ja;
                      x[4] = x[1];
                      x[6] = x[3];
                      x[9] = x[0];
                      x[10] = x[7];
                      for (var A = 0; 12 > A; A++)
                        x[A] =
                          0 == A % 3
                            ? p * v * ((-2 * x[A]) / e.width + 1)
                            : 1 == A % 3
                            ? p * v * ((-2 * x[A]) / e.height + 1)
                            : v;
                      c.bufferData(
                        c.ARRAY_BUFFER,
                        new Float32Array(x),
                        c.STATIC_DRAW
                      );
                    }
                  } else q = !1;
                  u.visible = g.fb;
                }
              n.pj = q;
            }
          }
          l--;
        }
        for (f = 0; 6 > f; f++)
          if (((g = d.ob.cb[f]), g.fb))
            for (
              q = g.mf,
                this.Cf(f),
                c.uniform1i(this.F.vf, 0),
                c.uniformMatrix4fv(this.F.Vd, !1, this.sb),
                c.uniformMatrix4fv(this.F.Jg, !1, this.ma),
                c.enableVertexAttribArray(this.F.Z),
                c.enableVertexAttribArray(this.F.Ca),
                c.bindBuffer(c.ARRAY_BUFFER, this.je),
                c.vertexAttribPointer(this.F.Ca, 2, c.FLOAT, !1, 0, 0),
                c.activeTexture(c.TEXTURE0),
                c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, this.$c),
                c.useProgram(this.F),
                l = k;
              l <= a.length - 1;

            ) {
              e = a[l];
              if (g.fb && 0 < q.Lf && g.Re[l] && 0 <= g.Re[l].Ya) {
                n = g.Re[l];
                for (h = n.zb; h <= n.Cb; h++)
                  for (r = n.Ya; r <= n.Bb; r++)
                    (v = r + h * e.L + f * e.L * e.fa),
                      (u = e.U[v]) &&
                        u.gb &&
                        (c.uniform1f(this.F.Bi, 1e-4 * ((r % 2) + (h % 2) * 2)),
                        c.bindBuffer(c.ARRAY_BUFFER, u.af),
                        c.vertexAttribPointer(this.F.Z, 3, c.FLOAT, !1, 0, 0),
                        c.bindTexture(c.TEXTURE_2D, u.gb),
                        c.texParameteri(
                          c.TEXTURE_2D,
                          c.TEXTURE_MAG_FILTER,
                          c.LINEAR
                        ),
                        c.texParameteri(
                          c.TEXTURE_2D,
                          c.TEXTURE_MIN_FILTER,
                          c.LINEAR
                        ),
                        c.texParameteri(
                          c.TEXTURE_2D,
                          c.TEXTURE_WRAP_S,
                          c.CLAMP_TO_EDGE
                        ),
                        c.texParameteri(
                          c.TEXTURE_2D,
                          c.TEXTURE_WRAP_T,
                          c.CLAMP_TO_EDGE
                        ),
                        c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0)),
                      (u.visible = g.fb);
                n.pj && (l = a.length);
              }
              l++;
            }
        this.Fj();
        d.ad = !1;
      }
    };
    f.prototype.vh = function () {
      return this.g.Qb < this.g.Wg;
    };
    f.prototype.Ph = function (d, b, a) {
      var c = this.g;
      c.jj++;
      d.h = new Image();
      d.Ej++;
      d.Xd = 1 << d.Ej;
      d.h.onload = this.$p(d);
      d.h.onerror = this.um(d);
      d.h.onabort = this.um(d);
      d.h.crossOrigin = c.crossOrigin;
      d.h.setAttribute("src", a);
      c.M("load " + a);
      b.cache && c.Sb.push(d.h);
      c.Qb++;
    };
    f.prototype.Jm = function () {
      var d = this.g,
        b = d.h;
      d.ne && (d.Jc(0), d.Sc());
      if (d.H) {
        var a = d.H;
        this.ui();
        W && a.clearColor(0.2, 0, 0, 1);
        a.clear(a.DEPTH_BUFFER_BIT);
        a.disable(a.DEPTH_TEST);
        a.disable(a.CULL_FACE);
        a.bindBuffer(a.ARRAY_BUFFER, this.ci);
        var c = [0, 0];
        c[2] = d.o.width;
        c[3] = 0;
        c[4] = d.o.width;
        c[5] = d.o.height;
        c[6] = 0;
        c[7] = d.o.height;
        a.bufferData(a.ARRAY_BUFFER, new Float32Array(c), a.STATIC_DRAW);
        this.g.pc = 0;
        if (!this.yc || this.vg) 0 < b.J.length ? this.un() : this.vn();
        d.s.jd
          ? this.Zo()
          : (a.enable(a.DEPTH_TEST),
            a.depthRange(0, 1),
            a.depthFunc(a.LESS),
            (this.mi = !1),
            0 < b.J.length && this.wq(),
            this.yc && !this.mi && this.Yo());
      }
    };
    f.prototype.Mp = function (d, b, a, c, k, l, e) {
      var p = this.g,
        f = p.h,
        g = p.o,
        q = (a * f.G) / b.width,
        n = ((a + 1) * f.G) / b.width;
      a = (c * f.G) / b.height;
      b = ((c + 1) * f.G) / b.height;
      1 < n && ((k *= 2), (n = 1));
      1 < b && ((k *= 2), (b = 1));
      k = Math.min(this.ek, k);
      n = (n - q) / k;
      var h = (b - a) / k;
      c = b = 0;
      f = { x: 0, y: 0 };
      var r = { x: 0, y: 0 },
        v = 0;
      d.Eh = 0;
      var u = p.Kg,
        x = new m.xa(),
        A = this.Ho;
      A.gm();
      4 > l ? A.Ce(-90 * l) : A.Hd(5 == l ? 90 : -90);
      p.$a && (A.De(p.$a.O), A.Hd(-p.$a.pitch));
      A.Ce(-p.pan.c);
      A.Hd(p.i.c);
      A.De(p.O.c);
      for (l = 0; l <= k; l++)
        for (var w = 0; w <= k; w++) {
          var B = 2 * (q + w * n) - 1;
          var z = 2 * (a + l * h) - 1;
          x.x = 1 * B;
          x.y = 1 * z;
          x.z = -1;
          x.normalize();
          A.Oo(x);
          B = this.$k(x, f, p.ra());
          0 != p.nc &&
            1 > u &&
            ((B = B && this.$k(x, r, p.nc)),
            (f.x = f.x * u + r.x * (1 - u)),
            (f.y = f.y * u + r.y * (1 - u)));
          B
            ? -1e10 < f.x && 1e10 > f.x && -1e10 < f.y && 1e10 > f.y
              ? -2 < f.x &&
                2 > f.x &&
                -2 < f.y &&
                2 > f.y &&
                ((b += f.x), (c += f.y), v++)
              : (f.x = NaN)
            : (f.x = NaN);
          d.hd[d.Eh++] = f.x;
          d.hd[d.Eh++] = f.y;
        }
      0 < v ? ((b /= v), (c /= v)) : (e = 0);
      for (a = 0; a < d.Eh; a += 2)
        (f.x = d.hd[a]),
          (f.y = d.hd[a + 1]),
          (p = f.x - b),
          (q = f.y - c),
          (f.x += p * e),
          (f.y += q * e),
          (d.hd[a] = g.width / 2 + (f.x * g.width) / 2),
          (d.hd[a + 1] = g.height / 2 - (f.y * g.width) / 2);
      this.Np(d, k);
    };
    f.prototype.$k = function (d, b, a) {
      var c = !0;
      switch (a) {
        case 0:
        case 4:
          a = 1 / (d.z * this.Dj);
          b.x = -d.x * a;
          b.y = d.y * a;
          0 < d.z && (c = !1);
          break;
        case 9:
          1 == d.z && (c = !1);
          a = 1 / ((1 - d.z) * this.Qj);
          b.x = d.x * a;
          b.y = -d.y * a;
          break;
        case 12:
          if (((a = Math.sqrt(d.x * d.x + d.y * d.y)), 0 == a))
            (b.x = 0), (b.y = 0);
          else {
            var k = (2 * this.aj * Math.acos(-d.z)) / a;
            if (2 < a) return !1;
            b.x = k * d.x;
            b.y = -k * d.y;
          }
      }
      return c;
    };
    f.prototype.Np = function (d, b) {
      for (var a = this.g, c = [], k, l = (d.yd = 0); l < b; l++)
        for (var e = 0; e < b; e++) {
          c[0] = l + e * (b + 1);
          c[1] = l + 1 + e * (b + 1);
          c[2] = l + (e + 1) * (b + 1);
          c[3] = l + 1 + (e + 1) * (b + 1);
          k = !0;
          for (var p = 0; 4 > p; p++) isNaN(d.hd[2 * c[0]]) && (k = !1);
          if (k) {
            var f = !1,
              g = !1,
              q = !1,
              n = !1;
            for (p = 0; 4 > p; p++) {
              var h = d.hd[2 * c[p]];
              h < a.o.width && (g = !0);
              0 <= h && (f = !0);
              h = d.hd[2 * c[p] + 1];
              h < a.o.height && (q = !0);
              0 <= h && (n = !0);
            }
            if ((k = k && g && f && q && n))
              (d.se[d.yd++] = c[0]),
                (d.se[d.yd++] = c[3]),
                (d.se[d.yd++] = c[2]),
                (d.se[d.yd++] = c[0]),
                (d.se[d.yd++] = c[1]),
                (d.se[d.yd++] = c[3]);
          }
        }
    };
    f.prototype.wq = function () {
      var d = this.g,
        b = d.h,
        a = d.h.J;
      d.ne && (d.Jc(0), d.Sc());
      if (d.H) {
        var c = d.H,
          k = this.Yl;
        c.useProgram(k);
        this.Wj(k);
        c.enable(c.CULL_FACE);
        c.cullFace(c.FRONT);
        c.enable(c.DEPTH_TEST);
        m.$.te(this.sb);
        m.$.perspective(d.Jb(), d.rb.width / d.rb.height, 0.1, 100, this.sb);
        c.uniformMatrix4fv(c.getUniformLocation(k, "uPMatrix"), !1, this.sb);
        this.g.pc = 0;
        d.rj();
        var l = d.Zi(),
          e = 0;
        var p = a.length - 1;
        for (var f = {}, g = a[p]; g.qf && 0 < p; ) p--, (g = a[p]);
        for (var q = p, n = q, h = 0; 6 > h; h++)
          for (var r = 0; r < g.fa; r++)
            for (var v = 0; v < g.L; v++) {
              var u = v + r * g.L + h * g.L * g.fa;
              f[u] = 1;
            }
        for (; p >= l; ) {
          var x = {};
          g = a[p];
          var A = null;
          0 < p && (A = a[p - 1]);
          var w = !0;
          for (var B in f)
            if (f.hasOwnProperty(B)) {
              u = Number(B);
              var z = g.U[u];
              h = Number(Math.floor(u / (g.L * g.fa)));
              r = Math.floor((u - h * g.L * g.fa) / g.L);
              v = Math.floor(u - (r * g.L + h * g.L * g.fa));
              if (6 <= h) console.log("Grrr...");
              else {
                var C = this.g.ob.cb[h];
                C.Da = !1;
                z || ((z = g.U[u] = new m.Kd()), d.M("create " + u));
                this.Mp(
                  z,
                  g,
                  v,
                  r,
                  Math.max(1, this.ek >> (q - p)),
                  h,
                  -(0 != d.nc) ? 0.3 : 0.1
                );
                z.visible = 0 < z.yd || g.cache;
                z.Lh = 3;
                z.zg = Date.now();
                z.visible &&
                  !z.gb &&
                  ((w = !1),
                  this.vh()
                    ? z.h ||
                      (z.Xd
                        ? z.Xd--
                        : (this.Ph(z, g, d.He(h, p, v, r)), (d.Da = !0)))
                    : this.g.pc++);
                if (A && (z.visible || A.cache)) {
                  z = (v * b.G + 1) / g.width;
                  v = Math.min(1, ((v + 1) * b.G - 1) / g.width);
                  var D = (r * b.G + 1) / g.height;
                  r = Math.min(1, ((r + 1) * b.G - 1) / g.height);
                  u = b.G / A.width;
                  C = b.G / A.height;
                  var E = D;
                  D = Math.floor((D * A.height) / b.G);
                  do {
                    var F = z,
                      H = Math.floor((z * A.width) / b.G);
                    do {
                      var I = H + D * A.L + h * A.L * A.fa;
                      H < A.L && D < A.fa ? (x[I] = 1) : d.M("Grrrr");
                      H++;
                      F += u;
                    } while (F < v);
                    D++;
                    E += C;
                  } while (E < r);
                }
              }
            }
          w && ((n = p), 20 > d.f.c && p < this.Ve && (this.mi = !0));
          f = x;
          p--;
        }
        this.Fj();
        c.uniform1i(c.getUniformLocation(k, "tileTexture"), 0);
        c.activeTexture(c.TEXTURE0);
        p = l;
        for (l = -1; p <= Math.min(n, this.Ve - 1); ) {
          g = a[p];
          for (B in g.U)
            if (g.U.hasOwnProperty(B)) {
              f = Number(B);
              z = g.U[f];
              h = Math.floor(f / (g.L * g.fa));
              r = Math.floor((f - h * g.L * g.fa) / g.L);
              v = Math.floor(f - (r * g.L + h * g.L * g.fa));
              l != h && ((l = h), this.vi(h, k));
              if (e > d.we) {
                d.M("Excided painted tiles");
                this.mi = !1;
                break;
              }
              z.gb &&
                ((f = h = b.G),
                v == g.L - 1 && (h = g.width - b.G * v),
                r == g.fa - 1 && (f = g.height - b.G * r),
                (h = (h + 2 * b.Ja) / b.G),
                (f = (f + 2 * b.Ja) / b.G),
                c.bindTexture(c.TEXTURE_2D, z.gb),
                c.uniform2f(
                  c.getUniformLocation(k, "uCanvasDimensions"),
                  d.o.width,
                  d.o.height
                ),
                (q = c.getUniformLocation(k, "srcScale")),
                c.uniform2f(
                  q,
                  (0.5 * g.width) / b.G / h,
                  (0.5 * g.height) / b.G / f
                ),
                (q = c.getUniformLocation(k, "srcOffset")),
                c.uniform2f(
                  q,
                  (0.5 * g.width + b.Ja - b.G * v) / b.G / h,
                  -(0.5 * g.height + b.Ja - b.G * r) / b.G / f + 1
                ),
                (q = c.getUniformLocation(k, "zOffset")),
                c.uniform1f(q, (p + 1) / (a.length + 5)),
                (h = c.getAttribLocation(k, "aVertexPosition")),
                c.disableVertexAttribArray(0),
                c.disableVertexAttribArray(1),
                c.disableVertexAttribArray(2),
                c.enableVertexAttribArray(h),
                c.activeTexture(c.TEXTURE0),
                c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.LINEAR),
                c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.LINEAR),
                c.texParameteri(
                  c.TEXTURE_2D,
                  c.TEXTURE_WRAP_S,
                  c.CLAMP_TO_EDGE
                ),
                c.texParameteri(
                  c.TEXTURE_2D,
                  c.TEXTURE_WRAP_T,
                  c.CLAMP_TO_EDGE
                ),
                c.bindBuffer(c.ARRAY_BUFFER, this.zo),
                c.vertexAttribPointer(h, 2, c.FLOAT, !1, 0, 0),
                c.bufferData(
                  c.ARRAY_BUFFER,
                  new Float32Array(z.hd),
                  c.DYNAMIC_DRAW
                ),
                c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, this.yo),
                c.bufferData(
                  c.ELEMENT_ARRAY_BUFFER,
                  new Uint16Array(z.se),
                  c.DYNAMIC_DRAW
                ),
                c.drawElements(c.TRIANGLES, z.yd, c.UNSIGNED_SHORT, 0),
                e++);
            }
          p++;
        }
        c.disable(c.CULL_FACE);
        c.cullFace(c.FRONT_AND_BACK);
        d.ad = !1;
      }
    };
    f.prototype.vi = function (d, b) {
      var a = this.g.H;
      m.$.te(this.ma);
      this.Cf(d, -1);
      a.uniformMatrix4fv(a.getUniformLocation(b, "matRotate"), !1, this.ma);
    };
    f.prototype.Zo = function () {
      var d = this.g;
      if (d.H) {
        var b = d.H,
          a = this.Zl;
        b.useProgram(a);
        this.vi(0, a);
        b.uniform2f(
          b.getUniformLocation(a, "uCanvasDimensions"),
          d.o.width,
          d.o.height
        );
        if (1 == d.s.format) {
          var c = b.getUniformLocation(a, "srcScale");
          b.uniform2f(c, -0.5 / Math.PI, (d.s.cj ? -1 : 1) / Math.PI);
        }
        14 == d.s.format &&
          ((c = b.getUniformLocation(a, "srcScale")),
          b.uniform2f(
            c,
            1 - (2 * d.s.Pe) / (d.s.width / 3),
            1 - (2 * d.s.Pe) / (d.s.height / 2)
          ));
        c = b.getUniformLocation(a, "srcOffset");
        b.uniform2f(c, 0.5, 0.5);
        this.Wj(a);
        c = b.getUniformLocation(a, "cubeTexture");
        b.uniform1i(c, 0);
        c = b.getAttribLocation(a, "aVertexPosition");
        b.disableVertexAttribArray(0);
        b.disableVertexAttribArray(1);
        b.disableVertexAttribArray(2);
        b.enableVertexAttribArray(c);
        b.bindBuffer(b.ARRAY_BUFFER, this.ci);
        b.vertexAttribPointer(c, 2, b.FLOAT, !1, 0, 0);
        b.activeTexture(b.TEXTURE0);
        b.bindTexture(b.TEXTURE_2D, d.s.oc);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.$c);
        b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
      }
    };
    f.prototype.Wj = function (d) {
      var b = this.g,
        a = b.H,
        c = this.g.o,
        k = c.width / c.height;
      switch (b.f.mode) {
        case 1:
          k = 1;
          break;
        case 2:
          k = c.width / Math.sqrt(c.width * c.width + c.height * c.height);
          break;
        case 3:
          (4 * c.height) / 3 < c.width && (k = 4 / 3);
      }
      c = a.getUniformLocation(d, "rectDstDistance");
      this.Dj = Math.tan(((Math.min(b.f.c, 179) / 2) * Math.PI) / 180) * k;
      a.uniform1f(c, this.Dj);
      c = a.getUniformLocation(d, "fisheyeDistance");
      this.aj = 180 / (b.f.c * Math.PI * k);
      a.uniform1f(c, this.aj);
      c = a.getUniformLocation(d, "stereoDistance");
      this.Qj = Math.tan(((Math.min(b.f.c, 359) / 4) * Math.PI) / 180) * k;
      a.uniform1f(c, this.Qj);
      c = a.getUniformLocation(d, "directionBlend");
      a.uniform1f(c, b.Kg);
    };
    f.prototype.Yo = function () {
      var d = this.g,
        b = d.H,
        a = this.Xl;
      b.useProgram(a);
      b.enable(b.DEPTH_TEST);
      this.vi(0, a);
      b.uniform2f(
        b.getUniformLocation(a, "uCanvasDimensions"),
        d.o.width,
        d.o.height
      );
      d = b.getUniformLocation(a, "srcScale");
      b.uniform2f(d, 1, 1);
      d = b.getUniformLocation(a, "srcOffset");
      b.uniform2f(d, 0, 0);
      d = b.getUniformLocation(a, "zOffset");
      b.uniform1f(d, 0.9999);
      this.Wj(a);
      this.vi(0, a);
      d = b.getUniformLocation(a, "cubeTexture");
      b.uniform1i(d, 0);
      a = b.getAttribLocation(a, "aVertexPosition");
      b.disableVertexAttribArray(0);
      b.disableVertexAttribArray(1);
      b.disableVertexAttribArray(2);
      b.enableVertexAttribArray(a);
      b.bindBuffer(b.ARRAY_BUFFER, this.ci);
      b.vertexAttribPointer(a, 2, b.FLOAT, !1, 0, 0);
      b.activeTexture(b.TEXTURE0);
      b.bindTexture(b.TEXTURE_CUBE_MAP, this.yc);
      b.texParameteri(b.TEXTURE_CUBE_MAP, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
      b.texParameteri(b.TEXTURE_CUBE_MAP, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
      b.texParameteri(b.TEXTURE_CUBE_MAP, b.TEXTURE_MIN_FILTER, b.LINEAR);
      b.texParameteri(b.TEXTURE_CUBE_MAP, b.TEXTURE_MAG_FILTER, b.LINEAR);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.$c);
      b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
    };
    f.prototype.vn = function () {
      for (
        var d = this.g,
          b = d.H,
          a = [1, 3, 5, 4, 0, 2],
          c = !0,
          k = !0,
          l = !1,
          e = 0;
        6 > e;
        e++
      )
        this.Va[e].ve.complete ? this.rh[e] || (l = !0) : (c = !1),
          this.Va[e].pf.complete || (k = !1);
      if (k || c)
        if (!k || c || !this.yc || l) {
          e = Math.round(d.qc / d.Ff);
          k = (d.qc - e) / 2;
          d.M("paint cube single - isMain: " + c + " overlap: " + k);
          this.Ve = 0;
          this.yc || (this.yc = b.createTexture());
          d.gd++;
          b.bindTexture(b.TEXTURE_CUBE_MAP, this.yc);
          b.texParameteri(
            b.TEXTURE_CUBE_MAP,
            b.TEXTURE_WRAP_S,
            b.CLAMP_TO_EDGE
          );
          b.texParameteri(
            b.TEXTURE_CUBE_MAP,
            b.TEXTURE_WRAP_T,
            b.CLAMP_TO_EDGE
          );
          b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, 1);
          l = document.createElement("canvas");
          l.width = e;
          l.height = e;
          var p = l.getContext("2d");
          for (e = 0; 6 > e; e++) {
            var f = a[e];
            this.Va[f].ve.complete
              ? this.rh[f] ||
                (p.drawImage(this.Va[f].ve, -k, -k),
                b.texImage2D(
                  b.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                  0,
                  b.RGBA,
                  b.RGBA,
                  b.UNSIGNED_BYTE,
                  l
                ),
                (this.rh[f] = !0))
              : (p.drawImage(this.Va[f].pf, -k, -k, d.qc, d.qc),
                b.texImage2D(
                  b.TEXTURE_CUBE_MAP_POSITIVE_X + e,
                  0,
                  b.RGBA,
                  b.RGBA,
                  b.UNSIGNED_BYTE,
                  l
                ));
          }
          this.vg = !c;
        }
    };
    f.prototype.un = function () {
      var d = this.g,
        b = this.g.h,
        a = d.h.J,
        c = d.H,
        k;
      var l = a.length - 1;
      if (!(0 > l)) {
        a[l].qf && l--;
        var e = 512;
        d.ug && (e = 256);
        !d.uf && 2 <= d.devicePixelRatio && (e = 512);
        for (
          (k = c.getParameter(c.MAX_CUBE_MAP_TEXTURE_SIZE)) && k < e && (e = k);
          0 < l && a[l - 1].width <= e;

        )
          l--;
        e = a[l];
        if (0 != e.L) {
          k = l;
          var p = this.rn(l);
          this.vg && p && (this.vg = !1);
          p ||
            ((l = a.length - 1),
            (e = a[l]),
            p ||
              (e.qf
                ? ((p = e.loaded), this.qj(l - 1) && (--l, (p = !0)))
                : (p = this.qj(l))),
            (this.vg = !0));
          this.qj(k);
          if (p && this.Ve > l) {
            e = a[l];
            d.M("paint cube level " + l);
            this.Ve = l;
            a = d.h.Ja;
            l = 0 < a || 1 < e.L || 1 < e.fa;
            p = k = void 0;
            l &&
              ((p = document.createElement("canvas")),
              (p.width = e.width),
              (p.height = e.height),
              2048 > e.width &&
                (1500 < e.width
                  ? ((p.width = 2048), (p.height = 2048))
                  : 700 < e.width
                  ? ((p.width = 1024), (p.height = 1024))
                  : ((p.width = 512), (p.height = 512))),
              (k = p.getContext("2d")));
            this.yc = c.createTexture();
            d.gd++;
            c.bindTexture(c.TEXTURE_CUBE_MAP, this.yc);
            c.texParameteri(
              c.TEXTURE_CUBE_MAP,
              c.TEXTURE_WRAP_S,
              c.CLAMP_TO_EDGE
            );
            c.texParameteri(
              c.TEXTURE_CUBE_MAP,
              c.TEXTURE_WRAP_T,
              c.CLAMP_TO_EDGE
            );
            c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, 1);
            var f = [1, 3, 5, 4, 0, 2];
            b = b.G;
            for (var g = 0; 6 > g; g++) {
              for (var h = 0; h < e.fa; h++)
                for (var n = 0; n < e.L; n++) {
                  var m = n + h * e.L + f[g] * e.L * e.fa,
                    r = e.U[m],
                    v = r.h;
                  r.K && (v = r.K);
                  v
                    ? l
                      ? ((m = p.width / e.width),
                        k.drawImage(
                          v,
                          m * (n * b - a),
                          m * (h * b - a),
                          m * v.width,
                          m * v.height
                        ))
                      : c.texImage2D(
                          c.TEXTURE_CUBE_MAP_POSITIVE_X + g,
                          0,
                          c.RGBA,
                          c.RGBA,
                          c.UNSIGNED_BYTE,
                          v
                        )
                    : (d.M("WTF?!"), d.M(m), d.M(r));
                }
              l &&
                c.texImage2D(
                  c.TEXTURE_CUBE_MAP_POSITIVE_X + g,
                  0,
                  c.RGBA,
                  c.RGBA,
                  c.UNSIGNED_BYTE,
                  p
                );
            }
          }
        }
      }
    };
    f.prototype.qj = function (d) {
      var b = this.g,
        a = b.h.J[d];
      if (0 == a.L) return !1;
      var c = !0;
      a.cache = !0;
      for (var k = 0; 6 > k; k++)
        for (var l = 0; l < a.fa; l++)
          for (var e = 0; e < a.L; e++) {
            var p = e + l * a.L + k * a.L * a.fa,
              f = a.U[p];
            f || (f = a.U[p] = new m.Kd());
            this.vh()
              ? f.h ||
                (f.Xd ? f.Xd-- : (this.Ph(f, a, b.He(k, d, e, l)), (b.Da = !0)))
              : this.g.pc++;
            f.gb || ((c = !1), (b.Da = !0));
          }
      c && (a.loaded = !0);
      return c;
    };
    f.prototype.rn = function (d) {
      d = this.g.h.J[d];
      if (0 == d.L) return !1;
      for (var b = 0; 6 > b; b++)
        for (var a = 0; a < d.fa; a++)
          for (var c = 0; c < d.L; c++) {
            var k = d.U[c + a * d.L + b * d.L * d.fa];
            if (!k || !k.gb) return !1;
          }
      return (d.loaded = !0);
    };
    f.prototype.ready = function () {
      return null != this.yc;
    };
    f.prototype.Fj = function () {
      for (
        var d = this.g, b = d.h.J, a = d.H, c = Date.now(), k = b.length - 1;
        0 <= k;
        k--
      ) {
        var l = b[k];
        if (!l.cache)
          for (var e in l.U)
            if (l.U.hasOwnProperty(e)) {
              var p = l.U[e];
              0 < p.Lh && p.Lh--;
              p.visible || 0 < p.Lh
                ? (p.visible && (p.zg = c),
                  (p = this.Qd.indexOf(p)),
                  -1 !== p && this.Qd.splice(p, 1))
                : -1 === this.Qd.indexOf(p) && ((p.level = l), this.Qd.push(p));
            }
      }
      if (this.Qd.length > 1.1 * d.sm)
        for (
          this.Qd.sort(function (a, c) {
            return c.zg - a.zg;
          });
          this.Qd.length > d.sm;

        )
          (p = this.Qd.pop()),
            p.gb && (a.deleteTexture(p.gb), d.gd--, (p.gb = 0)),
            (p.h = null),
            p.af && (a.deleteBuffer(p.af), (p.af = 0)),
            (e = p.level.U.indexOf(p)),
            d.M("delete " + e + " " + (c - p.zg)),
            delete p.level.U[e];
    };
    f.prototype.pq = function () {
      var d = this.g;
      if (d.H) {
        var b = this.g.H;
        b.disable(b.DEPTH_TEST);
        var a;
        for (a = 0; a < d.I.length; a++) {
          var c = d.I[a];
          if (!c.md) {
            m.$.te(this.ma);
            m.$.rotate(this.ma, (-d.O.c * Math.PI) / 180, [0, 0, 1]);
            m.$.rotate(this.ma, (-d.i.c * Math.PI) / 180, [1, 0, 0]);
            m.$.rotate(this.ma, ((180 - d.pan.c) * Math.PI) / 180, [0, 1, 0]);
            m.$.rotate(this.ma, (c.pan * Math.PI) / 180, [0, 1, 0]);
            m.$.rotate(this.ma, (-c.i * Math.PI) / 180, [1, 0, 0]);
            m.$.translate(this.ma, [0, 0, 1]);
            m.$.rotate(this.ma, (c.kb * Math.PI) / 180, [0, 0, 1]);
            m.$.rotate(this.ma, (-c.Ea * Math.PI) / 180, [0, 1, 0]);
            m.$.rotate(this.ma, (c.wa * Math.PI) / 180, [1, 0, 0]);
            var k = Math.tan(((c.f / 2) * Math.PI) / 180),
              l = c.ee;
            l || (l = 16 / 9);
            m.$.scale(this.ma, [k, k / l, 1]);
            m.$.translate(this.ma, [0, 0, -1]);
            b.bindBuffer(b.ARRAY_BUFFER, this.Ri);
            b.vertexAttribPointer(this.F.Z, 3, b.FLOAT, !1, 0, 0);
            b.bindBuffer(b.ARRAY_BUFFER, this.je);
            b.vertexAttribPointer(this.F.Ca, 2, b.FLOAT, !1, 0, 0);
            b.activeTexture(b.TEXTURE0);
            b.bindTexture(b.TEXTURE_2D, c.oc);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.$c);
            b.uniform1i(this.F.vf, 0);
            b.uniformMatrix4fv(this.F.Jg, !1, this.ma);
            b.uniformMatrix4fv(this.F.Vd, !1, this.sb);
            b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
          }
        }
        b.enable(b.DEPTH_TEST);
      }
    };
    f.prototype.oq = function () {
      var d = this.g,
        b;
      if (d.o.width != d.D.offsetWidth || d.o.height != d.D.offsetHeight)
        (d.o.width = d.D.offsetWidth), (d.o.height = d.D.offsetHeight);
      d.ne && (d.Jc(0), d.Sc());
      if (d.H) {
        var a = d.H;
        a.useProgram(this.F);
        m.$.te(this.sb);
        m.$.perspective(d.Jb(), d.rb.width / d.rb.height, 0.1, 100, this.sb);
        a.uniformMatrix4fv(this.F.Vd, !1, this.sb);
        this.Cf(0);
        a.uniform1i(this.F.vf, 0);
        a.uniformMatrix4fv(this.F.Vd, !1, this.sb);
        a.uniformMatrix4fv(this.F.Jg, !1, this.ma);
        a.enableVertexAttribArray(this.F.Z);
        a.enableVertexAttribArray(this.F.Ca);
        a.bindBuffer(a.ARRAY_BUFFER, this.je);
        a.vertexAttribPointer(this.F.Ca, 2, a.FLOAT, !1, 0, 0);
        a.activeTexture(a.TEXTURE0);
        a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.$c);
        a.uniform1f(this.F.Bi, 1e-4);
        a.vertexAttribPointer(this.F.Z, 3, a.FLOAT, !1, 0, 0);
        a.bindTexture(a.TEXTURE_2D, d.s.oc);
        for (b = 0; 1 > b; b++)
          this.Cf(0),
            a.bindBuffer(a.ARRAY_BUFFER, d.s.$j),
            a.vertexAttribPointer(this.F.Z, 3, a.FLOAT, !1, 0, 0),
            a.bindBuffer(a.ARRAY_BUFFER, d.s.oi),
            a.vertexAttribPointer(this.F.Ca, 2, a.FLOAT, !1, 0, 0),
            a.activeTexture(a.TEXTURE0),
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, d.s.kj),
            a.uniform1i(this.F.vf, 0),
            a.uniformMatrix4fv(this.F.Jg, !1, this.ma),
            a.uniformMatrix4fv(this.F.Vd, !1, this.sb),
            a.drawElements(a.TRIANGLES, 36, a.UNSIGNED_SHORT, 0);
      }
    };
    f.prototype.nq = function () {
      var d = this.g,
        b = d.H,
        a = d.s;
      if (0 < d.I.length)
        for (var c = 0; c < d.I.length; c++) {
          var k = d.I[c];
          if (
            !k.md &&
            k.vl &&
            k.Dh != k.b.currentTime &&
            ((k.Dh = k.b.currentTime),
            !k.ee &&
              0 < k.b.videoHeight &&
              (k.ee = k.b.videoWidth / k.b.videoHeight),
            d.eh)
          )
            try {
              k.oc &&
                (b.bindTexture(b.TEXTURE_2D, k.oc),
                b.texImage2D(
                  b.TEXTURE_2D,
                  0,
                  b.RGB,
                  b.RGB,
                  b.UNSIGNED_BYTE,
                  k.b
                ),
                d.update());
            } catch (e) {
              d.M(e);
            }
        }
      if (a.b && ((c = Number(a.b.currentTime)), a.Dh != c)) {
        a.Dh = c;
        try {
          var l = 0 < a.b.readyState;
          d.ff && a.jd && (l = l && 0 < a.b.currentTime);
          a.oc &&
            a.Jh &&
            l &&
            ((a.jd = !0),
            (a.width = a.b.videoWidth),
            (a.height = a.b.videoHeight),
            b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, d.s.cj),
            b.bindTexture(b.TEXTURE_2D, a.oc),
            b.texImage2D(b.TEXTURE_2D, 0, b.RGB, b.RGB, b.UNSIGNED_BYTE, a.b),
            (a.rm = !0),
            d.update());
        } catch (e) {
          d.M(e);
        }
      }
    };
    f.prototype.Nl = function () {
      var d,
        b,
        a = this.g,
        c = this.g.H;
      a.ya.style.visibility = "hidden";
      a.A.xg != a.A.mode && (a.A.xg = a.A.mode);
      if ((0 <= a.A.mode || 0 < a.A.lb.length) && !a.B.Xg) {
        var k = 1;
        0 >= a.A.mode && (k = 0);
        3 == a.A.mode && (k = a.A.pa);
        for (d = 0; d < a.P.length; d++) {
          var l = a.P[d];
          if ("poly" == l.type) {
            var e = l.Wd,
              p = k;
            2 == a.A.mode && (p = l.pa);
            var f = a.A.lb.indexOf(l.id);
            -1 != f && (p = a.A.Pb[f]);
            if (0 < e.length) {
              f = [];
              for (b = 0; b < e.length; b++)
                f.push(e[b].Nb), f.push(e[b].vb), f.push(0);
              c.useProgram(this.Ed);
              c.enable(c.BLEND);
              c.blendFuncSeparate(
                c.SRC_ALPHA,
                c.ONE_MINUS_SRC_ALPHA,
                c.SRC_ALPHA,
                c.ONE
              );
              c.disable(c.DEPTH_TEST);
              e = c.createBuffer();
              c.bindBuffer(c.ARRAY_BUFFER, e);
              c.bufferData(c.ARRAY_BUFFER, new Float32Array(f), c.STATIC_DRAW);
              c.uniform2f(
                c.getUniformLocation(this.Ed, "uCanvasDimensions"),
                a.o.width,
                a.o.height
              );
              e = c.getUniformLocation(this.Ed, "uColor");
              b = l.hc;
              c.uniform3f(
                e,
                ((b >> 16) & 255) / 255,
                ((b >> 8) & 255) / 255,
                (b & 255) / 255
              );
              var g = c.getUniformLocation(this.Ed, "uAlpha");
              c.uniform1f(g, l.gc * p);
              c.vertexAttribPointer(this.Ed.Z, 3, c.FLOAT, !1, 0, 0);
              c.drawArrays(c.LINE_LOOP, 0, f.length / 3);
              b = l.ec;
              c.uniform3f(
                e,
                ((b >> 16) & 255) / 255,
                ((b >> 8) & 255) / 255,
                (b & 255) / 255
              );
              c.uniform1f(g, l.dc * p);
              c.enable(c.STENCIL_TEST);
              c.clearStencil(0);
              c.clear(c.STENCIL_BUFFER_BIT);
              c.colorMask(!1, !1, !1, !1);
              c.stencilFunc(c.ALWAYS, 1, 1);
              c.stencilOp(c.INCR, c.INCR, c.INCR);
              c.drawArrays(c.TRIANGLE_FAN, 0, f.length / 3);
              c.colorMask(!0, !0, !0, !0);
              c.stencilFunc(c.EQUAL, 1, 1);
              c.stencilOp(c.ZERO, c.ZERO, c.ZERO);
              c.drawArrays(c.TRIANGLE_FAN, 0, f.length / 3);
              c.disable(c.BLEND);
              c.enable(c.DEPTH_TEST);
              c.disable(c.STENCIL_TEST);
              c.useProgram(this.F);
            }
          }
        }
      }
    };
    f.prototype.Vj = function () {
      var d = this.g,
        b = d.h;
      if (d.o.width != d.D.offsetWidth || d.o.height != d.D.offsetHeight)
        (d.o.width = d.D.offsetWidth), (d.o.height = d.D.offsetHeight);
      d.ne && (d.Jc(0), d.Sc());
      if (d.H) {
        var a = d.H;
        this.ui();
        a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
        a.disable(a.DEPTH_TEST);
        a.disable(a.CULL_FACE);
        a.useProgram(this.eg);
        var c = a.getUniformLocation(this.eg, "uRect");
        a.uniform2f(
          a.getUniformLocation(this.eg, "uCanvasDimensions"),
          d.o.width,
          d.o.height
        );
        a.activeTexture(a.TEXTURE0);
        a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.$c);
        var k = a.getAttribLocation(this.eg, "aVertexPosition");
        a.disableVertexAttribArray(0);
        a.disableVertexAttribArray(1);
        a.disableVertexAttribArray(2);
        a.enableVertexAttribArray(k);
        a.bindBuffer(a.ARRAY_BUFFER, this.je);
        a.vertexAttribPointer(k, 2, a.FLOAT, !1, 0, 0);
        d.pc = 0;
        var l = 100 / d.f.c;
        var e = b.width / b.height;
        k = d.o.height * l * e;
        l *= d.o.height;
        e = (d.pan.c / 100 / e - 0.5) * k + d.o.width / 2;
        for (
          var p = (d.i.c / 100 - 0.5) * l + d.o.height / 2, f, g, h, n = 0;
          b.J.length >= n + 2 && b.J[n + 1].width > k;

        )
          n++;
        var y;
        var r = [];
        for (y = b.J.length - 1; y >= n; ) {
          var v = b.J[y];
          if (v.cache) {
            var u = { Ya: 0, zb: 0 };
            u.Bb = v.L - 1;
            u.Cb = v.fa - 1;
          } else {
            u = {};
            f = (-p / l) * (v.height / d.h.G);
            g = ((-e + d.o.width) / k) * (v.width / d.h.G);
            var x = ((-p + d.o.height) / l) * (v.height / d.h.G);
            u.Ya = Math.min(
              Math.max(0, Math.floor((-e / k) * (v.width / d.h.G))),
              v.L - 1
            );
            u.zb = Math.min(Math.max(0, Math.floor(f)), v.fa - 1);
            u.Bb = Math.min(Math.max(0, Math.floor(g)), v.L - 1);
            u.Cb = Math.min(Math.max(0, Math.floor(x)), v.fa - 1);
          }
          r[y] = u;
          var A = !0;
          for (g = u.zb; g <= u.Cb; g++)
            for (f = u.Ya; f <= u.Bb; f++)
              (h = f + g * v.L),
                (x = v.U[h]),
                x || ((x = new m.Kd()), (v.U[h] = x)),
                this.vh()
                  ? x.h || (this.Ph(x, v, d.He(0, y, f, g)), (d.Da = !0))
                  : this.g.pc++,
                (x.h && x.h.complete) || (A = !1),
                (x.visible = !0);
          u.pj = A;
          y--;
        }
        for (y = b.J.length - 1; y >= n; ) {
          v = b.J[y];
          if (r[y] && 0 <= r[y].Ya)
            for (u = r[y], g = u.zb; g <= u.Cb; g++)
              for (f = u.Ya; f <= u.Bb; f++)
                (h = f + g * v.L),
                  (x = v.U[h]) &&
                    x.h &&
                    x.h.complete &&
                    ((d = e + ((-b.Ja + b.G * f) * k) / v.width),
                    a.uniform4f(
                      c,
                      d,
                      p + ((-b.Ja + b.G * g) * l) / v.height,
                      (x.h.width * k) / v.width,
                      (x.h.height * l) / v.height
                    ),
                    x &&
                      x.gb &&
                      (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.$c),
                      a.bindTexture(a.TEXTURE_2D, x.gb),
                      a.texParameteri(
                        a.TEXTURE_2D,
                        a.TEXTURE_MAG_FILTER,
                        a.LINEAR
                      ),
                      a.texParameteri(
                        a.TEXTURE_2D,
                        a.TEXTURE_MIN_FILTER,
                        a.LINEAR
                      ),
                      a.texParameteri(
                        a.TEXTURE_2D,
                        a.TEXTURE_WRAP_S,
                        a.CLAMP_TO_EDGE
                      ),
                      a.texParameteri(
                        a.TEXTURE_2D,
                        a.TEXTURE_WRAP_T,
                        a.CLAMP_TO_EDGE
                      ),
                      a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0)));
          y--;
        }
        this.Fj();
      }
    };
    f.prototype.di = function () {
      var d = this.g.H;
      if (d && this.Va)
        for (; 0 < this.Va.length; ) {
          var b = this.Va.pop();
          b.So = !0;
          d.deleteTexture(b);
        }
      this.yc && (d.deleteTexture(this.yc), (this.yc = null));
      this.Ve = 1e6;
      this.rh = [!1, !1, !1, !1, !1, !1];
    };
    return f;
  })();
  m.Wm = f;
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  var f = (function () {
      return function () {
        this.mf = { gg: 1, hg: 1, Eg: 0, Fg: 0, Lf: 0, hh: 0, scale: 1 };
        this.fb = !0;
        this.Re = [];
      };
    })(),
    h = (function () {
      function d() {
        var b;
        this.cb = Array(6);
        for (b = 0; 6 > b; b++) this.cb[b] = new f();
      }
      d.prototype.sn = function (b, a, c, d) {
        for (var k = 0; 6 > k; k++) {
          var e;
          if ((e = this.cb[k])) {
            var f = [];
            f.push(new m.xa(-1, -1, -1, 0, 0));
            f.push(new m.xa(1, -1, -1, 1, 0));
            f.push(new m.xa(1, 1, -1, 1, 1));
            f.push(new m.xa(-1, 1, -1, 0, 1));
            for (var t = 0; t < f.length; t++)
              4 > k
                ? f[t].Ea((-Math.PI / 2) * k)
                : f[t].wa((Math.PI / 2) * (4 === k ? -1 : 1)),
                d &&
                  (f[t].kb((d.O * Math.PI) / 180),
                  f[t].wa((-d.pitch * Math.PI) / 180)),
                f[t].Ea((-b * Math.PI) / 180),
                f[t].wa((a * Math.PI) / 180),
                f[t].kb((c * Math.PI) / 180);
            e.fb = 0 < f.length;
          }
        }
      };
      return d;
    })();
  m.Sm = h;
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  m.Rm = (function () {
    return function () {
      this.J = [];
      this.rf = "0x000000";
      this.Sl = !1;
      this.Gl = this.Fl = 0.4;
      this.G = 512;
      this.Ja = 1;
      this.oj = 0;
      this.Hl = "";
      this.am = this.height = this.width = 0;
    };
  })();
  m.fk = (function () {
    return function () {
      this.height = this.width = 0;
      this.qf = this.cache = !1;
      this.fa = this.L = 0;
      this.loaded = !1;
      this.U = [];
    };
  })();
  m.Kd = (function () {
    return function () {
      this.loaded = this.visible = !1;
      this.Xd = this.Ej = 0;
      this.hd = [];
      this.Eh = 0;
      this.se = [];
      this.Lh = this.zg = this.yd = 0;
    };
  })();
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  m.Nm = (function () {
    return function (f, h) {
      this.g = f;
      this.ta = h;
      var d = (this.__div = document.createElement("div"));
      var b = document.createElement("img");
      b.setAttribute(
        "src",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5xJREFUeNqclmlIVFEUx997TjrplFQW2WKBBSYtRFlpWUILSSsRZRQIBdGHCFqIoKIvQRsUFRJC9LEgaSFbMMpcWi1pLzOLsjItKms0U5t5/c/wH7nc5o2jF374xrv87z33nHOPaRsRtbFgDpgJxoD+wATfwDNQDK6CyrCr5OcbhgiGIRsUAZt4QTWoIFXgp9JfAhY7rgdBl8NeBoLDYBloA+dBOagFTcDHcVEgDgwBGWA+OAcugvXgvb5wKMGJoAAMp9BpUA96EBf/Btsf8BI8AWfAErAcpHHDZeriliY2AVwDg8AucAQ0Ag+I4XhTm2Oxz8PT46KMbTx5EZjuJDgAnAVusJUm9DhYwalFcc59sIXXIaceFkowDySBPTRPL20xm+b7zYXa+N3CPrWJ6GuwGySA40HLBHc/GywFhbS5R1lEBrZy7FQwiSaX9pmnqeAYt+KUcew7BVZw/QKTq0ocpYPVvDOXItZCk2xgDIZqL8BR8Ab0VDbr4yZOgLeIwzQx6WiQxcCt1+6sld66L4yYtFSwF4yg2dU7/cEwGW9YVkAwmycp1dzdpvgm0DcCh4kHmxWzBls0uBX4qqmZJ4KzePm1IeJLgjmlC16aDKZpp5Q168B3o6wsSwTHgU+MIUs74RSj6y1d+212HKimJlUE+tFRfJpYtOKNXWmJTASqWf2Bu/R6+4TKHOrOzG4IhptjWgHbGkZvepQ6SQK7oRuCXzjX1DJavBEX1ygfT8FgBqpfm1zRDcEKbR2bsZlkJCdXieB1ZhZ5YtqVgXIPN+m9kbY6hpdb+d9fPncJRmZmqQheZkemJmgxyxykl3XWJEkcAl7N21s7PDcl5ZJ0PAa3wVwmWtVbZafPwQ7wLozYB7ATPNJO56d/LAikP9u+66KNJS1d4IOZp7wU0hfLukUyzgwm70T2N/DOxIy/eFdqawa5DL2NEGwP5k15Ja4woz9glvcomd9NzyvkFcQo5gomaLfm5c0svnKZ2k7q7+FauvR2MJKZR3+sY5WgtvkdG6JyELGhNHMTXyGfLviRJ5Tcd4Dlhle7086Sgp8CqVxDkn4OqHaqacr5ekjy3Q/W0FRNNGmoMtamdzdxsytZC0lqXKhEgWPVVgImg2NgFT1MHOoOk3yLEtgWN5TEOYvoIFI1rGM19//2wpAD7imF7lfwENwAxaASNCj90pcLLKdC2Iyw1M9gnEplMEp5kOU1f8WwKGJm8oUr9f8JMAAVMDM6HSDa9QAAAABJRU5ErkJggg%3D%3D"
      );
      b.setAttribute(
        "style",
        "position: absolute;width: 28px; height: 28px;top: -14px;left: -14px; " +
          f.Ia +
          "user-select: none;"
      );
      b.ondragstart = function () {
        return !1;
      };
      d.appendChild(b);
      b = "position:absolute;" + (f.Ia + "user-select: none;");
      b += f.Ia + "touch-callout: none;";
      b += f.Ia + "tap-highlight-color: rgba(0,0,0,0);";
      f.Kc && !f.Y && (b += f.Ia + "transform: translateZ(9999999px);");
      d.setAttribute("style", b);
      d.onclick = function () {
        f.wf(h);
        f.wj(h.url, h.target);
        f.aa && f.aa.hotspotProxyClick && f.aa.hotspotProxyClick(h.id, h.url);
      };
      d.ondblclick = function () {
        f.aa &&
          f.aa.hotspotProxyDoubleClick &&
          f.aa.hotspotProxyDoubleClick(h.id, h.url);
      };
      var a = f.A.Tj;
      if (a.enabled) {
        var c = document.createElement("div");
        b = "position:absolute;top:\t 20px;";
        b = a.Ai ? b + "white-space: pre-wrap;" : b + "white-space: nowrap;";
        b += f.Ia + "transform-origin: 50% 50%;";
        c.setAttribute(
          "style",
          b +
            "visibility: hidden;overflow: hidden;padding: 0px 1px 0px 1px;font-size: 13px;"
        );
        c.style.color = this.g.ga(a.Uj, a.Sj);
        a.background
          ? (c.style.backgroundColor = this.g.ga(a.ec, a.dc))
          : (c.style.backgroundColor = "transparent");
        c.style.border = "solid " + this.g.ga(a.hc, a.gc) + " " + a.Hi + "px";
        c.style.borderRadius = a.Gi + "px";
        c.style.textAlign = "center";
        0 < a.width
          ? ((c.style.left = -a.width / 2 + "px"),
            (c.style.width = a.width + "px"))
          : (c.style.width = "auto");
        c.style.height = 0 < a.height ? a.height + "px" : "auto";
        c.style.overflow = "hidden";
        c.innerHTML = h.title;
        d.onmouseover = function () {
          0 == a.width && (c.style.left = -c.offsetWidth / 2 + "px");
          c.style.visibility = "inherit";
          f.aa && f.aa.hotspotProxyOver && f.aa.hotspotProxyOver(h.id, h.url);
        };
        d.onmouseout = function () {
          c.style.visibility = "hidden";
          f.aa && f.aa.hotspotProxyOut && f.aa.hotspotProxyOut(h.id, h.url);
        };
        d.appendChild(c);
      }
    };
  })();
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  m.Fc = (function () {
    return function () {
      this.value = this.time = 0;
      this.Zj = "";
      this.ie = this.he = this.Wc = this.ge = this.ub = this.type = this.xb = 0;
      this.nh = "";
    };
  })();
  m.ck = (function () {
    return function () {
      this.hq = this.an = this.length = 0;
    };
  })();
  m.bk = (function () {
    return function () {};
  })();
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  var f = (function () {
    function f(d) {
      this.g = d;
      this.enabled = !1;
      this.Uf = 1;
      this.Qe = 0;
      this.type = "crossdissolve";
      this.bc = this.Oa = this.Cc = 0;
      this.Nf = 5;
      this.de = 1;
      this.Of = !1;
      this.Ge = this.Fe = this.Pj = 0;
      this.Jd = 70;
      this.Mm = 0;
      this.yb = this.Lm = 1;
      this.lh = this.kh = 0.5;
      this.fe = this.zi = this.Sh = this.Kh = !1;
      this.Ui = 1;
    }
    f.prototype.sg = function () {
      var d = this.g.H,
        b = d.createShader(d.VERTEX_SHADER);
      d.shaderSource(
        b,
        "attribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying vec2 vTextureCoord;\nuniform bool uZoomIn;\nuniform float uZoomFactor;\nuniform vec2 uZoomCenter;\nvoid main(void) {\n\t gl_Position = vec4(aVertexPosition, 1.0);\n\t if(!uZoomIn) {\n\t \n\t   vTextureCoord = aTextureCoord;\n\t }\n\t else {\n\t   vTextureCoord = (aTextureCoord - vec2(0.5, 0.5)) * (1.0/uZoomFactor) + uZoomCenter;\n\t }\n}\n"
      );
      d.compileShader(b);
      d.getShaderParameter(b, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(b)), (b = null));
      var a = d.createShader(d.FRAGMENT_SHADER);
      d.shaderSource(
        a,
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform float uAlpha;\nuniform sampler2D uSampler;\nvoid main(void) {\n vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, uAlpha);\n}\n"
      );
      d.compileShader(a);
      d.getShaderParameter(a, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(a)), (a = null));
      this.oa = d.createProgram();
      d.attachShader(this.oa, b);
      d.attachShader(this.oa, a);
      d.linkProgram(this.oa);
      d.getProgramParameter(this.oa, d.LINK_STATUS) ||
        alert("Could not initialise shaders");
      this.oa.Z = d.getAttribLocation(this.oa, "aVertexPosition");
      d.enableVertexAttribArray(this.oa.Z);
      this.oa.Ca = d.getAttribLocation(this.oa, "aTextureCoord");
      d.enableVertexAttribArray(this.oa.Ca);
      a = d.createShader(d.FRAGMENT_SHADER);
      d.shaderSource(
        a,
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform float uColorPercent;\nuniform float uAlpha;\nuniform vec3 uDipColor;\nuniform sampler2D uSampler;\nvoid main(void) {\n vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n gl_FragColor = vec4(textureColor.x * (1.0 - uColorPercent) + uDipColor.x * uColorPercent, textureColor.y * (1.0 - uColorPercent) + uDipColor.y * uColorPercent, textureColor.z * (1.0 - uColorPercent) + uDipColor.z * uColorPercent, uAlpha);\n}\n"
      );
      d.compileShader(a);
      d.getShaderParameter(a, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(a)), (a = null));
      this.Ta = d.createProgram();
      d.attachShader(this.Ta, b);
      d.attachShader(this.Ta, a);
      d.linkProgram(this.Ta);
      d.getProgramParameter(this.Ta, d.LINK_STATUS) ||
        alert("Could not initialise shaders");
      this.Ta.Z = d.getAttribLocation(this.Ta, "aVertexPosition");
      d.enableVertexAttribArray(this.Ta.Z);
      this.Ta.Ca = d.getAttribLocation(this.Ta, "aTextureCoord");
      d.enableVertexAttribArray(this.Ta.Ca);
      a = d.createShader(d.FRAGMENT_SHADER);
      d.shaderSource(
        a,
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform bool uRound;\nuniform float uRadius;\nuniform vec2 uRectDim;\nuniform vec2 uIrisCenter;\nuniform float uSoftEdge;\nuniform sampler2D uSampler;\nvoid main(void) {\n float alpha = 0.0;\n vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n if (uRound) {\n\t  vec2 diff = uIrisCenter - gl_FragCoord.xy;\n\t   float distFromCenter = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n\t   if (distFromCenter > uRadius) {\n      alpha = 1.0;\n    } else {\n      alpha = 1.0 - ((uRadius - distFromCenter) / uSoftEdge);\n    };\n }\n else {\n    float alphaFromLeft = 1.0 - ((gl_FragCoord.x -(uIrisCenter.x - uRectDim.x)) / uSoftEdge);\n    float alphaFromRight = 1.0 - (((uIrisCenter.x + uRectDim.x) - gl_FragCoord.x) / uSoftEdge);\n    float alphaFromTop = 1.0 - ((gl_FragCoord.y -(uIrisCenter.y - uRectDim.y)) / uSoftEdge);\n    float alphaFromBottom = 1.0 - (((uIrisCenter.y + uRectDim.y) - gl_FragCoord.y) / uSoftEdge);\n    alpha = max(max(alphaFromLeft, alphaFromRight), max(alphaFromTop, alphaFromBottom));\n }\n gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, alpha);\n}\n"
      );
      d.compileShader(a);
      d.getShaderParameter(a, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(a)), (a = null));
      this.Ha = d.createProgram();
      d.attachShader(this.Ha, b);
      d.attachShader(this.Ha, a);
      d.linkProgram(this.Ha);
      d.getProgramParameter(this.Ha, d.LINK_STATUS) ||
        alert("Could not initialise shaders");
      this.Ha.Z = d.getAttribLocation(this.Ha, "aVertexPosition");
      d.enableVertexAttribArray(this.Ha.Z);
      this.Ha.Ca = d.getAttribLocation(this.Ha, "aTextureCoord");
      d.enableVertexAttribArray(this.Ha.Ca);
      a = d.createShader(d.FRAGMENT_SHADER);
      d.shaderSource(
        a,
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform float uPercent;\nuniform int uDirection;\nuniform vec2 uCanvasDimensions;\nuniform float uSoftEdge;\nuniform sampler2D uSampler;\nvoid main(void) {\n vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n float alpha = 0.0;\n if (uDirection == 1) {\n\t if (gl_FragCoord.x > uPercent) {\n    alpha = 1.0; \n  } else {\n    alpha = 1.0 - ((uPercent - gl_FragCoord.x) / uSoftEdge);\n  }\n }\n if (uDirection == 2) {\n\t if (gl_FragCoord.x < uCanvasDimensions.x - uPercent) {\n    alpha = 1.0; \n  } else {\n    alpha = 1.0 - ((gl_FragCoord.x - (uCanvasDimensions.x - uPercent)) / uSoftEdge);\n  }\n }\n if (uDirection == 3) {\n\t if (gl_FragCoord.y < uCanvasDimensions.y - uPercent) {\n    alpha = 1.0; \n  } else {\n    alpha = 1.0 - ((gl_FragCoord.y - (uCanvasDimensions.y - uPercent)) / uSoftEdge);\n  }\n }\n if (uDirection == 4) {\n\t if (gl_FragCoord.y > uPercent) {\n    alpha = 1.0; \n  } else {\n    alpha = 1.0 - ((uPercent - gl_FragCoord.y) / uSoftEdge);\n  }\n }\n gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, alpha);\n}\n"
      );
      d.compileShader(a);
      d.getShaderParameter(a, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(a)), (a = null));
      this.Na = d.createProgram();
      d.attachShader(this.Na, b);
      d.attachShader(this.Na, a);
      d.linkProgram(this.Na);
      d.getProgramParameter(this.Na, d.LINK_STATUS) ||
        alert("Could not initialise shaders");
      this.Na.Z = d.getAttribLocation(this.Na, "aVertexPosition");
      d.enableVertexAttribArray(this.Na.Z);
      this.Na.Ca = d.getAttribLocation(this.Na, "aTextureCoord");
      d.enableVertexAttribArray(this.Na.Ca);
    };
    f.prototype.Jc = function () {
      var d = this.g.H;
      if (!d) return !1;
      if ((this.ac = d.createFramebuffer())) {
        d.bindFramebuffer(d.FRAMEBUFFER, this.ac);
        this.ac.width = 1024;
        this.ac.height = 1024;
        this.Je = d.createTexture();
        d.bindTexture(d.TEXTURE_2D, this.Je);
        d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.LINEAR);
        d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.LINEAR);
        d.texImage2D(
          d.TEXTURE_2D,
          0,
          d.RGBA,
          this.ac.width,
          this.ac.height,
          0,
          d.RGBA,
          d.UNSIGNED_BYTE,
          null
        );
        var b = d.createRenderbuffer();
        d.bindRenderbuffer(d.RENDERBUFFER, b);
        d.renderbufferStorage(
          d.RENDERBUFFER,
          d.DEPTH_COMPONENT16,
          this.ac.width,
          this.ac.height
        );
        d.framebufferTexture2D(
          d.FRAMEBUFFER,
          d.COLOR_ATTACHMENT0,
          d.TEXTURE_2D,
          this.Je,
          0
        );
        d.framebufferRenderbuffer(
          d.FRAMEBUFFER,
          d.DEPTH_ATTACHMENT,
          d.RENDERBUFFER,
          b
        );
        d.bindTexture(d.TEXTURE_2D, null);
        d.bindRenderbuffer(d.RENDERBUFFER, null);
        d.bindFramebuffer(d.FRAMEBUFFER, null);
        this.jb = d.createBuffer();
        d.bindBuffer(d.ARRAY_BUFFER, this.jb);
        d.bufferData(
          d.ARRAY_BUFFER,
          new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]),
          d.STATIC_DRAW
        );
        this.jb.Lc = 3;
        this.jb.Ud = 4;
        this.sf = d.createBuffer();
        d.bindBuffer(d.ARRAY_BUFFER, this.sf);
        d.bufferData(
          d.ARRAY_BUFFER,
          new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
          d.STATIC_DRAW
        );
        return !0;
      }
      return !1;
    };
    f.prototype.Ol = function (d) {
      var b = this.g.H,
        a = this.g.rb;
      if (this.sd) {
        b.useProgram(this.oa);
        b.bindBuffer(b.ARRAY_BUFFER, this.jb);
        b.vertexAttribPointer(this.oa.Z, this.jb.Lc, b.FLOAT, !1, 0, 0);
        b.bindBuffer(b.ARRAY_BUFFER, this.sf);
        b.vertexAttribPointer(this.oa.Ca, 2, b.FLOAT, !1, 0, 0);
        b.enableVertexAttribArray(this.oa.Z);
        b.enableVertexAttribArray(this.oa.Ca);
        b.activeTexture(b.TEXTURE0);
        b.bindTexture(b.TEXTURE_2D, this.Je);
        a = 1 + (this.yb - 1) * d;
        var c = b.getUniformLocation(this.oa, "uAlpha");
        b.uniform1f(c, 1);
        c = b.getUniformLocation(this.oa, "uZoomIn");
        b.uniform1i(c, 1);
        c = b.getUniformLocation(this.oa, "uZoomCenter");
        var k = 0.5 + (this.kh - 0.5) * Math.sqrt(d),
          l = 0.5 + (this.lh - 0.5) * Math.sqrt(d);
        0 > k - 0.5 / a && (k = 0.5 / a);
        0 > l - 0.5 / a && (l = 0.5 / a);
        1 < k + 0.5 / a && (k = 1 - 0.5 / a);
        1 < l + 0.5 / a && (l = 1 - 0.5 / a);
        b.uniform2f(c, k, l);
        k = b.getUniformLocation(this.oa, "uZoomFactor");
        b.uniform1f(k, a);
        b.uniform1i(b.getUniformLocation(this.oa, "uSampler"), 0);
        b.drawArrays(b.TRIANGLE_STRIP, 0, this.jb.Ud);
        b.useProgram(this.g.na.F);
      } else {
        this.g.$g();
        b.blendFuncSeparate(
          b.SRC_ALPHA,
          b.ONE_MINUS_SRC_ALPHA,
          b.SRC_ALPHA,
          b.ONE
        );
        b.enable(b.BLEND);
        b.disable(b.DEPTH_TEST);
        k = 0.5 + (this.kh - 0.5);
        l = 0.5 + (this.lh - 0.5);
        0 > k - 0.5 / this.yb && (k = 0.5 / this.yb);
        0 > l - 0.5 / this.yb && (l = 0.5 / this.yb);
        1 < k + 0.5 / this.yb && (k = 1 - 0.5 / this.yb);
        1 < l + 0.5 / this.yb && (l = 1 - 0.5 / this.yb);
        if ("crossdissolve" == this.type)
          b.useProgram(this.oa),
            b.bindBuffer(b.ARRAY_BUFFER, this.jb),
            b.vertexAttribPointer(this.oa.Z, this.jb.Lc, b.FLOAT, !1, 0, 0),
            b.bindBuffer(b.ARRAY_BUFFER, this.sf),
            b.vertexAttribPointer(this.oa.Ca, 2, b.FLOAT, !1, 0, 0),
            b.activeTexture(b.TEXTURE0),
            b.bindTexture(b.TEXTURE_2D, this.Je),
            (c = b.getUniformLocation(this.oa, "uAlpha")),
            b.uniform1f(c, 1 - d),
            (c = b.getUniformLocation(this.oa, "uZoomIn")),
            b.uniform1i(c, 1 == this.Oa || 2 == this.Oa ? 1 : 0),
            (c = b.getUniformLocation(this.oa, "uZoomCenter")),
            b.uniform2f(c, k, l),
            (k = b.getUniformLocation(this.oa, "uZoomFactor")),
            b.uniform1f(k, this.yb),
            b.uniform1i(b.getUniformLocation(this.oa, "uSampler"), 0);
        else if ("diptocolor" == this.type)
          b.useProgram(this.Ta),
            b.bindBuffer(b.ARRAY_BUFFER, this.jb),
            b.vertexAttribPointer(this.Ta.Z, this.jb.Lc, b.FLOAT, !1, 0, 0),
            b.bindBuffer(b.ARRAY_BUFFER, this.sf),
            b.vertexAttribPointer(this.Ta.Ca, 2, b.FLOAT, !1, 0, 0),
            b.activeTexture(b.TEXTURE0),
            b.bindTexture(b.TEXTURE_2D, this.Je),
            b.uniform1f(
              b.getUniformLocation(this.Ta, "uColorPercent"),
              Math.min(2 * d, 1)
            ),
            (c = b.getUniformLocation(this.Ta, "uAlpha")),
            b.uniform1f(c, 1 - Math.max(2 * (d - 0.5), 0)),
            b.uniform3f(
              b.getUniformLocation(this.Ta, "uDipColor"),
              ((this.Qe >> 16) & 255) / 255,
              ((this.Qe >> 8) & 255) / 255,
              (this.Qe & 255) / 255
            ),
            (c = b.getUniformLocation(this.Ta, "uZoomIn")),
            b.uniform1i(c, 1 == this.Oa || 2 == this.Oa ? 1 : 0),
            (c = b.getUniformLocation(this.Ta, "uZoomCenter")),
            b.uniform2f(c, k, l),
            (k = b.getUniformLocation(this.Ta, "uZoomFactor")),
            b.uniform1f(k, this.yb),
            b.uniform1i(b.getUniformLocation(this.Ta, "uSampler"), 0);
        else if (
          "irisround" == this.type ||
          "irisroundcenter" == this.type ||
          "irisrectangular" == this.type ||
          "irisrectangularcenter" == this.type
        ) {
          b.useProgram(this.Ha);
          b.bindBuffer(b.ARRAY_BUFFER, this.jb);
          b.vertexAttribPointer(this.Ha.Z, this.jb.Lc, b.FLOAT, !1, 0, 0);
          b.bindBuffer(b.ARRAY_BUFFER, this.sf);
          b.vertexAttribPointer(this.Ha.Ca, 2, b.FLOAT, !1, 0, 0);
          b.activeTexture(b.TEXTURE0);
          b.bindTexture(b.TEXTURE_2D, this.Je);
          if (
            1 == this.Oa ||
            2 == this.Oa ||
            "irisroundcenter" == this.type ||
            "irisrectangularcenter" == this.type
          )
            var e = (c = 0.5);
          else (c = this.kh), (e = this.lh);
          var f = c * a.width,
            t = e * a.height;
          f = Math.max(f, a.width - f);
          t = Math.max(t, a.height - t);
          "irisround" == this.type || "irisroundcenter" == this.type
            ? b.uniform1f(
                b.getUniformLocation(this.Ha, "uRadius"),
                (Math.sqrt(f * f + t * t) + this.Cc) * d
              )
            : (f > t
                ? ((t = (a.height / a.width) * f + this.Cc), (f += this.Cc))
                : ((f = (a.width / a.height) * t + this.Cc), (t += this.Cc)),
              b.uniform2f(
                b.getUniformLocation(this.Ha, "uRectDim"),
                f * d,
                t * d
              ));
          d = b.getUniformLocation(this.Ha, "uSoftEdge");
          b.uniform1f(d, this.Cc);
          b.uniform1i(
            b.getUniformLocation(this.Ha, "uRound"),
            "irisround" == this.type || "irisroundcenter" == this.type ? 1 : 0
          );
          b.uniform2f(
            b.getUniformLocation(this.Ha, "uIrisCenter"),
            c * a.width,
            e * a.height
          );
          c = b.getUniformLocation(this.Ha, "uZoomIn");
          b.uniform1i(c, 1 == this.Oa || 2 == this.Oa ? 1 : 0);
          c = b.getUniformLocation(this.Ha, "uZoomCenter");
          b.uniform2f(c, k, l);
          k = b.getUniformLocation(this.Ha, "uZoomFactor");
          b.uniform1f(k, this.yb);
          b.uniform1i(b.getUniformLocation(this.Ha, "uSampler"), 0);
        } else if (
          "wipeleftright" == this.type ||
          "wiperightleft" == this.type ||
          "wipetopbottom" == this.type ||
          "wipebottomtop" == this.type ||
          "wiperandom" == this.type
        )
          b.useProgram(this.Na),
            b.bindBuffer(b.ARRAY_BUFFER, this.jb),
            b.vertexAttribPointer(this.Na.Z, this.jb.Lc, b.FLOAT, !1, 0, 0),
            b.bindBuffer(b.ARRAY_BUFFER, this.sf),
            b.vertexAttribPointer(this.Na.Ca, 2, b.FLOAT, !1, 0, 0),
            b.activeTexture(b.TEXTURE0),
            b.bindTexture(b.TEXTURE_2D, this.Je),
            b.uniform1f(
              b.getUniformLocation(this.Na, "uPercent"),
              3 > this.Ui ? d * (a.width + this.Cc) : d * (a.height + this.Cc)
            ),
            (d = b.getUniformLocation(this.Na, "uSoftEdge")),
            b.uniform1f(d, this.Cc),
            b.uniform1i(b.getUniformLocation(this.Na, "uDirection"), this.Ui),
            b.uniform2f(
              b.getUniformLocation(this.Na, "uCanvasDimensions"),
              a.width,
              a.height
            ),
            (c = b.getUniformLocation(this.Na, "uZoomIn")),
            b.uniform1i(c, 1 == this.Oa || 2 == this.Oa ? 1 : 0),
            (c = b.getUniformLocation(this.Na, "uZoomCenter")),
            b.uniform2f(c, k, l),
            (k = b.getUniformLocation(this.Na, "uZoomFactor")),
            b.uniform1f(k, this.yb),
            b.uniform1i(b.getUniformLocation(this.Na, "uSampler"), 0);
        b.drawArrays(b.TRIANGLE_STRIP, 0, this.jb.Ud);
        b.useProgram(this.g.na.F);
        b.disable(b.BLEND);
        b.enable(b.DEPTH_TEST);
      }
    };
    return f;
  })();
  m.Pm = f;
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  var f = (function () {
    function f(d) {
      this.Yg = [];
      this.g = d;
      this.enabled = !1;
      this.xb = 2;
      this.yk = !1;
    }
    f.prototype.Gk = function (d) {
      if (2 == d.mode || 3 == d.mode || 5 == d.mode) {
        var b = this.g.sa.currentTime,
          a = d.xc.gain.value,
          c = d.vc.gain.value,
          k = d.wc.gain.value;
        d.uc.gain.linearRampToValueAtTime(d.uc.gain.value, b);
        d.uc.gain.linearRampToValueAtTime(0, b + this.xb);
        d.xc.gain.linearRampToValueAtTime(a, b);
        d.xc.gain.linearRampToValueAtTime(0, b + this.xb);
        d.vc.gain.linearRampToValueAtTime(c, b);
        d.vc.gain.linearRampToValueAtTime(0, b + this.xb);
        d.wc.gain.linearRampToValueAtTime(k, b);
        d.wc.gain.linearRampToValueAtTime(0, b + this.xb);
      } else
        (b = this.g.sa.currentTime),
          d.dd.gain.linearRampToValueAtTime(d.dd.gain.value, b),
          d.dd.gain.linearRampToValueAtTime(0, b + this.xb);
      d.wh = !0;
      setTimeout(function () {
        d.Gd();
      }, 1e3 * this.xb + 5);
    };
    f.prototype.Wp = function () {
      for (var d = 0; d < this.g.N.length; d++) {
        var b = this.g.N[d];
        -1 == this.g.Qc.indexOf(b.id) &&
          (-1 == this.g.Qc.indexOf("_main") || -1 != this.g.ce.indexOf(b.id)) &&
          !this.g.Ub(b.id) &&
          -1 < b.loop &&
          4 != b.mode &&
          6 != b.mode &&
          (b.ja ? b.Yc() : (b.b.play(), (b.b.currentTime = 0)));
      }
    };
    f.prototype.Cn = function () {
      var d = (this.g.sa.currentTime - this.Sp) / this.xb;
      d = Math.min(1, d);
      for (var b = 0; b < this.g.N.length; b++) {
        var a = this.g.N[b];
        this.g.Ub(a.id) && 1 > a.la && (a.la = d);
      }
      1 == d && clearInterval(this.Rp);
    };
    return f;
  })();
  m.Qm = f;
})(ggP2VR || (ggP2VR = {}));
(function (m) {
  var f = (function () {
    function f(d) {
      this.Dg = [];
      this.Zc = null;
      this.Zb = [];
      this.Tb = [];
      this.$b = [];
      this.Lj = !0;
      this.g = d;
      this.tn();
    }
    f.prototype.sg = function () {
      var d = this.g.H,
        b = d.createShader(d.VERTEX_SHADER);
      d.shaderSource(
        b,
        "attribute vec3 aVertexPosition;\nvoid main(void) {\n gl_Position = vec4(aVertexPosition, 1.0);\n}\n"
      );
      d.compileShader(b);
      d.getShaderParameter(b, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(b)), (b = null));
      var a = d.createShader(d.FRAGMENT_SHADER);
      d.shaderSource(
        a,
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec4 vColor;\nuniform vec2 uCanvasDimensions;\nuniform vec2 uFlareCenterPosition;\nuniform float uBlindingValue;\nuniform float uAspectRatio;\nvoid main(void) {\n float canvasDiag = sqrt( (uCanvasDimensions.x * uCanvasDimensions.x) + (uCanvasDimensions.y * uCanvasDimensions.y) );\n vec2 diff = uFlareCenterPosition - gl_FragCoord.xy;\n diff.y = diff.y * uAspectRatio;\n float distFromFlarePoint = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n float factor = (distFromFlarePoint / canvasDiag) / 10.0;\n gl_FragColor = vec4(1.0, 1.0, 1.0, pow(((1.0 - factor) * 0.8) * uBlindingValue, 2.0));\n}\n"
      );
      d.compileShader(a);
      d.getShaderParameter(a, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(a)), (a = null));
      this.fc = d.createProgram();
      d.attachShader(this.fc, b);
      d.attachShader(this.fc, a);
      d.linkProgram(this.fc);
      d.getProgramParameter(this.fc, d.LINK_STATUS) ||
        alert("Could not initialise shaders");
      this.fc.Z = d.getAttribLocation(this.fc, "aVertexPosition");
      d.enableVertexAttribArray(this.fc.Z);
      a = d.createShader(d.VERTEX_SHADER);
      b = d.createShader(d.VERTEX_SHADER);
      d.shaderSource(
        a,
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\nvarying vec4 vColor;\nuniform vec2 uCirclePosition;\nuniform float uCircleRadius;\nuniform vec2 uCanvasDimensions2;\nuniform float uAspectRatio;\nvoid main(void) {\n vec2 circleOnScreen = aVertexPosition.xy * uCircleRadius + uCirclePosition;\n circleOnScreen.y = circleOnScreen.y / uAspectRatio;\n vec2 circleNorm = (circleOnScreen / uCanvasDimensions2) * 2.0 - vec2(1.0, 1.0);\n gl_Position = vec4(circleNorm.x, circleNorm.y, 0.0, 1.0);\n}\n"
      );
      d.compileShader(a);
      d.getShaderParameter(a, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(a)), (a = null));
      d.shaderSource(
        b,
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\nvarying vec4 vColor;\nuniform vec2 uCirclePosition;\nuniform float uCircleRadius;\nuniform vec2 uCanvasDimensions2;\nuniform float uAspectRatio;\nvoid main(void) {\n vec2 circleOnScreen = aVertexPosition.xy * uCircleRadius + uCirclePosition;\n circleOnScreen.y = circleOnScreen.y / uAspectRatio;\n vec2 circleNorm = (circleOnScreen / uCanvasDimensions2) * 2.0 - vec2(1.0, 1.0);\n gl_Position = vec4(circleNorm.x, circleNorm.y, 0.0, 1.0);\n}\n"
      );
      d.compileShader(b);
      d.getShaderParameter(b, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(b)), (a = null));
      var c = d.createShader(d.FRAGMENT_SHADER);
      d.shaderSource(
        c,
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec4 vColor;\nuniform vec2 uCircleTexturePosition;\nuniform vec3 uCircleColor;\nuniform float uCircleRadius;\nuniform float uCircleAlpha;\nuniform float uCircleSoftness;\nuniform float uAspectRatio;\nvoid main(void) {\n vec2 diff = uCircleTexturePosition - gl_FragCoord.xy;\n diff.y = diff.y * uAspectRatio;\n float distFromCircleCenter = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n float softnessDistance = uCircleRadius * (1.0 - uCircleSoftness);\n if (distFromCircleCenter > uCircleRadius)\n {\n\t  gl_FragColor = vec4(uCircleColor, 0.0);\n }\n else if (distFromCircleCenter <= (softnessDistance))\n {\n\t  float factor = distFromCircleCenter / softnessDistance;\n\t  gl_FragColor = vec4(uCircleColor, pow((1.0 - (0.2 * factor)) * uCircleAlpha, 1.8));\n }\n else\n {\n\t  float factor = (distFromCircleCenter - softnessDistance) / (uCircleRadius - softnessDistance);\n\t  gl_FragColor = vec4(uCircleColor, pow((0.8 - (0.8 * factor)) * uCircleAlpha, 1.8));\n }\n}\n"
      );
      d.compileShader(c);
      d.getShaderParameter(c, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(c)), (c = null));
      this.qa = d.createProgram();
      d.attachShader(this.qa, a);
      d.attachShader(this.qa, c);
      d.linkProgram(this.qa);
      d.getProgramParameter(this.qa, d.LINK_STATUS) ||
        alert("Could not initialise shaders");
      this.qa.Z = d.getAttribLocation(this.qa, "aVertexPosition");
      d.enableVertexAttribArray(this.qa.Z);
      a = d.createShader(d.FRAGMENT_SHADER);
      d.shaderSource(
        a,
        "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec4 vColor;\nuniform vec2 uRingTexturePosition;\nuniform float uRingRadius;\nuniform float uRingAlpha;\nuniform float uAspectRatio;\nuniform sampler2D uSampler;\nvoid main(void) {\n vec2 diff = uRingTexturePosition - gl_FragCoord.xy;\n diff.y = diff.y * uAspectRatio;\n float distFromRingCenter = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n float factor = distFromRingCenter / uRingRadius;\n if (distFromRingCenter > uRingRadius)\n {\n\t gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);\n }\n else\n {\n vec4 textureColor = texture2D(uSampler, vec2(factor / uAspectRatio, 0.5));\n gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, uRingAlpha);\n }\n}\n"
      );
      d.compileShader(a);
      d.getShaderParameter(a, d.COMPILE_STATUS) ||
        (alert(d.getShaderInfoLog(a)), (a = null));
      this.wb = d.createProgram();
      d.attachShader(this.wb, b);
      d.attachShader(this.wb, a);
      d.linkProgram(this.wb);
      d.getProgramParameter(this.wb, d.LINK_STATUS) ||
        alert("Could not initialise shaders");
      this.wb.Z = d.getAttribLocation(this.wb, "aVertexPosition");
    };
    f.prototype.Jc = function () {
      var d = this.g.H;
      this.wd = d.createBuffer();
      d.bindBuffer(d.ARRAY_BUFFER, this.wd);
      d.bufferData(
        d.ARRAY_BUFFER,
        new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]),
        d.STATIC_DRAW
      );
      this.wd.Lc = 3;
      this.wd.Ud = 4;
      this.Ze = d.createBuffer();
      d.bindBuffer(d.ARRAY_BUFFER, this.Ze);
      for (
        var b = [0, 0, 0],
          a = (2 * Math.PI) / 6,
          c = (Math.PI / 180) * 35,
          k = 1,
          l = c;
        l <= c + 2 * Math.PI;
        l += a
      )
        b.push(Math.sin(l)), b.push(-Math.cos(l)), b.push(0), k++;
      d.bufferData(d.ARRAY_BUFFER, new Float32Array(b), d.STATIC_DRAW);
      this.Ze.Lc = 3;
      this.Ze.Ud = k;
      this.bm = d.createTexture();
      d.bindTexture(d.TEXTURE_2D, this.bm);
      d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.LINEAR);
      d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.LINEAR);
      d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE);
      d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE);
      b = document.createElement("canvas");
      b.width = 100;
      b.height = 1;
      a = b.getContext("2d");
      a.width = 100;
      a.height = 1;
      c = a.createLinearGradient(0, 0, 100, 0);
      c.addColorStop(0, this.g.ga(16777215, 0));
      c.addColorStop(0.88, this.g.ga(0, 0));
      c.addColorStop(0.9, this.g.ga(16654848, 1));
      c.addColorStop(0.92, this.g.ga(16776448, 1));
      c.addColorStop(0.94, this.g.ga(4849466, 1));
      c.addColorStop(0.96, this.g.ga(131071, 1));
      c.addColorStop(0.98, this.g.ga(8190, 1));
      c.addColorStop(1, this.g.ga(0, 0));
      a.fillStyle = c;
      a.fillRect(0, 0, 100, 1);
      d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, d.RGBA, d.UNSIGNED_BYTE, b);
    };
    f.prototype.kp = function () {
      for (; 0 < this.Dg.length; ) this.Dg.pop();
    };
    f.prototype.tn = function () {
      var d = [],
        b = [],
        a = [];
      var c = { m: 14, alpha: 0.2, color: 11390415, j: 0.27 };
      d.push(c);
      c = { m: 20, alpha: 0.25, color: 11390415, j: 0.4 };
      d.push(c);
      c = { m: 10, alpha: 0.2, color: 12442332, j: 0.6 };
      d.push(c);
      c = { m: 15, alpha: 0.2, color: 11390415, j: 0.8 };
      d.push(c);
      c = { m: 10, alpha: 0.2, color: 12442332, j: 1.5 };
      d.push(c);
      c = { m: 15, alpha: 0.2, color: 11390415, j: 1.8 };
      d.push(c);
      c = { m: 8, alpha: 0.2, color: 12575203, v: 0.8, j: 0.7 };
      b.push(c);
      c = { m: 7, alpha: 0.4, color: 12575203, v: 0.5, j: 1.6 };
      b.push(c);
      c = { m: 5, alpha: 0.4, color: 12575203, v: 0.6, j: 0.9 };
      b.push(c);
      c = { m: 8, alpha: 0.3, color: 12575203, v: 0.4, j: 1.1 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 30, alpha: 0.3, color: 11390415, j: 0.5 };
      d.push(c);
      c = { m: 10, alpha: 0.3, color: 11390415, j: 1 };
      d.push(c);
      c = { m: 20, alpha: 0.3, color: 11390415, j: 1.3 };
      d.push(c);
      c = { m: 10, alpha: 0.3, color: 11390415, j: 1.5 };
      d.push(c);
      c = { m: 15, alpha: 0.3, color: 11390415, j: 1.8 };
      d.push(c);
      c = { m: 10, alpha: 0.3, color: 15506856, v: 0.8, j: 0.7 };
      b.push(c);
      c = { m: 20, alpha: 0.5, color: 15506856, v: 0.5, j: 1.6 };
      b.push(c);
      c = { m: 5, alpha: 0.5, color: 15506856, v: 0.6, j: 0.9 };
      b.push(c);
      c = { m: 60, alpha: 0.4, color: 15506856, v: 0.2, j: 1.1 };
      b.push(c);
      a.push({ m: 220, alpha: 0.035, j: 2 });
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 30, alpha: 0.5, color: 15465727, j: 0.5 };
      d.push(c);
      c = { m: 40, alpha: 0.28, color: 15726842, j: 0.8 };
      d.push(c);
      c = { m: 25, alpha: 0.32, color: 15726842, j: 1.1 };
      d.push(c);
      c = { m: 15, alpha: 0.25, color: 15726842, j: 1.35 };
      d.push(c);
      c = { m: 10, alpha: 0.28, color: 15465727, j: 1.65 };
      d.push(c);
      c = { m: 10, alpha: 0.45, color: 15465727, v: 0.8, j: 0.7 };
      b.push(c);
      c = { m: 7, alpha: 0.5, color: 15465727, v: 0.4, j: 0.9 };
      b.push(c);
      c = { m: 40, alpha: 0.4, color: 15465727, v: 0.3, j: 0.38 };
      b.push(c);
      c = { m: 50, alpha: 0.4, color: 15465727, v: 0.5, j: 1.25 };
      b.push(c);
      c = { m: 18, alpha: 0.2, color: 15465727, v: 0.5, j: 1.25 };
      b.push(c);
      c = { m: 10, alpha: 0.34, color: 15726842, v: 0.8, j: 1.5 };
      b.push(c);
      c = { m: 38, alpha: 0.37, color: 15465727, v: 0.3, j: -0.5 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 16, alpha: 0.5, color: 16363159, j: 0.1 };
      d.push(c);
      c = { m: 26, alpha: 0.3, color: 16091819, j: 0.32 };
      d.push(c);
      c = { m: 29, alpha: 0.2, color: 16091819, j: 1.32 };
      d.push(c);
      c = { m: 20, alpha: 0.18, color: 16363159, j: 1.53 };
      d.push(c);
      c = { m: 27, alpha: 0.13, color: 16425092, j: 1.6 };
      d.push(c);
      c = { m: 20, alpha: 0.1, color: 16091819, j: 1.75 };
      d.push(c);
      c = { m: 12, alpha: 0.45, color: 16312238, v: 0.45, j: 0.2 };
      b.push(c);
      c = { m: 8, alpha: 0.25, color: 16434209, v: 0.7, j: 0.33 };
      b.push(c);
      c = { m: 9, alpha: 0.25, color: 16091819, v: 0.4, j: 0.7 };
      b.push(c);
      c = { m: 7, alpha: 0.2, color: 16091819, v: 0.4, j: 0.85 };
      b.push(c);
      c = { m: 60, alpha: 0.23, color: 16091819, v: 0.55, j: 1.05 };
      b.push(c);
      c = { m: 37, alpha: 0.1, color: 16091819, v: 0.55, j: 1.22 };
      b.push(c);
      c = { m: 10, alpha: 0.25, color: 16363159, v: 0.65, j: 1.38 };
      b.push(c);
      c = { m: 7, alpha: 0.2, color: 16434209, v: 0.5, j: 1.45 };
      b.push(c);
      c = { m: 3, alpha: 0.2, color: 16416033, v: 0.5, j: 1.78 };
      b.push(c);
      c = { m: 6, alpha: 0.18, color: 16434209, v: 0.45, j: 1.9 };
      b.push(c);
      c = { m: 4, alpha: 0.14, color: 16766514, v: 0.45, j: 2.04 };
      b.push(c);
      c = { m: 30, alpha: 0.14, color: 16766514, v: 0.8, j: 0.04 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 9, alpha: 0.3, color: 14346999, v: 0.3, j: 0.3 };
      b.push(c);
      c = { m: 5, alpha: 0.5, color: 14148072, v: 0.8, j: 0.6 };
      b.push(c);
      c = { m: 3, alpha: 0.37, color: 14346999, v: 0.66, j: 0.8 };
      b.push(c);
      c = { m: 45, alpha: 0.2, color: 14346999, v: 0.36, j: 1.2 };
      b.push(c);
      c = { m: 13, alpha: 0.2, color: 14346999, v: 0.36, j: 1.23 };
      b.push(c);
      c = { m: 11, alpha: 0.2, color: 14148072, v: 0.36, j: 1.28 };
      b.push(c);
      c = { m: 27, alpha: 0.16, color: 14346999, v: 0.36, j: 1.55 };
      b.push(c);
      c = { m: 6, alpha: 0.36, color: 14148072, v: 0.8, j: 1.7 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 24, alpha: 0.2, color: 15186464, j: 0.2 };
      d.push(c);
      c = { m: 7, alpha: 0.26, color: 15186464, j: 0.35 };
      d.push(c);
      c = { m: 23, alpha: 0.18, color: 15186464, j: 0.65 };
      d.push(c);
      c = { m: 13, alpha: 0.2, color: 15186464, j: 0.8 };
      d.push(c);
      c = { m: 11, alpha: 0.15, color: 15186464, j: 1.4 };
      d.push(c);
      c = { m: 15, alpha: 0.11, color: 15451904, j: 1.6 };
      d.push(c);
      c = { m: 6, alpha: 0.45, color: 15579138, v: 0.45, j: 0.22 };
      b.push(c);
      c = { m: 3, alpha: 0.3, color: 15451904, v: 0.25, j: 0.4 };
      b.push(c);
      c = { m: 4, alpha: 0.2, color: 15451904, v: 0.25, j: 0.45 };
      b.push(c);
      c = { m: 65, alpha: 0.17, color: 15186464, v: 0.25, j: 0.5 };
      b.push(c);
      c = { m: 5, alpha: 0.45, color: 15579138, v: 0.45, j: 0.88 };
      b.push(c);
      c = { m: 140, alpha: 0.18, color: 15579138, v: 0.32, j: 0.95 };
      b.push(c);
      c = { m: 12, alpha: 0.22, color: 15579138, v: 0.32, j: 1.1 };
      b.push(c);
      c = { m: 8, alpha: 0.32, color: 15451904, v: 0.72, j: 1.2 };
      b.push(c);
      c = { m: 55, alpha: 0.2, color: 15451904, v: 0.45, j: 1.33 };
      b.push(c);
      c = { m: 4, alpha: 0.3, color: 15451904, v: 0.25, j: 1.42 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 16, alpha: 0.4, color: 10933495, j: 0.32 };
      d.push(c);
      c = { m: 14, alpha: 0.3, color: 11007484, j: 0.36 };
      d.push(c);
      c = { m: 10, alpha: 0.3, color: 4037331, j: 0.58 };
      d.push(c);
      c = { m: 14, alpha: 0.22, color: 8835068, j: 0.68 };
      d.push(c);
      c = { m: 10, alpha: 0.27, color: 11007484, j: 0.82 };
      d.push(c);
      c = { m: 11, alpha: 0.27, color: 10867450, j: 1 };
      d.push(c);
      c = { m: 9, alpha: 0.2, color: 6158332, j: 1.05 };
      d.push(c);
      c = { m: 10, alpha: 0.17, color: 10867450, j: 1.78 };
      d.push(c);
      c = { m: 10, alpha: 0.3, color: 4037331, j: -0.23 };
      d.push(c);
      c = { m: 8, alpha: 0.45, color: 8835068, v: 0.45, j: 0.175 };
      b.push(c);
      c = { m: 7, alpha: 0.4, color: 12574715, v: 0.55, j: 0.46 };
      b.push(c);
      c = { m: 3, alpha: 0.3, color: 10867450, v: 0.35, j: 0.5 };
      b.push(c);
      c = { m: 60, alpha: 0.37, color: 4031699, v: 0.75, j: 0.75 };
      b.push(c);
      c = { m: 3, alpha: 0.25, color: 4031699, v: 0.25, j: 0.75 };
      b.push(c);
      c = { m: 3, alpha: 0.2, color: 6158332, v: 0.25, j: 0.9 };
      b.push(c);
      c = { m: 7, alpha: 0.45, color: 8835068, v: 0.45, j: 1.3 };
      b.push(c);
      c = { m: 32, alpha: 0.22, color: 8835068, v: 0.75, j: 1.62 };
      b.push(c);
      c = { m: 9, alpha: 0.45, color: 4031699, v: 0.65, j: 1.6 };
      b.push(c);
      c = { m: 8, alpha: 0.25, color: 4031699, v: 0.65, j: 1.83 };
      b.push(c);
      c = { m: 7, alpha: 0.4, color: 12574715, v: 0.55, j: -0.18 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 16, alpha: 0.4, color: 16389120, j: 0.32 };
      d.push(c);
      c = { m: 26, alpha: 0.22, color: 16389120, j: 0.4 };
      d.push(c);
      c = { m: 26, alpha: 0.25, color: 16389120, j: 0.65 };
      d.push(c);
      c = { m: 18, alpha: 0.3, color: 16389120, j: 1.23 };
      d.push(c);
      c = { m: 14, alpha: 0.26, color: 16389120, j: 1.33 };
      d.push(c);
      c = { m: 17, alpha: 0.18, color: 16389120, j: 1.7 };
      d.push(c);
      c = { m: 30, alpha: 0.16, color: 16389120, j: 2.15 };
      d.push(c);
      c = { m: 100, alpha: 0.25, color: 16389120, v: 0.22, j: 1.45 };
      b.push(c);
      c = { m: 7, alpha: 0.5, color: 15628151, v: 0.3, j: 1.5 };
      b.push(c);
      c = { m: 3, alpha: 0.5, color: 15628151, v: 0.3, j: 1.52 };
      b.push(c);
      c = { m: 4, alpha: 0.5, color: 16389120, v: 0.3, j: 1.745 };
      b.push(c);
      c = { m: 9, alpha: 0.22, color: 16389120, v: 0.3, j: 1.8 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 16, alpha: 0.4, color: 10933495, j: 0.32 };
      d.push(c);
      c = { m: 14, alpha: 0.3, color: 11007484, j: 0.36 };
      d.push(c);
      c = { m: 10, alpha: 0.3, color: 4037331, j: 0.58 };
      d.push(c);
      c = { m: 14, alpha: 0.22, color: 8835068, j: 0.68 };
      d.push(c);
      c = { m: 10, alpha: 0.27, color: 11007484, j: 0.82 };
      d.push(c);
      c = { m: 11, alpha: 0.27, color: 10867450, j: 1 };
      d.push(c);
      c = { m: 9, alpha: 0.2, color: 6158332, j: 1.05 };
      d.push(c);
      c = { m: 10, alpha: 0.17, color: 10867450, j: 1.78 };
      d.push(c);
      c = { m: 10, alpha: 0.3, color: 4037331, j: -0.23 };
      d.push(c);
      c = { m: 8, alpha: 0.45, color: 8835068, v: 0.45, j: 0.175 };
      b.push(c);
      c = { m: 7, alpha: 0.4, color: 12574715, v: 0.55, j: 0.46 };
      b.push(c);
      c = { m: 3, alpha: 0.3, color: 10867450, v: 0.35, j: 0.5 };
      b.push(c);
      c = { m: 60, alpha: 0.37, color: 4031699, v: 0.75, j: 0.75 };
      b.push(c);
      c = { m: 3, alpha: 0.25, color: 4031699, v: 0.25, j: 0.75 };
      b.push(c);
      c = { m: 3, alpha: 0.2, color: 6158332, v: 0.25, j: 0.9 };
      b.push(c);
      c = { m: 7, alpha: 0.45, color: 8835068, v: 0.45, j: 1.3 };
      b.push(c);
      c = { m: 32, alpha: 0.22, color: 8835068, v: 0.75, j: 1.62 };
      b.push(c);
      c = { m: 9, alpha: 0.45, color: 4031699, v: 0.65, j: 1.6 };
      b.push(c);
      c = { m: 8, alpha: 0.25, color: 4031699, v: 0.65, j: 1.83 };
      b.push(c);
      c = { m: 7, alpha: 0.4, color: 12574715, v: 0.55, j: -0.18 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 16, alpha: 0.4, color: 16389120, j: 0.32 };
      d.push(c);
      c = { m: 26, alpha: 0.22, color: 16389120, j: 0.4 };
      d.push(c);
      c = { m: 26, alpha: 0.25, color: 16389120, j: 0.65 };
      d.push(c);
      c = { m: 18, alpha: 0.3, color: 16389120, j: 1.23 };
      d.push(c);
      c = { m: 14, alpha: 0.26, color: 16389120, j: 1.33 };
      d.push(c);
      c = { m: 17, alpha: 0.18, color: 16389120, j: 1.7 };
      d.push(c);
      c = { m: 30, alpha: 0.16, color: 16389120, j: 2.15 };
      d.push(c);
      c = { m: 100, alpha: 0.25, color: 16389120, v: 0.22, j: 1.45 };
      b.push(c);
      c = { m: 7, alpha: 0.5, color: 15628151, v: 0.3, j: 1.5 };
      b.push(c);
      c = { m: 3, alpha: 0.5, color: 15628151, v: 0.3, j: 1.52 };
      b.push(c);
      c = { m: 4, alpha: 0.5, color: 16389120, v: 0.3, j: 1.745 };
      b.push(c);
      c = { m: 9, alpha: 0.22, color: 16389120, v: 0.3, j: 1.8 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
      d = [];
      b = [];
      a = [];
      c = { m: 24, alpha: 0.2, color: 15186464, j: 0.2 };
      d.push(c);
      c = { m: 7, alpha: 0.26, color: 15186464, j: 0.35 };
      d.push(c);
      c = { m: 23, alpha: 0.18, color: 15186464, j: 0.65 };
      d.push(c);
      c = { m: 13, alpha: 0.2, color: 15186464, j: 0.8 };
      d.push(c);
      c = { m: 11, alpha: 0.15, color: 15186464, j: 1.4 };
      d.push(c);
      c = { m: 15, alpha: 0.11, color: 15451904, j: 1.6 };
      d.push(c);
      c = { m: 6, alpha: 0.45, color: 15579138, v: 0.45, j: 0.22 };
      b.push(c);
      c = { m: 3, alpha: 0.3, color: 15451904, v: 0.25, j: 0.4 };
      b.push(c);
      c = { m: 4, alpha: 0.2, color: 15451904, v: 0.25, j: 0.45 };
      b.push(c);
      c = { m: 65, alpha: 0.17, color: 15186464, v: 0.25, j: 0.5 };
      b.push(c);
      c = { m: 5, alpha: 0.45, color: 15579138, v: 0.45, j: 0.88 };
      b.push(c);
      c = { m: 140, alpha: 0.18, color: 15579138, v: 0.32, j: 0.95 };
      b.push(c);
      c = { m: 12, alpha: 0.22, color: 15579138, v: 0.32, j: 1.1 };
      b.push(c);
      c = { m: 8, alpha: 0.32, color: 15451904, v: 0.72, j: 1.2 };
      b.push(c);
      c = { m: 55, alpha: 0.2, color: 15451904, v: 0.45, j: 1.33 };
      b.push(c);
      c = { m: 4, alpha: 0.3, color: 15451904, v: 0.25, j: 1.42 };
      b.push(c);
      this.Zb.push(d);
      this.Tb.push(b);
      this.$b.push(a);
    };
    f.prototype.Wo = function () {
      if (this.Lj) {
        var d = this.g.H,
          b,
          a = new m.xa(0, 0, -100),
          c = this.g.ed(),
          k = 0,
          l = 0,
          e = !1;
        if (this.g.Y) {
          var f = this.g.rb.width;
          var t = this.g.rb.height;
          this.g.B.Xg && ((f = this.g.B.ac.width), (t = this.g.B.ac.height));
        } else {
          this.S || (this.S = this.Zc.getContext("2d"));
          if (
            this.S.width !== this.g.o.width ||
            this.S.height !== this.g.o.height
          )
            (this.S.width = this.g.o.width), (this.S.height = this.g.o.height);
          this.S.clear
            ? this.S.clear()
            : this.S.clearRect(0, 0, this.Zc.width, this.Zc.height);
          f = this.S.width;
          t = this.S.height;
        }
        var g = Math.sqrt(f * f + t * t),
          h = g / 800;
        for (b = 0; b < this.Dg.length; b++) {
          var n = this.Dg[b];
          a.Za(0, 0, -100);
          a.wa((-n.i * Math.PI) / 180);
          a.Ea((n.pan * Math.PI) / 180);
          a.Ea((-this.g.pan.c * Math.PI) / 180);
          a.wa((this.g.i.c * Math.PI) / 180);
          a.kb((this.g.O.c * Math.PI) / 180);
          if (-0.01 > a.z) {
            l = -c / a.z;
            k = a.x * l;
            l *= a.y;
            var y = Math.max(f, t);
            Math.abs(k) < y / 2 + 100 &&
              Math.abs(l) < y / 2 + 100 &&
              ((e = !0), (k += f / 2), (l += t / 2));
          }
          if (e) {
            this.g.Y &&
              (d.blendFunc(d.SRC_ALPHA, d.DST_ALPHA),
              d.enable(d.BLEND),
              d.disable(d.DEPTH_TEST));
            y = f / 2;
            var r = t / 2;
            var v = Math.sqrt((y - k) * (y - k) + (r - l) * (r - l));
            var u = g / 2;
            r = f > t ? f : t;
            y = (n.mk / 100) * ((u - v) / u);
            0 > y && (y = 0);
            if (this.g.Y) {
              d.useProgram(this.fc);
              d.bindBuffer(d.ARRAY_BUFFER, this.g.B.jb);
              d.vertexAttribPointer(
                this.fc.Z,
                this.g.B.jb.Lc,
                d.FLOAT,
                !1,
                0,
                0
              );
              var x = d.getUniformLocation(this.fc, "uCanvasDimensions");
              d.uniform2f(x, d.drawingBufferWidth, d.drawingBufferHeight);
              d.uniform2f(
                d.getUniformLocation(this.fc, "uFlareCenterPosition"),
                (d.drawingBufferWidth / f) * k,
                t - (d.drawingBufferHeight / t) * l
              );
              d.uniform1f(d.getUniformLocation(this.fc, "uBlindingValue"), y);
              x = d.getUniformLocation(this.fc, "uAspectRatio");
              d.uniform1f(
                x,
                this.g.B.Xg
                  ? d.drawingBufferWidth / d.drawingBufferHeight
                  : d.drawingBufferWidth / d.drawingBufferHeight / (f / t)
              );
              d.drawArrays(d.TRIANGLE_STRIP, 0, this.g.B.jb.Ud);
            } else
              (x = this.S.createRadialGradient(k, l, 1, k, l, r)),
                x.addColorStop(0, "rgba(255, 255, 255, " + y + ")"),
                x.addColorStop(0.5, "rgba(255, 255, 255, " + 0.8 * y + ")"),
                x.addColorStop(1, "rgba(255, 255, 255, " + 0.6 * y + ")"),
                (this.S.fillStyle = x),
                this.S.fillRect(0, 0, this.S.width, this.S.height);
            if (0 != Number(n.type) && !this.g.B.Xg) {
              y = f / 2 - k;
              r = t / 2 - l;
              var A = 1,
                w = Number(n.type) - 1;
              v < 0.35 * u && ((A = v / (0.35 * u)), (A *= A));
              v > 0.7 * u && (A = (u - v) / (0.3 * u));
              A *= n.alpha / 100;
              if (0 < this.Zb[w].length)
                for (v = 0; v < this.Zb[w].length; v++) {
                  var B = this.Zb[w][v];
                  u = B.m * h;
                  var z = B.alpha * A;
                  0 > z && (z = 0);
                  var C = B.color;
                  if (8 == w || 9 == w || 10 == w) C = n.color;
                  if (this.g.Y)
                    d.useProgram(this.qa),
                      d.bindBuffer(d.ARRAY_BUFFER, this.Ze),
                      d.vertexAttribPointer(
                        this.qa.Z,
                        this.Ze.Lc,
                        d.FLOAT,
                        !1,
                        0,
                        0
                      ),
                      (x = d.getUniformLocation(this.qa, "uCanvasDimensions2")),
                      d.uniform2f(
                        x,
                        d.drawingBufferWidth,
                        d.drawingBufferHeight
                      ),
                      d.uniform2f(
                        d.getUniformLocation(this.qa, "uCirclePosition"),
                        (d.drawingBufferWidth / f) * (k + y * B.j),
                        (d.drawingBufferWidth / f) * (t - (l + r * B.j))
                      ),
                      d.uniform2f(
                        d.getUniformLocation(this.qa, "uCircleTexturePosition"),
                        (d.drawingBufferWidth / f) * (k + y * B.j),
                        t - (l + r * B.j)
                      ),
                      d.uniform1f(
                        d.getUniformLocation(this.qa, "uCircleRadius"),
                        u
                      ),
                      d.uniform3f(
                        d.getUniformLocation(this.qa, "uCircleColor"),
                        ((C >> 16) & 255) / 255,
                        ((C >> 8) & 255) / 255,
                        (C & 255) / 255
                      ),
                      d.uniform1f(
                        d.getUniformLocation(this.qa, "uCircleAlpha"),
                        z
                      ),
                      d.uniform1f(
                        d.getUniformLocation(this.qa, "uCircleSoftness"),
                        0.1
                      ),
                      (x = d.getUniformLocation(this.qa, "uAspectRatio")),
                      d.uniform1f(
                        x,
                        d.drawingBufferWidth / d.drawingBufferHeight / (f / t)
                      ),
                      d.drawArrays(d.TRIANGLE_FAN, 0, this.Ze.Ud);
                  else {
                    this.S.save();
                    this.S.translate(k + y * B.j, l + r * B.j);
                    x = this.S.createRadialGradient(0, 0, 1, 0, 0, 1.1 * u);
                    x.addColorStop(0, this.g.ga(C, z));
                    x.addColorStop(0.65, this.g.ga(C, 0.9 * z));
                    x.addColorStop(0.8, this.g.ga(C, 0.7 * z));
                    x.addColorStop(1, this.g.ga(C, 0.2 * z));
                    this.S.beginPath();
                    C = (2 * Math.PI) / 6;
                    B = (Math.PI / 180) * 35;
                    var D = !0;
                    for (z = B; z <= B + 2 * Math.PI; z += C)
                      D
                        ? (this.S.moveTo(u * Math.sin(z), u * Math.cos(z)),
                          (D = !1))
                        : this.S.lineTo(u * Math.sin(z), u * Math.cos(z));
                    this.S.closePath();
                    this.S.fillStyle = x;
                    this.S.fill();
                    this.S.restore();
                  }
                }
              if (0 < this.Tb[w].length)
                for (v = 0; v < this.Tb[w].length; v++) {
                  B = this.Tb[w][v];
                  u = B.m * h;
                  z = B.alpha * A;
                  0 > z && (z = 0);
                  C = B.color;
                  if (8 == w || 9 == w || 10 == w) C = n.color;
                  this.g.Y
                    ? (d.useProgram(this.qa),
                      d.bindBuffer(d.ARRAY_BUFFER, this.wd),
                      d.vertexAttribPointer(
                        this.qa.Z,
                        this.wd.Lc,
                        d.FLOAT,
                        !1,
                        0,
                        0
                      ),
                      (x = d.getUniformLocation(this.qa, "uCanvasDimensions2")),
                      d.uniform2f(
                        x,
                        d.drawingBufferWidth,
                        d.drawingBufferHeight
                      ),
                      (x = d.getUniformLocation(this.qa, "uCirclePosition")),
                      d.uniform2f(
                        x,
                        (d.drawingBufferWidth / f) * (k + y * B.j),
                        (d.drawingBufferWidth / f) * (t - (l + r * B.j))
                      ),
                      (x = d.getUniformLocation(
                        this.qa,
                        "uCircleTexturePosition"
                      )),
                      d.uniform2f(
                        x,
                        (d.drawingBufferWidth / f) * (k + y * B.j),
                        t - (l + r * B.j)
                      ),
                      (x = d.getUniformLocation(this.qa, "uCircleRadius")),
                      d.uniform1f(x, u),
                      d.uniform3f(
                        d.getUniformLocation(this.qa, "uCircleColor"),
                        ((C >> 16) & 255) / 255,
                        ((C >> 8) & 255) / 255,
                        (C & 255) / 255
                      ),
                      d.uniform1f(
                        d.getUniformLocation(this.qa, "uCircleAlpha"),
                        z
                      ),
                      d.uniform1f(
                        d.getUniformLocation(this.qa, "uCircleSoftness"),
                        B.v
                      ),
                      (x = d.getUniformLocation(this.qa, "uAspectRatio")),
                      d.uniform1f(
                        x,
                        d.drawingBufferWidth / d.drawingBufferHeight / (f / t)
                      ),
                      d.drawArrays(d.TRIANGLE_FAN, 0, this.wd.Ud))
                    : (this.S.save(),
                      this.S.translate(k + y * B.j, l + r * B.j),
                      (x = this.S.createRadialGradient(0, 0, 1, 0, 0, u)),
                      x.addColorStop(0, this.g.ga(C, z)),
                      x.addColorStop(1 - B.v, this.g.ga(C, 0.8 * z)),
                      x.addColorStop(1, this.g.ga(C, 0)),
                      this.S.beginPath(),
                      this.S.arc(0, 0, u, 0, 2 * Math.PI, !1),
                      this.S.closePath(),
                      (this.S.fillStyle = x),
                      this.S.fill(),
                      this.S.restore());
                }
              if (0 < this.$b[w].length)
                for (v = 0; v < this.$b[w].length; v++)
                  (n = this.$b[w][v]),
                    (u = n.m * h),
                    (z = n.alpha * A),
                    0 > z && (z = 0),
                    this.g.Y
                      ? (d.useProgram(this.wb),
                        d.activeTexture(d.TEXTURE0),
                        d.bindTexture(d.TEXTURE_2D, this.bm),
                        d.bindBuffer(d.ARRAY_BUFFER, this.wd),
                        d.vertexAttribPointer(
                          this.wb.Z,
                          this.wd.Lc,
                          d.FLOAT,
                          !1,
                          0,
                          0
                        ),
                        (x = d.getUniformLocation(
                          this.wb,
                          "uCanvasDimensions2"
                        )),
                        d.uniform2f(x, f, t),
                        (x = d.getUniformLocation(this.wb, "uCirclePosition")),
                        d.uniform2f(x, k + y * n.j, t - (l + r * n.j)),
                        (x = d.getUniformLocation(
                          this.wb,
                          "uRingTexturePosition"
                        )),
                        d.uniform2f(
                          x,
                          (d.drawingBufferWidth / f) * (k + y * n.j),
                          t - (l + r * n.j)
                        ),
                        (x = d.getUniformLocation(this.wb, "uCircleRadius")),
                        d.uniform1f(x, u),
                        d.uniform2f(
                          d.getUniformLocation(this.wb, "uRingPosition"),
                          k + y * n.j,
                          t - (l + r * n.j)
                        ),
                        d.uniform1f(
                          d.getUniformLocation(this.wb, "uRingRadius"),
                          u
                        ),
                        d.uniform1f(
                          d.getUniformLocation(this.wb, "uRingAlpha"),
                          z
                        ),
                        (x = d.getUniformLocation(this.wb, "uAspectRatio")),
                        d.uniform1f(
                          x,
                          d.drawingBufferWidth / d.drawingBufferHeight / (f / t)
                        ),
                        d.uniform1i(
                          d.getUniformLocation(this.wb, "uSampler"),
                          0
                        ),
                        d.drawArrays(d.TRIANGLE_FAN, 0, this.wd.Ud))
                      : (this.S.save(),
                        this.S.translate(k + y * n.j, l + r * n.j),
                        (x = this.S.createRadialGradient(0, 0, 0, 0, 0, u)),
                        x.addColorStop(0, this.g.ga(16777215, 0)),
                        x.addColorStop(0.88, this.g.ga(0, 0)),
                        x.addColorStop(0.9, this.g.ga(16654848, z)),
                        x.addColorStop(0.92, this.g.ga(16776448, z)),
                        x.addColorStop(0.94, this.g.ga(4849466, z)),
                        x.addColorStop(0.96, this.g.ga(131071, z)),
                        x.addColorStop(0.98, this.g.ga(8190, z)),
                        x.addColorStop(1, this.g.ga(0, 0)),
                        this.S.beginPath(),
                        this.S.arc(0, 0, u, 0, 2 * Math.PI, !1),
                        this.S.closePath(),
                        (this.S.fillStyle = x),
                        this.S.fill(),
                        this.S.restore());
            }
            this.g.Y &&
              (d.useProgram(this.g.na.F),
              d.disable(d.BLEND),
              d.enable(d.DEPTH_TEST));
          }
        }
      }
    };
    return f;
  })();
  m.Om = f;
})(ggP2VR || (ggP2VR = {}));
var W = !1;
(function (m) {
  var f = (function () {
      return function () {
        this.f = this.i = this.pan = 0;
      };
    })(),
    h = (function () {
      return function () {
        this.Pi = -1e7;
      };
    })(),
    d = (function () {
      function b(a, c) {
        this.Fo = "TGljZW5zZTogQktZTS5DT00=";
        this.pan = { c: 0, Qa: 0, min: 0, max: 360, d: 0, vj: 0, Gc: 0 };
        this.i = { c: 0, Qa: 0, min: -90, max: 90, d: 0, Gc: 0 };
        this.O = { c: 0, Qa: 0, min: -180, max: 180, d: 0 };
        this.tc = { pan: 0, i: -90, O: 0, f: 170, Eb: 9 };
        this.f = {
          c: 70,
          Qa: 70,
          min: 1,
          Hg: 0,
          max: 170,
          sj: 360,
          tj: 270,
          nf: 0,
          d: 0,
          mode: 0,
          nm: 0,
          Ak: 0,
        };
        this.$a = { O: 0, pitch: 0 };
        this.o = { width: 10, height: 10 };
        this.ib = 0;
        this.Si = new m.xa();
        this.crossOrigin = "anonymous";
        this.Ka = this.Zh = 4;
        this.gd = this.jh = this.Kg = this.nc = 0;
        this.X = {
          start: { x: 0, y: 0 },
          ea: { x: 0, y: 0 },
          Dd: { x: 0, y: 0 },
          c: { x: 0, y: 0 },
          da: { x: 0, y: 0 },
        };
        this.R = {
          Xa: !1,
          Ik: 0,
          startTime: 0,
          start: { x: 0, y: 0 },
          ea: { x: 0, y: 0 },
          Dd: { x: 0, y: 0 },
          c: { x: 0, y: 0 },
          da: { x: 0, y: 0 },
        };
        this.yh = !0;
        this.Ba = {
          enabled: !0,
          ea: { x: 0, y: 0 },
          da: { x: 0, y: 0 },
          Gj: 0,
          f: { active: !1, jc: 0 },
        };
        this.hb = {
          alpha: 0,
          beta: 0,
          gamma: 0,
          orientation: 0,
          Pl: 0,
          fi: !0,
          dg: 0,
        };
        this.pg = { alpha: 0, beta: 0, gamma: 0, orientation: 0 };
        this.s = {
          src: [],
          Pe: 4,
          width: 640,
          height: 480,
          jd: !1,
          Jh: !1,
          Oj: !0,
          om: !1,
          me: "loop",
          b: (HTMLVideoElement = null),
          rm: !1,
          oc: (WebGLTexture = null),
          $j: (WebGLBuffer = null),
          oi: (WebGLBuffer = null),
          kj: (WebGLBuffer = null),
          format: 1,
          Dh: 0,
          cj: 1,
        };
        this.Mh = 0;
        this.ia =
          this.ya =
          this.Fa =
          this.T =
          this.ic =
          this.ab =
          this.D =
            null;
        this.oe = "pano";
        this.bj = "flashcontainer";
        this.Ti = "";
        this.control = null;
        this.Sb = [];
        this.Da = !1;
        this.ag = 1;
        this.ka = null;
        this.Ld = this.Me = this.cf = !1;
        this.Qf = 0;
        this.ud = 0.02;
        this.Di = 0;
        this.Ei = !1;
        this.Ci = this.oh = this.Rf = this.Le = this.lk = 0;
        this.kk = -1;
        this.Mb = "";
        this.tf = this.Bc = !1;
        this.$h = 0;
        this.sh = [];
        this.We = [];
        this.Ff = this.qc = 1;
        this.Vf = 1024;
        this.uf = !1;
        this.we = 200;
        this.Qb = 0;
        this.Wg = 5;
        this.pc = 0;
        this.sm = 50;
        this.jj = this.tm = 0;
        this.l = {
          enabled: !1,
          timeout: 5,
          active: !1,
          Vg: !1,
          speed: 0.4,
          ri: 0,
          Xh: 0,
          uj: !0,
          fh: !1,
          Jf: !1,
          ph: "",
          Md: "Animation01",
          Oe: !1,
          Th: !1,
          Rj: !1,
          startTime: 0,
          kd: 0,
          fg: !1,
          th: !1,
          Oh: 0,
          Cd: 0,
          Bg: 0,
          Cg: 0,
          Ag: 0,
          Dl: 0,
        };
        this.u = {
          active: !1,
          aborted: !1,
          speed: 0.1,
          pan: 0,
          i: 0,
          O: 0,
          f: 70,
          Jd: 70,
          Bg: 0,
          Cg: 0,
          El: 0,
          Ag: 0,
          Eb: 0,
          Ng: 0,
          nj: 0,
          Yj: !1,
          Ig: !1,
          jk: 0,
          ik: 0,
          Fh: !1,
        };
        this.jf = { pan: -1, i: -1, f: -1 };
        this.Bl = 0;
        this.aa = null;
        this.Kf = {};
        this.gh = {};
        this.Pd = [];
        this.Rh = {};
        this.Ac = {};
        this.lf = {};
        this.A = {
          mode: 1,
          xg: -1,
          pa: 0,
          nb: 0,
          Xc: 0.05,
          hc: 255,
          gc: 1,
          ec: 255,
          dc: 0.3,
          bf: !0,
          Tj: {
            enabled: !0,
            width: 180,
            height: 20,
            Uj: 0,
            Sj: 1,
            background: !0,
            ec: 16777215,
            dc: 1,
            hc: 0,
            gc: 1,
            Gi: 3,
            Hi: 1,
            Ai: !0,
          },
          lb: [],
          Pb: [],
          Pc: [],
          li: [],
        };
        this.Aa = null;
        this.P = [];
        this.N = [];
        this.I = [];
        this.Sa = [];
        this.Ie = [];
        this.Ma = [];
        this.za = [];
        this.Qc = [];
        this.ce = [];
        this.Ee = [];
        this.V = 1;
        this.na = this.nd = this.Hb = this.Od = null;
        this.bg = {};
        this.qd = {};
        this.h = new m.Rm();
        this.Vo = {
          target: 0,
          current: 0,
          Xc: 0.01,
          yn: 2,
          Xi: 0,
          uh: !1,
          en: !1,
        };
        this.margin = { left: 0, top: 0, right: 0, bottom: 0 };
        this.C = {
          ue: !1,
          Go: !1,
          Ab: !1,
          ld: !1,
          Ad: !0,
          pl: !1,
          mm: 1,
          dm: !1,
          Vi: !0,
          $f: !0,
          qh: !1,
          df: !1,
          em: !0,
          sensitivity: 8,
        };
        this.Gg = [];
        this.ad = !0;
        this.ua = { x: 0, y: 0 };
        this.eh = this.Fb = this.ah = this.Tc = this.Y = !1;
        this.xi = this.Em = !0;
        this.ij = !1;
        this.ne = !0;
        this.bh = this.hj = !1;
        this.Fm = !0;
        this.Ia = this.Nd = "";
        this.cd = "transition";
        this.Ra = "transform";
        this.vd = "perspective";
        this.Dk =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYBgeACDAAADIAAE3iTbkAAAAAElFTkSuQmCC";
        this.rb = { width: 0, height: 0 };
        this.Nk = new m.xa();
        this.Mk = new m.xa();
        this.Ok = new m.xa();
        this.Pk = new m.xa();
        this.Lk = new m.xa();
        this.gf = !1;
        this.Cl = this.Wa = "";
        this.ak = [];
        this.ti = [];
        this.ug =
          this.rl =
          this.tg =
          this.sl =
          this.Bd =
          this.lj =
          this.Hj =
          this.Kc =
          this.ff =
          this.ql =
          this.mj =
          this.tl =
          this.ul =
          this.xl =
            !1;
        this.dh = !0;
        this.ei = this.Hh = !1;
        this.ll = [];
        this.devicePixelRatio = 1;
        this.ha = this.B = null;
        this.Wf = !1;
        this.La = null;
        this.qb = { enabled: !1, speed: 1, od: !1, $i: !0 };
        this.Ll = !1;
        this.Qh = "<<LOG>>";
        this.ob = new m.Sm();
        this.Xj = !1;
        this.Zf = function (a, c) {
          if (0 == a.length) return a;
          var b;
          var d = [];
          var k = c.ai(a[0]) - 0;
          for (b = 0; b < a.length; b++) {
            var e = b;
            var l = b + 1;
            l == a.length && (l = 0);
            var f = c.ai(a[l]) - 0;
            if (0 <= k && 0 <= f) d.push(a[e]);
            else if (0 <= k || 0 <= f) {
              var h = f / (f - k);
              0 > h && (h = 0);
              1 < h && (h = 1);
              var v = new m.xa();
              v.zd(a[e], a[l], h);
              0 > k || d.push(a[e]);
              d.push(v);
            }
            k = f;
          }
          return d;
        };
        this.Tl = new f();
        this.Nj = 0;
        this.Nh = -1;
        this.kg = function (a) {
          return a
            ? a.pageX || a.pageY
              ? { x: a.pageX, y: a.pageY }
              : a.clientX || a.clientY
              ? {
                  x:
                    a.clientX +
                    document.body.scrollLeft +
                    document.documentElement.scrollLeft,
                  y:
                    a.clientY +
                    document.body.scrollTop +
                    document.documentElement.scrollTop,
                }
              : a.touches && a.touches[0]
              ? { x: a.touches[0].pageX, y: a.touches[0].pageY }
              : { x: 0, y: 0 }
            : { x: 0, y: 0 };
        };
        this.Vh = 1;
        this.Dn = this.Ah = this.zl = this.Yi = this.Cj = this.bi = 0;
        this.Al = !1;
        this.Rd = !0;
        this.pb = new m.mh(this);
        this.pb.bf = !1;
        this.Ck();
        if (7 < this.Qh.length) {
          var d = b.Tf("bG9n");
          window[b.Tf("Y29uc29sZQ==")][d](b.nk(this.Qh));
        }
        this.wf(this.pb);
        this.checkLoaded = this.Sb;
        this.isLoaded = !1;
        c &&
          c.hasOwnProperty("useFlash") &&
          c.useFlash &&
          ((this.Fb = !0),
          (this.Y = this.Tc = !1),
          c.hasOwnProperty("flashPlayerId")
            ? (this.oe = c.flashPlayerId)
            : (this.oe = "pano"),
          c.hasOwnProperty("flashContainerId")
            ? (this.bj = c.flashContainerId)
            : (this.bj = a + "flash"));
        this.va();
        this.Fb || (this.Ga = new m.Om(this));
        this.xk(a);
        this.dn();
        this.userdata = this.Kf = this.cg();
        this.emptyHotspot = this.pb;
        this.mouse = this.ua;
        this.B = new m.Pm(this);
        this.La = new m.Qm(this);
        this.na = new m.Wm(this);
        this.Sc();
      }
      b.prototype.el = function (a) {
        return -99991 === a ? this.Fo : "6.0.2/17253";
      };
      b.prototype.Qi = function () {
        this.B.enabled = this.ha.enabled;
        this.B.type = this.ha.type;
        this.B.Oa = this.ha.zoomin;
        this.B.bc = this.ha.zoomout;
        this.B.Uf = this.ha.blendtime;
        this.B.Of = this.ha.zoomoutpause;
        this.B.Nf = this.ha.zoomfov;
        this.B.de = this.ha.zoomspeed;
        this.B.Qe = this.ha.blendcolor;
        this.B.Cc = this.ha.softedge;
        this.ha = null;
      };
      b.prototype.Hp = function (a) {
        this.ha = {};
        this.ha.enabled = !0;
        this.ha.type = this.B.type;
        this.ha.zoomin = this.B.Oa;
        this.ha.zoomout = this.B.bc;
        this.ha.blendtime = this.B.Uf;
        this.ha.zoomoutpause = this.B.Of;
        this.ha.zoomfov = this.B.Nf;
        this.ha.zoomspeed = this.B.de;
        this.ha.blendcolor = this.B.Qe;
        this.ha.softedge = this.B.Cc;
        if (a.hasOwnProperty("type")) {
          var c = a.type;
          if (
            "cut" == c ||
            "crossdissolve" == c ||
            "diptocolor" == c ||
            "irisround" == c ||
            "irisrectangular" == c ||
            "wipeleftright" == c ||
            "wiperightleft" == c ||
            "wipetopbottom" == c ||
            "wipebottomtop" == c ||
            "wiperandom" == c
          )
            this.ha.type = c;
        }
        a.hasOwnProperty("before") &&
          ((c = Number(a.before)), 0 == c || 2 == c) &&
          (this.ha.zoomin = c);
        a.hasOwnProperty("after") &&
          ((c = Number(a.after)), 0 == c || 2 == c || 3 == c || 4 == c) &&
          (this.ha.zoomout = c);
        a.hasOwnProperty("transitiontime") &&
          ((c = Number(a.transitiontime)),
          0 <= c && 50 >= c && (this.ha.blendtime = c));
        a.hasOwnProperty("waitfortransition") &&
          (this.ha.zoomoutpause = 1 == a.waitfortransition);
        a.hasOwnProperty("zoomedfov") &&
          ((c = Number(a.zoomedfov)),
          0.01 <= c && 50 >= c && (this.ha.zoomfov = c));
        a.hasOwnProperty("zoomspeed") &&
          ((c = Number(a.zoomspeed)),
          0.01 <= c && 99 >= c && (this.ha.zoomspeed = c));
        a.hasOwnProperty("dipcolor") && (this.ha.blendcolor = a.dipcolor);
        a.hasOwnProperty("softedge") &&
          ((a = Number(a.softedge)),
          0 <= a && 1e3 >= a && (this.ha.softedge = a));
        this.Wf || this.Qi();
      };
      b.prototype.Oc = function (a, c, b) {
        var d = c ? Number(c) : 0;
        if (0 != a && 4 != a && 12 != a && 9 != a)
          this.Mc("Unsupported projection type: " + a);
        else if (c && 0 !== d && 4 !== d && 12 !== d && 9 !== d)
          this.Mc("Unsupported projection2 type: " + d);
        else if (
          (a == d && (d = 0),
          (this.Kg = b ? Number(b) : 1),
          this.Ka != a || this.nc != d)
        )
          (this.Ka = a), (this.nc = d), this.na.Gh();
      };
      b.prototype.ra = function () {
        return 0 == this.Ka ? 4 : this.Ka;
      };
      b.prototype.Li = function (a, c) {
        if (0 != a && 4 != a && 12 != a && 9 != a)
          this.Mc("Unsupported projection type: " + a);
        else if (
          (this.Y ||
            0 == a ||
            4 == a ||
            this.Mc("Projection changes require WebGL!"),
          this.ra() != a)
        ) {
          var b = {};
          b.pan = this.pan.c;
          b.tilt = this.i.c;
          b.fov = this.f.c;
          b.projection = a;
          b.timingFunction = 3;
          b.speed = c;
          a = this.jg(a);
          b.fov = Math.min(a, b.fov);
          this.Uh(b);
        }
      };
      b.prototype.addListener = function (a, c) {
        (this.bg[a] = this.bg[a] || []).push(c);
      };
      b.prototype.ba = function (a, c) {
        if ((a = this.bg[a]))
          for (var b = a.length, d = 0; d < b; d++)
            try {
              a[d].apply(null, [c]);
            } catch (e) {
              this.Mc(e);
            }
      };
      b.prototype.removeEventListener = function (a, c) {
        var b = this.bg[a];
        if (b) {
          var d;
          var e = 0;
          for (d = b.length; e < d; e++)
            if (b[e] === c) {
              1 === d ? delete this.bg[a] : b.splice(e, 1);
              break;
            }
        }
      };
      b.prototype.lp = function () {
        this.Da = !0;
      };
      b.prototype.wo = function () {
        return this.H;
      };
      b.prototype.$m = function (a, c, b, d) {
        if (!this.qd.hasOwnProperty(a)) {
          var k = new h();
          this.qd[a] = k;
          k.type = c;
          "undefined" !== typeof b && this.Zd(a, b);
          "object" === typeof d && this.im(a, d);
          return !0;
        }
        return !1;
      };
      b.prototype.im = function (a, c) {
        if (this.qd.hasOwnProperty(a) && "object" === typeof c) {
          var b = this.qd[a];
          c.hasOwnProperty("cookiePath") && (b.uk = String(c.cookiePath));
          c.hasOwnProperty("cookieExpireDays") &&
            (b.Pi = parseFloat(c.cookieExpireDays));
          if (c.hasOwnProperty("keep") && ((b.yl = !!c.keep), b.yl)) {
            var d = "ggvar_" + a;
            0 < document.cookie.length &&
              ((c = document.cookie.indexOf(d + "=")),
              -1 != c &&
                ((c = c + d.length + 1),
                (d = document.cookie.indexOf(";", c)),
                -1 == d && (d = document.cookie.length),
                (c = decodeURIComponent(document.cookie.substring(c, d))),
                0 == b.type && this.Zd(a, c),
                1 == b.type && this.Zd(a, parseFloat(c)),
                2 == b.type && this.Zd(a, "true" == c)));
          }
          return !0;
        }
        return !1;
      };
      b.prototype.Zd = function (a, c) {
        if (this.qd.hasOwnProperty(a)) {
          var b = this.qd[a];
          if (
            (0 == b.type && "string" === typeof c) ||
            (1 == b.type && "number" === typeof c) ||
            (2 == b.type && "boolean" === typeof c)
          ) {
            if (b.yl) {
              var d = "ggvar_" + a + "=" + encodeURIComponent(c.toString());
              -1 <= b.Pi && (d += "; max-age=" + 86400 * b.Pi);
              b.uk && (d += "; path=" + b.uk);
              document.cookie = d;
            }
            b.value != c &&
              ((b.value = c), this.ba("varchanged_" + a, { value: c }));
            return !0;
          }
        }
        return !1;
      };
      b.prototype.qo = function (a) {
        if (this.qd.hasOwnProperty(a)) return this.qd[a].value;
      };
      b.Tf = function (a) {
        var c = "",
          b = 0;
        a = a.replace(/[^A-Za-z0-9\+\/=]/g, "");
        do {
          var d =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
              a.charAt(b++)
            );
          var e =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
              a.charAt(b++)
            );
          var f =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
              a.charAt(b++)
            );
          var t =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
              a.charAt(b++)
            );
          d = (d << 2) | (e >> 4);
          e = ((e & 15) << 4) | (f >> 2);
          var g = ((f & 3) << 6) | t;
          c += String.fromCharCode(d);
          64 != f && (c += String.fromCharCode(e));
          64 != t && (c += String.fromCharCode(g));
        } while (b < a.length);
        return c;
      };
      b.Bn = function (a) {
        for (
          var c = [1, 1, 1, 1, 2, 2, 3, 0], b = a.length, d = "", e = 0;
          e < b;

        ) {
          var f = a.charCodeAt(e++);
          if (f & 128) {
            var t = c[(f >> 3) & 7];
            if (!(f & 64 && t) || e + t > b) return null;
            for (f &= 63 >> t; 0 < t; --t) {
              var g = a.charCodeAt(e++);
              if (128 != (g & 192)) return null;
              f = (f << 6) | (g & 63);
            }
          }
          d += String.fromCharCode(f);
        }
        return d;
      };
      b.nk = function (a) {
        return b.Bn(b.Tf(a));
      };
      b.prototype.Ck = function () {
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.xl = !!navigator.userAgent.match(/(Windows|Win)/g);
        this.ul = !!navigator.userAgent.match(/(Mac|Macintosh|Mac_powerpc)/g);
        this.tl = !!navigator.userAgent.match(/(Linux|Ubuntu)/g);
        this.mj = !!navigator.userAgent.match(/(MSIE)/g);
        this.ql = !!navigator.userAgent.match(/(Edge|EdgA)/g);
        this.ff = !!navigator.userAgent.match(/(Firefox)/g);
        if ((this.Kc = !!navigator.userAgent.match(/(Safari)/g))) {
          var a = navigator.userAgent.indexOf("Safari");
          this.pd = navigator.userAgent.substring(a + 7);
          a = navigator.userAgent.indexOf("Version");
          -1 != a && (this.pd = navigator.userAgent.substring(a + 8));
          this.pd = this.pd.substring(0, this.pd.indexOf(" "));
          this.pd = this.pd.substring(0, this.pd.indexOf("."));
          this.Hj = !0;
        }
        if ((this.lj = !!navigator.userAgent.match(/(Chrome)/g))) this.Kc = !1;
        this.Bd = !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
        this.sl = !!navigator.userAgent.match(/(iPhone|iPod)/g);
        this.tg = !!navigator.userAgent.match(/(android)/i);
        this.rl = !!navigator.userAgent.match(/(IEMobile)/i);
        this.ug = this.Bd || this.tg || this.rl;
        /iP(hone|od|ad)/.test(navigator.platform) &&
          ((a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)),
          (this.ll = [
            parseInt(a[1], 10),
            parseInt(a[2], 10),
            parseInt(a[3] || "0", 10),
          ]));
        this.Hh = !window.requestAnimationFrame;
        a = ["Webkit", "Moz", "O", "ms", "Ms"];
        this.Ia = "";
        this.cd = "transition";
        this.Ra = "transform";
        this.vd = "perspective";
        for (var c = 0; c < a.length; c++)
          "undefined" !==
            typeof document.documentElement.style[a[c] + "Transform"] &&
            ((this.Ia = "-" + a[c].toLowerCase() + "-"),
            (this.cd = a[c] + "Transition"),
            (this.Ra = a[c] + "Transform"),
            (this.vd = a[c] + "Perspective"));
        this.ij = U();
        this.Y = V();
        this.Tc = this.ij;
        this.Y && (this.Tc = !1);
        this.Bc = !0;
        this.tf = !1;
        if (this.Bd || this.tg) this.hm(80), (this.Wg = 2);
        this.Mc(
          "Pano2VR player " +
            this.el() +
            " - Prefix:" +
            this.Ia +
            ", " +
            (this.ij ? "CSS 3D available" : "CSS 3D not available") +
            ", " +
            (this.Y ? "WebGL available" : "WebGL not available")
        );
        W && this.M("Pano2VR Debug version!");
        try {
          (window.AudioContext =
            window.AudioContext || window.webkitAudioContext),
            (this.sa = new AudioContext());
        } catch (k) {
          this.sa = null;
        }
        this.Kc && (!this.Hj || 9 > Number(this.pd)) && (this.sa = null);
        this.Kc && !this.Bd && 12 <= Number(this.pd) && (this.sa = null);
        this.dh = this.sl
          ? this.Kc && this.Hj && 10 <= Number(this.pd)
            ? !0
            : !1
          : !0;
      };
      b.prototype.M = function (a) {
        if (W) {
          var c = document.getElementById("gg_debug");
          c && (c.innerHTML = a.toString() + "<br />");
          window.console && window.console.log(a);
        }
      };
      b.prototype.Mc = function (a) {
        var c = document.getElementById("gg_debug");
        c && (c.innerHTML = a + "<br />");
        window.console && window.console.log(a);
      };
      b.prototype.hm = function (a) {
        this.we = a;
      };
      b.prototype.qp = function (a) {
        this.crossOrigin = a;
      };
      b.prototype.sp = function (a) {
        this.ef = a;
      };
      b.prototype.io = function () {
        return this.$h;
      };
      b.prototype.pp = function (a) {
        this.Nd = a;
      };
      b.prototype.Hn = function () {
        return this.Nd;
      };
      b.prototype.Qn = function () {
        return this.ug;
      };
      b.prototype.Rn = function () {
        return this.gf;
      };
      b.prototype.Nn = function () {
        return this.l.active;
      };
      b.prototype.tp = function (a) {
        this.ug = !!a;
      };
      b.prototype.Bh = function () {
        return this.isLoaded;
      };
      b.prototype.Pn = function () {
        return !this.isLoaded;
      };
      b.prototype.ed = function () {
        return (
          Number(this.o.height) /
          (2 * Math.tan((Math.PI / 180) * (this.Jb() / 2)))
        );
      };
      b.prototype.jm = function (a, c) {
        this.isFullscreen &&
          ((a = window.innerWidth), (c = window.innerHeight));
        var b = a - this.margin.left - this.margin.right,
          d = c - this.margin.top - this.margin.bottom;
        if (!(10 > b || 10 > d)) {
          var e = window.devicePixelRatio || 1;
          this.uf && (e = 1);
          this.D.style.width = b + "px";
          this.D.style.height = d + "px";
          this.D.style.left = this.margin.left + "px";
          this.D.style.top = this.margin.top + "px";
          if (this.Y)
            try {
              this.ab &&
                ((this.ab.style.position = "absolute"),
                (this.ab.style.display = "inline"),
                (this.ab.style.width = b + "px"),
                (this.ab.style.height = d + "px"),
                (this.ab.width = b * e),
                (this.ab.height = d * e)),
                this.H &&
                  ((this.rb.width = b * e),
                  (this.rb.height = d * e),
                  this.H.viewport(
                    0,
                    0,
                    this.H.drawingBufferWidth,
                    this.H.drawingBufferHeight
                  ));
            } catch (p) {
              alert(p);
            }
          this.ic &&
            ((this.ic.style.width = a + "px"),
            (this.ic.style.height = c + "px"),
            (this.ic.width = a),
            (this.ic.height = c));
          this.Fa &&
            ((this.Fa.style.width = a + "px"),
            (this.Fa.style.height = c + "px"),
            (this.ya.style.width = a + "px"),
            (this.ya.style.height = c + "px"),
            (this.ya.width = a),
            (this.ya.height = c),
            (this.ya.style.left = this.margin.left + "px"),
            (this.ya.style.top = this.margin.top + "px"),
            this.ka &&
              this.ka != this.Fa &&
              ((this.ka.style.width = a + "px"),
              (this.ka.style.height = c + "px")));
          this.Ga &&
            ((b = this.Ga.Zc),
            (b.style.width = a + "px"),
            (b.style.height = c + "px"),
            (b.width = a),
            (b.height = c),
            (b.style.left = this.margin.left + "px"),
            (b.style.top = this.margin.top + "px"));
          this.cf && (this.Da = !0);
          b = this.D.offsetWidth;
          d = this.D.offsetHeight;
          if (this.o.width != b || this.o.height != d)
            (this.o.width = b), (this.o.height = d);
          this.qq();
          this.ka && this.ka.ggUpdateSize && this.ka.ggUpdateSize(a, c);
          this.ba("sizechanged", { ih: a, qg: c });
        }
      };
      b.prototype.Ke = function () {
        this.Xj = !0;
      };
      b.prototype.Sc = function () {
        this.jm(this.Od.offsetWidth, this.Od.offsetHeight);
      };
      b.prototype.vo = function () {
        var a = { width: 0, height: 0 };
        a.width = this.o.width;
        a.height = this.o.height;
        return a;
      };
      b.prototype.qe = function () {
        var a = { x: 0, y: 0 },
          c = this.D;
        if (c.offsetParent) {
          do (a.x += c.offsetLeft), (a.y += c.offsetTop), (c = c.offsetParent);
          while (c);
        }
        return a;
      };
      b.prototype.Fp = function (a) {
        this.aa = a;
      };
      b.prototype.vp = function (a, c, b, d) {
        this.margin.left = a;
        this.margin.top = c;
        this.margin.right = b;
        this.margin.bottom = d;
        this.aa = this.skinObj;
        this.Ke();
      };
      b.prototype.nn = function (a) {
        0 == a && (this.C.Ad = !1);
        1 == a && (this.C.Ad = !0);
        2 == a && (this.C.Ad = !this.C.Ad);
        this.ba("viewmodechanged", {});
      };
      b.prototype.to = function () {
        return 1 == this.C.Ad ? 1 : 0;
      };
      b.prototype.sk = function (a, c) {
        this.A.mode = 1 == c && 0 < this.A.mode ? 0 : Math.round(a);
        this.update();
        this.ia && (this.ia.changePolygonMode(a, c), this.ia.update());
        this.ba("polymodechanged", {});
      };
      b.prototype.km = function (a) {
        var c = this.A.lb.indexOf(a);
        -1 == c
          ? (this.A.lb.push(a), this.A.Pb.push(0), this.A.Pc.push(1))
          : (this.A.Pc[c] = 1);
        this.update();
      };
      b.prototype.jl = function (a) {
        var c = this.A.lb.indexOf(a);
        -1 != c && ((this.A.Pc[c] = 0), this.A.li.push(a), this.update());
      };
      b.prototype.bq = function (a) {
        var c = this.A.lb.indexOf(a);
        -1 == c || (-1 != c && 0 == this.A.Pc[c]) ? this.km(a) : this.jl(a);
        this.update();
      };
      b.prototype.ln = function (a, c, b, d, e) {
        for (var k = 0; k < this.P.length; k++) {
          var l = this.P[k];
          "poly" != l.type ||
            (l.id != a && "" != a) ||
            ((l.ec = c), (l.dc = b), (l.hc = d), (l.gc = e));
        }
        "" == a &&
          ((this.A.ec = c), (this.A.dc = b), (this.A.hc = d), (this.A.gc = e));
        this.update();
      };
      b.prototype.jn = function (a) {
        this.Ga &&
          ((this.Ga.Lj = 0 == a ? !0 : 1 == a ? !1 : !this.Ga.Lj),
          this.update());
      };
      b.prototype.ko = function () {
        return this.A.mode;
      };
      b.prototype.pn = function () {
        this.ba("viewstatechanged", {});
      };
      b.prototype.uo = function () {
        return 0;
      };
      b.prototype.Xn = function (a) {
        return (a = this.Rh[a]) ? a.type : "web";
      };
      b.prototype.Wn = function (a) {
        return (a = this.Rh[a]) ? a : {};
      };
      b.prototype.bo = function (a, c) {
        var b = [];
        a || (a = this.Wa);
        var d = this.Pd[a];
        d && (a = d);
        "" === a &&
          0 < Object.keys(this.Ac).length &&
          (a = Object.keys(this.Ac)[0]);
        this.Ac[a] &&
          this.Ac[a][c] &&
          (b.push(this.Ac[a][c].y), b.push(this.Ac[a][c].x));
        return b;
      };
      b.prototype.co = function (a, c) {
        var b = [];
        a || (a = this.Wa);
        var d = this.Pd[a];
        d && (a = d);
        "" === a &&
          0 < Object.keys(this.Ac).length &&
          (a = Object.keys(this.Ac)[0]);
        this.lf[a] &&
          this.lf[a][c] &&
          (b.push(this.lf[a][c].x), b.push(this.lf[a][c].y));
        return b;
      };
      b.prototype.Vn = function (a) {
        var c = this.Pd[a];
        c && (a = c);
        c = [];
        for (var b in this.Rh) c.push(b);
        for (b = 0; b < c.length; b++) if (this.Ac[a][c[b]]) return c[b];
        return "";
      };
      b.prototype.ml = function (a, c, b) {
        a = Math.atan2(a + 1, b);
        var d = Math.atan2(c + 1, b);
        c = Math.sin(a);
        b = Math.sin(d);
        a = Math.cos(a);
        d = Math.cos(d);
        this.Nk.Za(0, 0, -1);
        this.Mk.Za(a, 0, -c);
        this.Ok.Za(-a, 0, -c);
        this.Pk.Za(0, d, -b);
        this.Lk.Za(0, -d, -b);
      };
      b.prototype.Oi = function (a) {
        a = this.Zf(a, this.Nk);
        a = this.Zf(a, this.Mk);
        a = this.Zf(a, this.Ok);
        a = this.Zf(a, this.Pk);
        return (a = this.Zf(a, this.Lk));
      };
      b.prototype.xm = function (a) {
        if (!this.Bc && this.Eo != a) {
          this.Eo = a;
          var c = this.margin.left + this.o.width / 2 + "px ";
          c += this.margin.top + this.o.height / 2 + "px ";
          this.Fa.style[this.vd] = a + "px";
          this.Fa.style[this.vd + "Origin"] = c;
          this.D.style[this.vd] = a + "px";
          this.D.style[this.vd + "Origin"] = c;
        }
      };
      b.prototype.Uk = function () {
        return this.B.be ||
          this.B.sd ||
          (this.Y && (4 != this.Ka || 0 != this.nc))
          ? !1
          : !0;
      };
      b.prototype.Zg = function () {
        var a = new m.xa(0, 0, -100),
          c = this.ed();
        var b = 100 / this.f.c;
        var d = this.h.width / this.h.height;
        var e = this.o.height * b * d;
        b *= this.o.height;
        for (var f = this.Uk(), t = 0; t < this.P.length; t++) {
          var g = this.P[t];
          if ("point" == g.type) {
            var h = !1;
            if (2 == this.ib) {
              var n = ((this.pan.c - g.pan) / 100 / d) * e;
              var y = ((this.i.c - g.i) / 100) * b;
              Math.abs(n) < this.o.width / 2 + 500 &&
                Math.abs(y) < this.o.height / 2 + 500 &&
                (h = !0);
            } else
              a.Za(0, 0, -100),
                a.wa((-g.i * Math.PI) / 180),
                a.Ea((g.pan * Math.PI) / 180),
                a.Ea((-this.pan.c * Math.PI) / 180),
                a.wa((this.i.c * Math.PI) / 180),
                a.kb((this.O.c * Math.PI) / 180),
                0.01 > a.z
                  ? ((y = -c / a.z),
                    (n = a.x * y),
                    (y *= a.y),
                    Math.abs(n) < this.o.width / 2 + 500 &&
                      Math.abs(y) < this.o.height / 2 + 500 &&
                      (h = !0))
                  : (y = n = 0);
            g.Nb = n + this.o.width / 2;
            g.vb = y + this.o.height / 2;
            g.visible = h;
            g.px = g.Nb;
            g.py = g.vb;
            g.visible = g.visible;
            if (g.b && g.b.onUpdatePosition) g.b.onUpdatePosition(this, g);
            else
              g.b &&
                g.b.__div &&
                ("none" != g.b.__div.style[this.cd] &&
                  (g.b.__div.style[this.cd] = "none"),
                g.b.ggUse3d
                  ? (this.Bc || this.xm(c),
                    2 == this.ib
                      ? ((g.b.__div.style[this.Ra] =
                          "scale(" +
                          (((100 / this.f.c) * 500) / g.b.gg3dDistance).toFixed(
                            10
                          ) +
                          ")"),
                        (g.b.__div.style.left =
                          this.margin.left + n + this.o.width / 2 + "px"),
                        (g.b.__div.style.top =
                          this.margin.top + y + this.o.height / 2 + "px"))
                      : ((g.b.__div.style.width = "1px"),
                        (g.b.__div.style.height = "1px"),
                        (n = ""),
                        this.Bc && (n += "perspective(" + c + "px) "),
                        (n += "translate3d(0px,0px," + c + "px) "),
                        (n += "rotateZ(" + this.O.c.toFixed(10) + "deg) "),
                        (n += "rotateX(" + this.i.c.toFixed(10) + "deg) "),
                        (n += "rotateY(" + (-this.pan.c).toFixed(10) + "deg) "),
                        (n += "rotateY(" + g.pan.toFixed(10) + "deg) "),
                        (n += "rotateX(" + (-g.i).toFixed(10) + "deg) "),
                        (n +=
                          "translate3d(0px,0px," +
                          (-1 * g.b.gg3dDistance).toFixed(10) +
                          "px) "),
                        (g.b.__div.style[this.Ra + "Origin"] = "0% 0%"),
                        (g.b.__div.style[this.Ra] = n),
                        (g.b.__div.style.left =
                          this.margin.left + this.o.width / 2 + "px"),
                        (g.b.__div.style.top =
                          this.margin.top + this.o.height / 2 + "px")))
                  : h && f
                  ? ((g.b.__div.style.left =
                      this.margin.left + n + this.o.width / 2 + "px"),
                    (g.b.__div.style.top =
                      this.margin.top + y + this.o.height / 2 + "px"))
                  : ((g.b.__div.style.left = "-1000px"),
                    (g.b.__div.style.top = "-1000px")));
          }
          if ("poly" == g.type) {
            var r = [];
            if (2 == this.ib)
              for (g.Wd = [], h = 0; h < g.Mf.length; h++)
                (y = g.Mf[h]),
                  (n = ((this.pan.c - y.pan) / 100 / d) * e),
                  (y = ((this.i.c - y.i) / 100) * b),
                  (n += this.margin.left + this.o.width / 2),
                  (y += this.margin.top + this.o.height / 2),
                  g.Wd.push({ Nb: n, vb: y });
            else {
              for (h = 0; h < g.Mf.length; h++)
                (y = g.Mf[h]),
                  a.Za(0, 0, -100),
                  a.wa((-y.i * Math.PI) / 180),
                  a.Ea((y.pan * Math.PI) / 180),
                  a.Ea((-this.pan.c * Math.PI) / 180),
                  a.wa((this.i.c * Math.PI) / 180),
                  a.kb((this.O.c * Math.PI) / 180),
                  r.push(a.clone());
              r = this.Oi(r);
              if (0 < r.length)
                for (h = 0; h < r.length; h++)
                  (a = r[h]),
                    0.1 > a.z
                      ? ((y = -c / a.z),
                        (n = this.o.width / 2 + a.x * y),
                        (y = this.o.height / 2 + a.y * y))
                      : (y = n = 0),
                    (a.Nb = n),
                    (a.vb = y);
              g.Wd = r;
            }
          }
        }
      };
      b.prototype.Jn = function () {
        for (var a = [], c = 0; c < this.P.length; c++) {
          var b = this.P[c];
          "point" == b.type && b.b && b.b.__div && a.push(b.b.__div);
        }
        return a;
      };
      b.prototype.ga = function (a, c) {
        a = Number(a);
        isNaN(c) && (c = 0);
        0 > c && (c = 0);
        1 < c && (c = 1);
        return (
          "rgba(" +
          ((a >> 16) & 255) +
          "," +
          ((a >> 8) & 255) +
          "," +
          (a & 255) +
          "," +
          c +
          ")"
        );
      };
      b.prototype.Xo = function () {
        var a;
        if (
          this.ya &&
          (this.A.xg != this.A.mode &&
            ((this.A.xg = this.A.mode),
            (this.ya.style.visibility =
              0 < this.A.mode ? "inherit" : "hidden")),
          0 <= this.A.mode || 0 < this.A.lb.length)
        ) {
          this.ca || (this.ca = this.ya.getContext("2d"));
          if (this.ca.width != this.o.width || this.ca.height != this.o.height)
            (this.ca.width = this.o.width), (this.ca.height = this.o.height);
          this.ca.clear
            ? this.ca.clear()
            : this.ca.clearRect(0, 0, this.ya.width, this.ya.height);
          var c = 1;
          0 >= this.A.mode && (c = 0);
          3 == this.A.mode && (c = this.A.pa);
          for (a = 0; a < this.P.length; a++) {
            var b = this.P[a];
            var d = c;
            if ("poly" == b.type) {
              var e = b.Wd;
              2 == this.A.mode && (d = b.pa);
              var f = this.A.lb.indexOf(b.id);
              -1 != f && (d = this.A.Pb[f]);
              this.ca.fillStyle = this.ga(b.ec, b.dc * d);
              this.ca.strokeStyle = this.ga(b.hc, b.gc * d);
              if (0 < e.length) {
                this.ca.beginPath();
                for (b = 0; b < e.length; b++)
                  (d = e[b]),
                    0 == b
                      ? this.ca.moveTo(d.Nb, d.vb)
                      : this.ca.lineTo(d.Nb, d.vb);
                this.ca.closePath();
                this.ca.stroke();
                this.ca.fill();
              }
            }
          }
        }
      };
      b.prototype.kl = function (a, c, b) {
        var d,
          k = !1;
        var f = 0;
        for (d = a.length - 1; f < a.length; d = f++) {
          var h = a[f];
          d = a[d];
          h.vb > b != d.vb > b &&
            c < ((d.Nb - h.Nb) * (b - h.vb)) / (d.vb - h.vb) + h.Nb &&
            (k = !k);
        }
        return k;
      };
      b.prototype.Ni = function (a, c) {
        var b = -1;
        if ((0 <= this.A.mode || 0 < this.A.lb.length) && this.Bo())
          for (var d = 0; d < this.P.length; d++) {
            var e = this.P[d];
            "poly" == e.type &&
              e.Wd &&
              0 < e.Wd.length &&
              (-1 != this.A.mode || -1 != this.A.lb.indexOf(e.id)) &&
              this.kl(e.Wd, a, c) &&
              ((b = d), (e.Nb = a), (e.vb = c));
          }
        return 0 <= b ? this.P[b] : !1;
      };
      b.prototype.Bo = function () {
        return 4 == this.ra() && 0 == this.nc;
      };
      b.prototype.Jb = function () {
        var a = 0,
          c = this.ra(),
          b = this.o;
        switch (this.f.mode) {
          case 0:
            a = this.f.c / 2;
            break;
          case 1:
            a =
              4 == c
                ? (180 *
                    Math.atan(
                      (b.height / b.width) *
                        Math.tan(((this.f.c / 2) * Math.PI) / 180)
                    )) /
                  Math.PI
                : ((b.height / b.width) * this.f.c) / 2;
            break;
          case 2:
            a = Math.sqrt(b.width * b.width + b.height * b.height);
            a =
              4 == c
                ? (180 *
                    Math.atan(
                      (b.height / a) *
                        Math.tan(((this.f.c / 2) * Math.PI) / 180)
                    )) /
                  Math.PI
                : ((b.height / a) * this.f.c) / 2;
            break;
          case 3:
            a =
              (4 * b.height) / 3 > b.width
                ? this.f.c / 2
                : 4 == c
                ? (180 *
                    Math.atan(
                      ((4 * b.height) / (3 * b.width)) *
                        Math.tan(((this.f.c / 2) * Math.PI) / 180)
                    )) /
                  Math.PI
                : ((4 * b.height) / (3 * b.width)) * (this.f.c / 2);
        }
        return 2 * a;
      };
      b.prototype.Ln = function (a, c) {
        a || (a = this.Jb());
        c || (c = this.ra());
        return 4 == c
          ? (180 * Math.atan(this.ee() * Math.tan(((a / 2) * Math.PI) / 180))) /
              Math.PI
          : a * this.ee();
      };
      b.prototype.ee = function () {
        return this.o.width / this.o.height;
      };
      b.prototype.pk = function (a) {
        var c = this.f.c;
        a /= 2;
        var b = this.ra();
        switch (this.f.mode) {
          case 0:
            c = 2 * a;
            break;
          case 1:
            a =
              4 == b
                ? (180 *
                    Math.atan(
                      (this.o.width / this.o.height) *
                        Math.tan((a * Math.PI) / 180)
                    )) /
                  Math.PI
                : (this.o.width / this.o.height) * a;
            c = 2 * a;
            break;
          case 2:
            c = Math.sqrt(
              this.o.width * this.o.width + this.o.height * this.o.height
            );
            a =
              4 == b
                ? (180 *
                    Math.atan(
                      (c / this.o.height) * Math.tan((a * Math.PI) / 180)
                    )) /
                  Math.PI
                : (c / this.o.height) * a;
            c = 2 * a;
            break;
          case 3:
            (4 * this.o.height) / 3 > this.o.width
              ? (c = 2 * a)
              : ((c = (3 * this.o.width) / (4 * this.o.height)),
                (a =
                  4 == b
                    ? (180 * Math.atan(c * Math.tan((a * Math.PI) / 180))) /
                      Math.PI
                    : c * a),
                (c = 2 * a));
        }
        return c;
      };
      b.prototype.ji = function (a) {
        this.f.c = this.pk(a);
      };
      b.prototype.Yf = function () {
        var a = this.Tl;
        a.pan = this.pan.c;
        a.i = this.i.c;
        a.f = this.f.c;
        this.Ue(a);
        this.Ue(a);
        this.Ue(a);
        this.pan.c = a.pan;
        this.i.c = a.i;
        this.f.c = a.f;
      };
      b.prototype.Ue = function (a) {
        var c = this.o.width / this.o.height;
        if (2 == this.ib) {
          if (0 < this.f.Hg) {
            var b = this.qc;
            this.h.J && 0 < this.h.J.length && (b = this.h.J[0].height);
            this.f.min = (100 * this.o.height) / (b * this.f.Hg);
          }
          var d = a.f / 2;
          b = d * c;
          var e = (this.h.width / this.h.height) * 50;
          c = this.C.em ? 2 * Math.min(50, e / c) : 2 * Math.max(50, e / c);
          a.f < this.f.min && (a.f = this.f.min);
          a.f > c && (a.f = c);
          50 < d
            ? (a.i = 0)
            : (50 < a.i + d && (a.i = 50 - d),
              -50 > a.i - d && (a.i = -50 + d));
          b > e
            ? (a.pan = 0)
            : (a.pan + b > e &&
                ((a.pan = e - b),
                this.l.active &&
                  ((this.l.speed = -this.l.speed), (this.pan.d = 0))),
              a.pan - b < -e &&
                ((a.pan = -e + b),
                this.l.active &&
                  ((this.l.speed = -this.l.speed), (this.pan.d = 0))));
        } else {
          0 < this.f.Hg &&
            ((b = this.qc),
            this.h.J && 0 < this.h.J.length && (b = this.h.J[0].height),
            (this.f.min =
              (360 * Math.atan2(this.o.height / 2, (b / 2) * this.f.Hg)) /
              Math.PI));
          a.f < this.f.min && (a.f = this.f.min);
          e = this.f.max;
          var f = 179;
          d = this.Jb() / 2;
          b = c * d;
          4 == this.ra()
            ? (b =
                (180 * Math.atan(c * Math.tan((d * Math.PI) / 180))) / Math.PI)
            : 9 == this.ra()
            ? ((e = this.f.tj), (f = 355))
            : 12 == this.ra() && ((e = this.f.sj), (f = 360));
          this.Y || (e = Math.max(160, e));
          a.f > e && (a.f = e);
          12 == this.ra() &&
            (2 * b > f && (a.f = f / c),
            (d = this.Jb() / 2),
            2 * d > f && (a.f = f),
            (d = this.Jb() / 2),
            (b = c * d));
          2 * d > this.i.max - this.i.min &&
            180 > this.i.max - this.i.min &&
            ((d = (this.i.max - this.i.min) / 2), (a.f = this.pk(2 * d)));
          90 > this.i.max
            ? a.i + d > this.i.max && (a.i = this.i.max - d)
            : a.i > this.i.max && (a.i = this.i.max);
          -90 < this.i.min
            ? a.i - d < this.i.min && (a.i = this.i.min + d)
            : a.i < this.i.min && (a.i = this.i.min);
          c = this.pan.max - this.pan.min;
          if (359.99 > c) {
            e = 90;
            f = Math.tan((d * Math.PI) / 180);
            var h = Math.tan(((Math.abs(a.i) + d) * Math.PI) / 180);
            h = Math.sqrt(h * h + 1) / Math.sqrt(f * f + 1);
            d = (180 * Math.atan(h * Math.tan((b * Math.PI) / 180))) / Math.PI;
            2 * d > c &&
              ((h =
                Math.tan((c * Math.PI) / 360) / Math.tan((b * Math.PI) / 180)),
              (c = h * Math.sqrt(f * f + 1)),
              (h = Math.sqrt(c * c - 1)),
              (e = (180 / Math.PI) * Math.atan(h)));
            a.pan + d > this.pan.max &&
              ((a.pan = this.pan.max - d),
              this.l.active &&
                ((this.l.speed = -this.l.speed), (this.pan.d = 0)));
            a.pan - d < this.pan.min &&
              ((a.pan = this.pan.min + d),
              this.l.active &&
                ((this.l.speed = -this.l.speed), (this.pan.d = 0)));
            a.i + b > e && (a.i = e - b);
            a.i - b < -e && (a.i = -e + b);
          }
        }
      };
      b.prototype.update = function (a) {
        void 0 === a && (a = 0);
        this.Da = !0;
        a && (this.ag = Math.max(1 * a, this.ag));
      };
      b.prototype.Vk = function () {
        return this.ia ? !!this.ia.isTileLoading : 0 < this.Qb || 0 < this.pc;
      };
      b.prototype.$g = function () {
        var a = Date.now();
        if (this.Fb) {
          if (this.ia)
            if ((this.jq(), 2 === this.ib)) this.Yf(), this.Zg();
            else if (0 === this.ib) {
              var c = this.ed();
              this.ml(this.o.width / 2, this.o.height / 2, c);
              this.Zg();
            }
        } else
          2 === this.ib
            ? (this.Zg(), this.Y ? (this.na.Vj(), this.na.Nl()) : this.Vj())
            : 0 === this.ib &&
              (!this.Y || (4 == this.Ka && 0 == this.nc)
                ? ((c = this.ed()),
                  this.ml(this.o.width / 2, this.o.height / 2, c),
                  this.Zg(),
                  this.eh ? this.na.pq() : this.Em && this.Dm(),
                  this.ym(),
                  this.Y
                    ? (this.s.jd
                        ? 14 == this.s.format
                          ? this.na.oq()
                          : this.na.Jm()
                        : 0 < this.h.J.length
                        ? this.na.vq()
                        : this.na.xq(),
                      this.na.Nl())
                    : (this.Tc
                        ? 0 < this.h.J.length
                          ? this.mq()
                          : this.lq()
                        : this.ah && this.iq(),
                      this.Xo()),
                  this.Ga && this.Ga.Wo())
                : (this.na.Jm(), this.Zg(), this.Ao()));
        c = Date.now();
        50 < c - a
          ? (this.M("Time between frames: " + (c - a)),
            this.uf ||
              (2 < this.Nj
                ? ((this.uf = !0),
                  this.M("disabling HighDPI rendering"),
                  this.Sc())
                : this.Nj++))
          : (this.Nj = 0);
        this.cf && this.h.am++;
      };
      b.prototype.lq = function () {
        var a = !1;
        if (
          this.o.width != this.D.offsetWidth ||
          this.o.height != this.D.offsetHeight
        )
          (this.o.width = this.D.offsetWidth),
            (this.o.height = this.D.offsetHeight),
            (this.D.style[this.Ra + "OriginX"] = this.o.width / 2 + "px"),
            (this.D.style[this.Ra + "OriginY"] = this.o.height / 2 + "px"),
            (a = !0);
        var c = Math.round(this.ed());
        (this.yg == c && !a) ||
          this.Bc ||
          ((this.yg = c), (this.D.style[this.vd] = c + "px"));
        this.ob.sn(this.pan.c, this.i.c, this.O.c, this.$a);
        for (a = 0; 6 > a; a++) {
          var b;
          if ((b = this.ob.cb[a])) {
            var d = "";
            this.Bc
              ? ((d +=
                  "translate3d(" +
                  this.o.width / 2 +
                  "px," +
                  this.o.height / 2 +
                  "px,0px) "),
                (d += "perspective(" + c + "px) "),
                (d += "translate3d(0px,0px," + c + "px) "))
              : (d +=
                  "translate3d(" +
                  this.o.width / 2 +
                  "px," +
                  this.o.height / 2 +
                  "px," +
                  c +
                  "px) ");
            d += "rotateZ(" + Number(this.O.c).toFixed(10) + "deg) ";
            d += "rotateX(" + Number(this.i.c).toFixed(10) + "deg) ";
            d += "rotateY(" + Number(-this.pan.c).toFixed(10) + "deg) ";
            b.fl &&
              ((d += b.fl),
              b.fb || (d = "translate3d(-10px,-10px,0px) scale(0.001,0.001)"),
              (b.K.style[this.Ra] = d));
          }
        }
      };
      b.prototype.iq = function () {
        this.Yf();
        var a;
        this.ic && (a = this.ic.getContext("2d"));
        if (
          this.o.width !== this.D.offsetWidth ||
          this.o.height !== this.D.offsetHeight
        )
          (this.o.width = this.D.offsetWidth),
            (this.o.height = this.D.offsetHeight);
        if (a) {
          var c = a.canvas.width / 2,
            b = a.canvas.height / 2,
            d = a.createRadialGradient(c, b, 5, c, b, Math.max(c, b));
          d.addColorStop(0, "#333");
          d.addColorStop(1, "#fff");
          a.rect(0, 0, a.canvas.width, a.canvas.height);
          a.fillStyle = d;
          a.fill();
          a.fillStyle = "#f00";
          a.font = "20px Helvetica";
          a.textAlign = "center";
          a.fillText("Pan: " + this.pan.c.toFixed(1), c, b - 60);
          a.fillText("Tilt: " + this.i.c.toFixed(1), c, b - 30);
          a.fillText("Fov: " + this.f.c.toFixed(1), c, b);
          a.fillText("Node: " + this.Tk(), c, b + 30);
          a.fillText("Title: " + this.Kf.title, c, b + 60);
        }
      };
      b.prototype.jq = function () {
        this.Yf();
        if (
          this.o.width !== this.D.offsetWidth ||
          this.o.height !== this.D.offsetHeight
        )
          (this.o.width = this.D.offsetWidth),
            (this.o.height = this.D.offsetHeight);
        this.ia &&
          this.ia.setPan &&
          (this.ia.setPan(this.pan.c),
          this.ia.setTilt(this.i.c),
          this.ia.setFov(this.f.c));
      };
      b.prototype.Vj = function () {
        this.ya.style.visibility = "inherit";
        this.ca || (this.ca = this.ya.getContext("2d"));
        if (this.ca.width != this.o.width || this.ca.height != this.o.height)
          (this.ca.width = this.o.width), (this.ca.height = this.o.height);
        this.ca.clear
          ? this.ca.clear()
          : this.ca.clearRect(0, 0, this.ya.width, this.ya.height);
        this.pc = 0;
        var a = 100 / this.f.c;
        var c = this.h.width / this.h.height;
        var b = this.o.height * a * c;
        a *= this.o.height;
        var d = (this.pan.c / 100 / c - 0.5) * b + this.o.width / 2;
        for (
          var e = (this.i.c / 100 - 0.5) * a + this.o.height / 2,
            f,
            h,
            g,
            q,
            n = 0;
          this.h.J.length >= n + 2 && this.h.J[n + 1].width > b;

        )
          n++;
        var y;
        var r = [];
        for (y = this.h.J.length - 1; y >= n; ) {
          c = this.h.J[y];
          if (c.cache) {
            var v = { Ya: 0, zb: 0 };
            v.Bb = c.L - 1;
            v.Cb = c.fa - 1;
          } else {
            v = {};
            var u = (-e / a) * (c.height / this.h.G);
            f = ((-d + this.o.width) / b) * (c.width / this.h.G);
            h = ((-e + this.o.height) / a) * (c.height / this.h.G);
            v.Ya = Math.min(
              Math.max(0, Math.floor((-d / b) * (c.width / this.h.G))),
              c.L - 1
            );
            v.zb = Math.min(Math.max(0, Math.floor(u)), c.fa - 1);
            v.Bb = Math.min(Math.max(0, Math.floor(f)), c.L - 1);
            v.Cb = Math.min(Math.max(0, Math.floor(h)), c.fa - 1);
          }
          r[y] = v;
          var x = !0;
          for (h = v.zb; h <= v.Cb; h++)
            for (f = v.Ya; f <= v.Bb; f++)
              (q = f + h * c.L),
                (u = c.U[q]),
                u || ((u = new m.Kd()), (c.U[q] = u)),
                this.Qb < this.Wg
                  ? u.h ||
                    (this.jj++,
                    (u.h = new Image()),
                    (u.h.onload = this.Zp()),
                    (u.h.onerror = this.pi(u)),
                    (u.h.onabort = this.pi(u)),
                    (u.h.crossOrigin = this.crossOrigin),
                    u.h.setAttribute("src", this.He(0, y, f, h)),
                    c.cache && this.Sb.push(u.h),
                    this.Qb++,
                    (this.Da = !0))
                  : this.pc++,
                (u.h && u.h.complete) || (x = !1),
                (u.visible = !0);
          v.pj = x;
          y--;
        }
        for (y = this.h.J.length - 1; y >= n; ) {
          c = this.h.J[y];
          if (r[y] && 0 <= r[y].Ya)
            for (v = r[y], h = v.zb; h <= v.Cb; h++)
              for (f = v.Ya; f <= v.Bb; f++)
                (q = f + h * c.L),
                  (u = c.U[q]) || (u = c.U[q] = new m.Kd()),
                  u.h &&
                    u.h.complete &&
                    ((q = d + ((-this.h.Ja + this.h.G * f) * b) / c.width),
                    this.ca.drawImage(
                      u.h,
                      q,
                      e + ((-this.h.Ja + this.h.G * h) * a) / c.height,
                      (u.h.width * b) / c.width,
                      (u.h.height * a) / c.height
                    )),
                  (u.visible = !0);
          y--;
        }
        for (b = 0; b < this.h.J.length; b++)
          if (((c = this.h.J[b]), !c.cache))
            for (g in c.U)
              c.U.hasOwnProperty(g) &&
                ((u = c.U[g]), u.visible || ((u.h = null), delete c.U[g]));
        if (0 <= this.A.mode || 0 < this.A.lb.length)
          for (
            b = 1,
              0 >= this.A.mode && (b = 0),
              3 == this.A.mode && (b = this.A.pa),
              g = 0;
            g < this.P.length;
            g++
          )
            if (
              ((c = this.P[g]),
              (d = b),
              "poly" == c.type &&
                ((a = c.Wd),
                2 == this.A.mode && (d = c.pa),
                (e = this.A.lb.indexOf(c.id)),
                -1 != e && (d = this.A.Pb[e]),
                0 < a.length))
            ) {
              this.ca.fillStyle = this.ga(c.ec, c.dc * d);
              this.ca.strokeStyle = this.ga(c.hc, c.gc * d);
              this.ca.beginPath();
              for (c = 0; c < a.length; c++)
                (d = a[c]),
                  0 == c
                    ? this.ca.moveTo(d.Nb, d.vb)
                    : this.ca.lineTo(d.Nb, d.vb);
              this.ca.closePath();
              this.ca.stroke();
              this.ca.fill();
            }
        this.ad = !1;
      };
      b.prototype.Yp = function (a) {
        var c = this;
        return function () {
          c.update();
          c.ad = !0;
          a.loaded = !0;
          a.h && !a.K && c.D.appendChild(a.h);
          c.Qb && c.Qb--;
          a.h && a.Pa && (a.Pa.drawImage(a.h, 0, 0), (a.h = null));
        };
      };
      b.prototype.Zp = function () {
        var a = this;
        return function () {
          a.Da = !0;
          a.ad = !0;
          a.Qb && a.Qb--;
        };
      };
      b.prototype.pi = function (a) {
        var c = this;
        return function () {
          c.Da = !0;
          c.ad = !0;
          c.Qb && c.Qb--;
          a.h = null;
        };
      };
      b.prototype.dl = function (a, c, b) {
        b.Ya = (a.width / this.h.G) * c.gg;
        b.zb = (a.height / this.h.G) * c.hg;
        b.Bb = (a.width / this.h.G) * c.Eg;
        b.Cb = (a.height / this.h.G) * c.Fg;
        b.Ya = Math.min(Math.max(0, Math.floor(b.Ya)), a.L - 1);
        b.zb = Math.min(Math.max(0, Math.floor(b.zb)), a.fa - 1);
        b.Bb = Math.min(Math.max(0, Math.floor(b.Bb)), a.L - 1);
        b.Cb = Math.min(Math.max(0, Math.floor(b.Cb)), a.fa - 1);
      };
      b.prototype.yp = function (a) {
        a = Math.round(a);
        this.Bc = 0 < (a & 1);
        this.tf = 0 < (a & 2);
        this.xi = 0 < (a & 4);
        this.uf = 0 < (a & 8);
        4096 <= a &&
          ((this.Tc = 0 < (a & 4096)),
          (this.Y = 0 < (a & 8192)),
          (this.ah = 0 < (a & 32768)));
      };
      b.prototype.no = function () {
        var a = 0;
        this.Bc && (a |= 1);
        this.tf && (a |= 2);
        this.xi && (a |= 4);
        this.Tc && (a |= 4096);
        this.Y && (a |= 8192);
        this.ah && (a |= 32768);
        return a;
      };
      b.prototype.Am = function () {
        if (!(6 > this.ob.cb.length))
          for (var a = 0; 6 > a; a++) {
            var c = this.ob.cb[a];
            var b = [];
            b.push(new m.xa(-1, -1, -1, 0, 0));
            b.push(new m.xa(1, -1, -1, 1, 0));
            b.push(new m.xa(1, 1, -1, 1, 1));
            b.push(new m.xa(-1, 1, -1, 0, 1));
            for (var d = 0; 4 > d; d++)
              4 > a
                ? b[d].Ea((-Math.PI / 2) * a)
                : b[d].wa((Math.PI / 2) * (4 == a ? -1 : 1)),
                this.$a &&
                  (b[d].kb((this.$a.O * Math.PI) / 180),
                  b[d].wa((-this.$a.pitch * Math.PI) / 180)),
                b[d].Ce(-this.pan.c),
                b[d].Hd(this.i.c),
                b[d].De(this.O.c);
            b = this.Oi(b);
            c.fb = 0 < b.length;
            if (c.fb) {
              c = c.mf;
              c.gg = b[0].td;
              c.Eg = b[0].td;
              c.hg = b[0].Rb;
              c.Fg = b[0].Rb;
              for (d = 1; d < b.length; d++)
                (c.gg = Math.min(c.gg, b[d].td)),
                  (c.Eg = Math.max(c.Eg, b[d].td)),
                  (c.hg = Math.min(c.hg, b[d].Rb)),
                  (c.Fg = Math.max(c.Fg, b[d].Rb));
              c.Lf = c.Eg - c.gg;
              c.hh = c.Fg - c.hg;
              c.scale = Math.max(c.Lf, c.hh);
            } else (c.mf.Lf = -1), (c.mf.hh = -1);
          }
      };
      b.prototype.rj = function () {
        for (var a = 0; a < this.h.J.length; a++) {
          var c = this.h.J[a],
            b;
          for (b in c.U) c.U.hasOwnProperty(b) && (c.U[b].visible = !1);
        }
      };
      b.prototype.Zi = function () {
        var a = 0,
          c = Math.tan((Math.min(this.Jb(), 175) * Math.PI) / 360),
          b = this.o.height / (2 * c);
        b *= 1 + ((this.o.width / this.o.height) * c) / 2;
        for (
          b *= Math.pow(2, 1 < this.devicePixelRatio ? this.h.Gl : this.h.Fl);
          this.h.J.length >= a + 2 &&
          !this.h.J[a + 1].qf &&
          this.h.J[a + 1].width > b;

        )
          a++;
        return a;
      };
      b.prototype.mq = function () {
        var a = !1,
          c,
          b,
          d;
        if (
          this.o.width !== this.D.offsetWidth ||
          this.o.height !== this.D.offsetHeight
        )
          (this.o.width = this.D.offsetWidth),
            (this.o.height = this.D.offsetHeight),
            (this.D.style[this.Ra + "OriginX"] = this.o.width / 2 + "px"),
            (this.D.style[this.Ra + "OriginY"] = this.o.height / 2 + "px"),
            (a = !0);
        var e = Math.round(this.ed());
        if (this.yg != e || a)
          (this.yg = e),
            this.Bc ||
              ((this.D.style[this.vd] = e + "px"),
              (this.D.style[this.vd + "Origin"] = "50% 50%"));
        this.pc = 0;
        if (0 < this.h.J.length) {
          this.Am();
          this.rj();
          var f = "";
          for (c = 0; 6 > c; c++) {
            var h = this.ob.cb[c];
            h.fb && (f = f + c + ",");
          }
          f = this.Zi();
          var g;
          for (g = this.h.J.length - 1; g >= f; ) {
            a = this.h.J[g];
            var q = 1;
            g == this.h.J.length - 1 &&
              0 == this.h.Ja &&
              (q = this.h.G / (this.h.G - 2));
            for (c = 0; 6 > c; c++) {
              h = this.ob.cb[c];
              var n = h.mf;
              if ((h.fb && 0 < n.Lf && 0 < n.hh && 0 < n.scale) || a.cache) {
                h.Da = !1;
                var y = {};
                a.cache
                  ? ((y.Ya = 0),
                    (y.zb = 0),
                    (y.Bb = a.L - 1),
                    (y.Cb = a.fa - 1))
                  : this.dl(a, n, y);
                for (d = y.zb; d <= y.Cb; d++)
                  for (b = y.Ya; b <= y.Bb; b++) {
                    var r = b + d * a.L + c * a.L * a.fa;
                    (n = a.U[r]) || (n = a.U[r] = new m.Kd());
                    if (!n.K && this.Qb < this.Wg) {
                      if (0 < this.ti.length) {
                        n.K = this.ti.shift();
                        for (
                          r = this.D.firstChild;
                          r && r.Sd && (-1 == r.Sd || r.Sd >= g);

                        )
                          r = r.nextSibling;
                        this.D.insertBefore(n.K, r);
                        n.Pa = n.K.getContext("2d");
                      } else if (this.tm < this.we) {
                        this.tm++;
                        n.K = document.createElement("canvas");
                        n.K.width = this.h.G + 2 * this.h.Ja;
                        n.K.height = this.h.G + 2 * this.h.Ja;
                        n.Pa = n.K.getContext("2d");
                        n.K.style[this.Ra + "Origin"] = "0% 0%";
                        n.K.style.overflow = "hidden";
                        n.K.style.position = "absolute";
                        for (
                          r = this.D.firstChild;
                          r && r.Sd && (-1 == r.Sd || r.Sd >= g);

                        )
                          r = r.nextSibling;
                        this.D.insertBefore(n.K, r);
                      }
                      n.K &&
                        (this.jj++,
                        (n.h = new Image()),
                        (n.h.crossOrigin = this.crossOrigin),
                        (n.h.style[this.Ra + "Origin"] = "0% 0%"),
                        (n.h.style.position = "absolute"),
                        (n.h.style.overflow = "hidden"),
                        (n.K.Sd = g),
                        (n.h.onload = this.Yp(n)),
                        (n.h.onerror = this.pi(n)),
                        (n.h.onabort = this.pi(n)),
                        n.h.setAttribute("src", this.He(c, g, b, d)),
                        a.cache && this.Sb.push(n.h),
                        this.Qb++,
                        (this.Da = !0));
                    } else this.pc++;
                    if (n.K) {
                      r = "";
                      this.Bc
                        ? ((r +=
                            "translate3d(" +
                            this.o.width / 2 +
                            "px," +
                            this.o.height / 2 +
                            "px,0px) "),
                          (r += " perspective(" + e + "px) "),
                          (r += "translate3d(0px,0px," + e + "px) "))
                        : (r +=
                            "translate3d(" +
                            this.o.width / 2 +
                            "px," +
                            this.o.height / 2 +
                            "px," +
                            e +
                            "px) ");
                      r += "rotateZ(" + Number(this.O.c).toFixed(10) + "deg) ";
                      r += "rotateX(" + Number(this.i.c).toFixed(10) + "deg) ";
                      r +=
                        "rotateY(" + Number(-this.pan.c).toFixed(10) + "deg) ";
                      this.$a &&
                        ((r +=
                          "rotateX(" +
                          Number(-this.$a.pitch).toFixed(10) +
                          "deg) "),
                        (r +=
                          "rotateZ(" +
                          Number(this.$a.O).toFixed(10) +
                          "deg) "));
                      r =
                        4 > c
                          ? r + ("rotateY(" + -90 * c + "deg) ")
                          : r + ("rotateX(" + (4 == c ? -90 : 90) + "deg) ");
                      if (this.tf) {
                        var v =
                          (this.h.G / a.width) *
                          (2 * g + 1) *
                          (this.Vf / this.h.G);
                        v = this.Kc
                          ? (2 / Math.tan((this.f.c * Math.PI) / 360)) * v
                          : 2 * v;
                        r += " scale(" + v * q * q + ")";
                      } else v = 1 / (q * q);
                      r +=
                        " translate3d(" +
                        ((1 / q) * b * this.h.G - this.h.Ja - a.width / 2) +
                        "px,";
                      r +=
                        (1 / q) * d * this.h.G -
                        this.h.Ja -
                        a.width / 2 +
                        "px,";
                      r += (-a.width * v) / 2 + "px)";
                      h.fb &&
                        ((n.visible = !0),
                        n.K
                          ? (n.K.style[this.Ra] = r)
                          : n.h && (n.h.style[this.Ra] = r));
                    }
                  }
              }
            }
            g--;
          }
          for (e = 0; e < this.h.J.length; e++) {
            a = this.h.J[e];
            for (var u in a.U)
              a.U.hasOwnProperty(u) &&
                ((n = a.U[u]),
                !n.visible &&
                  n.K &&
                  (a.cache
                    ? n.K
                      ? (n.K.style[this.Ra] =
                          "translate3d(-10px,-10px,0px) scale(0.001,0.001)")
                      : n.h && (n.h.style[this.Ra] = "")
                    : (n.Pa &&
                        n.Pa.clearRect(
                          0,
                          0,
                          n.Pa.canvas.width,
                          n.Pa.canvas.height
                        ),
                      this.ti.push(n.K),
                      n.K
                        ? ((f =
                            "translate3d(-10px,-10px,0px) scale(0.001,0.001)"),
                          (n.K.style[this.Ra] = f),
                          (n.K.Sd = -1))
                        : n.loaded && this.D.removeChild(n.h),
                      (n.K = null),
                      (n.h = null),
                      (n.Pa = null),
                      delete a.U[u])));
          }
          this.ad = !1;
        }
      };
      b.prototype.ym = function () {
        var a = Math.round(this.ed());
        this.Bc || this.xm(a);
        for (var c = 0; c < this.Sa.length; c++) {
          var b = this.Sa[c];
          b.Cm(a);
          b.b.hidden = !1;
        }
      };
      b.prototype.Dm = function () {
        for (var a = Math.round(this.ed()), c = 0; c < this.I.length; c++) {
          var b = this.I[c];
          b.md || (b.Cm(a), (b.b.hidden = !1));
        }
      };
      b.prototype.Ao = function () {
        for (var a = 0; a < this.Sa.length; a++) {
          var c = this.Sa[a];
          c.Bf(!1);
        }
        for (a = 0; a < this.I.length; a++) (c = this.I[a]), c.md || c.Bf(!1);
      };
      b.prototype.qq = function () {
        for (var a = 0; a < this.I.length; a++) {
          var c = this.I[a];
          c.md || c.Ke();
        }
        for (a = 0; a < this.Sa.length; a++) (c = this.Sa[a]), c.Ke();
      };
      b.prototype.Jc = function (a) {
        this.ne = !1;
        try {
          a ? (this.ab = a) : (this.ab = document.createElement("canvas"));
          var c = this.Od.offsetWidth - this.margin.left - this.margin.right,
            b = this.Od.offsetHeight - this.margin.top - this.margin.bottom;
          if (100 > c || 100 > b) b = c = 100;
          var d = window.devicePixelRatio || 1;
          this.uf && (d = 1);
          this.D.style.width = c + "px";
          this.D.style.height = b + "px";
          this.ab.style.width = c + "px";
          this.ab.style.height = b + "px";
          this.ab.width = c * d;
          this.ab.height = b * d;
          this.ab.style.display = "none";
          this.ab.style.touchAction = "none";
          this.D.insertBefore(this.ab, this.D.firstChild);
          a = { stencil: !0, depth: !0 };
          a.alpha = this.Kc ? !0 : !1;
          this.Bd && 10 <= this.ll[0] && ((a.antialias = !1), (a.alpha = !1));
          this.H = this.ab.getContext("webgl", a);
          this.H || (this.H = this.ab.getContext("experimental-webgl", a));
          if (this.H) {
            var e = this.H;
            this.rb.width = c * d;
            this.rb.height = b * d;
            e.clearColor(0, 0, 0, 0);
            e.enable(this.H.DEPTH_TEST);
            e.viewport(0, 0, 500, 500);
            e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT);
            4096 <= e.getParameter(e.MAX_TEXTURE_SIZE) &&
              !this.ug &&
              (this.we = 1 < d ? 4 * this.we : 2 * this.we);
            this.M("Max tile cnt: " + this.we);
            this.na.sg();
            this.na.Gh();
            this.na.nl(this.Ff);
            this.na.ol();
            this.B && (this.B.sg(), this.B.Jc());
            this.Ga && (this.Ga.sg(), this.Ga.Jc());
          }
        } catch (p) {
          this.M(p);
        }
        this.H
          ? ((this.Y = !0), this.ba("webglready", { gl: this.H }))
          : alert("Could not initialise WebGL!");
      };
      b.prototype.kc = function (a) {
        return a
          ? "{" == a.charAt(0) ||
            "/" == a.charAt(0) ||
            0 < a.indexOf("://") ||
            0 == a.indexOf("javascript:")
            ? a
            : this.Nd + a
          : this.Nd;
      };
      b.prototype.Yd = function (a, c, b) {
        var d = new RegExp("%0*" + c, "i").exec(a.toString());
        if (d) {
          d = d.toString();
          var e = b.toString();
          for (
            d.charAt(d.length - 1) != c && (e = (1 + b).toString());
            e.length < d.length - 1;

          )
            e = "0" + e;
          a = a.replace(d, e);
        }
        return a;
      };
      b.prototype.He = function (a, c, b, d) {
        var e = this.h.oj - 1 - c,
          k = this.h.Hl,
          l = "x";
        switch (a) {
          case 0:
            l = "f";
            break;
          case 1:
            l = "r";
            break;
          case 2:
            l = "b";
            break;
          case 3:
            l = "l";
            break;
          case 4:
            l = "u";
            break;
          case 5:
            l = "d";
        }
        for (var f = 0; 3 > f; f++)
          (k = this.Yd(k, "c", a)),
            (k = this.Yd(k, "s", l)),
            (k = this.Yd(k, "r", c)),
            (k = this.Yd(k, "l", e)),
            (k = this.Yd(k, "x", b)),
            (k = this.Yd(k, "y", d)),
            (k = this.Yd(k, "v", d)),
            (k = this.Yd(k, "h", b));
        return this.kc(k);
      };
      b.prototype.lg = function () {
        return this.pan.c;
      };
      b.prototype.ho = function () {
        return this.u.pan;
      };
      b.prototype.Yk = function () {
        for (var a = this.pan.c; -180 > a; ) a += 360;
        for (; 180 < a; ) a -= 360;
        return a;
      };
      b.prototype.pe = function () {
        for (var a = this.pan.c - this.pan.vj; -180 > a; ) a += 360;
        for (; 180 < a; ) a -= 360;
        return a;
      };
      b.prototype.zf = function (a) {
        this.va();
        isNaN(a) || (this.pan.c = Number(a));
        this.update();
      };
      b.prototype.Ij = function (a) {
        this.va();
        isNaN(a) || (this.pan.c = Number(a) + this.pan.vj);
        this.update();
      };
      b.prototype.rk = function (a, c) {
        isNaN(a) || (this.zf(this.lg() + a), c && (this.pan.d = a));
      };
      b.prototype.kn = function (a, c) {
        this.rk(a * this.zh(), c);
      };
      b.prototype.Ch = function () {
        return this.i.c;
      };
      b.prototype.oo = function () {
        return this.u.i;
      };
      b.prototype.Af = function (a) {
        this.va();
        isNaN(a) || (this.i.c = Number(a));
        this.update();
      };
      b.prototype.tk = function (a, c) {
        this.Af(this.Ch() + a);
        c && (this.i.d = a);
      };
      b.prototype.mn = function (a, c) {
        this.tk(a * this.zh(), c);
      };
      b.prototype.Jj = function (a) {
        this.va();
        isNaN(a) || (this.O.c = Number(a));
        this.update();
      };
      b.prototype.al = function () {
        return this.O.c;
      };
      b.prototype.dj = function () {
        return this.f.c;
      };
      b.prototype.Kn = function () {
        return this.u.Jd;
      };
      b.prototype.xf = function (a) {
        this.va();
        switch (this.ra()) {
          case 4:
            var c = 170;
            break;
          case 12:
            c = 360;
            break;
          case 9:
            c = 355;
            break;
          default:
            c = 170;
        }
        2 == this.ib && (c = 9999999999);
        !isNaN(a) &&
          0 < a &&
          a < c &&
          ((c = this.f.c), (this.f.c = 1 * a), c != this.f.c && this.update());
      };
      b.prototype.qk = function (a, c) {
        this.xf(this.dj() + a);
        c && (this.f.d = a);
      };
      b.prototype.Ki = function (a, c) {
        if (!isNaN(a)) {
          var b = (a / 90) * Math.cos((Math.min(this.f.c, 90) * Math.PI) / 360);
          b = this.f.c * Math.exp(b);
          this.xf(b);
          c && (this.f.d = a);
        }
      };
      b.prototype.xp = function (a, c) {
        this.va();
        isNaN(a) || (this.pan.c = a);
        isNaN(c) || (this.i.c = c);
        this.update();
      };
      b.prototype.hi = function (a, c, b) {
        this.va();
        isNaN(a) || (this.pan.c = a);
        isNaN(c) || (this.i.c = c);
        isNaN(b) || this.xf(b);
        this.update();
      };
      b.prototype.rp = function () {
        this.hi(this.pan.Qa, this.i.Qa, this.f.Qa);
      };
      b.prototype.up = function (a) {
        this.Pg(a);
        this.Qg(a);
        this.Og(a);
      };
      b.prototype.Pg = function (a) {
        this.C.Ab = a;
      };
      b.prototype.Og = function (a) {
        this.C.ue = a;
      };
      b.prototype.Un = function () {
        return this.C.ue;
      };
      b.prototype.Qg = function (a) {
        this.C.ld = a;
      };
      b.prototype.Ip = function (a, c) {
        void 0 === c && (c = !0);
        this.Fm = c;
        this.bh == !a &&
          ((this.bh = !!a) ? (this.hb.fi = !0) : (this.O.c = 0),
          this.ba("gyrochanged", {}));
      };
      b.prototype.po = function () {
        return this.bh;
      };
      b.prototype.fo = function () {
        return this.tg
          ? 5
          : this.Bd
          ? 4
          : this.xl
          ? 1
          : this.ul
          ? 2
          : this.tl
          ? 3
          : 0;
      };
      b.prototype.In = function () {
        return this.mj
          ? 5
          : this.ql
          ? 4
          : this.ff
          ? 2
          : this.Kc
          ? 3
          : this.lj
          ? 1
          : 0;
      };
      b.prototype.moveTo = function (a, c, b, d, e, f) {
        this.va();
        if ("_blank" !== a && "" !== a) {
          this.u.active = !0;
          this.u.aborted = !1;
          this.u.Yj = !1;
          var k = a.toString().split("/");
          1 < k.length &&
            ((a = Number(k[0])),
            (d = Number(c)),
            (c = Number(k[1])),
            2 < k.length && (b = Number(k[2])));
          isNaN(a) ? (this.u.pan = this.pan.c) : (this.u.pan = Number(a));
          isNaN(c) ? (this.u.i = this.i.c) : (this.u.i = Number(c));
          !isNaN(b) && 0 < b && 180 > b
            ? (this.u.f = Number(b))
            : (this.u.f = this.f.c);
          this.u.speed = !isNaN(d) && 0 < d ? Number(d) : 1;
          isNaN(e) ? (this.u.O = this.O.c) : (this.u.O = Number(e));
          void 0 !== f
            ? !a || (4 != f && 12 != f && 9 != f) || (this.u.Eb = f)
            : (this.u.Eb = this.Ka);
        }
      };
      b.prototype.Uh = function (a) {
        this.va();
        var c = 0,
          b = 0,
          d = 70,
          e = 4,
          f = 0,
          h = 1;
        a.hasOwnProperty("pan") && ((c = Number(a.pan)), (this.u.pan = c));
        a.hasOwnProperty("tilt") && ((b = Number(a.tilt)), (this.u.i = b));
        a.hasOwnProperty("fov") && ((d = Number(a.fov)), (this.u.f = d));
        a.hasOwnProperty("projection") &&
          ((e = Number(a.projection)), (this.u.Eb = e));
        a.hasOwnProperty("timingFunction") && (f = Number(a.timingFunction));
        a.hasOwnProperty("speed") && (h = Number(a.speed));
        0 >= h
          ? (this.hi(c, b, d), this.Oc(e))
          : ((a = new m.bk()),
            (a.bb = "__AutoMove"),
            (a.Df = this.Yk()),
            (a.Tg = this.i.c),
            (a.Id = this.f.c),
            (a.Sg = this.Ka),
            (a.Rc = c),
            (a.$d = b),
            (a.Ef = d),
            (a.rd = e),
            (a.Xe = !1),
            (a.ke = !1),
            (a.le = !1),
            0 == f && (a.ke = !0),
            1 == f && ((a.Xe = !0), (a.ke = !0)),
            2 == f && (a.le = !0),
            (a.speed = h),
            (this.u.ik = this.w),
            (this.w = this.Qk(a)),
            (this.u.jk = new Date().getTime()),
            (this.u.Yj = !0),
            (this.u.active = !0),
            (this.u.aborted = !1),
            (this.u.pan = c),
            (this.u.i = b),
            (this.u.f = d),
            (this.Ld = !1));
      };
      b.prototype.Lo = function (a) {
        this.moveTo(this.pan.Qa, this.i.Qa, this.f.Qa, a);
      };
      b.prototype.Mo = function (a, c) {
        var b = {};
        b.pan = this.pan.Qa;
        b.tilt = this.i.Qa;
        b.fov = this.f.Qa;
        b.projection = this.Zh;
        b.timingFunction = c;
        b.speed = a;
        this.Uh(b);
      };
      b.prototype.Zm = function (a, c, b, d) {
        var e = new m.mh(this);
        e.type = "point";
        e.pan = c;
        e.i = b;
        e.id = a;
        e.b = {};
        e.b.player = this;
        e.Ye();
        e.b.hotspot = e;
        e.b.__div = document.createElement("div");
        e.b.__div.appendChild(d);
        this.P.push(e);
        e.b.__div.style.position = "absolute";
        e.b.__div.style.left = "-1000px";
        e.b.__div.style.top = "-1000px";
        this.Fa.insertBefore(e.b.__div, this.Fa.firstChild);
        this.Da = !0;
      };
      b.prototype.kq = function (a, c, b) {
        for (var d = 0; d < this.P.length; d++) {
          var e = this.P[d];
          e.id == a && ((e.pan = c), (e.i = b), e.Ye());
        }
        this.Da = !0;
      };
      b.prototype.jp = function (a) {
        for (var c = -1, b, d = 0; d < this.P.length; d++)
          (b = this.P[d]), b.id == a && (c = d);
        -1 < c &&
          ((b = this.P.splice(c, 1).pop()),
          b.b && b.b.__div && this.Fa.removeChild(b.b.__div));
      };
      b.prototype.jo = function () {
        for (var a = [], c = 0; c < this.P.length; c++) {
          var b = this.P[c];
          "point" == b.type && a.push(String(b.id));
        }
        return a;
      };
      b.prototype.Mn = function (a) {
        for (var c = 0; c < this.P.length; c++) {
          var b = this.P[c];
          if (b.id == a)
            return (
              (c = {}),
              (c.id = a),
              (c.pan = b.pan),
              (c.tilt = b.i),
              (c.url = b.url),
              (c.target = b.target),
              (c.title = b.title),
              (c.description = b.description),
              (c.skinid = b.Mj),
              b.b && b.b.__div && (c.div = b.b.__div),
              c
            );
        }
      };
      b.prototype.Im = function (a, c) {
        this.X.start.x = a;
        this.X.start.y = c;
        this.X.ea.x = a;
        this.X.ea.y = c;
        this.Ba.ea.x = a;
        this.Ba.ea.y = c;
        this.Cj++;
        this.pan.Gc = this.pan.c;
        this.i.Gc = this.i.c;
      };
      b.prototype.Gm = function (a, c) {
        var b = this.Jb();
        this.pan.Gc += (a * b) / this.o.height;
        this.i.Gc += (c * b) / this.o.height;
        this.pan.c = this.pan.Gc;
        this.i.c = this.i.Gc;
      };
      b.prototype.Hm = function (a, c) {
        this.X.c.x = a;
        this.X.c.y = c;
        this.X.da.x = this.X.c.x - this.X.ea.x;
        this.X.da.y = this.X.c.y - this.X.ea.y;
        this.C.Ad &&
          ((this.X.ea.x = this.X.c.x),
          (this.X.ea.y = this.X.c.y),
          this.update());
      };
      b.prototype.va = function () {
        this.l.active &&
          ((this.l.active = !1),
          this.ba("autorotatechanged", {}),
          (this.pan.d = 0),
          (this.i.d = 0),
          (this.f.d = 0));
        this.u.active &&
          ((this.u.active = !1),
          (this.pan.d = 0),
          (this.i.d = 0),
          (this.f.d = 0));
        this.Me = this.u.aborted = !1;
        this.l.Th = !1;
        this.ud = 0.02;
        this.Qf = 0;
        this.l.Jf && (this.l.enabled = this.l.Oe);
        this.hf = new Date().getTime();
      };
      b.prototype.Sn = function () {
        return this.hf;
      };
      b.prototype.Zk = function (a, c) {
        a || ((a = this.ua.x), (c = this.ua.y));
        var b = this.o.height / (2 * Math.tan((this.f.c * Math.PI) / 360));
        a -= this.o.width / 2;
        c -= this.o.height / 2;
        var d = {};
        d.pan = (180 * Math.atan(a / b)) / Math.PI;
        d.tilt = (180 * Math.atan(-c / Math.sqrt(a * a + b * b))) / Math.PI;
        return d;
      };
      b.prototype.lo = function (a, c) {
        a || ((a = this.ua.x), (c = this.ua.y));
        if (2 === this.ib) {
          var b = this.f.c / this.o.height;
          a = -(a - this.o.width / 2) * b + this.pan.c;
          c = -(c - this.o.height / 2) * b + this.i.c;
        } else {
          b = new m.xa(0, 0, 1);
          a = this.Zk(a, c);
          b.Hd(-a.tilt);
          b.Ce(a.pan);
          b.Hd(-this.i.c);
          b.Ce(-this.pan.c);
          b.Hd(-this.$a.pitch);
          b.De(this.$a.O);
          for (a = b.bn() - 180; -180 > a; ) a += 360;
          c = b.cn();
        }
        b = {};
        b.pan = a;
        b.tilt = c;
        return b;
      };
      b.prototype.zc = function (a) {
        return a == this.control ||
          (a && void 0 !== a.ggPermeableMap && 1 == a.ggPermeableMap)
          ? !0
          : a && void 0 !== a.ggPermeable && 0 == a.ggPermeable
          ? !1
          : a &&
            a.ggType &&
            ("container" == a.ggType ||
              "cloner" == a.ggType ||
              "timer" == a.ggType)
          ? !0
          : !1;
      };
      b.prototype.Mi = function (a, c) {
        var b = this.ed(),
          d,
          e;
        for (d = 0; d < this.I.length + this.Sa.length; d++) {
          var f = d < this.I.length ? this.I[d] : this.Sa[d - this.I.length];
          if (f.eb) return f;
        }
        for (d = 0; d < this.I.length + this.Sa.length; d++)
          if (
            ((f = d < this.I.length ? this.I[d] : this.Sa[d - this.I.length]),
            !f.md)
          ) {
            var h = [],
              g = new m.xa(),
              q;
            var n = (e = void 0);
            0 < f.f &&
              ((e = Math.tan(((f.f / 2) * Math.PI) / 180)),
              (n = 0 < f.Ic ? (e * f.fd) / f.Ic : e),
              f.xd && 1 != f.xd && (n *= f.xd));
            for (q = 0; 4 > q; q++) {
              switch (q) {
                case 0:
                  g.Za(-e, -n, 0);
                  break;
                case 1:
                  g.Za(e, -n, 0);
                  break;
                case 2:
                  g.Za(e, n, 0);
                  break;
                case 3:
                  g.Za(-e, n, 0);
              }
              g.wa((f.wa * Math.PI) / 180);
              g.Ea((-f.Ea * Math.PI) / 180);
              g.kb((f.kb * Math.PI) / 180);
              g.z = g.z - 1;
              g.wa((-f.i * Math.PI) / 180);
              g.Ea((f.pan * Math.PI) / 180);
              g.Ea((-this.pan.c * Math.PI) / 180);
              g.wa((this.i.c * Math.PI) / 180);
              g.kb((this.O.c * Math.PI) / 180);
              h.push(g.clone());
            }
            h = this.Oi(h);
            if (0 < h.length) {
              for (q = 0; q < h.length; q++)
                (g = h[q]),
                  0.1 > g.z
                    ? ((n = -b / g.z),
                      (e = this.o.width / 2 + g.x * n),
                      (n = this.o.height / 2 + g.y * n))
                    : (n = e = 0),
                  (g.Nb = e),
                  (g.vb = n);
              if (this.kl(h, a, c)) return f;
            }
          }
        return null;
      };
      b.prototype.Ih = function () {
        return (
          document.webkitIsFullScreen ||
          document.mozFullScreen ||
          (document.msFullscreenElement &&
            null != document.msFullscreenElement) ||
          document.fullScreen
        );
      };
      b.prototype.Ko = function (a) {
        this.zm(a);
        if (this.bd) this.bd.onclick();
        this.yh && ((this.yh = !1), this.Jk());
        this.Hb = null;
        if (!this.C.Ab) {
          a = a ? a : window.event;
          if (a.which || 0 == a.which || 1 == a.which) {
            var c = new Date().getTime();
            if (this.nd) {
              this.Hb = this.nd;
              this.R.Xa = !0;
              this.R.startTime = c;
              a.stopPropagation();
              return;
            }
            if (this.zc(a.target)) {
              var b;
              (b = this.Mi(this.ua.x, this.ua.y)) && b.re && (this.Hb = b);
              this.Im(a.pageX, a.pageY);
              this.R.Xa = !0;
              this.R.startTime = c;
              a.preventDefault();
              this.va();
            }
          }
          this.X.da.x = 0;
          this.X.da.y = 0;
        }
      };
      b.prototype.If = function (a, c) {
        var b = this.A.Tj;
        b.enabled &&
          (this.ta != this.pb && 0 <= a && 0 <= c && "" != this.ta.title
            ? ((this.Aa.innerHTML = this.ta.title),
              (this.Aa.style.color = this.ga(b.Uj, b.Sj)),
              b.background
                ? (this.Aa.style.backgroundColor = this.ga(b.ec, b.dc))
                : (this.Aa.style.backgroundColor = "transparent"),
              (this.Aa.style.border =
                "solid " + this.ga(b.hc, b.gc) + " " + b.Hi + "px"),
              (this.Aa.style.borderRadius = b.Gi + "px"),
              (this.Aa.style.textAlign = "center"),
              0 < b.width
                ? ((this.Aa.style.left =
                    a - b.width / 2 + this.margin.left + "px"),
                  (this.Aa.style.width = b.width + "px"))
                : ((this.Aa.style.width = "auto"),
                  (this.Aa.style.left =
                    a - this.Aa.offsetWidth / 2 + this.margin.left + "px")),
              (this.Aa.style.height = 0 < b.height ? b.height + "px" : "auto"),
              (this.Aa.style.top = c + 25 + +this.margin.top + "px"),
              (this.Aa.style.visibility = "inherit"),
              (this.Aa.style.overflow = "hidden"))
            : ((this.Aa.style.visibility = "hidden"),
              (this.Aa.innerHTML = "")));
      };
      b.prototype.zm = function (a) {
        var c = this.qe();
        this.Ih()
          ? ((this.ua.x = a.pageX - this.margin.left),
            (this.ua.y = a.pageY - this.margin.top))
          : ((this.ua.x = a.pageX - c.x), (this.ua.y = a.pageY - c.y));
        return c;
      };
      b.prototype.wf = function (a) {
        a && null !== a && "object" == typeof a
          ? (this.ta = a)
          : (this.ta = this.pb);
        this.ta.Ye && this.ta.Ye();
        this.hotspot = this.ta;
      };
      b.prototype.Jo = function (a) {
        a = a ? a : window.event;
        var c = this.zm(a);
        if (!this.C.Ab && !this.nd) {
          this.l.active && (this.l.Oh = new Date().getTime());
          this.R.Xa &&
            (a.preventDefault(),
            (a.which || 0 == a.which || 1 == a.which) &&
              this.Hm(a.pageX, a.pageY),
            this.va());
          var b = !1;
          if (this.ta == this.pb || "poly" == this.ta.type) {
            var d = this.pb;
            0 < this.P.length &&
              this.zc(a.target) &&
              (d = this.Ni(this.ua.x, this.ua.y));
            this.gi(d);
            this.If(a.pageX - c.x, a.pageY - c.y);
            0 != d && d != this.pb && (b = !0);
          }
          c = null;
          !b && this.zc(a.target) && (c = this.Mi(this.ua.x, this.ua.y));
          this.l.th && (this.l.th = !1);
          this.Fa.style.cursor =
            (this.ta != this.pb && this.ta.bf && b) || (c && c.rg)
              ? "pointer"
              : "default";
        }
      };
      b.prototype.gi = function (a) {
        !1 === a && (a = this.pb);
        this.ta != a &&
          (this.ta != this.pb &&
            (0 < this.A.mode && (this.ta.nb = 0),
            this.aa &&
              this.aa.hotspotProxyOut &&
              this.aa.hotspotProxyOut(this.ta.id, this.ta.url)),
          a != this.pb
            ? (this.wf(a),
              this.aa &&
                this.aa.hotspotProxyOver &&
                this.aa.hotspotProxyOver(this.ta.id, this.ta.url),
              0 < this.A.mode && ((this.A.nb = 1), (this.ta.nb = 1)))
            : (this.wf(this.pb), 0 < this.A.mode && (this.A.nb = 0)),
          this.ia && this.ia.changeCurrentHotspot(this.ta.id));
      };
      b.prototype.Io = function (a) {
        a = a ? a : window.event;
        this.Nh = -1;
        if (
          !this.C.Ab &&
          (this.Hb &&
            (this.Hb.re(), this.Hb.eb ? (this.nd = this.Hb) : (this.nd = null)),
          this.R.Xa)
        ) {
          this.va();
          a.preventDefault();
          this.R.Xa = !1;
          a = new Date().getTime();
          var c =
            Math.abs(this.X.start.x - this.X.ea.x) +
            Math.abs(this.X.start.y - this.X.ea.y);
          if (400 > a - this.R.startTime && 0 <= c && 20 > c) {
            var b = this.Ni(this.ua.x, this.ua.y);
            b && this.vm(b);
            c =
              Math.abs(this.X.Dd.x - this.X.ea.x) +
              Math.abs(this.X.Dd.y - this.X.ea.y);
            700 > a - this.wg && 0 <= c && 20 > c
              ? (b ? this.wm(b) : this.C.Vi && this.si(), (this.wg = 0))
              : (this.wg = a);
            this.X.Dd.x = this.X.ea.x;
            this.X.Dd.y = this.X.ea.y;
          }
        }
      };
      b.prototype.Il = function (a) {
        if (!this.C.ld && ((a = a ? a : window.event), this.zc(a.target))) {
          var c = a.detail ? -1 * a.detail : a.wheelDelta / 40;
          this.C.pl && (c = -c);
          a.axis &&
            (-1 == this.Nh ? (this.Nh = a.axis) : this.Nh != a.axis && (c = 0));
          var b = 0 < c ? 1 : -1;
          a.wheelDeltaX &&
            a.wheelDeltaY &&
            Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY) &&
            (c = 0);
          0 != c && (this.Ki(b * this.C.mm, !0), this.update());
          a.preventDefault();
          this.va();
        }
      };
      b.prototype.gq = function (a) {
        a || (a = window.event);
        var c = a.touches,
          b = this.qe();
        this.ua.x = c[0].pageX - b.x;
        this.ua.y = c[0].pageY - b.y;
        this.ae = this.Hb = null;
        this.yh && ((this.yh = !1), this.Jk());
        if (!this.C.Ab) {
          var d = new Date().getTime();
          if (this.nd)
            (this.Hb = this.nd),
              (this.R.Xa = !0),
              (this.R.startTime = d),
              a.preventDefault();
          else {
            if (!this.R.Xa && c[0]) {
              this.R.startTime = d;
              this.R.start.x = c[0].pageX;
              this.R.start.y = c[0].pageY;
              this.R.ea.x = c[0].pageX;
              this.R.ea.y = c[0].pageY;
              this.mb = c[0].target;
              if (this.zc(this.mb)) {
                (d = this.Mi(this.ua.x, this.ua.y)) && d.re && (this.Hb = d);
                if ((d = this.Ni(this.ua.x, this.ua.y)))
                  this.M(d),
                    (this.ae = d),
                    this.gi(d),
                    (d = this.kg(a)),
                    this.If(d.x - b.x, d.y - b.y);
                this.Im(c[0].pageX, c[0].pageY);
                this.R.Ik = c[0].identifier;
                this.R.Xa = !0;
                a.preventDefault();
                this.va();
              }
              if (this.mb) {
                b = this.mb;
                for (d = !1; b && b != this.control; ) {
                  if (b.onmouseover) b.onmouseover();
                  b.onmousedown && !d && (b.onmousedown(), (d = !0));
                  b = b.parentNode;
                }
                d && a.preventDefault();
              }
            }
            1 < c.length && (this.R.Xa = !1);
            !this.hj &&
              2 == c.length &&
              c[0] &&
              c[1] &&
              this.zc(this.mb) &&
              ((a = c[0].pageX - c[1].pageX),
              (c = c[0].pageY - c[1].pageY),
              (this.f.nm = Math.sqrt(a * a + c * c)),
              (this.f.nf = this.f.c));
            this.X.da.x = 0;
            this.X.da.y = 0;
          }
        }
      };
      b.prototype.Jk = function () {
        this.dh &&
          this.s.b &&
          (!this.s.jd && this.s.Oj && this.s.b.play(), (this.s.b.muted = !1));
        this.sa && this.sa.resume();
        if (this.Bd && this.sa && this.sa.createOscillator) {
          var a = this.sa.createOscillator(),
            c = this.sa.createGain();
          a.frequency.value = 30;
          a.type = "sine";
          a.connect(c);
          c.connect(this.sa.destination);
          c.gain.value = 0.01;
          a.start(0);
          setTimeout(function () {
            a.stop();
          }, 1e4);
        }
        for (c = 0; c < this.N.length; c++) {
          var b = this.N[c];
          (!this.Ub(b.id) || b.ja) &&
            0 <= b.loop &&
            b.autoplay &&
            (b.ja && b.Se(), this.Ae(b.id, b.loop));
        }
        for (c = 0; c < this.I.length; c++)
          (b = this.I[c]),
            !this.Ub(b.id) && b.autoplay && this.dh && this.Ae(b.id, b.loop),
            this.Ub(b.id) &&
              b.autoplay &&
              this.dh &&
              (b.yi && b.Pf(), (b.b.muted = !1));
      };
      b.prototype.fq = function (a) {
        a || (a = window.event);
        var c = a.touches,
          b = this.qe();
        this.ua.x = c[0].pageX - b.x;
        this.ua.y = c[0].pageY - b.y;
        if (this.C.Ab) (this.B.sd || this.B.be) && a.preventDefault();
        else {
          c[0] && ((this.R.ea.x = c[0].pageX), (this.R.ea.y = c[0].pageY));
          if (this.mb) {
            for (var d = this.mb, e = !1; d && d != this.control && !e; )
              "scrollarea" == d.ggType && (e = !0),
                "map" == d.ggType && (e = !0),
                "text" == d.ggType && (e = !0),
                (d = d.parentNode);
            e || a.preventDefault();
          }
          if (this.R.Xa) {
            a.preventDefault();
            for (d = 0; d < c.length; d++)
              if (c[d].identifier == this.R.Ik) {
                this.Hm(c[d].pageX, c[d].pageY);
                break;
              }
            this.ae && ((d = this.kg(a)), this.If(d.x - b.x, d.y - b.y));
            this.va();
          }
          2 == c.length &&
            c[0] &&
            c[1] &&
            ((this.R.Xa = !1),
            !this.hj &&
              this.zc(this.mb) &&
              (this.C.ld ||
                ((b = c[0].pageX - c[1].pageX),
                (c = c[0].pageY - c[1].pageY),
                (this.f.Ak = Math.sqrt(b * b + c * c)),
                (this.Ba.f.active = !0),
                (this.Ba.f.jc = this.f.nf * Math.sqrt(this.f.nm / this.f.Ak)),
                4 == this.ra() &&
                  this.Ba.f.jc > this.f.max &&
                  (this.Ba.f.jc = this.f.max),
                this.Ba.f.jc < this.f.min && (this.Ba.f.jc = this.f.min)),
              this.va(),
              a.preventDefault()));
        }
      };
      b.prototype.eq = function (a) {
        var c = this.qe(),
          b = !1;
        if (!this.C.Ab) {
          this.R.Xa && (a.preventDefault(), this.va());
          var d = new Date().getTime();
          var e = void 0;
          var f = !1;
          e =
            Math.abs(this.R.start.x - this.R.ea.x) +
            Math.abs(this.R.start.y - this.R.ea.y);
          if (0 <= e && 20 > e) {
            b = !0;
            this.zc(this.mb) &&
              (a.preventDefault(),
              this.Hb &&
                (this.Hb.re(),
                this.Hb.eb ? (this.nd = this.Hb) : (this.nd = null)));
            if (this.mb) {
              for (e = this.mb; e && e != this.control; )
                e.onclick && (e.onclick(), (f = !0), (b = !1)),
                  (e = e.parentNode);
              f && a.preventDefault();
            }
            e =
              Math.abs(this.R.Dd.x - this.R.ea.x) +
              Math.abs(this.R.Dd.y - this.R.ea.y);
            if (700 > d - this.wg && 0 <= e && 20 > e) {
              if (this.zc(this.mb))
                if ((a.preventDefault(), this.ae)) this.wm(this.ae);
                else if (this.C.Vi) {
                  var h = this;
                  setTimeout(function () {
                    h.si();
                  }, 1);
                }
              if (this.mb) {
                for (e = this.mb; e && e != this.control; )
                  e.ondblclick && (e.ondblclick(), (f = !0), (b = !1)),
                    (e = e.parentNode);
                f && a.preventDefault();
              }
              this.wg = 0;
            } else this.wg = d;
            this.R.Dd.x = this.R.ea.x;
            this.R.Dd.y = this.R.ea.y;
          }
          if (this.mb)
            for (e = this.mb; e && e != this.control; ) {
              if (e.onmouseout) e.onmouseout();
              if (e.onmouseup) e.onmouseup();
              e = e.parentNode;
            }
          a = this.kg(a);
          this.If(a.x - c.x, a.y - c.y);
          this.ae && b && this.vm(this.ae);
          this.mb = null;
          this.R.Xa = !1;
          this.gi(this.pb);
          this.ae = null;
        }
      };
      b.prototype.cq = function (a) {
        var c = this.qe();
        this.C.Ab || (this.R.Xa = !1);
        this.ae = null;
        this.gi(this.pb);
        a = this.kg(a);
        this.If(a.x - c.x, a.y - c.y);
      };
      b.prototype.wl = function () {
        return null != this.mb || this.R.Xa;
      };
      b.prototype.Jl = function (a) {
        !this.xe &&
          window.MSGesture &&
          (this.M("setup gesture"),
          (this.xe = new MSGesture()),
          (this.xe.target = this.control));
        this.xe && this.xe.addPointer(a.pointerId);
      };
      b.prototype.Sk = function (a) {
        this.hj = !0;
        this.Vh = 1;
        this.C.Ab ||
          this.C.ld ||
          (a.touches
            ? ((this.mb = a.touches.target),
              this.zc(a.target) &&
                (a.preventDefault(), (this.f.nf = this.f.c), this.va()))
            : (a.preventDefault(), (this.f.nf = this.f.c), this.va()));
      };
      b.prototype.Fn = function (a) {
        this.C.Ab ||
          this.C.ld ||
          !this.zc(a.target) ||
          (a.preventDefault(),
          (this.Ba.f.active = !0),
          (this.Ba.f.jc = this.f.nf / Math.sqrt(a.scale)),
          4 == this.ra() &&
            this.Ba.f.jc > this.f.max &&
            (this.Ba.f.jc = this.f.max),
          this.update(),
          this.va());
      };
      b.prototype.No = function (a) {
        this.C.Ab ||
          this.C.ld ||
          (a.preventDefault(),
          1 != a.scale &&
            ((this.Ba.f.active = !0),
            (this.Vh *= a.scale),
            (this.Ba.f.jc = this.f.nf / Math.sqrt(this.Vh)),
            4 == this.ra() &&
              this.Ba.f.jc > this.f.max &&
              (this.Ba.f.jc = this.f.max),
            this.update(),
            this.va()));
      };
      b.prototype.Rk = function (a) {
        this.C.Ab ||
          this.C.ld ||
          ((this.Ba.f.active = !1),
          a.preventDefault(),
          this.va(),
          this.xe && this.xe.reset && this.xe.reset());
      };
      b.prototype.Co = function (a) {
        this.C.ue ||
          (this.isFullscreen && a.preventDefault(),
          (this.Mh = a.keyCode),
          this.va());
      };
      b.prototype.Do = function (a) {
        this.Mh && ((this.Mh = 0), a.preventDefault());
      };
      b.prototype.To = function () {
        this.Mh = 0;
      };
      b.prototype.Yh = function () {
        this.isFullscreen &&
          (this.Ih() || this.exitFullscreen(),
          this.Ih() &&
            ((this.T.style.left = "0px"), (this.T.style.top = "0px")));
      };
      b.prototype.Uo = function (a, c, b, d) {
        d
          ? ((this.pg.alpha = a),
            (this.pg.beta = c),
            (this.pg.gamma = b),
            (this.pg.gamma += 90))
          : ((this.hb.alpha = a),
            (this.hb.beta = c),
            (this.hb.gamma = b),
            (this.hb.gamma += 90));
        this.hb.orientation = window.orientation
          ? parseInt("" + window.orientation, 10)
          : 0;
        b = new m.dk();
        a = this.hb;
        b.Ce(-a.alpha);
        b.De(-a.beta);
        b.Hd(-a.gamma);
        b.De(90 - a.orientation);
        1 > b.Db
          ? -1 < b.Db
            ? ((c = (180 / Math.PI) * Math.asin(-b.Db)),
              (a = (180 / Math.PI) * Math.atan2(b.Yb, b.Xb)),
              (b = (180 / Math.PI) * Math.atan2(b.Wb, b.Vb)))
            : ((c = 0),
              (a = 90),
              (b = (-180 / Math.PI) * Math.atan2(-b.Kb, b.Lb)))
          : ((c = 0),
            (a = -90),
            (b = (180 / Math.PI) * Math.atan2(-b.Kb, b.Lb)));
        if (this.bh)
          if (this.wl() || this.u.Fh || this.hb.fi)
            (this.hb.Pl = this.lg() + b), (this.hb.dg = 0), (this.hb.fi = !1);
          else {
            d = this.u.active;
            var e = 1;
            10 > this.hb.dg && ((this.hb.dg += 1), (e = 0.1 * this.hb.dg));
            b = -b + this.hb.Pl;
            this.zf(e * b + (1 - e) * this.lg());
            this.Af(e * a + (1 - e) * this.Ch());
            this.Fm ? this.Jj(e * c + (1 - e) * this.al()) : this.Jj(0);
            this.Yf();
            this.u.active = d;
          }
      };
      b.prototype.vm = function (a) {
        this.aa &&
          this.aa.hotspotProxyClick &&
          this.aa.hotspotProxyClick(a.id, a.url);
        "" != a.url && (this.wj(a.url, a.target), this.If(-1, -1));
      };
      b.prototype.wm = function (a) {
        this.aa &&
          this.aa.hotspotProxyDoubleClick &&
          this.aa.hotspotProxyDoubleClick(a.id, a.url);
      };
      b.prototype.zh = function () {
        return Math.min(
          1,
          2 * Math.tan((Math.PI * Math.min(this.f.c, 90)) / 360)
        );
      };
      b.prototype.Ql = function () {
        var a = this;
        setTimeout(function () {
          a.Ql();
        }, 100);
        9 != a.bi ||
          a.Hh ||
          window.requestAnimationFrame(function () {
            a.Lg();
            a.Mc("restart recover timer");
          });
        10 < a.bi &&
          1 < a.Cj &&
          (a.Mc("recover timer - disabling requestAnimationFrame"),
          (a.Hh = !0),
          a.Lg());
        a.bi++;
      };
      b.prototype.ki = function (a) {
        var c = {
            zq: { value: 0, name: "pan" },
            Bq: { value: 1, name: "tilt" },
            yq: { value: 2, name: "fov" },
          },
          b = 0,
          d = 0,
          e = 0,
          f;
        for (f in c) {
          for (
            var h = c[f], g, q = Math.floor(a);
            !this.$e(q, h.value) && 0 < q;

          )
            q--;
          q = this.$e(q, h.value);
          var n = this.Zn(q);
          if (n) {
            g = new m.rc(q.time, q.value);
            var y = new m.rc(n.time, n.value),
              r = (a - q.time) / (n.time - q.time);
            if (0 != q.type || (0 != n.type && 3 != n.type))
              if (3 == q.type) g = q.value;
              else {
                r = new m.rc();
                var v = new m.rc(),
                  u = n.time - q.time;
                0 == q.type
                  ? v.Za(q.time + 0.3 * u, q.value)
                  : v.Za(q.he, q.ie);
                0 == n.type || 3 == n.type
                  ? r.Za(n.time - 0.3 * u, n.value)
                  : r.Za(n.ge, n.Wc);
                n = new m.rc();
                n.Fi(g, y, v, r, a);
                g = n.y;
              }
            else (n = new m.rc()), n.zd(g, y, r), (g = n.y);
          } else g = q.value;
          switch (h.value) {
            case 0:
              h = this.pan.c;
              if (this.Ld && 3 != q.type) {
                if (2 != this.ib) {
                  for (; 360 < g; ) g -= 360;
                  for (; -360 > g; ) g += 360;
                }
                b = g - h;
                2 != this.ib && (180 < b && (b -= 360), -180 > b && (b += 360));
                this.pan.c = this.pan.c + b * this.ud;
              } else this.pan.c = g;
              this.l.Bg = this.pan.c;
              break;
            case 1:
              h = this.i.c;
              this.Ld && 3 != q.type
                ? ((d = g - h), (this.i.c = this.i.c + d * this.ud))
                : (this.i.c = g);
              this.l.Cg = this.i.c;
              break;
            case 2:
              (h = this.f.c),
                this.Ld && 3 != q.type
                  ? ((e = g - h), (this.f.c = this.f.c + e * this.ud))
                  : (this.f.c = g),
                (this.l.Ag = this.f.c);
          }
        }
        c = this.ra();
        for (f = Math.floor(a); !this.$e(f, 3) && 0 < f; ) f--;
        f = this.$e(f, 3);
        q = a - f.time;
        this.Ld && -1 != this.Rf && this.oh + this.Ci > a
          ? ((c = this.jg(this.Rf)),
            this.f.c > c
              ? (this.oh = a)
              : ((q = (a - this.oh) / this.Ci),
                (q = Math.min(1, q)),
                this.Oc(this.Ka, this.Rf, 1 - q)))
          : (0 == f.xb || q > f.xb - 0.3
              ? this.Oc(f.value)
              : ((q /= f.xb), this.Oc(c, f.value, 1 - q)),
            (this.l.Dl = f.value));
        this.Ld &&
          ((b = Math.sqrt(b * b + d * d + e * e)),
          0.3 > b && ((this.Ld = !1), (this.ud = 0.02), (this.Qf = 0)),
          0 < this.Qf &&
            b > this.Qf &&
            ((this.ud += 0.01), (this.ud = Math.min(this.ud, 1))),
          (this.Qf = b));
        f = Math.floor(a);
        if (f != this.kk)
          for (this.kk = f, a = this.Gn(f), b = 0; b < a.length; b++)
            (d = a[b]),
              (e = d.nh),
              this.qd.hasOwnProperty(e) &&
                ((c = this.qd[e].type),
                0 == c
                  ? this.Zd(e, d.Zj)
                  : 1 == c
                  ? this.Zd(e, d.value)
                  : 2 == c && this.Zd(e, "true" == d.Zj));
        this.update();
      };
      b.prototype.$o = function (a) {
        var c = this.u.speed;
        this.u.nj &&
          ((c = (c * (a.getTime() - this.u.nj)) / 60),
          5 < c && (c = 5),
          0.2 > c && (c = 0.2));
        this.u.nj = a.getTime();
        this.l.fg &&
          (this.na.ready() || 4 == this.Ka) &&
          this.Bh() &&
          ((this.l.fg = !1),
          (this.l.active = !0),
          (this.qb.od = !0),
          (this.qb.$i = !1));
        if (this.u.active || (0 != this.u.Eb && this.na.ready())) {
          if (this.u.Yj && "__AutoMove" == this.w.bb) {
            var b = a.getTime() - this.u.jk;
            c = b / 100;
            if (c >= this.w.length) {
              if (
                (this.ki(this.w.length),
                this.za.splice(this.za.indexOf(this.w), 1),
                (this.u.active = !1),
                (this.w = this.u.ik),
                (this.u.Eb = 0),
                this.hi(this.u.pan, this.u.i, this.u.f),
                (this.pan.Gc = this.u.pan),
                (this.i.Gc = this.u.i),
                this.u.Ig &&
                  ((this.u.Ig = !1),
                  (this.l.Th = !0),
                  (this.l.active = !0),
                  this.ba("autorotatechanged", {})),
                this.onMoveComplete)
              )
                this.onMoveComplete();
            } else this.ki(c);
          } else {
            this.pan.d = this.u.pan - this.pan.c;
            if (360 == this.pan.max - this.pan.min) {
              for (; -180 > this.pan.d; ) this.pan.d += 360;
              for (; 180 < this.pan.d; ) this.pan.d -= 360;
            }
            this.i.d = this.u.i - this.i.c;
            this.O.d = this.u.O - this.O.c;
            this.f.d = this.u.f - this.f.c;
            b = c * this.zh();
            var d = Math.sqrt(
                this.pan.d * this.pan.d +
                  this.i.d * this.i.d +
                  this.O.d * this.O.d +
                  this.f.d * this.f.d
              ),
              e = this.pan.c - this.u.Bg,
              f = this.i.c - this.u.Cg,
              h = this.O.c - this.u.El,
              g = this.f.c - this.u.Ag;
            100 * Math.sqrt(e * e + f * f + h * h + g * g) < b &&
              0 == this.u.Eb &&
              (this.u.aborted = !0);
            this.u.Bg = this.pan.c;
            this.u.Cg = this.i.c;
            this.u.El = this.O.c;
            this.u.Ag = this.f.c;
            if (100 * d < b || this.u.aborted) {
              if (
                ((this.pan.d = 0),
                (this.i.d = 0),
                (this.O.d = 0),
                (this.f.d = 0),
                this.u.active &&
                  ((this.u.active = !1),
                  (this.pan.c = this.u.pan),
                  (this.i.c = this.u.i),
                  (this.O.c = this.u.O),
                  (this.f.c = this.u.f),
                  this.onMoveComplete))
              )
                this.onMoveComplete();
            } else
              (d = d > 5 * b ? b / d : 0.2),
                (this.pan.d *= d),
                (this.i.d *= d),
                (this.f.d *= d);
            this.pan.c += this.pan.d;
            this.i.c += this.i.d;
            this.O.c += this.O.d;
            this.f.c += this.f.d;
            0 != this.u.Eb &&
              (this.u.Eb != this.Ka
                ? ((c = this.jg(this.u.Eb)),
                  this.dj() > c
                    ? ((this.f.c +=
                        -Math.max(
                          (2.5 -
                            1.7 *
                              Math.min(
                                Math.sqrt(
                                  this.pan.d * this.pan.d +
                                    this.i.d * this.i.d +
                                    this.O.d * this.O.d
                                ) / b,
                                1
                              )) *
                            b,
                          this.f.d
                        ) - this.f.d),
                      (this.u.f = this.f.c))
                    : ((this.nc = this.Ka),
                      (this.Ka = this.u.Eb),
                      this.M("New projection from Target:" + this.Ka),
                      (this.Kg = this.u.Ng = 0),
                      this.na.Gh()))
                : 1 > this.u.Ng
                ? ((this.u.Ng = Math.min(1, this.u.Ng + 0.05 * c)),
                  (this.Kg = this.u.Ng))
                : ((this.nc = 0), (this.u.Eb = 0), this.na.Gh()));
          }
          this.hf = a.getTime();
          this.update();
        } else if (this.l.active) {
          b = a.getTime() - this.l.startTime;
          this.l.Oh < this.l.startTime && (this.l.Oh = this.l.startTime);
          if ((this.l.Jf || this.qb.od) && 0 < this.za.length) {
            c = b / 100;
            d = !1;
            if (
              this.Mb != this.w.bb ||
              ("" != this.w.Ne && this.l.Md != this.w.Ne)
            ) {
              for (b = 0; b < this.za.length; b++)
                if (
                  ("" == this.Mb && this.za[b].Ne == this.l.Md) ||
                  ("" != this.Mb &&
                    this.za[b].bb == this.Mb &&
                    this.za[b].Ne == this.l.Md)
                ) {
                  d = !0;
                  this.w = this.za[b];
                  this.Mb = this.w.bb;
                  break;
                }
              !d &&
                0 < this.za.length &&
                this.za[0].Ne == this.l.Md &&
                ((d = !0), (this.w = this.za[0]), (this.Mb = this.w.bb));
            } else d = !0;
            if (d)
              if (
                ((b = (e = this.s.b && this.s.jd) && this.l.Rj && !this.qb.od),
                this.Me)
              ) {
                d = c;
                if (b)
                  for (
                    this.s.b.currentTime < this.lk &&
                      this.Ei &&
                      (this.Di++, (this.Ei = !1)),
                      d =
                        10 *
                        (this.Di * this.s.b.duration + this.s.b.currentTime),
                      this.lk = this.s.b.currentTime,
                      0.05 > this.s.b.duration - this.s.b.currentTime &&
                        (this.Ei = !0);
                    d >= 10 * this.Le;

                  )
                    d -= 10 * this.Le;
                if (
                  (!e && c >= this.w.length) ||
                  (e && !b && c >= this.w.length) ||
                  (e &&
                    b &&
                    (this.w.bb != this.w.Kl || this.w.Wh != this.Wa) &&
                    c >= this.w.length)
                ) {
                  this.ki(this.w.length);
                  this.l.Cd = 0;
                  this.Me = !1;
                  if (this.qb.od) {
                    this.fm();
                    return;
                  }
                  this.Mb = this.w.Kl;
                  if (this.Mb == this.w.bb && this.Wa == this.w.Wh) {
                    if (1 < this.Ma.length && 0 < this.l.Xh) {
                      if (this.l.uj) {
                        b = 1e3;
                        do
                          c =
                            this.Ma[Math.floor(Math.random() * this.Ma.length)];
                        while (b-- && c == this.Wa);
                      } else c = this.Xk();
                      this.ye("{" + c + "}");
                      this.l.startTime = a.getTime();
                      this.Me = !1;
                      this.l.active = !0;
                      this.B.fe = !0;
                    }
                  } else
                    this.gf &&
                      this.w.Wh != this.Wa &&
                      (this.ye("{" + this.w.Wh + "}", this.w.Qo),
                      this.B.enabled
                        ? ((this.l.active = !1), (this.B.fe = !0))
                        : (this.l.active = !0)),
                      (this.l.startTime = a.getTime());
                } else this.ki(d), (this.l.Cd = d);
              } else if (
                ((c = this.w.W[0]),
                (d = this.w.W[1]),
                (e = this.w.W[2]),
                (f = this.w.W[3]),
                3 != f.ub && (f = 0),
                this.l.Th || this.u.aborted || this.qb.od || b)
              ) {
                if (
                  ((this.Me = !0),
                  0 < this.l.Cd
                    ? (this.l.startTime = a.getTime() - 100 * this.l.Cd)
                    : (this.l.startTime = a.getTime()),
                  (this.Ld = b))
                ) {
                  for (this.Le = this.Di = 0; this.Le < this.w.length / 10; )
                    this.Le += this.s.b.duration;
                  d = 10 * this.s.b.currentTime;
                  for (b = Math.floor(d); !this.$e(b, 3) && 0 < b; ) b--;
                  b = this.$e(b, 3);
                  b.value == this.Ka
                    ? (this.Rf = -1)
                    : ((this.Rf = b.value),
                      (this.oh = d),
                      (this.Ci = Math.max(5, b.time + b.xb - d)));
                }
              } else {
                b = {};
                if (0 < this.l.Cd)
                  (b.pan = this.l.Bg),
                    (b.tilt = this.l.Cg),
                    (b.fov = this.l.Ag),
                    (b.projection = this.l.Dl);
                else {
                  for (b.pan = c.value; 360 < b.pan; ) b.pan -= 360;
                  for (; -360 > b.pan; ) b.pan += 360;
                  b.tilt = d.value;
                  b.fov = e.value;
                  b.projection = f ? f.value : 4;
                }
                b.timingFunction = 3;
                b.speed = 1;
                this.u.Ig = !0;
                this.Uh(b);
                this.l.active = !0;
              }
          } else if (0 < this.l.Xh && this.gf && b >= 1e3 * this.l.Xh) {
            if (1 < this.Ma.length) {
              if (this.l.uj) {
                b = 1e3;
                do c = this.Ma[Math.floor(Math.random() * this.Ma.length)];
                while (b-- && c == this.Wa);
              } else
                (b = this.Ma.indexOf(this.Wa)),
                  b++,
                  b >= this.Ma.length && (b = 0),
                  (c = this.Ma[b]);
              this.l.startTime = a.getTime();
              this.l.kd = a.getTime();
              this.l.timeout = 0;
              this.ye("{" + c + "}");
              this.l.active = !0;
              this.B.fe = !0;
            }
          } else
            (b = a.getTime()),
              (d = c = 1e3 / 60),
              0 != this.l.kd && (d = b - this.l.kd),
              (this.i.d = (this.l.ri * (0 - this.i.c)) / 100),
              (this.f.d = (this.l.ri * (this.f.Qa - this.f.c)) / 100),
              (this.pan.d =
                0.95 * this.pan.d + -this.l.speed * this.zh() * 0.05),
              (c = d / c),
              (this.pan.c += this.pan.d * c),
              (this.i.c += this.i.d * c),
              (this.f.c += this.f.d * c),
              (this.l.kd = b),
              this.update();
          3e3 < a.getTime() - this.l.Oh &&
            !this.l.th &&
            ((this.Fa.style.cursor = "none"), (this.l.th = !0));
        } else
          !this.qb.$i &&
            1e3 < a.getTime() - this.hf &&
            (this.za.splice(this.za.indexOf(this.w), 1),
            (this.w = this.ig(!1)),
            (this.Mb = this.w.bb),
            (this.l.active = !1),
            (this.l.fg = !0)),
            this.l.enabled &&
              !this.R.Xa &&
              a.getTime() - this.hf > 1e3 * this.l.timeout &&
              !this.l.fg &&
              ((this.l.Vg && this.Bh()) || !this.l.Vg) &&
              ((this.l.active = !0),
              (this.l.startTime = a.getTime()),
              (this.l.kd = 0),
              this.ba("autorotatechanged", {}),
              (this.pan.d = 0),
              (this.i.d = 0),
              (this.f.d = 0)),
            !this.Ba.enabled ||
              this.R.Xa ||
              (0 == this.pan.d && 0 == this.i.d && 0 == this.f.d) ||
              ((this.u.Fh = !0),
              (this.pan.d *= 0.9),
              (this.i.d *= 0.9),
              (this.f.d *= 0.9),
              (this.pan.c += this.pan.d),
              (this.i.c += this.i.d),
              this.Ki(this.f.d),
              1e-4 >
                this.pan.d * this.pan.d +
                  this.i.d * this.i.d +
                  this.f.d * this.f.d &&
                ((this.pan.d = 0), (this.i.d = 0), (this.f.d = 0)),
              this.update());
      };
      b.prototype.bp = function (a) {
        var c = this.B;
        if (c.sd) {
          var b = a.getTime() - c.Mm;
          b /= 1e3 * c.Lm;
          1 <= b
            ? ((c.sd = !1),
              this.Hk(),
              (c.Pj = a.getTime()),
              this.qm(),
              (c.be = !0),
              0 == c.bc ||
                c.Of ||
                (4 == c.bc
                  ? ((this.w = this.ig(!0, c.Fe, c.Ge, c.Jd)),
                    (this.Mb = this.w.bb),
                    (this.l.active = !0),
                    (this.qb.od = !0))
                  : this.moveTo(c.Fe, c.Ge, c.Jd, c.de, 0, c.rd)))
            : c.Ol(b);
        } else
          c.be &&
            ((b = a.getTime() - c.Pj),
            (b /= 1e3 * c.Uf),
            1 <= b
              ? ((c.be = !1),
                (this.hf = a.getTime()),
                this.update(),
                0 != c.bc &&
                  c.Of &&
                  (4 == c.bc
                    ? ((this.w = this.ig(!0, c.Fe, c.Ge, c.Jd)),
                      (this.Mb = this.w.bb),
                      (this.l.active = !0),
                      (this.qb.od = !0))
                    : this.moveTo(c.Fe, c.Ge, c.Jd, c.de, 0, c.rd)),
                4 != c.bc &&
                  (this.Pg(c.Sh),
                  this.Qg(c.zi),
                  this.Og(c.Kh),
                  (this.l.active = c.fe),
                  this.ba("autorotatechanged", {}),
                  (c.fe = !1)),
                (this.l.kd = 0),
                this.ha && this.Qi(),
                (this.Wf = !1))
              : c.Ol(b));
        c = this.Vo;
        c.en &&
          (c.uh
            ? a.getTime() - c.Xi >= 1e3 * c.yn && (c.uh = !1)
            : ((c.current += c.Xc),
              0 > c.current &&
                ((c.current = 0),
                (c.Xc = -c.Xc),
                (c.uh = !0),
                (c.Xi = a.getTime())),
              1 < c.current &&
                ((c.current = 1),
                (c.Xc = -c.Xc),
                (c.uh = !0),
                (c.Xi = a.getTime()))));
      };
      b.prototype.fp = function () {
        var a,
          c = this.A;
        if (0 < c.lb.length) {
          for (a = 0; a < c.lb.length; a++)
            c.Pc[a] != c.Pb[a] &&
              (c.Pc[a] > c.Pb[a]
                ? ((c.Pb[a] += 0.05), c.Pc[a] < c.Pb[a] && (c.Pb[a] = c.Pc[a]))
                : ((c.Pb[a] -= 0.05),
                  c.Pc[a] > c.Pb[a] &&
                    ((c.Pb[a] = c.Pc[a]),
                    -1 != c.li.indexOf(c.lb[a]) &&
                      (c.li.splice(c.li.indexOf(c.lb[a]), 1),
                      c.lb.splice(a, 1),
                      c.Pc.splice(a, 1),
                      c.Pb.splice(a, 1)))));
          this.update();
        }
        if (2 == c.mode)
          for (a = 0; a < this.P.length; a++) {
            var b = this.P[a];
            "poly" == b.type &&
              b.nb != b.pa &&
              (b.nb > b.pa
                ? ((b.pa += c.Xc), b.nb < b.pa && (b.pa = b.nb))
                : ((b.pa -= c.Xc), b.nb > b.pa && (b.pa = b.nb)),
              this.update());
          }
        3 == c.mode &&
          c.nb != c.pa &&
          (c.nb > c.pa
            ? ((c.pa += c.Xc), c.nb < c.pa && (c.pa = c.nb))
            : ((c.pa -= c.Xc), c.nb > c.pa && (c.pa = c.nb)),
          this.update());
      };
      b.prototype.ep = function () {
        var a = this.Ba;
        this.R.Xa &&
          (this.C.Ad
            ? ((a.da.x = 0.4 * (this.X.ea.x - a.ea.x)),
              (a.da.y = 0.4 * (this.X.ea.y - a.ea.y)),
              (a.ea.x += a.da.x),
              (a.ea.y += a.da.y))
            : ((a.da.x = (0.1 * -this.X.da.x * this.C.sensitivity) / 8),
              (a.da.y = (0.1 * -this.X.da.y * this.C.sensitivity) / 8)),
          this.Gm(a.da.x, a.da.y),
          this.update());
        a.f.active &&
          (this.qk(0.4 * (a.f.jc - this.f.c)),
          0.001 > Math.abs(a.f.jc - this.f.c) / this.f.c && (a.f.active = !1),
          this.update());
        if (a.enabled && (0 != a.da.x || 0 != a.da.y) && !this.R.Xa) {
          var c = 0.9 * (1 - a.Gj);
          a.da.x = c * a.da.x;
          a.da.y = c * a.da.y;
          this.u.Fh = !0;
          0.01 > a.da.x * a.da.x + a.da.y * a.da.y
            ? ((a.da.x = 0), (a.da.y = 0))
            : (this.Gm(a.da.x, a.da.y), this.update());
        }
      };
      b.prototype.ap = function () {
        if (this.C.dm && this.C.Ad) {
          var a = this.Tl;
          a.pan = this.pan.c;
          a.i = this.i.c;
          a.f = this.f.c;
          this.Ue(a);
          this.Ue(a);
          this.Ue(a);
          var c = a.pan - this.pan.c,
            b = a.i - this.i.c;
          a = a.f - this.f.c;
          if (0 != c || 0 != b || 0 != a) {
            var d =
              0.2 +
              0.9 *
                Math.min(
                  ((Math.abs(c) + Math.abs(b) + Math.abs(a)) /
                    Math.abs(Math.min(this.f.c, 90))) *
                    0.3,
                  1
                );
            this.pan.c += c * d;
            this.i.c += b * d;
            this.f.c += a * d;
            this.Ba.Gj = 0.3;
            this.update();
          } else this.Ba.Gj = 0;
        } else this.Yf();
        if (2 != this.ib) {
          for (; 360 < this.pan.c; ) this.pan.c -= 360;
          for (; -360 > this.pan.c; ) this.pan.c += 360;
        }
      };
      b.prototype.cp = function () {
        if (!this.Bh() && this.cf && 5 < this.h.am) {
          var a,
            c = 0,
            b = this.Sb.length;
          if (this.ah) (b = 50), this.Yi < b && this.Yi++, (c = this.Yi);
          else
            for (a = 0; a < b; a++)
              ((this.Sb[a].complete && this.Sb[a].src != this.Dk) ||
                "" == this.Sb[a].src) &&
                c++;
          c == b
            ? ((this.$h = 1),
              (this.isLoaded = !0),
              this.ka && this.ka.ggLoaded && this.ka.ggLoaded(),
              this.ba("imagesready", {}),
              this.l.Vg &&
                this.l.enabled &&
                !this.u.active &&
                !this.B.sd &&
                ((this.l.active = !0),
                (this.l.startTime = new Date().getTime()),
                (this.l.kd = 0)))
            : (this.$h = c / (1 * b));
        }
      };
      b.prototype.Lg = function () {
        var a = this;
        a.ei ||
          (a.Hh
            ? setTimeout(function () {
                a.ei = !1;
                a.Lg();
              }, 1e3 / 60)
            : window.requestAnimationFrame(function () {
                a.ei = !1;
                a.Lg();
              }));
        a.ei = !0;
        this.Cj = this.bi = 0;
        a.u.Fh = !1;
        var c = new Date();
        this.Ah++;
        120 <= this.Ah &&
          (this.M(
            "F/s: " + Math.round((1e3 * this.Ah) / (c.getTime() - this.zl))
          ),
          (this.zl = c.getTime()),
          (this.Ah = 0));
        this.ba("timer", {});
        this.Y && this.na.xn();
        this.Fb &&
          "" !== this.oe &&
          !this.ia &&
          document.hasOwnProperty(this.oe) &&
          document[this.oe].setPan &&
          0 == this.Dn-- &&
          ((this.ia = document[this.oe]),
          (this.Tc = this.Y = !1),
          this.ya && (this.ya.style.visibility = "hidden"),
          this.ia.setLocked(!0),
          this.ia.setSlaveMode(!0),
          this.ia.readConfigString(this.Ti),
          this.Mc("Flash player '" + this.oe + "' connected."));
        this.Xj && (this.Sc(), (this.Xj = !1));
        this.ep();
        this.cp();
        this.$o(c);
        this.ap();
        this.bp(c);
        this.na.nq();
        (0 <= this.A.mode || 0 < this.A.lb.length) && this.fp();
        this.wi();
        if (
          this.jf.pan != this.pan.c ||
          this.jf.i != this.i.c ||
          this.jf.f != this.f.c
        )
          (this.jf.pan = this.pan.c),
            (this.jf.i = this.i.c),
            (this.jf.f = this.f.c),
            this.ba("positionchanged", {});
        this.Bl != this.Ka &&
          ((this.Bl = this.Ka), this.ba("projectionchanged", {}));
        this.Da &&
          (0 < this.ag ? this.ag-- : ((this.Da = !1), (this.ag = 0)),
          this.B.be || this.B.sd || (this.$g(), this.ba("renderframe", {})),
          this.ba("repaint", {}));
        c = this.Vk();
        c != this.Al &&
          (c
            ? (this.ka &&
                this.ka.ggReLoadedLevels &&
                this.ka.ggReLoadedLevels(),
              this.ba("tilesrequested", {}))
            : (a.ka && a.ka.ggLoadedLevels && a.ka.ggLoadedLevels(),
              this.ba("tilesready", {})),
          (this.Al = c));
      };
      b.prototype.jg = function (a) {
        switch (a) {
          case 4:
            a = Math.min(110, this.f.max);
            break;
          case 12:
            a = Math.min(270, this.f.sj);
            a = Math.min(360 * this.ee(), a);
            a = Math.min(360 / this.ee(), a);
            break;
          case 9:
            a = Math.min(270, this.f.tj);
            break;
          default:
            a = 90;
        }
        return a;
      };
      b.prototype.Bm = function () {
        var a = this;
        setTimeout(function () {
          a.yf(!1);
        }, 10);
        setTimeout(function () {
          a.yf(!1);
        }, 100);
      };
      b.prototype.wi = function () {
        this.Si.Kk(this.pan.c, this.i.c);
        for (var a = 0; a < this.N.length + this.I.length; a++) {
          if (a < this.N.length) var c = this.N[a];
          else if (((c = this.I[a - this.N.length]), c.md)) continue;
          c.wi();
        }
      };
      b.prototype.Op = function (a, c) {
        var d = this;
        var f = "<<L>>" + String(d.Ia);
        f = f.toUpperCase();
        "U" != f.charAt(2) && (d.C.df = !1);
        if (0 != d.Gg.length || !d.C.df || d.C.$f || d.C.qh)
          if (d.bd) d.T.removeChild(d.bd), (d.bd = null);
          else {
            d.bd = document.createElement("div");
            var e = d.bd;
            f =
              "left: " +
              a +
              "px;" +
              ("top:\t " + c + "px;") +
              "z-index: 32000;";
            f += "position:relative;";
            f += "display: table;";
            f += "color: black;";
            f += "background-color: white;";
            f += "border: 1px solid lightgray;";
            f += "box-shadow: 1px 1px 3px #333;";
            f += "font-family: Verdana, Arial, Helvetica, sans-serif;";
            f += "font-size: 9pt;";
            f += "opacity : 0.95;";
            e.setAttribute("style", f);
            e.setAttribute("class", "gg_contextmenu");
            f = document.createElement("style");
            a = document.createTextNode(
              ".gg_context_row:hover { background-color: #3399FF }"
            );
            f.type = "text/css";
            f.styleSheet
              ? (f.styleSheet.cssText = a.nodeValue)
              : f.appendChild(a);
            e.appendChild(f);
            for (a = 0; a < d.Gg.length; a++) {
              c = d.Gg[a];
              var h = document.createElement("div");
              f = "text-align: left;";
              f += "margin: 0;";
              f += "padding: 5px 20px;";
              f += "vertical-align: left;";
              h.setAttribute("style", f);
              h.setAttribute("class", "gg_context_row");
              f = document.createElement("a");
              f.href = c.url;
              f.target = "_blank";
              f.innerHTML = c.text;
              f.setAttribute("style", "color: black; text-decoration: none;");
              h.appendChild(f);
              e.appendChild(h);
            }
            0 < d.Gg.length &&
              (!d.C.df || d.C.$f || d.C.qh) &&
              e.appendChild(document.createElement("hr"));
            if (d.C.qh && d.Y) {
              c = [];
              c.push({ text: "Rectilinear Projection", Mg: 4 });
              c.push({ text: "Stereographic Projection", Mg: 9 });
              c.push({ text: "Fisheye Projection", Mg: 12 });
              for (a = 0; a < c.length; a++) {
                h = c[a];
                var m = document.createElement("div");
                m.setAttribute("class", "gg_context_row");
                f = "text-align: left;";
                f += "margin: 0;";
                f =
                  d.Ka == h.Mg
                    ? f + "padding: 5px 20px 5px 7px;"
                    : f + "padding: 5px 20px;";
                f += "vertical-align: left;";
                f += "cursor: pointer;";
                m.setAttribute("style", f);
                m.onclick = (function (a) {
                  return function () {
                    d.Li(a, 1);
                    d.update();
                  };
                })(h.Mg);
                d.Ka == h.Mg
                  ? (m.innerHTML = "&#10687; " + h.text)
                  : (m.innerHTML = h.text);
                e.appendChild(m);
              }
              (d.C.df && !d.C.$f) ||
                e.appendChild(document.createElement("hr"));
            }
            d.C.$f &&
              ((a = document.createElement("div")),
              a.setAttribute("class", "gg_context_row"),
              (f = "text-align: left;margin: 0;padding: 5px 20px;"),
              (f += "vertical-align: left;"),
              (f += "cursor: pointer;"),
              a.setAttribute("style", f),
              (a.onclick = function () {
                d.si();
              }),
              (a.innerHTML = d.Ih() ? "Exit Fullscreen" : "Enter Fullscreen"),
              e.appendChild(a));
            d.C.df ||
              ((a = document.createElement("div")),
              (f = "text-align: left;margin: 0;padding: 5px 20px;"),
              (f += "vertical-align: left;"),
              a.setAttribute("style", f),
              a.setAttribute("class", "gg_context_row"),
              (f = document.createElement("a")),
              (f.href = b.Tf("aHR0cDovL3Bhbm8ydnIuY29tLw==")),
              (f.target = "_blank"),
              (f.innerHTML = b.Tf("Q3JlYXRlZCB3aXRoIFBhbm8yVlI=")),
              7 < this.Qh.length &&
                (f.innerHTML +=
                  "<br/>" +
                  b.nk(this.Qh).replace(/./gm, function (a) {
                    return "&#" + a.charCodeAt(0) + ";";
                  })),
              f.setAttribute("style", "color: black; text-decoration: none;"),
              a.appendChild(f),
              e.appendChild(a));
            d.T.insertBefore(d.bd, d.T.firstChild);
            e.onclick = function () {
              d.bd && (d.T.removeChild(d.bd), (d.bd = null));
            };
            e.oncontextmenu = e.onclick;
          }
      };
      b.prototype.dn = function () {
        var a = this;
        var c = a.Fa;
        a.control = c;
        a.control = c;
        a.Bm();
        setTimeout(function () {
          a.Lg();
        }, 10);
        setTimeout(function () {
          a.Ql();
        }, 200);
        setTimeout(function () {
          a.Ke();
          a.$g();
        }, 10);
        c.addEventListener &&
          (c.addEventListener(
            "touchstart",
            function (c) {
              a.gq(c);
            },
            !1
          ),
          c.addEventListener(
            "touchmove",
            function (c) {
              a.fq(c);
            },
            !1
          ),
          c.addEventListener(
            "touchend",
            function (c) {
              a.eq(c);
            },
            !1
          ),
          c.addEventListener(
            "touchcancel",
            function (c) {
              a.cq(c);
            },
            !1
          ),
          c.addEventListener(
            "pointerdown",
            function (c) {
              a.Jl(c);
            },
            !1
          ),
          c.addEventListener(
            "MSPointerDown",
            function (c) {
              a.Jl(c);
            },
            !1
          ),
          c.addEventListener(
            "MSGestureStart",
            function (c) {
              a.Sk(c);
            },
            !1
          ),
          c.addEventListener(
            "MSGestureEnd",
            function (c) {
              a.Rk(c);
            },
            !1
          ),
          c.addEventListener(
            "MSGestureChange",
            function (c) {
              a.No(c);
            },
            !1
          ),
          c.addEventListener(
            "gesturestart",
            function (c) {
              a.Sk(c);
            },
            !1
          ),
          c.addEventListener(
            "gesturechange",
            function (c) {
              a.Fn(c);
            },
            !1
          ),
          c.addEventListener(
            "gestureend",
            function (c) {
              a.Rk(c);
            },
            !1
          ),
          c.addEventListener(
            "mousedown",
            function (c) {
              a.Ko(c);
            },
            !1
          ),
          c.addEventListener(
            "mousemove",
            function (c) {
              a.Jo(c);
            },
            !1
          ),
          document.addEventListener(
            "mouseup",
            function (c) {
              a.Io(c);
            },
            !1
          ),
          c.addEventListener(
            "mousewheel",
            function (c) {
              a.Il(c);
            },
            !1
          ),
          c.addEventListener(
            "DOMMouseScroll",
            function (c) {
              a.Il(c);
            },
            !1
          ),
          document.addEventListener(
            "keydown",
            function (c) {
              a.Co(c);
            },
            !1
          ),
          document.addEventListener(
            "keyup",
            function (c) {
              a.Do(c);
            },
            !1
          ),
          window.addEventListener(
            "orientationchange",
            function () {
              a.Bm();
            },
            !1
          ),
          window.addEventListener(
            "resize",
            function () {
              a.Ke();
            },
            !1
          ),
          window.addEventListener(
            "blur",
            function () {
              a.To();
            },
            !1
          ),
          a.T.addEventListener(
            "webkitfullscreenchange",
            function () {
              a.Yh();
            },
            !1
          ),
          document.addEventListener(
            "mozfullscreenchange",
            function () {
              a.Yh();
            },
            !1
          ),
          window.addEventListener(
            "webkitfullscreenchange",
            function () {
              a.Yh();
            },
            !1
          ),
          document.addEventListener(
            "MSFullscreenChange",
            function () {
              a.Yh();
            },
            !1
          ));
        c.oncontextmenu = function (c) {
          void 0 === c && (c = window.event);
          if (c.target && !a.zc(c.target)) return !0;
          if (!c.ctrlKey) {
            c = a.kg(c);
            var b = a.qe();
            a.Op(c.x - b.x, c.y - b.y);
            return !1;
          }
          return !0;
        };
        window.addEventListener("deviceorientation", function (c) {
          a.Uo(c.alpha, c.beta, c.gamma, c.absolute);
        });
      };
      b.prototype.hk = function () {
        for (var a = 0; a < this.P.length; a++)
          if (
            "point" == this.P[a].type &&
            (this.aa && this.aa.addSkinHotspot
              ? (this.P[a].Ye(),
                (this.P[a].b = new this.aa.addSkinHotspot(this.P[a])))
              : (this.P[a].b = new m.Nm(this, this.P[a])),
            (this.P[a].b.__div.style.left = "-1000px"),
            (this.P[a].b.__div.style.top = "-1000px"),
            this.P[a].b && this.P[a].b.__div)
          ) {
            var c = this.Fa.firstChild;
            c
              ? this.Fa.insertBefore(this.P[a].b.__div, c)
              : this.Fa.appendChild(this.P[a].b.__div);
          }
      };
      b.prototype.Km = function () {
        var a,
          c = document.createElement("fakeelement"),
          b = {
            OTransition: "oTransitionEnd",
            MSTransition: "msTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionEnd",
          };
        for (a in b) if (void 0 !== c.style[a]) return b[a];
      };
      b.prototype.Ib = function (a) {
        var c = [];
        "#" == a.substr(0, 1) ? (a = a.substr(1)) : (a = "^" + a + "$");
        a = new RegExp(a, "");
        for (var b = 0; b < this.N.length; b++)
          a.test(this.N[b].id) && c.push(this.N[b]);
        for (b = 0; b < this.I.length; b++)
          a.test(this.I[b].id) && c.push(this.I[b]);
        for (b = 0; b < this.Sa.length; b++)
          a.test(this.Sa[b].id) && c.push(this.Sa[b]);
        return c;
      };
      b.prototype.Yn = function (a) {
        if ("_videopanorama" == a) return this.s.b;
        a = this.Ib(a);
        return 0 < a.length ? a[0].b : null;
      };
      b.prototype.Wl = function (a, c) {
        var b = this;
        c.addEventListener("ended", function (a) {
          b.ba("videoended", { video: a.target });
        });
        c.addEventListener("pause", function (a) {
          b.ba("videopaused", { video: a.target });
        });
        c.addEventListener("play", function (a) {
          b.ba("videostarted", { video: a.target });
        });
        for (var d = 0; d < this.I.length; d++)
          if (this.I[d].id == a) return (this.I[d].b = c), this.I[d];
        d = new m.gk(this);
        d.registerElement(a, c);
        return d;
      };
      b.prototype.Ub = function (a) {
        if (this.Fb) {
          var c = this.ia;
          if (c) return c.isPlaying(a);
        } else {
          if ("_main" === a) return !0;
          a = this.Ib(a);
          if (0 < a.length)
            return a[0].ja ? a[0].Be : !a[0].b.ended && !a[0].b.paused;
        }
        return !1;
      };
      b.prototype.Ae = function (a, c) {
        if (this.Fb) {
          var b = this.ia;
          b && b.playSound(a, c);
        } else
          try {
            b = this.Ib(a);
            for (var d = 0; d < b.length; d++) {
              var e = b[d];
              e.sc = c && !isNaN(Number(c)) ? Number(c) - 1 : e.loop - 1;
              -1 == e.sc && (e.sc = 1e7);
              this.M(e.b);
              this.Ub(a) && this.ni(a);
              e.ja ? e.Yc() : e.b.play();
              this.Gp(e.id);
            }
          } catch (p) {
            this.M(p);
          }
      };
      b.prototype.Rl = function (a, c) {
        a = this.Ib(a);
        for (var b = 0; b < a.length; b++) {
          var d = a[b];
          this.Ub(d.id) ? this.xj(d.id) : this.Ae(d.id, c);
        }
      };
      b.prototype.gp = function (a, c) {
        a = this.Ib(a);
        for (var b = 0; b < a.length; b++) {
          var d = a[b];
          this.Ub(d.id) ? this.ni(d.id) : this.Ae(d.id, c);
        }
      };
      b.prototype.xj = function (a) {
        if (this.Fb) {
          var c = this.ia;
          c && c.pauseSound(a);
        } else
          try {
            if (((c = void 0), "_main" == a)) {
              this.ii(a);
              for (c = 0; c < this.N.length; c++)
                this.N[c].ja ? this.N[c].Ii() : this.N[c].b.pause();
              for (c = 0; c < this.I.length; c++) this.I[c].b.pause();
            } else {
              var b = this.Ib(a);
              for (c = 0; c < b.length; c++) {
                var d = b[c];
                this.ii(d.id);
                d.ja ? d.Ii() : d.b.pause();
              }
            }
          } catch (e) {
            this.M(e);
          }
      };
      b.prototype.Ym = function (a, c) {
        a = this.Ib(a);
        for (var b = 0; b < a.length; b++) {
          var d = a[b];
          0 == c || 1 == c ? d.ng && d.ng(1 == c) : 2 == c && d.re && d.re();
          !d.eb ||
            (-1 == this.Sa.indexOf(d) && -1 == this.I.indexOf(d)) ||
            (this.Hb = this.nd = d);
        }
      };
      b.prototype.ni = function (a) {
        var c;
        if (this.Fb) (c = this.ia) && c.stopSound(a);
        else
          try {
            if ("_main" === a) {
              this.ii(a);
              for (c = 0; c < this.N.length; c++)
                this.N[c].ja
                  ? this.N[c].Se()
                  : (this.N[c].b.pause(), (this.N[c].b.currentTime = 0));
              for (c = 0; c < this.I.length; c++)
                this.I[c].b.pause(), (this.I[c].b.currentTime = 0);
            } else {
              var b = this.Ib(a);
              for (c = 0; c < b.length; c++) {
                var d = b[c];
                this.ii(d.id);
                d.ja
                  ? d.Se()
                  : d.b &&
                    d.b.pause &&
                    (d.b.pause(),
                    (d.b.currentTime = 0),
                    this.ff &&
                      -1 == this.I.indexOf(d) &&
                      (d.Gd(), d.addElement()));
              }
            }
          } catch (e) {
            this.M(e);
          }
      };
      b.prototype.ii = function (a) {
        -1 == this.Qc.indexOf(a) && this.Qc.push(a);
        var c = this.ce.indexOf(a);
        -1 != c && this.ce.splice(c, 1);
        "_main" == a && (this.ce = []);
      };
      b.prototype.Gp = function (a) {
        -1 != this.Qc.indexOf("_main") &&
          -1 == this.ce.indexOf(a) &&
          this.ce.push(a);
        a = this.Qc.indexOf(a);
        -1 != a && this.Qc.splice(a, 1);
      };
      b.prototype.Pp = function (a) {
        a = this.Ib(a);
        return 0 < a.length
          ? ((a = a[0]), a.ja ? a.gn() : a.b ? a.b.currentTime : 0)
          : 0;
      };
      b.prototype.Qp = function (a, c) {
        a = this.Ib(a);
        0 < a.length &&
          ((a = a[0]),
          a.ja
            ? (0 > c && (c = 0),
              c > a.Sf.duration && (c = a.Sf.duration - 0.1),
              a.hn(c))
            : a.b &&
              (0 > c && (c = 0),
              c > a.b.duration && (c = a.b.duration - 0.1),
              (a.b.currentTime = c)));
      };
      b.prototype.Lp = function (a, c) {
        if (this.Fb) {
          var b = this.ia;
          b && b.setVolume(a, c);
        } else
          try {
            b = void 0;
            var d = Number(c);
            1 < d && (d = 1);
            0 > d && (d = 0);
            "_videopanorama" === a && this.s.b && (this.s.b.volume = d);
            if ("_main" === a) {
              this.V = d;
              for (b = 0; b < this.N.length; b++)
                this.N[b].b.volume = this.N[b].level * this.V;
              for (b = 0; b < this.I.length; b++)
                this.I[b].b.volume = this.I[b].level * this.V;
              this.s.b && (this.s.b.volume = this.V);
            } else {
              var e = this.Ib(a);
              this.M(e);
              for (b = 0; b < e.length; b++) {
                var f = e[b];
                f.b && null != f.b.volume && (f.b.volume = d * this.V);
                f.level = d;
              }
            }
          } catch (t) {
            this.M(t);
          }
      };
      b.prototype.qn = function (a, c) {
        if (this.Fb) {
          var b = this.ia;
          b && b.changeVolume(a, c);
        } else
          try {
            var d = (b = void 0);
            "_videopanorama" === a &&
              this.s.b &&
              (this.s.b.volume = this.s.b.volume + Number(c));
            if ("_main" === a) {
              b = this.V;
              b += Number(c);
              1 < b && (b = 1);
              0 > b && (b = 0);
              this.V = b;
              for (d = 0; d < this.N.length; d++)
                this.N[d].b.volume = this.N[d].level * this.V;
              for (d = 0; d < this.I.length; d++)
                this.I[d].b.volume = this.I[d].level * this.V;
              this.s.b && (this.s.b.volume = this.V);
            } else {
              var e = this.Ib(a);
              for (d = 0; d < e.length; d++) {
                var f = e[d];
                b = f.level;
                b += Number(c);
                1 < b && (b = 1);
                0 > b && (b = 0);
                f.level = b;
                f.b && null != f.b.volume && (f.b.volume = b * this.V);
              }
            }
          } catch (t) {
            this.M(t);
          }
      };
      b.prototype.wp = function (a, c) {
        a = this.Ib(a);
        for (var b = 0; b < a.length; b++) {
          var d = a[b];
          0 == c
            ? (d.Bf(!1), (d.fb = !1))
            : 1 == c
            ? (d.Bf(!0), (d.fb = !0))
            : 2 == c &&
              d.b &&
              ("visible" == d.b.style.visibility
                ? (d.Bf(!1), (d.fb = !1))
                : (d.Bf(!0), (d.fb = !0)));
        }
      };
      b.prototype.qm = function () {
        try {
          for (var a = this, c = !1, b = !1, d = 0; d < this.N.length; d++) {
            var e = this.N[d];
            if (
              -1 != e.loop &&
              !this.Ub(e.id) &&
              -1 == this.Qc.indexOf(e.id) &&
              (-1 == this.Qc.indexOf("_main") || -1 != this.ce.indexOf(e.id))
            )
              if (this.sa && this.La.enabled && 4 != e.mode && 6 != e.mode)
                if (this.La.yk) {
                  if (e.ja) e.Yc();
                  else {
                    var f = e.b.play();
                    if (void 0 !== f)
                      f.then(function () {})["catch"](function () {});
                    e.b.currentTime = 0;
                  }
                  e.la = 0;
                  b = !0;
                } else c = !0;
              else if (
                4 != e.mode &&
                6 != e.mode &&
                ("_background" != e.id || !this.Ub(e.id))
              )
                if (e.ja) e.Yc();
                else {
                  f = e.b.play();
                  if (void 0 !== f)
                    f.then(function () {})["catch"](function () {});
                  e.b.currentTime && (e.b.currentTime = 0);
                }
          }
          c &&
            setTimeout(function () {
              a.La.Wp();
            }, 1e3 * this.La.xb);
          b &&
            ((this.La.Sp = this.sa.currentTime),
            (this.La.Rp = setInterval(function () {
              a.La.Cn();
            }, 10)));
        } catch (t) {
          this.M(t);
        }
      };
      b.prototype.Hk = function () {
        for (var a = 0; a < this.La.Yg.length; a++) this.La.Gk(this.La.Yg[a]);
      };
      b.prototype.$l = function () {
        for (var a; 0 < this.P.length; )
          (a = this.P.pop()),
            a.b && (this.Fa.removeChild(a.b.__div), delete a.b),
            (a.b = null);
        this.ba("hotspotsremoved", {});
      };
      b.prototype.Kj = function (a) {
        this.jh = a;
        0 != a
          ? (this.T.style.zIndex = a.toString())
          : (this.T.style.zIndex = "auto");
        this.Ga && this.Ga.Zc && (this.Ga.Zc.zIndex = (a + 4).toString());
        this.Fa.style.zIndex = (a + 4).toString();
        this.ya.style.zIndex = (a + 3).toString();
        this.Aa.style.zIndex = (a + 5).toString();
        for (var c = 0; c < this.I.length + this.Sa.length; c++) {
          var b = c < this.I.length ? this.I[c] : this.Sa[c - this.I.length];
          b.b && (b.b.style.zIndex = (a + (b.eb ? 8e4 : 0)).toString());
        }
      };
      b.prototype.yf = function (a) {
        var c = this.isFullscreen !== a;
        this.isFullscreen !== a && ((this.isFullscreen = a), this.update(100));
        if (this.isFullscreen) {
          if (this.xi)
            try {
              this.T.webkitRequestFullScreen
                ? this.T.webkitRequestFullScreen()
                : this.T.mozRequestFullScreen
                ? this.T.mozRequestFullScreen()
                : this.T.msRequestFullscreen
                ? this.T.msRequestFullscreen()
                : this.T.requestFullScreen
                ? this.T.requestFullScreen()
                : this.T.requestFullscreen && this.T.requestFullscreen();
            } catch (k) {
              this.M(k);
            }
          this.T.style.position = "absolute";
          a = this.qe();
          this.T.style.left =
            window.pageXOffset - a.x + this.margin.left + "px";
          this.T.style.top = window.pageYOffset - a.y + this.margin.top + "px";
          this.Kj(10);
          document.body.style.overflow = "hidden";
          c &&
            (this.ka &&
              this.ka.ggEnterFullscreen &&
              this.ka.ggEnterFullscreen(),
            this.ba("fullscreenenter", {}));
        } else {
          if (this.xi)
            try {
              document.webkitIsFullScreen
                ? document.webkitCancelFullScreen()
                : document.mozFullScreen
                ? document.mozCancelFullScreen()
                : document.msExitFullscreen
                ? document.msExitFullscreen()
                : document.fullScreen &&
                  (document.cancelFullScreen
                    ? document.cancelFullScreen()
                    : document.exitFullscreen && document.exitFullscreen());
            } catch (k) {
              this.M(k);
            }
          this.T.style.position = "relative";
          this.T.style.left = "0px";
          this.T.style.top = "0px";
          this.Kj(0);
          document.body.style.overflow = "";
          c &&
            (this.ka && this.ka.ggExitFullscreen && this.ka.ggExitFullscreen(),
            this.ba("fullscreenexit", {}));
        }
        this.Ke();
      };
      b.prototype.si = function () {
        this.yf(!this.isFullscreen);
      };
      b.prototype.An = function () {
        this.yf(!0);
      };
      b.prototype.exitFullscreen = function () {
        this.yf(!1);
      };
      b.prototype.On = function () {
        return this.isFullscreen;
      };
      b.prototype.Up = function (a, c, b) {
        this.l.Md = this.l.ph;
        this.l.Jf = this.l.fh;
        this.l.enabled = !0;
        this.l.Oe = this.l.enabled;
        this.l.active = !0;
        this.l.kd = 0;
        var d = new Date();
        this.l.Cd = 0;
        this.l.startTime = d.getTime();
        a && 0 != a && (this.l.speed = a);
        c && (this.l.timeout = c);
        b && (this.l.ri = b);
        this.ba("autorotatechanged", {});
      };
      b.prototype.Xp = function () {
        this.l.active = !1;
        this.l.enabled = !1;
        this.l.Oe = this.l.enabled;
        this.Me = this.l.Th = !1;
        this.u.active &&
          this.u.Ig &&
          ((this.u.active = !1), (this.u.Ig = !1), (this.u.Eb = 0));
        this.ba("autorotatechanged", {});
      };
      b.prototype.aq = function () {
        this.l.enabled = !this.l.active;
        this.l.Oe = this.l.enabled;
        this.l.active = this.l.enabled;
        this.l.kd = 0;
        if (this.l.enabled) {
          var a = new Date();
          this.l.Cd = 0;
          this.l.startTime = a.getTime();
          this.l.Md = this.l.ph;
          this.l.Jf = this.l.fh;
        }
        this.ba("autorotatechanged", {});
      };
      b.prototype.Tp = function (a) {
        this.qb.od && this.fm();
        this.Mb = "";
        a && "" != a && (this.l.Md = a);
        this.l.Oe = this.l.enabled;
        this.l.Jf = !0;
        this.l.enabled = !0;
        this.l.active = !0;
        this.l.kd = 0;
        a = new Date();
        this.l.Cd = 0;
        this.l.startTime = a.getTime();
        this.ba("autorotatechanged", {});
      };
      b.prototype.fm = function () {
        this.qb.od = !1;
        this.qb.$i = !0;
        this.l.active = this.B.fe;
        this.za.splice(this.za.indexOf(this.w), 1);
        0 < this.za.length && (this.w = this.za[0]);
        this.Mb = "";
        this.Pg(this.B.Sh);
        this.Qg(this.B.zi);
        this.Og(this.B.Kh);
        this.B.fe = !1;
        this.hf = new Date().getTime();
      };
      b.prototype.xk = function (a) {
        if ((this.Od = document.getElementById(a))) {
          this.Od.innerHTML = "";
          this.T = document.createElement("div");
          this.T.onselectstart = function () {
            return !1;
          };
          W && this.T.setAttribute("id", "viewport");
          a =
            "top:\t0px;left: 0px;position:relative;-ms-touch-action: none;touch-action: none;text-align: left;" +
            (this.Ia + "user-select: none;");
          this.T.setAttribute("style", a);
          this.Od.appendChild(this.T);
          this.D = document.createElement("div");
          a =
            "top:\t0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;-ms-touch-action: none;touch-action: none;" +
            (this.Ia + "user-select: none;");
          W && this.D.setAttribute("id", "viewer");
          this.D.setAttribute("style", a);
          this.T.appendChild(this.D);
          if (this.Fb) {
            var c = document.createElement("div");
            a =
              "top:\t0px;left: 0px;width:  100%;height: 100%;overflow: hidden;position:absolute;-ms-touch-action: none;touch-action: none;" +
              (this.Ia + "user-select: none;");
            c.setAttribute("id", this.bj);
            c.setAttribute("style", a);
            this.D.appendChild(c);
          }
          this.Ga &&
            ((this.Ga.Zc = document.createElement("canvas")),
            W && this.Ga.Zc.setAttribute("id", "lensflarecanvas"),
            (a =
              "top:\t0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;" +
              (this.Ia + "user-select: none;")),
            (a += this.Ia + "pointer-events: none;"),
            this.Ga.Zc.setAttribute("style", a),
            this.T.appendChild(this.Ga.Zc));
          this.Fa = document.createElement("div");
          W && this.Fa.setAttribute("id", "hotspots");
          a =
            "top:\t0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;";
          this.mj &&
            (a +=
              "background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);");
          this.Kc &&
            !this.Y &&
            (a += this.Ia + "transform: translateZ(9999999px);");
          a += this.Ia + "user-select: none;";
          this.Fa.setAttribute("style", a);
          this.T.appendChild(this.Fa);
          this.ya = document.createElement("canvas");
          W && this.ya.setAttribute("id", "hotspotcanvas");
          a =
            "top:\t0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;" +
            (this.Ia + "user-select: none;");
          a += this.Ia + "pointer-events: none;";
          this.ya.setAttribute("style", a);
          this.T.appendChild(this.ya);
          this.Aa = document.createElement("div");
          W && this.Aa.setAttribute("id", "hotspottext");
          this.Aa.setAttribute(
            "style",
            "top:\t0px;left: 0px;position:absolute;padding: 3px;visibility: hidden;"
          );
          this.Aa.innerHTML = " Hotspot text!";
          this.T.appendChild(this.Aa);
          this.divSkin = this.ka = this.Fa;
          this.Kj(0);
        } else alert("container not found!");
      };
      b.prototype.zk = function (a) {
        this.Da = !0;
        return function () {
          a.Pa &&
            (a.h && a.h.complete
              ? ((a.loaded = !0),
                a.Pa.drawImage(a.h, 0, 0, a.width, a.height),
                (a.h = null),
                (a.Fd = null))
              : a.Fd &&
                a.Fd.complete &&
                !a.loaded &&
                (a.Pa.drawImage(a.Fd, 0, 0, a.width, a.height), (a.Fd = null)));
        };
      };
      b.prototype.wk = function (a) {
        var c,
          b = 128;
        this.h.rf &&
          (this.D.style.backgroundColor = this.h.rf.replace("0x", "#"));
        a ? ((b = this.Vf), (this.Ff = 1)) : this.qc > b && (b = this.qc);
        for (c = 0; 6 > c; c++) {
          var d = this.ob.cb[c];
          a
            ? ((d.width = this.Vf), (d.height = this.Vf))
            : ((d.K = document.createElement("canvas")),
              (d.K.width = this.qc),
              (d.K.height = this.qc),
              (d.width = this.qc),
              (d.height = this.qc),
              (d.Pa = d.K.getContext("2d")));
          var e = "position:absolute;";
          e += "left: 0px;";
          e += "top: 0px;";
          e += "width: " + b + "px;";
          e += "height: " + b + "px;";
          a && (e += "outline: 1px solid transparent;");
          e += this.Ia + "transform-origin: 0% 0%;";
          e += "-webkit-user-select: none;";
          e += this.Ia + "transform: ";
          var f = "";
          var h = 1;
          this.tf && (h = 100);
          f =
            4 > c
              ? f + ("rotateY(" + -90 * c + "deg)")
              : f + ("rotateX(" + (4 == c ? -90 : 90) + "deg)");
          this.tf && (f += " scale(" + h + ")");
          f +=
            " translate3d(" +
            -b / 2 +
            "px," +
            -b / 2 +
            "px," +
            (-b * h) / (2 * this.Ff) +
            "px)";
          e += f + ";";
          d.fl = f;
          a ||
            (d.K.setAttribute("style", e),
            this.D.insertBefore(d.K, this.D.firstChild));
        }
        if (!a) {
          for (c = 0; 6 > c; c++)
            (d = this.ob.cb[c]),
              "" != this.We[c] &&
                ((d.Fd = new Image()),
                (d.Fd.crossOrigin = this.crossOrigin),
                (d.Fd.onload = this.zk(d)),
                d.Fd.setAttribute("src", this.kc(this.We[c])),
                this.Sb.push(d.Fd));
          for (c = 0; 6 > c; c++)
            (d = this.ob.cb[c]),
              (d.loaded = !1),
              (d.h = new Image()),
              (d.h.crossOrigin = this.crossOrigin),
              (d.h.onload = this.zk(d)),
              d.h.setAttribute("src", this.kc(this.sh[c])),
              this.Sb.push(d.h);
        }
      };
      b.prototype.di = function () {
        var a;
        this.Ba.da.x = 0;
        this.Ba.da.y = 0;
        if (this.Tc) {
          for (a = 0; a < this.ob.cb.length; a++)
            this.ob.cb[a].K &&
              this.ob.cb[a].K.setAttribute &&
              (this.ob.cb[a].K.setAttribute("src", this.Dk),
              this.D.removeChild(this.ob.cb[a].K));
          if (this.h.J) {
            for (a = 0; a < this.h.J.length; a++) {
              var c = this.h.J[a];
              for (d in c.U)
                if (c.U.hasOwnProperty(d)) {
                  var b = c.U[d];
                  b.visible = !1;
                  b.K &&
                    (b.Pa &&
                      b.Pa.clearRect(
                        0,
                        0,
                        b.Pa.canvas.width,
                        b.Pa.canvas.height
                      ),
                    this.ti.push(b.K));
                  b.h && delete b.h;
                  b.gb && (this.H.deleteTexture(b.gb), this.gd--);
                  b.Pa = null;
                  b.K = null;
                  b.h = null;
                }
              delete c.U;
            }
            delete this.h.J;
            this.h.J = null;
          }
        }
        this.na.di();
        var d = [];
        for (a = 0; a < this.I.length; a++)
          (c = this.I[a]), c.md ? d.push(c) : c.Gd();
        for (a = 0; a < this.Sa.length; a++) this.Sa[a].Gd();
        this.A.xg = -1;
        this.ya.style.visibility = "hidden";
        this.ib = 0;
        this.Ee = [];
        this.La.Yg = [];
        for (a = 0; a < this.N.length; a++)
          (c = this.N[a]), 0 == c.mode || c.Ml || this.Ee.push(c);
        this.I = d;
        this.Sa = [];
        this.s.b &&
          (this.T.removeChild(this.s.b),
          (this.s.b = null),
          (a = this.Ib("_videopanorama")),
          0 < a.length && (a[0].b = null));
        this.s.jd = !1;
        this.s.Jh = !1;
      };
      b.prototype.bl = function () {
        var a = 1,
          b = -1 != navigator.userAgent.indexOf("Mac");
        window.devicePixelRatio && b && (a = window.devicePixelRatio);
        return { ih: screen.width * a, qg: screen.height * a };
      };
      b.prototype.Wk = function () {
        var a = this.bl();
        return a.ih > a.qg ? a.ih : a.qg;
      };
      b.prototype.Bj = function (a, b) {
        var c = new DOMParser().parseFromString(a, "text/xml");
        this.Ti = a;
        this.Vl(c, b);
        this.ia &&
          (this.M("Apply to Flash player"),
          this.ia.readConfigString(this.Ti),
          this.ia.setLocked(!0),
          this.ia.setSlaveMode(!0));
      };
      b.prototype.Ul = function (a, b, d) {
        try {
          var c = void 0;
          c = new XMLHttpRequest();
          c.open("GET", a, !1);
          c.send(null);
          if (c.responseXML) {
            var e = a.lastIndexOf("/");
            0 <= e && (this.Nd = a.substr(0, e + 1));
            2 <= arguments.length && null != b && (this.Nd = b);
            this.Bj(c.responseText, d);
          } else alert("Error loading panorama XML");
        } catch (p) {
          alert("Error:" + p);
        }
      };
      b.prototype.ip = function (a, b, d, f) {
        var c = new XMLHttpRequest();
        var k = this;
        c.onload = function (e) {
          if (4 <= c.readyState)
            if (c.responseXML) {
              var g = a.lastIndexOf("/");
              0 <= g && (k.Nd = a.substr(0, g + 1));
              3 <= arguments.length && null != d && (k.Nd = d);
              k.Bj(c.responseText, f);
              b && b();
            } else alert("Error loading panorama XML");
          else console.error("Wrong state loading XML:" + c.statusText);
        };
        c.onerror = function () {
          console.error("Error loading XML:" + c.statusText);
        };
        c.open("GET", a, !0);
        c.send(null);
      };
      b.prototype.Ji = function (a) {
        var b = "";
        "{" == a.charAt(0) && (b = a.substr(1, a.length - 2));
        (a = this.Pd[b]) && (b = a);
        a = { oldNodeId: this.Wa, nodeId: b };
        this.ba("beforechangenodeid", a);
        "" != this.Wa &&
          -1 == this.ak.indexOf(this.Wa) &&
          this.ak.push(this.Wa);
        this.Cl = this.Wa;
        this.Wa = b;
        this.M("change active node: " + b);
        this.aa &&
          this.aa.changeActiveNode &&
          this.aa.changeActiveNode("{" + b + "}");
        this.ba("changenodeid", a);
      };
      b.prototype.Tk = function () {
        return this.Wa;
      };
      b.prototype.Xk = function () {
        if (0 < this.Ma.length) {
          var a = this.Ma.indexOf(this.Wa);
          a++;
          a >= this.Ma.length && (a = 0);
          return this.Ma[a];
        }
        return "";
      };
      b.prototype.mo = function () {
        if (0 < this.Ma.length) {
          var a = this.Ma.indexOf(this.Wa);
          a--;
          0 > a && (a = this.Ma.length - 1);
          return this.Ma[a];
        }
        return "";
      };
      b.prototype.Tn = function () {
        return this.Cl;
      };
      b.prototype.Ro = function (a) {
        return -1 != this.ak.indexOf(a);
      };
      b.prototype.Vl = function (a, b) {
        var c = a.firstChild;
        this.Ie = [];
        this.Ma = [];
        this.Pd = [];
        for (a = c.firstChild; a; ) {
          if ("map" == a.nodeName) {
            var d = {},
              e = a.getAttributeNode("title");
            e && (d.title = e.nodeValue.toString());
            e = a.getAttributeNode("type");
            d.type = e.nodeValue.toString();
            "web" == d.type
              ? ((e = a.getAttributeNode("mapprovider")),
                (d.mapprovider = e.nodeValue.toString()),
                (e = a.getAttributeNode("mapstyle")) &&
                  (d.mapstyle = e.nodeValue.toString()),
                (e = a.getAttributeNode("googlecustomstylecode")) &&
                  (d.googlecustomstylecode = e.nodeValue.toString()),
                (e = a.getAttributeNode("mapurltemplate")) &&
                  (d.mapurltemplate = e.nodeValue.toString()),
                (e = a.getAttributeNode("mapmaxzoom")) &&
                  (d.mapmaxzoom = Number(e.nodeValue)),
                (e = a.getAttributeNode("mapkey")) &&
                  (d.mapkey = e.nodeValue.toString()),
                (e = a.getAttributeNode("styleurl")) &&
                  (d.styleurl = e.nodeValue.toString()))
              : ((e = a.getAttributeNode("width")),
                (d.width = Number(e.nodeValue)),
                (e = a.getAttributeNode("height")),
                (d.height = Number(e.nodeValue)),
                (e = a.getAttributeNode("zoomlevels")),
                (d.zoomlevels = Number(e.nodeValue)),
                (e = a.getAttributeNode("tileformat")),
                (d.tileformat = e.nodeValue.toString()),
                (e = a.getAttributeNode("bgcolor")),
                (d.bgcolor = e.nodeValue.toString()),
                (e = a.getAttributeNode("transparent")),
                (d.transparent = 1 == e.nodeValue),
                (e = a.getAttributeNode("floorplannorth")),
                (d.floorplannorth = Number(e.nodeValue)));
            e = a.getAttributeNode("id");
            this.Rh[e.nodeValue.toString()] = d;
          }
          a = a.nextSibling;
        }
        if ("tour" == c.nodeName) {
          this.gf = !0;
          a = "";
          (e = c.getAttributeNode("start")) && (a = e.nodeValue.toString());
          this.hasOwnProperty("startNode") &&
            this.startNode &&
            ((a = String(this.startNode)), (this.startNode = ""));
          this.hasOwnProperty("startView") &&
            this.startView &&
            ("object" === typeof this.startView && null !== this.startView
              ? (b = this.startView)
              : "" != this.startView && (b = String(this.startView)),
            (this.startView = ""));
          d = c.firstChild;
          var f = "";
          for (c = ""; d; ) {
            if ("panorama" == d.nodeName) {
              if ((e = d.getAttributeNode("id")))
                (f = e.nodeValue.toString()),
                  "" == a && (a = f),
                  "" == c && (c = f),
                  (this.Ie[f] = d),
                  this.Ma.push(f);
              for (e = d.firstChild; e; ) {
                if ("userdata" == e.nodeName) {
                  var h = this.cg(e);
                  this.gh[f] = h;
                  f == a && (this.gh._first = h);
                  h.customnodeid && (this.Pd[h.customnodeid] = f);
                  this.Ac[f] = this.Ek(e);
                  this.lf[f] = this.Fk(e);
                }
                e = e.nextSibling;
              }
            }
            if ("masternode" == d.nodeName)
              for (e = d.firstChild; e; )
                "userdata" == e.nodeName &&
                  ((h = this.cg(e)), (this.gh._master = h)),
                  (e = e.nextSibling);
            d = d.nextSibling;
          }
          this.Ie.hasOwnProperty(a) || ((e = this.Pd[a]) && (a = e));
          this.Ie.hasOwnProperty(a) ||
            (this.Mc("Start node " + a + " not found!"), (a = c));
          this.Aj(this.Ie[a], b);
          this.Ji("{" + a + "}");
          this.Wa = a;
        } else (this.gf = !1), this.Aj(c, b), this.Ji(""), this.Ma.push("");
        this.ba("configloaded", {});
      };
      b.prototype.Aj = function (a, b) {
        var c = this;
        this.$l();
        this.Ga && this.Ga.kp();
        this.wf(this.pb);
        this.di();
        this.yg = 0;
        for (var d = a.firstChild, e, f, h = 0; d; ) {
          if ("view" == d.nodeName) {
            if ((e = d.getAttributeNode("fovmode")))
              this.f.mode = Number(e.nodeValue);
            e = d.getAttributeNode("pannorth");
            this.pan.vj = 1 * (e ? e.nodeValue : 0);
            for (var g = d.firstChild; g; ) {
              "start" == g.nodeName &&
                ((e = g.getAttributeNode("pan")),
                (this.pan.c = Number(e ? e.nodeValue : 0)),
                (this.pan.Qa = this.pan.c),
                (e = g.getAttributeNode("tilt")),
                (this.i.c = Number(e ? e.nodeValue : 0)),
                (this.i.Qa = this.i.c),
                (e = g.getAttributeNode("roll")),
                (this.O.c = Number(e ? e.nodeValue : 0)),
                (this.O.Qa = this.O.c),
                (e = g.getAttributeNode("fov")),
                (this.f.c = Number(e ? e.nodeValue : 70)),
                (this.f.Qa = this.f.c),
                (e = g.getAttributeNode("projection")),
                (this.Zh = Number(e ? e.nodeValue : 4)),
                this.Oc(this.Zh));
              "min" == g.nodeName &&
                ((e = g.getAttributeNode("pan")),
                (this.pan.min = 1 * (e ? e.nodeValue : 0)),
                (e = g.getAttributeNode("tilt")),
                (this.i.min = 1 * (e ? e.nodeValue : -90)),
                (e = g.getAttributeNode("fov")),
                (this.f.min = 1 * (e ? e.nodeValue : 5)),
                1e-20 > this.f.min && (this.f.min = 1e-20),
                (e = g.getAttributeNode("fovpixel")),
                (this.f.Hg = 1 * (e ? e.nodeValue : 0)));
              if ("max" == g.nodeName) {
                e = g.getAttributeNode("pan");
                this.pan.max = 1 * (e ? e.nodeValue : 0);
                e = g.getAttributeNode("tilt");
                this.i.max = 1 * (e ? e.nodeValue : 90);
                e = g.getAttributeNode("fov");
                this.f.max = 1 * (e ? e.nodeValue : 120);
                180 <= this.f.max && (this.f.max = 179.9);
                if ((e = g.getAttributeNode("fovstereographic")))
                  this.f.tj = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("fovfisheye")))
                  this.f.sj = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("scaletofit")))
                  this.C.em = 1 == e.nodeValue;
              }
              if ("flyin" == g.nodeName) {
                if ((e = g.getAttributeNode("projection")))
                  this.tc.Eb = Number(e.nodeValue);
                if ((e = g.getAttributeNode("pan")))
                  this.tc.pan = parseFloat(e.nodeValue);
                if ((e = g.getAttributeNode("tilt")))
                  this.tc.i = parseFloat(e.nodeValue);
                if ((e = g.getAttributeNode("fov")))
                  this.tc.f = parseFloat(e.nodeValue);
              }
              g = g.nextSibling;
            }
          }
          if ("autorotate" == d.nodeName) {
            if ((e = d.getAttributeNode("speed")))
              this.l.speed = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("delay")))
              this.l.timeout = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("returntohorizon")))
              this.l.ri = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("nodedelay")))
              this.l.Xh = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("noderandom")))
              this.l.uj = 1 == e.nodeValue;
            this.Rd &&
              ((this.l.enabled = !0), (this.l.Oe = !0), (this.l.active = !1));
            this.l.Cd = 0;
            if ((e = d.getAttributeNode("startloaded")))
              (this.l.Vg = 1 == e.nodeValue), this.l.Vg && (this.l.active = !1);
            if ((e = d.getAttributeNode("useanimation")))
              (this.l.fh = 1 == e.nodeValue), (this.l.Jf = this.l.fh);
            if ((e = d.getAttributeNode("syncanimationwithvideo")))
              this.l.Rj = 1 == e.nodeValue;
          }
          if ("animation" == d.nodeName) {
            if ((e = d.getAttributeNode("syncanimationwithvideo")))
              this.l.Rj = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("useinautorotation")))
              this.l.fh = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("animsequence")))
              (this.l.ph = e.nodeValue), this.Rd && (this.l.Md = this.l.ph);
            this.za = [];
            for (g = d.firstChild; g; ) {
              if ("clip" == g.nodeName) {
                this.w = new m.ck();
                if ((e = g.getAttributeNode("animtitle")))
                  this.w.Ne = e.nodeValue.toString();
                if ((e = g.getAttributeNode("cliptitle")))
                  this.w.bb = e.nodeValue.toString();
                if ((e = g.getAttributeNode("nodeid")))
                  this.w.Cq = e.nodeValue.toString();
                if ((e = g.getAttributeNode("length")))
                  this.w.length = Number(e.nodeValue);
                if ((e = g.getAttributeNode("animtype")))
                  this.w.an = Number(e.nodeValue);
                if ((e = g.getAttributeNode("nextcliptitle")))
                  this.w.Kl = e.nodeValue.toString();
                if ((e = g.getAttributeNode("nextclipnodeid")))
                  this.w.Wh = e.nodeValue.toString();
                if ((e = g.getAttributeNode("nextclipstartview")))
                  this.w.Qo = e.nodeValue.toString();
                if ((e = g.getAttributeNode("transitiontype")))
                  this.w.hq = Number(e.nodeValue);
                var q = g.firstChild;
                for (this.w.W = []; q; ) {
                  if ("keyframe" == q.nodeName) {
                    var n = new m.Fc();
                    if ((e = q.getAttributeNode("time")))
                      n.time = Number(e.nodeValue);
                    if ((e = q.getAttributeNode("value")))
                      n.value = Number(e.nodeValue);
                    if ((e = q.getAttributeNode("valuestring")))
                      n.Zj = e.nodeValue.toString();
                    if ((e = q.getAttributeNode("transitiontime")))
                      n.xb = Number(e.nodeValue);
                    e = q.getAttributeNode("type");
                    var y = 0;
                    e &&
                      ((n.type = Number(e.nodeValue)),
                      (y = Number(e.nodeValue)));
                    if ((e = q.getAttributeNode("property")))
                      n.ub = Number(e.nodeValue);
                    if ((e = q.getAttributeNode("additionaltrackid")))
                      n.nh = e.nodeValue.toString();
                    if (1 == y || 2 == y) {
                      if ((e = q.getAttributeNode("bezierintime")))
                        n.ge = Number(e.nodeValue);
                      if ((e = q.getAttributeNode("bezierinvalue")))
                        n.Wc = Number(e.nodeValue);
                      if ((e = q.getAttributeNode("bezierouttime")))
                        n.he = Number(e.nodeValue);
                      if ((e = q.getAttributeNode("bezieroutvalue")))
                        n.ie = Number(e.nodeValue);
                    }
                    this.w.W.push(n);
                  }
                  q = q.nextSibling;
                }
                this.za.push(this.w);
              }
              g = g.nextSibling;
            }
          }
          "input" == d.nodeName && (f || (f = d));
          if (f)
            for (q = 0; 6 > q; q++)
              (e = f.getAttributeNode("prev" + q + "url")),
                (this.We[q] = e ? String(e.nodeValue) : "");
          "altinput" == d.nodeName &&
            ((g = 0),
            (e = d.getAttributeNode("screensize")) && (g = 1 * e.nodeValue),
            0 < g && g <= this.Wk() && g > h && ((h = g), (f = d)));
          if ("control" == d.nodeName && this.Rd) {
            if ((e = d.getAttributeNode("simulatemass")))
              this.Ba.enabled = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("rubberband")))
              this.C.dm = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("locked")))
              this.C.Ab = 1 == e.nodeValue;
            e && (this.C.ue = 1 == e.nodeValue);
            if ((e = d.getAttributeNode("lockedmouse")))
              this.C.Ab = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("lockedkeyboard")))
              this.C.ue = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("lockedkeyboardzoom")))
              this.C.Go = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("lockedwheel")))
              this.C.ld = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("invertwheel")))
              this.C.pl = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("speedwheel")))
              this.C.mm = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("invertcontrol")))
              this.C.Ad = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("sensitivity")))
              (this.C.sensitivity = 1 * e.nodeValue),
                1 > this.C.sensitivity && (this.C.sensitivity = 1);
            if ((e = d.getAttributeNode("dblclickfullscreen")))
              this.C.Vi = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("contextfullscreen")))
              this.C.$f = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("contextprojections")))
              this.C.qh = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("hideabout")))
              this.C.df = 1 == e.nodeValue;
            for (g = d.firstChild; g; )
              "menulink" == g.nodeName &&
                ((q = { text: "", url: "" }),
                (e = g.getAttributeNode("text")),
                (q.text = e.nodeValue),
                (e = g.getAttributeNode("url")),
                (q.url = e.nodeValue),
                this.Gg.push(q)),
                (g = g.nextSibling);
          }
          if ("transition" == d.nodeName && this.Rd) {
            if ((e = d.getAttributeNode("enabled")))
              this.B.enabled = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("blendtime")))
              this.B.Uf = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("blendcolor")))
              this.B.Qe = e.nodeValue.toString();
            if ((e = d.getAttributeNode("type")))
              this.B.type = e.nodeValue.toString();
            if ((e = d.getAttributeNode("softedge")))
              this.B.Cc = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("zoomin"))) this.B.Oa = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("zoomout")))
              this.B.bc = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("zoomfov")))
              this.B.Nf = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("zoomspeed")))
              this.B.de = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("zoomoutpause")))
              this.B.Of = 1 == e.nodeValue;
            "cut" == this.B.type && (this.B.Uf = 0);
          }
          if ("soundstransition" == d.nodeName) {
            if ((e = d.getAttributeNode("enabled")))
              this.La.enabled = 1 == e.nodeValue;
            if ((e = d.getAttributeNode("transitiontime")))
              this.La.xb = 1 * e.nodeValue;
            if ((e = d.getAttributeNode("crossfade")))
              this.La.yk = 1 == e.nodeValue;
          }
          if ("flyintransition" == d.nodeName) {
            if ((e = d.getAttributeNode("enabled")))
              this.qb.enabled = 1 == e.nodeValue && this.Y;
            if ((e = d.getAttributeNode("speed")))
              this.qb.speed = 1 * e.nodeValue;
          }
          "userdata" == d.nodeName &&
            ((this.userdata = this.Kf = this.cg(d)),
            this.Ac[a.id] ||
              ((this.Ac[a.id] = this.Ek(d)), (this.lf[a.id] = this.Fk(d))));
          if ("hotspots" == d.nodeName)
            for (g = d.firstChild; g; ) {
              if ("label" == g.nodeName && this.Rd) {
                q = this.A.Tj;
                if ((e = g.getAttributeNode("enabled")))
                  q.enabled = 1 == e.nodeValue;
                if ((e = g.getAttributeNode("width")))
                  q.width = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("height")))
                  q.height = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("textcolor")))
                  q.Uj = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("textalpha")))
                  q.Sj = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("background")))
                  q.background = 1 == e.nodeValue;
                if ((e = g.getAttributeNode("backgroundalpha")))
                  q.dc = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("backgroundcolor")))
                  q.ec = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("border"))) q.Hi = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("bordercolor")))
                  q.hc = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("borderalpha")))
                  q.gc = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("borderradius")))
                  q.Gi = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("wordwrap")))
                  q.Ai = 1 == e.nodeValue;
              }
              if ("polystyle" == g.nodeName && this.Rd) {
                if ((e = g.getAttributeNode("mode")))
                  this.A.mode = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("bordercolor")))
                  this.A.hc = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("backgroundcolor")))
                  this.A.ec = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("borderalpha")))
                  this.A.gc = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("backgroundalpha")))
                  this.A.dc = 1 * e.nodeValue;
                if ((e = g.getAttributeNode("handcursor")))
                  this.A.bf = 1 == e.nodeValue;
              }
              e = void 0;
              "hotspot" == g.nodeName &&
                ((e = new m.mh(this)),
                (e.type = "point"),
                e.Ob(g),
                this.P.push(e));
              "polyhotspot" == g.nodeName &&
                ((e = new m.mh(this)),
                (e.type = "poly"),
                e.Ob(g),
                this.P.push(e));
              g = g.nextSibling;
            }
          if ("sounds" == d.nodeName || "media" == d.nodeName)
            for (g = d.firstChild; g; ) {
              if ("sound" == g.nodeName && !this.Ll)
                for (
                  e = new m.Vm(this), e.Ob(g), this.Fb || e.addElement(), q = 0;
                  q < this.Ee.length;
                  q++
                )
                  e.id == this.Ee[q].id && (this.Ee.splice(q, 1), q--);
              "video" == g.nodeName &&
                ((e = new m.gk(this)), e.Ob(g), this.Fb || e.addElement());
              "image" == g.nodeName &&
                ((e = new m.Tm(this)), e.Ob(g), this.Fb || e.addElement());
              "lensflare" == g.nodeName &&
                this.Ga &&
                ((e = new m.Um(this)), e.Ob(g), this.Ga.Dg.push(e));
              g = g.nextSibling;
            }
          d = d.nextSibling;
        }
        for (q = 0; q < this.Ee.length; q++) {
          a = this.Ee[q];
          if (this.sa && this.La.enabled && this.Ub(a.id)) this.La.Yg.push(a);
          else {
            try {
              a.ja ? a.Se() : a.b.pause();
            } catch (v) {
              this.M(v);
            }
            a.Gd();
          }
          this.N.splice(this.N.indexOf(a), 1);
        }
        1 != this.B.Oa && 2 != this.B.Oa && this.Hk();
        this.hb.fi = !0;
        b &&
          ("object" === typeof b && null !== b
            ? (b.hasOwnProperty("pan") && this.zf(Number(b.pan)),
              b.hasOwnProperty("tilt") && this.Af(Number(b.tilt)),
              b.hasOwnProperty("fov") && this.xf(Number(b.fov)),
              b.hasOwnProperty("projection") && this.Oc(Number(b.projection)))
            : "" != b &&
              ((b = b.toString().split("/")),
              4 < b.length && this.Oc(Number(b[4])),
              0 < b.length &&
                ((e = String(b[0])),
                "N" == e.charAt(0)
                  ? this.Ij(Number(e.substr(1)))
                  : "S" == e.charAt(0)
                  ? this.Ij(-180 + Number(e.substr(1)))
                  : this.zf(Number(e))),
              1 < b.length && this.Af(Number(b[1])),
              2 < b.length && this.xf(Number(b[2]))));
        if (f) {
          for (q = 0; 6 > q; q++)
            (e = f.getAttributeNode("tile" + q + "url")) &&
              (this.sh[q] = String(e.nodeValue)),
              (e = f.getAttributeNode("tile" + q + "url1"));
          for (q = 0; 6 > q; q++)
            (e = f.getAttributeNode("prev" + q + "url")) &&
              (this.We[q] = String(e.nodeValue));
          if ((e = f.getAttributeNode("tilesize"))) this.qc = 1 * e.nodeValue;
          if ((e = f.getAttributeNode("canvassize")))
            this.Vf = Number(e.nodeValue);
          if ((e = f.getAttributeNode("tilescale"))) this.Ff = 1 * e.nodeValue;
          if ((e = f.getAttributeNode("leveltileurl"))) this.h.Hl = e.nodeValue;
          if ((e = f.getAttributeNode("leveltilesize")))
            this.h.G = Number(e.nodeValue);
          if ((e = f.getAttributeNode("levelbias")))
            this.h.Fl = Number(e.nodeValue);
          if ((e = f.getAttributeNode("levelbiashidpi")))
            this.h.Gl = Number(e.nodeValue);
          e = f.getAttributeNode("overlap");
          this.$a.O = 0;
          this.$a.pitch = 0;
          e && (this.h.Ja = Number(e.nodeValue));
          if ((e = f.getAttributeNode("levelingroll")))
            this.$a.O = Number(e.nodeValue);
          if ((e = f.getAttributeNode("levelingpitch")))
            this.$a.pitch = Number(e.nodeValue);
          this.ib = 0;
          (e = f.getAttributeNode("flat")) && 1 == e.nodeValue && (this.ib = 2);
          e = f.getAttributeNode("width");
          this.h.width = 1 * (e ? e.nodeValue : 1);
          e = f.getAttributeNode("height");
          this.h.height = 1 * (e ? e.nodeValue : this.h.width);
          this.s.src = [];
          this.h.J = [];
          for (g = f.firstChild; g; ) {
            if ("preview" == g.nodeName) {
              if ((e = g.getAttributeNode("color"))) this.h.rf = e.nodeValue;
              if ((e = g.getAttributeNode("strip")))
                this.h.Sl = 1 == e.nodeValue;
            }
            if ("video" == g.nodeName) {
              if ((e = g.getAttributeNode("format")))
                "3x2" == e.nodeValue && (this.s.format = 14),
                  "equirectangular" == e.nodeValue && (this.s.format = 1);
              if ((e = g.getAttributeNode("flipy")))
                this.s.cj = Number(e.nodeValue);
              if ((e = g.getAttributeNode("startonload")))
                this.s.Oj = 1 == e.nodeValue;
              if ((e = g.getAttributeNode("startmutedmobile")))
                this.s.om = 1 == e.nodeValue;
              if ((e = g.getAttributeNode("bleed")))
                this.s.Pe = Number(e.nodeValue);
              if ((e = g.getAttributeNode("endaction")))
                this.s.me = String(e.nodeValue);
              if ((e = g.getAttributeNode("width")))
                this.s.width = Number(e.nodeValue);
              if ((e = g.getAttributeNode("height")))
                this.s.height = Number(e.nodeValue);
              for (q = g.firstChild; q; )
                "source" == q.nodeName &&
                  (e = q.getAttributeNode("url")) &&
                  this.s.src.push(e.nodeValue.toString()),
                  (q = q.nextSibling);
            }
            if ("level" == g.nodeName) {
              f = new m.fk();
              e = g.getAttributeNode("width");
              f.width = 1 * (e ? e.nodeValue : 1);
              e = g.getAttributeNode("height");
              f.height = 1 * (e ? e.nodeValue : f.width);
              if ((e = g.getAttributeNode("preload")))
                f.cache = 1 == e.nodeValue;
              if ((e = g.getAttributeNode("preview"))) f.qf = 1 == e.nodeValue;
              f.L = Math.floor((f.width + this.h.G - 1) / this.h.G);
              f.fa = Math.floor((f.height + this.h.G - 1) / this.h.G);
              this.h.J.push(f);
            }
            g = g.nextSibling;
          }
          this.h.oj = this.h.J.length;
        }
        this.cf = !0;
        this.ah &&
          ((this.Y = this.Tc = !1),
          this.ic ||
            (this.M("dummy rendering"),
            (this.ic = document.createElement("canvas")),
            (this.ic.width = 100),
            (this.ic.height = 100),
            (this.ic.id = "dummycanvas"),
            this.D.appendChild(this.ic)),
          this.Sc());
        this.Y && this.H && (this.na.nl(this.Ff), this.na.ol());
        this.Tc &&
          (0 < this.h.J.length ? this.wk(!0) : this.wk(!1), (this.yg = 0));
        var r = this;
        0 < this.h.J.length &&
          this.h.Sl &&
          0 == this.ib &&
          ((b = new Image()),
          (f = new m.fk()),
          (f.qf = !0),
          (f.cache = !0),
          (f.L = f.fa = 0),
          (f.height = f.width = 0),
          this.h.J.push(f),
          (b.crossOrigin = this.crossOrigin),
          (b.onload = this.na.Po(b)),
          b.setAttribute("src", this.He(6, this.h.oj - 1, 0, 0)));
        if (0 < this.s.src.length && this.Y)
          if (this.dh) {
            this.s.b = document.createElement("video");
            this.s.b.crossOrigin = this.crossOrigin;
            this.s.b.setAttribute("style", "display:none; max-width:none;");
            this.s.b.setAttribute("playsinline", "playsinline");
            this.s.b.preload = !0;
            this.s.b.volume = this.V;
            this.T.appendChild(this.s.b);
            this.s.jd = !1;
            this.s.rm = !1;
            this.s.b.oncanplay = function () {
              if (!r.s.jd) {
                r.s.Jh = !0;
                var a,
                  b,
                  c = [],
                  d = new m.xa(),
                  e = r.H,
                  f = r.s.b.videoWidth / 3;
                r.s.width = r.s.b.videoWidth;
                r.s.height = r.s.b.videoHeight;
                for (a = 0; 6 > a; a++) {
                  var k = (a % 3) * f + r.s.Pe;
                  var g = k + f - 2 * r.s.Pe;
                  var h = 4;
                  3 > a && (h += f);
                  var l = h + f - 2 * r.s.Pe;
                  for (b = 0; 4 > b; b++) {
                    d.x = -1;
                    d.y = -1;
                    d.z = 1;
                    for (var p = 0; p < b; p++) d.cm();
                    c.push(
                      (0 < d.x ? k : g) / (3 * f),
                      (0 < d.y ? l : h) / (2 * f)
                    );
                  }
                }
                e.bindBuffer(e.ARRAY_BUFFER, r.s.oi);
                e.bufferData(
                  e.ARRAY_BUFFER,
                  new Float32Array(c),
                  e.STATIC_DRAW
                );
              }
            };
            "exit" == this.s.me
              ? (this.s.b.onended = function () {
                  r.s.Jh = !1;
                  r.s.jd = !1;
                  r.T.removeChild(r.s.b);
                  r.s.b = null;
                  r.update();
                })
              : "stop" == this.s.me
              ? (r.s.b.onended = function () {
                  r.update();
                })
              : "{" == this.s.me.charAt(0)
              ? (this.s.b.onended = function () {
                  r.ye(r.s.me, "$fwd");
                })
              : (this.s.b.loop = !0);
            for (q = 0; q < this.s.src.length; q++)
              (f = document.createElement("source")),
                f.setAttribute("src", this.kc(this.s.src[q])),
                this.s.b.appendChild(f);
            f = this.Ib("_videopanorama");
            0 < f.length
              ? (f[0].b = this.s.b)
              : this.Wl("_videopanorama", this.s.b);
            if (this.s.Oj && ((f = this.s.b.play()), void 0 !== f))
              f.then(function () {})["catch"](function () {
                c.s.om && ((c.s.b.muted = !0), c.s.b.play());
              });
          } else "{" == this.s.me.charAt(0) && r.ye(r.s.me, "$fwd");
        this.hk();
        this.B.sd || this.qm();
        this.update();
        this.Rd &&
          ((this.Rd = !1),
          this.ka && this.ka.ggViewerInit && this.ka.ggViewerInit(),
          this.qb.enabled &&
            0 == this.ib &&
            this.Y &&
            (this.Oc(9),
            (this.pan.c = this.tc.pan),
            (this.i.c = this.tc.i),
            (this.f.c = this.tc.f),
            (this.Ka = this.tc.Eb),
            (this.w = this.ig(!1)),
            (this.pan.c = this.w.W[0].value),
            (this.i.c = this.w.W[1].value),
            (this.f.c = this.w.W[2].value),
            3 == this.w.W[3].ub && this.Oc(this.w.W[3].value),
            (this.Mb = this.w.bb),
            (this.B.Sh = this.C.Ab),
            (this.B.zi = this.C.ld),
            (this.B.Kh = this.C.ue),
            (this.l.active = !1),
            (this.l.fg = !0)));
        this.Sc();
      };
      b.prototype.wj = function (a, b) {
        0 < a.length &&
          (".xml" == a.substr(a.length - 4) ||
          ".swf" == a.substr(a.length - 4) ||
          "{" == a.charAt(0)
            ? this.ye(this.kc(a), b)
            : window.open(this.kc(a), b));
      };
      b.prototype.Vp = function () {
        this.cf = this.isLoaded = !1;
        this.checkLoaded = this.Sb = [];
        this.$h = 0;
        this.ka && this.ka.ggReLoaded && this.ka.ggReLoaded();
        this.ba("beforechangenode", {});
      };
      b.prototype.ye = function (a, b) {
        if ("" != a && "{}" != a) {
          this.Vp();
          this.aa &&
            this.aa.hotspotProxyOut &&
            this.aa.hotspotProxyOut(this.ta.id, this.ta.url);
          ".swf" == a.substr(a.length - 4) &&
            (a = a.substr(0, a.length - 4) + ".xml");
          var c = "",
            d = null;
          "object" === typeof b && null !== b
            ? (d = b)
            : b && (c = b.toString());
          c = c.replace(
            "$cur",
            this.pan.c + "/" + this.i.c + "/" + this.f.c + "//" + this.ra()
          );
          c = c.replace(
            "$(cur)",
            this.pan.c + "/" + this.i.c + "/" + this.f.c + "//" + this.ra()
          );
          c = c.replace(
            "$fwd",
            "N" + this.pe() + "/" + this.i.c + "/" + this.f.c + "//" + this.ra()
          );
          c = c.replace(
            "$(fwd)",
            "N" + this.pe() + "/" + this.i.c + "/" + this.f.c + "//" + this.ra()
          );
          c = c.replace(
            "$bwd",
            "S" + this.pe() + "/" + this.i.c + "/" + this.f.c + "//" + this.ra()
          );
          c = c.replace(
            "$(bwd)",
            "S" + this.pe() + "/" + this.i.c + "/" + this.f.c + "//" + this.ra()
          );
          c = c.replace("$ap", String(this.pan.c));
          c = c.replace("$(ap)", String(this.pan.c));
          c = c.replace("$an", String(this.pe()));
          c = c.replace("$(an)", String(this.pe()));
          c = c.replace("$at", String(this.i.c));
          c = c.replace("$(at)", String(this.i.c));
          c = c.replace("$af", String(this.f.c));
          c = c.replace("$(af)", String(this.f.c));
          c = c.replace("$ar", String(this.ra()));
          c = c.replace("$(ar)", String(this.ra()));
          "" != c &&
            ((b = c.split("/")),
            3 < b.length && "" != b[3] && (this.startNode = b[3]));
          d = null !== d ? d : c;
          this.va();
          if ("{" == a.charAt(0)) {
            b = a.substr(1, a.length - 2);
            if (this.Wa == b && this.Wf) return;
            var e = this.Pd[b];
            e && (b = e);
            e = this.B;
            var f = this.H;
            if (this.Ie[b]) {
              this.Wf = !0;
              if (this.B.enabled && this.Y && this.B.ac) {
                e.be ||
                  e.sd ||
                  ((e.Sh = this.C.Ab),
                  (e.zi = this.C.ld),
                  (e.Kh = this.C.ue),
                  this.Pg(!0),
                  this.Qg(!0),
                  this.Og(!0));
                var h = void 0;
                "wipeleftright" == e.type
                  ? (h = 1)
                  : "wiperightleft" == e.type
                  ? (h = 2)
                  : "wipetopbottom" == e.type
                  ? (h = 3)
                  : "wipebottomtop" == e.type
                  ? (h = 4)
                  : "wiperandom" == e.type &&
                    (h = Math.ceil(4 * Math.random()));
                e.Ui = h;
                f.bindFramebuffer(f.FRAMEBUFFER, e.ac);
                f.viewport(0, 0, e.ac.width, e.ac.height);
                f.clear(f.COLOR_BUFFER_BIT | f.DEPTH_BUFFER_BIT);
                e.Xg = !0;
                this.$g();
                e.Xg = !1;
                f.bindFramebuffer(f.FRAMEBUFFER, null);
                f.viewport(0, 0, this.rb.width, this.rb.height);
                f = new Date();
                this.ta != this.pb
                  ? ((e.kh = this.ta.Nb / this.o.width),
                    (e.lh = 1 - this.ta.vb / this.o.height))
                  : ((e.kh = 0.5), (e.lh = 0.5));
                1 != e.Oa && 2 != e.Oa
                  ? ((e.Pj = f.getTime()), (e.be = !0))
                  : ((e.Mm = f.getTime()),
                    (e.sd = !0),
                    (e.yb =
                      Math.sin(((this.Jb() / 2) * Math.PI) / 180) /
                      Math.sin(((e.Nf / 2) * Math.PI) / 180)),
                    (e.yb = Math.max(e.yb, 1)),
                    (e.Lm = (1 / e.de) * e.yb * 0.3));
              }
              this.Aj(this.Ie[b], d);
              this.Ji(a);
              e.enabled &&
                this.Y &&
                0 != e.bc &&
                ((e.Fe = this.lg()),
                (e.Ge = this.Ch()),
                (e.Jd = this.Jb()),
                (e.rd = this.ra()),
                1 == e.bc || 3 == e.bc
                  ? this.ji(e.Nf)
                  : 2 == e.bc
                  ? this.ji(this.Jb() + e.Nf)
                  : 4 == e.bc &&
                    (this.Oc(this.tc.Eb),
                    this.zf(this.tc.pan),
                    this.Af(this.tc.i),
                    this.ji(this.tc.f)),
                e.Of ||
                  1 == e.Oa ||
                  2 == e.Oa ||
                  (4 == e.bc
                    ? ((this.w = this.ig(!0, e.Fe, e.Ge, e.Jd)),
                      (this.Mb = this.w.bb),
                      (this.l.active = !0),
                      (this.qb.od = !0))
                    : this.moveTo(e.Fe, e.Ge, e.Jd, e.de, 0, e.rd)));
              this.ia && this.ia.openNext(a, c);
              this.B.sd || this.B.be || (this.ha && this.Qi(), (this.Wf = !1));
            } else {
              this.Mc("invalid node id: " + b);
              return;
            }
          } else this.Ul(a, null, d);
          this.ba("changenode", {});
          this.update(5);
        }
      };
      b.prototype.$n = function () {
        return this.cf ? (this.gf ? this.Ma.slice(0) : [""]) : [];
      };
      b.prototype.cg = function (a) {
        var b;
        var d = {
          title: "",
          description: "",
          author: "",
          datetime: "",
          copyright: "",
          source: "",
          information: "",
          comment: "",
          latitude: 0,
          longitude: 0,
          customnodeid: "",
          tags: [],
        };
        if (
          a &&
          ((b = a.getAttributeNode("title")) &&
            (d.title = b.nodeValue.toString()),
          (b = a.getAttributeNode("description")) &&
            (d.description = b.nodeValue.toString()),
          (b = a.getAttributeNode("author")) &&
            (d.author = b.nodeValue.toString()),
          (b = a.getAttributeNode("datetime")) &&
            (d.datetime = b.nodeValue.toString()),
          (b = a.getAttributeNode("copyright")) &&
            (d.copyright = b.nodeValue.toString()),
          (b = a.getAttributeNode("source")) &&
            (d.source = b.nodeValue.toString()),
          (b = a.getAttributeNode("info")) &&
            (d.information = b.nodeValue.toString()),
          (b = a.getAttributeNode("comment")) &&
            (d.comment = b.nodeValue.toString()),
          (b = a.getAttributeNode("latitude")) &&
            (d.latitude = Number(b.nodeValue)),
          (b = a.getAttributeNode("longitude")) &&
            (d.longitude = Number(b.nodeValue)),
          (b = a.getAttributeNode("customnodeid")) &&
            (d.customnodeid = b.nodeValue.toString()),
          (b = a.getAttributeNode("tags")))
        ) {
          a = b.nodeValue.toString().split("|");
          for (b = 0; b < a.length; b++) "" == a[b] && (a.splice(b, 1), b--);
          d.tags = a;
        }
        return d;
      };
      b.prototype.Ek = function (a) {
        for (var b = {}, d = a.firstChild; d; ) {
          if ("mapcoords" == d.nodeName) {
            var f = { x: 0, y: 0 };
            a = d.getAttributeNode("x");
            f.x = Number(a.nodeValue);
            a = d.getAttributeNode("y");
            f.y = Number(a.nodeValue);
            a = d.getAttributeNode("mapid");
            b[a.nodeValue.toString()] = f;
          }
          d = d.nextSibling;
        }
        return b;
      };
      b.prototype.Fk = function (a) {
        for (var b = {}, d = a.firstChild; d; ) {
          if ("mapcoords" == d.nodeName) {
            var f = { x: 0, y: 0 };
            a = d.getAttributeNode("x_floorplan_percent");
            f.x = Number(a.nodeValue);
            a = d.getAttributeNode("y_floorplan_percent");
            f.y = Number(a.nodeValue);
            a = d.getAttributeNode("mapid");
            b[a.nodeValue.toString()] = f;
          }
          d = d.nextSibling;
        }
        return b;
      };
      b.prototype.ej = function (a) {
        return a ? (this.gh[a] ? this.gh[a] : this.cg()) : this.Kf;
      };
      b.prototype.ao = function (a) {
        a = this.ej(a);
        var b = [];
        "" != a.latitude &&
          0 != a.latitude &&
          0 != a.longitude &&
          (b.push(a.latitude), b.push(a.longitude));
        return b;
      };
      b.prototype.eo = function (a) {
        return this.ej(a).title;
      };
      b.prototype.$e = function (a, b) {
        var c;
        for (c = 0; c < this.w.W.length; c++)
          if (this.w.W[c].time == a && this.w.W[c].ub == b) return this.w.W[c];
        return !1;
      };
      b.prototype.Zn = function (a) {
        var b,
          d = 1e5,
          f = a,
          e = !1;
        for (b = 0; b < this.w.W.length; b++)
          this.w.W[b].ub == a.ub &&
            this.w.W[b].time > a.time &&
            this.w.W[b].time < d &&
            ((f = this.w.W[b]), (d = f.time), (e = !0));
        return e ? f : !1;
      };
      b.prototype.Gn = function (a) {
        for (var b = [], d = 0; d < this.w.W.length; d++)
          if (this.w.W[d].time <= a && 4 == this.w.W[d].ub) {
            for (var f = !1, e = 0; e < b.length; e++)
              if (b[e].nh == this.w.W[d].nh) {
                b[e].time < this.w.W[d].time ? b.splice(e, 1) : (f = !0);
                break;
              }
            f || b.push(this.w.W[d]);
          }
        return b;
      };
      b.prototype.ig = function (a, b, d, f) {
        for (var c = 0; c < this.za.length; c++)
          if (this.za[c].bb && 0 == this.za[c].bb.indexOf("__FlyIn"))
            return this.za[c];
        c = new m.bk();
        c.bb = "__FlyIn";
        c.Df = this.pan.c;
        c.Tg = this.i.c;
        c.Id = this.f.c;
        c.Sg = this.Ka;
        c.rd = this.Zh;
        a
          ? ((c.Xe = !1),
            (c.ke = !1),
            (c.speed = this.B.de),
            (c.Rc = b),
            (c.$d = d),
            (c.Ef = f))
          : ((c.Xe = !0),
            (c.ke = !0),
            (c.speed = this.qb.speed),
            (c.Rc = this.pan.Qa),
            (c.$d = this.i.Qa),
            (c.Ef = this.f.Qa));
        return this.Qk(c);
      };
      b.prototype.Qk = function (a) {
        var b = new m.ck();
        b.bb = a.bb;
        b.Ne = "";
        b.W = [];
        for (var d = a.Sg != a.rd && -1 != a.rd; -180 > a.Rc; )
          a.Rc = a.Rc + 360;
        for (; 180 < a.Rc; ) a.Rc = a.Rc - 360;
        var f = a.Rc - a.Df;
        if (360 == this.pan.max - this.pan.min) {
          for (; -180 > f; ) f += 360;
          for (; 180 < f; ) f -= 360;
        }
        var e = a.$d - a.Tg,
          h = a.Ef - a.Id,
          t = Math.round((Math.sqrt(f * f + e * e + h * h) / a.speed) * 0.33);
        d && (t = Math.max(10, t));
        b.length = t;
        if (a.le) {
          var g = Math.ceil(0.7 * t);
          g = Math.min(15, g);
          g = Math.max(5, g);
          b.length = t + g;
          var q = 0.33 * g;
        }
        var n = a.Ef,
          y = t,
          r = 0,
          v = t - 1;
        if (d) {
          var u = a.Id,
            x = void 0;
          4 == a.rd ? (x = 120) : (x = this.jg(a.rd));
          var A = a.Ef;
          h = A - a.Id;
          var w = new m.rc(0, a.Id),
            B = new m.rc(t, A),
            z = new m.rc(),
            C = new m.rc();
          C.Za(t / 3, a.Id + h / 3);
          z.Za((2 * t) / 3, A - h / 3);
          if (u > x)
            for (; r <= t && u > x; )
              (u = new m.rc()), u.Fi(w, B, C, z, r), (u = u.y), r++;
          else r = 1;
          r >= 0.8 * t && (y = r = Math.round(0.8 * t));
          0 == r && (r = 1);
          x = void 0;
          4 == a.Sg ? (x = 120) : (x = this.jg(a.Sg));
          u = a.Ef;
          if (u > x)
            for (; v > r && u > x; )
              (u = new m.rc()), u.Fi(w, B, C, z, v), (u = u.y), v--;
        }
        w = new m.Fc();
        w.time = 0;
        w.ub = 0;
        w.value = a.Df;
        w.type = 1;
        w.he = t / 3;
        w.ie = a.Xe ? a.Df : a.Df + f / 3;
        b.W.push(w);
        w = new m.Fc();
        w.time = 0;
        w.ub = 1;
        w.value = a.Tg;
        w.type = 1;
        w.he = t / 3;
        w.ie = a.Xe ? a.Tg : a.Tg + e / 3;
        b.W.push(w);
        w = new m.Fc();
        w.time = 0;
        w.ub = 2;
        w.value = a.Id;
        w.type = 1;
        w.he = t / 3;
        w.ie = a.Xe ? a.Id : a.Id + h / 3;
        b.W.push(w);
        w = new m.Fc();
        w.time = 0;
        w.ub = 3;
        w.value = a.Sg;
        w.type = 0;
        w.xb = 0;
        b.W.push(w);
        d &&
          ((w = new m.Fc()),
          (w.time = r),
          (w.ub = 3),
          (w.value = a.rd),
          (w.type = 0),
          (w.xb = v - r),
          b.W.push(w));
        w = new m.Fc();
        w.time = t;
        w.ub = 0;
        w.value = a.Df + f;
        w.type = 1;
        w.ge = (2 * t) / 3;
        a.ke && !a.le ? (w.Wc = w.value) : (w.Wc = w.value - f / 3);
        a.le && ((w.he = t + q), (w.ie = w.value + (q / t) * f));
        b.W.push(w);
        w = new m.Fc();
        w.time = t;
        w.ub = 1;
        w.value = a.$d;
        w.type = 1;
        w.ge = (2 * t) / 3;
        a.ke && !a.le ? (w.Wc = a.$d) : (w.Wc = a.$d - e / 3);
        a.le && ((w.he = t + q), (w.ie = w.value + (q / t) * e));
        b.W.push(w);
        w = new m.Fc();
        w.time = y;
        w.ub = 2;
        w.value = n;
        w.type = 1;
        w.ge = (2 * y) / 3;
        a.ke ? (w.Wc = n) : (w.Wc = n - h / 3);
        b.W.push(w);
        a.le &&
          ((w = new m.Fc()),
          (w.time = t + g),
          (w.ub = 0),
          (w.value = a.Rc),
          (w.type = 1),
          (w.ge = t + g - q),
          (w.Wc = a.Rc),
          b.W.push(w),
          (w = new m.Fc()),
          (w.time = t + g),
          (w.ub = 1),
          (w.value = a.$d),
          (w.type = 1),
          (w.ge = t + g - q),
          (w.Wc = a.$d),
          b.W.push(w));
        this.za.push(b);
        return b;
      };
      b.prototype.tq = function () {
        this.s.b && this.s.b.play();
      };
      b.prototype.uq = function () {
        this.s.b && (this.s.b.pause(), (this.s.b.currentTime = 0));
      };
      b.prototype.sq = function () {
        this.s.b && this.s.b.pause();
      };
      b.prototype.Kp = function (a) {
        this.s.b &&
          (0 > a && (a = 0),
          a > this.s.b.duration && (a = this.s.b.duration - 0.1),
          (this.s.b.currentTime = a),
          this.update());
      };
      b.prototype.so = function () {
        return this.s.b ? this.s.b.currentTime : 0;
      };
      b.prototype.ro = function () {
        if (this.s.b) return this.s.b;
      };
      b.prototype.Jp = function (a) {
        if (this.s.b) {
          var b = !this.s.b.paused && !this.s.b.ended,
            d = this.s.b.currentTime;
          this.s.b.pause();
          isNaN(parseInt(a, 10))
            ? (this.s.b.src = String(a))
            : (this.s.b.src = this.s.src[parseInt(a, 10)]);
          b &&
            (this.s.b.onloadedmetadata = function () {
              this.currentTime = d;
              this.play();
              this.onloadedmetadata = null;
            });
          this.s.b.currentTime = d;
        }
      };
      b.prototype.zn = function () {
        this.Ll = !0;
      };
      return b;
    })();
  m.a = d;
})(ggP2VR || (ggP2VR = {}));
window.ggHasHtml5Css3D = U;
window.ggHasWebGL = V;
window.pano2vrPlayer = ggP2VR.a;
ggP2VR.a.prototype.getVersion = ggP2VR.a.prototype.el;
ggP2VR.a.prototype.readConfigString = ggP2VR.a.prototype.Bj;
ggP2VR.a.prototype.readConfigUrl = ggP2VR.a.prototype.Ul;
ggP2VR.a.prototype.readConfigUrlAsync = ggP2VR.a.prototype.ip;
ggP2VR.a.prototype.readConfigXml = ggP2VR.a.prototype.Vl;
ggP2VR.a.prototype.openUrl = ggP2VR.a.prototype.wj;
ggP2VR.a.prototype.openNext = ggP2VR.a.prototype.ye;
ggP2VR.a.prototype.setMargins = ggP2VR.a.prototype.vp;
ggP2VR.a.prototype.addListener = ggP2VR.a.prototype.addListener;
ggP2VR.a.prototype.on = ggP2VR.a.prototype.addListener;
ggP2VR.a.prototype.removeEventListener = ggP2VR.a.prototype.removeEventListener;
ggP2VR.a.prototype.detectBrowser = ggP2VR.a.prototype.Ck;
ggP2VR.a.prototype.initWebGL = ggP2VR.a.prototype.Jc;
ggP2VR.a.prototype.getPercentLoaded = ggP2VR.a.prototype.io;
ggP2VR.a.prototype.setBasePath = ggP2VR.a.prototype.pp;
ggP2VR.a.prototype.getBasePath = ggP2VR.a.prototype.Hn;
ggP2VR.a.prototype.setViewerSize = ggP2VR.a.prototype.jm;
ggP2VR.a.prototype.getViewerSize = ggP2VR.a.prototype.vo;
ggP2VR.a.prototype.setSkinObject = ggP2VR.a.prototype.Fp;
ggP2VR.a.prototype.changeViewMode = ggP2VR.a.prototype.nn;
ggP2VR.a.prototype.getViewMode = ggP2VR.a.prototype.to;
ggP2VR.a.prototype.changePolygonMode = ggP2VR.a.prototype.sk;
ggP2VR.a.prototype.setPolygonMode = ggP2VR.a.prototype.sk;
ggP2VR.a.prototype.getPolygonMode = ggP2VR.a.prototype.ko;
ggP2VR.a.prototype.showOnePolyHotspot = ggP2VR.a.prototype.km;
ggP2VR.a.prototype.hideOnePolyHotspot = ggP2VR.a.prototype.jl;
ggP2VR.a.prototype.changePolyHotspotColor = ggP2VR.a.prototype.ln;
ggP2VR.a.prototype.toggleOnePolyHotspot = ggP2VR.a.prototype.bq;
ggP2VR.a.prototype.changeViewState = ggP2VR.a.prototype.pn;
ggP2VR.a.prototype.getViewState = ggP2VR.a.prototype.uo;
ggP2VR.a.prototype.setRenderFlags = ggP2VR.a.prototype.yp;
ggP2VR.a.prototype.getRenderFlags = ggP2VR.a.prototype.no;
ggP2VR.a.prototype.setMaxTileCount = ggP2VR.a.prototype.hm;
ggP2VR.a.prototype.getVFov = ggP2VR.a.prototype.Jb;
ggP2VR.a.prototype.setVFov = ggP2VR.a.prototype.ji;
ggP2VR.a.prototype.getHFov = ggP2VR.a.prototype.Ln;
ggP2VR.a.prototype.updatePanorama = ggP2VR.a.prototype.$g;
ggP2VR.a.prototype.isTouching = ggP2VR.a.prototype.wl;
ggP2VR.a.prototype.getIsMobile = ggP2VR.a.prototype.Qn;
ggP2VR.a.prototype.setIsMobile = ggP2VR.a.prototype.tp;
ggP2VR.a.prototype.getIsTour = ggP2VR.a.prototype.Rn;
ggP2VR.a.prototype.getIsAutorotating = ggP2VR.a.prototype.Nn;
ggP2VR.a.prototype.getIsLoading = ggP2VR.a.prototype.Pn;
ggP2VR.a.prototype.getIsLoaded = ggP2VR.a.prototype.Bh;
ggP2VR.a.prototype.getIsTileLoading = ggP2VR.a.prototype.Vk;
ggP2VR.a.prototype.getLastActivity = ggP2VR.a.prototype.Sn;
ggP2VR.a.prototype.getPan = ggP2VR.a.prototype.lg;
ggP2VR.a.prototype.getPanNorth = ggP2VR.a.prototype.pe;
ggP2VR.a.prototype.getPanDest = ggP2VR.a.prototype.ho;
ggP2VR.a.prototype.getPanN = ggP2VR.a.prototype.Yk;
ggP2VR.a.prototype.setPan = ggP2VR.a.prototype.zf;
ggP2VR.a.prototype.setPanNorth = ggP2VR.a.prototype.Ij;
ggP2VR.a.prototype.changePan = ggP2VR.a.prototype.rk;
ggP2VR.a.prototype.changePanLog = ggP2VR.a.prototype.kn;
ggP2VR.a.prototype.getTilt = ggP2VR.a.prototype.Ch;
ggP2VR.a.prototype.getTiltDest = ggP2VR.a.prototype.oo;
ggP2VR.a.prototype.setTilt = ggP2VR.a.prototype.Af;
ggP2VR.a.prototype.changeTilt = ggP2VR.a.prototype.tk;
ggP2VR.a.prototype.changeTiltLog = ggP2VR.a.prototype.mn;
ggP2VR.a.prototype.getFov = ggP2VR.a.prototype.dj;
ggP2VR.a.prototype.getFovDest = ggP2VR.a.prototype.Kn;
ggP2VR.a.prototype.setFov = ggP2VR.a.prototype.xf;
ggP2VR.a.prototype.changeFov = ggP2VR.a.prototype.qk;
ggP2VR.a.prototype.changeFovLog = ggP2VR.a.prototype.Ki;
ggP2VR.a.prototype.getRoll = ggP2VR.a.prototype.al;
ggP2VR.a.prototype.setRoll = ggP2VR.a.prototype.Jj;
ggP2VR.a.prototype.setPanTilt = ggP2VR.a.prototype.xp;
ggP2VR.a.prototype.setPanTiltFov = ggP2VR.a.prototype.hi;
ggP2VR.a.prototype.setDefaultView = ggP2VR.a.prototype.rp;
ggP2VR.a.prototype.setLocked = ggP2VR.a.prototype.up;
ggP2VR.a.prototype.setLockedMouse = ggP2VR.a.prototype.Pg;
ggP2VR.a.prototype.setLockedKeyboard = ggP2VR.a.prototype.Og;
ggP2VR.a.prototype.getLockedKeyboard = ggP2VR.a.prototype.Un;
ggP2VR.a.prototype.setLockedWheel = ggP2VR.a.prototype.Qg;
ggP2VR.a.prototype.moveTo = ggP2VR.a.prototype.moveTo;
ggP2VR.a.prototype.moveToEx = ggP2VR.a.prototype.Uh;
ggP2VR.a.prototype.moveToDefaultView = ggP2VR.a.prototype.Lo;
ggP2VR.a.prototype.moveToDefaultViewEx = ggP2VR.a.prototype.Mo;
ggP2VR.a.prototype.addHotspotElements = ggP2VR.a.prototype.hk;
ggP2VR.a.prototype.playSound = ggP2VR.a.prototype.Ae;
ggP2VR.a.prototype.playPauseSound = ggP2VR.a.prototype.Rl;
ggP2VR.a.prototype.playStopSound = ggP2VR.a.prototype.gp;
ggP2VR.a.prototype.pauseSound = ggP2VR.a.prototype.xj;
ggP2VR.a.prototype.activateSound = ggP2VR.a.prototype.Ym;
ggP2VR.a.prototype.soundGetTime = ggP2VR.a.prototype.Pp;
ggP2VR.a.prototype.soundSetTime = ggP2VR.a.prototype.Qp;
ggP2VR.a.prototype.setMediaVisibility = ggP2VR.a.prototype.wp;
ggP2VR.a.prototype.isPlaying = ggP2VR.a.prototype.Ub;
ggP2VR.a.prototype.stopSound = ggP2VR.a.prototype.ni;
ggP2VR.a.prototype.setVolume = ggP2VR.a.prototype.Lp;
ggP2VR.a.prototype.changeVolume = ggP2VR.a.prototype.qn;
ggP2VR.a.prototype.removeHotspots = ggP2VR.a.prototype.$l;
ggP2VR.a.prototype.getHotspotsVisible = ggP2VR.a.prototype.Uk;
ggP2VR.a.prototype.getCurrentPerspective = ggP2VR.a.prototype.ed;
ggP2VR.a.prototype.addHotspot = ggP2VR.a.prototype.Zm;
ggP2VR.a.prototype.updateHotspot = ggP2VR.a.prototype.kq;
ggP2VR.a.prototype.removeHotspot = ggP2VR.a.prototype.jp;
ggP2VR.a.prototype.setActiveHotspot = ggP2VR.a.prototype.wf;
ggP2VR.a.prototype.getPointHotspotIds = ggP2VR.a.prototype.jo;
ggP2VR.a.prototype.getHotspot = ggP2VR.a.prototype.Mn;
ggP2VR.a.prototype.setFullscreen = ggP2VR.a.prototype.yf;
ggP2VR.a.prototype.toggleFullscreen = ggP2VR.a.prototype.si;
ggP2VR.a.prototype.enterFullscreen = ggP2VR.a.prototype.An;
ggP2VR.a.prototype.exitFullscreen = ggP2VR.a.prototype.exitFullscreen;
ggP2VR.a.prototype.getIsFullscreen = ggP2VR.a.prototype.On;
ggP2VR.a.prototype.startAutorotate = ggP2VR.a.prototype.Up;
ggP2VR.a.prototype.stopAutorotate = ggP2VR.a.prototype.Xp;
ggP2VR.a.prototype.toggleAutorotate = ggP2VR.a.prototype.aq;
ggP2VR.a.prototype.startAnimation = ggP2VR.a.prototype.Tp;
ggP2VR.a.prototype.createLayers = ggP2VR.a.prototype.xk;
ggP2VR.a.prototype.removePanorama = ggP2VR.a.prototype.di;
ggP2VR.a.prototype.getScreenResolution = ggP2VR.a.prototype.bl;
ggP2VR.a.prototype.getMaxScreenResolution = ggP2VR.a.prototype.Wk;
ggP2VR.a.prototype.getNodeIds = ggP2VR.a.prototype.$n;
ggP2VR.a.prototype.getNodeUserdata = ggP2VR.a.prototype.ej;
ggP2VR.a.prototype.getNodeLatLng = ggP2VR.a.prototype.ao;
ggP2VR.a.prototype.getNodeTitle = ggP2VR.a.prototype.eo;
ggP2VR.a.prototype.getCurrentNode = ggP2VR.a.prototype.Tk;
ggP2VR.a.prototype.getNextNode = ggP2VR.a.prototype.Xk;
ggP2VR.a.prototype.getPrevNode = ggP2VR.a.prototype.mo;
ggP2VR.a.prototype.getLastVisitedNode = ggP2VR.a.prototype.Tn;
ggP2VR.a.prototype.getCurrentPointHotspots = ggP2VR.a.prototype.Jn;
ggP2VR.a.prototype.getPositionAngles = ggP2VR.a.prototype.lo;
ggP2VR.a.prototype.getPositionRawAngles = ggP2VR.a.prototype.Zk;
ggP2VR.a.prototype.nodeVisited = ggP2VR.a.prototype.Ro;
ggP2VR.a.prototype.setElementIdPrefix = ggP2VR.a.prototype.sp;
ggP2VR.a.prototype.videoPanoPlay = ggP2VR.a.prototype.tq;
ggP2VR.a.prototype.videoPanoStop = ggP2VR.a.prototype.uq;
ggP2VR.a.prototype.videoPanoPause = ggP2VR.a.prototype.sq;
ggP2VR.a.prototype.getVideoPanoTime = ggP2VR.a.prototype.so;
ggP2VR.a.prototype.setVideoPanoTime = ggP2VR.a.prototype.Kp;
ggP2VR.a.prototype.getVideoPanoObject = ggP2VR.a.prototype.ro;
ggP2VR.a.prototype.setVideoPanoSource = ggP2VR.a.prototype.Jp;
ggP2VR.a.prototype.getMediaObject = ggP2VR.a.prototype.Yn;
ggP2VR.a.prototype.registerVideoElement = ggP2VR.a.prototype.Wl;
ggP2VR.a.prototype.disableSoundLoading = ggP2VR.a.prototype.zn;
ggP2VR.a.prototype.setCrossOrigin = ggP2VR.a.prototype.qp;
ggP2VR.a.prototype.setProjection = ggP2VR.a.prototype.Oc;
ggP2VR.a.prototype.getProjection = ggP2VR.a.prototype.ra;
ggP2VR.a.prototype.changeProjection = ggP2VR.a.prototype.Li;
ggP2VR.a.prototype.changeProjectionEx = ggP2VR.a.prototype.Li;
ggP2VR.a.prototype.changeLensflares = ggP2VR.a.prototype.jn;
ggP2VR.a.prototype.setTransition = ggP2VR.a.prototype.Hp;
ggP2VR.a.prototype.getMapType = ggP2VR.a.prototype.Xn;
ggP2VR.a.prototype.getMapDetails = ggP2VR.a.prototype.Wn;
ggP2VR.a.prototype.getNodeMapCoords = ggP2VR.a.prototype.bo;
ggP2VR.a.prototype.getNodeMapCoordsInPercent = ggP2VR.a.prototype.co;
ggP2VR.a.prototype.getMapContainingNode = ggP2VR.a.prototype.Vn;
ggP2VR.a.prototype.addVariable = ggP2VR.a.prototype.$m;
ggP2VR.a.prototype.setVariableOptions = ggP2VR.a.prototype.im;
ggP2VR.a.prototype.setVariableValue = ggP2VR.a.prototype.Zd;
ggP2VR.a.prototype.getVariableValue = ggP2VR.a.prototype.qo;
ggP2VR.a.prototype.setUseGyro = ggP2VR.a.prototype.Ip;
ggP2VR.a.prototype.getUseGyro = ggP2VR.a.prototype.po;
ggP2VR.a.prototype.getOS = ggP2VR.a.prototype.fo;
ggP2VR.a.prototype.getBrowser = ggP2VR.a.prototype.In;
ggP2VR.a.prototype.triggerEvent = ggP2VR.a.prototype.ba;
ggP2VR.a.prototype.requestRedraw = ggP2VR.a.prototype.lp;
ggP2VR.a.prototype.getWebGlContext = ggP2VR.a.prototype.wo;
