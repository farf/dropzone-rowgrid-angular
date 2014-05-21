function getMods(key) {
    var mods = key.slice(0, key.length - 1);
    for (var mi = 0; mi < mods.length; mi++)
        mods[mi] = _MODIFIERS[mods[mi]];
    return mods;
}

function addEvent(object, event, method) {
    if (object.addEventListener)
        object.addEventListener(event, method, false);
    else if (object.attachEvent)
        object.attachEvent('on' + event, function() {
            method(window.event)
        });
};
addEvent(document, 'keydown', function(event) {
    dispatch(event, _scope)
});
addEvent(document, 'keyup', clearModifier);
addEvent(window, 'focus', resetModifiers);
var previousKey = global.key;

function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
}
global.key = assignKey;
global.key.setScope = setScope;
global.key.getScope = getScope;
global.key.deleteScope = deleteScope;
global.key.filter = filter;
global.key.isPressed = isPressed;
global.key.getPressedKeyCodes = getPressedKeyCodes;
global.key.noConflict = noConflict;
global.key.unbind = unbindKey;
if (typeof module !== 'undefined') module.exports = key;
})(this);
(function() {
    var _this = this;
    this.linear_partition = function(seq, k) {
        var ans, i, j, m, n, solution, table, x, y, _i, _j, _k, _l;
        n = seq.length;
        if (k <= 0) {
            return [];
        }
        if (k > n) {
            return seq.map(function(x) {
                return [x];
            });
        }
        table = (function() {
            var _i, _results;
            _results = [];
            for (y = _i = 0; 0 <= n ? _i < n : _i > n; y = 0 <= n ? ++_i : --_i) {
                _results.push((function() {
                    var _j, _results1;
                    _results1 = [];
                    for (x = _j = 0; 0 <= k ? _j < k : _j > k; x = 0 <= k ? ++_j : --_j) {
                        _results1.push(0);
                    }
                    return _results1;
                })());
            }
            return _results;
        })();
        solution = (function() {
            var _i, _ref, _results;
            _results = [];
            for (y = _i = 0, _ref = n - 1; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
                _results.push((function() {
                    var _j, _ref1, _results1;
                    _results1 = [];
                    for (x = _j = 0, _ref1 = k - 1; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
                        _results1.push(0);
                    }
                    return _results1;
                })());
            }
            return _results;
        })();
        for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
            table[i][0] = seq[i] + (i ? table[i - 1][0] : 0);
        }
        for (j = _j = 0; 0 <= k ? _j < k : _j > k; j = 0 <= k ? ++_j : --_j) {
            table[0][j] = seq[0];
        }
        for (i = _k = 1; 1 <= n ? _k < n : _k > n; i = 1 <= n ? ++_k : --_k) {
            for (j = _l = 1; 1 <= k ? _l < k : _l > k; j = 1 <= k ? ++_l : --_l) {
                m = _.min((function() {
                    var _m, _results;
                    _results = [];
                    for (x = _m = 0; 0 <= i ? _m < i : _m > i; x = 0 <= i ? ++_m : --_m) {
                        _results.push([_.max([table[x][j - 1], table[i][0] - table[x][0]]), x]);
                    }
                    return _results;
                })(), function(o) {
                    return o[0];
                });
                table[i][j] = m[0];
                solution[i - 1][j - 1] = m[1];
            }
        }
        n = n - 1;
        k = k - 2;
        ans = [];
        while (k >= 0) {
            ans = [(function() {
                var _m, _ref, _ref1, _results;
                _results = [];
                for (i = _m = _ref = solution[n - 1][k] + 1, _ref1 = n + 1; _ref <= _ref1 ? _m < _ref1 : _m > _ref1; i = _ref <= _ref1 ? ++_m : --_m) {
                    _results.push(seq[i]);
                }
                return _results;
            })()].concat(ans);
            n = solution[n - 1][k];
            k = k - 1;
        }
        return [(function() {
            var _m, _ref, _results;
            _results = [];
            for (i = _m = 0, _ref = n + 1; 0 <= _ref ? _m < _ref : _m > _ref; i = 0 <= _ref ? ++_m : --_m) {
                _results.push(seq[i]);
            }
            return _results;
        })()].concat(ans);
    };
}).call(this);

