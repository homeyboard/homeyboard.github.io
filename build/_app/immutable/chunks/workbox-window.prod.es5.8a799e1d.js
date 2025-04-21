try {
  self["workbox:window:7.2.0"] && _();
} catch (n2) {
}
function n(n2, t2) {
  return new Promise(function(r2) {
    var e2 = new MessageChannel();
    e2.port1.onmessage = function(n3) {
      r2(n3.data);
    }, n2.postMessage(t2, [e2.port2]);
  });
}
function t(n2) {
  var t2 = function(n3, t3) {
    if ("object" != typeof n3 || !n3)
      return n3;
    var r2 = n3[Symbol.toPrimitive];
    if (void 0 !== r2) {
      var e2 = r2.call(n3, t3 || "default");
      if ("object" != typeof e2)
        return e2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t3 ? String : Number)(n3);
  }(n2, "string");
  return "symbol" == typeof t2 ? t2 : t2 + "";
}
function r(n2, r2) {
  for (var e2 = 0; e2 < r2.length; e2++) {
    var i2 = r2[e2];
    i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(n2, t(i2.key), i2);
  }
}
function e(n2, t2) {
  return e = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n3, t3) {
    return n3.__proto__ = t3, n3;
  }, e(n2, t2);
}
function i(n2, t2) {
  (null == t2 || t2 > n2.length) && (t2 = n2.length);
  for (var r2 = 0, e2 = new Array(t2); r2 < t2; r2++)
    e2[r2] = n2[r2];
  return e2;
}
function o(n2, t2) {
  var r2 = "undefined" != typeof Symbol && n2[Symbol.iterator] || n2["@@iterator"];
  if (r2)
    return (r2 = r2.call(n2)).next.bind(r2);
  if (Array.isArray(n2) || (r2 = function(n3, t3) {
    if (n3) {
      if ("string" == typeof n3)
        return i(n3, t3);
      var r3 = Object.prototype.toString.call(n3).slice(8, -1);
      return "Object" === r3 && n3.constructor && (r3 = n3.constructor.name), "Map" === r3 || "Set" === r3 ? Array.from(n3) : "Arguments" === r3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r3) ? i(n3, t3) : void 0;
    }
  }(n2)) || t2 && n2 && "number" == typeof n2.length) {
    r2 && (n2 = r2);
    var e2 = 0;
    return function() {
      return e2 >= n2.length ? { done: true } : { done: false, value: n2[e2++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
try {
  self["workbox:core:7.2.0"] && _();
} catch (n2) {
}
var u = function() {
  var n2 = this;
  this.promise = new Promise(function(t2, r2) {
    n2.resolve = t2, n2.reject = r2;
  });
};
function a(n2, t2) {
  var r2 = location.href;
  return new URL(n2, r2).href === new URL(t2, r2).href;
}
var c = function(n2, t2) {
  this.type = n2, Object.assign(this, t2);
};
function f(n2, t2, r2) {
  return r2 ? t2 ? t2(n2) : n2 : (n2 && n2.then || (n2 = Promise.resolve(n2)), t2 ? n2.then(t2) : n2);
}
function s() {
}
var v = { type: "SKIP_WAITING" };
function h(n2, t2) {
  if (!t2)
    return n2 && n2.then ? n2.then(s) : Promise.resolve();
}
var l = function(t2) {
  function i2(n2, r2) {
    var e2, i3;
    return void 0 === r2 && (r2 = {}), (e2 = t2.call(this) || this).nn = {}, e2.tn = 0, e2.rn = new u(), e2.en = new u(), e2.on = new u(), e2.un = 0, e2.an = /* @__PURE__ */ new Set(), e2.cn = function() {
      var n3 = e2.fn, t3 = n3.installing;
      e2.tn > 0 || !a(t3.scriptURL, e2.sn.toString()) || performance.now() > e2.un + 6e4 ? (e2.vn = t3, n3.removeEventListener("updatefound", e2.cn)) : (e2.hn = t3, e2.an.add(t3), e2.rn.resolve(t3)), ++e2.tn, t3.addEventListener("statechange", e2.ln);
    }, e2.ln = function(n3) {
      var t3 = e2.fn, r3 = n3.target, i4 = r3.state, o3 = r3 === e2.vn, u2 = { sw: r3, isExternal: o3, originalEvent: n3 };
      !o3 && e2.mn && (u2.isUpdate = true), e2.dispatchEvent(new c(i4, u2)), "installed" === i4 ? e2.wn = self.setTimeout(function() {
        "installed" === i4 && t3.waiting === r3 && e2.dispatchEvent(new c("waiting", u2));
      }, 200) : "activating" === i4 && (clearTimeout(e2.wn), o3 || e2.en.resolve(r3));
    }, e2.yn = function(n3) {
      var t3 = e2.hn, r3 = t3 !== navigator.serviceWorker.controller;
      e2.dispatchEvent(new c("controlling", { isExternal: r3, originalEvent: n3, sw: t3, isUpdate: e2.mn })), r3 || e2.on.resolve(t3);
    }, e2.gn = (i3 = function(n3) {
      var t3 = n3.data, r3 = n3.ports, i4 = n3.source;
      return f(e2.getSW(), function() {
        e2.an.has(i4) && e2.dispatchEvent(new c("message", { data: t3, originalEvent: n3, ports: r3, sw: i4 }));
      });
    }, function() {
      for (var n3 = [], t3 = 0; t3 < arguments.length; t3++)
        n3[t3] = arguments[t3];
      try {
        return Promise.resolve(i3.apply(this, n3));
      } catch (n4) {
        return Promise.reject(n4);
      }
    }), e2.sn = n2, e2.nn = r2, navigator.serviceWorker.addEventListener("message", e2.gn), e2;
  }
  var o2, s2;
  s2 = t2, (o2 = i2).prototype = Object.create(s2.prototype), o2.prototype.constructor = o2, e(o2, s2);
  var l2, m, y = i2.prototype;
  return y.register = function(n2) {
    var t3 = (void 0 === n2 ? {} : n2).immediate, r2 = void 0 !== t3 && t3;
    try {
      var e2 = this;
      return f(function(n3, t4) {
        var r3 = n3();
        if (r3 && r3.then)
          return r3.then(t4);
        return t4(r3);
      }(function() {
        if (!r2 && "complete" !== document.readyState)
          return h(new Promise(function(n3) {
            return window.addEventListener("load", n3);
          }));
      }, function() {
        return e2.mn = Boolean(navigator.serviceWorker.controller), e2.dn = e2.pn(), f(e2.bn(), function(n3) {
          e2.fn = n3, e2.dn && (e2.hn = e2.dn, e2.en.resolve(e2.dn), e2.on.resolve(e2.dn), e2.dn.addEventListener("statechange", e2.ln, { once: true }));
          var t4 = e2.fn.waiting;
          return t4 && a(t4.scriptURL, e2.sn.toString()) && (e2.hn = t4, Promise.resolve().then(function() {
            e2.dispatchEvent(new c("waiting", { sw: t4, wasWaitingBeforeRegister: true }));
          }).then(function() {
          })), e2.hn && (e2.rn.resolve(e2.hn), e2.an.add(e2.hn)), e2.fn.addEventListener("updatefound", e2.cn), navigator.serviceWorker.addEventListener("controllerchange", e2.yn), e2.fn;
        });
      }));
    } catch (n3) {
      return Promise.reject(n3);
    }
  }, y.update = function() {
    try {
      return this.fn ? f(h(this.fn.update())) : f();
    } catch (n2) {
      return Promise.reject(n2);
    }
  }, y.getSW = function() {
    return void 0 !== this.hn ? Promise.resolve(this.hn) : this.rn.promise;
  }, y.messageSW = function(t3) {
    try {
      return f(this.getSW(), function(r2) {
        return n(r2, t3);
      });
    } catch (n2) {
      return Promise.reject(n2);
    }
  }, y.messageSkipWaiting = function() {
    this.fn && this.fn.waiting && n(this.fn.waiting, v);
  }, y.pn = function() {
    var n2 = navigator.serviceWorker.controller;
    return n2 && a(n2.scriptURL, this.sn.toString()) ? n2 : void 0;
  }, y.bn = function() {
    try {
      var n2 = this;
      return f(function(n3, t3) {
        try {
          var r2 = n3();
        } catch (n4) {
          return t3(n4);
        }
        if (r2 && r2.then)
          return r2.then(void 0, t3);
        return r2;
      }(function() {
        return f(navigator.serviceWorker.register(n2.sn, n2.nn), function(t3) {
          return n2.un = performance.now(), t3;
        });
      }, function(n3) {
        throw n3;
      }));
    } catch (n3) {
      return Promise.reject(n3);
    }
  }, l2 = i2, (m = [{ key: "active", get: function() {
    return this.en.promise;
  } }, { key: "controlling", get: function() {
    return this.on.promise;
  } }]) && r(l2.prototype, m), Object.defineProperty(l2, "prototype", { writable: false }), l2;
}(function() {
  function n2() {
    this.Pn = /* @__PURE__ */ new Map();
  }
  var t2 = n2.prototype;
  return t2.addEventListener = function(n3, t3) {
    this.jn(n3).add(t3);
  }, t2.removeEventListener = function(n3, t3) {
    this.jn(n3).delete(t3);
  }, t2.dispatchEvent = function(n3) {
    n3.target = this;
    for (var t3, r2 = o(this.jn(n3.type)); !(t3 = r2()).done; ) {
      (0, t3.value)(n3);
    }
  }, t2.jn = function(n3) {
    return this.Pn.has(n3) || this.Pn.set(n3, /* @__PURE__ */ new Set()), this.Pn.get(n3);
  }, n2;
}());
export {
  l as Workbox,
  c as WorkboxEvent,
  n as messageSW
};
