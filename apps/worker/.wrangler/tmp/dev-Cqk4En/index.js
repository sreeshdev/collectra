var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-027NN5/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-027NN5/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// .wrangler/tmp/bundle-027NN5/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
var init_strip_cf_connecting_ip_header = __esm({
  ".wrangler/tmp/bundle-027NN5/strip-cf-connecting-ip-header.js"() {
    "use strict";
    __name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        return Reflect.apply(target, thisArg, [
          stripCfConnectingIPHeader.apply(null, argArray)
        ]);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
  }
});

// ../../node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../../node_modules/@prisma/client/runtime/wasm.js
var require_wasm = __commonJS({
  "../../node_modules/@prisma/client/runtime/wasm.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    var Uo = Object.create;
    var kt = Object.defineProperty;
    var qo = Object.getOwnPropertyDescriptor;
    var Bo = Object.getOwnPropertyNames;
    var $o = Object.getPrototypeOf;
    var Vo = Object.prototype.hasOwnProperty;
    var se2 = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "se");
    var De = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "De");
    var Mt = /* @__PURE__ */ __name((e, t) => {
      for (var r in t)
        kt(e, r, { get: t[r], enumerable: true });
    }, "Mt");
    var rn = /* @__PURE__ */ __name((e, t, r, n) => {
      if (t && typeof t == "object" || typeof t == "function")
        for (let i of Bo(t))
          !Vo.call(e, i) && i !== r && kt(e, i, { get: () => t[i], enumerable: !(n = qo(t, i)) || n.enumerable });
      return e;
    }, "rn");
    var Fe = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? Uo($o(e)) : {}, rn(t || !e || !e.__esModule ? kt(r, "default", { value: e, enumerable: true }) : r, e)), "Fe");
    var jo = /* @__PURE__ */ __name((e) => rn(kt({}, "__esModule", { value: true }), e), "jo");
    function gr(e, t) {
      if (t = t.toLowerCase(), t === "utf8" || t === "utf-8")
        return new y2(Wo.encode(e));
      if (t === "base64" || t === "base64url")
        return e = e.replace(/-/g, "+").replace(/_/g, "/"), e = e.replace(/[^A-Za-z0-9+/]/g, ""), new y2([...atob(e)].map((r) => r.charCodeAt(0)));
      if (t === "binary" || t === "ascii" || t === "latin1" || t === "latin-1")
        return new y2([...e].map((r) => r.charCodeAt(0)));
      if (t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le") {
        let r = new y2(e.length * 2), n = new DataView(r.buffer);
        for (let i = 0; i < e.length; i++)
          n.setUint16(i * 2, e.charCodeAt(i), true);
        return r;
      }
      if (t === "hex") {
        let r = new y2(e.length / 2);
        for (let n = 0, i = 0; i < e.length; i += 2, n++)
          r[n] = parseInt(e.slice(i, i + 2), 16);
        return r;
      }
      on(`encoding "${t}"`);
    }
    __name(gr, "gr");
    function Qo(e) {
      let r = Object.getOwnPropertyNames(DataView.prototype).filter((a2) => a2.startsWith("get") || a2.startsWith("set")), n = r.map((a2) => a2.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a2, u) => function(g = 0) {
        return B(g, "offset"), Y(g, "offset"), V(g, "offset", this.length - 1), new DataView(this.buffer)[r[a2]](g, u);
      }, "i"), o = /* @__PURE__ */ __name((a2, u) => function(g, T = 0) {
        let C = r[a2].match(/set(\w+\d+)/)[1].toLowerCase(), O2 = Go[C];
        return B(T, "offset"), Y(T, "offset"), V(T, "offset", this.length - 1), Jo2(g, "value", O2[0], O2[1]), new DataView(this.buffer)[r[a2]](T, g, u), T + parseInt(r[a2].match(/\d+/)[0]) / 8;
      }, "o"), s = /* @__PURE__ */ __name((a2) => {
        a2.forEach((u) => {
          u.includes("Uint") && (e[u.replace("Uint", "UInt")] = e[u]), u.includes("Float64") && (e[u.replace("Float64", "Double")] = e[u]), u.includes("Float32") && (e[u.replace("Float32", "Float")] = e[u]);
        });
      }, "s");
      n.forEach((a2, u) => {
        a2.startsWith("read") && (e[a2] = i(u, false), e[a2 + "LE"] = i(u, true), e[a2 + "BE"] = i(u, false)), a2.startsWith("write") && (e[a2] = o(u, false), e[a2 + "LE"] = o(u, true), e[a2 + "BE"] = o(u, false)), s([a2, a2 + "LE", a2 + "BE"]);
      });
    }
    __name(Qo, "Qo");
    function on(e) {
      throw new Error(`Buffer polyfill does not implement "${e}"`);
    }
    __name(on, "on");
    function It2(e, t) {
      if (!(e instanceof Uint8Array))
        throw new TypeError(`The "${t}" argument must be an instance of Buffer or Uint8Array`);
    }
    __name(It2, "It");
    function V(e, t, r = zo2 + 1) {
      if (e < 0 || e > r) {
        let n = new RangeError(`The value of "${t}" is out of range. It must be >= 0 && <= ${r}. Received ${e}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
      }
    }
    __name(V, "V");
    function B(e, t) {
      if (typeof e != "number") {
        let r = new TypeError(`The "${t}" argument must be of type number. Received type ${typeof e}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(B, "B");
    function Y(e, t) {
      if (!Number.isInteger(e) || Number.isNaN(e)) {
        let r = new RangeError(`The value of "${t}" is out of range. It must be an integer. Received ${e}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
      }
    }
    __name(Y, "Y");
    function Jo2(e, t, r, n) {
      if (e < r || e > n) {
        let i = new RangeError(`The value of "${t}" is out of range. It must be >= ${r} and <= ${n}. Received ${e}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
      }
    }
    __name(Jo2, "Jo");
    function nn(e, t) {
      if (typeof e != "string") {
        let r = new TypeError(`The "${t}" argument must be of type string. Received type ${typeof e}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(nn, "nn");
    function Yo2(e, t = "utf8") {
      return y2.from(e, t);
    }
    __name(Yo2, "Yo");
    var y2;
    var Go;
    var Wo;
    var Ko;
    var Ho;
    var zo2;
    var b;
    var hr2;
    var c = se2(() => {
      "use strict";
      y2 = /* @__PURE__ */ __name(class e extends Uint8Array {
        constructor() {
          super(...arguments);
          this._isBuffer = true;
        }
        get offset() {
          return this.byteOffset;
        }
        static alloc(r, n = 0, i = "utf8") {
          return nn(i, "encoding"), e.allocUnsafe(r).fill(n, i);
        }
        static allocUnsafe(r) {
          return e.from(r);
        }
        static allocUnsafeSlow(r) {
          return e.from(r);
        }
        static isBuffer(r) {
          return r && !!r._isBuffer;
        }
        static byteLength(r, n = "utf8") {
          if (typeof r == "string")
            return gr(r, n).byteLength;
          if (r && r.byteLength)
            return r.byteLength;
          let i = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
          throw i.code = "ERR_INVALID_ARG_TYPE", i;
        }
        static isEncoding(r) {
          return Ho.includes(r);
        }
        static compare(r, n) {
          It2(r, "buff1"), It2(n, "buff2");
          for (let i = 0; i < r.length; i++) {
            if (r[i] < n[i])
              return -1;
            if (r[i] > n[i])
              return 1;
          }
          return r.length === n.length ? 0 : r.length > n.length ? 1 : -1;
        }
        static from(r, n = "utf8") {
          if (r && typeof r == "object" && r.type === "Buffer")
            return new e(r.data);
          if (typeof r == "number")
            return new e(new Uint8Array(r));
          if (typeof r == "string")
            return gr(r, n);
          if (ArrayBuffer.isView(r)) {
            let { byteOffset: i, byteLength: o, buffer: s } = r;
            return "map" in r && typeof r.map == "function" ? new e(r.map((a2) => a2 % 256), i, o) : new e(s, i, o);
          }
          if (r && typeof r == "object" && ("length" in r || "byteLength" in r || "buffer" in r))
            return new e(r);
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(r, n) {
          if (r.length === 0)
            return e.alloc(0);
          let i = [].concat(...r.map((s) => [...s])), o = e.alloc(n !== void 0 ? n : i.length);
          return o.set(n !== void 0 ? i.slice(0, n) : i), o;
        }
        slice(r = 0, n = this.length) {
          return this.subarray(r, n);
        }
        subarray(r = 0, n = this.length) {
          return Object.setPrototypeOf(super.subarray(r, n), e.prototype);
        }
        reverse() {
          return super.reverse(), this;
        }
        readIntBE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++)
            o = o * 256 + i.getUint8(s);
          return i.getUint8(0) & 128 && (o -= Math.pow(256, n)), o;
        }
        readIntLE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++)
            o += i.getUint8(s) * Math.pow(256, s);
          return i.getUint8(n - 1) & 128 && (o -= Math.pow(256, n)), o;
        }
        readUIntBE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++)
            o = o * 256 + i.getUint8(s);
          return o;
        }
        readUintBE(r, n) {
          return this.readUIntBE(r, n);
        }
        readUIntLE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++)
            o += i.getUint8(s) * Math.pow(256, s);
          return o;
        }
        readUintLE(r, n) {
          return this.readUIntLE(r, n);
        }
        writeIntBE(r, n, i) {
          return r = r < 0 ? r + Math.pow(256, i) : r, this.writeUIntBE(r, n, i);
        }
        writeIntLE(r, n, i) {
          return r = r < 0 ? r + Math.pow(256, i) : r, this.writeUIntLE(r, n, i);
        }
        writeUIntBE(r, n, i) {
          B(n, "offset"), Y(n, "offset"), V(n, "offset", this.length - 1), B(i, "byteLength"), Y(i, "byteLength");
          let o = new DataView(this.buffer, n, i);
          for (let s = i - 1; s >= 0; s--)
            o.setUint8(s, r & 255), r = r / 256;
          return n + i;
        }
        writeUintBE(r, n, i) {
          return this.writeUIntBE(r, n, i);
        }
        writeUIntLE(r, n, i) {
          B(n, "offset"), Y(n, "offset"), V(n, "offset", this.length - 1), B(i, "byteLength"), Y(i, "byteLength");
          let o = new DataView(this.buffer, n, i);
          for (let s = 0; s < i; s++)
            o.setUint8(s, r & 255), r = r / 256;
          return n + i;
        }
        writeUintLE(r, n, i) {
          return this.writeUIntLE(r, n, i);
        }
        toJSON() {
          return { type: "Buffer", data: Array.from(this) };
        }
        swap16() {
          let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let n = 0; n < this.length; n += 2)
            r.setUint16(n, r.getUint16(n, true), false);
          return this;
        }
        swap32() {
          let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let n = 0; n < this.length; n += 4)
            r.setUint32(n, r.getUint32(n, true), false);
          return this;
        }
        swap64() {
          let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let n = 0; n < this.length; n += 8)
            r.setBigUint64(n, r.getBigUint64(n, true), false);
          return this;
        }
        compare(r, n = 0, i = r.length, o = 0, s = this.length) {
          return It2(r, "target"), B(n, "targetStart"), B(i, "targetEnd"), B(o, "sourceStart"), B(s, "sourceEnd"), V(n, "targetStart"), V(i, "targetEnd", r.length), V(o, "sourceStart"), V(s, "sourceEnd", this.length), e.compare(this.slice(o, s), r.slice(n, i));
        }
        equals(r) {
          return It2(r, "otherBuffer"), this.length === r.length && this.every((n, i) => n === r[i]);
        }
        copy(r, n = 0, i = 0, o = this.length) {
          V(n, "targetStart"), V(i, "sourceStart", this.length), V(o, "sourceEnd"), n >>>= 0, i >>>= 0, o >>>= 0;
          let s = 0;
          for (; i < o && !(this[i] === void 0 || r[n] === void 0); )
            r[n] = this[i], s++, i++, n++;
          return s;
        }
        write(r, n, i, o = "utf8") {
          let s = typeof n == "string" ? 0 : n ?? 0, a2 = typeof i == "string" ? this.length - s : i ?? this.length - s;
          return o = typeof n == "string" ? n : typeof i == "string" ? i : o, B(s, "offset"), B(a2, "length"), V(s, "offset", this.length), V(a2, "length", this.length), (o === "ucs2" || o === "ucs-2" || o === "utf16le" || o === "utf-16le") && (a2 = a2 - a2 % 2), gr(r, o).copy(this, s, 0, a2);
        }
        fill(r = 0, n = 0, i = this.length, o = "utf-8") {
          let s = typeof n == "string" ? 0 : n, a2 = typeof i == "string" ? this.length : i;
          if (o = typeof n == "string" ? n : typeof i == "string" ? i : o, r = e.from(typeof r == "number" ? [r] : r ?? [], o), nn(o, "encoding"), V(s, "offset", this.length), V(a2, "end", this.length), r.length !== 0)
            for (let u = s; u < a2; u += r.length)
              super.set(r.slice(0, r.length + u >= this.length ? this.length - u : r.length), u);
          return this;
        }
        includes(r, n = null, i = "utf-8") {
          return this.indexOf(r, n, i) !== -1;
        }
        lastIndexOf(r, n = null, i = "utf-8") {
          return this.indexOf(r, n, i, true);
        }
        indexOf(r, n = null, i = "utf-8", o = false) {
          let s = o ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
          i = typeof n == "string" ? n : i;
          let a2 = e.from(typeof r == "number" ? [r] : r, i), u = typeof n == "string" ? 0 : n;
          return u = typeof n == "number" ? u : null, u = Number.isNaN(u) ? null : u, u ??= o ? this.length : 0, u = u < 0 ? this.length + u : u, a2.length === 0 && o === false ? u >= this.length ? this.length : u : a2.length === 0 && o === true ? (u >= this.length ? this.length : u) || this.length : s((g, T) => (o ? T <= u : T >= u) && this[T] === a2[0] && a2.every((O2, A) => this[T + A] === O2));
        }
        toString(r = "utf8", n = 0, i = this.length) {
          if (n = n < 0 ? 0 : n, r = r.toString().toLowerCase(), i <= 0)
            return "";
          if (r === "utf8" || r === "utf-8")
            return Ko.decode(this.slice(n, i));
          if (r === "base64" || r === "base64url") {
            let o = btoa(this.reduce((s, a2) => s + hr2(a2), ""));
            return r === "base64url" ? o.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : o;
          }
          if (r === "binary" || r === "ascii" || r === "latin1" || r === "latin-1")
            return this.slice(n, i).reduce((o, s) => o + hr2(s & (r === "ascii" ? 127 : 255)), "");
          if (r === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le") {
            let o = new DataView(this.buffer.slice(n, i));
            return Array.from({ length: o.byteLength / 2 }, (s, a2) => a2 * 2 + 1 < o.byteLength ? hr2(o.getUint16(a2 * 2, true)) : "").join("");
          }
          if (r === "hex")
            return this.slice(n, i).reduce((o, s) => o + s.toString(16).padStart(2, "0"), "");
          on(`encoding "${r}"`);
        }
        toLocaleString() {
          return this.toString();
        }
        inspect() {
          return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
      }, "e");
      Go = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, Wo = new TextEncoder(), Ko = new TextDecoder(), Ho = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], zo2 = 4294967295;
      Qo(y2.prototype);
      b = new Proxy(Yo2, { construct(e, [t, r]) {
        return y2.from(t, r);
      }, get(e, t) {
        return y2[t];
      } }), hr2 = String.fromCodePoint;
    });
    var h;
    var m2 = se2(() => {
      "use strict";
      h = { nextTick: (e, ...t) => {
        setTimeout(() => {
          e(...t);
        }, 0);
      }, env: {}, version: "", cwd: () => "/", stderr: {}, argv: ["/bin/node"] };
    });
    var x2;
    var p2 = se2(() => {
      "use strict";
      x2 = globalThis.performance ?? (() => {
        let e = Date.now();
        return { now: () => Date.now() - e };
      })();
    });
    var E2;
    var d = se2(() => {
      "use strict";
      E2 = /* @__PURE__ */ __name(() => {
      }, "E");
      E2.prototype = E2;
    });
    var w2;
    var f = se2(() => {
      "use strict";
      w2 = /* @__PURE__ */ __name(class {
        constructor(t) {
          this.value = t;
        }
        deref() {
          return this.value;
        }
      }, "w");
    });
    function un(e, t) {
      var r, n, i, o, s, a2, u, g, T = e.constructor, C = T.precision;
      if (!e.s || !t.s)
        return t.s || (t = new T(e)), U2 ? D(t, C) : t;
      if (u = e.d, g = t.d, s = e.e, i = t.e, u = u.slice(), o = s - i, o) {
        for (o < 0 ? (n = u, o = -o, a2 = g.length) : (n = g, i = s, a2 = u.length), s = Math.ceil(C / N), a2 = s > a2 ? s + 1 : a2 + 1, o > a2 && (o = a2, n.length = 1), n.reverse(); o--; )
          n.push(0);
        n.reverse();
      }
      for (a2 = u.length, o = g.length, a2 - o < 0 && (o = a2, n = g, g = u, u = n), r = 0; o; )
        r = (u[--o] = u[o] + g[o] + r) / Q | 0, u[o] %= Q;
      for (r && (u.unshift(r), ++i), a2 = u.length; u[--a2] == 0; )
        u.pop();
      return t.d = u, t.e = i, U2 ? D(t, C) : t;
    }
    __name(un, "un");
    function le(e, t, r) {
      if (e !== ~~e || e < t || e > r)
        throw Error(Oe + e);
    }
    __name(le, "le");
    function ae(e) {
      var t, r, n, i = e.length - 1, o = "", s = e[0];
      if (i > 0) {
        for (o += s, t = 1; t < i; t++)
          n = e[t] + "", r = N - n.length, r && (o += Pe(r)), o += n;
        s = e[t], n = s + "", r = N - n.length, r && (o += Pe(r));
      } else if (s === 0)
        return "0";
      for (; s % 10 === 0; )
        s /= 10;
      return o + s;
    }
    __name(ae, "ae");
    function cn(e, t) {
      var r, n, i, o, s, a2, u = 0, g = 0, T = e.constructor, C = T.precision;
      if ($(e) > 16)
        throw Error(br + $(e));
      if (!e.s)
        return new T(Z);
      for (t == null ? (U2 = false, a2 = C) : a2 = t, s = new T(0.03125); e.abs().gte(0.1); )
        e = e.times(s), g += 5;
      for (n = Math.log(Se(2, g)) / Math.LN10 * 2 + 5 | 0, a2 += n, r = i = o = new T(Z), T.precision = a2; ; ) {
        if (i = D(i.times(e), a2), r = r.times(++u), s = o.plus(ye(i, r, a2)), ae(s.d).slice(0, a2) === ae(o.d).slice(0, a2)) {
          for (; g--; )
            o = D(o.times(o), a2);
          return T.precision = C, t == null ? (U2 = true, D(o, C)) : o;
        }
        o = s;
      }
    }
    __name(cn, "cn");
    function $(e) {
      for (var t = e.e * N, r = e.d[0]; r >= 10; r /= 10)
        t++;
      return t;
    }
    __name($, "$");
    function yr2(e, t, r) {
      if (t > e.LN10.sd())
        throw U2 = true, r && (e.precision = r), Error(re + "LN10 precision limit exceeded");
      return D(new e(e.LN10), t);
    }
    __name(yr2, "yr");
    function Pe(e) {
      for (var t = ""; e--; )
        t += "0";
      return t;
    }
    __name(Pe, "Pe");
    function it(e, t) {
      var r, n, i, o, s, a2, u, g, T, C = 1, O2 = 10, A = e, M = A.d, S2 = A.constructor, I2 = S2.precision;
      if (A.s < 1)
        throw Error(re + (A.s ? "NaN" : "-Infinity"));
      if (A.eq(Z))
        return new S2(0);
      if (t == null ? (U2 = false, g = I2) : g = t, A.eq(10))
        return t == null && (U2 = true), yr2(S2, g);
      if (g += O2, S2.precision = g, r = ae(M), n = r.charAt(0), o = $(A), Math.abs(o) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
          A = A.times(e), r = ae(A.d), n = r.charAt(0), C++;
        o = $(A), n > 1 ? (A = new S2("0." + r), o++) : A = new S2(n + "." + r.slice(1));
      } else
        return u = yr2(S2, g + 2, I2).times(o + ""), A = it(new S2(n + "." + r.slice(1)), g - O2).plus(u), S2.precision = I2, t == null ? (U2 = true, D(A, I2)) : A;
      for (a2 = s = A = ye(A.minus(Z), A.plus(Z), g), T = D(A.times(A), g), i = 3; ; ) {
        if (s = D(s.times(T), g), u = a2.plus(ye(s, new S2(i), g)), ae(u.d).slice(0, g) === ae(a2.d).slice(0, g))
          return a2 = a2.times(2), o !== 0 && (a2 = a2.plus(yr2(S2, g + 2, I2).times(o + ""))), a2 = ye(a2, new S2(C), g), S2.precision = I2, t == null ? (U2 = true, D(a2, I2)) : a2;
        a2 = u, i += 2;
      }
    }
    __name(it, "it");
    function sn(e, t) {
      var r, n, i;
      for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; )
        ++n;
      for (i = t.length; t.charCodeAt(i - 1) === 48; )
        --i;
      if (t = t.slice(n, i), t) {
        if (i -= n, r = r - n - 1, e.e = Ue(r / N), e.d = [], n = (r + 1) % N, r < 0 && (n += N), n < i) {
          for (n && e.d.push(+t.slice(0, n)), i -= N; n < i; )
            e.d.push(+t.slice(n, n += N));
          t = t.slice(n), n = N - t.length;
        } else
          n -= i;
        for (; n--; )
          t += "0";
        if (e.d.push(+t), U2 && (e.e > Lt || e.e < -Lt))
          throw Error(br + r);
      } else
        e.s = 0, e.e = 0, e.d = [0];
      return e;
    }
    __name(sn, "sn");
    function D(e, t, r) {
      var n, i, o, s, a2, u, g, T, C = e.d;
      for (s = 1, o = C[0]; o >= 10; o /= 10)
        s++;
      if (n = t - s, n < 0)
        n += N, i = t, g = C[T = 0];
      else {
        if (T = Math.ceil((n + 1) / N), o = C.length, T >= o)
          return e;
        for (g = o = C[T], s = 1; o >= 10; o /= 10)
          s++;
        n %= N, i = n - N + s;
      }
      if (r !== void 0 && (o = Se(10, s - i - 1), a2 = g / o % 10 | 0, u = t < 0 || C[T + 1] !== void 0 || g % o, u = r < 4 ? (a2 || u) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : a2 > 5 || a2 == 5 && (r == 4 || u || r == 6 && (n > 0 ? i > 0 ? g / Se(10, s - i) : 0 : C[T - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !C[0])
        return u ? (o = $(e), C.length = 1, t = t - o - 1, C[0] = Se(10, (N - t % N) % N), e.e = Ue(-t / N) || 0) : (C.length = 1, C[0] = e.e = e.s = 0), e;
      if (n == 0 ? (C.length = T, o = 1, T--) : (C.length = T + 1, o = Se(10, N - n), C[T] = i > 0 ? (g / Se(10, s - i) % Se(10, i) | 0) * o : 0), u)
        for (; ; )
          if (T == 0) {
            (C[0] += o) == Q && (C[0] = 1, ++e.e);
            break;
          } else {
            if (C[T] += o, C[T] != Q)
              break;
            C[T--] = 0, o = 1;
          }
      for (n = C.length; C[--n] === 0; )
        C.pop();
      if (U2 && (e.e > Lt || e.e < -Lt))
        throw Error(br + $(e));
      return e;
    }
    __name(D, "D");
    function mn(e, t) {
      var r, n, i, o, s, a2, u, g, T, C, O2 = e.constructor, A = O2.precision;
      if (!e.s || !t.s)
        return t.s ? t.s = -t.s : t = new O2(e), U2 ? D(t, A) : t;
      if (u = e.d, C = t.d, n = t.e, g = e.e, u = u.slice(), s = g - n, s) {
        for (T = s < 0, T ? (r = u, s = -s, a2 = C.length) : (r = C, n = g, a2 = u.length), i = Math.max(Math.ceil(A / N), a2) + 2, s > i && (s = i, r.length = 1), r.reverse(), i = s; i--; )
          r.push(0);
        r.reverse();
      } else {
        for (i = u.length, a2 = C.length, T = i < a2, T && (a2 = i), i = 0; i < a2; i++)
          if (u[i] != C[i]) {
            T = u[i] < C[i];
            break;
          }
        s = 0;
      }
      for (T && (r = u, u = C, C = r, t.s = -t.s), a2 = u.length, i = C.length - a2; i > 0; --i)
        u[a2++] = 0;
      for (i = C.length; i > s; ) {
        if (u[--i] < C[i]) {
          for (o = i; o && u[--o] === 0; )
            u[o] = Q - 1;
          --u[o], u[i] += Q;
        }
        u[i] -= C[i];
      }
      for (; u[--a2] === 0; )
        u.pop();
      for (; u[0] === 0; u.shift())
        --n;
      return u[0] ? (t.d = u, t.e = n, U2 ? D(t, A) : t) : new O2(0);
    }
    __name(mn, "mn");
    function ke(e, t, r) {
      var n, i = $(e), o = ae(e.d), s = o.length;
      return t ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Pe(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + Pe(-i - 1) + o, r && (n = r - s) > 0 && (o += Pe(n))) : i >= s ? (o += Pe(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Pe(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Pe(n))), e.s < 0 ? "-" + o : o;
    }
    __name(ke, "ke");
    function an(e, t) {
      if (e.length > t)
        return e.length = t, true;
    }
    __name(an, "an");
    function pn2(e) {
      var t, r, n;
      function i(o) {
        var s = this;
        if (!(s instanceof i))
          return new i(o);
        if (s.constructor = i, o instanceof i) {
          s.s = o.s, s.e = o.e, s.d = (o = o.d) ? o.slice() : o;
          return;
        }
        if (typeof o == "number") {
          if (o * 0 !== 0)
            throw Error(Oe + o);
          if (o > 0)
            s.s = 1;
          else if (o < 0)
            o = -o, s.s = -1;
          else {
            s.s = 0, s.e = 0, s.d = [0];
            return;
          }
          if (o === ~~o && o < 1e7) {
            s.e = 0, s.d = [o];
            return;
          }
          return sn(s, o.toString());
        } else if (typeof o != "string")
          throw Error(Oe + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s.s = -1) : s.s = 1, Zo2.test(o))
          sn(s, o);
        else
          throw Error(Oe + o);
      }
      __name(i, "i");
      if (i.prototype = R, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = pn2, i.config = i.set = es, e === void 0 && (e = {}), e)
        for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; )
          e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
      return i.config(e), i;
    }
    __name(pn2, "pn");
    function es(e) {
      if (!e || typeof e != "object")
        throw Error(re + "Object expected");
      var t, r, n, i = ["precision", 1, Ne, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (t = 0; t < i.length; t += 3)
        if ((n = e[r = i[t]]) !== void 0)
          if (Ue(n) === n && n >= i[t + 1] && n <= i[t + 2])
            this[r] = n;
          else
            throw Error(Oe + r + ": " + n);
      if ((n = e[r = "LN10"]) !== void 0)
        if (n == Math.LN10)
          this[r] = new this(n);
        else
          throw Error(Oe + r + ": " + n);
      return this;
    }
    __name(es, "es");
    var Ne;
    var Xo;
    var wr;
    var U2;
    var re;
    var Oe;
    var br;
    var Ue;
    var Se;
    var Zo2;
    var Z;
    var Q;
    var N;
    var ln;
    var Lt;
    var R;
    var ye;
    var wr;
    var _t;
    var dn = se2(() => {
      "use strict";
      c();
      m2();
      p2();
      d();
      f();
      l();
      Ne = 1e9, Xo = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, U2 = true, re = "[DecimalError] ", Oe = re + "Invalid argument: ", br = re + "Exponent out of range: ", Ue = Math.floor, Se = Math.pow, Zo2 = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Q = 1e7, N = 7, ln = 9007199254740991, Lt = Ue(ln / N), R = {};
      R.absoluteValue = R.abs = function() {
        var e = new this.constructor(this);
        return e.s && (e.s = 1), e;
      };
      R.comparedTo = R.cmp = function(e) {
        var t, r, n, i, o = this;
        if (e = new o.constructor(e), o.s !== e.s)
          return o.s || -e.s;
        if (o.e !== e.e)
          return o.e > e.e ^ o.s < 0 ? 1 : -1;
        for (n = o.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
          if (o.d[t] !== e.d[t])
            return o.d[t] > e.d[t] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
      };
      R.decimalPlaces = R.dp = function() {
        var e = this, t = e.d.length - 1, r = (t - e.e) * N;
        if (t = e.d[t], t)
          for (; t % 10 == 0; t /= 10)
            r--;
        return r < 0 ? 0 : r;
      };
      R.dividedBy = R.div = function(e) {
        return ye(this, new this.constructor(e));
      };
      R.dividedToIntegerBy = R.idiv = function(e) {
        var t = this, r = t.constructor;
        return D(ye(t, new r(e), 0, 1), r.precision);
      };
      R.equals = R.eq = function(e) {
        return !this.cmp(e);
      };
      R.exponent = function() {
        return $(this);
      };
      R.greaterThan = R.gt = function(e) {
        return this.cmp(e) > 0;
      };
      R.greaterThanOrEqualTo = R.gte = function(e) {
        return this.cmp(e) >= 0;
      };
      R.isInteger = R.isint = function() {
        return this.e > this.d.length - 2;
      };
      R.isNegative = R.isneg = function() {
        return this.s < 0;
      };
      R.isPositive = R.ispos = function() {
        return this.s > 0;
      };
      R.isZero = function() {
        return this.s === 0;
      };
      R.lessThan = R.lt = function(e) {
        return this.cmp(e) < 0;
      };
      R.lessThanOrEqualTo = R.lte = function(e) {
        return this.cmp(e) < 1;
      };
      R.logarithm = R.log = function(e) {
        var t, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (e === void 0)
          e = new n(10);
        else if (e = new n(e), e.s < 1 || e.eq(Z))
          throw Error(re + "NaN");
        if (r.s < 1)
          throw Error(re + (r.s ? "NaN" : "-Infinity"));
        return r.eq(Z) ? new n(0) : (U2 = false, t = ye(it(r, o), it(e, o), o), U2 = true, D(t, i));
      };
      R.minus = R.sub = function(e) {
        var t = this;
        return e = new t.constructor(e), t.s == e.s ? mn(t, e) : un(t, (e.s = -e.s, e));
      };
      R.modulo = R.mod = function(e) {
        var t, r = this, n = r.constructor, i = n.precision;
        if (e = new n(e), !e.s)
          throw Error(re + "NaN");
        return r.s ? (U2 = false, t = ye(r, e, 0, 1).times(e), U2 = true, r.minus(t)) : D(new n(r), i);
      };
      R.naturalExponential = R.exp = function() {
        return cn(this);
      };
      R.naturalLogarithm = R.ln = function() {
        return it(this);
      };
      R.negated = R.neg = function() {
        var e = new this.constructor(this);
        return e.s = -e.s || 0, e;
      };
      R.plus = R.add = function(e) {
        var t = this;
        return e = new t.constructor(e), t.s == e.s ? un(t, e) : mn(t, (e.s = -e.s, e));
      };
      R.precision = R.sd = function(e) {
        var t, r, n, i = this;
        if (e !== void 0 && e !== !!e && e !== 1 && e !== 0)
          throw Error(Oe + e);
        if (t = $(i) + 1, n = i.d.length - 1, r = n * N + 1, n = i.d[n], n) {
          for (; n % 10 == 0; n /= 10)
            r--;
          for (n = i.d[0]; n >= 10; n /= 10)
            r++;
        }
        return e && t > r ? t : r;
      };
      R.squareRoot = R.sqrt = function() {
        var e, t, r, n, i, o, s, a2 = this, u = a2.constructor;
        if (a2.s < 1) {
          if (!a2.s)
            return new u(0);
          throw Error(re + "NaN");
        }
        for (e = $(a2), U2 = false, i = Math.sqrt(+a2), i == 0 || i == 1 / 0 ? (t = ae(a2.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = Ue((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new u(t)) : n = new u(i.toString()), r = u.precision, i = s = r + 3; ; )
          if (o = n, n = o.plus(ye(a2, o, s + 2)).times(0.5), ae(o.d).slice(0, s) === (t = ae(n.d)).slice(0, s)) {
            if (t = t.slice(s - 3, s + 1), i == s && t == "4999") {
              if (D(o, r + 1, 0), o.times(o).eq(a2)) {
                n = o;
                break;
              }
            } else if (t != "9999")
              break;
            s += 4;
          }
        return U2 = true, D(n, r);
      };
      R.times = R.mul = function(e) {
        var t, r, n, i, o, s, a2, u, g, T = this, C = T.constructor, O2 = T.d, A = (e = new C(e)).d;
        if (!T.s || !e.s)
          return new C(0);
        for (e.s *= T.s, r = T.e + e.e, u = O2.length, g = A.length, u < g && (o = O2, O2 = A, A = o, s = u, u = g, g = s), o = [], s = u + g, n = s; n--; )
          o.push(0);
        for (n = g; --n >= 0; ) {
          for (t = 0, i = u + n; i > n; )
            a2 = o[i] + A[n] * O2[i - n - 1] + t, o[i--] = a2 % Q | 0, t = a2 / Q | 0;
          o[i] = (o[i] + t) % Q | 0;
        }
        for (; !o[--s]; )
          o.pop();
        return t ? ++r : o.shift(), e.d = o, e.e = r, U2 ? D(e, C.precision) : e;
      };
      R.toDecimalPlaces = R.todp = function(e, t) {
        var r = this, n = r.constructor;
        return r = new n(r), e === void 0 ? r : (le(e, 0, Ne), t === void 0 ? t = n.rounding : le(t, 0, 8), D(r, e + $(r) + 1, t));
      };
      R.toExponential = function(e, t) {
        var r, n = this, i = n.constructor;
        return e === void 0 ? r = ke(n, true) : (le(e, 0, Ne), t === void 0 ? t = i.rounding : le(t, 0, 8), n = D(new i(n), e + 1, t), r = ke(n, true, e + 1)), r;
      };
      R.toFixed = function(e, t) {
        var r, n, i = this, o = i.constructor;
        return e === void 0 ? ke(i) : (le(e, 0, Ne), t === void 0 ? t = o.rounding : le(t, 0, 8), n = D(new o(i), e + $(i) + 1, t), r = ke(n.abs(), false, e + $(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
      };
      R.toInteger = R.toint = function() {
        var e = this, t = e.constructor;
        return D(new t(e), $(e) + 1, t.rounding);
      };
      R.toNumber = function() {
        return +this;
      };
      R.toPower = R.pow = function(e) {
        var t, r, n, i, o, s, a2 = this, u = a2.constructor, g = 12, T = +(e = new u(e));
        if (!e.s)
          return new u(Z);
        if (a2 = new u(a2), !a2.s) {
          if (e.s < 1)
            throw Error(re + "Infinity");
          return a2;
        }
        if (a2.eq(Z))
          return a2;
        if (n = u.precision, e.eq(Z))
          return D(a2, n);
        if (t = e.e, r = e.d.length - 1, s = t >= r, o = a2.s, s) {
          if ((r = T < 0 ? -T : T) <= ln) {
            for (i = new u(Z), t = Math.ceil(n / N + 4), U2 = false; r % 2 && (i = i.times(a2), an(i.d, t)), r = Ue(r / 2), r !== 0; )
              a2 = a2.times(a2), an(a2.d, t);
            return U2 = true, e.s < 0 ? new u(Z).div(i) : D(i, n);
          }
        } else if (o < 0)
          throw Error(re + "NaN");
        return o = o < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, a2.s = 1, U2 = false, i = e.times(it(a2, n + g)), U2 = true, i = cn(i), i.s = o, i;
      };
      R.toPrecision = function(e, t) {
        var r, n, i = this, o = i.constructor;
        return e === void 0 ? (r = $(i), n = ke(i, r <= o.toExpNeg || r >= o.toExpPos)) : (le(e, 1, Ne), t === void 0 ? t = o.rounding : le(t, 0, 8), i = D(new o(i), e, t), r = $(i), n = ke(i, e <= r || r <= o.toExpNeg, e)), n;
      };
      R.toSignificantDigits = R.tosd = function(e, t) {
        var r = this, n = r.constructor;
        return e === void 0 ? (e = n.precision, t = n.rounding) : (le(e, 1, Ne), t === void 0 ? t = n.rounding : le(t, 0, 8)), D(new n(r), e, t);
      };
      R.toString = R.valueOf = R.val = R.toJSON = R[Symbol.for("nodejs.util.inspect.custom")] = function() {
        var e = this, t = $(e), r = e.constructor;
        return ke(e, t <= r.toExpNeg || t >= r.toExpPos);
      };
      ye = function() {
        function e(n, i) {
          var o, s = 0, a2 = n.length;
          for (n = n.slice(); a2--; )
            o = n[a2] * i + s, n[a2] = o % Q | 0, s = o / Q | 0;
          return s && n.unshift(s), n;
        }
        __name(e, "e");
        function t(n, i, o, s) {
          var a2, u;
          if (o != s)
            u = o > s ? 1 : -1;
          else
            for (a2 = u = 0; a2 < o; a2++)
              if (n[a2] != i[a2]) {
                u = n[a2] > i[a2] ? 1 : -1;
                break;
              }
          return u;
        }
        __name(t, "t");
        function r(n, i, o) {
          for (var s = 0; o--; )
            n[o] -= s, s = n[o] < i[o] ? 1 : 0, n[o] = s * Q + n[o] - i[o];
          for (; !n[0] && n.length > 1; )
            n.shift();
        }
        __name(r, "r");
        return function(n, i, o, s) {
          var a2, u, g, T, C, O2, A, M, S2, I2, ne, z2, _e2, k, Ae, fr, ie, St2, Ot = n.constructor, No = n.s == i.s ? 1 : -1, oe = n.d, q = i.d;
          if (!n.s)
            return new Ot(n);
          if (!i.s)
            throw Error(re + "Division by zero");
          for (u = n.e - i.e, ie = q.length, Ae = oe.length, A = new Ot(No), M = A.d = [], g = 0; q[g] == (oe[g] || 0); )
            ++g;
          if (q[g] > (oe[g] || 0) && --u, o == null ? z2 = o = Ot.precision : s ? z2 = o + ($(n) - $(i)) + 1 : z2 = o, z2 < 0)
            return new Ot(0);
          if (z2 = z2 / N + 2 | 0, g = 0, ie == 1)
            for (T = 0, q = q[0], z2++; (g < Ae || T) && z2--; g++)
              _e2 = T * Q + (oe[g] || 0), M[g] = _e2 / q | 0, T = _e2 % q | 0;
          else {
            for (T = Q / (q[0] + 1) | 0, T > 1 && (q = e(q, T), oe = e(oe, T), ie = q.length, Ae = oe.length), k = ie, S2 = oe.slice(0, ie), I2 = S2.length; I2 < ie; )
              S2[I2++] = 0;
            St2 = q.slice(), St2.unshift(0), fr = q[0], q[1] >= Q / 2 && ++fr;
            do
              T = 0, a2 = t(q, S2, ie, I2), a2 < 0 ? (ne = S2[0], ie != I2 && (ne = ne * Q + (S2[1] || 0)), T = ne / fr | 0, T > 1 ? (T >= Q && (T = Q - 1), C = e(q, T), O2 = C.length, I2 = S2.length, a2 = t(C, S2, O2, I2), a2 == 1 && (T--, r(C, ie < O2 ? St2 : q, O2))) : (T == 0 && (a2 = T = 1), C = q.slice()), O2 = C.length, O2 < I2 && C.unshift(0), r(S2, C, I2), a2 == -1 && (I2 = S2.length, a2 = t(q, S2, ie, I2), a2 < 1 && (T++, r(S2, ie < I2 ? St2 : q, I2))), I2 = S2.length) : a2 === 0 && (T++, S2 = [0]), M[g++] = T, a2 && S2[0] ? S2[I2++] = oe[k] || 0 : (S2 = [oe[k]], I2 = 1);
            while ((k++ < Ae || S2[0] !== void 0) && z2--);
          }
          return M[0] || M.shift(), A.e = u, D(A, s ? o + $(A) + 1 : o);
        };
      }();
      wr = pn2(Xo);
      Z = new wr(1);
      _t = wr;
    });
    var v2;
    var ue;
    var l = se2(() => {
      "use strict";
      dn();
      v2 = /* @__PURE__ */ __name(class extends _t {
        static isDecimal(t) {
          return t instanceof _t;
        }
        static random(t = 20) {
          {
            let n = crypto.getRandomValues(new Uint8Array(t)).reduce((i, o) => i + o, "");
            return new _t(`0.${n.slice(0, t)}`);
          }
        }
      }, "v"), ue = v2;
    });
    function ts2() {
      return false;
    }
    __name(ts2, "ts");
    var rs2;
    var ns2;
    var yn;
    var bn = se2(() => {
      "use strict";
      c();
      m2();
      p2();
      d();
      f();
      l();
      rs2 = {}, ns2 = { existsSync: ts2, promises: rs2 }, yn = ns2;
    });
    function us(...e) {
      return e.join("/");
    }
    __name(us, "us");
    function cs(...e) {
      return e.join("/");
    }
    __name(cs, "cs");
    var In;
    var ms2;
    var ps;
    var st;
    var Ln2 = se2(() => {
      "use strict";
      c();
      m2();
      p2();
      d();
      f();
      l();
      In = "/", ms2 = { sep: In }, ps = { resolve: us, posix: ms2, join: cs, sep: In }, st = ps;
    });
    var Ut;
    var Dn = se2(() => {
      "use strict";
      c();
      m2();
      p2();
      d();
      f();
      l();
      Ut = /* @__PURE__ */ __name(class {
        constructor() {
          this.events = {};
        }
        on(t, r) {
          return this.events[t] || (this.events[t] = []), this.events[t].push(r), this;
        }
        emit(t, ...r) {
          return this.events[t] ? (this.events[t].forEach((n) => {
            n(...r);
          }), true) : false;
        }
      }, "Ut");
    });
    var Nn = De((Wc2, Fn) => {
      "use strict";
      c();
      m2();
      p2();
      d();
      f();
      l();
      Fn.exports = (e, t = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof e != "string")
          throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof t != "number")
          throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
        if (typeof r.indent != "string")
          throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (t === 0)
          return e;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, r.indent.repeat(t));
      };
    });
    var Bn2 = De((am, qn) => {
      "use strict";
      c();
      m2();
      p2();
      d();
      f();
      l();
      qn.exports = ({ onlyFirst: e = false } = {}) => {
        let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(t, e ? void 0 : "g");
      };
    });
    var Vn = De((fm, $n) => {
      "use strict";
      c();
      m2();
      p2();
      d();
      f();
      l();
      var bs2 = Bn2();
      $n.exports = (e) => typeof e == "string" ? e.replace(bs2(), "") : e;
    });
    var kr = De((Mf, Jn) => {
      "use strict";
      c();
      m2();
      p2();
      d();
      f();
      l();
      Jn.exports = function() {
        function e(t, r, n, i, o) {
          return t < r || n < r ? t > n ? n + 1 : t + 1 : i === o ? r : r + 1;
        }
        __name(e, "e");
        return function(t, r) {
          if (t === r)
            return 0;
          if (t.length > r.length) {
            var n = t;
            t = r, r = n;
          }
          for (var i = t.length, o = r.length; i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1); )
            i--, o--;
          for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); )
            s++;
          if (i -= s, o -= s, i === 0 || o < 3)
            return o;
          var a2 = 0, u, g, T, C, O2, A, M, S2, I2, ne, z2, _e2, k = [];
          for (u = 0; u < i; u++)
            k.push(u + 1), k.push(t.charCodeAt(s + u));
          for (var Ae = k.length - 1; a2 < o - 3; )
            for (I2 = r.charCodeAt(s + (g = a2)), ne = r.charCodeAt(s + (T = a2 + 1)), z2 = r.charCodeAt(s + (C = a2 + 2)), _e2 = r.charCodeAt(s + (O2 = a2 + 3)), A = a2 += 4, u = 0; u < Ae; u += 2)
              M = k[u], S2 = k[u + 1], g = e(M, g, T, I2, S2), T = e(g, T, C, ne, S2), C = e(T, C, O2, z2, S2), A = e(C, O2, A, _e2, S2), k[u] = A, O2 = C, C = T, T = g, g = M;
          for (; a2 < o; )
            for (I2 = r.charCodeAt(s + (g = a2)), A = ++a2, u = 0; u < Ae; u += 2)
              M = k[u], k[u] = A = e(M, g, A, I2, k[u + 1]), g = M;
          return A;
        };
      }();
    });
    var wi2 = De((oE, fa) => {
      fa.exports = { name: "@prisma/engines-version", version: "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "605197351a3c8bdd595af2d2a9bc3025bca48ea2" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.34", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var Ei = De(() => {
      "use strict";
      c();
      m2();
      p2();
      d();
      f();
      l();
    });
    var ul = {};
    Mt(ul, { Debug: () => Tr, Decimal: () => ue, Extensions: () => Er, MetricsClient: () => Ze, NotFoundError: () => we, PrismaClientInitializationError: () => L, PrismaClientKnownRequestError: () => J, PrismaClientRustPanicError: () => Ee, PrismaClientUnknownRequestError: () => G, PrismaClientValidationError: () => j, Public: () => xr, Sql: () => X, defineDmmfProperty: () => hi, deserializeJsonResponse: () => $e2, dmmfToRuntimeDataModel: () => gi, empty: () => Pi, getPrismaClient: () => _o, getRuntime: () => Ce2, join: () => xi, makeStrictEnum: () => Do, makeTypedQueryFactory: () => yi, objectEnumValues: () => Wt2, raw: () => Vr, serializeJsonQuery: () => Zt, skip: () => Xt, sqltag: () => jr, warnEnvConflicts: () => void 0, warnOnce: () => ct });
    module.exports = jo(ul);
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Er = {};
    Mt(Er, { defineExtension: () => fn, getExtensionContext: () => gn });
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    function fn(e) {
      return typeof e == "function" ? e : (t) => t.$extends(e);
    }
    __name(fn, "fn");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function gn(e) {
      return e;
    }
    __name(gn, "gn");
    var xr = {};
    Mt(xr, { validator: () => hn2 });
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    function hn2(...e) {
      return (t) => t;
    }
    __name(hn2, "hn");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Pr;
    var wn;
    var En2;
    var xn;
    var Pn = true;
    typeof h < "u" && ({ FORCE_COLOR: Pr, NODE_DISABLE_COLORS: wn, NO_COLOR: En2, TERM: xn } = h.env || {}, Pn = h.stdout && h.stdout.isTTY);
    var is = { enabled: !wn && En2 == null && xn !== "dumb" && (Pr != null && Pr !== "0" || Pn) };
    function F(e, t) {
      let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${t}m`;
      return function(o) {
        return !is.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(F, "F");
    var fu = F(0, 0);
    var Dt = F(1, 22);
    var Ft = F(2, 22);
    var gu = F(3, 23);
    var vn = F(4, 24);
    var hu2 = F(7, 27);
    var yu = F(8, 28);
    var bu = F(9, 29);
    var wu = F(30, 39);
    var qe = F(31, 39);
    var Tn2 = F(32, 39);
    var Cn3 = F(33, 39);
    var Rn = F(34, 39);
    var Eu = F(35, 39);
    var An3 = F(36, 39);
    var xu = F(37, 39);
    var Sn = F(90, 39);
    var Pu = F(90, 39);
    var vu = F(40, 49);
    var Tu = F(41, 49);
    var Cu = F(42, 49);
    var Ru = F(43, 49);
    var Au = F(44, 49);
    var Su = F(45, 49);
    var Ou = F(46, 49);
    var ku2 = F(47, 49);
    c();
    m2();
    p2();
    d();
    f();
    l();
    var os = 100;
    var On = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Nt = [];
    var kn = Date.now();
    var ss2 = 0;
    var vr = typeof h < "u" ? h.env : {};
    globalThis.DEBUG ??= vr.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= vr.DEBUG_COLORS ? vr.DEBUG_COLORS === "true" : true;
    var ot = { enable(e) {
      typeof e == "string" && (globalThis.DEBUG = e);
    }, disable() {
      let e = globalThis.DEBUG;
      return globalThis.DEBUG = "", e;
    }, enabled(e) {
      let t = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = t.some((i) => i === "" || i[0] === "-" ? false : e.match(RegExp(i.split("*").join(".*") + "$"))), n = t.some((i) => i === "" || i[0] !== "-" ? false : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: (...e) => {
      let [t, r, ...n] = e;
      (console.warn ?? console.log)(`${t} ${r}`, ...n);
    }, formatters: {} };
    function as(e) {
      let t = { color: On[ss2++ % On.length], enabled: ot.enabled(e), namespace: e, log: ot.log, extend: () => {
      } }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a2 } = t;
        if (n.length !== 0 && Nt.push([o, ...n]), Nt.length > os && Nt.shift(), ot.enabled(o) || i) {
          let u = n.map((T) => typeof T == "string" ? T : ls2(T)), g = `+${Date.now() - kn}ms`;
          kn = Date.now(), a2(o, ...u, g);
        }
      }, "r");
      return new Proxy(r, { get: (n, i) => t[i], set: (n, i, o) => t[i] = o });
    }
    __name(as, "as");
    var Tr = new Proxy(as, { get: (e, t) => ot[t], set: (e, t, r) => ot[t] = r });
    function ls2(e, t = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(e, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i))
            return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint")
          return i.toString();
        return i;
      }, t);
    }
    __name(ls2, "ls");
    function Mn() {
      Nt.length = 0;
    }
    __name(Mn, "Mn");
    var ee = Tr;
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Cr = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    c();
    m2();
    p2();
    d();
    f();
    l();
    var _n2 = "library";
    function at(e) {
      let t = ds();
      return t || (e?.config.engineType === "library" ? "library" : e?.config.engineType === "binary" ? "binary" : _n2);
    }
    __name(at, "at");
    function ds() {
      let e = h.env.PRISMA_CLIENT_ENGINE_TYPE;
      return e === "library" ? "library" : e === "binary" ? "binary" : void 0;
    }
    __name(ds, "ds");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Me;
    ((t) => {
      let e;
      ((k) => (k.findUnique = "findUnique", k.findUniqueOrThrow = "findUniqueOrThrow", k.findFirst = "findFirst", k.findFirstOrThrow = "findFirstOrThrow", k.findMany = "findMany", k.create = "create", k.createMany = "createMany", k.createManyAndReturn = "createManyAndReturn", k.update = "update", k.updateMany = "updateMany", k.upsert = "upsert", k.delete = "delete", k.deleteMany = "deleteMany", k.groupBy = "groupBy", k.count = "count", k.aggregate = "aggregate", k.findRaw = "findRaw", k.aggregateRaw = "aggregateRaw"))(e = t.ModelAction ||= {});
    })(Me ||= {});
    var ut = {};
    Mt(ut, { error: () => hs, info: () => gs2, log: () => fs, query: () => ys2, should: () => Un, tags: () => lt, warn: () => Rr });
    c();
    m2();
    p2();
    d();
    f();
    l();
    var lt = { error: qe("prisma:error"), warn: Cn3("prisma:warn"), info: An3("prisma:info"), query: Rn("prisma:query") };
    var Un = { warn: () => !h.env.PRISMA_DISABLE_WARNINGS };
    function fs(...e) {
      console.log(...e);
    }
    __name(fs, "fs");
    function Rr(e, ...t) {
      Un.warn() && console.warn(`${lt.warn} ${e}`, ...t);
    }
    __name(Rr, "Rr");
    function gs2(e, ...t) {
      console.info(`${lt.info} ${e}`, ...t);
    }
    __name(gs2, "gs");
    function hs(e, ...t) {
      console.error(`${lt.error} ${e}`, ...t);
    }
    __name(hs, "hs");
    function ys2(e, ...t) {
      console.log(`${lt.query} ${e}`, ...t);
    }
    __name(ys2, "ys");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function qt(e, t) {
      if (!e)
        throw new Error(`${t}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(qt, "qt");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function be(e, t) {
      throw new Error(t);
    }
    __name(be, "be");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Ar(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
    __name(Ar, "Ar");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Sr = /* @__PURE__ */ __name((e, t) => e.reduce((r, n) => (r[t(n)] = n, r), {}), "Sr");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Be(e, t) {
      let r = {};
      for (let n of Object.keys(e))
        r[n] = t(e[n], n);
      return r;
    }
    __name(Be, "Be");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Or(e, t) {
      if (e.length === 0)
        return;
      let r = e[0];
      for (let n = 1; n < e.length; n++)
        t(r, e[n]) < 0 && (r = e[n]);
      return r;
    }
    __name(Or, "Or");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function K(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(K, "K");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var jn = /* @__PURE__ */ new Set();
    var ct = /* @__PURE__ */ __name((e, t, ...r) => {
      jn.has(e) || (jn.add(e), Rr(t, ...r));
    }, "ct");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var J = /* @__PURE__ */ __name(class extends Error {
      constructor(t, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(t), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    }, "J");
    K(J, "PrismaClientKnownRequestError");
    var we = /* @__PURE__ */ __name(class extends J {
      constructor(t, r) {
        super(t, { code: "P2025", clientVersion: r }), this.name = "NotFoundError";
      }
    }, "we");
    K(we, "NotFoundError");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var L = /* @__PURE__ */ __name(class e extends Error {
      constructor(t, r, n) {
        super(t), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(e);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    }, "e");
    K(L, "PrismaClientInitializationError");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Ee = /* @__PURE__ */ __name(class extends Error {
      constructor(t, r) {
        super(t), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    }, "Ee");
    K(Ee, "PrismaClientRustPanicError");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var G = /* @__PURE__ */ __name(class extends Error {
      constructor(t, { clientVersion: r, batchRequestIdx: n }) {
        super(t), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    }, "G");
    K(G, "PrismaClientUnknownRequestError");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var j = /* @__PURE__ */ __name(class extends Error {
      constructor(r, { clientVersion: n }) {
        super(r);
        this.name = "PrismaClientValidationError";
        this.clientVersion = n;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    }, "j");
    K(j, "PrismaClientValidationError");
    c();
    m2();
    p2();
    d();
    f();
    l();
    l();
    function $e2(e) {
      return e === null ? e : Array.isArray(e) ? e.map($e2) : typeof e == "object" ? ws2(e) ? Es2(e) : Be(e, $e2) : e;
    }
    __name($e2, "$e");
    function ws2(e) {
      return e !== null && typeof e == "object" && typeof e.$type == "string";
    }
    __name(ws2, "ws");
    function Es2({ $type: e, value: t }) {
      switch (e) {
        case "BigInt":
          return BigInt(t);
        case "Bytes":
          return b.from(t, "base64");
        case "DateTime":
          return new Date(t);
        case "Decimal":
          return new ue(t);
        case "Json":
          return JSON.parse(t);
        default:
          be(t, "Unknown tagged value");
      }
    }
    __name(Es2, "Es");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Ve2(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(Ve2, "Ve");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function je(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    __name(je, "je");
    function Bt2(e) {
      return e.toString() !== "Invalid Date";
    }
    __name(Bt2, "Bt");
    c();
    m2();
    p2();
    d();
    f();
    l();
    l();
    function Qe2(e) {
      return v2.isDecimal(e) ? true : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
    }
    __name(Qe2, "Qe");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var xs2 = Fe(Nn());
    var Ps = { red: qe, gray: Sn, dim: Ft, bold: Dt, underline: vn, highlightSource: (e) => e.highlight() };
    var vs = { red: (e) => e, gray: (e) => e, dim: (e) => e, bold: (e) => e, underline: (e) => e, highlightSource: (e) => e };
    function Ts2({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${t}()`, message: e, isPanic: r ?? false, callArguments: n };
    }
    __name(Ts2, "Ts");
    function Cs2({ functionName: e, location: t, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a2 = [""], u = t ? " in" : ":";
      if (n ? (a2.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a2.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${u}`))) : a2.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${u}`)), t && a2.push(s.underline(Rs(t))), i) {
        a2.push("");
        let g = [i.toString()];
        o && (g.push(o), g.push(s.dim(")"))), a2.push(g.join("")), o && a2.push("");
      } else
        a2.push(""), o && a2.push(o), a2.push("");
      return a2.push(r), a2.join(`
`);
    }
    __name(Cs2, "Cs");
    function Rs(e) {
      let t = [e.fileName];
      return e.lineNumber && t.push(String(e.lineNumber)), e.columnNumber && t.push(String(e.columnNumber)), t.join(":");
    }
    __name(Rs, "Rs");
    function Je(e) {
      let t = e.showColors ? Ps : vs, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(e, t) : r = Ts2(e), Cs2(r, t);
    }
    __name(Je, "Je");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Yn = Fe(kr());
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Kn2(e, t, r) {
      let n = Hn(e), i = As2(n), o = Os2(i);
      o ? $t2(o, t, r) : t.addErrorMessage(() => "Unknown error");
    }
    __name(Kn2, "Kn");
    function Hn(e) {
      return e.errors.flatMap((t) => t.kind === "Union" ? Hn(t) : [t]);
    }
    __name(Hn, "Hn");
    function As2(e) {
      let t = /* @__PURE__ */ new Map(), r = [];
      for (let n of e) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = t.get(i);
        o ? t.set(i, { ...n, argument: { ...n.argument, typeNames: Ss(o.argument.typeNames, n.argument.typeNames) } }) : t.set(i, n);
      }
      return r.push(...t.values()), r;
    }
    __name(As2, "As");
    function Ss(e, t) {
      return [...new Set(e.concat(t))];
    }
    __name(Ss, "Ss");
    function Os2(e) {
      return Or(e, (t, r) => {
        let n = Gn(t), i = Gn(r);
        return n !== i ? n - i : Wn(t) - Wn(r);
      });
    }
    __name(Os2, "Os");
    function Gn(e) {
      let t = 0;
      return Array.isArray(e.selectionPath) && (t += e.selectionPath.length), Array.isArray(e.argumentPath) && (t += e.argumentPath.length), t;
    }
    __name(Gn, "Gn");
    function Wn(e) {
      switch (e.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    __name(Wn, "Wn");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var te = /* @__PURE__ */ __name(class {
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.isRequired = false;
      }
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.addMarginSymbol(r(this.isRequired ? "+" : "?")), t.write(r(this.name)), this.isRequired || t.write(r("?")), t.write(r(": ")), typeof this.value == "string" ? t.write(r(this.value)) : t.write(this.value);
      }
    }, "te");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Ge2 = /* @__PURE__ */ __name(class {
      constructor(t = 0, r) {
        this.context = r;
        this.lines = [];
        this.currentLine = "";
        this.currentIndent = 0;
        this.currentIndent = t;
      }
      write(t) {
        return typeof t == "string" ? this.currentLine += t : t.write(this), this;
      }
      writeJoined(t, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++)
          n(r[o], this), o !== i && this.write(t);
        return this;
      }
      writeLine(t) {
        return this.write(t).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let t = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, t?.(), this;
      }
      withIndent(t) {
        return this.indent(), t(this), this.unindent(), this;
      }
      afterNextNewline(t) {
        return this.afterNextNewLineCallback = t, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(t) {
        return this.marginSymbol = t, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let t = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
      }
    }, "Ge");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Vt2 = /* @__PURE__ */ __name(class {
      constructor(t) {
        this.value = t;
      }
      write(t) {
        t.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    }, "Vt");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var jt = /* @__PURE__ */ __name((e) => e, "jt");
    var Qt = { bold: jt, red: jt, green: jt, dim: jt, enabled: false };
    var zn = { bold: Dt, red: qe, green: Tn2, dim: Ft, enabled: true };
    var We = { write(e) {
      e.writeLine(",");
    } };
    c();
    m2();
    p2();
    d();
    f();
    l();
    var ce = /* @__PURE__ */ __name(class {
      constructor(t) {
        this.contents = t;
        this.isUnderlined = false;
        this.color = (t2) => t2;
      }
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(t) {
        return this.color = t, this;
      }
      write(t) {
        let r = t.getCurrentLineLength();
        t.write(this.color(this.contents)), this.isUnderlined && t.afterNextNewline(() => {
          t.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    }, "ce");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var ve = /* @__PURE__ */ __name(class {
      constructor() {
        this.hasError = false;
      }
      markAsError() {
        return this.hasError = true, this;
      }
    }, "ve");
    var Ke = /* @__PURE__ */ __name(class extends ve {
      constructor() {
        super(...arguments);
        this.items = [];
      }
      addItem(r) {
        return this.items.push(new Vt2(r)), this;
      }
      getField(r) {
        return this.items[r];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
      }
      write(r) {
        if (this.items.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithItems(r);
      }
      writeEmpty(r) {
        let n = new ce("[]");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithItems(r) {
        let { colors: n } = r.context;
        r.writeLine("[").withIndent(() => r.writeJoined(We, this.items).newLine()).write("]"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(n.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    }, "Ke");
    var He2 = /* @__PURE__ */ __name(class e extends ve {
      constructor() {
        super(...arguments);
        this.fields = {};
        this.suggestions = [];
      }
      addField(r) {
        this.fields[r.name] = r;
      }
      addSuggestion(r) {
        this.suggestions.push(r);
      }
      getField(r) {
        return this.fields[r];
      }
      getDeepField(r) {
        let [n, ...i] = r, o = this.getField(n);
        if (!o)
          return;
        let s = o;
        for (let a2 of i) {
          let u;
          if (s.value instanceof e ? u = s.value.getField(a2) : s.value instanceof Ke && (u = s.value.getField(Number(a2))), !u)
            return;
          s = u;
        }
        return s;
      }
      getDeepFieldValue(r) {
        return r.length === 0 ? this : this.getDeepField(r)?.value;
      }
      hasField(r) {
        return !!this.getField(r);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(r) {
        delete this.fields[r];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(r) {
        return this.getField(r)?.value;
      }
      getDeepSubSelectionValue(r) {
        let n = this;
        for (let i of r) {
          if (!(n instanceof e))
            return;
          let o = n.getSubSelectionValue(i);
          if (!o)
            return;
          n = o;
        }
        return n;
      }
      getDeepSelectionParent(r) {
        let n = this.getSelectionParent();
        if (!n)
          return;
        let i = n;
        for (let o of r) {
          let s = i.value.getFieldValue(o);
          if (!s || !(s instanceof e))
            return;
          let a2 = s.getSelectionParent();
          if (!a2)
            return;
          i = a2;
        }
        return i;
      }
      getSelectionParent() {
        let r = this.getField("select")?.value.asObject();
        if (r)
          return { kind: "select", value: r };
        let n = this.getField("include")?.value.asObject();
        if (n)
          return { kind: "include", value: n };
      }
      getSubSelectionValue(r) {
        return this.getSelectionParent()?.value.fields[r].value;
      }
      getPrintWidth() {
        let r = Object.values(this.fields);
        return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2;
      }
      write(r) {
        let n = Object.values(this.fields);
        if (n.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithContents(r, n);
      }
      asObject() {
        return this;
      }
      writeEmpty(r) {
        let n = new ce("{}");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithContents(r, n) {
        r.writeLine("{").withIndent(() => {
          r.writeJoined(We, [...n, ...this.suggestions]).newLine();
        }), r.write("}"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    }, "e");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var W = /* @__PURE__ */ __name(class extends ve {
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new ce(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    }, "W");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var mt = /* @__PURE__ */ __name(class {
      constructor() {
        this.fields = [];
      }
      addField(t, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.writeLine(r("{")).withIndent(() => {
          t.writeJoined(We, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    }, "mt");
    function $t2(e, t, r) {
      switch (e.kind) {
        case "MutuallyExclusiveFields":
          Ms(e, t);
          break;
        case "IncludeOnScalar":
          Is(e, t);
          break;
        case "EmptySelection":
          Ls(e, t, r);
          break;
        case "UnknownSelectionField":
          Ns2(e, t);
          break;
        case "InvalidSelectionValue":
          Us2(e, t);
          break;
        case "UnknownArgument":
          qs2(e, t);
          break;
        case "UnknownInputField":
          Bs(e, t);
          break;
        case "RequiredArgumentMissing":
          $s(e, t);
          break;
        case "InvalidArgumentType":
          Vs2(e, t);
          break;
        case "InvalidArgumentValue":
          js(e, t);
          break;
        case "ValueTooLarge":
          Qs(e, t);
          break;
        case "SomeFieldsMissing":
          Js2(e, t);
          break;
        case "TooManyFieldsGiven":
          Gs(e, t);
          break;
        case "Union":
          Kn2(e, t, r);
          break;
        default:
          throw new Error("not implemented: " + e.kind);
      }
    }
    __name($t2, "$t");
    function Ms(e, t) {
      let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      r && (r.getField(e.firstField)?.markAsError(), r.getField(e.secondField)?.markAsError()), t.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(Ms, "Ms");
    function Is(e, t) {
      let [r, n] = pt(e.selectionPath), i = e.outputType, o = t.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i))
        for (let s of i.fields)
          s.isRelation && o.addSuggestion(new te(s.name, "true"));
      t.addErrorMessage((s) => {
        let a2 = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a2 += ` on model ${s.bold(i.name)}. ${dt(s)}` : a2 += ".", a2 += `
Note that ${s.bold("include")} statements only accept relation fields.`, a2;
      });
    }
    __name(Is, "Is");
    function Ls(e, t, r) {
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          _s(e, t, i);
          return;
        }
        if (n.hasField("select")) {
          Ds(e, t);
          return;
        }
      }
      if (r?.[Ve2(e.outputType.name)]) {
        Fs2(e, t);
        return;
      }
      t.addErrorMessage(() => `Unknown field at "${e.selectionPath.join(".")} selection"`);
    }
    __name(Ls, "Ls");
    function _s(e, t, r) {
      r.removeAllFields();
      for (let n of e.outputType.fields)
        r.addSuggestion(new te(n.name, "false"));
      t.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(_s, "_s");
    function Ds(e, t) {
      let r = e.outputType, n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), ei(n, r)), t.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${dt(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(Ds, "Ds");
    function Fs2(e, t) {
      let r = new mt();
      for (let i of e.outputType.fields)
        i.isRelation || r.addField(i.name, "false");
      let n = new te("omit", r).makeRequired();
      if (e.selectionPath.length === 0)
        t.arguments.addSuggestion(n);
      else {
        let [i, o] = pt(e.selectionPath), a2 = t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a2) {
          let u = a2?.value.asObject() ?? new He2();
          u.addSuggestion(n), a2.value = u;
        }
      }
      t.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(Fs2, "Fs");
    function Ns2(e, t) {
      let r = ti(e.selectionPath, t);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            ei(n, e.outputType);
            break;
          case "include":
            Ws2(n, e.outputType);
            break;
          case "omit":
            Ks(n, e.outputType);
            break;
        }
      }
      t.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`), i.push(dt(n)), i.join(" ");
      });
    }
    __name(Ns2, "Ns");
    function Us2(e, t) {
      let r = ti(e.selectionPath, t);
      r.parentKind !== "unknown" && r.field.value.markAsError(), t.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e.underlyingError}`);
    }
    __name(Us2, "Us");
    function qs2(e, t) {
      let r = e.argumentPath[0], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), Hs(n, e.arguments)), t.addErrorMessage((i) => Xn(i, r, e.arguments.map((o) => o.name)));
    }
    __name(qs2, "qs");
    function Bs(e, t) {
      let [r, n] = pt(e.argumentPath), i = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(e.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && ri(o, e.inputType);
      }
      t.addErrorMessage((o) => Xn(o, n, e.inputType.fields.map((s) => s.name)));
    }
    __name(Bs, "Bs");
    function Xn(e, t, r) {
      let n = [`Unknown argument \`${e.red(t)}\`.`], i = Ys2(t, r);
      return i && n.push(`Did you mean \`${e.green(i)}\`?`), r.length > 0 && n.push(dt(e)), n.join(" ");
    }
    __name(Xn, "Xn");
    function $s(e, t) {
      let r;
      t.addErrorMessage((u) => r?.value instanceof W && r.value.text === "null" ? `Argument \`${u.green(o)}\` must not be ${u.red("null")}.` : `Argument \`${u.green(o)}\` is missing.`);
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (!n)
        return;
      let [i, o] = pt(e.argumentPath), s = new mt(), a2 = n.getDeepFieldValue(i)?.asObject();
      if (a2)
        if (r = a2.getField(o), r && a2.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
          for (let u of e.inputTypes[0].fields)
            s.addField(u.name, u.typeNames.join(" | "));
          a2.addSuggestion(new te(o, s).makeRequired());
        } else {
          let u = e.inputTypes.map(Zn).join(" | ");
          a2.addSuggestion(new te(o, u).makeRequired());
        }
    }
    __name($s, "$s");
    function Zn(e) {
      return e.kind === "list" ? `${Zn(e.elementType)}[]` : e.name;
    }
    __name(Zn, "Zn");
    function Vs2(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = Jt("or", e.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
      });
    }
    __name(Vs2, "Vs");
    function js(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
          let s = Jt("or", e.argument.typeNames.map((a2) => i.green(a2)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(js, "js");
    function Qs(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i;
      if (n) {
        let s = n.getDeepField(e.argumentPath)?.value;
        s?.markAsError(), s instanceof W && (i = s.text);
      }
      t.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    __name(Qs, "Qs");
    function Js2(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(e.argumentPath)?.asObject();
        i && ri(i, e.inputType);
      }
      t.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${Jt("or", e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(dt(i)), o.join(" ");
      });
    }
    __name(Js2, "Js");
    function Gs(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(e.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      t.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${Jt("and", i.map((a2) => o.red(a2)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(Gs, "Gs");
    function ei(e, t) {
      for (let r of t.fields)
        e.hasField(r.name) || e.addSuggestion(new te(r.name, "true"));
    }
    __name(ei, "ei");
    function Ws2(e, t) {
      for (let r of t.fields)
        r.isRelation && !e.hasField(r.name) && e.addSuggestion(new te(r.name, "true"));
    }
    __name(Ws2, "Ws");
    function Ks(e, t) {
      for (let r of t.fields)
        !e.hasField(r.name) && !r.isRelation && e.addSuggestion(new te(r.name, "true"));
    }
    __name(Ks, "Ks");
    function Hs(e, t) {
      for (let r of t)
        e.hasField(r.name) || e.addSuggestion(new te(r.name, r.typeNames.join(" | ")));
    }
    __name(Hs, "Hs");
    function ti(e, t) {
      let [r, n] = pt(e), i = t.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i)
        return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a2 = i.getFieldValue("omit")?.asObject(), u = o?.getField(n);
      return o && u ? { parentKind: "select", parent: o, field: u, fieldName: n } : (u = s?.getField(n), s && u ? { parentKind: "include", field: u, parent: s, fieldName: n } : (u = a2?.getField(n), a2 && u ? { parentKind: "omit", field: u, parent: a2, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(ti, "ti");
    function ri(e, t) {
      if (t.kind === "object")
        for (let r of t.fields)
          e.hasField(r.name) || e.addSuggestion(new te(r.name, r.typeNames.join(" | ")));
    }
    __name(ri, "ri");
    function pt(e) {
      let t = [...e], r = t.pop();
      if (!r)
        throw new Error("unexpected empty path");
      return [t, r];
    }
    __name(pt, "pt");
    function dt({ green: e, enabled: t }) {
      return "Available options are " + (t ? `listed in ${e("green")}` : "marked with ?") + ".";
    }
    __name(dt, "dt");
    function Jt(e, t) {
      if (t.length === 1)
        return t[0];
      let r = [...t], n = r.pop();
      return `${r.join(", ")} ${e} ${n}`;
    }
    __name(Jt, "Jt");
    var zs2 = 3;
    function Ys2(e, t) {
      let r = 1 / 0, n;
      for (let i of t) {
        let o = (0, Yn.default)(e, i);
        o > zs2 || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(Ys2, "Ys");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    function ni(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(ni, "ni");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var ft = /* @__PURE__ */ __name(class {
      constructor(t, r, n, i, o) {
        this.modelName = t, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    }, "ft");
    function ze(e) {
      return e instanceof ft;
    }
    __name(ze, "ze");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Gt = Symbol();
    var Mr = /* @__PURE__ */ new WeakMap();
    var xe = /* @__PURE__ */ __name(class {
      constructor(t) {
        t === Gt ? Mr.set(this, `Prisma.${this._getName()}`) : Mr.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return Mr.get(this);
      }
    }, "xe");
    var gt = /* @__PURE__ */ __name(class extends xe {
      _getNamespace() {
        return "NullTypes";
      }
    }, "gt");
    var ht = /* @__PURE__ */ __name(class extends gt {
    }, "ht");
    Ir(ht, "DbNull");
    var yt = /* @__PURE__ */ __name(class extends gt {
    }, "yt");
    Ir(yt, "JsonNull");
    var bt2 = /* @__PURE__ */ __name(class extends gt {
    }, "bt");
    Ir(bt2, "AnyNull");
    var Wt2 = { classes: { DbNull: ht, JsonNull: yt, AnyNull: bt2 }, instances: { DbNull: new ht(Gt), JsonNull: new yt(Gt), AnyNull: new bt2(Gt) } };
    function Ir(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(Ir, "Ir");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var ii = ": ";
    var Kt = /* @__PURE__ */ __name(class {
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.hasError = false;
      }
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + ii.length;
      }
      write(t) {
        let r = new ce(this.name);
        this.hasError && r.underline().setColor(t.context.colors.red), t.write(r).write(ii).write(this.value);
      }
    }, "Kt");
    var Lr = /* @__PURE__ */ __name(class {
      constructor(t) {
        this.errorMessages = [];
        this.arguments = t;
      }
      write(t) {
        t.write(this.arguments);
      }
      addErrorMessage(t) {
        this.errorMessages.push(t);
      }
      renderAllMessages(t) {
        return this.errorMessages.map((r) => r(t)).join(`
`);
      }
    }, "Lr");
    function Ye(e) {
      return new Lr(oi2(e));
    }
    __name(Ye, "Ye");
    function oi2(e) {
      let t = new He2();
      for (let [r, n] of Object.entries(e)) {
        let i = new Kt(r, si2(n));
        t.addField(i);
      }
      return t;
    }
    __name(oi2, "oi");
    function si2(e) {
      if (typeof e == "string")
        return new W(JSON.stringify(e));
      if (typeof e == "number" || typeof e == "boolean")
        return new W(String(e));
      if (typeof e == "bigint")
        return new W(`${e}n`);
      if (e === null)
        return new W("null");
      if (e === void 0)
        return new W("undefined");
      if (Qe2(e))
        return new W(`new Prisma.Decimal("${e.toFixed()}")`);
      if (e instanceof Uint8Array)
        return b.isBuffer(e) ? new W(`Buffer.alloc(${e.byteLength})`) : new W(`new Uint8Array(${e.byteLength})`);
      if (e instanceof Date) {
        let t = Bt2(e) ? e.toISOString() : "Invalid Date";
        return new W(`new Date("${t}")`);
      }
      return e instanceof xe ? new W(`Prisma.${e._getName()}`) : ze(e) ? new W(`prisma.${ni(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? Xs2(e) : typeof e == "object" ? oi2(e) : new W(Object.prototype.toString.call(e));
    }
    __name(si2, "si");
    function Xs2(e) {
      let t = new Ke();
      for (let r of e)
        t.addItem(si2(r));
      return t;
    }
    __name(Xs2, "Xs");
    function Ht2(e, t) {
      let r = t === "pretty" ? zn : Qt, n = e.renderAllMessages(r), i = new Ge2(0, { colors: r }).write(e).toString();
      return { message: n, args: i };
    }
    __name(Ht2, "Ht");
    function zt({ args: e, errors: t, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a2 = Ye(e);
      for (let C of t)
        $t2(C, a2, s);
      let { message: u, args: g } = Ht2(a2, r), T = Je({ message: u, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: g });
      throw new j(T, { clientVersion: o });
    }
    __name(zt, "zt");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var me = /* @__PURE__ */ __name(class {
      constructor() {
        this._map = /* @__PURE__ */ new Map();
      }
      get(t) {
        return this._map.get(t)?.value;
      }
      set(t, r) {
        this._map.set(t, { value: r });
      }
      getOrCreate(t, r) {
        let n = this._map.get(t);
        if (n)
          return n.value;
        let i = r();
        return this.set(t, i), i;
      }
    }, "me");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function wt2(e) {
      let t;
      return { get() {
        return t || (t = { value: e() }), t.value;
      } };
    }
    __name(wt2, "wt");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function pe2(e) {
      return e.replace(/^./, (t) => t.toLowerCase());
    }
    __name(pe2, "pe");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function li2(e, t, r) {
      let n = pe2(r);
      return !t.result || !(t.result.$allModels || t.result[n]) ? e : Zs2({ ...e, ...ai(t.name, e, t.result.$allModels), ...ai(t.name, e, t.result[n]) });
    }
    __name(li2, "li");
    function Zs2(e) {
      let t = new me(), r = /* @__PURE__ */ __name((n, i) => t.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return Be(e, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(Zs2, "Zs");
    function ai(e, t, r) {
      return r ? Be(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: ea(t, o, i) })) : {};
    }
    __name(ai, "ai");
    function ea(e, t, r) {
      let n = e?.[t]?.compute;
      return n ? (i) => r({ ...i, [t]: n(i) }) : r;
    }
    __name(ea, "ea");
    function ui(e, t) {
      if (!t)
        return e;
      let r = { ...e };
      for (let n of Object.values(t))
        if (e[n.name])
          for (let i of n.needs)
            r[i] = true;
      return r;
    }
    __name(ui, "ui");
    function ci(e, t) {
      if (!t)
        return e;
      let r = { ...e };
      for (let n of Object.values(t))
        if (!e[n.name])
          for (let i of n.needs)
            delete r[i];
      return r;
    }
    __name(ci, "ci");
    var Yt = /* @__PURE__ */ __name(class {
      constructor(t, r) {
        this.extension = t;
        this.previous = r;
        this.computedFieldsCache = new me();
        this.modelExtensionsCache = new me();
        this.queryCallbacksCache = new me();
        this.clientExtensions = wt2(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        this.batchCallbacks = wt2(() => {
          let t2 = this.previous?.getAllBatchQueryCallbacks() ?? [], r2 = this.extension.query?.$__internalBatch;
          return r2 ? t2.concat(r2) : t2;
        });
      }
      getAllComputedFields(t) {
        return this.computedFieldsCache.getOrCreate(t, () => li2(this.previous?.getAllComputedFields(t), this.extension, t));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(t) {
        return this.modelExtensionsCache.getOrCreate(t, () => {
          let r = pe2(t);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(t) : { ...this.previous?.getAllModelExtensions(t), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(t, r) {
        return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(t, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations) ? n : (o[t] !== void 0 && (o[t][r] !== void 0 && i.push(o[t][r]), o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)), t !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    }, "Yt");
    var Xe2 = /* @__PURE__ */ __name(class e {
      constructor(t) {
        this.head = t;
      }
      static empty() {
        return new e();
      }
      static single(t) {
        return new e(new Yt(t));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(t) {
        return new e(new Yt(t, this.head));
      }
      getAllComputedFields(t) {
        return this.head?.getAllComputedFields(t);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(t) {
        return this.head?.getAllModelExtensions(t);
      }
      getAllQueryCallbacks(t, r) {
        return this.head?.getAllQueryCallbacks(t, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    }, "e");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var mi2 = Symbol();
    var Et = /* @__PURE__ */ __name(class {
      constructor(t) {
        if (t !== mi2)
          throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(t) {
        return t === void 0 ? Xt : t;
      }
    }, "Et");
    var Xt = new Et(mi2);
    function de(e) {
      return e instanceof Et;
    }
    __name(de, "de");
    var ta = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var pi2 = "explicitly `undefined` values are not allowed";
    function Zt({ modelName: e, action: t, args: r, runtimeDataModel: n, extensions: i = Xe2.empty(), callsite: o, clientMethod: s, errorFormat: a2, clientVersion: u, previewFeatures: g, globalOmit: T }) {
      let C = new _r({ runtimeDataModel: n, modelName: e, action: t, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a2, clientVersion: u, previewFeatures: g, globalOmit: T });
      return { modelName: e, action: ta[t], query: xt(r, C) };
    }
    __name(Zt, "Zt");
    function xt({ select: e, include: t, ...r } = {}, n) {
      let i;
      return n.isPreviewFeatureOn("omitApi") && (i = r.omit, delete r.omit), { arguments: fi(r, n), selection: ra(e, t, i, n) };
    }
    __name(xt, "xt");
    function ra(e, t, r, n) {
      return e ? (t ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.isPreviewFeatureOn("omitApi") && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), sa(e, n)) : na(n, t, r);
    }
    __name(ra, "ra");
    function na(e, t, r) {
      let n = {};
      return e.modelOrType && !e.isRawAction() && (n.$composites = true, n.$scalars = true), t && ia(n, t, e), e.isPreviewFeatureOn("omitApi") && oa(n, r, e), n;
    }
    __name(na, "na");
    function ia(e, t, r) {
      for (let [n, i] of Object.entries(t)) {
        if (de(i))
          continue;
        let o = r.nestSelection(n);
        if (Dr(i, o), i === false || i === void 0) {
          e[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          e[n] = xt(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          e[n] = true;
          continue;
        }
        e[n] = xt(i, o);
      }
    }
    __name(ia, "ia");
    function oa(e, t, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...t }, o = ci(i, n);
      for (let [s, a2] of Object.entries(o)) {
        if (de(a2))
          continue;
        Dr(a2, r.nestSelection(s));
        let u = r.findField(s);
        n?.[s] && !u || (e[s] = !a2);
      }
    }
    __name(oa, "oa");
    function sa(e, t) {
      let r = {}, n = t.getComputedFields(), i = ui(e, n);
      for (let [o, s] of Object.entries(i)) {
        if (de(s))
          continue;
        let a2 = t.nestSelection(o);
        Dr(s, a2);
        let u = t.findField(o);
        if (!(n?.[o] && !u)) {
          if (s === false || s === void 0 || de(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            u?.kind === "object" ? r[o] = xt({}, a2) : r[o] = true;
            continue;
          }
          r[o] = xt(s, a2);
        }
      }
      return r;
    }
    __name(sa, "sa");
    function di(e, t) {
      if (e === null)
        return null;
      if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
        return e;
      if (typeof e == "bigint")
        return { $type: "BigInt", value: String(e) };
      if (je(e)) {
        if (Bt2(e))
          return { $type: "DateTime", value: e.toISOString() };
        t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (ze(e))
        return { $type: "FieldRef", value: { _ref: e.name, _container: e.modelName } };
      if (Array.isArray(e))
        return aa(e, t);
      if (ArrayBuffer.isView(e))
        return { $type: "Bytes", value: b.from(e).toString("base64") };
      if (la(e))
        return e.values;
      if (Qe2(e))
        return { $type: "Decimal", value: e.toFixed() };
      if (e instanceof xe) {
        if (e !== Wt2.instances[e._getName()])
          throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: e._getName() };
      }
      if (ua(e))
        return e.toJSON();
      if (typeof e == "object")
        return fi(e, t);
      t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(di, "di");
    function fi(e, t) {
      if (e.$type)
        return { $type: "Raw", value: e };
      let r = {};
      for (let n in e) {
        let i = e[n], o = t.nestArgument(n);
        de(i) || (i !== void 0 ? r[n] = di(i, o) : t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: t.getSelectionPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: pi2 }));
      }
      return r;
    }
    __name(fi, "fi");
    function aa(e, t) {
      let r = [];
      for (let n = 0; n < e.length; n++) {
        let i = t.nestArgument(String(n)), o = e[n];
        if (o === void 0 || de(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(di(o, i));
      }
      return r;
    }
    __name(aa, "aa");
    function la(e) {
      return typeof e == "object" && e !== null && e.__prismaRawParameters__ === true;
    }
    __name(la, "la");
    function ua(e) {
      return typeof e == "object" && e !== null && typeof e.toJSON == "function";
    }
    __name(ua, "ua");
    function Dr(e, t) {
      e === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t.getSelectionPath(), underlyingError: pi2 });
    }
    __name(Dr, "Dr");
    var _r = /* @__PURE__ */ __name(class e {
      constructor(t) {
        this.params = t;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      throwValidationError(t) {
        zt({ errors: [t], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType))
          return { name: this.params.modelName, fields: this.modelOrType.fields.map((t) => ({ name: t.name, typeName: "boolean", isRelation: t.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(t) {
        return this.params.previewFeatures.includes(t);
      }
      getComputedFields() {
        if (this.params.modelName)
          return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(t) {
        return this.modelOrType?.fields.find((r) => r.name === t);
      }
      nestSelection(t) {
        let r = this.findField(t), n = r?.kind === "object" ? r.type : void 0;
        return new e({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(t) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[Ve2(this.params.modelName)] ?? {} : {};
      }
      shouldApplyGlobalOmit() {
        switch (this.params.action) {
          case "findFirst":
          case "findFirstOrThrow":
          case "findUniqueOrThrow":
          case "findMany":
          case "upsert":
          case "findUnique":
          case "createManyAndReturn":
          case "create":
          case "update":
          case "delete":
            return true;
          case "executeRaw":
          case "aggregateRaw":
          case "runCommandRaw":
          case "findRaw":
          case "createMany":
          case "deleteMany":
          case "groupBy":
          case "updateMany":
          case "count":
          case "aggregate":
          case "queryRaw":
            return false;
          default:
            be(this.params.action, "Unknown action");
        }
      }
      nestArgument(t) {
        return new e({ ...this.params, argumentPath: this.params.argumentPath.concat(t) });
      }
    }, "e");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Ze = /* @__PURE__ */ __name(class {
      constructor(t) {
        this._engine = t;
      }
      prometheus(t) {
        return this._engine.metrics({ format: "prometheus", ...t });
      }
      json(t) {
        return this._engine.metrics({ format: "json", ...t });
      }
    }, "Ze");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function gi(e) {
      return { models: Fr(e.models), enums: Fr(e.enums), types: Fr(e.types) };
    }
    __name(gi, "gi");
    function Fr(e) {
      let t = {};
      for (let { name: r, ...n } of e)
        t[r] = n;
      return t;
    }
    __name(Fr, "Fr");
    function hi(e, t) {
      let r = wt2(() => ca(t));
      Object.defineProperty(e, "dmmf", { get: () => r.get() });
    }
    __name(hi, "hi");
    function ca(e) {
      throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
    }
    __name(ca, "ca");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Ur = /* @__PURE__ */ new WeakMap();
    var er = "$$PrismaTypedSql";
    var qr = /* @__PURE__ */ __name(class {
      constructor(t, r) {
        Ur.set(this, { sql: t, values: r }), Object.defineProperty(this, er, { value: er });
      }
      get sql() {
        return Ur.get(this).sql;
      }
      get values() {
        return Ur.get(this).values;
      }
    }, "qr");
    function yi(e) {
      return (...t) => new qr(e, t);
    }
    __name(yi, "yi");
    function bi(e) {
      return e != null && e[er] === er;
    }
    __name(bi, "bi");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Pt3(e) {
      return { ok: false, error: e, map() {
        return Pt3(e);
      }, flatMap() {
        return Pt3(e);
      } };
    }
    __name(Pt3, "Pt");
    var Br = /* @__PURE__ */ __name(class {
      constructor() {
        this.registeredErrors = [];
      }
      consumeError(t) {
        return this.registeredErrors[t];
      }
      registerNewError(t) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; )
          r++;
        return this.registeredErrors[r] = { error: t }, r;
      }
    }, "Br");
    var $r = /* @__PURE__ */ __name((e) => {
      let t = new Br(), r = fe(t, e.transactionContext.bind(e)), n = { adapterName: e.adapterName, errorRegistry: t, queryRaw: fe(t, e.queryRaw.bind(e)), executeRaw: fe(t, e.executeRaw.bind(e)), provider: e.provider, transactionContext: async (...i) => (await r(...i)).map((s) => ma(t, s)) };
      return e.getConnectionInfo && (n.getConnectionInfo = da(t, e.getConnectionInfo.bind(e))), n;
    }, "$r");
    var ma = /* @__PURE__ */ __name((e, t) => {
      let r = fe(e, t.startTransaction.bind(t));
      return { adapterName: t.adapterName, provider: t.provider, queryRaw: fe(e, t.queryRaw.bind(t)), executeRaw: fe(e, t.executeRaw.bind(t)), startTransaction: async (...n) => (await r(...n)).map((o) => pa(e, o)) };
    }, "ma");
    var pa = /* @__PURE__ */ __name((e, t) => ({ adapterName: t.adapterName, provider: t.provider, options: t.options, queryRaw: fe(e, t.queryRaw.bind(t)), executeRaw: fe(e, t.executeRaw.bind(t)), commit: fe(e, t.commit.bind(t)), rollback: fe(e, t.rollback.bind(t)) }), "pa");
    function fe(e, t) {
      return async (...r) => {
        try {
          return await t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return Pt3({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(fe, "fe");
    function da(e, t) {
      return (...r) => {
        try {
          return t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return Pt3({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(da, "da");
    var Lo = Fe(wi2());
    var ek = Fe(Ei());
    Dn();
    bn();
    Ln2();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var X = /* @__PURE__ */ __name(class e {
      constructor(t, r) {
        if (t.length - 1 !== r.length)
          throw t.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${t.length} strings to have ${t.length - 1} values`);
        let n = r.reduce((s, a2) => s + (a2 instanceof e ? a2.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = t[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s = r[i++], a2 = t[i];
          if (s instanceof e) {
            this.strings[o] += s.strings[0];
            let u = 0;
            for (; u < s.values.length; )
              this.values[o++] = s.values[u++], this.strings[o] = s.strings[u];
            this.strings[o] += a2;
          } else
            this.values[o++] = s, this.strings[o] = a2;
        }
      }
      get sql() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; )
          n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; )
          n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; )
          n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    }, "e");
    function xi(e, t = ",", r = "", n = "") {
      if (e.length === 0)
        throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new X([r, ...Array(e.length - 1).fill(t), n], e);
    }
    __name(xi, "xi");
    function Vr(e) {
      return new X([e], []);
    }
    __name(Vr, "Vr");
    var Pi = Vr("");
    function jr(e, ...t) {
      return new X(e, t);
    }
    __name(jr, "jr");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    function vt(e) {
      return { getKeys() {
        return Object.keys(e);
      }, getPropertyValue(t) {
        return e[t];
      } };
    }
    __name(vt, "vt");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function H(e, t) {
      return { getKeys() {
        return [e];
      }, getPropertyValue() {
        return t();
      } };
    }
    __name(H, "H");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Ie(e) {
      let t = new me();
      return { getKeys() {
        return e.getKeys();
      }, getPropertyValue(r) {
        return t.getOrCreate(r, () => e.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return e.getPropertyDescriptor?.(r);
      } };
    }
    __name(Ie, "Ie");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var tr = { enumerable: true, configurable: true, writable: true };
    function rr(e) {
      let t = new Set(e);
      return { getOwnPropertyDescriptor: () => tr, has: (r, n) => t.has(n), set: (r, n, i) => t.add(n) && Reflect.set(r, n, i), ownKeys: () => [...t] };
    }
    __name(rr, "rr");
    var vi = Symbol.for("nodejs.util.inspect.custom");
    function ge2(e, t) {
      let r = ga(t), n = /* @__PURE__ */ new Set(), i = new Proxy(e, { get(o, s) {
        if (n.has(s))
          return o[s];
        let a2 = r.get(s);
        return a2 ? a2.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s))
          return true;
        let a2 = r.get(s);
        return a2 ? a2.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = Ti2(Reflect.ownKeys(o), r), a2 = Ti2(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a2, ...n])];
      }, set(o, s, a2) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a2));
      }, getOwnPropertyDescriptor(o, s) {
        let a2 = Reflect.getOwnPropertyDescriptor(o, s);
        if (a2 && !a2.configurable)
          return a2;
        let u = r.get(s);
        return u ? u.getPropertyDescriptor ? { ...tr, ...u?.getPropertyDescriptor(s) } : tr : a2;
      }, defineProperty(o, s, a2) {
        return n.add(s), Reflect.defineProperty(o, s, a2);
      } });
      return i[vi] = function() {
        let o = { ...this };
        return delete o[vi], o;
      }, i;
    }
    __name(ge2, "ge");
    function ga(e) {
      let t = /* @__PURE__ */ new Map();
      for (let r of e) {
        let n = r.getKeys();
        for (let i of n)
          t.set(i, r);
      }
      return t;
    }
    __name(ga, "ga");
    function Ti2(e, t) {
      return e.filter((r) => t.get(r)?.has?.(r) ?? true);
    }
    __name(Ti2, "Ti");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function et2(e) {
      return { getKeys() {
        return e;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(et2, "et");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function nr(e, t) {
      return { batch: e, transaction: t?.kind === "batch" ? { isolationLevel: t.options.isolationLevel } : void 0 };
    }
    __name(nr, "nr");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Ci(e) {
      if (e === void 0)
        return "";
      let t = Ye(e);
      return new Ge2(0, { colors: Qt }).write(t).toString();
    }
    __name(Ci, "Ci");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var ha = "P2037";
    function ir2({ error: e, user_facing_error: t }, r, n) {
      return t.error_code ? new J(ya(t, n), { code: t.error_code, clientVersion: r, meta: t.meta, batchRequestIdx: t.batch_request_idx }) : new G(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
    }
    __name(ir2, "ir");
    function ya(e, t) {
      let r = e.message;
      return (t === "postgresql" || t === "postgres" || t === "mysql") && e.error_code === ha && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name(ya, "ya");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Qr = /* @__PURE__ */ __name(class {
      getLocation() {
        return null;
      }
    }, "Qr");
    function Te2(e) {
      return typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite() : new Qr();
    }
    __name(Te2, "Te");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Ri2 = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function tt2(e = {}) {
      let t = wa(e);
      return Object.entries(t).reduce((n, [i, o]) => (Ri2[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(tt2, "tt");
    function wa(e = {}) {
      return typeof e._count == "boolean" ? { ...e, _count: { _all: e._count } } : e;
    }
    __name(wa, "wa");
    function or2(e = {}) {
      return (t) => (typeof e._count == "boolean" && (t._count = t._count._all), t);
    }
    __name(or2, "or");
    function Ai2(e, t) {
      let r = or2(e);
      return t({ action: "aggregate", unpacker: r, argsMapper: tt2 })(e);
    }
    __name(Ai2, "Ai");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Ea(e = {}) {
      let { select: t, ...r } = e;
      return typeof t == "object" ? tt2({ ...r, _count: t }) : tt2({ ...r, _count: { _all: true } });
    }
    __name(Ea, "Ea");
    function xa(e = {}) {
      return typeof e.select == "object" ? (t) => or2(e)(t)._count : (t) => or2(e)(t)._count._all;
    }
    __name(xa, "xa");
    function Si(e, t) {
      return t({ action: "count", unpacker: xa(e), argsMapper: Ea })(e);
    }
    __name(Si, "Si");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Pa(e = {}) {
      let t = tt2(e);
      if (Array.isArray(t.by))
        for (let r of t.by)
          typeof r == "string" && (t.select[r] = true);
      else
        typeof t.by == "string" && (t.select[t.by] = true);
      return t;
    }
    __name(Pa, "Pa");
    function va(e = {}) {
      return (t) => (typeof e?._count == "boolean" && t.forEach((r) => {
        r._count = r._count._all;
      }), t);
    }
    __name(va, "va");
    function Oi(e, t) {
      return t({ action: "groupBy", unpacker: va(e), argsMapper: Pa })(e);
    }
    __name(Oi, "Oi");
    function ki(e, t, r) {
      if (t === "aggregate")
        return (n) => Ai2(n, r);
      if (t === "count")
        return (n) => Si(n, r);
      if (t === "groupBy")
        return (n) => Oi(n, r);
    }
    __name(ki, "ki");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Mi2(e, t) {
      let r = t.fields.filter((i) => !i.relationName), n = Sr(r, (i) => i.name);
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol")
          return i[o];
        let s = n[o];
        if (s)
          return new ft(e, o, s.type, s.isList, s.kind === "enum");
      }, ...rr(Object.keys(n)) });
    }
    __name(Mi2, "Mi");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Ii = /* @__PURE__ */ __name((e) => Array.isArray(e) ? e : e.split("."), "Ii");
    var Jr = /* @__PURE__ */ __name((e, t) => Ii(t).reduce((r, n) => r && r[n], e), "Jr");
    var Li = /* @__PURE__ */ __name((e, t, r) => Ii(t).reduceRight((n, i, o, s) => Object.assign({}, Jr(e, s.slice(0, o)), { [i]: n }), r), "Li");
    function Ta(e, t) {
      return e === void 0 || t === void 0 ? [] : [...t, "select", e];
    }
    __name(Ta, "Ta");
    function Ca(e, t, r) {
      return t === void 0 ? e ?? {} : Li(t, r, e || true);
    }
    __name(Ca, "Ca");
    function Gr(e, t, r, n, i, o) {
      let a2 = e._runtimeDataModel.models[t].fields.reduce((u, g) => ({ ...u, [g.name]: g }), {});
      return (u) => {
        let g = Te2(e._errorFormat), T = Ta(n, i), C = Ca(u, o, T), O2 = r({ dataPath: T, callsite: g })(C), A = Ra(e, t);
        return new Proxy(O2, { get(M, S2) {
          if (!A.includes(S2))
            return M[S2];
          let ne = [a2[S2].type, r, S2], z2 = [T, C];
          return Gr(e, ...ne, ...z2);
        }, ...rr([...A, ...Object.getOwnPropertyNames(O2)]) });
      };
    }
    __name(Gr, "Gr");
    function Ra(e, t) {
      return e._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(Ra, "Ra");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function _i(e, t, r, n) {
      return e === Me.ModelAction.findFirstOrThrow || e === Me.ModelAction.findUniqueOrThrow ? Aa(t, r, n) : n;
    }
    __name(_i, "_i");
    function Aa(e, t, r) {
      return async (n) => {
        if ("rejectOnNotFound" in n.args) {
          let o = Je({ originalMethod: n.clientMethod, callsite: n.callsite, message: "'rejectOnNotFound' option is not supported" });
          throw new j(o, { clientVersion: t });
        }
        return await r(n).catch((o) => {
          throw o instanceof J && o.code === "P2025" ? new we(`No ${e} found`, t) : o;
        });
      };
    }
    __name(Aa, "Aa");
    var Sa = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var Oa = ["aggregate", "count", "groupBy"];
    function Wr(e, t) {
      let r = e._extensions.getAllModelExtensions(t) ?? {}, n = [ka(e, t), Ia(e, t), vt(r), H("name", () => t), H("$name", () => t), H("$parent", () => e._appliedParent)];
      return ge2({}, n);
    }
    __name(Wr, "Wr");
    function ka(e, t) {
      let r = pe2(t), n = Object.keys(Me.ModelAction).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((u) => e._request(u), "s");
        s = _i(o, t, e._clientVersion, s);
        let a2 = /* @__PURE__ */ __name((u) => (g) => {
          let T = Te2(e._errorFormat);
          return e._createPrismaPromise((C) => {
            let O2 = { args: g, dataPath: [], action: o, model: t, clientMethod: `${r}.${i}`, jsModelName: r, transaction: C, callsite: T };
            return s({ ...O2, ...u });
          });
        }, "a");
        return Sa.includes(o) ? Gr(e, t, a2) : Ma(i) ? ki(e, i, a2) : a2({});
      } };
    }
    __name(ka, "ka");
    function Ma(e) {
      return Oa.includes(e);
    }
    __name(Ma, "Ma");
    function Ia(e, t) {
      return Ie(H("fields", () => {
        let r = e._runtimeDataModel.models[t];
        return Mi2(t, r);
      }));
    }
    __name(Ia, "Ia");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Di(e) {
      return e.replace(/^./, (t) => t.toUpperCase());
    }
    __name(Di, "Di");
    var Kr = Symbol();
    function Tt(e) {
      let t = [La(e), H(Kr, () => e), H("$parent", () => e._appliedParent)], r = e._extensions.getAllClientExtensions();
      return r && t.push(vt(r)), ge2(e, t);
    }
    __name(Tt, "Tt");
    function La(e) {
      let t = Object.keys(e._runtimeDataModel.models), r = t.map(pe2), n = [...new Set(t.concat(r))];
      return Ie({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Di(i);
        if (e._runtimeDataModel.models[o] !== void 0)
          return Wr(e, o);
        if (e._runtimeDataModel.models[i] !== void 0)
          return Wr(e, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i))
          return { enumerable: false };
      } });
    }
    __name(La, "La");
    function Fi(e) {
      return e[Kr] ? e[Kr] : e;
    }
    __name(Fi, "Fi");
    function Ni(e) {
      if (typeof e == "function")
        return e(this);
      if (e.client?.__AccelerateEngine) {
        let r = e.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let t = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
      return Tt(t);
    }
    __name(Ni, "Ni");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Ui({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(t);
      if (!o)
        return e;
      let s = [], a2 = [];
      for (let u of Object.values(o)) {
        if (n) {
          if (n[u.name])
            continue;
          let g = u.needs.filter((T) => n[T]);
          g.length > 0 && a2.push(et2(g));
        } else if (r) {
          if (!r[u.name])
            continue;
          let g = u.needs.filter((T) => !r[T]);
          g.length > 0 && a2.push(et2(g));
        }
        _a(e, u.needs) && s.push(Da(u, ge2(e, s)));
      }
      return s.length > 0 || a2.length > 0 ? ge2(e, [...s, ...a2]) : e;
    }
    __name(Ui, "Ui");
    function _a(e, t) {
      return t.every((r) => Ar(e, r));
    }
    __name(_a, "_a");
    function Da(e, t) {
      return Ie(H(e.name, () => e.compute(t)));
    }
    __name(Da, "Da");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function sr2({ visitor: e, result: t, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(t)) {
        for (let s = 0; s < t.length; s++)
          t[s] = sr2({ result: t[s], args: r, modelName: i, runtimeDataModel: n, visitor: e });
        return t;
      }
      let o = e(t, i, r) ?? t;
      return r.include && qi({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), r.select && qi({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), o;
    }
    __name(sr2, "sr");
    function qi({ includeOrSelect: e, result: t, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(e)) {
        if (!s || t[o] == null || de(s))
          continue;
        let u = n.models[r].fields.find((T) => T.name === o);
        if (!u || u.kind !== "object" || !u.relationName)
          continue;
        let g = typeof s == "object" ? s : {};
        t[o] = sr2({ visitor: i, result: t[o], args: g, modelName: u.type, runtimeDataModel: n });
      }
    }
    __name(qi, "qi");
    function Bi({ result: e, modelName: t, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || e == null || typeof e != "object" || !i.models[t] ? e : sr2({ result: e, args: r ?? {}, modelName: t, runtimeDataModel: i, visitor: (a2, u, g) => {
        let T = pe2(u);
        return Ui({ result: a2, modelName: T, select: g.select, omit: g.select ? void 0 : { ...o?.[T], ...g.omit }, extensions: n });
      } });
    }
    __name(Bi, "Bi");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    l();
    function $i(e) {
      if (e instanceof X)
        return Fa(e);
      if (Array.isArray(e)) {
        let r = [e[0]];
        for (let n = 1; n < e.length; n++)
          r[n] = Ct(e[n]);
        return r;
      }
      let t = {};
      for (let r in e)
        t[r] = Ct(e[r]);
      return t;
    }
    __name($i, "$i");
    function Fa(e) {
      return new X(e.strings, e.values);
    }
    __name(Fa, "Fa");
    function Ct(e) {
      if (typeof e != "object" || e == null || e instanceof xe || ze(e))
        return e;
      if (Qe2(e))
        return new ue(e.toFixed());
      if (je(e))
        return /* @__PURE__ */ new Date(+e);
      if (ArrayBuffer.isView(e))
        return e.slice(0);
      if (Array.isArray(e)) {
        let t = e.length, r;
        for (r = Array(t); t--; )
          r[t] = Ct(e[t]);
        return r;
      }
      if (typeof e == "object") {
        let t = {};
        for (let r in e)
          r === "__proto__" ? Object.defineProperty(t, r, { value: Ct(e[r]), configurable: true, enumerable: true, writable: true }) : t[r] = Ct(e[r]);
        return t;
      }
      be(e, "Unknown value");
    }
    __name(Ct, "Ct");
    function ji2(e, t, r, n = 0) {
      return e._createPrismaPromise((i) => {
        let o = t.customDataProxyFetch;
        return "transaction" in t && i !== void 0 && (t.transaction?.kind === "batch" && t.transaction.lock.then(), t.transaction = i), n === r.length ? e._executeRequest(t) : r[n]({ model: t.model, operation: t.model ? t.action : t.clientMethod, args: $i(t.args ?? {}), __internalParams: t, query: (s, a2 = t) => {
          let u = a2.customDataProxyFetch;
          return a2.customDataProxyFetch = Wi2(o, u), a2.args = s, ji2(e, a2, r, n + 1);
        } });
      });
    }
    __name(ji2, "ji");
    function Qi(e, t) {
      let { jsModelName: r, action: n, clientMethod: i } = t, o = r ? n : i;
      if (e._extensions.isEmpty())
        return e._executeRequest(t);
      let s = e._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return ji2(e, t, s);
    }
    __name(Qi, "Qi");
    function Ji(e) {
      return (t) => {
        let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? Gi(r, n, 0, e) : e(r);
      };
    }
    __name(Ji, "Ji");
    function Gi(e, t, r, n) {
      if (r === t.length)
        return n(e);
      let i = e.customDataProxyFetch, o = e.requests[0].transaction;
      return t[r]({ args: { queries: e.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e, query(s, a2 = e) {
        let u = a2.customDataProxyFetch;
        return a2.customDataProxyFetch = Wi2(i, u), Gi(a2, t, r + 1, n);
      } });
    }
    __name(Gi, "Gi");
    var Vi = /* @__PURE__ */ __name((e) => e, "Vi");
    function Wi2(e = Vi, t = Vi) {
      return (r) => e(t(r));
    }
    __name(Wi2, "Wi");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Ki2 = ee("prisma:client");
    var Hi2 = { Vercel: "vercel", "Netlify CI": "netlify" };
    function zi({ postinstall: e, ciName: t, clientVersion: r }) {
      if (Ki2("checkPlatformCaching:postinstall", e), Ki2("checkPlatformCaching:ciName", t), e === true && t && t in Hi2) {
        let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Hi2[t]}-build`;
        throw console.error(n), new L(n, r);
      }
    }
    __name(zi, "zi");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Yi(e, t) {
      return e ? e.datasources ? e.datasources : e.datasourceUrl ? { [t[0]]: { url: e.datasourceUrl } } : {} : {};
    }
    __name(Yi, "Yi");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Na = "Cloudflare-Workers";
    var Ua = "node";
    function Xi2() {
      return typeof Netlify == "object" ? "netlify" : typeof EdgeRuntime == "string" ? "edge-light" : globalThis.navigator?.userAgent === Na ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : globalThis.process?.release?.name === Ua ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
    }
    __name(Xi2, "Xi");
    var qa = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function Ce2() {
      let e = Xi2();
      return { id: e, prettyName: qa[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
    }
    __name(Ce2, "Ce");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    function ar2({ inlineDatasources: e, overrideDatasources: t, env: r, clientVersion: n }) {
      let i, o = Object.keys(e)[0], s = e[o]?.url, a2 = t[o]?.url;
      if (o === void 0 ? i = void 0 : a2 ? i = a2 : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0)
        throw Ce2().id === "workerd" ? new L(`error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new L(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0)
        throw new L("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(ar2, "ar");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Zi2(e) {
      if (e?.kind === "itx")
        return e.options.id;
    }
    __name(Zi2, "Zi");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Hr;
    var eo2 = { async loadLibrary(e) {
      let { clientVersion: t, adapter: r, engineWasm: n } = e;
      if (r === void 0)
        throw new L(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Ce2().prettyName})`, t);
      if (n === void 0)
        throw new L("WASM engine was unexpectedly `undefined`", t);
      Hr === void 0 && (Hr = (async () => {
        let o = n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null)
          throw new L("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t);
        let a2 = { "./query_engine_bg.js": o }, u = new WebAssembly.Instance(s, a2);
        return o.__wbg_set_wasm(u.exports), o.QueryEngine;
      })());
      let i = await Hr;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var Ba = "P2036";
    var he = ee("prisma:client:libraryEngine");
    function $a(e) {
      return e.item_type === "query" && "query" in e;
    }
    __name($a, "$a");
    function Va(e) {
      return "level" in e ? e.level === "error" && e.message === "PANIC" : false;
    }
    __name(Va, "Va");
    var VR = [...Cr, "native"];
    var Rt = /* @__PURE__ */ __name(class {
      constructor(t, r) {
        this.name = "LibraryEngine";
        this.libraryLoader = r ?? eo2, this.config = t, this.libraryStarted = false, this.logQueries = t.logQueries ?? false, this.logLevel = t.logLevel ?? "error", this.logEmitter = t.logEmitter, this.datamodel = t.inlineSchema, t.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(t.overrideDatasources)[0], i = t.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(t, r, n) {
        await this.start();
        let i = JSON.stringify(r), o;
        if (t === "start") {
          let a2 = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          o = await this.engine?.startTransaction(a2, i);
        } else
          t === "commit" ? o = await this.engine?.commitTransaction(n.id, i) : t === "rollback" && (o = await this.engine?.rollbackTransaction(n.id, i));
        let s = this.parseEngineResponse(o);
        if (ja(s)) {
          let a2 = this.getExternalAdapterError(s);
          throw a2 ? a2.error : new J(s.message, { code: s.error_code, clientVersion: this.config.clientVersion, meta: s.meta });
        }
        return s;
      }
      async instantiateLibrary() {
        if (he("internalSetup"), this.libraryInstantiationPromise)
          return this.libraryInstantiationPromise;
        this.binaryTarget = await this.getCurrentBinaryTarget(), await this.loadEngine(), this.version();
      }
      async getCurrentBinaryTarget() {
      }
      parseEngineResponse(t) {
        if (!t)
          throw new G("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(t);
        } catch {
          throw new G("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let t = new w2(this), { adapter: r } = this.config;
            r && he("Using driver adapter: %O", r), this.engine = new this.QueryEngineConstructor({ datamodel: this.datamodel, env: h.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json" }, (n) => {
              t.deref()?.logger(n);
            }, r);
          } catch (t) {
            let r = t, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new L(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(t) {
        let r = this.parseEngineResponse(t);
        if (r) {
          if ("span" in r) {
            this.config.tracingHelper.createEngineSpan(r);
            return;
          }
          r.level = r?.level.toLowerCase() ?? "unknown", $a(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : (Va(r), this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path }));
        }
      }
      parseInitError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      parseRequestError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise)
          return he(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted)
          return;
        let t = /* @__PURE__ */ __name(async () => {
          he("library starting");
          try {
            let r = { traceparent: this.config.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = true, he("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new L(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "t");
        return this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan("connect", t), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise)
          return he("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted)
          return;
        let t = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setTimeout(n, 5)), he("library stopping");
          let r = { traceparent: this.config.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(r)), this.libraryStarted = false, this.libraryStoppingPromise = void 0, he("library stopped");
        }, "t");
        return this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan("disconnect", t), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(t) {
        return this.library?.debugPanic(t);
      }
      async request(t, { traceparent: r, interactiveTransaction: n }) {
        he(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(t);
        try {
          await this.start(), this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let s = this.parseEngineResponse(await this.executingQueryPromise);
          if (s.errors)
            throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new G(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic)
            throw this.loggerRustPanic;
          return { data: s, elapsed: 0 };
        } catch (s) {
          if (s instanceof L)
            throw s;
          s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
          let a2 = this.parseRequestError(s.message);
          throw typeof a2 == "string" ? s : new G(`${a2.message}
${a2.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(t, { transaction: r, traceparent: n }) {
        he("requestBatch");
        let i = nr(t, r);
        await this.start(), this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify({ traceparent: n }), Zi2(r));
        let o = await this.executingQueryPromise, s = this.parseEngineResponse(o);
        if (s.errors)
          throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new G(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: a2, errors: u } = s;
        if (Array.isArray(a2))
          return a2.map((g) => g.errors && g.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(g.errors[0]) : { data: g, elapsed: 0 });
        throw u && u.length === 1 ? new Error(u[0].error) : new Error(JSON.stringify(s));
      }
      buildQueryError(t) {
        t.user_facing_error.is_panic;
        let r = this.getExternalAdapterError(t.user_facing_error);
        return r ? r.error : ir2(t, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(t) {
        if (t.error_code === Ba && this.config.adapter) {
          let r = t.meta?.id;
          qt(typeof r == "number", "Malformed external JS error received from the engine");
          let n = this.config.adapter.errorRegistry.consumeError(r);
          return qt(n, "External error with reported id was not registered"), n;
        }
      }
      async metrics(t) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(t));
        return t.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    }, "Rt");
    function ja(e) {
      return typeof e == "object" && e !== null && e.error_code !== void 0;
    }
    __name(ja, "ja");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var At = "Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started";
    var lr2 = /* @__PURE__ */ __name(class {
      constructor(t) {
        this.config = t;
        this.name = "AccelerateEngine";
        this.resolveDatasourceUrl = this.config.accelerateUtils?.resolveDatasourceUrl;
        this.getBatchRequestPayload = this.config.accelerateUtils?.getBatchRequestPayload;
        this.prismaGraphQLToJSError = this.config.accelerateUtils?.prismaGraphQLToJSError;
        this.PrismaClientUnknownRequestError = this.config.accelerateUtils?.PrismaClientUnknownRequestError;
        this.PrismaClientInitializationError = this.config.accelerateUtils?.PrismaClientInitializationError;
        this.PrismaClientKnownRequestError = this.config.accelerateUtils?.PrismaClientKnownRequestError;
        this.debug = this.config.accelerateUtils?.debug;
        this.engineVersion = this.config.accelerateUtils?.engineVersion;
        this.clientVersion = this.config.accelerateUtils?.clientVersion;
      }
      onBeforeExit(t) {
      }
      async start() {
      }
      async stop() {
      }
      version(t) {
        return "unknown";
      }
      transaction(t, r, n) {
        throw new L(At, this.config.clientVersion);
      }
      metrics(t) {
        throw new L(At, this.config.clientVersion);
      }
      request(t, r) {
        throw new L(At, this.config.clientVersion);
      }
      requestBatch(t, r) {
        throw new L(At, this.config.clientVersion);
      }
      applyPendingMigrations() {
        throw new L(At, this.config.clientVersion);
      }
    }, "lr");
    function to2({ copyEngine: e = true }, t) {
      let r;
      try {
        r = ar2({ inlineDatasources: t.inlineDatasources, overrideDatasources: t.overrideDatasources, env: { ...t.env, ...h.env }, clientVersion: t.clientVersion });
      } catch {
      }
      let n = !!(r?.startsWith("prisma://") || r?.startsWith("prisma+postgres://"));
      e && n && ct("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
      let i = at(t.generator), o = n || !e, s = !!t.adapter, a2 = i === "library", u = i === "binary";
      if (o && s || s && false) {
        let g;
        throw e ? r?.startsWith("prisma://") ? g = ["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."] : g = ["Prisma Client was configured to use both the `adapter` and Accelerate, please chose one."] : g = ["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."], new j(g.join(`
`), { clientVersion: t.clientVersion });
      }
      if (s)
        return new Rt(t);
      if (o)
        return new lr2(t);
      {
        let g = [`PrismaClient failed to initialize because it wasn't configured to run in this environment (${Ce2().prettyName}).`, "In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:", "- Enable Driver Adapters: https://pris.ly/d/driver-adapters", "- Enable Accelerate: https://pris.ly/d/accelerate"];
        throw new j(g.join(`
`), { clientVersion: t.clientVersion });
      }
      throw new j("Invalid client engine type, please use `library` or `binary`", { clientVersion: t.clientVersion });
    }
    __name(to2, "to");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function ur2({ generator: e }) {
      return e?.previewFeatures ?? [];
    }
    __name(ur2, "ur");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var ro = /* @__PURE__ */ __name((e) => ({ command: e }), "ro");
    c();
    m2();
    p2();
    d();
    f();
    l();
    c();
    m2();
    p2();
    d();
    f();
    l();
    var no = /* @__PURE__ */ __name((e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`), "no");
    c();
    m2();
    p2();
    d();
    f();
    l();
    l();
    function rt(e) {
      try {
        return io2(e, "fast");
      } catch {
        return io2(e, "slow");
      }
    }
    __name(rt, "rt");
    function io2(e, t) {
      return JSON.stringify(e.map((r) => so2(r, t)));
    }
    __name(io2, "io");
    function so2(e, t) {
      return Array.isArray(e) ? e.map((r) => so2(r, t)) : typeof e == "bigint" ? { prisma__type: "bigint", prisma__value: e.toString() } : je(e) ? { prisma__type: "date", prisma__value: e.toJSON() } : ue.isDecimal(e) ? { prisma__type: "decimal", prisma__value: e.toJSON() } : b.isBuffer(e) ? { prisma__type: "bytes", prisma__value: e.toString("base64") } : Qa(e) || ArrayBuffer.isView(e) ? { prisma__type: "bytes", prisma__value: b.from(e).toString("base64") } : typeof e == "object" && t === "slow" ? ao2(e) : e;
    }
    __name(so2, "so");
    function Qa(e) {
      return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? true : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Qa, "Qa");
    function ao2(e) {
      if (typeof e != "object" || e === null)
        return e;
      if (typeof e.toJSON == "function")
        return e.toJSON();
      if (Array.isArray(e))
        return e.map(oo2);
      let t = {};
      for (let r of Object.keys(e))
        t[r] = oo2(e[r]);
      return t;
    }
    __name(ao2, "ao");
    function oo2(e) {
      return typeof e == "bigint" ? e.toString() : ao2(e);
    }
    __name(oo2, "oo");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Ja = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];
    var lo = Ja;
    var Ga = /^(\s*alter\s)/i;
    var uo2 = ee("prisma:client");
    function zr(e, t, r, n) {
      if (!(e !== "postgresql" && e !== "cockroachdb") && r.length > 0 && Ga.exec(t))
        throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(zr, "zr");
    var Yr = /* @__PURE__ */ __name(({ clientMethod: e, activeProvider: t }) => (r) => {
      let n = "", i;
      if (bi(r))
        n = r.sql, i = { values: rt(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: rt(s || []), __prismaRawParameters__: true };
      } else
        switch (t) {
          case "sqlite":
          case "mysql": {
            n = r.sql, i = { values: rt(r.values), __prismaRawParameters__: true };
            break;
          }
          case "cockroachdb":
          case "postgresql":
          case "postgres": {
            n = r.text, i = { values: rt(r.values), __prismaRawParameters__: true };
            break;
          }
          case "sqlserver": {
            n = no(r), i = { values: rt(r.values), __prismaRawParameters__: true };
            break;
          }
          default:
            throw new Error(`The ${t} provider does not support ${e}`);
        }
      return i?.values ? uo2(`prisma.${e}(${n}, ${i.values})`) : uo2(`prisma.${e}(${n})`), { query: n, parameters: i };
    }, "Yr");
    var co2 = { requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    }, middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e;
      return new X(t, r);
    } };
    var mo = { requestArgsToMiddlewareArgs(e) {
      return [e];
    }, middlewareArgsToRequestArgs(e) {
      return e[0];
    } };
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Xr2(e) {
      return function(r) {
        let n, i = /* @__PURE__ */ __name((o = e) => {
          try {
            return o === void 0 || o?.kind === "itx" ? n ??= po(r(o)) : po(r(o));
          } catch (s) {
            return Promise.reject(s);
          }
        }, "i");
        return { then(o, s) {
          return i().then(o, s);
        }, catch(o) {
          return i().catch(o);
        }, finally(o) {
          return i().finally(o);
        }, requestTransaction(o) {
          let s = i(o);
          return s.requestTransaction ? s.requestTransaction(o) : s;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(Xr2, "Xr");
    function po(e) {
      return typeof e.then == "function" ? e : Promise.resolve(e);
    }
    __name(po, "po");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var fo = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, async createEngineSpan() {
    }, getActiveContext() {
    }, runInChildSpan(e, t) {
      return t();
    } };
    var Zr = /* @__PURE__ */ __name(class {
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(t) {
        return this.getGlobalTracingHelper().getTraceParent(t);
      }
      createEngineSpan(t) {
        return this.getGlobalTracingHelper().createEngineSpan(t);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(t, r) {
        return this.getGlobalTracingHelper().runInChildSpan(t, r);
      }
      getGlobalTracingHelper() {
        return globalThis.PRISMA_INSTRUMENTATION?.helper ?? fo;
      }
    }, "Zr");
    function go(e) {
      return e.includes("tracing") ? new Zr() : fo;
    }
    __name(go, "go");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function ho(e, t = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --e === 0 && r(t()), i?.(n);
      } };
    }
    __name(ho, "ho");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function yo(e) {
      return typeof e == "string" ? e : e.reduce((t, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
      }, void 0);
    }
    __name(yo, "yo");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var cr2 = /* @__PURE__ */ __name(class {
      constructor() {
        this._middlewares = [];
      }
      use(t) {
        this._middlewares.push(t);
      }
      get(t) {
        return this._middlewares[t];
      }
      has(t) {
        return !!this._middlewares[t];
      }
      length() {
        return this._middlewares.length;
      }
    }, "cr");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Eo = Fe(Vn());
    c();
    m2();
    p2();
    d();
    f();
    l();
    function mr2(e) {
      return typeof e.batchRequestIdx == "number";
    }
    __name(mr2, "mr");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function bo(e) {
      if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow")
        return;
      let t = [];
      return e.modelName && t.push(e.modelName), e.query.arguments && t.push(en(e.query.arguments)), t.push(en(e.query.selection)), t.join("");
    }
    __name(bo, "bo");
    function en(e) {
      return `(${Object.keys(e).sort().map((r) => {
        let n = e[r];
        return typeof n == "object" && n !== null ? `(${r} ${en(n)})` : r;
      }).join(" ")})`;
    }
    __name(en, "en");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Wa = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateOne: true, upsertOne: true };
    function tn(e) {
      return Wa[e];
    }
    __name(tn, "tn");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var pr = /* @__PURE__ */ __name(class {
      constructor(t) {
        this.options = t;
        this.tickActive = false;
        this.batches = {};
      }
      request(t) {
        let r = this.options.batchBy(t);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, h.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        })) : this.options.singleLoader(t);
      }
      dispatchBatches() {
        for (let t in this.batches) {
          let r = this.batches[t];
          delete this.batches[t], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
            if (n instanceof Error)
              for (let i = 0; i < r.length; i++)
                r[i].reject(n);
            else
              for (let i = 0; i < r.length; i++) {
                let o = n[i];
                o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
              }
          }).catch((n) => {
            for (let i = 0; i < r.length; i++)
              r[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    }, "pr");
    c();
    m2();
    p2();
    d();
    f();
    l();
    l();
    function Le(e, t) {
      if (t === null)
        return t;
      switch (e) {
        case "bigint":
          return BigInt(t);
        case "bytes":
          return b.from(t, "base64");
        case "decimal":
          return new ue(t);
        case "datetime":
        case "date":
          return new Date(t);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${t}Z`);
        case "bigint-array":
          return t.map((r) => Le("bigint", r));
        case "bytes-array":
          return t.map((r) => Le("bytes", r));
        case "decimal-array":
          return t.map((r) => Le("decimal", r));
        case "datetime-array":
          return t.map((r) => Le("datetime", r));
        case "date-array":
          return t.map((r) => Le("date", r));
        case "time-array":
          return t.map((r) => Le("time", r));
        default:
          return t;
      }
    }
    __name(Le, "Le");
    function wo(e) {
      let t = [], r = Ka(e);
      for (let n = 0; n < e.rows.length; n++) {
        let i = e.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++)
          o[e.columns[s]] = Le(e.types[s], i[s]);
        t.push(o);
      }
      return t;
    }
    __name(wo, "wo");
    function Ka(e) {
      let t = {};
      for (let r = 0; r < e.columns.length; r++)
        t[e.columns[r]] = null;
      return t;
    }
    __name(Ka, "Ka");
    var Ha = ee("prisma:client:request_handler");
    var dr = /* @__PURE__ */ __name(class {
      constructor(t, r) {
        this.logEmitter = r, this.client = t, this.dataloader = new pr({ batchLoader: Ji(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a2 = n.map((C) => C.protocolQuery), u = this.client._tracingHelper.getTraceParent(s), g = n.some((C) => tn(C.protocolQuery.action));
          return (await this.client._engine.requestBatch(a2, { traceparent: u, transaction: za(o), containsWrite: g, customDataProxyFetch: i })).map((C, O2) => {
            if (C instanceof Error)
              return C;
            try {
              return this.mapQueryEngineResult(n[O2], C);
            } catch (A) {
              return A;
            }
          });
        }), singleLoader: async (n) => {
          let i = n.transaction?.kind === "itx" ? xo(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: tn(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, batchBy: (n) => n.transaction?.id ? `transaction-${n.transaction.id}` : bo(n.protocolQuery), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(t) {
        try {
          return await this.dataloader.request(t);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a2 } = t;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a2, globalOmit: t.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
        let i = n?.data, o = n?.elapsed, s = this.unpack(i, t, r);
        return h.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s;
      }
      handleAndLogRequestError(t) {
        try {
          this.handleRequestError(t);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: t.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: t, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a2 }) {
        if (Ha(t), Ya(t, i) || t instanceof we)
          throw t;
        if (t instanceof J && Xa(t)) {
          let g = Po(t.meta);
          zt({ args: o, errors: [g], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a2 });
        }
        let u = t.message;
        if (n && (u = Je({ callsite: n, originalMethod: r, isPanic: t.isPanic, showColors: this.client._errorFormat === "pretty", message: u })), u = this.sanitizeMessage(u), t.code) {
          let g = s ? { modelName: s, ...t.meta } : t.meta;
          throw new J(u, { code: t.code, clientVersion: this.client._clientVersion, meta: g, batchRequestIdx: t.batchRequestIdx });
        } else {
          if (t.isPanic)
            throw new Ee(u, this.client._clientVersion);
          if (t instanceof G)
            throw new G(u, { clientVersion: this.client._clientVersion, batchRequestIdx: t.batchRequestIdx });
          if (t instanceof L)
            throw new L(u, this.client._clientVersion);
          if (t instanceof Ee)
            throw new Ee(u, this.client._clientVersion);
        }
        throw t.clientVersion = this.client._clientVersion, t;
      }
      sanitizeMessage(t) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Eo.default)(t) : t;
      }
      unpack(t, r, n) {
        if (!t || (t.data && (t = t.data), !t))
          return t;
        let i = Object.keys(t)[0], o = Object.values(t)[0], s = r.filter((g) => g !== "select" && g !== "include"), a2 = Jr(o, s), u = i === "queryRaw" ? wo(a2) : $e2(a2);
        return n ? n(u) : u;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    }, "dr");
    function za(e) {
      if (e) {
        if (e.kind === "batch")
          return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
        if (e.kind === "itx")
          return { kind: "itx", options: xo(e) };
        be(e, "Unknown transaction kind");
      }
    }
    __name(za, "za");
    function xo(e) {
      return { id: e.id, payload: e.payload };
    }
    __name(xo, "xo");
    function Ya(e, t) {
      return mr2(e) && t?.kind === "batch" && e.batchRequestIdx !== t.index;
    }
    __name(Ya, "Ya");
    function Xa(e) {
      return e.code === "P2009" || e.code === "P2012";
    }
    __name(Xa, "Xa");
    function Po(e) {
      if (e.kind === "Union")
        return { kind: "Union", errors: e.errors.map(Po) };
      if (Array.isArray(e.selectionPath)) {
        let [, ...t] = e.selectionPath;
        return { ...e, selectionPath: t };
      }
      return e;
    }
    __name(Po, "Po");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var vo = "5.22.0";
    var To = vo;
    c();
    m2();
    p2();
    d();
    f();
    l();
    var Oo = Fe(kr());
    c();
    m2();
    p2();
    d();
    f();
    l();
    var _2 = /* @__PURE__ */ __name(class extends Error {
      constructor(t) {
        super(t + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    }, "_");
    K(_2, "PrismaClientConstructorValidationError");
    var Co = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var Ro = ["pretty", "colorless", "minimal"];
    var Ao = ["info", "query", "warn", "error"];
    var el = { datasources: (e, { datasourceNames: t }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e))
          throw new _2(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = nt(r, t) || ` Available datasources: ${t.join(", ")}`;
            throw new _2(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n))
            throw new _2(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object")
            for (let [i, o] of Object.entries(n)) {
              if (i !== "url")
                throw new _2(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
              if (typeof o != "string")
                throw new _2(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            }
        }
      }
    }, adapter: (e, t) => {
      if (e === null)
        return;
      if (e === void 0)
        throw new _2('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!ur2(t).includes("driverAdapters"))
        throw new _2('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (at() === "binary")
        throw new _2('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, datasourceUrl: (e) => {
      if (typeof e < "u" && typeof e != "string")
        throw new _2(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, errorFormat: (e) => {
      if (e) {
        if (typeof e != "string")
          throw new _2(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!Ro.includes(e)) {
          let t = nt(e, Ro);
          throw new _2(`Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`);
        }
      }
    }, log: (e) => {
      if (!e)
        return;
      if (!Array.isArray(e))
        throw new _2(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
      function t(r) {
        if (typeof r == "string" && !Ao.includes(r)) {
          let n = nt(r, Ao);
          throw new _2(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(t, "t");
      for (let r of e) {
        t(r);
        let n = { level: t, emit: (i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = nt(i, o);
            throw new _2(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        } };
        if (r && typeof r == "object")
          for (let [i, o] of Object.entries(r))
            if (n[i])
              n[i](o);
            else
              throw new _2(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, transactionOptions: (e) => {
      if (!e)
        return;
      let t = e.maxWait;
      if (t != null && t <= 0)
        throw new _2(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = e.timeout;
      if (r != null && r <= 0)
        throw new _2(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, omit: (e, t) => {
      if (typeof e != "object")
        throw new _2('"omit" option is expected to be an object.');
      if (e === null)
        throw new _2('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(e)) {
        let o = rl(n, t.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a2] of Object.entries(i)) {
          let u = o.fields.find((g) => g.name === s);
          if (!u) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (u.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a2 != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0)
        throw new _2(nl(e, r));
    }, __internal: (e) => {
      if (!e)
        return;
      let t = ["debug", "engine", "configOverride"];
      if (typeof e != "object")
        throw new _2(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(e))
        if (!t.includes(r)) {
          let n = nt(r, t);
          throw new _2(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
        }
    } };
    function ko(e, t) {
      for (let [r, n] of Object.entries(e)) {
        if (!Co.includes(r)) {
          let i = nt(r, Co);
          throw new _2(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        el[r](n, t);
      }
      if (e.datasourceUrl && e.datasources)
        throw new _2('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(ko, "ko");
    function nt(e, t) {
      if (t.length === 0 || typeof e != "string")
        return "";
      let r = tl(e, t);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(nt, "nt");
    function tl(e, t) {
      if (t.length === 0)
        return null;
      let r = t.map((i) => ({ value: i, distance: (0, Oo.default)(e, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(tl, "tl");
    function rl(e, t) {
      return So(t.models, e) ?? So(t.types, e);
    }
    __name(rl, "rl");
    function So(e, t) {
      let r = Object.keys(e).find((n) => Ve2(n) === t);
      if (r)
        return e[r];
    }
    __name(So, "So");
    function nl(e, t) {
      let r = Ye(e);
      for (let o of t)
        switch (o.kind) {
          case "UnknownModel":
            r.arguments.getField(o.modelKey)?.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
            break;
          case "UnknownField":
            r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
            break;
          case "RelationInOmit":
            r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
            break;
          case "InvalidFieldValue":
            r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
            break;
        }
      let { message: n, args: i } = Ht2(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(nl, "nl");
    c();
    m2();
    p2();
    d();
    f();
    l();
    function Mo(e) {
      return e.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
        let n = new Array(e.length), i = null, o = false, s = 0, a2 = /* @__PURE__ */ __name(() => {
          o || (s++, s === e.length && (o = true, i ? r(i) : t(n)));
        }, "a"), u = /* @__PURE__ */ __name((g) => {
          o || (o = true, r(g));
        }, "u");
        for (let g = 0; g < e.length; g++)
          e[g].then((T) => {
            n[g] = T, a2();
          }, (T) => {
            if (!mr2(T)) {
              u(T);
              return;
            }
            T.batchRequestIdx === g ? u(T) : (i || (i = T), a2());
          });
      });
    }
    __name(Mo, "Mo");
    var Re = ee("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var il = { requestArgsToMiddlewareArgs: (e) => e, middlewareArgsToRequestArgs: (e) => e };
    var ol = Symbol.for("prisma.client.transaction.id");
    var sl = { id: 0, nextId() {
      return ++this.id;
    } };
    function _o(e) {
      class t {
        constructor(n) {
          this._originalClient = this;
          this._middlewares = new cr2();
          this._createPrismaPromise = Xr2();
          this.$extends = Ni;
          e = n?.__internal?.configOverride?.(e) ?? e, zi(e), n && ko(n, e);
          let i = new Ut().on("error", () => {
          });
          this._extensions = Xe2.empty(), this._previewFeatures = ur2(e), this._clientVersion = e.clientVersion ?? To, this._activeProvider = e.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = go(this._previewFeatures);
          let o = { rootEnvPath: e.relativeEnvPaths.rootEnvPath && st.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath), schemaEnvPath: e.relativeEnvPaths.schemaEnvPath && st.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath) }, s;
          if (n?.adapter) {
            s = $r(n.adapter);
            let u = e.activeProvider === "postgresql" ? "postgres" : e.activeProvider;
            if (s.provider !== u)
              throw new L(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${u}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0)
              throw new L("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a2 = e.injectableEdgeEnv?.();
          try {
            let u = n ?? {}, g = u.__internal ?? {}, T = g.debug === true;
            T && ee.enable("prisma:client");
            let C = st.resolve(e.dirname, e.relativePath);
            yn.existsSync(C) || (C = e.dirname), Re("dirname", e.dirname), Re("relativePath", e.relativePath), Re("cwd", C);
            let O2 = g.engine || {};
            if (u.errorFormat ? this._errorFormat = u.errorFormat : h.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : h.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = { cwd: C, dirname: e.dirname, enableDebugLogs: T, allowTriggerPanic: O2.allowTriggerPanic, datamodelPath: st.join(e.dirname, e.filename ?? "schema.prisma"), prismaPath: O2.binaryPath ?? void 0, engineEndpoint: O2.endpoint, generator: e.generator, showColors: this._errorFormat === "pretty", logLevel: u.log && yo(u.log), logQueries: u.log && !!(typeof u.log == "string" ? u.log === "query" : u.log.find((A) => typeof A == "string" ? A === "query" : A.level === "query")), env: a2?.parsed ?? {}, flags: [], engineWasm: e.engineWasm, clientVersion: e.clientVersion, engineVersion: e.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e.activeProvider, inlineSchema: e.inlineSchema, overrideDatasources: Yi(u, e.datasourceNames), inlineDatasources: e.inlineDatasources, inlineSchemaHash: e.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: u.transactionOptions?.maxWait ?? 2e3, timeout: u.transactionOptions?.timeout ?? 5e3, isolationLevel: u.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: e.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: ar2, getBatchRequestPayload: nr, prismaGraphQLToJSError: ir2, PrismaClientUnknownRequestError: G, PrismaClientInitializationError: L, PrismaClientKnownRequestError: J, debug: ee("prisma:client:accelerateEngine"), engineVersion: Lo.version, clientVersion: e.clientVersion } }, Re("clientVersion", e.clientVersion), this._engine = to2(e, this._engineConfig), this._requestHandler = new dr(this, i), u.log)
              for (let A of u.log) {
                let M = typeof A == "string" ? A : A.emit === "stdout" ? A.level : null;
                M && this.$on(M, (S2) => {
                  ut.log(`${ut.tags[M] ?? ""}`, S2.message || S2.query);
                });
              }
            this._metrics = new Ze(this._engine);
          } catch (u) {
            throw u.clientVersion = this._clientVersion, u;
          }
          return this._appliedParent = Tt(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $use(n) {
          this._middlewares.use(n);
        }
        $on(n, i) {
          n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i);
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            Mn();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a2 = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: Yr({ clientMethod: i, activeProvider: a2 }), callsite: Te2(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a2] = Io(n, i);
              return zr(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a2);
            }
            throw new j("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (zr(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (e.activeProvider !== "mongodb")
            throw new j(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: ro, callsite: Te2(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a2 = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: Yr({ clientMethod: i, activeProvider: a2 }), callsite: Te2(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0)
              return this.$queryRawInternal(o, "$queryRaw", ...Io(n, i));
            throw new j("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql"))
              throw new j("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = sl.nextId(), s = ho(n.length), a2 = n.map((u, g) => {
            if (u?.[Symbol.toStringTag] !== "PrismaPromise")
              throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let T = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, C = { kind: "batch", id: o, index: g, isolationLevel: T, lock: s };
            return u.requestTransaction?.(C) ?? u;
          });
          return Mo(a2);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a2 = await this._engine.transaction("start", o, s), u;
          try {
            let g = { kind: "itx", ...a2 };
            u = await n(this._createItxClient(g)), await this._engine.transaction("commit", o, a2);
          } catch (g) {
            throw await this._engine.transaction("rollback", o, a2).catch(() => {
            }), g;
          }
          return u;
        }
        _createItxClient(n) {
          return Tt(ge2(Fi(this), [H("_appliedParent", () => this._appliedParent._createItxClient(n)), H("_createPrismaPromise", () => Xr2(n)), H(ol, () => n.id), et2(lo)]));
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = /* @__PURE__ */ __name(() => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          }, "o") : o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? il, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a2 = -1, u = /* @__PURE__ */ __name(async (g) => {
            let T = this._middlewares.get(++a2);
            if (T)
              return this._tracingHelper.runInChildSpan(s.middleware, (I2) => T(g, (ne) => (I2?.end(), u(ne))));
            let { runInTransaction: C, args: O2, ...A } = g, M = { ...n, ...A };
            O2 && (M.args = i.middlewareArgsToRequestArgs(O2)), n.transaction !== void 0 && C === false && delete M.transaction;
            let S2 = await Qi(this, M);
            return M.model ? Bi({ result: S2, modelName: M.model, args: M.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : S2;
          }, "u");
          return this._tracingHelper.runInChildSpan(s.operation, () => u(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a2, model: u, argsMapper: g, transaction: T, unpacker: C, otelParentCtx: O2, customDataProxyFetch: A }) {
          try {
            n = g ? g(n) : n;
            let M = { name: "serialize" }, S2 = this._tracingHelper.runInChildSpan(M, () => Zt({ modelName: u, runtimeDataModel: this._runtimeDataModel, action: a2, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return ee.enabled("prisma:client") && (Re("Prisma Client call:"), Re(`prisma.${i}(${Ci(n)})`), Re("Generated request:"), Re(JSON.stringify(S2, null, 2) + `
`)), T?.kind === "batch" && await T.lock, this._requestHandler.request({ protocolQuery: S2, modelName: u, action: a2, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: T, unpacker: C, otelParentCtx: O2, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: A });
          } catch (M) {
            throw M.clientVersion = this._clientVersion, M;
          }
        }
        get $metrics() {
          if (!this._hasPreviewFlag("metrics"))
            throw new j("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: this._clientVersion });
          return this._metrics;
        }
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
      }
      __name(t, "t");
      return t;
    }
    __name(_o, "_o");
    function Io(e, t) {
      return al(e) ? [new X(e, t), co2] : [e, mo];
    }
    __name(Io, "Io");
    function al(e) {
      return Array.isArray(e) && Array.isArray(e.raw);
    }
    __name(al, "al");
    c();
    m2();
    p2();
    d();
    f();
    l();
    var ll = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Do(e) {
      return new Proxy(e, { get(t, r) {
        if (r in t)
          return t[r];
        if (!ll.has(r))
          throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Do, "Do");
    c();
    m2();
    p2();
    d();
    f();
    l();
    l();
  }
});

// ../../node_modules/.prisma/client/query_engine_bg.js
var require_query_engine_bg = __commonJS({
  "../../node_modules/.prisma/client/query_engine_bg.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    var j = Object.defineProperty;
    var R = Object.getOwnPropertyDescriptor;
    var D = Object.getOwnPropertyNames;
    var M = Object.prototype.hasOwnProperty;
    var U2 = /* @__PURE__ */ __name((t, e) => {
      for (var n in e)
        j(t, n, { get: e[n], enumerable: true });
    }, "U");
    var B = /* @__PURE__ */ __name((t, e, n, _2) => {
      if (e && typeof e == "object" || typeof e == "function")
        for (let o of D(e))
          !M.call(t, o) && o !== n && j(t, o, { get: () => e[o], enumerable: !(_2 = R(e, o)) || _2.enumerable });
      return t;
    }, "B");
    var N = /* @__PURE__ */ __name((t) => B(j({}, "__esModule", { value: true }), t), "N");
    var Ee = {};
    U2(Ee, { QueryEngine: () => G, __wbg_String_88810dfeb4021902: () => Dt, __wbg_buffer_344d9b41efe96da7: () => Ut, __wbg_call_53fc3abd42e24ec8: () => fe, __wbg_call_669127b9d730c650: () => Kt, __wbg_crypto_58f13aa23ffcb166: () => zt, __wbg_done_bc26bf4ada718266: () => te, __wbg_entries_6d727b73ee02b7ce: () => me, __wbg_exec_393fa168a3695345: () => Ft, __wbg_getRandomValues_504510b5564925af: () => $t2, __wbg_getTime_ed6ee333b702f8fc: () => ct, __wbg_get_2aff440840bb6202: () => re, __wbg_get_4a9aa5157afeb382: () => Xt, __wbg_get_94990005bd6ca07c: () => Rt, __wbg_getwithrefkey_5e6d9547403deab8: () => Et, __wbg_globalThis_17eff828815f7d84: () => ce, __wbg_global_46f939f6541643c5: () => ie, __wbg_has_cdf8b85f6e903c80: () => rt, __wbg_instanceof_ArrayBuffer_c7cc317e5c29cc0d: () => ye, __wbg_instanceof_Promise_cfbcc42300367513: () => at, __wbg_instanceof_Uint8Array_19e6f142a5e7e1e1: () => xe, __wbg_isArray_38525be7442aa21e: () => se2, __wbg_isSafeInteger_c38b0a16d0c7cef7: () => ae, __wbg_iterator_7ee1a391d310f8e4: () => gt, __wbg_length_a5587d6cd79ab197: () => le, __wbg_length_cace2e0b3ddc0502: () => bt2, __wbg_msCrypto_abcb1295e768d1f2: () => Qt, __wbg_new0_ad75dd38f92424e2: () => ot, __wbg_new_00f9fd9cefd9f65c: () => vt, __wbg_new_08236689f0afb357: () => Tt, __wbg_new_1b94180eeb48f2a2: () => St2, __wbg_new_c728d68b8b34487e: () => At, __wbg_new_d8a000788389a31e: () => Nt, __wbg_new_feb65b865d980ae2: () => Y, __wbg_newnoargs_ccdcae30fd002262: () => ue, __wbg_newwithbyteoffsetandlength_2dc04d99088b15e3: () => Bt2, __wbg_newwithlength_13b5319ab422dcf6: () => Ht2, __wbg_next_15da6a3df9290720: () => ne, __wbg_next_1989a20442400aaa: () => Zt, __wbg_node_523d7bd03ef69fba: () => Wt2, __wbg_now_28a6b413aca4a96a: () => we, __wbg_now_4579335d3581594c: () => st, __wbg_now_8ed1a4454e40ecd1: () => ut, __wbg_parse_3f0cb48976ca4123: () => _t, __wbg_process_5b786e71d465a513: () => Lt, __wbg_push_fd3233d09cf81821: () => kt, __wbg_randomFillSync_a0d98aa11c81fe89: () => Vt2, __wbg_require_2784e593a4674877: () => Jt, __wbg_resolve_a3252b2860f0a09e: () => Oe, __wbg_self_3fad056edded10bd: () => _e2, __wbg_setTimeout_631fe61f31fa2fad: () => Z, __wbg_set_0ac78a2bc07da03c: () => It2, __wbg_set_3355b9f2d3092e3b: () => jt, __wbg_set_40f7786a25a9cc7e: () => be, __wbg_set_841ac57cff3d672b: () => qt, __wbg_set_dcfd613a3420f908: () => de, __wbg_set_wasm: () => C, __wbg_stringify_4039297315a25b00: () => ge2, __wbg_subarray_6ca5cfa7fbb9abbe: () => Ct, __wbg_then_1bbc9edafd859b06: () => je, __wbg_then_89e1c559530b85cf: () => Ae, __wbg_valueOf_ff4b62641803432a: () => Yt, __wbg_value_0570714ff7d75f35: () => ee, __wbg_versions_c2ab80650590b6a2: () => Pt3, __wbg_window_a4f46c98a61d4089: () => oe, __wbindgen_bigint_from_i64: () => pt, __wbindgen_bigint_from_u64: () => yt, __wbindgen_bigint_get_as_i64: () => Te2, __wbindgen_boolean_get: () => dt, __wbindgen_cb_drop: () => Se, __wbindgen_closure_wrapper7038: () => qe, __wbindgen_debug_string: () => Ie, __wbindgen_error_new: () => X, __wbindgen_in: () => xt, __wbindgen_is_bigint: () => lt, __wbindgen_is_function: () => Gt, __wbindgen_is_object: () => ft, __wbindgen_is_string: () => Ot, __wbindgen_is_undefined: () => nt, __wbindgen_jsval_eq: () => mt, __wbindgen_jsval_loose_eq: () => pe2, __wbindgen_memory: () => Mt, __wbindgen_number_get: () => wt2, __wbindgen_number_new: () => ht, __wbindgen_object_clone_ref: () => et2, __wbindgen_object_drop_ref: () => it, __wbindgen_string_get: () => K, __wbindgen_string_new: () => tt2, __wbindgen_throw: () => he, debug_panic: () => Q, getBuildTimeInfo: () => J });
    module.exports = N(Ee);
    var T = /* @__PURE__ */ __name(() => {
    }, "T");
    T.prototype = T;
    var c;
    function C(t) {
      c = t;
    }
    __name(C, "C");
    var w2 = new Array(128).fill(void 0);
    w2.push(void 0, null, true, false);
    function r(t) {
      return w2[t];
    }
    __name(r, "r");
    var a2 = 0;
    var I2 = null;
    function S2() {
      return (I2 === null || I2.byteLength === 0) && (I2 = new Uint8Array(c.memory.buffer)), I2;
    }
    __name(S2, "S");
    var $ = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
    var A = new $("utf-8");
    var V = typeof A.encodeInto == "function" ? function(t, e) {
      return A.encodeInto(t, e);
    } : function(t, e) {
      const n = A.encode(t);
      return e.set(n), { read: t.length, written: n.length };
    };
    function d(t, e, n) {
      if (n === void 0) {
        const s = A.encode(t), y2 = e(s.length, 1) >>> 0;
        return S2().subarray(y2, y2 + s.length).set(s), a2 = s.length, y2;
      }
      let _2 = t.length, o = e(_2, 1) >>> 0;
      const f = S2();
      let u = 0;
      for (; u < _2; u++) {
        const s = t.charCodeAt(u);
        if (s > 127)
          break;
        f[o + u] = s;
      }
      if (u !== _2) {
        u !== 0 && (t = t.slice(u)), o = n(o, _2, _2 = u + t.length * 3, 1) >>> 0;
        const s = S2().subarray(o + u, o + _2), y2 = V(t, s);
        u += y2.written, o = n(o, _2, u, 1) >>> 0;
      }
      return a2 = u, o;
    }
    __name(d, "d");
    function p2(t) {
      return t == null;
    }
    __name(p2, "p");
    var m2 = null;
    function l() {
      return (m2 === null || m2.buffer.detached === true || m2.buffer.detached === void 0 && m2.buffer !== c.memory.buffer) && (m2 = new DataView(c.memory.buffer)), m2;
    }
    __name(l, "l");
    var z2 = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
    var q = new z2("utf-8", { ignoreBOM: true, fatal: true });
    q.decode();
    function x2(t, e) {
      return t = t >>> 0, q.decode(S2().subarray(t, t + e));
    }
    __name(x2, "x");
    var h = w2.length;
    function i(t) {
      h === w2.length && w2.push(w2.length + 1);
      const e = h;
      return h = w2[e], w2[e] = t, e;
    }
    __name(i, "i");
    function L(t) {
      t < 132 || (w2[t] = h, h = t);
    }
    __name(L, "L");
    function b(t) {
      const e = r(t);
      return L(t), e;
    }
    __name(b, "b");
    function O2(t) {
      const e = typeof t;
      if (e == "number" || e == "boolean" || t == null)
        return `${t}`;
      if (e == "string")
        return `"${t}"`;
      if (e == "symbol") {
        const o = t.description;
        return o == null ? "Symbol" : `Symbol(${o})`;
      }
      if (e == "function") {
        const o = t.name;
        return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
      }
      if (Array.isArray(t)) {
        const o = t.length;
        let f = "[";
        o > 0 && (f += O2(t[0]));
        for (let u = 1; u < o; u++)
          f += ", " + O2(t[u]);
        return f += "]", f;
      }
      const n = /\[object ([^\]]+)\]/.exec(toString.call(t));
      let _2;
      if (n.length > 1)
        _2 = n[1];
      else
        return toString.call(t);
      if (_2 == "Object")
        try {
          return "Object(" + JSON.stringify(t) + ")";
        } catch {
          return "Object";
        }
      return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : _2;
    }
    __name(O2, "O");
    var E2 = typeof FinalizationRegistry > "u" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((t) => {
      c.__wbindgen_export_2.get(t.dtor)(t.a, t.b);
    });
    function P(t, e, n, _2) {
      const o = { a: t, b: e, cnt: 1, dtor: n }, f = /* @__PURE__ */ __name((...u) => {
        o.cnt++;
        const s = o.a;
        o.a = 0;
        try {
          return _2(s, o.b, ...u);
        } finally {
          --o.cnt === 0 ? (c.__wbindgen_export_2.get(o.dtor)(s, o.b), E2.unregister(o)) : o.a = s;
        }
      }, "f");
      return f.original = o, E2.register(f, o, o), f;
    }
    __name(P, "P");
    function W(t, e, n) {
      c._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h9eef02caf99553a1(t, e, i(n));
    }
    __name(W, "W");
    function J() {
      const t = c.getBuildTimeInfo();
      return b(t);
    }
    __name(J, "J");
    function Q(t) {
      try {
        const f = c.__wbindgen_add_to_stack_pointer(-16);
        var e = p2(t) ? 0 : d(t, c.__wbindgen_malloc, c.__wbindgen_realloc), n = a2;
        c.debug_panic(f, e, n);
        var _2 = l().getInt32(f + 4 * 0, true), o = l().getInt32(f + 4 * 1, true);
        if (o)
          throw b(_2);
      } finally {
        c.__wbindgen_add_to_stack_pointer(16);
      }
    }
    __name(Q, "Q");
    function g(t, e) {
      try {
        return t.apply(this, e);
      } catch (n) {
        c.__wbindgen_exn_store(i(n));
      }
    }
    __name(g, "g");
    function H(t, e, n, _2) {
      c.wasm_bindgen__convert__closures__invoke2_mut__h174c8485536aed69(t, e, i(n), i(_2));
    }
    __name(H, "H");
    var k = typeof FinalizationRegistry > "u" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((t) => c.__wbg_queryengine_free(t >>> 0, 1));
    var G = class {
      __destroy_into_raw() {
        const e = this.__wbg_ptr;
        return this.__wbg_ptr = 0, k.unregister(this), e;
      }
      free() {
        const e = this.__destroy_into_raw();
        c.__wbg_queryengine_free(e, 0);
      }
      constructor(e, n, _2) {
        try {
          const s = c.__wbindgen_add_to_stack_pointer(-16);
          c.queryengine_new(s, i(e), i(n), i(_2));
          var o = l().getInt32(s + 4 * 0, true), f = l().getInt32(s + 4 * 1, true), u = l().getInt32(s + 4 * 2, true);
          if (u)
            throw b(f);
          return this.__wbg_ptr = o >>> 0, k.register(this, this.__wbg_ptr, this), this;
        } finally {
          c.__wbindgen_add_to_stack_pointer(16);
        }
      }
      connect(e) {
        const n = d(e, c.__wbindgen_malloc, c.__wbindgen_realloc), _2 = a2, o = c.queryengine_connect(this.__wbg_ptr, n, _2);
        return b(o);
      }
      disconnect(e) {
        const n = d(e, c.__wbindgen_malloc, c.__wbindgen_realloc), _2 = a2, o = c.queryengine_disconnect(this.__wbg_ptr, n, _2);
        return b(o);
      }
      query(e, n, _2) {
        const o = d(e, c.__wbindgen_malloc, c.__wbindgen_realloc), f = a2, u = d(n, c.__wbindgen_malloc, c.__wbindgen_realloc), s = a2;
        var y2 = p2(_2) ? 0 : d(_2, c.__wbindgen_malloc, c.__wbindgen_realloc), v2 = a2;
        const F = c.queryengine_query(this.__wbg_ptr, o, f, u, s, y2, v2);
        return b(F);
      }
      startTransaction(e, n) {
        const _2 = d(e, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2, f = d(n, c.__wbindgen_malloc, c.__wbindgen_realloc), u = a2, s = c.queryengine_startTransaction(this.__wbg_ptr, _2, o, f, u);
        return b(s);
      }
      commitTransaction(e, n) {
        const _2 = d(e, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2, f = d(n, c.__wbindgen_malloc, c.__wbindgen_realloc), u = a2, s = c.queryengine_commitTransaction(this.__wbg_ptr, _2, o, f, u);
        return b(s);
      }
      rollbackTransaction(e, n) {
        const _2 = d(e, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2, f = d(n, c.__wbindgen_malloc, c.__wbindgen_realloc), u = a2, s = c.queryengine_rollbackTransaction(this.__wbg_ptr, _2, o, f, u);
        return b(s);
      }
      metrics(e) {
        const n = d(e, c.__wbindgen_malloc, c.__wbindgen_realloc), _2 = a2, o = c.queryengine_metrics(this.__wbg_ptr, n, _2);
        return b(o);
      }
    };
    __name(G, "G");
    function K(t, e) {
      const n = r(e), _2 = typeof n == "string" ? n : void 0;
      var o = p2(_2) ? 0 : d(_2, c.__wbindgen_malloc, c.__wbindgen_realloc), f = a2;
      l().setInt32(t + 4 * 1, f, true), l().setInt32(t + 4 * 0, o, true);
    }
    __name(K, "K");
    function X(t, e) {
      const n = new Error(x2(t, e));
      return i(n);
    }
    __name(X, "X");
    function Y(t, e) {
      try {
        var n = { a: t, b: e }, _2 = /* @__PURE__ */ __name((f, u) => {
          const s = n.a;
          n.a = 0;
          try {
            return H(s, n.b, f, u);
          } finally {
            n.a = s;
          }
        }, "_");
        const o = new Promise(_2);
        return i(o);
      } finally {
        n.a = n.b = 0;
      }
    }
    __name(Y, "Y");
    function Z(t, e) {
      return setTimeout(r(t), e >>> 0);
    }
    __name(Z, "Z");
    function tt2(t, e) {
      const n = x2(t, e);
      return i(n);
    }
    __name(tt2, "tt");
    function et2(t) {
      const e = r(t);
      return i(e);
    }
    __name(et2, "et");
    function nt(t) {
      return r(t) === void 0;
    }
    __name(nt, "nt");
    function rt() {
      return g(function(t, e) {
        return Reflect.has(r(t), r(e));
      }, arguments);
    }
    __name(rt, "rt");
    function _t() {
      return g(function(t, e) {
        const n = JSON.parse(x2(t, e));
        return i(n);
      }, arguments);
    }
    __name(_t, "_t");
    function ot() {
      return i(/* @__PURE__ */ new Date());
    }
    __name(ot, "ot");
    function ct(t) {
      return r(t).getTime();
    }
    __name(ct, "ct");
    function it(t) {
      b(t);
    }
    __name(it, "it");
    function ut(t) {
      return r(t).now();
    }
    __name(ut, "ut");
    function st() {
      return Date.now();
    }
    __name(st, "st");
    function ft(t) {
      const e = r(t);
      return typeof e == "object" && e !== null;
    }
    __name(ft, "ft");
    function at(t) {
      let e;
      try {
        e = r(t) instanceof Promise;
      } catch {
        e = false;
      }
      return e;
    }
    __name(at, "at");
    function bt2(t) {
      return r(t).length;
    }
    __name(bt2, "bt");
    function gt() {
      return i(Symbol.iterator);
    }
    __name(gt, "gt");
    function dt(t) {
      const e = r(t);
      return typeof e == "boolean" ? e ? 1 : 0 : 2;
    }
    __name(dt, "dt");
    function lt(t) {
      return typeof r(t) == "bigint";
    }
    __name(lt, "lt");
    function wt2(t, e) {
      const n = r(e), _2 = typeof n == "number" ? n : void 0;
      l().setFloat64(t + 8 * 1, p2(_2) ? 0 : _2, true), l().setInt32(t + 4 * 0, !p2(_2), true);
    }
    __name(wt2, "wt");
    function pt(t) {
      return i(t);
    }
    __name(pt, "pt");
    function xt(t, e) {
      return r(t) in r(e);
    }
    __name(xt, "xt");
    function yt(t) {
      const e = BigInt.asUintN(64, t);
      return i(e);
    }
    __name(yt, "yt");
    function mt(t, e) {
      return r(t) === r(e);
    }
    __name(mt, "mt");
    function ht(t) {
      return i(t);
    }
    __name(ht, "ht");
    function Tt() {
      const t = new Array();
      return i(t);
    }
    __name(Tt, "Tt");
    function It2(t, e, n) {
      r(t)[e >>> 0] = b(n);
    }
    __name(It2, "It");
    function St2() {
      return i(/* @__PURE__ */ new Map());
    }
    __name(St2, "St");
    function At() {
      const t = new Object();
      return i(t);
    }
    __name(At, "At");
    function jt(t, e, n) {
      const _2 = r(t).set(r(e), r(n));
      return i(_2);
    }
    __name(jt, "jt");
    function Ot(t) {
      return typeof r(t) == "string";
    }
    __name(Ot, "Ot");
    function qt(t, e, n) {
      r(t)[b(e)] = b(n);
    }
    __name(qt, "qt");
    function Et(t, e) {
      const n = r(t)[r(e)];
      return i(n);
    }
    __name(Et, "Et");
    function kt(t, e) {
      return r(t).push(r(e));
    }
    __name(kt, "kt");
    function vt(t, e, n, _2) {
      const o = new RegExp(x2(t, e), x2(n, _2));
      return i(o);
    }
    __name(vt, "vt");
    function Ft(t, e, n) {
      const _2 = r(t).exec(x2(e, n));
      return p2(_2) ? 0 : i(_2);
    }
    __name(Ft, "Ft");
    function Rt() {
      return g(function(t, e) {
        const n = r(t)[b(e)];
        return i(n);
      }, arguments);
    }
    __name(Rt, "Rt");
    function Dt(t, e) {
      const n = String(r(e)), _2 = d(n, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2;
      l().setInt32(t + 4 * 1, o, true), l().setInt32(t + 4 * 0, _2, true);
    }
    __name(Dt, "Dt");
    function Mt() {
      const t = c.memory;
      return i(t);
    }
    __name(Mt, "Mt");
    function Ut(t) {
      const e = r(t).buffer;
      return i(e);
    }
    __name(Ut, "Ut");
    function Bt2(t, e, n) {
      const _2 = new Uint8Array(r(t), e >>> 0, n >>> 0);
      return i(_2);
    }
    __name(Bt2, "Bt");
    function Nt(t) {
      const e = new Uint8Array(r(t));
      return i(e);
    }
    __name(Nt, "Nt");
    function Ct(t, e, n) {
      const _2 = r(t).subarray(e >>> 0, n >>> 0);
      return i(_2);
    }
    __name(Ct, "Ct");
    function $t2() {
      return g(function(t, e) {
        r(t).getRandomValues(r(e));
      }, arguments);
    }
    __name($t2, "$t");
    function Vt2() {
      return g(function(t, e) {
        r(t).randomFillSync(b(e));
      }, arguments);
    }
    __name(Vt2, "Vt");
    function zt(t) {
      const e = r(t).crypto;
      return i(e);
    }
    __name(zt, "zt");
    function Lt(t) {
      const e = r(t).process;
      return i(e);
    }
    __name(Lt, "Lt");
    function Pt3(t) {
      const e = r(t).versions;
      return i(e);
    }
    __name(Pt3, "Pt");
    function Wt2(t) {
      const e = r(t).node;
      return i(e);
    }
    __name(Wt2, "Wt");
    function Jt() {
      return g(function() {
        const t = module.require;
        return i(t);
      }, arguments);
    }
    __name(Jt, "Jt");
    function Qt(t) {
      const e = r(t).msCrypto;
      return i(e);
    }
    __name(Qt, "Qt");
    function Ht2(t) {
      const e = new Uint8Array(t >>> 0);
      return i(e);
    }
    __name(Ht2, "Ht");
    function Gt(t) {
      return typeof r(t) == "function";
    }
    __name(Gt, "Gt");
    function Kt() {
      return g(function(t, e) {
        const n = r(t).call(r(e));
        return i(n);
      }, arguments);
    }
    __name(Kt, "Kt");
    function Xt(t, e) {
      const n = r(t)[e >>> 0];
      return i(n);
    }
    __name(Xt, "Xt");
    function Yt(t) {
      return r(t).valueOf();
    }
    __name(Yt, "Yt");
    function Zt() {
      return g(function(t) {
        const e = r(t).next();
        return i(e);
      }, arguments);
    }
    __name(Zt, "Zt");
    function te(t) {
      return r(t).done;
    }
    __name(te, "te");
    function ee(t) {
      const e = r(t).value;
      return i(e);
    }
    __name(ee, "ee");
    function ne(t) {
      const e = r(t).next;
      return i(e);
    }
    __name(ne, "ne");
    function re() {
      return g(function(t, e) {
        const n = Reflect.get(r(t), r(e));
        return i(n);
      }, arguments);
    }
    __name(re, "re");
    function _e2() {
      return g(function() {
        const t = self.self;
        return i(t);
      }, arguments);
    }
    __name(_e2, "_e");
    function oe() {
      return g(function() {
        const t = window.window;
        return i(t);
      }, arguments);
    }
    __name(oe, "oe");
    function ce() {
      return g(function() {
        const t = globalThis.globalThis;
        return i(t);
      }, arguments);
    }
    __name(ce, "ce");
    function ie() {
      return g(function() {
        const t = global.global;
        return i(t);
      }, arguments);
    }
    __name(ie, "ie");
    function ue(t, e) {
      const n = new T(x2(t, e));
      return i(n);
    }
    __name(ue, "ue");
    function se2(t) {
      return Array.isArray(r(t));
    }
    __name(se2, "se");
    function fe() {
      return g(function(t, e, n) {
        const _2 = r(t).call(r(e), r(n));
        return i(_2);
      }, arguments);
    }
    __name(fe, "fe");
    function ae(t) {
      return Number.isSafeInteger(r(t));
    }
    __name(ae, "ae");
    function be() {
      return g(function(t, e, n) {
        return Reflect.set(r(t), r(e), r(n));
      }, arguments);
    }
    __name(be, "be");
    function ge2() {
      return g(function(t) {
        const e = JSON.stringify(r(t));
        return i(e);
      }, arguments);
    }
    __name(ge2, "ge");
    function de(t, e, n) {
      r(t).set(r(e), n >>> 0);
    }
    __name(de, "de");
    function le(t) {
      return r(t).length;
    }
    __name(le, "le");
    function we() {
      return g(function() {
        return Date.now();
      }, arguments);
    }
    __name(we, "we");
    function pe2(t, e) {
      return r(t) == r(e);
    }
    __name(pe2, "pe");
    function xe(t) {
      let e;
      try {
        e = r(t) instanceof Uint8Array;
      } catch {
        e = false;
      }
      return e;
    }
    __name(xe, "xe");
    function ye(t) {
      let e;
      try {
        e = r(t) instanceof ArrayBuffer;
      } catch {
        e = false;
      }
      return e;
    }
    __name(ye, "ye");
    function me(t) {
      const e = Object.entries(r(t));
      return i(e);
    }
    __name(me, "me");
    function he(t, e) {
      throw new Error(x2(t, e));
    }
    __name(he, "he");
    function Te2(t, e) {
      const n = r(e), _2 = typeof n == "bigint" ? n : void 0;
      l().setBigInt64(t + 8 * 1, p2(_2) ? BigInt(0) : _2, true), l().setInt32(t + 4 * 0, !p2(_2), true);
    }
    __name(Te2, "Te");
    function Ie(t, e) {
      const n = O2(r(e)), _2 = d(n, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2;
      l().setInt32(t + 4 * 1, o, true), l().setInt32(t + 4 * 0, _2, true);
    }
    __name(Ie, "Ie");
    function Se(t) {
      const e = b(t).original;
      return e.cnt-- == 1 ? (e.a = 0, true) : false;
    }
    __name(Se, "Se");
    function Ae(t, e) {
      const n = r(t).then(r(e));
      return i(n);
    }
    __name(Ae, "Ae");
    function je(t, e, n) {
      const _2 = r(t).then(r(e), r(n));
      return i(_2);
    }
    __name(je, "je");
    function Oe(t) {
      const e = Promise.resolve(r(t));
      return i(e);
    }
    __name(Oe, "Oe");
    function qe(t, e, n) {
      const _2 = P(t, e, 541, W);
      return i(_2);
    }
    __name(qe, "qe");
  }
});

// ../../node_modules/.prisma/client/wasm-worker-loader.mjs
var wasm_worker_loader_exports = {};
__export(wasm_worker_loader_exports, {
  default: () => wasm_worker_loader_default
});
var wasm_worker_loader_default;
var init_wasm_worker_loader = __esm({
  "../../node_modules/.prisma/client/wasm-worker-loader.mjs"() {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    wasm_worker_loader_default = import("./8552dff651243a79886dd7f71c5a50258a0caeed-query_engine_bg.wasm");
  }
});

// ../../node_modules/.prisma/client/wasm.js
var require_wasm2 = __commonJS({
  "../../node_modules/.prisma/client/wasm.js"(exports) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      NotFoundError: NotFoundError2,
      getPrismaClient: getPrismaClient2,
      sqltag: sqltag2,
      empty: empty2,
      join: join2,
      raw: raw3,
      skip: skip2,
      Decimal: Decimal2,
      Debug: Debug3,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2
    } = require_wasm();
    var Prisma = {};
    exports.Prisma = Prisma;
    exports.$Enums = {};
    Prisma.prismaVersion = {
      client: "5.22.0",
      engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.NotFoundError = NotFoundError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join2;
    Prisma.raw = raw3;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports.Prisma.UserScalarFieldEnum = {
      id: "id",
      role: "role",
      name: "name",
      mobile: "mobile",
      email: "email",
      address: "address",
      passwordHash: "passwordHash",
      displayPictureUrl: "displayPictureUrl",
      createdAt: "createdAt"
    };
    exports.Prisma.PackageScalarFieldEnum = {
      id: "id",
      name: "name",
      price: "price",
      recurringType: "recurringType",
      createdAt: "createdAt"
    };
    exports.Prisma.CustomerScalarFieldEnum = {
      id: "id",
      name: "name",
      mobile: "mobile",
      email: "email",
      address: "address",
      whatsappMobile: "whatsappMobile",
      boxNumber: "boxNumber",
      idNumber: "idNumber",
      packageId: "packageId",
      assignedEmployeeId: "assignedEmployeeId",
      pendingBalance: "pendingBalance",
      lastBillingDate: "lastBillingDate",
      createdAt: "createdAt"
    };
    exports.Prisma.TransactionScalarFieldEnum = {
      id: "id",
      customerId: "customerId",
      transactionId: "transactionId",
      transactionDate: "transactionDate",
      transactionType: "transactionType",
      transactionBy: "transactionBy",
      amount: "amount",
      status: "status",
      remarks: "remarks",
      createdAt: "createdAt"
    };
    exports.Prisma.PaymentLinkScalarFieldEnum = {
      id: "id",
      customerId: "customerId",
      razorpayLinkId: "razorpayLinkId",
      shortUrl: "shortUrl",
      status: "status",
      createdAt: "createdAt"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.UserRole = exports.$Enums.UserRole = {
      ADMIN: "ADMIN",
      EMPLOYEE: "EMPLOYEE"
    };
    exports.RecurringType = exports.$Enums.RecurringType = {
      MONTHLY: "MONTHLY",
      BIMONTHLY: "BIMONTHLY"
    };
    exports.TransactionType = exports.$Enums.TransactionType = {
      manual: "manual",
      payment_link: "payment_link",
      online: "online"
    };
    exports.TransactionStatus = exports.$Enums.TransactionStatus = {
      pending: "pending",
      paid: "paid",
      failed: "failed"
    };
    exports.Prisma.ModelName = {
      User: "User",
      Package: "Package",
      Customer: "Customer",
      Transaction: "Transaction",
      PaymentLink: "PaymentLink"
    };
    var config = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "/Users/sreenaath/Desktop/owner/pay/node_modules/@prisma/client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "darwin-arm64",
            "native": true
          }
        ],
        "previewFeatures": [
          "driverAdapters"
        ],
        "sourceFilePath": "/Users/sreenaath/Desktop/owner/pay/prisma/schema.prisma"
      },
      "relativeEnvPaths": {
        "rootEnvPath": null,
        "schemaEnvPath": "../../../apps/web/.env"
      },
      "relativePath": "../../../prisma",
      "clientVersion": "5.22.0",
      "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "postgresql",
      "postinstall": true,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider  = "postgresql"\n  url       = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n}\n\nenum UserRole {\n  ADMIN\n  EMPLOYEE\n}\n\nenum RecurringType {\n  MONTHLY\n  BIMONTHLY\n}\n\nenum TransactionType {\n  manual\n  payment_link\n  online\n}\n\nenum TransactionStatus {\n  pending\n  paid\n  failed\n}\n\nmodel User {\n  id                String   @id @default(uuid())\n  role              UserRole @default(EMPLOYEE)\n  name              String\n  mobile            String   @unique\n  email             String\n  address           String?\n  passwordHash      String   @map("password_hash")\n  displayPictureUrl String?  @map("display_picture_url")\n  createdAt         DateTime @default(now()) @map("created_at")\n\n  // Relations\n  assignedCustomers Customer[]    @relation("AssignedEmployee")\n  transactions      Transaction[]\n\n  @@map("users")\n}\n\nmodel Package {\n  id            String        @id @default(uuid())\n  name          String\n  price         Decimal       @db.Decimal(10, 2)\n  recurringType RecurringType @map("recurring_type")\n  createdAt     DateTime      @default(now()) @map("created_at")\n\n  // Relations\n  customers Customer[]\n\n  @@map("packages")\n}\n\nmodel Customer {\n  id                 String    @id @default(uuid())\n  name               String\n  mobile             String\n  email              String?\n  address            String?\n  whatsappMobile     String    @map("whatsapp_mobile")\n  boxNumber          String    @unique @map("box_number")\n  idNumber           String?   @map("id_number")\n  packageId          String    @map("package_id")\n  assignedEmployeeId String?   @map("assigned_employee_id")\n  pendingBalance     Decimal   @default(0) @map("pending_balance") @db.Decimal(10, 2)\n  lastBillingDate    DateTime? @map("last_billing_date")\n  createdAt          DateTime  @default(now()) @map("created_at")\n\n  // Relations\n  package          Package       @relation(fields: [packageId], references: [id])\n  assignedEmployee User?         @relation("AssignedEmployee", fields: [assignedEmployeeId], references: [id])\n  transactions     Transaction[]\n\n  @@map("customers")\n}\n\nmodel Transaction {\n  id              String            @id @default(uuid())\n  customerId      String            @map("customer_id")\n  transactionId   String            @map("transaction_id")\n  transactionDate DateTime          @default(now()) @map("transaction_date")\n  transactionType TransactionType   @map("transaction_type")\n  transactionBy   String            @map("transaction_by")\n  amount          Decimal           @db.Decimal(10, 2)\n  status          TransactionStatus @default(pending)\n  remarks         String?\n  createdAt       DateTime          @default(now()) @map("created_at")\n\n  // Relations\n  customer Customer @relation(fields: [customerId], references: [id])\n  user     User     @relation(fields: [transactionBy], references: [id])\n\n  @@map("transactions")\n}\n\nmodel PaymentLink {\n  id             String   @id @default(uuid())\n  customerId     String   @map("customer_id")\n  razorpayLinkId String   @map("razorpay_link_id")\n  shortUrl       String?  @map("short_url")\n  status         String   @default("pending")\n  createdAt      DateTime @default(now()) @map("created_at")\n\n  @@map("payment_links")\n}\n',
      "inlineSchemaHash": "dc2fe52b028f5f25a31d4fa58d61f6e4485fbd08184f62d8a0bc602630947252",
      "copyEngine": true
    };
    config.dirname = "/";
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"name","kind":"scalar","type":"String"},{"name":"mobile","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String","dbName":"password_hash"},{"name":"displayPictureUrl","kind":"scalar","type":"String","dbName":"display_picture_url"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"assignedCustomers","kind":"object","type":"Customer","relationName":"AssignedEmployee"},{"name":"transactions","kind":"object","type":"Transaction","relationName":"TransactionToUser"}],"dbName":"users"},"Package":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"recurringType","kind":"enum","type":"RecurringType","dbName":"recurring_type"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"customers","kind":"object","type":"Customer","relationName":"CustomerToPackage"}],"dbName":"packages"},"Customer":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"mobile","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"whatsappMobile","kind":"scalar","type":"String","dbName":"whatsapp_mobile"},{"name":"boxNumber","kind":"scalar","type":"String","dbName":"box_number"},{"name":"idNumber","kind":"scalar","type":"String","dbName":"id_number"},{"name":"packageId","kind":"scalar","type":"String","dbName":"package_id"},{"name":"assignedEmployeeId","kind":"scalar","type":"String","dbName":"assigned_employee_id"},{"name":"pendingBalance","kind":"scalar","type":"Decimal","dbName":"pending_balance"},{"name":"lastBillingDate","kind":"scalar","type":"DateTime","dbName":"last_billing_date"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"package","kind":"object","type":"Package","relationName":"CustomerToPackage"},{"name":"assignedEmployee","kind":"object","type":"User","relationName":"AssignedEmployee"},{"name":"transactions","kind":"object","type":"Transaction","relationName":"CustomerToTransaction"}],"dbName":"customers"},"Transaction":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String","dbName":"customer_id"},{"name":"transactionId","kind":"scalar","type":"String","dbName":"transaction_id"},{"name":"transactionDate","kind":"scalar","type":"DateTime","dbName":"transaction_date"},{"name":"transactionType","kind":"enum","type":"TransactionType","dbName":"transaction_type"},{"name":"transactionBy","kind":"scalar","type":"String","dbName":"transaction_by"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"TransactionStatus"},{"name":"remarks","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"customer","kind":"object","type":"Customer","relationName":"CustomerToTransaction"},{"name":"user","kind":"object","type":"User","relationName":"TransactionToUser"}],"dbName":"transactions"},"PaymentLink":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String","dbName":"customer_id"},{"name":"razorpayLinkId","kind":"scalar","type":"String","dbName":"razorpay_link_id"},{"name":"shortUrl","kind":"scalar","type":"String","dbName":"short_url"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"}],"dbName":"payment_links"}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config.runtimeDataModel);
    config.engineWasm = {
      getRuntime: () => require_query_engine_bg(),
      getQueryEngineWasmModule: async () => {
        const loader = (await Promise.resolve().then(() => (init_wasm_worker_loader(), wasm_worker_loader_exports))).default;
        const engine = (await loader).default;
        return engine;
      }
    };
    config.injectableEdgeEnv = () => ({
      parsed: {
        DATABASE_URL: typeof globalThis !== "undefined" && globalThis["DATABASE_URL"] || typeof process !== "undefined" && process.env && process.env.DATABASE_URL || void 0
      }
    });
    if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
      Debug3.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
    }
    var PrismaClient2 = getPrismaClient2(config);
    exports.PrismaClient = PrismaClient2;
    Object.assign(exports, Prisma);
  }
});

// ../../node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "../../node_modules/.prisma/client/default.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    module.exports = { ...require_wasm2() };
  }
});

// ../../node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "../../node_modules/@prisma/client/default.js"(exports, module) {
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    module.exports = {
      ...require_default()
    };
  }
});

// ../../node_modules/@prisma/debug/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/@prisma/debug/dist/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name2 in all)
        __defProp2(target, name2, { get: all[name2], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to2, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to2, key) && key !== except)
            __defProp2(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to2;
    }, "__copyProps");
    var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports2 = {};
    __export2(src_exports2, {
      Debug: () => Debug3,
      clearLogs: () => clearLogs,
      default: () => src_default2,
      getLogs: () => getLogs
    });
    module.exports = __toCommonJS(src_exports2);
    var colors_exports = {};
    __export2(colors_exports, {
      $: () => $,
      bgBlack: () => bgBlack,
      bgBlue: () => bgBlue,
      bgCyan: () => bgCyan,
      bgGreen: () => bgGreen,
      bgMagenta: () => bgMagenta,
      bgRed: () => bgRed,
      bgWhite: () => bgWhite,
      bgYellow: () => bgYellow,
      black: () => black,
      blue: () => blue,
      bold: () => bold,
      cyan: () => cyan,
      dim: () => dim,
      gray: () => gray,
      green: () => green,
      grey: () => grey,
      hidden: () => hidden,
      inverse: () => inverse,
      italic: () => italic,
      magenta: () => magenta,
      red: () => red,
      reset: () => reset,
      strikethrough: () => strikethrough,
      underline: () => underline,
      white: () => white,
      yellow: () => yellow
    });
    var FORCE_COLOR;
    var NODE_DISABLE_COLORS;
    var NO_COLOR;
    var TERM;
    var isTTY = true;
    if (typeof process !== "undefined") {
      ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
      isTTY = process.stdout && process.stdout.isTTY;
    }
    var $ = {
      enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
    };
    function init(x2, y2) {
      let rgx = new RegExp(`\\x1b\\[${y2}m`, "g");
      let open = `\x1B[${x2}m`, close = `\x1B[${y2}m`;
      return function(txt) {
        if (!$.enabled || txt == null)
          return txt;
        return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
      };
    }
    __name(init, "init");
    var reset = init(0, 0);
    var bold = init(1, 22);
    var dim = init(2, 22);
    var italic = init(3, 23);
    var underline = init(4, 24);
    var inverse = init(7, 27);
    var hidden = init(8, 28);
    var strikethrough = init(9, 29);
    var black = init(30, 39);
    var red = init(31, 39);
    var green = init(32, 39);
    var yellow = init(33, 39);
    var blue = init(34, 39);
    var magenta = init(35, 39);
    var cyan = init(36, 39);
    var white = init(37, 39);
    var gray = init(90, 39);
    var grey = init(90, 39);
    var bgBlack = init(40, 49);
    var bgRed = init(41, 49);
    var bgGreen = init(42, 49);
    var bgYellow = init(43, 49);
    var bgBlue = init(44, 49);
    var bgMagenta = init(45, 49);
    var bgCyan = init(46, 49);
    var bgWhite = init(47, 49);
    var MAX_ARGS_HISTORY = 100;
    var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var argsHistory = [];
    var lastTimestamp = Date.now();
    var lastColor = 0;
    var processEnv = typeof process !== "undefined" ? process.env : {};
    globalThis.DEBUG ??= processEnv.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
    var topProps = {
      enable(namespace) {
        if (typeof namespace === "string") {
          globalThis.DEBUG = namespace;
        }
      },
      disable() {
        const prev = globalThis.DEBUG;
        globalThis.DEBUG = "";
        return prev;
      },
      // this is the core logic to check if logging should happen or not
      enabled(namespace) {
        const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
          return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
        });
        const isListened = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] === "-")
            return false;
          return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
        });
        const isExcluded = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] !== "-")
            return false;
          return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
        });
        return isListened && !isExcluded;
      },
      log: (...args) => {
        const [namespace, format, ...rest] = args;
        const logWithFormatting = console.warn ?? console.log;
        logWithFormatting(`${namespace} ${format}`, ...rest);
      },
      formatters: {}
      // not implemented
    };
    function debugCreate(namespace) {
      const instanceProps = {
        color: COLORS[lastColor++ % COLORS.length],
        enabled: topProps.enabled(namespace),
        namespace,
        log: topProps.log,
        extend: () => {
        }
        // not implemented
      };
      const debugCall = /* @__PURE__ */ __name((...args) => {
        const { enabled, namespace: namespace2, color, log: log2 } = instanceProps;
        if (args.length !== 0) {
          argsHistory.push([namespace2, ...args]);
        }
        if (argsHistory.length > MAX_ARGS_HISTORY) {
          argsHistory.shift();
        }
        if (topProps.enabled(namespace2) || enabled) {
          const stringArgs = args.map((arg) => {
            if (typeof arg === "string") {
              return arg;
            }
            return safeStringify(arg);
          });
          const ms2 = `+${Date.now() - lastTimestamp}ms`;
          lastTimestamp = Date.now();
          if (globalThis.DEBUG_COLORS) {
            log2(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms2));
          } else {
            log2(namespace2, ...stringArgs, ms2);
          }
        }
      }, "debugCall");
      return new Proxy(debugCall, {
        get: (_2, prop) => instanceProps[prop],
        set: (_2, prop, value) => instanceProps[prop] = value
      });
    }
    __name(debugCreate, "debugCreate");
    var Debug3 = new Proxy(debugCreate, {
      get: (_2, prop) => topProps[prop],
      set: (_2, prop, value) => topProps[prop] = value
    });
    function safeStringify(value, indent = 2) {
      const cache = /* @__PURE__ */ new Set();
      return JSON.stringify(
        value,
        (key, value2) => {
          if (typeof value2 === "object" && value2 !== null) {
            if (cache.has(value2)) {
              return `[Circular *]`;
            }
            cache.add(value2);
          } else if (typeof value2 === "bigint") {
            return value2.toString();
          }
          return value2;
        },
        indent
      );
    }
    __name(safeStringify, "safeStringify");
    function getLogs(numChars = 7500) {
      const logs = argsHistory.map(([namespace, ...args]) => {
        return `${namespace} ${args.map((arg) => {
          if (typeof arg === "string") {
            return arg;
          } else {
            return JSON.stringify(arg);
          }
        }).join(" ")}`;
      }).join("\n");
      if (logs.length < numChars) {
        return logs;
      }
      return logs.slice(-numChars);
    }
    __name(getLogs, "getLogs");
    function clearLogs() {
      argsHistory.length = 0;
    }
    __name(clearLogs, "clearLogs");
    var src_default2 = Debug3;
  }
});

// ../../node_modules/@prisma/adapter-neon/node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "../../node_modules/@prisma/adapter-neon/node_modules/postgres-array/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    exports.parse = function(source, transform) {
      return parsePostgresArray(source, transform);
    };
    function parsePostgresArray(source, transform, nested = false) {
      let character = "";
      let quote = false;
      let position = 0;
      let dimension = 0;
      const entries = [];
      let recorded = "";
      const newEntry = /* @__PURE__ */ __name(function(includeEmpty) {
        let entry = recorded;
        if (entry.length > 0 || includeEmpty) {
          if (entry === "NULL" && !includeEmpty) {
            entry = null;
          }
          if (entry !== null && transform) {
            entry = transform(entry);
          }
          entries.push(entry);
          recorded = "";
        }
      }, "newEntry");
      if (source[0] === "[") {
        while (position < source.length) {
          const char = source[position++];
          if (char === "=") {
            break;
          }
        }
      }
      while (position < source.length) {
        let escaped = false;
        character = source[position++];
        if (character === "\\") {
          character = source[position++];
          escaped = true;
        }
        if (character === "{" && !quote) {
          dimension++;
          if (dimension > 1) {
            const parser = parsePostgresArray(source.substr(position - 1), transform, true);
            entries.push(parser.entries);
            position += parser.position - 2;
          }
        } else if (character === "}" && !quote) {
          dimension--;
          if (!dimension) {
            newEntry();
            if (nested) {
              return {
                entries,
                position
              };
            }
          }
        } else if (character === '"' && !escaped) {
          if (quote) {
            newEntry(true);
          }
          quote = !quote;
        } else if (character === "," && !quote) {
          newEntry();
        } else {
          recorded += character;
        }
      }
      if (dimension !== 0) {
        throw new Error("array dimension not balanced");
      }
      return entries;
    }
    __name(parsePostgresArray, "parsePostgresArray");
  }
});

// .wrangler/tmp/bundle-027NN5/middleware-loader.entry.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// .wrangler/tmp/bundle-027NN5/middleware-insertion-facade.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// src/index.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/hono.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/compose.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/context.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/utils/cookie.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/utils/url.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    if (!patternCache[label]) {
      if (match[2]) {
        patternCache[label] = [label, match[1], new RegExp("^" + match[2] + "$")];
      } else {
        patternCache[label] = [label, match[1], true];
      }
    }
    return patternCache[label];
  }
  return null;
}, "getPattern");
var getPath = /* @__PURE__ */ __name((request) => {
  const match = request.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return match ? match[1] : "";
}, "getPath");
var getQueryStrings = /* @__PURE__ */ __name((url) => {
  const queryIndex = url.indexOf("?", 8);
  return queryIndex === -1 ? "" : "?" + url.slice(queryIndex + 1);
}, "getQueryStrings");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result[result.length - 1] === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((...paths) => {
  let p2 = "";
  let endsWithSlash = false;
  for (let path of paths) {
    if (p2[p2.length - 1] === "/") {
      p2 = p2.slice(0, -1);
      endsWithSlash = true;
    }
    if (path[0] !== "/") {
      path = `/${path}`;
    }
    if (path === "/" && endsWithSlash) {
      p2 = `${p2}/`;
    } else if (path !== "/") {
      p2 = `${p2}${path}`;
    }
    if (path === "/" && p2 === "") {
      p2 = "/";
    }
  }
  return p2;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (!path.match(/\:.+\?$/)) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v2, i, a2) => a2.indexOf(v2) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return /%/.test(value) ? decodeURIComponent_(value) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ?? (encoded = /[%+]/.test(url));
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name2 = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name2 = _decodeURI(name2);
    }
    keyIndex = nextKeyIndex;
    if (name2 === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name2] && Array.isArray(results[name2]))) {
        results[name2] = [];
      }
      ;
      results[name2].push(value);
    } else {
      results[name2] ?? (results[name2] = value);
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// ../../node_modules/hono/dist/utils/cookie.js
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse = /* @__PURE__ */ __name((cookie, name2) => {
  const pairs = cookie.trim().split(";");
  return pairs.reduce((parsedCookie, pairStr) => {
    pairStr = pairStr.trim();
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      return parsedCookie;
    }
    const cookieName = pairStr.substring(0, valueStartPos).trim();
    if (name2 && name2 !== cookieName || !validCookieNameRegEx.test(cookieName)) {
      return parsedCookie;
    }
    let cookieValue = pairStr.substring(valueStartPos + 1).trim();
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = decodeURIComponent_(cookieValue);
    }
    return parsedCookie;
  }, {});
}, "parse");
var _serialize = /* @__PURE__ */ __name((name2, value, opt = {}) => {
  let cookie = `${name2}=${value}`;
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    cookie += `; Max-Age=${Math.floor(opt.maxAge)}`;
  }
  if (opt.domain) {
    cookie += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    cookie += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    cookie += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite}`;
  }
  if (opt.partitioned) {
    cookie += "; Partitioned";
  }
  return cookie;
}, "_serialize");
var serialize = /* @__PURE__ */ __name((name2, value, opt = {}) => {
  value = encodeURIComponent(value);
  return _serialize(name2, value, opt);
}, "serialize");

// ../../node_modules/hono/dist/utils/html.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw2 = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw2(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// ../../node_modules/hono/dist/utils/stream.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var StreamingApi = /* @__PURE__ */ __name(class {
  constructor(writable, _readable) {
    this.abortSubscribers = [];
    this.writable = writable;
    this.writer = writable.getWriter();
    this.encoder = new TextEncoder();
    const reader = _readable.getReader();
    this.responseReadable = new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        done ? controller.close() : controller.enqueue(value);
      },
      cancel: () => {
        this.abortSubscribers.forEach((subscriber) => subscriber());
      }
    });
  }
  async write(input) {
    try {
      if (typeof input === "string") {
        input = this.encoder.encode(input);
      }
      await this.writer.write(input);
    } catch (e) {
    }
    return this;
  }
  async writeln(input) {
    await this.write(input + "\n");
    return this;
  }
  sleep(ms2) {
    return new Promise((res) => setTimeout(res, ms2));
  }
  async close() {
    try {
      await this.writer.close();
    } catch (e) {
    }
  }
  async pipe(body) {
    this.writer.releaseLock();
    await body.pipeTo(this.writable, { preventClose: true });
    this.writer = this.writable.getWriter();
  }
  async onAbort(listener) {
    this.abortSubscribers.push(listener);
  }
}, "StreamingApi");

// ../../node_modules/hono/dist/context.js
var __accessCheck = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck");
var __privateGet = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet");
var __privateAdd = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd");
var __privateSet = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
}, "__privateSet");
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setHeaders = /* @__PURE__ */ __name((headers, map = {}) => {
  Object.entries(map).forEach(([key, value]) => headers.set(key, value));
  return headers;
}, "setHeaders");
var _status;
var _executionCtx;
var _headers;
var _preparedHeaders;
var _res;
var _isFresh;
var Context = /* @__PURE__ */ __name(class {
  constructor(req, options) {
    this.env = {};
    this._var = {};
    this.finalized = false;
    this.error = void 0;
    __privateAdd(this, _status, 200);
    __privateAdd(this, _executionCtx, void 0);
    __privateAdd(this, _headers, void 0);
    __privateAdd(this, _preparedHeaders, void 0);
    __privateAdd(this, _res, void 0);
    __privateAdd(this, _isFresh, true);
    this.renderer = (content) => this.html(content);
    this.notFoundHandler = () => new Response();
    this.render = (...args) => this.renderer(...args);
    this.setRenderer = (renderer) => {
      this.renderer = renderer;
    };
    this.header = (name2, value, options2) => {
      if (value === void 0) {
        if (__privateGet(this, _headers)) {
          __privateGet(this, _headers).delete(name2);
        } else if (__privateGet(this, _preparedHeaders)) {
          delete __privateGet(this, _preparedHeaders)[name2.toLocaleLowerCase()];
        }
        if (this.finalized) {
          this.res.headers.delete(name2);
        }
        return;
      }
      if (options2?.append) {
        if (!__privateGet(this, _headers)) {
          __privateSet(this, _isFresh, false);
          __privateSet(this, _headers, new Headers(__privateGet(this, _preparedHeaders)));
          __privateSet(this, _preparedHeaders, {});
        }
        __privateGet(this, _headers).append(name2, value);
      } else {
        if (__privateGet(this, _headers)) {
          __privateGet(this, _headers).set(name2, value);
        } else {
          __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
          __privateGet(this, _preparedHeaders)[name2.toLowerCase()] = value;
        }
      }
      if (this.finalized) {
        if (options2?.append) {
          this.res.headers.append(name2, value);
        } else {
          this.res.headers.set(name2, value);
        }
      }
    };
    this.status = (status) => {
      __privateSet(this, _isFresh, false);
      __privateSet(this, _status, status);
    };
    this.set = (key, value) => {
      this._var ?? (this._var = {});
      this._var[key] = value;
    };
    this.get = (key) => {
      return this._var ? this._var[key] : void 0;
    };
    this.newResponse = (data, arg, headers) => {
      if (__privateGet(this, _isFresh) && !headers && !arg && __privateGet(this, _status) === 200) {
        return new Response(data, {
          headers: __privateGet(this, _preparedHeaders)
        });
      }
      if (arg && typeof arg !== "number") {
        const headers2 = setHeaders(new Headers(arg.headers), __privateGet(this, _preparedHeaders));
        return new Response(data, {
          headers: headers2,
          status: arg.status
        });
      }
      const status = typeof arg === "number" ? arg : __privateGet(this, _status);
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
      setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
      if (__privateGet(this, _res)) {
        __privateGet(this, _res).headers.forEach((v2, k) => {
          __privateGet(this, _headers)?.set(k, v2);
        });
        setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
      }
      headers ?? (headers = {});
      for (const [k, v2] of Object.entries(headers)) {
        if (typeof v2 === "string") {
          __privateGet(this, _headers).set(k, v2);
        } else {
          __privateGet(this, _headers).delete(k);
          for (const v22 of v2) {
            __privateGet(this, _headers).append(k, v22);
          }
        }
      }
      return new Response(data, {
        status,
        headers: __privateGet(this, _headers)
      });
    };
    this.body = (data, arg, headers) => {
      return typeof arg === "number" ? this.newResponse(data, arg, headers) : this.newResponse(data, arg);
    };
    this.text = (text, arg, headers) => {
      if (!__privateGet(this, _preparedHeaders)) {
        if (__privateGet(this, _isFresh) && !headers && !arg) {
          return new Response(text);
        }
        __privateSet(this, _preparedHeaders, {});
      }
      __privateGet(this, _preparedHeaders)["content-type"] = TEXT_PLAIN;
      return typeof arg === "number" ? this.newResponse(text, arg, headers) : this.newResponse(text, arg);
    };
    this.json = (object, arg, headers) => {
      const body = JSON.stringify(object);
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _preparedHeaders)["content-type"] = "application/json; charset=UTF-8";
      return typeof arg === "number" ? this.newResponse(body, arg, headers) : this.newResponse(body, arg);
    };
    this.jsonT = (object, arg, headers) => {
      return this.json(object, arg, headers);
    };
    this.html = (html, arg, headers) => {
      __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
      __privateGet(this, _preparedHeaders)["content-type"] = "text/html; charset=UTF-8";
      if (typeof html === "object") {
        if (!(html instanceof Promise)) {
          html = html.toString();
        }
        if (html instanceof Promise) {
          return html.then((html2) => resolveCallback(html2, HtmlEscapedCallbackPhase.Stringify, false, {})).then((html2) => {
            return typeof arg === "number" ? this.newResponse(html2, arg, headers) : this.newResponse(html2, arg);
          });
        }
      }
      return typeof arg === "number" ? this.newResponse(html, arg, headers) : this.newResponse(html, arg);
    };
    this.redirect = (location, status = 302) => {
      __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
      __privateGet(this, _headers).set("Location", location);
      return this.newResponse(null, status);
    };
    this.streamText = (cb, arg, headers) => {
      headers ?? (headers = {});
      this.header("content-type", TEXT_PLAIN);
      this.header("x-content-type-options", "nosniff");
      this.header("transfer-encoding", "chunked");
      return this.stream(cb, arg, headers);
    };
    this.stream = (cb, arg, headers) => {
      const { readable, writable } = new TransformStream();
      const stream = new StreamingApi(writable, readable);
      cb(stream).finally(() => stream.close());
      return typeof arg === "number" ? this.newResponse(stream.responseReadable, arg, headers) : this.newResponse(stream.responseReadable, arg);
    };
    this.cookie = (name2, value, opt) => {
      const cookie = serialize(name2, value, opt);
      this.header("set-cookie", cookie, { append: true });
    };
    this.notFound = () => {
      return this.notFoundHandler(this);
    };
    this.req = req;
    if (options) {
      __privateSet(this, _executionCtx, options.executionCtx);
      this.env = options.env;
      if (options.notFoundHandler) {
        this.notFoundHandler = options.notFoundHandler;
      }
    }
  }
  get event() {
    if (__privateGet(this, _executionCtx) && "respondWith" in __privateGet(this, _executionCtx)) {
      return __privateGet(this, _executionCtx);
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (__privateGet(this, _executionCtx)) {
      return __privateGet(this, _executionCtx);
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    __privateSet(this, _isFresh, false);
    return __privateGet(this, _res) || __privateSet(this, _res, new Response("404 Not Found", { status: 404 }));
  }
  set res(_res2) {
    __privateSet(this, _isFresh, false);
    if (__privateGet(this, _res) && _res2) {
      __privateGet(this, _res).headers.delete("content-type");
      for (const [k, v2] of __privateGet(this, _res).headers.entries()) {
        if (k === "set-cookie") {
          const cookies = __privateGet(this, _res).headers.getSetCookie();
          _res2.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res2.headers.append("set-cookie", cookie);
          }
        } else {
          _res2.headers.set(k, v2);
        }
      }
    }
    __privateSet(this, _res, _res2);
    this.finalized = true;
  }
  get var() {
    return { ...this._var };
  }
  get runtime() {
    const global2 = globalThis;
    if (global2?.Deno !== void 0) {
      return "deno";
    }
    if (global2?.Bun !== void 0) {
      return "bun";
    }
    if (typeof global2?.WebSocketPair === "function") {
      return "workerd";
    }
    if (typeof global2?.EdgeRuntime === "string") {
      return "edge-light";
    }
    if (global2?.fastly !== void 0) {
      return "fastly";
    }
    if (global2?.__lagon__ !== void 0) {
      return "lagon";
    }
    if (global2?.process?.release?.name === "node") {
      return "node";
    }
    return "other";
  }
}, "Context");
_status = /* @__PURE__ */ new WeakMap();
_executionCtx = /* @__PURE__ */ new WeakMap();
_headers = /* @__PURE__ */ new WeakMap();
_preparedHeaders = /* @__PURE__ */ new WeakMap();
_res = /* @__PURE__ */ new WeakMap();
_isFresh = /* @__PURE__ */ new WeakMap();

// ../../node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        if (context instanceof Context) {
          context.req.routeIndex = i;
        }
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (!handler) {
        if (context instanceof Context && context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      } else {
        try {
          res = await handler(context, () => {
            return dispatch(i + 1);
          });
        } catch (err2) {
          if (err2 instanceof Error && context instanceof Context && onError) {
            context.error = err2;
            res = await onError(err2, context);
            isError = true;
          } else {
            throw err2;
          }
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// ../../node_modules/hono/dist/http-exception.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var HTTPException = /* @__PURE__ */ __name(class extends Error {
  constructor(status = 500, options) {
    super(options?.message);
    this.res = options?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res) {
      return this.res;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
}, "HTTPException");

// ../../node_modules/hono/dist/request.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var parseBody = /* @__PURE__ */ __name(async (request, options = { all: false }) => {
  const contentType = request.headers.get("Content-Type");
  if (isFormDataContent(contentType)) {
    return parseFormData(request, options);
  }
  return {};
}, "parseBody");
function isFormDataContent(contentType) {
  if (contentType === null) {
    return false;
  }
  return contentType.startsWith("multipart/form-data") || contentType.startsWith("application/x-www-form-urlencoded");
}
__name(isFormDataContent, "isFormDataContent");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = {};
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] && isArrayField(form[key])) {
    appendToExistingArray(form[key], value);
  } else if (form[key]) {
    convertToNewArray(form, key, value);
  } else {
    form[key] = value;
  }
}, "handleParsingAllValues");
function isArrayField(field) {
  return Array.isArray(field);
}
__name(isArrayField, "isArrayField");
var appendToExistingArray = /* @__PURE__ */ __name((arr, value) => {
  arr.push(value);
}, "appendToExistingArray");
var convertToNewArray = /* @__PURE__ */ __name((form, key, value) => {
  form[key] = [form[key], value];
}, "convertToNewArray");

// ../../node_modules/hono/dist/request.js
var __accessCheck2 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck");
var __privateGet2 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet");
var __privateAdd2 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd");
var __privateSet2 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
}, "__privateSet");
var _validatedData;
var _matchResult;
var HonoRequest = /* @__PURE__ */ __name(class {
  constructor(request, path = "/", matchResult = [[]]) {
    __privateAdd2(this, _validatedData, void 0);
    __privateAdd2(this, _matchResult, void 0);
    this.routeIndex = 0;
    this.bodyCache = {};
    this.cachedBody = (key) => {
      const { bodyCache, raw: raw3 } = this;
      const cachedBody = bodyCache[key];
      if (cachedBody) {
        return cachedBody;
      }
      if (bodyCache.arrayBuffer) {
        return (async () => {
          return await new Response(bodyCache.arrayBuffer)[key]();
        })();
      }
      return bodyCache[key] = raw3[key]();
    };
    this.raw = request;
    this.path = path;
    __privateSet2(this, _matchResult, matchResult);
    __privateSet2(this, _validatedData, {});
  }
  param(key) {
    return key ? this.getDecodedParam(key) : this.getAllDecodedParams();
  }
  getDecodedParam(key) {
    const paramKey = __privateGet2(this, _matchResult)[0][this.routeIndex][1][key];
    const param2 = this.getParamValue(paramKey);
    return param2 ? /\%/.test(param2) ? decodeURIComponent_(param2) : param2 : void 0;
  }
  getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(__privateGet2(this, _matchResult)[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.getParamValue(__privateGet2(this, _matchResult)[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? decodeURIComponent_(value) : value;
      }
    }
    return decoded;
  }
  getParamValue(paramKey) {
    return __privateGet2(this, _matchResult)[1] ? __privateGet2(this, _matchResult)[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name2) {
    if (name2) {
      return this.raw.headers.get(name2.toLowerCase()) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  cookie(key) {
    const cookie = this.raw.headers.get("Cookie");
    if (!cookie) {
      return;
    }
    const obj = parse(cookie);
    if (key) {
      const value = obj[key];
      return value;
    } else {
      return obj;
    }
  }
  async parseBody(options) {
    if (this.bodyCache.parsedBody) {
      return this.bodyCache.parsedBody;
    }
    const parsedBody = await parseBody(this, options);
    this.bodyCache.parsedBody = parsedBody;
    return parsedBody;
  }
  json() {
    return this.cachedBody("json");
  }
  text() {
    return this.cachedBody("text");
  }
  arrayBuffer() {
    return this.cachedBody("arrayBuffer");
  }
  blob() {
    return this.cachedBody("blob");
  }
  formData() {
    return this.cachedBody("formData");
  }
  addValidatedData(target, data) {
    __privateGet2(this, _validatedData)[target] = data;
  }
  valid(target) {
    return __privateGet2(this, _validatedData)[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return __privateGet2(this, _matchResult)[0].map(([[, route]]) => route);
  }
  get routePath() {
    return __privateGet2(this, _matchResult)[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
  get headers() {
    return this.raw.headers;
  }
  get body() {
    return this.raw.body;
  }
  get bodyUsed() {
    return this.raw.bodyUsed;
  }
  get integrity() {
    return this.raw.integrity;
  }
  get keepalive() {
    return this.raw.keepalive;
  }
  get referrer() {
    return this.raw.referrer;
  }
  get signal() {
    return this.raw.signal;
  }
}, "HonoRequest");
_validatedData = /* @__PURE__ */ new WeakMap();
_matchResult = /* @__PURE__ */ new WeakMap();

// ../../node_modules/hono/dist/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// ../../node_modules/hono/dist/hono-base.js
var __accessCheck3 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck");
var __privateGet3 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet");
var __privateAdd3 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd");
var __privateSet3 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
}, "__privateSet");
var COMPOSED_HANDLER = Symbol("composedHandler");
function defineDynamicClass() {
  return class {
  };
}
__name(defineDynamicClass, "defineDynamicClass");
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err2, c) => {
  if (err2 instanceof HTTPException) {
    return err2.getResponse();
  }
  console.error(err2);
  const message = "Internal Server Error";
  return c.text(message, 500);
}, "errorHandler");
var _path;
var _Hono = /* @__PURE__ */ __name(class extends defineDynamicClass() {
  constructor(options = {}) {
    super();
    this._basePath = "/";
    __privateAdd3(this, _path, "/");
    this.routes = [];
    this.notFoundHandler = notFoundHandler;
    this.errorHandler = errorHandler;
    this.onError = (handler) => {
      this.errorHandler = handler;
      return this;
    };
    this.notFound = (handler) => {
      this.notFoundHandler = handler;
      return this;
    };
    this.head = () => {
      console.warn("`app.head()` is no longer used. `app.get()` implicitly handles the HEAD method.");
      return this;
    };
    this.handleEvent = (event) => {
      return this.dispatch(event.request, event, void 0, event.request.method);
    };
    this.fetch = (request, Env, executionCtx) => {
      return this.dispatch(request, executionCtx, Env, request.method);
    };
    this.request = (input, requestInit, Env, executionCtx) => {
      if (input instanceof Request) {
        if (requestInit !== void 0) {
          input = new Request(input, requestInit);
        }
        return this.fetch(input, Env, executionCtx);
      }
      input = input.toString();
      const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
      const req = new Request(path, requestInit);
      return this.fetch(req, Env, executionCtx);
    };
    this.fire = () => {
      addEventListener("fetch", (event) => {
        event.respondWith(this.dispatch(event.request, event, void 0, event.request.method));
      });
    };
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.map((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          __privateSet3(this, _path, args1);
        } else {
          this.addRoute(method, __privateGet3(this, _path), args1);
        }
        args.map((handler) => {
          if (typeof handler !== "string") {
            this.addRoute(method, __privateGet3(this, _path), handler);
          }
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      if (!method) {
        return this;
      }
      __privateSet3(this, _path, path);
      for (const m2 of [method].flat()) {
        handlers.map((handler) => {
          this.addRoute(m2.toUpperCase(), __privateGet3(this, _path), handler);
        });
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        __privateSet3(this, _path, arg1);
      } else {
        handlers.unshift(arg1);
      }
      handlers.map((handler) => {
        this.addRoute(METHOD_NAME_ALL, __privateGet3(this, _path), handler);
      });
      return this;
    };
    const strict = options.strict ?? true;
    delete options.strict;
    Object.assign(this, options);
    this.getPath = strict ? options.getPath ?? getPath : getPathNoStrict;
  }
  clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.routes = this.routes;
    return clone;
  }
  route(path, app2) {
    const subApp = this.basePath(path);
    if (!app2) {
      return subApp;
    }
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  showRoutes() {
    const length = 8;
    this.routes.map((route) => {
      console.log(
        `\x1B[32m${route.method}\x1B[0m ${" ".repeat(length - route.method.length)} ${route.path}`
      );
    });
  }
  mount(path, applicationHandler, optionHandler) {
    const mergedPath = mergePath(this._basePath, path);
    const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      const options = optionHandler ? optionHandler(c) : [c.env, executionContext];
      const optionsArray = Array.isArray(options) ? options : [options];
      const queryStrings = getQueryStrings(c.req.url);
      const res = await applicationHandler(
        new Request(
          new URL((c.req.path.slice(pathPrefixLength) || "/") + queryStrings, c.req.url),
          c.req.raw
        ),
        ...optionsArray
      );
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  get routerName() {
    this.matchRoute("GET", "/");
    return this.router.name;
  }
  addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  matchRoute(method, path) {
    return this.router.match(method, path);
  }
  handleError(err2, c) {
    if (err2 instanceof Error) {
      return this.errorHandler(err2, c);
    }
    throw err2;
  }
  dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.matchRoute(method, path);
    const c = new Context(new HonoRequest(request, path, matchResult), {
      env,
      executionCtx,
      notFoundHandler: this.notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.notFoundHandler(c);
        });
      } catch (err2) {
        return this.handleError(err2, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.notFoundHandler(c))
      ).catch((err2) => this.handleError(err2, c)) : res;
    }
    const composed = compose(matchResult[0], this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. You may forget returning Response object or `await next()`"
          );
        }
        return context.res;
      } catch (err2) {
        return this.handleError(err2, c);
      }
    })();
  }
}, "_Hono");
var Hono = _Hono;
_path = /* @__PURE__ */ new WeakMap();

// ../../node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
function compareKey(a2, b) {
  if (a2.length === 1) {
    return b.length === 1 ? a2 < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a2 === ONLY_WILDCARD_REG_EXP_STR || a2 === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a2 === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a2.length === b.length ? a2 < b ? -1 : 1 : b.length - a2.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class {
  constructor() {
    this.children = {};
  }
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name2 = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name2 && pattern[2]) {
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.children[regexpStr];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[regexpStr] = new Node();
        if (name2 !== "") {
          node.varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name2 !== "") {
        paramMap.push([name2, node.varIndex]);
      }
    } else {
      node = this.children[token];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.children[k];
      return (typeof c.varIndex === "number" ? `(${k})@${c.varIndex}` : k) + c.buildRegExpStr();
    });
    if (typeof this.index === "number") {
      strList.unshift(`#${this.index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "Node");

// ../../node_modules/hono/dist/router/reg-exp-router/trie.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var Trie = /* @__PURE__ */ __name(class {
  constructor() {
    this.context = { varIndex: 0 };
    this.root = new Node();
  }
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m2) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m2];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.root.insert(tokens, index, paramAssoc, this.context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_2, handlerIndex, paramIndex) => {
      if (typeof handlerIndex !== "undefined") {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (typeof paramIndex !== "undefined") {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// ../../node_modules/hono/dist/router/reg-exp-router/router.js
var methodNames = [METHOD_NAME_ALL, ...METHODS].map((method) => method.toUpperCase());
var emptyParam = [];
var nullMatcher = [/^$/, [], {}];
var wildcardRegExpCache = {};
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ?? (wildcardRegExpCache[path] = new RegExp(
    path === "*" ? "" : `^${path.replace(/\/\*/, "(?:|/.*)")}$`
  ));
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = {};
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = {};
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, {}]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = {};
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a2, b) => b.length - a2.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  constructor() {
    this.name = "RegExpRouter";
    this.middleware = { [METHOD_NAME_ALL]: {} };
    this.routes = { [METHOD_NAME_ALL]: {} };
  }
  add(method, path, handler) {
    var _a;
    const { middleware, routes } = this;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (methodNames.indexOf(method) === -1) {
      methodNames.push(method);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = {};
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p2) => {
          handlerMap[method][p2] = [...handlerMap[METHOD_NAME_ALL][p2]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m2) => {
          var _a2;
          (_a2 = middleware[m2])[path] || (_a2[path] = findMiddleware(middleware[m2], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
        });
      } else {
        (_a = middleware[method])[path] || (_a[path] = findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
      }
      Object.keys(middleware).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          Object.keys(middleware[m2]).forEach((p2) => {
            re.test(p2) && middleware[m2][p2].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          Object.keys(routes[m2]).forEach(
            (p2) => re.test(p2) && routes[m2][p2].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m2) => {
        var _a2;
        if (method === METHOD_NAME_ALL || method === m2) {
          (_a2 = routes[m2])[path2] || (_a2[path2] = [
            ...findMiddleware(middleware[m2], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ]);
          routes[m2][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  buildAllMatchers() {
    const matchers = {};
    methodNames.forEach((method) => {
      matchers[method] = this.buildMatcher(method) || matchers[METHOD_NAME_ALL];
    });
    this.middleware = this.routes = void 0;
    return matchers;
  }
  buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.middleware, this.routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute || (hasOwnRoute = true);
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
}, "RegExpRouter");

// ../../node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var SmartRouter = /* @__PURE__ */ __name(class {
  constructor(init) {
    this.name = "SmartRouter";
    this.routers = [];
    this.routes = [];
    Object.assign(this, init);
  }
  add(method, path, handler) {
    if (!this.routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.routes) {
      throw new Error("Fatal error");
    }
    const { routers, routes } = this;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        routes.forEach((args) => {
          router.add(...args);
        });
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.routers = [router];
      this.routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.routers[0];
  }
}, "SmartRouter");

// ../../node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var Node2 = /* @__PURE__ */ __name(class {
  constructor(method, handler, children) {
    this.order = 0;
    this.params = {};
    this.children = children || {};
    this.methods = [];
    this.name = "";
    if (method && handler) {
      const m2 = {};
      m2[method] = { handler, possibleKeys: [], score: 0, name: this.name };
      this.methods = [m2];
    }
    this.patterns = [];
  }
  insert(method, path, handler) {
    this.name = `${method} ${path}`;
    this.order = ++this.order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    const parentPatterns = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p2 = parts[i];
      if (Object.keys(curNode.children).includes(p2)) {
        parentPatterns.push(...curNode.patterns);
        curNode = curNode.children[p2];
        const pattern2 = getPattern(p2);
        if (pattern2) {
          possibleKeys.push(pattern2[1]);
        }
        continue;
      }
      curNode.children[p2] = new Node2();
      const pattern = getPattern(p2);
      if (pattern) {
        curNode.patterns.push(pattern);
        parentPatterns.push(...curNode.patterns);
        possibleKeys.push(pattern[1]);
      }
      parentPatterns.push(...curNode.patterns);
      curNode = curNode.children[p2];
    }
    if (!curNode.methods.length) {
      curNode.methods = [];
    }
    const m2 = {};
    const handlerSet = {
      handler,
      possibleKeys: possibleKeys.filter((v2, i, a2) => a2.indexOf(v2) === i),
      name: this.name,
      score: this.order
    };
    m2[method] = handlerSet;
    curNode.methods.push(m2);
    return curNode;
  }
  gHSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.methods.length; i < len; i++) {
      const m2 = node.methods[i];
      const handlerSet = m2[method] || m2[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = {};
        handlerSet.possibleKeys.forEach((key) => {
          const processed = processedSet[handlerSet.name];
          handlerSet.params[key] = params[key] && !processed ? params[key] : nodeParams[key] ?? params[key];
          processedSet[handlerSet.name] = true;
        });
        handlerSets.push(handlerSet);
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.params = {};
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.children[part];
        if (nextNode) {
          nextNode.params = node.params;
          if (isLast === true) {
            if (nextNode.children["*"]) {
              handlerSets.push(...this.gHSets(nextNode.children["*"], method, node.params, {}));
            }
            handlerSets.push(...this.gHSets(nextNode, method, node.params, {}));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.patterns.length; k < len3; k++) {
          const pattern = node.patterns[k];
          const params = { ...node.params };
          if (pattern === "*") {
            const astNode = node.children["*"];
            if (astNode) {
              handlerSets.push(...this.gHSets(astNode, method, node.params, {}));
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "") {
            continue;
          }
          const [key, name2, matcher] = pattern;
          const child = node.children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp && matcher.test(restPathString)) {
            params[name2] = restPathString;
            handlerSets.push(...this.gHSets(child, method, node.params, params));
            continue;
          }
          if (matcher === true || matcher instanceof RegExp && matcher.test(part)) {
            if (typeof key === "string") {
              params[name2] = part;
              if (isLast === true) {
                handlerSets.push(...this.gHSets(child, method, params, node.params));
                if (child.children["*"]) {
                  handlerSets.push(...this.gHSets(child.children["*"], method, params, node.params));
                }
              } else {
                child.params = params;
                tempNodes.push(child);
              }
            }
          }
        }
      }
      curNodes = tempNodes;
    }
    const results = handlerSets.sort((a2, b) => {
      return a2.score - b.score;
    });
    return [results.map(({ handler, params }) => [handler, params])];
  }
}, "Node");

// ../../node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  constructor() {
    this.name = "TrieRouter";
    this.node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (const p2 of results) {
        this.node.insert(method, p2, handler);
      }
      return;
    }
    this.node.insert(method, path, handler);
  }
  match(method, path) {
    return this.node.search(method, path);
  }
}, "TrieRouter");

// ../../node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// ../../node_modules/hono/dist/middleware/logger/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var humanize = /* @__PURE__ */ __name((times) => {
  const [delimiter, separator] = [",", "."];
  const orderTimes = times.map((v2) => v2.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter));
  return orderTimes.join(separator);
}, "humanize");
var time = /* @__PURE__ */ __name((start) => {
  const delta = Date.now() - start;
  return humanize([delta < 1e3 ? delta + "ms" : Math.round(delta / 1e3) + "s"]);
}, "time");
var colorStatus = /* @__PURE__ */ __name((status) => {
  const out = {
    7: `\x1B[35m${status}\x1B[0m`,
    5: `\x1B[31m${status}\x1B[0m`,
    4: `\x1B[33m${status}\x1B[0m`,
    3: `\x1B[36m${status}\x1B[0m`,
    2: `\x1B[32m${status}\x1B[0m`,
    1: `\x1B[32m${status}\x1B[0m`,
    0: `\x1B[33m${status}\x1B[0m`
  };
  const calculateStatus = status / 100 | 0;
  return out[calculateStatus];
}, "colorStatus");
function log(fn, prefix, method, path, status = 0, elapsed) {
  const out = prefix === "<--" ? `  ${prefix} ${method} ${path}` : `  ${prefix} ${method} ${path} ${colorStatus(status)} ${elapsed}`;
  fn(out);
}
__name(log, "log");
var logger = /* @__PURE__ */ __name((fn = console.log) => {
  return /* @__PURE__ */ __name(async function logger2(c, next) {
    const { method } = c.req;
    const path = getPath(c.req.raw);
    log(fn, "<--", method, path);
    const start = Date.now();
    await next();
    log(fn, "-->", method, path, c.res.status, time(start));
  }, "logger2");
}, "logger");

// ../../node_modules/hono/dist/middleware/pretty-json/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var prettyJSON = /* @__PURE__ */ __name((options = { space: 2 }) => {
  return /* @__PURE__ */ __name(async function prettyJSON2(c, next) {
    const pretty = c.req.query("pretty") || c.req.query("pretty") === "" ? true : false;
    await next();
    if (pretty && c.res.headers.get("Content-Type")?.startsWith("application/json")) {
      const obj = await c.res.json();
      c.res = new Response(JSON.stringify(obj, null, options.space), c.res);
    }
  }, "prettyJSON2");
}, "prettyJSON");

// src/utils/prisma.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var import_client = __toESM(require_default2());

// ../../node_modules/@prisma/adapter-neon/dist/index.mjs
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/@neondatabase/serverless/index.mjs
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var io = Object.create;
var Ce = Object.defineProperty;
var so = Object.getOwnPropertyDescriptor;
var oo = Object.getOwnPropertyNames;
var ao = Object.getPrototypeOf;
var uo = Object.prototype.hasOwnProperty;
var co = /* @__PURE__ */ __name((r, e, t) => e in r ? Ce(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, "co");
var a = /* @__PURE__ */ __name((r, e) => Ce(r, "name", { value: e, configurable: true }), "a");
var z = /* @__PURE__ */ __name((r, e) => () => (r && (e = r(r = 0)), e), "z");
var I = /* @__PURE__ */ __name((r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), "I");
var se = /* @__PURE__ */ __name((r, e) => {
  for (var t in e)
    Ce(r, t, { get: e[t], enumerable: true });
}, "se");
var Tn = /* @__PURE__ */ __name((r, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let i of oo(e))
      !uo.call(r, i) && i !== t && Ce(r, i, { get: () => e[i], enumerable: !(n = so(e, i)) || n.enumerable });
  return r;
}, "Tn");
var Te = /* @__PURE__ */ __name((r, e, t) => (t = r != null ? io(ao(r)) : {}, Tn(e || !r || !r.__esModule ? Ce(t, "default", {
  value: r,
  enumerable: true
}) : t, r)), "Te");
var O = /* @__PURE__ */ __name((r) => Tn(Ce({}, "__esModule", { value: true }), r), "O");
var _ = /* @__PURE__ */ __name((r, e, t) => co(r, typeof e != "symbol" ? e + "" : e, t), "_");
var Bn = I((st) => {
  "use strict";
  p();
  st.byteLength = lo;
  st.toByteArray = po;
  st.fromByteArray = go;
  var ae = [], re = [], ho = typeof Uint8Array < "u" ? Uint8Array : Array, Rt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (Ee = 0, In = Rt.length; Ee < In; ++Ee)
    ae[Ee] = Rt[Ee], re[Rt.charCodeAt(Ee)] = Ee;
  var Ee, In;
  re[45] = 62;
  re[95] = 63;
  function Pn(r) {
    var e = r.length;
    if (e % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var t = r.indexOf("=");
    t === -1 && (t = e);
    var n = t === e ? 0 : 4 - t % 4;
    return [t, n];
  }
  __name(Pn, "Pn");
  a(
    Pn,
    "getLens"
  );
  function lo(r) {
    var e = Pn(r), t = e[0], n = e[1];
    return (t + n) * 3 / 4 - n;
  }
  __name(lo, "lo");
  a(lo, "byteLength");
  function fo(r, e, t) {
    return (e + t) * 3 / 4 - t;
  }
  __name(fo, "fo");
  a(fo, "_byteLength");
  function po(r) {
    var e, t = Pn(r), n = t[0], i = t[1], s = new ho(fo(r, n, i)), o = 0, u = i > 0 ? n - 4 : n, c;
    for (c = 0; c < u; c += 4)
      e = re[r.charCodeAt(c)] << 18 | re[r.charCodeAt(c + 1)] << 12 | re[r.charCodeAt(c + 2)] << 6 | re[r.charCodeAt(c + 3)], s[o++] = e >> 16 & 255, s[o++] = e >> 8 & 255, s[o++] = e & 255;
    return i === 2 && (e = re[r.charCodeAt(c)] << 2 | re[r.charCodeAt(c + 1)] >> 4, s[o++] = e & 255), i === 1 && (e = re[r.charCodeAt(
      c
    )] << 10 | re[r.charCodeAt(c + 1)] << 4 | re[r.charCodeAt(c + 2)] >> 2, s[o++] = e >> 8 & 255, s[o++] = e & 255), s;
  }
  __name(po, "po");
  a(po, "toByteArray");
  function yo(r) {
    return ae[r >> 18 & 63] + ae[r >> 12 & 63] + ae[r >> 6 & 63] + ae[r & 63];
  }
  __name(yo, "yo");
  a(yo, "tripletToBase64");
  function mo(r, e, t) {
    for (var n, i = [], s = e; s < t; s += 3)
      n = (r[s] << 16 & 16711680) + (r[s + 1] << 8 & 65280) + (r[s + 2] & 255), i.push(yo(n));
    return i.join(
      ""
    );
  }
  __name(mo, "mo");
  a(mo, "encodeChunk");
  function go(r) {
    for (var e, t = r.length, n = t % 3, i = [], s = 16383, o = 0, u = t - n; o < u; o += s)
      i.push(mo(r, o, o + s > u ? u : o + s));
    return n === 1 ? (e = r[t - 1], i.push(ae[e >> 2] + ae[e << 4 & 63] + "==")) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(ae[e >> 10] + ae[e >> 4 & 63] + ae[e << 2 & 63] + "=")), i.join("");
  }
  __name(go, "go");
  a(go, "fromByteArray");
});
var Ln = I((Ft) => {
  p();
  Ft.read = function(r, e, t, n, i) {
    var s, o, u = i * 8 - n - 1, c = (1 << u) - 1, h = c >> 1, l = -7, d = t ? i - 1 : 0, b = t ? -1 : 1, C = r[e + d];
    for (d += b, s = C & (1 << -l) - 1, C >>= -l, l += u; l > 0; s = s * 256 + r[e + d], d += b, l -= 8)
      ;
    for (o = s & (1 << -l) - 1, s >>= -l, l += n; l > 0; o = o * 256 + r[e + d], d += b, l -= 8)
      ;
    if (s === 0)
      s = 1 - h;
    else {
      if (s === c)
        return o ? NaN : (C ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, n), s = s - h;
    }
    return (C ? -1 : 1) * o * Math.pow(2, s - n);
  };
  Ft.write = function(r, e, t, n, i, s) {
    var o, u, c, h = s * 8 - i - 1, l = (1 << h) - 1, d = l >> 1, b = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, C = n ? 0 : s - 1, B = n ? 1 : -1, Q = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, o = l) : (o = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), o + d >= 1 ? e += b / c : e += b * Math.pow(2, 1 - d), e * c >= 2 && (o++, c /= 2), o + d >= l ? (u = 0, o = l) : o + d >= 1 ? (u = (e * c - 1) * Math.pow(
      2,
      i
    ), o = o + d) : (u = e * Math.pow(2, d - 1) * Math.pow(2, i), o = 0)); i >= 8; r[t + C] = u & 255, C += B, u /= 256, i -= 8)
      ;
    for (o = o << i | u, h += i; h > 0; r[t + C] = o & 255, C += B, o /= 256, h -= 8)
      ;
    r[t + C - B] |= Q * 128;
  };
});
var Kn = I((Le) => {
  "use strict";
  p();
  var Mt = Bn(), Pe = Ln(), Rn = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  Le.Buffer = f;
  Le.SlowBuffer = vo;
  Le.INSPECT_MAX_BYTES = 50;
  var ot = 2147483647;
  Le.kMaxLength = ot;
  f.TYPED_ARRAY_SUPPORT = wo();
  !f.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function wo() {
    try {
      let r = new Uint8Array(1), e = { foo: a(function() {
        return 42;
      }, "foo") };
      return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(
        r,
        e
      ), r.foo() === 42;
    } catch {
      return false;
    }
  }
  __name(wo, "wo");
  a(wo, "typedArraySupport");
  Object.defineProperty(
    f.prototype,
    "parent",
    { enumerable: true, get: a(function() {
      if (f.isBuffer(this))
        return this.buffer;
    }, "get") }
  );
  Object.defineProperty(f.prototype, "offset", { enumerable: true, get: a(
    function() {
      if (f.isBuffer(this))
        return this.byteOffset;
    },
    "get"
  ) });
  function le(r) {
    if (r > ot)
      throw new RangeError('The value "' + r + '" is invalid for option "size"');
    let e = new Uint8Array(
      r
    );
    return Object.setPrototypeOf(e, f.prototype), e;
  }
  __name(le, "le");
  a(le, "createBuffer");
  function f(r, e, t) {
    if (typeof r == "number") {
      if (typeof e == "string")
        throw new TypeError('The "string" argument must be of type string. Received type number');
      return Ot(r);
    }
    return kn(
      r,
      e,
      t
    );
  }
  __name(f, "f");
  a(f, "Buffer");
  f.poolSize = 8192;
  function kn(r, e, t) {
    if (typeof r == "string")
      return So(
        r,
        e
      );
    if (ArrayBuffer.isView(r))
      return xo(r);
    if (r == null)
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
    if (ue(r, ArrayBuffer) || r && ue(r.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ue(r, SharedArrayBuffer) || r && ue(r.buffer, SharedArrayBuffer)))
      return kt(r, e, t);
    if (typeof r == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n = r.valueOf && r.valueOf();
    if (n != null && n !== r)
      return f.from(n, e, t);
    let i = Eo(r);
    if (i)
      return i;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r[Symbol.toPrimitive] == "function")
      return f.from(r[Symbol.toPrimitive]("string"), e, t);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
  }
  __name(kn, "kn");
  a(kn, "from");
  f.from = function(r, e, t) {
    return kn(r, e, t);
  };
  Object.setPrototypeOf(f.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(
    f,
    Uint8Array
  );
  function Un(r) {
    if (typeof r != "number")
      throw new TypeError('"size" argument must be of type number');
    if (r < 0)
      throw new RangeError('The value "' + r + '" is invalid for option "size"');
  }
  __name(Un, "Un");
  a(Un, "assertSize");
  function bo(r, e, t) {
    return Un(r), r <= 0 ? le(r) : e !== void 0 ? typeof t == "string" ? le(r).fill(e, t) : le(r).fill(e) : le(r);
  }
  __name(bo, "bo");
  a(
    bo,
    "alloc"
  );
  f.alloc = function(r, e, t) {
    return bo(r, e, t);
  };
  function Ot(r) {
    return Un(r), le(
      r < 0 ? 0 : Nt(r) | 0
    );
  }
  __name(Ot, "Ot");
  a(Ot, "allocUnsafe");
  f.allocUnsafe = function(r) {
    return Ot(r);
  };
  f.allocUnsafeSlow = function(r) {
    return Ot(r);
  };
  function So(r, e) {
    if ((typeof e != "string" || e === "") && (e = "utf8"), !f.isEncoding(e))
      throw new TypeError("Unknown encoding: " + e);
    let t = On(r, e) | 0, n = le(t), i = n.write(r, e);
    return i !== t && (n = n.slice(0, i)), n;
  }
  __name(So, "So");
  a(So, "fromString");
  function Dt(r) {
    let e = r.length < 0 ? 0 : Nt(r.length) | 0, t = le(e);
    for (let n = 0; n < e; n += 1)
      t[n] = r[n] & 255;
    return t;
  }
  __name(Dt, "Dt");
  a(Dt, "fromArrayLike");
  function xo(r) {
    if (ue(r, Uint8Array)) {
      let e = new Uint8Array(r);
      return kt(e.buffer, e.byteOffset, e.byteLength);
    }
    return Dt(r);
  }
  __name(xo, "xo");
  a(xo, "fromArrayView");
  function kt(r, e, t) {
    if (e < 0 || r.byteLength < e)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (r.byteLength < e + (t || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let n;
    return e === void 0 && t === void 0 ? n = new Uint8Array(
      r
    ) : t === void 0 ? n = new Uint8Array(r, e) : n = new Uint8Array(r, e, t), Object.setPrototypeOf(
      n,
      f.prototype
    ), n;
  }
  __name(kt, "kt");
  a(kt, "fromArrayBuffer");
  function Eo(r) {
    if (f.isBuffer(r)) {
      let e = Nt(
        r.length
      ) | 0, t = le(e);
      return t.length === 0 || r.copy(t, 0, 0, e), t;
    }
    if (r.length !== void 0)
      return typeof r.length != "number" || Qt(r.length) ? le(0) : Dt(r);
    if (r.type === "Buffer" && Array.isArray(r.data))
      return Dt(r.data);
  }
  __name(Eo, "Eo");
  a(Eo, "fromObject");
  function Nt(r) {
    if (r >= ot)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ot.toString(16) + " bytes");
    return r | 0;
  }
  __name(Nt, "Nt");
  a(Nt, "checked");
  function vo(r) {
    return +r != r && (r = 0), f.alloc(+r);
  }
  __name(vo, "vo");
  a(vo, "SlowBuffer");
  f.isBuffer = a(function(e) {
    return e != null && e._isBuffer === true && e !== f.prototype;
  }, "isBuffer");
  f.compare = a(function(e, t) {
    if (ue(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), ue(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)), !f.isBuffer(e) || !f.isBuffer(t))
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (e === t)
      return 0;
    let n = e.length, i = t.length;
    for (let s = 0, o = Math.min(n, i); s < o; ++s)
      if (e[s] !== t[s]) {
        n = e[s], i = t[s];
        break;
      }
    return n < i ? -1 : i < n ? 1 : 0;
  }, "compare");
  f.isEncoding = a(function(e) {
    switch (String(e).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, "isEncoding");
  f.concat = a(function(e, t) {
    if (!Array.isArray(e))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (e.length === 0)
      return f.alloc(0);
    let n;
    if (t === void 0)
      for (t = 0, n = 0; n < e.length; ++n)
        t += e[n].length;
    let i = f.allocUnsafe(t), s = 0;
    for (n = 0; n < e.length; ++n) {
      let o = e[n];
      if (ue(o, Uint8Array))
        s + o.length > i.length ? (f.isBuffer(
          o
        ) || (o = f.from(o)), o.copy(i, s)) : Uint8Array.prototype.set.call(i, o, s);
      else if (f.isBuffer(
        o
      ))
        o.copy(i, s);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      s += o.length;
    }
    return i;
  }, "concat");
  function On(r, e) {
    if (f.isBuffer(r))
      return r.length;
    if (ArrayBuffer.isView(r) || ue(r, ArrayBuffer))
      return r.byteLength;
    if (typeof r != "string")
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r);
    let t = r.length, n = arguments.length > 2 && arguments[2] === true;
    if (!n && t === 0)
      return 0;
    let i = false;
    for (; ; )
      switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return t;
        case "utf8":
        case "utf-8":
          return Ut(r).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return t * 2;
        case "hex":
          return t >>> 1;
        case "base64":
          return Vn(r).length;
        default:
          if (i)
            return n ? -1 : Ut(r).length;
          e = ("" + e).toLowerCase(), i = true;
      }
  }
  __name(On, "On");
  a(On, "byteLength");
  f.byteLength = On;
  function _o(r, e, t) {
    let n = false;
    if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, e >>>= 0, t <= e))
      return "";
    for (r || (r = "utf8"); ; )
      switch (r) {
        case "hex":
          return Mo(
            this,
            e,
            t
          );
        case "utf8":
        case "utf-8":
          return qn(this, e, t);
        case "ascii":
          return Ro(
            this,
            e,
            t
          );
        case "latin1":
        case "binary":
          return Fo(this, e, t);
        case "base64":
          return Bo(
            this,
            e,
            t
          );
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Do(this, e, t);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + r);
          r = (r + "").toLowerCase(), n = true;
      }
  }
  __name(_o, "_o");
  a(
    _o,
    "slowToString"
  );
  f.prototype._isBuffer = true;
  function ve(r, e, t) {
    let n = r[e];
    r[e] = r[t], r[t] = n;
  }
  __name(ve, "ve");
  a(ve, "swap");
  f.prototype.swap16 = a(function() {
    let e = this.length;
    if (e % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < e; t += 2)
      ve(this, t, t + 1);
    return this;
  }, "swap16");
  f.prototype.swap32 = a(function() {
    let e = this.length;
    if (e % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < e; t += 4)
      ve(this, t, t + 3), ve(this, t + 1, t + 2);
    return this;
  }, "swap32");
  f.prototype.swap64 = a(function() {
    let e = this.length;
    if (e % 8 !== 0)
      throw new RangeError(
        "Buffer size must be a multiple of 64-bits"
      );
    for (let t = 0; t < e; t += 8)
      ve(this, t, t + 7), ve(this, t + 1, t + 6), ve(this, t + 2, t + 5), ve(this, t + 3, t + 4);
    return this;
  }, "swap64");
  f.prototype.toString = a(function() {
    let e = this.length;
    return e === 0 ? "" : arguments.length === 0 ? qn(
      this,
      0,
      e
    ) : _o.apply(this, arguments);
  }, "toString");
  f.prototype.toLocaleString = f.prototype.toString;
  f.prototype.equals = a(function(e) {
    if (!f.isBuffer(e))
      throw new TypeError(
        "Argument must be a Buffer"
      );
    return this === e ? true : f.compare(this, e) === 0;
  }, "equals");
  f.prototype.inspect = a(function() {
    let e = "", t = Le.INSPECT_MAX_BYTES;
    return e = this.toString(
      "hex",
      0,
      t
    ).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
  }, "inspect");
  Rn && (f.prototype[Rn] = f.prototype.inspect);
  f.prototype.compare = a(function(e, t, n, i, s) {
    if (ue(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), !f.isBuffer(e))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
    if (t === void 0 && (t = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), s === void 0 && (s = this.length), t < 0 || n > e.length || i < 0 || s > this.length)
      throw new RangeError("out of range index");
    if (i >= s && t >= n)
      return 0;
    if (i >= s)
      return -1;
    if (t >= n)
      return 1;
    if (t >>>= 0, n >>>= 0, i >>>= 0, s >>>= 0, this === e)
      return 0;
    let o = s - i, u = n - t, c = Math.min(o, u), h = this.slice(i, s), l = e.slice(t, n);
    for (let d = 0; d < c; ++d)
      if (h[d] !== l[d]) {
        o = h[d], u = l[d];
        break;
      }
    return o < u ? -1 : u < o ? 1 : 0;
  }, "compare");
  function Nn(r, e, t, n, i) {
    if (r.length === 0)
      return -1;
    if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, Qt(t) && (t = i ? 0 : r.length - 1), t < 0 && (t = r.length + t), t >= r.length) {
      if (i)
        return -1;
      t = r.length - 1;
    } else if (t < 0)
      if (i)
        t = 0;
      else
        return -1;
    if (typeof e == "string" && (e = f.from(e, n)), f.isBuffer(e))
      return e.length === 0 ? -1 : Fn(r, e, t, n, i);
    if (typeof e == "number")
      return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(r, e, t) : Uint8Array.prototype.lastIndexOf.call(r, e, t) : Fn(
        r,
        [e],
        t,
        n,
        i
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  __name(Nn, "Nn");
  a(Nn, "bidirectionalIndexOf");
  function Fn(r, e, t, n, i) {
    let s = 1, o = r.length, u = e.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (r.length < 2 || e.length < 2)
        return -1;
      s = 2, o /= 2, u /= 2, t /= 2;
    }
    function c(l, d) {
      return s === 1 ? l[d] : l.readUInt16BE(d * s);
    }
    __name(c, "c");
    a(c, "read");
    let h;
    if (i) {
      let l = -1;
      for (h = t; h < o; h++)
        if (c(r, h) === c(e, l === -1 ? 0 : h - l)) {
          if (l === -1 && (l = h), h - l + 1 === u)
            return l * s;
        } else
          l !== -1 && (h -= h - l), l = -1;
    } else
      for (t + u > o && (t = o - u), h = t; h >= 0; h--) {
        let l = true;
        for (let d = 0; d < u; d++)
          if (c(r, h + d) !== c(e, d)) {
            l = false;
            break;
          }
        if (l)
          return h;
      }
    return -1;
  }
  __name(Fn, "Fn");
  a(Fn, "arrayIndexOf");
  f.prototype.includes = a(function(e, t, n) {
    return this.indexOf(e, t, n) !== -1;
  }, "includes");
  f.prototype.indexOf = a(function(e, t, n) {
    return Nn(this, e, t, n, true);
  }, "indexOf");
  f.prototype.lastIndexOf = a(function(e, t, n) {
    return Nn(this, e, t, n, false);
  }, "lastIndexOf");
  function Ao(r, e, t, n) {
    t = Number(t) || 0;
    let i = r.length - t;
    n ? (n = Number(n), n > i && (n = i)) : n = i;
    let s = e.length;
    n > s / 2 && (n = s / 2);
    let o;
    for (o = 0; o < n; ++o) {
      let u = parseInt(e.substr(o * 2, 2), 16);
      if (Qt(u))
        return o;
      r[t + o] = u;
    }
    return o;
  }
  __name(Ao, "Ao");
  a(Ao, "hexWrite");
  function Co(r, e, t, n) {
    return at(Ut(
      e,
      r.length - t
    ), r, t, n);
  }
  __name(Co, "Co");
  a(Co, "utf8Write");
  function To(r, e, t, n) {
    return at(No(e), r, t, n);
  }
  __name(To, "To");
  a(To, "asciiWrite");
  function Io(r, e, t, n) {
    return at(Vn(e), r, t, n);
  }
  __name(Io, "Io");
  a(Io, "base64Write");
  function Po(r, e, t, n) {
    return at(qo(e, r.length - t), r, t, n);
  }
  __name(Po, "Po");
  a(Po, "ucs2Write");
  f.prototype.write = a(function(e, t, n, i) {
    if (t === void 0)
      i = "utf8", n = this.length, t = 0;
    else if (n === void 0 && typeof t == "string")
      i = t, n = this.length, t = 0;
    else if (isFinite(t))
      t = t >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
    else
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let s = this.length - t;
    if ((n === void 0 || n > s) && (n = s), e.length > 0 && (n < 0 || t < 0) || t > this.length)
      throw new RangeError(
        "Attempt to write outside buffer bounds"
      );
    i || (i = "utf8");
    let o = false;
    for (; ; )
      switch (i) {
        case "hex":
          return Ao(this, e, t, n);
        case "utf8":
        case "utf-8":
          return Co(this, e, t, n);
        case "ascii":
        case "latin1":
        case "binary":
          return To(this, e, t, n);
        case "base64":
          return Io(
            this,
            e,
            t,
            n
          );
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Po(this, e, t, n);
        default:
          if (o)
            throw new TypeError("Unknown encoding: " + i);
          i = ("" + i).toLowerCase(), o = true;
      }
  }, "write");
  f.prototype.toJSON = a(function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  }, "toJSON");
  function Bo(r, e, t) {
    return e === 0 && t === r.length ? Mt.fromByteArray(r) : Mt.fromByteArray(r.slice(e, t));
  }
  __name(Bo, "Bo");
  a(Bo, "base64Slice");
  function qn(r, e, t) {
    t = Math.min(r.length, t);
    let n = [], i = e;
    for (; i < t; ) {
      let s = r[i], o = null, u = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
      if (i + u <= t) {
        let c, h, l, d;
        switch (u) {
          case 1:
            s < 128 && (o = s);
            break;
          case 2:
            c = r[i + 1], (c & 192) === 128 && (d = (s & 31) << 6 | c & 63, d > 127 && (o = d));
            break;
          case 3:
            c = r[i + 1], h = r[i + 2], (c & 192) === 128 && (h & 192) === 128 && (d = (s & 15) << 12 | (c & 63) << 6 | h & 63, d > 2047 && (d < 55296 || d > 57343) && (o = d));
            break;
          case 4:
            c = r[i + 1], h = r[i + 2], l = r[i + 3], (c & 192) === 128 && (h & 192) === 128 && (l & 192) === 128 && (d = (s & 15) << 18 | (c & 63) << 12 | (h & 63) << 6 | l & 63, d > 65535 && d < 1114112 && (o = d));
        }
      }
      o === null ? (o = 65533, u = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), n.push(o), i += u;
    }
    return Lo(n);
  }
  __name(qn, "qn");
  a(qn, "utf8Slice");
  var Mn = 4096;
  function Lo(r) {
    let e = r.length;
    if (e <= Mn)
      return String.fromCharCode.apply(String, r);
    let t = "", n = 0;
    for (; n < e; )
      t += String.fromCharCode.apply(String, r.slice(n, n += Mn));
    return t;
  }
  __name(Lo, "Lo");
  a(Lo, "decodeCodePointsArray");
  function Ro(r, e, t) {
    let n = "";
    t = Math.min(r.length, t);
    for (let i = e; i < t; ++i)
      n += String.fromCharCode(r[i] & 127);
    return n;
  }
  __name(Ro, "Ro");
  a(Ro, "asciiSlice");
  function Fo(r, e, t) {
    let n = "";
    t = Math.min(r.length, t);
    for (let i = e; i < t; ++i)
      n += String.fromCharCode(r[i]);
    return n;
  }
  __name(Fo, "Fo");
  a(Fo, "latin1Slice");
  function Mo(r, e, t) {
    let n = r.length;
    (!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n);
    let i = "";
    for (let s = e; s < t; ++s)
      i += Qo[r[s]];
    return i;
  }
  __name(Mo, "Mo");
  a(Mo, "hexSlice");
  function Do(r, e, t) {
    let n = r.slice(e, t), i = "";
    for (let s = 0; s < n.length - 1; s += 2)
      i += String.fromCharCode(n[s] + n[s + 1] * 256);
    return i;
  }
  __name(Do, "Do");
  a(Do, "utf16leSlice");
  f.prototype.slice = a(function(e, t) {
    let n = this.length;
    e = ~~e, t = t === void 0 ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
    let i = this.subarray(
      e,
      t
    );
    return Object.setPrototypeOf(i, f.prototype), i;
  }, "slice");
  function N(r, e, t) {
    if (r % 1 !== 0 || r < 0)
      throw new RangeError("offset is not uint");
    if (r + e > t)
      throw new RangeError(
        "Trying to access beyond buffer length"
      );
  }
  __name(N, "N");
  a(N, "checkOffset");
  f.prototype.readUintLE = f.prototype.readUIntLE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || N(e, t, this.length);
    let i = this[e], s = 1, o = 0;
    for (; ++o < t && (s *= 256); )
      i += this[e + o] * s;
    return i;
  }, "readUIntLE");
  f.prototype.readUintBE = f.prototype.readUIntBE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || N(e, t, this.length);
    let i = this[e + --t], s = 1;
    for (; t > 0 && (s *= 256); )
      i += this[e + --t] * s;
    return i;
  }, "readUIntBE");
  f.prototype.readUint8 = f.prototype.readUInt8 = a(function(e, t) {
    return e = e >>> 0, t || N(e, 1, this.length), this[e];
  }, "readUInt8");
  f.prototype.readUint16LE = f.prototype.readUInt16LE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 2, this.length), this[e] | this[e + 1] << 8;
  }, "readUInt16LE");
  f.prototype.readUint16BE = f.prototype.readUInt16BE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 2, this.length), this[e] << 8 | this[e + 1];
  }, "readUInt16BE");
  f.prototype.readUint32LE = f.prototype.readUInt32LE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
  }, "readUInt32LE");
  f.prototype.readUint32BE = f.prototype.readUInt32BE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
  }, "readUInt32BE");
  f.prototype.readBigUInt64LE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && We(e, this.length - 8);
    let i = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, s = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
    return BigInt(i) + (BigInt(s) << BigInt(32));
  }, "readBigUInt64LE"));
  f.prototype.readBigUInt64BE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && We(e, this.length - 8);
    let i = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], s = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
    return (BigInt(
      i
    ) << BigInt(32)) + BigInt(s);
  }, "readBigUInt64BE"));
  f.prototype.readIntLE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || N(e, t, this.length);
    let i = this[e], s = 1, o = 0;
    for (; ++o < t && (s *= 256); )
      i += this[e + o] * s;
    return s *= 128, i >= s && (i -= Math.pow(2, 8 * t)), i;
  }, "readIntLE");
  f.prototype.readIntBE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || N(e, t, this.length);
    let i = t, s = 1, o = this[e + --i];
    for (; i > 0 && (s *= 256); )
      o += this[e + --i] * s;
    return s *= 128, o >= s && (o -= Math.pow(2, 8 * t)), o;
  }, "readIntBE");
  f.prototype.readInt8 = a(function(e, t) {
    return e = e >>> 0, t || N(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
  }, "readInt8");
  f.prototype.readInt16LE = a(function(e, t) {
    e = e >>> 0, t || N(e, 2, this.length);
    let n = this[e] | this[e + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, "readInt16LE");
  f.prototype.readInt16BE = a(
    function(e, t) {
      e = e >>> 0, t || N(e, 2, this.length);
      let n = this[e + 1] | this[e] << 8;
      return n & 32768 ? n | 4294901760 : n;
    },
    "readInt16BE"
  );
  f.prototype.readInt32LE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
  }, "readInt32LE");
  f.prototype.readInt32BE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
  }, "readInt32BE");
  f.prototype.readBigInt64LE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && We(
      e,
      this.length - 8
    );
    let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
    return (BigInt(
      i
    ) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
  }, "readBigInt64LE"));
  f.prototype.readBigInt64BE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && We(e, this.length - 8);
    let i = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
    return (BigInt(i) << BigInt(32)) + BigInt(
      this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
    );
  }, "readBigInt64BE"));
  f.prototype.readFloatLE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 4, this.length), Pe.read(
      this,
      e,
      true,
      23,
      4
    );
  }, "readFloatLE");
  f.prototype.readFloatBE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 4, this.length), Pe.read(this, e, false, 23, 4);
  }, "readFloatBE");
  f.prototype.readDoubleLE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 8, this.length), Pe.read(this, e, true, 52, 8);
  }, "readDoubleLE");
  f.prototype.readDoubleBE = a(function(e, t) {
    return e = e >>> 0, t || N(e, 8, this.length), Pe.read(this, e, false, 52, 8);
  }, "readDoubleBE");
  function Y(r, e, t, n, i, s) {
    if (!f.isBuffer(
      r
    ))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > i || e < s)
      throw new RangeError('"value" argument is out of bounds');
    if (t + n > r.length)
      throw new RangeError(
        "Index out of range"
      );
  }
  __name(Y, "Y");
  a(Y, "checkInt");
  f.prototype.writeUintLE = f.prototype.writeUIntLE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let u = Math.pow(2, 8 * n) - 1;
      Y(
        this,
        e,
        t,
        n,
        u,
        0
      );
    }
    let s = 1, o = 0;
    for (this[t] = e & 255; ++o < n && (s *= 256); )
      this[t + o] = e / s & 255;
    return t + n;
  }, "writeUIntLE");
  f.prototype.writeUintBE = f.prototype.writeUIntBE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let u = Math.pow(2, 8 * n) - 1;
      Y(this, e, t, n, u, 0);
    }
    let s = n - 1, o = 1;
    for (this[t + s] = e & 255; --s >= 0 && (o *= 256); )
      this[t + s] = e / o & 255;
    return t + n;
  }, "writeUIntBE");
  f.prototype.writeUint8 = f.prototype.writeUInt8 = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
  }, "writeUInt8");
  f.prototype.writeUint16LE = f.prototype.writeUInt16LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(
      this,
      e,
      t,
      2,
      65535,
      0
    ), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  }, "writeUInt16LE");
  f.prototype.writeUint16BE = f.prototype.writeUInt16BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(
      this,
      e,
      t,
      2,
      65535,
      0
    ), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  }, "writeUInt16BE");
  f.prototype.writeUint32LE = f.prototype.writeUInt32LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(
      this,
      e,
      t,
      4,
      4294967295,
      0
    ), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
  }, "writeUInt32LE");
  f.prototype.writeUint32BE = f.prototype.writeUInt32BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  }, "writeUInt32BE");
  function Qn(r, e, t, n, i) {
    $n(
      e,
      n,
      i,
      r,
      t,
      7
    );
    let s = Number(e & BigInt(4294967295));
    r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s;
    let o = Number(e >> BigInt(32) & BigInt(4294967295));
    return r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, t;
  }
  __name(Qn, "Qn");
  a(Qn, "wrtBigUInt64LE");
  function jn(r, e, t, n, i) {
    $n(e, n, i, r, t, 7);
    let s = Number(e & BigInt(4294967295));
    r[t + 7] = s, s = s >> 8, r[t + 6] = s, s = s >> 8, r[t + 5] = s, s = s >> 8, r[t + 4] = s;
    let o = Number(e >> BigInt(32) & BigInt(4294967295));
    return r[t + 3] = o, o = o >> 8, r[t + 2] = o, o = o >> 8, r[t + 1] = o, o = o >> 8, r[t] = o, t + 8;
  }
  __name(jn, "jn");
  a(jn, "wrtBigUInt64BE");
  f.prototype.writeBigUInt64LE = me(a(function(e, t = 0) {
    return Qn(this, e, t, BigInt(0), BigInt(
      "0xffffffffffffffff"
    ));
  }, "writeBigUInt64LE"));
  f.prototype.writeBigUInt64BE = me(a(function(e, t = 0) {
    return jn(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
  }, "writeBigUInt64BE"));
  f.prototype.writeIntLE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let c = Math.pow(
        2,
        8 * n - 1
      );
      Y(this, e, t, n, c - 1, -c);
    }
    let s = 0, o = 1, u = 0;
    for (this[t] = e & 255; ++s < n && (o *= 256); )
      e < 0 && u === 0 && this[t + s - 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
    return t + n;
  }, "writeIntLE");
  f.prototype.writeIntBE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let c = Math.pow(
        2,
        8 * n - 1
      );
      Y(this, e, t, n, c - 1, -c);
    }
    let s = n - 1, o = 1, u = 0;
    for (this[t + s] = e & 255; --s >= 0 && (o *= 256); )
      e < 0 && u === 0 && this[t + s + 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
    return t + n;
  }, "writeIntBE");
  f.prototype.writeInt8 = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(
      this,
      e,
      t,
      1,
      127,
      -128
    ), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
  }, "writeInt8");
  f.prototype.writeInt16LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  }, "writeInt16LE");
  f.prototype.writeInt16BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  }, "writeInt16BE");
  f.prototype.writeInt32LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 4, 2147483647, -2147483648), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
  }, "writeInt32LE");
  f.prototype.writeInt32BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || Y(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  }, "writeInt32BE");
  f.prototype.writeBigInt64LE = me(a(function(e, t = 0) {
    return Qn(this, e, t, -BigInt(
      "0x8000000000000000"
    ), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64LE"));
  f.prototype.writeBigInt64BE = me(a(function(e, t = 0) {
    return jn(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64BE"));
  function Wn(r, e, t, n, i, s) {
    if (t + n > r.length)
      throw new RangeError("Index out of range");
    if (t < 0)
      throw new RangeError(
        "Index out of range"
      );
  }
  __name(Wn, "Wn");
  a(Wn, "checkIEEE754");
  function Hn(r, e, t, n, i) {
    return e = +e, t = t >>> 0, i || Wn(r, e, t, 4, 34028234663852886e22, -34028234663852886e22), Pe.write(
      r,
      e,
      t,
      n,
      23,
      4
    ), t + 4;
  }
  __name(Hn, "Hn");
  a(Hn, "writeFloat");
  f.prototype.writeFloatLE = a(function(e, t, n) {
    return Hn(
      this,
      e,
      t,
      true,
      n
    );
  }, "writeFloatLE");
  f.prototype.writeFloatBE = a(function(e, t, n) {
    return Hn(
      this,
      e,
      t,
      false,
      n
    );
  }, "writeFloatBE");
  function Gn(r, e, t, n, i) {
    return e = +e, t = t >>> 0, i || Wn(
      r,
      e,
      t,
      8,
      17976931348623157e292,
      -17976931348623157e292
    ), Pe.write(r, e, t, n, 52, 8), t + 8;
  }
  __name(Gn, "Gn");
  a(Gn, "writeDouble");
  f.prototype.writeDoubleLE = a(function(e, t, n) {
    return Gn(
      this,
      e,
      t,
      true,
      n
    );
  }, "writeDoubleLE");
  f.prototype.writeDoubleBE = a(function(e, t, n) {
    return Gn(
      this,
      e,
      t,
      false,
      n
    );
  }, "writeDoubleBE");
  f.prototype.copy = a(function(e, t, n, i) {
    if (!f.isBuffer(
      e
    ))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !i && i !== 0 && (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0)
      return 0;
    if (t < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (i < 0)
      throw new RangeError(
        "sourceEnd out of bounds"
      );
    i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
    let s = i - n;
    return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), t), s;
  }, "copy");
  f.prototype.fill = a(function(e, t, n, i) {
    if (typeof e == "string") {
      if (typeof t == "string" ? (i = t, t = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string")
        throw new TypeError("encoding must be a string");
      if (typeof i == "string" && !f.isEncoding(i))
        throw new TypeError("Unknown encoding: " + i);
      if (e.length === 1) {
        let o = e.charCodeAt(0);
        (i === "utf8" && o < 128 || i === "latin1") && (e = o);
      }
    } else
      typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
    if (t < 0 || this.length < t || this.length < n)
      throw new RangeError("Out of range index");
    if (n <= t)
      return this;
    t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
    let s;
    if (typeof e == "number")
      for (s = t; s < n; ++s)
        this[s] = e;
    else {
      let o = f.isBuffer(e) ? e : f.from(e, i), u = o.length;
      if (u === 0)
        throw new TypeError(
          'The value "' + e + '" is invalid for argument "value"'
        );
      for (s = 0; s < n - t; ++s)
        this[s + t] = o[s % u];
    }
    return this;
  }, "fill");
  var Ie = {};
  function qt(r, e, t) {
    var n;
    Ie[r] = (n = /* @__PURE__ */ __name(class extends t {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: e.apply(this, arguments),
          writable: true,
          configurable: true
        }), this.name = `${this.name} [${r}]`, this.stack, delete this.name;
      }
      get code() {
        return r;
      }
      set code(s) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value: s,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${r}]: ${this.message}`;
      }
    }, "n"), a(n, "NodeError"), n);
  }
  __name(qt, "qt");
  a(qt, "E");
  qt("ERR_BUFFER_OUT_OF_BOUNDS", function(r) {
    return r ? `${r} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  qt("ERR_INVALID_ARG_TYPE", function(r, e) {
    return `The "${r}" argument must be of type number. Received type ${typeof e}`;
  }, TypeError);
  qt("ERR_OUT_OF_RANGE", function(r, e, t) {
    let n = `The value of "${r}" is out of range.`, i = t;
    return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = Dn(String(t)) : typeof t == "bigint" && (i = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = Dn(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n;
  }, RangeError);
  function Dn(r) {
    let e = "", t = r.length, n = r[0] === "-" ? 1 : 0;
    for (; t >= n + 4; t -= 3)
      e = `_${r.slice(t - 3, t)}${e}`;
    return `${r.slice(
      0,
      t
    )}${e}`;
  }
  __name(Dn, "Dn");
  a(Dn, "addNumericalSeparator");
  function ko(r, e, t) {
    Be(e, "offset"), (r[e] === void 0 || r[e + t] === void 0) && We(e, r.length - (t + 1));
  }
  __name(ko, "ko");
  a(ko, "checkBounds");
  function $n(r, e, t, n, i, s) {
    if (r > t || r < e) {
      let o = typeof e == "bigint" ? "n" : "", u;
      throw s > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${o} and < 2${o} ** ${(s + 1) * 8}${o}` : u = `>= -(2${o} ** ${(s + 1) * 8 - 1}${o}) and < 2 ** ${(s + 1) * 8 - 1}${o}` : u = `>= ${e}${o} and <= ${t}${o}`, new Ie.ERR_OUT_OF_RANGE(
        "value",
        u,
        r
      );
    }
    ko(n, i, s);
  }
  __name($n, "$n");
  a($n, "checkIntBI");
  function Be(r, e) {
    if (typeof r != "number")
      throw new Ie.ERR_INVALID_ARG_TYPE(e, "number", r);
  }
  __name(Be, "Be");
  a(Be, "validateNumber");
  function We(r, e, t) {
    throw Math.floor(r) !== r ? (Be(r, t), new Ie.ERR_OUT_OF_RANGE(
      t || "offset",
      "an integer",
      r
    )) : e < 0 ? new Ie.ERR_BUFFER_OUT_OF_BOUNDS() : new Ie.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${e}`, r);
  }
  __name(We, "We");
  a(We, "boundsError");
  var Uo = /[^+/0-9A-Za-z-_]/g;
  function Oo(r) {
    if (r = r.split("=")[0], r = r.trim().replace(Uo, ""), r.length < 2)
      return "";
    for (; r.length % 4 !== 0; )
      r = r + "=";
    return r;
  }
  __name(Oo, "Oo");
  a(Oo, "base64clean");
  function Ut(r, e) {
    e = e || 1 / 0;
    let t, n = r.length, i = null, s = [];
    for (let o = 0; o < n; ++o) {
      if (t = r.charCodeAt(o), t > 55295 && t < 57344) {
        if (!i) {
          if (t > 56319) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          } else if (o + 1 === n) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          }
          i = t;
          continue;
        }
        if (t < 56320) {
          (e -= 3) > -1 && s.push(
            239,
            191,
            189
          ), i = t;
          continue;
        }
        t = (i - 55296 << 10 | t - 56320) + 65536;
      } else
        i && (e -= 3) > -1 && s.push(
          239,
          191,
          189
        );
      if (i = null, t < 128) {
        if ((e -= 1) < 0)
          break;
        s.push(t);
      } else if (t < 2048) {
        if ((e -= 2) < 0)
          break;
        s.push(t >> 6 | 192, t & 63 | 128);
      } else if (t < 65536) {
        if ((e -= 3) < 0)
          break;
        s.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
      } else if (t < 1114112) {
        if ((e -= 4) < 0)
          break;
        s.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return s;
  }
  __name(Ut, "Ut");
  a(
    Ut,
    "utf8ToBytes"
  );
  function No(r) {
    let e = [];
    for (let t = 0; t < r.length; ++t)
      e.push(r.charCodeAt(
        t
      ) & 255);
    return e;
  }
  __name(No, "No");
  a(No, "asciiToBytes");
  function qo(r, e) {
    let t, n, i, s = [];
    for (let o = 0; o < r.length && !((e -= 2) < 0); ++o)
      t = r.charCodeAt(o), n = t >> 8, i = t % 256, s.push(i), s.push(n);
    return s;
  }
  __name(qo, "qo");
  a(qo, "utf16leToBytes");
  function Vn(r) {
    return Mt.toByteArray(Oo(r));
  }
  __name(Vn, "Vn");
  a(Vn, "base64ToBytes");
  function at(r, e, t, n) {
    let i;
    for (i = 0; i < n && !(i + t >= e.length || i >= r.length); ++i)
      e[i + t] = r[i];
    return i;
  }
  __name(at, "at");
  a(at, "blitBuffer");
  function ue(r, e) {
    return r instanceof e || r != null && r.constructor != null && r.constructor.name != null && r.constructor.name === e.name;
  }
  __name(ue, "ue");
  a(ue, "isInstance");
  function Qt(r) {
    return r !== r;
  }
  __name(Qt, "Qt");
  a(Qt, "numberIsNaN");
  var Qo = function() {
    let r = "0123456789abcdef", e = new Array(256);
    for (let t = 0; t < 16; ++t) {
      let n = t * 16;
      for (let i = 0; i < 16; ++i)
        e[n + i] = r[t] + r[i];
    }
    return e;
  }();
  function me(r) {
    return typeof BigInt > "u" ? jo : r;
  }
  __name(me, "me");
  a(me, "defineBigIntMethod");
  function jo() {
    throw new Error("BigInt not supported");
  }
  __name(jo, "jo");
  a(jo, "BufferBigIntNotDefined");
});
var S;
var x;
var E;
var w;
var y;
var m;
var p = z(() => {
  "use strict";
  S = globalThis, x = globalThis.setImmediate ?? ((r) => setTimeout(
    r,
    0
  )), E = globalThis.clearImmediate ?? ((r) => clearTimeout(r)), w = globalThis.crypto ?? {};
  w.subtle ?? (w.subtle = {});
  y = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : Kn().Buffer, m = globalThis.process ?? {};
  m.env ?? (m.env = {});
  try {
    m.nextTick(() => {
    });
  } catch {
    let e = Promise.resolve();
    m.nextTick = e.then.bind(e);
  }
});
var ge = I((nh, jt) => {
  "use strict";
  p();
  var Re = typeof Reflect == "object" ? Reflect : null, zn = Re && typeof Re.apply == "function" ? Re.apply : a(function(e, t, n) {
    return Function.prototype.apply.call(e, t, n);
  }, "ReflectApply"), ut;
  Re && typeof Re.ownKeys == "function" ? ut = Re.ownKeys : Object.getOwnPropertySymbols ? ut = a(function(e) {
    return Object.getOwnPropertyNames(
      e
    ).concat(Object.getOwnPropertySymbols(e));
  }, "ReflectOwnKeys") : ut = a(function(e) {
    return Object.getOwnPropertyNames(e);
  }, "ReflectOwnKeys");
  function Wo(r) {
    console && console.warn && console.warn(r);
  }
  __name(Wo, "Wo");
  a(Wo, "ProcessEmitWarning");
  var Zn = Number.isNaN || a(function(e) {
    return e !== e;
  }, "NumberIsNaN");
  function L() {
    L.init.call(this);
  }
  __name(L, "L");
  a(L, "EventEmitter");
  jt.exports = L;
  jt.exports.once = Vo;
  L.EventEmitter = L;
  L.prototype._events = void 0;
  L.prototype._eventsCount = 0;
  L.prototype._maxListeners = void 0;
  var Yn = 10;
  function ct(r) {
    if (typeof r != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
  }
  __name(ct, "ct");
  a(ct, "checkListener");
  Object.defineProperty(L, "defaultMaxListeners", { enumerable: true, get: a(function() {
    return Yn;
  }, "get"), set: a(function(r) {
    if (typeof r != "number" || r < 0 || Zn(r))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
    Yn = r;
  }, "set") });
  L.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  };
  L.prototype.setMaxListeners = a(
    function(e) {
      if (typeof e != "number" || e < 0 || Zn(e))
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
      return this._maxListeners = e, this;
    },
    "setMaxListeners"
  );
  function Jn(r) {
    return r._maxListeners === void 0 ? L.defaultMaxListeners : r._maxListeners;
  }
  __name(Jn, "Jn");
  a(Jn, "_getMaxListeners");
  L.prototype.getMaxListeners = a(function() {
    return Jn(this);
  }, "getMaxListeners");
  L.prototype.emit = a(function(e) {
    for (var t = [], n = 1; n < arguments.length; n++)
      t.push(arguments[n]);
    var i = e === "error", s = this._events;
    if (s !== void 0)
      i = i && s.error === void 0;
    else if (!i)
      return false;
    if (i) {
      var o;
      if (t.length > 0 && (o = t[0]), o instanceof Error)
        throw o;
      var u = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
      throw u.context = o, u;
    }
    var c = s[e];
    if (c === void 0)
      return false;
    if (typeof c == "function")
      zn(c, this, t);
    else
      for (var h = c.length, l = ni(c, h), n = 0; n < h; ++n)
        zn(
          l[n],
          this,
          t
        );
    return true;
  }, "emit");
  function Xn(r, e, t, n) {
    var i, s, o;
    if (ct(t), s = r._events, s === void 0 ? (s = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (s.newListener !== void 0 && (r.emit(
      "newListener",
      e,
      t.listener ? t.listener : t
    ), s = r._events), o = s[e]), o === void 0)
      o = s[e] = t, ++r._eventsCount;
    else if (typeof o == "function" ? o = s[e] = n ? [t, o] : [o, t] : n ? o.unshift(
      t
    ) : o.push(t), i = Jn(r), i > 0 && o.length > i && !o.warned) {
      o.warned = true;
      var u = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      u.name = "MaxListenersExceededWarning", u.emitter = r, u.type = e, u.count = o.length, Wo(u);
    }
    return r;
  }
  __name(Xn, "Xn");
  a(Xn, "_addListener");
  L.prototype.addListener = a(function(e, t) {
    return Xn(this, e, t, false);
  }, "addListener");
  L.prototype.on = L.prototype.addListener;
  L.prototype.prependListener = a(function(e, t) {
    return Xn(this, e, t, true);
  }, "prependListener");
  function Ho() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  __name(Ho, "Ho");
  a(
    Ho,
    "onceWrapper"
  );
  function ei(r, e, t) {
    var n = {
      fired: false,
      wrapFn: void 0,
      target: r,
      type: e,
      listener: t
    }, i = Ho.bind(n);
    return i.listener = t, n.wrapFn = i, i;
  }
  __name(ei, "ei");
  a(ei, "_onceWrap");
  L.prototype.once = a(function(e, t) {
    return ct(t), this.on(e, ei(this, e, t)), this;
  }, "once");
  L.prototype.prependOnceListener = a(function(e, t) {
    return ct(t), this.prependListener(e, ei(
      this,
      e,
      t
    )), this;
  }, "prependOnceListener");
  L.prototype.removeListener = a(
    function(e, t) {
      var n, i, s, o, u;
      if (ct(t), i = this._events, i === void 0)
        return this;
      if (n = i[e], n === void 0)
        return this;
      if (n === t || n.listener === t)
        --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
      else if (typeof n != "function") {
        for (s = -1, o = n.length - 1; o >= 0; o--)
          if (n[o] === t || n[o].listener === t) {
            u = n[o].listener, s = o;
            break;
          }
        if (s < 0)
          return this;
        s === 0 ? n.shift() : Go(n, s), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, u || t);
      }
      return this;
    },
    "removeListener"
  );
  L.prototype.off = L.prototype.removeListener;
  L.prototype.removeAllListeners = a(function(e) {
    var t, n, i;
    if (n = this._events, n === void 0)
      return this;
    if (n.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
    if (arguments.length === 0) {
      var s = Object.keys(n), o;
      for (i = 0; i < s.length; ++i)
        o = s[i], o !== "removeListener" && this.removeAllListeners(o);
      return this.removeAllListeners(
        "removeListener"
      ), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (t = n[e], typeof t == "function")
      this.removeListener(e, t);
    else if (t !== void 0)
      for (i = t.length - 1; i >= 0; i--)
        this.removeListener(e, t[i]);
    return this;
  }, "removeAllListeners");
  function ti(r, e, t) {
    var n = r._events;
    if (n === void 0)
      return [];
    var i = n[e];
    return i === void 0 ? [] : typeof i == "function" ? t ? [i.listener || i] : [i] : t ? $o(i) : ni(i, i.length);
  }
  __name(ti, "ti");
  a(ti, "_listeners");
  L.prototype.listeners = a(function(e) {
    return ti(this, e, true);
  }, "listeners");
  L.prototype.rawListeners = a(function(e) {
    return ti(this, e, false);
  }, "rawListeners");
  L.listenerCount = function(r, e) {
    return typeof r.listenerCount == "function" ? r.listenerCount(e) : ri.call(r, e);
  };
  L.prototype.listenerCount = ri;
  function ri(r) {
    var e = this._events;
    if (e !== void 0) {
      var t = e[r];
      if (typeof t == "function")
        return 1;
      if (t !== void 0)
        return t.length;
    }
    return 0;
  }
  __name(ri, "ri");
  a(ri, "listenerCount");
  L.prototype.eventNames = a(function() {
    return this._eventsCount > 0 ? ut(this._events) : [];
  }, "eventNames");
  function ni(r, e) {
    for (var t = new Array(e), n = 0; n < e; ++n)
      t[n] = r[n];
    return t;
  }
  __name(ni, "ni");
  a(ni, "arrayClone");
  function Go(r, e) {
    for (; e + 1 < r.length; e++)
      r[e] = r[e + 1];
    r.pop();
  }
  __name(Go, "Go");
  a(Go, "spliceOne");
  function $o(r) {
    for (var e = new Array(r.length), t = 0; t < e.length; ++t)
      e[t] = r[t].listener || r[t];
    return e;
  }
  __name($o, "$o");
  a($o, "unwrapListeners");
  function Vo(r, e) {
    return new Promise(
      function(t, n) {
        function i(o) {
          r.removeListener(e, s), n(o);
        }
        __name(i, "i");
        a(i, "errorListener");
        function s() {
          typeof r.removeListener == "function" && r.removeListener("error", i), t([].slice.call(
            arguments
          ));
        }
        __name(s, "s");
        a(s, "resolver"), ii(r, e, s, { once: true }), e !== "error" && Ko(r, i, { once: true });
      }
    );
  }
  __name(Vo, "Vo");
  a(Vo, "once");
  function Ko(r, e, t) {
    typeof r.on == "function" && ii(r, "error", e, t);
  }
  __name(Ko, "Ko");
  a(
    Ko,
    "addErrorHandlerIfEventEmitter"
  );
  function ii(r, e, t, n) {
    if (typeof r.on == "function")
      n.once ? r.once(e, t) : r.on(e, t);
    else if (typeof r.addEventListener == "function")
      r.addEventListener(
        e,
        a(/* @__PURE__ */ __name(function i(s) {
          n.once && r.removeEventListener(e, i), t(s);
        }, "i"), "wrapListener")
      );
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
  }
  __name(ii, "ii");
  a(ii, "eventTargetAgnosticAddListener");
});
var He = {};
se(He, { default: () => zo });
var zo;
var Ge = z(() => {
  "use strict";
  p();
  zo = {};
});
function $e(r) {
  let e = 1779033703, t = 3144134277, n = 1013904242, i = 2773480762, s = 1359893119, o = 2600822924, u = 528734635, c = 1541459225, h = 0, l = 0, d = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], b = a(
    (A, g) => A >>> g | A << 32 - g,
    "rrot"
  ), C = new Uint32Array(64), B = new Uint8Array(64), Q = a(() => {
    for (let R = 0, $ = 0; R < 16; R++, $ += 4)
      C[R] = B[$] << 24 | B[$ + 1] << 16 | B[$ + 2] << 8 | B[$ + 3];
    for (let R = 16; R < 64; R++) {
      let $ = b(C[R - 15], 7) ^ b(C[R - 15], 18) ^ C[R - 15] >>> 3, ce = b(C[R - 2], 17) ^ b(C[R - 2], 19) ^ C[R - 2] >>> 10;
      C[R] = C[R - 16] + $ + C[R - 7] + ce | 0;
    }
    let A = e, g = t, P = n, K = i, k = s, j = o, ee = u, oe = c;
    for (let R = 0; R < 64; R++) {
      let $ = b(
        k,
        6
      ) ^ b(k, 11) ^ b(k, 25), ce = k & j ^ ~k & ee, ye = oe + $ + ce + d[R] + C[R] | 0, Se = b(A, 2) ^ b(A, 13) ^ b(A, 22), je = A & g ^ A & P ^ g & P, he = Se + je | 0;
      oe = ee, ee = j, j = k, k = K + ye | 0, K = P, P = g, g = A, A = ye + he | 0;
    }
    e = e + A | 0, t = t + g | 0, n = n + P | 0, i = i + K | 0, s = s + k | 0, o = o + j | 0, u = u + ee | 0, c = c + oe | 0, l = 0;
  }, "process"), X = a((A) => {
    typeof A == "string" && (A = new TextEncoder().encode(A));
    for (let g = 0; g < A.length; g++)
      B[l++] = A[g], l === 64 && Q();
    h += A.length;
  }, "add"), de = a(() => {
    if (B[l++] = 128, l == 64 && Q(), l + 8 > 64) {
      for (; l < 64; )
        B[l++] = 0;
      Q();
    }
    for (; l < 58; )
      B[l++] = 0;
    let A = h * 8;
    B[l++] = A / 1099511627776 & 255, B[l++] = A / 4294967296 & 255, B[l++] = A >>> 24, B[l++] = A >>> 16 & 255, B[l++] = A >>> 8 & 255, B[l++] = A & 255, Q();
    let g = new Uint8Array(32);
    return g[0] = e >>> 24, g[1] = e >>> 16 & 255, g[2] = e >>> 8 & 255, g[3] = e & 255, g[4] = t >>> 24, g[5] = t >>> 16 & 255, g[6] = t >>> 8 & 255, g[7] = t & 255, g[8] = n >>> 24, g[9] = n >>> 16 & 255, g[10] = n >>> 8 & 255, g[11] = n & 255, g[12] = i >>> 24, g[13] = i >>> 16 & 255, g[14] = i >>> 8 & 255, g[15] = i & 255, g[16] = s >>> 24, g[17] = s >>> 16 & 255, g[18] = s >>> 8 & 255, g[19] = s & 255, g[20] = o >>> 24, g[21] = o >>> 16 & 255, g[22] = o >>> 8 & 255, g[23] = o & 255, g[24] = u >>> 24, g[25] = u >>> 16 & 255, g[26] = u >>> 8 & 255, g[27] = u & 255, g[28] = c >>> 24, g[29] = c >>> 16 & 255, g[30] = c >>> 8 & 255, g[31] = c & 255, g;
  }, "digest");
  return r === void 0 ? { add: X, digest: de } : (X(r), de());
}
__name($e, "$e");
var si = z(
  () => {
    "use strict";
    p();
    a($e, "sha256");
  }
);
var U;
var Ve;
var oi = z(() => {
  "use strict";
  p();
  U = /* @__PURE__ */ __name(class U2 {
    constructor() {
      _(
        this,
        "_dataLength",
        0
      );
      _(this, "_bufferLength", 0);
      _(this, "_state", new Int32Array(4));
      _(
        this,
        "_buffer",
        new ArrayBuffer(68)
      );
      _(this, "_buffer8");
      _(this, "_buffer32");
      this._buffer8 = new Uint8Array(
        this._buffer,
        0,
        68
      ), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
    }
    static hashByteArray(e, t = false) {
      return this.onePassHasher.start().appendByteArray(e).end(t);
    }
    static hashStr(e, t = false) {
      return this.onePassHasher.start().appendStr(e).end(t);
    }
    static hashAsciiStr(e, t = false) {
      return this.onePassHasher.start().appendAsciiStr(e).end(t);
    }
    static _hex(e) {
      let t = U2.hexChars, n = U2.hexOut, i, s, o, u;
      for (u = 0; u < 4; u += 1)
        for (s = u * 8, i = e[u], o = 0; o < 8; o += 2)
          n[s + 1 + o] = t.charAt(i & 15), i >>>= 4, n[s + 0 + o] = t.charAt(i & 15), i >>>= 4;
      return n.join("");
    }
    static _md5cycle(e, t) {
      let n = e[0], i = e[1], s = e[2], o = e[3];
      n += (i & s | ~i & o) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[1] - 389564586 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[5] + 1200080426 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[9] - 1958414417 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[10] - 42063 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[13] - 40341101 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & o | s & ~o) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[6] - 1069501632 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[10] + 38016083 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[14] - 1019803690 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[2] - 51403784 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i ^ s ^ o) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[8] - 2022574463 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[4] + 1272893353 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[0] - 358537222 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[12] - 421815835 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (s ^ (i | ~o)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[7] + 1126891415 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[3] - 1894986606 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[15] - 30611744 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[11] - 1120210379 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + s | 0, e[0] = n + e[0] | 0, e[1] = i + e[1] | 0, e[2] = s + e[2] | 0, e[3] = o + e[3] | 0;
    }
    start() {
      return this._dataLength = 0, this._bufferLength = 0, this._state.set(U2.stateIdentity), this;
    }
    appendStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o;
      for (o = 0; o < e.length; o += 1) {
        if (s = e.charCodeAt(o), s < 128)
          t[i++] = s;
        else if (s < 2048)
          t[i++] = (s >>> 6) + 192, t[i++] = s & 63 | 128;
        else if (s < 55296 || s > 56319)
          t[i++] = (s >>> 12) + 224, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        else {
          if (s = (s - 55296) * 1024 + (e.charCodeAt(++o) - 56320) + 65536, s > 1114111)
            throw new Error("Unicode standard supports code points up to U+10FFFF");
          t[i++] = (s >>> 18) + 240, t[i++] = s >>> 12 & 63 | 128, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        }
        i >= 64 && (this._dataLength += 64, U2._md5cycle(this._state, n), i -= 64, n[0] = n[16]);
      }
      return this._bufferLength = i, this;
    }
    appendAsciiStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o, 64 - i); s--; )
          t[i++] = e.charCodeAt(o++);
        if (i < 64)
          break;
        this._dataLength += 64, U2._md5cycle(
          this._state,
          n
        ), i = 0;
      }
      return this._bufferLength = i, this;
    }
    appendByteArray(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o, 64 - i); s--; )
          t[i++] = e[o++];
        if (i < 64)
          break;
        this._dataLength += 64, U2._md5cycle(
          this._state,
          n
        ), i = 0;
      }
      return this._bufferLength = i, this;
    }
    getState() {
      let e = this._state;
      return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
    }
    setState(e) {
      let t = e.buffer, n = e.state, i = this._state, s;
      for (this._dataLength = e.length, this._bufferLength = e.buflen, i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], s = 0; s < t.length; s += 1)
        this._buffer8[s] = t.charCodeAt(s);
    }
    end(e = false) {
      let t = this._bufferLength, n = this._buffer8, i = this._buffer32, s = (t >> 2) + 1;
      this._dataLength += t;
      let o = this._dataLength * 8;
      if (n[t] = 128, n[t + 1] = n[t + 2] = n[t + 3] = 0, i.set(U2.buffer32Identity.subarray(s), s), t > 55 && (U2._md5cycle(this._state, i), i.set(U2.buffer32Identity)), o <= 4294967295)
        i[14] = o;
      else {
        let u = o.toString(16).match(/(.*?)(.{0,8})$/);
        if (u === null)
          return;
        let c = parseInt(
          u[2],
          16
        ), h = parseInt(u[1], 16) || 0;
        i[14] = c, i[15] = h;
      }
      return U2._md5cycle(this._state, i), e ? this._state : U2._hex(this._state);
    }
  }, "U");
  a(U, "Md5"), _(U, "stateIdentity", new Int32Array(
    [1732584193, -271733879, -1732584194, 271733878]
  )), _(U, "buffer32Identity", new Int32Array(
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  )), _(U, "hexChars", "0123456789abcdef"), _(U, "hexOut", []), _(U, "onePassHasher", new U());
  Ve = U;
});
var Wt = {};
se(Wt, { createHash: () => Zo, createHmac: () => Jo, randomBytes: () => Yo });
function Yo(r) {
  return w.getRandomValues(y.alloc(r));
}
__name(Yo, "Yo");
function Zo(r) {
  if (r === "sha256")
    return { update: a(
      function(e) {
        return { digest: a(function() {
          return y.from($e(e));
        }, "digest") };
      },
      "update"
    ) };
  if (r === "md5")
    return { update: a(function(e) {
      return { digest: a(function() {
        return typeof e == "string" ? Ve.hashStr(e) : Ve.hashByteArray(e);
      }, "digest") };
    }, "update") };
  throw new Error(
    `Hash type '${r}' not supported`
  );
}
__name(Zo, "Zo");
function Jo(r, e) {
  if (r !== "sha256")
    throw new Error(
      `Only sha256 is supported (requested: '${r}')`
    );
  return { update: a(function(t) {
    return {
      digest: a(function() {
        typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t == "string" && (t = new TextEncoder().encode(t));
        let n = e.length;
        if (n > 64)
          e = $e(e);
        else if (n < 64) {
          let c = new Uint8Array(64);
          c.set(e), e = c;
        }
        let i = new Uint8Array(64), s = new Uint8Array(
          64
        );
        for (let c = 0; c < 64; c++)
          i[c] = 54 ^ e[c], s[c] = 92 ^ e[c];
        let o = new Uint8Array(t.length + 64);
        o.set(i, 0), o.set(t, 64);
        let u = new Uint8Array(96);
        return u.set(s, 0), u.set(
          $e(o),
          64
        ), y.from($e(u));
      }, "digest")
    };
  }, "update") };
}
__name(Jo, "Jo");
var Ht = z(() => {
  "use strict";
  p();
  si();
  oi();
  a(Yo, "randomBytes");
  a(Zo, "createHash");
  a(Jo, "createHmac");
});
var $t = I((ai) => {
  "use strict";
  p();
  ai.parse = function(r, e) {
    return new Gt(r, e).parse();
  };
  var ht = /* @__PURE__ */ __name(class ht2 {
    constructor(e, t) {
      this.source = e, this.transform = t || Xo, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
    }
    isEof() {
      return this.position >= this.source.length;
    }
    nextCharacter() {
      var e = this.source[this.position++];
      return e === "\\" ? { value: this.source[this.position++], escaped: true } : { value: e, escaped: false };
    }
    record(e) {
      this.recorded.push(e);
    }
    newEntry(e) {
      var t;
      (this.recorded.length > 0 || e) && (t = this.recorded.join(""), t === "NULL" && !e && (t = null), t !== null && (t = this.transform(t)), this.entries.push(
        t
      ), this.recorded = []);
    }
    consumeDimensions() {
      if (this.source[0] === "[")
        for (; !this.isEof(); ) {
          var e = this.nextCharacter();
          if (e.value === "=")
            break;
        }
    }
    parse(e) {
      var t, n, i;
      for (this.consumeDimensions(); !this.isEof(); )
        if (t = this.nextCharacter(), t.value === "{" && !i)
          this.dimension++, this.dimension > 1 && (n = new ht2(this.source.substr(this.position - 1), this.transform), this.entries.push(
            n.parse(true)
          ), this.position += n.position - 2);
        else if (t.value === "}" && !i) {
          if (this.dimension--, !this.dimension && (this.newEntry(), e))
            return this.entries;
        } else
          t.value === '"' && !t.escaped ? (i && this.newEntry(true), i = !i) : t.value === "," && !i ? this.newEntry() : this.record(
            t.value
          );
      if (this.dimension !== 0)
        throw new Error("array dimension not balanced");
      return this.entries;
    }
  }, "ht");
  a(ht, "ArrayParser");
  var Gt = ht;
  function Xo(r) {
    return r;
  }
  __name(Xo, "Xo");
  a(Xo, "identity");
});
var Vt = I((Sh, ui) => {
  p();
  var ea = $t();
  ui.exports = { create: a(function(r, e) {
    return { parse: a(
      function() {
        return ea.parse(r, e);
      },
      "parse"
    ) };
  }, "create") };
});
var li = I((vh, hi) => {
  "use strict";
  p();
  var ta = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, ra = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, na = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, ia = /^-?infinity$/;
  hi.exports = a(function(e) {
    if (ia.test(e))
      return Number(e.replace("i", "I"));
    var t = ta.exec(e);
    if (!t)
      return sa(e) || null;
    var n = !!t[8], i = parseInt(t[1], 10);
    n && (i = ci(i));
    var s = parseInt(
      t[2],
      10
    ) - 1, o = t[3], u = parseInt(t[4], 10), c = parseInt(t[5], 10), h = parseInt(t[6], 10), l = t[7];
    l = l ? 1e3 * parseFloat(l) : 0;
    var d, b = oa(e);
    return b != null ? (d = new Date(Date.UTC(
      i,
      s,
      o,
      u,
      c,
      h,
      l
    )), Kt(i) && d.setUTCFullYear(i), b !== 0 && d.setTime(d.getTime() - b)) : (d = new Date(
      i,
      s,
      o,
      u,
      c,
      h,
      l
    ), Kt(i) && d.setFullYear(i)), d;
  }, "parseDate");
  function sa(r) {
    var e = ra.exec(r);
    if (e) {
      var t = parseInt(e[1], 10), n = !!e[4];
      n && (t = ci(t));
      var i = parseInt(
        e[2],
        10
      ) - 1, s = e[3], o = new Date(t, i, s);
      return Kt(t) && o.setFullYear(t), o;
    }
  }
  __name(sa, "sa");
  a(sa, "getDate");
  function oa(r) {
    if (r.endsWith("+00"))
      return 0;
    var e = na.exec(r.split(" ")[1]);
    if (e) {
      var t = e[1];
      if (t === "Z")
        return 0;
      var n = t === "-" ? -1 : 1, i = parseInt(e[2], 10) * 3600 + parseInt(
        e[3] || 0,
        10
      ) * 60 + parseInt(e[4] || 0, 10);
      return i * n * 1e3;
    }
  }
  __name(oa, "oa");
  a(oa, "timeZoneOffset");
  function ci(r) {
    return -(r - 1);
  }
  __name(ci, "ci");
  a(ci, "bcYearToNegativeYear");
  function Kt(r) {
    return r >= 0 && r < 100;
  }
  __name(Kt, "Kt");
  a(
    Kt,
    "is0To99"
  );
});
var pi = I((Ch, fi) => {
  p();
  fi.exports = ua;
  var aa = Object.prototype.hasOwnProperty;
  function ua(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t)
        aa.call(
          t,
          n
        ) && (r[n] = t[n]);
    }
    return r;
  }
  __name(ua, "ua");
  a(ua, "extend");
});
var mi = I((Ph, yi) => {
  "use strict";
  p();
  var ca = pi();
  yi.exports = Fe;
  function Fe(r) {
    if (!(this instanceof Fe))
      return new Fe(r);
    ca(this, xa(r));
  }
  __name(Fe, "Fe");
  a(Fe, "PostgresInterval");
  var ha = ["seconds", "minutes", "hours", "days", "months", "years"];
  Fe.prototype.toPostgres = function() {
    var r = ha.filter(this.hasOwnProperty, this);
    return this.milliseconds && r.indexOf("seconds") < 0 && r.push("seconds"), r.length === 0 ? "0" : r.map(function(e) {
      var t = this[e] || 0;
      return e === "seconds" && this.milliseconds && (t = (t + this.milliseconds / 1e3).toFixed(6).replace(
        /\.?0+$/,
        ""
      )), t + " " + e;
    }, this).join(" ");
  };
  var la = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, fa = ["years", "months", "days"], pa = ["hours", "minutes", "seconds"];
  Fe.prototype.toISOString = Fe.prototype.toISO = function() {
    var r = fa.map(t, this).join(""), e = pa.map(t, this).join("");
    return "P" + r + "T" + e;
    function t(n) {
      var i = this[n] || 0;
      return n === "seconds" && this.milliseconds && (i = (i + this.milliseconds / 1e3).toFixed(6).replace(
        /0+$/,
        ""
      )), i + la[n];
    }
    __name(t, "t");
  };
  var zt = "([+-]?\\d+)", da = zt + "\\s+years?", ya = zt + "\\s+mons?", ma = zt + "\\s+days?", ga = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", wa = new RegExp([
    da,
    ya,
    ma,
    ga
  ].map(function(r) {
    return "(" + r + ")?";
  }).join("\\s*")), di = {
    years: 2,
    months: 4,
    days: 6,
    hours: 9,
    minutes: 10,
    seconds: 11,
    milliseconds: 12
  }, ba = ["hours", "minutes", "seconds", "milliseconds"];
  function Sa(r) {
    var e = r + "000000".slice(r.length);
    return parseInt(
      e,
      10
    ) / 1e3;
  }
  __name(Sa, "Sa");
  a(Sa, "parseMilliseconds");
  function xa(r) {
    if (!r)
      return {};
    var e = wa.exec(
      r
    ), t = e[8] === "-";
    return Object.keys(di).reduce(function(n, i) {
      var s = di[i], o = e[s];
      return !o || (o = i === "milliseconds" ? Sa(o) : parseInt(o, 10), !o) || (t && ~ba.indexOf(i) && (o *= -1), n[i] = o), n;
    }, {});
  }
  __name(xa, "xa");
  a(xa, "parse");
});
var wi = I((Rh, gi) => {
  "use strict";
  p();
  gi.exports = a(function(e) {
    if (/^\\x/.test(e))
      return new y(
        e.substr(2),
        "hex"
      );
    for (var t = "", n = 0; n < e.length; )
      if (e[n] !== "\\")
        t += e[n], ++n;
      else if (/[0-7]{3}/.test(e.substr(n + 1, 3)))
        t += String.fromCharCode(parseInt(e.substr(n + 1, 3), 8)), n += 4;
      else {
        for (var i = 1; n + i < e.length && e[n + i] === "\\"; )
          i++;
        for (var s = 0; s < Math.floor(i / 2); ++s)
          t += "\\";
        n += Math.floor(i / 2) * 2;
      }
    return new y(t, "binary");
  }, "parseBytea");
});
var Ai = I((Dh, _i) => {
  p();
  var Ke = $t(), ze = Vt(), lt = li(), Si = mi(), xi = wi();
  function ft(r) {
    return a(function(t) {
      return t === null ? t : r(t);
    }, "nullAllowed");
  }
  __name(ft, "ft");
  a(ft, "allowNull");
  function Ei(r) {
    return r === null ? r : r === "TRUE" || r === "t" || r === "true" || r === "y" || r === "yes" || r === "on" || r === "1";
  }
  __name(Ei, "Ei");
  a(Ei, "parseBool");
  function Ea(r) {
    return r ? Ke.parse(r, Ei) : null;
  }
  __name(Ea, "Ea");
  a(Ea, "parseBoolArray");
  function va(r) {
    return parseInt(r, 10);
  }
  __name(va, "va");
  a(va, "parseBaseTenInt");
  function Yt(r) {
    return r ? Ke.parse(r, ft(va)) : null;
  }
  __name(Yt, "Yt");
  a(Yt, "parseIntegerArray");
  function _a(r) {
    return r ? Ke.parse(r, ft(function(e) {
      return vi(e).trim();
    })) : null;
  }
  __name(_a, "_a");
  a(_a, "parseBigIntegerArray");
  var Aa = a(function(r) {
    if (!r)
      return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = er(t)), t;
    });
    return e.parse();
  }, "parsePointArray"), Zt = a(function(r) {
    if (!r)
      return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = parseFloat(t)), t;
    });
    return e.parse();
  }, "parseFloatArray"), ne = a(function(r) {
    if (!r)
      return null;
    var e = ze.create(r);
    return e.parse();
  }, "parseStringArray"), Jt = a(function(r) {
    if (!r)
      return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = lt(t)), t;
    });
    return e.parse();
  }, "parseDateArray"), Ca = a(function(r) {
    if (!r)
      return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = Si(t)), t;
    });
    return e.parse();
  }, "parseIntervalArray"), Ta = a(function(r) {
    return r ? Ke.parse(r, ft(xi)) : null;
  }, "parseByteAArray"), Xt = a(function(r) {
    return parseInt(
      r,
      10
    );
  }, "parseInteger"), vi = a(function(r) {
    var e = String(r);
    return /^\d+$/.test(e) ? e : r;
  }, "parseBigInteger"), bi = a(
    function(r) {
      return r ? Ke.parse(r, ft(JSON.parse)) : null;
    },
    "parseJsonArray"
  ), er = a(function(r) {
    return r[0] !== "(" ? null : (r = r.substring(1, r.length - 1).split(","), { x: parseFloat(r[0]), y: parseFloat(r[1]) });
  }, "parsePoint"), Ia = a(function(r) {
    if (r[0] !== "<" && r[1] !== "(")
      return null;
    for (var e = "(", t = "", n = false, i = 2; i < r.length - 1; i++) {
      if (n || (e += r[i]), r[i] === ")") {
        n = true;
        continue;
      } else if (!n)
        continue;
      r[i] !== "," && (t += r[i]);
    }
    var s = er(e);
    return s.radius = parseFloat(t), s;
  }, "parseCircle"), Pa = a(function(r) {
    r(
      20,
      vi
    ), r(21, Xt), r(23, Xt), r(26, Xt), r(700, parseFloat), r(701, parseFloat), r(16, Ei), r(
      1082,
      lt
    ), r(1114, lt), r(1184, lt), r(600, er), r(651, ne), r(718, Ia), r(1e3, Ea), r(1001, Ta), r(
      1005,
      Yt
    ), r(1007, Yt), r(1028, Yt), r(1016, _a), r(1017, Aa), r(1021, Zt), r(1022, Zt), r(1231, Zt), r(1014, ne), r(1015, ne), r(1008, ne), r(1009, ne), r(1040, ne), r(1041, ne), r(1115, Jt), r(
      1182,
      Jt
    ), r(1185, Jt), r(1186, Si), r(1187, Ca), r(17, xi), r(114, JSON.parse.bind(JSON)), r(
      3802,
      JSON.parse.bind(JSON)
    ), r(199, bi), r(3807, bi), r(3907, ne), r(2951, ne), r(791, ne), r(
      1183,
      ne
    ), r(1270, ne);
  }, "init");
  _i.exports = { init: Pa };
});
var Ti = I((Oh, Ci) => {
  "use strict";
  p();
  var Z = 1e6;
  function Ba(r) {
    var e = r.readInt32BE(
      0
    ), t = r.readUInt32BE(4), n = "";
    e < 0 && (e = ~e + (t === 0), t = ~t + 1 >>> 0, n = "-");
    var i = "", s, o, u, c, h, l;
    {
      if (s = e % Z, e = e / Z >>> 0, o = 4294967296 * s + t, t = o / Z >>> 0, u = "" + (o - Z * t), t === 0 && e === 0)
        return n + u + i;
      for (c = "", h = 6 - u.length, l = 0; l < h; l++)
        c += "0";
      i = c + u + i;
    }
    {
      if (s = e % Z, e = e / Z >>> 0, o = 4294967296 * s + t, t = o / Z >>> 0, u = "" + (o - Z * t), t === 0 && e === 0)
        return n + u + i;
      for (c = "", h = 6 - u.length, l = 0; l < h; l++)
        c += "0";
      i = c + u + i;
    }
    {
      if (s = e % Z, e = e / Z >>> 0, o = 4294967296 * s + t, t = o / Z >>> 0, u = "" + (o - Z * t), t === 0 && e === 0)
        return n + u + i;
      for (c = "", h = 6 - u.length, l = 0; l < h; l++)
        c += "0";
      i = c + u + i;
    }
    return s = e % Z, o = 4294967296 * s + t, u = "" + o % Z, n + u + i;
  }
  __name(Ba, "Ba");
  a(Ba, "readInt8");
  Ci.exports = Ba;
});
var Ri = I((Qh, Li) => {
  p();
  var La = Ti(), F = a(function(r, e, t, n, i) {
    t = t || 0, n = n || false, i = i || function(C, B, Q) {
      return C * Math.pow(2, Q) + B;
    };
    var s = t >> 3, o = a(function(C) {
      return n ? ~C & 255 : C;
    }, "inv"), u = 255, c = 8 - t % 8;
    e < c && (u = 255 << 8 - e & 255, c = e), t && (u = u >> t % 8);
    var h = 0;
    t % 8 + e >= 8 && (h = i(0, o(r[s]) & u, c));
    for (var l = e + t >> 3, d = s + 1; d < l; d++)
      h = i(h, o(r[d]), 8);
    var b = (e + t) % 8;
    return b > 0 && (h = i(h, o(r[l]) >> 8 - b, b)), h;
  }, "parseBits"), Bi = a(function(r, e, t) {
    var n = Math.pow(2, t - 1) - 1, i = F(r, 1), s = F(r, t, 1);
    if (s === 0)
      return 0;
    var o = 1, u = a(function(h, l, d) {
      h === 0 && (h = 1);
      for (var b = 1; b <= d; b++)
        o /= 2, (l & 1 << d - b) > 0 && (h += o);
      return h;
    }, "parsePrecisionBits"), c = F(r, e, t + 1, false, u);
    return s == Math.pow(2, t + 1) - 1 ? c === 0 ? i === 0 ? 1 / 0 : -1 / 0 : NaN : (i === 0 ? 1 : -1) * Math.pow(2, s - n) * c;
  }, "parseFloatFromBits"), Ra = a(function(r) {
    return F(r, 1) == 1 ? -1 * (F(r, 15, 1, true) + 1) : F(r, 15, 1);
  }, "parseInt16"), Ii = a(function(r) {
    return F(r, 1) == 1 ? -1 * (F(
      r,
      31,
      1,
      true
    ) + 1) : F(r, 31, 1);
  }, "parseInt32"), Fa = a(function(r) {
    return Bi(r, 23, 8);
  }, "parseFloat32"), Ma = a(function(r) {
    return Bi(r, 52, 11);
  }, "parseFloat64"), Da = a(function(r) {
    var e = F(r, 16, 32);
    if (e == 49152)
      return NaN;
    for (var t = Math.pow(1e4, F(r, 16, 16)), n = 0, i = [], s = F(r, 16), o = 0; o < s; o++)
      n += F(r, 16, 64 + 16 * o) * t, t /= 1e4;
    var u = Math.pow(10, F(r, 16, 48));
    return (e === 0 ? 1 : -1) * Math.round(n * u) / u;
  }, "parseNumeric"), Pi = a(function(r, e) {
    var t = F(
      e,
      1
    ), n = F(e, 63, 1), i = new Date((t === 0 ? 1 : -1) * n / 1e3 + 9466848e5);
    return r || i.setTime(i.getTime() + i.getTimezoneOffset() * 6e4), i.usec = n % 1e3, i.getMicroSeconds = function() {
      return this.usec;
    }, i.setMicroSeconds = function(s) {
      this.usec = s;
    }, i.getUTCMicroSeconds = function() {
      return this.usec;
    }, i;
  }, "parseDate"), Ye = a(function(r) {
    for (var e = F(r, 32), t = F(r, 32, 32), n = F(r, 32, 64), i = 96, s = [], o = 0; o < e; o++)
      s[o] = F(r, 32, i), i += 32, i += 32;
    var u = a(function(h) {
      var l = F(r, 32, i);
      if (i += 32, l == 4294967295)
        return null;
      var d;
      if (h == 23 || h == 20)
        return d = F(r, l * 8, i), i += l * 8, d;
      if (h == 25)
        return d = r.toString(this.encoding, i >> 3, (i += l << 3) >> 3), d;
      console.log("ERROR: ElementType not implemented: " + h);
    }, "parseElement"), c = a(function(h, l) {
      var d = [], b;
      if (h.length > 1) {
        var C = h.shift();
        for (b = 0; b < C; b++)
          d[b] = c(h, l);
        h.unshift(
          C
        );
      } else
        for (b = 0; b < h[0]; b++)
          d[b] = u(l);
      return d;
    }, "parse");
    return c(s, n);
  }, "parseArray"), ka = a(function(r) {
    return r.toString("utf8");
  }, "parseText"), Ua = a(function(r) {
    return r === null ? null : F(r, 8) > 0;
  }, "parseBool"), Oa = a(function(r) {
    r(20, La), r(21, Ra), r(23, Ii), r(
      26,
      Ii
    ), r(1700, Da), r(700, Fa), r(701, Ma), r(16, Ua), r(1114, Pi.bind(null, false)), r(1184, Pi.bind(
      null,
      true
    )), r(1e3, Ye), r(1007, Ye), r(1016, Ye), r(1008, Ye), r(1009, Ye), r(25, ka);
  }, "init");
  Li.exports = { init: Oa };
});
var Mi = I((Hh, Fi) => {
  p();
  Fi.exports = {
    BOOL: 16,
    BYTEA: 17,
    CHAR: 18,
    INT8: 20,
    INT2: 21,
    INT4: 23,
    REGPROC: 24,
    TEXT: 25,
    OID: 26,
    TID: 27,
    XID: 28,
    CID: 29,
    JSON: 114,
    XML: 142,
    PG_NODE_TREE: 194,
    SMGR: 210,
    PATH: 602,
    POLYGON: 604,
    CIDR: 650,
    FLOAT4: 700,
    FLOAT8: 701,
    ABSTIME: 702,
    RELTIME: 703,
    TINTERVAL: 704,
    CIRCLE: 718,
    MACADDR8: 774,
    MONEY: 790,
    MACADDR: 829,
    INET: 869,
    ACLITEM: 1033,
    BPCHAR: 1042,
    VARCHAR: 1043,
    DATE: 1082,
    TIME: 1083,
    TIMESTAMP: 1114,
    TIMESTAMPTZ: 1184,
    INTERVAL: 1186,
    TIMETZ: 1266,
    BIT: 1560,
    VARBIT: 1562,
    NUMERIC: 1700,
    REFCURSOR: 1790,
    REGPROCEDURE: 2202,
    REGOPER: 2203,
    REGOPERATOR: 2204,
    REGCLASS: 2205,
    REGTYPE: 2206,
    UUID: 2950,
    TXID_SNAPSHOT: 2970,
    PG_LSN: 3220,
    PG_NDISTINCT: 3361,
    PG_DEPENDENCIES: 3402,
    TSVECTOR: 3614,
    TSQUERY: 3615,
    GTSVECTOR: 3642,
    REGCONFIG: 3734,
    REGDICTIONARY: 3769,
    JSONB: 3802,
    REGNAMESPACE: 4089,
    REGROLE: 4096
  };
});
var Xe = I((Je) => {
  p();
  var Na = Ai(), qa = Ri(), Qa = Vt(), ja = Mi();
  Je.getTypeParser = Wa;
  Je.setTypeParser = Ha;
  Je.arrayParser = Qa;
  Je.builtins = ja;
  var Ze = { text: {}, binary: {} };
  function Di(r) {
    return String(
      r
    );
  }
  __name(Di, "Di");
  a(Di, "noParse");
  function Wa(r, e) {
    return e = e || "text", Ze[e] && Ze[e][r] || Di;
  }
  __name(Wa, "Wa");
  a(
    Wa,
    "getTypeParser"
  );
  function Ha(r, e, t) {
    typeof e == "function" && (t = e, e = "text"), Ze[e][r] = t;
  }
  __name(Ha, "Ha");
  a(Ha, "setTypeParser");
  Na.init(function(r, e) {
    Ze.text[r] = e;
  });
  qa.init(function(r, e) {
    Ze.binary[r] = e;
  });
});
var et = I((zh, tr) => {
  "use strict";
  p();
  tr.exports = {
    host: "localhost",
    user: m.platform === "win32" ? m.env.USERNAME : m.env.USER,
    database: void 0,
    password: null,
    connectionString: void 0,
    port: 5432,
    rows: 0,
    binary: false,
    max: 10,
    idleTimeoutMillis: 3e4,
    client_encoding: "",
    ssl: false,
    application_name: void 0,
    fallback_application_name: void 0,
    options: void 0,
    parseInputDatesAsUTC: false,
    statement_timeout: false,
    lock_timeout: false,
    idle_in_transaction_session_timeout: false,
    query_timeout: false,
    connect_timeout: 0,
    keepalives: 1,
    keepalives_idle: 0
  };
  var Me = Xe(), Ga = Me.getTypeParser(
    20,
    "text"
  ), $a = Me.getTypeParser(1016, "text");
  tr.exports.__defineSetter__("parseInt8", function(r) {
    Me.setTypeParser(20, "text", r ? Me.getTypeParser(23, "text") : Ga), Me.setTypeParser(1016, "text", r ? Me.getTypeParser(1007, "text") : $a);
  });
});
var tt = I((Zh, Ui) => {
  "use strict";
  p();
  var Va = (Ht(), O(Wt)), Ka = et();
  function za(r) {
    var e = r.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return '"' + e + '"';
  }
  __name(za, "za");
  a(za, "escapeElement");
  function ki(r) {
    for (var e = "{", t = 0; t < r.length; t++)
      t > 0 && (e = e + ","), r[t] === null || typeof r[t] > "u" ? e = e + "NULL" : Array.isArray(r[t]) ? e = e + ki(r[t]) : r[t] instanceof y ? e += "\\\\x" + r[t].toString("hex") : e += za(pt(r[t]));
    return e = e + "}", e;
  }
  __name(ki, "ki");
  a(ki, "arrayString");
  var pt = a(function(r, e) {
    if (r == null)
      return null;
    if (r instanceof y)
      return r;
    if (ArrayBuffer.isView(r)) {
      var t = y.from(r.buffer, r.byteOffset, r.byteLength);
      return t.length === r.byteLength ? t : t.slice(
        r.byteOffset,
        r.byteOffset + r.byteLength
      );
    }
    return r instanceof Date ? Ka.parseInputDatesAsUTC ? Ja(r) : Za(r) : Array.isArray(r) ? ki(r) : typeof r == "object" ? Ya(r, e) : r.toString();
  }, "prepareValue");
  function Ya(r, e) {
    if (r && typeof r.toPostgres == "function") {
      if (e = e || [], e.indexOf(r) !== -1)
        throw new Error('circular reference detected while preparing "' + r + '" for query');
      return e.push(r), pt(r.toPostgres(pt), e);
    }
    return JSON.stringify(r);
  }
  __name(Ya, "Ya");
  a(Ya, "prepareObject");
  function G(r, e) {
    for (r = "" + r; r.length < e; )
      r = "0" + r;
    return r;
  }
  __name(G, "G");
  a(
    G,
    "pad"
  );
  function Za(r) {
    var e = -r.getTimezoneOffset(), t = r.getFullYear(), n = t < 1;
    n && (t = Math.abs(t) + 1);
    var i = G(t, 4) + "-" + G(r.getMonth() + 1, 2) + "-" + G(r.getDate(), 2) + "T" + G(r.getHours(), 2) + ":" + G(r.getMinutes(), 2) + ":" + G(r.getSeconds(), 2) + "." + G(
      r.getMilliseconds(),
      3
    );
    return e < 0 ? (i += "-", e *= -1) : i += "+", i += G(Math.floor(e / 60), 2) + ":" + G(e % 60, 2), n && (i += " BC"), i;
  }
  __name(Za, "Za");
  a(Za, "dateToString");
  function Ja(r) {
    var e = r.getUTCFullYear(), t = e < 1;
    t && (e = Math.abs(e) + 1);
    var n = G(e, 4) + "-" + G(r.getUTCMonth() + 1, 2) + "-" + G(r.getUTCDate(), 2) + "T" + G(r.getUTCHours(), 2) + ":" + G(r.getUTCMinutes(), 2) + ":" + G(r.getUTCSeconds(), 2) + "." + G(r.getUTCMilliseconds(), 3);
    return n += "+00:00", t && (n += " BC"), n;
  }
  __name(Ja, "Ja");
  a(Ja, "dateToStringUTC");
  function Xa(r, e, t) {
    return r = typeof r == "string" ? { text: r } : r, e && (typeof e == "function" ? r.callback = e : r.values = e), t && (r.callback = t), r;
  }
  __name(Xa, "Xa");
  a(Xa, "normalizeQueryConfig");
  var rr = a(function(r) {
    return Va.createHash("md5").update(r, "utf-8").digest("hex");
  }, "md5"), eu = a(function(r, e, t) {
    var n = rr(e + r), i = rr(y.concat([y.from(n), t]));
    return "md5" + i;
  }, "postgresMd5PasswordHash");
  Ui.exports = { prepareValue: a(function(e) {
    return pt(
      e
    );
  }, "prepareValueWrapper"), normalizeQueryConfig: Xa, postgresMd5PasswordHash: eu, md5: rr };
});
var ji = I((el, Qi) => {
  "use strict";
  p();
  var nr = (Ht(), O(Wt));
  function tu(r) {
    if (r.indexOf(
      "SCRAM-SHA-256"
    ) === -1)
      throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    let e = nr.randomBytes(18).toString("base64");
    return { mechanism: "SCRAM-SHA-256", clientNonce: e, response: "n,,n=*,r=" + e, message: "SASLInitialResponse" };
  }
  __name(tu, "tu");
  a(tu, "startSession");
  function ru(r, e, t) {
    if (r.message !== "SASLInitialResponse")
      throw new Error(
        "SASL: Last message was not SASLInitialResponse"
      );
    if (typeof e != "string")
      throw new Error(
        "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
      );
    if (typeof t != "string")
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    let n = su(t);
    if (n.nonce.startsWith(r.clientNonce)) {
      if (n.nonce.length === r.clientNonce.length)
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    var i = y.from(n.salt, "base64"), s = uu(
      e,
      i,
      n.iteration
    ), o = De(s, "Client Key"), u = au(o), c = "n=*,r=" + r.clientNonce, h = "r=" + n.nonce + ",s=" + n.salt + ",i=" + n.iteration, l = "c=biws,r=" + n.nonce, d = c + "," + h + "," + l, b = De(u, d), C = qi(
      o,
      b
    ), B = C.toString("base64"), Q = De(s, "Server Key"), X = De(Q, d);
    r.message = "SASLResponse", r.serverSignature = X.toString("base64"), r.response = l + ",p=" + B;
  }
  __name(ru, "ru");
  a(ru, "continueSession");
  function nu(r, e) {
    if (r.message !== "SASLResponse")
      throw new Error("SASL: Last message was not SASLResponse");
    if (typeof e != "string")
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    let { serverSignature: t } = ou(
      e
    );
    if (t !== r.serverSignature)
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
  __name(nu, "nu");
  a(nu, "finalizeSession");
  function iu(r) {
    if (typeof r != "string")
      throw new TypeError("SASL: text must be a string");
    return r.split("").map(
      (e, t) => r.charCodeAt(t)
    ).every((e) => e >= 33 && e <= 43 || e >= 45 && e <= 126);
  }
  __name(iu, "iu");
  a(iu, "isPrintableChars");
  function Oi(r) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r);
  }
  __name(Oi, "Oi");
  a(Oi, "isBase64");
  function Ni(r) {
    if (typeof r != "string")
      throw new TypeError(
        "SASL: attribute pairs text must be a string"
      );
    return new Map(r.split(",").map((e) => {
      if (!/^.=/.test(e))
        throw new Error("SASL: Invalid attribute pair entry");
      let t = e[0], n = e.substring(2);
      return [t, n];
    }));
  }
  __name(Ni, "Ni");
  a(Ni, "parseAttributePairs");
  function su(r) {
    let e = Ni(
      r
    ), t = e.get("r");
    if (t) {
      if (!iu(t))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    let n = e.get("s");
    if (n) {
      if (!Oi(n))
        throw new Error(
          "SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64"
        );
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    let i = e.get("i");
    if (i) {
      if (!/^[1-9][0-9]*$/.test(i))
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    } else
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    let s = parseInt(i, 10);
    return { nonce: t, salt: n, iteration: s };
  }
  __name(su, "su");
  a(su, "parseServerFirstMessage");
  function ou(r) {
    let t = Ni(r).get("v");
    if (t) {
      if (!Oi(t))
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    } else
      throw new Error(
        "SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing"
      );
    return { serverSignature: t };
  }
  __name(ou, "ou");
  a(ou, "parseServerFinalMessage");
  function qi(r, e) {
    if (!y.isBuffer(r))
      throw new TypeError(
        "first argument must be a Buffer"
      );
    if (!y.isBuffer(e))
      throw new TypeError("second argument must be a Buffer");
    if (r.length !== e.length)
      throw new Error("Buffer lengths must match");
    if (r.length === 0)
      throw new Error("Buffers cannot be empty");
    return y.from(r.map((t, n) => r[n] ^ e[n]));
  }
  __name(qi, "qi");
  a(qi, "xorBuffers");
  function au(r) {
    return nr.createHash(
      "sha256"
    ).update(r).digest();
  }
  __name(au, "au");
  a(au, "sha256");
  function De(r, e) {
    return nr.createHmac(
      "sha256",
      r
    ).update(e).digest();
  }
  __name(De, "De");
  a(De, "hmacSha256");
  function uu(r, e, t) {
    for (var n = De(
      r,
      y.concat([e, y.from([0, 0, 0, 1])])
    ), i = n, s = 0; s < t - 1; s++)
      n = De(r, n), i = qi(i, n);
    return i;
  }
  __name(uu, "uu");
  a(uu, "Hi");
  Qi.exports = { startSession: tu, continueSession: ru, finalizeSession: nu };
});
var ir = {};
se(ir, { join: () => cu });
function cu(...r) {
  return r.join("/");
}
__name(cu, "cu");
var sr = z(() => {
  "use strict";
  p();
  a(cu, "join");
});
var or = {};
se(or, { stat: () => hu });
function hu(r, e) {
  e(new Error("No filesystem"));
}
__name(hu, "hu");
var ar = z(
  () => {
    "use strict";
    p();
    a(hu, "stat");
  }
);
var ur = {};
se(ur, { default: () => lu });
var lu;
var cr = z(() => {
  "use strict";
  p();
  lu = {};
});
var Wi = {};
se(Wi, { StringDecoder: () => hr });
var lr;
var hr;
var Hi = z(() => {
  "use strict";
  p();
  lr = /* @__PURE__ */ __name(class lr {
    constructor(e) {
      _(this, "td");
      this.td = new TextDecoder(e);
    }
    write(e) {
      return this.td.decode(e, { stream: true });
    }
    end(e) {
      return this.td.decode(e);
    }
  }, "lr");
  a(lr, "StringDecoder");
  hr = lr;
});
var Ki = I((hl, Vi) => {
  "use strict";
  p();
  var { Transform: fu } = (cr(), O(ur)), { StringDecoder: pu } = (Hi(), O(Wi)), we = Symbol("last"), dt = Symbol("decoder");
  function du(r, e, t) {
    let n;
    if (this.overflow) {
      if (n = this[dt].write(r).split(this.matcher), n.length === 1)
        return t();
      n.shift(), this.overflow = false;
    } else
      this[we] += this[dt].write(r), n = this[we].split(this.matcher);
    this[we] = n.pop();
    for (let i = 0; i < n.length; i++)
      try {
        $i(this, this.mapper(n[i]));
      } catch (s) {
        return t(
          s
        );
      }
    if (this.overflow = this[we].length > this.maxLength, this.overflow && !this.skipOverflow) {
      t(new Error("maximum buffer reached"));
      return;
    }
    t();
  }
  __name(du, "du");
  a(du, "transform");
  function yu(r) {
    if (this[we] += this[dt].end(), this[we])
      try {
        $i(this, this.mapper(this[we]));
      } catch (e) {
        return r(e);
      }
    r();
  }
  __name(yu, "yu");
  a(yu, "flush");
  function $i(r, e) {
    e !== void 0 && r.push(e);
  }
  __name($i, "$i");
  a($i, "push");
  function Gi(r) {
    return r;
  }
  __name(Gi, "Gi");
  a(Gi, "noop");
  function mu(r, e, t) {
    switch (r = r || /\r?\n/, e = e || Gi, t = t || {}, arguments.length) {
      case 1:
        typeof r == "function" ? (e = r, r = /\r?\n/) : typeof r == "object" && !(r instanceof RegExp) && !r[Symbol.split] && (t = r, r = /\r?\n/);
        break;
      case 2:
        typeof r == "function" ? (t = e, e = r, r = /\r?\n/) : typeof e == "object" && (t = e, e = Gi);
    }
    t = Object.assign({}, t), t.autoDestroy = true, t.transform = du, t.flush = yu, t.readableObjectMode = true;
    let n = new fu(t);
    return n[we] = "", n[dt] = new pu("utf8"), n.matcher = r, n.mapper = e, n.maxLength = t.maxLength, n.skipOverflow = t.skipOverflow || false, n.overflow = false, n._destroy = function(i, s) {
      this._writableState.errorEmitted = false, s(i);
    }, n;
  }
  __name(mu, "mu");
  a(mu, "split");
  Vi.exports = mu;
});
var Zi = I((pl, fe) => {
  "use strict";
  p();
  var zi = (sr(), O(ir)), gu = (cr(), O(ur)).Stream, wu = Ki(), Yi = (Ge(), O(He)), bu = 5432, yt = m.platform === "win32", rt = m.stderr, Su = 56, xu = 7, Eu = 61440, vu = 32768;
  function _u(r) {
    return (r & Eu) == vu;
  }
  __name(_u, "_u");
  a(_u, "isRegFile");
  var ke = [
    "host",
    "port",
    "database",
    "user",
    "password"
  ], fr = ke.length, Au = ke[fr - 1];
  function pr() {
    var r = rt instanceof gu && rt.writable === true;
    if (r) {
      var e = Array.prototype.slice.call(arguments).concat(`
`);
      rt.write(Yi.format.apply(Yi, e));
    }
  }
  __name(pr, "pr");
  a(pr, "warn");
  Object.defineProperty(
    fe.exports,
    "isWin",
    { get: a(function() {
      return yt;
    }, "get"), set: a(function(r) {
      yt = r;
    }, "set") }
  );
  fe.exports.warnTo = function(r) {
    var e = rt;
    return rt = r, e;
  };
  fe.exports.getFileName = function(r) {
    var e = r || m.env, t = e.PGPASSFILE || (yt ? zi.join(e.APPDATA || "./", "postgresql", "pgpass.conf") : zi.join(e.HOME || "./", ".pgpass"));
    return t;
  };
  fe.exports.usePgPass = function(r, e) {
    return Object.prototype.hasOwnProperty.call(m.env, "PGPASSWORD") ? false : yt ? true : (e = e || "<unkn>", _u(r.mode) ? r.mode & (Su | xu) ? (pr('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', e), false) : true : (pr('WARNING: password file "%s" is not a plain file', e), false));
  };
  var Cu = fe.exports.match = function(r, e) {
    return ke.slice(0, -1).reduce(function(t, n, i) {
      return i == 1 && Number(r[n] || bu) === Number(
        e[n]
      ) ? t && true : t && (e[n] === "*" || e[n] === r[n]);
    }, true);
  };
  fe.exports.getPassword = function(r, e, t) {
    var n, i = e.pipe(wu());
    function s(c) {
      var h = Tu(c);
      h && Iu(h) && Cu(r, h) && (n = h[Au], i.end());
    }
    __name(s, "s");
    a(s, "onLine");
    var o = a(function() {
      e.destroy(), t(n);
    }, "onEnd"), u = a(function(c) {
      e.destroy(), pr("WARNING: error on reading file: %s", c), t(void 0);
    }, "onErr");
    e.on("error", u), i.on("data", s).on("end", o).on("error", u);
  };
  var Tu = fe.exports.parseLine = function(r) {
    if (r.length < 11 || r.match(/^\s+#/))
      return null;
    for (var e = "", t = "", n = 0, i = 0, s = 0, o = {}, u = false, c = a(function(l, d, b) {
      var C = r.substring(d, b);
      Object.hasOwnProperty.call(
        m.env,
        "PGPASS_NO_DEESCAPE"
      ) || (C = C.replace(/\\([:\\])/g, "$1")), o[ke[l]] = C;
    }, "addToObj"), h = 0; h < r.length - 1; h += 1) {
      if (e = r.charAt(h + 1), t = r.charAt(h), u = n == fr - 1, u) {
        c(n, i);
        break;
      }
      h >= 0 && e == ":" && t !== "\\" && (c(n, i, h + 1), i = h + 2, n += 1);
    }
    return o = Object.keys(o).length === fr ? o : null, o;
  }, Iu = fe.exports.isValidEntry = function(r) {
    for (var e = { 0: function(o) {
      return o.length > 0;
    }, 1: function(o) {
      return o === "*" ? true : (o = Number(o), isFinite(o) && o > 0 && o < 9007199254740992 && Math.floor(o) === o);
    }, 2: function(o) {
      return o.length > 0;
    }, 3: function(o) {
      return o.length > 0;
    }, 4: function(o) {
      return o.length > 0;
    } }, t = 0; t < ke.length; t += 1) {
      var n = e[t], i = r[ke[t]] || "", s = n(i);
      if (!s)
        return false;
    }
    return true;
  };
});
var Xi = I((gl, dr) => {
  "use strict";
  p();
  var ml = (sr(), O(ir)), Ji = (ar(), O(or)), mt = Zi();
  dr.exports = function(r, e) {
    var t = mt.getFileName();
    Ji.stat(t, function(n, i) {
      if (n || !mt.usePgPass(i, t))
        return e(void 0);
      var s = Ji.createReadStream(t);
      mt.getPassword(
        r,
        s,
        e
      );
    });
  };
  dr.exports.warnTo = mt.warnTo;
});
var wt = I((bl, es) => {
  "use strict";
  p();
  var Pu = Xe();
  function gt(r) {
    this._types = r || Pu, this.text = {}, this.binary = {};
  }
  __name(gt, "gt");
  a(gt, "TypeOverrides");
  gt.prototype.getOverrides = function(r) {
    switch (r) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  };
  gt.prototype.setTypeParser = function(r, e, t) {
    typeof e == "function" && (t = e, e = "text"), this.getOverrides(e)[r] = t;
  };
  gt.prototype.getTypeParser = function(r, e) {
    return e = e || "text", this.getOverrides(e)[r] || this._types.getTypeParser(r, e);
  };
  es.exports = gt;
});
var ts = {};
se(ts, { default: () => Bu });
var Bu;
var rs = z(() => {
  "use strict";
  p();
  Bu = {};
});
var ns = {};
se(ns, { parse: () => yr });
function yr(r, e = false) {
  let { protocol: t } = new URL(r), n = "http:" + r.substring(t.length), {
    username: i,
    password: s,
    host: o,
    hostname: u,
    port: c,
    pathname: h,
    search: l,
    searchParams: d,
    hash: b
  } = new URL(n);
  s = decodeURIComponent(s), i = decodeURIComponent(
    i
  ), h = decodeURIComponent(h);
  let C = i + ":" + s, B = e ? Object.fromEntries(d.entries()) : l;
  return {
    href: r,
    protocol: t,
    auth: C,
    username: i,
    password: s,
    host: o,
    hostname: u,
    port: c,
    pathname: h,
    search: l,
    query: B,
    hash: b
  };
}
__name(yr, "yr");
var mr = z(() => {
  "use strict";
  p();
  a(yr, "parse");
});
var ss = I((Al, is) => {
  "use strict";
  p();
  var Lu = (mr(), O(ns)), gr = (ar(), O(or));
  function wr(r) {
    if (r.charAt(0) === "/") {
      var t = r.split(" ");
      return { host: t[0], database: t[1] };
    }
    var e = Lu.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) ? encodeURI(r).replace(
      /\%25(\d\d)/g,
      "%$1"
    ) : r, true), t = e.query;
    for (var n in t)
      Array.isArray(t[n]) && (t[n] = t[n][t[n].length - 1]);
    var i = (e.auth || ":").split(":");
    if (t.user = i[0], t.password = i.splice(1).join(":"), t.port = e.port, e.protocol == "socket:")
      return t.host = decodeURI(e.pathname), t.database = e.query.db, t.client_encoding = e.query.encoding, t;
    t.host || (t.host = e.hostname);
    var s = e.pathname;
    if (!t.host && s && /^%2f/i.test(s)) {
      var o = s.split("/");
      t.host = decodeURIComponent(
        o[0]
      ), s = o.splice(1).join("/");
    }
    switch (s && s.charAt(0) === "/" && (s = s.slice(1) || null), t.database = s && decodeURI(s), (t.ssl === "true" || t.ssl === "1") && (t.ssl = true), t.ssl === "0" && (t.ssl = false), (t.sslcert || t.sslkey || t.sslrootcert || t.sslmode) && (t.ssl = {}), t.sslcert && (t.ssl.cert = gr.readFileSync(t.sslcert).toString()), t.sslkey && (t.ssl.key = gr.readFileSync(
      t.sslkey
    ).toString()), t.sslrootcert && (t.ssl.ca = gr.readFileSync(t.sslrootcert).toString()), t.sslmode) {
      case "disable": {
        t.ssl = false;
        break;
      }
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        break;
      case "no-verify": {
        t.ssl.rejectUnauthorized = false;
        break;
      }
    }
    return t;
  }
  __name(wr, "wr");
  a(wr, "parse");
  is.exports = wr;
  wr.parse = wr;
});
var bt = I((Il, us) => {
  "use strict";
  p();
  var Ru = (rs(), O(ts)), as = et(), os = ss().parse, V = a(
    function(r, e, t) {
      return t === void 0 ? t = m.env["PG" + r.toUpperCase()] : t === false || (t = m.env[t]), e[r] || t || as[r];
    },
    "val"
  ), Fu = a(function() {
    switch (m.env.PGSSLMODE) {
      case "disable":
        return false;
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        return true;
      case "no-verify":
        return { rejectUnauthorized: false };
    }
    return as.ssl;
  }, "readSSLConfigFromEnvironment"), Ue = a(
    function(r) {
      return "'" + ("" + r).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    },
    "quoteParamValue"
  ), ie = a(function(r, e, t) {
    var n = e[t];
    n != null && r.push(t + "=" + Ue(n));
  }, "add"), Sr = /* @__PURE__ */ __name(class Sr {
    constructor(e) {
      e = typeof e == "string" ? os(e) : e || {}, e.connectionString && (e = Object.assign({}, e, os(e.connectionString))), this.user = V("user", e), this.database = V("database", e), this.database === void 0 && (this.database = this.user), this.port = parseInt(
        V("port", e),
        10
      ), this.host = V("host", e), Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: V("password", e)
      }), this.binary = V("binary", e), this.options = V("options", e), this.ssl = typeof e.ssl > "u" ? Fu() : e.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = true), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = V("client_encoding", e), this.replication = V("replication", e), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = V("application_name", e, "PGAPPNAME"), this.fallback_application_name = V("fallback_application_name", e, false), this.statement_timeout = V("statement_timeout", e, false), this.lock_timeout = V(
        "lock_timeout",
        e,
        false
      ), this.idle_in_transaction_session_timeout = V("idle_in_transaction_session_timeout", e, false), this.query_timeout = V("query_timeout", e, false), e.connectionTimeoutMillis === void 0 ? this.connect_timeout = m.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e.connectionTimeoutMillis / 1e3), e.keepAlive === false ? this.keepalives = 0 : e.keepAlive === true && (this.keepalives = 1), typeof e.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(e.keepAliveInitialDelayMillis / 1e3));
    }
    getLibpqConnectionString(e) {
      var t = [];
      ie(t, this, "user"), ie(t, this, "password"), ie(t, this, "port"), ie(t, this, "application_name"), ie(t, this, "fallback_application_name"), ie(t, this, "connect_timeout"), ie(
        t,
        this,
        "options"
      );
      var n = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      if (ie(t, n, "sslmode"), ie(t, n, "sslca"), ie(t, n, "sslkey"), ie(t, n, "sslcert"), ie(t, n, "sslrootcert"), this.database && t.push("dbname=" + Ue(this.database)), this.replication && t.push("replication=" + Ue(this.replication)), this.host && t.push("host=" + Ue(this.host)), this.isDomainSocket)
        return e(null, t.join(" "));
      this.client_encoding && t.push("client_encoding=" + Ue(this.client_encoding)), Ru.lookup(this.host, function(i, s) {
        return i ? e(i, null) : (t.push("hostaddr=" + Ue(s)), e(null, t.join(" ")));
      });
    }
  }, "Sr");
  a(Sr, "ConnectionParameters");
  var br = Sr;
  us.exports = br;
});
var ls = I((Ll, hs) => {
  "use strict";
  p();
  var Mu = Xe(), cs = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, Er = /* @__PURE__ */ __name(class Er {
    constructor(e, t) {
      this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t, this.RowCtor = null, this.rowAsArray = e === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
    }
    addCommandComplete(e) {
      var t;
      e.text ? t = cs.exec(e.text) : t = cs.exec(e.command), t && (this.command = t[1], t[3] ? (this.oid = parseInt(t[2], 10), this.rowCount = parseInt(t[3], 10)) : t[2] && (this.rowCount = parseInt(
        t[2],
        10
      )));
    }
    _parseRowAsArray(e) {
      for (var t = new Array(e.length), n = 0, i = e.length; n < i; n++) {
        var s = e[n];
        s !== null ? t[n] = this._parsers[n](s) : t[n] = null;
      }
      return t;
    }
    parseRow(e) {
      for (var t = {}, n = 0, i = e.length; n < i; n++) {
        var s = e[n], o = this.fields[n].name;
        s !== null ? t[o] = this._parsers[n](
          s
        ) : t[o] = null;
      }
      return t;
    }
    addRow(e) {
      this.rows.push(e);
    }
    addFields(e) {
      this.fields = e, this.fields.length && (this._parsers = new Array(e.length));
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        this._types ? this._parsers[t] = this._types.getTypeParser(n.dataTypeID, n.format || "text") : this._parsers[t] = Mu.getTypeParser(n.dataTypeID, n.format || "text");
      }
    }
  }, "Er");
  a(Er, "Result");
  var xr = Er;
  hs.exports = xr;
});
var ys = I((Ml, ds) => {
  "use strict";
  p();
  var { EventEmitter: Du } = ge(), fs = ls(), ps = tt(), _r = /* @__PURE__ */ __name(class _r extends Du {
    constructor(e, t, n) {
      super(), e = ps.normalizeQueryConfig(e, t, n), this.text = e.text, this.values = e.values, this.rows = e.rows, this.types = e.types, this.name = e.name, this.binary = e.binary, this.portal = e.portal || "", this.callback = e.callback, this._rowMode = e.rowMode, m.domain && e.callback && (this.callback = m.domain.bind(e.callback)), this._result = new fs(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = false, this._canceledDueToError = false, this._promise = null;
    }
    requiresPreparation() {
      return this.name || this.rows ? true : !this.text || !this.values ? false : this.values.length > 0;
    }
    _checkForMultirow() {
      this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new fs(
        this._rowMode,
        this.types
      ), this._results.push(this._result));
    }
    handleRowDescription(e) {
      this._checkForMultirow(), this._result.addFields(e.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(e) {
      let t;
      if (!this._canceledDueToError) {
        try {
          t = this._result.parseRow(e.fields);
        } catch (n) {
          this._canceledDueToError = n;
          return;
        }
        this.emit("row", t, this._result), this._accumulateRows && this._result.addRow(t);
      }
    }
    handleCommandComplete(e, t) {
      this._checkForMultirow(), this._result.addCommandComplete(e), this.rows && t.sync();
    }
    handleEmptyQuery(e) {
      this.rows && e.sync();
    }
    handleError(e, t) {
      if (this._canceledDueToError && (e = this._canceledDueToError, this._canceledDueToError = false), this.callback)
        return this.callback(e);
      this.emit("error", e);
    }
    handleReadyForQuery(e) {
      if (this._canceledDueToError)
        return this.handleError(
          this._canceledDueToError,
          e
        );
      if (this.callback)
        try {
          this.callback(null, this._results);
        } catch (t) {
          m.nextTick(() => {
            throw t;
          });
        }
      this.emit("end", this._results);
    }
    submit(e) {
      if (typeof this.text != "string" && typeof this.name != "string")
        return new Error("A query must have either text or a name. Supplying neither is unsupported.");
      let t = e.parsedStatements[this.name];
      return this.text && t && this.text !== t ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(e) : e.query(this.text), null);
    }
    hasBeenParsed(e) {
      return this.name && e.parsedStatements[this.name];
    }
    handlePortalSuspended(e) {
      this._getRows(e, this.rows);
    }
    _getRows(e, t) {
      e.execute(
        { portal: this.portal, rows: t }
      ), t ? e.flush() : e.sync();
    }
    prepare(e) {
      this.isPreparedStatement = true, this.hasBeenParsed(e) || e.parse({ text: this.text, name: this.name, types: this.types });
      try {
        e.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: ps.prepareValue });
      } catch (t) {
        this.handleError(t, e);
        return;
      }
      e.describe(
        { type: "P", name: this.portal || "" }
      ), this._getRows(e, this.rows);
    }
    handleCopyInResponse(e) {
      e.sendCopyFail("No source stream defined");
    }
    handleCopyData(e, t) {
    }
  }, "_r");
  a(_r, "Query");
  var vr = _r;
  ds.exports = vr;
});
var ws = {};
se(ws, { Socket: () => _e, isIP: () => ku });
function ku(r) {
  return 0;
}
__name(ku, "ku");
var gs;
var ms;
var v;
var _e;
var St = z(() => {
  "use strict";
  p();
  gs = Te(ge(), 1);
  a(ku, "isIP");
  ms = /^[^.]+\./, v = /* @__PURE__ */ __name(class v2 extends gs.EventEmitter {
    constructor() {
      super(...arguments);
      _(this, "opts", {});
      _(this, "connecting", false);
      _(this, "pending", true);
      _(this, "writable", true);
      _(this, "encrypted", false);
      _(this, "authorized", false);
      _(this, "destroyed", false);
      _(this, "ws", null);
      _(this, "writeBuffer");
      _(this, "tlsState", 0);
      _(
        this,
        "tlsRead"
      );
      _(this, "tlsWrite");
    }
    static get poolQueryViaFetch() {
      return v2.opts.poolQueryViaFetch ?? v2.defaults.poolQueryViaFetch;
    }
    static set poolQueryViaFetch(t) {
      v2.opts.poolQueryViaFetch = t;
    }
    static get fetchEndpoint() {
      return v2.opts.fetchEndpoint ?? v2.defaults.fetchEndpoint;
    }
    static set fetchEndpoint(t) {
      v2.opts.fetchEndpoint = t;
    }
    static get fetchConnectionCache() {
      return true;
    }
    static set fetchConnectionCache(t) {
      console.warn("The `fetchConnectionCache` option is deprecated (now always `true`)");
    }
    static get fetchFunction() {
      return v2.opts.fetchFunction ?? v2.defaults.fetchFunction;
    }
    static set fetchFunction(t) {
      v2.opts.fetchFunction = t;
    }
    static get webSocketConstructor() {
      return v2.opts.webSocketConstructor ?? v2.defaults.webSocketConstructor;
    }
    static set webSocketConstructor(t) {
      v2.opts.webSocketConstructor = t;
    }
    get webSocketConstructor() {
      return this.opts.webSocketConstructor ?? v2.webSocketConstructor;
    }
    set webSocketConstructor(t) {
      this.opts.webSocketConstructor = t;
    }
    static get wsProxy() {
      return v2.opts.wsProxy ?? v2.defaults.wsProxy;
    }
    static set wsProxy(t) {
      v2.opts.wsProxy = t;
    }
    get wsProxy() {
      return this.opts.wsProxy ?? v2.wsProxy;
    }
    set wsProxy(t) {
      this.opts.wsProxy = t;
    }
    static get coalesceWrites() {
      return v2.opts.coalesceWrites ?? v2.defaults.coalesceWrites;
    }
    static set coalesceWrites(t) {
      v2.opts.coalesceWrites = t;
    }
    get coalesceWrites() {
      return this.opts.coalesceWrites ?? v2.coalesceWrites;
    }
    set coalesceWrites(t) {
      this.opts.coalesceWrites = t;
    }
    static get useSecureWebSocket() {
      return v2.opts.useSecureWebSocket ?? v2.defaults.useSecureWebSocket;
    }
    static set useSecureWebSocket(t) {
      v2.opts.useSecureWebSocket = t;
    }
    get useSecureWebSocket() {
      return this.opts.useSecureWebSocket ?? v2.useSecureWebSocket;
    }
    set useSecureWebSocket(t) {
      this.opts.useSecureWebSocket = t;
    }
    static get forceDisablePgSSL() {
      return v2.opts.forceDisablePgSSL ?? v2.defaults.forceDisablePgSSL;
    }
    static set forceDisablePgSSL(t) {
      v2.opts.forceDisablePgSSL = t;
    }
    get forceDisablePgSSL() {
      return this.opts.forceDisablePgSSL ?? v2.forceDisablePgSSL;
    }
    set forceDisablePgSSL(t) {
      this.opts.forceDisablePgSSL = t;
    }
    static get disableSNI() {
      return v2.opts.disableSNI ?? v2.defaults.disableSNI;
    }
    static set disableSNI(t) {
      v2.opts.disableSNI = t;
    }
    get disableSNI() {
      return this.opts.disableSNI ?? v2.disableSNI;
    }
    set disableSNI(t) {
      this.opts.disableSNI = t;
    }
    static get pipelineConnect() {
      return v2.opts.pipelineConnect ?? v2.defaults.pipelineConnect;
    }
    static set pipelineConnect(t) {
      v2.opts.pipelineConnect = t;
    }
    get pipelineConnect() {
      return this.opts.pipelineConnect ?? v2.pipelineConnect;
    }
    set pipelineConnect(t) {
      this.opts.pipelineConnect = t;
    }
    static get subtls() {
      return v2.opts.subtls ?? v2.defaults.subtls;
    }
    static set subtls(t) {
      v2.opts.subtls = t;
    }
    get subtls() {
      return this.opts.subtls ?? v2.subtls;
    }
    set subtls(t) {
      this.opts.subtls = t;
    }
    static get pipelineTLS() {
      return v2.opts.pipelineTLS ?? v2.defaults.pipelineTLS;
    }
    static set pipelineTLS(t) {
      v2.opts.pipelineTLS = t;
    }
    get pipelineTLS() {
      return this.opts.pipelineTLS ?? v2.pipelineTLS;
    }
    set pipelineTLS(t) {
      this.opts.pipelineTLS = t;
    }
    static get rootCerts() {
      return v2.opts.rootCerts ?? v2.defaults.rootCerts;
    }
    static set rootCerts(t) {
      v2.opts.rootCerts = t;
    }
    get rootCerts() {
      return this.opts.rootCerts ?? v2.rootCerts;
    }
    set rootCerts(t) {
      this.opts.rootCerts = t;
    }
    wsProxyAddrForHost(t, n) {
      let i = this.wsProxy;
      if (i === void 0)
        throw new Error("No WebSocket proxy is configured. Please see https://github.com/neondatabase/serverless/blob/main/CONFIG.md#wsproxy-string--host-string-port-number--string--string");
      return typeof i == "function" ? i(t, n) : `${i}?address=${t}:${n}`;
    }
    setNoDelay() {
      return this;
    }
    setKeepAlive() {
      return this;
    }
    ref() {
      return this;
    }
    unref() {
      return this;
    }
    connect(t, n, i) {
      this.connecting = true, i && this.once("connect", i);
      let s = a(() => {
        this.connecting = false, this.pending = false, this.emit("connect"), this.emit("ready");
      }, "handleWebSocketOpen"), o = a((c, h = false) => {
        c.binaryType = "arraybuffer", c.addEventListener("error", (l) => {
          this.emit("error", l), this.emit("close");
        }), c.addEventListener("message", (l) => {
          if (this.tlsState === 0) {
            let d = y.from(l.data);
            this.emit(
              "data",
              d
            );
          }
        }), c.addEventListener("close", () => {
          this.emit("close");
        }), h ? s() : c.addEventListener(
          "open",
          s
        );
      }, "configureWebSocket"), u;
      try {
        u = this.wsProxyAddrForHost(n, typeof t == "string" ? parseInt(t, 10) : t);
      } catch (c) {
        this.emit("error", c), this.emit("close");
        return;
      }
      try {
        let h = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + u;
        if (this.webSocketConstructor !== void 0)
          this.ws = new this.webSocketConstructor(h), o(this.ws);
        else
          try {
            this.ws = new WebSocket(
              h
            ), o(this.ws);
          } catch {
            this.ws = new __unstable_WebSocket(h), o(this.ws);
          }
      } catch (c) {
        let l = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u;
        fetch(l, { headers: { Upgrade: "websocket" } }).then((d) => {
          if (this.ws = d.webSocket, this.ws == null)
            throw c;
          this.ws.accept(), o(
            this.ws,
            true
          );
        }).catch((d) => {
          this.emit("error", new Error(`All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined. Details: ${d.message}`)), this.emit("close");
        });
      }
    }
    async startTls(t) {
      if (this.subtls === void 0)
        throw new Error("For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information.");
      this.tlsState = 1;
      let n = this.subtls.TrustedCert.fromPEM(this.rootCerts), i = new this.subtls.WebSocketReadQueue(this.ws), s = i.read.bind(
        i
      ), o = this.rawWrite.bind(this), [u, c] = await this.subtls.startTls(t, n, s, o, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
      this.tlsRead = u, this.tlsWrite = c, this.tlsState = 2, this.encrypted = true, this.authorized = true, this.emit(
        "secureConnection",
        this
      ), this.tlsReadLoop();
    }
    async tlsReadLoop() {
      for (; ; ) {
        let t = await this.tlsRead();
        if (t === void 0)
          break;
        {
          let n = y.from(t);
          this.emit("data", n);
        }
      }
    }
    rawWrite(t) {
      if (!this.coalesceWrites) {
        this.ws.send(t);
        return;
      }
      if (this.writeBuffer === void 0)
        this.writeBuffer = t, setTimeout(
          () => {
            this.ws.send(this.writeBuffer), this.writeBuffer = void 0;
          },
          0
        );
      else {
        let n = new Uint8Array(this.writeBuffer.length + t.length);
        n.set(this.writeBuffer), n.set(t, this.writeBuffer.length), this.writeBuffer = n;
      }
    }
    write(t, n = "utf8", i = (s) => {
    }) {
      return t.length === 0 ? (i(), true) : (typeof t == "string" && (t = y.from(t, n)), this.tlsState === 0 ? (this.rawWrite(t), i()) : this.tlsState === 1 ? this.once("secureConnection", () => {
        this.write(
          t,
          n,
          i
        );
      }) : (this.tlsWrite(t), i()), true);
    }
    end(t = y.alloc(0), n = "utf8", i = () => {
    }) {
      return this.write(t, n, () => {
        this.ws.close(), i();
      }), this;
    }
    destroy() {
      return this.destroyed = true, this.end();
    }
  }, "v");
  a(v, "Socket"), _(v, "defaults", {
    poolQueryViaFetch: false,
    fetchEndpoint: a((t, n, i) => {
      let s;
      return i?.jwtAuth ? s = t.replace(ms, "apiauth.") : s = t.replace(ms, "api."), "https://" + s + "/sql";
    }, "fetchEndpoint"),
    fetchConnectionCache: true,
    fetchFunction: void 0,
    webSocketConstructor: void 0,
    wsProxy: a((t) => t + "/v2", "wsProxy"),
    useSecureWebSocket: true,
    forceDisablePgSSL: true,
    coalesceWrites: true,
    pipelineConnect: "password",
    subtls: void 0,
    rootCerts: "",
    pipelineTLS: false,
    disableSNI: false
  }), _(v, "opts", {});
  _e = v;
});
var Xr = I((T) => {
  "use strict";
  p();
  Object.defineProperty(T, "__esModule", { value: true });
  T.NoticeMessage = T.DataRowMessage = T.CommandCompleteMessage = T.ReadyForQueryMessage = T.NotificationResponseMessage = T.BackendKeyDataMessage = T.AuthenticationMD5Password = T.ParameterStatusMessage = T.ParameterDescriptionMessage = T.RowDescriptionMessage = T.Field = T.CopyResponse = T.CopyDataMessage = T.DatabaseError = T.copyDone = T.emptyQuery = T.replicationStart = T.portalSuspended = T.noData = T.closeComplete = T.bindComplete = T.parseComplete = void 0;
  T.parseComplete = { name: "parseComplete", length: 5 };
  T.bindComplete = { name: "bindComplete", length: 5 };
  T.closeComplete = { name: "closeComplete", length: 5 };
  T.noData = { name: "noData", length: 5 };
  T.portalSuspended = { name: "portalSuspended", length: 5 };
  T.replicationStart = { name: "replicationStart", length: 4 };
  T.emptyQuery = { name: "emptyQuery", length: 4 };
  T.copyDone = { name: "copyDone", length: 4 };
  var Nr = /* @__PURE__ */ __name(class Nr extends Error {
    constructor(e, t, n) {
      super(
        e
      ), this.length = t, this.name = n;
    }
  }, "Nr");
  a(Nr, "DatabaseError");
  var Ar = Nr;
  T.DatabaseError = Ar;
  var qr = /* @__PURE__ */ __name(class qr {
    constructor(e, t) {
      this.length = e, this.chunk = t, this.name = "copyData";
    }
  }, "qr");
  a(qr, "CopyDataMessage");
  var Cr = qr;
  T.CopyDataMessage = Cr;
  var Qr = /* @__PURE__ */ __name(class Qr {
    constructor(e, t, n, i) {
      this.length = e, this.name = t, this.binary = n, this.columnTypes = new Array(i);
    }
  }, "Qr");
  a(Qr, "CopyResponse");
  var Tr = Qr;
  T.CopyResponse = Tr;
  var jr = /* @__PURE__ */ __name(class jr {
    constructor(e, t, n, i, s, o, u) {
      this.name = e, this.tableID = t, this.columnID = n, this.dataTypeID = i, this.dataTypeSize = s, this.dataTypeModifier = o, this.format = u;
    }
  }, "jr");
  a(jr, "Field");
  var Ir = jr;
  T.Field = Ir;
  var Wr = /* @__PURE__ */ __name(class Wr {
    constructor(e, t) {
      this.length = e, this.fieldCount = t, this.name = "rowDescription", this.fields = new Array(
        this.fieldCount
      );
    }
  }, "Wr");
  a(Wr, "RowDescriptionMessage");
  var Pr = Wr;
  T.RowDescriptionMessage = Pr;
  var Hr = /* @__PURE__ */ __name(class Hr {
    constructor(e, t) {
      this.length = e, this.parameterCount = t, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
    }
  }, "Hr");
  a(Hr, "ParameterDescriptionMessage");
  var Br = Hr;
  T.ParameterDescriptionMessage = Br;
  var Gr = /* @__PURE__ */ __name(class Gr {
    constructor(e, t, n) {
      this.length = e, this.parameterName = t, this.parameterValue = n, this.name = "parameterStatus";
    }
  }, "Gr");
  a(Gr, "ParameterStatusMessage");
  var Lr = Gr;
  T.ParameterStatusMessage = Lr;
  var $r = /* @__PURE__ */ __name(class $r {
    constructor(e, t) {
      this.length = e, this.salt = t, this.name = "authenticationMD5Password";
    }
  }, "$r");
  a($r, "AuthenticationMD5Password");
  var Rr = $r;
  T.AuthenticationMD5Password = Rr;
  var Vr = /* @__PURE__ */ __name(class Vr {
    constructor(e, t, n) {
      this.length = e, this.processID = t, this.secretKey = n, this.name = "backendKeyData";
    }
  }, "Vr");
  a(
    Vr,
    "BackendKeyDataMessage"
  );
  var Fr = Vr;
  T.BackendKeyDataMessage = Fr;
  var Kr = /* @__PURE__ */ __name(class Kr {
    constructor(e, t, n, i) {
      this.length = e, this.processId = t, this.channel = n, this.payload = i, this.name = "notification";
    }
  }, "Kr");
  a(Kr, "NotificationResponseMessage");
  var Mr = Kr;
  T.NotificationResponseMessage = Mr;
  var zr = /* @__PURE__ */ __name(class zr {
    constructor(e, t) {
      this.length = e, this.status = t, this.name = "readyForQuery";
    }
  }, "zr");
  a(zr, "ReadyForQueryMessage");
  var Dr = zr;
  T.ReadyForQueryMessage = Dr;
  var Yr = /* @__PURE__ */ __name(class Yr {
    constructor(e, t) {
      this.length = e, this.text = t, this.name = "commandComplete";
    }
  }, "Yr");
  a(Yr, "CommandCompleteMessage");
  var kr = Yr;
  T.CommandCompleteMessage = kr;
  var Zr = /* @__PURE__ */ __name(class Zr {
    constructor(e, t) {
      this.length = e, this.fields = t, this.name = "dataRow", this.fieldCount = t.length;
    }
  }, "Zr");
  a(Zr, "DataRowMessage");
  var Ur = Zr;
  T.DataRowMessage = Ur;
  var Jr = /* @__PURE__ */ __name(class Jr {
    constructor(e, t) {
      this.length = e, this.message = t, this.name = "notice";
    }
  }, "Jr");
  a(Jr, "NoticeMessage");
  var Or = Jr;
  T.NoticeMessage = Or;
});
var bs = I((xt) => {
  "use strict";
  p();
  Object.defineProperty(xt, "__esModule", { value: true });
  xt.Writer = void 0;
  var tn = /* @__PURE__ */ __name(class tn {
    constructor(e = 256) {
      this.size = e, this.offset = 5, this.headerPosition = 0, this.buffer = y.allocUnsafe(e);
    }
    ensure(e) {
      var t = this.buffer.length - this.offset;
      if (t < e) {
        var n = this.buffer, i = n.length + (n.length >> 1) + e;
        this.buffer = y.allocUnsafe(
          i
        ), n.copy(this.buffer);
      }
    }
    addInt32(e) {
      return this.ensure(4), this.buffer[this.offset++] = e >>> 24 & 255, this.buffer[this.offset++] = e >>> 16 & 255, this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
    }
    addInt16(e) {
      return this.ensure(2), this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
    }
    addCString(e) {
      if (!e)
        this.ensure(1);
      else {
        var t = y.byteLength(e);
        this.ensure(t + 1), this.buffer.write(
          e,
          this.offset,
          "utf-8"
        ), this.offset += t;
      }
      return this.buffer[this.offset++] = 0, this;
    }
    addString(e = "") {
      var t = y.byteLength(e);
      return this.ensure(t), this.buffer.write(e, this.offset), this.offset += t, this;
    }
    add(e) {
      return this.ensure(e.length), e.copy(this.buffer, this.offset), this.offset += e.length, this;
    }
    join(e) {
      if (e) {
        this.buffer[this.headerPosition] = e;
        let t = this.offset - (this.headerPosition + 1);
        this.buffer.writeInt32BE(t, this.headerPosition + 1);
      }
      return this.buffer.slice(e ? 0 : 5, this.offset);
    }
    flush(e) {
      var t = this.join(e);
      return this.offset = 5, this.headerPosition = 0, this.buffer = y.allocUnsafe(this.size), t;
    }
  }, "tn");
  a(tn, "Writer");
  var en = tn;
  xt.Writer = en;
});
var xs = I((vt) => {
  "use strict";
  p();
  Object.defineProperty(vt, "__esModule", { value: true });
  vt.serialize = void 0;
  var rn = bs(), M = new rn.Writer(), Uu = a((r) => {
    M.addInt16(3).addInt16(
      0
    );
    for (let n of Object.keys(r))
      M.addCString(n).addCString(r[n]);
    M.addCString("client_encoding").addCString("UTF8");
    var e = M.addCString("").flush(), t = e.length + 4;
    return new rn.Writer().addInt32(t).add(e).flush();
  }, "startup"), Ou = a(() => {
    let r = y.allocUnsafe(8);
    return r.writeInt32BE(8, 0), r.writeInt32BE(80877103, 4), r;
  }, "requestSsl"), Nu = a((r) => M.addCString(r).flush(112), "password"), qu = a(function(r, e) {
    return M.addCString(r).addInt32(
      y.byteLength(e)
    ).addString(e), M.flush(112);
  }, "sendSASLInitialResponseMessage"), Qu = a(
    function(r) {
      return M.addString(r).flush(112);
    },
    "sendSCRAMClientFinalMessage"
  ), ju = a(
    (r) => M.addCString(r).flush(81),
    "query"
  ), Ss = [], Wu = a((r) => {
    let e = r.name || "";
    e.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", e, e.length), console.error("This can cause conflicts and silent errors executing queries"));
    let t = r.types || Ss;
    for (var n = t.length, i = M.addCString(e).addCString(r.text).addInt16(n), s = 0; s < n; s++)
      i.addInt32(t[s]);
    return M.flush(80);
  }, "parse"), Oe = new rn.Writer(), Hu = a(function(r, e) {
    for (let t = 0; t < r.length; t++) {
      let n = e ? e(r[t], t) : r[t];
      n == null ? (M.addInt16(0), Oe.addInt32(-1)) : n instanceof y ? (M.addInt16(1), Oe.addInt32(n.length), Oe.add(n)) : (M.addInt16(0), Oe.addInt32(y.byteLength(
        n
      )), Oe.addString(n));
    }
  }, "writeValues"), Gu = a((r = {}) => {
    let e = r.portal || "", t = r.statement || "", n = r.binary || false, i = r.values || Ss, s = i.length;
    return M.addCString(e).addCString(t), M.addInt16(s), Hu(i, r.valueMapper), M.addInt16(s), M.add(Oe.flush()), M.addInt16(n ? 1 : 0), M.flush(66);
  }, "bind"), $u = y.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), Vu = a((r) => {
    if (!r || !r.portal && !r.rows)
      return $u;
    let e = r.portal || "", t = r.rows || 0, n = y.byteLength(e), i = 4 + n + 1 + 4, s = y.allocUnsafe(1 + i);
    return s[0] = 69, s.writeInt32BE(i, 1), s.write(e, 5, "utf-8"), s[n + 5] = 0, s.writeUInt32BE(t, s.length - 4), s;
  }, "execute"), Ku = a((r, e) => {
    let t = y.allocUnsafe(16);
    return t.writeInt32BE(16, 0), t.writeInt16BE(1234, 4), t.writeInt16BE(5678, 6), t.writeInt32BE(
      r,
      8
    ), t.writeInt32BE(e, 12), t;
  }, "cancel"), nn = a(
    (r, e) => {
      let n = 4 + y.byteLength(e) + 1, i = y.allocUnsafe(1 + n);
      return i[0] = r, i.writeInt32BE(n, 1), i.write(e, 5, "utf-8"), i[n] = 0, i;
    },
    "cstringMessage"
  ), zu = M.addCString("P").flush(68), Yu = M.addCString("S").flush(68), Zu = a((r) => r.name ? nn(68, `${r.type}${r.name || ""}`) : r.type === "P" ? zu : Yu, "describe"), Ju = a(
    (r) => {
      let e = `${r.type}${r.name || ""}`;
      return nn(67, e);
    },
    "close"
  ), Xu = a((r) => M.add(r).flush(
    100
  ), "copyData"), ec = a((r) => nn(102, r), "copyFail"), Et = a((r) => y.from([r, 0, 0, 0, 4]), "codeOnlyBuffer"), tc = Et(72), rc = Et(83), nc = Et(88), ic = Et(99), sc = {
    startup: Uu,
    password: Nu,
    requestSsl: Ou,
    sendSASLInitialResponseMessage: qu,
    sendSCRAMClientFinalMessage: Qu,
    query: ju,
    parse: Wu,
    bind: Gu,
    execute: Vu,
    describe: Zu,
    close: Ju,
    flush: a(() => tc, "flush"),
    sync: a(
      () => rc,
      "sync"
    ),
    end: a(() => nc, "end"),
    copyData: Xu,
    copyDone: a(() => ic, "copyDone"),
    copyFail: ec,
    cancel: Ku
  };
  vt.serialize = sc;
});
var Es = I((_t) => {
  "use strict";
  p();
  Object.defineProperty(_t, "__esModule", { value: true });
  _t.BufferReader = void 0;
  var oc = y.allocUnsafe(0), on = /* @__PURE__ */ __name(class on {
    constructor(e = 0) {
      this.offset = e, this.buffer = oc, this.encoding = "utf-8";
    }
    setBuffer(e, t) {
      this.offset = e, this.buffer = t;
    }
    int16() {
      let e = this.buffer.readInt16BE(this.offset);
      return this.offset += 2, e;
    }
    byte() {
      let e = this.buffer[this.offset];
      return this.offset++, e;
    }
    int32() {
      let e = this.buffer.readInt32BE(this.offset);
      return this.offset += 4, e;
    }
    string(e) {
      let t = this.buffer.toString(this.encoding, this.offset, this.offset + e);
      return this.offset += e, t;
    }
    cstring() {
      let e = this.offset, t = e;
      for (; this.buffer[t++] !== 0; )
        ;
      return this.offset = t, this.buffer.toString(this.encoding, e, t - 1);
    }
    bytes(e) {
      let t = this.buffer.slice(this.offset, this.offset + e);
      return this.offset += e, t;
    }
  }, "on");
  a(on, "BufferReader");
  var sn = on;
  _t.BufferReader = sn;
});
var As = I((At) => {
  "use strict";
  p();
  Object.defineProperty(At, "__esModule", { value: true });
  At.Parser = void 0;
  var D = Xr(), ac = Es(), an = 1, uc = 4, vs = an + uc, _s = y.allocUnsafe(0), cn = /* @__PURE__ */ __name(class cn {
    constructor(e) {
      if (this.buffer = _s, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new ac.BufferReader(), e?.mode === "binary")
        throw new Error("Binary mode not supported yet");
      this.mode = e?.mode || "text";
    }
    parse(e, t) {
      this.mergeBuffer(e);
      let n = this.bufferOffset + this.bufferLength, i = this.bufferOffset;
      for (; i + vs <= n; ) {
        let s = this.buffer[i], o = this.buffer.readUInt32BE(
          i + an
        ), u = an + o;
        if (u + i <= n) {
          let c = this.handlePacket(i + vs, s, o, this.buffer);
          t(c), i += u;
        } else
          break;
      }
      i === n ? (this.buffer = _s, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = n - i, this.bufferOffset = i);
    }
    mergeBuffer(e) {
      if (this.bufferLength > 0) {
        let t = this.bufferLength + e.byteLength;
        if (t + this.bufferOffset > this.buffer.byteLength) {
          let i;
          if (t <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength)
            i = this.buffer;
          else {
            let s = this.buffer.byteLength * 2;
            for (; t >= s; )
              s *= 2;
            i = y.allocUnsafe(s);
          }
          this.buffer.copy(
            i,
            0,
            this.bufferOffset,
            this.bufferOffset + this.bufferLength
          ), this.buffer = i, this.bufferOffset = 0;
        }
        e.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = t;
      } else
        this.buffer = e, this.bufferOffset = 0, this.bufferLength = e.byteLength;
    }
    handlePacket(e, t, n, i) {
      switch (t) {
        case 50:
          return D.bindComplete;
        case 49:
          return D.parseComplete;
        case 51:
          return D.closeComplete;
        case 110:
          return D.noData;
        case 115:
          return D.portalSuspended;
        case 99:
          return D.copyDone;
        case 87:
          return D.replicationStart;
        case 73:
          return D.emptyQuery;
        case 68:
          return this.parseDataRowMessage(
            e,
            n,
            i
          );
        case 67:
          return this.parseCommandCompleteMessage(e, n, i);
        case 90:
          return this.parseReadyForQueryMessage(e, n, i);
        case 65:
          return this.parseNotificationMessage(
            e,
            n,
            i
          );
        case 82:
          return this.parseAuthenticationResponse(e, n, i);
        case 83:
          return this.parseParameterStatusMessage(e, n, i);
        case 75:
          return this.parseBackendKeyData(e, n, i);
        case 69:
          return this.parseErrorMessage(e, n, i, "error");
        case 78:
          return this.parseErrorMessage(
            e,
            n,
            i,
            "notice"
          );
        case 84:
          return this.parseRowDescriptionMessage(e, n, i);
        case 116:
          return this.parseParameterDescriptionMessage(e, n, i);
        case 71:
          return this.parseCopyInMessage(
            e,
            n,
            i
          );
        case 72:
          return this.parseCopyOutMessage(e, n, i);
        case 100:
          return this.parseCopyData(
            e,
            n,
            i
          );
        default:
          return new D.DatabaseError("received invalid response: " + t.toString(
            16
          ), n, "error");
      }
    }
    parseReadyForQueryMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.string(1);
      return new D.ReadyForQueryMessage(t, i);
    }
    parseCommandCompleteMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring();
      return new D.CommandCompleteMessage(
        t,
        i
      );
    }
    parseCopyData(e, t, n) {
      let i = n.slice(e, e + (t - 4));
      return new D.CopyDataMessage(
        t,
        i
      );
    }
    parseCopyInMessage(e, t, n) {
      return this.parseCopyMessage(e, t, n, "copyInResponse");
    }
    parseCopyOutMessage(e, t, n) {
      return this.parseCopyMessage(e, t, n, "copyOutResponse");
    }
    parseCopyMessage(e, t, n, i) {
      this.reader.setBuffer(e, n);
      let s = this.reader.byte() !== 0, o = this.reader.int16(), u = new D.CopyResponse(t, i, s, o);
      for (let c = 0; c < o; c++)
        u.columnTypes[c] = this.reader.int16();
      return u;
    }
    parseNotificationMessage(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int32(), s = this.reader.cstring(), o = this.reader.cstring();
      return new D.NotificationResponseMessage(t, i, s, o);
    }
    parseRowDescriptionMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new D.RowDescriptionMessage(t, i);
      for (let o = 0; o < i; o++)
        s.fields[o] = this.parseField();
      return s;
    }
    parseField() {
      let e = this.reader.cstring(), t = this.reader.int32(), n = this.reader.int16(), i = this.reader.int32(), s = this.reader.int16(), o = this.reader.int32(), u = this.reader.int16() === 0 ? "text" : "binary";
      return new D.Field(e, t, n, i, s, o, u);
    }
    parseParameterDescriptionMessage(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int16(), s = new D.ParameterDescriptionMessage(t, i);
      for (let o = 0; o < i; o++)
        s.dataTypeIDs[o] = this.reader.int32();
      return s;
    }
    parseDataRowMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new Array(i);
      for (let o = 0; o < i; o++) {
        let u = this.reader.int32();
        s[o] = u === -1 ? null : this.reader.string(u);
      }
      return new D.DataRowMessage(
        t,
        s
      );
    }
    parseParameterStatusMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring(), s = this.reader.cstring();
      return new D.ParameterStatusMessage(t, i, s);
    }
    parseBackendKeyData(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int32(), s = this.reader.int32();
      return new D.BackendKeyDataMessage(t, i, s);
    }
    parseAuthenticationResponse(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int32(), s = { name: "authenticationOk", length: t };
      switch (i) {
        case 0:
          break;
        case 3:
          s.length === 8 && (s.name = "authenticationCleartextPassword");
          break;
        case 5:
          if (s.length === 12) {
            s.name = "authenticationMD5Password";
            let u = this.reader.bytes(4);
            return new D.AuthenticationMD5Password(t, u);
          }
          break;
        case 10:
          s.name = "authenticationSASL", s.mechanisms = [];
          let o;
          do
            o = this.reader.cstring(), o && s.mechanisms.push(o);
          while (o);
          break;
        case 11:
          s.name = "authenticationSASLContinue", s.data = this.reader.string(t - 8);
          break;
        case 12:
          s.name = "authenticationSASLFinal", s.data = this.reader.string(t - 8);
          break;
        default:
          throw new Error("Unknown authenticationOk message type " + i);
      }
      return s;
    }
    parseErrorMessage(e, t, n, i) {
      this.reader.setBuffer(e, n);
      let s = {}, o = this.reader.string(1);
      for (; o !== "\0"; )
        s[o] = this.reader.cstring(), o = this.reader.string(1);
      let u = s.M, c = i === "notice" ? new D.NoticeMessage(
        t,
        u
      ) : new D.DatabaseError(u, t, i);
      return c.severity = s.S, c.code = s.C, c.detail = s.D, c.hint = s.H, c.position = s.P, c.internalPosition = s.p, c.internalQuery = s.q, c.where = s.W, c.schema = s.s, c.table = s.t, c.column = s.c, c.dataType = s.d, c.constraint = s.n, c.file = s.F, c.line = s.L, c.routine = s.R, c;
    }
  }, "cn");
  a(cn, "Parser");
  var un = cn;
  At.Parser = un;
});
var hn = I((be) => {
  "use strict";
  p();
  Object.defineProperty(be, "__esModule", { value: true });
  be.DatabaseError = be.serialize = be.parse = void 0;
  var cc = Xr();
  Object.defineProperty(
    be,
    "DatabaseError",
    { enumerable: true, get: a(function() {
      return cc.DatabaseError;
    }, "get") }
  );
  var hc = xs();
  Object.defineProperty(be, "serialize", { enumerable: true, get: a(function() {
    return hc.serialize;
  }, "get") });
  var lc = As();
  function fc(r, e) {
    let t = new lc.Parser();
    return r.on("data", (n) => t.parse(n, e)), new Promise((n) => r.on("end", () => n()));
  }
  __name(fc, "fc");
  a(fc, "parse");
  be.parse = fc;
});
var Cs = {};
se(Cs, { connect: () => pc });
function pc({ socket: r, servername: e }) {
  return r.startTls(e), r;
}
__name(pc, "pc");
var Ts = z(() => {
  "use strict";
  p();
  a(pc, "connect");
});
var pn = I((of, Bs) => {
  "use strict";
  p();
  var Is = (St(), O(ws)), dc = ge().EventEmitter, {
    parse: yc,
    serialize: q
  } = hn(), Ps = q.flush(), mc = q.sync(), gc = q.end(), fn = /* @__PURE__ */ __name(class fn extends dc {
    constructor(e) {
      super(), e = e || {}, this.stream = e.stream || new Is.Socket(), this._keepAlive = e.keepAlive, this._keepAliveInitialDelayMillis = e.keepAliveInitialDelayMillis, this.lastBuffer = false, this.parsedStatements = {}, this.ssl = e.ssl || false, this._ending = false, this._emitMessage = false;
      var t = this;
      this.on("newListener", function(n) {
        n === "message" && (t._emitMessage = true);
      });
    }
    connect(e, t) {
      var n = this;
      this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(
        e,
        t
      ), this.stream.once("connect", function() {
        n._keepAlive && n.stream.setKeepAlive(
          true,
          n._keepAliveInitialDelayMillis
        ), n.emit("connect");
      });
      let i = a(function(s) {
        n._ending && (s.code === "ECONNRESET" || s.code === "EPIPE") || n.emit("error", s);
      }, "reportStreamError");
      if (this.stream.on("error", i), this.stream.on("close", function() {
        n.emit("end");
      }), !this.ssl)
        return this.attachListeners(this.stream);
      this.stream.once("data", function(s) {
        var o = s.toString("utf8");
        switch (o) {
          case "S":
            break;
          case "N":
            return n.stream.end(), n.emit("error", new Error("The server does not support SSL connections"));
          default:
            return n.stream.end(), n.emit("error", new Error("There was an error establishing an SSL connection"));
        }
        var u = (Ts(), O(Cs));
        let c = { socket: n.stream };
        n.ssl !== true && (Object.assign(
          c,
          n.ssl
        ), "key" in n.ssl && (c.key = n.ssl.key)), Is.isIP(t) === 0 && (c.servername = t);
        try {
          n.stream = u.connect(c);
        } catch (h) {
          return n.emit("error", h);
        }
        n.attachListeners(n.stream), n.stream.on("error", i), n.emit("sslconnect");
      });
    }
    attachListeners(e) {
      e.on("end", () => {
        this.emit("end");
      }), yc(e, (t) => {
        var n = t.name === "error" ? "errorMessage" : t.name;
        this._emitMessage && this.emit("message", t), this.emit(n, t);
      });
    }
    requestSsl() {
      this.stream.write(q.requestSsl());
    }
    startup(e) {
      this.stream.write(q.startup(e));
    }
    cancel(e, t) {
      this._send(q.cancel(e, t));
    }
    password(e) {
      this._send(q.password(e));
    }
    sendSASLInitialResponseMessage(e, t) {
      this._send(q.sendSASLInitialResponseMessage(
        e,
        t
      ));
    }
    sendSCRAMClientFinalMessage(e) {
      this._send(q.sendSCRAMClientFinalMessage(e));
    }
    _send(e) {
      return this.stream.writable ? this.stream.write(e) : false;
    }
    query(e) {
      this._send(q.query(
        e
      ));
    }
    parse(e) {
      this._send(q.parse(e));
    }
    bind(e) {
      this._send(q.bind(e));
    }
    execute(e) {
      this._send(q.execute(e));
    }
    flush() {
      this.stream.writable && this.stream.write(Ps);
    }
    sync() {
      this._ending = true, this._send(Ps), this._send(mc);
    }
    ref() {
      this.stream.ref();
    }
    unref() {
      this.stream.unref();
    }
    end() {
      if (this._ending = true, !this._connecting || !this.stream.writable) {
        this.stream.end();
        return;
      }
      return this.stream.write(gc, () => {
        this.stream.end();
      });
    }
    close(e) {
      this._send(q.close(e));
    }
    describe(e) {
      this._send(q.describe(e));
    }
    sendCopyFromChunk(e) {
      this._send(q.copyData(e));
    }
    endCopyFrom() {
      this._send(q.copyDone());
    }
    sendCopyFail(e) {
      this._send(q.copyFail(e));
    }
  }, "fn");
  a(fn, "Connection");
  var ln = fn;
  Bs.exports = ln;
});
var Fs = I((hf, Rs) => {
  "use strict";
  p();
  var wc = ge().EventEmitter, cf = (Ge(), O(He)), bc = tt(), dn = ji(), Sc = Xi(), xc = wt(), Ec = bt(), Ls = ys(), vc = et(), _c = pn(), yn = /* @__PURE__ */ __name(class yn extends wc {
    constructor(e) {
      super(), this.connectionParameters = new Ec(e), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }), this.replication = this.connectionParameters.replication;
      var t = e || {};
      this._Promise = t.Promise || S.Promise, this._types = new xc(t.types), this._ending = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this.connection = t.connection || new _c({ stream: t.stream, ssl: this.connectionParameters.ssl, keepAlive: t.keepAlive || false, keepAliveInitialDelayMillis: t.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = t.binary || vc.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t.connectionTimeoutMillis || 0;
    }
    _errorAllQueries(e) {
      let t = a(
        (n) => {
          m.nextTick(() => {
            n.handleError(e, this.connection);
          });
        },
        "enqueueError"
      );
      this.activeQuery && (t(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(t), this.queryQueue.length = 0;
    }
    _connect(e) {
      var t = this, n = this.connection;
      if (this._connectionCallback = e, this._connecting || this._connected) {
        let i = new Error("Client has already been connected. You cannot reuse a client.");
        m.nextTick(() => {
          e(i);
        });
        return;
      }
      this._connecting = true, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
        n._ending = true, n.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
        t.ssl ? n.requestSsl() : n.startup(t.getStartupConf());
      }), n.on("sslconnect", function() {
        n.startup(t.getStartupConf());
      }), this._attachListeners(n), n.once("end", () => {
        let i = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(i), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(i) : this._handleErrorEvent(i) : this._connectionError || this._handleErrorEvent(
          i
        )), m.nextTick(() => {
          this.emit("end");
        });
      });
    }
    connect(e) {
      if (e) {
        this._connect(e);
        return;
      }
      return new this._Promise((t, n) => {
        this._connect((i) => {
          i ? n(i) : t();
        });
      });
    }
    _attachListeners(e) {
      e.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e.on("authenticationSASL", this._handleAuthSASL.bind(this)), e.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e.on("backendKeyData", this._handleBackendKeyData.bind(this)), e.on("error", this._handleErrorEvent.bind(this)), e.on(
        "errorMessage",
        this._handleErrorMessage.bind(this)
      ), e.on("readyForQuery", this._handleReadyForQuery.bind(this)), e.on("notice", this._handleNotice.bind(this)), e.on("rowDescription", this._handleRowDescription.bind(this)), e.on("dataRow", this._handleDataRow.bind(this)), e.on("portalSuspended", this._handlePortalSuspended.bind(this)), e.on(
        "emptyQuery",
        this._handleEmptyQuery.bind(this)
      ), e.on("commandComplete", this._handleCommandComplete.bind(this)), e.on("parseComplete", this._handleParseComplete.bind(this)), e.on("copyInResponse", this._handleCopyInResponse.bind(this)), e.on("copyData", this._handleCopyData.bind(this)), e.on("notification", this._handleNotification.bind(this));
    }
    _checkPgPass(e) {
      let t = this.connection;
      typeof this.password == "function" ? this._Promise.resolve().then(
        () => this.password()
      ).then((n) => {
        if (n !== void 0) {
          if (typeof n != "string") {
            t.emit("error", new TypeError("Password must be a string"));
            return;
          }
          this.connectionParameters.password = this.password = n;
        } else
          this.connectionParameters.password = this.password = null;
        e();
      }).catch((n) => {
        t.emit("error", n);
      }) : this.password !== null ? e() : Sc(
        this.connectionParameters,
        (n) => {
          n !== void 0 && (this.connectionParameters.password = this.password = n), e();
        }
      );
    }
    _handleAuthCleartextPassword(e) {
      this._checkPgPass(() => {
        this.connection.password(this.password);
      });
    }
    _handleAuthMD5Password(e) {
      this._checkPgPass(() => {
        let t = bc.postgresMd5PasswordHash(
          this.user,
          this.password,
          e.salt
        );
        this.connection.password(t);
      });
    }
    _handleAuthSASL(e) {
      this._checkPgPass(() => {
        this.saslSession = dn.startSession(e.mechanisms), this.connection.sendSASLInitialResponseMessage(
          this.saslSession.mechanism,
          this.saslSession.response
        );
      });
    }
    _handleAuthSASLContinue(e) {
      dn.continueSession(this.saslSession, this.password, e.data), this.connection.sendSCRAMClientFinalMessage(
        this.saslSession.response
      );
    }
    _handleAuthSASLFinal(e) {
      dn.finalizeSession(
        this.saslSession,
        e.data
      ), this.saslSession = null;
    }
    _handleBackendKeyData(e) {
      this.processID = e.processID, this.secretKey = e.secretKey;
    }
    _handleReadyForQuery(e) {
      this._connecting && (this._connecting = false, this._connected = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
      let { activeQuery: t } = this;
      this.activeQuery = null, this.readyForQuery = true, t && t.handleReadyForQuery(this.connection), this._pulseQueryQueue();
    }
    _handleErrorWhileConnecting(e) {
      if (!this._connectionError) {
        if (this._connectionError = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback)
          return this._connectionCallback(e);
        this.emit("error", e);
      }
    }
    _handleErrorEvent(e) {
      if (this._connecting)
        return this._handleErrorWhileConnecting(e);
      this._queryable = false, this._errorAllQueries(e), this.emit("error", e);
    }
    _handleErrorMessage(e) {
      if (this._connecting)
        return this._handleErrorWhileConnecting(e);
      let t = this.activeQuery;
      if (!t) {
        this._handleErrorEvent(
          e
        );
        return;
      }
      this.activeQuery = null, t.handleError(e, this.connection);
    }
    _handleRowDescription(e) {
      this.activeQuery.handleRowDescription(e);
    }
    _handleDataRow(e) {
      this.activeQuery.handleDataRow(
        e
      );
    }
    _handlePortalSuspended(e) {
      this.activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(e) {
      this.activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(e) {
      this.activeQuery.handleCommandComplete(e, this.connection);
    }
    _handleParseComplete(e) {
      this.activeQuery.name && (this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text);
    }
    _handleCopyInResponse(e) {
      this.activeQuery.handleCopyInResponse(
        this.connection
      );
    }
    _handleCopyData(e) {
      this.activeQuery.handleCopyData(e, this.connection);
    }
    _handleNotification(e) {
      this.emit("notification", e);
    }
    _handleNotice(e) {
      this.emit("notice", e);
    }
    getStartupConf() {
      var e = this.connectionParameters, t = { user: e.user, database: e.database }, n = e.application_name || e.fallback_application_name;
      return n && (t.application_name = n), e.replication && (t.replication = "" + e.replication), e.statement_timeout && (t.statement_timeout = String(parseInt(
        e.statement_timeout,
        10
      ))), e.lock_timeout && (t.lock_timeout = String(parseInt(e.lock_timeout, 10))), e.idle_in_transaction_session_timeout && (t.idle_in_transaction_session_timeout = String(parseInt(
        e.idle_in_transaction_session_timeout,
        10
      ))), e.options && (t.options = e.options), t;
    }
    cancel(e, t) {
      if (e.activeQuery === t) {
        var n = this.connection;
        this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
          n.cancel(
            e.processID,
            e.secretKey
          );
        });
      } else
        e.queryQueue.indexOf(t) !== -1 && e.queryQueue.splice(e.queryQueue.indexOf(t), 1);
    }
    setTypeParser(e, t, n) {
      return this._types.setTypeParser(e, t, n);
    }
    getTypeParser(e, t) {
      return this._types.getTypeParser(e, t);
    }
    escapeIdentifier(e) {
      return '"' + e.replace(
        /"/g,
        '""'
      ) + '"';
    }
    escapeLiteral(e) {
      for (var t = false, n = "'", i = 0; i < e.length; i++) {
        var s = e[i];
        s === "'" ? n += s + s : s === "\\" ? (n += s + s, t = true) : n += s;
      }
      return n += "'", t === true && (n = " E" + n), n;
    }
    _pulseQueryQueue() {
      if (this.readyForQuery === true)
        if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
          this.readyForQuery = false, this.hasExecuted = true;
          let e = this.activeQuery.submit(this.connection);
          e && m.nextTick(() => {
            this.activeQuery.handleError(e, this.connection), this.readyForQuery = true, this._pulseQueryQueue();
          });
        } else
          this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
    }
    query(e, t, n) {
      var i, s, o, u, c;
      if (e == null)
        throw new TypeError("Client was passed a null or undefined query");
      return typeof e.submit == "function" ? (o = e.query_timeout || this.connectionParameters.query_timeout, s = i = e, typeof t == "function" && (i.callback = i.callback || t)) : (o = this.connectionParameters.query_timeout, i = new Ls(
        e,
        t,
        n
      ), i.callback || (s = new this._Promise((h, l) => {
        i.callback = (d, b) => d ? l(d) : h(b);
      }))), o && (c = i.callback, u = setTimeout(() => {
        var h = new Error("Query read timeout");
        m.nextTick(
          () => {
            i.handleError(h, this.connection);
          }
        ), c(h), i.callback = () => {
        };
        var l = this.queryQueue.indexOf(i);
        l > -1 && this.queryQueue.splice(l, 1), this._pulseQueryQueue();
      }, o), i.callback = (h, l) => {
        clearTimeout(u), c(h, l);
      }), this.binary && !i.binary && (i.binary = true), i._result && !i._result._types && (i._result._types = this._types), this._queryable ? this._ending ? (m.nextTick(() => {
        i.handleError(
          new Error("Client was closed and is not queryable"),
          this.connection
        );
      }), s) : (this.queryQueue.push(i), this._pulseQueryQueue(), s) : (m.nextTick(
        () => {
          i.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
        }
      ), s);
    }
    ref() {
      this.connection.ref();
    }
    unref() {
      this.connection.unref();
    }
    end(e) {
      if (this._ending = true, !this.connection._connecting)
        if (e)
          e();
        else
          return this._Promise.resolve();
      if (this.activeQuery || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), e)
        this.connection.once("end", e);
      else
        return new this._Promise((t) => {
          this.connection.once("end", t);
        });
    }
  }, "yn");
  a(yn, "Client");
  var Ct = yn;
  Ct.Query = Ls;
  Rs.exports = Ct;
});
var Us = I((pf, ks) => {
  "use strict";
  p();
  var Ac = ge().EventEmitter, Ms = a(function() {
  }, "NOOP"), Ds = a(
    (r, e) => {
      let t = r.findIndex(e);
      return t === -1 ? void 0 : r.splice(t, 1)[0];
    },
    "removeWhere"
  ), wn = /* @__PURE__ */ __name(class wn {
    constructor(e, t, n) {
      this.client = e, this.idleListener = t, this.timeoutId = n;
    }
  }, "wn");
  a(wn, "IdleItem");
  var mn = wn, bn = /* @__PURE__ */ __name(class bn {
    constructor(e) {
      this.callback = e;
    }
  }, "bn");
  a(bn, "PendingItem");
  var Ne = bn;
  function Cc() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  __name(Cc, "Cc");
  a(Cc, "throwOnDoubleRelease");
  function Tt(r, e) {
    if (e)
      return { callback: e, result: void 0 };
    let t, n, i = a(function(o, u) {
      o ? t(o) : n(u);
    }, "cb"), s = new r(function(o, u) {
      n = o, t = u;
    }).catch((o) => {
      throw Error.captureStackTrace(
        o
      ), o;
    });
    return { callback: i, result: s };
  }
  __name(Tt, "Tt");
  a(Tt, "promisify");
  function Tc(r, e) {
    return a(
      /* @__PURE__ */ __name(function t(n) {
        n.client = e, e.removeListener("error", t), e.on("error", () => {
          r.log("additional client error after disconnection due to error", n);
        }), r._remove(e), r.emit("error", n, e);
      }, "t"),
      "idleListener"
    );
  }
  __name(Tc, "Tc");
  a(Tc, "makeIdleListener");
  var Sn = /* @__PURE__ */ __name(class Sn extends Ac {
    constructor(e, t) {
      super(), this.options = Object.assign({}, e), e != null && "password" in e && Object.defineProperty(
        this.options,
        "password",
        { configurable: true, enumerable: false, writable: true, value: e.password }
      ), e != null && e.ssl && e.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
      }, this.Client = this.options.Client || t || It().Client, this.Promise = this.options.Promise || S.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = false, this.ended = false;
    }
    _isFull() {
      return this._clients.length >= this.options.max;
    }
    _pulseQueue() {
      if (this.log("pulse queue"), this.ended) {
        this.log("pulse queue ended");
        return;
      }
      if (this.ending) {
        this.log(
          "pulse queue on ending"
        ), this._idle.length && this._idle.slice().map((t) => {
          this._remove(
            t.client
          );
        }), this._clients.length || (this.ended = true, this._endCallback());
        return;
      }
      if (!this._pendingQueue.length) {
        this.log("no queued requests");
        return;
      }
      if (!this._idle.length && this._isFull())
        return;
      let e = this._pendingQueue.shift();
      if (this._idle.length) {
        let t = this._idle.pop();
        clearTimeout(t.timeoutId);
        let n = t.client;
        n.ref && n.ref();
        let i = t.idleListener;
        return this._acquireClient(n, e, i, false);
      }
      if (!this._isFull())
        return this.newClient(e);
      throw new Error("unexpected condition");
    }
    _remove(e) {
      let t = Ds(this._idle, (n) => n.client === e);
      t !== void 0 && clearTimeout(t.timeoutId), this._clients = this._clients.filter((n) => n !== e), e.end(), this.emit("remove", e);
    }
    connect(e) {
      if (this.ending) {
        let i = new Error("Cannot use a pool after calling end on the pool");
        return e ? e(i) : this.Promise.reject(
          i
        );
      }
      let t = Tt(this.Promise, e), n = t.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length && m.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis)
          return this._pendingQueue.push(new Ne(t.callback)), n;
        let i = a((u, c, h) => {
          clearTimeout(
            o
          ), t.callback(u, c, h);
        }, "queueCallback"), s = new Ne(i), o = setTimeout(() => {
          Ds(
            this._pendingQueue,
            (u) => u.callback === i
          ), s.timedOut = true, t.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        return this._pendingQueue.push(s), n;
      }
      return this.newClient(new Ne(t.callback)), n;
    }
    newClient(e) {
      let t = new this.Client(this.options);
      this._clients.push(t);
      let n = Tc(this, t);
      this.log("checking client timeout");
      let i, s = false;
      this.options.connectionTimeoutMillis && (i = setTimeout(() => {
        this.log("ending client due to timeout"), s = true, t.connection ? t.connection.stream.destroy() : t.end();
      }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), t.connect((o) => {
        if (i && clearTimeout(i), t.on("error", n), o)
          this.log("client failed to connect", o), this._clients = this._clients.filter((u) => u !== t), s && (o.message = "Connection terminated due to connection timeout"), this._pulseQueue(), e.timedOut || e.callback(
            o,
            void 0,
            Ms
          );
        else {
          if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
            let u = setTimeout(() => {
              this.log("ending client due to expired lifetime"), this._expired.add(t), this._idle.findIndex((h) => h.client === t) !== -1 && this._acquireClient(
                t,
                new Ne((h, l, d) => d()),
                n,
                false
              );
            }, this.options.maxLifetimeSeconds * 1e3);
            u.unref(), t.once(
              "end",
              () => clearTimeout(u)
            );
          }
          return this._acquireClient(t, e, n, true);
        }
      });
    }
    _acquireClient(e, t, n, i) {
      i && this.emit("connect", e), this.emit("acquire", e), e.release = this._releaseOnce(e, n), e.removeListener("error", n), t.timedOut ? i && this.options.verify ? this.options.verify(
        e,
        e.release
      ) : e.release() : i && this.options.verify ? this.options.verify(e, (s) => {
        if (s)
          return e.release(s), t.callback(s, void 0, Ms);
        t.callback(void 0, e, e.release);
      }) : t.callback(
        void 0,
        e,
        e.release
      );
    }
    _releaseOnce(e, t) {
      let n = false;
      return (i) => {
        n && Cc(), n = true, this._release(
          e,
          t,
          i
        );
      };
    }
    _release(e, t, n) {
      if (e.on("error", t), e._poolUseCount = (e._poolUseCount || 0) + 1, this.emit("release", n, e), n || this.ending || !e._queryable || e._ending || e._poolUseCount >= this.options.maxUses) {
        e._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(e), this._pulseQueue();
        return;
      }
      if (this._expired.has(e)) {
        this.log("remove expired client"), this._expired.delete(e), this._remove(e), this._pulseQueue();
        return;
      }
      let s;
      this.options.idleTimeoutMillis && (s = setTimeout(() => {
        this.log("remove idle client"), this._remove(e);
      }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && s.unref()), this.options.allowExitOnIdle && e.unref(), this._idle.push(new mn(e, t, s)), this._pulseQueue();
    }
    query(e, t, n) {
      if (typeof e == "function") {
        let s = Tt(this.Promise, e);
        return x(function() {
          return s.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        }), s.result;
      }
      typeof t == "function" && (n = t, t = void 0);
      let i = Tt(this.Promise, n);
      return n = i.callback, this.connect((s, o) => {
        if (s)
          return n(s);
        let u = false, c = a((h) => {
          u || (u = true, o.release(h), n(h));
        }, "onError");
        o.once("error", c), this.log("dispatching query");
        try {
          o.query(e, t, (h, l) => {
            if (this.log("query dispatched"), o.removeListener("error", c), !u)
              return u = true, o.release(h), h ? n(h) : n(
                void 0,
                l
              );
          });
        } catch (h) {
          return o.release(h), n(h);
        }
      }), i.result;
    }
    end(e) {
      if (this.log("ending"), this.ending) {
        let n = new Error("Called end on pool more than once");
        return e ? e(n) : this.Promise.reject(n);
      }
      this.ending = true;
      let t = Tt(this.Promise, e);
      return this._endCallback = t.callback, this._pulseQueue(), t.result;
    }
    get waitingCount() {
      return this._pendingQueue.length;
    }
    get idleCount() {
      return this._idle.length;
    }
    get expiredCount() {
      return this._clients.reduce((e, t) => e + (this._expired.has(t) ? 1 : 0), 0);
    }
    get totalCount() {
      return this._clients.length;
    }
  }, "Sn");
  a(Sn, "Pool");
  var gn = Sn;
  ks.exports = gn;
});
var Os = {};
se(Os, { default: () => Ic });
var Ic;
var Ns = z(() => {
  "use strict";
  p();
  Ic = {};
});
var qs = I((gf, Pc) => {
  Pc.exports = { name: "pg", version: "8.8.0", description: "PostgreSQL client - pure javascript & libpq with the same API", keywords: [
    "database",
    "libpq",
    "pg",
    "postgre",
    "postgres",
    "postgresql",
    "rdbms"
  ], homepage: "https://github.com/brianc/node-postgres", repository: { type: "git", url: "git://github.com/brianc/node-postgres.git", directory: "packages/pg" }, author: "Brian Carlson <brian.m.carlson@gmail.com>", main: "./lib", dependencies: {
    "buffer-writer": "2.0.0",
    "packet-reader": "1.0.0",
    "pg-connection-string": "^2.5.0",
    "pg-pool": "^3.5.2",
    "pg-protocol": "^1.5.0",
    "pg-types": "^2.1.0",
    pgpass: "1.x"
  }, devDependencies: { async: "2.6.4", bluebird: "3.5.2", co: "4.6.0", "pg-copy-streams": "0.3.0" }, peerDependencies: { "pg-native": ">=3.0.1" }, peerDependenciesMeta: {
    "pg-native": { optional: true }
  }, scripts: { test: "make test-all" }, files: ["lib", "SPONSORS.md"], license: "MIT", engines: { node: ">= 8.0.0" }, gitHead: "c99fb2c127ddf8d712500db2c7b9a5491a178655" };
});
var Ws = I((wf, js) => {
  "use strict";
  p();
  var Qs = ge().EventEmitter, Bc = (Ge(), O(He)), xn = tt(), qe = js.exports = function(r, e, t) {
    Qs.call(this), r = xn.normalizeQueryConfig(r, e, t), this.text = r.text, this.values = r.values, this.name = r.name, this.callback = r.callback, this.state = "new", this._arrayMode = r.rowMode === "array", this._emitRowEvents = false, this.on("newListener", function(n) {
      n === "row" && (this._emitRowEvents = true);
    }.bind(this));
  };
  Bc.inherits(
    qe,
    Qs
  );
  var Lc = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
  qe.prototype.handleError = function(r) {
    var e = this.native.pq.resultErrorFields();
    if (e)
      for (var t in e) {
        var n = Lc[t] || t;
        r[n] = e[t];
      }
    this.callback ? this.callback(r) : this.emit("error", r), this.state = "error";
  };
  qe.prototype.then = function(r, e) {
    return this._getPromise().then(r, e);
  };
  qe.prototype.catch = function(r) {
    return this._getPromise().catch(r);
  };
  qe.prototype._getPromise = function() {
    return this._promise ? this._promise : (this._promise = new Promise(function(r, e) {
      this._once("end", r), this._once(
        "error",
        e
      );
    }.bind(this)), this._promise);
  };
  qe.prototype.submit = function(r) {
    this.state = "running";
    var e = this;
    this.native = r.native, r.native.arrayMode = this._arrayMode;
    var t = a(
      function(s, o, u) {
        if (r.native.arrayMode = false, x(function() {
          e.emit("_done");
        }), s)
          return e.handleError(s);
        e._emitRowEvents && (u.length > 1 ? o.forEach((c, h) => {
          c.forEach((l) => {
            e.emit(
              "row",
              l,
              u[h]
            );
          });
        }) : o.forEach(function(c) {
          e.emit("row", c, u);
        })), e.state = "end", e.emit(
          "end",
          u
        ), e.callback && e.callback(null, u);
      },
      "after"
    );
    if (m.domain && (t = m.domain.bind(
      t
    )), this.name) {
      this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error(
        "You supplied %s (%s)",
        this.name,
        this.name.length
      ), console.error("This can cause conflicts and silent errors executing queries"));
      var n = (this.values || []).map(xn.prepareValue);
      if (r.namedQueries[this.name]) {
        if (this.text && r.namedQueries[this.name] !== this.text) {
          let s = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return t(s);
        }
        return r.native.execute(this.name, n, t);
      }
      return r.native.prepare(
        this.name,
        this.text,
        n.length,
        function(s) {
          return s ? t(s) : (r.namedQueries[e.name] = e.text, e.native.execute(e.name, n, t));
        }
      );
    } else if (this.values) {
      if (!Array.isArray(this.values)) {
        let s = new Error("Query values must be an array");
        return t(s);
      }
      var i = this.values.map(xn.prepareValue);
      r.native.query(this.text, i, t);
    } else
      r.native.query(this.text, t);
  };
});
var Vs = I((Ef, $s) => {
  "use strict";
  p();
  var Rc = (Ns(), O(Os)), Fc = wt(), xf = qs(), Hs = ge().EventEmitter, Mc = (Ge(), O(He)), Dc = bt(), Gs = Ws(), J = $s.exports = function(r) {
    Hs.call(this), r = r || {}, this._Promise = r.Promise || S.Promise, this._types = new Fc(r.types), this.native = new Rc({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
    var e = this.connectionParameters = new Dc(
      r
    );
    this.user = e.user, Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: e.password
    }), this.database = e.database, this.host = e.host, this.port = e.port, this.namedQueries = {};
  };
  J.Query = Gs;
  Mc.inherits(J, Hs);
  J.prototype._errorAllQueries = function(r) {
    let e = a(
      (t) => {
        m.nextTick(() => {
          t.native = this.native, t.handleError(r);
        });
      },
      "enqueueError"
    );
    this._hasActiveQuery() && (e(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(e), this._queryQueue.length = 0;
  };
  J.prototype._connect = function(r) {
    var e = this;
    if (this._connecting) {
      m.nextTick(() => r(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(t, n) {
      if (t)
        return r(
          t
        );
      e.native.connect(n, function(i) {
        if (i)
          return e.native.end(), r(i);
        e._connected = true, e.native.on("error", function(s) {
          e._queryable = false, e._errorAllQueries(s), e.emit("error", s);
        }), e.native.on("notification", function(s) {
          e.emit("notification", { channel: s.relname, payload: s.extra });
        }), e.emit("connect"), e._pulseQueryQueue(true), r();
      });
    });
  };
  J.prototype.connect = function(r) {
    if (r) {
      this._connect(r);
      return;
    }
    return new this._Promise(
      (e, t) => {
        this._connect((n) => {
          n ? t(n) : e();
        });
      }
    );
  };
  J.prototype.query = function(r, e, t) {
    var n, i, s, o, u;
    if (r == null)
      throw new TypeError("Client was passed a null or undefined query");
    if (typeof r.submit == "function")
      s = r.query_timeout || this.connectionParameters.query_timeout, i = n = r, typeof e == "function" && (r.callback = e);
    else if (s = this.connectionParameters.query_timeout, n = new Gs(r, e, t), !n.callback) {
      let c, h;
      i = new this._Promise((l, d) => {
        c = l, h = d;
      }), n.callback = (l, d) => l ? h(l) : c(d);
    }
    return s && (u = n.callback, o = setTimeout(() => {
      var c = new Error("Query read timeout");
      m.nextTick(() => {
        n.handleError(c, this.connection);
      }), u(c), n.callback = () => {
      };
      var h = this._queryQueue.indexOf(n);
      h > -1 && this._queryQueue.splice(h, 1), this._pulseQueryQueue();
    }, s), n.callback = (c, h) => {
      clearTimeout(o), u(c, h);
    }), this._queryable ? this._ending ? (n.native = this.native, m.nextTick(() => {
      n.handleError(
        new Error("Client was closed and is not queryable")
      );
    }), i) : (this._queryQueue.push(
      n
    ), this._pulseQueryQueue(), i) : (n.native = this.native, m.nextTick(() => {
      n.handleError(
        new Error("Client has encountered a connection error and is not queryable")
      );
    }), i);
  };
  J.prototype.end = function(r) {
    var e = this;
    this._ending = true, this._connected || this.once(
      "connect",
      this.end.bind(this, r)
    );
    var t;
    return r || (t = new this._Promise(function(n, i) {
      r = a((s) => s ? i(s) : n(), "cb");
    })), this.native.end(function() {
      e._errorAllQueries(new Error(
        "Connection terminated"
      )), m.nextTick(() => {
        e.emit("end"), r && r();
      });
    }), t;
  };
  J.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  J.prototype._pulseQueryQueue = function(r) {
    if (this._connected && !this._hasActiveQuery()) {
      var e = this._queryQueue.shift();
      if (!e) {
        r || this.emit("drain");
        return;
      }
      this._activeQuery = e, e.submit(this);
      var t = this;
      e.once(
        "_done",
        function() {
          t._pulseQueryQueue();
        }
      );
    }
  };
  J.prototype.cancel = function(r) {
    this._activeQuery === r ? this.native.cancel(function() {
    }) : this._queryQueue.indexOf(r) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(r), 1);
  };
  J.prototype.ref = function() {
  };
  J.prototype.unref = function() {
  };
  J.prototype.setTypeParser = function(r, e, t) {
    return this._types.setTypeParser(r, e, t);
  };
  J.prototype.getTypeParser = function(r, e) {
    return this._types.getTypeParser(r, e);
  };
});
var En = I((Af, Ks) => {
  "use strict";
  p();
  Ks.exports = Vs();
});
var It = I((Tf, nt) => {
  "use strict";
  p();
  var kc = Fs(), Uc = et(), Oc = pn(), Nc = Us(), { DatabaseError: qc } = hn(), Qc = a((r) => {
    var e;
    return e = /* @__PURE__ */ __name(class extends Nc {
      constructor(n) {
        super(n, r);
      }
    }, "e"), a(e, "BoundPool"), e;
  }, "poolFactory"), vn = a(function(r) {
    this.defaults = Uc, this.Client = r, this.Query = this.Client.Query, this.Pool = Qc(this.Client), this._pools = [], this.Connection = Oc, this.types = Xe(), this.DatabaseError = qc;
  }, "PG");
  typeof m.env.NODE_PG_FORCE_NATIVE < "u" ? nt.exports = new vn(En()) : (nt.exports = new vn(kc), Object.defineProperty(nt.exports, "native", { configurable: true, enumerable: false, get() {
    var r = null;
    try {
      r = new vn(En());
    } catch (e) {
      if (e.code !== "MODULE_NOT_FOUND")
        throw e;
    }
    return Object.defineProperty(nt.exports, "native", { value: r }), r;
  } }));
});
p();
var Bt = Te(It());
St();
p();
St();
mr();
var Zs = Te(tt());
var Js = Te(wt());
function jc(r) {
  return r instanceof y ? "\\x" + r.toString("hex") : r;
}
__name(jc, "jc");
a(jc, "encodeBuffersAsBytea");
var Pt = /* @__PURE__ */ __name(class Pt2 extends Error {
  constructor(t) {
    super(t);
    _(
      this,
      "name",
      "NeonDbError"
    );
    _(this, "severity");
    _(this, "code");
    _(this, "detail");
    _(this, "hint");
    _(this, "position");
    _(this, "internalPosition");
    _(this, "internalQuery");
    _(this, "where");
    _(this, "schema");
    _(this, "table");
    _(this, "column");
    _(this, "dataType");
    _(
      this,
      "constraint"
    );
    _(this, "file");
    _(this, "line");
    _(this, "routine");
    _(this, "sourceError");
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Pt2);
  }
}, "Pt");
a(Pt, "NeonDbError");
var pe = Pt;
var zs = "transaction() expects an array of queries, or a function returning an array of queries";
var Wc = ["severity", "code", "detail", "hint", "position", "internalPosition", "internalQuery", "where", "schema", "table", "column", "dataType", "constraint", "file", "line", "routine"];
function Xs(r, {
  arrayMode: e,
  fullResults: t,
  fetchOptions: n,
  isolationLevel: i,
  readOnly: s,
  deferrable: o,
  queryCallback: u,
  resultCallback: c,
  authToken: h
} = {}) {
  if (!r)
    throw new Error("No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?");
  let l;
  try {
    l = yr(r);
  } catch {
    throw new Error("Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(r));
  }
  let { protocol: d, username: b, hostname: C, port: B, pathname: Q } = l;
  if (d !== "postgres:" && d !== "postgresql:" || !b || !C || !Q)
    throw new Error("Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value");
  function X(A, ...g) {
    let P, K;
    if (typeof A == "string")
      P = A, K = g[1], g = g[0] ?? [];
    else {
      P = "";
      for (let j = 0; j < A.length; j++)
        P += A[j], j < g.length && (P += "$" + (j + 1));
    }
    g = g.map((j) => jc((0, Zs.prepareValue)(j)));
    let k = {
      query: P,
      params: g
    };
    return u && u(k), Hc(de, k, K);
  }
  __name(X, "X");
  a(X, "resolve"), X.transaction = async (A, g) => {
    if (typeof A == "function" && (A = A(X)), !Array.isArray(A))
      throw new Error(zs);
    A.forEach(
      (k) => {
        if (k[Symbol.toStringTag] !== "NeonQueryPromise")
          throw new Error(zs);
      }
    );
    let P = A.map((k) => k.parameterizedQuery), K = A.map((k) => k.opts ?? {});
    return de(P, K, g);
  };
  async function de(A, g, P) {
    let { fetchEndpoint: K, fetchFunction: k } = _e, j = Array.isArray(A) ? { queries: A } : A, ee = n ?? {}, oe = e ?? false, R = t ?? false, $ = i, ce = s, ye = o;
    P !== void 0 && (P.fetchOptions !== void 0 && (ee = {
      ...ee,
      ...P.fetchOptions
    }), P.arrayMode !== void 0 && (oe = P.arrayMode), P.fullResults !== void 0 && (R = P.fullResults), P.isolationLevel !== void 0 && ($ = P.isolationLevel), P.readOnly !== void 0 && (ce = P.readOnly), P.deferrable !== void 0 && (ye = P.deferrable)), g !== void 0 && !Array.isArray(
      g
    ) && g.fetchOptions !== void 0 && (ee = { ...ee, ...g.fetchOptions });
    let Se = h;
    !Array.isArray(
      g
    ) && g?.authToken !== void 0 && (Se = g.authToken);
    let je = typeof K == "function" ? K(C, B, { jwtAuth: Se !== void 0 }) : K, he = { "Neon-Connection-String": r, "Neon-Raw-Text-Output": "true", "Neon-Array-Mode": "true" }, it = await Gc(Se);
    it && (he.Authorization = `Bearer ${it}`), Array.isArray(
      A
    ) && ($ !== void 0 && (he["Neon-Batch-Isolation-Level"] = $), ce !== void 0 && (he["Neon-Batch-Read-Only"] = String(ce)), ye !== void 0 && (he["Neon-Batch-Deferrable"] = String(ye)));
    let te;
    try {
      te = await (k ?? fetch)(je, {
        method: "POST",
        body: JSON.stringify(j),
        headers: he,
        ...ee
      });
    } catch (W) {
      let H = new pe(`Error connecting to database: ${W.message}`);
      throw H.sourceError = W, H;
    }
    if (te.ok) {
      let W = await te.json();
      if (Array.isArray(A)) {
        let H = W.results;
        if (!Array.isArray(H))
          throw new pe("Neon internal error: unexpected result format");
        return H.map((Ae, xe) => {
          let Lt = g[xe] ?? {}, ro = Lt.arrayMode ?? oe, no = Lt.fullResults ?? R;
          return Ys(Ae, {
            arrayMode: ro,
            fullResults: no,
            parameterizedQuery: A[xe],
            resultCallback: c,
            types: Lt.types
          });
        });
      } else {
        let H = g ?? {}, Ae = H.arrayMode ?? oe, xe = H.fullResults ?? R;
        return Ys(
          W,
          { arrayMode: Ae, fullResults: xe, parameterizedQuery: A, resultCallback: c, types: H.types }
        );
      }
    } else {
      let { status: W } = te;
      if (W === 400) {
        let H = await te.json(), Ae = new pe(H.message);
        for (let xe of Wc)
          Ae[xe] = H[xe] ?? void 0;
        throw Ae;
      } else {
        let H = await te.text();
        throw new pe(`Server error (HTTP status ${W}): ${H}`);
      }
    }
  }
  __name(de, "de");
  return a(de, "execute"), X;
}
__name(Xs, "Xs");
a(Xs, "neon");
function Hc(r, e, t) {
  return { [Symbol.toStringTag]: "NeonQueryPromise", parameterizedQuery: e, opts: t, then: a(
    (n, i) => r(e, t).then(n, i),
    "then"
  ), catch: a((n) => r(e, t).catch(n), "catch"), finally: a((n) => r(
    e,
    t
  ).finally(n), "finally") };
}
__name(Hc, "Hc");
a(Hc, "createNeonQueryPromise");
function Ys(r, {
  arrayMode: e,
  fullResults: t,
  parameterizedQuery: n,
  resultCallback: i,
  types: s
}) {
  let o = new Js.default(
    s
  ), u = r.fields.map((l) => l.name), c = r.fields.map((l) => o.getTypeParser(l.dataTypeID)), h = e === true ? r.rows.map((l) => l.map((d, b) => d === null ? null : c[b](d))) : r.rows.map((l) => Object.fromEntries(
    l.map((d, b) => [u[b], d === null ? null : c[b](d)])
  ));
  return i && i(n, r, h, { arrayMode: e, fullResults: t }), t ? (r.viaNeonFetch = true, r.rowAsArray = e, r.rows = h, r._parsers = c, r._types = o, r) : h;
}
__name(Ys, "Ys");
a(Ys, "processQueryResult");
async function Gc(r) {
  if (typeof r == "string")
    return r;
  if (typeof r == "function")
    try {
      return await Promise.resolve(r());
    } catch (e) {
      let t = new pe("Error getting auth token.");
      throw e instanceof Error && (t = new pe(`Error getting auth token: ${e.message}`)), t;
    }
}
__name(Gc, "Gc");
a(Gc, "getAuthToken");
var to = Te(bt());
var Qe = Te(It());
var An = /* @__PURE__ */ __name(class An2 extends Bt.Client {
  constructor(t) {
    super(t);
    this.config = t;
  }
  get neonConfig() {
    return this.connection.stream;
  }
  connect(t) {
    let { neonConfig: n } = this;
    n.forceDisablePgSSL && (this.ssl = this.connection.ssl = false), this.ssl && n.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
    let i = this.config?.host !== void 0 || this.config?.connectionString !== void 0 || m.env.PGHOST !== void 0, s = m.env.USER ?? m.env.USERNAME;
    if (!i && this.host === "localhost" && this.user === s && this.database === s && this.password === null)
      throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s}, db: ${s}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
    let o = super.connect(t), u = n.pipelineTLS && this.ssl, c = n.pipelineConnect === "password";
    if (!u && !n.pipelineConnect)
      return o;
    let h = this.connection;
    if (u && h.on("connect", () => h.stream.emit("data", "S")), c) {
      h.removeAllListeners(
        "authenticationCleartextPassword"
      ), h.removeAllListeners("readyForQuery"), h.once(
        "readyForQuery",
        () => h.on("readyForQuery", this._handleReadyForQuery.bind(this))
      );
      let l = this.ssl ? "sslconnect" : "connect";
      h.on(l, () => {
        this._handleAuthCleartextPassword(), this._handleReadyForQuery();
      });
    }
    return o;
  }
  async _handleAuthSASLContinue(t) {
    let n = this.saslSession, i = this.password, s = t.data;
    if (n.message !== "SASLInitialResponse" || typeof i != "string" || typeof s != "string")
      throw new Error("SASL: protocol error");
    let o = Object.fromEntries(s.split(",").map((te) => {
      if (!/^.=/.test(te))
        throw new Error("SASL: Invalid attribute pair entry");
      let W = te[0], H = te.substring(2);
      return [W, H];
    })), u = o.r, c = o.s, h = o.i;
    if (!u || !/^[!-+--~]+$/.test(u))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable");
    if (!c || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(c))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64");
    if (!h || !/^[1-9][0-9]*$/.test(h))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count");
    if (!u.startsWith(n.clientNonce))
      throw new Error(
        "SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce"
      );
    if (u.length === n.clientNonce.length)
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    let l = parseInt(h, 10), d = y.from(c, "base64"), b = new TextEncoder(), C = b.encode(i), B = await w.subtle.importKey("raw", C, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), Q = new Uint8Array(await w.subtle.sign("HMAC", B, y.concat([d, y.from(
      [0, 0, 0, 1]
    )]))), X = Q;
    for (var de = 0; de < l - 1; de++)
      Q = new Uint8Array(await w.subtle.sign(
        "HMAC",
        B,
        Q
      )), X = y.from(X.map((te, W) => X[W] ^ Q[W]));
    let A = X, g = await w.subtle.importKey(
      "raw",
      A,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), P = new Uint8Array(await w.subtle.sign("HMAC", g, b.encode("Client Key"))), K = await w.subtle.digest(
      "SHA-256",
      P
    ), k = "n=*,r=" + n.clientNonce, j = "r=" + u + ",s=" + c + ",i=" + l, ee = "c=biws,r=" + u, oe = k + "," + j + "," + ee, R = await w.subtle.importKey(
      "raw",
      K,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    var $ = new Uint8Array(await w.subtle.sign("HMAC", R, b.encode(oe))), ce = y.from(P.map((te, W) => P[W] ^ $[W])), ye = ce.toString("base64");
    let Se = await w.subtle.importKey(
      "raw",
      A,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), je = await w.subtle.sign(
      "HMAC",
      Se,
      b.encode("Server Key")
    ), he = await w.subtle.importKey("raw", je, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
    var it = y.from(await w.subtle.sign(
      "HMAC",
      he,
      b.encode(oe)
    ));
    n.message = "SASLResponse", n.serverSignature = it.toString("base64"), n.response = ee + ",p=" + ye, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
  }
}, "An");
a(An, "NeonClient");
var _n = An;
function $c(r, e) {
  if (e)
    return {
      callback: e,
      result: void 0
    };
  let t, n, i = a(function(o, u) {
    o ? t(o) : n(u);
  }, "cb"), s = new r(function(o, u) {
    n = o, t = u;
  });
  return { callback: i, result: s };
}
__name($c, "$c");
a($c, "promisify");
var Cn = /* @__PURE__ */ __name(class Cn2 extends Bt.Pool {
  constructor() {
    super(...arguments);
    _(this, "Client", _n);
    _(this, "hasFetchUnsupportedListeners", false);
  }
  on(t, n) {
    return t !== "error" && (this.hasFetchUnsupportedListeners = true), super.on(t, n);
  }
  query(t, n, i) {
    if (!_e.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof t == "function")
      return super.query(t, n, i);
    typeof n == "function" && (i = n, n = void 0);
    let s = $c(
      this.Promise,
      i
    );
    i = s.callback;
    try {
      let o = new to.default(this.options), u = encodeURIComponent, c = encodeURI, h = `postgresql://${u(o.user)}:${u(o.password)}@${u(o.host)}/${c(o.database)}`, l = typeof t == "string" ? t : t.text, d = n ?? t.values ?? [];
      Xs(h, { fullResults: true, arrayMode: t.rowMode === "array" })(l, d, { types: t.types ?? this.options?.types }).then((C) => i(void 0, C)).catch((C) => i(
        C
      ));
    } catch (o) {
      i(o);
    }
    return s.result;
  }
}, "Cn");
a(Cn, "NeonPool");
var eo = Cn;
var export_ClientBase = Qe.ClientBase;
var export_Connection = Qe.Connection;
var export_DatabaseError = Qe.DatabaseError;
var export_Query = Qe.Query;
var export_defaults = Qe.defaults;
var export_types = Qe.types;

// ../../node_modules/@prisma/driver-adapter-utils/dist/index.mjs
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var import_debug = __toESM(require_dist(), 1);
function ok(value) {
  return {
    ok: true,
    value,
    map(fn) {
      return ok(fn(value));
    },
    flatMap(fn) {
      return fn(value);
    }
  };
}
__name(ok, "ok");
function err(error) {
  return {
    ok: false,
    error,
    map() {
      return err(error);
    },
    flatMap() {
      return err(error);
    }
  };
}
__name(err, "err");
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};

// ../../node_modules/@prisma/adapter-neon/dist/index.mjs
var import_postgres_array = __toESM(require_postgres_array(), 1);
var name = "@prisma/adapter-neon";
var { builtins: ScalarColumnType, getTypeParser } = export_types;
var ArrayColumnType = {
  BIT_ARRAY: 1561,
  BOOL_ARRAY: 1e3,
  BYTEA_ARRAY: 1001,
  BPCHAR_ARRAY: 1014,
  CHAR_ARRAY: 1002,
  CIDR_ARRAY: 651,
  DATE_ARRAY: 1182,
  FLOAT4_ARRAY: 1021,
  FLOAT8_ARRAY: 1022,
  INET_ARRAY: 1041,
  INT2_ARRAY: 1005,
  INT4_ARRAY: 1007,
  INT8_ARRAY: 1016,
  JSONB_ARRAY: 3807,
  JSON_ARRAY: 199,
  MONEY_ARRAY: 791,
  NUMERIC_ARRAY: 1231,
  OID_ARRAY: 1028,
  TEXT_ARRAY: 1009,
  TIMESTAMP_ARRAY: 1115,
  TIME_ARRAY: 1183,
  UUID_ARRAY: 2951,
  VARBIT_ARRAY: 1563,
  VARCHAR_ARRAY: 1015,
  XML_ARRAY: 143
};
var _UnsupportedNativeDataType = /* @__PURE__ */ __name(class _UnsupportedNativeDataType2 extends Error {
  constructor(code) {
    super();
    this.type = _UnsupportedNativeDataType2.typeNames[code] || "Unknown";
    this.message = `Unsupported column type ${this.type}`;
  }
}, "_UnsupportedNativeDataType");
_UnsupportedNativeDataType.typeNames = {
  16: "bool",
  17: "bytea",
  18: "char",
  19: "name",
  20: "int8",
  21: "int2",
  22: "int2vector",
  23: "int4",
  24: "regproc",
  25: "text",
  26: "oid",
  27: "tid",
  28: "xid",
  29: "cid",
  30: "oidvector",
  32: "pg_ddl_command",
  71: "pg_type",
  75: "pg_attribute",
  81: "pg_proc",
  83: "pg_class",
  114: "json",
  142: "xml",
  194: "pg_node_tree",
  269: "table_am_handler",
  325: "index_am_handler",
  600: "point",
  601: "lseg",
  602: "path",
  603: "box",
  604: "polygon",
  628: "line",
  650: "cidr",
  700: "float4",
  701: "float8",
  705: "unknown",
  718: "circle",
  774: "macaddr8",
  790: "money",
  829: "macaddr",
  869: "inet",
  1033: "aclitem",
  1042: "bpchar",
  1043: "varchar",
  1082: "date",
  1083: "time",
  1114: "timestamp",
  1184: "timestamptz",
  1186: "interval",
  1266: "timetz",
  1560: "bit",
  1562: "varbit",
  1700: "numeric",
  1790: "refcursor",
  2202: "regprocedure",
  2203: "regoper",
  2204: "regoperator",
  2205: "regclass",
  2206: "regtype",
  2249: "record",
  2275: "cstring",
  2276: "any",
  2277: "anyarray",
  2278: "void",
  2279: "trigger",
  2280: "language_handler",
  2281: "internal",
  2283: "anyelement",
  2287: "_record",
  2776: "anynonarray",
  2950: "uuid",
  2970: "txid_snapshot",
  3115: "fdw_handler",
  3220: "pg_lsn",
  3310: "tsm_handler",
  3361: "pg_ndistinct",
  3402: "pg_dependencies",
  3500: "anyenum",
  3614: "tsvector",
  3615: "tsquery",
  3642: "gtsvector",
  3734: "regconfig",
  3769: "regdictionary",
  3802: "jsonb",
  3831: "anyrange",
  3838: "event_trigger",
  3904: "int4range",
  3906: "numrange",
  3908: "tsrange",
  3910: "tstzrange",
  3912: "daterange",
  3926: "int8range",
  4072: "jsonpath",
  4089: "regnamespace",
  4096: "regrole",
  4191: "regcollation",
  4451: "int4multirange",
  4532: "nummultirange",
  4533: "tsmultirange",
  4534: "tstzmultirange",
  4535: "datemultirange",
  4536: "int8multirange",
  4537: "anymultirange",
  4538: "anycompatiblemultirange",
  4600: "pg_brin_bloom_summary",
  4601: "pg_brin_minmax_multi_summary",
  5017: "pg_mcv_list",
  5038: "pg_snapshot",
  5069: "xid8",
  5077: "anycompatible",
  5078: "anycompatiblearray",
  5079: "anycompatiblenonarray",
  5080: "anycompatiblerange"
};
var UnsupportedNativeDataType = _UnsupportedNativeDataType;
function fieldToColumnType(fieldTypeId) {
  switch (fieldTypeId) {
    case ScalarColumnType.INT2:
    case ScalarColumnType.INT4:
      return ColumnTypeEnum.Int32;
    case ScalarColumnType.INT8:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.FLOAT4:
      return ColumnTypeEnum.Float;
    case ScalarColumnType.FLOAT8:
      return ColumnTypeEnum.Double;
    case ScalarColumnType.BOOL:
      return ColumnTypeEnum.Boolean;
    case ScalarColumnType.DATE:
      return ColumnTypeEnum.Date;
    case ScalarColumnType.TIME:
    case ScalarColumnType.TIMETZ:
      return ColumnTypeEnum.Time;
    case ScalarColumnType.TIMESTAMP:
    case ScalarColumnType.TIMESTAMPTZ:
      return ColumnTypeEnum.DateTime;
    case ScalarColumnType.NUMERIC:
    case ScalarColumnType.MONEY:
      return ColumnTypeEnum.Numeric;
    case ScalarColumnType.JSON:
    case ScalarColumnType.JSONB:
      return ColumnTypeEnum.Json;
    case ScalarColumnType.UUID:
      return ColumnTypeEnum.Uuid;
    case ScalarColumnType.OID:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.BPCHAR:
    case ScalarColumnType.TEXT:
    case ScalarColumnType.VARCHAR:
    case ScalarColumnType.BIT:
    case ScalarColumnType.VARBIT:
    case ScalarColumnType.INET:
    case ScalarColumnType.CIDR:
    case ScalarColumnType.XML:
      return ColumnTypeEnum.Text;
    case ScalarColumnType.BYTEA:
      return ColumnTypeEnum.Bytes;
    case ArrayColumnType.INT2_ARRAY:
    case ArrayColumnType.INT4_ARRAY:
      return ColumnTypeEnum.Int32Array;
    case ArrayColumnType.FLOAT4_ARRAY:
      return ColumnTypeEnum.FloatArray;
    case ArrayColumnType.FLOAT8_ARRAY:
      return ColumnTypeEnum.DoubleArray;
    case ArrayColumnType.NUMERIC_ARRAY:
    case ArrayColumnType.MONEY_ARRAY:
      return ColumnTypeEnum.NumericArray;
    case ArrayColumnType.BOOL_ARRAY:
      return ColumnTypeEnum.BooleanArray;
    case ArrayColumnType.CHAR_ARRAY:
      return ColumnTypeEnum.CharacterArray;
    case ArrayColumnType.BPCHAR_ARRAY:
    case ArrayColumnType.TEXT_ARRAY:
    case ArrayColumnType.VARCHAR_ARRAY:
    case ArrayColumnType.VARBIT_ARRAY:
    case ArrayColumnType.BIT_ARRAY:
    case ArrayColumnType.INET_ARRAY:
    case ArrayColumnType.CIDR_ARRAY:
    case ArrayColumnType.XML_ARRAY:
      return ColumnTypeEnum.TextArray;
    case ArrayColumnType.DATE_ARRAY:
      return ColumnTypeEnum.DateArray;
    case ArrayColumnType.TIME_ARRAY:
      return ColumnTypeEnum.TimeArray;
    case ArrayColumnType.TIMESTAMP_ARRAY:
      return ColumnTypeEnum.DateTimeArray;
    case ArrayColumnType.JSON_ARRAY:
    case ArrayColumnType.JSONB_ARRAY:
      return ColumnTypeEnum.JsonArray;
    case ArrayColumnType.BYTEA_ARRAY:
      return ColumnTypeEnum.BytesArray;
    case ArrayColumnType.UUID_ARRAY:
      return ColumnTypeEnum.UuidArray;
    case ArrayColumnType.INT8_ARRAY:
    case ArrayColumnType.OID_ARRAY:
      return ColumnTypeEnum.Int64Array;
    default:
      if (fieldTypeId >= 1e4) {
        return ColumnTypeEnum.Text;
      }
      throw new UnsupportedNativeDataType(fieldTypeId);
  }
}
__name(fieldToColumnType, "fieldToColumnType");
function normalize_array(element_normalizer) {
  return (str) => (0, import_postgres_array.parse)(str, element_normalizer);
}
__name(normalize_array, "normalize_array");
function normalize_numeric(numeric) {
  return numeric;
}
__name(normalize_numeric, "normalize_numeric");
function normalize_date(date) {
  return date;
}
__name(normalize_date, "normalize_date");
function normalize_timestamp(time2) {
  return time2;
}
__name(normalize_timestamp, "normalize_timestamp");
function normalize_timestampz(time2) {
  return time2.split("+")[0];
}
__name(normalize_timestampz, "normalize_timestampz");
function normalize_time(time2) {
  return time2;
}
__name(normalize_time, "normalize_time");
function normalize_timez(time2) {
  return time2.split("+")[0];
}
__name(normalize_timez, "normalize_timez");
function normalize_money(money) {
  return money.slice(1);
}
__name(normalize_money, "normalize_money");
function normalize_xml(xml) {
  return xml;
}
__name(normalize_xml, "normalize_xml");
function toJson(json) {
  return json;
}
__name(toJson, "toJson");
function encodeBuffer(buffer) {
  return Array.from(new Uint8Array(buffer));
}
__name(encodeBuffer, "encodeBuffer");
var parsePgBytes = getTypeParser(ScalarColumnType.BYTEA);
var parseBytesArray = getTypeParser(ArrayColumnType.BYTEA_ARRAY);
function normalizeByteaArray(serializedBytesArray) {
  const buffers = parseBytesArray(serializedBytesArray);
  return buffers.map((buf) => buf ? encodeBuffer(buf) : null);
}
__name(normalizeByteaArray, "normalizeByteaArray");
function convertBytes(serializedBytes) {
  const buffer = parsePgBytes(serializedBytes);
  return encodeBuffer(buffer);
}
__name(convertBytes, "convertBytes");
function normalizeBit(bit) {
  return bit;
}
__name(normalizeBit, "normalizeBit");
var customParsers = {
  [ScalarColumnType.NUMERIC]: normalize_numeric,
  [ArrayColumnType.NUMERIC_ARRAY]: normalize_array(normalize_numeric),
  [ScalarColumnType.TIME]: normalize_time,
  [ArrayColumnType.TIME_ARRAY]: normalize_array(normalize_time),
  [ScalarColumnType.TIMETZ]: normalize_timez,
  [ScalarColumnType.DATE]: normalize_date,
  [ArrayColumnType.DATE_ARRAY]: normalize_array(normalize_date),
  [ScalarColumnType.TIMESTAMP]: normalize_timestamp,
  [ArrayColumnType.TIMESTAMP_ARRAY]: normalize_array(normalize_timestamp),
  [ScalarColumnType.TIMESTAMPTZ]: normalize_timestampz,
  [ScalarColumnType.MONEY]: normalize_money,
  [ArrayColumnType.MONEY_ARRAY]: normalize_array(normalize_money),
  [ScalarColumnType.JSON]: toJson,
  [ScalarColumnType.JSONB]: toJson,
  [ScalarColumnType.BYTEA]: convertBytes,
  [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
  [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
};
function fixArrayBufferValues(values) {
  for (let i = 0; i < values.length; i++) {
    const list = values[i];
    if (!Array.isArray(list)) {
      continue;
    }
    for (let j = 0; j < list.length; j++) {
      const listItem = list[j];
      if (ArrayBuffer.isView(listItem)) {
        list[j] = Buffer.from(listItem.buffer, listItem.byteOffset, listItem.byteLength);
      }
    }
  }
  return values;
}
__name(fixArrayBufferValues, "fixArrayBufferValues");
var debug = (0, import_debug.Debug)("prisma:driver-adapter:neon");
var NeonQueryable = /* @__PURE__ */ __name(class {
  constructor() {
    this.provider = "postgres";
    this.adapterName = name;
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug(`${tag} %O`, query);
    const res = await this.performIO(query);
    if (!res.ok) {
      return err(res.error);
    }
    const { fields, rows } = res.value;
    const columnNames = fields.map((field) => field.name);
    let columnTypes = [];
    try {
      columnTypes = fields.map((field) => fieldToColumnType(field.dataTypeID));
    } catch (e) {
      if (e instanceof UnsupportedNativeDataType) {
        return err({
          kind: "UnsupportedNativeDataType",
          type: e.type
        });
      }
      throw e;
    }
    return ok({
      columnNames,
      columnTypes,
      rows
    });
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug(`${tag} %O`, query);
    return (await this.performIO(query)).map((r) => r.rowCount ?? 0);
  }
}, "NeonQueryable");
var NeonWsQueryable = /* @__PURE__ */ __name(class extends NeonQueryable {
  constructor(client) {
    super();
    this.client = client;
  }
  async performIO(query) {
    const { sql, args: values } = query;
    try {
      const result = await this.client.query(
        {
          text: sql,
          values: fixArrayBufferValues(values),
          rowMode: "array",
          types: {
            // This is the error expected:
            // No overload matches this call.
            // The last overload gave the following error.
            //   Type '(oid: number, format?: any) => (json: string) => unknown' is not assignable to type '{ <T>(oid: number): TypeParser<string, string | T>; <T>(oid: number, format: "text"): TypeParser<string, string | T>; <T>(oid: number, format: "binary"): TypeParser<...>; }'.
            //     Type '(json: string) => unknown' is not assignable to type 'TypeParser<Buffer, any>'.
            //       Types of parameters 'json' and 'value' are incompatible.
            //         Type 'Buffer' is not assignable to type 'string'.ts(2769)
            //
            // Because pg-types types expect us to handle both binary and text protocol versions,
            // where as far we can see, pg will ever pass only text version.
            //
            // @ts-expect-error
            getTypeParser: (oid, format) => {
              if (format === "text" && customParsers[oid]) {
                return customParsers[oid];
              }
              return export_types.getTypeParser(oid, format);
            }
          }
        },
        fixArrayBufferValues(values)
      );
      return ok(result);
    } catch (e) {
      debug("Error in performIO: %O", e);
      if (e && typeof e.code === "string" && typeof e.severity === "string" && typeof e.message === "string") {
        return err({
          kind: "Postgres",
          code: e.code,
          severity: e.severity,
          message: e.message,
          detail: e.detail,
          column: e.column,
          hint: e.hint
        });
      }
      throw e;
    }
  }
}, "NeonWsQueryable");
var NeonTransaction = /* @__PURE__ */ __name(class extends NeonWsQueryable {
  constructor(client, options) {
    super(client);
    this.options = options;
  }
  async commit() {
    debug(`[js::commit]`);
    this.client.release();
    return Promise.resolve(ok(void 0));
  }
  async rollback() {
    debug(`[js::rollback]`);
    this.client.release();
    return Promise.resolve(ok(void 0));
  }
}, "NeonTransaction");
var NeonTransactionContext = /* @__PURE__ */ __name(class extends NeonWsQueryable {
  constructor(conn) {
    super(conn);
    this.conn = conn;
  }
  async startTransaction() {
    const options = {
      usePhantomQuery: false
    };
    const tag = "[js::startTransaction]";
    debug("%s options: %O", tag, options);
    return ok(new NeonTransaction(this.conn, options));
  }
}, "NeonTransactionContext");
var PrismaNeon = /* @__PURE__ */ __name(class extends NeonWsQueryable {
  constructor(pool, options) {
    if (!(pool instanceof eo)) {
      throw new TypeError(`PrismaNeon must be initialized with an instance of Pool:
import { Pool } from '@neondatabase/serverless'
const pool = new Pool({ connectionString: url })
const adapter = new PrismaNeon(pool)
`);
    }
    super(pool);
    this.options = options;
    this.isRunning = true;
  }
  getConnectionInfo() {
    return ok({
      schemaName: this.options?.schema
    });
  }
  async transactionContext() {
    const conn = await this.client.connect();
    return ok(new NeonTransactionContext(conn));
  }
  async close() {
    if (this.isRunning) {
      await this.client.end();
      this.isRunning = false;
    }
    return ok(void 0);
  }
}, "PrismaNeon");

// src/utils/prisma.ts
function getPrisma(env) {
  try {
    const pool = new eo({ connectionString: env.DATABASE_URL });
    const adapter = new PrismaNeon(pool);
    return new import_client.PrismaClient({ adapter });
  } catch (error) {
    console.error("Error creating Prisma client:", error);
    throw error;
  }
}
__name(getPrisma, "getPrisma");

// src/routes/auth.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/middleware/jwt/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/utils/jwt/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/utils/jwt/jwt.js
var jwt_exports = {};
__export(jwt_exports, {
  decode: () => decode,
  sign: () => sign,
  verify: () => verify
});
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/hono/dist/utils/encode.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var decodeBase64Url = /* @__PURE__ */ __name((str) => {
  return decodeBase64(str.replace(/_|-/g, (m2) => ({ _: "/", "-": "+" })[m2] ?? m2));
}, "decodeBase64Url");
var encodeBase64Url = /* @__PURE__ */ __name((buf) => encodeBase64(buf).replace(/\/|\+/g, (m2) => ({ "/": "_", "+": "-" })[m2] ?? m2), "encodeBase64Url");
var encodeBase64 = /* @__PURE__ */ __name((buf) => {
  let binary = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}, "encodeBase64");
var decodeBase64 = /* @__PURE__ */ __name((str) => {
  const binary = atob(str);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  const half = binary.length / 2;
  for (let i = 0, j = binary.length - 1; i <= half; i++, j--) {
    bytes[i] = binary.charCodeAt(i);
    bytes[j] = binary.charCodeAt(j);
  }
  return bytes;
}, "decodeBase64");

// ../../node_modules/hono/dist/utils/jwt/types.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var JwtAlgorithmNotImplemented = /* @__PURE__ */ __name(class extends Error {
  constructor(alg) {
    super(`${alg} is not an implemented algorithm`);
    this.name = "JwtAlgorithmNotImplemented";
  }
}, "JwtAlgorithmNotImplemented");
var JwtTokenInvalid = /* @__PURE__ */ __name(class extends Error {
  constructor(token) {
    super(`invalid JWT token: ${token}`);
    this.name = "JwtTokenInvalid";
  }
}, "JwtTokenInvalid");
var JwtTokenNotBefore = /* @__PURE__ */ __name(class extends Error {
  constructor(token) {
    super(`token (${token}) is being used before it's valid`);
    this.name = "JwtTokenNotBefore";
  }
}, "JwtTokenNotBefore");
var JwtTokenExpired = /* @__PURE__ */ __name(class extends Error {
  constructor(token) {
    super(`token (${token}) expired`);
    this.name = "JwtTokenExpired";
  }
}, "JwtTokenExpired");
var JwtTokenIssuedAt = /* @__PURE__ */ __name(class extends Error {
  constructor(currentTimestamp, iat) {
    super(`Incorrect "iat" claim must be a older than "${currentTimestamp}" (iat: "${iat}")`);
    this.name = "JwtTokenIssuedAt";
  }
}, "JwtTokenIssuedAt");
var JwtTokenSignatureMismatched = /* @__PURE__ */ __name(class extends Error {
  constructor(token) {
    super(`token(${token}) signature mismatched`);
    this.name = "JwtTokenSignatureMismatched";
  }
}, "JwtTokenSignatureMismatched");

// ../../node_modules/hono/dist/utils/jwt/jwt.js
var utf8Encoder = new TextEncoder();
var utf8Decoder = new TextDecoder();
var encodeJwtPart = /* @__PURE__ */ __name((part) => encodeBase64Url(utf8Encoder.encode(JSON.stringify(part))).replace(/=/g, ""), "encodeJwtPart");
var encodeSignaturePart = /* @__PURE__ */ __name((buf) => encodeBase64Url(buf).replace(/=/g, ""), "encodeSignaturePart");
var decodeJwtPart = /* @__PURE__ */ __name((part) => JSON.parse(utf8Decoder.decode(decodeBase64Url(part))), "decodeJwtPart");
var param = /* @__PURE__ */ __name((name2) => {
  switch (name2.toUpperCase()) {
    case "HS256":
      return {
        name: "HMAC",
        hash: {
          name: "SHA-256"
        }
      };
    case "HS384":
      return {
        name: "HMAC",
        hash: {
          name: "SHA-384"
        }
      };
    case "HS512":
      return {
        name: "HMAC",
        hash: {
          name: "SHA-512"
        }
      };
    default:
      throw new JwtAlgorithmNotImplemented(name2);
  }
}, "param");
var signing = /* @__PURE__ */ __name(async (data, secret, alg = "HS256") => {
  if (!crypto.subtle || !crypto.subtle.importKey) {
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  }
  const utf8Encoder2 = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    utf8Encoder2.encode(secret),
    param(alg),
    false,
    [
      "sign"
      /* Sign */
    ]
  );
  return await crypto.subtle.sign(param(alg), cryptoKey, utf8Encoder2.encode(data));
}, "signing");
var sign = /* @__PURE__ */ __name(async (payload, secret, alg = "HS256") => {
  const encodedPayload = encodeJwtPart(payload);
  const encodedHeader = encodeJwtPart({ alg, typ: "JWT" });
  const partialToken = `${encodedHeader}.${encodedPayload}`;
  const signaturePart = await signing(partialToken, secret, alg);
  const signature = encodeSignaturePart(signaturePart);
  return `${partialToken}.${signature}`;
}, "sign");
var verify = /* @__PURE__ */ __name(async (token, secret, alg = "HS256") => {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    throw new JwtTokenInvalid(token);
  }
  const { payload } = decode(token);
  const now = Math.floor(Date.now() / 1e3);
  if (payload.nbf && payload.nbf > now) {
    throw new JwtTokenNotBefore(token);
  }
  if (payload.exp && payload.exp <= now) {
    throw new JwtTokenExpired(token);
  }
  if (payload.iat && now < payload.iat) {
    throw new JwtTokenIssuedAt(now, payload.iat);
  }
  const signaturePart = tokenParts.slice(0, 2).join(".");
  const signature = await signing(signaturePart, secret, alg);
  const encodedSignature = encodeSignaturePart(signature);
  if (encodedSignature !== tokenParts[2]) {
    throw new JwtTokenSignatureMismatched(token);
  }
  return payload;
}, "verify");
var decode = /* @__PURE__ */ __name((token) => {
  try {
    const [h, p2] = token.split(".");
    const header = decodeJwtPart(h);
    const payload = decodeJwtPart(p2);
    return {
      header,
      payload
    };
  } catch (e) {
    throw new JwtTokenInvalid(token);
  }
}, "decode");

// ../../node_modules/hono/dist/middleware/jwt/index.js
var verify2 = jwt_exports.verify;
var decode2 = jwt_exports.decode;
var sign2 = jwt_exports.sign;

// ../../node_modules/zod/index.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/zod/v3/errors.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/zod/v3/locales/en.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/zod/v3/ZodError.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/zod/v3/helpers/util.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var util;
(function(util2) {
  util2.assertEqual = (_2) => {
  };
  function assertIs(_arg) {
  }
  __name(assertIs, "assertIs");
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  __name(assertNever, "assertNever");
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  __name(joinValues, "joinValues");
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_2, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = /* @__PURE__ */ __name((data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
}, "getParsedType");

// ../../node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = /* @__PURE__ */ __name((obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
}, "quotelessJson");
var ZodError = class extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = /* @__PURE__ */ __name((error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    }, "processError");
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
__name(ZodError, "ZodError");
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../../node_modules/zod/v3/locales/en.js
var errorMap = /* @__PURE__ */ __name((issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
}, "errorMap");
var en_default = errorMap;

// ../../node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
__name(setErrorMap, "setErrorMap");
function getErrorMap() {
  return overrideErrorMap;
}
__name(getErrorMap, "getErrorMap");

// ../../node_modules/zod/v3/helpers/parseUtil.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var makeIssue = /* @__PURE__ */ __name((params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m2) => !!m2).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
}, "makeIssue");
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x2) => !!x2)
  });
  ctx.common.issues.push(issue);
}
__name(addIssueToContext, "addIssueToContext");
var ParseStatus = class {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
__name(ParseStatus, "ParseStatus");
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = /* @__PURE__ */ __name((value) => ({ status: "dirty", value }), "DIRTY");
var OK = /* @__PURE__ */ __name((value) => ({ status: "valid", value }), "OK");
var isAborted = /* @__PURE__ */ __name((x2) => x2.status === "aborted", "isAborted");
var isDirty = /* @__PURE__ */ __name((x2) => x2.status === "dirty", "isDirty");
var isValid = /* @__PURE__ */ __name((x2) => x2.status === "valid", "isValid");
var isAsync = /* @__PURE__ */ __name((x2) => typeof Promise !== "undefined" && x2 instanceof Promise, "isAsync");

// ../../node_modules/zod/v3/types.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();

// ../../node_modules/zod/v3/helpers/errorUtil.js
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// ../../node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
__name(ParseInputLazyPath, "ParseInputLazyPath");
var handleResult = /* @__PURE__ */ __name((ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
}, "handleResult");
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = /* @__PURE__ */ __name((iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  }, "customMap");
  return { errorMap: customMap, description };
}
__name(processCreateParams, "processCreateParams");
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err2) {
        if (err2?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = /* @__PURE__ */ __name((val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    }, "getIssueProperties");
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = /* @__PURE__ */ __name(() => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      }), "setError");
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
__name(ZodType, "ZodType");
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
__name(timeRegexSource, "timeRegexSource");
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
__name(timeRegex, "timeRegex");
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
__name(datetimeRegex, "datetimeRegex");
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
__name(isValidIP, "isValidIP");
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
__name(isValidJWT, "isValidJWT");
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
__name(isValidCidr, "isValidCidr");
var ZodString = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
__name(ZodString, "ZodString");
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
__name(floatSafeRemainder, "floatSafeRemainder");
var ZodNumber = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
__name(ZodNumber, "ZodNumber");
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
__name(ZodBigInt, "ZodBigInt");
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodBoolean, "ZodBoolean");
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
__name(ZodDate, "ZodDate");
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodSymbol, "ZodSymbol");
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodUndefined, "ZodUndefined");
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodNull, "ZodNull");
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
__name(ZodAny, "ZodAny");
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
__name(ZodUnknown, "ZodUnknown");
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
__name(ZodNever, "ZodNever");
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
__name(ZodVoid, "ZodVoid");
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
__name(ZodArray, "ZodArray");
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
__name(deepPartialify, "deepPartialify");
var ZodObject = class extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
__name(ZodObject, "ZodObject");
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    __name(handleResults, "handleResults");
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
__name(ZodUnion, "ZodUnion");
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = /* @__PURE__ */ __name((type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
}, "getDiscriminator");
var ZodDiscriminatedUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
__name(ZodDiscriminatedUnion, "ZodDiscriminatedUnion");
function mergeValues(a2, b) {
  const aType = getParsedType(a2);
  const bType = getParsedType(b);
  if (a2 === b) {
    return { valid: true, data: a2 };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a2).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a2, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a2[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a2.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a2.length; index++) {
      const itemA = a2[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a2 === +b) {
    return { valid: true, data: a2 };
  } else {
    return { valid: false };
  }
}
__name(mergeValues, "mergeValues");
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = /* @__PURE__ */ __name((parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    }, "handleParsed");
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
__name(ZodIntersection, "ZodIntersection");
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x2) => !!x2);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
};
__name(ZodTuple, "ZodTuple");
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
__name(ZodRecord, "ZodRecord");
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
__name(ZodMap, "ZodMap");
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    __name(finalizeSet, "finalizeSet");
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
__name(ZodSet, "ZodSet");
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x2) => !!x2),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    __name(makeArgsIssue, "makeArgsIssue");
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x2) => !!x2),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    __name(makeReturnsIssue, "makeReturnsIssue");
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
__name(ZodFunction, "ZodFunction");
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
__name(ZodLazy, "ZodLazy");
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
__name(ZodLiteral, "ZodLiteral");
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
__name(createZodEnum, "createZodEnum");
var ZodEnum = class extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
__name(ZodEnum, "ZodEnum");
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
__name(ZodNativeEnum, "ZodNativeEnum");
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
__name(ZodPromise, "ZodPromise");
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = /* @__PURE__ */ __name((acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      }, "executeRefinement");
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
__name(ZodEffects, "ZodEffects");
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
__name(ZodOptional, "ZodOptional");
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
__name(ZodNullable, "ZodNullable");
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
__name(ZodDefault, "ZodDefault");
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
__name(ZodCatch, "ZodCatch");
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
__name(ZodNaN, "ZodNaN");
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
__name(ZodBranded, "ZodBranded");
var ZodPipeline = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = /* @__PURE__ */ __name(async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      }, "handleAsync");
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a2, b) {
    return new ZodPipeline({
      in: a2,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
__name(ZodPipeline, "ZodPipeline");
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = /* @__PURE__ */ __name((data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    }, "freeze");
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
__name(ZodReadonly, "ZodReadonly");
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p2 = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p22 = typeof p2 === "string" ? { message: p2 } : p2;
  return p22;
}
__name(cleanParams, "cleanParams");
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
__name(custom, "custom");
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = /* @__PURE__ */ __name((cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params), "instanceOfType");
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = /* @__PURE__ */ __name(() => stringType().optional(), "ostring");
var onumber = /* @__PURE__ */ __name(() => numberType().optional(), "onumber");
var oboolean = /* @__PURE__ */ __name(() => booleanType().optional(), "oboolean");
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;

// src/utils/crypto.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${saltHex}:${hashHex}`;
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, hash) {
  try {
    const [saltHex, storedHash] = hash.split(":");
    if (!saltHex || !storedHash)
      return false;
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log(hashHex, storedHash);
    return hashHex === storedHash;
  } catch (error) {
    return false;
  }
}
__name(verifyPassword, "verifyPassword");

// src/middleware/auth.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
async function authMiddleware(c, next) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const token = authHeader.substring(7);
  const jwtSecret = c.env.JWT_SECRET;
  try {
    const payload = await verify2(token, jwtSecret);
    c.set("user", payload);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
}
__name(authMiddleware, "authMiddleware");
function adminOnly(c, next) {
  const user = c.get("user");
  if (user.role !== "ADMIN") {
    return c.json({ error: "Forbidden - Admin only" }, 403);
  }
  return next();
}
__name(adminOnly, "adminOnly");

// src/routes/auth.ts
var loginSchema = external_exports.object({
  mobile: external_exports.string().min(10).max(10),
  password: external_exports.string().min(6)
});
var changePasswordSchema = external_exports.object({
  currentPassword: external_exports.string(),
  newPassword: external_exports.string().min(6),
  confirmPassword: external_exports.string().min(6)
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
var auth = new Hono2();
auth.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const { mobile, password } = loginSchema.parse(body);
    const prisma = getPrisma(c.env);
    const user = await prisma.user.findUnique({
      where: { mobile }
    });
    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    const isValid2 = await verifyPassword(password, user.passwordHash);
    if (!isValid2) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    const token = await sign2(
      {
        id: user.id,
        role: user.role,
        mobile: user.mobile
      },
      c.env.JWT_SECRET,
      "HS256"
    );
    return c.json({
      token,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        address: user.address,
        displayPictureUrl: user.displayPictureUrl
      }
    });
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Login failed" }, 500);
  }
});
auth.get("/me", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const prisma = getPrisma(c.env);
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        role: true,
        name: true,
        mobile: true,
        email: true,
        address: true,
        displayPictureUrl: true,
        createdAt: true
      }
    });
    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json({ user: userData });
  } catch (error) {
    return c.json({ error: error.message || "Failed to fetch user" }, 500);
  }
});
auth.post("/change-password", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { currentPassword, newPassword } = changePasswordSchema.parse(body);
    const prisma = getPrisma(c.env);
    const userData = await prisma.user.findUnique({
      where: { id: user.id }
    });
    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }
    const isValid2 = await verifyPassword(
      currentPassword,
      userData.passwordHash
    );
    if (!isValid2) {
      return c.json({ error: "Current password is incorrect" }, 400);
    }
    const newHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newHash }
    });
    return c.json({ message: "Password changed successfully" });
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to change password" }, 500);
  }
});
var auth_default = auth;

// src/routes/users.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var userSchema = external_exports.object({
  name: external_exports.string().min(1),
  mobile: external_exports.string().length(10),
  email: external_exports.string().email(),
  address: external_exports.string().optional(),
  displayPictureUrl: external_exports.string().url().optional(),
  password: external_exports.string().min(6).optional()
});
var updateUserSchema = userSchema.partial();
var users = new Hono2().basePath("/users");
users.get("/", authMiddleware, adminOnly, async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const users2 = await prisma.user.findMany({
      select: {
        id: true,
        role: true,
        name: true,
        mobile: true,
        email: true,
        address: true,
        displayPictureUrl: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });
    return c.json({ users: users2 });
  } catch (error) {
    return c.json({ error: error.message || "Failed to fetch users" }, 500);
  }
});
users.post("/", authMiddleware, adminOnly, async (c) => {
  try {
    const body = await c.req.json();
    const data = userSchema.parse(body);
    const prisma = getPrisma(c.env);
    const existing = await prisma.user.findUnique({
      where: { mobile: data.mobile }
    });
    if (existing) {
      return c.json({ error: "Mobile number already exists" }, 400);
    }
    const passwordHash = data.password ? await hashPassword(data.password) : await hashPassword("Default@123");
    const user = await prisma.user.create({
      data: {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        displayPictureUrl: data.displayPictureUrl,
        passwordHash,
        role: "EMPLOYEE"
      },
      select: {
        id: true,
        role: true,
        name: true,
        mobile: true,
        email: true,
        address: true,
        displayPictureUrl: true,
        createdAt: true
      }
    });
    return c.json({ user }, 201);
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to create user" }, 500);
  }
});
users.put("/:id", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const data = updateUserSchema.parse(body);
    const prisma = getPrisma(c.env);
    const updateData = { ...data };
    if (data.password) {
      updateData.passwordHash = await hashPassword(data.password);
      delete updateData.password;
    }
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        role: true,
        name: true,
        mobile: true,
        email: true,
        address: true,
        displayPictureUrl: true,
        createdAt: true
      }
    });
    return c.json({ user });
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to update user" }, 500);
  }
});
users.put("/me", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const data = updateUserSchema.parse(body);
    const prisma = getPrisma(c.env);
    const updateData = { ...data };
    delete updateData.password;
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        role: true,
        name: true,
        mobile: true,
        email: true,
        address: true,
        displayPictureUrl: true,
        createdAt: true
      }
    });
    return c.json({ user: updatedUser });
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to update profile" }, 500);
  }
});
var users_default = users;

// src/routes/packages.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var packageSchema = external_exports.object({
  name: external_exports.string().min(1),
  price: external_exports.number().positive(),
  recurringType: external_exports.enum(["MONTHLY", "BIMONTHLY"])
});
var packages = new Hono2().basePath("/packages");
packages.get("/", authMiddleware, async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const packages2 = await prisma.package.findMany({
      orderBy: { createdAt: "desc" }
    });
    return c.json({ packages: packages2 });
  } catch (error) {
    return c.json({ error: error.message || "Failed to fetch packages" }, 500);
  }
});
packages.post("/", authMiddleware, adminOnly, async (c) => {
  try {
    const body = await c.req.json();
    const data = packageSchema.parse(body);
    const prisma = getPrisma(c.env);
    const pkg = await prisma.package.create({
      data: {
        name: data.name,
        price: data.price,
        recurringType: data.recurringType
      }
    });
    return c.json({ package: pkg }, 201);
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to create package" }, 500);
  }
});
packages.put("/:id", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const data = packageSchema.parse(body);
    const prisma = getPrisma(c.env);
    const pkg = await prisma.package.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        recurringType: data.recurringType
      }
    });
    return c.json({ package: pkg });
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to update package" }, 500);
  }
});
var packages_default = packages;

// src/routes/customers.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var customerSchema = external_exports.object({
  name: external_exports.string().min(1),
  mobile: external_exports.string().length(10),
  email: external_exports.string().email().nullable().optional(),
  address: external_exports.string().nullable().optional(),
  whatsappMobile: external_exports.string().length(10),
  boxNumber: external_exports.string().min(1),
  idNumber: external_exports.string().nullable().optional(),
  packageId: external_exports.string().uuid(),
  assignedEmployeeId: external_exports.string().uuid().optional()
});
var customers = new Hono2().basePath("/customers");
customers.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const prisma = getPrisma(c.env);
    const where = {};
    if (user.role === "EMPLOYEE") {
      where.assignedEmployeeId = user.id;
    }
    const customers2 = await prisma.customer.findMany({
      where,
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            mobile: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return c.json({ customers: customers2 });
  } catch (error) {
    return c.json({ error: error.message || "Failed to fetch customers" }, 500);
  }
});
customers.get("/search", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const query = c.req.query("q") || "";
    const prisma = getPrisma(c.env);
    const where = {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { boxNumber: { contains: query, mode: "insensitive" } },
        { mobile: { contains: query } }
      ]
    };
    if (user.role === "EMPLOYEE") {
      where.assignedEmployeeId = user.id;
    }
    const customers2 = await prisma.customer.findMany({
      where,
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true
          }
        }
      },
      take: 20
    });
    return c.json({ customers: customers2 });
  } catch (error) {
    return c.json(
      { error: error.message || "Failed to search customers" },
      500
    );
  }
});
customers.get("/export", authMiddleware, adminOnly, async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const customers2 = await prisma.customer.findMany({
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            mobile: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    const headers = [
      "Name",
      "Mobile",
      "Email",
      "Address",
      "WhatsApp Mobile",
      "Box Number",
      "ID Number",
      "Package Name",
      "Employee Name",
      "Pending Balance",
      "Created At"
    ];
    const rows = customers2.map((customer) => [
      customer.name || "",
      customer.mobile || "",
      customer.email || "",
      customer.address || "",
      customer.whatsappMobile || "",
      customer.boxNumber || "",
      customer.idNumber || "",
      customer.package?.name || "",
      customer.assignedEmployee?.name || "",
      customer.pendingBalance.toString() || "0",
      customer.createdAt.toISOString().split("T")[0]
    ]);
    const escapeCsvValue = /* @__PURE__ */ __name((value) => {
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }, "escapeCsvValue");
    const csvRows = rows.map((row) => row.map(escapeCsvValue).join(","));
    const csv = [headers.map(escapeCsvValue).join(","), ...csvRows].join("\n");
    c.header("Content-Type", "text/csv; charset=utf-8");
    c.header(
      "Content-Disposition",
      `attachment; filename="customers-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`
    );
    return c.text(csv);
  } catch (error) {
    return c.json(
      { error: error.message || "Failed to export customers" },
      500
    );
  }
});
customers.get("/:id", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const id = c.req.param("id");
    const prisma = getPrisma(c.env);
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            mobile: true,
            email: true
          }
        }
      }
    });
    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }
    if (user.role === "EMPLOYEE" && customer.assignedEmployeeId !== user.id) {
      return c.json({ error: "Forbidden" }, 403);
    }
    return c.json({ customer });
  } catch (error) {
    return c.json({ error: error.message || "Failed to fetch customer" }, 500);
  }
});
customers.get("/:id/transactions", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const id = c.req.param("id");
    const prisma = getPrisma(c.env);
    const customer = await prisma.customer.findUnique({
      where: { id }
    });
    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }
    if (user.role === "EMPLOYEE" && customer.assignedEmployeeId !== user.id) {
      return c.json({ error: "Forbidden" }, 403);
    }
    const transactions2 = await prisma.transaction.findMany({
      where: { customerId: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            mobile: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return c.json({ transactions: transactions2 });
  } catch (error) {
    return c.json(
      { error: error.message || "Failed to fetch transactions" },
      500
    );
  }
});
customers.post("/", authMiddleware, adminOnly, async (c) => {
  try {
    const body = await c.req.json();
    const data = customerSchema.parse(body);
    const prisma = getPrisma(c.env);
    const existing = await prisma.customer.findUnique({
      where: { boxNumber: data.boxNumber }
    });
    if (existing) {
      return c.json({ error: "Box number already exists" }, 400);
    }
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        whatsappMobile: data.whatsappMobile,
        boxNumber: data.boxNumber,
        idNumber: data.idNumber,
        packageId: data.packageId,
        assignedEmployeeId: data.assignedEmployeeId,
        pendingBalance: 0
      },
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return c.json({ customer }, 201);
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to create customer" }, 500);
  }
});
customers.put("/:id", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const data = customerSchema.partial().parse(body);
    const prisma = getPrisma(c.env);
    const customer = await prisma.customer.update({
      where: { id },
      data,
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return c.json({ customer });
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to update customer" }, 500);
  }
});
customers.post("/import", authMiddleware, adminOnly, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file");
    if (!file) {
      return c.json({ error: "No file uploaded" }, 400);
    }
    let fileContent;
    if (file instanceof File) {
      fileContent = await file.text();
    } else if (typeof file === "string") {
      fileContent = file;
    } else {
      fileContent = await new Response(file).text();
    }
    const lines = fileContent.split("\n").filter((line) => line.trim());
    if (lines.length < 2) {
      return c.json(
        { error: "CSV file must have at least a header and one data row" },
        400
      );
    }
    const parseCsvLine = /* @__PURE__ */ __name((line) => {
      const result = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    }, "parseCsvLine");
    const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase().trim());
    const expectedHeaders = [
      "name",
      "mobile",
      "email",
      "address",
      "whatsapp mobile",
      "box number",
      "id number",
      "package name",
      "employee name",
      "pending balance",
      "created at"
    ];
    const headerMap = {};
    expectedHeaders.forEach((expected) => {
      const index = headers.findIndex(
        (h) => h.toLowerCase().trim() === expected.toLowerCase()
      );
      if (index !== -1) {
        headerMap[expected] = index;
      }
    });
    const requiredHeaders = [
      "name",
      "mobile",
      "whatsapp mobile",
      "box number",
      "package name"
    ];
    const missingHeaders = requiredHeaders.filter(
      (h) => headerMap[h] === void 0
    );
    if (missingHeaders.length > 0) {
      return c.json(
        {
          error: `Missing required headers: ${missingHeaders.join(", ")}`
        },
        400
      );
    }
    const prisma = getPrisma(c.env);
    const [packages2, employees] = await Promise.all([
      prisma.package.findMany(),
      prisma.user.findMany({
        where: { role: "EMPLOYEE" }
      })
    ]);
    const packageMap = /* @__PURE__ */ new Map();
    packages2.forEach((pkg) => {
      packageMap.set(pkg.name, pkg.id);
    });
    const employeeMap = /* @__PURE__ */ new Map();
    employees.forEach((emp) => {
      employeeMap.set(emp.name, emp.id);
    });
    const errors = [];
    const validRows = [];
    for (let i = 1; i < lines.length; i++) {
      const row = parseCsvLine(lines[i]);
      const rowNumber = i + 1;
      try {
        const name2 = row[headerMap["name"]]?.trim() || "";
        const mobile = row[headerMap["mobile"]]?.trim() || "";
        const email = row[headerMap["email"]]?.trim() || "";
        const address = row[headerMap["address"]]?.trim() || "";
        const whatsappMobile = row[headerMap["whatsapp mobile"]]?.trim() || "";
        const boxNumber = row[headerMap["box number"]]?.trim() || "";
        const idNumber = row[headerMap["id number"]]?.trim() || "";
        const packageName = row[headerMap["package name"]]?.trim() || "";
        const employeeName = row[headerMap["employee name"]]?.trim() || "";
        const pendingBalance = row[headerMap["pending balance"]]?.trim() || "0";
        if (!name2) {
          errors.push({ row: rowNumber, error: "Name is required" });
          continue;
        }
        if (!mobile || mobile.length !== 10) {
          errors.push({
            row: rowNumber,
            error: "Mobile must be exactly 10 digits"
          });
          continue;
        }
        if (!whatsappMobile || whatsappMobile.length !== 10) {
          errors.push({
            row: rowNumber,
            error: "WhatsApp Mobile must be exactly 10 digits"
          });
          continue;
        }
        if (!boxNumber) {
          errors.push({ row: rowNumber, error: "Box Number is required" });
          continue;
        }
        if (!packageName) {
          errors.push({ row: rowNumber, error: "Package Name is required" });
          continue;
        }
        const packageId = packageMap.get(packageName);
        if (!packageId) {
          errors.push({
            row: rowNumber,
            error: `Package "${packageName}" not found (case-sensitive match required)`
          });
          continue;
        }
        let assignedEmployeeId = void 0;
        if (employeeName) {
          const employeeId = employeeMap.get(employeeName);
          if (!employeeId) {
            errors.push({
              row: rowNumber,
              error: `Employee "${employeeName}" not found (case-sensitive match required)`
            });
            continue;
          }
          assignedEmployeeId = employeeId;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errors.push({ row: rowNumber, error: "Invalid email format" });
          continue;
        }
        const existing = await prisma.customer.findUnique({
          where: { boxNumber }
        });
        if (existing) {
          errors.push({
            row: rowNumber,
            error: `Box Number "${boxNumber}" already exists`
          });
          continue;
        }
        validRows.push({
          name: name2,
          mobile,
          email: email || null,
          address: address || null,
          whatsappMobile,
          boxNumber,
          idNumber: idNumber || null,
          packageId,
          assignedEmployeeId,
          pendingBalance: parseFloat(pendingBalance) || 0
        });
      } catch (error) {
        errors.push({
          row: rowNumber,
          error: error.message || "Invalid row data"
        });
      }
    }
    if (errors.length > 0) {
      return c.json(
        {
          error: "Import validation failed",
          errors,
          validRowsCount: validRows.length
        },
        400
      );
    }
    const importedCustomers = [];
    for (const rowData of validRows) {
      try {
        const customer = await prisma.customer.create({
          data: rowData,
          include: {
            package: true,
            assignedEmployee: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });
        importedCustomers.push(customer);
      } catch (error) {
        errors.push({
          row: validRows.indexOf(rowData) + 2,
          // Approximate row number
          error: error.message || "Failed to create customer"
        });
      }
    }
    if (errors.length > 0) {
      return c.json(
        {
          message: "Partial import completed",
          imported: importedCustomers.length,
          errors
        },
        207
        // Multi-Status
      );
    }
    return c.json(
      {
        message: "Import completed successfully",
        imported: importedCustomers.length,
        customers: importedCustomers
      },
      201
    );
  } catch (error) {
    return c.json(
      { error: error.message || "Failed to import customers" },
      500
    );
  }
});
var customers_default = customers;

// src/routes/transactions.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var manualTransactionSchema = external_exports.object({
  customerId: external_exports.string().uuid(),
  amount: external_exports.number().positive(),
  remarks: external_exports.string().optional()
});
var transactions = new Hono2().basePath("/transactions");
transactions.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const month = c.req.query("month");
    const year = c.req.query("year");
    if (!month || !year) {
      return c.json({ error: "Month and year are required" }, 400);
    }
    const prisma = getPrisma(c.env);
    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);
    const where = {
      transactionDate: {
        gte: startDate,
        lte: endDate
      }
    };
    if (user.role === "EMPLOYEE") {
      const assignedCustomers = await prisma.customer.findMany({
        where: { assignedEmployeeId: user.id },
        select: { id: true }
      });
      where.OR = [
        { customerId: { in: assignedCustomers.map((c2) => c2.id) } },
        { transactionBy: user.id }
      ];
    }
    const transactions2 = await prisma.transaction.findMany({
      where,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            boxNumber: true,
            mobile: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            mobile: true
          }
        }
      },
      orderBy: { transactionDate: "desc" }
    });
    return c.json({ transactions: transactions2 });
  } catch (error) {
    return c.json({ error: error.message || "Failed to fetch transactions" }, 500);
  }
});
transactions.get("/export", authMiddleware, adminOnly, async (c) => {
  try {
    const month = c.req.query("month");
    const year = c.req.query("year");
    if (!month || !year) {
      return c.json({ error: "Month and year are required" }, 400);
    }
    const prisma = getPrisma(c.env);
    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);
    const transactions2 = await prisma.transaction.findMany({
      where: {
        transactionDate: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        customer: {
          select: {
            name: true,
            boxNumber: true,
            mobile: true
          }
        },
        user: {
          select: {
            name: true,
            mobile: true
          }
        }
      },
      orderBy: { transactionDate: "desc" }
    });
    const headers = ["Customer Name", "Box Number", "Transaction ID", "Date", "Type", "Amount", "Status", "Collected By"];
    const rows = transactions2.map((t) => [
      t.customer.name,
      t.customer.boxNumber,
      t.transactionId,
      t.transactionDate.toISOString(),
      t.transactionType,
      t.amount.toString(),
      t.status,
      t.user.name
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    c.header("Content-Type", "text/csv; charset=utf-8");
    c.header("Content-Disposition", `attachment; filename="transactions-${month}-${year}.csv"`);
    return c.text(csv);
  } catch (error) {
    return c.json({ error: error.message || "Failed to export transactions" }, 500);
  }
});
transactions.post("/manual", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { customerId, amount, remarks } = manualTransactionSchema.parse(body);
    const prisma = getPrisma(c.env);
    const customer = await prisma.customer.findUnique({
      where: { id: customerId }
    });
    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }
    if (user.role === "EMPLOYEE" && customer.assignedEmployeeId !== user.id) {
      return c.json({ error: "Forbidden - You can only collect for assigned customers" }, 403);
    }
    const pendingBalance = Number(customer.pendingBalance);
    if (amount > pendingBalance) {
      return c.json({ error: "Amount exceeds pending balance" }, 400);
    }
    const transaction = await prisma.transaction.create({
      data: {
        customerId,
        transactionId: `MANUAL-${Date.now()}`,
        transactionType: "manual",
        transactionBy: user.id,
        amount,
        status: "paid",
        remarks
      }
    });
    const newPendingBalance = Math.max(0, pendingBalance - amount);
    await prisma.customer.update({
      where: { id: customerId },
      data: { pendingBalance: newPendingBalance }
    });
    return c.json({ transaction }, 201);
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to create transaction" }, 500);
  }
});
var transactions_default = transactions;

// src/routes/payments.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var initiateBulkSchema = external_exports.object({
  customerIds: external_exports.array(external_exports.string().uuid()).min(1)
});
var payments = new Hono2().basePath("/payments");
async function createRazorpayPaymentLink(customer, env) {
  const amount = Number(customer.package.price) * 100;
  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(
        `${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`
      )}`
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      description: `Payment for ${customer.package.name} - ${customer.name}`,
      customer: {
        name: customer.name,
        contact: customer.mobile,
        email: customer.email || void 0
      },
      // upi_link: true,
      notify: {
        sms: true,
        email: true
      }
    })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Razorpay API error: ${error}`);
  }
  return await response.json();
}
__name(createRazorpayPaymentLink, "createRazorpayPaymentLink");
payments.post("/initiate-bulk", authMiddleware, adminOnly, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { customerIds } = initiateBulkSchema.parse(body);
    const prisma = getPrisma(c.env);
    const results = [];
    for (const customerId of customerIds) {
      try {
        const customer = await prisma.customer.findUnique({
          where: { id: customerId },
          include: { package: true }
        });
        if (!customer) {
          results.push({
            customerId,
            success: false,
            error: "Customer not found"
          });
          continue;
        }
        const paymentLink = await createRazorpayPaymentLink(customer, c.env);
        const transaction = await prisma.transaction.create({
          data: {
            customerId: customer.id,
            transactionId: paymentLink.id,
            transactionType: "payment_link",
            transactionBy: user.id,
            amount: customer.package.price,
            status: "pending"
          }
        });
        await prisma.customer.update({
          where: { id: customerId },
          data: {
            pendingBalance: {
              increment: customer.package.price
            }
          }
        });
        results.push({
          customerId,
          success: true,
          transactionId: transaction.id,
          paymentLink: paymentLink.short_url || paymentLink.id
        });
      } catch (error) {
        results.push({
          customerId,
          success: false,
          error: error.message
        });
      }
    }
    return c.json({ results });
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json(
      { error: error.message || "Failed to initiate payments" },
      500
    );
  }
});
var payments_default = payments;

// src/routes/webhooks.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var webhooks = new Hono2().basePath("/razorpay");
async function verifyRazorpaySignature(webhookSecret, payload, signature) {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(webhookSecret);
    const payloadData = encoder.encode(payload);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, payloadData);
    const generatedSignature = Array.from(new Uint8Array(signatureBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
    return generatedSignature === signature;
  } catch (error) {
    return false;
  }
}
__name(verifyRazorpaySignature, "verifyRazorpaySignature");
webhooks.post("/razorpay", async (c) => {
  try {
    const signature = c.req.header("X-Razorpay-Signature");
    const rawBody = await c.req.text();
    if (!signature) {
      return c.json({ error: "Missing signature" }, 400);
    }
    const isValid2 = await verifyRazorpaySignature(c.env.RAZORPAY_WEBHOOK_SECRET, rawBody, signature);
    if (!isValid2) {
      return c.json({ error: "Invalid signature" }, 401);
    }
    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const entity = payload.payload?.payment_link?.entity || payload.payload?.payment?.entity;
    if (!entity) {
      return c.json({ error: "Invalid payload" }, 400);
    }
    const prisma = getPrisma(c.env);
    const transaction = await prisma.transaction.findFirst({
      where: {
        transactionId: entity.id,
        transactionType: "payment_link"
      },
      include: {
        customer: true
      }
    });
    if (!transaction) {
      console.log("Transaction not found for payment link:", entity.id);
      return c.json({ message: "Transaction not found" }, 200);
    }
    if (event === "payment_link.paid" || event === "payment.captured" && entity.status === "captured") {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: "paid",
          transactionType: "online"
        }
      });
      const amount = Number(transaction.amount);
      const currentPending = Number(transaction.customer.pendingBalance);
      const newPending = Math.max(0, currentPending - amount);
      await prisma.customer.update({
        where: { id: transaction.customerId },
        data: {
          pendingBalance: newPending,
          lastBillingDate: /* @__PURE__ */ new Date()
        }
      });
    } else if (event === "payment_link.cancelled" || event === "payment.failed") {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: "failed"
        }
      });
    }
    return c.json({ message: "Webhook processed" }, 200);
  } catch (error) {
    console.error("Webhook error:", error);
    return c.json({ error: error.message || "Webhook processing failed" }, 500);
  }
});
var webhooks_default = webhooks;

// src/routes/messaging.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var sendPaymentLinkSchema = external_exports.object({
  customerId: external_exports.string().uuid(),
  amount: external_exports.string(),
  link: external_exports.string().url(),
  dueMonth: external_exports.string()
});
var messaging = new Hono2().basePath("/messaging");
messaging.post("/whatsapp/send-payment-link", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const { customerId, amount, link, dueMonth } = sendPaymentLinkSchema.parse(body);
    const prisma = getPrisma(c.env);
    const customer = await prisma.customer.findUnique({
      where: { id: customerId }
    });
    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }
    const message = `Hello ${customer.name},

Your payment of \u20B9${amount} for ${dueMonth} is due.

Please pay using this link: ${link}

Thank you!`;
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${c.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${c.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: customer.whatsappMobile,
          type: "text",
          text: {
            body: message
          }
        })
      }
    );
    if (!response.ok) {
      const error = await response.text();
      return c.json({ error: `WhatsApp API error: ${error}` }, 500);
    }
    const result = await response.json();
    return c.json({ success: true, messageId: result.messages?.[0]?.id });
  } catch (error) {
    if (error instanceof external_exports.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to send message" }, 500);
  }
});
var messaging_default = messaging;

// src/index.ts
var app = new Hono2();
app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", async (c, next) => {
  const origin = c.req.header("Origin") || "";
  const allowedOrigins = [
    c.env.APP_BASE_URL || "http://localhost:5173",
    "http://localhost:5173",
    "http://localhost:3000"
  ];
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  c.header("Access-Control-Allow-Origin", allowedOrigin);
  c.header("Access-Control-Allow-Credentials", "true");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  c.header(
    "Access-Control-Expose-Headers",
    "Content-Disposition, Content-Type"
  );
  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }
  await next();
});
app.get("/", (c) => {
  return c.json({ message: "Dish Hobby Cable Vision API", status: "ok" });
});
app.route("/auth", auth_default);
app.use("/api/*", authMiddleware);
app.route("/api", users_default);
app.route("/api", packages_default);
app.route("/api", customers_default);
app.route("/api", transactions_default);
app.route("/api", payments_default);
app.route("/api", messaging_default);
app.route("/webhooks", webhooks_default);
var src_default = {
  async fetch(request, env, ctx) {
    return app.fetch(request, env, ctx);
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleCron(env));
  }
};
async function handleCron(env) {
  try {
    console.log("Cron triggered: Processing monthly payment reminders");
    const prisma = getPrisma(env);
    const today = /* @__PURE__ */ new Date();
    const currentDay = today.getDate();
    if (currentDay !== 5) {
      console.log("Not the 5th, skipping cron");
      return;
    }
    const customers2 = await prisma.customer.findMany({
      include: { package: true }
    });
    for (const customer of customers2) {
      try {
        const isDue = checkIfDue(customer, today);
        if (isDue) {
          const paymentLink = await createRazorpayPaymentLink2(customer, env);
          await prisma.transaction.create({
            data: {
              customerId: customer.id,
              transactionId: paymentLink.id,
              transactionType: "payment_link",
              transactionBy: "system",
              // System user
              amount: customer.package.price,
              status: "pending"
            }
          });
          console.log(`Processed customer ${customer.id}`);
        }
      } catch (error) {
        console.error(`Error processing customer ${customer.id}:`, error);
      }
    }
    console.log("Cron completed");
  } catch (error) {
    console.error("Cron error:", error);
  }
}
__name(handleCron, "handleCron");
function checkIfDue(customer, today) {
  if (!customer.lastBillingDate)
    return true;
  const lastBilling = new Date(customer.lastBillingDate);
  const monthsDiff = (today.getFullYear() - lastBilling.getFullYear()) * 12 + (today.getMonth() - lastBilling.getMonth());
  if (customer.package.recurringType === "MONTHLY") {
    return monthsDiff >= 1;
  } else if (customer.package.recurringType === "BIMONTHLY") {
    return monthsDiff >= 2;
  }
  return false;
}
__name(checkIfDue, "checkIfDue");
async function createRazorpayPaymentLink2(customer, env) {
  const amount = Number(customer.package.price) * 100;
  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(
        `${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`
      )}`
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      description: `Payment for ${customer.package.name} - ${customer.name}`,
      customer: {
        name: customer.name,
        contact: customer.mobile,
        email: customer.email || void 0
      },
      notify: {
        sms: true,
        email: true
      }
    })
  });
  if (!response.ok) {
    throw new Error(`Razorpay API error: ${response.statusText}`);
  }
  return await response.json();
}
__name(createRazorpayPaymentLink2, "createRazorpayPaymentLink");

// ../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-027NN5/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-027NN5/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

@neondatabase/serverless/index.mjs:
  (*! Bundled license information:
  
  ieee754/index.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  buffer/index.js:
    (*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     *)
  *)
*/
//# sourceMappingURL=index.js.map