function resize(img, max_width, max_height) {
    var c = document.createElement('canvas');
    var context = c.getContext('2d');
    var width = img.width;
    var height = img.height;
    if (width > height) {
        if (width > max_width) {
            height *= max_width / width;
            width = max_width;
        }
    } else {
        if (height > max_height) {
            width *= max_height / height;
            height = max_height;
        }
    }
    width = parseInt(width)
    height = parseInt(height)
    c.width = width;
    c.height = height;
    context.drawImage(img, 0, 0, width, height);
    var resized_img = new Image(width, height)
    resized_img.src = c.toDataURL("image/jpeg", 0.70);
    return resized_img;
}
(function() {
    var __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) return i;
        }
        return -1;
    };
    this.S3Upload = {};
    this.S3Upload.upload = function(data, s3_object_key, success, progress, error) {
        var form_data, xhr, _this = this;
        xhr = new XMLHttpRequest;
        xhr.upload.addEventListener("progress", progress);
        xhr.addEventListener("load", function(e) {
            var _i, _ref, _results;
            if (_ref = e.target.status, __indexOf.call((function() {
                _results = [];
                for (_i = 200; _i <= 299; _i++) {
                    _results.push(_i);
                }
                return _results;
            }).apply(this), _ref) >= 0) {
                return success();
            } else {
                return error();
            }
        }, false);
        xhr.addEventListener("error", error);
        form_data = new FormData;
        form_data.append("key", s3_object_key);
        form_data.append("AWSAccessKeyId", this.access_key);
        form_data.append("acl", this.acl);
        form_data.append("policy", this.policy);
        form_data.append("signature", this.signature);
        form_data.append("Content-Type", 'image/jpeg');
        form_data.append("Cache-Control", 'max-age=94608000');
        form_data.append("file", data);
        xhr.open("POST", "http://" + this.bucket + ".s3.amazonaws.com", true);
        return xhr.send(form_data);
    };
}).call(this);
(function(a) {
    if (typeof exports === "object") {
        module.exports = a()
    } else {
        if (typeof define === "function" && define.amd) {
            define(a)
        } else {
            var c;
            try {
                c = window
            } catch (b) {
                c = self
            }
            c.SparkMD5 = a()
        }
    }
}(function(c) {
    var e = function(s, r) {
            return (s + r) & 4294967295
        },
        n = function(z, v, u, r, y, w) {
            v = e(e(v, z), e(r, w));
            return e((v << y) | (v >>> (32 - y)), u)
        },
        a = function(v, u, A, z, r, y, w) {
            return n((u & A) | ((~u) & z), v, u, r, y, w)
        },
        k = function(v, u, A, z, r, y, w) {
            return n((u & z) | (A & (~z)), v, u, r, y, w)
        },
        f = function(v, u, A, z, r, y, w) {
            return n(u ^ A ^ z, v, u, r, y, w)
        },
        p = function(v, u, A, z, r, y, w) {
            return n(A ^ (u | (~z)), v, u, r, y, w)
        },
        d = function(s, u) {
            var t = s[0],
                r = s[1],
                w = s[2],
                v = s[3];
            t = a(t, r, w, v, u[0], 7, -680876936);
            v = a(v, t, r, w, u[1], 12, -389564586);
            w = a(w, v, t, r, u[2], 17, 606105819);
            r = a(r, w, v, t, u[3], 22, -1044525330);
            t = a(t, r, w, v, u[4], 7, -176418897);
            v = a(v, t, r, w, u[5], 12, 1200080426);
            w = a(w, v, t, r, u[6], 17, -1473231341);
            r = a(r, w, v, t, u[7], 22, -45705983);
            t = a(t, r, w, v, u[8], 7, 1770035416);
            v = a(v, t, r, w, u[9], 12, -1958414417);
            w = a(w, v, t, r, u[10], 17, -42063);
            r = a(r, w, v, t, u[11], 22, -1990404162);
            t = a(t, r, w, v, u[12], 7, 1804603682);
            v = a(v, t, r, w, u[13], 12, -40341101);
            w = a(w, v, t, r, u[14], 17, -1502002290);
            r = a(r, w, v, t, u[15], 22, 1236535329);
            t = k(t, r, w, v, u[1], 5, -165796510);
            v = k(v, t, r, w, u[6], 9, -1069501632);
            w = k(w, v, t, r, u[11], 14, 643717713);
            r = k(r, w, v, t, u[0], 20, -373897302);
            t = k(t, r, w, v, u[5], 5, -701558691);
            v = k(v, t, r, w, u[10], 9, 38016083);
            w = k(w, v, t, r, u[15], 14, -660478335);
            r = k(r, w, v, t, u[4], 20, -405537848);
            t = k(t, r, w, v, u[9], 5, 568446438);
            v = k(v, t, r, w, u[14], 9, -1019803690);
            w = k(w, v, t, r, u[3], 14, -187363961);
            r = k(r, w, v, t, u[8], 20, 1163531501);
            t = k(t, r, w, v, u[13], 5, -1444681467);
            v = k(v, t, r, w, u[2], 9, -51403784);
            w = k(w, v, t, r, u[7], 14, 1735328473);
            r = k(r, w, v, t, u[12], 20, -1926607734);
            t = f(t, r, w, v, u[5], 4, -378558);
            v = f(v, t, r, w, u[8], 11, -2022574463);
            w = f(w, v, t, r, u[11], 16, 1839030562);
            r = f(r, w, v, t, u[14], 23, -35309556);
            t = f(t, r, w, v, u[1], 4, -1530992060);
            v = f(v, t, r, w, u[4], 11, 1272893353);
            w = f(w, v, t, r, u[7], 16, -155497632);
            r = f(r, w, v, t, u[10], 23, -1094730640);
            t = f(t, r, w, v, u[13], 4, 681279174);
            v = f(v, t, r, w, u[0], 11, -358537222);
            w = f(w, v, t, r, u[3], 16, -722521979);
            r = f(r, w, v, t, u[6], 23, 76029189);
            t = f(t, r, w, v, u[9], 4, -640364487);
            v = f(v, t, r, w, u[12], 11, -421815835);
            w = f(w, v, t, r, u[15], 16, 530742520);
            r = f(r, w, v, t, u[2], 23, -995338651);
            t = p(t, r, w, v, u[0], 6, -198630844);
            v = p(v, t, r, w, u[7], 10, 1126891415);
            w = p(w, v, t, r, u[14], 15, -1416354905);
            r = p(r, w, v, t, u[5], 21, -57434055);
            t = p(t, r, w, v, u[12], 6, 1700485571);
            v = p(v, t, r, w, u[3], 10, -1894986606);
            w = p(w, v, t, r, u[10], 15, -1051523);
            r = p(r, w, v, t, u[1], 21, -2054922799);
            t = p(t, r, w, v, u[8], 6, 1873313359);
            v = p(v, t, r, w, u[15], 10, -30611744);
            w = p(w, v, t, r, u[6], 15, -1560198380);
            r = p(r, w, v, t, u[13], 21, 1309151649);
            t = p(t, r, w, v, u[4], 6, -145523070);
            v = p(v, t, r, w, u[11], 10, -1120210379);
            w = p(w, v, t, r, u[2], 15, 718787259);
            r = p(r, w, v, t, u[9], 21, -343485551);
            s[0] = e(t, s[0]);
            s[1] = e(r, s[1]);
            s[2] = e(w, s[2]);
            s[3] = e(v, s[3])
        },
        q = function(t) {
            var u = [],
                r;
            for (r = 0; r < 64; r += 4) {
                u[r >> 2] = t.charCodeAt(r) + (t.charCodeAt(r + 1) << 8) + (t.charCodeAt(r + 2) << 16) + (t.charCodeAt(r + 3) << 24)
            }
            return u
        },
        m = function(r) {
            var t = [],
                s;
            for (s = 0; s < 64; s += 4) {
                t[s >> 2] = r[s] + (r[s + 1] << 8) + (r[s + 2] << 16) + (r[s + 3] << 24)
            }
            return t
        },
        l = function(A) {
            var u = A.length,
                r = [1732584193, -271733879, -1732584194, 271733878],
                w, t, z, x, y, v;
            for (w = 64; w <= u; w += 64) {
                d(r, q(A.substring(w - 64, w)))
            }
            A = A.substring(w - 64);
            t = A.length;
            z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (w = 0; w < t; w += 1) {
                z[w >> 2] |= A.charCodeAt(w) << ((w % 4) << 3)
            }
            z[w >> 2] |= 128 << ((w % 4) << 3);
            if (w > 55) {
                d(r, z);
                for (w = 0; w < 16; w += 1) {
                    z[w] = 0
                }
            }
            x = u * 8;
            x = x.toString(16).match(/(.*?)(.{0,8})$/);
            y = parseInt(x[2], 16);
            v = parseInt(x[1], 16) || 0;
            z[14] = y;
            z[15] = v;
            d(r, z);
            return r
        },
        o = function(z) {
            var t = z.length,
                r = [1732584193, -271733879, -1732584194, 271733878],
                v, s, y, w, x, u;
            for (v = 64; v <= t; v += 64) {
                d(r, m(z.subarray(v - 64, v)))
            }
            z = (v - 64) < t ? z.subarray(v - 64) : new Uint8Array(0);
            s = z.length;
            y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (v = 0; v < s; v += 1) {
                y[v >> 2] |= z[v] << ((v % 4) << 3)
            }
            y[v >> 2] |= 128 << ((v % 4) << 3);
            if (v > 55) {
                d(r, y);
                for (v = 0; v < 16; v += 1) {
                    y[v] = 0
                }
            }
            w = t * 8;
            w = w.toString(16).match(/(.*?)(.{0,8})$/);
            x = parseInt(w[2], 16);
            u = parseInt(w[1], 16) || 0;
            y[14] = x;
            y[15] = u;
            d(r, y);
            return r
        },
        j = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
        h = function(u) {
            var t = "",
                r;
            for (r = 0; r < 4; r += 1) {
                t += j[(u >> (r * 8 + 4)) & 15] + j[(u >> (r * 8)) & 15]
            }
            return t
        },
        b = function(r) {
            var s;
            for (s = 0; s < r.length; s += 1) {
                r[s] = h(r[s])
            }
            return r.join("")
        },
        i = function(r) {
            return b(l(r))
        },
        g = function() {
            this.reset()
        };
    if (i("hello") !== "5d41402abc4b2a76b9719d911017c592") {
        e = function(r, u) {
            var t = (r & 65535) + (u & 65535),
                s = (r >> 16) + (u >> 16) + (t >> 16);
            return (s << 16) | (t & 65535)
        }
    }
    g.prototype.append = function(r) {
        if (/[\u0080-\uFFFF]/.test(r)) {
            r = unescape(encodeURIComponent(r))
        }
        this.appendBinary(r);
        return this
    };
    g.prototype.appendBinary = function(t) {
        this._buff += t;
        this._length += t.length;
        var s = this._buff.length,
            r;
        for (r = 64; r <= s; r += 64) {
            d(this._state, q(this._buff.substring(r - 64, r)))
        }
        this._buff = this._buff.substr(r - 64);
        return this
    };
    g.prototype.end = function(t) {
        var w = this._buff,
            v = w.length,
            u, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            r;
        for (u = 0; u < v; u += 1) {
            s[u >> 2] |= w.charCodeAt(u) << ((u % 4) << 3)
        }
        this._finish(s, v);
        r = !!t ? this._state : b(this._state);
        this.reset();
        return r
    };
    g.prototype._finish = function(s, w) {
        var u = w,
            t, v, r;
        s[u >> 2] |= 128 << ((u % 4) << 3);
        if (u > 55) {
            d(this._state, s);
            for (u = 0; u < 16; u += 1) {
                s[u] = 0
            }
        }
        t = this._length * 8;
        t = t.toString(16).match(/(.*?)(.{0,8})$/);
        v = parseInt(t[2], 16);
        r = parseInt(t[1], 16) || 0;
        s[14] = v;
        s[15] = r;
        d(this._state, s)
    };
    g.prototype.reset = function() {
        this._buff = "";
        this._length = 0;
        this._state = [1732584193, -271733879, -1732584194, 271733878];
        return this
    };
    g.prototype.destroy = function() {
        delete this._state;
        delete this._buff;
        delete this._length
    };
    g.hash = function(t, r) {
        if (/[\u0080-\uFFFF]/.test(t)) {
            t = unescape(encodeURIComponent(t))
        }
        var s = l(t);
        return !!r ? s : b(s)
    };
    g.hashBinary = function(s, r) {
        var t = l(s);
        return !!r ? t : b(t)
    };
    g.ArrayBuffer = function() {
        this.reset()
    };
    g.ArrayBuffer.prototype.append = function(r) {
        var u = this._concatArrayBuffer(this._buff, r),
            t = u.length,
            s;
        this._length += r.byteLength;
        for (s = 64; s <= t; s += 64) {
            d(this._state, m(u.subarray(s - 64, s)))
        }
        this._buff = (s - 64) < t ? u.subarray(s - 64) : new Uint8Array(0);
        return this
    };
    g.ArrayBuffer.prototype.end = function(t) {
        var w = this._buff,
            v = w.length,
            s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            u, r;
        for (u = 0; u < v; u += 1) {
            s[u >> 2] |= w[u] << ((u % 4) << 3)
        }
        this._finish(s, v);
        r = !!t ? this._state : b(this._state);
        this.reset();
        return r
    };
    g.ArrayBuffer.prototype._finish = g.prototype._finish;
    g.ArrayBuffer.prototype.reset = function() {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._state = [1732584193, -271733879, -1732584194, 271733878];
        return this
    };
    g.ArrayBuffer.prototype.destroy = g.prototype.destroy;
    g.ArrayBuffer.prototype._concatArrayBuffer = function(u, s) {
        var t = u.length,
            r = new Uint8Array(t + s.byteLength);
        r.set(u);
        r.set(new Uint8Array(s), t);
        return r
    };
    g.ArrayBuffer.hash = function(r, s) {
        var t = o(new Uint8Array(r));
        return !!s ? t : b(t)
    };
    return g
}));
(function(b, c) {
    var $ = b.jQuery || b.Cowboy || (b.Cowboy = {}),
        a;
    $.throttle = a = function(e, f, j, i) {
        var h, d = 0;
        if (typeof f !== "boolean") {
            i = j;
            j = f;
            f = c
        }

        function g() {
            var o = this,
                m = +new Date() - d,
                n = arguments;

            function l() {
                d = +new Date();
                j.apply(o, n)
            }

            function k() {
                h = c
            }
            if (i && !h) {
                l()
            }
            h && clearTimeout(h);
            if (i === c && m > e) {
                l()
            } else {
                if (f !== true) {
                    h = setTimeout(i ? k : l, i === c ? e - m : e)
                }
            }
        }
        if ($.guid) {
            g.guid = j.guid = j.guid || $.guid++
        }
        return g
    };
    $.debounce = function(d, e, f) {
        return f === c ? a(d, e, false) : a(d, f, e !== false)
    }
})(this);
(function() {
    var __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.Gallery = (function(_super) {
        __extends(Gallery, _super);
        Gallery.prototype.idAttribute = 'slug';
        Gallery.prototype.url = function() {
            if (this.isNew()) {
                return '/';
            } else {
                return "/" + this.id + ".json";
            }
        };
        Gallery.prototype.isOwn = function() {
            return !!this.get('own');
        };

        function Gallery() {
            this.isOwn = __bind(this.isOwn, this);
            this.url = __bind(this.url, this);
            this.photos = new Chromatic.PhotosCollection();
            Backbone.Model.apply(this, arguments);
        }
        Gallery.prototype.parse = function(response) {
            this.photos.add(response.photos, {
                merge: true
            });
            delete response.photos;
            return response;
        };
        return Gallery;
    })(Backbone.Model);
}).call(this);
(function() {
    var UPLOAD_PROGRESS_STEPS, _ref, __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        __indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };
    this.Chromatic = this.Chromatic || {};
    UPLOAD_PROGRESS_STEPS = [0, 55, 70, 85, 100];
    Chromatic.Photo = (function(_super) {
        __extends(Photo, _super);

        function Photo() {
            this.backgroundURL = __bind(this.backgroundURL, this);
            this.bigURL = __bind(this.bigURL, this);
            this.smallURL = __bind(this.smallURL, this);
            this.rootURL = __bind(this.rootURL, this);
            this.hasUploadFailed = __bind(this.hasUploadFailed, this);
            this.isUploading = __bind(this.isUploading, this);
            this.upload = __bind(this.upload, this);
            _ref = Photo.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        Photo.prototype.toJSON = function() {
            return _.pick(this.attributes, 's3_object_key', 'aspect_ratio', 'shot_at', 'fingerprint');
        };
        Photo.prototype.upload = function(callback) {
            var blob, _this = this;
            if (this.isUploading() || this.hasUploadFailed()) {
                return;
            }
            this.set('s3_object_key', guid());
            this.set('progress', UPLOAD_PROGRESS_STEPS[0]);
            blob = dataURLtoBlob(this.get('big_data'));
            return S3Upload.upload(blob, "" + (this.get('s3_object_key')) + "/big.jpg", function() {
                _this.set('progress', UPLOAD_PROGRESS_STEPS[1]);
                blob = dataURLtoBlob(_this.get('small_data'));
                return S3Upload.upload(blob, "" + (_this.get('s3_object_key')) + "/small.jpg", function() {
                    _this.set('progress', UPLOAD_PROGRESS_STEPS[2]);
                    blob = dataURLtoBlob(_this.get('background_data'));
                    return S3Upload.upload(blob, "" + (_this.get('s3_object_key')) + "/background.jpg", function() {
                        _this.set('progress', UPLOAD_PROGRESS_STEPS[3]);
                        return _this.save(null, {
                            success: function() {
                                _this.set('progress', UPLOAD_PROGRESS_STEPS[4]);
                                return callback();
                            },
                            error: function() {
                                return _this.set('progress', -1);
                            }
                        });
                    }, function(e) {
                        return _this.set('progress', parseInt(e.loaded / e.total * (UPLOAD_PROGRESS_STEPS[3] - UPLOAD_PROGRESS_STEPS[2])) + UPLOAD_PROGRESS_STEPS[2]);
                    }, function(e) {
                        return _this.set('progress', -1);
                    });
                }, function(e) {
                    return _this.set('progress', parseInt(e.loaded / e.total * (UPLOAD_PROGRESS_STEPS[2] - UPLOAD_PROGRESS_STEPS[1])) + UPLOAD_PROGRESS_STEPS[1]);
                }, function(e) {
                    return _this.set('progress', -1);
                });
            }, function(e) {
                return _this.set('progress', parseInt(e.loaded / e.total * UPLOAD_PROGRESS_STEPS[1]));
            }, function(e) {
                return _this.set('progress', -1);
            });
        };
        Photo.prototype.isUploading = function() {
            var _i, _ref1, _results;
            return _ref1 = this.get('progress'), __indexOf.call((function() {
                _results = [];
                for (_i = 0; _i <= 99; _i++) {
                    _results.push(_i);
                }
                return _results;
            }).apply(this), _ref1) >= 0;
        };
        Photo.prototype.hasUploadFailed = function() {
            return this.get('progress') === -1;
        };
        Photo.prototype.rootURL = function() {
            return "http://img" + (parseInt(this.get("fingerprint")[0], 16) % 4) + ".chromatic.io/" + (this.get("s3_object_key"));
        };
        Photo.prototype.smallURL = function() {
            return "" + (this.rootURL()) + "/small.jpg";
        };
        Photo.prototype.bigURL = function() {
            return "" + (this.rootURL()) + "/big.jpg";
        };
        Photo.prototype.backgroundURL = function() {
            return "" + (this.rootURL()) + "/background.jpg";
        };
        return Photo;
    })(Backbone.Model);
}).call(this);
(function() {
    var _ref, __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.GalleriesCollection = (function(_super) {
        __extends(GalleriesCollection, _super);

        function GalleriesCollection() {
            _ref = GalleriesCollection.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        GalleriesCollection.prototype.model = Chromatic.Gallery;
        GalleriesCollection.prototype.url = '/recent';
        GalleriesCollection.prototype.comparator = function(obj) {
            return new Date(obj.get("created_at")) * -1;
        };
        return GalleriesCollection;
    })(Backbone.Collection);
}).call(this);
(function() {
    var _ref, __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.PhotosCollection = (function(_super) {
        __extends(PhotosCollection, _super);

        function PhotosCollection() {
            _ref = PhotosCollection.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        PhotosCollection.prototype.model = Chromatic.Photo;
        PhotosCollection.prototype.url = function() {
            return "/" + Chromatic.app.gallery.id + "/photos";
        };
        PhotosCollection.prototype.initialize = function(models, options) {};
        PhotosCollection.prototype.comparator = function(obj) {
            return new Date(obj.get("shot_at") || obj.get("created_at")) * 1;
        };
        return PhotosCollection;
    })(Backbone.Collection);
}).call(this);
(function() {
    var _ref, __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.GalleryView = (function(_super) {
        __extends(GalleryView, _super);

        function GalleryView() {
            this.debouncedLayout = __bind(this.debouncedLayout, this);
            this.layout = __bind(this.layout, this);
            this.debouncedLazyLoad = __bind(this.debouncedLazyLoad, this);
            this.lazyLoad = __bind(this.lazyLoad, this);
            this.renderPhoto = __bind(this.renderPhoto, this);
            this.photoWasAdded = __bind(this.photoWasAdded, this);
            this.isUp = __bind(this.isUp, this);
            this.down = __bind(this.down, this);
            this.up = __bind(this.up, this);
            _ref = GalleryView.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        GalleryView.prototype.id = 'images';
        GalleryView.prototype.initialize = function() {
            this.$el.hide();
            return $(document.body).append(this.$el);
        };
        GalleryView.prototype.up = function(animated, callback) {
            var _this = this;
            document.title = "Chromatic – " + (Chromatic.app.gallery.get("slug"));
            $(document.body).addClass("scroll");
            if (this.isUp()) {
                this.layout();
                return typeof callback === "function" ? callback() : void 0;
            } else {
                if (animated) {
                    this.$el.fadeIn(500, callback);
                } else {
                    this.$el.show();
                    if (typeof callback === "function") {
                        callback();
                    }
                }
                Chromatic.app.gallery.photos.bind("add", this.photoWasAdded);
                Chromatic.app.gallery.photos.bind("remove", this.layout);
                Chromatic.app.gallery.photos.each(function(photo) {
                    return _this.renderPhoto(photo);
                });
                this.layout();
                $(window).on('resize', this.debouncedLayout);
                return $(window).on('scroll', this.debouncedLazyLoad);
            }
        };
        GalleryView.prototype.down = function(animated, callback) {
            var _this = this;
            if (!this.isUp()) {
                return typeof callback === "function" ? callback() : void 0;
            }
            if (animated) {
                this.$el.fadeOut(500, callback);
            } else {
                this.$el.hide();
                if (typeof callback === "function") {
                    callback();
                }
            }
            $(document.body).removeClass("scroll");
            $(window).off('resize', this.debouncedLayout);
            $(window).off('scroll', this.debouncedLazyLoad);
            if (Chromatic.app.gallery) {
                Chromatic.app.gallery.photos.unbind("add", this.photoWasAdded);
                Chromatic.app.gallery.photos.unbind("remove", this.layout);
                return Chromatic.app.gallery.photos.each(function(photo) {
                    photo.view.remove();
                    return photo.view = null;
                });
            }
        };
        GalleryView.prototype.isUp = function() {
            return this.$el.is(':visible');
        };
        GalleryView.prototype.photoWasAdded = function(photo) {
            this.renderPhoto(photo);
            return this.layout();
        };
        GalleryView.prototype.renderPhoto = function(photo) {
            var index;
            photo.view || (photo.view = new Chromatic.GalleryPhotoView({
                model: photo
            }));
            if ((index = Chromatic.app.gallery.photos.indexOf(photo)) > 0) {
                return Chromatic.app.gallery.photos.at(index - 1).view.$el.after(photo.view.el);
            } else {
                return this.$el.prepend(photo.view.el);
            }
        };
        GalleryView.prototype.lazyLoad = function() {
            var container, threshold, viewport_bottom, viewport_top, _this = this;
            threshold = 1000;
            container = $(window);
            viewport_top = container.scrollTop() - threshold;
            viewport_bottom = container.height() + container.scrollTop() + threshold;
            return Chromatic.app.gallery.photos.each(function(photo) {
                if (photo.view.top < viewport_bottom && photo.view.bottom > viewport_top) {
                    return photo.view.load();
                } else {
                    return photo.view.unload();
                }
            });
        };
        GalleryView.prototype.debouncedLazyLoad = function() {
            var _this = this;
            return $.debounce(100, function() {
                return _this.lazyLoad();
            })();
        };
        GalleryView.prototype.layout = function() {
            var ideal_height, index, partition, photos, row_buffer, rows, summed_width, viewport_width, weights;
            photos = Chromatic.app.gallery.photos;
            if (!(this.isUp() && !photos.isEmpty())) {
                return;
            }
            viewport_width = this.$el.width();
            ideal_height = parseInt($(window).height() / 2);
            summed_width = photos.reduce((function(sum, p) {
                return sum += p.get('aspect_ratio') * ideal_height;
            }), 0);
            rows = Math.round(summed_width / viewport_width);
            if (rows < 1) {
                photos.each(function(photo) {
                    return photo.view.resize(parseInt(ideal_height * photo.get('aspect_ratio')), ideal_height);
                });
            } else {
                weights = photos.map(function(p) {
                    return parseInt(p.get('aspect_ratio') * 100);
                });
                partition = linear_partition(weights, rows);
                index = 0;
                row_buffer = new Backbone.Collection;
                _.each(partition, function(row) {
                    var summed_ars;
                    row_buffer.reset();
                    _.each(row, function() {
                        return row_buffer.add(photos.at(index++));
                    });
                    summed_ars = row_buffer.reduce((function(sum, p) {
                        return sum += p.get('aspect_ratio');
                    }), 0);
                    return row_buffer.each(function(photo) {
                        return photo.view.resize(parseInt(viewport_width / summed_ars * photo.get('aspect_ratio')), parseInt(viewport_width / summed_ars));
                    });
                });
            }
            return this.lazyLoad();
        };
        GalleryView.prototype.debouncedLayout = function() {
            var _this = this;
            return $.debounce(100, function() {
                return _this.layout();
            })();
        };
        return GalleryView;
    })(Backbone.View);
}).call(this);
(function() {
    var _ref, __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        __indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.GalleryPhotoView = (function(_super) {
        __extends(GalleryPhotoView, _super);

        function GalleryPhotoView() {
            this.zoom = __bind(this.zoom, this);
            this["delete"] = __bind(this["delete"], this);
            this.updateProgress = __bind(this.updateProgress, this);
            this.unload = __bind(this.unload, this);
            this.load = __bind(this.load, this);
            _ref = GalleryPhotoView.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        GalleryPhotoView.prototype.className = 'photo';
        GalleryPhotoView.prototype.events = {
            'click .delete': 'delete',
            'click': 'zoom'
        };
        GalleryPhotoView.prototype.initialize = function(options) {
            this.model.bind("change:progress", this.updateProgress);
            return this.render();
        };
        GalleryPhotoView.prototype.render = function() {
            if (Chromatic.app.gallery.isOwn()) {
                this.$el.append("<div class=\"delete\"></div>");
            }
            if (this.model.isNew()) {
                return this.$el.append("<div class=\"progress\" style=\"display:none\"><div><div></div></div></div>");
            }
        };
        GalleryPhotoView.prototype.load = function() {
            var url;
            if (this.loaded) {
                return;
            }
            url = this.model.isNew() ? this.model.get('small_data') : this.model.smallURL();
            this.$el.css('backgroundImage', "url(" + url + ")");
            return this.loaded = true;
        };
        GalleryPhotoView.prototype.unload = function() {
            this.$el.css('backgroundImage', "");
            return this.loaded = false;
        };
        GalleryPhotoView.prototype.updateProgress = function(model, progress) {
            var _i, _results;
            if (__indexOf.call((function() {
                _results = [];
                for (_i = 0; _i <= 99; _i++) {
                    _results.push(_i);
                }
                return _results;
            }).apply(this), progress) >= 0) {
                return this.$el.find('.progress').fadeIn().find('div div').css('width', "" + progress + "%");
            } else if (progress === 100) {
                return this.$el.find('.progress').fadeOut().find('div div').css('width', "100%");
            }
        };
        GalleryPhotoView.prototype["delete"] = function(e) {
            e.stopPropagation();
            this.remove();
            return this.model.destroy();
        };
        GalleryPhotoView.prototype.zoom = function() {
            return Chromatic.app.fromGalleryToZoom(this.model);
        };
        GalleryPhotoView.prototype.resize = function(width, height) {
            this.$el.css({
                width: width - parseInt(this.$el.css('marginLeft')) * 2,
                height: height - parseInt(this.$el.css('marginTop')) * 2
            });
            this.top = this.$el.offset().top;
            return this.bottom = this.top + this.$el.height();
        };
        return GalleryPhotoView;
    })(Backbone.View);
}).call(this);
(function() {
    var _ref, __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.HomeView = (function(_super) {
        __extends(HomeView, _super);

        function HomeView() {
            this.refreshRecentGalleries = __bind(this.refreshRecentGalleries, this);
            this.isUp = __bind(this.isUp, this);
            this.down = __bind(this.down, this);
            this.up = __bind(this.up, this);
            this.initialize = __bind(this.initialize, this);
            _ref = HomeView.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        HomeView.prototype.el = '#home';
        HomeView.prototype.initialize = function() {
            return this.$el.hide();
        };
        HomeView.prototype.up = function(animated, callback) {
            if (this.isUp()) {
                return typeof callback === "function" ? callback() : void 0;
            }
            if (animated) {
                this.$el.fadeIn(500, callback);
            } else {
                this.$el.show();
                if (typeof callback === "function") {
                    callback();
                }
            }
            document.title = "Chromatic – Instantly create beautiful photo galleries";
            Chromatic.app.galleries.bind("remove", this.refreshRecentGalleries);
            return this.refreshRecentGalleries();
        };
        HomeView.prototype.down = function(animated, callback) {
            var _this = this;
            if (!this.isUp()) {
                return typeof callback === "function" ? callback() : void 0;
            }
            if (animated) {
                this.$el.fadeOut(500, callback);
            } else {
                this.$el.hide();
                if (typeof callback === "function") {
                    callback();
                }
            }
            Chromatic.app.galleries.unbind("remove", this.refreshRecentGalleries);
            return Chromatic.app.galleries.each(function(gallery) {
                if (gallery.recent_view) {
                    gallery.recent_view.remove();
                }
                return gallery.recent_view = null;
            });
        };
        HomeView.prototype.isUp = function() {
            return this.$el.is(':visible');
        };
        HomeView.prototype.refreshRecentGalleries = function() {
            var _this = this;
            $('#recent-galleries').empty();
            if (Chromatic.app.galleries.any()) {
                $('#recent-galleries').text("Your recent galleries: ");
            }
            return _.each(Chromatic.app.galleries.sort().first(5), function(gallery) {
                gallery.recent_view = new Chromatic.RecentGalleryView({
                    model: gallery
                });
                return $('#recent-galleries').append(gallery.recent_view.el);
            });
        };
        return HomeView;
    })(Backbone.View);
}).call(this);
(function() {
    var _ref, __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.RecentGalleryView = (function(_super) {
        __extends(RecentGalleryView, _super);

        function RecentGalleryView() {
            this.open = __bind(this.open, this);
            this.render = __bind(this.render, this);
            this.initialize = __bind(this.initialize, this);
            _ref = RecentGalleryView.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        RecentGalleryView.prototype.tagName = 'a';
        RecentGalleryView.prototype.events = {
            'click': 'open'
        };
        RecentGalleryView.prototype.initialize = function() {
            return this.render();
        };
        RecentGalleryView.prototype.render = function() {
            this.$el.attr('href', this.model.get('slug'));
            return this.$el.html(this.model.get('slug'));
        };
        RecentGalleryView.prototype.open = function(e) {
            e.stopPropagation();
            return Chromatic.app.fromHomeToGallery(this.model);
        };
        return RecentGalleryView;
    })(Backbone.View);
}).call(this);
(function() {
    var _ref, __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        __indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.UploadView = (function(_super) {
        __extends(UploadView, _super);

        function UploadView() {
            this.processNextFile = __bind(this.processNextFile, this);
            this.finishProcessingFile = __bind(this.finishProcessingFile, this);
            this.uploadNextPhoto = __bind(this.uploadNextPhoto, this);
            this.drop = __bind(this.drop, this);
            this.dragleave = __bind(this.dragleave, this);
            this.dragover = __bind(this.dragover, this);
            this.dragenter = __bind(this.dragenter, this);
            this.handleFiles = __bind(this.handleFiles, this);
            this.handleChooserEvent = __bind(this.handleChooserEvent, this);
            this.stopNativeDragDrop = __bind(this.stopNativeDragDrop, this);
            this.initialize = __bind(this.initialize, this);
            _ref = UploadView.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        UploadView.prototype.el = 'body';
        UploadView.prototype.events = {
            'dragenter': 'dragenter',
            'dragover': 'dragover',
            'dragleave #drop-zone': 'dragleave',
            'drop': 'drop',
            'change input[type=file]': 'handleChooserEvent'
        };
        UploadView.prototype.initialize = function() {
            this.$drop_zone_el = $('#drop-zone');
            return this.$drop_zone_el.hide();
        };
        UploadView.prototype.stopNativeDragDrop = function(e) {
            e.stopPropagation();
            return e.preventDefault();
        };
        UploadView.prototype.handleChooserEvent = function(e) {
            var _this = this;
            if (!e.originalEvent.target.files.length) {
                return;
            }
            return setTimeout((function() {
                return _this.handleFiles(e.originalEvent.target.files);
            }), 200);
        };
        UploadView.prototype.handleFiles = function(files) {
            this.files = _.filter(files, function(file) {
                return file.type === 'image/jpeg';
            });
            if (Chromatic.app.gallery) {
                return this.processNextFile();
            } else {
                return Chromatic.app.fromHomeToCreateGallery(this.processNextFile);
            }
        };
        UploadView.prototype.dragenter = function(e) {
            this.stopNativeDragDrop(e);
            if (Chromatic.app.gallery && !Chromatic.app.gallery.isOwn()) {
                return e.originalEvent.dataTransfer.dropEffect = 'none';
            }
            this.$drop_zone_el.fadeIn();
            return this.$drop_zone_el.find('.caption').text(Chromatic.app.gallery ? 'Drop photos to add them to this gallery' : 'Drop photos here to create a new gallery');
        };
        UploadView.prototype.dragover = function(e) {
            this.stopNativeDragDrop(e);
            if (Chromatic.app.gallery && !Chromatic.app.gallery.isOwn()) {
                return e.originalEvent.dataTransfer.dropEffect = 'none';
            }
        };
        UploadView.prototype.dragleave = function(e) {
            this.stopNativeDragDrop(e);
            return this.$drop_zone_el.fadeOut();
        };
        UploadView.prototype.drop = function(e) {
            this.stopNativeDragDrop(e);
            this.$drop_zone_el.hide();
            return this.handleFiles(e.originalEvent.dataTransfer.files);
        };
        UploadView.prototype.uploadNextPhoto = function() {
            var next;
            if (Chromatic.app.gallery.photos.filter(function(p) {
                return p.isUploading();
            }).length >= 3) {
                return;
            }
            if (next = Chromatic.app.gallery.photos.find(function(p) {
                return p.isNew() && !p.isUploading();
            })) {
                return next.upload(this.uploadNextPhoto);
            }
        };
        UploadView.prototype.finishProcessingFile = function() {
            this.uploadNextPhoto();
            return setTimeout(this.processNextFile.bind(this), 100);
        };
        UploadView.prototype.processNextFile = function() {
            var array_buffer_reader, file, slice, _this = this;
            if (!(file = this.files.shift())) {
                return;
            }
            if (file.type !== "image/jpeg") {
                return this.finishProcessingFile();
            }
            if (file.size < 100 * 1000) {
                return this.finishProcessingFile();
            }
            if (file.size > 20 * 1000 * 1000) {
                return this.finishProcessingFile();
            }
            array_buffer_reader = new FileReader();
            array_buffer_reader.onload = function(array_buffer_reader_event) {
                var data_url_reader, exif_date, exif_reader, fingerprint, result, shot_at;
                result = array_buffer_reader_event.target.result;
                fingerprint = SparkMD5.ArrayBuffer.hash(result);
                if (__indexOf.call(Chromatic.app.gallery.photos.pluck("fingerprint"), fingerprint) >= 0) {
                    console.log("Photo with same fingerprint already present", fingerprint);
                    return _this.finishProcessingFile();
                }
                try {
                    exif_reader = new ExifReader();
                    exif_reader.load(result);
                    exif_date = exif_reader.getTagDescription('DateTimeOriginal');
                    shot_at = new Date(Date.parse("" + (exif_date.split(" ")[0].replace(/:/g, '/')) + " " + (exif_date.split(" ")[1])));
                } catch (_error) {}
                shot_at = shot_at || file.lastModifiedDate;
                data_url_reader = new FileReader();
                data_url_reader.onload = function(data_url_reader_event) {
                    var img;
                    result = data_url_reader_event.target.result;
                    img = new Image();
                    img.onload = function() {
                        var small;
                        small = resize(img, 800, 800);
                        return small.onload = function() {
                            var background, big;
                            background = blur(small, 180);
                            big = resize(img, 2000, 2000);
                            Chromatic.app.gallery.photos.add({
                                fingerprint: fingerprint,
                                aspect_ratio: img.width / img.height,
                                shot_at: shot_at,
                                small_data: small.src,
                                big_data: big.src,
                                background_data: background.src
                            });
                            return _this.finishProcessingFile();
                        };
                    };
                    return img.src = result;
                };
                return data_url_reader.readAsDataURL(file);
            };
            slice = file.slice || file.mozSlice || file.webkitSlice;
            return array_buffer_reader.readAsArrayBuffer(slice.call(file, 0, 131072));
        };
        return UploadView;
    })(Backbone.View);
}).call(this);
(function() {
    var _ref, __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    this.Chromatic = this.Chromatic || {};
    $.extend($.easing, {
        easeOutCirc: function(x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        }
    });
    jQuery.event.special.swipe.settings.sensitivity = 100;
    Chromatic.ZoomView = (function(_super) {
        __extends(ZoomView, _super);

        function ZoomView() {
            this.updateRoute = __bind(this.updateRoute, this);
            this.updatePageTitle = __bind(this.updatePageTitle, this);
            this.hideArrows = __bind(this.hideArrows, this);
            this.showArrows = __bind(this.showArrows, this);
            this.showPrevious = __bind(this.showPrevious, this);
            this.showNext = __bind(this.showNext, this);
            this.close = __bind(this.close, this);
            this.cancel = __bind(this.cancel, this);
            this.move = __bind(this.move, this);
            this.debouncedLayout = __bind(this.debouncedLayout, this);
            this.layout = __bind(this.layout, this);
            this.isUp = __bind(this.isUp, this);
            this.up = __bind(this.up, this);
            this.down = __bind(this.down, this);
            this.render = __bind(this.render, this);
            this.initialize = __bind(this.initialize, this);
            _ref = ZoomView.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        ZoomView.prototype.id = 'zoom';
        ZoomView.prototype.events = {
            'swipeup': 'close',
            'swiperight': 'showPrevious',
            'swipeleft': 'showNext',
            'swipecanceled': 'cancel',
            'click .left': 'showPrevious',
            'click .right': 'showNext',
            'click': 'close',
            'move': 'move',
            'mousemove': 'showArrows',
            'mouseenter': 'showArrows',
            'mouseleave': 'hideArrows'
        };
        ZoomView.prototype.initialize = function() {
            this.$el.hide();
            return $(document.body).append(this.render().$el);
        };
        ZoomView.prototype.render = function() {
            this.$el.html("<div class=\"arrow left\"></div><div class=\"arrow right\"></div>");
            this.delegateEvents();
            return this;
        };
        ZoomView.prototype.down = function(animated, callback) {
            var _this = this;
            if (!this.isUp()) {
                return typeof callback === "function" ? callback() : void 0;
            }
            $(document.body).css('overflowY', 'auto');
            return this.$el.fadeOut((animated ? 500 : 1), function() {
                _this.previous_zoom_photo_view.remove();
                _this.current_zoom_photo_view.remove();
                _this.next_zoom_photo_view.remove();
                _this.previous_zoom_photo_view = null;
                _this.current_zoom_photo_view = null;
                _this.next_zoom_photo_view = null;
                key.unbind('esc');
                key.unbind('enter');
                key.unbind('up');
                key.unbind('left');
                key.unbind('j');
                key.unbind('right');
                key.unbind('k');
                return $(window).off('resize orientationchange', _this.debouncedLayout);
            });
        };
        ZoomView.prototype.up = function(animated, photo, callback) {
            var next, photos, previous;
            if (this.isUp()) {
                if (this.current === photo) {
                    return callback();
                }
            } else {
                if (animated) {
                    this.$el.fadeIn(500);
                } else {
                    this.$el.show();
                    if (typeof callback === "function") {
                        callback();
                    }
                }
                $(document.body).css('overflowY', 'hidden');
                key('esc, enter, up', this.close);
                key('left, k', $.throttle(500, this.showPrevious));
                key('right, j', $.throttle(500, this.showNext));
                $(window).on('resize orientationchange', this.debouncedLayout);
                this.hideArrows(false);
            }
            photos = Chromatic.app.gallery.photos;
            if (this.previous_zoom_photo_view) {
                this.previous_zoom_photo_view.remove();
            }
            if (this.current_zoom_photo_view) {
                this.current_zoom_photo_view.remove();
            }
            if (this.next_zoom_photo_view) {
                this.next_zoom_photo_view.remove();
            }
            previous = photos.at(photos.indexOf(photo) - 1) || photos.last();
            this.current = photo;
            next = photos.at(photos.indexOf(photo) + 1) || photos.first();
            this.previous_zoom_photo_view = new Chromatic.ZoomPhotoView({
                model: previous
            });
            this.current_zoom_photo_view = new Chromatic.ZoomPhotoView({
                model: this.current
            });
            this.next_zoom_photo_view = new Chromatic.ZoomPhotoView({
                model: next
            });
            this.layout();
            return this.updatePageTitle();
        };
        ZoomView.prototype.isUp = function() {
            return this.$el.is(':visible');
        };
        ZoomView.prototype.layout = function(offset, animated) {
            if (offset == null) {
                offset = 0;
            }
            if (!this.isUp()) {
                return;
            }
            this.current_zoom_photo_view.layout('current', offset, animated);
            this.previous_zoom_photo_view.layout('previous', offset, animated);
            return this.next_zoom_photo_view.layout('next', offset, animated);
        };
        ZoomView.prototype.debouncedLayout = function() {
            var _this = this;
            return $.debounce(100, function() {
                return _this.layout();
            })();
        };
        ZoomView.prototype.move = function(e) {
            return this.layout(e.distX, false);
        };
        ZoomView.prototype.cancel = function(e) {
            return this.layout(0, true);
        };
        ZoomView.prototype.close = function() {
            clearTimeout(this.arrows_timer);
            return Chromatic.app.fromZoomToGallery();
        };
        ZoomView.prototype.showNext = function(e) {
            var next, photos;
            if (e) {
                e.preventDefault();
            }
            if (e) {
                e.stopPropagation();
            }
            if (e.type === "keydown") {
                this.hideArrows();
            } else {
                this.showArrows();
            }
            photos = Chromatic.app.gallery.photos;
            this.previous_zoom_photo_view.remove();
            this.previous_zoom_photo_view = null;
            this.previous_zoom_photo_view = this.current_zoom_photo_view;
            this.current_zoom_photo_view = this.next_zoom_photo_view;
            this.current = photos.at(photos.indexOf(this.current) + 1) || photos.first();
            next = photos.at(photos.indexOf(this.current) + 1) || photos.first();
            this.next_zoom_photo_view = new Chromatic.ZoomPhotoView({
                model: next
            });
            this.previous_zoom_photo_view.layout('previous', 0, true);
            this.current_zoom_photo_view.layout('current', 0, true);
            this.next_zoom_photo_view.layout('next', 0, false);
            this.updatePageTitle();
            return this.updateRoute();
        };
        ZoomView.prototype.showPrevious = function(e) {
            var photos, previous;
            if (e) {
                e.preventDefault();
            }
            if (e) {
                e.stopPropagation();
            }
            if (e.type === "keydown") {
                this.hideArrows();
            } else {
                this.showArrows();
            }
            photos = Chromatic.app.gallery.photos;
            this.next_zoom_photo_view.remove();
            this.next_zoom_photo_view = null;
            this.next_zoom_photo_view = this.current_zoom_photo_view;
            this.current_zoom_photo_view = this.previous_zoom_photo_view;
            this.current = photos.at(photos.indexOf(this.current) - 1) || photos.last();
            previous = photos.at(photos.indexOf(this.current) - 1) || photos.last();
            this.previous_zoom_photo_view = new Chromatic.ZoomPhotoView({
                model: previous
            });
            this.next_zoom_photo_view.layout('next', 0, true);
            this.current_zoom_photo_view.layout('current', 0, true);
            this.previous_zoom_photo_view.layout('previous', 0, false);
            this.updatePageTitle();
            return this.updateRoute();
        };
        ZoomView.prototype.showArrows = function() {
            var _this = this;
            this.$el.find(".arrow").stop().animate({
                opacity: 1
            }, 200);
            clearTimeout(this.arrows_timer);
            return this.arrows_timer = window.setTimeout((function() {
                return _this.hideArrows(true);
            }), 3000);
        };
        ZoomView.prototype.hideArrows = function(animated) {
            return this.$el.find(".arrow").animate({
                opacity: 0.01
            }, animated != null ? animated : {
                1000: 0
            });
        };
        ZoomView.prototype.updatePageTitle = function() {
            var gallery;
            gallery = Chromatic.app.gallery;
            return document.title = "" + (gallery.photos.indexOf(this.current) + 1) + "/" + gallery.photos.length + " – Chromatic – " + (gallery.get("slug"));
        };
        ZoomView.prototype.updateRoute = function() {
            var gallery;
            gallery = Chromatic.app.gallery;
            return Backbone.history.navigate("" + gallery.id + "/" + (gallery.photos.indexOf(this.current) + 1));
        };
        return ZoomView;
    })(Backbone.View);
}).call(this);
(function() {
    var _ref, __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.ZoomPhotoView = (function(_super) {
        __extends(ZoomPhotoView, _super);

        function ZoomPhotoView() {
            this.layout = __bind(this.layout, this);
            _ref = ZoomPhotoView.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        ZoomPhotoView.prototype.initialize = function(options) {
            this.render();
            return $('#zoom').append(this.el);
        };
        ZoomPhotoView.prototype.render = function() {
            var big_img, _this = this;
            this.$photo_el = $('<div class="photo"></div>');
            this.$background_el = $('<div class="background"></div>');
            if (this.model.isNew()) {
                this.$photo_el.css('backgroundImage', "url(" + (this.model.get('big_data')) + ")");
                this.$background_el.css('backgroundImage', "url(" + (this.model.get('background_data')) + ")");
            } else {
                big_img = new Image();
                big_img.onload = function() {
                    return _this.$photo_el.css('backgroundImage', "url(" + (_this.model.bigURL()) + ")");
                };
                big_img.src = this.model.bigURL();
                this.$photo_el.css('backgroundImage', "url(" + (this.model.smallURL()) + ")");
                this.$background_el.css('backgroundImage', "url(" + (this.model.backgroundURL()) + ")");
            }
            this.$el.append(this.$photo_el, this.$background_el);
            return this;
        };
        ZoomPhotoView.prototype.layout = function(pos, offset, animated) {
            var container, height, left, opacity, width;
            if (offset == null) {
                offset = 0;
            }
            container = $('#zoom');
            if (container.width() / container.height() > this.model.get("aspect_ratio")) {
                height = container.height();
                width = container.height() * this.model.get("aspect_ratio");
            } else {
                height = container.width() / this.model.get("aspect_ratio");
                width = container.width();
            }
            this.$photo_el.css({
                height: height,
                width: width,
                top: (container.height() - height) / 2
            });
            left = (function() {
                switch (pos) {
                    case 'previous':
                        return -width - 20 + offset;
                    case 'current':
                        return (container.width() - width) / 2 + offset;
                    case 'next':
                        return container.width() + 20 + offset;
                }
            })();
            opacity = (function() {
                switch (pos) {
                    case 'current':
                        return 1 - Math.abs(offset) / container.width() * 2;
                    case 'previous':
                        return 0 + offset / container.width() * 2;
                    case 'next':
                        return 0 - offset / container.width() * 2;
                }
            })();
            if (animated) {
                this.$photo_el.stop().animate({
                    left: left
                }, 600, 'easeOutCirc');
                return this.$background_el.stop().animate({
                    opacity: opacity
                }, 600, 'easeOutCirc');
            } else {
                this.$photo_el.css('left', left);
                return this.$background_el.css('opacity', opacity);
            }
        };
        return ZoomPhotoView;
    })(Backbone.View);
}).call(this);
(function() {
    var _ref, __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    this.Chromatic = this.Chromatic || {};
    Chromatic.App = (function(_super) {
        __extends(App, _super);

        function App() {
            this.fromHomeToCreateGallery = __bind(this.fromHomeToCreateGallery, this);
            _ref = App.__super__.constructor.apply(this, arguments);
            return _ref;
        }
        App.prototype.initialize = function(options) {
            this.galleries = new Chromatic.GalleriesCollection(options.recent_galleries);
            if (options.gallery) {
                this.galleries.add(options.gallery, {
                    merge: true
                });
                this.galleries.get(options.gallery.slug).photos.add(options.gallery.photos);
            }
            this.home_view = new Chromatic.HomeView();
            this.gallery_view = new Chromatic.GalleryView();
            this.upload_view = new Chromatic.UploadView();
            this.zoom_view = new Chromatic.ZoomView();
            return Backbone.history.options = {
                pushState: true,
                hashChange: false
            };
        };
        App.prototype.routes = {
            "": "home",
            ":id": "gallery",
            ":id/:pos": "zoom"
        };
        App.prototype.home = function() {
            this.home_view.up();
            this.gallery_view.down();
            this.zoom_view.down();
            return this.gallery = null;
        };
        App.prototype.gallery = function(id) {
            this.gallery = this.galleries.get(id);
            this.home_view.down();
            this.zoom_view.down();
            return this.gallery_view.up();
        };
        App.prototype.zoom = function(id, pos) {
            this.gallery = this.galleries.get(id);
            this.gallery_view.up();
            this.zoom_view.up(false, this.gallery.photos.at(pos - 1));
            return this.home_view.down();
        };
        App.prototype.fromHomeToGallery = function(gallery) {
            var both_completed, _this = this;
            this.gallery = gallery;
            both_completed = _.after(2, function() {
                return _this.gallery_view.up(true);
            });
            this.home_view.down(true, both_completed);
            this.gallery.fetch({
                success: both_completed
            });
            return Backbone.history.navigate(this.gallery.id);
        };
        App.prototype.fromHomeToCreateGallery = function(callback) {
            var both_completed, _this = this;
            both_completed = _.after(2, function() {
                Backbone.history.navigate(_this.gallery.id);
                _this.gallery_view.up(true);
                return callback();
            });
            this.home_view.down(true, both_completed);
            return this.gallery = this.galleries.create({
                own: true
            }, {
                success: both_completed
            });
        };
        App.prototype.fromZoomToGallery = function() {
            this.zoom_view.down(true);
            this.gallery_view.up();
            return Backbone.history.navigate(this.gallery.id);
        };
        App.prototype.fromGalleryToZoom = function(photo) {
            this.zoom_view.up(true, photo);
            return Backbone.history.navigate("" + this.gallery.id + "/" + (this.gallery.photos.indexOf(photo) + 1));
        };
        return App;
    })(Backbone.Router);
}).call(this);