/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function (a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document)throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
    var c = [], d = c.slice, e = c.concat, f = c.push, g = c.indexOf, h = {}, i = h.toString, j = h.hasOwnProperty, k = {}, l = "1.11.1", m = function (a, b) {
        return new m.fn.init(a, b)
    }, n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, o = /^-ms-/, p = /-([\da-z])/gi, q = function (a, b) {
        return b.toUpperCase()
    };
    m.fn = m.prototype = {jquery: l, constructor: m, selector: "", length: 0, toArray: function () {
        return d.call(this)
    }, get: function (a) {
        return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
    }, pushStack: function (a) {
        var b = m.merge(this.constructor(), a);
        return b.prevObject = this, b.context = this.context, b
    }, each: function (a, b) {
        return m.each(this, a, b)
    }, map: function (a) {
        return this.pushStack(m.map(this, function (b, c) {
            return a.call(b, c, b)
        }))
    }, slice: function () {
        return this.pushStack(d.apply(this, arguments))
    }, first: function () {
        return this.eq(0)
    }, last: function () {
        return this.eq(-1)
    }, eq: function (a) {
        var b = this.length, c = +a + (0 > a ? b : 0);
        return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
    }, end: function () {
        return this.prevObject || this.constructor(null)
    }, push: f, sort: c.sort, splice: c.splice}, m.extend = m.fn.extend = function () {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)if (null != (e = arguments[h]))for (d in e)a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }, m.extend({expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
        throw new Error(a)
    }, noop: function () {
    }, isFunction: function (a) {
        return"function" === m.type(a)
    }, isArray: Array.isArray || function (a) {
        return"array" === m.type(a)
    }, isWindow: function (a) {
        return null != a && a == a.window
    }, isNumeric: function (a) {
        return!m.isArray(a) && a - parseFloat(a) >= 0
    }, isEmptyObject: function (a) {
        var b;
        for (b in a)return!1;
        return!0
    }, isPlainObject: function (a) {
        var b;
        if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a))return!1;
        try {
            if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf"))return!1
        } catch (c) {
            return!1
        }
        if (k.ownLast)for (b in a)return j.call(a, b);
        for (b in a);
        return void 0 === b || j.call(a, b)
    }, type: function (a) {
        return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
    }, globalEval: function (b) {
        b && m.trim(b) && (a.execScript || function (b) {
            a.eval.call(a, b)
        })(b)
    }, camelCase: function (a) {
        return a.replace(o, "ms-").replace(p, q)
    }, nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    }, each: function (a, b, c) {
        var d, e = 0, f = a.length, g = r(a);
        if (c) {
            if (g) {
                for (; f > e; e++)if (d = b.apply(a[e], c), d === !1)break
            } else for (e in a)if (d = b.apply(a[e], c), d === !1)break
        } else if (g) {
            for (; f > e; e++)if (d = b.call(a[e], e, a[e]), d === !1)break
        } else for (e in a)if (d = b.call(a[e], e, a[e]), d === !1)break;
        return a
    }, trim: function (a) {
        return null == a ? "" : (a + "").replace(n, "")
    }, makeArray: function (a, b) {
        var c = b || [];
        return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
    }, inArray: function (a, b, c) {
        var d;
        if (b) {
            if (g)return g.call(b, a, c);
            for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)if (c in b && b[c] === a)return c
        }
        return-1
    }, merge: function (a, b) {
        var c = +b.length, d = 0, e = a.length;
        while (c > d)a[e++] = b[d++];
        if (c !== c)while (void 0 !== b[d])a[e++] = b[d++];
        return a.length = e, a
    }, grep: function (a, b, c) {
        for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)d = !b(a[f], f), d !== h && e.push(a[f]);
        return e
    }, map: function (a, b, c) {
        var d, f = 0, g = a.length, h = r(a), i = [];
        if (h)for (; g > f; f++)d = b(a[f], f, c), null != d && i.push(d); else for (f in a)d = b(a[f], f, c), null != d && i.push(d);
        return e.apply([], i)
    }, guid: 1, proxy: function (a, b) {
        var c, e, f;
        return"string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function () {
            return a.apply(b || this, c.concat(d.call(arguments)))
        }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
    }, now: function () {
        return+new Date
    }, support: k}), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });
    function r(a) {
        var b = a.length, c = m.type(a);
        return"function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    var s = function (a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + -new Date, v = a.document, w = 0, x = 0, y = gb(), z = gb(), A = gb(), B = function (a, b) {
            return a === b && (l = !0), 0
        }, C = "undefined", D = 1 << 31, E = {}.hasOwnProperty, F = [], G = F.pop, H = F.push, I = F.push, J = F.slice, K = F.indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
            return-1
        }, L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", N = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", O = N.replace("w", "w#"), P = "\\[" + M + "*(" + N + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + O + "))|)" + M + "*\\]", Q = ":(" + N + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)", R = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"), S = new RegExp("^" + M + "*," + M + "*"), T = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), U = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"), V = new RegExp(Q), W = new RegExp("^" + O + "$"), X = {ID: new RegExp("^#(" + N + ")"), CLASS: new RegExp("^\\.(" + N + ")"), TAG: new RegExp("^(" + N.replace("w", "w*") + ")"), ATTR: new RegExp("^" + P), PSEUDO: new RegExp("^" + Q), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"), bool: new RegExp("^(?:" + L + ")$", "i"), needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")}, Y = /^(?:input|select|textarea|button)$/i, Z = /^h\d$/i, $ = /^[^{]+\{\s*\[native \w/, _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ab = /[+~]/, bb = /'|\\/g, cb = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"), db = function (a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
        };
        try {
            I.apply(F = J.call(v.childNodes), v.childNodes), F[v.childNodes.length].nodeType
        } catch (eb) {
            I = {apply: F.length ? function (a, b) {
                H.apply(a, J.call(b))
            } : function (a, b) {
                var c = a.length, d = 0;
                while (a[c++] = b[d++]);
                a.length = c - 1
            }}
        }
        function fb(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w, x;
            if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], !a || "string" != typeof a)return d;
            if (1 !== (k = b.nodeType) && 9 !== k)return[];
            if (p && !e) {
                if (f = _.exec(a))if (j = f[1]) {
                    if (9 === k) {
                        if (h = b.getElementById(j), !h || !h.parentNode)return d;
                        if (h.id === j)return d.push(h), d
                    } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j)return d.push(h), d
                } else {
                    if (f[2])return I.apply(d, b.getElementsByTagName(a)), d;
                    if ((j = f[3]) && c.getElementsByClassName && b.getElementsByClassName)return I.apply(d, b.getElementsByClassName(j)), d
                }
                if (c.qsa && (!q || !q.test(a))) {
                    if (s = r = u, w = b, x = 9 === k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                        o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                        while (l--)o[l] = s + qb(o[l]);
                        w = ab.test(a) && ob(b.parentNode) || b, x = o.join(",")
                    }
                    if (x)try {
                        return I.apply(d, w.querySelectorAll(x)), d
                    } catch (y) {
                    } finally {
                        r || b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(R, "$1"), b, d, e)
        }

        function gb() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }

            return b
        }

        function hb(a) {
            return a[u] = !0, a
        }

        function ib(a) {
            var b = n.createElement("div");
            try {
                return!!a(b)
            } catch (c) {
                return!1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function jb(a, b) {
            var c = a.split("|"), e = a.length;
            while (e--)d.attrHandle[c[e]] = b
        }

        function kb(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || D) - (~a.sourceIndex || D);
            if (d)return d;
            if (c)while (c = c.nextSibling)if (c === b)return-1;
            return a ? 1 : -1
        }

        function lb(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return"input" === c && b.type === a
            }
        }

        function mb(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return("input" === c || "button" === c) && b.type === a
            }
        }

        function nb(a) {
            return hb(function (b) {
                return b = +b, hb(function (c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--)c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function ob(a) {
            return a && typeof a.getElementsByTagName !== C && a
        }

        c = fb.support = {}, f = fb.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, m = fb.setDocument = function (a) {
            var b, e = a ? a.ownerDocument || a : v, g = e.defaultView;
            return e !== n && 9 === e.nodeType && e.documentElement ? (n = e, o = e.documentElement, p = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener("unload", function () {
                m()
            }, !1) : g.attachEvent && g.attachEvent("onunload", function () {
                m()
            })), c.attributes = ib(function (a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = ib(function (a) {
                return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = $.test(e.getElementsByClassName) && ib(function (a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
            }), c.getById = ib(function (a) {
                return o.appendChild(a).id = u, !e.getElementsByName || !e.getElementsByName(u).length
            }), c.getById ? (d.find.ID = function (a, b) {
                if (typeof b.getElementById !== C && p) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, d.filter.ID = function (a) {
                var b = a.replace(cb, db);
                return function (a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function (a) {
                var b = a.replace(cb, db);
                return function (a) {
                    var c = typeof a.getAttributeNode !== C && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0
            } : function (a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++])1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                return typeof b.getElementsByClassName !== C && p ? b.getElementsByClassName(a) : void 0
            }, r = [], q = [], (c.qsa = $.test(e.querySelectorAll)) && (ib(function (a) {
                a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && q.push("[*^$]=" + M + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + M + "*(?:value|" + L + ")"), a.querySelectorAll(":checked").length || q.push(":checked")
            }), ib(function (a) {
                var b = e.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + M + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ib(function (a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", Q)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function (a, b) {
                if (b)while (b = b.parentNode)if (b === a)return!0;
                return!1
            }, B = b ? function (a, b) {
                if (a === b)return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === v && t(v, a) ? -1 : b === e || b.ownerDocument === v && t(v, b) ? 1 : k ? K.call(k, a) - K.call(k, b) : 0 : 4 & d ? -1 : 1)
            } : function (a, b) {
                if (a === b)return l = !0, 0;
                var c, d = 0, f = a.parentNode, g = b.parentNode, h = [a], i = [b];
                if (!f || !g)return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : k ? K.call(k, a) - K.call(k, b) : 0;
                if (f === g)return kb(a, b);
                c = a;
                while (c = c.parentNode)h.unshift(c);
                c = b;
                while (c = c.parentNode)i.unshift(c);
                while (h[d] === i[d])d++;
                return d ? kb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
            }, e) : n
        }, fb.matches = function (a, b) {
            return fb(a, null, null, b)
        }, fb.matchesSelector = function (a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b)))try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType)return d
            } catch (e) {
            }
            return fb(b, n, null, [a]).length > 0
        }, fb.contains = function (a, b) {
            return(a.ownerDocument || a) !== n && m(a), t(a, b)
        }, fb.attr = function (a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()], f = e && E.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, fb.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, fb.uniqueSort = function (a) {
            var b, d = [], e = 0, f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++])b === a[f] && (e = d.push(f));
                while (e--)a.splice(d[e], 1)
            }
            return k = null, a
        }, e = fb.getText = function (a) {
            var b, c = "", d = 0, f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent)return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)c += e(a)
                } else if (3 === f || 4 === f)return a.nodeValue
            } else while (b = a[d++])c += e(b);
            return c
        }, d = fb.selectors = {cacheLength: 50, createPseudo: hb, match: X, attrHandle: {}, find: {}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (a) {
            return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
        }, CHILD: function (a) {
            return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fb.error(a[0]), a
        }, PSEUDO: function (a) {
            var b, c = !a[6] && a[2];
            return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
        }}, filter: {TAG: function (a) {
            var b = a.replace(cb, db).toLowerCase();
            return"*" === a ? function () {
                return!0
            } : function (a) {
                return a.nodeName && a.nodeName.toLowerCase() === b
            }
        }, CLASS: function (a) {
            var b = y[a + " "];
            return b || (b = new RegExp("(^|" + M + ")" + a + "(" + M + "|$)")) && y(a, function (a) {
                return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
            })
        }, ATTR: function (a, b, c) {
            return function (d) {
                var e = fb.attr(d, a);
                return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
            }
        }, CHILD: function (a, b, c, d, e) {
            var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
            return 1 === d && 0 === e ? function (a) {
                return!!a.parentNode
            } : function (b, c, i) {
                var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                if (q) {
                    if (f) {
                        while (p) {
                            l = b;
                            while (l = l[p])if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)return!1;
                            o = p = "only" === a && !o && "nextSibling"
                        }
                        return!0
                    }
                    if (o = [g ? q.firstChild : q.lastChild], g && s) {
                        k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                        while (l = ++n && l && l[p] || (m = n = 0) || o.pop())if (1 === l.nodeType && ++m && l === b) {
                            k[a] = [w, n, m];
                            break
                        }
                    } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w)m = j[1]; else while (l = ++n && l && l[p] || (m = n = 0) || o.pop())if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b))break;
                    return m -= e, m === d || m % d === 0 && m / d >= 0
                }
            }
        }, PSEUDO: function (a, b) {
            var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fb.error("unsupported pseudo: " + a);
            return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? hb(function (a, c) {
                var d, f = e(a, b), g = f.length;
                while (g--)d = K.call(a, f[g]), a[d] = !(c[d] = f[g])
            }) : function (a) {
                return e(a, 0, c)
            }) : e
        }}, pseudos: {not: hb(function (a) {
            var b = [], c = [], d = h(a.replace(R, "$1"));
            return d[u] ? hb(function (a, b, c, e) {
                var f, g = d(a, null, e, []), h = a.length;
                while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
            }) : function (a, e, f) {
                return b[0] = a, d(b, null, f, c), !c.pop()
            }
        }), has: hb(function (a) {
            return function (b) {
                return fb(a, b).length > 0
            }
        }), contains: hb(function (a) {
            return function (b) {
                return(b.textContent || b.innerText || e(b)).indexOf(a) > -1
            }
        }), lang: hb(function (a) {
            return W.test(a || "") || fb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(), function (b) {
                var c;
                do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                return!1
            }
        }), target: function (b) {
            var c = a.location && a.location.hash;
            return c && c.slice(1) === b.id
        }, root: function (a) {
            return a === o
        }, focus: function (a) {
            return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
        }, enabled: function (a) {
            return a.disabled === !1
        }, disabled: function (a) {
            return a.disabled === !0
        }, checked: function (a) {
            var b = a.nodeName.toLowerCase();
            return"input" === b && !!a.checked || "option" === b && !!a.selected
        }, selected: function (a) {
            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
        }, empty: function (a) {
            for (a = a.firstChild; a; a = a.nextSibling)if (a.nodeType < 6)return!1;
            return!0
        }, parent: function (a) {
            return!d.pseudos.empty(a)
        }, header: function (a) {
            return Z.test(a.nodeName)
        }, input: function (a) {
            return Y.test(a.nodeName)
        }, button: function (a) {
            var b = a.nodeName.toLowerCase();
            return"input" === b && "button" === a.type || "button" === b
        }, text: function (a) {
            var b;
            return"input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
        }, first: nb(function () {
            return[0]
        }), last: nb(function (a, b) {
            return[b - 1]
        }), eq: nb(function (a, b, c) {
            return[0 > c ? c + b : c]
        }), even: nb(function (a, b) {
            for (var c = 0; b > c; c += 2)a.push(c);
            return a
        }), odd: nb(function (a, b) {
            for (var c = 1; b > c; c += 2)a.push(c);
            return a
        }), lt: nb(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; --d >= 0;)a.push(d);
            return a
        }), gt: nb(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; ++d < b;)a.push(d);
            return a
        })}}, d.pseudos.nth = d.pseudos.eq;
        for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})d.pseudos[b] = lb(b);
        for (b in{submit: !0, reset: !0})d.pseudos[b] = mb(b);
        function pb() {
        }

        pb.prototype = d.filters = d.pseudos, d.setFilters = new pb, g = fb.tokenize = function (a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k)return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({value: c, type: e[0].replace(R, " ")}), h = h.slice(c.length));
                for (g in d.filter)!(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({value: c, type: g, matches: e}), h = h.slice(c.length));
                if (!c)break
            }
            return b ? h.length : h ? fb.error(a) : z(a, i).slice(0)
        };
        function qb(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++)d += a[b].value;
            return d
        }

        function rb(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = x++;
            return b.first ? function (b, c, f) {
                while (b = b[d])if (1 === b.nodeType || e)return a(b, c, f)
            } : function (b, c, g) {
                var h, i, j = [w, f];
                if (g) {
                    while (b = b[d])if ((1 === b.nodeType || e) && a(b, c, g))return!0
                } else while (b = b[d])if (1 === b.nodeType || e) {
                    if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f)return j[2] = h[2];
                    if (i[d] = j, j[2] = a(b, c, g))return!0
                }
            }
        }

        function sb(a) {
            return a.length > 1 ? function (b, c, d) {
                var e = a.length;
                while (e--)if (!a[e](b, c, d))return!1;
                return!0
            } : a[0]
        }

        function tb(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++)fb(a, b[d], c);
            return c
        }

        function ub(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function vb(a, b, c, d, e, f) {
            return d && !d[u] && (d = vb(d)), e && !e[u] && (e = vb(e, f)), hb(function (f, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = f || tb(b || "*", h.nodeType ? [h] : h, []), q = !a || !f && b ? p : ub(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = ub(r, n), d(j, [], h, i), k = j.length;
                    while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--)(l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--)(l = r[k]) && (j = e ? K.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = ub(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : I.apply(g, r)
            })
        }

        function wb(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = rb(function (a) {
                return a === b
            }, h, !0), l = rb(function (a) {
                return K.call(b, a) > -1
            }, h, !0), m = [function (a, c, d) {
                return!g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
            }]; f > i; i++)if (c = d.relative[a[i].type])m = [rb(sb(m), c)]; else {
                if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                    for (e = ++i; f > e; e++)if (d.relative[a[e].type])break;
                    return vb(i > 1 && sb(m), i > 1 && qb(a.slice(0, i - 1).concat({value: " " === a[i - 2].type ? "*" : ""})).replace(R, "$1"), c, e > i && wb(a.slice(i, e)), f > e && wb(a = a.slice(e)), f > e && qb(a))
                }
                m.push(c)
            }
            return sb(m)
        }

        function xb(a, b) {
            var c = b.length > 0, e = a.length > 0, f = function (f, g, h, i, k) {
                var l, m, o, p = 0, q = "0", r = f && [], s = [], t = j, u = f || e && d.find.TAG("*", k), v = w += null == t ? 1 : Math.random() || .1, x = u.length;
                for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                    if (e && l) {
                        m = 0;
                        while (o = a[m++])if (o(l, g, h)) {
                            i.push(l);
                            break
                        }
                        k && (w = v)
                    }
                    c && ((l = !o && l) && p--, f && r.push(l))
                }
                if (p += q, c && q !== p) {
                    m = 0;
                    while (o = b[m++])o(r, s, g, h);
                    if (f) {
                        if (p > 0)while (q--)r[q] || s[q] || (s[q] = G.call(i));
                        s = ub(s)
                    }
                    I.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && fb.uniqueSort(i)
                }
                return k && (w = v, j = t), r
            };
            return c ? hb(f) : f
        }

        return h = fb.compile = function (a, b) {
            var c, d = [], e = [], f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--)f = wb(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, xb(e, d)), f.selector = a
            }
            return f
        }, i = fb.select = function (a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a, o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b)return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                }
                i = X.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type])break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && ob(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && qb(j), !a)return I.apply(e, f), e;
                        break
                    }
                }
            }
            return(n || h(a, o))(f, b, !p, e, ab.test(a) && ob(b.parentNode) || b), e
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ib(function (a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"))
        }), ib(function (a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || jb("type|href|height|width", function (a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && ib(function (a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || jb("value", function (a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), ib(function (a) {
            return null == a.getAttribute("disabled")
        }) || jb(L, function (a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), fb
    }(a);
    m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;
    var t = m.expr.match.needsContext, u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, v = /^.[^:#\[\.,]*$/;

    function w(a, b, c) {
        if (m.isFunction(b))return m.grep(a, function (a, d) {
            return!!b.call(a, d, a) !== c
        });
        if (b.nodeType)return m.grep(a, function (a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (v.test(b))return m.filter(b, a, c);
            b = m.filter(b, a)
        }
        return m.grep(a, function (a) {
            return m.inArray(a, b) >= 0 !== c
        })
    }

    m.filter = function (a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function (a) {
            return 1 === a.nodeType
        }))
    }, m.fn.extend({find: function (a) {
        var b, c = [], d = this, e = d.length;
        if ("string" != typeof a)return this.pushStack(m(a).filter(function () {
            for (b = 0; e > b; b++)if (m.contains(d[b], this))return!0
        }));
        for (b = 0; e > b; b++)m.find(a, d[b], c);
        return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
    }, filter: function (a) {
        return this.pushStack(w(this, a || [], !1))
    }, not: function (a) {
        return this.pushStack(w(this, a || [], !0))
    }, is: function (a) {
        return!!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
    }});
    var x, y = a.document, z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, A = m.fn.init = function (a, b) {
        var c, d;
        if (!a)return this;
        if ("string" == typeof a) {
            if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b)return!b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b))for (c in b)m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this
            }
            if (d = y.getElementById(c[2]), d && d.parentNode) {
                if (d.id !== c[2])return x.find(a);
                this.length = 1, this[0] = d
            }
            return this.context = y, this.selector = a, this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
    };
    A.prototype = m.fn, x = m(y);
    var B = /^(?:parents|prev(?:Until|All))/, C = {children: !0, contents: !0, next: !0, prev: !0};
    m.extend({dir: function (a, b, c) {
        var d = [], e = a[b];
        while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c)))1 === e.nodeType && d.push(e), e = e[b];
        return d
    }, sibling: function (a, b) {
        for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
        return c
    }}), m.fn.extend({has: function (a) {
        var b, c = m(a, this), d = c.length;
        return this.filter(function () {
            for (b = 0; d > b; b++)if (m.contains(this, c[b]))return!0
        })
    }, closest: function (a, b) {
        for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++)for (c = this[d]; c && c !== b; c = c.parentNode)if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
            f.push(c);
            break
        }
        return this.pushStack(f.length > 1 ? m.unique(f) : f)
    }, index: function (a) {
        return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (a, b) {
        return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
    }, addBack: function (a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }});
    function D(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    m.each({parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null
    }, parents: function (a) {
        return m.dir(a, "parentNode")
    }, parentsUntil: function (a, b, c) {
        return m.dir(a, "parentNode", c)
    }, next: function (a) {
        return D(a, "nextSibling")
    }, prev: function (a) {
        return D(a, "previousSibling")
    }, nextAll: function (a) {
        return m.dir(a, "nextSibling")
    }, prevAll: function (a) {
        return m.dir(a, "previousSibling")
    }, nextUntil: function (a, b, c) {
        return m.dir(a, "nextSibling", c)
    }, prevUntil: function (a, b, c) {
        return m.dir(a, "previousSibling", c)
    }, siblings: function (a) {
        return m.sibling((a.parentNode || {}).firstChild, a)
    }, children: function (a) {
        return m.sibling(a.firstChild)
    }, contents: function (a) {
        return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
    }}, function (a, b) {
        m.fn[a] = function (c, d) {
            var e = m.map(this, b, c);
            return"Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
        }
    });
    var E = /\S+/g, F = {};

    function G(a) {
        var b = F[a] = {};
        return m.each(a.match(E) || [], function (a, c) {
            b[c] = !0
        }), b
    }

    m.Callbacks = function (a) {
        a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
        var b, c, d, e, f, g, h = [], i = !a.once && [], j = function (l) {
            for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                c = !1;
                break
            }
            b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
        }, k = {add: function () {
            if (h) {
                var d = h.length;
                !function f(b) {
                    m.each(b, function (b, c) {
                        var d = m.type(c);
                        "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
                    })
                }(arguments), b ? e = h.length : c && (g = d, j(c))
            }
            return this
        }, remove: function () {
            return h && m.each(arguments, function (a, c) {
                var d;
                while ((d = m.inArray(c, h, d)) > -1)h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
            }), this
        }, has: function (a) {
            return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
        }, empty: function () {
            return h = [], e = 0, this
        }, disable: function () {
            return h = i = c = void 0, this
        }, disabled: function () {
            return!h
        }, lock: function () {
            return i = void 0, c || k.disable(), this
        }, locked: function () {
            return!i
        }, fireWith: function (a, c) {
            return!h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
        }, fire: function () {
            return k.fireWith(this, arguments), this
        }, fired: function () {
            return!!d
        }};
        return k
    }, m.extend({Deferred: function (a) {
        var b = [
            ["resolve", "done", m.Callbacks("once memory"), "resolved"],
            ["reject", "fail", m.Callbacks("once memory"), "rejected"],
            ["notify", "progress", m.Callbacks("memory")]
        ], c = "pending", d = {state: function () {
            return c
        }, always: function () {
            return e.done(arguments).fail(arguments), this
        }, then: function () {
            var a = arguments;
            return m.Deferred(function (c) {
                m.each(b, function (b, f) {
                    var g = m.isFunction(a[b]) && a[b];
                    e[f[1]](function () {
                        var a = g && g.apply(this, arguments);
                        a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                    })
                }), a = null
            }).promise()
        }, promise: function (a) {
            return null != a ? m.extend(a, d) : d
        }}, e = {};
        return d.pipe = d.then, m.each(b, function (a, f) {
            var g = f[2], h = f[3];
            d[f[1]] = g.add, h && g.add(function () {
                c = h
            }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                return e[f[0] + "With"](this === e ? d : this, arguments), this
            }, e[f[0] + "With"] = g.fireWith
        }), d.promise(e), a && a.call(e, e), e
    }, when: function (a) {
        var b = 0, c = d.call(arguments), e = c.length, f = 1 !== e || a && m.isFunction(a.promise) ? e : 0, g = 1 === f ? a : m.Deferred(), h = function (a, b, c) {
            return function (e) {
                b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
            }
        }, i, j, k;
        if (e > 1)for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++)c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
        return f || g.resolveWith(k, c), g.promise()
    }});
    var H;
    m.fn.ready = function (a) {
        return m.ready.promise().done(a), this
    }, m.extend({isReady: !1, readyWait: 1, holdReady: function (a) {
        a ? m.readyWait++ : m.ready(!0)
    }, ready: function (a) {
        if (a === !0 ? !--m.readyWait : !m.isReady) {
            if (!y.body)return setTimeout(m.ready);
            m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")))
        }
    }});
    function I() {
        y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
    }

    function J() {
        (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
    }

    m.ready.promise = function (b) {
        if (!H)if (H = m.Deferred(), "complete" === y.readyState)setTimeout(m.ready); else if (y.addEventListener)y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1); else {
            y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
            var c = !1;
            try {
                c = null == a.frameElement && y.documentElement
            } catch (d) {
            }
            c && c.doScroll && !function e() {
                if (!m.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    I(), m.ready()
                }
            }()
        }
        return H.promise(b)
    };
    var K = "undefined", L;
    for (L in m(k))break;
    k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function () {
        var a, b, c, d;
        c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
    }), function () {
        var a = y.createElement("div");
        if (null == k.deleteExpando) {
            k.deleteExpando = !0;
            try {
                delete a.test
            } catch (b) {
                k.deleteExpando = !1
            }
        }
        a = null
    }(), m.acceptData = function (a) {
        var b = m.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    };
    var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, N = /([A-Z])/g;

    function O(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(N, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c
                } catch (e) {
                }
                m.data(a, b, c)
            } else c = void 0
        }
        return c
    }

    function P(a) {
        var b;
        for (b in a)if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b)return!1;
        return!0
    }

    function Q(a, b, d, e) {
        if (m.acceptData(a)) {
            var f, g, h = m.expando, i = a.nodeType, j = i ? m.cache : a, k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b)return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {toJSON: m.noop}), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
        }
    }

    function R(a, b, c) {
        if (m.acceptData(a)) {
            var d, e, f = a.nodeType, g = f ? m.cache : a, h = f ? a[m.expando] : m.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    while (e--)delete d[b[e]];
                    if (c ? !P(d) : !m.isEmptyObject(d))return
                }
                (c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
            }
        }
    }

    m.extend({cache: {}, noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"}, hasData: function (a) {
        return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a)
    }, data: function (a, b, c) {
        return Q(a, b, c)
    }, removeData: function (a, b) {
        return R(a, b)
    }, _data: function (a, b, c) {
        return Q(a, b, c, !0)
    }, _removeData: function (a, b) {
        return R(a, b, !0)
    }}), m.fn.extend({data: function (a, b) {
        var c, d, e, f = this[0], g = f && f.attributes;
        if (void 0 === a) {
            if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
                c = g.length;
                while (c--)g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
                m._data(f, "parsedAttrs", !0)
            }
            return e
        }
        return"object" == typeof a ? this.each(function () {
            m.data(this, a)
        }) : arguments.length > 1 ? this.each(function () {
            m.data(this, a, b)
        }) : f ? O(f, a, m.data(f, a)) : void 0
    }, removeData: function (a) {
        return this.each(function () {
            m.removeData(this, a)
        })
    }}), m.extend({queue: function (a, b, c) {
        var d;
        return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0
    }, dequeue: function (a, b) {
        b = b || "fx";
        var c = m.queue(a, b), d = c.length, e = c.shift(), f = m._queueHooks(a, b), g = function () {
            m.dequeue(a, b)
        };
        "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
    }, _queueHooks: function (a, b) {
        var c = b + "queueHooks";
        return m._data(a, c) || m._data(a, c, {empty: m.Callbacks("once memory").add(function () {
            m._removeData(a, b + "queue"), m._removeData(a, c)
        })})
    }}), m.fn.extend({queue: function (a, b) {
        var c = 2;
        return"string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function () {
            var c = m.queue(this, a, b);
            m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
        })
    }, dequeue: function (a) {
        return this.each(function () {
            m.dequeue(this, a)
        })
    }, clearQueue: function (a) {
        return this.queue(a || "fx", [])
    }, promise: function (a, b) {
        var c, d = 1, e = m.Deferred(), f = this, g = this.length, h = function () {
            --d || e.resolveWith(f, [f])
        };
        "string" != typeof a && (b = a, a = void 0), a = a || "fx";
        while (g--)c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
        return h(), e.promise(b)
    }});
    var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, T = ["Top", "Right", "Bottom", "Left"], U = function (a, b) {
        return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
    }, V = m.access = function (a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === m.type(c)) {
            e = !0;
            for (h in c)m.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
            return j.call(m(a), c)
        })), b))for (; i > h; h++)b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }, W = /^(?:checkbox|radio)$/i;
    !function () {
        var a = y.createElement("input"), b = y.createElement("div"), c = y.createDocumentFragment();
        if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () {
            k.noCloneEvent = !1
        }), b.cloneNode(!0).click()), null == k.deleteExpando) {
            k.deleteExpando = !0;
            try {
                delete b.test
            } catch (d) {
                k.deleteExpando = !1
            }
        }
    }(), function () {
        var b, c, d = y.createElement("div");
        for (b in{submit: !0, change: !0, focusin: !0})c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null
    }();
    var X = /^(?:input|select|textarea)$/i, Y = /^key/, Z = /^(?:mouse|pointer|contextmenu)|click/, $ = /^(?:focusinfocus|focusoutblur)$/, _ = /^([^.]*)(?:\.(.+)|)$/;

    function ab() {
        return!0
    }

    function bb() {
        return!1
    }

    function cb() {
        try {
            return y.activeElement
        } catch (a) {
        }
    }

    m.event = {global: {}, add: function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a);
        if (r) {
            c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
                return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
            }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
            while (h--)f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({type: o, origType: q, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && m.expr.match.needsContext.test(e), namespace: p.join(".")}, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
            a = null
        }
    }, remove: function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a);
        if (r && (k = r.events)) {
            b = (b || "").match(E) || [""], j = b.length;
            while (j--)if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
                while (f--)g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
                i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
            } else for (o in k)m.event.remove(a, o + b[j], c, d, !0);
            m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
        }
    }, trigger: function (b, c, d, e) {
        var f, g, h, i, k, l, n, o = [d || y], p = j.call(b, "type") ? b.type : b, q = j.call(b, "namespace") ? b.namespace.split(".") : [];
        if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
            if (!e && !k.noBubble && !m.isWindow(d)) {
                for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode)o.push(h), l = h;
                l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
            }
            n = 0;
            while ((h = o[n++]) && !b.isPropagationStopped())b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
            if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                l = d[g], l && (d[g] = null), m.event.triggered = p;
                try {
                    d[p]()
                } catch (r) {
                }
                m.event.triggered = void 0, l && (d[g] = l)
            }
            return b.result
        }
    }, dispatch: function (a) {
        a = m.event.fix(a);
        var b, c, e, f, g, h = [], i = d.call(arguments), j = (m._data(this, "events") || {})[a.type] || [], k = m.event.special[a.type] || {};
        if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
            h = m.event.handlers.call(this, a, j), b = 0;
            while ((f = h[b++]) && !a.isPropagationStopped()) {
                a.currentTarget = f.elem, g = 0;
                while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
            }
            return k.postDispatch && k.postDispatch.call(this, a), a.result
        }
    }, handlers: function (a, b) {
        var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
        if (h && i.nodeType && (!a.button || "click" !== a.type))for (; i != this; i = i.parentNode || this)if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
            for (e = [], f = 0; h > f; f++)d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
            e.length && g.push({elem: i, handlers: e})
        }
        return h < b.length && g.push({elem: this, handlers: b.slice(h)}), g
    }, fix: function (a) {
        if (a[m.expando])return a;
        var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
        g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;
        while (b--)c = d[b], a[c] = f[c];
        return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
    }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, b) {
        var c, d, e, f = b.button, g = b.fromElement;
        return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
    }}, special: {load: {noBubble: !0}, focus: {trigger: function () {
        if (this !== cb() && this.focus)try {
            return this.focus(), !1
        } catch (a) {
        }
    }, delegateType: "focusin"}, blur: {trigger: function () {
        return this === cb() && this.blur ? (this.blur(), !1) : void 0
    }, delegateType: "focusout"}, click: {trigger: function () {
        return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
    }, _default: function (a) {
        return m.nodeName(a.target, "a")
    }}, beforeunload: {postDispatch: function (a) {
        void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
    }}}, simulate: function (a, b, c, d) {
        var e = m.extend(new m.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
        d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }}, m.removeEvent = y.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
    }, m.Event = function (a, b) {
        return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ab : bb) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m.Event(a, b)
    }, m.Event.prototype = {isDefaultPrevented: bb, isPropagationStopped: bb, isImmediatePropagationStopped: bb, preventDefault: function () {
        var a = this.originalEvent;
        this.isDefaultPrevented = ab, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    }, stopPropagation: function () {
        var a = this.originalEvent;
        this.isPropagationStopped = ab, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    }, stopImmediatePropagation: function () {
        var a = this.originalEvent;
        this.isImmediatePropagationStopped = ab, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
    }}, m.each({mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout"}, function (a, b) {
        m.event.special[a] = {delegateType: b, bindType: b, handle: function (a) {
            var c, d = this, e = a.relatedTarget, f = a.handleObj;
            return(!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
        }}
    }), k.submitBubbles || (m.event.special.submit = {setup: function () {
        return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function (a) {
            var b = a.target, c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
            c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function (a) {
                a._submit_bubble = !0
            }), m._data(c, "submitBubbles", !0))
        })
    }, postDispatch: function (a) {
        a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
    }, teardown: function () {
        return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
    }}), k.changeBubbles || (m.event.special.change = {setup: function () {
        return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function (a) {
            "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
        }), m.event.add(this, "click._change", function (a) {
            this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0)
        })), !1) : void m.event.add(this, "beforeactivate._change", function (a) {
            var b = a.target;
            X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function (a) {
                !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
            }), m._data(b, "changeBubbles", !0))
        })
    }, handle: function (a) {
        var b = a.target;
        return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
    }, teardown: function () {
        return m.event.remove(this, "._change"), !X.test(this.nodeName)
    }}), k.focusinBubbles || m.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = function (a) {
            m.event.simulate(b, a.target, m.event.fix(a), !0)
        };
        m.event.special[b] = {setup: function () {
            var d = this.ownerDocument || this, e = m._data(d, b);
            e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1)
        }, teardown: function () {
            var d = this.ownerDocument || this, e = m._data(d, b) - 1;
            e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
        }}
    }), m.fn.extend({on: function (a, b, c, d, e) {
        var f, g;
        if ("object" == typeof a) {
            "string" != typeof b && (c = c || b, b = void 0);
            for (f in a)this.on(f, b, c, a[f], e);
            return this
        }
        if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)d = bb; else if (!d)return this;
        return 1 === e && (g = d, d = function (a) {
            return m().off(a), g.apply(this, arguments)
        }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function () {
            m.event.add(this, a, d, c, b)
        })
    }, one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1)
    }, off: function (a, b, c) {
        var d, e;
        if (a && a.preventDefault && a.handleObj)return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
        if ("object" == typeof a) {
            for (e in a)this.off(e, b, a[e]);
            return this
        }
        return(b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = bb), this.each(function () {
            m.event.remove(this, a, c, b)
        })
    }, trigger: function (a, b) {
        return this.each(function () {
            m.event.trigger(a, b, this)
        })
    }, triggerHandler: function (a, b) {
        var c = this[0];
        return c ? m.event.trigger(a, b, c, !0) : void 0
    }});
    function db(a) {
        var b = eb.split("|"), c = a.createDocumentFragment();
        if (c.createElement)while (b.length)c.createElement(b.pop());
        return c
    }

    var eb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", fb = / jQuery\d+="(?:null|\d+)"/g, gb = new RegExp("<(?:" + eb + ")[\\s/>]", "i"), hb = /^\s+/, ib = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, jb = /<([\w:]+)/, kb = /<tbody/i, lb = /<|&#?\w+;/, mb = /<(?:script|style|link)/i, nb = /checked\s*(?:[^=]|=\s*.checked.)/i, ob = /^$|\/(?:java|ecma)script/i, pb = /^true\/(.*)/, qb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, rb = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]}, sb = db(y), tb = sb.appendChild(y.createElement("div"));
    rb.optgroup = rb.option, rb.tbody = rb.tfoot = rb.colgroup = rb.caption = rb.thead, rb.th = rb.td;
    function ub(a, b) {
        var c, d, e = 0, f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0;
        if (!f)for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)!b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ub(d, b));
        return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
    }

    function vb(a) {
        W.test(a.type) && (a.defaultChecked = a.checked)
    }

    function wb(a, b) {
        return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function xb(a) {
        return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
    }

    function yb(a) {
        var b = pb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function zb(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++)m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
    }

    function Ab(a, b) {
        if (1 === b.nodeType && m.hasData(a)) {
            var c, d, e, f = m._data(a), g = m._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)for (d = 0, e = h[c].length; e > d; d++)m.event.add(b, c, h[c][d])
            }
            g.data && (g.data = m.extend({}, g.data))
        }
    }

    function Bb(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
                e = m._data(b);
                for (d in e.events)m.removeEvent(b, d, e.handle);
                b.removeAttribute(m.expando)
            }
            "script" === c && b.text !== a.text ? (xb(b).text = a.text, yb(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }

    m.extend({clone: function (a, b, c) {
        var d, e, f, g, h, i = m.contains(a.ownerDocument, a);
        if (k.html5Clone || m.isXMLDoc(a) || !gb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (tb.innerHTML = a.outerHTML, tb.removeChild(f = tb.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))for (d = ub(f), h = ub(a), g = 0; null != (e = h[g]); ++g)d[g] && Bb(e, d[g]);
        if (b)if (c)for (h = h || ub(a), d = d || ub(f), g = 0; null != (e = h[g]); g++)Ab(e, d[g]); else Ab(a, f);
        return d = ub(f, "script"), d.length > 0 && zb(d, !i && ub(a, "script")), d = h = e = null, f
    }, buildFragment: function (a, b, c, d) {
        for (var e, f, g, h, i, j, l, n = a.length, o = db(b), p = [], q = 0; n > q; q++)if (f = a[q], f || 0 === f)if ("object" === m.type(f))m.merge(p, f.nodeType ? [f] : f); else if (lb.test(f)) {
            h = h || o.appendChild(b.createElement("div")), i = (jb.exec(f) || ["", ""])[1].toLowerCase(), l = rb[i] || rb._default, h.innerHTML = l[1] + f.replace(ib, "<$1></$2>") + l[2], e = l[0];
            while (e--)h = h.lastChild;
            if (!k.leadingWhitespace && hb.test(f) && p.push(b.createTextNode(hb.exec(f)[0])), !k.tbody) {
                f = "table" !== i || kb.test(f) ? "<table>" !== l[1] || kb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
                while (e--)m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
            }
            m.merge(p, h.childNodes), h.textContent = "";
            while (h.firstChild)h.removeChild(h.firstChild);
            h = o.lastChild
        } else p.push(b.createTextNode(f));
        h && o.removeChild(h), k.appendChecked || m.grep(ub(p, "input"), vb), q = 0;
        while (f = p[q++])if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ub(o.appendChild(f), "script"), g && zb(h), c)) {
            e = 0;
            while (f = h[e++])ob.test(f.type || "") && c.push(f)
        }
        return h = null, o
    }, cleanData: function (a, b) {
        for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++)if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
            if (g.events)for (e in g.events)n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
            j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f))
        }
    }}), m.fn.extend({text: function (a) {
        return V(this, function (a) {
            return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
        }, null, a, arguments.length)
    }, append: function () {
        return this.domManip(arguments, function (a) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var b = wb(this, a);
                b.appendChild(a)
            }
        })
    }, prepend: function () {
        return this.domManip(arguments, function (a) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var b = wb(this, a);
                b.insertBefore(a, b.firstChild)
            }
        })
    }, before: function () {
        return this.domManip(arguments, function (a) {
            this.parentNode && this.parentNode.insertBefore(a, this)
        })
    }, after: function () {
        return this.domManip(arguments, function (a) {
            this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
        })
    }, remove: function (a, b) {
        for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++)b || 1 !== c.nodeType || m.cleanData(ub(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && zb(ub(c, "script")), c.parentNode.removeChild(c));
        return this
    }, empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++) {
            1 === a.nodeType && m.cleanData(ub(a, !1));
            while (a.firstChild)a.removeChild(a.firstChild);
            a.options && m.nodeName(a, "select") && (a.options.length = 0)
        }
        return this
    }, clone: function (a, b) {
        return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
            return m.clone(this, a, b)
        })
    }, html: function (a) {
        return V(this, function (a) {
            var b = this[0] || {}, c = 0, d = this.length;
            if (void 0 === a)return 1 === b.nodeType ? b.innerHTML.replace(fb, "") : void 0;
            if (!("string" != typeof a || mb.test(a) || !k.htmlSerialize && gb.test(a) || !k.leadingWhitespace && hb.test(a) || rb[(jb.exec(a) || ["", ""])[1].toLowerCase()])) {
                a = a.replace(ib, "<$1></$2>");
                try {
                    for (; d > c; c++)b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ub(b, !1)), b.innerHTML = a);
                    b = 0
                } catch (e) {
                }
            }
            b && this.empty().append(a)
        }, null, a, arguments.length)
    }, replaceWith: function () {
        var a = arguments[0];
        return this.domManip(arguments, function (b) {
            a = this.parentNode, m.cleanData(ub(this)), a && a.replaceChild(b, this)
        }), a && (a.length || a.nodeType) ? this : this.remove()
    }, detach: function (a) {
        return this.remove(a, !0)
    }, domManip: function (a, b) {
        a = e.apply([], a);
        var c, d, f, g, h, i, j = 0, l = this.length, n = this, o = l - 1, p = a[0], q = m.isFunction(p);
        if (q || l > 1 && "string" == typeof p && !k.checkClone && nb.test(p))return this.each(function (c) {
            var d = n.eq(c);
            q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
        });
        if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
            for (g = m.map(ub(i, "script"), xb), f = g.length; l > j; j++)d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ub(d, "script"))), b.call(this[j], d, j);
            if (f)for (h = g[g.length - 1].ownerDocument, m.map(g, yb), j = 0; f > j; j++)d = g[j], ob.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qb, "")));
            i = c = null
        }
        return this
    }}), m.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (a, b) {
        m.fn[a] = function (a) {
            for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++)c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get());
            return this.pushStack(e)
        }
    });
    var Cb, Db = {};

    function Eb(b, c) {
        var d, e = m(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");
        return e.detach(), f
    }

    function Fb(a) {
        var b = y, c = Db[a];
        return c || (c = Eb(a, b), "none" !== c && c || (Cb = (Cb || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Cb[0].contentWindow || Cb[0].contentDocument).document, b.write(), b.close(), c = Eb(a, b), Cb.detach()), Db[a] = c), c
    }

    !function () {
        var a;
        k.shrinkWrapBlocks = function () {
            if (null != a)return a;
            a = !1;
            var b, c, d;
            return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
        }
    }();
    var Gb = /^margin/, Hb = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"), Ib, Jb, Kb = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Ib = function (a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null)
    }, Jb = function (a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ib(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Hb.test(g) && Gb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
    }) : y.documentElement.currentStyle && (Ib = function (a) {
        return a.currentStyle
    }, Jb = function (a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ib(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Hb.test(g) && !Kb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
    });
    function Lb(a, b) {
        return{get: function () {
            var c = a();
            if (null != c)return c ? void delete this.get : (this.get = b).apply(this, arguments)
        }}
    }

    !function () {
        var b, c, d, e, f, g, h;
        if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
            c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !!c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, {reliableHiddenOffsets: function () {
                return null == g && i(), g
            }, boxSizingReliable: function () {
                return null == f && i(), f
            }, pixelPosition: function () {
                return null == e && i(), e
            }, reliableMarginRight: function () {
                return null == h && i(), h
            }});
            function i() {
                var b, c, d, i;
                c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || {width: "4px"}).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
            }
        }
    }(), m.swap = function (a, b, c, d) {
        var e, f, g = {};
        for (f in b)g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b)a.style[f] = g[f];
        return e
    };
    var Mb = /alpha\([^)]*\)/i, Nb = /opacity\s*=\s*([^)]*)/, Ob = /^(none|table(?!-c[ea]).+)/, Pb = new RegExp("^(" + S + ")(.*)$", "i"), Qb = new RegExp("^([+-])=(" + S + ")", "i"), Rb = {position: "absolute", visibility: "hidden", display: "block"}, Sb = {letterSpacing: "0", fontWeight: "400"}, Tb = ["Webkit", "O", "Moz", "ms"];

    function Ub(a, b) {
        if (b in a)return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = Tb.length;
        while (e--)if (b = Tb[e] + c, b in a)return b;
        return d
    }

    function Vb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fb(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
        for (g = 0; h > g; g++)d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function Wb(a, b, c) {
        var d = Pb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function Xb(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)"margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
        return g
    }

    function Yb(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = Ib(a), g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = Jb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Hb.test(e))return e;
            d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + Xb(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    m.extend({cssHooks: {opacity: {get: function (a, b) {
        if (b) {
            var c = Jb(a, "opacity");
            return"" === c ? "1" : c
        }
    }}}, cssNumber: {columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": k.cssFloat ? "cssFloat" : "styleFloat"}, style: function (a, b, c, d) {
        if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
            var e, f, g, h = m.camelCase(b), i = a.style;
            if (b = m.cssProps[h] || (m.cssProps[h] = Ub(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c)return g && "get"in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
            if (f = typeof c, "string" === f && (e = Qb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set"in g && void 0 === (c = g.set(a, c, d)))))try {
                i[b] = c
            } catch (j) {
            }
        }
    }, css: function (a, b, c, d) {
        var e, f, g, h = m.camelCase(b);
        return b = m.cssProps[h] || (m.cssProps[h] = Ub(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get"in g && (f = g.get(a, !0, c)), void 0 === f && (f = Jb(a, b, d)), "normal" === f && b in Sb && (f = Sb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
    }}), m.each(["height", "width"], function (a, b) {
        m.cssHooks[b] = {get: function (a, c, d) {
            return c ? Ob.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Rb, function () {
                return Yb(a, b, d)
            }) : Yb(a, b, d) : void 0
        }, set: function (a, c, d) {
            var e = d && Ib(a);
            return Wb(a, c, d ? Xb(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0)
        }}
    }), k.opacity || (m.cssHooks.opacity = {get: function (a, b) {
        return Nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
    }, set: function (a, b) {
        var c = a.style, d = a.currentStyle, e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
        c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Mb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Mb.test(f) ? f.replace(Mb, e) : f + " " + e)
    }}), m.cssHooks.marginRight = Lb(k.reliableMarginRight, function (a, b) {
        return b ? m.swap(a, {display: "inline-block"}, Jb, [a, "marginRight"]) : void 0
    }), m.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        m.cssHooks[a + b] = {expand: function (c) {
            for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
            return e
        }}, Gb.test(a) || (m.cssHooks[a + b].set = Wb)
    }), m.fn.extend({css: function (a, b) {
        return V(this, function (a, b, c) {
            var d, e, f = {}, g = 0;
            if (m.isArray(b)) {
                for (d = Ib(a), e = b.length; e > g; g++)f[b[g]] = m.css(a, b[g], !1, d);
                return f
            }
            return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
        }, a, b, arguments.length > 1)
    }, show: function () {
        return Vb(this, !0)
    }, hide: function () {
        return Vb(this)
    }, toggle: function (a) {
        return"boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
            U(this) ? m(this).show() : m(this).hide()
        })
    }});
    function Zb(a, b, c, d, e) {
        return new Zb.prototype.init(a, b, c, d, e)
    }

    m.Tween = Zb, Zb.prototype = {constructor: Zb, init: function (a, b, c, d, e, f) {
        this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px")
    }, cur: function () {
        var a = Zb.propHooks[this.prop];
        return a && a.get ? a.get(this) : Zb.propHooks._default.get(this)
    }, run: function (a) {
        var b, c = Zb.propHooks[this.prop];
        return this.pos = b = this.options.duration ? m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Zb.propHooks._default.set(this), this
    }}, Zb.prototype.init.prototype = Zb.prototype, Zb.propHooks = {_default: {get: function (a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
    }, set: function (a) {
        m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
    }}}, Zb.propHooks.scrollTop = Zb.propHooks.scrollLeft = {set: function (a) {
        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
    }}, m.easing = {linear: function (a) {
        return a
    }, swing: function (a) {
        return.5 - Math.cos(a * Math.PI) / 2
    }}, m.fx = Zb.prototype.init, m.fx.step = {};
    var $b, _b, ac = /^(?:toggle|show|hide)$/, bc = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"), cc = /queueHooks$/, dc = [ic], ec = {"*": [function (a, b) {
        var c = this.createTween(a, b), d = c.cur(), e = bc.exec(b), f = e && e[3] || (m.cssNumber[a] ? "" : "px"), g = (m.cssNumber[a] || "px" !== f && +d) && bc.exec(m.css(c.elem, a)), h = 1, i = 20;
        if (g && g[3] !== f) {
            f = f || g[3], e = e || [], g = +d || 1;
            do h = h || ".5", g /= h, m.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
        }
        return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
    }]};

    function fc() {
        return setTimeout(function () {
            $b = void 0
        }), $b = m.now()
    }

    function gc(a, b) {
        var c, d = {height: a}, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b)c = T[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function hc(a, b, c) {
        for (var d, e = (ec[b] || []).concat(ec["*"]), f = 0, g = e.length; g > f; f++)if (d = e[f].call(c, b, a))return d
    }

    function ic(a, b, c) {
        var d, e, f, g, h, i, j, l, n = this, o = {}, p = a.style, q = a.nodeType && U(a), r = m._data(a, "fxshow");
        c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
            h.unqueued || i()
        }), h.unqueued++, n.always(function () {
            n.always(function () {
                h.unqueued--, m.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fb(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fb(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function () {
            p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
        }));
        for (d in b)if (e = b[d], ac.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                if ("show" !== e || !r || void 0 === r[d])continue;
                q = !0
            }
            o[d] = r && r[d] || m.style(a, d)
        } else j = void 0;
        if (m.isEmptyObject(o))"inline" === ("none" === j ? Fb(a.nodeName) : j) && (p.display = j); else {
            r ? "hidden"in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function () {
                m(a).hide()
            }), n.done(function () {
                var b;
                m._removeData(a, "fxshow");
                for (b in o)m.style(a, b, o[b])
            });
            for (d in o)g = hc(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function jc(a, b) {
        var c, d, e, f, g;
        for (c in a)if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand"in g) {
            f = g.expand(f), delete a[d];
            for (c in f)c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }

    function kc(a, b, c) {
        var d, e, f = 0, g = dc.length, h = m.Deferred().always(function () {
            delete i.elem
        }), i = function () {
            if (e)return!1;
            for (var b = $b || fc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        }, j = h.promise({elem: a, props: m.extend({}, b), opts: m.extend(!0, {specialEasing: {}}, c), originalProperties: b, originalOptions: c, startTime: $b || fc(), duration: c.duration, tweens: [], createTween: function (b, c) {
            var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
            return j.tweens.push(d), d
        }, stop: function (b) {
            var c = 0, d = b ? j.tweens.length : 0;
            if (e)return this;
            for (e = !0; d > c; c++)j.tweens[c].run(1);
            return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
        }}), k = j.props;
        for (jc(k, j.opts.specialEasing); g > f; f++)if (d = dc[f].call(j, a, k, j.opts))return d;
        return m.map(k, hc, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {elem: a, anim: j, queue: j.opts.queue})), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    m.Animation = m.extend(kc, {tweener: function (a, b) {
        m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
        for (var c, d = 0, e = a.length; e > d; d++)c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b)
    }, prefilter: function (a, b) {
        b ? dc.unshift(a) : dc.push(a)
    }}), m.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? m.extend({}, a) : {complete: c || !c && b || m.isFunction(a) && a, duration: a, easing: c && b || b && !m.isFunction(b) && b};
        return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue)
        }, d
    }, m.fn.extend({fadeTo: function (a, b, c, d) {
        return this.filter(U).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
    }, animate: function (a, b, c, d) {
        var e = m.isEmptyObject(a), f = m.speed(b, c, d), g = function () {
            var b = kc(this, m.extend({}, a), f);
            (e || m._data(this, "finish")) && b.stop(!0)
        };
        return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
    }, stop: function (a, b, c) {
        var d = function (a) {
            var b = a.stop;
            delete a.stop, b(c)
        };
        return"string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
            var b = !0, e = null != a && a + "queueHooks", f = m.timers, g = m._data(this);
            if (e)g[e] && g[e].stop && d(g[e]); else for (e in g)g[e] && g[e].stop && cc.test(e) && d(g[e]);
            for (e = f.length; e--;)f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
            (b || !c) && m.dequeue(this, a)
        })
    }, finish: function (a) {
        return a !== !1 && (a = a || "fx"), this.each(function () {
            var b, c = m._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = m.timers, g = d ? d.length : 0;
            for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
            for (b = 0; g > b; b++)d[b] && d[b].finish && d[b].finish.call(this);
            delete c.finish
        })
    }}), m.each(["toggle", "show", "hide"], function (a, b) {
        var c = m.fn[b];
        m.fn[b] = function (a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gc(b, !0), a, d, e)
        }
    }), m.each({slideDown: gc("show"), slideUp: gc("hide"), slideToggle: gc("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (a, b) {
        m.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), m.timers = [], m.fx.tick = function () {
        var a, b = m.timers, c = 0;
        for ($b = m.now(); c < b.length; c++)a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || m.fx.stop(), $b = void 0
    }, m.fx.timer = function (a) {
        m.timers.push(a), a() ? m.fx.start() : m.timers.pop()
    }, m.fx.interval = 13, m.fx.start = function () {
        _b || (_b = setInterval(m.fx.tick, m.fx.interval))
    }, m.fx.stop = function () {
        clearInterval(_b), _b = null
    }, m.fx.speeds = {slow: 600, fast: 200, _default: 400}, m.fn.delay = function (a, b) {
        return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
            var d = setTimeout(b, a);
            c.stop = function () {
                clearTimeout(d)
            }
        })
    }, function () {
        var a, b, c, d, e;
        b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value
    }();
    var lc = /\r/g;
    m.fn.extend({val: function (a) {
        var b, c, d, e = this[0];
        {
            if (arguments.length)return d = m.isFunction(a), this.each(function (c) {
                var e;
                1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function (a) {
                    return null == a ? "" : a + ""
                })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set"in b && void 0 !== b.set(this, e, "value") || (this.value = e))
            });
            if (e)return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get"in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lc, "") : null == c ? "" : c)
        }
    }}), m.extend({valHooks: {option: {get: function (a) {
        var b = m.find.attr(a, "value");
        return null != b ? b : m.trim(m.text(a))
    }}, select: {get: function (a) {
        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
            if (b = m(c).val(), f)return b;
            g.push(b)
        }
        return g
    }, set: function (a, b) {
        var c, d, e = a.options, f = m.makeArray(b), g = e.length;
        while (g--)if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0)try {
            d.selected = c = !0
        } catch (h) {
            d.scrollHeight
        } else d.selected = !1;
        return c || (a.selectedIndex = -1), e
    }}}}), m.each(["radio", "checkbox"], function () {
        m.valHooks[this] = {set: function (a, b) {
            return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
        }}, k.checkOn || (m.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var mc, nc, oc = m.expr.attrHandle, pc = /^(?:checked|selected)$/i, qc = k.getSetAttribute, rc = k.input;
    m.fn.extend({attr: function (a, b) {
        return V(this, m.attr, a, b, arguments.length > 1)
    }, removeAttr: function (a) {
        return this.each(function () {
            m.removeAttr(this, a)
        })
    }}), m.extend({attr: function (a, b, c) {
        var d, e, f = a.nodeType;
        if (a && 3 !== f && 8 !== f && 2 !== f)return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nc : mc)), void 0 === c ? d && "get"in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set"in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
    }, removeAttr: function (a, b) {
        var c, d, e = 0, f = b && b.match(E);
        if (f && 1 === a.nodeType)while (c = f[e++])d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rc && qc || !pc.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qc ? c : d)
    }, attrHooks: {type: {set: function (a, b) {
        if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
        }
    }}}}), nc = {set: function (a, b, c) {
        return b === !1 ? m.removeAttr(a, c) : rc && qc || !pc.test(c) ? a.setAttribute(!qc && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
    }}, m.each(m.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = oc[b] || m.find.attr;
        oc[b] = rc && qc || !pc.test(b) ? function (a, b, d) {
            var e, f;
            return d || (f = oc[b], oc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, oc[b] = f), e
        } : function (a, b, c) {
            return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    }), rc && qc || (m.attrHooks.value = {set: function (a, b, c) {
        return m.nodeName(a, "input") ? void(a.defaultValue = b) : mc && mc.set(a, b, c)
    }}), qc || (mc = {set: function (a, b, c) {
        var d = a.getAttributeNode(c);
        return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
    }}, oc.id = oc.name = oc.coords = function (a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }, m.valHooks.button = {get: function (a, b) {
        var c = a.getAttributeNode(b);
        return c && c.specified ? c.value : void 0
    }, set: mc.set}, m.attrHooks.contenteditable = {set: function (a, b, c) {
        mc.set(a, "" === b ? !1 : b, c)
    }}, m.each(["width", "height"], function (a, b) {
        m.attrHooks[b] = {set: function (a, c) {
            return"" === c ? (a.setAttribute(b, "auto"), c) : void 0
        }}
    })), k.style || (m.attrHooks.style = {get: function (a) {
        return a.style.cssText || void 0
    }, set: function (a, b) {
        return a.style.cssText = b + ""
    }});
    var sc = /^(?:input|select|textarea|button|object)$/i, tc = /^(?:a|area)$/i;
    m.fn.extend({prop: function (a, b) {
        return V(this, m.prop, a, b, arguments.length > 1)
    }, removeProp: function (a) {
        return a = m.propFix[a] || a, this.each(function () {
            try {
                this[a] = void 0, delete this[a]
            } catch (b) {
            }
        })
    }}), m.extend({propFix: {"for": "htmlFor", "class": "className"}, prop: function (a, b, c) {
        var d, e, f, g = a.nodeType;
        if (a && 3 !== g && 8 !== g && 2 !== g)return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set"in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get"in e && null !== (d = e.get(a, b)) ? d : a[b]
    }, propHooks: {tabIndex: {get: function (a) {
        var b = m.find.attr(a, "tabindex");
        return b ? parseInt(b, 10) : sc.test(a.nodeName) || tc.test(a.nodeName) && a.href ? 0 : -1
    }}}}), k.hrefNormalized || m.each(["href", "src"], function (a, b) {
        m.propHooks[b] = {get: function (a) {
            return a.getAttribute(b, 4)
        }}
    }), k.optSelected || (m.propHooks.selected = {get: function (a) {
        var b = a.parentNode;
        return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
    }}), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        m.propFix[this.toLowerCase()] = this
    }), k.enctype || (m.propFix.enctype = "encoding");
    var uc = /[\t\r\n\f]/g;
    m.fn.extend({addClass: function (a) {
        var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
        if (m.isFunction(a))return this.each(function (b) {
            m(this).addClass(a.call(this, b, this.className))
        });
        if (j)for (b = (a || "").match(E) || []; i > h; h++)if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : " ")) {
            f = 0;
            while (e = b[f++])d.indexOf(" " + e + " ") < 0 && (d += e + " ");
            g = m.trim(d), c.className !== g && (c.className = g)
        }
        return this
    }, removeClass: function (a) {
        var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a;
        if (m.isFunction(a))return this.each(function (b) {
            m(this).removeClass(a.call(this, b, this.className))
        });
        if (j)for (b = (a || "").match(E) || []; i > h; h++)if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : "")) {
            f = 0;
            while (e = b[f++])while (d.indexOf(" " + e + " ") >= 0)d = d.replace(" " + e + " ", " ");
            g = a ? m.trim(d) : "", c.className !== g && (c.className = g)
        }
        return this
    }, toggleClass: function (a, b) {
        var c = typeof a;
        return"boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function (c) {
            m(this).toggleClass(a.call(this, c, this.className, b), b)
        } : function () {
            if ("string" === c) {
                var b, d = 0, e = m(this), f = a.match(E) || [];
                while (b = f[d++])e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
            } else(c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
        })
    }, hasClass: function (a) {
        for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(uc, " ").indexOf(b) >= 0)return!0;
        return!1
    }}), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        m.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), m.fn.extend({hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
    }, bind: function (a, b, c) {
        return this.on(a, null, b, c)
    }, unbind: function (a, b) {
        return this.off(a, null, b)
    }, delegate: function (a, b, c, d) {
        return this.on(b, a, c, d)
    }, undelegate: function (a, b, c) {
        return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
    }});
    var vc = m.now(), wc = /\?/, xc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    m.parseJSON = function (b) {
        if (a.JSON && a.JSON.parse)return a.JSON.parse(b + "");
        var c, d = null, e = m.trim(b + "");
        return e && !m.trim(e.replace(xc, function (a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
        })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
    }, m.parseXML = function (b) {
        var c, d;
        if (!b || "string" != typeof b)return null;
        try {
            a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c
    };
    var yc, zc, Ac = /#.*$/, Bc = /([?&])_=[^&]*/, Cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Dc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ec = /^(?:GET|HEAD)$/, Fc = /^\/\//, Gc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Hc = {}, Ic = {}, Jc = "*/".concat("*");
    try {
        zc = location.href
    } catch (Kc) {
        zc = y.createElement("a"), zc.href = "", zc = zc.href
    }
    yc = Gc.exec(zc.toLowerCase()) || [];
    function Lc(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(E) || [];
            if (m.isFunction(c))while (d = f[e++])"+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function Mc(a, b, c, d) {
        var e = {}, f = a === Ic;

        function g(h) {
            var i;
            return e[h] = !0, m.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return"string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }

        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function Nc(a, b) {
        var c, d, e = m.ajaxSettings.flatOptions || {};
        for (d in b)void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && m.extend(!0, a, c), a
    }

    function Oc(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes;
        while ("*" === i[0])i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)for (g in h)if (h[g] && h[g].test(e)) {
            i.unshift(g);
            break
        }
        if (i[0]in c)f = i[0]; else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function Pc(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1])for (g in a.converters)j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())if ("*" === f)f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)for (e in j)if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break
            }
            if (g !== !0)if (g && a["throws"])b = g(b); else try {
                b = g(b)
            } catch (l) {
                return{state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
            }
        }
        return{state: "success", data: b}
    }

    m.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: zc, type: "GET", isLocal: Dc.test(yc[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": Jc, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"}, converters: {"* text": String, "text html": !0, "text json": m.parseJSON, "text xml": m.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function (a, b) {
        return b ? Nc(Nc(a, m.ajaxSettings), b) : Nc(m.ajaxSettings, a)
    }, ajaxPrefilter: Lc(Hc), ajaxTransport: Lc(Ic), ajax: function (a, b) {
        "object" == typeof a && (b = a, a = void 0), b = b || {};
        var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b), l = k.context || k, n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event, o = m.Deferred(), p = m.Callbacks("once memory"), q = k.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {readyState: 0, getResponseHeader: function (a) {
            var b;
            if (2 === t) {
                if (!j) {
                    j = {};
                    while (b = Cc.exec(f))j[b[1].toLowerCase()] = b[2]
                }
                b = j[a.toLowerCase()]
            }
            return null == b ? null : b
        }, getAllResponseHeaders: function () {
            return 2 === t ? f : null
        }, setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return t || (a = s[c] = s[c] || a, r[a] = b), this
        }, overrideMimeType: function (a) {
            return t || (k.mimeType = a), this
        }, statusCode: function (a) {
            var b;
            if (a)if (2 > t)for (b in a)q[b] = [q[b], a[b]]; else v.always(a[v.status]);
            return this
        }, abort: function (a) {
            var b = a || u;
            return i && i.abort(b), x(0, b), this
        }};
        if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zc) + "").replace(Ac, "").replace(Fc, yc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yc[1] && c[2] === yc[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yc[3] || ("http:" === yc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mc(Hc, k, b, v), 2 === t)return v;
        h = k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Ec.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wc.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bc.test(e) ? e.replace(Bc, "$1_=" + vc++) : e + (wc.test(e) ? "&" : "?") + "_=" + vc++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jc + "; q=0.01" : "") : k.accepts["*"]);
        for (d in k.headers)v.setRequestHeader(d, k.headers[d]);
        if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t))return v.abort();
        u = "abort";
        for (d in{success: 1, error: 1, complete: 1})v[d](k[d]);
        if (i = Mc(Ic, k, b, v)) {
            v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function () {
                v.abort("timeout")
            }, k.timeout));
            try {
                t = 1, i.send(r, x)
            } catch (w) {
                if (!(2 > t))throw w;
                x(-1, w)
            }
        } else x(-1, "No Transport");
        function x(a, b, c, d) {
            var j, r, s, u, w, x = b;
            2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Oc(k, v, c)), u = Pc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
        }

        return v
    }, getJSON: function (a, b, c) {
        return m.get(a, b, c, "json")
    }, getScript: function (a, b) {
        return m.get(a, void 0, b, "script")
    }}), m.each(["get", "post"], function (a, b) {
        m[b] = function (a, c, d, e) {
            return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({url: a, type: b, dataType: e, data: c, success: d})
        }
    }), m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        m.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), m._evalUrl = function (a) {
        return m.ajax({url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, m.fn.extend({wrapAll: function (a) {
        if (m.isFunction(a))return this.each(function (b) {
            m(this).wrapAll(a.call(this, b))
        });
        if (this[0]) {
            var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                var a = this;
                while (a.firstChild && 1 === a.firstChild.nodeType)a = a.firstChild;
                return a
            }).append(this)
        }
        return this
    }, wrapInner: function (a) {
        return this.each(m.isFunction(a) ? function (b) {
            m(this).wrapInner(a.call(this, b))
        } : function () {
            var b = m(this), c = b.contents();
            c.length ? c.wrapAll(a) : b.append(a)
        })
    }, wrap: function (a) {
        var b = m.isFunction(a);
        return this.each(function (c) {
            m(this).wrapAll(b ? a.call(this, c) : a)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
        }).end()
    }}), m.expr.filters.hidden = function (a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"))
    }, m.expr.filters.visible = function (a) {
        return!m.expr.filters.hidden(a)
    };
    var Qc = /%20/g, Rc = /\[\]$/, Sc = /\r?\n/g, Tc = /^(?:submit|button|image|reset|file)$/i, Uc = /^(?:input|select|textarea|keygen)/i;

    function Vc(a, b, c, d) {
        var e;
        if (m.isArray(b))m.each(b, function (b, e) {
            c || Rc.test(a) ? d(a, e) : Vc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        }); else if (c || "object" !== m.type(b))d(a, b); else for (e in b)Vc(a + "[" + e + "]", b[e], c, d)
    }

    m.param = function (a, b) {
        var c, d = [], e = function (a, b) {
            b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a))m.each(a, function () {
            e(this.name, this.value)
        }); else for (c in a)Vc(c, a[c], b, e);
        return d.join("&").replace(Qc, "+")
    }, m.fn.extend({serialize: function () {
        return m.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            var a = m.prop(this, "elements");
            return a ? m.makeArray(a) : this
        }).filter(function () {
            var a = this.type;
            return this.name && !m(this).is(":disabled") && Uc.test(this.nodeName) && !Tc.test(a) && (this.checked || !W.test(a))
        }).map(function (a, b) {
            var c = m(this).val();
            return null == c ? null : m.isArray(c) ? m.map(c, function (a) {
                return{name: b.name, value: a.replace(Sc, "\r\n")}
            }) : {name: b.name, value: c.replace(Sc, "\r\n")}
        }).get()
    }}), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
        return!this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zc() || $c()
    } : Zc;
    var Wc = 0, Xc = {}, Yc = m.ajaxSettings.xhr();
    a.ActiveXObject && m(a).on("unload", function () {
        for (var a in Xc)Xc[a](void 0, !0)
    }), k.cors = !!Yc && "withCredentials"in Yc, Yc = k.ajax = !!Yc, Yc && m.ajaxTransport(function (a) {
        if (!a.crossDomain || k.cors) {
            var b;
            return{send: function (c, d) {
                var e, f = a.xhr(), g = ++Wc;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)for (e in a.xhrFields)f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c)void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                f.send(a.hasContent && a.data || null), b = function (c, e) {
                    var h, i, j;
                    if (b && (e || 4 === f.readyState))if (delete Xc[g], b = void 0, f.onreadystatechange = m.noop, e)4 !== f.readyState && f.abort(); else {
                        j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                        try {
                            i = f.statusText
                        } catch (k) {
                            i = ""
                        }
                        h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                    }
                    j && d(h, i, j, f.getAllResponseHeaders())
                }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xc[g] = b : b()
            }, abort: function () {
                b && b(void 0, !0)
            }}
        }
    });
    function Zc() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function $c() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    m.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/}, converters: {"text script": function (a) {
        return m.globalEval(a), a
    }}}), m.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), m.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c = y.head || m("head")[0] || y.documentElement;
            return{send: function (d, e) {
                b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
                    (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                }, c.insertBefore(b, c.firstChild)
            }, abort: function () {
                b && b.onload(void 0, !0)
            }}
        }
    });
    var _c = [], ad = /(=)\?(?=&|$)|\?\?/;
    m.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var a = _c.pop() || m.expando + "_" + vc++;
        return this[a] = !0, a
    }}), m.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (ad.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ad.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ad, "$1" + e) : b.jsonp !== !1 && (b.url += (wc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
            return g || m.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
            g = arguments
        }, d.always(function () {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _c.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), m.parseHTML = function (a, b, c) {
        if (!a || "string" != typeof a)return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || y;
        var d = u.exec(a), e = !c && [];
        return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
    };
    var bd = m.fn.load;
    m.fn.load = function (a, b, c) {
        if ("string" != typeof a && bd)return bd.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({url: a, type: f, dataType: "html", data: b}).done(function (a) {
            e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
        }).complete(c && function (a, b) {
            g.each(c, e || [a.responseText, b, a])
        }), this
    }, m.expr.filters.animated = function (a) {
        return m.grep(m.timers,function (b) {
            return a === b.elem
        }).length
    };
    var cd = a.document.documentElement;

    function dd(a) {
        return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    m.offset = {setOffset: function (a, b, c) {
        var d, e, f, g, h, i, j, k = m.css(a, "position"), l = m(a), n = {};
        "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using"in b ? b.using.call(a, n) : l.css(n)
    }}, m.fn.extend({offset: function (a) {
        if (arguments.length)return void 0 === a ? this : this.each(function (b) {
            m.offset.setOffset(this, a, b)
        });
        var b, c, d = {top: 0, left: 0}, e = this[0], f = e && e.ownerDocument;
        if (f)return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dd(f), {top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)}) : d
    }, position: function () {
        if (this[0]) {
            var a, b, c = {top: 0, left: 0}, d = this[0];
            return"fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {top: b.top - c.top - m.css(d, "marginTop", !0), left: b.left - c.left - m.css(d, "marginLeft", !0)}
        }
    }, offsetParent: function () {
        return this.map(function () {
            var a = this.offsetParent || cd;
            while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position"))a = a.offsetParent;
            return a || cd
        })
    }}), m.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
        var c = /Y/.test(b);
        m.fn[a] = function (d) {
            return V(this, function (a, d, e) {
                var f = dd(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
            }, a, d, arguments.length, null)
        }
    }), m.each(["top", "left"], function (a, b) {
        m.cssHooks[b] = Lb(k.pixelPosition, function (a, c) {
            return c ? (c = Jb(a, b), Hb.test(c) ? m(a).position()[b] + "px" : c) : void 0
        })
    }), m.each({Height: "height", Width: "width"}, function (a, b) {
        m.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
            m.fn[d] = function (d, e) {
                var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                return V(this, function (b, c, d) {
                    var e;
                    return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), m.fn.size = function () {
        return this.length
    }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return m
    });
    var ed = a.jQuery, fd = a.$;
    return m.noConflict = function (b) {
        return a.$ === m && (a.$ = fd), b && a.jQuery === m && (a.jQuery = ed), m
    }, typeof b === K && (a.jQuery = a.$ = m), m
});

/*! jQuery UI - v1.10.4 - 2014-05-25
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function (t, e) {
    function i(e, i) {
        var s, o, a, u = e.nodeName.toLowerCase();
        return"area" === u ? (s = e.parentNode, o = s.name, e.href && o && "map" === s.nodeName.toLowerCase() ? (a = t("img[usemap=#" + o + "]")[0], !!a && n(a)) : !1) : (/input|select|textarea|button|object/.test(u) ? !e.disabled : "a" === u ? e.href || i : i) && n(e)
    }

    function n(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function () {
            return"hidden" === t.css(this, "visibility")
        }).length
    }

    var s = 0, o = /^ui-id-\d+$/;
    t.ui = t.ui || {}, t.extend(t.ui, {version: "1.10.4", keyCode: {BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38}}), t.fn.extend({focus: function (e) {
        return function (i, n) {
            return"number" == typeof i ? this.each(function () {
                var e = this;
                setTimeout(function () {
                    t(e).focus(), n && n.call(e)
                }, i)
            }) : e.apply(this, arguments)
        }
    }(t.fn.focus), scrollParent: function () {
        var e;
        return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
            return/(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
        }).eq(0) : this.parents().filter(function () {
            return/(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
        }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
    }, zIndex: function (i) {
        if (i !== e)return this.css("zIndex", i);
        if (this.length)for (var n, s, o = t(this[0]); o.length && o[0] !== document;) {
            if (n = o.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(o.css("zIndex"), 10), !isNaN(s) && 0 !== s))return s;
            o = o.parent()
        }
        return 0
    }, uniqueId: function () {
        return this.each(function () {
            this.id || (this.id = "ui-id-" + ++s)
        })
    }, removeUniqueId: function () {
        return this.each(function () {
            o.test(this.id) && t(this).removeAttr("id")
        })
    }}), t.extend(t.expr[":"], {data: t.expr.createPseudo ? t.expr.createPseudo(function (e) {
        return function (i) {
            return!!t.data(i, e)
        }
    }) : function (e, i, n) {
        return!!t.data(e, n[3])
    }, focusable: function (e) {
        return i(e, !isNaN(t.attr(e, "tabindex")))
    }, tabbable: function (e) {
        var n = t.attr(e, "tabindex"), s = isNaN(n);
        return(s || n >= 0) && i(e, !s)
    }}), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function (i, n) {
        function s(e, i, n, s) {
            return t.each(o, function () {
                i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), s && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
            }), i
        }

        var o = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"], a = n.toLowerCase(), u = {innerWidth: t.fn.innerWidth, innerHeight: t.fn.innerHeight, outerWidth: t.fn.outerWidth, outerHeight: t.fn.outerHeight};
        t.fn["inner" + n] = function (i) {
            return i === e ? u["inner" + n].call(this) : this.each(function () {
                t(this).css(a, s(this, i) + "px")
            })
        }, t.fn["outer" + n] = function (e, i) {
            return"number" != typeof e ? u["outer" + n].call(this, e) : this.each(function () {
                t(this).css(a, s(this, e, !0, i) + "px")
            })
        }
    }), t.fn.addBack || (t.fn.addBack = function (t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function (e) {
        return function (i) {
            return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
        }
    }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart"in document.createElement("div"), t.fn.extend({disableSelection: function () {
        return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (t) {
            t.preventDefault()
        })
    }, enableSelection: function () {
        return this.unbind(".ui-disableSelection")
    }}), t.extend(t.ui, {plugin: {add: function (e, i, n) {
        var s, o = t.ui[e].prototype;
        for (s in n)o.plugins[s] = o.plugins[s] || [], o.plugins[s].push([i, n[s]])
    }, call: function (t, e, i) {
        var n, s = t.plugins[e];
        if (s && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)for (n = 0; s.length > n; n++)t.options[s[n][0]] && s[n][1].apply(t.element, i)
    }}, hasScroll: function (e, i) {
        if ("hidden" === t(e).css("overflow"))return!1;
        var n = i && "left" === i ? "scrollLeft" : "scrollTop", s = !1;
        return e[n] > 0 ? !0 : (e[n] = 1, s = e[n] > 0, e[n] = 0, s)
    }})
})(jQuery);
(function (t, e) {
    var i = 0, s = Array.prototype.slice, n = t.cleanData;
    t.cleanData = function (e) {
        for (var i, s = 0; null != (i = e[s]); s++)try {
            t(i).triggerHandler("remove")
        } catch (o) {
        }
        n(e)
    }, t.widget = function (i, s, n) {
        var o, a, r, l, h = {}, u = i.split(".")[0];
        i = i.split(".")[1], o = u + "-" + i, n || (n = s, s = t.Widget), t.expr[":"][o.toLowerCase()] = function (e) {
            return!!t.data(e, o)
        }, t[u] = t[u] || {}, a = t[u][i], r = t[u][i] = function (t, i) {
            return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new r(t, i)
        }, t.extend(r, a, {version: n.version, _proto: t.extend({}, n), _childConstructors: []}), l = new s, l.options = t.widget.extend({}, l.options), t.each(n, function (i, n) {
            return t.isFunction(n) ? (h[i] = function () {
                var t = function () {
                    return s.prototype[i].apply(this, arguments)
                }, e = function (t) {
                    return s.prototype[i].apply(this, t)
                };
                return function () {
                    var i, s = this._super, o = this._superApply;
                    return this._super = t, this._superApply = e, i = n.apply(this, arguments), this._super = s, this._superApply = o, i
                }
            }(), e) : (h[i] = n, e)
        }), r.prototype = t.widget.extend(l, {widgetEventPrefix: a ? l.widgetEventPrefix || i : i}, h, {constructor: r, namespace: u, widgetName: i, widgetFullName: o}), a ? (t.each(a._childConstructors, function (e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, r, i._proto)
        }), delete a._childConstructors) : s._childConstructors.push(r), t.widget.bridge(i, r)
    }, t.widget.extend = function (i) {
        for (var n, o, a = s.call(arguments, 1), r = 0, l = a.length; l > r; r++)for (n in a[r])o = a[r][n], a[r].hasOwnProperty(n) && o !== e && (i[n] = t.isPlainObject(o) ? t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], o) : t.widget.extend({}, o) : o);
        return i
    }, t.widget.bridge = function (i, n) {
        var o = n.prototype.widgetFullName || i;
        t.fn[i] = function (a) {
            var r = "string" == typeof a, l = s.call(arguments, 1), h = this;
            return a = !r && l.length ? t.widget.extend.apply(null, [a].concat(l)) : a, r ? this.each(function () {
                var s, n = t.data(this, o);
                return n ? t.isFunction(n[a]) && "_" !== a.charAt(0) ? (s = n[a].apply(n, l), s !== n && s !== e ? (h = s && s.jquery ? h.pushStack(s.get()) : s, !1) : e) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + a + "'")
            }) : this.each(function () {
                var e = t.data(this, o);
                e ? e.option(a || {})._init() : t.data(this, o, new n(a, this))
            }), h
        }
    }, t.Widget = function () {
    }, t.Widget._childConstructors = [], t.Widget.prototype = {widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: {disabled: !1, create: null}, _createWidget: function (e, s) {
        s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {remove: function (t) {
            t.target === s && this.destroy()
        }}), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    }, _getCreateOptions: t.noop, _getCreateEventData: t.noop, _create: t.noop, _init: t.noop, destroy: function () {
        this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    }, _destroy: t.noop, widget: function () {
        return this.element
    }, option: function (i, s) {
        var n, o, a, r = i;
        if (0 === arguments.length)return t.widget.extend({}, this.options);
        if ("string" == typeof i)if (r = {}, n = i.split("."), i = n.shift(), n.length) {
            for (o = r[i] = t.widget.extend({}, this.options[i]), a = 0; n.length - 1 > a; a++)o[n[a]] = o[n[a]] || {}, o = o[n[a]];
            if (i = n.pop(), 1 === arguments.length)return o[i] === e ? null : o[i];
            o[i] = s
        } else {
            if (1 === arguments.length)return this.options[i] === e ? null : this.options[i];
            r[i] = s
        }
        return this._setOptions(r), this
    }, _setOptions: function (t) {
        var e;
        for (e in t)this._setOption(e, t[e]);
        return this
    }, _setOption: function (t, e) {
        return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
    }, enable: function () {
        return this._setOption("disabled", !1)
    }, disable: function () {
        return this._setOption("disabled", !0)
    }, _on: function (i, s, n) {
        var o, a = this;
        "boolean" != typeof i && (n = s, s = i, i = !1), n ? (s = o = t(s), this.bindings = this.bindings.add(s)) : (n = s, s = this.element, o = this.widget()), t.each(n, function (n, r) {
            function l() {
                return i || a.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? a[r] : r).apply(a, arguments) : e
            }

            "string" != typeof r && (l.guid = r.guid = r.guid || l.guid || t.guid++);
            var h = n.match(/^(\w+)\s*(.*)$/), u = h[1] + a.eventNamespace, p = h[2];
            p ? o.delegate(p, u, l) : s.bind(u, l)
        })
    }, _off: function (t, e) {
        e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
    }, _delay: function (t, e) {
        function i() {
            return("string" == typeof t ? s[t] : t).apply(s, arguments)
        }

        var s = this;
        return setTimeout(i, e || 0)
    }, _hoverable: function (e) {
        this.hoverable = this.hoverable.add(e), this._on(e, {mouseenter: function (e) {
            t(e.currentTarget).addClass("ui-state-hover")
        }, mouseleave: function (e) {
            t(e.currentTarget).removeClass("ui-state-hover")
        }})
    }, _focusable: function (e) {
        this.focusable = this.focusable.add(e), this._on(e, {focusin: function (e) {
            t(e.currentTarget).addClass("ui-state-focus")
        }, focusout: function (e) {
            t(e.currentTarget).removeClass("ui-state-focus")
        }})
    }, _trigger: function (e, i, s) {
        var n, o, a = this.options[e];
        if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)for (n in o)n in i || (i[n] = o[n]);
        return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
    }}, t.each({show: "fadeIn", hide: "fadeOut"}, function (e, i) {
        t.Widget.prototype["_" + e] = function (s, n, o) {
            "string" == typeof n && (n = {effect: n});
            var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {}, "number" == typeof n && (n = {duration: n}), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function (i) {
                t(this)[e](), o && o.call(s[0]), i()
            })
        }
    })
})(jQuery);
(function (t) {
    var e = !1;
    t(document).mouseup(function () {
        e = !1
    }), t.widget("ui.mouse", {version: "1.10.4", options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0}, _mouseInit: function () {
        var e = this;
        this.element.bind("mousedown." + this.widgetName,function (t) {
            return e._mouseDown(t)
        }).bind("click." + this.widgetName, function (i) {
            return!0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined
        }), this.started = !1
    }, _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    }, _mouseDown: function (i) {
        if (!e) {
            this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
            var s = this, n = 1 === i.which, o = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
            return n && !o && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                s.mouseDelayMet = !0
            }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
                return s._mouseMove(t)
            }, this._mouseUpDelegate = function (t) {
                return s._mouseUp(t)
            }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
        }
    }, _mouseMove: function (e) {
        return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
    }, _mouseUp: function (e) {
        return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
    }, _mouseDistanceMet: function (t) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
    }, _mouseDelayMet: function () {
        return this.mouseDelayMet
    }, _mouseStart: function () {
    }, _mouseDrag: function () {
    }, _mouseStop: function () {
    }, _mouseCapture: function () {
        return!0
    }})
})(jQuery);
(function (t, e) {
    function i(t, e, i) {
        return[parseFloat(t[0]) * (d.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (d.test(t[1]) ? i / 100 : 1)]
    }

    function s(e, i) {
        return parseInt(t.css(e, i), 10) || 0
    }

    function o(e) {
        var i = e[0];
        return 9 === i.nodeType ? {width: e.width(), height: e.height(), offset: {top: 0, left: 0}} : t.isWindow(i) ? {width: e.width(), height: e.height(), offset: {top: e.scrollTop(), left: e.scrollLeft()}} : i.preventDefault ? {width: 0, height: 0, offset: {top: i.pageY, left: i.pageX}} : {width: e.outerWidth(), height: e.outerHeight(), offset: e.offset()}
    }

    t.ui = t.ui || {};
    var n, a = Math.max, r = Math.abs, l = Math.round, h = /left|center|right/, u = /top|center|bottom/, c = /[\+\-]\d+(\.[\d]+)?%?/, p = /^\w+/, d = /%$/, f = t.fn.position;
    t.position = {scrollbarWidth: function () {
        if (n !== e)return n;
        var i, s, o = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), a = o.children()[0];
        return t("body").append(o), i = a.offsetWidth, o.css("overflow", "scroll"), s = a.offsetWidth, i === s && (s = o[0].clientWidth), o.remove(), n = i - s
    }, getScrollInfo: function (e) {
        var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), o = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth, n = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
        return{width: n ? t.position.scrollbarWidth() : 0, height: o ? t.position.scrollbarWidth() : 0}
    }, getWithinInfo: function (e) {
        var i = t(e || window), s = t.isWindow(i[0]), o = !!i[0] && 9 === i[0].nodeType;
        return{element: i, isWindow: s, isDocument: o, offset: i.offset() || {left: 0, top: 0}, scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: s ? i.width() : i.outerWidth(), height: s ? i.height() : i.outerHeight()}
    }}, t.fn.position = function (e) {
        if (!e || !e.of)return f.apply(this, arguments);
        e = t.extend({}, e);
        var n, d, g, m, b, v, _ = t(e.of), y = t.position.getWithinInfo(e.within), w = t.position.getScrollInfo(y), P = (e.collision || "flip").split(" "), x = {};
        return v = o(_), _[0].preventDefault && (e.at = "left top"), d = v.width, g = v.height, m = v.offset, b = t.extend({}, m), t.each(["my", "at"], function () {
            var t, i, s = (e[this] || "").split(" ");
            1 === s.length && (s = h.test(s[0]) ? s.concat(["center"]) : u.test(s[0]) ? ["center"].concat(s) : ["center", "center"]), s[0] = h.test(s[0]) ? s[0] : "center", s[1] = u.test(s[1]) ? s[1] : "center", t = c.exec(s[0]), i = c.exec(s[1]), x[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [p.exec(s[0])[0], p.exec(s[1])[0]]
        }), 1 === P.length && (P[1] = P[0]), "right" === e.at[0] ? b.left += d : "center" === e.at[0] && (b.left += d / 2), "bottom" === e.at[1] ? b.top += g : "center" === e.at[1] && (b.top += g / 2), n = i(x.at, d, g), b.left += n[0], b.top += n[1], this.each(function () {
            var o, h, u = t(this), c = u.outerWidth(), p = u.outerHeight(), f = s(this, "marginLeft"), v = s(this, "marginTop"), T = c + f + s(this, "marginRight") + w.width, D = p + v + s(this, "marginBottom") + w.height, C = t.extend({}, b), k = i(x.my, u.outerWidth(), u.outerHeight());
            "right" === e.my[0] ? C.left -= c : "center" === e.my[0] && (C.left -= c / 2), "bottom" === e.my[1] ? C.top -= p : "center" === e.my[1] && (C.top -= p / 2), C.left += k[0], C.top += k[1], t.support.offsetFractions || (C.left = l(C.left), C.top = l(C.top)), o = {marginLeft: f, marginTop: v}, t.each(["left", "top"], function (i, s) {
                t.ui.position[P[i]] && t.ui.position[P[i]][s](C, {targetWidth: d, targetHeight: g, elemWidth: c, elemHeight: p, collisionPosition: o, collisionWidth: T, collisionHeight: D, offset: [n[0] + k[0], n[1] + k[1]], my: e.my, at: e.at, within: y, elem: u})
            }), e.using && (h = function (t) {
                var i = m.left - C.left, s = i + d - c, o = m.top - C.top, n = o + g - p, l = {target: {element: _, left: m.left, top: m.top, width: d, height: g}, element: {element: u, left: C.left, top: C.top, width: c, height: p}, horizontal: 0 > s ? "left" : i > 0 ? "right" : "center", vertical: 0 > n ? "top" : o > 0 ? "bottom" : "middle"};
                c > d && d > r(i + s) && (l.horizontal = "center"), p > g && g > r(o + n) && (l.vertical = "middle"), l.important = a(r(i), r(s)) > a(r(o), r(n)) ? "horizontal" : "vertical", e.using.call(this, t, l)
            }), u.offset(t.extend(C, {using: h}))
        })
    }, t.ui.position = {fit: {left: function (t, e) {
        var i, s = e.within, o = s.isWindow ? s.scrollLeft : s.offset.left, n = s.width, r = t.left - e.collisionPosition.marginLeft, l = o - r, h = r + e.collisionWidth - n - o;
        e.collisionWidth > n ? l > 0 && 0 >= h ? (i = t.left + l + e.collisionWidth - n - o, t.left += l - i) : t.left = h > 0 && 0 >= l ? o : l > h ? o + n - e.collisionWidth : o : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = a(t.left - r, t.left)
    }, top: function (t, e) {
        var i, s = e.within, o = s.isWindow ? s.scrollTop : s.offset.top, n = e.within.height, r = t.top - e.collisionPosition.marginTop, l = o - r, h = r + e.collisionHeight - n - o;
        e.collisionHeight > n ? l > 0 && 0 >= h ? (i = t.top + l + e.collisionHeight - n - o, t.top += l - i) : t.top = h > 0 && 0 >= l ? o : l > h ? o + n - e.collisionHeight : o : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = a(t.top - r, t.top)
    }}, flip: {left: function (t, e) {
        var i, s, o = e.within, n = o.offset.left + o.scrollLeft, a = o.width, l = o.isWindow ? o.scrollLeft : o.offset.left, h = t.left - e.collisionPosition.marginLeft, u = h - l, c = h + e.collisionWidth - a - l, p = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0, d = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0, f = -2 * e.offset[0];
        0 > u ? (i = t.left + p + d + f + e.collisionWidth - a - n, (0 > i || r(u) > i) && (t.left += p + d + f)) : c > 0 && (s = t.left - e.collisionPosition.marginLeft + p + d + f - l, (s > 0 || c > r(s)) && (t.left += p + d + f))
    }, top: function (t, e) {
        var i, s, o = e.within, n = o.offset.top + o.scrollTop, a = o.height, l = o.isWindow ? o.scrollTop : o.offset.top, h = t.top - e.collisionPosition.marginTop, u = h - l, c = h + e.collisionHeight - a - l, p = "top" === e.my[1], d = p ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0, f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0, g = -2 * e.offset[1];
        0 > u ? (s = t.top + d + f + g + e.collisionHeight - a - n, t.top + d + f + g > u && (0 > s || r(u) > s) && (t.top += d + f + g)) : c > 0 && (i = t.top - e.collisionPosition.marginTop + d + f + g - l, t.top + d + f + g > c && (i > 0 || c > r(i)) && (t.top += d + f + g))
    }}, flipfit: {left: function () {
        t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
    }, top: function () {
        t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
    }}}, function () {
        var e, i, s, o, n, a = document.getElementsByTagName("body")[0], r = document.createElement("div");
        e = document.createElement(a ? "div" : "body"), s = {visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none"}, a && t.extend(s, {position: "absolute", left: "-1000px", top: "-1000px"});
        for (n in s)e.style[n] = s[n];
        e.appendChild(r), i = a || document.documentElement, i.insertBefore(e, i.firstChild), r.style.cssText = "position: absolute; left: 10.7432222px;", o = t(r).offset().left, t.support.offsetFractions = o > 10 && 11 > o, e.innerHTML = "", i.removeChild(e)
    }()
})(jQuery);
(function (t) {
    t.widget("ui.draggable", t.ui.mouse, {version: "1.10.4", widgetEventPrefix: "drag", options: {addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null}, _create: function () {
        "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
    }, _destroy: function () {
        this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
    }, _mouseCapture: function (e) {
        var i = this.options;
        return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function () {
            t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1e3}).css(t(this).offset()).appendTo("body")
        }), !0) : !1)
    }, _mouseStart: function (e) {
        var i = this.options;
        return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left}, this.offset.scroll = !1, t.extend(this.offset, {click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()}), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
    }, _mouseDrag: function (e, i) {
        if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
            var s = this._uiHash();
            if (this._trigger("drag", e, s) === !1)return this._mouseUp({}), !1;
            this.position = s.position
        }
        return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
    }, _mouseStop: function (e) {
        var i = this, s = !1;
        return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "original" !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
            i._trigger("stop", e) !== !1 && i._clear()
        }) : this._trigger("stop", e) !== !1 && this._clear(), !1) : !1
    }, _mouseUp: function (e) {
        return t("div.ui-draggable-iframeFix").each(function () {
            this.parentNode.removeChild(this)
        }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e)
    }, cancel: function () {
        return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
    }, _getHandle: function (e) {
        return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
    }, _createHelper: function (e) {
        var i = this.options, s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
        return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s
    }, _adjustOffsetFromHelper: function (e) {
        "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {left: +e[0], top: +e[1] || 0}), "left"in e && (this.offset.click.left = e.left + this.margins.left), "right"in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top"in e && (this.offset.click.top = e.top + this.margins.top), "bottom"in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
    }, _getParentOffset: function () {
        var e = this.offsetParent.offset();
        return"absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {top: 0, left: 0}), {top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
    }, _getRelativeOffset: function () {
        if ("relative" === this.cssPosition) {
            var t = this.element.position();
            return{top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
        }
        return{top: 0, left: 0}
    }, _cacheMargins: function () {
        this.margins = {left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0}
    }, _cacheHelperProportions: function () {
        this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
    }, _setContainment: function () {
        var e, i, s, n = this.options;
        return n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === n.containment ? (this.containment = [0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : n.containment.constructor === Array ? (this.containment = n.containment, undefined) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i), undefined) : (this.containment = null, undefined)
    }, _convertPositionTo: function (e, i) {
        i || (i = this.position);
        var s = "absolute" === e ? 1 : -1, n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
        return this.offset.scroll || (this.offset.scroll = {top: n.scrollTop(), left: n.scrollLeft()}), {top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s}
    }, _generatePosition: function (e) {
        var i, s, n, o, a = this.options, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = e.pageX, h = e.pageY;
        return this.offset.scroll || (this.offset.scroll = {top: r.scrollTop(), left: r.scrollLeft()}), this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o)), {top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top), left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)}
    }, _clear: function () {
        this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
    }, _trigger: function (e, i, s) {
        return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, s)
    }, plugins: {}, _uiHash: function () {
        return{helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs}
    }}), t.ui.plugin.add("draggable", "connectToSortable", {start: function (e, i) {
        var s = t(this).data("ui-draggable"), n = s.options, o = t.extend({}, i, {item: s.element});
        s.sortables = [], t(n.connectToSortable).each(function () {
            var i = t.data(this, "ui-sortable");
            i && !i.options.disabled && (s.sortables.push({instance: i, shouldRevert: i.options.revert}), i.refreshPositions(), i._trigger("activate", e, o))
        })
    }, stop: function (e, i) {
        var s = t(this).data("ui-draggable"), n = t.extend({}, i, {item: s.element});
        t.each(s.sortables, function () {
            this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({top: "auto", left: "auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, n))
        })
    }, drag: function (e, i) {
        var s = t(this).data("ui-draggable"), n = this;
        t.each(s.sortables, function () {
            var o = !1, a = this;
            this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, t.each(s.sortables, function () {
                return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this !== a && this.instance._intersectsWith(this.instance.containerCache) && t.contains(a.instance.element[0], this.instance.element[0]) && (o = !1), o
            })), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                return i.helper[0]
            }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", e), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", e), s.dropped = !1)
        })
    }}), t.ui.plugin.add("draggable", "cursor", {start: function () {
        var e = t("body"), i = t(this).data("ui-draggable").options;
        e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor)
    }, stop: function () {
        var e = t(this).data("ui-draggable").options;
        e._cursor && t("body").css("cursor", e._cursor)
    }}), t.ui.plugin.add("draggable", "opacity", {start: function (e, i) {
        var s = t(i.helper), n = t(this).data("ui-draggable").options;
        s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity)
    }, stop: function (e, i) {
        var s = t(this).data("ui-draggable").options;
        s._opacity && t(i.helper).css("opacity", s._opacity)
    }}), t.ui.plugin.add("draggable", "scroll", {start: function () {
        var e = t(this).data("ui-draggable");
        e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset())
    }, drag: function (e) {
        var i = t(this).data("ui-draggable"), s = i.options, n = !1;
        i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : e.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : e.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(document).scrollTop() < s.scrollSensitivity ? n = t(document).scrollTop(t(document).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < s.scrollSensitivity && (n = t(document).scrollTop(t(document).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(document).scrollLeft() < s.scrollSensitivity ? n = t(document).scrollLeft(t(document).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < s.scrollSensitivity && (n = t(document).scrollLeft(t(document).scrollLeft() + s.scrollSpeed)))), n !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
    }}), t.ui.plugin.add("draggable", "snap", {start: function () {
        var e = t(this).data("ui-draggable"), i = e.options;
        e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function () {
            var i = t(this), s = i.offset();
            this !== e.element[0] && e.snapElements.push({item: this, width: i.outerWidth(), height: i.outerHeight(), top: s.top, left: s.left})
        })
    }, drag: function (e, i) {
        var s, n, o, a, r, l, h, c, u, p, d = t(this).data("ui-draggable"), f = d.options, g = f.snapTolerance, m = i.offset.left, b = m + d.helperProportions.width, v = i.offset.top, _ = v + d.helperProportions.height;
        for (u = d.snapElements.length - 1; u >= 0; u--)r = d.snapElements[u].left, l = r + d.snapElements[u].width, h = d.snapElements[u].top, c = h + d.snapElements[u].height, r - g > b || m > l + g || h - g > _ || v > c + g || !t.contains(d.snapElements[u].item.ownerDocument, d.snapElements[u].item) ? (d.snapElements[u].snapping && d.options.snap.release && d.options.snap.release.call(d.element, e, t.extend(d._uiHash(), {snapItem: d.snapElements[u].item})), d.snapElements[u].snapping = !1) : ("inner" !== f.snapMode && (s = g >= Math.abs(h - _), n = g >= Math.abs(c - v), o = g >= Math.abs(r - b), a = g >= Math.abs(l - m), s && (i.position.top = d._convertPositionTo("relative", {top: h - d.helperProportions.height, left: 0}).top - d.margins.top), n && (i.position.top = d._convertPositionTo("relative", {top: c, left: 0}).top - d.margins.top), o && (i.position.left = d._convertPositionTo("relative", {top: 0, left: r - d.helperProportions.width}).left - d.margins.left), a && (i.position.left = d._convertPositionTo("relative", {top: 0, left: l}).left - d.margins.left)), p = s || n || o || a, "outer" !== f.snapMode && (s = g >= Math.abs(h - v), n = g >= Math.abs(c - _), o = g >= Math.abs(r - m), a = g >= Math.abs(l - b), s && (i.position.top = d._convertPositionTo("relative", {top: h, left: 0}).top - d.margins.top), n && (i.position.top = d._convertPositionTo("relative", {top: c - d.helperProportions.height, left: 0}).top - d.margins.top), o && (i.position.left = d._convertPositionTo("relative", {top: 0, left: r}).left - d.margins.left), a && (i.position.left = d._convertPositionTo("relative", {top: 0, left: l - d.helperProportions.width}).left - d.margins.left)), !d.snapElements[u].snapping && (s || n || o || a || p) && d.options.snap.snap && d.options.snap.snap.call(d.element, e, t.extend(d._uiHash(), {snapItem: d.snapElements[u].item})), d.snapElements[u].snapping = s || n || o || a || p)
    }}), t.ui.plugin.add("draggable", "stack", {start: function () {
        var e, i = this.data("ui-draggable").options, s = t.makeArray(t(i.stack)).sort(function (e, i) {
            return(parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
        });
        s.length && (e = parseInt(t(s[0]).css("zIndex"), 10) || 0, t(s).each(function (i) {
            t(this).css("zIndex", e + i)
        }), this.css("zIndex", e + s.length))
    }}), t.ui.plugin.add("draggable", "zIndex", {start: function (e, i) {
        var s = t(i.helper), n = t(this).data("ui-draggable").options;
        s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex)
    }, stop: function (e, i) {
        var s = t(this).data("ui-draggable").options;
        s._zIndex && t(i.helper).css("zIndex", s._zIndex)
    }})
})(jQuery);
(function (t) {
    function e(t, e, i) {
        return t > e && e + i > t
    }

    t.widget("ui.droppable", {version: "1.10.4", widgetEventPrefix: "drop", options: {accept: "*", activeClass: !1, addClasses: !0, greedy: !1, hoverClass: !1, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null}, _create: function () {
        var e, i = this.options, s = i.accept;
        this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function (t) {
            return t.is(s)
        }, this.proportions = function () {
            return arguments.length ? (e = arguments[0], undefined) : e ? e : e = {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight}
        }, t.ui.ddmanager.droppables[i.scope] = t.ui.ddmanager.droppables[i.scope] || [], t.ui.ddmanager.droppables[i.scope].push(this), i.addClasses && this.element.addClass("ui-droppable")
    }, _destroy: function () {
        for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; i.length > e; e++)i[e] === this && i.splice(e, 1);
        this.element.removeClass("ui-droppable ui-droppable-disabled")
    }, _setOption: function (e, i) {
        "accept" === e && (this.accept = t.isFunction(i) ? i : function (t) {
            return t.is(i)
        }), t.Widget.prototype._setOption.apply(this, arguments)
    }, _activate: function (e) {
        var i = t.ui.ddmanager.current;
        this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
    }, _deactivate: function (e) {
        var i = t.ui.ddmanager.current;
        this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
    }, _over: function (e) {
        var i = t.ui.ddmanager.current;
        i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
    }, _out: function (e) {
        var i = t.ui.ddmanager.current;
        i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
    }, _drop: function (e, i) {
        var s = i || t.ui.ddmanager.current, n = !1;
        return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
            var e = t.data(this, "ui-droppable");
            return e.options.greedy && !e.options.disabled && e.options.scope === s.options.scope && e.accept.call(e.element[0], s.currentItem || s.element) && t.ui.intersect(s, t.extend(e, {offset: e.element.offset()}), e.options.tolerance) ? (n = !0, !1) : undefined
        }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1
    }, ui: function (t) {
        return{draggable: t.currentItem || t.element, helper: t.helper, position: t.position, offset: t.positionAbs}
    }}), t.ui.intersect = function (t, i, s) {
        if (!i.offset)return!1;
        var n, a, o = (t.positionAbs || t.position.absolute).left, r = (t.positionAbs || t.position.absolute).top, l = o + t.helperProportions.width, h = r + t.helperProportions.height, c = i.offset.left, u = i.offset.top, d = c + i.proportions().width, p = u + i.proportions().height;
        switch (s) {
            case"fit":
                return o >= c && d >= l && r >= u && p >= h;
            case"intersect":
                return o + t.helperProportions.width / 2 > c && d > l - t.helperProportions.width / 2 && r + t.helperProportions.height / 2 > u && p > h - t.helperProportions.height / 2;
            case"pointer":
                return n = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, a = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, e(a, u, i.proportions().height) && e(n, c, i.proportions().width);
            case"touch":
                return(r >= u && p >= r || h >= u && p >= h || u > r && h > p) && (o >= c && d >= o || l >= c && d >= l || c > o && l > d);
            default:
                return!1
        }
    }, t.ui.ddmanager = {current: null, droppables: {"default": []}, prepareOffsets: function (e, i) {
        var s, n, a = t.ui.ddmanager.droppables[e.options.scope] || [], o = i ? i.type : null, r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
        t:for (s = 0; a.length > s; s++)if (!(a[s].options.disabled || e && !a[s].accept.call(a[s].element[0], e.currentItem || e.element))) {
            for (n = 0; r.length > n; n++)if (r[n] === a[s].element[0]) {
                a[s].proportions().height = 0;
                continue t
            }
            a[s].visible = "none" !== a[s].element.css("display"), a[s].visible && ("mousedown" === o && a[s]._activate.call(a[s], i), a[s].offset = a[s].element.offset(), a[s].proportions({width: a[s].element[0].offsetWidth, height: a[s].element[0].offsetHeight}))
        }
    }, drop: function (e, i) {
        var s = !1;
        return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function () {
            this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
        }), s
    }, dragStart: function (e, i) {
        e.element.parentsUntil("body").bind("scroll.droppable", function () {
            e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        })
    }, drag: function (e, i) {
        e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
            if (!this.options.disabled && !this.greedyChild && this.visible) {
                var s, n, a, o = t.ui.intersect(e, this, this.options.tolerance), r = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(":data(ui-droppable)").filter(function () {
                    return t.data(this, "ui-droppable").options.scope === n
                }), a.length && (s = t.data(a[0], "ui-droppable"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
            }
        })
    }, dragStop: function (e, i) {
        e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
    }}
})(jQuery);
(function (t) {
    function e(t) {
        return parseInt(t, 10) || 0
    }

    function i(t) {
        return!isNaN(parseInt(t, 10))
    }

    t.widget("ui.resizable", t.ui.mouse, {version: "1.10.4", widgetEventPrefix: "resize", options: {alsoResize: !1, animate: !1, animateDuration: "slow", animateEasing: "swing", aspectRatio: !1, autoHide: !1, containment: !1, ghost: !1, grid: !1, handles: "e,s,se", helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null}, _create: function () {
        var e, i, s, o, n, a = this, r = this.options;
        if (this.element.addClass("ui-resizable"), t.extend(this, {_aspectRatio: !!r.aspectRatio, aspectRatio: r.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left")})), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom")}), this.originalElement.css({marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({position: "static", zoom: 1, display: "block"})), this.originalElement.css({margin: this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw"} : "e,s,se"), this.handles.constructor === String)for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; e.length > i; i++)s = t.trim(e[i]), n = "ui-resizable-" + s, o = t("<div class='ui-resizable-handle " + n + "'></div>"), o.css({zIndex: r.zIndex}), "se" === s && o.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(o);
        this._renderAxis = function (e) {
            var i, s, o, n;
            e = e || this.element;
            for (i in this.handles)this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = t(this.handles[i], this.element), n = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), o = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(o, n), this._proportionallyResize()), t(this.handles[i]).length
        }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
            a.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = o && o[1] ? o[1] : "se")
        }), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
            r.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show())
        }).mouseleave(function () {
            r.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide())
        })), this._mouseInit()
    }, _destroy: function () {
        this._mouseDestroy();
        var e, i = function (e) {
            t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
        };
        return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({position: e.css("position"), width: e.outerWidth(), height: e.outerHeight(), top: e.css("top"), left: e.css("left")}).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
    }, _mouseCapture: function (e) {
        var i, s, o = !1;
        for (i in this.handles)s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (o = !0);
        return!this.options.disabled && o
    }, _mouseStart: function (i) {
        var s, o, n, a = this.options, r = this.element.position(), l = this.element;
        return this.resizing = !0, /absolute/.test(l.css("position")) ? l.css({position: "absolute", top: l.css("top"), left: l.css("left")}) : l.is(".ui-draggable") && l.css({position: "absolute", top: r.top, left: r.left}), this._renderProxy(), s = e(this.helper.css("left")), o = e(this.helper.css("top")), a.containment && (s += t(a.containment).scrollLeft() || 0, o += t(a.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {left: s, top: o}, this.size = this._helper ? {width: this.helper.width(), height: this.helper.height()} : {width: l.width(), height: l.height()}, this.originalSize = this._helper ? {width: l.outerWidth(), height: l.outerHeight()} : {width: l.width(), height: l.height()}, this.originalPosition = {left: s, top: o}, this.sizeDiff = {width: l.outerWidth() - l.width(), height: l.outerHeight() - l.height()}, this.originalMousePosition = {left: i.pageX, top: i.pageY}, this.aspectRatio = "number" == typeof a.aspectRatio ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), l.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
    }, _mouseDrag: function (e) {
        var i, s = this.helper, o = {}, n = this.originalMousePosition, a = this.axis, r = this.position.top, l = this.position.left, h = this.size.width, p = this.size.height, u = e.pageX - n.left || 0, c = e.pageY - n.top || 0, d = this._change[a];
        return d ? (i = d.apply(this, [e, u, c]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), this.position.top !== r && (o.top = this.position.top + "px"), this.position.left !== l && (o.left = this.position.left + "px"), this.size.width !== h && (o.width = this.size.width + "px"), this.size.height !== p && (o.height = this.size.height + "px"), s.css(o), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(o) || this._trigger("resize", e, this.ui()), !1) : !1
    }, _mouseStop: function (e) {
        this.resizing = !1;
        var i, s, o, n, a, r, l, h = this.options, p = this;
        return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), o = s && t.ui.hasScroll(i[0], "left") ? 0 : p.sizeDiff.height, n = s ? 0 : p.sizeDiff.width, a = {width: p.helper.width() - n, height: p.helper.height() - o}, r = parseInt(p.element.css("left"), 10) + (p.position.left - p.originalPosition.left) || null, l = parseInt(p.element.css("top"), 10) + (p.position.top - p.originalPosition.top) || null, h.animate || this.element.css(t.extend(a, {top: l, left: r})), p.helper.height(p.size.height), p.helper.width(p.size.width), this._helper && !h.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
    }, _updateVirtualBoundaries: function (t) {
        var e, s, o, n, a, r = this.options;
        a = {minWidth: i(r.minWidth) ? r.minWidth : 0, maxWidth: i(r.maxWidth) ? r.maxWidth : 1 / 0, minHeight: i(r.minHeight) ? r.minHeight : 0, maxHeight: i(r.maxHeight) ? r.maxHeight : 1 / 0}, (this._aspectRatio || t) && (e = a.minHeight * this.aspectRatio, o = a.minWidth / this.aspectRatio, s = a.maxHeight * this.aspectRatio, n = a.maxWidth / this.aspectRatio, e > a.minWidth && (a.minWidth = e), o > a.minHeight && (a.minHeight = o), a.maxWidth > s && (a.maxWidth = s), a.maxHeight > n && (a.maxHeight = n)), this._vBoundaries = a
    }, _updateCache: function (t) {
        this.offset = this.helper.offset(), i(t.left) && (this.position.left = t.left), i(t.top) && (this.position.top = t.top), i(t.height) && (this.size.height = t.height), i(t.width) && (this.size.width = t.width)
    }, _updateRatio: function (t) {
        var e = this.position, s = this.size, o = this.axis;
        return i(t.height) ? t.width = t.height * this.aspectRatio : i(t.width) && (t.height = t.width / this.aspectRatio), "sw" === o && (t.left = e.left + (s.width - t.width), t.top = null), "nw" === o && (t.top = e.top + (s.height - t.height), t.left = e.left + (s.width - t.width)), t
    }, _respectSize: function (t) {
        var e = this._vBoundaries, s = this.axis, o = i(t.width) && e.maxWidth && e.maxWidth < t.width, n = i(t.height) && e.maxHeight && e.maxHeight < t.height, a = i(t.width) && e.minWidth && e.minWidth > t.width, r = i(t.height) && e.minHeight && e.minHeight > t.height, l = this.originalPosition.left + this.originalSize.width, h = this.position.top + this.size.height, p = /sw|nw|w/.test(s), u = /nw|ne|n/.test(s);
        return a && (t.width = e.minWidth), r && (t.height = e.minHeight), o && (t.width = e.maxWidth), n && (t.height = e.maxHeight), a && p && (t.left = l - e.minWidth), o && p && (t.left = l - e.maxWidth), r && u && (t.top = h - e.minHeight), n && u && (t.top = h - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
    }, _proportionallyResize: function () {
        if (this._proportionallyResizeElements.length) {
            var t, e, i, s, o, n = this.helper || this.element;
            for (t = 0; this._proportionallyResizeElements.length > t; t++) {
                if (o = this._proportionallyResizeElements[t], !this.borderDif)for (this.borderDif = [], i = [o.css("borderTopWidth"), o.css("borderRightWidth"), o.css("borderBottomWidth"), o.css("borderLeftWidth")], s = [o.css("paddingTop"), o.css("paddingRight"), o.css("paddingBottom"), o.css("paddingLeft")], e = 0; i.length > e; e++)this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(s[e], 10) || 0);
                o.css({height: n.height() - this.borderDif[0] - this.borderDif[2] || 0, width: n.width() - this.borderDif[1] - this.borderDif[3] || 0})
            }
        }
    }, _renderProxy: function () {
        var e = this.element, i = this.options;
        this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({width: this.element.outerWidth() - 1, height: this.element.outerHeight() - 1, position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++i.zIndex}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
    }, _change: {e: function (t, e) {
        return{width: this.originalSize.width + e}
    }, w: function (t, e) {
        var i = this.originalSize, s = this.originalPosition;
        return{left: s.left + e, width: i.width - e}
    }, n: function (t, e, i) {
        var s = this.originalSize, o = this.originalPosition;
        return{top: o.top + i, height: s.height - i}
    }, s: function (t, e, i) {
        return{height: this.originalSize.height + i}
    }, se: function (e, i, s) {
        return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
    }, sw: function (e, i, s) {
        return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
    }, ne: function (e, i, s) {
        return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
    }, nw: function (e, i, s) {
        return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
    }}, _propagate: function (e, i) {
        t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
    }, plugins: {}, ui: function () {
        return{originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition}
    }}), t.ui.plugin.add("resizable", "animate", {stop: function (e) {
        var i = t(this).data("ui-resizable"), s = i.options, o = i._proportionallyResizeElements, n = o.length && /textarea/i.test(o[0].nodeName), a = n && t.ui.hasScroll(o[0], "left") ? 0 : i.sizeDiff.height, r = n ? 0 : i.sizeDiff.width, l = {width: i.size.width - r, height: i.size.height - a}, h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, p = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
        i.element.animate(t.extend(l, p && h ? {top: p, left: h} : {}), {duration: s.animateDuration, easing: s.animateEasing, step: function () {
            var s = {width: parseInt(i.element.css("width"), 10), height: parseInt(i.element.css("height"), 10), top: parseInt(i.element.css("top"), 10), left: parseInt(i.element.css("left"), 10)};
            o && o.length && t(o[0]).css({width: s.width, height: s.height}), i._updateCache(s), i._propagate("resize", e)
        }})
    }}), t.ui.plugin.add("resizable", "containment", {start: function () {
        var i, s, o, n, a, r, l, h = t(this).data("ui-resizable"), p = h.options, u = h.element, c = p.containment, d = c instanceof t ? c.get(0) : /parent/.test(c) ? u.parent().get(0) : c;
        d && (h.containerElement = t(d), /document/.test(c) || c === document ? (h.containerOffset = {left: 0, top: 0}, h.containerPosition = {left: 0, top: 0}, h.parentData = {element: t(document), left: 0, top: 0, width: t(document).width(), height: t(document).height() || document.body.parentNode.scrollHeight}) : (i = t(d), s = [], t(["Top", "Right", "Left", "Bottom"]).each(function (t, o) {
            s[t] = e(i.css("padding" + o))
        }), h.containerOffset = i.offset(), h.containerPosition = i.position(), h.containerSize = {height: i.innerHeight() - s[3], width: i.innerWidth() - s[1]}, o = h.containerOffset, n = h.containerSize.height, a = h.containerSize.width, r = t.ui.hasScroll(d, "left") ? d.scrollWidth : a, l = t.ui.hasScroll(d) ? d.scrollHeight : n, h.parentData = {element: d, left: o.left, top: o.top, width: r, height: l}))
    }, resize: function (e) {
        var i, s, o, n, a = t(this).data("ui-resizable"), r = a.options, l = a.containerOffset, h = a.position, p = a._aspectRatio || e.shiftKey, u = {top: 0, left: 0}, c = a.containerElement;
        c[0] !== document && /static/.test(c.css("position")) && (u = l), h.left < (a._helper ? l.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - l.left : a.position.left - u.left), p && (a.size.height = a.size.width / a.aspectRatio), a.position.left = r.helper ? l.left : 0), h.top < (a._helper ? l.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - l.top : a.position.top), p && (a.size.width = a.size.height * a.aspectRatio), a.position.top = a._helper ? l.top : 0), a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top, i = Math.abs((a._helper ? a.offset.left - u.left : a.offset.left - u.left) + a.sizeDiff.width), s = Math.abs((a._helper ? a.offset.top - u.top : a.offset.top - l.top) + a.sizeDiff.height), o = a.containerElement.get(0) === a.element.parent().get(0), n = /relative|absolute/.test(a.containerElement.css("position")), o && n && (i -= Math.abs(a.parentData.left)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, p && (a.size.height = a.size.width / a.aspectRatio)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, p && (a.size.width = a.size.height * a.aspectRatio))
    }, stop: function () {
        var e = t(this).data("ui-resizable"), i = e.options, s = e.containerOffset, o = e.containerPosition, n = e.containerElement, a = t(e.helper), r = a.offset(), l = a.outerWidth() - e.sizeDiff.width, h = a.outerHeight() - e.sizeDiff.height;
        e._helper && !i.animate && /relative/.test(n.css("position")) && t(this).css({left: r.left - o.left - s.left, width: l, height: h}), e._helper && !i.animate && /static/.test(n.css("position")) && t(this).css({left: r.left - o.left - s.left, width: l, height: h})
    }}), t.ui.plugin.add("resizable", "alsoResize", {start: function () {
        var e = t(this).data("ui-resizable"), i = e.options, s = function (e) {
            t(e).each(function () {
                var e = t(this);
                e.data("ui-resizable-alsoresize", {width: parseInt(e.width(), 10), height: parseInt(e.height(), 10), left: parseInt(e.css("left"), 10), top: parseInt(e.css("top"), 10)})
            })
        };
        "object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : t.each(i.alsoResize, function (t) {
            s(t)
        })
    }, resize: function (e, i) {
        var s = t(this).data("ui-resizable"), o = s.options, n = s.originalSize, a = s.originalPosition, r = {height: s.size.height - n.height || 0, width: s.size.width - n.width || 0, top: s.position.top - a.top || 0, left: s.position.left - a.left || 0}, l = function (e, s) {
            t(e).each(function () {
                var e = t(this), o = t(this).data("ui-resizable-alsoresize"), n = {}, a = s && s.length ? s : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                t.each(a, function (t, e) {
                    var i = (o[e] || 0) + (r[e] || 0);
                    i && i >= 0 && (n[e] = i || null)
                }), e.css(n)
            })
        };
        "object" != typeof o.alsoResize || o.alsoResize.nodeType ? l(o.alsoResize) : t.each(o.alsoResize, function (t, e) {
            l(t, e)
        })
    }, stop: function () {
        t(this).removeData("resizable-alsoresize")
    }}), t.ui.plugin.add("resizable", "ghost", {start: function () {
        var e = t(this).data("ui-resizable"), i = e.options, s = e.size;
        e.ghost = e.originalElement.clone(), e.ghost.css({opacity: .25, display: "block", position: "relative", height: s.height, width: s.width, margin: 0, left: 0, top: 0}).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
    }, resize: function () {
        var e = t(this).data("ui-resizable");
        e.ghost && e.ghost.css({position: "relative", height: e.size.height, width: e.size.width})
    }, stop: function () {
        var e = t(this).data("ui-resizable");
        e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
    }}), t.ui.plugin.add("resizable", "grid", {resize: function () {
        var e = t(this).data("ui-resizable"), i = e.options, s = e.size, o = e.originalSize, n = e.originalPosition, a = e.axis, r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid, l = r[0] || 1, h = r[1] || 1, p = Math.round((s.width - o.width) / l) * l, u = Math.round((s.height - o.height) / h) * h, c = o.width + p, d = o.height + u, f = i.maxWidth && c > i.maxWidth, g = i.maxHeight && d > i.maxHeight, m = i.minWidth && i.minWidth > c, b = i.minHeight && i.minHeight > d;
        i.grid = r, m && (c += l), b && (d += h), f && (c -= l), g && (d -= h), /^(se|s|e)$/.test(a) ? (e.size.width = c, e.size.height = d) : /^(ne)$/.test(a) ? (e.size.width = c, e.size.height = d, e.position.top = n.top - u) : /^(sw)$/.test(a) ? (e.size.width = c, e.size.height = d, e.position.left = n.left - p) : (d - h > 0 ? (e.size.height = d, e.position.top = n.top - u) : (e.size.height = h, e.position.top = n.top + o.height - h), c - l > 0 ? (e.size.width = c, e.position.left = n.left - p) : (e.size.width = l, e.position.left = n.left + o.width - l))
    }})
})(jQuery);
(function (t) {
    t.widget("ui.selectable", t.ui.mouse, {version: "1.10.4", options: {appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null}, _create: function () {
        var e, i = this;
        this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
            e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function () {
                var e = t(this), i = e.offset();
                t.data(this, "selectable-item", {element: this, $element: e, left: i.left, top: i.top, right: i.left + e.outerWidth(), bottom: i.top + e.outerHeight(), startselected: !1, selected: e.hasClass("ui-selected"), selecting: e.hasClass("ui-selecting"), unselecting: e.hasClass("ui-unselecting")})
            })
        }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
    }, _destroy: function () {
        this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
    }, _mouseStart: function (e) {
        var i = this, s = this.options;
        this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({left: e.pageX, top: e.pageY, width: 0, height: 0}), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
            var s = t.data(this, "selectable-item");
            s.startselected = !0, e.metaKey || e.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, {unselecting: s.element}))
        }), t(e.target).parents().addBack().each(function () {
            var s, n = t.data(this, "selectable-item");
            return n ? (s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", e, {selecting: n.element}) : i._trigger("unselecting", e, {unselecting: n.element}), !1) : undefined
        }))
    }, _mouseDrag: function (e) {
        if (this.dragged = !0, !this.options.disabled) {
            var i, s = this, n = this.options, a = this.opos[0], o = this.opos[1], r = e.pageX, l = e.pageY;
            return a > r && (i = r, r = a, a = i), o > l && (i = l, l = o, o = i), this.helper.css({left: a, top: o, width: r - a, height: l - o}), this.selectees.each(function () {
                var i = t.data(this, "selectable-item"), h = !1;
                i && i.element !== s.element[0] && ("touch" === n.tolerance ? h = !(i.left > r || a > i.right || i.top > l || o > i.bottom) : "fit" === n.tolerance && (h = i.left > a && r > i.right && i.top > o && l > i.bottom), h ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", e, {selecting: i.element}))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, {unselecting: i.element}))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, {unselecting: i.element})))))
            }), !1
        }
    }, _mouseStop: function (e) {
        var i = this;
        return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function () {
            var s = t.data(this, "selectable-item");
            s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, {unselected: s.element})
        }), t(".ui-selecting", this.element[0]).each(function () {
            var s = t.data(this, "selectable-item");
            s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, {selected: s.element})
        }), this._trigger("stop", e), this.helper.remove(), !1
    }})
})(jQuery);
(function (t) {
    function e(t, e, i) {
        return t > e && e + i > t
    }

    function i(t) {
        return/left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
    }

    t.widget("ui.sortable", t.ui.mouse, {version: "1.10.4", widgetEventPrefix: "sort", ready: !1, options: {appendTo: "parent", axis: !1, connectWith: !1, containment: !1, cursor: "auto", cursorAt: !1, dropOnEmpty: !0, forcePlaceholderSize: !1, forceHelperSize: !1, grid: !1, handle: !1, helper: "original", items: "> *", opacity: !1, placeholder: !1, revert: !1, scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3, activate: null, beforeStop: null, change: null, deactivate: null, out: null, over: null, receive: null, remove: null, sort: null, start: null, stop: null, update: null}, _create: function () {
        var t = this.options;
        this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
    }, _destroy: function () {
        this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
        for (var t = this.items.length - 1; t >= 0; t--)this.items[t].item.removeData(this.widgetName + "-item");
        return this
    }, _setOption: function (e, i) {
        "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
    }, _mouseCapture: function (e, i) {
        var s = null, n = !1, o = this;
        return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () {
            return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : undefined
        }), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function () {
            this === e.target && (n = !0)
        }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1)
    }, _mouseStart: function (e, i, s) {
        var n, o, a = this.options;
        if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left}, t.extend(this.offset, {click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)for (n = this.containers.length - 1; n >= 0; n--)this.containers[n]._trigger("activate", e, this._uiHash(this));
        return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
    }, _mouseDrag: function (e) {
        var i, s, n, o, a = this.options, r = !1;
        for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - t(document).scrollTop() < a.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - a.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < a.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + a.scrollSpeed)), e.pageX - t(document).scrollLeft() < a.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - a.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < a.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
            if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s))break;
            this._rearrange(e, s), this._trigger("change", e, this._uiHash());
            break
        }
        return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
    }, _mouseStop: function (e, i) {
        if (e) {
            if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                var s = this, n = this.placeholder.offset(), o = this.options.axis, a = {};
                o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function () {
                    s._clear(e)
                })
            } else this._clear(e, i);
            return!1
        }
    }, cancel: function () {
        if (this.dragging) {
            this._mouseUp({target: null}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
            for (var e = this.containers.length - 1; e >= 0; e--)this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
        }
        return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {helper: null, dragging: !1, reverting: !1, _noFinalSort: null}), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
    }, serialize: function (e) {
        var i = this._getItemsAsjQuery(e && e.connected), s = [];
        return e = e || {}, t(i).each(function () {
            var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
            i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
        }), !s.length && e.key && s.push(e.key + "="), s.join("&")
    }, toArray: function (e) {
        var i = this._getItemsAsjQuery(e && e.connected), s = [];
        return e = e || {}, i.each(function () {
            s.push(t(e.item || this).attr(e.attribute || "id") || "")
        }), s
    }, _intersectsWith: function (t) {
        var e = this.positionAbs.left, i = e + this.helperProportions.width, s = this.positionAbs.top, n = s + this.helperProportions.height, o = t.left, a = o + t.width, r = t.top, h = r + t.height, l = this.offset.click.top, c = this.offset.click.left, u = "x" === this.options.axis || s + l > r && h > s + l, d = "y" === this.options.axis || e + c > o && a > e + c, p = u && d;
        return"pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2
    }, _intersectsWithPointer: function (t) {
        var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height), s = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width), n = i && s, o = this._getDragVerticalDirection(), a = this._getDragHorizontalDirection();
        return n ? this.floating ? a && "right" === a || "down" === o ? 2 : 1 : o && ("down" === o ? 2 : 1) : !1
    }, _intersectsWithSides: function (t) {
        var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height), s = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width), n = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection();
        return this.floating && o ? "right" === o && s || "left" === o && !s : n && ("down" === n && i || "up" === n && !i)
    }, _getDragVerticalDirection: function () {
        var t = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 !== t && (t > 0 ? "down" : "up")
    }, _getDragHorizontalDirection: function () {
        var t = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 !== t && (t > 0 ? "right" : "left")
    }, refresh: function (t) {
        return this._refreshItems(t), this.refreshPositions(), this
    }, _connectWith: function () {
        var t = this.options;
        return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
    }, _getItemsAsjQuery: function (e) {
        function i() {
            r.push(this)
        }

        var s, n, o, a, r = [], h = [], l = this._connectWith();
        if (l && e)for (s = l.length - 1; s >= 0; s--)for (o = t(l[s]), n = o.length - 1; n >= 0; n--)a = t.data(o[n], this.widgetFullName), a && a !== this && !a.options.disabled && h.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
        for (h.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {options: this.options, item: this.currentItem}) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = h.length - 1; s >= 0; s--)h[s][0].each(i);
        return t(r)
    }, _removeCurrentsFromItems: function () {
        var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
        this.items = t.grep(this.items, function (t) {
            for (var i = 0; e.length > i; i++)if (e[i] === t.item[0])return!1;
            return!0
        })
    }, _refreshItems: function (e) {
        this.items = [], this.containers = [this];
        var i, s, n, o, a, r, h, l, c = this.items, u = [
            [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {item: this.currentItem}) : t(this.options.items, this.element), this]
        ], d = this._connectWith();
        if (d && this.ready)for (i = d.length - 1; i >= 0; i--)for (n = t(d[i]), s = n.length - 1; s >= 0; s--)o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {item: this.currentItem}) : t(o.options.items, o.element), o]), this.containers.push(o));
        for (i = u.length - 1; i >= 0; i--)for (a = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++)h = t(r[s]), h.data(this.widgetName + "-item", a), c.push({item: h, instance: a, width: 0, height: 0, left: 0, top: 0})
    }, refreshPositions: function (e) {
        this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
        var i, s, n, o;
        for (i = this.items.length - 1; i >= 0; i--)s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
        if (this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--)o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
        return this
    }, _createPlaceholder: function (e) {
        e = e || this;
        var i, s = e.options;
        s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {element: function () {
            var s = e.currentItem[0].nodeName.toLowerCase(), n = t("<" + s + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
            return"tr" === s ? e.currentItem.children().each(function () {
                t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(n)
            }) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
        }, update: function (t, n) {
            (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
        }}), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
    }, _contactContainers: function (s) {
        var n, o, a, r, h, l, c, u, d, p, f = null, g = null;
        for (n = this.containers.length - 1; n >= 0; n--)if (!t.contains(this.currentItem[0], this.containers[n].element[0]))if (this._intersectsWith(this.containers[n].containerCache)) {
            if (f && t.contains(this.containers[n].element[0], f.element[0]))continue;
            f = this.containers[n], g = n
        } else this.containers[n].containerCache.over && (this.containers[n]._trigger("out", s, this._uiHash(this)), this.containers[n].containerCache.over = 0);
        if (f)if (1 === this.containers.length)this.containers[g].containerCache.over || (this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1); else {
            for (a = 1e4, r = null, p = f.floating || i(this.currentItem), h = p ? "left" : "top", l = p ? "width" : "height", c = this.positionAbs[h] + this.offset.click[h], o = this.items.length - 1; o >= 0; o--)t.contains(this.containers[g].element[0], this.items[o].item[0]) && this.items[o].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[o].top, this.items[o].height)) && (u = this.items[o].item.offset()[h], d = !1, Math.abs(u - c) > Math.abs(u + this.items[o][l] - c) && (d = !0, u += this.items[o][l]), a > Math.abs(u - c) && (a = Math.abs(u - c), r = this.items[o], this.direction = d ? "up" : "down"));
            if (!r && !this.options.dropOnEmpty)return;
            if (this.currentContainer === this.containers[g])return;
            r ? this._rearrange(s, r, null, !0) : this._rearrange(s, null, this.containers[g].element, !0), this._trigger("change", s, this._uiHash()), this.containers[g]._trigger("change", s, this._uiHash(this)), this.currentContainer = this.containers[g], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1
        }
    }, _createHelper: function (e) {
        var i = this.options, s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
        return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left")}), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
    }, _adjustOffsetFromHelper: function (e) {
        "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {left: +e[0], top: +e[1] || 0}), "left"in e && (this.offset.click.left = e.left + this.margins.left), "right"in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top"in e && (this.offset.click.top = e.top + this.margins.top), "bottom"in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
    }, _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var e = this.offsetParent.offset();
        return"absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {top: 0, left: 0}), {top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
    }, _getRelativeOffset: function () {
        if ("relative" === this.cssPosition) {
            var t = this.currentItem.position();
            return{top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
        }
        return{top: 0, left: 0}
    }, _cacheMargins: function () {
        this.margins = {left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0}
    }, _cacheHelperProportions: function () {
        this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
    }, _setContainment: function () {
        var e, i, s, n = this.options;
        "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
    }, _convertPositionTo: function (e, i) {
        i || (i = this.position);
        var s = "absolute" === e ? 1 : -1, n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(n[0].tagName);
        return{top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s}
    }, _generatePosition: function (e) {
        var i, s, n = this.options, o = e.pageX, a = e.pageY, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = /(html|body)/i.test(r[0].tagName);
        return"relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()), left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())}
    }, _rearrange: function (t, e, i, s) {
        i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
        var n = this.counter;
        this._delay(function () {
            n === this.counter && this.refreshPositions(!s)
        })
    }, _clear: function (t, e) {
        function i(t, e, i) {
            return function (s) {
                i._trigger(t, s, e._uiHash(e))
            }
        }

        this.reverting = !1;
        var s, n = [];
        if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
            for (s in this._storedCSS)("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
            this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
        } else this.currentItem.show();
        for (this.fromOutside && !e && n.push(function (t) {
            this._trigger("receive", t, this._uiHash(this.fromOutside))
        }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function (t) {
            this._trigger("update", t, this._uiHash())
        }), this !== this.currentContainer && (e || (n.push(function (t) {
            this._trigger("remove", t, this._uiHash())
        }), n.push(function (t) {
            return function (e) {
                t._trigger("receive", e, this._uiHash(this))
            }
        }.call(this, this.currentContainer)), n.push(function (t) {
            return function (e) {
                t._trigger("update", e, this._uiHash(this))
            }
        }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--)e || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
        if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
            if (!e) {
                for (this._trigger("beforeStop", t, this._uiHash()), s = 0; n.length > s; s++)n[s].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !1
        }
        if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
            for (s = 0; n.length > s; s++)n[s].call(this, t);
            this._trigger("stop", t, this._uiHash())
        }
        return this.fromOutside = !1, !0
    }, _trigger: function () {
        t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
    }, _uiHash: function (e) {
        var i = e || this;
        return{helper: i.helper, placeholder: i.placeholder || t([]), position: i.position, originalPosition: i.originalPosition, offset: i.positionAbs, item: i.currentItem, sender: e ? e.element : null}
    }})
})(jQuery);
(function (t) {
    var e = 0, i = {}, s = {};
    i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide", s.height = s.paddingTop = s.paddingBottom = s.borderTopWidth = s.borderBottomWidth = "show", t.widget("ui.accordion", {version: "1.10.4", options: {active: 0, animate: {}, collapsible: !1, event: "click", header: "> li > :first-child,> :not(li):even", heightStyle: "auto", icons: {activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e"}, activate: null, beforeActivate: null}, _create: function () {
        var e = this.options;
        this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), 0 > e.active && (e.active += this.headers.length), this._refresh()
    }, _getCreateEventData: function () {
        return{header: this.active, panel: this.active.length ? this.active.next() : t(), content: this.active.length ? this.active.next() : t()}
    }, _createIcons: function () {
        var e = this.options.icons;
        e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"))
    }, _destroyIcons: function () {
        this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
    }, _destroy: function () {
        var t;
        this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function () {
            /^ui-accordion/.test(this.id) && this.removeAttribute("id")
        }), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function () {
            /^ui-accordion/.test(this.id) && this.removeAttribute("id")
        }), "content" !== this.options.heightStyle && t.css("height", "")
    }, _setOption: function (t, e) {
        return"active" === t ? (this._activate(e), undefined) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), "disabled" === t && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e), undefined)
    }, _keydown: function (e) {
        if (!e.altKey && !e.ctrlKey) {
            var i = t.ui.keyCode, s = this.headers.length, n = this.headers.index(e.target), o = !1;
            switch (e.keyCode) {
                case i.RIGHT:
                case i.DOWN:
                    o = this.headers[(n + 1) % s];
                    break;
                case i.LEFT:
                case i.UP:
                    o = this.headers[(n - 1 + s) % s];
                    break;
                case i.SPACE:
                case i.ENTER:
                    this._eventHandler(e);
                    break;
                case i.HOME:
                    o = this.headers[0];
                    break;
                case i.END:
                    o = this.headers[s - 1]
            }
            o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), o.focus(), e.preventDefault())
        }
    }, _panelKeyDown: function (e) {
        e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
    }, refresh: function () {
        var e = this.options;
        this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
    }, _processPanels: function () {
        this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
    }, _refresh: function () {
        var i, s = this.options, n = s.heightStyle, o = this.element.parent(), a = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++e);
        this.active = this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function (e) {
            var i = t(this), s = i.attr("id"), n = i.next(), o = n.attr("id");
            s || (s = a + "-header-" + e, i.attr("id", s)), o || (o = a + "-panel-" + e, n.attr("id", o)), i.attr("aria-controls", o), n.attr("aria-labelledby", s)
        }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({"aria-selected": "false", "aria-expanded": "false", tabIndex: -1}).next().attr({"aria-hidden": "true"}).hide(), this.active.length ? this.active.attr({"aria-selected": "true", "aria-expanded": "true", tabIndex: 0}).next().attr({"aria-hidden": "false"}) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(s.event), "fill" === n ? (i = o.height(), this.element.siblings(":visible").each(function () {
            var e = t(this), s = e.css("position");
            "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
        }), this.headers.each(function () {
            i -= t(this).outerHeight(!0)
        }), this.headers.next().each(function () {
            t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
        }).css("overflow", "auto")) : "auto" === n && (i = 0, this.headers.next().each(function () {
            i = Math.max(i, t(this).css("height", "").height())
        }).height(i))
    }, _activate: function (e) {
        var i = this._findActive(e)[0];
        i !== this.active[0] && (i = i || this.active[0], this._eventHandler({target: i, currentTarget: i, preventDefault: t.noop}))
    }, _findActive: function (e) {
        return"number" == typeof e ? this.headers.eq(e) : t()
    }, _setupEvents: function (e) {
        var i = {keydown: "_keydown"};
        e && t.each(e.split(" "), function (t, e) {
            i[e] = "_eventHandler"
        }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {keydown: "_panelKeyDown"}), this._hoverable(this.headers), this._focusable(this.headers)
    }, _eventHandler: function (e) {
        var i = this.options, s = this.active, n = t(e.currentTarget), o = n[0] === s[0], a = o && i.collapsible, r = a ? t() : n.next(), h = s.next(), l = {oldHeader: s, oldPanel: h, newHeader: a ? t() : n, newPanel: r};
        e.preventDefault(), o && !i.collapsible || this._trigger("beforeActivate", e, l) === !1 || (i.active = a ? !1 : this.headers.index(n), this.active = o ? t() : n, this._toggle(l), s.removeClass("ui-accordion-header-active ui-state-active"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), o || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), n.next().addClass("ui-accordion-content-active")))
    }, _toggle: function (e) {
        var i = e.newPanel, s = this.prevShow.length ? this.prevShow : e.oldPanel;
        this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)), s.attr({"aria-hidden": "true"}), s.prev().attr("aria-selected", "false"), i.length && s.length ? s.prev().attr({tabIndex: -1, "aria-expanded": "false"}) : i.length && this.headers.filter(function () {
            return 0 === t(this).attr("tabIndex")
        }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({"aria-selected": "true", tabIndex: 0, "aria-expanded": "true"})
    }, _animate: function (t, e, n) {
        var o, a, r, h = this, l = 0, c = t.length && (!e.length || t.index() < e.index()), d = this.options.animate || {}, u = c && d.down || d, p = function () {
            h._toggleComplete(n)
        };
        return"number" == typeof u && (r = u), "string" == typeof u && (a = u), a = a || u.easing || d.easing, r = r || u.duration || d.duration, e.length ? t.length ? (o = t.show().outerHeight(), e.animate(i, {duration: r, easing: a, step: function (t, e) {
            e.now = Math.round(t)
        }}), t.hide().animate(s, {duration: r, easing: a, complete: p, step: function (t, i) {
            i.now = Math.round(t), "height" !== i.prop ? l += i.now : "content" !== h.options.heightStyle && (i.now = Math.round(o - e.outerHeight() - l), l = 0)
        }}), undefined) : e.animate(i, r, a, p) : t.animate(s, r, a, p)
    }, _toggleComplete: function (t) {
        var e = t.oldPanel;
        e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
    }})
})(jQuery);
(function (t) {
    t.widget("ui.autocomplete", {version: "1.10.4", defaultElement: "<input>", options: {appendTo: null, autoFocus: !1, delay: 300, minLength: 1, position: {my: "left top", at: "left bottom", collision: "none"}, source: null, change: null, close: null, focus: null, open: null, response: null, search: null, select: null}, requestIndex: 0, pending: 0, _create: function () {
        var e, i, s, n = this.element[0].nodeName.toLowerCase(), o = "textarea" === n, a = "input" === n;
        this.isMultiLine = o ? !0 : a ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {keydown: function (n) {
            if (this.element.prop("readOnly"))return e = !0, s = !0, i = !0, undefined;
            e = !1, s = !1, i = !1;
            var o = t.ui.keyCode;
            switch (n.keyCode) {
                case o.PAGE_UP:
                    e = !0, this._move("previousPage", n);
                    break;
                case o.PAGE_DOWN:
                    e = !0, this._move("nextPage", n);
                    break;
                case o.UP:
                    e = !0, this._keyEvent("previous", n);
                    break;
                case o.DOWN:
                    e = !0, this._keyEvent("next", n);
                    break;
                case o.ENTER:
                case o.NUMPAD_ENTER:
                    this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));
                    break;
                case o.TAB:
                    this.menu.active && this.menu.select(n);
                    break;
                case o.ESCAPE:
                    this.menu.element.is(":visible") && (this._value(this.term), this.close(n), n.preventDefault());
                    break;
                default:
                    i = !0, this._searchTimeout(n)
            }
        }, keypress: function (s) {
            if (e)return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), undefined;
            if (!i) {
                var n = t.ui.keyCode;
                switch (s.keyCode) {
                    case n.PAGE_UP:
                        this._move("previousPage", s);
                        break;
                    case n.PAGE_DOWN:
                        this._move("nextPage", s);
                        break;
                    case n.UP:
                        this._keyEvent("previous", s);
                        break;
                    case n.DOWN:
                        this._keyEvent("next", s)
                }
            }
        }, input: function (t) {
            return s ? (s = !1, t.preventDefault(), undefined) : (this._searchTimeout(t), undefined)
        }, focus: function () {
            this.selectedItem = null, this.previous = this._value()
        }, blur: function (t) {
            return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(t), this._change(t), undefined)
        }}), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role: null}).hide().data("ui-menu"), this._on(this.menu.element, {mousedown: function (e) {
            e.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                delete this.cancelBlur
            });
            var i = this.menu.element[0];
            t(e.target).closest(".ui-menu-item").length || this._delay(function () {
                var e = this;
                this.document.one("mousedown", function (s) {
                    s.target === e.element[0] || s.target === i || t.contains(i, s.target) || e.close()
                })
            })
        }, menufocus: function (e, i) {
            if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)))return this.menu.blur(), this.document.one("mousemove", function () {
                t(e.target).trigger(e.originalEvent)
            }), undefined;
            var s = i.item.data("ui-autocomplete-item");
            !1 !== this._trigger("focus", e, {item: s}) ? e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value) : this.liveRegion.text(s.value)
        }, menuselect: function (t, e) {
            var i = e.item.data("ui-autocomplete-item"), s = this.previous;
            this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function () {
                this.previous = s, this.selectedItem = i
            })), !1 !== this._trigger("select", t, {item: i}) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
        }}), this.liveRegion = t("<span>", {role: "status", "aria-live": "polite"}).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {beforeunload: function () {
            this.element.removeAttr("autocomplete")
        }})
    }, _destroy: function () {
        clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
    }, _setOption: function (t, e) {
        this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
    }, _appendTo: function () {
        var e = this.options.appendTo;
        return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
    }, _initSource: function () {
        var e, i, s = this;
        t.isArray(this.options.source) ? (e = this.options.source, this.source = function (i, s) {
            s(t.ui.autocomplete.filter(e, i.term))
        }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (e, n) {
            s.xhr && s.xhr.abort(), s.xhr = t.ajax({url: i, data: e, dataType: "json", success: function (t) {
                n(t)
            }, error: function () {
                n([])
            }})
        }) : this.source = this.options.source
    }, _searchTimeout: function (t) {
        clearTimeout(this.searching), this.searching = this._delay(function () {
            this.term !== this._value() && (this.selectedItem = null, this.search(null, t))
        }, this.options.delay)
    }, search: function (t, e) {
        return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : undefined
    }, _search: function (t) {
        this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({term: t}, this._response())
    }, _response: function () {
        var e = ++this.requestIndex;
        return t.proxy(function (t) {
            e === this.requestIndex && this.__response(t), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
        }, this)
    }, __response: function (t) {
        t && (t = this._normalize(t)), this._trigger("response", null, {content: t}), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
    }, close: function (t) {
        this.cancelSearch = !0, this._close(t)
    }, _close: function (t) {
        this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
    }, _change: function (t) {
        this.previous !== this._value() && this._trigger("change", t, {item: this.selectedItem})
    }, _normalize: function (e) {
        return e.length && e[0].label && e[0].value ? e : t.map(e, function (e) {
            return"string" == typeof e ? {label: e, value: e} : t.extend({label: e.label || e.value, value: e.value || e.label}, e)
        })
    }, _suggest: function (e) {
        var i = this.menu.element.empty();
        this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({of: this.element}, this.options.position)), this.options.autoFocus && this.menu.next()
    }, _resizeMenu: function () {
        var t = this.menu.element;
        t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
    }, _renderMenu: function (e, i) {
        var s = this;
        t.each(i, function (t, i) {
            s._renderItemData(e, i)
        })
    }, _renderItemData: function (t, e) {
        return this._renderItem(t, e).data("ui-autocomplete-item", e)
    }, _renderItem: function (e, i) {
        return t("<li>").append(t("<a>").text(i.label)).appendTo(e)
    }, _move: function (t, e) {
        return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[t](e), undefined) : (this.search(null, e), undefined)
    }, widget: function () {
        return this.menu.element
    }, _value: function () {
        return this.valueMethod.apply(this.element, arguments)
    }, _keyEvent: function (t, e) {
        (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
    }}), t.extend(t.ui.autocomplete, {escapeRegex: function (t) {
        return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    }, filter: function (e, i) {
        var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
        return t.grep(e, function (t) {
            return s.test(t.label || t.value || t)
        })
    }}), t.widget("ui.autocomplete", t.ui.autocomplete, {options: {messages: {noResults: "No search results.", results: function (t) {
        return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
    }}}, __response: function (t) {
        var e;
        this._superApply(arguments), this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.text(e))
    }})
})(jQuery);
(function (t) {
    var e, i = "ui-button ui-widget ui-state-default ui-corner-all", n = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", s = function () {
        var e = t(this);
        setTimeout(function () {
            e.find(":ui-button").button("refresh")
        }, 1)
    }, o = function (e) {
        var i = e.name, n = e.form, s = t([]);
        return i && (i = i.replace(/'/g, "\\'"), s = n ? t(n).find("[name='" + i + "']") : t("[name='" + i + "']", e.ownerDocument).filter(function () {
            return!this.form
        })), s
    };
    t.widget("ui.button", {version: "1.10.4", defaultElement: "<button>", options: {disabled: null, text: !0, label: null, icons: {primary: null, secondary: null}}, _create: function () {
        this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, s), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
        var n = this, a = this.options, u = "checkbox" === this.type || "radio" === this.type, r = u ? "" : "ui-state-active";
        null === a.label && (a.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(i).attr("role", "button").bind("mouseenter" + this.eventNamespace,function () {
            a.disabled || this === e && t(this).addClass("ui-state-active")
        }).bind("mouseleave" + this.eventNamespace,function () {
            a.disabled || t(this).removeClass(r)
        }).bind("click" + this.eventNamespace, function (t) {
            a.disabled && (t.preventDefault(), t.stopImmediatePropagation())
        }), this._on({focus: function () {
            this.buttonElement.addClass("ui-state-focus")
        }, blur: function () {
            this.buttonElement.removeClass("ui-state-focus")
        }}), u && this.element.bind("change" + this.eventNamespace, function () {
            n.refresh()
        }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
            return a.disabled ? !1 : undefined
        }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
            if (a.disabled)return!1;
            t(this).addClass("ui-state-active"), n.buttonElement.attr("aria-pressed", "true");
            var e = n.element[0];
            o(e).not(e).map(function () {
                return t(this).button("widget")[0]
            }).removeClass("ui-state-active").attr("aria-pressed", "false")
        }) : (this.buttonElement.bind("mousedown" + this.eventNamespace,function () {
            return a.disabled ? !1 : (t(this).addClass("ui-state-active"), e = this, n.document.one("mouseup", function () {
                e = null
            }), undefined)
        }).bind("mouseup" + this.eventNamespace,function () {
            return a.disabled ? !1 : (t(this).removeClass("ui-state-active"), undefined)
        }).bind("keydown" + this.eventNamespace,function (e) {
            return a.disabled ? !1 : ((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"), undefined)
        }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
            t(this).removeClass("ui-state-active")
        }), this.buttonElement.is("a") && this.buttonElement.keyup(function (e) {
            e.keyCode === t.ui.keyCode.SPACE && t(this).click()
        })), this._setOption("disabled", a.disabled), this._resetButton()
    }, _determineButtonType: function () {
        var t, e, i;
        this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
    }, widget: function () {
        return this.buttonElement
    }, _destroy: function () {
        this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(i + " ui-state-active " + n).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
    }, _setOption: function (t, e) {
        return this._super(t, e), "disabled" === t ? (this.element.prop("disabled", !!e), e && this.buttonElement.removeClass("ui-state-focus"), undefined) : (this._resetButton(), undefined)
    }, refresh: function () {
        var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
        e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? o(this.element[0]).each(function () {
            t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
        }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
    }, _resetButton: function () {
        if ("input" === this.type)return this.options.label && this.element.val(this.options.label), undefined;
        var e = this.buttonElement.removeClass(n), i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(), s = this.options.icons, o = s.primary && s.secondary, a = [];
        s.primary || s.secondary ? (this.options.text && a.push("ui-button-text-icon" + (o ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (a.push(o ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : a.push("ui-button-text-only"), e.addClass(a.join(" "))
    }}), t.widget("ui.buttonset", {version: "1.10.4", options: {items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"}, _create: function () {
        this.element.addClass("ui-buttonset")
    }, _init: function () {
        this.refresh()
    }, _setOption: function (t, e) {
        "disabled" === t && this.buttons.button("option", t, e), this._super(t, e)
    }, refresh: function () {
        var e = "rtl" === this.element.css("direction");
        this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
            return t(this).button("widget")[0]
        }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
    }, _destroy: function () {
        this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
            return t(this).button("widget")[0]
        }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
    }})
})(jQuery);
(function (t, e) {
    function i() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: ""}, this._defaults = {showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1}, t.extend(this._defaults, this.regional[""]), this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function s(e) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(i, "mouseout",function () {
            t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", function () {
            t.datepicker._isDisabledDatepicker(a.inline ? e.parent()[0] : a.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
        })
    }

    function n(e, i) {
        t.extend(e, i);
        for (var s in i)null == i[s] && (e[s] = i[s]);
        return e
    }

    t.extend(t.ui, {datepicker: {version: "1.10.4"}});
    var a, o = "datepicker";
    t.extend(i.prototype, {markerClassName: "hasDatepicker", maxRows: 4, _widgetDatepicker: function () {
        return this.dpDiv
    }, setDefaults: function (t) {
        return n(this._defaults, t || {}), this
    }, _attachDatepicker: function (e, i) {
        var s, n, a;
        s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), a = this._newInst(t(e), n), a.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, a) : n && this._inlineDatepicker(e, a)
    }, _newInst: function (e, i) {
        var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
        return{id: n, input: e, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: i, dpDiv: i ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv}
    }, _connectDatepicker: function (e, i) {
        var s = t(e);
        i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, o, i), i.settings.disabled && this._disableDatepicker(e))
    }, _attachments: function (e, i) {
        var s, n, a, o = this._get(i, "appendText"), r = this._get(i, "isRTL");
        i.append && i.append.remove(), o && (i.append = t("<span class='" + this._appendClass + "'>" + o + "</span>"), e[r ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), a = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({src: a, alt: n, title: n}) : t("<button type='button'></button>").addClass(this._triggerClass).html(a ? t("<img/>").attr({src: a, alt: n, title: n}) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.click(function () {
            return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
        }))
    }, _autoSize: function (t) {
        if (this._get(t, "autoSize") && !t.inline) {
            var e, i, s, n, a = new Date(2009, 11, 20), o = this._get(t, "dateFormat");
            o.match(/[DM]/) && (e = function (t) {
                for (i = 0, s = 0, n = 0; t.length > n; n++)t[n].length > i && (i = t[n].length, s = n);
                return s
            }, a.setMonth(e(this._get(t, o.match(/MM/) ? "monthNames" : "monthNamesShort"))), a.setDate(e(this._get(t, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())), t.input.attr("size", this._formatDate(t, a).length)
        }
    }, _inlineDatepicker: function (e, i) {
        var s = t(e);
        s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, o, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
    }, _dialogDatepicker: function (e, i, s, a, r) {
        var h, l, c, u, d, p = this._dialogInst;
        return p || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], o, p)), n(p.settings, a || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = r ? r.length ? r : [r.pageX, r.pageY] : null, this._pos || (l = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, c / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], o, p), this
    }, _destroyDatepicker: function (e) {
        var i, s = t(e), n = t.data(e, o);
        s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, o), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty())
    }, _enableDatepicker: function (e) {
        var i, s, n = t(e), a = t.data(e, o);
        n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, a.trigger.filter("button").each(function () {
            this.disabled = !1
        }).end().filter("img").css({opacity: "1.0", cursor: ""})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
            return t === e ? null : t
        }))
    }, _disableDatepicker: function (e) {
        var i, s, n = t(e), a = t.data(e, o);
        n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, a.trigger.filter("button").each(function () {
            this.disabled = !0
        }).end().filter("img").css({opacity: "0.5", cursor: "default"})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
            return t === e ? null : t
        }), this._disabledInputs[this._disabledInputs.length] = e)
    }, _isDisabledDatepicker: function (t) {
        if (!t)return!1;
        for (var e = 0; this._disabledInputs.length > e; e++)if (this._disabledInputs[e] === t)return!0;
        return!1
    }, _getInst: function (e) {
        try {
            return t.data(e, o)
        } catch (i) {
            throw"Missing instance data for this datepicker"
        }
    }, _optionDatepicker: function (i, s, a) {
        var o, r, h, l, c = this._getInst(i);
        return 2 === arguments.length && "string" == typeof s ? "defaults" === s ? t.extend({}, t.datepicker._defaults) : c ? "all" === s ? t.extend({}, c.settings) : this._get(c, s) : null : (o = s || {}, "string" == typeof s && (o = {}, o[s] = a), c && (this._curInst === c && this._hideDatepicker(), r = this._getDateDatepicker(i, !0), h = this._getMinMaxDate(c, "min"), l = this._getMinMaxDate(c, "max"), n(c.settings, o), null !== h && o.dateFormat !== e && o.minDate === e && (c.settings.minDate = this._formatDate(c, h)), null !== l && o.dateFormat !== e && o.maxDate === e && (c.settings.maxDate = this._formatDate(c, l)), "disabled"in o && (o.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), c), this._autoSize(c), this._setDate(c, r), this._updateAlternate(c), this._updateDatepicker(c)), e)
    }, _changeDatepicker: function (t, e, i) {
        this._optionDatepicker(t, e, i)
    }, _refreshDatepicker: function (t) {
        var e = this._getInst(t);
        e && this._updateDatepicker(e)
    }, _setDateDatepicker: function (t, e) {
        var i = this._getInst(t);
        i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
    }, _getDateDatepicker: function (t, e) {
        var i = this._getInst(t);
        return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
    }, _doKeyDown: function (e) {
        var i, s, n, a = t.datepicker._getInst(e.target), o = !0, r = a.dpDiv.is(".ui-datepicker-rtl");
        if (a._keyEvent = !0, t.datepicker._datepickerShowing)switch (e.keyCode) {
            case 9:
                t.datepicker._hideDatepicker(), o = !1;
                break;
            case 13:
                return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", a.dpDiv), n[0] && t.datepicker._selectDay(e.target, a.selectedMonth, a.selectedYear, n[0]), i = t.datepicker._get(a, "onSelect"), i ? (s = t.datepicker._formatDate(a), i.apply(a.input ? a.input[0] : null, [s, a])) : t.datepicker._hideDatepicker(), !1;
            case 27:
                t.datepicker._hideDatepicker();
                break;
            case 33:
                t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M");
                break;
            case 34:
                t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M");
                break;
            case 35:
                (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), o = e.ctrlKey || e.metaKey;
                break;
            case 36:
                (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), o = e.ctrlKey || e.metaKey;
                break;
            case 37:
                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), o = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M");
                break;
            case 38:
                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), o = e.ctrlKey || e.metaKey;
                break;
            case 39:
                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), o = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M");
                break;
            case 40:
                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), o = e.ctrlKey || e.metaKey;
                break;
            default:
                o = !1
        } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : o = !1;
        o && (e.preventDefault(), e.stopPropagation())
    }, _doKeyPress: function (i) {
        var s, n, a = t.datepicker._getInst(i.target);
        return t.datepicker._get(a, "constrainInput") ? (s = t.datepicker._possibleChars(t.datepicker._get(a, "dateFormat")), n = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > n || !s || s.indexOf(n) > -1) : e
    }, _doKeyUp: function (e) {
        var i, s = t.datepicker._getInst(e.target);
        if (s.input.val() !== s.lastVal)try {
            i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s))
        } catch (n) {
        }
        return!0
    }, _showDatepicker: function (e) {
        if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
            var i, s, a, o, r, h, l;
            i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), s = t.datepicker._get(i, "beforeShow"), a = s ? s.apply(e, [e, i]) : {}, a !== !1 && (n(i.settings, a), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), o = !1, t(e).parents().each(function () {
                return o |= "fixed" === t(this).css("position"), !o
            }), r = {left: t.datepicker._pos[0], top: t.datepicker._pos[1]}, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({position: "absolute", display: "block", top: "-1000px"}), t.datepicker._updateDatepicker(i), r = t.datepicker._checkOffset(i, r, o), i.dpDiv.css({position: t.datepicker._inDialog && t.blockUI ? "static" : o ? "fixed" : "absolute", display: "none", left: r.left + "px", top: r.top + "px"}), i.inline || (h = t.datepicker._get(i, "showAnim"), l = t.datepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), l) : i.dpDiv[h || "show"](h ? l : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
        }
    }, _updateDatepicker: function (e) {
        this.maxRows = 4, a = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
        var i, s = this._getNumberOfMonths(e), n = s[1], o = 17;
        e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", o * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function () {
            i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
        }, 0))
    }, _shouldFocusInput: function (t) {
        return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
    }, _checkOffset: function (e, i, s) {
        var n = e.dpDiv.outerWidth(), a = e.dpDiv.outerHeight(), o = e.input ? e.input.outerWidth() : 0, r = e.input ? e.input.outerHeight() : 0, h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()), l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
        return i.left -= this._get(e, "isRTL") ? n - o : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + a > l && l > a ? Math.abs(a + r) : 0), i
    }, _findPos: function (e) {
        for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));)e = e[n ? "previousSibling" : "nextSibling"];
        return i = t(e).offset(), [i.left, i.top]
    }, _hideDatepicker: function (e) {
        var i, s, n, a, r = this._curInst;
        !r || e && r !== t.data(e, o) || this._datepickerShowing && (i = this._get(r, "showAnim"), s = this._get(r, "duration"), n = function () {
            t.datepicker._tidyDialog(r)
        }, t.effects && (t.effects.effect[i] || t.effects[i]) ? r.dpDiv.hide(i, t.datepicker._get(r, "showOptions"), s, n) : r.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, a = this._get(r, "onClose"), a && a.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({position: "absolute", left: "0", top: "-100px"}), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
    }, _tidyDialog: function (t) {
        t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
    }, _checkExternalClick: function (e) {
        if (t.datepicker._curInst) {
            var i = t(e.target), s = t.datepicker._getInst(i[0]);
            (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
        }
    }, _adjustDate: function (e, i, s) {
        var n = t(e), a = this._getInst(n[0]);
        this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ("M" === s ? this._get(a, "showCurrentAtPos") : 0), s), this._updateDatepicker(a))
    }, _gotoToday: function (e) {
        var i, s = t(e), n = this._getInst(s[0]);
        this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
    }, _selectMonthYear: function (e, i, s) {
        var n = t(e), a = this._getInst(n[0]);
        a["selected" + ("M" === s ? "Month" : "Year")] = a["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(a), this._adjustDate(n)
    }, _selectDay: function (e, i, s, n) {
        var a, o = t(e);
        t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (a = this._getInst(o[0]), a.selectedDay = a.currentDay = t("a", n).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = s, this._selectDate(e, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)))
    }, _clearDate: function (e) {
        var i = t(e);
        this._selectDate(i, "")
    }, _selectDate: function (e, i) {
        var s, n = t(e), a = this._getInst(n[0]);
        i = null != i ? i : this._formatDate(a), a.input && a.input.val(i), this._updateAlternate(a), s = this._get(a, "onSelect"), s ? s.apply(a.input ? a.input[0] : null, [i, a]) : a.input && a.input.trigger("change"), a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], "object" != typeof a.input[0] && a.input.focus(), this._lastInput = null)
    }, _updateAlternate: function (e) {
        var i, s, n, a = this._get(e, "altField");
        a && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(a).each(function () {
            t(this).val(n)
        }))
    }, noWeekends: function (t) {
        var e = t.getDay();
        return[e > 0 && 6 > e, ""]
    }, iso8601Week: function (t) {
        var e, i = new Date(t.getTime());
        return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
    }, parseDate: function (i, s, n) {
        if (null == i || null == s)throw"Invalid arguments";
        if (s = "object" == typeof s ? "" + s : s + "", "" === s)return null;
        var a, o, r, h, l = 0, c = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff, u = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10), d = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort, p = (n ? n.dayNames : null) || this._defaults.dayNames, g = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort, f = (n ? n.monthNames : null) || this._defaults.monthNames, m = -1, _ = -1, v = -1, b = -1, y = !1, w = function (t) {
            var e = i.length > a + 1 && i.charAt(a + 1) === t;
            return e && a++, e
        }, D = function (t) {
            var e = w(t), i = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2, n = RegExp("^\\d{1," + i + "}"), a = s.substring(l).match(n);
            if (!a)throw"Missing number at position " + l;
            return l += a[0].length, parseInt(a[0], 10)
        }, k = function (i, n, a) {
            var o = -1, r = t.map(w(i) ? a : n,function (t, e) {
                return[
                    [e, t]
                ]
            }).sort(function (t, e) {
                return-(t[1].length - e[1].length)
            });
            if (t.each(r, function (t, i) {
                var n = i[1];
                return s.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (o = i[0], l += n.length, !1) : e
            }), -1 !== o)return o + 1;
            throw"Unknown name at position " + l
        }, x = function () {
            if (s.charAt(l) !== i.charAt(a))throw"Unexpected literal at position " + l;
            l++
        };
        for (a = 0; i.length > a; a++)if (y)"'" !== i.charAt(a) || w("'") ? x() : y = !1; else switch (i.charAt(a)) {
            case"d":
                v = D("d");
                break;
            case"D":
                k("D", d, p);
                break;
            case"o":
                b = D("o");
                break;
            case"m":
                _ = D("m");
                break;
            case"M":
                _ = k("M", g, f);
                break;
            case"y":
                m = D("y");
                break;
            case"@":
                h = new Date(D("@")), m = h.getFullYear(), _ = h.getMonth() + 1, v = h.getDate();
                break;
            case"!":
                h = new Date((D("!") - this._ticksTo1970) / 1e4), m = h.getFullYear(), _ = h.getMonth() + 1, v = h.getDate();
                break;
            case"'":
                w("'") ? x() : y = !0;
                break;
            default:
                x()
        }
        if (s.length > l && (r = s.substr(l), !/^\s+/.test(r)))throw"Extra/unparsed characters found in date: " + r;
        if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= m ? 0 : -100)), b > -1)for (_ = 1, v = b; ;) {
            if (o = this._getDaysInMonth(m, _ - 1), o >= v)break;
            _++, v -= o
        }
        if (h = this._daylightSavingAdjust(new Date(m, _ - 1, v)), h.getFullYear() !== m || h.getMonth() + 1 !== _ || h.getDate() !== v)throw"Invalid date";
        return h
    }, ATOM: "yy-mm-dd", COOKIE: "D, dd M yy", ISO_8601: "yy-mm-dd", RFC_822: "D, d M y", RFC_850: "DD, dd-M-y", RFC_1036: "D, d M y", RFC_1123: "D, d M yy", RFC_2822: "D, d M yy", RSS: "D, d M y", TICKS: "!", TIMESTAMP: "@", W3C: "yy-mm-dd", _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)), formatDate: function (t, e, i) {
        if (!e)return"";
        var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, a = (i ? i.dayNames : null) || this._defaults.dayNames, o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, r = (i ? i.monthNames : null) || this._defaults.monthNames, h = function (e) {
            var i = t.length > s + 1 && t.charAt(s + 1) === e;
            return i && s++, i
        }, l = function (t, e, i) {
            var s = "" + e;
            if (h(t))for (; i > s.length;)s = "0" + s;
            return s
        }, c = function (t, e, i, s) {
            return h(t) ? s[e] : i[e]
        }, u = "", d = !1;
        if (e)for (s = 0; t.length > s; s++)if (d)"'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1; else switch (t.charAt(s)) {
            case"d":
                u += l("d", e.getDate(), 2);
                break;
            case"D":
                u += c("D", e.getDay(), n, a);
                break;
            case"o":
                u += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;
            case"m":
                u += l("m", e.getMonth() + 1, 2);
                break;
            case"M":
                u += c("M", e.getMonth(), o, r);
                break;
            case"y":
                u += h("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
                break;
            case"@":
                u += e.getTime();
                break;
            case"!":
                u += 1e4 * e.getTime() + this._ticksTo1970;
                break;
            case"'":
                h("'") ? u += "'" : d = !0;
                break;
            default:
                u += t.charAt(s)
        }
        return u
    }, _possibleChars: function (t) {
        var e, i = "", s = !1, n = function (i) {
            var s = t.length > e + 1 && t.charAt(e + 1) === i;
            return s && e++, s
        };
        for (e = 0; t.length > e; e++)if (s)"'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1; else switch (t.charAt(e)) {
            case"d":
            case"m":
            case"y":
            case"@":
                i += "0123456789";
                break;
            case"D":
            case"M":
                return null;
            case"'":
                n("'") ? i += "'" : s = !0;
                break;
            default:
                i += t.charAt(e)
        }
        return i
    }, _get: function (t, i) {
        return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
    }, _setDateFromField: function (t, e) {
        if (t.input.val() !== t.lastVal) {
            var i = this._get(t, "dateFormat"), s = t.lastVal = t.input ? t.input.val() : null, n = this._getDefaultDate(t), a = n, o = this._getFormatConfig(t);
            try {
                a = this.parseDate(i, s, o) || n
            } catch (r) {
                s = e ? "" : s
            }
            t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), t.currentDay = s ? a.getDate() : 0, t.currentMonth = s ? a.getMonth() : 0, t.currentYear = s ? a.getFullYear() : 0, this._adjustInstDate(t)
        }
    }, _getDefaultDate: function (t) {
        return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
    }, _determineDate: function (e, i, s) {
        var n = function (t) {
            var e = new Date;
            return e.setDate(e.getDate() + t), e
        }, a = function (i) {
            try {
                return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
            } catch (s) {
            }
            for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, a = n.getFullYear(), o = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
                switch (l[2] || "d") {
                    case"d":
                    case"D":
                        r += parseInt(l[1], 10);
                        break;
                    case"w":
                    case"W":
                        r += 7 * parseInt(l[1], 10);
                        break;
                    case"m":
                    case"M":
                        o += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(a, o));
                        break;
                    case"y":
                    case"Y":
                        a += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(a, o))
                }
                l = h.exec(i)
            }
            return new Date(a, o, r)
        }, o = null == i || "" === i ? s : "string" == typeof i ? a(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
        return o = o && "Invalid Date" == "" + o ? s : o, o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o)
    }, _daylightSavingAdjust: function (t) {
        return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
    }, _setDate: function (t, e, i) {
        var s = !e, n = t.selectedMonth, a = t.selectedYear, o = this._restrictMinMax(t, this._determineDate(t, e, new Date));
        t.selectedDay = t.currentDay = o.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = o.getMonth(), t.drawYear = t.selectedYear = t.currentYear = o.getFullYear(), n === t.selectedMonth && a === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
    }, _getDate: function (t) {
        var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
        return e
    }, _attachHandlers: function (e) {
        var i = this._get(e, "stepMonths"), s = "#" + e.id.replace(/\\\\/g, "\\");
        e.dpDiv.find("[data-handler]").map(function () {
            var e = {prev: function () {
                t.datepicker._adjustDate(s, -i, "M")
            }, next: function () {
                t.datepicker._adjustDate(s, +i, "M")
            }, hide: function () {
                t.datepicker._hideDatepicker()
            }, today: function () {
                t.datepicker._gotoToday(s)
            }, selectDay: function () {
                return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
            }, selectMonth: function () {
                return t.datepicker._selectMonthYear(s, this, "M"), !1
            }, selectYear: function () {
                return t.datepicker._selectMonthYear(s, this, "Y"), !1
            }};
            t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
        })
    }, _generateHTML: function (t) {
        var e, i, s, n, a, o, r, h, l, c, u, d, p, g, f, m, _, v, b, y, w, D, k, x, C, M, T, z, I, P, S, E, N, H, W, A, R, O, F, Y = new Date, L = this._daylightSavingAdjust(new Date(Y.getFullYear(), Y.getMonth(), Y.getDate())), j = this._get(t, "isRTL"), B = this._get(t, "showButtonPanel"), K = this._get(t, "hideIfNoPrevNext"), U = this._get(t, "navigationAsDateFormat"), q = this._getNumberOfMonths(t), X = this._get(t, "showCurrentAtPos"), Q = this._get(t, "stepMonths"), $ = 1 !== q[0] || 1 !== q[1], G = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)), V = this._getMinMaxDate(t, "min"), J = this._getMinMaxDate(t, "max"), Z = t.drawMonth - X, te = t.drawYear;
        if (0 > Z && (Z += 12, te--), J)for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - q[0] * q[1] + 1, J.getDate())), e = V && V > e ? V : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;)Z--, 0 > Z && (Z = 11, te--);
        for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = U ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - Q, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "e" : "w") + "'>" + i + "</span></a>" : K ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = U ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + Q, 1)), this._getFormatConfig(t)) : n, a = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "w" : "e") + "'>" + n + "</span></a>" : K ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "w" : "e") + "'>" + n + "</span></a>", o = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? G : L, o = U ? this.formatDate(o, r, this._getFormatConfig(t)) : o, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (j ? h : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") + (j ? "" : h) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), g = this._get(t, "monthNames"), f = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), _ = this._get(t, "showOtherMonths"), v = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", D = 0; q[0] > D; D++) {
            for (k = "", this.maxRows = 4, x = 0; q[1] > x; x++) {
                if (C = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), M = " ui-corner-all", T = "", $) {
                    if (T += "<div class='ui-datepicker-group", q[1] > 1)switch (x) {
                        case 0:
                            T += " ui-datepicker-group-first", M = " ui-corner-" + (j ? "right" : "left");
                            break;
                        case q[1] - 1:
                            T += " ui-datepicker-group-last", M = " ui-corner-" + (j ? "left" : "right");
                            break;
                        default:
                            T += " ui-datepicker-group-middle", M = ""
                    }
                    T += "'>"
                }
                for (T += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + M + "'>" + (/all|left/.test(M) && 0 === D ? j ? a : s : "") + (/all|right/.test(M) && 0 === D ? j ? s : a : "") + this._generateMonthYearHeader(t, Z, te, V, J, D > 0 || x > 0, g, f) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", z = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++)I = (w + c) % 7, z += "<th" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[I] + "'>" + p[I] + "</span></th>";
                for (T += z + "</tr></thead><tbody>", P = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, P)), S = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, E = Math.ceil((S + P) / 7), N = $ ? this.maxRows > E ? this.maxRows : E : E, this.maxRows = N, H = this._daylightSavingAdjust(new Date(te, Z, 1 - S)), W = 0; N > W; W++) {
                    for (T += "<tr>", A = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(H) + "</td>" : "", w = 0; 7 > w; w++)R = m ? m.apply(t.input ? t.input[0] : null, [H]) : [!0, ""], O = H.getMonth() !== Z, F = O && !v || !R[0] || V && V > H || J && H > J, A += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (O ? " ui-datepicker-other-month" : "") + (H.getTime() === C.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === H.getTime() && b.getTime() === C.getTime() ? " " + this._dayOverClass : "") + (F ? " " + this._unselectableClass + " ui-state-disabled" : "") + (O && !_ ? "" : " " + R[1] + (H.getTime() === G.getTime() ? " " + this._currentClass : "") + (H.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (O && !_ || !R[2] ? "" : " title='" + R[2].replace(/'/g, "&#39;") + "'") + (F ? "" : " data-handler='selectDay' data-event='click' data-month='" + H.getMonth() + "' data-year='" + H.getFullYear() + "'") + ">" + (O && !_ ? "&#xa0;" : F ? "<span class='ui-state-default'>" + H.getDate() + "</span>" : "<a class='ui-state-default" + (H.getTime() === L.getTime() ? " ui-state-highlight" : "") + (H.getTime() === G.getTime() ? " ui-state-active" : "") + (O ? " ui-priority-secondary" : "") + "' href='#'>" + H.getDate() + "</a>") + "</td>", H.setDate(H.getDate() + 1), H = this._daylightSavingAdjust(H);
                    T += A + "</tr>"
                }
                Z++, Z > 11 && (Z = 0, te++), T += "</tbody></table>" + ($ ? "</div>" + (q[0] > 0 && x === q[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), k += T
            }
            y += k
        }
        return y += l, t._keyEvent = !1, y
    }, _generateMonthYearHeader: function (t, e, i, s, n, a, o, r) {
        var h, l, c, u, d, p, g, f, m = this._get(t, "changeMonth"), _ = this._get(t, "changeYear"), v = this._get(t, "showMonthAfterYear"), b = "<div class='ui-datepicker-title'>", y = "";
        if (a || !m)y += "<span class='ui-datepicker-month'>" + o[e] + "</span>"; else {
            for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)(!h || c >= s.getMonth()) && (!l || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
            y += "</select>"
        }
        if (v || (b += y + (!a && m && _ ? "" : "&#xa0;")), !t.yearshtml)if (t.yearshtml = "", a || !_)b += "<span class='ui-datepicker-year'>" + i + "</span>"; else {
            for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function (t) {
                var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                return isNaN(e) ? d : e
            }, g = p(u[0]), f = Math.max(g, p(u[1] || "")), g = s ? Math.max(g, s.getFullYear()) : g, f = n ? Math.min(f, n.getFullYear()) : f, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; f >= g; g++)t.yearshtml += "<option value='" + g + "'" + (g === i ? " selected='selected'" : "") + ">" + g + "</option>";
            t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
        }
        return b += this._get(t, "yearSuffix"), v && (b += (!a && m && _ ? "" : "&#xa0;") + y), b += "</div>"
    }, _adjustInstDate: function (t, e, i) {
        var s = t.drawYear + ("Y" === i ? e : 0), n = t.drawMonth + ("M" === i ? e : 0), a = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0), o = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, a)));
        t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
    }, _restrictMinMax: function (t, e) {
        var i = this._getMinMaxDate(t, "min"), s = this._getMinMaxDate(t, "max"), n = i && i > e ? i : e;
        return s && n > s ? s : n
    }, _notifyChange: function (t) {
        var e = this._get(t, "onChangeMonthYear");
        e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
    }, _getNumberOfMonths: function (t) {
        var e = this._get(t, "numberOfMonths");
        return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
    }, _getMinMaxDate: function (t, e) {
        return this._determineDate(t, this._get(t, e + "Date"), null)
    }, _getDaysInMonth: function (t, e) {
        return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
    }, _getFirstDayOfMonth: function (t, e) {
        return new Date(t, e, 1).getDay()
    }, _canAdjustMonth: function (t, e, i, s) {
        var n = this._getNumberOfMonths(t), a = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
        return 0 > e && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(t, a)
    }, _isInRange: function (t, e) {
        var i, s, n = this._getMinMaxDate(t, "min"), a = this._getMinMaxDate(t, "max"), o = null, r = null, h = this._get(t, "yearRange");
        return h && (i = h.split(":"), s = (new Date).getFullYear(), o = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (o += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!a || e.getTime() <= a.getTime()) && (!o || e.getFullYear() >= o) && (!r || r >= e.getFullYear())
    }, _getFormatConfig: function (t) {
        var e = this._get(t, "shortYearCutoff");
        return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {shortYearCutoff: e, dayNamesShort: this._get(t, "dayNamesShort"), dayNames: this._get(t, "dayNames"), monthNamesShort: this._get(t, "monthNamesShort"), monthNames: this._get(t, "monthNames")}
    }, _formatDate: function (t, e, i, s) {
        e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
        var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
        return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
    }}), t.fn.datepicker = function (e) {
        if (!this.length)return this;
        t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return"string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function () {
            "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
        }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    }, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.10.4"
})(jQuery);
(function (t) {
    var e = {buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0}, i = {maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0};
    t.widget("ui.dialog", {version: "1.10.4", options: {appendTo: "body", autoOpen: !0, buttons: [], closeOnEscape: !0, closeText: "close", dialogClass: "", draggable: !0, hide: null, height: "auto", maxHeight: null, maxWidth: null, minHeight: 150, minWidth: 150, modal: !1, position: {my: "center", at: "center", of: window, collision: "fit", using: function (e) {
        var i = t(this).css(e).offset().top;
        0 > i && t(this).css("top", e.top - i)
    }}, resizable: !0, show: null, title: null, width: 300, beforeClose: null, close: null, drag: null, dragStart: null, dragStop: null, focus: null, open: null, resize: null, resizeStart: null, resizeStop: null}, _create: function () {
        this.originalCss = {display: this.element[0].style.display, width: this.element[0].style.width, minHeight: this.element[0].style.minHeight, maxHeight: this.element[0].style.maxHeight, height: this.element[0].style.height}, this.originalPosition = {parent: this.element.parent(), index: this.element.parent().children().index(this.element)}, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1
    }, _init: function () {
        this.options.autoOpen && this.open()
    }, _appendTo: function () {
        var e = this.options.appendTo;
        return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
    }, _destroy: function () {
        var t, e = this.originalPosition;
        this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
    }, widget: function () {
        return this.uiDialog
    }, disable: t.noop, enable: t.noop, close: function (e) {
        var i, n = this;
        if (this._isOpen && this._trigger("beforeClose", e) !== !1) {
            if (this._isOpen = !1, this._destroyOverlay(), !this.opener.filter(":focusable").focus().length)try {
                i = this.document[0].activeElement, i && "body" !== i.nodeName.toLowerCase() && t(i).blur()
            } catch (s) {
            }
            this._hide(this.uiDialog, this.options.hide, function () {
                n._trigger("close", e)
            })
        }
    }, isOpen: function () {
        return this._isOpen
    }, moveToTop: function () {
        this._moveToTop()
    }, _moveToTop: function (t, e) {
        var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
        return i && !e && this._trigger("focus", t), i
    }, open: function () {
        var e = this;
        return this._isOpen ? (this._moveToTop() && this._focusTabbable(), undefined) : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function () {
            e._focusTabbable(), e._trigger("focus")
        }), this._trigger("open"), undefined)
    }, _focusTabbable: function () {
        var t = this.element.find("[autofocus]");
        t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).focus()
    }, _keepFocus: function (e) {
        function i() {
            var e = this.document[0].activeElement, i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
            i || this._focusTabbable()
        }

        e.preventDefault(), i.call(this), this._delay(i)
    }, _createWrapper: function () {
        this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({tabIndex: -1, role: "dialog"}).appendTo(this._appendTo()), this._on(this.uiDialog, {keydown: function (e) {
            if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE)return e.preventDefault(), this.close(e), undefined;
            if (e.keyCode === t.ui.keyCode.TAB) {
                var i = this.uiDialog.find(":tabbable"), n = i.filter(":first"), s = i.filter(":last");
                e.target !== s[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== n[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (s.focus(1), e.preventDefault()) : (n.focus(1), e.preventDefault())
            }
        }, mousedown: function (t) {
            this._moveToTop(t) && this._focusTabbable()
        }}), this.element.find("[aria-describedby]").length || this.uiDialog.attr({"aria-describedby": this.element.uniqueId().attr("id")})
    }, _createTitlebar: function () {
        var e;
        this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {mousedown: function (e) {
            t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
        }}), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({label: this.options.closeText, icons: {primary: "ui-icon-closethick"}, text: !1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {click: function (t) {
            t.preventDefault(), this.close(t)
        }}), e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e), this.uiDialog.attr({"aria-labelledby": e.attr("id")})
    }, _title: function (t) {
        this.options.title || t.html("&#160;"), t.text(this.options.title)
    }, _createButtonPane: function () {
        this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
    }, _createButtons: function () {
        var e = this, i = this.options.buttons;
        return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), undefined) : (t.each(i, function (i, n) {
            var s, o;
            n = t.isFunction(n) ? {click: n, text: i} : n, n = t.extend({type: "button"}, n), s = n.click, n.click = function () {
                s.apply(e.element[0], arguments)
            }, o = {icons: n.icons, text: n.showText}, delete n.icons, delete n.showText, t("<button></button>", n).button(o).appendTo(e.uiButtonSet)
        }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), undefined)
    }, _makeDraggable: function () {
        function e(t) {
            return{position: t.position, offset: t.offset}
        }

        var i = this, n = this.options;
        this.uiDialog.draggable({cancel: ".ui-dialog-content, .ui-dialog-titlebar-close", handle: ".ui-dialog-titlebar", containment: "document", start: function (n, s) {
            t(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", n, e(s))
        }, drag: function (t, n) {
            i._trigger("drag", t, e(n))
        }, stop: function (s, o) {
            n.position = [o.position.left - i.document.scrollLeft(), o.position.top - i.document.scrollTop()], t(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", s, e(o))
        }})
    }, _makeResizable: function () {
        function e(t) {
            return{originalPosition: t.originalPosition, originalSize: t.originalSize, position: t.position, size: t.size}
        }

        var i = this, n = this.options, s = n.resizable, o = this.uiDialog.css("position"), a = "string" == typeof s ? s : "n,e,s,w,se,sw,ne,nw";
        this.uiDialog.resizable({cancel: ".ui-dialog-content", containment: "document", alsoResize: this.element, maxWidth: n.maxWidth, maxHeight: n.maxHeight, minWidth: n.minWidth, minHeight: this._minHeight(), handles: a, start: function (n, s) {
            t(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", n, e(s))
        }, resize: function (t, n) {
            i._trigger("resize", t, e(n))
        }, stop: function (s, o) {
            n.height = t(this).height(), n.width = t(this).width(), t(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", s, e(o))
        }}).css("position", o)
    }, _minHeight: function () {
        var t = this.options;
        return"auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
    }, _position: function () {
        var t = this.uiDialog.is(":visible");
        t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
    }, _setOptions: function (n) {
        var s = this, o = !1, a = {};
        t.each(n, function (t, n) {
            s._setOption(t, n), t in e && (o = !0), t in i && (a[t] = n)
        }), o && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", a)
    }, _setOption: function (t, e) {
        var i, n, s = this.uiDialog;
        "dialogClass" === t && s.removeClass(this.options.dialogClass).addClass(e), "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({label: "" + e}), "draggable" === t && (i = s.is(":data(ui-draggable)"), i && !e && s.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (n = s.is(":data(ui-resizable)"), n && !e && s.resizable("destroy"), n && "string" == typeof e && s.resizable("option", "handles", e), n || e === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
    }, _size: function () {
        var t, e, i, n = this.options;
        this.element.show().css({width: "auto", minHeight: 0, maxHeight: "none", height: 0}), n.minWidth > n.width && (n.width = n.minWidth), t = this.uiDialog.css({height: "auto", width: n.width}).outerHeight(), e = Math.max(0, n.minHeight - t), i = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none", "auto" === n.height ? this.element.css({minHeight: e, maxHeight: i, height: "auto"}) : this.element.height(Math.max(0, n.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
    }, _blockFrames: function () {
        this.iframeBlocks = this.document.find("iframe").map(function () {
            var e = t(this);
            return t("<div>").css({position: "absolute", width: e.outerWidth(), height: e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]
        })
    }, _unblockFrames: function () {
        this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
    }, _allowInteraction: function (e) {
        return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length
    }, _createOverlay: function () {
        if (this.options.modal) {
            var e = this, i = this.widgetFullName;
            t.ui.dialog.overlayInstances || this._delay(function () {
                t.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function (n) {
                    e._allowInteraction(n) || (n.preventDefault(), t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())
                })
            }), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {mousedown: "_keepFocus"}), t.ui.dialog.overlayInstances++
        }
    }, _destroyOverlay: function () {
        this.options.modal && this.overlay && (t.ui.dialog.overlayInstances--, t.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
    }}), t.ui.dialog.overlayInstances = 0, t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, {_position: function () {
        var e, i = this.options.position, n = [], s = [0, 0];
        i ? (("string" == typeof i || "object" == typeof i && "0"in i) && (n = i.split ? i.split(" ") : [i[0], i[1]], 1 === n.length && (n[1] = n[0]), t.each(["left", "top"], function (t, e) {
            +n[t] === n[t] && (s[t] = n[t], n[t] = e)
        }), i = {my: n[0] + (0 > s[0] ? s[0] : "+" + s[0]) + " " + n[1] + (0 > s[1] ? s[1] : "+" + s[1]), at: n.join(" ")}), i = t.extend({}, t.ui.dialog.prototype.options.position, i)) : i = t.ui.dialog.prototype.options.position, e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.position(i), e || this.uiDialog.hide()
    }})
})(jQuery);
(function (t) {
    t.widget("ui.menu", {version: "1.10.4", defaultElement: "<ul>", delay: 300, options: {icons: {submenu: "ui-icon-carat-1-e"}, menus: "ul", position: {my: "left top", at: "right top"}, role: "menu", blur: null, focus: null, select: null}, _create: function () {
        this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({role: this.options.role, tabIndex: 0}).bind("click" + this.eventNamespace, t.proxy(function (t) {
            this.options.disabled && t.preventDefault()
        }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({"mousedown .ui-menu-item > a": function (t) {
            t.preventDefault()
        }, "click .ui-state-disabled > a": function (t) {
            t.preventDefault()
        }, "click .ui-menu-item:has(a)": function (e) {
            var i = t(e.target).closest(".ui-menu-item");
            !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && t(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
        }, "mouseenter .ui-menu-item": function (e) {
            var i = t(e.currentTarget);
            i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
        }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function (t, e) {
            var i = this.active || this.element.children(".ui-menu-item").eq(0);
            e || this.focus(t, i)
        }, blur: function (e) {
            this._delay(function () {
                t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
            })
        }, keydown: "_keydown"}), this.refresh(), this._on(this.document, {click: function (e) {
            t(e.target).closest(".ui-menu").length || this.collapseAll(e), this.mouseHandled = !1
        }})
    }, _destroy: function () {
        this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
            var e = t(this);
            e.data("ui-menu-submenu-carat") && e.remove()
        }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
    }, _keydown: function (e) {
        function i(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }

        var s, n, o, a, r, h = !0;
        switch (e.keyCode) {
            case t.ui.keyCode.PAGE_UP:
                this.previousPage(e);
                break;
            case t.ui.keyCode.PAGE_DOWN:
                this.nextPage(e);
                break;
            case t.ui.keyCode.HOME:
                this._move("first", "first", e);
                break;
            case t.ui.keyCode.END:
                this._move("last", "last", e);
                break;
            case t.ui.keyCode.UP:
                this.previous(e);
                break;
            case t.ui.keyCode.DOWN:
                this.next(e);
                break;
            case t.ui.keyCode.LEFT:
                this.collapse(e);
                break;
            case t.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                break;
            case t.ui.keyCode.ENTER:
            case t.ui.keyCode.SPACE:
                this._activate(e);
                break;
            case t.ui.keyCode.ESCAPE:
                this.collapse(e);
                break;
            default:
                h = !1, n = this.previousFilter || "", o = String.fromCharCode(e.keyCode), a = !1, clearTimeout(this.filterTimer), o === n ? a = !0 : o = n + o, r = RegExp("^" + i(o), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function () {
                    return r.test(t(this).children("a").text())
                }), s = a && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s, s.length || (o = String.fromCharCode(e.keyCode), r = RegExp("^" + i(o), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function () {
                    return r.test(t(this).children("a").text())
                })), s.length ? (this.focus(e, s), s.length > 1 ? (this.previousFilter = o, this.filterTimer = this._delay(function () {
                    delete this.previousFilter
                }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
        }
        h && e.preventDefault()
    }, _activate: function (t) {
        this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
    }, refresh: function () {
        var e, i = this.options.icons.submenu, s = this.element.find(this.options.menus);
        this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role: this.options.role, "aria-hidden": "true", "aria-expanded": "false"}).each(function () {
            var e = t(this), s = e.prev("a"), n = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
            s.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", s.attr("id"))
        }), e = s.add(this.element), e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex: -1, role: this._itemRole()}), e.children(":not(.ui-menu-item)").each(function () {
            var e = t(this);
            /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
        }), e.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
    }, _itemRole: function () {
        return{menu: "menuitem", listbox: "option"}[this.options.role]
    }, _setOption: function (t, e) {
        "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), this._super(t, e)
    }, focus: function (t, e) {
        var i, s;
        this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function () {
            this._close()
        }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {item: e})
    }, _scrollIntoView: function (e) {
        var i, s, n, o, a, r;
        this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.height(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r))
    }, blur: function (t, e) {
        e || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {item: this.active}))
    }, _startOpening: function (t) {
        clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function () {
            this._close(), this._open(t)
        }, this.delay))
    }, _open: function (e) {
        var i = t.extend({of: this.active}, this.options.position);
        clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
    }, collapseAll: function (e, i) {
        clearTimeout(this.timer), this.timer = this._delay(function () {
            var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
            s.length || (s = this.element), this._close(s), this.blur(e), this.activeMenu = s
        }, this.delay)
    }, _close: function (t) {
        t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
    }, collapse: function (t) {
        var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
        e && e.length && (this._close(), this.focus(t, e))
    }, expand: function (t) {
        var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
        e && e.length && (this._open(e.parent()), this._delay(function () {
            this.focus(t, e)
        }))
    }, next: function (t) {
        this._move("next", "first", t)
    }, previous: function (t) {
        this._move("prev", "last", t)
    }, isFirstItem: function () {
        return this.active && !this.active.prevAll(".ui-menu-item").length
    }, isLastItem: function () {
        return this.active && !this.active.nextAll(".ui-menu-item").length
    }, _move: function (t, e, i) {
        var s;
        this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.children(".ui-menu-item")[e]()), this.focus(i, s)
    }, nextPage: function (e) {
        var i, s, n;
        return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
            return i = t(this), 0 > i.offset().top - s - n
        }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(e), undefined)
    }, previousPage: function (e) {
        var i, s, n;
        return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
            return i = t(this), i.offset().top - s + n > 0
        }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(e), undefined)
    }, _hasScroll: function () {
        return this.element.outerHeight() < this.element.prop("scrollHeight")
    }, select: function (e) {
        this.active = this.active || t(e.target).closest(".ui-menu-item");
        var i = {item: this.active};
        this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
    }})
})(jQuery);
(function (t, e) {
    t.widget("ui.progressbar", {version: "1.10.4", options: {max: 100, value: 0, change: null, complete: null}, min: 0, _create: function () {
        this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role: "progressbar", "aria-valuemin": this.min}), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
    }, _destroy: function () {
        this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
    }, value: function (t) {
        return t === e ? this.options.value : (this.options.value = this._constrainedValue(t), this._refreshValue(), e)
    }, _constrainedValue: function (t) {
        return t === e && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
    }, _setOptions: function (t) {
        var e = t.value;
        delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
    }, _setOption: function (t, e) {
        "max" === t && (e = Math.max(this.min, e)), this._super(t, e)
    }, _percentage: function () {
        return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
    }, _refreshValue: function () {
        var e = this.options.value, i = this._percentage();
        this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({"aria-valuemax": this.options.max, "aria-valuenow": e}), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
    }})
})(jQuery);
(function (t) {
    var e = 5;
    t.widget("ui.slider", t.ui.mouse, {version: "1.10.4", widgetEventPrefix: "slide", options: {animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null}, _create: function () {
        this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
    }, _refresh: function () {
        this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
    }, _createHandles: function () {
        var e, i, s = this.options, n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), a = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", o = [];
        for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++)o.push(a);
        this.handles = n.add(t(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (e) {
            t(this).data("ui-slider-handle-index", e)
        })
    }, _createRange: function () {
        var e = this.options, i = "";
        e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left: "", bottom: ""}) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : (this.range && this.range.remove(), this.range = null)
    }, _setupEvents: function () {
        var t = this.handles.add(this.range).filter("a");
        this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t)
    }, _destroy: function () {
        this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
    }, _mouseCapture: function (e) {
        var i, s, n, a, o, r, l, h, u = this, c = this.options;
        return c.disabled ? !1 : (this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()}, this.elementOffset = this.element.offset(), i = {x: e.pageX, y: e.pageY}, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) {
            var i = Math.abs(s - u.values(e));
            (n > i || n === i && (e === u._lastChangedValue || u.values(e) === c.min)) && (n = i, a = t(this), o = e)
        }), r = this._start(e, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), l = a.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? {left: 0, top: 0} : {left: e.pageX - l.left - a.width() / 2, top: e.pageY - l.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0)}, this.handles.hasClass("ui-state-hover") || this._slide(e, o, s), this._animateOff = !0, !0))
    }, _mouseStart: function () {
        return!0
    }, _mouseDrag: function (t) {
        var e = {x: t.pageX, y: t.pageY}, i = this._normValueFromMouse(e);
        return this._slide(t, this._handleIndex, i), !1
    }, _mouseStop: function (t) {
        return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
    }, _detectOrientation: function () {
        this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
    }, _normValueFromMouse: function (t) {
        var e, i, s, n, a;
        return"horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a)
    }, _start: function (t, e) {
        var i = {handle: this.handles[e], value: this.value()};
        return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
    }, _slide: function (t, e, i) {
        var s, n, a;
        this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > s || 1 === e && s > i) && (i = s), i !== this.values(e) && (n = this.values(), n[e] = i, a = this._trigger("slide", t, {handle: this.handles[e], value: i, values: n}), s = this.values(e ? 0 : 1), a !== !1 && this.values(e, i))) : i !== this.value() && (a = this._trigger("slide", t, {handle: this.handles[e], value: i}), a !== !1 && this.value(i))
    }, _stop: function (t, e) {
        var i = {handle: this.handles[e], value: this.value()};
        this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
    }, _change: function (t, e) {
        if (!this._keySliding && !this._mouseSliding) {
            var i = {handle: this.handles[e], value: this.value()};
            this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
        }
    }, value: function (t) {
        return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), undefined) : this._value()
    }, values: function (e, i) {
        var s, n, a;
        if (arguments.length > 1)return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), undefined;
        if (!arguments.length)return this._values();
        if (!t.isArray(arguments[0]))return this.options.values && this.options.values.length ? this._values(e) : this.value();
        for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1)s[a] = this._trimAlignValue(n[a]), this._change(null, a);
        this._refreshValue()
    }, _setOption: function (e, i) {
        var s, n = 0;
        switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
            case"orientation":
                this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                break;
            case"value":
                this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                break;
            case"values":
                for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1)this._change(null, s);
                this._animateOff = !1;
                break;
            case"min":
            case"max":
                this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                break;
            case"range":
                this._animateOff = !0, this._refresh(), this._animateOff = !1
        }
    }, _value: function () {
        var t = this.options.value;
        return t = this._trimAlignValue(t)
    }, _values: function (t) {
        var e, i, s;
        if (arguments.length)return e = this.options.values[t], e = this._trimAlignValue(e);
        if (this.options.values && this.options.values.length) {
            for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)i[s] = this._trimAlignValue(i[s]);
            return i
        }
        return[]
    }, _trimAlignValue: function (t) {
        if (this._valueMin() >= t)return this._valueMin();
        if (t >= this._valueMax())return this._valueMax();
        var e = this.options.step > 0 ? this.options.step : 1, i = (t - this._valueMin()) % e, s = t - i;
        return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
    }, _valueMin: function () {
        return this.options.min
    }, _valueMax: function () {
        return this.options.max
    }, _refreshValue: function () {
        var e, i, s, n, a, o = this.options.range, r = this.options, l = this, h = this._animateOff ? !1 : r.animate, u = {};
        this.options.values && this.options.values.length ? this.handles.each(function (s) {
            i = 100 * ((l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin())), u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](u, r.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({left: i + "%"}, r.animate), 1 === s && l.range[h ? "animate" : "css"]({width: i - e + "%"}, {queue: !1, duration: r.animate})) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({bottom: i + "%"}, r.animate), 1 === s && l.range[h ? "animate" : "css"]({height: i - e + "%"}, {queue: !1, duration: r.animate}))), e = i
        }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({width: i + "%"}, r.animate), "max" === o && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({width: 100 - i + "%"}, {queue: !1, duration: r.animate}), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({height: i + "%"}, r.animate), "max" === o && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({height: 100 - i + "%"}, {queue: !1, duration: r.animate}))
    }, _handleEvents: {keydown: function (i) {
        var s, n, a, o, r = t(i.target).data("ui-slider-handle-index");
        switch (i.keyCode) {
            case t.ui.keyCode.HOME:
            case t.ui.keyCode.END:
            case t.ui.keyCode.PAGE_UP:
            case t.ui.keyCode.PAGE_DOWN:
            case t.ui.keyCode.UP:
            case t.ui.keyCode.RIGHT:
            case t.ui.keyCode.DOWN:
            case t.ui.keyCode.LEFT:
                if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, t(i.target).addClass("ui-state-active"), s = this._start(i, r), s === !1))return
        }
        switch (o = this.options.step, n = a = this.options.values && this.options.values.length ? this.values(r) : this.value(), i.keyCode) {
            case t.ui.keyCode.HOME:
                a = this._valueMin();
                break;
            case t.ui.keyCode.END:
                a = this._valueMax();
                break;
            case t.ui.keyCode.PAGE_UP:
                a = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / e);
                break;
            case t.ui.keyCode.PAGE_DOWN:
                a = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / e);
                break;
            case t.ui.keyCode.UP:
            case t.ui.keyCode.RIGHT:
                if (n === this._valueMax())return;
                a = this._trimAlignValue(n + o);
                break;
            case t.ui.keyCode.DOWN:
            case t.ui.keyCode.LEFT:
                if (n === this._valueMin())return;
                a = this._trimAlignValue(n - o)
        }
        this._slide(i, r, a)
    }, click: function (t) {
        t.preventDefault()
    }, keyup: function (e) {
        var i = t(e.target).data("ui-slider-handle-index");
        this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
    }}})
})(jQuery);
(function (t) {
    function e(t) {
        return function () {
            var e = this.element.val();
            t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
        }
    }

    t.widget("ui.spinner", {version: "1.10.4", defaultElement: "<input>", widgetEventPrefix: "spin", options: {culture: null, icons: {down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n"}, incremental: !0, max: null, min: null, numberFormat: null, page: 10, step: 1, change: null, spin: null, start: null, stop: null}, _create: function () {
        this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {beforeunload: function () {
            this.element.removeAttr("autocomplete")
        }})
    }, _getCreateOptions: function () {
        var e = {}, i = this.element;
        return t.each(["min", "max", "step"], function (t, s) {
            var n = i.attr(s);
            void 0 !== n && n.length && (e[s] = n)
        }), e
    }, _events: {keydown: function (t) {
        this._start(t) && this._keydown(t) && t.preventDefault()
    }, keyup: "_stop", focus: function () {
        this.previous = this.element.val()
    }, blur: function (t) {
        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t), void 0)
    }, mousewheel: function (t, e) {
        if (e) {
            if (!this.spinning && !this._start(t))return!1;
            this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
                this.spinning && this._stop(t)
            }, 100), t.preventDefault()
        }
    }, "mousedown .ui-spinner-button": function (e) {
        function i() {
            var t = this.element[0] === this.document[0].activeElement;
            t || (this.element.focus(), this.previous = s, this._delay(function () {
                this.previous = s
            }))
        }

        var s;
        s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function () {
            delete this.cancelBlur, i.call(this)
        }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
    }, "mouseup .ui-spinner-button": "_stop", "mouseenter .ui-spinner-button": function (e) {
        return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : (this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e), void 0) : void 0
    }, "mouseleave .ui-spinner-button": "_stop"}, _draw: function () {
        var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
        this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable()
    }, _keydown: function (e) {
        var i = this.options, s = t.ui.keyCode;
        switch (e.keyCode) {
            case s.UP:
                return this._repeat(null, 1, e), !0;
            case s.DOWN:
                return this._repeat(null, -1, e), !0;
            case s.PAGE_UP:
                return this._repeat(null, i.page, e), !0;
            case s.PAGE_DOWN:
                return this._repeat(null, -i.page, e), !0
        }
        return!1
    }, _uiSpinnerHtml: function () {
        return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
    }, _buttonHtml: function () {
        return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>"
    }, _start: function (t) {
        return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
    }, _repeat: function (t, e, i) {
        t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
            this._repeat(40, e, i)
        }, t), this._spin(e * this.options.step, i)
    }, _spin: function (t, e) {
        var i = this.value() || 0;
        this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {value: i}) === !1 || (this._value(i), this.counter++)
    }, _increment: function (e) {
        var i = this.options.incremental;
        return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
    }, _precision: function () {
        var t = this._precisionOf(this.options.step);
        return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
    }, _precisionOf: function (t) {
        var e = "" + t, i = e.indexOf(".");
        return-1 === i ? 0 : e.length - i - 1
    }, _adjustValue: function (t) {
        var e, i, s = this.options;
        return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && s.min > t ? s.min : t
    }, _stop: function (t) {
        this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
    }, _setOption: function (t, e) {
        if ("culture" === t || "numberFormat" === t) {
            var i = this._parse(this.element.val());
            return this.options[t] = e, this.element.val(this._format(i)), void 0
        }
        ("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (e ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
    }, _setOptions: e(function (t) {
        this._super(t), this._value(this.element.val())
    }), _parse: function (t) {
        return"string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
    }, _format: function (t) {
        return"" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
    }, _refresh: function () {
        this.element.attr({"aria-valuemin": this.options.min, "aria-valuemax": this.options.max, "aria-valuenow": this._parse(this.element.val())})
    }, _value: function (t, e) {
        var i;
        "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
    }, _destroy: function () {
        this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
    }, stepUp: e(function (t) {
        this._stepUp(t)
    }), _stepUp: function (t) {
        this._start() && (this._spin((t || 1) * this.options.step), this._stop())
    }, stepDown: e(function (t) {
        this._stepDown(t)
    }), _stepDown: function (t) {
        this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
    }, pageUp: e(function (t) {
        this._stepUp((t || 1) * this.options.page)
    }), pageDown: e(function (t) {
        this._stepDown((t || 1) * this.options.page)
    }), value: function (t) {
        return arguments.length ? (e(this._value).call(this, t), void 0) : this._parse(this.element.val())
    }, widget: function () {
        return this.uiSpinner
    }})
})(jQuery);
(function (t, e) {
    function i() {
        return++n
    }

    function s(t) {
        return t = t.cloneNode(!1), t.hash.length > 1 && decodeURIComponent(t.href.replace(a, "")) === decodeURIComponent(location.href.replace(a, ""))
    }

    var n = 0, a = /#.*$/;
    t.widget("ui.tabs", {version: "1.10.4", delay: 300, options: {active: null, collapsible: !1, event: "click", heightStyle: "content", hide: null, show: null, activate: null, beforeActivate: null, beforeLoad: null, load: null}, _create: function () {
        var e = this, i = this.options;
        this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace,function (e) {
            t(this).is(".ui-state-disabled") && e.preventDefault()
        }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
            t(this).closest("li").is(".ui-state-disabled") && this.blur()
        }), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function (t) {
            return e.tabs.index(t)
        }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
    }, _initialActive: function () {
        var i = this.options.active, s = this.options.collapsible, n = location.hash.substring(1);
        return null === i && (n && this.tabs.each(function (s, a) {
            return t(a).attr("aria-controls") === n ? (i = s, !1) : e
        }), null === i && (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === i || -1 === i) && (i = this.tabs.length ? 0 : !1)), i !== !1 && (i = this.tabs.index(this.tabs.eq(i)), -1 === i && (i = s ? !1 : 0)), !s && i === !1 && this.anchors.length && (i = 0), i
    }, _getCreateEventData: function () {
        return{tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : t()}
    }, _tabKeydown: function (i) {
        var s = t(this.document[0].activeElement).closest("li"), n = this.tabs.index(s), a = !0;
        if (!this._handlePageNav(i)) {
            switch (i.keyCode) {
                case t.ui.keyCode.RIGHT:
                case t.ui.keyCode.DOWN:
                    n++;
                    break;
                case t.ui.keyCode.UP:
                case t.ui.keyCode.LEFT:
                    a = !1, n--;
                    break;
                case t.ui.keyCode.END:
                    n = this.anchors.length - 1;
                    break;
                case t.ui.keyCode.HOME:
                    n = 0;
                    break;
                case t.ui.keyCode.SPACE:
                    return i.preventDefault(), clearTimeout(this.activating), this._activate(n), e;
                case t.ui.keyCode.ENTER:
                    return i.preventDefault(), clearTimeout(this.activating), this._activate(n === this.options.active ? !1 : n), e;
                default:
                    return
            }
            i.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, a), i.ctrlKey || (s.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function () {
                this.option("active", n)
            }, this.delay))
        }
    }, _panelKeydown: function (e) {
        this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
    }, _handlePageNav: function (i) {
        return i.altKey && i.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : i.altKey && i.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : e
    }, _findNextTab: function (e, i) {
        function s() {
            return e > n && (e = 0), 0 > e && (e = n), e
        }

        for (var n = this.tabs.length - 1; -1 !== t.inArray(s(), this.options.disabled);)e = i ? e + 1 : e - 1;
        return e
    }, _focusNextTab: function (t, e) {
        return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
    }, _setOption: function (t, i) {
        return"active" === t ? (this._activate(i), e) : "disabled" === t ? (this._setupDisabled(i), e) : (this._super(t, i), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", i), i || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(i), "heightStyle" === t && this._setupHeightStyle(i), e)
    }, _tabId: function (t) {
        return t.attr("aria-controls") || "ui-tabs-" + i()
    }, _sanitizeSelector: function (t) {
        return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
    }, refresh: function () {
        var e = this.options, i = this.tablist.children(":has(a[href])");
        e.disabled = t.map(i.filter(".ui-state-disabled"), function (t) {
            return i.index(t)
        }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
    }, _refresh: function () {
        this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({"aria-selected": "false", tabIndex: -1}), this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded": "false", "aria-hidden": "true"}), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected": "true", tabIndex: 0}), this._getPanelForTab(this.active).show().attr({"aria-expanded": "true", "aria-hidden": "false"})) : this.tabs.eq(0).attr("tabIndex", 0)
    }, _processTabs: function () {
        var e = this;
        this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role: "tab", tabIndex: -1}), this.anchors = this.tabs.map(function () {
            return t("a", this)[0]
        }).addClass("ui-tabs-anchor").attr({role: "presentation", tabIndex: -1}), this.panels = t(), this.anchors.each(function (i, n) {
            var a, o, r, h = t(n).uniqueId().attr("id"), l = t(n).closest("li"), c = l.attr("aria-controls");
            s(n) ? (a = n.hash, o = e.element.find(e._sanitizeSelector(a))) : (r = e._tabId(l), a = "#" + r, o = e.element.find(a), o.length || (o = e._createPanel(r), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), c && l.data("ui-tabs-aria-controls", c), l.attr({"aria-controls": a.substring(1), "aria-labelledby": h}), o.attr("aria-labelledby", h)
        }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
    }, _getList: function () {
        return this.tablist || this.element.find("ol,ul").eq(0)
    }, _createPanel: function (e) {
        return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
    }, _setupDisabled: function (e) {
        t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
        for (var i, s = 0; i = this.tabs[s]; s++)e === !0 || -1 !== t.inArray(s, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
        this.options.disabled = e
    }, _setupEvents: function (e) {
        var i = {click: function (t) {
            t.preventDefault()
        }};
        e && t.each(e.split(" "), function (t, e) {
            i[e] = "_eventHandler"
        }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {keydown: "_tabKeydown"}), this._on(this.panels, {keydown: "_panelKeydown"}), this._focusable(this.tabs), this._hoverable(this.tabs)
    }, _setupHeightStyle: function (e) {
        var i, s = this.element.parent();
        "fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
            var e = t(this), s = e.css("position");
            "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
        }), this.element.children().not(this.panels).each(function () {
            i -= t(this).outerHeight(!0)
        }), this.panels.each(function () {
            t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
        }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function () {
            i = Math.max(i, t(this).height("").height())
        }).height(i))
    }, _eventHandler: function (e) {
        var i = this.options, s = this.active, n = t(e.currentTarget), a = n.closest("li"), o = a[0] === s[0], r = o && i.collapsible, h = r ? t() : this._getPanelForTab(a), l = s.length ? this._getPanelForTab(s) : t(), c = {oldTab: s, oldPanel: l, newTab: r ? t() : a, newPanel: h};
        e.preventDefault(), a.hasClass("ui-state-disabled") || a.hasClass("ui-tabs-loading") || this.running || o && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = r ? !1 : this.tabs.index(a), this.active = o ? t() : a, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(a), e), this._toggle(e, c))
    }, _toggle: function (e, i) {
        function s() {
            a.running = !1, a._trigger("activate", e, i)
        }

        function n() {
            i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), o.length && a.options.show ? a._show(o, a.options.show, s) : (o.show(), s())
        }

        var a = this, o = i.newPanel, r = i.oldPanel;
        this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function () {
            i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n()
        }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), r.attr({"aria-expanded": "false", "aria-hidden": "true"}), i.oldTab.attr("aria-selected", "false"), o.length && r.length ? i.oldTab.attr("tabIndex", -1) : o.length && this.tabs.filter(function () {
            return 0 === t(this).attr("tabIndex")
        }).attr("tabIndex", -1), o.attr({"aria-expanded": "true", "aria-hidden": "false"}), i.newTab.attr({"aria-selected": "true", tabIndex: 0})
    }, _activate: function (e) {
        var i, s = this._findActive(e);
        s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({target: i, currentTarget: i, preventDefault: t.noop}))
    }, _findActive: function (e) {
        return e === !1 ? t() : this.tabs.eq(e)
    }, _getIndex: function (t) {
        return"string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
    }, _destroy: function () {
        this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function () {
            t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
        }), this.tabs.each(function () {
            var e = t(this), i = e.data("ui-tabs-aria-controls");
            i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
        }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
    }, enable: function (i) {
        var s = this.options.disabled;
        s !== !1 && (i === e ? s = !1 : (i = this._getIndex(i), s = t.isArray(s) ? t.map(s, function (t) {
            return t !== i ? t : null
        }) : t.map(this.tabs, function (t, e) {
            return e !== i ? e : null
        })), this._setupDisabled(s))
    }, disable: function (i) {
        var s = this.options.disabled;
        if (s !== !0) {
            if (i === e)s = !0; else {
                if (i = this._getIndex(i), -1 !== t.inArray(i, s))return;
                s = t.isArray(s) ? t.merge([i], s).sort() : [i]
            }
            this._setupDisabled(s)
        }
    }, load: function (e, i) {
        e = this._getIndex(e);
        var n = this, a = this.tabs.eq(e), o = a.find(".ui-tabs-anchor"), r = this._getPanelForTab(a), h = {tab: a, panel: r};
        s(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, h)), this.xhr && "canceled" !== this.xhr.statusText && (a.addClass("ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.success(function (t) {
            setTimeout(function () {
                r.html(t), n._trigger("load", i, h)
            }, 1)
        }).complete(function (t, e) {
            setTimeout(function () {
                "abort" === e && n.panels.stop(!1, !0), a.removeClass("ui-tabs-loading"), r.removeAttr("aria-busy"), t === n.xhr && delete n.xhr
            }, 1)
        })))
    }, _ajaxSettings: function (e, i, s) {
        var n = this;
        return{url: e.attr("href"), beforeSend: function (e, a) {
            return n._trigger("beforeLoad", i, t.extend({jqXHR: e, ajaxSettings: a}, s))
        }}
    }, _getPanelForTab: function (e) {
        var i = t(e).attr("aria-controls");
        return this.element.find(this._sanitizeSelector("#" + i))
    }})
})(jQuery);
(function (t) {
    function e(e, i) {
        var s = (e.attr("aria-describedby") || "").split(/\s+/);
        s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")))
    }

    function i(e) {
        var i = e.data("ui-tooltip-id"), s = (e.attr("aria-describedby") || "").split(/\s+/), n = t.inArray(i, s);
        -1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby")
    }

    var s = 0;
    t.widget("ui.tooltip", {version: "1.10.4", options: {content: function () {
        var e = t(this).attr("title") || "";
        return t("<a>").text(e).html()
    }, hide: !0, items: "[title]:not([disabled])", position: {my: "left top+15", at: "left bottom", collision: "flipfit flip"}, show: !0, tooltipClass: null, track: !1, close: null, open: null}, _create: function () {
        this._on({mouseover: "open", focusin: "open"}), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
    }, _setOption: function (e, i) {
        var s = this;
        return"disabled" === e ? (this[i ? "_disable" : "_enable"](), this.options[e] = i, void 0) : (this._super(e, i), "content" === e && t.each(this.tooltips, function (t, e) {
            s._updateContent(e)
        }), void 0)
    }, _disable: function () {
        var e = this;
        t.each(this.tooltips, function (i, s) {
            var n = t.Event("blur");
            n.target = n.currentTarget = s[0], e.close(n, !0)
        }), this.element.find(this.options.items).addBack().each(function () {
            var e = t(this);
            e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).attr("title", "")
        })
    }, _enable: function () {
        this.element.find(this.options.items).addBack().each(function () {
            var e = t(this);
            e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
        })
    }, open: function (e) {
        var i = this, s = t(e ? e.target : this.element).closest(this.options.items);
        s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function () {
            var e, s = t(this);
            s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {element: this, title: s.attr("title")}, s.attr("title", ""))
        }), this._updateContent(s, e))
    }, _updateContent: function (t, e) {
        var i, s = this.options.content, n = this, o = e ? e.type : null;
        return"string" == typeof s ? this._open(e, t, s) : (i = s.call(t[0], function (i) {
            t.data("ui-tooltip-open") && n._delay(function () {
                e && (e.type = o), this._open(e, t, i)
            })
        }), i && this._open(e, t, i), void 0)
    }, _open: function (i, s, n) {
        function o(t) {
            l.of = t, a.is(":hidden") || a.position(l)
        }

        var a, r, h, l = t.extend({}, this.options.position);
        if (n) {
            if (a = this._find(s), a.length)return a.find(".ui-tooltip-content").html(n), void 0;
            s.is("[title]") && (i && "mouseover" === i.type ? s.attr("title", "") : s.removeAttr("title")), a = this._tooltip(s), e(s, a.attr("id")), a.find(".ui-tooltip-content").html(n), this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {mousemove: o}), o(i)) : a.position(t.extend({of: s}, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function () {
                a.is(":visible") && (o(l.of), clearInterval(h))
            }, t.fx.interval)), this._trigger("open", i, {tooltip: a}), r = {keyup: function (e) {
                if (e.keyCode === t.ui.keyCode.ESCAPE) {
                    var i = t.Event(e);
                    i.currentTarget = s[0], this.close(i, !0)
                }
            }, remove: function () {
                this._removeTooltip(a)
            }}, i && "mouseover" !== i.type || (r.mouseleave = "close"), i && "focusin" !== i.type || (r.focusout = "close"), this._on(!0, s, r)
        }
    }, close: function (e) {
        var s = this, n = t(e ? e.currentTarget : this.element), o = this._find(n);
        this.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && n.attr("title", n.data("ui-tooltip-title")), i(n), o.stop(!0), this._hide(o, this.options.hide, function () {
            s._removeTooltip(t(this))
        }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function (e, i) {
            t(i.element).attr("title", i.title), delete s.parents[e]
        }), this.closing = !0, this._trigger("close", e, {tooltip: o}), this.closing = !1)
    }, _tooltip: function (e) {
        var i = "ui-tooltip-" + s++, n = t("<div>").attr({id: i, role: "tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
        return t("<div>").addClass("ui-tooltip-content").appendTo(n), n.appendTo(this.document[0].body), this.tooltips[i] = e, n
    }, _find: function (e) {
        var i = e.data("ui-tooltip-id");
        return i ? t("#" + i) : t()
    }, _removeTooltip: function (t) {
        t.remove(), delete this.tooltips[t.attr("id")]
    }, _destroy: function () {
        var e = this;
        t.each(this.tooltips, function (i, s) {
            var n = t.Event("blur");
            n.target = n.currentTarget = s[0], e.close(n, !0), t("#" + i).remove(), s.data("ui-tooltip-title") && (s.attr("title", s.data("ui-tooltip-title")), s.removeData("ui-tooltip-title"))
        })
    }})
})(jQuery);
(function (t, e) {
    var i = "ui-effects-";
    t.effects = {effect: {}}, function (t, e) {
        function i(t, e, i) {
            var s = u[e.type] || {};
            return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t)
        }

        function s(i) {
            var s = l(), n = s._rgba = [];
            return i = i.toLowerCase(), f(h, function (t, o) {
                var a, r = o.re.exec(i), h = r && o.parse(r), l = o.space || "rgba";
                return h ? (a = s[l](h), s[c[l].cache] = a[c[l].cache], n = s._rgba = a._rgba, !1) : e
            }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), s) : o[i]
        }

        function n(t, e, i) {
            return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
        }

        var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", r = /^([\-+])=\s*(\d+\.?\d*)/, h = [
            {re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function (t) {
                return[t[1], t[2], t[3], t[4]]
            }},
            {re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function (t) {
                return[2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
            }},
            {re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (t) {
                return[parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
            }},
            {re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (t) {
                return[parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
            }},
            {re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function (t) {
                return[t[1], t[2] / 100, t[3] / 100, t[4]]
            }}
        ], l = t.Color = function (e, i, s, n) {
            return new t.Color.fn.parse(e, i, s, n)
        }, c = {rgba: {props: {red: {idx: 0, type: "byte"}, green: {idx: 1, type: "byte"}, blue: {idx: 2, type: "byte"}}}, hsla: {props: {hue: {idx: 0, type: "degrees"}, saturation: {idx: 1, type: "percent"}, lightness: {idx: 2, type: "percent"}}}}, u = {"byte": {floor: !0, max: 255}, percent: {max: 1}, degrees: {mod: 360, floor: !0}}, d = l.support = {}, p = t("<p>")[0], f = t.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function (t, e) {
            e.cache = "_" + t, e.props.alpha = {idx: 3, type: "percent", def: 1}
        }), l.fn = t.extend(l.prototype, {parse: function (n, a, r, h) {
            if (n === e)return this._rgba = [null, null, null, null], this;
            (n.jquery || n.nodeType) && (n = t(n).css(a), a = e);
            var u = this, d = t.type(n), p = this._rgba = [];
            return a !== e && (n = [n, a, r, h], d = "array"), "string" === d ? this.parse(s(n) || o._default) : "array" === d ? (f(c.rgba.props, function (t, e) {
                p[e.idx] = i(n[e.idx], e)
            }), this) : "object" === d ? (n instanceof l ? f(c, function (t, e) {
                n[e.cache] && (u[e.cache] = n[e.cache].slice())
            }) : f(c, function (e, s) {
                var o = s.cache;
                f(s.props, function (t, e) {
                    if (!u[o] && s.to) {
                        if ("alpha" === t || null == n[t])return;
                        u[o] = s.to(u._rgba)
                    }
                    u[o][e.idx] = i(n[t], e, !0)
                }), u[o] && 0 > t.inArray(null, u[o].slice(0, 3)) && (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])))
            }), this) : e
        }, is: function (t) {
            var i = l(t), s = !0, n = this;
            return f(c, function (t, o) {
                var a, r = i[o.cache];
                return r && (a = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props, function (t, i) {
                    return null != r[i.idx] ? s = r[i.idx] === a[i.idx] : e
                })), s
            }), s
        }, _space: function () {
            var t = [], e = this;
            return f(c, function (i, s) {
                e[s.cache] && t.push(i)
            }), t.pop()
        }, transition: function (t, e) {
            var s = l(t), n = s._space(), o = c[n], a = 0 === this.alpha() ? l("transparent") : this, r = a[o.cache] || o.to(a._rgba), h = r.slice();
            return s = s[o.cache], f(o.props, function (t, n) {
                var o = n.idx, a = r[o], l = s[o], c = u[n.type] || {};
                null !== l && (null === a ? h[o] = l : (c.mod && (l - a > c.mod / 2 ? a += c.mod : a - l > c.mod / 2 && (a -= c.mod)), h[o] = i((l - a) * e + a, n)))
            }), this[n](h)
        }, blend: function (e) {
            if (1 === this._rgba[3])return this;
            var i = this._rgba.slice(), s = i.pop(), n = l(e)._rgba;
            return l(t.map(i, function (t, e) {
                return(1 - s) * n[e] + s * t
            }))
        }, toRgbaString: function () {
            var e = "rgba(", i = t.map(this._rgba, function (t, e) {
                return null == t ? e > 2 ? 1 : 0 : t
            });
            return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
        }, toHslaString: function () {
            var e = "hsla(", i = t.map(this.hsla(), function (t, e) {
                return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
            });
            return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
        }, toHexString: function (e) {
            var i = this._rgba.slice(), s = i.pop();
            return e && i.push(~~(255 * s)), "#" + t.map(i,function (t) {
                return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
            }).join("")
        }, toString: function () {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
        }}), l.fn.parse.prototype = l.fn, c.hsla.to = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])return[null, null, null, t[3]];
            var e, i, s = t[0] / 255, n = t[1] / 255, o = t[2] / 255, a = t[3], r = Math.max(s, n, o), h = Math.min(s, n, o), l = r - h, c = r + h, u = .5 * c;
            return e = h === r ? 0 : s === r ? 60 * (n - o) / l + 360 : n === r ? 60 * (o - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= u ? l / c : l / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a]
        }, c.hsla.from = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])return[null, null, null, t[3]];
            var e = t[0] / 360, i = t[1], s = t[2], o = t[3], a = .5 >= s ? s * (1 + i) : s + i - s * i, r = 2 * s - a;
            return[Math.round(255 * n(r, a, e + 1 / 3)), Math.round(255 * n(r, a, e)), Math.round(255 * n(r, a, e - 1 / 3)), o]
        }, f(c, function (s, n) {
            var o = n.props, a = n.cache, h = n.to, c = n.from;
            l.fn[s] = function (s) {
                if (h && !this[a] && (this[a] = h(this._rgba)), s === e)return this[a].slice();
                var n, r = t.type(s), u = "array" === r || "object" === r ? s : arguments, d = this[a].slice();
                return f(o, function (t, e) {
                    var s = u["object" === r ? t : e.idx];
                    null == s && (s = d[e.idx]), d[e.idx] = i(s, e)
                }), c ? (n = l(c(d)), n[a] = d, n) : l(d)
            }, f(o, function (e, i) {
                l.fn[e] || (l.fn[e] = function (n) {
                    var o, a = t.type(n), h = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s, l = this[h](), c = l[i.idx];
                    return"undefined" === a ? c : ("function" === a && (n = n.call(this, c), a = t.type(n)), null == n && i.empty ? this : ("string" === a && (o = r.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), l[i.idx] = n, this[h](l)))
                })
            })
        }), l.hook = function (e) {
            var i = e.split(" ");
            f(i, function (e, i) {
                t.cssHooks[i] = {set: function (e, n) {
                    var o, a, r = "";
                    if ("transparent" !== n && ("string" !== t.type(n) || (o = s(n)))) {
                        if (n = l(o || n), !d.rgba && 1 !== n._rgba[3]) {
                            for (a = "backgroundColor" === i ? e.parentNode : e; ("" === r || "transparent" === r) && a && a.style;)try {
                                r = t.css(a, "backgroundColor"), a = a.parentNode
                            } catch (h) {
                            }
                            n = n.blend(r && "transparent" !== r ? r : "_default")
                        }
                        n = n.toRgbaString()
                    }
                    try {
                        e.style[i] = n
                    } catch (h) {
                    }
                }}, t.fx.step[i] = function (e) {
                    e.colorInit || (e.start = l(e.elem, i), e.end = l(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                }
            })
        }, l.hook(a), t.cssHooks.borderColor = {expand: function (t) {
            var e = {};
            return f(["Top", "Right", "Bottom", "Left"], function (i, s) {
                e["border" + s + "Color"] = t
            }), e
        }}, o = t.Color.names = {aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff"}
    }(jQuery), function () {
        function i(e) {
            var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle, o = {};
            if (n && n.length && n[0] && n[n[0]])for (s = n.length; s--;)i = n[s], "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]); else for (i in n)"string" == typeof n[i] && (o[i] = n[i]);
            return o
        }

        function s(e, i) {
            var s, n, a = {};
            for (s in i)n = i[s], e[s] !== n && (o[s] || (t.fx.step[s] || !isNaN(parseFloat(n))) && (a[s] = n));
            return a
        }

        var n = ["add", "remove", "toggle"], o = {border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1};
        t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (e, i) {
            t.fx.step[i] = function (t) {
                ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0)
            }
        }), t.fn.addBack || (t.fn.addBack = function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t.effects.animateClass = function (e, o, a, r) {
            var h = t.speed(o, a, r);
            return this.queue(function () {
                var o, a = t(this), r = a.attr("class") || "", l = h.children ? a.find("*").addBack() : a;
                l = l.map(function () {
                    var e = t(this);
                    return{el: e, start: i(this)}
                }), o = function () {
                    t.each(n, function (t, i) {
                        e[i] && a[i + "Class"](e[i])
                    })
                }, o(), l = l.map(function () {
                    return this.end = i(this.el[0]), this.diff = s(this.start, this.end), this
                }), a.attr("class", r), l = l.map(function () {
                    var e = this, i = t.Deferred(), s = t.extend({}, h, {queue: !1, complete: function () {
                        i.resolve(e)
                    }});
                    return this.el.animate(this.diff, s), i.promise()
                }), t.when.apply(t, l.get()).done(function () {
                    o(), t.each(arguments, function () {
                        var e = this.el;
                        t.each(this.diff, function (t) {
                            e.css(t, "")
                        })
                    }), h.complete.call(a[0])
                })
            })
        }, t.fn.extend({addClass: function (e) {
            return function (i, s, n, o) {
                return s ? t.effects.animateClass.call(this, {add: i}, s, n, o) : e.apply(this, arguments)
            }
        }(t.fn.addClass), removeClass: function (e) {
            return function (i, s, n, o) {
                return arguments.length > 1 ? t.effects.animateClass.call(this, {remove: i}, s, n, o) : e.apply(this, arguments)
            }
        }(t.fn.removeClass), toggleClass: function (i) {
            return function (s, n, o, a, r) {
                return"boolean" == typeof n || n === e ? o ? t.effects.animateClass.call(this, n ? {add: s} : {remove: s}, o, a, r) : i.apply(this, arguments) : t.effects.animateClass.call(this, {toggle: s}, n, o, a)
            }
        }(t.fn.toggleClass), switchClass: function (e, i, s, n, o) {
            return t.effects.animateClass.call(this, {add: i, remove: e}, s, n, o)
        }})
    }(), function () {
        function s(e, i, s, n) {
            return t.isPlainObject(e) && (i = e, e = e.effect), e = {effect: e}, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e
        }

        function n(e) {
            return!e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
        }

        t.extend(t.effects, {version: "1.10.4", save: function (t, e) {
            for (var s = 0; e.length > s; s++)null !== e[s] && t.data(i + e[s], t[0].style[e[s]])
        }, restore: function (t, s) {
            var n, o;
            for (o = 0; s.length > o; o++)null !== s[o] && (n = t.data(i + s[o]), n === e && (n = ""), t.css(s[o], n))
        }, setMode: function (t, e) {
            return"toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
        }, getBaseline: function (t, e) {
            var i, s;
            switch (t[0]) {
                case"top":
                    i = 0;
                    break;
                case"middle":
                    i = .5;
                    break;
                case"bottom":
                    i = 1;
                    break;
                default:
                    i = t[0] / e.height
            }
            switch (t[1]) {
                case"left":
                    s = 0;
                    break;
                case"center":
                    s = .5;
                    break;
                case"right":
                    s = 1;
                    break;
                default:
                    s = t[1] / e.width
            }
            return{x: s, y: i}
        }, createWrapper: function (e) {
            if (e.parent().is(".ui-effects-wrapper"))return e.parent();
            var i = {width: e.outerWidth(!0), height: e.outerHeight(!0), "float": e.css("float")}, s = t("<div></div>").addClass("ui-effects-wrapper").css({fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0}), n = {width: e.width(), height: e.height()}, o = document.activeElement;
            try {
                o.id
            } catch (a) {
                o = document.body
            }
            return e.wrap(s), (e[0] === o || t.contains(e[0], o)) && t(o).focus(), s = e.parent(), "static" === e.css("position") ? (s.css({position: "relative"}), e.css({position: "relative"})) : (t.extend(i, {position: e.css("position"), zIndex: e.css("z-index")}), t.each(["top", "left", "bottom", "right"], function (t, s) {
                i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
            }), e.css({position: "relative", top: 0, left: 0, right: "auto", bottom: "auto"})), e.css(n), s.css(i).show()
        }, removeWrapper: function (e) {
            var i = document.activeElement;
            return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
        }, setTransition: function (e, i, s, n) {
            return n = n || {}, t.each(i, function (t, i) {
                var o = e.cssUnit(i);
                o[0] > 0 && (n[i] = o[0] * s + o[1])
            }), n
        }}), t.fn.extend({effect: function () {
            function e(e) {
                function s() {
                    t.isFunction(o) && o.call(n[0]), t.isFunction(e) && e()
                }

                var n = t(this), o = i.complete, r = i.mode;
                (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), s()) : a.call(n[0], i, s)
            }

            var i = s.apply(this, arguments), n = i.mode, o = i.queue, a = t.effects.effect[i.effect];
            return t.fx.off || !a ? n ? this[n](i.duration, i.complete) : this.each(function () {
                i.complete && i.complete.call(this)
            }) : o === !1 ? this.each(e) : this.queue(o || "fx", e)
        }, show: function (t) {
            return function (e) {
                if (n(e))return t.apply(this, arguments);
                var i = s.apply(this, arguments);
                return i.mode = "show", this.effect.call(this, i)
            }
        }(t.fn.show), hide: function (t) {
            return function (e) {
                if (n(e))return t.apply(this, arguments);
                var i = s.apply(this, arguments);
                return i.mode = "hide", this.effect.call(this, i)
            }
        }(t.fn.hide), toggle: function (t) {
            return function (e) {
                if (n(e) || "boolean" == typeof e)return t.apply(this, arguments);
                var i = s.apply(this, arguments);
                return i.mode = "toggle", this.effect.call(this, i)
            }
        }(t.fn.toggle), cssUnit: function (e) {
            var i = this.css(e), s = [];
            return t.each(["em", "px", "%", "pt"], function (t, e) {
                i.indexOf(e) > 0 && (s = [parseFloat(i), e])
            }), s
        }})
    }(), function () {
        var e = {};
        t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, i) {
            e[i] = function (e) {
                return Math.pow(e, t + 2)
            }
        }), t.extend(e, {Sine: function (t) {
            return 1 - Math.cos(t * Math.PI / 2)
        }, Circ: function (t) {
            return 1 - Math.sqrt(1 - t * t)
        }, Elastic: function (t) {
            return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
        }, Back: function (t) {
            return t * t * (3 * t - 2)
        }, Bounce: function (t) {
            for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t;);
            return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
        }}), t.each(e, function (e, i) {
            t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function (t) {
                return 1 - i(1 - t)
            }, t.easing["easeInOut" + e] = function (t) {
                return.5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
            }
        })
    }()
})(jQuery);
(function (t) {
    var e = /up|down|vertical/, i = /up|left|vertical|horizontal/;
    t.effects.effect.blind = function (s, n) {
        var a, o, r, l = t(this), h = ["position", "top", "bottom", "left", "right", "height", "width"], c = t.effects.setMode(l, s.mode || "hide"), u = s.direction || "up", d = e.test(u), p = d ? "height" : "width", f = d ? "top" : "left", g = i.test(u), m = {}, v = "show" === c;
        l.parent().is(".ui-effects-wrapper") ? t.effects.save(l.parent(), h) : t.effects.save(l, h), l.show(), a = t.effects.createWrapper(l).css({overflow: "hidden"}), o = a[p](), r = parseFloat(a.css(f)) || 0, m[p] = v ? o : 0, g || (l.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({position: "absolute"}), m[f] = v ? r : o + r), v && (a.css(p, 0), g || a.css(f, r + o)), a.animate(m, {duration: s.duration, easing: s.easing, queue: !1, complete: function () {
            "hide" === c && l.hide(), t.effects.restore(l, h), t.effects.removeWrapper(l), n()
        }})
    }
})(jQuery);
(function (t) {
    t.effects.effect.bounce = function (e, i) {
        var s, n, a, o = t(this), r = ["position", "top", "bottom", "left", "right", "height", "width"], l = t.effects.setMode(o, e.mode || "effect"), h = "hide" === l, c = "show" === l, u = e.direction || "up", d = e.distance, p = e.times || 5, f = 2 * p + (c || h ? 1 : 0), g = e.duration / f, m = e.easing, v = "up" === u || "down" === u ? "top" : "left", _ = "up" === u || "left" === u, b = o.queue(), y = b.length;
        for ((c || h) && r.push("opacity"), t.effects.save(o, r), o.show(), t.effects.createWrapper(o), d || (d = o["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (a = {opacity: 1}, a[v] = 0, o.css("opacity", 0).css(v, _ ? 2 * -d : 2 * d).animate(a, g, m)), h && (d /= Math.pow(2, p - 1)), a = {}, a[v] = 0, s = 0; p > s; s++)n = {}, n[v] = (_ ? "-=" : "+=") + d, o.animate(n, g, m).animate(a, g, m), d = h ? 2 * d : d / 2;
        h && (n = {opacity: 0}, n[v] = (_ ? "-=" : "+=") + d, o.animate(n, g, m)), o.queue(function () {
            h && o.hide(), t.effects.restore(o, r), t.effects.removeWrapper(o), i()
        }), y > 1 && b.splice.apply(b, [1, 0].concat(b.splice(y, f + 1))), o.dequeue()
    }
})(jQuery);
(function (t) {
    t.effects.effect.clip = function (e, i) {
        var s, n, a, o = t(this), r = ["position", "top", "bottom", "left", "right", "height", "width"], l = t.effects.setMode(o, e.mode || "hide"), h = "show" === l, c = e.direction || "vertical", u = "vertical" === c, d = u ? "height" : "width", p = u ? "top" : "left", f = {};
        t.effects.save(o, r), o.show(), s = t.effects.createWrapper(o).css({overflow: "hidden"}), n = "IMG" === o[0].tagName ? s : o, a = n[d](), h && (n.css(d, 0), n.css(p, a / 2)), f[d] = h ? a : 0, f[p] = h ? 0 : a / 2, n.animate(f, {queue: !1, duration: e.duration, easing: e.easing, complete: function () {
            h || o.hide(), t.effects.restore(o, r), t.effects.removeWrapper(o), i()
        }})
    }
})(jQuery);
(function (t) {
    t.effects.effect.drop = function (e, i) {
        var s, n = t(this), a = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"], o = t.effects.setMode(n, e.mode || "hide"), r = "show" === o, h = e.direction || "left", l = "up" === h || "down" === h ? "top" : "left", c = "up" === h || "left" === h ? "pos" : "neg", u = {opacity: r ? 1 : 0};
        t.effects.save(n, a), n.show(), t.effects.createWrapper(n), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, r && n.css("opacity", 0).css(l, "pos" === c ? -s : s), u[l] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + s, n.animate(u, {queue: !1, duration: e.duration, easing: e.easing, complete: function () {
            "hide" === o && n.hide(), t.effects.restore(n, a), t.effects.removeWrapper(n), i()
        }})
    }
})(jQuery);
(function (t) {
    t.effects.effect.explode = function (e, i) {
        function s() {
            b.push(this), b.length === u * d && n()
        }

        function n() {
            p.css({visibility: "visible"}), t(b).remove(), g || p.hide(), i()
        }

        var a, o, r, h, l, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3, d = u, p = t(this), f = t.effects.setMode(p, e.mode || "hide"), g = "show" === f, m = p.show().css("visibility", "hidden").offset(), v = Math.ceil(p.outerWidth() / d), _ = Math.ceil(p.outerHeight() / u), b = [];
        for (a = 0; u > a; a++)for (h = m.top + a * _, c = a - (u - 1) / 2, o = 0; d > o; o++)r = m.left + o * v, l = o - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({position: "absolute", visibility: "visible", left: -o * v, top: -a * _}).parent().addClass("ui-effects-explode").css({position: "absolute", overflow: "hidden", width: v, height: _, left: r + (g ? l * v : 0), top: h + (g ? c * _ : 0), opacity: g ? 0 : 1}).animate({left: r + (g ? 0 : l * v), top: h + (g ? 0 : c * _), opacity: g ? 1 : 0}, e.duration || 500, e.easing, s)
    }
})(jQuery);
(function (t) {
    t.effects.effect.fade = function (e, i) {
        var s = t(this), n = t.effects.setMode(s, e.mode || "toggle");
        s.animate({opacity: n}, {queue: !1, duration: e.duration, easing: e.easing, complete: i})
    }
})(jQuery);
(function (t) {
    t.effects.effect.fold = function (e, i) {
        var s, n, a = t(this), o = ["position", "top", "bottom", "left", "right", "height", "width"], r = t.effects.setMode(a, e.mode || "hide"), h = "show" === r, l = "hide" === r, c = e.size || 15, u = /([0-9]+)%/.exec(c), d = !!e.horizFirst, p = h !== d, f = p ? ["width", "height"] : ["height", "width"], g = e.duration / 2, m = {}, v = {};
        t.effects.save(a, o), a.show(), s = t.effects.createWrapper(a).css({overflow: "hidden"}), n = p ? [s.width(), s.height()] : [s.height(), s.width()], u && (c = parseInt(u[1], 10) / 100 * n[l ? 0 : 1]), h && s.css(d ? {height: 0, width: c} : {height: c, width: 0}), m[f[0]] = h ? n[0] : c, v[f[1]] = h ? n[1] : 0, s.animate(m, g, e.easing).animate(v, g, e.easing, function () {
            l && a.hide(), t.effects.restore(a, o), t.effects.removeWrapper(a), i()
        })
    }
})(jQuery);
(function (t) {
    t.effects.effect.highlight = function (e, i) {
        var s = t(this), n = ["backgroundImage", "backgroundColor", "opacity"], a = t.effects.setMode(s, e.mode || "show"), o = {backgroundColor: s.css("backgroundColor")};
        "hide" === a && (o.opacity = 0), t.effects.save(s, n), s.show().css({backgroundImage: "none", backgroundColor: e.color || "#ffff99"}).animate(o, {queue: !1, duration: e.duration, easing: e.easing, complete: function () {
            "hide" === a && s.hide(), t.effects.restore(s, n), i()
        }})
    }
})(jQuery);
(function (t) {
    t.effects.effect.pulsate = function (e, i) {
        var s, n = t(this), a = t.effects.setMode(n, e.mode || "show"), o = "show" === a, r = "hide" === a, h = o || "hide" === a, l = 2 * (e.times || 5) + (h ? 1 : 0), c = e.duration / l, u = 0, d = n.queue(), p = d.length;
        for ((o || !n.is(":visible")) && (n.css("opacity", 0).show(), u = 1), s = 1; l > s; s++)n.animate({opacity: u}, c, e.easing), u = 1 - u;
        n.animate({opacity: u}, c, e.easing), n.queue(function () {
            r && n.hide(), i()
        }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, l + 1))), n.dequeue()
    }
})(jQuery);
(function (t) {
    t.effects.effect.puff = function (e, i) {
        var s = t(this), n = t.effects.setMode(s, e.mode || "hide"), o = "hide" === n, a = parseInt(e.percent, 10) || 150, r = a / 100, h = {height: s.height(), width: s.width(), outerHeight: s.outerHeight(), outerWidth: s.outerWidth()};
        t.extend(e, {effect: "scale", queue: !1, fade: !0, mode: n, complete: i, percent: o ? a : 100, from: o ? h : {height: h.height * r, width: h.width * r, outerHeight: h.outerHeight * r, outerWidth: h.outerWidth * r}}), s.effect(e)
    }, t.effects.effect.scale = function (e, i) {
        var s = t(this), n = t.extend(!0, {}, e), o = t.effects.setMode(s, e.mode || "effect"), a = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === o ? 0 : 100), r = e.direction || "both", h = e.origin, l = {height: s.height(), width: s.width(), outerHeight: s.outerHeight(), outerWidth: s.outerWidth()}, c = {y: "horizontal" !== r ? a / 100 : 1, x: "vertical" !== r ? a / 100 : 1};
        n.effect = "size", n.queue = !1, n.complete = i, "effect" !== o && (n.origin = h || ["middle", "center"], n.restore = !0), n.from = e.from || ("show" === o ? {height: 0, width: 0, outerHeight: 0, outerWidth: 0} : l), n.to = {height: l.height * c.y, width: l.width * c.x, outerHeight: l.outerHeight * c.y, outerWidth: l.outerWidth * c.x}, n.fade && ("show" === o && (n.from.opacity = 0, n.to.opacity = 1), "hide" === o && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n)
    }, t.effects.effect.size = function (e, i) {
        var s, n, o, a = t(this), r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], h = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], l = ["width", "height", "overflow"], c = ["fontSize"], d = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], u = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], p = t.effects.setMode(a, e.mode || "effect"), f = e.restore || "effect" !== p, g = e.scale || "both", m = e.origin || ["middle", "center"], v = a.css("position"), _ = f ? r : h, b = {height: 0, width: 0, outerHeight: 0, outerWidth: 0};
        "show" === p && a.show(), s = {height: a.height(), width: a.width(), outerHeight: a.outerHeight(), outerWidth: a.outerWidth()}, "toggle" === e.mode && "show" === p ? (a.from = e.to || b, a.to = e.from || s) : (a.from = e.from || ("show" === p ? b : s), a.to = e.to || ("hide" === p ? b : s)), o = {from: {y: a.from.height / s.height, x: a.from.width / s.width}, to: {y: a.to.height / s.height, x: a.to.width / s.width}}, ("box" === g || "both" === g) && (o.from.y !== o.to.y && (_ = _.concat(d), a.from = t.effects.setTransition(a, d, o.from.y, a.from), a.to = t.effects.setTransition(a, d, o.to.y, a.to)), o.from.x !== o.to.x && (_ = _.concat(u), a.from = t.effects.setTransition(a, u, o.from.x, a.from), a.to = t.effects.setTransition(a, u, o.to.x, a.to))), ("content" === g || "both" === g) && o.from.y !== o.to.y && (_ = _.concat(c).concat(l), a.from = t.effects.setTransition(a, c, o.from.y, a.from), a.to = t.effects.setTransition(a, c, o.to.y, a.to)), t.effects.save(a, _), a.show(), t.effects.createWrapper(a), a.css("overflow", "hidden").css(a.from), m && (n = t.effects.getBaseline(m, s), a.from.top = (s.outerHeight - a.outerHeight()) * n.y, a.from.left = (s.outerWidth - a.outerWidth()) * n.x, a.to.top = (s.outerHeight - a.to.outerHeight) * n.y, a.to.left = (s.outerWidth - a.to.outerWidth) * n.x), a.css(a.from), ("content" === g || "both" === g) && (d = d.concat(["marginTop", "marginBottom"]).concat(c), u = u.concat(["marginLeft", "marginRight"]), l = r.concat(d).concat(u), a.find("*[width]").each(function () {
            var i = t(this), s = {height: i.height(), width: i.width(), outerHeight: i.outerHeight(), outerWidth: i.outerWidth()};
            f && t.effects.save(i, l), i.from = {height: s.height * o.from.y, width: s.width * o.from.x, outerHeight: s.outerHeight * o.from.y, outerWidth: s.outerWidth * o.from.x}, i.to = {height: s.height * o.to.y, width: s.width * o.to.x, outerHeight: s.height * o.to.y, outerWidth: s.width * o.to.x}, o.from.y !== o.to.y && (i.from = t.effects.setTransition(i, d, o.from.y, i.from), i.to = t.effects.setTransition(i, d, o.to.y, i.to)), o.from.x !== o.to.x && (i.from = t.effects.setTransition(i, u, o.from.x, i.from), i.to = t.effects.setTransition(i, u, o.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function () {
                f && t.effects.restore(i, l)
            })
        })), a.animate(a.to, {queue: !1, duration: e.duration, easing: e.easing, complete: function () {
            0 === a.to.opacity && a.css("opacity", a.from.opacity), "hide" === p && a.hide(), t.effects.restore(a, _), f || ("static" === v ? a.css({position: "relative", top: a.to.top, left: a.to.left}) : t.each(["top", "left"], function (t, e) {
                a.css(e, function (e, i) {
                    var s = parseInt(i, 10), n = t ? a.to.left : a.to.top;
                    return"auto" === i ? n + "px" : s + n + "px"
                })
            })), t.effects.removeWrapper(a), i()
        }})
    }
})(jQuery);
(function (t) {
    t.effects.effect.shake = function (e, i) {
        var s, n = t(this), o = ["position", "top", "bottom", "left", "right", "height", "width"], a = t.effects.setMode(n, e.mode || "effect"), r = e.direction || "left", h = e.distance || 20, l = e.times || 3, c = 2 * l + 1, d = Math.round(e.duration / c), u = "up" === r || "down" === r ? "top" : "left", p = "up" === r || "left" === r, f = {}, g = {}, m = {}, v = n.queue(), _ = v.length;
        for (t.effects.save(n, o), n.show(), t.effects.createWrapper(n), f[u] = (p ? "-=" : "+=") + h, g[u] = (p ? "+=" : "-=") + 2 * h, m[u] = (p ? "-=" : "+=") + 2 * h, n.animate(f, d, e.easing), s = 1; l > s; s++)n.animate(g, d, e.easing).animate(m, d, e.easing);
        n.animate(g, d, e.easing).animate(f, d / 2, e.easing).queue(function () {
            "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
        }), _ > 1 && v.splice.apply(v, [1, 0].concat(v.splice(_, c + 1))), n.dequeue()
    }
})(jQuery);
(function (t) {
    t.effects.effect.slide = function (e, i) {
        var s, n = t(this), o = ["position", "top", "bottom", "left", "right", "width", "height"], a = t.effects.setMode(n, e.mode || "show"), r = "show" === a, h = e.direction || "left", l = "up" === h || "down" === h ? "top" : "left", c = "up" === h || "left" === h, d = {};
        t.effects.save(n, o), n.show(), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(n).css({overflow: "hidden"}), r && n.css(l, c ? isNaN(s) ? "-" + s : -s : s), d[l] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + s, n.animate(d, {queue: !1, duration: e.duration, easing: e.easing, complete: function () {
            "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
        }})
    }
})(jQuery);
(function (t) {
    t.effects.effect.transfer = function (e, i) {
        var s = t(this), n = t(e.to), o = "fixed" === n.css("position"), a = t("body"), r = o ? a.scrollTop() : 0, h = o ? a.scrollLeft() : 0, l = n.offset(), c = {top: l.top - r, left: l.left - h, height: n.innerHeight(), width: n.innerWidth()}, d = s.offset(), u = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({top: d.top - r, left: d.left - h, height: s.innerHeight(), width: s.innerWidth(), position: o ? "fixed" : "absolute"}).animate(c, e.duration, e.easing, function () {
            u.remove(), i()
        })
    }
})(jQuery);
/*! jQuery UI - v1.11.4 - 2015-04-05
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, resizable.js, selectable.js, sortable.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, menu.js, progressbar.js, selectmenu.js, slider.js, spinner.js, tabs.js, tooltip.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}function s(e){for(var t,i;e.length&&e[0]!==document;){if(t=e.css("position"),("absolute"===t||"relative"===t||"fixed"===t)&&(i=parseInt(e.css("zIndex"),10),!isNaN(i)&&0!==i))return i;e=e.parent()}return 0}function n(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.regional.en=e.extend(!0,{},this.regional[""]),this.regional["en-US"]=e.extend(!0,{},this.regional.en),this.dpDiv=a(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",o)}function o(){e.datepicker._isDisabledDatepicker(v.inline?v.dpDiv.parent()[0]:v.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))}function r(t,i){e.extend(t,i);for(var s in i)null==i[s]&&(t[s]=i[s]);return t}function h(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var l=0,u=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,n=u.call(arguments,1),a=0,o=n.length;o>a;a++)for(i in n[a])s=n[a][i],n[a].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(n){var a="string"==typeof n,o=u.call(arguments,1),r=this;return a?this.each(function(){var i,a=e.data(this,s);return"instance"===n?(r=a,!1):a?e.isFunction(a[n])&&"_"!==n.charAt(0)?(i=a[n].apply(a,o),i!==a&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+n+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+n+"'")}):(o.length&&(n=e.widget.extend.apply(null,[n].concat(o))),this.each(function(){var t=e.data(this,s);t?(t.option(n||{}),t._init&&t._init()):e.data(this,s,new i(n,this))})),r}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=l++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget;var d=!1;e(document).mouseup(function(){d=!1}),e.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!d){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),d=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),d=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),function(){function t(e,t,i){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?i/100:1)]}function i(t,i){return parseInt(e.css(t,i),10)||0}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var n,a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,d=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,p=/%$/,f=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return e("body").append(s),t=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),n=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),n="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,a="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:a?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s||n?i.width():i.outerWidth(),height:s||n?i.height():i.outerHeight()}}},e.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=e.extend({},n);var p,m,g,v,y,b,_=e(n.of),x=e.position.getWithinInfo(n.within),w=e.position.getScrollInfo(x),k=(n.collision||"flip").split(" "),T={};return b=s(_),_[0].preventDefault&&(n.at="left top"),m=b.width,g=b.height,v=b.offset,y=e.extend({},v),e.each(["my","at"],function(){var e,t,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",e=d.exec(i[0]),t=d.exec(i[1]),T[this]=[e?e[0]:0,t?t[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===n.at[0]?y.left+=m:"center"===n.at[0]&&(y.left+=m/2),"bottom"===n.at[1]?y.top+=g:"center"===n.at[1]&&(y.top+=g/2),p=t(T.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var s,l,u=e(this),d=u.outerWidth(),c=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=d+f+i(this,"marginRight")+w.width,S=c+b+i(this,"marginBottom")+w.height,M=e.extend({},y),C=t(T.my,u.outerWidth(),u.outerHeight());"right"===n.my[0]?M.left-=d:"center"===n.my[0]&&(M.left-=d/2),"bottom"===n.my[1]?M.top-=c:"center"===n.my[1]&&(M.top-=c/2),M.left+=C[0],M.top+=C[1],a||(M.left=h(M.left),M.top=h(M.top)),s={marginLeft:f,marginTop:b},e.each(["left","top"],function(t,i){e.ui.position[k[t]]&&e.ui.position[k[t]][i](M,{targetWidth:m,targetHeight:g,elemWidth:d,elemHeight:c,collisionPosition:s,collisionWidth:D,collisionHeight:S,offset:[p[0]+C[0],p[1]+C[1]],my:n.my,at:n.at,within:x,elem:u})}),n.using&&(l=function(e){var t=v.left-M.left,i=t+m-d,s=v.top-M.top,a=s+g-c,h={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:M.left,top:M.top,width:d,height:c},horizontal:0>i?"left":t>0?"right":"center",vertical:0>a?"top":s>0?"bottom":"middle"};d>m&&m>r(t+i)&&(h.horizontal="center"),c>g&&g>r(s+a)&&(h.vertical="middle"),h.important=o(r(t),r(i))>o(r(s),r(a))?"horizontal":"vertical",n.using.call(this,e,h)}),u.offset(e.extend(M,{using:l}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=e.left-t.collisionPosition.marginLeft,h=n-r,l=r+t.collisionWidth-a-n;t.collisionWidth>a?h>0&&0>=l?(i=e.left+h+t.collisionWidth-a-n,e.left+=h-i):e.left=l>0&&0>=h?n:h>l?n+a-t.collisionWidth:n:h>0?e.left+=h:l>0?e.left-=l:e.left=o(e.left-r,e.left)},top:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollTop:s.offset.top,a=t.within.height,r=e.top-t.collisionPosition.marginTop,h=n-r,l=r+t.collisionHeight-a-n;t.collisionHeight>a?h>0&&0>=l?(i=e.top+h+t.collisionHeight-a-n,e.top+=h-i):e.top=l>0&&0>=h?n:h>l?n+a-t.collisionHeight:n:h>0?e.top+=h:l>0?e.top-=l:e.top=o(e.top-r,e.top)}},flip:{left:function(e,t){var i,s,n=t.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,d=l+t.collisionWidth-o-h,c="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+c+p+f+t.collisionWidth-o-a,(0>i||r(u)>i)&&(e.left+=c+p+f)):d>0&&(s=e.left-t.collisionPosition.marginLeft+c+p+f-h,(s>0||d>r(s))&&(e.left+=c+p+f))},top:function(e,t){var i,s,n=t.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,d=l+t.collisionHeight-o-h,c="top"===t.my[1],p=c?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-a,(0>s||r(u)>s)&&(e.top+=p+f+m)):d>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,(i>0||d>r(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,s,n,o,r=document.getElementsByTagName("body")[0],h=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)t.style[o]=s[o];t.appendChild(h),i=r||document.documentElement,i.insertBefore(t,i.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",n=e(h).offset().left,a=n>10&&11>n,t.innerHTML="",i.removeChild(t)}()}(),e.ui.position,e.widget("ui.draggable",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur()}catch(s){}},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n})),n?(a.isOver||(a.isOver=1,s._parent=i.helper.parent(),a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,h,l,u,d,c,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,y=i.offset.top,b=y+s.helperProportions.height;for(c=s.snapElements.length-1;c>=0;c--)h=s.snapElements[c].left-s.margins.left,l=h+s.snapElements[c].width,u=s.snapElements[c].top-s.margins.top,d=u+s.snapElements[c].height,h-m>v||g>l+m||u-m>b||y>d+m||!e.contains(s.snapElements[c].item.ownerDocument,s.snapElements[c].item)?(s.snapElements[c].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),a=m>=Math.abs(d-y),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-y),a=m>=Math.abs(d-b),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[c].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=n||a||o||r||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}}),e.ui.draggable,e.widget("ui.droppable",{version:"1.11.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(s)?s:function(e){return e.is(s)},this.proportions=function(){return arguments.length?(t=arguments[0],void 0):t?t:t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(t){e.ui.ddmanager.droppables[t]=e.ui.ddmanager.droppables[t]||[],e.ui.ddmanager.droppables[t].push(this)},_splice:function(e){for(var t=0;e.length>t;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,i){if("accept"===t)this.accept=e.isFunction(i)?i:function(e){return e.is(i)};else if("scope"===t){var s=e.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(t,i)},_activate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var s=i||e.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=e(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&e.ui.intersect(s,e.extend(i,{offset:i.element.offset()}),i.options.tolerance,t)?(n=!0,!1):void 0}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(s)),this.element):!1):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(){function e(e,t,i){return e>=t&&t+i>e}return function(t,i,s,n){if(!i.offset)return!1;var a=(t.positionAbs||t.position.absolute).left+t.margins.left,o=(t.positionAbs||t.position.absolute).top+t.margins.top,r=a+t.helperProportions.width,h=o+t.helperProportions.height,l=i.offset.left,u=i.offset.top,d=l+i.proportions().width,c=u+i.proportions().height;switch(s){case"fit":return a>=l&&d>=r&&o>=u&&c>=h;case"intersect":return a+t.helperProportions.width/2>l&&d>r-t.helperProportions.width/2&&o+t.helperProportions.height/2>u&&c>h-t.helperProportions.height/2;case"pointer":return e(n.pageY,u,i.proportions().height)&&e(n.pageX,l,i.proportions().width);case"touch":return(o>=u&&c>=o||h>=u&&c>=h||u>o&&h>c)&&(a>=l&&d>=a||r>=l&&d>=r||l>a&&r>d);default:return!1}}}(),e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var s,n,a=e.ui.ddmanager.droppables[t.options.scope]||[],o=i?i.type:null,r=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(s=0;a.length>s;s++)if(!(a[s].options.disabled||t&&!a[s].accept.call(a[s].element[0],t.currentItem||t.element))){for(n=0;r.length>n;n++)if(r[n]===a[s].element[0]){a[s].proportions().height=0;continue e}a[s].visible="none"!==a[s].element.css("display"),a[s].visible&&("mousedown"===o&&a[s]._activate.call(a[s],i),a[s].offset=a[s].element.offset(),a[s].proportions({width:a[s].element[0].offsetWidth,height:a[s].element[0].offsetHeight}))}},drop:function(t,i){var s=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,a,o=e.ui.intersect(t,this,this.options.tolerance,i),r=!o&&this.isover?"isout":o&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,a=this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope===n}),a.length&&(s=e(a[0]).droppable("instance"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(t,i){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}},e.ui.droppable,e.widget("ui.resizable",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(e){return parseInt(e,10)||0},_isNumber:function(e){return!isNaN(parseInt(e,10))},_hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return t[s]>0?!0:(t[s]=1,n=t[s]>0,t[s]=0,n)},_create:function(){var t,i,s,n,a,o=this,r=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=e(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=e(this.handles[i]),this._on(this.handles[i],{mousedown:o._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var i,s,n,a=this.options,o=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),a.containment&&(i+=e(a.containment).scrollLeft()||0,s+=e(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:o.width(),height:o.height()},this.originalSize=this._helper?{width:o.outerWidth(),height:o.outerHeight()}:{width:o.width(),height:o.height()},this.sizeDiff={width:o.outerWidth()-o.width(),height:o.outerHeight()-o.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===n?this.axis+"-resize":n),o.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var i,s,n=this.originalMousePosition,a=this.axis,o=t.pageX-n.left||0,r=t.pageY-n.top||0,h=this._change[a];return this._updatePrevProperties(),h?(i=h.apply(this,[t,o,r]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var e={};return this.position.top!==this.prevPosition.top&&(e.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(e.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(e.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(e.height=this.size.height+"px"),this.helper.css(e),e},_updateVirtualBoundaries:function(e){var t,i,s,n,a,o=this.options;a={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=a.minHeight*this.aspectRatio,s=a.minWidth/this.aspectRatio,i=a.maxHeight*this.aspectRatio,n=a.maxWidth/this.aspectRatio,t>a.minWidth&&(a.minWidth=t),s>a.minHeight&&(a.minHeight=s),a.maxWidth>i&&(a.maxWidth=i),a.maxHeight>n&&(a.maxHeight=n)),this._vBoundaries=a},_updateCache:function(e){this.offset=this.helper.offset(),this._isNumber(e.left)&&(this.position.left=e.left),this._isNumber(e.top)&&(this.position.top=e.top),this._isNumber(e.height)&&(this.size.height=e.height),this._isNumber(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,i=this.size,s=this.axis;return this._isNumber(e.height)?e.width=e.height*this.aspectRatio:this._isNumber(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===s&&(e.left=t.left+(i.width-e.width),e.top=null),"nw"===s&&(e.top=t.top+(i.height-e.height),e.left=t.left+(i.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,i=this.axis,s=this._isNumber(e.width)&&t.maxWidth&&t.maxWidth<e.width,n=this._isNumber(e.height)&&t.maxHeight&&t.maxHeight<e.height,a=this._isNumber(e.width)&&t.minWidth&&t.minWidth>e.width,o=this._isNumber(e.height)&&t.minHeight&&t.minHeight>e.height,r=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,l=/sw|nw|w/.test(i),u=/nw|ne|n/.test(i);return a&&(e.width=t.minWidth),o&&(e.height=t.minHeight),s&&(e.width=t.maxWidth),n&&(e.height=t.maxHeight),a&&l&&(e.left=r-t.minWidth),s&&l&&(e.left=r-t.maxWidth),o&&u&&(e.top=h-t.minHeight),n&&u&&(e.top=h-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_getPaddingPlusBorderDimensions:function(e){for(var t=0,i=[],s=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],n=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];4>t;t++)i[t]=parseInt(s[t],10)||0,i[t]+=parseInt(n[t],10)||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var e,t=0,i=this.helper||this.element;this._proportionallyResizeElements.length>t;t++)e=this._proportionallyResizeElements[t],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(e)),e.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var t,i,s,n,a,o,r,h=e(this).resizable("instance"),l=h.options,u=h.element,d=l.containment,c=d instanceof e?d.get(0):/parent/.test(d)?u.parent().get(0):d;c&&(h.containerElement=e(c),/document/.test(d)||d===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(t=e(c),i=[],e(["Top","Right","Left","Bottom"]).each(function(e,s){i[e]=h._num(t.css("padding"+s))}),h.containerOffset=t.offset(),h.containerPosition=t.position(),h.containerSize={height:t.innerHeight()-i[3],width:t.innerWidth()-i[1]},s=h.containerOffset,n=h.containerSize.height,a=h.containerSize.width,o=h._hasScroll(c,"left")?c.scrollWidth:a,r=h._hasScroll(c)?c.scrollHeight:n,h.parentData={element:c,left:s.left,top:s.top,width:o,height:r}))},resize:function(t){var i,s,n,a,o=e(this).resizable("instance"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,d={top:0,left:0},c=o.containerElement,p=!0;c[0]!==document&&/static/.test(c.css("position"))&&(d=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-d.left),u&&(o.size.height=o.size.width/o.aspectRatio,p=!1),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio,p=!1),o.position.top=o._helper?h.top:0),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),i=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-d.left:o.offset.left-h.left)),s=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-d.top:o.offset.top-h.top)),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio,p=!1)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio,p=!1)),p||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height)},stop:function(){var t=e(this).resizable("instance"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).resizable("instance"),i=t.options;e(i.alsoResize).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})},resize:function(t,i){var s=e(this).resizable("instance"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0};e(n.alsoResize).each(function(){var t=e(this),s=e(this).data("ui-resizable-alsoresize"),n={},a=t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(a,function(e,t){var i=(s[t]||0)+(r[t]||0);i&&i>=0&&(n[t]=i||null)}),t.css(n)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).resizable("instance"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t,i=e(this).resizable("instance"),s=i.options,n=i.size,a=i.originalSize,o=i.originalPosition,r=i.axis,h="number"==typeof s.grid?[s.grid,s.grid]:s.grid,l=h[0]||1,u=h[1]||1,d=Math.round((n.width-a.width)/l)*l,c=Math.round((n.height-a.height)/u)*u,p=a.width+d,f=a.height+c,m=s.maxWidth&&p>s.maxWidth,g=s.maxHeight&&f>s.maxHeight,v=s.minWidth&&s.minWidth>p,y=s.minHeight&&s.minHeight>f;s.grid=h,v&&(p+=l),y&&(f+=u),m&&(p-=l),g&&(f-=u),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=o.top-c):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=o.left-d):((0>=f-u||0>=p-l)&&(t=i._getPaddingPlusBorderDimensions(this)),f-u>0?(i.size.height=f,i.position.top=o.top-c):(f=u-t.height,i.size.height=f,i.position.top=o.top+a.height-f),p-l>0?(i.size.width=p,i.position.left=o.left-d):(p=l-t.width,i.size.width=p,i.position.left=o.left+a.width-p))}}),e.ui.resizable,e.widget("ui.selectable",e.ui.mouse,{version:"1.11.4",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var t,i=this;
this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){t=e(i.options.filter,i.element[0]),t.addClass("ui-selectee"),t.each(function(){var t=e(this),i=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:i.left,top:i.top,right:i.left+t.outerWidth(),bottom:i.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=t.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var i=this,s=this.options;this.opos=[t.pageX,t.pageY],this.options.disabled||(this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),this.helper.css({left:t.pageX,top:t.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",t,{unselecting:s.element}))}),e(t.target).parents().addBack().each(function(){var s,n=e.data(this,"selectable-item");return n?(s=!t.metaKey&&!t.ctrlKey||!n.$element.hasClass("ui-selected"),n.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",t,{selecting:n.element}):i._trigger("unselecting",t,{unselecting:n.element}),!1):void 0}))},_mouseDrag:function(t){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,a=this.opos[0],o=this.opos[1],r=t.pageX,h=t.pageY;return a>r&&(i=r,r=a,a=i),o>h&&(i=h,h=o,o=i),this.helper.css({left:a,top:o,width:r-a,height:h-o}),this.selectees.each(function(){var i=e.data(this,"selectable-item"),l=!1;i&&i.element!==s.element[0]&&("touch"===n.tolerance?l=!(i.left>r||a>i.right||i.top>h||o>i.bottom):"fit"===n.tolerance&&(l=i.left>a&&r>i.right&&i.top>o&&h>i.bottom),l?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,s._trigger("selecting",t,{selecting:i.element}))):(i.selecting&&((t.metaKey||t.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",t,{unselecting:i.element}))),i.selected&&(t.metaKey||t.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",t,{unselecting:i.element})))))}),!1}},_mouseStop:function(t){var i=this;return this.dragged=!1,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element})}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element})}),this._trigger("stop",t),this.helper.remove(),!1}}),e.widget("ui.sortable",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(e,t,i){return e>=t&&t+i>e},_isFloating:function(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))},_create:function(){this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName()},_setHandleClassName:function(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),e.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle")})},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,a.widgetName+"-item")===a?(s=e(this),!1):void 0}),e.data(t.target,a.widgetName+"-item")===a&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,i,s){var n,a,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=e("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-this.document.scrollTop()<o.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-o.scrollSpeed):this.window.height()-(t.pageY-this.document.scrollTop())<o.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+o.scrollSpeed)),t.pageX-this.document.scrollLeft()<o.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-o.scrollSpeed):this.window.width()-(t.pageX-this.document.scrollLeft())<o.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+o.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!e.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],n):!0)){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=e.left,o=a+e.width,r=e.top,h=r+e.height,l=this.offset.click.top,u=this.offset.click.left,d="x"===this.options.axis||s+l>r&&h>s+l,c="y"===this.options.axis||t+u>a&&o>t+u,p=d&&c;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(e){var t="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),i="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),s=t&&i,n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return s?this.floating?a&&"right"===a||"down"===n?2:1:n&&("down"===n?2:1):!1},_intersectsWithSides:function(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&t||"up"===s&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){function i(){r.push(this)}var s,n,a,o,r=[],h=[],l=this._connectWith();if(l&&t)for(s=l.length-1;s>=0;s--)for(a=e(l[s],this.document[0]),n=a.length-1;n>=0;n--)o=e.data(a[n],this.widgetFullName),o&&o!==this&&!o.options.disabled&&h.push([e.isFunction(o.options.items)?o.options.items.call(o.element):e(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);for(h.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return e(r)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,u=this.items,d=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],c=this._connectWith();if(c&&this.ready)for(i=c.length-1;i>=0;i--)for(n=e(c[i],this.document[0]),s=n.length-1;s>=0;s--)a=e.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(d.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a));for(i=d.length-1;i>=0;i--)for(o=d[i][1],r=d[i][0],s=0,l=r.length;l>s;s++)h=e(r[s]),h.data(this.widgetName+"-item",o),u.push({item:h,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),n=e("<"+s+">",t.document[0]).addClass(i||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tbody"===s?t._createTrPlaceholder(t.currentItem.find("tr").eq(0),e("<tr>",t.document[0]).appendTo(n)):"tr"===s?t._createTrPlaceholder(t.currentItem,n):"img"===s&&n.attr("src",t.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(e,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_createTrPlaceholder:function(t,i){var s=this;t.children().each(function(){e("<td>&#160;</td>",s.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(t){var i,s,n,a,o,r,h,l,u,d,c=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!e.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(c&&e.contains(this.containers[i].element[0],c.element[0]))continue;c=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0);if(c)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,a=null,u=c.floating||this._isFloating(this.currentItem),o=u?"left":"top",r=u?"width":"height",d=u?"clientX":"clientY",s=this.items.length-1;s>=0;s--)e.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[o],l=!1,t[d]-h>this.items[s][r]/2&&(l=!0),n>Math.abs(t[d]-h)&&(n=Math.abs(t[d]-h),a=this.items[s],this.direction=l?"up":"down"));if(!a&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;a?this._rearrange(t,a,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.width():this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(t=e(n.containment)[0],i=e(n.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n=this.options,a=t.pageX,o=t.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(e,t){function i(e,t,i){return function(s){i._trigger(e,s,t._uiHash(t))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&n.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||n.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(n.push(function(e){this._trigger("remove",e,this._uiHash())}),n.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)t||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t){for(s=0;n.length>s;s++)n[s].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}}),e.widget("ui.accordion",{version:"1.11.4",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var t=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),t.collapsible||t.active!==!1&&null!=t.active||(t.active=0),this._processPanels(),0>t.active&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),this._destroyIcons(),e=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&(this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)),void 0)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,s=this.headers.length,n=this.headers.index(t.target),a=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:a=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:a=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:a=this.headers[0];break;case i.END:a=this.headers[s-1]}a&&(e(t.target).attr("tabIndex",-1),e(a).attr("tabIndex",0),a.focus(),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t=this.options;this._processPanels(),t.active===!1&&t.collapsible===!0||!this.headers.length?(t.active=!1,this.active=e()):t.active===!1?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var e=this.headers,t=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),t&&(this._off(e.not(this.headers)),this._off(t.not(this.panels)))
},_refresh:function(){var t,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(){var t=e(this),i=t.uniqueId().attr("id"),s=t.next(),n=s.uniqueId().attr("id");t.attr("aria-controls",n),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(t=n.height(),this.element.siblings(":visible").each(function(){var i=e(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(t-=i.outerHeight(!0))}),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===s&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).css("height","").height())}).height(t))},_activate:function(t){var i=this._findActive(t)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var i={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n[0]===s[0],o=a&&i.collapsible,r=o?e():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:o?e():n,newPanel:r};t.preventDefault(),a&&!i.collapsible||this._trigger("beforeActivate",t,l)===!1||(i.active=o?!1:this.headers.index(n),this.active=a?e():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),a||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")))},_toggle:function(t){var i=t.newPanel,s=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,t):(s.hide(),i.show(),this._toggleComplete(t)),s.attr({"aria-hidden":"true"}),s.prev().attr({"aria-selected":"false","aria-expanded":"false"}),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===parseInt(e(this).attr("tabIndex"),10)}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(e,t,i){var s,n,a,o=this,r=0,h=e.css("box-sizing"),l=e.length&&(!t.length||e.index()<t.index()),u=this.options.animate||{},d=l&&u.down||u,c=function(){o._toggleComplete(i)};return"number"==typeof d&&(a=d),"string"==typeof d&&(n=d),n=n||d.easing||u.easing,a=a||d.duration||u.duration,t.length?e.length?(s=e.show().outerHeight(),t.animate(this.hideProps,{duration:a,easing:n,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(this.showProps,{duration:a,easing:n,complete:c,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?"content-box"===h&&(r+=i.now):"content"!==o.options.heightStyle&&(i.now=Math.round(s-t.outerHeight()-r),r=0)}}),void 0):t.animate(this.hideProps,a,n,c):e.animate(this.showProps,a,n,c)},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.widget("ui.menu",{version:"1.11.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var i=e(t.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&e(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){if(!this.previousFilter){var i=e(t.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){var i,s,n,a,o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,s=this.previousFilter||"",n=String.fromCharCode(t.keyCode),a=!1,clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e))},refresh:function(){var t,i,s=this,n=this.options.icons.submenu,a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.parent(),s=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))}),t=a.add(this.element),i=t.find(this.options.items),i.not(".ui-menu-item").each(function(){var t=e(this);s._isDivider(t)&&t.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},focus:function(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=t.outerHeight(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-n}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(t),void 0)},previousPage:function(t){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+n>0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first())),void 0):(this.next(t),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).text()))})}}),e.widget("ui.autocomplete",{version:"1.11.4",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,void 0;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),void 0):(this._searchTimeout(e),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(e),this._change(e),void 0)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close()})})},menufocus:function(t,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&e.trim(s).length&&(this.liveRegion.children().hide(),e("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;(!t||t&&!i&&!s)&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").text(i.label).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[e](t),void 0):(this.search(null,t),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion))}}),e.ui.autocomplete;var c,p="ui-button ui-widget ui-state-default ui-corner-all",f="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",m=function(){var t=e(this);setTimeout(function(){t.find(":ui-button").button("refresh")},1)},g=function(t){var i=t.name,s=t.form,n=e([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?e(s).find("[name='"+i+"'][type=radio]"):e("[name='"+i+"'][type=radio]",t.ownerDocument).filter(function(){return!this.form})),n};e.widget("ui.button",{version:"1.11.4",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,m),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var t=this,i=this.options,s="checkbox"===this.type||"radio"===this.type,n=s?"":"ui-state-active";null===i.label&&(i.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(p).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){i.disabled||this===c&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){i.disabled||e(this).removeClass(n)}).bind("click"+this.eventNamespace,function(e){i.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),s&&this.element.bind("change"+this.eventNamespace,function(){t.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return i.disabled?!1:void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(i.disabled)return!1;e(this).addClass("ui-state-active"),t.buttonElement.attr("aria-pressed","true");var s=t.element[0];g(s).not(s).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return i.disabled?!1:(e(this).addClass("ui-state-active"),c=this,t.document.one("mouseup",function(){c=null}),void 0)}).bind("mouseup"+this.eventNamespace,function(){return i.disabled?!1:(e(this).removeClass("ui-state-active"),void 0)}).bind("keydown"+this.eventNamespace,function(t){return i.disabled?!1:((t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active"),void 0)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",i.disabled),this._resetButton()},_determineButtonType:function(){var e,t,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(p+" ui-state-active "+f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){return this._super(e,t),"disabled"===e?(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),t&&("checkbox"===this.type||"radio"===this.type?this.buttonElement.removeClass("ui-state-focus"):this.buttonElement.removeClass("ui-state-focus ui-state-active")),void 0):(this._resetButton(),void 0)},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?g(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),void 0;var t=this.buttonElement.removeClass(f),i=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(i)))):a.push("ui-button-text-only"),t.addClass(a.join(" "))}}),e.widget("ui.buttonset",{version:"1.11.4",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){"disabled"===e&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t="rtl"===this.element.css("direction"),i=this.element.find(this.options.items),s=i.filter(":ui-button");i.not(":ui-button").button(),s.button("refresh"),this.buttons=i.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}}),e.ui.button,e.extend(e.ui,{datepicker:{version:"1.11.4"}});var v;e.extend(n.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return r(this._defaults,e||{}),this},_attachDatepicker:function(t,i){var s,n,a;s=t.nodeName.toLowerCase(),n="div"===s||"span"===s,t.id||(this.uuid+=1,t.id="dp"+this.uuid),a=this._newInst(e(t),n),a.settings=e.extend({},i||{}),"input"===s?this._connectDatepicker(t,a):n&&this._inlineDatepicker(t,a)},_newInst:function(t,i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?a(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,i){var s=e(t);i.append=e([]),i.trigger=e([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),e.data(t,"datepicker",i),i.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,i){var s,n,a,o=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),o&&(i.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[r?"before":"after"](i.append)),t.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&t.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),a=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:a,alt:n,title:n}):e("<button type='button'></button>").addClass(this._triggerClass).html(a?e("<img/>").attr({src:a,alt:n,title:n}):n)),t[r?"before":"after"](i.trigger),i.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,s,n,a=new Date(2009,11,20),o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){for(i=0,s=0,n=0;e.length>n;n++)e[n].length>i&&(i=e[n].length,s=n);return s},a.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),a.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-a.getDay())),e.input.attr("size",this._formatDate(e,a).length)}},_inlineDatepicker:function(t,i){var s=e(t);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),e.data(t,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"))},_dialogDatepicker:function(t,i,s,n,a){var o,h,l,u,d,c=this._dialogInst;return c||(this.uuid+=1,o="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+o+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),c=this._dialogInst=this._newInst(this._dialogInput,!1),c.settings={},e.data(this._dialogInput[0],"datepicker",c)),r(c.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(c,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(h=document.documentElement.clientWidth,l=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[h/2-100+u,l/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),c.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],"datepicker",c),this
},_destroyDatepicker:function(t){var i,s=e(t),n=e.data(t,"datepicker");s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty(),v===n&&(v=null))},_enableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,a.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,a.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(t,i,s){var n,a,o,h,l=this._getInst(t);return 2===arguments.length&&"string"==typeof i?"defaults"===i?e.extend({},e.datepicker._defaults):l?"all"===i?e.extend({},l.settings):this._get(l,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),l&&(this._curInst===l&&this._hideDatepicker(),a=this._getDateDatepicker(t,!0),o=this._getMinMaxDate(l,"min"),h=this._getMinMaxDate(l,"max"),r(l.settings,n),null!==o&&void 0!==n.dateFormat&&void 0===n.minDate&&(l.settings.minDate=this._formatDate(l,o)),null!==h&&void 0!==n.dateFormat&&void 0===n.maxDate&&(l.settings.maxDate=this._formatDate(l,h)),"disabled"in n&&(n.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(e(t),l),this._autoSize(l),this._setDate(l,a),this._updateAlternate(l),this._updateDatepicker(l)),void 0)},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(t){var i,s,n,a=e.datepicker._getInst(t.target),o=!0,r=a.dpDiv.is(".ui-datepicker-rtl");if(a._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;case 13:return n=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",a.dpDiv),n[0]&&e.datepicker._selectDay(t.target,a.selectedMonth,a.selectedYear,n[0]),i=e.datepicker._get(a,"onSelect"),i?(s=e.datepicker._formatDate(a),i.apply(a.input?a.input[0]:null,[s,a])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(t){var i,s,n=e.datepicker._getInst(t.target);return e.datepicker._get(n,"constrainInput")?(i=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(t){var i,s=e.datepicker._getInst(t.target);if(s.input.val()!==s.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,e.datepicker._getFormatConfig(s)),i&&(e.datepicker._setDateFromField(s),e.datepicker._updateAlternate(s),e.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var i,n,a,o,h,l,u;i=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==i&&(e.datepicker._curInst.dpDiv.stop(!0,!0),i&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),n=e.datepicker._get(i,"beforeShow"),a=n?n.apply(t,[t,i]):{},a!==!1&&(r(i.settings,a),i.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(i),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),o=!1,e(t).parents().each(function(){return o|="fixed"===e(this).css("position"),!o}),h={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(i),h=e.datepicker._checkOffset(i,h,o),i.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":o?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),i.inline||(l=e.datepicker._get(i,"showAnim"),u=e.datepicker._get(i,"duration"),i.dpDiv.css("z-index",s(e(t))+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[l]?i.dpDiv.show(l,e.datepicker._get(i,"showOptions"),u):i.dpDiv[l||"show"](l?u:null),e.datepicker._shouldFocusInput(i)&&i.input.focus(),e.datepicker._curInst=i))}},_updateDatepicker:function(t){this.maxRows=4,v=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var i,s=this._getNumberOfMonths(t),n=s[1],a=17,r=t.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&o.apply(r.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&t.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),t.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,i,s){var n=t.dpDiv.outerWidth(),a=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,r=t.input?t.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:e(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?n-o:0,i.left-=s&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=s&&i.top===t.input.offset().top+r?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+a>l&&l>a?Math.abs(a+r):0),i},_findPos:function(t){for(var i,s=this._getInst(t),n=this._get(s,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[n?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},_hideDatepicker:function(t){var i,s,n,a,o=this._curInst;!o||t&&o!==e.data(t,"datepicker")||this._datepickerShowing&&(i=this._get(o,"showAnim"),s=this._get(o,"duration"),n=function(){e.datepicker._tidyDialog(o)},e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),s,n):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,a=this._get(o,"onClose"),a&&a.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),s=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==s)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,i,s){var n=e(t),a=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(a,i+("M"===s?this._get(a,"showCurrentAtPos"):0),s),this._updateDatepicker(a))},_gotoToday:function(t){var i,s=e(t),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(t,i,s){var n=e(t),a=this._getInst(n[0]);a["selected"+("M"===s?"Month":"Year")]=a["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(a),this._adjustDate(n)},_selectDay:function(t,i,s,n){var a,o=e(t);e(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||(a=this._getInst(o[0]),a.selectedDay=a.currentDay=e("a",n).html(),a.selectedMonth=a.currentMonth=i,a.selectedYear=a.currentYear=s,this._selectDate(t,this._formatDate(a,a.currentDay,a.currentMonth,a.currentYear)))},_clearDate:function(t){var i=e(t);this._selectDate(i,"")},_selectDate:function(t,i){var s,n=e(t),a=this._getInst(n[0]);i=null!=i?i:this._formatDate(a),a.input&&a.input.val(i),this._updateAlternate(a),s=this._get(a,"onSelect"),s?s.apply(a.input?a.input[0]:null,[i,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=typeof a.input[0]&&a.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var i,s,n,a=this._get(t,"altField");a&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),s=this._getDate(t),n=this.formatDate(i,s,this._getFormatConfig(t)),e(a).each(function(){e(this).val(n)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},parseDate:function(t,i,s){if(null==t||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,a,o,r,h=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),d=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,c=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,y=-1,b=!1,_=function(e){var i=t.length>n+1&&t.charAt(n+1)===e;return i&&n++,i},x=function(e){var t=_(e),s="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,n="y"===e?s:1,a=RegExp("^\\d{"+n+","+s+"}"),o=i.substring(h).match(a);if(!o)throw"Missing number at position "+h;return h+=o[0].length,parseInt(o[0],10)},w=function(t,s,n){var a=-1,o=e.map(_(t)?n:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(o,function(e,t){var s=t[1];return i.substr(h,s.length).toLowerCase()===s.toLowerCase()?(a=t[0],h+=s.length,!1):void 0}),-1!==a)return a+1;throw"Unknown name at position "+h},k=function(){if(i.charAt(h)!==t.charAt(n))throw"Unexpected literal at position "+h;h++};for(n=0;t.length>n;n++)if(b)"'"!==t.charAt(n)||_("'")?k():b=!1;else switch(t.charAt(n)){case"d":v=x("d");break;case"D":w("D",d,c);break;case"o":y=x("o");break;case"m":g=x("m");break;case"M":g=w("M",p,f);break;case"y":m=x("y");break;case"@":r=new Date(x("@")),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"!":r=new Date((x("!")-this._ticksTo1970)/1e4),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"'":_("'")?k():b=!0;break;default:k()}if(i.length>h&&(o=i.substr(h),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=m?0:-100)),y>-1)for(g=1,v=y;;){if(a=this._getDaysInMonth(m,g-1),a>=v)break;g++,v-=a}if(r=this._daylightSavingAdjust(new Date(m,g-1,v)),r.getFullYear()!==m||r.getMonth()+1!==g||r.getDate()!==v)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,i){if(!t)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,a=(i?i.dayNames:null)||this._defaults.dayNames,o=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function(t){var i=e.length>s+1&&e.charAt(s+1)===t;return i&&s++,i},l=function(e,t,i){var s=""+t;if(h(e))for(;i>s.length;)s="0"+s;return s},u=function(e,t,i,s){return h(e)?s[t]:i[t]},d="",c=!1;if(t)for(s=0;e.length>s;s++)if(c)"'"!==e.charAt(s)||h("'")?d+=e.charAt(s):c=!1;else switch(e.charAt(s)){case"d":d+=l("d",t.getDate(),2);break;case"D":d+=u("D",t.getDay(),n,a);break;case"o":d+=l("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":d+=l("m",t.getMonth()+1,2);break;case"M":d+=u("M",t.getMonth(),o,r);break;case"y":d+=h("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case"@":d+=t.getTime();break;case"!":d+=1e4*t.getTime()+this._ticksTo1970;break;case"'":h("'")?d+="'":c=!0;break;default:d+=e.charAt(s)}return d},_possibleChars:function(e){var t,i="",s=!1,n=function(i){var s=e.length>t+1&&e.charAt(t+1)===i;return s&&t++,s};for(t=0;e.length>t;t++)if(s)"'"!==e.charAt(t)||n("'")?i+=e.charAt(t):s=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=e.charAt(t)}return i},_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),s=e.lastVal=e.input?e.input.val():null,n=this._getDefaultDate(e),a=n,o=this._getFormatConfig(e);try{a=this.parseDate(i,s,o)||n}catch(r){s=t?"":s}e.selectedDay=a.getDate(),e.drawMonth=e.selectedMonth=a.getMonth(),e.drawYear=e.selectedYear=a.getFullYear(),e.currentDay=s?a.getDate():0,e.currentMonth=s?a.getMonth():0,e.currentYear=s?a.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,i,s){var n=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},a=function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,a=n.getFullYear(),o=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":o+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o));break;case"y":case"Y":a+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o))}l=h.exec(i)}return new Date(a,o,r)},o=null==i||""===i?s:"string"==typeof i?a(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return o=o&&"Invalid Date"==""+o?s:o,o&&(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0)),this._daylightSavingAdjust(o)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var s=!t,n=e.selectedMonth,a=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),n===e.selectedMonth&&a===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(s?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var i=this._get(t,"stepMonths"),s="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(s,-i,"M")},next:function(){e.datepicker._adjustDate(s,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(s)},selectDay:function(){return e.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(s,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,i,s,n,a,o,r,h,l,u,d,c,p,f,m,g,v,y,b,_,x,w,k,T,D,S,M,C,N,A,P,I,H,z,F,E,O,j,W,L=new Date,R=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),Y=this._get(e,"isRTL"),B=this._get(e,"showButtonPanel"),J=this._get(e,"hideIfNoPrevNext"),q=this._get(e,"navigationAsDateFormat"),K=this._getNumberOfMonths(e),V=this._get(e,"showCurrentAtPos"),U=this._get(e,"stepMonths"),Q=1!==K[0]||1!==K[1],G=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),X=this._getMinMaxDate(e,"min"),$=this._getMinMaxDate(e,"max"),Z=e.drawMonth-V,et=e.drawYear;if(0>Z&&(Z+=12,et--),$)for(t=this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth()-K[0]*K[1]+1,$.getDate())),t=X&&X>t?X:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=q?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-U,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":J?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(e,"nextText"),n=q?this.formatDate(n,this._daylightSavingAdjust(new Date(et,Z+U,1)),this._getFormatConfig(e)):n,a=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":J?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",o=this._get(e,"currentText"),r=this._get(e,"gotoCurrent")&&e.currentDay?G:R,o=q?this.formatDate(o,r,this._getFormatConfig(e)):o,h=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",l=B?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(e,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(Y?"":h)+"</div>":"",u=parseInt(this._get(e,"firstDay"),10),u=isNaN(u)?0:u,d=this._get(e,"showWeek"),c=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),f=this._get(e,"monthNames"),m=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),v=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),_="",w=0;K[0]>w;w++){for(k="",this.maxRows=4,T=0;K[1]>T;T++){if(D=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),S=" ui-corner-all",M="",Q){if(M+="<div class='ui-datepicker-group",K[1]>1)switch(T){case 0:M+=" ui-datepicker-group-first",S=" ui-corner-"+(Y?"right":"left");break;case K[1]-1:M+=" ui-datepicker-group-last",S=" ui-corner-"+(Y?"left":"right");break;default:M+=" ui-datepicker-group-middle",S=""}M+="'>"}for(M+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+S+"'>"+(/all|left/.test(S)&&0===w?Y?a:s:"")+(/all|right/.test(S)&&0===w?Y?s:a:"")+this._generateMonthYearHeader(e,Z,et,X,$,w>0||T>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",C=d?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",x=0;7>x;x++)N=(x+u)%7,C+="<th scope='col'"+((x+u+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+c[N]+"'>"+p[N]+"</span></th>";for(M+=C+"</tr></thead><tbody>",A=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,A)),P=(this._getFirstDayOfMonth(et,Z)-u+7)%7,I=Math.ceil((P+A)/7),H=Q?this.maxRows>I?this.maxRows:I:I,this.maxRows=H,z=this._daylightSavingAdjust(new Date(et,Z,1-P)),F=0;H>F;F++){for(M+="<tr>",E=d?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(z)+"</td>":"",x=0;7>x;x++)O=g?g.apply(e.input?e.input[0]:null,[z]):[!0,""],j=z.getMonth()!==Z,W=j&&!y||!O[0]||X&&X>z||$&&z>$,E+="<td class='"+((x+u+6)%7>=5?" ui-datepicker-week-end":"")+(j?" ui-datepicker-other-month":"")+(z.getTime()===D.getTime()&&Z===e.selectedMonth&&e._keyEvent||b.getTime()===z.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(W?" "+this._unselectableClass+" ui-state-disabled":"")+(j&&!v?"":" "+O[1]+(z.getTime()===G.getTime()?" "+this._currentClass:"")+(z.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(j&&!v||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(W?"":" data-handler='selectDay' data-event='click' data-month='"+z.getMonth()+"' data-year='"+z.getFullYear()+"'")+">"+(j&&!v?"&#xa0;":W?"<span class='ui-state-default'>"+z.getDate()+"</span>":"<a class='ui-state-default"+(z.getTime()===R.getTime()?" ui-state-highlight":"")+(z.getTime()===G.getTime()?" ui-state-active":"")+(j?" ui-priority-secondary":"")+"' href='#'>"+z.getDate()+"</a>")+"</td>",z.setDate(z.getDate()+1),z=this._daylightSavingAdjust(z);M+=E+"</tr>"}Z++,Z>11&&(Z=0,et++),M+="</tbody></table>"+(Q?"</div>"+(K[0]>0&&T===K[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),k+=M}_+=k}return _+=l,e._keyEvent=!1,_},_generateMonthYearHeader:function(e,t,i,s,n,a,o,r){var h,l,u,d,c,p,f,m,g=this._get(e,"changeMonth"),v=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",_="";if(a||!g)_+="<span class='ui-datepicker-month'>"+o[t]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,_+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",u=0;12>u;u++)(!h||u>=s.getMonth())&&(!l||n.getMonth()>=u)&&(_+="<option value='"+u+"'"+(u===t?" selected='selected'":"")+">"+r[u]+"</option>");_+="</select>"}if(y||(b+=_+(!a&&g&&v?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",a||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(d=this._get(e,"yearRange").split(":"),c=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?c+parseInt(e,10):parseInt(e,10);return isNaN(t)?c:t},f=p(d[0]),m=Math.max(f,p(d[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)e.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null}return b+=this._get(e,"yearSuffix"),y&&(b+=(!a&&g&&v?"":"&#xa0;")+_),b+="</div>"},_adjustInstDate:function(e,t,i){var s=e.drawYear+("Y"===i?t:0),n=e.drawMonth+("M"===i?t:0),a=Math.min(e.selectedDay,this._getDaysInMonth(s,n))+("D"===i?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(s,n,a)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),n=i&&i>t?i:t;return s&&n>s?s:n},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,s){var n=this._getNumberOfMonths(e),a=this._daylightSavingAdjust(new Date(i,s+(0>t?t:n[0]*n[1]),1));return 0>t&&a.setDate(this._getDaysInMonth(a.getFullYear(),a.getMonth())),this._isInRange(e,a)},_isInRange:function(e,t){var i,s,n=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),o=null,r=null,h=this._get(e,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),o=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(o+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||t.getTime()>=n.getTime())&&(!a||t.getTime()<=a.getTime())&&(!o||t.getFullYear()>=o)&&(!r||r>=t.getFullYear())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,s){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var n=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(s,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),n,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new n,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.11.4",e.datepicker,e.widget("ui.dialog",{version:"1.11.4",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"Close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var i=e(this).css(t).offset().top;0>i&&e(this).css("top",t.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0)},_destroy:function(){var e,t=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:e.noop,enable:e.noop,close:function(t){var i,s=this;if(this._isOpen&&this._trigger("beforeClose",t)!==!1){if(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),!this.opener.filter(":focusable").focus().length)try{i=this.document[0].activeElement,i&&"body"!==i.nodeName.toLowerCase()&&e(i).blur()}catch(n){}this._hide(this.uiDialog,this.options.hide,function(){s._trigger("close",t)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return+e(this).css("z-index")}).get(),a=Math.max.apply(null,n);return a>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",a+1),s=!0),s&&!i&&this._trigger("focus",t),s},open:function(){var t=this;
return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=e(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"),void 0)},_focusTabbable:function(){var e=this._focusedElement;e||(e=this.element.find("[autofocus]")),e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).focus()},_keepFocus:function(t){function i(){var t=this.document[0].activeElement,i=this.uiDialog[0]===t||e.contains(this.uiDialog[0],t);i||this._focusTabbable()}t.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),this.close(t),void 0;if(t.keyCode===e.ui.keyCode.TAB&&!t.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");t.target!==n[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==s[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay(function(){n.focus()}),t.preventDefault()):(this._delay(function(){s.focus()}),t.preventDefault())}},mousedown:function(e){this._moveToTop(e)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(t){e(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=e("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(e){e.preventDefault(),this.close(e)}}),t=e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(t),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(e){this.options.title||e.html("&#160;"),e.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var t=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(i)||e.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),void 0):(e.each(i,function(i,s){var n,a;s=e.isFunction(s)?{click:s,text:i}:s,s=e.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(t.element[0],arguments)},a={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,e("<button></button>",s).button(a).appendTo(t.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0)},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){e(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,t(n))},drag:function(e,s){i._trigger("drag",e,t(s))},stop:function(n,a){var o=a.offset.left-i.document.scrollLeft(),r=a.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(o>=0?"+":"")+o+" "+"top"+(r>=0?"+":"")+r,of:i.window},e(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,t(a))}})},_makeResizable:function(){function t(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}var i=this,s=this.options,n=s.resizable,a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function(s,n){e(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,t(n))},resize:function(e,s){i._trigger("resize",e,t(s))},stop:function(n,a){var o=i.uiDialog.offset(),r=o.left-i.document.scrollLeft(),h=o.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(h>=0?"+":"")+h,of:i.window},e(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,t(a))}}).css("position",a)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=e(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),i=e.inArray(this,t);-1!==i&&t.splice(i,1)},_trackingInstances:function(){var e=this.document.data("ui-dialog-instances");return e||(e=[],this.document.data("ui-dialog-instances",e)),e},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide()},_setOptions:function(t){var i=this,s=!1,n={};e.each(t,function(e,t){i._setOption(e,t),e in i.sizeRelatedOptions&&(s=!0),e in i.resizableRelatedOptions&&(n[e]=t)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(e,t){var i,s,n=this.uiDialog;"dialogClass"===e&&n.removeClass(this.options.dialogClass).addClass(t),"disabled"!==e&&(this._super(e,t),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:""+t}),"draggable"===e&&(i=n.is(":data(ui-draggable)"),i&&!t&&n.draggable("destroy"),!i&&t&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(s=n.is(":data(ui-resizable)"),s&&!t&&n.resizable("destroy"),s&&"string"==typeof t&&n.resizable("option","handles",t),s||t===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var e,t,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),e=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),t=Math.max(0,s.minHeight-e),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-e):"none","auto"===s.height?this.element.css({minHeight:t,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=!0;this._delay(function(){t=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(e){t||this._allowInteraction(e)||(e.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var e=this.document.data("ui-dialog-overlays")-1;e?this.document.data("ui-dialog-overlays",e):this.document.unbind("focusin").removeData("ui-dialog-overlays"),this.overlay.remove(),this.overlay=null}}}),e.widget("ui.progressbar",{version:"1.11.4",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return void 0===e?this.options.value:(this.options.value=this._constrainedValue(e),this._refreshValue(),void 0)},_constrainedValue:function(e){return void 0===e&&(e=this.options.value),this.indeterminate=e===!1,"number"!=typeof e&&(e=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,e))},_setOptions:function(e){var t=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(t),this._refreshValue()},_setOption:function(e,t){"max"===e&&(t=Math.max(this.min,t)),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var t=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).toggleClass("ui-corner-right",t===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete")}}),e.widget("ui.selectmenu",{version:"1.11.4",defaultElement:"<select>",options:{appendTo:null,disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:null,change:null,close:null,focus:null,open:null,select:null},_create:function(){var e=this.element.uniqueId().attr("id");this.ids={element:e,button:e+"-button",menu:e+"-menu"},this._drawButton(),this._drawMenu(),this.options.disabled&&this.disable()},_drawButton:function(){var t=this;this.label=e("label[for='"+this.ids.element+"']").attr("for",this.ids.button),this._on(this.label,{click:function(e){this.button.focus(),e.preventDefault()}}),this.element.hide(),this.button=e("<span>",{"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all",tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true"}).insertAfter(this.element),e("<span>",{"class":"ui-icon "+this.options.icons.button}).prependTo(this.button),this.buttonText=e("<span>",{"class":"ui-selectmenu-text"}).appendTo(this.button),this._setText(this.buttonText,this.element.find("option:selected").text()),this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){t.menuItems||t._refreshMenu()}),this._hoverable(this.button),this._focusable(this.button)},_drawMenu:function(){var t=this;this.menu=e("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=e("<div>",{"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()),this.menuInstance=this.menu.menu({role:"listbox",select:function(e,i){e.preventDefault(),t._setSelection(),t._select(i.item.data("ui-selectmenu-item"),e)},focus:function(e,i){var s=i.item.data("ui-selectmenu-item");null!=t.focusIndex&&s.index!==t.focusIndex&&(t._trigger("focus",e,{item:s}),t.isOpen||t._select(s,e)),t.focusIndex=s.index,t.button.attr("aria-activedescendant",t.menuItems.eq(s.index).attr("id"))}}).menu("instance"),this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this._setText(this.buttonText,this._getSelectedItem().text()),this.options.width||this._resizeButton()},_refreshMenu:function(){this.menu.empty();var e,t=this.element.find("option");t.length&&(this._parseOptions(t),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup"),e=this._getSelectedItem(),this.menuInstance.focus(null,e),this._setAria(e.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(e){this.options.disabled||(this.menuItems?(this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",e))},_position:function(){this.menuWrap.position(e.extend({of:this.button},this.options.position))},close:function(e){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",e))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderMenu:function(t,i){var s=this,n="";e.each(i,function(i,a){a.optgroup!==n&&(e("<li>",{"class":"ui-selectmenu-optgroup ui-menu-divider"+(a.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""),text:a.optgroup}).appendTo(t),n=a.optgroup),s._renderItemData(t,a)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-selectmenu-item",t)},_renderItem:function(t,i){var s=e("<li>");return i.disabled&&s.addClass("ui-state-disabled"),this._setText(s,i.label),s.appendTo(t)},_setText:function(e,t){t?e.text(t):e.html("&#160;")},_move:function(e,t){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex):(i=this.menuItems.eq(this.element[0].selectedIndex),n+=":not(.ui-state-disabled)"),s="first"===e||"last"===e?i["first"===e?"prevAll":"nextAll"](n).eq(-1):i[e+"All"](n).eq(0),s.length&&this.menuInstance.focus(t,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex)},_toggle:function(e){this[this.isOpen?"close":"open"](e)},_setSelection:function(){var e;this.range&&(window.getSelection?(e=window.getSelection(),e.removeAllRanges(),e.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(t){this.isOpen&&(e(t.target).closest(".ui-selectmenu-menu, #"+this.ids.button).length||this.close(t))}},_buttonEvents:{mousedown:function(){var e;window.getSelection?(e=window.getSelection(),e.rangeCount&&(this.range=e.getRangeAt(0))):this.range=document.selection.createRange()},click:function(e){this._setSelection(),this._toggle(e)},keydown:function(t){var i=!0;switch(t.keyCode){case e.ui.keyCode.TAB:case e.ui.keyCode.ESCAPE:this.close(t),i=!1;break;case e.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(t);break;case e.ui.keyCode.UP:t.altKey?this._toggle(t):this._move("prev",t);break;case e.ui.keyCode.DOWN:t.altKey?this._toggle(t):this._move("next",t);break;case e.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(t):this._toggle(t);break;case e.ui.keyCode.LEFT:this._move("prev",t);break;case e.ui.keyCode.RIGHT:this._move("next",t);break;case e.ui.keyCode.HOME:case e.ui.keyCode.PAGE_UP:this._move("first",t);break;case e.ui.keyCode.END:case e.ui.keyCode.PAGE_DOWN:this._move("last",t);break;default:this.menu.trigger(t),i=!1}i&&t.preventDefault()}},_selectFocusedItem:function(e){var t=this.menuItems.eq(this.focusIndex);t.hasClass("ui-state-disabled")||this._select(t.data("ui-selectmenu-item"),e)},_select:function(e,t){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=e.index,this._setText(this.buttonText,e.label),this._setAria(e),this._trigger("select",t,{item:e}),e.index!==i&&this._trigger("change",t,{item:e}),this.close(t)},_setAria:function(e){var t=this.menuItems.eq(e.index).attr("id");this.button.attr({"aria-labelledby":t,"aria-activedescendant":t}),this.menu.attr("aria-activedescendant",t)},_setOption:function(e,t){"icons"===e&&this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(t.button),this._super(e,t),"appendTo"===e&&this.menuWrap.appendTo(this._appendTo()),"disabled"===e&&(this.menuInstance.option("disabled",t),this.button.toggleClass("ui-state-disabled",t).attr("aria-disabled",t),this.element.prop("disabled",t),t?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)),"width"===e&&this._resizeButton()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_toggleAttr:function(){this.button.toggleClass("ui-corner-top",this.isOpen).toggleClass("ui-corner-all",!this.isOpen).attr("aria-expanded",this.isOpen),this.menuWrap.toggleClass("ui-selectmenu-open",this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var e=this.options.width;e||(e=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(e)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){return{disabled:this.element.prop("disabled")}},_parseOptions:function(t){var i=[];t.each(function(t,s){var n=e(s),a=n.parent("optgroup");i.push({element:n,index:t,value:n.val(),label:n.text(),optgroup:a.attr("label")||"",disabled:a.prop("disabled")||n.prop("disabled")})}),this.items=i},_destroy:function(){this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.label.attr("for",this.ids.element)}}),e.widget("ui.slider",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),t=n.length;i>t;t++)o.push(a);this.handles=n.add(e(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)})},_createRange:function(){var t=this.options,i="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var i,s,n,a,o,r,h,l,u=this,d=this.options;return d.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(n>i||n===i&&(t===u._lastChangedValue||u.values(t)===d.min))&&(n=i,a=e(this),o=t)}),r=this._start(t,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-a.width()/2,top:t.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,n,a;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(n=this.values(),n[t]=i,a=this._trigger("slide",e,{handle:this.handles[t],value:i,values:n}),s=this.values(t?0:1),a!==!1&&this.values(t,i))):i!==this.value()&&(a=this._trigger("slide",e,{handle:this.handles[t],value:i}),a!==!1&&this.value(i))},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(t,i){var s,n,a;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),void 0;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(t,i){var s,n=0;switch("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(n=this.options.values.length),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!i),this._super(t,i),t){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var e=this.options.max,t=this._valueMin(),i=this.options.step,s=Math.floor(+(e-t).toFixed(this._precision())/i)*i;e=s+t,this.max=parseFloat(e.toFixed(this._precision()))},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var t,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:r.animate}))),t=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(t){var i,s,n,a,o=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(t.target).addClass("ui-state-active"),i=this._start(t,o),i===!1))return}switch(a=this.options.step,s=n=this.options.values&&this.options.values.length?this.values(o):this.value(),t.keyCode){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+a);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-a)}this._slide(t,o,n)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"))}}}),e.widget("ui.spinner",{version:"1.11.4",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},i=this.element;return e.each(["min","max","step"],function(e,s){var n=i.attr(s);void 0!==n&&n.length&&(t[s]=n)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e),void 0)},mousewheel:function(e,t){if(t){if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()}},"mousedown .ui-spinner-button":function(t){function i(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(t)!==!1&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t)===!1?!1:(this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*e.height())&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()
},_keydown:function(t){var i=this.options,s=e.ui.keyCode;switch(t.keyCode){case s.UP:return this._repeat(null,1,t),!0;case s.DOWN:return this._repeat(null,-1,t),!0;case s.PAGE_UP:return this._repeat(null,i.page,t),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(e){return this.spinning||this._trigger("start",e)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(e,t,i){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,i)},e),this._spin(t*this.options.step,i)},_spin:function(e,t){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+e*this._increment(this.counter)),this.spinning&&this._trigger("spin",t,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_adjustValue:function(e){var t,i,s=this.options;return t=null!==s.min?s.min:0,i=e-t,i=Math.round(i/s.step)*s.step,e=t+i,e=parseFloat(e.toFixed(this._precision())),null!==s.max&&e>s.max?s.max:null!==s.min&&s.min>e?s.min:e},_stop:function(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e))},_setOption:function(e,t){if("culture"===e||"numberFormat"===e){var i=this._parse(this.element.val());return this.options[e]=t,this.element.val(this._format(i)),void 0}("max"===e||"min"===e||"step"===e)&&"string"==typeof t&&(t=this._parse(t)),"icons"===e&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)),this._super(e,t),"disabled"===e&&(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable"))},_setOptions:h(function(e){this._super(e)}),_parse:function(e){return"string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e},_format:function(e){return""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var e=this.value();return null===e?!1:e===this._adjustValue(e)},_value:function(e,t){var i;""!==e&&(i=this._parse(e),null!==i&&(t||(i=this._adjustValue(i)),e=this._format(i))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:h(function(e){this._stepUp(e)}),_stepUp:function(e){this._start()&&(this._spin((e||1)*this.options.step),this._stop())},stepDown:h(function(e){this._stepDown(e)}),_stepDown:function(e){this._start()&&(this._spin((e||1)*-this.options.step),this._stop())},pageUp:h(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:h(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){return arguments.length?(h(this._value).call(this,e),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}}),e.widget("ui.tabs",{version:"1.11.4",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var e=/#.*$/;return function(t){var i,s;t=t.cloneNode(!1),i=t.href.replace(e,""),s=location.href.replace(e,"");try{i=decodeURIComponent(i)}catch(n){}try{s=decodeURIComponent(s)}catch(n){}return t.hash.length>1&&i===s}}(),_create:function(){var t=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible),this._processTabs(),i.active=this._initialActive(),e.isArray(i.disabled)&&(i.disabled=e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):e(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var t=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===t&&(s&&this.tabs.each(function(i,n){return e(n).attr("aria-controls")===s?(t=i,!1):void 0}),null===t&&(t=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===t||-1===t)&&(t=this.tabs.length?0:!1)),t!==!1&&(t=this.tabs.index(this.tabs.eq(t)),-1===t&&(t=i?!1:0)),!i&&t===!1&&this.anchors.length&&(t=0),t},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var i=e(this.document[0].activeElement).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:s++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n=!1,s--;break;case e.ui.keyCode.END:s=this.anchors.length-1;break;case e.ui.keyCode.HOME:s=0;break;case e.ui.keyCode.SPACE:return t.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case e.ui.keyCode.ENTER:return t.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return}t.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),t.ctrlKey||t.metaKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(t){return t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,i){function s(){return t>n&&(t=0),0>t&&(t=n),t}for(var n=this.tabs.length-1;-1!==e.inArray(s(),this.options.disabled);)t=i?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):"disabled"===e?(this._setupDisabled(t),void 0):(this._super(e,t),"collapsible"===e&&(this.element.toggleClass("ui-tabs-collapsible",t),t||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(t),"heightStyle"===e&&this._setupHeightStyle(t),void 0)},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,i=this.tablist.children(":has(a[href])");t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e)}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(i,s){var n,a,o,r=e(s).uniqueId().attr("id"),h=e(s).closest("li"),l=h.attr("aria-controls");t._isLocal(s)?(n=s.hash,o=n.substring(1),a=t.element.find(t._sanitizeSelector(n))):(o=h.attr("aria-controls")||e({}).uniqueId()[0].id,n="#"+o,a=t.element.find(n),a.length||(a=t._createPanel(o),a.insertAfter(t.panels[i-1]||t.tablist)),a.attr("aria-live","polite")),a.length&&(t.panels=t.panels.add(a)),l&&h.data("ui-tabs-aria-controls",l),h.attr({"aria-controls":o,"aria-labelledby":r}),a.attr("aria-labelledby",r)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(n.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var i,s=0;i=this.tabs[s];s++)t===!0||-1!==e.inArray(s,t)?e(i).addClass("ui-state-disabled").attr("aria-disabled","true"):e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var i={};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(e){e.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,s=this.element.parent();"fill"===t?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=e(this),s=t.css("position");"absolute"!==s&&"fixed"!==s&&(i-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,e(this).height("").height())}).height(i))},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n.closest("li"),o=a[0]===s[0],r=o&&i.collapsible,h=r?e():this._getPanelForTab(a),l=s.length?this._getPanelForTab(s):e(),u={oldTab:s,oldPanel:l,newTab:r?e():a,newPanel:h};t.preventDefault(),a.hasClass("ui-state-disabled")||a.hasClass("ui-tabs-loading")||this.running||o&&!i.collapsible||this._trigger("beforeActivate",t,u)===!1||(i.active=r?!1:this.tabs.index(a),this.active=o?e():a,this.xhr&&this.xhr.abort(),l.length||h.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(a),t),this._toggle(t,u))},_toggle:function(t,i){function s(){a.running=!1,a._trigger("activate",t,i)}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),o.length&&a.options.show?a._show(o,a.options.show,s):(o.show(),s())}var a=this,o=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),n()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),n()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),o.length&&r.length?i.oldTab.attr("tabIndex",-1):o.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),o.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(t){var i,s=this._findActive(t);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(t){var i=this.options.disabled;i!==!1&&(void 0===t?i=!1:(t=this._getIndex(t),i=e.isArray(i)?e.map(i,function(e){return e!==t?e:null}):e.map(this.tabs,function(e,i){return i!==t?i:null})),this._setupDisabled(i))},disable:function(t){var i=this.options.disabled;if(i!==!0){if(void 0===t)i=!0;else{if(t=this._getIndex(t),-1!==e.inArray(t,i))return;i=e.isArray(i)?e.merge([t],i).sort():[t]}this._setupDisabled(i)}},load:function(t,i){t=this._getIndex(t);var s=this,n=this.tabs.eq(t),a=n.find(".ui-tabs-anchor"),o=this._getPanelForTab(n),r={tab:n,panel:o},h=function(e,t){"abort"===t&&s.panels.stop(!1,!0),n.removeClass("ui-tabs-loading"),o.removeAttr("aria-busy"),e===s.xhr&&delete s.xhr};this._isLocal(a[0])||(this.xhr=e.ajax(this._ajaxSettings(a,i,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(n.addClass("ui-tabs-loading"),o.attr("aria-busy","true"),this.xhr.done(function(e,t,n){setTimeout(function(){o.html(e),s._trigger("load",i,r),h(n,t)},1)}).fail(function(e,t){setTimeout(function(){h(e,t)},1)})))},_ajaxSettings:function(t,i,s){var n=this;return{url:t.attr("href"),beforeSend:function(t,a){return n._trigger("beforeLoad",i,e.extend({jqXHR:t,ajaxSettings:a},s))}}},_getPanelForTab:function(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}}),e.widget("ui.tooltip",{version:"1.11.4",options:{content:function(){var t=e(this).attr("title")||"";return e("<a>").text(t).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_addDescribedBy:function(t,i){var s=(t.attr("aria-describedby")||"").split(/\s+/);s.push(i),t.data("ui-tooltip-id",i).attr("aria-describedby",e.trim(s.join(" ")))},_removeDescribedBy:function(t){var i=t.data("ui-tooltip-id"),s=(t.attr("aria-describedby")||"").split(/\s+/),n=e.inArray(i,s);-1!==n&&s.splice(n,1),t.removeData("ui-tooltip-id"),s=e.trim(s.join(" ")),s?t.attr("aria-describedby",s):t.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable(),this.liveRegion=e("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)},_setOption:function(t,i){var s=this;return"disabled"===t?(this[i?"_disable":"_enable"](),this.options[t]=i,void 0):(this._super(t,i),"content"===t&&e.each(this.tooltips,function(e,t){s._updateContent(t.element)}),void 0)},_disable:function(){var t=this;e.each(this.tooltips,function(i,s){var n=e.Event("blur");n.target=n.currentTarget=s.element[0],t.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).removeAttr("title")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var i=this,s=e(t?t.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&s.parents().each(function(){var t,s=e(this);s.data("ui-tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,i.close(t,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._registerCloseHandlers(t,s),this._updateContent(s,t))},_updateContent:function(e,t){var i,s=this.options.content,n=this,a=t?t.type:null;return"string"==typeof s?this._open(t,e,s):(i=s.call(e[0],function(i){n._delay(function(){e.data("ui-tooltip-open")&&(t&&(t.type=a),this._open(t,e,i))})}),i&&this._open(t,e,i),void 0)},_open:function(t,i,s){function n(e){l.of=e,o.is(":hidden")||o.position(l)}var a,o,r,h,l=e.extend({},this.options.position);if(s){if(a=this._find(i))return a.tooltip.find(".ui-tooltip-content").html(s),void 0;i.is("[title]")&&(t&&"mouseover"===t.type?i.attr("title",""):i.removeAttr("title")),a=this._tooltip(i),o=a.tooltip,this._addDescribedBy(i,o.attr("id")),o.find(".ui-tooltip-content").html(s),this.liveRegion.children().hide(),s.clone?(h=s.clone(),h.removeAttr("id").find("[id]").removeAttr("id")):h=s,e("<div>").html(h).appendTo(this.liveRegion),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:n}),n(t)):o.position(e.extend({of:i},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(r=this.delayedShow=setInterval(function(){o.is(":visible")&&(n(l.of),clearInterval(r))},e.fx.interval)),this._trigger("open",t,{tooltip:o})}},_registerCloseHandlers:function(t,i){var s={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var s=e.Event(t);s.currentTarget=i[0],this.close(s,!0)}}};i[0]!==this.element[0]&&(s.remove=function(){this._removeTooltip(this._find(i).tooltip)}),t&&"mouseover"!==t.type||(s.mouseleave="close"),t&&"focusin"!==t.type||(s.focusout="close"),this._on(!0,i,s)},close:function(t){var i,s=this,n=e(t?t.currentTarget:this.element),a=this._find(n);return a?(i=a.tooltip,a.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),a.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){s._removeTooltip(e(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&e.each(this.parents,function(t,i){e(i.element).attr("title",i.title),delete s.parents[t]}),a.closing=!0,this._trigger("close",t,{tooltip:i}),a.hiding||(a.closing=!1)),void 0):(n.removeData("ui-tooltip-open"),void 0)},_tooltip:function(t){var i=e("<div>").attr("role","tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||"")),s=i.uniqueId().attr("id");return e("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),this.tooltips[s]={element:t,tooltip:i}},_find:function(e){var t=e.data("ui-tooltip-id");return t?this.tooltips[t]:null},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(i,s){var n=e.Event("blur"),a=s.element;n.target=n.currentTarget=a[0],t.close(n,!0),e("#"+i).remove(),a.data("ui-tooltip-title")&&(a.attr("title")||a.attr("title",a.data("ui-tooltip-title")),a.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}});var y="ui-effects-",b=e;e.effects={effect:{}},function(e,t){function i(e,t,i){var s=d[t.type]||{};return null==e?i||!t.def?null:t.def:(e=s.floor?~~e:parseFloat(e),isNaN(e)?t.def:s.mod?(e+s.mod)%s.mod:0>e?0:e>s.max?s.max:e)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(e,a){var o,r=a.re.exec(i),h=r&&a.parse(r),l=a.space||"rgba";return h?(o=s[l](h),s[u[l].cache]=o[u[l].cache],n=s._rgba=o._rgba,!1):t}),n.length?("0,0,0,0"===n.join()&&e.extend(n,a.transparent),s):a[i]}function n(e,t,i){return i=(i+1)%1,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+6*(t-e)*(2/3-i):e}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],l=e.Color=function(t,i,s,n){return new e.Color.fn.parse(t,i,s,n)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},d={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},c=l.support={},p=e("<p>")[0],f=e.each;p.style.cssText="background-color:rgba(1,1,1,.5)",c.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),l.fn=e.extend(l.prototype,{parse:function(n,o,r,h){if(n===t)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=e(n).css(o),o=t);var d=this,c=e.type(n),p=this._rgba=[];return o!==t&&(n=[n,o,r,h],c="array"),"string"===c?this.parse(s(n)||a._default):"array"===c?(f(u.rgba.props,function(e,t){p[t.idx]=i(n[t.idx],t)}),this):"object"===c?(n instanceof l?f(u,function(e,t){n[t.cache]&&(d[t.cache]=n[t.cache].slice())}):f(u,function(t,s){var a=s.cache;f(s.props,function(e,t){if(!d[a]&&s.to){if("alpha"===e||null==n[e])return;d[a]=s.to(d._rgba)}d[a][t.idx]=i(n[e],t,!0)}),d[a]&&0>e.inArray(null,d[a].slice(0,3))&&(d[a][3]=1,s.from&&(d._rgba=s.from(d[a])))}),this):t},is:function(e){var i=l(e),s=!0,n=this;return f(u,function(e,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(e,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:t})),s}),s},_space:function(){var e=[],t=this;return f(u,function(i,s){t[s.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var s=l(e),n=s._space(),a=u[n],o=0===this.alpha()?l("transparent"):this,r=o[a.cache]||a.to(o._rgba),h=r.slice();return s=s[a.cache],f(a.props,function(e,n){var a=n.idx,o=r[a],l=s[a],u=d[n.type]||{};null!==l&&(null===o?h[a]=l:(u.mod&&(l-o>u.mod/2?o+=u.mod:o-l>u.mod/2&&(o-=u.mod)),h[a]=i((l-o)*t+o,n)))}),this[n](h)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(t)._rgba;return l(e.map(i,function(e,t){return(1-s)*n[t]+s*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),s=i.pop();return t&&i.push(~~(255*s)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,s=e[0]/255,n=e[1]/255,a=e[2]/255,o=e[3],r=Math.max(s,n,a),h=Math.min(s,n,a),l=r-h,u=r+h,d=.5*u;return t=h===r?0:s===r?60*(n-a)/l+360:n===r?60*(a-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=d?l/u:l/(2-u),[Math.round(t)%360,i,d,null==o?1:o]},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],s=e[2],a=e[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,t+1/3)),Math.round(255*n(r,o,t)),Math.round(255*n(r,o,t-1/3)),a]},f(u,function(s,n){var a=n.props,o=n.cache,h=n.to,u=n.from;l.fn[s]=function(s){if(h&&!this[o]&&(this[o]=h(this._rgba)),s===t)return this[o].slice();var n,r=e.type(s),d="array"===r||"object"===r?s:arguments,c=this[o].slice();return f(a,function(e,t){var s=d["object"===r?e:t.idx];null==s&&(s=c[t.idx]),c[t.idx]=i(s,t)}),u?(n=l(u(c)),n[o]=c,n):l(c)},f(a,function(t,i){l.fn[t]||(l.fn[t]=function(n){var a,o=e.type(n),h="alpha"===t?this._hsla?"hsla":"rgba":s,l=this[h](),u=l[i.idx];return"undefined"===o?u:("function"===o&&(n=n.call(this,u),o=e.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=u+parseFloat(a[2])*("+"===a[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(t){var i=t.split(" ");f(i,function(t,i){e.cssHooks[i]={set:function(t,n){var a,o,r="";if("transparent"!==n&&("string"!==e.type(n)||(a=s(n)))){if(n=l(a||n),!c.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?t.parentNode:t;(""===r||"transparent"===r)&&o&&o.style;)try{r=e.css(o,"backgroundColor"),o=o.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{t.style[i]=n}catch(h){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=l(t.elem,i),t.end=l(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},l.hook(o),e.cssHooks.borderColor={expand:function(e){var t={};return f(["Top","Right","Bottom","Left"],function(i,s){t["border"+s+"Color"]=e}),t}},a=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(b),function(){function t(t){var i,s,n=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[e.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function i(t,i){var s,a,o={};for(s in i)a=i[s],t[s]!==a&&(n[s]||(e.fx.step[s]||!isNaN(parseFloat(a)))&&(o[s]=a));return o}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(b.style(e.elem,i,e.end),e.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(n,a,o,r){var h=e.speed(a,o,r);return this.queue(function(){var a,o=e(this),r=o.attr("class")||"",l=h.children?o.find("*").addBack():o;l=l.map(function(){var i=e(this);return{el:i,start:t(this)}}),a=function(){e.each(s,function(e,t){n[t]&&o[t+"Class"](n[t])})},a(),l=l.map(function(){return this.end=t(this.el[0]),this.diff=i(this.start,this.end),this}),o.attr("class",r),l=l.map(function(){var t=this,i=e.Deferred(),s=e.extend({},h,{queue:!1,complete:function(){i.resolve(t)}});return this.el.animate(this.diff,s),i.promise()}),e.when.apply(e,l.get()).done(function(){a(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),h.complete.call(o[0])})})},e.fn.extend({addClass:function(t){return function(i,s,n,a){return s?e.effects.animateClass.call(this,{add:i},s,n,a):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(i,s,n,a){return arguments.length>1?e.effects.animateClass.call(this,{remove:i},s,n,a):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(i,s,n,a,o){return"boolean"==typeof s||void 0===s?n?e.effects.animateClass.call(this,s?{add:i}:{remove:i},n,a,o):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:i},s,n,a)}}(e.fn.toggleClass),switchClass:function(t,i,s,n,a){return e.effects.animateClass.call(this,{add:i,remove:t},s,n,a)}})}(),function(){function t(t,i,s,n){return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(n=s,s=i,i={}),e.isFunction(s)&&(n=s,s=null),i&&e.extend(t,i),s=s||i.duration,t.duration=e.fx.off?0:"number"==typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default,t.complete=n||i.complete,t}function i(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}e.extend(e.effects,{version:"1.11.4",save:function(e,t){for(var i=0;t.length>i;i++)null!==t[i]&&e.data(y+t[i],e[0].style[t[i]])},restore:function(e,t){var i,s;for(s=0;t.length>s;s++)null!==t[s]&&(i=e.data(y+t[s]),void 0===i&&(i=""),e.css(t[s],i))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var i,s;switch(e[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=e[0]/t.height}switch(e[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=e[1]/t.width}return{x:s,y:i}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var i={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:t.width(),height:t.height()},a=document.activeElement;try{a.id}catch(o){a=document.body}return t.wrap(s),(t[0]===a||e.contains(t[0],a))&&e(a).focus(),s=t.parent(),"static"===t.css("position")?(s.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,s){i[s]=t.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(n),s.css(i).show()},removeWrapper:function(t){var i=document.activeElement;
return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).focus()),t},setTransition:function(t,i,s,n){return n=n||{},e.each(i,function(e,i){var a=t.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),e.fn.extend({effect:function(){function i(t){function i(){e.isFunction(a)&&a.call(n[0]),e.isFunction(t)&&t()}var n=e(this),a=s.complete,r=s.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),i()):o.call(n[0],s,i)}var s=t.apply(this,arguments),n=s.mode,a=s.queue,o=e.effects.effect[s.effect];return e.fx.off||!o?n?this[n](s.duration,s.complete):this.each(function(){s.complete&&s.complete.call(this)}):a===!1?this.each(i):this.queue(a||"fx",i)},show:function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="show",this.effect.call(this,n)}}(e.fn.show),hide:function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(e.fn.hide),toggle:function(e){return function(s){if(i(s)||"boolean"==typeof s)return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(e.fn.toggle),cssUnit:function(t){var i=this.css(t),s=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(s=[parseFloat(i),t])}),s}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,i=4;((t=Math.pow(2,--i))-1)/11>e;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e)},e.easing["easeInOut"+t]=function(e){return.5>e?i(2*e)/2:1-i(-2*e+2)/2}})}(),e.effects,e.effects.effect.blind=function(t,i){var s,n,a,o=e(this),r=/up|down|vertical/,h=/up|left|vertical|horizontal/,l=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(o,t.mode||"hide"),d=t.direction||"up",c=r.test(d),p=c?"height":"width",f=c?"top":"left",m=h.test(d),g={},v="show"===u;o.parent().is(".ui-effects-wrapper")?e.effects.save(o.parent(),l):e.effects.save(o,l),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n=s[p](),a=parseFloat(s.css(f))||0,g[p]=v?n:0,m||(o.css(c?"bottom":"right",0).css(c?"top":"left","auto").css({position:"absolute"}),g[f]=v?a:n+a),v&&(s.css(p,0),m||s.css(f,a+n)),s.animate(g,{duration:t.duration,easing:t.easing,queue:!1,complete:function(){"hide"===u&&o.hide(),e.effects.restore(o,l),e.effects.removeWrapper(o),i()}})},e.effects.effect.bounce=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"effect"),l="hide"===h,u="show"===h,d=t.direction||"up",c=t.distance,p=t.times||5,f=2*p+(u||l?1:0),m=t.duration/f,g=t.easing,v="up"===d||"down"===d?"top":"left",y="up"===d||"left"===d,b=o.queue(),_=b.length;for((u||l)&&r.push("opacity"),e.effects.save(o,r),o.show(),e.effects.createWrapper(o),c||(c=o["top"===v?"outerHeight":"outerWidth"]()/3),u&&(a={opacity:1},a[v]=0,o.css("opacity",0).css(v,y?2*-c:2*c).animate(a,m,g)),l&&(c/=Math.pow(2,p-1)),a={},a[v]=0,s=0;p>s;s++)n={},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g).animate(a,m,g),c=l?2*c:c/2;l&&(n={opacity:0},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g)),o.queue(function(){l&&o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i()}),_>1&&b.splice.apply(b,[1,0].concat(b.splice(_,f+1))),o.dequeue()},e.effects.effect.clip=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"hide"),l="show"===h,u=t.direction||"vertical",d="vertical"===u,c=d?"height":"width",p=d?"top":"left",f={};e.effects.save(o,r),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n="IMG"===o[0].tagName?s:o,a=n[c](),l&&(n.css(c,0),n.css(p,a/2)),f[c]=l?a:0,f[p]=l?0:a/2,n.animate(f,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){l||o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i()}})},e.effects.effect.drop=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","opacity","height","width"],o=e.effects.setMode(n,t.mode||"hide"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h?"pos":"neg",d={opacity:r?1:0};e.effects.save(n,a),n.show(),e.effects.createWrapper(n),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,r&&n.css("opacity",0).css(l,"pos"===u?-s:s),d[l]=(r?"pos"===u?"+=":"-=":"pos"===u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}})},e.effects.effect.explode=function(t,i){function s(){b.push(this),b.length===d*c&&n()}function n(){p.css({visibility:"visible"}),e(b).remove(),m||p.hide(),i()}var a,o,r,h,l,u,d=t.pieces?Math.round(Math.sqrt(t.pieces)):3,c=d,p=e(this),f=e.effects.setMode(p,t.mode||"hide"),m="show"===f,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/c),y=Math.ceil(p.outerHeight()/d),b=[];for(a=0;d>a;a++)for(h=g.top+a*y,u=a-(d-1)/2,o=0;c>o;o++)r=g.left+o*v,l=o-(c-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-o*v,top:-a*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:r+(m?l*v:0),top:h+(m?u*y:0),opacity:m?0:1}).animate({left:r+(m?0:l*v),top:h+(m?0:u*y),opacity:m?1:0},t.duration||500,t.easing,s)},e.effects.effect.fade=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"toggle");s.animate({opacity:n},{queue:!1,duration:t.duration,easing:t.easing,complete:i})},e.effects.effect.fold=function(t,i){var s,n,a=e(this),o=["position","top","bottom","left","right","height","width"],r=e.effects.setMode(a,t.mode||"hide"),h="show"===r,l="hide"===r,u=t.size||15,d=/([0-9]+)%/.exec(u),c=!!t.horizFirst,p=h!==c,f=p?["width","height"]:["height","width"],m=t.duration/2,g={},v={};e.effects.save(a,o),a.show(),s=e.effects.createWrapper(a).css({overflow:"hidden"}),n=p?[s.width(),s.height()]:[s.height(),s.width()],d&&(u=parseInt(d[1],10)/100*n[l?0:1]),h&&s.css(c?{height:0,width:u}:{height:u,width:0}),g[f[0]]=h?n[0]:u,v[f[1]]=h?n[1]:0,s.animate(g,m,t.easing).animate(v,m,t.easing,function(){l&&a.hide(),e.effects.restore(a,o),e.effects.removeWrapper(a),i()})},e.effects.effect.highlight=function(t,i){var s=e(this),n=["backgroundImage","backgroundColor","opacity"],a=e.effects.setMode(s,t.mode||"show"),o={backgroundColor:s.css("backgroundColor")};"hide"===a&&(o.opacity=0),e.effects.save(s,n),s.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===a&&s.hide(),e.effects.restore(s,n),i()}})},e.effects.effect.size=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],l=["width","height","overflow"],u=["fontSize"],d=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],c=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(o,t.mode||"effect"),f=t.restore||"effect"!==p,m=t.scale||"both",g=t.origin||["middle","center"],v=o.css("position"),y=f?r:h,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&o.show(),s={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},"toggle"===t.mode&&"show"===p?(o.from=t.to||b,o.to=t.from||s):(o.from=t.from||("show"===p?b:s),o.to=t.to||("hide"===p?b:s)),a={from:{y:o.from.height/s.height,x:o.from.width/s.width},to:{y:o.to.height/s.height,x:o.to.width/s.width}},("box"===m||"both"===m)&&(a.from.y!==a.to.y&&(y=y.concat(d),o.from=e.effects.setTransition(o,d,a.from.y,o.from),o.to=e.effects.setTransition(o,d,a.to.y,o.to)),a.from.x!==a.to.x&&(y=y.concat(c),o.from=e.effects.setTransition(o,c,a.from.x,o.from),o.to=e.effects.setTransition(o,c,a.to.x,o.to))),("content"===m||"both"===m)&&a.from.y!==a.to.y&&(y=y.concat(u).concat(l),o.from=e.effects.setTransition(o,u,a.from.y,o.from),o.to=e.effects.setTransition(o,u,a.to.y,o.to)),e.effects.save(o,y),o.show(),e.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),g&&(n=e.effects.getBaseline(g,s),o.from.top=(s.outerHeight-o.outerHeight())*n.y,o.from.left=(s.outerWidth-o.outerWidth())*n.x,o.to.top=(s.outerHeight-o.to.outerHeight)*n.y,o.to.left=(s.outerWidth-o.to.outerWidth)*n.x),o.css(o.from),("content"===m||"both"===m)&&(d=d.concat(["marginTop","marginBottom"]).concat(u),c=c.concat(["marginLeft","marginRight"]),l=r.concat(d).concat(c),o.find("*[width]").each(function(){var i=e(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&e.effects.save(i,l),i.from={height:s.height*a.from.y,width:s.width*a.from.x,outerHeight:s.outerHeight*a.from.y,outerWidth:s.outerWidth*a.from.x},i.to={height:s.height*a.to.y,width:s.width*a.to.x,outerHeight:s.height*a.to.y,outerWidth:s.width*a.to.x},a.from.y!==a.to.y&&(i.from=e.effects.setTransition(i,d,a.from.y,i.from),i.to=e.effects.setTransition(i,d,a.to.y,i.to)),a.from.x!==a.to.x&&(i.from=e.effects.setTransition(i,c,a.from.x,i.from),i.to=e.effects.setTransition(i,c,a.to.x,i.to)),i.css(i.from),i.animate(i.to,t.duration,t.easing,function(){f&&e.effects.restore(i,l)})})),o.animate(o.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){0===o.to.opacity&&o.css("opacity",o.from.opacity),"hide"===p&&o.hide(),e.effects.restore(o,y),f||("static"===v?o.css({position:"relative",top:o.to.top,left:o.to.left}):e.each(["top","left"],function(e,t){o.css(t,function(t,i){var s=parseInt(i,10),n=e?o.to.left:o.to.top;return"auto"===i?n+"px":s+n+"px"})})),e.effects.removeWrapper(o),i()}})},e.effects.effect.scale=function(t,i){var s=e(this),n=e.extend(!0,{},t),a=e.effects.setMode(s,t.mode||"effect"),o=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"hide"===a?0:100),r=t.direction||"both",h=t.origin,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},u={y:"horizontal"!==r?o/100:1,x:"vertical"!==r?o/100:1};n.effect="size",n.queue=!1,n.complete=i,"effect"!==a&&(n.origin=h||["middle","center"],n.restore=!0),n.from=t.from||("show"===a?{height:0,width:0,outerHeight:0,outerWidth:0}:l),n.to={height:l.height*u.y,width:l.width*u.x,outerHeight:l.outerHeight*u.y,outerWidth:l.outerWidth*u.x},n.fade&&("show"===a&&(n.from.opacity=0,n.to.opacity=1),"hide"===a&&(n.from.opacity=1,n.to.opacity=0)),s.effect(n)},e.effects.effect.puff=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"hide"),a="hide"===n,o=parseInt(t.percent,10)||150,r=o/100,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:n,complete:i,percent:a?o:100,from:a?h:{height:h.height*r,width:h.width*r,outerHeight:h.outerHeight*r,outerWidth:h.outerWidth*r}}),s.effect(t)},e.effects.effect.pulsate=function(t,i){var s,n=e(this),a=e.effects.setMode(n,t.mode||"show"),o="show"===a,r="hide"===a,h=o||"hide"===a,l=2*(t.times||5)+(h?1:0),u=t.duration/l,d=0,c=n.queue(),p=c.length;for((o||!n.is(":visible"))&&(n.css("opacity",0).show(),d=1),s=1;l>s;s++)n.animate({opacity:d},u,t.easing),d=1-d;n.animate({opacity:d},u,t.easing),n.queue(function(){r&&n.hide(),i()}),p>1&&c.splice.apply(c,[1,0].concat(c.splice(p,l+1))),n.dequeue()},e.effects.effect.shake=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","height","width"],o=e.effects.setMode(n,t.mode||"effect"),r=t.direction||"left",h=t.distance||20,l=t.times||3,u=2*l+1,d=Math.round(t.duration/u),c="up"===r||"down"===r?"top":"left",p="up"===r||"left"===r,f={},m={},g={},v=n.queue(),y=v.length;for(e.effects.save(n,a),n.show(),e.effects.createWrapper(n),f[c]=(p?"-=":"+=")+h,m[c]=(p?"+=":"-=")+2*h,g[c]=(p?"-=":"+=")+2*h,n.animate(f,d,t.easing),s=1;l>s;s++)n.animate(m,d,t.easing).animate(g,d,t.easing);n.animate(m,d,t.easing).animate(f,d/2,t.easing).queue(function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}),y>1&&v.splice.apply(v,[1,0].concat(v.splice(y,u+1))),n.dequeue()},e.effects.effect.slide=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","width","height"],o=e.effects.setMode(n,t.mode||"show"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h,d={};e.effects.save(n,a),n.show(),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(n).css({overflow:"hidden"}),r&&n.css(l,u?isNaN(s)?"-"+s:-s:s),d[l]=(r?u?"+=":"-=":u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}})},e.effects.effect.transfer=function(t,i){var s=e(this),n=e(t.to),a="fixed"===n.css("position"),o=e("body"),r=a?o.scrollTop():0,h=a?o.scrollLeft():0,l=n.offset(),u={top:l.top-r,left:l.left-h,height:n.innerHeight(),width:n.innerWidth()},d=s.offset(),c=e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:d.top-r,left:d.left-h,height:s.innerHeight(),width:s.innerWidth(),position:a?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){c.remove(),i()})}});
/*!
 * jQuery BBQ: Back Button & Query Library - v1.4pre - 1/15/2013
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010-2013 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery BBQ: Back Button & Query Library
//
// *Version: 1.4pre, Last updated: 1/15/2013*
// 
// Project Home - http://benalman.com/projects/jquery-bbq-plugin/
// GitHub       - http://github.com/cowboy/jquery-bbq/
// Source       - http://github.com/cowboy/jquery-bbq/raw/master/jquery.ba-bbq.js
// (Minified)   - http://github.com/cowboy/jquery-bbq/raw/master/jquery.ba-bbq.min.js (2.2kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010-2013 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Basic AJAX     - http://benalman.com/code/projects/jquery-bbq/examples/fragment-basic/
// Advanced AJAX  - http://benalman.com/code/projects/jquery-bbq/examples/fragment-advanced/
// jQuery UI Tabs - http://benalman.com/code/projects/jquery-bbq/examples/fragment-jquery-ui-tabs/
// Deparam        - http://benalman.com/code/projects/jquery-bbq/examples/deparam/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-bbq/unit/
// 
// About: Release History
// 
// 1.4pre - (1/15/2013) Removed $.browser reference to work with jQuery 1.9
// 1.3pre - (8/26/2010) Integrated <jQuery hashchange event> v1.3, which adds
//         document.title and document.domain support in IE6/7, BlackBerry
//         support, better Iframe hiding for accessibility reasons, and the new
//         <jQuery.fn.hashchange> "shortcut" method. Added the
//         <jQuery.param.sorted> method which reduces the possibility of
//         extraneous hashchange event triggering. Added the
//         <jQuery.param.fragment.ajaxCrawlable> method which can be used to
//         enable Google "AJAX Crawlable mode."
// 1.2.1 - (2/17/2010) Actually fixed the stale window.location Safari bug from
//         <jQuery hashchange event> in BBQ, which was the main reason for the
//         previous release!
// 1.2   - (2/16/2010) Integrated <jQuery hashchange event> v1.2, which fixes a
//         Safari bug, the event can now be bound before DOM ready, and IE6/7
//         page should no longer scroll when the event is first bound. Also
//         added the <jQuery.param.fragment.noEscape> method, and reworked the
//         <hashchange event (BBQ)> internal "add" method to be compatible with
//         changes made to the jQuery 1.4.2 special events API.
// 1.1.1 - (1/22/2010) Integrated <jQuery hashchange event> v1.1, which fixes an
//         obscure IE8 EmulateIE7 meta tag compatibility mode bug.
// 1.1   - (1/9/2010) Broke out the jQuery BBQ event.special <hashchange event>
//         functionality into a separate plugin for users who want just the
//         basic event & back button support, without all the extra awesomeness
//         that BBQ provides. This plugin will be included as part of jQuery BBQ,
//         but also be available separately. See <jQuery hashchange event>
//         plugin for more information. Also added the <jQuery.bbq.removeState>
//         method and added additional <jQuery.deparam> examples.
// 1.0.3 - (12/2/2009) Fixed an issue in IE 6 where location.search and
//         location.hash would report incorrectly if the hash contained the ?
//         character. Also <jQuery.param.querystring> and <jQuery.param.fragment>
//         will no longer parse params out of a URL that doesn't contain ? or #,
//         respectively.
// 1.0.2 - (10/10/2009) Fixed an issue in IE 6/7 where the hidden IFRAME caused
//         a "This page contains both secure and nonsecure items." warning when
//         used on an https:// page.
// 1.0.1 - (10/7/2009) Fixed an issue in IE 8. Since both "IE7" and "IE8
//         Compatibility View" modes erroneously report that the browser
//         supports the native window.onhashchange event, a slightly more
//         robust test needed to be added.
// 1.0   - (10/2/2009) Initial release

(function ($, window) {
    '$:nomunge'; // Used by YUI compressor.

    // Some convenient shortcuts.
    var undefined,
        aps = Array.prototype.slice,
        decode = decodeURIComponent,

    // Method / object references.
        jq_param = $.param,
        jq_param_sorted,
        jq_param_fragment,
        jq_deparam,
        jq_deparam_fragment,
        jq_bbq = $.bbq = $.bbq || {},
        jq_bbq_pushState,
        jq_bbq_getState,
        jq_elemUrlAttr,
        special = $.event.special,

    // Reused strings.
        str_hashchange = 'hashchange',
        str_querystring = 'querystring',
        str_fragment = 'fragment',
        str_elemUrlAttr = 'elemUrlAttr',
        str_href = 'href',
        str_src = 'src',

    // Reused RegExp.
        re_params_querystring = /^.*\?|#.*$/g,
        re_params_fragment,
        re_fragment,
        re_no_escape,

        ajax_crawlable,
        fragment_prefix,

    // Used by jQuery.elemUrlAttr.
        elemUrlAttr_cache = {};

    // A few commonly used bits, broken out to help reduce minified file size.

    function is_string(arg) {
        return typeof arg === 'string';
    };

    // Why write the same function twice? Let's curry! Mmmm, curry..

    function curry(func) {
        var args = aps.call(arguments, 1);

        return function () {
            return func.apply(this, args.concat(aps.call(arguments)));
        };
    };

    // Get location.hash (or what you'd expect location.hash to be) sans any
    // leading #. Thanks for making this necessary, Firefox!
    function get_fragment(url) {
        return url.replace(re_fragment, '$2');
    };

    // Get location.search (or what you'd expect location.search to be) sans any
    // leading #. Thanks for making this necessary, IE6!
    function get_querystring(url) {
        return url.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, '$1');
    };

    // Section: Param (to string)
    //
    // Method: jQuery.param.querystring
    //
    // Retrieve the query string from a URL or if no arguments are passed, the
    // current window.location.href.
    //
    // Usage:
    //
    // > jQuery.param.querystring( [ url ] );
    //
    // Arguments:
    //
    //  url - (String) A URL containing query string params to be parsed. If url
    //    is not passed, the current window.location.href is used.
    //
    // Returns:
    //
    //  (String) The parsed query string, with any leading "?" removed.
    //

    // Method: jQuery.param.querystring (build url)
    //
    // Merge a URL, with or without pre-existing query string params, plus any
    // object, params string or URL containing query string params into a new URL.
    //
    // Usage:
    //
    // > jQuery.param.querystring( url, params [, merge_mode ] );
    //
    // Arguments:
    //
    //  url - (String) A valid URL for params to be merged into. This URL may
    //    contain a query string and/or fragment (hash).
    //  params - (String) A params string or URL containing query string params to
    //    be merged into url.
    //  params - (Object) A params object to be merged into url.
    //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
    //    specified, and is as-follows:
    //
    //    * 0: params in the params argument will override any query string
    //         params in url.
    //    * 1: any query string params in url will override params in the params
    //         argument.
    //    * 2: params argument will completely replace any query string in url.
    //
    // Returns:
    //
    //  (String) A URL with a urlencoded query string in the format '?a=b&c=d&e=f'.

    // Method: jQuery.param.fragment
    //
    // Retrieve the fragment (hash) from a URL or if no arguments are passed, the
    // current window.location.href.
    //
    // Usage:
    //
    // > jQuery.param.fragment( [ url ] );
    //
    // Arguments:
    //
    //  url - (String) A URL containing fragment (hash) params to be parsed. If
    //    url is not passed, the current window.location.href is used.
    //
    // Returns:
    //
    //  (String) The parsed fragment (hash) string, with any leading "#" removed.

    // Method: jQuery.param.fragment (build url)
    //
    // Merge a URL, with or without pre-existing fragment (hash) params, plus any
    // object, params string or URL containing fragment (hash) params into a new
    // URL.
    //
    // Usage:
    //
    // > jQuery.param.fragment( url, params [, merge_mode ] );
    //
    // Arguments:
    //
    //  url - (String) A valid URL for params to be merged into. This URL may
    //    contain a query string and/or fragment (hash).
    //  params - (String) A params string or URL containing fragment (hash) params
    //    to be merged into url.
    //  params - (Object) A params object to be merged into url.
    //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
    //    specified, and is as-follows:
    //
    //    * 0: params in the params argument will override any fragment (hash)
    //         params in url.
    //    * 1: any fragment (hash) params in url will override params in the
    //         params argument.
    //    * 2: params argument will completely replace any query string in url.
    //
    // Returns:
    //
    //  (String) A URL with a urlencoded fragment (hash) in the format '#a=b&c=d&e=f'.

    function jq_param_sub(is_fragment, get_func, url, params, merge_mode) {
        var result,
            qs,
            matches,
            url_params,
            hash;

        if (params !== undefined) {
            // Build URL by merging params into url string.

            // matches[1] = url part that precedes params, not including trailing ?/#
            // matches[2] = params, not including leading ?/#
            // matches[3] = if in 'querystring' mode, hash including leading #, otherwise ''
            matches = url.match(is_fragment ? re_fragment : /^([^#?]*)\??([^#]*)(#?.*)/);

            // Get the hash if in 'querystring' mode, and it exists.
            hash = matches[3] || '';

            if (merge_mode === 2 && is_string(params)) {
                // If merge_mode is 2 and params is a string, merge the fragment / query
                // string into the URL wholesale, without converting it into an object.
                qs = params.replace(is_fragment ? re_params_fragment : re_params_querystring, '');

            } else {
                // Convert relevant params in url to object.
                url_params = jq_deparam(matches[2]);

                params = is_string(params)

                    // Convert passed params string into object.
                    ? jq_deparam[ is_fragment ? str_fragment : str_querystring ](params)

                    // Passed params object.
                    : params;

                qs = merge_mode === 2 ? params                              // passed params replace url params
                    : merge_mode === 1 ? $.extend({}, params, url_params)  // url params override passed params
                    : $.extend({}, url_params, params);                     // passed params override url params

                // Convert params object into a sorted params string.
                qs = jq_param_sorted(qs);

                // Unescape characters specified via $.param.noEscape. Since only hash-
                // history users have requested this feature, it's only enabled for
                // fragment-related params strings.
                if (is_fragment) {
                    qs = qs.replace(re_no_escape, decode);
                }
            }

            // Build URL from the base url, querystring and hash. In 'querystring'
            // mode, ? is only added if a query string exists. In 'fragment' mode, #
            // is always added.
            result = matches[1] + ( is_fragment ? fragment_prefix : qs || !matches[1] ? '?' : '' ) + qs + hash;

        } else {
            // If URL was passed in, parse params from URL string, otherwise parse
            // params from window.location.href.
            result = get_func(url !== undefined ? url : location.href);
        }

        return result;
    };

    jq_param[ str_querystring ] = curry(jq_param_sub, 0, get_querystring);
    jq_param[ str_fragment ] = jq_param_fragment = curry(jq_param_sub, 1, get_fragment);

    // Method: jQuery.param.sorted
    //
    // Returns a params string equivalent to that returned by the internal
    // jQuery.param method, but sorted, which makes it suitable for use as a
    // cache key.
    //
    // For example, in most browsers jQuery.param({z:1,a:2}) returns "z=1&a=2"
    // and jQuery.param({a:2,z:1}) returns "a=2&z=1". Even though both the
    // objects being serialized and the resulting params strings are equivalent,
    // if these params strings were set into the location.hash fragment
    // sequentially, the hashchange event would be triggered unnecessarily, since
    // the strings are different (even though the data described by them is the
    // same). By sorting the params string, unecessary hashchange event triggering
    // can be avoided.
    //
    // Usage:
    //
    // > jQuery.param.sorted( obj [, traditional ] );
    //
    // Arguments:
    //
    //  obj - (Object) An object to be serialized.
    //  traditional - (Boolean) Params deep/shallow serialization mode. See the
    //    documentation at http://api.jquery.com/jQuery.param/ for more detail.
    //
    // Returns:
    //
    //  (String) A sorted params string.

    jq_param.sorted = jq_param_sorted = function (a, traditional) {
        var arr = [],
            obj = {};

        $.each(jq_param(a, traditional).split('&'), function (i, v) {
            var key = v.replace(/(?:%5B|=).*$/, ''),
                key_obj = obj[ key ];

            if (!key_obj) {
                key_obj = obj[ key ] = [];
                arr.push(key);
            }

            key_obj.push(v);
        });

        return $.map(arr.sort(),function (v) {
            return obj[ v ];
        }).join('&');
    };

    // Method: jQuery.param.fragment.noEscape
    //
    // Specify characters that will be left unescaped when fragments are created
    // or merged using <jQuery.param.fragment>, or when the fragment is modified
    // using <jQuery.bbq.pushState>. This option only applies to serialized data
    // object fragments, and not set-as-string fragments. Does not affect the
    // query string. Defaults to ",/" (comma, forward slash).
    //
    // Note that this is considered a purely aesthetic option, and will help to
    // create URLs that "look pretty" in the address bar or bookmarks, without
    // affecting functionality in any way. That being said, be careful to not
    // unescape characters that are used as delimiters or serve a special
    // purpose, such as the "#?&=+" (octothorpe, question mark, ampersand,
    // equals, plus) characters.
    //
    // Usage:
    //
    // > jQuery.param.fragment.noEscape( [ chars ] );
    //
    // Arguments:
    //
    //  chars - (String) The characters to not escape in the fragment. If
    //    unspecified, defaults to empty string (escape all characters).
    //
    // Returns:
    //
    //  Nothing.

    jq_param_fragment.noEscape = function (chars) {
        chars = chars || '';
        var arr = $.map(chars.split(''), encodeURIComponent);
        re_no_escape = new RegExp(arr.join('|'), 'g');
    };

    // A sensible default. These are the characters people seem to complain about
    // "uglifying up the URL" the most.
    jq_param_fragment.noEscape(',/');

    // Method: jQuery.param.fragment.ajaxCrawlable
    //
    // TODO: DESCRIBE
    //
    // Usage:
    //
    // > jQuery.param.fragment.ajaxCrawlable( [ state ] );
    //
    // Arguments:
    //
    //  state - (Boolean) TODO: DESCRIBE
    //
    // Returns:
    //
    //  (Boolean) The current ajaxCrawlable state.

    jq_param_fragment.ajaxCrawlable = function (state) {
        if (state !== undefined) {
            if (state) {
                re_params_fragment = /^.*(?:#!|#)/;
                re_fragment = /^([^#]*)(?:#!|#)?(.*)$/;
                fragment_prefix = '#!';
            } else {
                re_params_fragment = /^.*#/;
                re_fragment = /^([^#]*)#?(.*)$/;
                fragment_prefix = '#';
            }
            ajax_crawlable = !!state;
        }

        return ajax_crawlable;
    };

    jq_param_fragment.ajaxCrawlable(0);

    // Section: Deparam (from string)
    //
    // Method: jQuery.deparam
    //
    // Deserialize a params string into an object, optionally coercing numbers,
    // booleans, null and undefined values; this method is the counterpart to the
    // internal jQuery.param method.
    //
    // Usage:
    //
    // > jQuery.deparam( params [, coerce ] );
    //
    // Arguments:
    //
    //  params - (String) A params string to be parsed.
    //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
    //    undefined to their actual value. Defaults to false if omitted.
    //
    // Returns:
    //
    //  (Object) An object representing the deserialized params string.

    $.deparam = jq_deparam = function (params, coerce) {
        var obj = {},
            coerce_types = { 'true': !0, 'false': !1, 'null': null };

        // Iterate over all name=value pairs.
        $.each(params.replace(/\+/g, ' ').split('&'), function (j, v) {
            var param = v.split('='),
                key = decode(param[0]),
                val,
                cur = obj,
                i = 0,

            // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
            // into its component parts.
                keys = key.split(']['),
                keys_last = keys.length - 1;

            // If the first keys part contains [ and the last ends with ], then []
            // are correctly balanced.
            if (/\[/.test(keys[0]) && /\]$/.test(keys[ keys_last ])) {
                // Remove the trailing ] from the last keys part.
                keys[ keys_last ] = keys[ keys_last ].replace(/\]$/, '');

                // Split first keys part into two parts on the [ and add them back onto
                // the beginning of the keys array.
                keys = keys.shift().split('[').concat(keys);

                keys_last = keys.length - 1;
            } else {
                // Basic 'foo' style key.
                keys_last = 0;
            }

            // Are we dealing with a name=value pair, or just a name?
            if (param.length === 2) {
                val = decode(param[1]);

                // Coerce values.
                if (coerce) {
                    val = val && !isNaN(val) ? +val              // number
                        : val === 'undefined' ? undefined         // undefined
                        : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
                        : val;                                                // string
                }

                if (keys_last) {
                    // Complex key, build deep object structure based on a few rules:
                    // * The 'cur' pointer starts at the object top-level.
                    // * [] = array push (n is set to array length), [n] = array if n is
                    //   numeric, otherwise object.
                    // * If at the last keys part, set the value.
                    // * For each keys part, if the current level is undefined create an
                    //   object or array based on the type of the next keys part.
                    // * Move the 'cur' pointer to the next level.
                    // * Rinse & repeat.
                    for (; i <= keys_last; i++) {
                        key = keys[i] === '' ? cur.length : keys[i];
                        cur = cur[key] = i < keys_last
                            ? cur[key] || ( keys[i + 1] && isNaN(keys[i + 1]) ? {} : [] )
                            : val;
                    }

                } else {
                    // Simple key, even simpler rules, since only scalars and shallow
                    // arrays are allowed.

                    if ($.isArray(obj[key])) {
                        // val is already an array, so push on the next value.
                        obj[key].push(val);

                    } else if (obj[key] !== undefined) {
                        // val isn't an array, but since a second value has been specified,
                        // convert val into an array.
                        obj[key] = [ obj[key], val ];

                    } else {
                        // val is a scalar.
                        obj[key] = val;
                    }
                }

            } else if (key) {
                // No value was defined, so set something meaningful.
                obj[key] = coerce
                    ? undefined
                    : '';
            }
        });

        return obj;
    };

    // Method: jQuery.deparam.querystring
    //
    // Parse the query string from a URL or the current window.location.href,
    // deserializing it into an object, optionally coercing numbers, booleans,
    // null and undefined values.
    //
    // Usage:
    //
    // > jQuery.deparam.querystring( [ url ] [, coerce ] );
    //
    // Arguments:
    //
    //  url - (String) An optional params string or URL containing query string
    //    params to be parsed. If url is omitted, the current
    //    window.location.href is used.
    //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
    //    undefined to their actual value. Defaults to false if omitted.
    //
    // Returns:
    //
    //  (Object) An object representing the deserialized params string.

    // Method: jQuery.deparam.fragment
    //
    // Parse the fragment (hash) from a URL or the current window.location.href,
    // deserializing it into an object, optionally coercing numbers, booleans,
    // null and undefined values.
    //
    // Usage:
    //
    // > jQuery.deparam.fragment( [ url ] [, coerce ] );
    //
    // Arguments:
    //
    //  url - (String) An optional params string or URL containing fragment (hash)
    //    params to be parsed. If url is omitted, the current window.location.href
    //    is used.
    //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
    //    undefined to their actual value. Defaults to false if omitted.
    //
    // Returns:
    //
    //  (Object) An object representing the deserialized params string.

    function jq_deparam_sub(is_fragment, url_or_params, coerce) {
        if (url_or_params === undefined || typeof url_or_params === 'boolean') {
            // url_or_params not specified.
            coerce = url_or_params;
            url_or_params = jq_param[ is_fragment ? str_fragment : str_querystring ]();
        } else {
            url_or_params = is_string(url_or_params)
                ? url_or_params.replace(is_fragment ? re_params_fragment : re_params_querystring, '')
                : url_or_params;
        }

        return jq_deparam(url_or_params, coerce);
    };

    jq_deparam[ str_querystring ] = curry(jq_deparam_sub, 0);
    jq_deparam[ str_fragment ] = jq_deparam_fragment = curry(jq_deparam_sub, 1);

    // Section: Element manipulation
    //
    // Method: jQuery.elemUrlAttr
    //
    // Get the internal "Default URL attribute per tag" list, or augment the list
    // with additional tag-attribute pairs, in case the defaults are insufficient.
    //
    // In the <jQuery.fn.querystring> and <jQuery.fn.fragment> methods, this list
    // is used to determine which attribute contains the URL to be modified, if
    // an "attr" param is not specified.
    //
    // Default Tag-Attribute List:
    //
    //  a      - href
    //  base   - href
    //  iframe - src
    //  img    - src
    //  input  - src
    //  form   - action
    //  link   - href
    //  script - src
    //
    // Usage:
    //
    // > jQuery.elemUrlAttr( [ tag_attr ] );
    //
    // Arguments:
    //
    //  tag_attr - (Object) An object containing a list of tag names and their
    //    associated default attribute names in the format { tag: 'attr', ... } to
    //    be merged into the internal tag-attribute list.
    //
    // Returns:
    //
    //  (Object) An object containing all stored tag-attribute values.

    // Only define function and set defaults if function doesn't already exist, as
    // the urlInternal plugin will provide this method as well.
    $[ str_elemUrlAttr ] || ($[ str_elemUrlAttr ] = function (obj) {
        return $.extend(elemUrlAttr_cache, obj);
    })({
        a: str_href,
        base: str_href,
        iframe: str_src,
        img: str_src,
        input: str_src,
        form: 'action',
        link: str_href,
        script: str_src
    });

    jq_elemUrlAttr = $[ str_elemUrlAttr ];

    // Method: jQuery.fn.querystring
    //
    // Update URL attribute in one or more elements, merging the current URL (with
    // or without pre-existing query string params) plus any params object or
    // string into a new URL, which is then set into that attribute. Like
    // <jQuery.param.querystring (build url)>, but for all elements in a jQuery
    // collection.
    //
    // Usage:
    //
    // > jQuery('selector').querystring( [ attr, ] params [, merge_mode ] );
    //
    // Arguments:
    //
    //  attr - (String) Optional name of an attribute that will contain a URL to
    //    merge params or url into. See <jQuery.elemUrlAttr> for a list of default
    //    attributes.
    //  params - (Object) A params object to be merged into the URL attribute.
    //  params - (String) A URL containing query string params, or params string
    //    to be merged into the URL attribute.
    //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
    //    specified, and is as-follows:
    //
    //    * 0: params in the params argument will override any params in attr URL.
    //    * 1: any params in attr URL will override params in the params argument.
    //    * 2: params argument will completely replace any query string in attr
    //         URL.
    //
    // Returns:
    //
    //  (jQuery) The initial jQuery collection of elements, but with modified URL
    //  attribute values.

    // Method: jQuery.fn.fragment
    //
    // Update URL attribute in one or more elements, merging the current URL (with
    // or without pre-existing fragment/hash params) plus any params object or
    // string into a new URL, which is then set into that attribute. Like
    // <jQuery.param.fragment (build url)>, but for all elements in a jQuery
    // collection.
    //
    // Usage:
    //
    // > jQuery('selector').fragment( [ attr, ] params [, merge_mode ] );
    //
    // Arguments:
    //
    //  attr - (String) Optional name of an attribute that will contain a URL to
    //    merge params into. See <jQuery.elemUrlAttr> for a list of default
    //    attributes.
    //  params - (Object) A params object to be merged into the URL attribute.
    //  params - (String) A URL containing fragment (hash) params, or params
    //    string to be merged into the URL attribute.
    //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
    //    specified, and is as-follows:
    //
    //    * 0: params in the params argument will override any params in attr URL.
    //    * 1: any params in attr URL will override params in the params argument.
    //    * 2: params argument will completely replace any fragment (hash) in attr
    //         URL.
    //
    // Returns:
    //
    //  (jQuery) The initial jQuery collection of elements, but with modified URL
    //  attribute values.

    function jq_fn_sub(mode, force_attr, params, merge_mode) {
        if (!is_string(params) && typeof params !== 'object') {
            // force_attr not specified.
            merge_mode = params;
            params = force_attr;
            force_attr = undefined;
        }

        return this.each(function () {
            var that = $(this),

            // Get attribute specified, or default specified via $.elemUrlAttr.
                attr = force_attr || jq_elemUrlAttr()[ ( this.nodeName || '' ).toLowerCase() ] || '',

            // Get URL value.
                url = attr && that.attr(attr) || '';

            // Update attribute with new URL.
            that.attr(attr, jq_param[ mode ](url, params, merge_mode));
        });

    };

    $.fn[ str_querystring ] = curry(jq_fn_sub, str_querystring);
    $.fn[ str_fragment ] = curry(jq_fn_sub, str_fragment);

    // Section: History, hashchange event
    //
    // Method: jQuery.bbq.pushState
    //
    // Adds a 'state' into the browser history at the current position, setting
    // location.hash and triggering any bound <hashchange event> callbacks
    // (provided the new state is different than the previous state).
    //
    // If no arguments are passed, an empty state is created, which is just a
    // shortcut for jQuery.bbq.pushState( {}, 2 ).
    //
    // Usage:
    //
    // > jQuery.bbq.pushState( [ params [, merge_mode ] ] );
    //
    // Arguments:
    //
    //  params - (String) A serialized params string or a hash string beginning
    //    with # to merge into location.hash.
    //  params - (Object) A params object to merge into location.hash.
    //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
    //    specified (unless a hash string beginning with # is specified, in which
    //    case merge behavior defaults to 2), and is as-follows:
    //
    //    * 0: params in the params argument will override any params in the
    //         current state.
    //    * 1: any params in the current state will override params in the params
    //         argument.
    //    * 2: params argument will completely replace current state.
    //
    // Returns:
    //
    //  Nothing.
    //
    // Additional Notes:
    //
    //  * Setting an empty state may cause the browser to scroll.
    //  * Unlike the fragment and querystring methods, if a hash string beginning
    //    with # is specified as the params agrument, merge_mode defaults to 2.

    jq_bbq.pushState = jq_bbq_pushState = function (params, merge_mode) {
        if (is_string(params) && /^#/.test(params) && merge_mode === undefined) {
            // Params string begins with # and merge_mode not specified, so completely
            // overwrite window.location.hash.
            merge_mode = 2;
        }

        var has_args = params !== undefined,
        // Merge params into window.location using $.param.fragment.
            url = jq_param_fragment(location.href,
                has_args ? params : {}, has_args ? merge_mode : 2);

        // Set new window.location.href. Note that Safari 3 & Chrome barf on
        // location.hash = '#' so the entire URL is set.
        location.href = url;
    };

    // Method: jQuery.bbq.getState
    //
    // Retrieves the current 'state' from the browser history, parsing
    // location.hash for a specific key or returning an object containing the
    // entire state, optionally coercing numbers, booleans, null and undefined
    // values.
    //
    // Usage:
    //
    // > jQuery.bbq.getState( [ key ] [, coerce ] );
    //
    // Arguments:
    //
    //  key - (String) An optional state key for which to return a value.
    //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
    //    undefined to their actual value. Defaults to false.
    //
    // Returns:
    //
    //  (Anything) If key is passed, returns the value corresponding with that key
    //    in the location.hash 'state', or undefined. If not, an object
    //    representing the entire 'state' is returned.

    jq_bbq.getState = jq_bbq_getState = function (key, coerce) {
        return key === undefined || typeof key === 'boolean'
            ? jq_deparam_fragment(key) // 'key' really means 'coerce' here
            : jq_deparam_fragment(coerce)[ key ];
    };

    // Method: jQuery.bbq.removeState
    //
    // Remove one or more keys from the current browser history 'state', creating
    // a new state, setting location.hash and triggering any bound
    // <hashchange event> callbacks (provided the new state is different than
    // the previous state).
    //
    // If no arguments are passed, an empty state is created, which is just a
    // shortcut for jQuery.bbq.pushState( {}, 2 ).
    //
    // Usage:
    //
    // > jQuery.bbq.removeState( [ key [, key ... ] ] );
    //
    // Arguments:
    //
    //  key - (String) One or more key values to remove from the current state,
    //    passed as individual arguments.
    //  key - (Array) A single array argument that contains a list of key values
    //    to remove from the current state.
    //
    // Returns:
    //
    //  Nothing.
    //
    // Additional Notes:
    //
    //  * Setting an empty state may cause the browser to scroll.

    jq_bbq.removeState = function (arr) {
        var state = {};

        // If one or more arguments is passed..
        if (arr !== undefined) {

            // Get the current state.
            state = jq_bbq_getState();

            // For each passed key, delete the corresponding property from the current
            // state.
            $.each($.isArray(arr) ? arr : arguments, function (i, v) {
                delete state[ v ];
            });
        }

        // Set the state, completely overriding any existing state.
        jq_bbq_pushState(state, 2);
    };

    // Event: hashchange event (BBQ)
    //
    // Usage in jQuery 1.4 and newer:
    //
    // In jQuery 1.4 and newer, the event object passed into any hashchange event
    // callback is augmented with a copy of the location.hash fragment at the time
    // the event was triggered as its event.fragment property. In addition, the
    // event.getState method operates on this property (instead of location.hash)
    // which allows this fragment-as-a-state to be referenced later, even after
    // window.location may have changed.
    //
    // Note that event.fragment and event.getState are not defined according to
    // W3C (or any other) specification, but will still be available whether or
    // not the hashchange event exists natively in the browser, because of the
    // utility they provide.
    //
    // The event.fragment property contains the output of <jQuery.param.fragment>
    // and the event.getState method is equivalent to the <jQuery.bbq.getState>
    // method.
    //
    // > $(window).bind( 'hashchange', function( event ) {
    // >   var hash_str = event.fragment,
    // >     param_obj = event.getState(),
    // >     param_val = event.getState( 'param_name' ),
    // >     param_val_coerced = event.getState( 'param_name', true );
    // >   ...
    // > });
    //
    // Usage in jQuery 1.3.2:
    //
    // In jQuery 1.3.2, the event object cannot to be augmented as in jQuery 1.4+,
    // so the fragment state isn't bound to the event object and must instead be
    // parsed using the <jQuery.param.fragment> and <jQuery.bbq.getState> methods.
    //
    // > $(window).bind( 'hashchange', function( event ) {
    // >   var hash_str = $.param.fragment(),
    // >     param_obj = $.bbq.getState(),
    // >     param_val = $.bbq.getState( 'param_name' ),
    // >     param_val_coerced = $.bbq.getState( 'param_name', true );
    // >   ...
    // > });
    //
    // Additional Notes:
    //
    // * Due to changes in the special events API, jQuery BBQ v1.2 or newer is
    //   required to enable the augmented event object in jQuery 1.4.2 and newer.
    // * See <jQuery hashchange event> for more detailed information.

    special[ str_hashchange ] = $.extend(special[ str_hashchange ], {

        // Augmenting the event object with the .fragment property and .getState
        // method requires jQuery 1.4 or newer. Note: with 1.3.2, everything will
        // work, but the event won't be augmented)
        add: function (handleObj) {
            var old_handler;

            function new_handler(e) {
                // e.fragment is set to the value of location.hash (with any leading #
                // removed) at the time the event is triggered.
                var hash = e[ str_fragment ] = jq_param_fragment();

                // e.getState() works just like $.bbq.getState(), but uses the
                // e.fragment property stored on the event object.
                e.getState = function (key, coerce) {
                    return key === undefined || typeof key === 'boolean'
                        ? jq_deparam(hash, key) // 'key' really means 'coerce' here
                        : jq_deparam(hash, coerce)[ key ];
                };

                old_handler.apply(this, arguments);
            };

            // This may seem a little complicated, but it normalizes the special event
            // .add method between jQuery 1.4/1.4.1 and 1.4.2+
            if ($.isFunction(handleObj)) {
                // 1.4, 1.4.1
                old_handler = handleObj;
                return new_handler;
            } else {
                // 1.4.2+
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }

    });

})(jQuery, this);

/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function ($, window, undefined) {
    '$:nomunge'; // Used by YUI compressor.

    // Reused string.
    var str_hashchange = 'hashchange',

    // Method / object references.
        doc = document,
        fake_onhashchange,
        special = $.event.special,

    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
        doc_mode = doc.documentMode,
        supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );

    // Get location.hash (or what you'd expect location.hash to be) sans any
    // leading #. Thanks for making this necessary, Firefox!
    function get_fragment(url) {
        url = url || location.href;
        return '#' + url.replace(/^[^#]*#?(.*)$/, '$1');
    };

    // Method: jQuery.fn.hashchange
    //
    // Bind a handler to the window.onhashchange event or trigger all bound
    // window.onhashchange event handlers. This behavior is consistent with
    // jQuery's built-in event handlers.
    //
    // Usage:
    //
    // > jQuery(window).hashchange( [ handler ] );
    //
    // Arguments:
    //
    //  handler - (Function) Optional handler to be bound to the hashchange
    //    event. This is a "shortcut" for the more verbose form:
    //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
    //    all bound window.onhashchange event handlers will be triggered. This
    //    is a shortcut for the more verbose
    //    jQuery(window).trigger( 'hashchange' ). These forms are described in
    //    the <hashchange event> section.
    //
    // Returns:
    //
    //  (jQuery) The initial jQuery collection of elements.

    // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
    // $(elem).hashchange() for triggering, like jQuery does for built-in events.
    $.fn[ str_hashchange ] = function (fn) {
        return fn ? this.bind(str_hashchange, fn) : this.trigger(str_hashchange);
    };

    // Property: jQuery.fn.hashchange.delay
    //
    // The numeric interval (in milliseconds) at which the <hashchange event>
    // polling loop executes. Defaults to 50.

    // Property: jQuery.fn.hashchange.domain
    //
    // If you're setting document.domain in your JavaScript, and you want hash
    // history to work in IE6/7, not only must this property be set, but you must
    // also set document.domain BEFORE jQuery is loaded into the page. This
    // property is only applicable if you are supporting IE6/7 (or IE8 operating
    // in "IE7 compatibility" mode).
    //
    // In addition, the <jQuery.fn.hashchange.src> property must be set to the
    // path of the included "document-domain.html" file, which can be renamed or
    // modified if necessary (note that the document.domain specified must be the
    // same in both your main JavaScript as well as in this file).
    //
    // Usage:
    //
    // jQuery.fn.hashchange.domain = document.domain;

    // Property: jQuery.fn.hashchange.src
    //
    // If, for some reason, you need to specify an Iframe src file (for example,
    // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
    // do so using this property. Note that when using this property, history
    // won't be recorded in IE6/7 until the Iframe src file loads. This property
    // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
    // compatibility" mode).
    //
    // Usage:
    //
    // jQuery.fn.hashchange.src = 'path/to/file.html';

    $.fn[ str_hashchange ].delay = 50;
    /*
     $.fn[ str_hashchange ].domain = null;
     $.fn[ str_hashchange ].src = null;
     */

    // Event: hashchange event
    //
    // Fired when location.hash changes. In browsers that support it, the native
    // HTML5 window.onhashchange event is used, otherwise a polling loop is
    // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
    // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
    // compatibility" mode), a hidden Iframe is created to allow the back button
    // and hash-based history to work.
    //
    // Usage as described in <jQuery.fn.hashchange>:
    //
    // > // Bind an event handler.
    // > jQuery(window).hashchange( function(e) {
    // >   var hash = location.hash;
    // >   ...
    // > });
    // >
    // > // Manually trigger the event handler.
    // > jQuery(window).hashchange();
    //
    // A more verbose usage that allows for event namespacing:
    //
    // > // Bind an event handler.
    // > jQuery(window).bind( 'hashchange', function(e) {
    // >   var hash = location.hash;
    // >   ...
    // > });
    // >
    // > // Manually trigger the event handler.
    // > jQuery(window).trigger( 'hashchange' );
    //
    // Additional Notes:
    //
    // * The polling loop and Iframe are not created until at least one handler
    //   is actually bound to the 'hashchange' event.
    // * If you need the bound handler(s) to execute immediately, in cases where
    //   a location.hash exists on page load, via bookmark or page refresh for
    //   example, use jQuery(window).hashchange() or the more verbose
    //   jQuery(window).trigger( 'hashchange' ).
    // * The event can be bound before DOM ready, but since it won't be usable
    //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
    //   to bind it inside a DOM ready handler.

    // Override existing $.event.special.hashchange methods (allowing this plugin
    // to be defined after jQuery BBQ in BBQ's source code).
    special[ str_hashchange ] = $.extend(special[ str_hashchange ], {

        // Called only when the first 'hashchange' event is bound to window.
        setup: function () {
            // If window.onhashchange is supported natively, there's nothing to do..
            if (supports_onhashchange) {
                return false;
            }

            // Otherwise, we need to create our own. And we don't want to call this
            // until the user binds to the event, just in case they never do, since it
            // will create a polling loop and possibly even a hidden Iframe.
            $(fake_onhashchange.start);
        },

        // Called only when the last 'hashchange' event is unbound from window.
        teardown: function () {
            // If window.onhashchange is supported natively, there's nothing to do..
            if (supports_onhashchange) {
                return false;
            }

            // Otherwise, we need to stop ours (if possible).
            $(fake_onhashchange.stop);
        }

    });

    // fake_onhashchange does all the work of triggering the window.onhashchange
    // event for browsers that don't natively support it, including creating a
    // polling loop to watch for hash changes and in IE 6/7 creating a hidden
    // Iframe to enable back and forward.
    fake_onhashchange = (function () {
        var self = {},
            timeout_id,

        // Remember the initial hash so it doesn't get triggered immediately.
            last_hash = get_fragment(),

            fn_retval = function (val) {
                return val;
            },
            history_set = fn_retval,
            history_get = fn_retval;

        // Start the polling loop.
        self.start = function () {
            timeout_id || poll();
        };

        // Stop the polling loop.
        self.stop = function () {
            timeout_id && clearTimeout(timeout_id);
            timeout_id = undefined;
        };

        // This polling loop checks every $.fn.hashchange.delay milliseconds to see
        // if location.hash has changed, and triggers the 'hashchange' event on
        // window when necessary.
        function poll() {
            var hash = get_fragment(),
                history_hash = history_get(last_hash);

            if (hash !== last_hash) {
                history_set(last_hash = hash, history_hash);

                $(window).trigger(str_hashchange);

            } else if (history_hash !== last_hash) {
                location.href = location.href.replace(/#.*/, '') + history_hash;
            }

            timeout_id = setTimeout(poll, $.fn[ str_hashchange ].delay);
        };

        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        (navigator.userAgent.match(/MSIE/i) !== null) && !supports_onhashchange && (function () {
            // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
            // when running in "IE7 compatibility" mode.

            var iframe,
                iframe_src;

            // When the event is bound and polling starts in IE 6/7, create a hidden
            // Iframe for history handling.
            self.start = function () {
                if (!iframe) {
                    iframe_src = $.fn[ str_hashchange ].src;
                    iframe_src = iframe_src && iframe_src + get_fragment();

                    // Create hidden Iframe. Attempt to make Iframe as hidden as possible
                    // by using techniques from http://www.paciellogroup.com/blog/?p=604.
                    iframe = $('<iframe tabindex="-1" title="empty"/>').hide()

                        // When Iframe has completely loaded, initialize the history and
                        // start polling.
                        .one('load', function () {
                            iframe_src || history_set(get_fragment());
                            poll();
                        })

                        // Load Iframe src if specified, otherwise nothing.
                        .attr('src', iframe_src || 'javascript:0')

                        // Append Iframe after the end of the body to prevent unnecessary
                        // initial page scrolling (yes, this works).
                        .insertAfter('body')[0].contentWindow;

                    // Whenever `document.title` changes, update the Iframe's title to
                    // prettify the back/next history menu entries. Since IE sometimes
                    // errors with "Unspecified error" the very first time this is set
                    // (yes, very useful) wrap this with a try/catch block.
                    doc.onpropertychange = function () {
                        try {
                            if (event.propertyName === 'title') {
                                iframe.document.title = doc.title;
                            }
                        } catch (e) {
                        }
                    };

                }
            };

            // Override the "stop" method since an IE6/7 Iframe was created. Even
            // if there are no longer any bound event handlers, the polling loop
            // is still necessary for back/next to work at all!
            self.stop = fn_retval;

            // Get history by looking at the hidden Iframe's location.hash.
            history_get = function () {
                return get_fragment(iframe.location.href);
            };

            // Set a new history item by opening and then closing the Iframe
            // document, *then* setting its location.hash. If document.domain has
            // been set, update that as well.
            history_set = function (hash, history_hash) {
                var iframe_doc = iframe.document,
                    domain = $.fn[ str_hashchange ].domain;

                if (hash !== history_hash) {
                    // Update Iframe with any initial `document.title` that might be set.
                    iframe_doc.title = doc.title;

                    // Opening the Iframe's document after it has been closed is what
                    // actually adds a history entry.
                    iframe_doc.open();

                    // Set document.domain for the Iframe document as well, if necessary.
                    domain && iframe_doc.write('<script>document.domain="' + domain + '"</script>');

                    iframe_doc.close();

                    // Update the Iframe's hash, for great justice.
                    iframe.location.hash = hash;
                }
            };

        })();
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

        return self;
    })();

})(jQuery, this);

/*!
 * jQuery Form Plugin
 * version: 3.50.0-2014.02.05
 * Requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */

// AMD support
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define(['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory((typeof(jQuery) != 'undefined') ? jQuery : window.Zepto);
    }
}

(function ($) {
    "use strict";

    /*
     Usage Note:
     -----------
     Do not use both ajaxSubmit and ajaxForm on the same form.  These
     functions are mutually exclusive.  Use ajaxSubmit if you want
     to bind your own submit handler to the form.  For example,

     $(document).ready(function() {
     $('#myForm').on('submit', function(e) {
     e.preventDefault(); // <-- important
     $(this).ajaxSubmit({
     target: '#output'
     });
     });
     });

     Use ajaxForm when you want the plugin to manage all the event binding
     for you.  For example,

     $(document).ready(function() {
     $('#myForm').ajaxForm({
     target: '#output'
     });
     });

     You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
     form does not have to exist when you invoke ajaxForm:

     $('#myForm').ajaxForm({
     delegation: true,
     target: '#output'
     });

     When using ajaxForm, the ajaxSubmit function will be invoked for you
     at the appropriate time.
     */

    /**
     * Feature detection
     */
    var feature = {};
    feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
    feature.formdata = window.FormData !== undefined;

    var hasProp = !!$.fn.prop;

// attr2 uses prop when it can but checks the return type for
// an expected string.  this accounts for the case where a form 
// contains inputs with names like "action" or "method"; in those
// cases "prop" returns the element
    $.fn.attr2 = function () {
        if (!hasProp) {
            return this.attr.apply(this, arguments);
        }
        var val = this.prop.apply(this, arguments);
        if (( val && val.jquery ) || typeof val === 'string') {
            return val;
        }
        return this.attr.apply(this, arguments);
    };

    /**
     * ajaxSubmit() provides a mechanism for immediately submitting
     * an HTML form using AJAX.
     */
    $.fn.ajaxSubmit = function (options) {
        /*jshint scripturl:true */

        // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
        if (!this.length) {
            log('ajaxSubmit: skipping submit process - no element selected');
            return this;
        }

        var method, action, url, $form = this;

        if (typeof options == 'function') {
            options = { success: options };
        }
        else if (options === undefined) {
            options = {};
        }

        method = options.type || this.attr2('method');
        action = options.url || this.attr2('action');

        url = (typeof action === 'string') ? $.trim(action) : '';
        url = url || window.location.href || '';
        if (url) {
            // clean url (don't include hash vaue)
            url = (url.match(/^([^#]+)/) || [])[1];
        }

        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || $.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, options);

        // hook for manipulating the form data before it is extracted;
        // convenient for use with rich editors like tinyMCE or FCKEditor
        var veto = {};
        this.trigger('form-pre-serialize', [this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this;
        }

        // provide opportunity to alter form data before it is serialized
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this;
        }

        var traditional = options.traditional;
        if (traditional === undefined) {
            traditional = $.ajaxSettings.traditional;
        }

        var elements = [];
        var qx, a = this.formToArray(options.semantic, elements);
        if (options.data) {
            options.extraData = options.data;
            qx = $.param(options.data, traditional);
        }

        // give pre-submit callback an opportunity to abort the submit
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this;
        }

        // fire vetoable 'validate' event
        this.trigger('form-submit-validate', [a, this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this;
        }

        var q = $.param(a, traditional);
        if (qx) {
            q = ( q ? (q + '&' + qx) : qx );
        }
        if (options.type.toUpperCase() == 'GET') {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
            options.data = null;  // data is null for 'get'
        }
        else {
            options.data = q; // data is the query string for 'post'
        }

        var callbacks = [];
        if (options.resetForm) {
            callbacks.push(function () {
                $form.resetForm();
            });
        }
        if (options.clearForm) {
            callbacks.push(function () {
                $form.clearForm(options.includeHidden);
            });
        }

        // perform a load on the target only if dataType is not provided
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function () {
            };
            callbacks.push(function (data) {
                var fn = options.replaceTarget ? 'replaceWith' : 'html';
                $(options.target)[fn](data).each(oldSuccess, arguments);
            });
        }
        else if (options.success) {
            $.isArray(options.success) ? callbacks.push.apply(callbacks, options.success) : callbacks.push(options.success);
        }

        options.success = function (data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
            var context = options.context || this;    // jQuery 1.4+ supports scope context
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
            }
        };

        if (options.error) {
            var oldError = options.error;
            options.error = function (xhr, status, error) {
                var context = options.context || this;
                oldError.apply(context, [xhr, status, error, $form]);
            };
        }

        if (options.complete) {
            var oldComplete = options.complete;
            options.complete = function (xhr, status) {
                var context = options.context || this;
                oldComplete.apply(context, [xhr, status, $form]);
            };
        }

        // are there files to upload?

        // [value] (issue #113), also see comment:
        // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
        var fileInputs = $('input[type=file]:enabled', this).filter(function () {
            return $(this).val() !== '';
        });

        var hasFileInputs = fileInputs.length > 0;
        var mp = 'multipart/form-data';
        var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

        var fileAPI = feature.fileapi && feature.formdata;
        log("fileAPI :" + fileAPI);
        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

        var jqxhr;

        // options.iframe allows user to force iframe mode
        // 06-NOV-09: now defaulting to iframe mode if file input is detected
        if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
            // hack to fix Safari hang (thanks to Tim Molendijk for this)
            // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, function () {
                    jqxhr = fileUploadIframe(a);
                });
            }
            else {
                jqxhr = fileUploadIframe(a);
            }
        }
        else if ((hasFileInputs || multipart) && fileAPI) {
            jqxhr = fileUploadXhr(a);
        }
        else {
            jqxhr = $.ajax(options);
        }

        $form.removeData('jqxhr').data('jqxhr', jqxhr);

        // clear element array
        for (var k = 0; k < elements.length; k++) {
            elements[k] = null;
        }

        // fire 'notify' event
        this.trigger('form-submit-notify', [this, options]);
        return this;

        // utility fn for deep serialization
        function deepSerialize(extraData) {
            var serialized = $.param(extraData, options.traditional).split('&');
            var len = serialized.length;
            var result = [];
            var i, part;
            for (i = 0; i < len; i++) {
                // #252; undo param space replacement
                serialized[i] = serialized[i].replace(/\+/g, ' ');
                part = serialized[i].split('=');
                // #278; use array instead of object storage, favoring array serializations
                result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
            }
            return result;
        }

        // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
        function fileUploadXhr(a) {
            var formdata = new FormData();

            for (var i = 0; i < a.length; i++) {
                formdata.append(a[i].name, a[i].value);
            }

            if (options.extraData) {
                var serializedData = deepSerialize(options.extraData);
                for (i = 0; i < serializedData.length; i++) {
                    if (serializedData[i]) {
                        formdata.append(serializedData[i][0], serializedData[i][1]);
                    }
                }
            }

            options.data = null;

            var s = $.extend(true, {}, $.ajaxSettings, options, {
                contentType: false,
                processData: false,
                cache: false,
                type: method || 'POST'
            });

            if (options.uploadProgress) {
                // workaround because jqXHR does not expose upload property
                s.xhr = function () {
                    var xhr = $.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener('progress', function (event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            /*event.position is deprecated*/
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            options.uploadProgress(event, position, total, percent);
                        }, false);
                    }
                    return xhr;
                };
            }

            s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function (xhr, o) {
                //Send FormData() provided by user
                if (options.formData) {
                    o.data = options.formData;
                }
                else {
                    o.data = formdata;
                }
                if (beforeSend) {
                    beforeSend.call(this, xhr, o);
                }
            };
            return $.ajax(s);
        }

        // private function for handling file uploads (hat tip to YAHOO!)
        function fileUploadIframe(a) {
            var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
            var deferred = $.Deferred();

            // #341
            deferred.abort = function (status) {
                xhr.abort(status);
            };

            if (a) {
                // ensure that every serialized input is still enabled
                for (i = 0; i < elements.length; i++) {
                    el = $(elements[i]);
                    if (hasProp) {
                        el.prop('disabled', false);
                    }
                    else {
                        el.removeAttr('disabled');
                    }
                }
            }

            s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            id = 'jqFormIO' + (new Date().getTime());
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr2('name');
                if (!n) {
                    $io.attr2('name', id);
                }
                else {
                    id = n;
                }
            }
            else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
            }
            io = $io[0];


            xhr = { // mock object
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function () {
                },
                getResponseHeader: function () {
                },
                setRequestHeader: function () {
                },
                abort: function (status) {
                    var e = (status === 'timeout' ? 'timeout' : 'aborted');
                    log('aborting upload... ' + e);
                    this.aborted = 1;

                    try { // #214, #257
                        if (io.contentWindow.document.execCommand) {
                            io.contentWindow.document.execCommand('Stop');
                        }
                    }
                    catch (ignore) {
                    }

                    $io.attr('src', s.iframeSrc); // abort op in progress
                    xhr.error = e;
                    if (s.error) {
                        s.error.call(s.context, xhr, e, status);
                    }
                    if (g) {
                        $.event.trigger("ajaxError", [xhr, s, e]);
                    }
                    if (s.complete) {
                        s.complete.call(s.context, xhr, e);
                    }
                }
            };

            g = s.global;
            // trigger ajax global events so that activity/block indicators work like normal
            if (g && 0 === $.active++) {
                $.event.trigger("ajaxStart");
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s]);
            }

            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--;
                }
                deferred.reject();
                return deferred;
            }
            if (xhr.aborted) {
                deferred.reject();
                return deferred;
            }

            // add submitting element to data if we know it
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + '.x'] = form.clk_x;
                        s.extraData[n + '.y'] = form.clk_y;
                    }
                }
            }

            var CLIENT_TIMEOUT_ABORT = 1;
            var SERVER_ABORT = 2;

            function getDoc(frame) {
                /* it looks like contentWindow or contentDocument do not
                 * carry the protocol property in ie8, when running under ssl
                 * frame.document is the only valid response document, since
                 * the protocol is know but not on the other two objects. strange?
                 * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
                 */

                var doc = null;

                // IE8 cascading access check
                try {
                    if (frame.contentWindow) {
                        doc = frame.contentWindow.document;
                    }
                } catch (err) {
                    // IE8 access denied under ssl & missing protocol
                    log('cannot get iframe.contentWindow document: ' + err);
                }

                if (doc) { // successful getting content
                    return doc;
                }

                try { // simply checking may throw in ie8 under ssl or mismatched protocol
                    doc = frame.contentDocument ? frame.contentDocument : frame.document;
                } catch (err) {
                    // last attempt
                    log('cannot get iframe.contentDocument: ' + err);
                    doc = frame.document;
                }
                return doc;
            }

            // Rails CSRF hack (thanks to Yvan Barthelemy)
            var csrf_token = $('meta[name=csrf-token]').attr('content');
            var csrf_param = $('meta[name=csrf-param]').attr('content');
            if (csrf_param && csrf_token) {
                s.extraData = s.extraData || {};
                s.extraData[csrf_param] = csrf_token;
            }

            // take a breath so that pending repaints get some cpu time before the upload starts
            function doSubmit() {
                // make sure form attrs are set
                var t = $form.attr2('target'),
                    a = $form.attr2('action'),
                    mp = 'multipart/form-data',
                    et = $form.attr('enctype') || $form.attr('encoding') || mp;

                // update form attrs in IE friendly way
                form.setAttribute('target', id);
                if (!method || /post/i.test(method)) {
                    form.setAttribute('method', 'POST');
                }
                if (a != s.url) {
                    form.setAttribute('action', s.url);
                }

                // ie borks in some cases when setting encoding
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
                    $form.attr({
                        encoding: 'multipart/form-data',
                        enctype: 'multipart/form-data'
                    });
                }

                // support timout
                if (s.timeout) {
                    timeoutHandle = setTimeout(function () {
                        timedOut = true;
                        cb(CLIENT_TIMEOUT_ABORT);
                    }, s.timeout);
                }

                // look for server aborts
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log('state = ' + state);
                        if (state && state.toLowerCase() == 'uninitialized') {
                            setTimeout(checkState, 50);
                        }
                    }
                    catch (e) {
                        log('Server abort: ', e, ' (', e.name, ')');
                        cb(SERVER_ABORT);
                        if (timeoutHandle) {
                            clearTimeout(timeoutHandle);
                        }
                        timeoutHandle = undefined;
                    }
                }

                // add "extra" data to form if provided in options
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            if (s.extraData.hasOwnProperty(n)) {
                                // if using the $.param format that allows for multiple values with the same name
                                if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                                    extraInputs.push(
                                        $('<input type="hidden" name="' + s.extraData[n].name + '">').val(s.extraData[n].value)
                                            .appendTo(form)[0]);
                                } else {
                                    extraInputs.push(
                                        $('<input type="hidden" name="' + n + '">').val(s.extraData[n])
                                            .appendTo(form)[0]);
                                }
                            }
                        }
                    }

                    if (!s.iframeTarget) {
                        // add iframe to doc and submit the form
                        $io.appendTo('body');
                    }
                    if (io.attachEvent) {
                        io.attachEvent('onload', cb);
                    }
                    else {
                        io.addEventListener('load', cb, false);
                    }
                    setTimeout(checkState, 15);

                    try {
                        form.submit();
                    } catch (err) {
                        // just in case form has element with name/id of 'submit'
                        var submitFn = document.createElement('form').submit;
                        submitFn.apply(form);
                    }
                }
                finally {
                    // reset attrs and remove "extra" input elements
                    form.setAttribute('action', a);
                    form.setAttribute('enctype', et); // #380
                    if (t) {
                        form.setAttribute('target', t);
                    } else {
                        $form.removeAttr('target');
                    }
                    $(extraInputs).remove();
                }
            }

            if (s.forceSync) {
                doSubmit();
            }
            else {
                setTimeout(doSubmit, 10); // this lets dom updates render
            }

            var data, doc, domCheckCount = 50, callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return;
                }

                doc = getDoc(io);
                if (!doc) {
                    log('cannot access response document');
                    e = SERVER_ABORT;
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort('timeout');
                    deferred.reject(xhr, 'timeout');
                    return;
                }
                else if (e == SERVER_ABORT && xhr) {
                    xhr.abort('server abort');
                    deferred.reject(xhr, 'error', 'server abort');
                    return;
                }

                if (!doc || doc.location.href == s.iframeSrc) {
                    // response not received yet
                    if (!timedOut) {
                        return;
                    }
                }
                if (io.detachEvent) {
                    io.detachEvent('onload', cb);
                }
                else {
                    io.removeEventListener('load', cb, false);
                }

                var status = 'success', errMsg;
                try {
                    if (timedOut) {
                        throw 'timeout';
                    }

                    var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                    log('isXml=' + isXml);
                    if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                        if (--domCheckCount) {
                            // in some browsers (Opera) the iframe DOM is not always traversable when
                            // the onload callback fires, so we loop a bit to accommodate
                            log('requeing onLoad callback, DOM not available');
                            setTimeout(cb, 250);
                            return;
                        }
                        // let this fall through because server response could be an empty document
                        //log('Could not access iframe DOM after mutiple tries.');
                        //throw 'DOMException: not available';
                    }

                    //log('response detected');
                    var docRoot = doc.body ? doc.body : doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (isXml) {
                        s.dataType = 'xml';
                    }
                    xhr.getResponseHeader = function (header) {
                        var headers = {'content-type': s.dataType};
                        return headers[header.toLowerCase()];
                    };
                    // support for XHR 'status' & 'statusText' emulation :
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
                        xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                    }

                    var dt = (s.dataType || '').toLowerCase();
                    var scr = /(json|script|text)/.test(dt);
                    if (scr || s.textarea) {
                        // see if user embedded response in textarea
                        var ta = doc.getElementsByTagName('textarea')[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            // support for XHR 'status' & 'statusText' emulation :
                            xhr.status = Number(ta.getAttribute('status')) || xhr.status;
                            xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                        }
                        else if (scr) {
                            // account for browsers injecting pre around json response
                            var pre = doc.getElementsByTagName('pre')[0];
                            var b = doc.getElementsByTagName('body')[0];
                            if (pre) {
                                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                            }
                            else if (b) {
                                xhr.responseText = b.textContent ? b.textContent : b.innerText;
                            }
                        }
                    }
                    else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                        xhr.responseXML = toXml(xhr.responseText);
                    }

                    try {
                        data = httpData(xhr, dt, s);
                    }
                    catch (err) {
                        status = 'parsererror';
                        xhr.error = errMsg = (err || status);
                    }
                }
                catch (err) {
                    log('error caught: ', err);
                    status = 'error';
                    xhr.error = errMsg = (err || status);
                }

                if (xhr.aborted) {
                    log('upload aborted');
                    status = null;
                }

                if (xhr.status) { // we've set xhr.status
                    status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
                }

                // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
                if (status === 'success') {
                    if (s.success) {
                        s.success.call(s.context, data, 'success', xhr);
                    }
                    deferred.resolve(xhr.responseText, 'success', xhr);
                    if (g) {
                        $.event.trigger("ajaxSuccess", [xhr, s]);
                    }
                }
                else if (status) {
                    if (errMsg === undefined) {
                        errMsg = xhr.statusText;
                    }
                    if (s.error) {
                        s.error.call(s.context, xhr, status, errMsg);
                    }
                    deferred.reject(xhr, 'error', errMsg);
                    if (g) {
                        $.event.trigger("ajaxError", [xhr, s, errMsg]);
                    }
                }

                if (g) {
                    $.event.trigger("ajaxComplete", [xhr, s]);
                }

                if (g && !--$.active) {
                    $.event.trigger("ajaxStop");
                }

                if (s.complete) {
                    s.complete.call(s.context, xhr, status);
                }

                callbackProcessed = true;
                if (s.timeout) {
                    clearTimeout(timeoutHandle);
                }

                // clean up
                setTimeout(function () {
                    if (!s.iframeTarget) {
                        $io.remove();
                    }
                    else { //adding else to clean up existing iframe response.
                        $io.attr('src', s.iframeSrc);
                    }
                    xhr.responseXML = null;
                }, 100);
            }

            var toXml = $.parseXML || function (s, doc) { // use parseXML if available (jQuery 1.5+)
                if (window.ActiveXObject) {
                    doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async = 'false';
                    doc.loadXML(s);
                }
                else {
                    doc = (new DOMParser()).parseFromString(s, 'text/xml');
                }
                return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
            };
            var parseJSON = $.parseJSON || function (s) {
                /*jslint evil:true */
                return window['eval']('(' + s + ')');
            };

            var httpData = function (xhr, type, s) { // mostly lifted from jq1.4.4

                var ct = xhr.getResponseHeader('content-type') || '',
                    xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                    data = xml ? xhr.responseXML : xhr.responseText;

                if (xml && data.documentElement.nodeName === 'parsererror') {
                    if ($.error) {
                        $.error('parsererror');
                    }
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type);
                }
                if (typeof data === 'string') {
                    if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                        data = parseJSON(data);
                    } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        $.globalEval(data);
                    }
                }
                return data;
            };

            return deferred;
        }
    };

    /**
     * ajaxForm() provides a mechanism for fully automating form submission.
     *
     * The advantages of using this method instead of ajaxSubmit() are:
     *
     * 1: This method will include coordinates for <input type="image" /> elements (if the element
     *    is used to submit the form).
     * 2. This method will include the submit element's name/value data (for the element that was
     *    used to submit the form).
     * 3. This method binds the submit() method to the form for you.
     *
     * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
     * passes the options argument along after properly binding events for submit elements and
     * the form itself.
     */
    $.fn.ajaxForm = function (options) {
        options = options || {};
        options.delegation = options.delegation && $.isFunction($.fn.on);

        // in jQuery 1.3+ we can fix mistakes with the ready state
        if (!options.delegation && this.length === 0) {
            var o = { s: this.selector, c: this.context };
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing ajaxForm');
                $(function () {
                    $(o.s, o.c).ajaxForm(options);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        if (options.delegation) {
            $(document)
                .off('submit.form-plugin', this.selector, doAjaxSubmit)
                .off('click.form-plugin', this.selector, captureSubmittingElement)
                .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
                .on('click.form-plugin', this.selector, options, captureSubmittingElement);
            return this;
        }

        return this.ajaxFormUnbind()
            .bind('submit.form-plugin', options, doAjaxSubmit)
            .bind('click.form-plugin', options, captureSubmittingElement);
    };

// private event handlers
    function doAjaxSubmit(e) {
        /*jshint validthis:true */
        var options = e.data;
        if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
            e.preventDefault();
            $(e.target).ajaxSubmit(options); // #365
        }
    }

    function captureSubmittingElement(e) {
        /*jshint validthis:true */
        var target = e.target;
        var $el = $(target);
        if (!($el.is("[type=submit],[type=image]"))) {
            // is this a child element of the submit el?  (ex: a span within a button)
            var t = $el.closest('[type=submit]');
            if (t.length === 0) {
                return;
            }
            target = t[0];
        }
        var form = this;
        form.clk = target;
        if (target.type == 'image') {
            if (e.offsetX !== undefined) {
                form.clk_x = e.offsetX;
                form.clk_y = e.offsetY;
            } else if (typeof $.fn.offset == 'function') {
                var offset = $el.offset();
                form.clk_x = e.pageX - offset.left;
                form.clk_y = e.pageY - offset.top;
            } else {
                form.clk_x = e.pageX - target.offsetLeft;
                form.clk_y = e.pageY - target.offsetTop;
            }
        }
        // clear form vars
        setTimeout(function () {
            form.clk = form.clk_x = form.clk_y = null;
        }, 100);
    }


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
    $.fn.ajaxFormUnbind = function () {
        return this.unbind('submit.form-plugin click.form-plugin');
    };

    /**
     * formToArray() gathers form element data into an array of objects that can
     * be passed to any of the following ajax functions: $.get, $.post, or load.
     * Each object in the array has both a 'name' and 'value' property.  An example of
     * an array for a simple login form might be:
     *
     * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
     *
     * It is this array that is passed to pre-submit callback functions provided to the
     * ajaxSubmit() and ajaxForm() methods.
     */
    $.fn.formToArray = function (semantic, elements) {
        var a = [];
        if (this.length === 0) {
            return a;
        }

        var form = this[0];
        var formId = this.attr('id');
        var els = semantic ? form.getElementsByTagName('*') : form.elements;
        var els2;

        if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
            els = $(els).get();  // convert to standard array
        }

        // #386; account for inputs outside the form which use the 'form' attribute
        if (formId) {
            els2 = $(':input[form=' + formId + ']').get();
            if (els2.length) {
                els = (els || []).concat(els2);
            }
        }

        if (!els || !els.length) {
            return a;
        }

        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n || el.disabled) {
                continue;
            }

            if (semantic && form.clk && el.type == "image") {
                // handle image inputs on the fly when semantic == true
                if (form.clk == el) {
                    a.push({name: n, value: $(el).val(), type: el.type });
                    a.push({name: n + '.x', value: form.clk_x}, {name: n + '.y', value: form.clk_y});
                }
                continue;
            }

            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                if (elements) {
                    elements.push(el);
                }
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({name: n, value: v[j]});
                }
            }
            else if (feature.fileapi && el.type == 'file') {
                if (elements) {
                    elements.push(el);
                }
                var files = el.files;
                if (files.length) {
                    for (j = 0; j < files.length; j++) {
                        a.push({name: n, value: files[j], type: el.type});
                    }
                }
                else {
                    // #180
                    a.push({ name: n, value: '', type: el.type });
                }
            }
            else if (v !== null && typeof v != 'undefined') {
                if (elements) {
                    elements.push(el);
                }
                a.push({name: n, value: v, type: el.type, required: el.required});
            }
        }

        if (!semantic && form.clk) {
            // input type=='image' are not found in elements array! handle it here
            var $input = $(form.clk), input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == 'image') {
                a.push({name: n, value: $input.val()});
                a.push({name: n + '.x', value: form.clk_x}, {name: n + '.y', value: form.clk_y});
            }
        }
        return a;
    };

    /**
     * Serializes form data into a 'submittable' string. This method will return a string
     * in the format: name1=value1&amp;name2=value2
     */
    $.fn.formSerialize = function (semantic) {
        //hand off to jQuery.param for proper encoding
        return $.param(this.formToArray(semantic));
    };

    /**
     * Serializes all field elements in the jQuery object into a query string.
     * This method will return a string in the format: name1=value1&amp;name2=value2
     */
    $.fn.fieldSerialize = function (successful) {
        var a = [];
        this.each(function () {
            var n = this.name;
            if (!n) {
                return;
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({name: n, value: v[i]});
                }
            }
            else if (v !== null && typeof v != 'undefined') {
                a.push({name: this.name, value: v});
            }
        });
        //hand off to jQuery.param for proper encoding
        return $.param(a);
    };

    /**
     * Returns the value(s) of the element in the matched set.  For example, consider the following form:
     *
     *  <form><fieldset>
     *      <input name="A" type="text" />
     *      <input name="A" type="text" />
     *      <input name="B" type="checkbox" value="B1" />
     *      <input name="B" type="checkbox" value="B2"/>
     *      <input name="C" type="radio" value="C1" />
     *      <input name="C" type="radio" value="C2" />
     *  </fieldset></form>
     *
     *  var v = $('input[type=text]').fieldValue();
     *  // if no values are entered into the text inputs
     *  v == ['','']
     *  // if values entered into the text inputs are 'foo' and 'bar'
     *  v == ['foo','bar']
     *
     *  var v = $('input[type=checkbox]').fieldValue();
     *  // if neither checkbox is checked
     *  v === undefined
     *  // if both checkboxes are checked
     *  v == ['B1', 'B2']
     *
     *  var v = $('input[type=radio]').fieldValue();
     *  // if neither radio is checked
     *  v === undefined
     *  // if first radio is checked
     *  v == ['C1']
     *
     * The successful argument controls whether or not the field element must be 'successful'
     * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
     * The default value of the successful argument is true.  If this value is false the value(s)
     * for each element is returned.
     *
     * Note: This method *always* returns an array.  If no valid value can be determined the
     *    array will be empty, otherwise it will contain one or more values.
     */
    $.fn.fieldValue = function (successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
                continue;
            }
            if (v.constructor == Array) {
                $.merge(val, v);
            }
            else {
                val.push(v);
            }
        }
        return val;
    };

    /**
     * Returns the value of the field element.
     */
    $.fieldValue = function (el, successful) {
        var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true;
        }

        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
            (t == 'checkbox' || t == 'radio') && !el.checked ||
            (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
            tag == 'select' && el.selectedIndex == -1)) {
            return null;
        }

        if (tag == 'select') {
            var index = el.selectedIndex;
            if (index < 0) {
                return null;
            }
            var a = [], ops = el.options;
            var one = (t == 'select-one');
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) { // extra pain for IE...
                        v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
                    }
                    if (one) {
                        return v;
                    }
                    a.push(v);
                }
            }
            return a;
        }
        return $(el).val();
    };

    /**
     * Clears the form data.  Takes the following actions on the form's input fields:
     *  - input text fields will have their 'value' property set to the empty string
     *  - select elements will have their 'selectedIndex' property set to -1
     *  - checkbox and radio inputs will have their 'checked' property set to false
     *  - inputs of type submit, button, reset, and hidden will *not* be effected
     *  - button elements will *not* be effected
     */
    $.fn.clearForm = function (includeHidden) {
        return this.each(function () {
            $('input,select,textarea', this).clearFields(includeHidden);
        });
    };

    /**
     * Clears the selected form elements.
     */
    $.fn.clearFields = $.fn.clearInputs = function (includeHidden) {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
        return this.each(function () {
            var t = this.type, tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == 'textarea') {
                this.value = '';
            }
            else if (t == 'checkbox' || t == 'radio') {
                this.checked = false;
            }
            else if (tag == 'select') {
                this.selectedIndex = -1;
            }
            else if (t == "file") {
                if (/MSIE/.test(navigator.userAgent)) {
                    $(this).replaceWith($(this).clone(true));
                } else {
                    $(this).val('');
                }
            }
            else if (includeHidden) {
                // includeHidden can be the value true, or it can be a selector string
                // indicating a special test; for example:
                //  $('#myForm').clearForm('.special:hidden')
                // the above would clean hidden inputs that have the class of 'special'
                if ((includeHidden === true && /hidden/.test(t)) ||
                    (typeof includeHidden == 'string' && $(this).is(includeHidden))) {
                    this.value = '';
                }
            }
        });
    };

    /**
     * Resets the form data.  Causes all form elements to be reset to their original value.
     */
    $.fn.resetForm = function () {
        return this.each(function () {
            // guard against an input with the name of 'reset'
            // note that IE reports the reset function as an 'object'
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
                this.reset();
            }
        });
    };

    /**
     * Enables or disables any matching elements.
     */
    $.fn.enable = function (b) {
        if (b === undefined) {
            b = true;
        }
        return this.each(function () {
            this.disabled = !b;
        });
    };

    /**
     * Checks/unchecks any matching checkboxes or radio buttons and
     * selects/deselects and matching option elements.
     */
    $.fn.selected = function (select) {
        if (select === undefined) {
            select = true;
        }
        return this.each(function () {
            var t = this.type;
            if (t == 'checkbox' || t == 'radio') {
                this.checked = select;
            }
            else if (this.tagName.toLowerCase() == 'option') {
                var $sel = $(this).parent('select');
                if (select && $sel[0] && $sel[0].type == 'select-one') {
                    // deselect all other options
                    $sel.find('option').selected(false);
                }
                this.selected = select;
            }
        });
    };

// expose debug var
    $.fn.ajaxSubmit.debug = false;

// helper fn for console logging
    function log() {
        if (!$.fn.ajaxSubmit.debug) {
            return;
        }
        var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
        if (window.console && window.console.log) {
            window.console.log(msg);
        }
        else if (window.opera && window.opera.postError) {
            window.opera.postError(msg);
        }
    }

}));


//! moment.js
//! version : 2.8.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b,c){switch(arguments.length){case 2:return null!=a?a:b;case 3:return null!=a?a:null!=b?b:c;default:throw new Error("Implement me")}}function c(a,b){return zb.call(a,b)}function d(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function e(a){tb.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function f(a,b){var c=!0;return m(function(){return c&&(e(a),c=!1),b.apply(this,arguments)},b)}function g(a,b){qc[a]||(e(b),qc[a]=!0)}function h(a,b){return function(c){return p(a.call(this,c),b)}}function i(a,b){return function(c){return this.localeData().ordinal(a.call(this,c),b)}}function j(){}function k(a,b){b!==!1&&F(a),n(this,a),this._d=new Date(+a._d)}function l(a){var b=y(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=tb.localeData(),this._bubble()}function m(a,b){for(var d in b)c(b,d)&&(a[d]=b[d]);return c(b,"toString")&&(a.toString=b.toString),c(b,"valueOf")&&(a.valueOf=b.valueOf),a}function n(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=b._pf),"undefined"!=typeof b._locale&&(a._locale=b._locale),Ib.length>0)for(c in Ib)d=Ib[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function o(a){return 0>a?Math.ceil(a):Math.floor(a)}function p(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function q(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function r(a,b){var c;return b=K(b,a),a.isBefore(b)?c=q(a,b):(c=q(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function s(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(g(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=tb.duration(c,d),t(this,e,a),this}}function t(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&nb(a,"Date",mb(a,"Date")+f*c),g&&lb(a,mb(a,"Month")+g*c),d&&tb.updateOffset(a,f||g)}function u(a){return"[object Array]"===Object.prototype.toString.call(a)}function v(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function w(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&A(a[d])!==A(b[d]))&&g++;return g+f}function x(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=jc[a]||kc[b]||b}return a}function y(a){var b,d,e={};for(d in a)c(a,d)&&(b=x(d),b&&(e[b]=a[d]));return e}function z(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}tb[b]=function(e,f){var g,h,i=tb._locale[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=tb().utc().set(d,a);return i.call(tb._locale,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function A(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function B(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function C(a,b,c){return hb(tb([a,11,31+b-c]),b,c).week}function D(a){return E(a)?366:365}function E(a){return a%4===0&&a%100!==0||a%400===0}function F(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[Bb]<0||a._a[Bb]>11?Bb:a._a[Cb]<1||a._a[Cb]>B(a._a[Ab],a._a[Bb])?Cb:a._a[Db]<0||a._a[Db]>24||24===a._a[Db]&&(0!==a._a[Eb]||0!==a._a[Fb]||0!==a._a[Gb])?Db:a._a[Eb]<0||a._a[Eb]>59?Eb:a._a[Fb]<0||a._a[Fb]>59?Fb:a._a[Gb]<0||a._a[Gb]>999?Gb:-1,a._pf._overflowDayOfYear&&(Ab>b||b>Cb)&&(b=Cb),a._pf.overflow=b)}function G(b){return null==b._isValid&&(b._isValid=!isNaN(b._d.getTime())&&b._pf.overflow<0&&!b._pf.empty&&!b._pf.invalidMonth&&!b._pf.nullInput&&!b._pf.invalidFormat&&!b._pf.userInvalidated,b._strict&&(b._isValid=b._isValid&&0===b._pf.charsLeftOver&&0===b._pf.unusedTokens.length&&b._pf.bigHour===a)),b._isValid}function H(a){return a?a.toLowerCase().replace("_","-"):a}function I(a){for(var b,c,d,e,f=0;f<a.length;){for(e=H(a[f]).split("-"),b=e.length,c=H(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=J(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&w(e,c,!0)>=b-1)break;b--}f++}return null}function J(a){var b=null;if(!Hb[a]&&Jb)try{b=tb.locale(),require("./locale/"+a),tb.locale(b)}catch(c){}return Hb[a]}function K(a,b){var c,d;return b._isUTC?(c=b.clone(),d=(tb.isMoment(a)||v(a)?+a:+tb(a))-+c,c._d.setTime(+c._d+d),tb.updateOffset(c,!1),c):tb(a).local()}function L(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function M(a){var b,c,d=a.match(Nb);for(b=0,c=d.length;c>b;b++)d[b]=pc[d[b]]?pc[d[b]]:L(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function N(a,b){return a.isValid()?(b=O(b,a.localeData()),lc[b]||(lc[b]=M(b)),lc[b](a)):a.localeData().invalidDate()}function O(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Ob.lastIndex=0;d>=0&&Ob.test(a);)a=a.replace(Ob,c),Ob.lastIndex=0,d-=1;return a}function P(a,b){var c,d=b._strict;switch(a){case"Q":return Zb;case"DDDD":return _b;case"YYYY":case"GGGG":case"gggg":return d?ac:Rb;case"Y":case"G":case"g":return cc;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?bc:Sb;case"S":if(d)return Zb;case"SS":if(d)return $b;case"SSS":if(d)return _b;case"DDD":return Qb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ub;case"a":case"A":return b._locale._meridiemParse;case"x":return Xb;case"X":return Yb;case"Z":case"ZZ":return Vb;case"T":return Wb;case"SSSS":return Tb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?$b:Pb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Pb;case"Do":return d?b._locale._ordinalParse:b._locale._ordinalParseLenient;default:return c=new RegExp(Y(X(a.replace("\\","")),"i"))}}function Q(a){a=a||"";var b=a.match(Vb)||[],c=b[b.length-1]||[],d=(c+"").match(hc)||["-",0,0],e=+(60*d[1])+A(d[2]);return"+"===d[0]?-e:e}function R(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[Bb]=3*(A(b)-1));break;case"M":case"MM":null!=b&&(e[Bb]=A(b)-1);break;case"MMM":case"MMMM":d=c._locale.monthsParse(b,a,c._strict),null!=d?e[Bb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[Cb]=A(b));break;case"Do":null!=b&&(e[Cb]=A(parseInt(b.match(/\d{1,2}/)[0],10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=A(b));break;case"YY":e[Ab]=tb.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[Ab]=A(b);break;case"a":case"A":c._isPm=c._locale.isPM(b);break;case"h":case"hh":c._pf.bigHour=!0;case"H":case"HH":e[Db]=A(b);break;case"m":case"mm":e[Eb]=A(b);break;case"s":case"ss":e[Fb]=A(b);break;case"S":case"SS":case"SSS":case"SSSS":e[Gb]=A(1e3*("0."+b));break;case"x":c._d=new Date(A(b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=Q(b);break;case"dd":case"ddd":case"dddd":d=c._locale.weekdaysParse(b),null!=d?(c._w=c._w||{},c._w.d=d):c._pf.invalidWeekday=b;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":a=a.substr(0,1);case"gggg":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=A(b));break;case"gg":case"GG":c._w=c._w||{},c._w[a]=tb.parseTwoDigitYear(b)}}function S(a){var c,d,e,f,g,h,i;c=a._w,null!=c.GG||null!=c.W||null!=c.E?(g=1,h=4,d=b(c.GG,a._a[Ab],hb(tb(),1,4).year),e=b(c.W,1),f=b(c.E,1)):(g=a._locale._week.dow,h=a._locale._week.doy,d=b(c.gg,a._a[Ab],hb(tb(),g,h).year),e=b(c.w,1),null!=c.d?(f=c.d,g>f&&++e):f=null!=c.e?c.e+g:g),i=ib(d,e,f,h,g),a._a[Ab]=i.year,a._dayOfYear=i.dayOfYear}function T(a){var c,d,e,f,g=[];if(!a._d){for(e=V(a),a._w&&null==a._a[Cb]&&null==a._a[Bb]&&S(a),a._dayOfYear&&(f=b(a._a[Ab],e[Ab]),a._dayOfYear>D(f)&&(a._pf._overflowDayOfYear=!0),d=db(f,0,a._dayOfYear),a._a[Bb]=d.getUTCMonth(),a._a[Cb]=d.getUTCDate()),c=0;3>c&&null==a._a[c];++c)a._a[c]=g[c]=e[c];for(;7>c;c++)a._a[c]=g[c]=null==a._a[c]?2===c?1:0:a._a[c];24===a._a[Db]&&0===a._a[Eb]&&0===a._a[Fb]&&0===a._a[Gb]&&(a._nextDay=!0,a._a[Db]=0),a._d=(a._useUTC?db:cb).apply(null,g),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()+a._tzm),a._nextDay&&(a._a[Db]=24)}}function U(a){var b;a._d||(b=y(a._i),a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],T(a))}function V(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function W(b){if(b._f===tb.ISO_8601)return void $(b);b._a=[],b._pf.empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=O(b._f,b._locale).match(Nb)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(P(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&b._pf.unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),pc[f]?(d?b._pf.empty=!1:b._pf.unusedTokens.push(f),R(f,d,b)):b._strict&&!d&&b._pf.unusedTokens.push(f);b._pf.charsLeftOver=i-j,h.length>0&&b._pf.unusedInput.push(h),b._pf.bigHour===!0&&b._a[Db]<=12&&(b._pf.bigHour=a),b._isPm&&b._a[Db]<12&&(b._a[Db]+=12),b._isPm===!1&&12===b._a[Db]&&(b._a[Db]=0),T(b),F(b)}function X(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function Y(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function Z(a){var b,c,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._pf=d(),b._f=a._f[f],W(b),G(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,c=b));m(a,c||b)}function $(a){var b,c,d=a._i,e=dc.exec(d);if(e){for(a._pf.iso=!0,b=0,c=fc.length;c>b;b++)if(fc[b][1].exec(d)){a._f=fc[b][0]+(e[6]||" ");break}for(b=0,c=gc.length;c>b;b++)if(gc[b][1].exec(d)){a._f+=gc[b][0];break}d.match(Vb)&&(a._f+="Z"),W(a)}else a._isValid=!1}function _(a){$(a),a._isValid===!1&&(delete a._isValid,tb.createFromInputFallback(a))}function ab(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function bb(b){var c,d=b._i;d===a?b._d=new Date:v(d)?b._d=new Date(+d):null!==(c=Kb.exec(d))?b._d=new Date(+c[1]):"string"==typeof d?_(b):u(d)?(b._a=ab(d.slice(0),function(a){return parseInt(a,10)}),T(b)):"object"==typeof d?U(b):"number"==typeof d?b._d=new Date(d):tb.createFromInputFallback(b)}function cb(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function db(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function eb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function fb(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function gb(a,b,c){var d=tb.duration(a).abs(),e=yb(d.as("s")),f=yb(d.as("m")),g=yb(d.as("h")),h=yb(d.as("d")),i=yb(d.as("M")),j=yb(d.as("y")),k=e<mc.s&&["s",e]||1===f&&["m"]||f<mc.m&&["mm",f]||1===g&&["h"]||g<mc.h&&["hh",g]||1===h&&["d"]||h<mc.d&&["dd",h]||1===i&&["M"]||i<mc.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,fb.apply({},k)}function hb(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=tb(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ib(a,b,c,d,e){var f,g,h=db(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:D(a-1)+g}}function jb(b){var c,d=b._i,e=b._f;return b._locale=b._locale||tb.localeData(b._l),null===d||e===a&&""===d?tb.invalid({nullInput:!0}):("string"==typeof d&&(b._i=d=b._locale.preparse(d)),tb.isMoment(d)?new k(d,!0):(e?u(e)?Z(b):W(b):bb(b),c=new k(b),c._nextDay&&(c.add(1,"d"),c._nextDay=a),c))}function kb(a,b){var c,d;if(1===b.length&&u(b[0])&&(b=b[0]),!b.length)return tb();for(c=b[0],d=1;d<b.length;++d)b[d][a](c)&&(c=b[d]);return c}function lb(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),B(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function mb(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function nb(a,b,c){return"Month"===b?lb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function ob(a,b){return function(c){return null!=c?(nb(this,a,c),tb.updateOffset(this,b),this):mb(this,a)}}function pb(a){return 400*a/146097}function qb(a){return 146097*a/400}function rb(a){tb.duration.fn[a]=function(){return this._data[a]}}function sb(a){"undefined"==typeof ender&&(ub=xb.moment,xb.moment=a?f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",tb):tb)}for(var tb,ub,vb,wb="2.8.4",xb="undefined"!=typeof global?global:this,yb=Math.round,zb=Object.prototype.hasOwnProperty,Ab=0,Bb=1,Cb=2,Db=3,Eb=4,Fb=5,Gb=6,Hb={},Ib=[],Jb="undefined"!=typeof module&&module&&module.exports,Kb=/^\/?Date\((\-?\d+)/i,Lb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Mb=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Nb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Ob=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Pb=/\d\d?/,Qb=/\d{1,3}/,Rb=/\d{1,4}/,Sb=/[+\-]?\d{1,6}/,Tb=/\d+/,Ub=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Vb=/Z|[\+\-]\d\d:?\d\d/gi,Wb=/T/i,Xb=/[\+\-]?\d+/,Yb=/[\+\-]?\d+(\.\d{1,3})?/,Zb=/\d/,$b=/\d\d/,_b=/\d{3}/,ac=/\d{4}/,bc=/[+-]?\d{6}/,cc=/[+-]?\d+/,dc=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,ec="YYYY-MM-DDTHH:mm:ssZ",fc=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],gc=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],hc=/([\+\-]|\d\d)/gi,ic=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),jc={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},kc={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},lc={},mc={s:45,m:45,h:22,d:26,M:11},nc="DDD w W M D d".split(" "),oc="M D H h m s w W".split(" "),pc={M:function(){return this.month()+1},MMM:function(a){return this.localeData().monthsShort(this,a)},MMMM:function(a){return this.localeData().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.localeData().weekdaysMin(this,a)},ddd:function(a){return this.localeData().weekdaysShort(this,a)},dddd:function(a){return this.localeData().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return p(this.year()%100,2)},YYYY:function(){return p(this.year(),4)},YYYYY:function(){return p(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+p(Math.abs(a),6)},gg:function(){return p(this.weekYear()%100,2)},gggg:function(){return p(this.weekYear(),4)},ggggg:function(){return p(this.weekYear(),5)},GG:function(){return p(this.isoWeekYear()%100,2)},GGGG:function(){return p(this.isoWeekYear(),4)},GGGGG:function(){return p(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return A(this.milliseconds()/100)},SS:function(){return p(A(this.milliseconds()/10),2)},SSS:function(){return p(this.milliseconds(),3)},SSSS:function(){return p(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+p(A(a/60),2)+":"+p(A(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+p(A(a/60),2)+p(A(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},x:function(){return this.valueOf()},X:function(){return this.unix()},Q:function(){return this.quarter()}},qc={},rc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];nc.length;)vb=nc.pop(),pc[vb+"o"]=i(pc[vb],vb);for(;oc.length;)vb=oc.pop(),pc[vb+vb]=h(pc[vb],2);pc.DDDD=h(pc.DDD,3),m(j.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=tb.utc([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=tb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.apply(b,[c]):d},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",_ordinalParse:/\d{1,2}/,preparse:function(a){return a},postformat:function(a){return a},week:function(a){return hb(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),tb=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=b,g._f=c,g._l=e,g._strict=f,g._isUTC=!1,g._pf=d(),jb(g)},tb.suppressDeprecationWarnings=!1,tb.createFromInputFallback=f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),tb.min=function(){var a=[].slice.call(arguments,0);return kb("isBefore",a)},tb.max=function(){var a=[].slice.call(arguments,0);return kb("isAfter",a)},tb.utc=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=b,g._f=c,g._strict=f,g._pf=d(),jb(g).utc()},tb.unix=function(a){return tb(1e3*a)},tb.duration=function(a,b){var d,e,f,g,h=a,i=null;return tb.isDuration(a)?h={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(h={},b?h[b]=a:h.milliseconds=a):(i=Lb.exec(a))?(d="-"===i[1]?-1:1,h={y:0,d:A(i[Cb])*d,h:A(i[Db])*d,m:A(i[Eb])*d,s:A(i[Fb])*d,ms:A(i[Gb])*d}):(i=Mb.exec(a))?(d="-"===i[1]?-1:1,f=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*d},h={y:f(i[2]),M:f(i[3]),d:f(i[4]),h:f(i[5]),m:f(i[6]),s:f(i[7]),w:f(i[8])}):"object"==typeof h&&("from"in h||"to"in h)&&(g=r(tb(h.from),tb(h.to)),h={},h.ms=g.milliseconds,h.M=g.months),e=new l(h),tb.isDuration(a)&&c(a,"_locale")&&(e._locale=a._locale),e},tb.version=wb,tb.defaultFormat=ec,tb.ISO_8601=function(){},tb.momentProperties=Ib,tb.updateOffset=function(){},tb.relativeTimeThreshold=function(b,c){return mc[b]===a?!1:c===a?mc[b]:(mc[b]=c,!0)},tb.lang=f("moment.lang is deprecated. Use moment.locale instead.",function(a,b){return tb.locale(a,b)}),tb.locale=function(a,b){var c;return a&&(c="undefined"!=typeof b?tb.defineLocale(a,b):tb.localeData(a),c&&(tb.duration._locale=tb._locale=c)),tb._locale._abbr},tb.defineLocale=function(a,b){return null!==b?(b.abbr=a,Hb[a]||(Hb[a]=new j),Hb[a].set(b),tb.locale(a),Hb[a]):(delete Hb[a],null)},tb.langData=f("moment.langData is deprecated. Use moment.localeData instead.",function(a){return tb.localeData(a)}),tb.localeData=function(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return tb._locale;if(!u(a)){if(b=J(a))return b;a=[a]}return I(a)},tb.isMoment=function(a){return a instanceof k||null!=a&&c(a,"_isAMomentObject")},tb.isDuration=function(a){return a instanceof l};for(vb=rc.length-1;vb>=0;--vb)z(rc[vb]);tb.normalizeUnits=function(a){return x(a)},tb.invalid=function(a){var b=tb.utc(0/0);return null!=a?m(b._pf,a):b._pf.userInvalidated=!0,b},tb.parseZone=function(){return tb.apply(null,arguments).parseZone()},tb.parseTwoDigitYear=function(a){return A(a)+(A(a)>68?1900:2e3)},m(tb.fn=k.prototype,{clone:function(){return tb(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=tb(this).utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():N(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):N(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return G(this)},isDSTShifted:function(){return this._a?this.isValid()&&w(this._a,(this._isUTC?tb.utc(this._a):tb(this._a)).toArray())>0:!1},parsingFlags:function(){return m({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(a){return this.zone(0,a)},local:function(a){return this._isUTC&&(this.zone(0,a),this._isUTC=!1,a&&this.add(this._dateTzOffset(),"m")),this},format:function(a){var b=N(this,a||tb.defaultFormat);return this.localeData().postformat(b)},add:s(1,"add"),subtract:s(-1,"subtract"),diff:function(a,b,c){var d,e,f,g=K(a,this),h=6e4*(this.zone()-g.zone());return b=x(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+g.daysInMonth()),e=12*(this.year()-g.year())+(this.month()-g.month()),f=this-tb(this).startOf("month")-(g-tb(g).startOf("month")),f-=6e4*(this.zone()-tb(this).startOf("month").zone()-(g.zone()-tb(g).startOf("month").zone())),e+=f/d,"year"===b&&(e/=12)):(d=this-g,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-h)/864e5:"week"===b?(d-h)/6048e5:d),c?e:o(e)},from:function(a,b){return tb.duration({to:this,from:a}).locale(this.locale()).humanize(!b)},fromNow:function(a){return this.from(tb(),a)},calendar:function(a){var b=a||tb(),c=K(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,tb(b)))},isLeapYear:function(){return E(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=eb(a,this.localeData()),this.add(a-b,"d")):b},month:ob("Month",!0),startOf:function(a){switch(a=x(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(b){return b=x(b),b===a||"millisecond"===b?this:this.startOf(b).add(1,"isoWeek"===b?"week":b).subtract(1,"ms")},isAfter:function(a,b){var c;return b=x("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+this>+a):(c=tb.isMoment(a)?+a:+tb(a),c<+this.clone().startOf(b))},isBefore:function(a,b){var c;return b=x("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+a>+this):(c=tb.isMoment(a)?+a:+tb(a),+this.clone().endOf(b)<c)},isSame:function(a,b){var c;return b=x(b||"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+this===+a):(c=+tb(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))},min:f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(a){return a=tb.apply(null,arguments),this>a?this:a}),max:f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(a){return a=tb.apply(null,arguments),a>this?this:a}),zone:function(a,b){var c,d=this._offset||0;return null==a?this._isUTC?d:this._dateTzOffset():("string"==typeof a&&(a=Q(a)),Math.abs(a)<16&&(a=60*a),!this._isUTC&&b&&(c=this._dateTzOffset()),this._offset=a,this._isUTC=!0,null!=c&&this.subtract(c,"m"),d!==a&&(!b||this._changeInProgress?t(this,tb.duration(d-a,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,tb.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?tb(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return B(this.year(),this.month())},dayOfYear:function(a){var b=yb((tb(this).startOf("day")-tb(this).startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=hb(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")},isoWeekYear:function(a){var b=hb(this,1,4).year;return null==a?b:this.add(a-b,"y")},week:function(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")},isoWeek:function(a){var b=hb(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")},weekday:function(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return C(this.year(),1,4)},weeksInYear:function(){var a=this.localeData()._week;return C(this.year(),a.dow,a.doy)},get:function(a){return a=x(a),this[a]()},set:function(a,b){return a=x(a),"function"==typeof this[a]&&this[a](b),this},locale:function(b){var c;return b===a?this._locale._abbr:(c=tb.localeData(b),null!=c&&(this._locale=c),this)},lang:f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(b){return b===a?this.localeData():this.locale(b)}),localeData:function(){return this._locale},_dateTzOffset:function(){return 15*Math.round(this._d.getTimezoneOffset()/15)}}),tb.fn.millisecond=tb.fn.milliseconds=ob("Milliseconds",!1),tb.fn.second=tb.fn.seconds=ob("Seconds",!1),tb.fn.minute=tb.fn.minutes=ob("Minutes",!1),tb.fn.hour=tb.fn.hours=ob("Hours",!0),tb.fn.date=ob("Date",!0),tb.fn.dates=f("dates accessor is deprecated. Use date instead.",ob("Date",!0)),tb.fn.year=ob("FullYear",!0),tb.fn.years=f("years accessor is deprecated. Use year instead.",ob("FullYear",!0)),tb.fn.days=tb.fn.day,tb.fn.months=tb.fn.month,tb.fn.weeks=tb.fn.week,tb.fn.isoWeeks=tb.fn.isoWeek,tb.fn.quarters=tb.fn.quarter,tb.fn.toJSON=tb.fn.toISOString,m(tb.duration.fn=l.prototype,{_bubble:function(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;g.milliseconds=d%1e3,a=o(d/1e3),g.seconds=a%60,b=o(a/60),g.minutes=b%60,c=o(b/60),g.hours=c%24,e+=o(c/24),h=o(pb(e)),e-=o(qb(h)),f+=o(e/30),e%=30,h+=o(f/12),f%=12,g.days=e,g.months=f,g.years=h},abs:function(){return this._milliseconds=Math.abs(this._milliseconds),this._days=Math.abs(this._days),this._months=Math.abs(this._months),this._data.milliseconds=Math.abs(this._data.milliseconds),this._data.seconds=Math.abs(this._data.seconds),this._data.minutes=Math.abs(this._data.minutes),this._data.hours=Math.abs(this._data.hours),this._data.months=Math.abs(this._data.months),this._data.years=Math.abs(this._data.years),this},weeks:function(){return o(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*A(this._months/12)},humanize:function(a){var b=gb(this,!a,this.localeData());return a&&(b=this.localeData().pastFuture(+this,b)),this.localeData().postformat(b)},add:function(a,b){var c=tb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=tb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=x(a),this[a.toLowerCase()+"s"]()},as:function(a){var b,c;if(a=x(a),"month"===a||"year"===a)return b=this._days+this._milliseconds/864e5,c=this._months+12*pb(b),"month"===a?c:c/12;switch(b=this._days+Math.round(qb(this._months/12)),a){case"week":return b/7+this._milliseconds/6048e5;case"day":return b+this._milliseconds/864e5;case"hour":return 24*b+this._milliseconds/36e5;case"minute":return 24*b*60+this._milliseconds/6e4;case"second":return 24*b*60*60+this._milliseconds/1e3;
    case"millisecond":return Math.floor(24*b*60*60*1e3)+this._milliseconds;default:throw new Error("Unknown unit "+a)}},lang:tb.fn.lang,locale:tb.fn.locale,toIsoString:f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",function(){return this.toISOString()}),toISOString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"},localeData:function(){return this._locale}}),tb.duration.fn.toString=tb.duration.fn.toISOString;for(vb in ic)c(ic,vb)&&rb(vb.toLowerCase());tb.duration.fn.asMilliseconds=function(){return this.as("ms")},tb.duration.fn.asSeconds=function(){return this.as("s")},tb.duration.fn.asMinutes=function(){return this.as("m")},tb.duration.fn.asHours=function(){return this.as("h")},tb.duration.fn.asDays=function(){return this.as("d")},tb.duration.fn.asWeeks=function(){return this.as("weeks")},tb.duration.fn.asMonths=function(){return this.as("M")},tb.duration.fn.asYears=function(){return this.as("y")},tb.locale("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===A(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),Jb?module.exports=tb:"function"==typeof define&&define.amd?(define("moment",function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(xb.moment=ub),tb}),sb(!0)):sb()}).call(this);
function checkUniqueUrl(resource_type, event)
{
    var url = event.target.value;
    if (url.length > 0)
    {
        $.ajax({
            url: 'api/'+resource_type+'/url/check',
            method: 'POST',
            data: JSON.stringify({'url': url}),
            success: function(data) {
                var answer = JSON.parse(data);
                if (answer.unique) {
                    $('#unique-url-error').hide();
                    $('#'+resource_type+'_save').prop('disabled', false);
                } else {
                    $('#'+resource_type+'_save').prop('disabled', true);
                    $('#unique-url-error-id').text(answer.id);
                    $('#unique-url-error-name').text(answer.title);
                    $('#unique-url-error').show();
                }
            }
        });
    }
}
var init = function() {
    $('#open_lexicon_link').button();
    $('#lexicon_name_save').on('click', function() {
        $('#tab-title-rels').removeClass('ui-state-no-content');
    });
    $('#lexicon_name_name').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'https://de.wikipedia.org/w/api.php',
                data: {
                    format: 'json',
                    action: 'opensearch',
                    continue: '',
                    limit: 10,
                    namespace: 0,
                    search: request.term
                },
                dataType: 'jsonp',
                cache: true,
                context: $('#lexicon'),
                success: function (data) {
                    response(data[1]);
                }
            });
        },
        minLength: 2,
        appendTo: 'body'
    });
    $('form#form-assign-lexicon').ajaxForm({
        delegation: true,
        dataType: 'json',
        success: [ function(data) {
            $('#lexicon-tags').html(data['resource-lexicon']);
            init();
            $('#lexicon_name_name').focus();
        }],
        error: function (jqXHR, textStatus, errorThrown, $form) {
            $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
        }

    });
    $('#lexicon-tags input[type=submit]').button({
        icons: {
            primary: "ui-icon-disk"
        }
    });
    !$('#lexicon-tags .vtp-uiinfo-info').length || $('#lexicon-tags .vtp-uiinfo-info').position({
        my: 'right top',
        at: 'right bottom',
        of: '#lexicon-tags .vtp-uiinfo-anchor',
        collision: 'none'
    }).hide("fade", 3000);

    $('.vtp-lexiconbox-item').click(function() {
        $('#open_lexicon_link').attr('href', $(this).data('link')).show(400);
        var text = $(this).text().trim();
        var pos = text.search(new RegExp('\\(\\d+\\)'));
        if (pos > -1) {
            text = text.substring(0, pos).trim();
        }
        $('#lexicon_name_name').val(text);
    });
    $('.vtp-lexicon-submit').click(function(event) {
        var input = $('#lexicon_name_name');
        if (input.val() == "") {
            input.focus();
            event.preventDefault();
        }
    });
    $('#lexicon_name_name').on("input", function() {
        $('#open_lexicon_link').hide(400);
    });
    if ($('#lexicon_name_can_add').val() != "1") {
        $('#lexicon_name_save').button('disable');
    }
    if ($('#lexicon_name_can_remove').val() != "1") {
        $('#lexicon_name_remove').button('disable');
    }
};
var init = function() {
    $('form#form-tag-lexicon').ajaxForm({
        delegation: true,
        dataType: 'json',
        success: [ function(data) {
            $('#lexicon-tags').html(data['resource-tag']);
            init();
            $('#tag_lexicon_text').focus();
            $('#div-confirm-tagging-lexicon').hide();

        }],
        error: function (jqXHR, textStatus, errorThrown, $form) {
            $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
        }

    });
    $('#tag_lexicon_text').autocomplete({
        source: vitoop.baseUrl + (['tag', 'suggest'].join('/')) + '?id=' + getResId(),
        minLength: 2,
        appendTo: 'body'
    });
    $('.vtp-uiaction-tag-lexicon-showown').button({
        icons: {
            primary: "ui-icon-lightbulb"
        },
        text: false
    });
    $('.vtp-uiaction-tag-lexicon-showown').on('change', function () {
        $('#vtp-tagbox-lexicon .vtp-owntag').toggleClass('vtp-owntag-hilight');
    });
    $('.vtp-uiaction-tag-lexicon-showown:checked').triggerHandler('change');
    $('#tags-lexicon-fieldset input[type=submit]').button({
        icons: {
            primary: "ui-icon-tag"
        }
    });
    !$('#tags-lexicon-fieldset .vtp-uiinfo-info').length || $('#tags-lexicon-fieldset .vtp-uiinfo-info').position({
        my: 'left bottom',
        at: 'right top',
        of: '#tags-lexicon-fieldset .vtp-uiinfo-anchor',
        collision: 'none'
    }).hide("fade", 3000);
    $('.vtp-tagbox-lexicon-tag-lexicon').click(function() {
        console.log('clicked');
        var text = $(this).text().trim();
        var pos = text.search(new RegExp('\\(\\d+\\)'));
        if (pos > -1) {
            text = text.substring(0, pos).trim();
        }
        $('#tag_lexicon_text').val(text);
    });

    $('#tag_lexicon_confirm_save').on('click', function() {
        console.log('clicked');
        if ($('#tag_lexicon_text').val() == "") {
            return false;
        }
        var tagExist = false;
        $('ul.ui-autocomplete > li').each(function(index) {
            if ($(this).text().toLowerCase() == $('#tag_lexicon_text').val().toLowerCase()) {
                tagExist = true;
                return false;
            }
        });
        console.log('tagExist: '+ tagExist);
        if (!tagExist) {
            $('div#vtp-tagbox-lexicon > span').each(function(index) {
                var text = $(this).text().trim();
                var pos = text.search(new RegExp('\\(\\d+\\)'));
                if (pos > -1) {
                    text = text.substring(0, pos).trim();
                }
                if (text.toLowerCase() == $('#tag_lexicon_text').val().toLowerCase()) {
                    tagExist = true;
                    return false;
                }
            });
        }
        if (tagExist) {
            $('#tag_lexicon_save').trigger('click');
        } else {
            $('#tag_lexicon_confirm_save').hide();
            $('#tag_lexicon_remove').hide();
            $('#div-confirm-tagging-lexicon').show();
        }
    });

    $('#tag_lexicon_cancel_save').on('click', function() {
        $('#tag_lexicon_confirm_save').show();
        $('#tag_lexicon_remove').show();
        $('#div-confirm-tagging-lexicon').hide();
        $('#tag_lexicon_text').val('');
    });

    $('.vtp-tag-lexicon-submit').click(function(event) {
        var input = $('#tag_lexicon_text');
        var text = input.val();
        if (text == "") {
            input.focus();
            event.preventDefault();
            return false;
        }
    });

    if ($('#tag_lexicon_can_add').val() != "1") {
        $('#tag_lexicon_save').button('disable');
        $('#tag_lexicon_confirm_save').prop('disabled', true);
        $('#tag_lexicon_confirm_save').addClass('ui-button-disabled ui-state-disabled');
    }
    if ($('#tag_lexicon_can_remove').val() != "1") {
        $('#tag_lexicon_remove').button('disable');
    }
};
/**
 * JavaScript GUI for Vitoop Module: resource_detail.js
 */

resourceDetail = (function () {

    var tab_loaded = [ 0, 0, 0, 0, 0 ],

        tab_name = [ 'quickview', 'remark', 'remark_private', 'comments', 'assignments' ],

        res_type = '',

        res_id = 0, res_id_last = 0, prev_id = 0, next_id = 0,

        tr_res = null,

        arr_tr_res_attr_id = {},

        refresh_list = false,

        uifyContainer = function (container_name) {
            var action_icon_map;

            if ('resource-buttons' == container_name) {
                // jQueryUI-ify the received buttons
                action_icon_map = {
                    "previous": "ui-icon-circle-triangle-w",
                    "next": "ui-icon-circle-triangle-e",
                    "save": "ui-icon-disk",
                    "delete": "ui-icon-trash",
                    "new": "ui-icon-document",
                    "blame": "ui-icon-alert"
                };
                $.each(action_icon_map, function (action, icon) {
                    $('button.vtp-uiaction-detail-' + action).button({
                        icons: {
                            primary: icon
                        },
                        label: action,
                        text: false
                    });
                });
                // @TODO Handler
                if (-1 === prev_id) {
                    $('.vtp-uiaction-detail-previous').button('option', 'disabled', true);
                } else {
                    $('.vtp-uiaction-detail-previous').on('click', previousResource);
                }
                if (-1 === next_id) {
                    $('.vtp-uiaction-detail-next').button('option', 'disabled', true);
                } else {
                    $('.vtp-uiaction-detail-next').on('click', nextResource);
                }
                $('.vtp-uiaction-detail-save').on('click', function () {
                    $('#resource-data input[type=submit]').trigger('submit');
                });
                $('.vtp-uiaction-detail-delete').on('click', deleteResource);
                $('.vtp-uiaction-detail-new').on('click', newResource);
                $('.vtp-uiaction-detail-blame').on('click', blameResource);
            }
            /*************************************************************************
             * UIfy: data
             ************************************************************************/
            if ('resource-data' == container_name) {
                $('#' + container_name + ' .vtp-uiaction-open-url').button({
                    icons: {
                        primary: "ui-icon-extlink"
                    },
                    text: false
                });

                $('#' + container_name + ' #link_is_hp').button({
                    icons: {
                        primary: "ui-icon-home"
                    },
                    text: false
                });

                $('#' + container_name + ' .vtp-uiaction-open-mail').button({
                    icons: {
                        primary: "ui-icon-mail-closed"
                    },
                    text: false
                });

                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-disk"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right bottom',
                    at: 'left top',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);


                if (res_type == "prj") {
                    var nameOrigin = $('#prj_name').val();
                    var textOrigin = $('#prj_description').val();
                    var buttonSave = $('#prj_save');

                    var isChanged = function() {
                        var name = $('#prj_name').val();
                        var text = $('#prj_description').val();
                        return ((nameOrigin.length != name.length) || (textOrigin.length != text.length) || (nameOrigin != name) || (textOrigin != text));
                    };

                    var changeClassOfButton = function() {
                        if (!isChanged()) {
                            buttonSave.removeClass('ui-state-need-to-save');
                        } else {
                            buttonSave.addClass('ui-state-need-to-save');
                        }
                    };

                    $('#prj_name').on('change keyup', changeClassOfButton);
                    $('#prj_description').on('change keyup', changeClassOfButton);
                };
            }
            /*************************************************************************
             * UIfy: rating
             ************************************************************************/
            if ('resource-rating' == container_name) {
                var flag_initslider = true;
                var rate_state = 1;
                var cnt_rating_infobox = 1;
                // Move the rating-infobox to the header, but remove the old one if
                // exists
                $('#vtp-rating-infobox-li').remove();
                $('<li id="vtp-rating-infobox-li"></li>').insertAfter('#vtp-res-dialog-tabs>ul>li:last').append(
                    $('#vtp-rating-infobox-wrapper'));
                // left/right-buttons
                cnt_rating_infobox = $('.vtp-rating-infobox').length;
                if (cnt_rating_infobox == 1) {
                    // if there is only one, no handlers must be set and the right-arrow
                    // must be disabled
                    $('#vtp-rating-infobox-right').addClass('ui-state-disabled')
                } else {
                    $('#vtp-rating-infobox-right').on('click', function () {
                        if (!$(this).hasClass('ui-state-disabled')) {
                            if (rate_state == 1) {
                                $('#vtp-rating-infobox-left').removeClass('ui-state-disabled');
                            }
                            $('#vtp-rating-infobox-' + rate_state).hide('blind', {
                                'direction': 'left'
                            }, 1000);
                            rate_state += 1;
                            if (rate_state == cnt_rating_infobox) {
                                $('#vtp-rating-infobox-right').addClass('ui-state-disabled');
                            }
                        }
                    });
                    $('#vtp-rating-infobox-left').on('click', function () {
                        if (!$(this).hasClass('ui-state-disabled')) {
                            if (rate_state == cnt_rating_infobox) {
                                $('#vtp-rating-infobox-right').removeClass('ui-state-disabled');
                            }
                            $('#vtp-rating-infobox-' + (rate_state - 1)).show('blind', {
                                'direction': 'left'
                            }, 1000);
                            rate_state -= 1;
                            if (rate_state == 1) {
                                $('#vtp-rating-infobox-left').addClass('ui-state-disabled');
                            }
                        }
                    });
                }
                $('#vtp-rating-slider-slider').slider({
                    value: -9999,
                    min: -5,
                    max: 5,
                    step: 1,
                    orientation: 'horizontal',
                    slide: function (event, ui) {
                        // $("#rating").attr("src",
                        // "/bundles/vitoopinfomgmt/img/rating/wertung_" + (ui.value + 6)
                        // + ".gif");
                        // Due to the glitch, that you cannot trigger the slide event
                        // defined here it must be registered by $.on('slide')
                    },
                    change: function (event, ui) {
                        if (flag_initslider) {
                            $(ui.handle).css({
                                "height": "1.5em",
                                "width": "1.5em",
                                "line-height": "1.5em",
                                "text-align": "center",
                                "text-decoration": "none"
                            });
                            flag_initslider = false;
                        }
                        $(this).trigger('slide', ui);
                    }// attention: the following on is chained after the slider()-call
                }).on("slide", function (event, ui) {
                    $('#rating_mark').val(ui.value);
                    $(ui.handle).text(ui.value);
                });
                // connect the #rating_mark-dropdown with slider and trigger it to init
                // the slider
                $('#rating_mark').on('change',function () {
                    $('#vtp-rating-slider-slider').slider({
                        'value': $(this).val()
                    });
                }).triggerHandler('change');

                // event for show/hide the ratingpanel
                $('.vtp-uication-rating-showratingpanel').on('click', function () {
                    if (0 === $('#vtp-res-dialog-tabs').tabs('option', 'active')) {
                        $('#vtp-rating-panel').toggle('blind', 'slow');
                    } else {
                        $('#vtp-res-dialog-tabs').tabs('option', 'active', 0);
                        $('#vtp-rating-panel').show('blind', 'slow');
                    }
                });
                // and finally the toggle button for slider or dropdown
                $('.vtp-uication-rating-toggleratingpanel').button({
                    icons: {
                        primary: 'ui-icon-arrowthick-2-n-s'
                    },
                    text: false,
                    label: 'Slider oder Dropdown?'
                });
                $('.vtp-uication-rating-toggleratingpanel').on('click', function () {
                    $('#vtp-rating-slider').toggle('blind', 'slow');
                    $('#vtp-rating-dropdown').toggle('blind', 'slow');
                });
                // Style Button and Place Info
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-star"
                    }
                });
                // Here the info is not in the usual box, it is in #vtp-rating-infobox-wrapper which is the anchor
                !$('#vtp-rating-infobox-wrapper .vtp-uiinfo-info').length || $('#vtp-rating-infobox-wrapper .vtp-uiinfo-info').position({
                    my: 'right top',
                    at: 'left bottom',
                    of: '#vtp-rating-infobox-wrapper.vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }

            /*************************************************************************
             * UIfy: tag
             ************************************************************************/
            if ('resource-tag' == container_name) {
                $('#tag_text').autocomplete({
                    source: vitoop.baseUrl + (['tag', 'suggest'].join('/')) + '?id=' + res_id,
                    minLength: 2,
                    appendTo: 'body'
                });
                $('.vtp-uiaction-tag-showown').button({
                    icons: {
                        primary: "ui-icon-lightbulb"
                    },
                    text: false
                });
                $('.vtp-uiaction-tag-showown').on('change', function () {
                    $('#vtp-tagbox .vtp-owntag').toggleClass('vtp-owntag-hilight');
                });
                $('.vtp-uiaction-tag-showown:checked').triggerHandler('change');
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-tag"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'left bottom',
                    at: 'right top',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
                $('.vtp-tagbox-tag').click(function() {
                    var text = $(this).text().trim();
                    var pos = text.search(new RegExp('\\(\\d+\\)'));
                    if (pos > -1) {
                        text = text.substring(0, pos).trim();
                    }
                    $('#tag_text').val(text);
                });

                $('#tag_confirm_save').on('click', function() {
                    if ($('#tag_text').val() == "") {
                        return false;
                    }
                    var tagExist = false;
                    $('ul.ui-autocomplete > li').each(function(index) {
                        if ($(this).text().toLowerCase() == $('#tag_text').val().toLowerCase()) {
                            tagExist = true;
                            return false;
                        }
                    });
                    if (!tagExist) {
                        $('div#vtp-tagbox > span').each(function(index) {
                            var text = $(this).text().trim();
                            var pos = text.search(new RegExp('\\(\\d+\\)'));
                            if (pos > -1) {
                                text = text.substring(0, pos).trim();
                            }
                            if (text.toLowerCase() == $('#tag_text').val().toLowerCase()) {
                                tagExist = true;
                                return false;
                            }
                        });
                    }
                    if (tagExist) {
                        $('#tag_save').trigger('click');
                    } else {
                        $('#tag_confirm_save').hide();
                        $('#tag_remove').hide();
                        $('#div-confirm-tagging').show();
                    }
                });

                $('#tag_cancel_save').on('click', function() {
                    $('#tag_confirm_save').show();
                    $('#tag_remove').show();
                    $('#div-confirm-tagging').hide();
                    $('#tag_text').val('');
                });

                $('.vtp-tag-submit').click(function(event) {
                    var input = $('#tag_text');
                    var text = input.val();
                    if (text == "") {
                        input.focus();
                        event.preventDefault();
                        return false;
                    }
                });

                if ($('#tag_can_add').val() != "1") {
                    $('#tag_save').button('disable');
                    $('#tag_confirm_save').prop('disabled', true);
                    $('#tag_confirm_save').addClass('ui-button-disabled ui-state-disabled');
                }
                if ($('#tag_can_remove').val() != "1") {
                    $('#tag_remove').button('disable');
                }
            }

            /*************************************************************************
             * UIfy: remark
             ************************************************************************/
            if ('resource-remark' == container_name) {
                // TinyMCE
                var buttonSave = $('#remark_save');
                var changeClassOfButton = function() {
                  if (tinyMCE.activeEditor.isDirty() && (($('#remark-accepted').length == 0) || ($('#remark-accepted').prop('checked')))) {
                      buttonSave.addClass('ui-state-need-to-save');
                  } else {
                      buttonSave.removeClass('ui-state-need-to-save');
                  }
                };

                if ($('#remark-accepted').length) {
                    $('#remark-accepted').on('change', changeClassOfButton);
                }

                var setIntervalForText = function() {
                  return setInterval(changeClassOfButton, 2000);
                };

                buttonSave.on('click', function(event) {
                    if (($('#remark-accepted').length > 0) && ($('#remark-accepted').prop('checked') == false)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    $('#tab-title-remark').removeClass('ui-state-no-content');
                });


                tinymce.init({
                    selector: 'textarea#remark_text',
                    height: 300,
                    plugins: 'textcolor link placeholder',
                    menubar: false,
                    skin : "vitoop",
                    style_formats: [
                        {title: 'p', block: 'p'},
                        {title: 'h1', block: 'h1'},
                        {title: 'h2', block: 'h2'},
                        {title: 'h3', block: 'h3'},
                        {title: 'h4', block: 'h4'},
                        {title: 'h5', block: 'h5'},
                        {title: 'h6', block: 'h6'}
                    ],
                    toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink',
                    setup: function (editor) {
                        editor.on('focus', function (e) {
                            console.log('focus');
                        });
                        editor.on('blur', function (e) {
                            console.log('blur');
                        });
                    }
                });

                setTimeout(setIntervalForText, 2000);
                // Toggle lock/unlock-button initialization
                var $btn_lock_remark = $('#' + container_name + ' input#remark_locked:checkbox');

                $btn_lock_remark.filter(':not(:checked)').button({
                    icons: {
                        primary: "ui-icon-unlocked"
                    },
                    text: false,
                    label: "unlocked"
                });
                $btn_lock_remark.filter(':checked').button({
                    icons: {
                        primary: "ui-icon-locked"
                    },
                    text: false,
                    label: "locked"
                });
                // Toggle lock/unlock-button eventhandler
                $btn_lock_remark.on('click', function () {
                    $(this).filter(':checked').button("option", {
                        icons: {
                            primary: "ui-icon-locked"
                        },
                        label: 'locked'
                    }).addClass('vtp-button');
                    $(this).filter(':not(:checked)').button("option", {
                        icons: {
                            primary: "ui-icon-unlocked"
                        },
                        label: 'unlocked'
                    });
                });
                // submitbutton and fadein info
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-pencil"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right bottom',
                    at: 'left top',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }

            /*************************************************************************
             * UIfy: remarkPrivate
             ************************************************************************/
            if ('resource-remark_private' == container_name) {
                // TinyMCE
                var buttonSave = $('#remark_private_save');
                var changeClassOfButton = function() {
                    if (!tinyMCE.activeEditor.isDirty()) {
                        buttonSave.removeClass('ui-state-need-to-save');
                    } else {
                        buttonSave.addClass('ui-state-need-to-save');
                    }
                };

                buttonSave.on('click', function() {
                    $('#tab-title-remark-private').removeClass('ui-state-no-content');
                });


                var setIntervalForText = function() {
                    return setInterval(changeClassOfButton, 2000);
                };

                tinymce.init({
                    selector: 'textarea#remark_private_text',
                    height: 300,
                    plugins: 'textcolor link',
                    menubar: false,
                    skin : "vitoop",
                    style_formats: [
                        {title: 'p', block: 'p'},
                        {title: 'h1', block: 'h1'},
                        {title: 'h2', block: 'h2'},
                        {title: 'h3', block: 'h3'},
                        {title: 'h4', block: 'h4'},
                        {title: 'h5', block: 'h5'},
                        {title: 'h6', block: 'h6'}
                    ],
                    toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink'
                });

                setTimeout(setIntervalForText, 2000);

                // submitbutton and fadein info
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-pencil"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right bottom',
                    at: 'left top',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }


            /*************************************************************************
             * UIfy: comments
             ************************************************************************/
            if ('resource-comments' == container_name) {
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-pencil"
                    }
                });
                $('#comment_save').on('click', function() {
                    $('#tab-title-comments').removeClass('ui-state-no-content');
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right top',
                    at: 'left bottom',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }
            /*************************************************************************
             * UIfy: project
             *****************************************************************/
            if ('resource-project' == container_name) {
                $('#project_name_save').on('click', function() {
                    $('#tab-title-rels').removeClass('ui-state-no-content');
                });
                $('#project_name_name').autocomplete({
                    source: vitoop.baseUrl + (['prj', 'suggest'].join('/')),
                    minLength: 2,
                    appendTo: 'body'
                });
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-disk"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right top',
                    at: 'right bottom',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }
            /*************************************************************************
             * UIfy: lexicon
             ************************************************************************/
            if ('resource-lexicon' == container_name) {

                $('#lexicon_name_save').on('click', function() {
                    $('#tab-title-rels').removeClass('ui-state-no-content');
                });
                $('#lexicon_name_name').autocomplete({
                    source: function (request, response) {
                        $.ajax({
                            url: 'https://de.wikipedia.org/w/api.php',
                            data: {
                                format: 'json',
                                action: 'opensearch',
                                continue: '',
                                limit: 10,
                                namespace: 0,
                                search: request.term
                            },
                            dataType: 'jsonp',
                            cache: true,
                            context: $('#lexicon'),
                            success: function (data) {
                                response(data[1]);
                            }
                        });
                    },
                    minLength: 2,
                    appendTo: 'body'
                });
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-disk"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right top',
                    at: 'right bottom',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);

                $('.vtp-lexiconbox-item').click(function() {
                    var text = $(this).text().trim();
                    var pos = text.search(new RegExp('\\(\\d+\\)'));
                    if (pos > -1) {
                        text = text.substring(0, pos).trim();
                    }
                    $('#lexicon_name_name').val(text);
                });
                $('.vtp-lexicon-submit').click(function(event) {
                    var input = $('#lexicon_name_name');
                    if (input.val() == "") {
                        input.focus();
                        event.preventDefault();
                    }
                });
                if ($('#lexicon_name_can_add').val() != "1") {
                    $('#lexicon_name_save').button('disable');
                }
                if ($('#lexicon_name_can_remove').val() != "1") {
                    $('#lexicon_name_remove').button('disable');
                }
            }
            /*************************************************************************
             * UIfy: flaginfo
             ************************************************************************/
            if ('resource-flags' == container_name) {


                if ($('#vtp-res-flag-info').length) {

                    $('.vtp-uiaction-detail-delete').button('option', 'disabled', true);
                    $('.vtp-uiaction-detail-blame').button('option', 'disabled', true);

                    $('#vtp-res-flag-buttons button').button();
                }
                $('#resource-flags').show('blind', 'fast');
            }

            /*************************************************************************
             * UIfy: END
             ************************************************************************/
        },

        clearTabsClasses = function() {
                $('#tab-title-comments').removeClass('ui-state-no-content');
                $('#tab-title-remark').removeClass('ui-state-no-content');
                $('#tab-title-remark-private').removeClass('ui-state-no-content');
                $('#tab-title-rels').removeClass('ui-state-no-content');
        },

        loadTab = function (event, ui) {
            var tab_nr;
            var url;
            // Don't touch this. Works for three different calls with handcrafted parameters event and ui!
            if (typeof ui.newTab === 'undefined') {
                tab_nr = ui;
            } else if (ui.newTab) {
                tab_nr = ui.newTab.index();
            } else {
                console.log('No TabIndex provided!');
            }
            url = vitoop.baseUrl + ([res_type, res_id, tab_name[tab_nr]].join('/'));
            // if the tab is already loaded then return without any action
            if (1 == tab_loaded[tab_nr]) {
                return;
            }

            if ('new' == res_id) {
                url = vitoop.baseUrl + ([res_type, 'new'].join('/'));
            }
            tab_loaded[tab_nr] = 1;
            if (tab_nr == 0 && res_id != 'new') {
                $.ajax({
                    url: vitoop.baseUrl + 'api/resource/' + res_id + '/tabs_info',
                    method: 'GET',
                    dataType: 'json',
                    success: function(responseJSON) {
                        var info = responseJSON;
                        if (info.comments == 0) {
                            $('#tab-title-comments').addClass('ui-state-no-content');
                        }
                        if (info.remarks == 0) {
                            $('#tab-title-remark').addClass('ui-state-no-content');
                        }
                        if (info.remarks_private == 0) {
                            $('#tab-title-remark-private').addClass('ui-state-no-content');
                        }
                        if (info.rels == 0) {
                            $('#tab-title-rels').addClass('ui-state-no-content');
                        }
                    }
                });
            }
            $.ajax({
                url: url,
                success: loadTabSuccess,
                dataType: 'json'
            });
        },

        loadTabSuccess = function (responseJSON, textStatus, jqXHR, form) {
            if ('new' == res_id) {
                // Leave the "NEW-State" when the new form-id is present in responseJSON['resource-title']
                res_id = responseJSON['resource-metadata'].id;
                if (res_id !== 'new') {
                    $('#vtp-res-dialog-tabs').tabs('enable');
                    // Disable the Navigation Buttons (uifyContainer() will grey it out). New resource has no prev/next
                    prev_id = next_id = -1;

                }
            }
            $.each(responseJSON, function (container_name, html) {
                if ('resource-metadata' !== container_name) {
                    $('#' + container_name).empty().append(html);
                    // Initializing special UI-Gimmicks are done in uifyContainer()
                    uifyContainer(container_name);
                }
            });
            $('#vtp-res-dialog select').selectmenu({
                select: function( event, ui ) {
                    $('span.ui-selectmenu-button').removeAttr('tabIndex');
                }
            });
            $('span.ui-selectmenu-button').removeAttr('tabIndex');
        },

        showDialog = function (e) {
            var current_tr_res;
            if ($(e.target).hasClass('vtp-uiaction-open-extlink') || $(e.target).hasClass('vtp-projectdata-unlink') || $(e.target).hasClass('vtp-projectdata-unlink-coefficient') || $(e.target).hasClass('vtp-uiaction-coefficient')) {
                return;
            }

            current_tr_res = $(e.target).parentsUntil('.vtp-uiaction-list-listener', '.vtp-uiaction-list-showdetail');
            if (current_tr_res.length === 0) {
                return true;
            }

            //tr_res is initialized with null
            if (tr_res != null) {
                tgl();
            }
            tr_res = current_tr_res;
            tgl();

            // res_id is retrieved from the tablerow id (e.g. <tr
            // id="pdf-1">).
            res_type = (tr_res.attr('id').split('-'))[0];
            res_id = (tr_res.attr('id').split('-'))[1];

            setNextId();
            setPrevId();
            // check for init: call a widget-method before initialization throws an
            // error
            try {
                $('#vtp-res-dialog-tabs').tabs("option");
            } catch (e) {
                // beforeActivate( event, ui )
                // will be invoked every time a tab is "clicked" except when the
                // dialog
                // opens because the tab is already active, so the event doesn't
                // fire
                $('#vtp-res-dialog-tabs').tabs({
                    beforeActivate: loadTab
                });
            }
            if (res_id == 'new') {
                newResource();
            } else {
                $('#vtp-res-dialog-tabs').tabs('enable');
                $('#vtp-res-dialog-tabs').tabs('option', 'active', 0);

                // trigger the tab to be loaded with content the first time
                loadTab(undefined, 0);
            }
            clearTabsClasses();
            $('#vtp-res-dialog').dialog('open');
        },

        newResource = function () {
            res_id = 'new';
            hardResetTabs();
            $('#vtp-res-dialog-tabs').tabs('option', 'disabled', [ 1, 2, 3 ]);
            loadTab(undefined, 0);
        },

        tgl = function () {
            tr_res.children().toggleClass('ui-state-active');
        },

        tgl_ls = function () {
            var ls_tr_res;
            // toggle "last seen" in: -insertResourceList
            if (typeof arr_tr_res_attr_id[res_type] != 'undefined') {
                ls_tr_res = $('#' + arr_tr_res_attr_id[res_type]);
                if (ls_tr_res.length != 0) {// is "last seen" on current Page?
                    tr_res = ls_tr_res;
                    tgl();
                }
            }
        },

        nextResource = function () {
            // tr_res is current (jqueryfied) tr-element
            if (next_id == -1) {// no NEXT page avaiable
                return;
            } else if (next_id == 0) {// load NEXT listpage
                $('#vtp-res-list table').DataTable().page('next').draw('page');
                tr_res = $('.vtp-list-first');
                tgl();
                res_id = (tr_res.attr('id').split('-'))[1];
                prev_id = 0;
                setNextId();
                // We are still in an asynchronous callback: Tab Maintenance must be
                // done here
                hardResetTabs();
                loadTab(undefined, 0);
            } else { // flip to NEXT resource
                tgl();
                var nextElement = tr_res.next('tr');
                if (nextElement.length == 0) {
                    nextElement = tr_res.next().next('tr');
                }
                tr_res = nextElement;
                tgl();
                prev_id = res_id;
                res_id = next_id;
                setNextId();
                hardResetTabs();
                loadTab(undefined, 0);

            }
            return true;
        },

        setNextId = function () {
            if (tr_res.hasClass('vtp-list-end')) {
                next_id = -1;
            } else if (tr_res.hasClass('vtp-list-last')) {
                next_id = 0;
            } else {
                var nextElement = tr_res.next('tr');
                if (nextElement.length == 0) {
                    nextElement = tr_res.next().next('tr');
                }
                next_id = (nextElement.attr('id').split('-'))[1];
            }
        },

        previousResource = function () {
            // tr_res is current (jqueryfied) tr-element
            if (prev_id == -1) {// no PREVious page avaiable
                return;
            } else if (prev_id == 0) {// load PREVious listpage
                $('#vtp-res-list table').DataTable().page('next').draw('page');
                tr_res = $('.vtp-list-last');
                tgl();
                res_id = (tr_res.attr('id').split('-'))[1];
                next_id = 0;
                setPrevId();
                // We are still in an asynchronous callback: Tab Maintenance must be
                // done here
                hardResetTabs();
                loadTab(undefined, 0);
            } else { // flip to PREVious resource
                tgl();
                var prevElement = tr_res.prev('tr');
                if (prevElement.length == 0) {
                    prevElement = tr_res.prev().prev('tr');
                }
                tr_res = prevElement;
                tgl();
                next_id = res_id;
                res_id = prev_id;
                setPrevId();
                hardResetTabs();
                loadTab(undefined, 0);

            }
            return true;
        },

        setPrevId = function () {
            if (tr_res.hasClass('vtp-list-start')) {
                prev_id = -1;
            } else if (tr_res.hasClass('vtp-list-first')) {
                prev_id = 0;
            } else {
                var prevElement = tr_res.prev('tr');
                if (prevElement.length == 0) {
                    prevElement = tr_res.prev().prev('tr');
                }
                prev_id = (prevElement.attr('id').split('-'))[1];
            }
        },

        hardResetTabs = function () {
            $('#resource-data').empty();
            $('#resource-rating').empty();
            $('#resource-tag').empty();
            $('#resource-remark').empty();
            $('#resource-remark_private').empty();
            $('#resource-comments').empty();
            $('#resource-lexicon').empty();
            $('#resource-project').empty();
            $('#resource-title').empty();
            $('#resource-buttons').empty();
            $('#resource-flags').empty();
            // pay attention. this triggers tab to load, if the array
            // tab_loaded is [0,.,.,.,.]
            $('#vtp-res-dialog-tabs').tabs('option', 'active', 0);
            // focus must be maintained manually... it will fire bug in Mozilla!
            //$('#vtp-res-dialog-tabs .ui-tabs-active > a').trigger('focus');
            // so the array must be reseted here
            tab_loaded = [ 0, 0, 0, 0, 0 ];
            // there was a li-element inserted for rating purposes
            $('#vtp-rating-infobox-li').remove();
            clearTabsClasses();
        },

        flagResource = function (flag_type) {
            $('#vtp-res-flag-form').length || $('#resource-flags').append('<div id="vtp-res-flag-form"></div>');
            $.ajax({
                url: vitoop.baseUrl + [res_type, res_id, 'flag', flag_type].join('/'),
                success: function (responseHtml, textStatus, jqXHR) {
                    fillFlagForm(responseHtml);
                    $('#resource-flags').show('blind', 'fast');
                },
                error: function (jqXHR, textStatus) {
                    $('#vtp-res-flag-form').empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                },
                dataType: 'html'
            });
        },

        deleteResource = function () {
            flagResource('delete');
        },

        blameResource = function () {
            flagResource('blame');
        },

        fillFlagForm = function (html) {
            $('#vtp-res-flag-form').empty().append(html);
            var elemSuccess = $('div.vtp-uiinfo-info', html);
            if (elemSuccess.length > 0) {
                notifyRefresh();
                $('#vtp-res-dialog').dialog('close');
                setTimeout(function() {
                    $('#vtp-content').prepend(elemSuccess);
                    $(elemSuccess, '#vtp-context').hide("fade", 5000);
                }, 2000);
            }
            $('#vtp-uiaction-close-flagform').button({
                icons: {
                    primary: "ui-icon-close"
                },
                text: false,
                label: "verwerfen"
            })
            $('#vtp-res-flag-form form input[type=submit]').button({
                icons: {
                    primary: "ui-icon-trash"
                }
            });
            !$('#vtp-res-flag-form .vtp-uiinfo-info').length || $('#vtp-res-flag-form .vtp-uiinfo-info').position({
                my: 'right bottom',
                at: 'left top',
                of: '#vtp-res-flag-form .vtp-uiinfo-anchor',
                collision: 'none'
            }).hide("fade", 10000);
        },

        doneFlagInfo = function (content) {
            hardResetTabs();
            $('#vtp-res-dialog-tabs').tabs('option', 'disabled', [ 0, 1, 2, 3, 4 ]);
            $('#resource-flags').append(content['resource-flags']);
        },

        closeDialog = function () {
            hardResetTabs();
            // "last seen" is maintained through arr_res_tr_attr_id[]
            arr_tr_res_attr_id[res_type] = res_type + '-' + res_id;
            if (refresh_list) {
                resourceList.loadResourceListPage();
                refresh_list = false;
            }
        },

        notifyRefresh = function () {
            refresh_list = true;
        },

        /****************************************************************************
         * Eventhandler and jQuery initializing:call init() on Document ready
         ***************************************************************************/
            init = function () {
            $('#vtp-res-dialog').dialog({
                autoOpen: false,
                width: 720,
                position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                modal: true,
                close: closeDialog
            });



            $.ajax({
                url: vitoop.baseUrl +'api/help',
                method: 'GET',
                success: function(data) {
                    var answer = JSON.parse(data);
                    if (answer.isAdmin) {
                        var element = $('<input type="hidden" id="help-id" value="' + answer.help.id + '"><div class="vtp-fh-w100"><textarea id="help-text"></textarea></div><div class="vtp-fh-w100"><button class="ui-corner-all ui-state-default" id="button-help-save">speichern</button></div>');
                        $('#help-text', element).val(answer.help.text);
                        $('#vtp-res-dialog-help').append(element);
                        setTimeout(function() {
                            tinymce.init({
                                mode: 'exact',
                                selector: 'textarea#help-text',
                                id: 'tiny-help',
                                height: 430,
                                skin : "vitoop",
                                plugins: 'textcolor link code',
                                relative_urls : false,
                                remove_script_host : false,
                                convert_urls : true,
                                menubar: false,
                                style_formats: [
                                    {title: 'p', block: 'p'},
                                    {title: 'h1', block: 'h1'},
                                    {title: 'h2', block: 'h2'},
                                    {title: 'h3', block: 'h3'},
                                    {title: 'h4', block: 'h4'},
                                    {title: 'h5', block: 'h5'},
                                    {title: 'h6', block: 'h6'}
                                ],
                                toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | code'
                            });
                        }, 2000);

                        $('#button-help-save').on('click', function() {
                            tinyMCE.triggerSave();
                            $.ajax({
                                url: vitoop.baseUrl +'api/help',
                                method: 'POST',
                                data: JSON.stringify({'id': $('#help-id').val(), 'text': $('#help-text').val()}),
                                success: function(data) {
                                    var elemSuccess = $('<div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"><span class="vtp-icon ui-icon ui-icon-info"></span>Help message saved!</div>');
                                    $('#button-help-save').before(elemSuccess);
                                    setTimeout(function() {
                                        elemSuccess.hide(400);
                                    }, 2000);
                                }
                            });
                        });
                    } else {
                        $('#vtp-res-dialog-help').append(answer.help.text);
                    }
                    $('#vtp-res-dialog-help').dialog({
                        autoOpen: false,
                        width: 850,
                        height: 600,
                        position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                        modal: true
                    });
                    $('#button-help').on('click', function() {
                        $('#vtp-res-dialog-help').dialog('open');
                    });
                }
            });



            $('div[aria-describedby="vtp-res-dialog"] .ui-dialog-title').append('<span id="resource-title"></span>');
            $('div[aria-describedby="vtp-res-dialog"] .ui-dialog-title').after('<span id="resource-buttons"></span>');

            $('#vtp-res-dialog').before('<div id="resource-flags" style="display: none;"></div>');

            $('#vtp-res-dialog-tabs form:not(#form-tag)').ajaxForm({
                delegation: true,
                dataType: 'json',
                success: [notifyRefresh, loadTabSuccess],
                error: function (jqXHR, textStatus, errorThrown, $form) {
                    $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                }

            });

            $('#vtp-res-dialog-tabs form#form-tag').ajaxForm({
                delegation: true,
                dataType: 'json',
                success: [notifyRefresh, loadTabSuccess, function() {$('#tag_text').focus(); $('#div-confirm-tagging').hide();}],
                error: function (jqXHR, textStatus, errorThrown, $form) {
                    $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                }

            });

            $('#vtp-res-flag-form form').ajaxForm({
                delegation: true,
                dataType: 'html',
                success: fillFlagForm,
                error: function (jqXHR, textStatus) {
                    $('#vtp-res-flag-form').empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                }
            });
            $('#vtp-res-flag-info form').ajaxForm({
                delegation: true,
                dataType: 'json',
                success: doneFlagInfo,
                error: function (jqXHR, textStatus) {
                    $('#vtp-res-flag-info').empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                }
            });
            // @TODO Handler
            // vtp-content is the root for event delegation inside this 'box'
            $('#vtp-content').on('click', '.vtp-uiaction-list-listener', showDialog);

            $('#vtp-application').on('click', '#vtp-uiaction-close-flagform', function () {
                $('#resource-flags').hide('blind', 'fast');
                $('#resource-flags').empty();
            });
        };
    /* API */

    return {
        // call init() on Document ready. DOM must be fully loaded.
        init: init,
        tgl_ls: tgl_ls

    };
}());

/**
 * JavaScript GUI for Vitoop Module: resource_list.js
 */

resourceList = (function () {

    var query = $.deparam.querystring(), // may be empty object

        current_url = location.href,

        loadContent = function (e, secondSuccessFunc) {
            var url;
            var succ;
            if (typeof e === 'string') {
                // called manually by resource_detail:[next/previous]Resource for background page flipping
                // while the resource_detail dialog is in foreground
                url = e;
                succ = [ insertResourceList, secondSuccessFunc ];
            } else if (typeof e === 'undefined') {
                // called without arguments for a refresh
                url = current_url;
                succ = [insertResourceList];
            } else if ($(e.target).attr('id') === 'vtp-search-bytags-form') {
                // called by refresh (submit) button from tag search
                url = $('#vtp-nav .vtp-nav-active.vtp-resmenu-reslink').attr('href');
                e.preventDefault();
                succ = [insertResourceList];
            } else if ($(e.target).hasClass('vtp-uiaction-search-bytags-clear-taglistbox')) {
                // called after all tags are removed
                url = $('#vtp-nav .vtp-nav-active.vtp-resmenu-reslink').attr('href');
                succ = [insertResourceList];
            } else if ($(e.target).is('a')) {//@TODO This check isn't needed when handler is attached to a-elements
                //called by an handler
                url = $(e.target).attr('href');
                e.preventDefault();
                // decide reslink or homelink
                if ($(e.target).hasClass('vtp-resmenu-reslink')) {
                    if ($('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-homelink-home')) {
                        $('#vtp-search-bytags-form, #vtp-search-toggle').show('fade', 'slow');
                        resourceSearch.maintainTaglistbox();
                    } else if ($('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-homelink')) {
                        $('#vtp-search-toggle').show('fade', 'slow');
                    }
                    $('#vtp-nav .vtp-nav-active').removeClass('vtp-nav-active ui-state-active');
                    $(e.target).addClass('vtp-nav-active ui-state-active');
                    succ = [insertResourceList];
                } else if ($(e.target).hasClass('vtp-resmenu-homelink')) {
                    if ($(e.target).hasClass('vtp-resmenu-homelink-home') && $('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-reslink')) {
                        $('#vtp-search-bytags-form, #vtp-search-toggle').hide('explode', 'slow');
                        resourceSearch.maintainTaglistbox(true);
                    } else if ($(e.target).hasClass('vtp-resmenu-homelink') && $('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-reslink')) {
                        $('#vtp-search-toggle').hide('explode', 'slow');
                    }
                    $('#vtp-nav .vtp-nav-active').removeClass('vtp-nav-active ui-state-active');
                    $(e.target).addClass('vtp-nav-active ui-state-active');
                    succ = [insertHomeContent];
                } else {
                    // @TODO e.g - a in vtp-nav is OK  - but links to other resources?
                    succ = [insertResourceList];
                }
            }
            if (typeof url !== 'undefined') {
                //in case of successful xhr call the current_url is updated
                succ.unshift(function () {
                    current_url = url;
                });
                $.ajax({
                    url: url,
                    success: succ,
                    error: function (jqXHR, textStatus, errorthrown) {
                        alert(textStatus + ' - ' + errorthrown);
                    },
                    dataType: 'html'
                });
            } else {
                console.log('The #APR#handler should be registered on a-elements only');
            }
        },

        insertResourceList = function (responseHtml, textStatus, jqXHR, $_form) {
            var html = $(responseHtml);
            $('#vtp-content').empty().append(html);
            resourceDetail.tgl_ls();
            maintainResLinks();
        },

        insertHomeContent = function (responseHtml, textStatus, jqXHR, $_form) {
            $('#vtp-content').empty().append(responseHtml);
            resourceProject.init();
        },

        maintainResLinks = function (obj_partial_query) {
            if (typeof obj_partial_query === 'undefined') {
                return
            }

            $('.vtp-resmenu-reslink').each(function () {
                var href = $(this).attr('href');
                href = $.param.querystring(href, obj_partial_query, 0);
                $(this).attr('href', href)
            });
        },

        toggleFlag = function (e) {
            var flagged;
            // empty array 0 => querystring portion will be deleted
            $(e.target).prop('checked') ? flagged = 1 : flagged = [];
            maintainResLinks({'flagged': flagged});
        },

        init = function () {

            maintainResLinks();

            /**********************************
             * Set Handlers
             **********************************/

            // #APR# Navgation resource links
            $('#vtp-nav').on('click', 'a', loadContent);

            // flags
            $('.vtp-uiaction-toggle-flag').on('click', toggleFlag);

            /*********************************
             *  uify (buttons etc.)
             *********************************/

            $('#vtp-search-bytags-form-submit').button({
                icons: {
                    primary: "ui-icon-refresh"
                },
                text: false,
                label: "aktualisieren"
            });

            $('#vtp-user-loginform-login').button({
                icons: {
                    primary: "ui-icon-person"
                },
                text: false,
                label: "bei Vitoop anmelden"
            })

            $('#vtp-user-loginform-logout').button({
                icons: {
                    secondary: "ui-icon-power"
                }
            })

            $('#vtp-header-toggle-flag input[type=checkbox]').button({
                icons: {
                    primary: "ui-icon-flag"
                },
                text: false
            });
            $('#vtp-header-toggle-flag button').hide();

            $('#vtp-header-status a.vtp-uiaction-goto-invite').button({
                icons: {
                    primary: "ui-icon-mail-closed",
                    secondary: "ui-icon-pencil"
                },
                text: false
            });

            $('#vtp-header-status a.vtp-uiaction-goto-edithome').button({
                icons: {
                    primary: "ui-icon-home",
                    secondary: "ui-icon-pencil"
                },
                text: false
            });

            // Highlight Tablerows onmousover
            $('#vtp-content').on('mouseenter', 'tr', function (e) {
                $(this).addClass('vtp-hilight');
            });
            $('#vtp-content').on('mouseleave', 'tr', function (e) {
                $(this).removeClass('vtp-hilight');
            });
        };

    return {
        // call init() Document ready. on DOM must be fully loaded.
        current_url: current_url,
        init: init,
        // From other modules there is a semantical difference, so it named loadResourceListPage
        loadResourceListPage: loadContent,
        insertResourceList: insertResourceList,
        maintainResLinks: maintainResLinks
    };

}());

/**
 * JavaScript GUI for Vitoop Module: resource_project.js
 */

resourceProject = (function () {

    var query = $.deparam.querystring();

    var  queryEditMode = query.edit;


    var init = function () {
        tinymce.init({
            selector: 'textarea#project_data_sheet',
            width: 560,
            height: 600,
            plugins: 'textcolor link',
            menubar: false,
            skin : "vitoop",
            style_formats: [
                {title: 'p', block: 'p'},
                {title: 'h1', block: 'h1'},
                {title: 'h2', block: 'h2'},
                {title: 'h3', block: 'h3'},
                {title: 'h4', block: 'h4'},
                {title: 'h5', block: 'h5'},
                {title: 'h6', block: 'h6'}
            ],

            toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink'
        });

        $('#project_data_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });



        $('#vtp-projectdata-project-close').on('click', function () {
            location.href = vitoop.baseUrl + 'prj/';
        });

        var editButton = $('#vtp-projectdata-project-edit');
        var liveButton = $('#vtp-projectdata-project-live');

        if ((typeof queryEditMode != 'undefined') && (queryEditMode == 1)) {
            editButton.addClass('vtp-icon-active');
            liveButton.removeClass('vtp-icon-active');
            liveButton.on('click', function () {
                location.href = location.href.replace('?edit=1', '');
            });
            resourceList.maintainResLinks({'edit': 1});

            $('input#new_rel_project_user_name').autocomplete({
                source: vitoop.baseUrl + 'user/names',
                minLength: 2,
                appendTo: 'body'
            });
        } else {
            !$('#vtp-projectdata-box .vtp-uiinfo-info').length || $('#vtp-projectdata-box .vtp-uiinfo-info').position({
                my: 'right top',
                at: 'left bottom',
                of: '#vtp-projectdata-box .vtp-uiinfo-anchor',
                collision: 'none'
            }).hide("fade", 3000);
            liveButton.addClass('vtp-icon-active');
            editButton.removeClass('vtp-icon-active');
            editButton.on('click', function () {
                location.href = location.href + '?edit=1';
            });
        }

        $('#vtp-lexicondata-lexicon-close').on('click', function () {
            location.href = vitoop.baseUrl + 'lex/';
        });

        tinymce.init({
            selector: 'textarea#user_data_sheet',
            width: 560,
            height: 600,
            plugins: 'textcolor link',
            skin : "vitoop",
            menubar: false,
            style_formats: [
                {title: 'p', block: 'p'},
                {title: 'h1', block: 'h1'},
                {title: 'h2', block: 'h2'},
                {title: 'h3', block: 'h3'},
                {title: 'h4', block: 'h4'},
                {title: 'h5', block: 'h5'},
                {title: 'h6', block: 'h6'}
            ],

            toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink'
        });

        $('#user_data_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        !$('#vtp-userdata-box .vtp-uiinfo-info').length || $('#vtp-userdata-box .vtp-uiinfo-info').position({
            my: 'right top',
            at: 'left bottom',
            of: '#vtp-userdata-box .vtp-uiinfo-anchor',
            collision: 'none'
        }).hide("fade", 3000);
    };

    return {
        init: init
    };
}());

/**
 * JavaScript GUI for Vitoop Module: resource_search.js
 */

function extendTag (event) {
    var parent = $(event.target).parent();
    if (parent.hasClass('vtp-search-bytags-tag-active')) {
        $('.tag-icons-to-hide', parent).hide(400);
        parent.removeClass('vtp-search-bytags-tag-active');
    } else {
        $('.tag-icons-to-hide').hide(400);
        $('.vtp-search-bytags-tag').removeClass('vtp-search-bytags-tag-active');
        $('.tag-icons-to-hide', parent).show(400);
        parent.addClass('vtp-search-bytags-tag-active');
    }
};

function ignoreTag(event) {
    var parent = $(event.target).parent();
    if (!parent.hasClass('vtp-search-bytags-tag-ignore')) {
        parent.removeClass('vtp-search-bytags-tag-bulb');
        parent.addClass('vtp-search-bytags-tag-ignore');
        resourceSearch.ignoreTag(parent.text().trim(), true);
    } else {
        parent.removeClass('vtp-search-bytags-tag-ignore');
        resourceSearch.ignoreTag(parent.text().trim(), false);
    }
};


function highlightTag(event) {
    var parent = $(event.target).parent();
    if (!parent.hasClass('vtp-search-bytags-tag-bulb')) {
        parent.removeClass('vtp-search-bytags-tag-ignore');
        parent.addClass('vtp-search-bytags-tag-bulb');
        resourceSearch.highlightTag(parent.text().trim(), true);
    } else {
        parent.removeClass('vtp-search-bytags-tag-bulb');
        resourceSearch.highlightTag(parent.text().trim(), false);
    }

};

resourceSearch = (function () {

    /*
     * Beim Neuladen der Seite die Tags des Suchstrings
     * ins div '#vtp-search-bytags-taglistbox' schreiben
     */

    var query = $.deparam.querystring(), // may be empty object

        query_taglist = query.taglist, // may be undefined

        query_taglist_ignored = query.taglist_i, // may be undefined

        query_taglist_highlight = query.taglist_h, // may be undefined

        query_tagcnt = query.tagcnt, // may be undefined

        is_changed = false,

        arr_taglist = [],

        tag_count = 0,

        arr_taglist_ignore = [],

        ig_count = 0,

        arr_taglist_highlight = [],

        hl_count = 0,

        tagcnt = 0,

        cnt_tags = 0,

        tag,

    //direction - if true, thatn we move tag from general array to ignored array
        changeColor = function () {
            if ((!is_changed) && ((tag_count != arr_taglist.length) || (ig_count != arr_taglist_ignore.length) || (hl_count != arr_taglist_highlight.length))) {

                $('#vtp-search-bytags-form-submit').addClass('act');
                is_changed = true;
            }
            tag_count = arr_taglist.length;
            ig_count = arr_taglist_ignore.length;
            hl_count = arr_taglist_highlight.length;
        },

        ignoreTag = function (tag, direction) {
            var index;
            if (direction === true) {
                index = arr_taglist.indexOf(tag);
                if (index > -1) {
                    arr_taglist.splice(index, 1);
                    arr_taglist_ignore.push(tag);
                }
                index = arr_taglist_highlight.indexOf(tag);
                if (index > -1) {
                    arr_taglist_highlight.splice(index, 1);
                }
            } else if (direction === false) {
                index = arr_taglist_ignore.indexOf(tag);
                if (index > -1) {
                    arr_taglist_ignore.splice(index, 1);
                    arr_taglist.push(tag);
                }
            };
            if (direction != undefined) {
                maintainCntTags();
            }
        },

    //direction - if true, thatn we move tag from general array to highlighted array
        highlightTag = function (tag, direction) {
            var index;
            if (direction === true) {
                index = arr_taglist.indexOf(tag);
                if (index > -1) {
                    arr_taglist_highlight.push(tag);
                }
                index = arr_taglist_ignore.indexOf(tag);
                if (index > -1) {
                    arr_taglist_ignore.splice(index, 1);
                    arr_taglist.push(tag);
                    arr_taglist_highlight.push(tag);
                }
            } else if (direction === false) {
                index = arr_taglist_highlight.indexOf(tag);
                if (index > -1) {
                    arr_taglist_highlight.splice(index, 1);
                }
            };
            if (direction != undefined) {
                maintainCntTags();
            }
        },

        addTag = function (event, ui) {

            // check if tag is selected by autocomplete (ui will be defined) or
            // entered without autocomplete by hiting enter
            //@TODO you cannot select a tag without autocomplete by hitting enter. sort it out!
            if (typeof ui != "undefined") {
                pushTag(ui.item.value);
                // prevents writing back the value after it is already cleared by
                // .val('')
                event.preventDefault();
            } else {// @TODO Does this make sense
                // push_tag($("#taglist").val());
            }
            $('#vtp-search-bytags-taglist').val('');
        },

        pushTag = function (tag) {
            if (tag == '') {
                return;
            }
            arr_taglist.push(tag);
            decorateTag(tag, false, false).appendTo("#vtp-search-bytags-taglistbox");

            maintainCntTags();
        },

        removeTag = function (e) {
            if ((cnt_tags === 1) && (arr_taglist_ignore.length === 0)) {
                $('.vtp-uiaction-search-bytags-clear-taglistbox').trigger('click');
            }
            var parent = $(this).parent();
            var tagtext = parent.text().trim();
            var index;
            if (parent.hasClass('vtp-search-bytags-tag-ignore')) {
                index = arr_taglist_ignore.indexOf(tagtext);
                if (index > -1) {
                    arr_taglist_ignore.splice(index, 1);
                }
            } else {
                index = arr_taglist_highlight.indexOf(tagtext);
                if (index > -1) {
                    arr_taglist_highlight.splice(index, 1);
                }
                index = arr_taglist.indexOf(tagtext);
                if (index > -1) {
                    arr_taglist.splice(index, 1);
                }
            }
            // remove span.vtp-...-tag @TODO detach it for undo?
            parent.remove();
            maintainCntTags();
        },

        removeAllTags = function (e) {
            $(this).siblings().remove();
            arr_taglist = [];
            arr_taglist_highlight = [];
            arr_taglist_ignore = [];
            cnt_tags = 0;
            tagcnt = 0;
            maintainCntTags();
            $('#vtp-search-bytags-form-submit').removeClass('act').blur();
            is_changed = false;
            resourceList.loadResourceListPage(e);
        },

        maintainCntTags = function () {
            var $_options;
            changeColor();
            cnt_tags = arr_taglist.length;
            // show or hide the taglistbox when there are tags to show
            maintainTaglistbox();

            // append a new option-element or remove the (last) element with the given
            // value: if difference is 1, append or remove an element
            // otherwise renew all options e.g. for first initialization
            $_options = $('#vtp-search-bytags-tagcnt option');
            if ((($_options.length - 1) + 1 ) === cnt_tags) {
                $('<option></option>').val(cnt_tags).text(cnt_tags).appendTo('#vtp-search-bytags-tagcnt');
            } else if ((($_options.length - 1) - 1) === cnt_tags) {
                $_options.filter('[value="' + (cnt_tags + 1) + '"]').remove();
            } else {
                $('#vtp-search-bytags-tagcnt').empty();
                $('<option></option>').val(0).text('-').appendTo('#vtp-search-bytags-tagcnt');
                for (var i = 1; i <= cnt_tags; i += 1) {
                    $('<option></option>').val(i).text(i).appendTo('#vtp-search-bytags-tagcnt');
                }
            }

            if ((cnt_tags === 0) && (arr_taglist_ignore.length > 0)) {
                $('#vtp-search-bytags-form-submit').attr("disabled", "disabled");
            } else {
                $('#vtp-search-bytags-form-submit').removeAttr("disabled");
            }

            tagcnt = (tagcnt > cnt_tags) ? cnt_tags : tagcnt;
            $('#vtp-search-bytags-tagcnt').val(tagcnt);

            var tempCount = (arr_taglist.length == 1)?(1):(tagcnt);
            resourceList.maintainResLinks({'taglist': arr_taglist, 'taglist_i': arr_taglist_ignore, 'taglist_h': arr_taglist_highlight, 'tagcnt': tempCount});
            $('select#vtp-search-bytags-tagcnt').selectmenu("refresh");
            $('#vtp-search-bytags-form span.ui-selectmenu-button').removeAttr('tabIndex');
        },

        maintainTaglistbox = function (force_hide) {
            if (typeof force_hide === "undefined") {
                force_hide = false;
            }

            if (force_hide) {
                $('#vtp-search-bytags-taglistbox').hide('blind', 'fast');
            } else {
                if ((cnt_tags === 0) && (arr_taglist_ignore.length === 0)) {
                    $('#vtp-search-bytags-taglistbox').hide('blind', 'fast');
                } else {
                    $('#vtp-search-bytags-taglistbox').show('blind', 'fast');
                }
            }
        },

        removeTagByName = function (tag) {
            // written accidently - not yet used :-(
            if (tag == '') {
                return;
            }
            for (var i = 0; i < arr_taglist.length; i += 1) {
                if (tag == arr_taglist[i]) {
                    arr_taglist.splice(i, 1);
                    break;
                }
            }
            $("#vtp-search-bytags-taglistbox span").each(function (i, ele) {
                if (tag == ele.text()) {
                    ele.remove();
                    return false;
                }
            });
            maintainCntTags();
        },

    // Same code on server-side !!!
        decorateTag = function (tag, ignored, highlighted) {
            if (typeof(ignored) === 'undefined') {
                ignored = false;
            }
            if (typeof(highlighted) === 'undefined') {
                highlighted = false;
            }
            var ignoredClass = (ignored)?(' vtp-search-bytags-tag-ignore'):('');
            var highlightedClass = (highlighted)?(' vtp-search-bytags-tag-bulb'):('');

            return $('<span class="vtp-search-bytags-tag ui-corner-all'+ignoredClass+highlightedClass+'"><span class="vtp-icon-tag ui-icon ui-icon-tag" onclick="extendTag(event);"></span>'
                + tag + '<span class="ui-icon ui-icon-lightbulb tag-icons-to-hide vtp-icon-bulb" style="display: none" onclick="highlightTag(event)"></span><span class="ui-icon ui-icon-cancel tag-icons-to-hide vtp-icon-cancel" style="display: none" onclick="ignoreTag(event)"></span><span class="vtp-icon-close vtp-uiaction-search-bytags-removetag ui-icon ui-icon-close"></span></span>');
        },


        /****************************************************************************
         * INIT
         ***************************************************************************/
            init = function () {

            $('#vtp-search-bytags-form').on('keypress', '#vtp-search-bytags-taglist', function (e) {
                if (e.keyCode == 13) {
                    // prevent submitting the form by hitting the enter key (or
                    // numpad-enter)
                    e.preventDefault();
                }
            });

            // #APR# tag bytags SUBMIT
            $('#vtp-search-bytags-form').on('submit', function(e, secondSuccessFunc) {
                resourceList.loadResourceListPage(e, secondSuccessFunc);
                $('#vtp-search-bytags-form-submit').removeClass('act').blur();
                is_changed = false;

            });

            $('#vtp-search-bytags-taglist').autocomplete({
                source: vitoop.baseUrl + (['tag', 'suggest'].join('/')),
                minLength: 2,
                autoFocus: true,
                select: addTag,
                response: function (e, ui) {
                    // filter already selected tag ui.content
                    for (var i = 0; i < ui.content.length; i += 1) {
                        if ((arr_taglist.indexOf(ui.content[i].value) > -1)||(arr_taglist_ignore.indexOf(ui.content[i].value) > -1)) {
                            ui.content.splice(i, 1);
                            i -= 1;
                        }
                    }
                }});

            $('#vtp-search-bytags-taglistbox')
                .on('click', '.vtp-uiaction-search-bytags-removetag', removeTag)
                .on('click', '.vtp-uiaction-search-bytags-clear-taglistbox', removeAllTags);

            $('#vtp-search-bytags-tagcnt').on('selectmenuchange', function () {
                    tagcnt = +$(this).val();
                    resourceList.maintainResLinks({'tagcnt': tagcnt});
                }
            );

            /* START */

            // is taglist present? (got from querystring)
            if (typeof query_taglist != 'undefined') {
                // copy the taglist portion of querystring into taglistbox
                // taglist is already an array (it has been a comma separated list before)
                arr_taglist = query_taglist;
                cnt_tags = arr_taglist.length;

                if (false) {// currently not used... is done by server side
                    for (var i = 0; i < arr_taglist.length; i += 1) {
                        tag = arr_taglist[i];
                        decorateTag(tag, false, false).appendTo('#vtp-search-bytags-taglistbox');
                    }
                }
            } else {
                // set state holding variables to defined state
                arr_taglist = [];
                cnt_tags = 0;
            }
            if (typeof query_taglist_ignored != 'undefined') {
                arr_taglist_ignore = query_taglist_ignored;
            } else {
                arr_taglist_ignore = [];
            }
            if (typeof query_taglist_highlight != 'undefined') {
                arr_taglist_highlight = query_taglist_highlight;
            } else {
                arr_taglist_highlight = [];
            }

            if (typeof query_tagcnt === 'undefined' || query_tagcnt > cnt_tags || query_tagcnt < 0) {
                // invalid tagcnt results in 0
                tagcnt = 0;
            } else {
                tagcnt = +query_tagcnt;
            }
            tag_count = arr_taglist.length;
            ig_count = arr_taglist_ignore.length;
            hl_count = arr_taglist_highlight.length;
            maintainCntTags();
        };

    return {
        init: init,
        maintainTaglistbox: maintainTaglistbox,
        ignoreTag: ignoreTag,
        highlightTag: highlightTag
    };
})
    ();

searchToggler = (function() {

    var state;

    function loadSearchState () {
        var state1 = localStorage.getItem(
            'vitoop_s_hidden'+location.pathname
        );
        if (state1 == null) {
            state1 = true;
        }

        state = state1;
    }

    function saveSearchState() {
        localStorage.setItem(
            'vitoop_s_hidden'+location.pathname,
            state
        );
    }

    function getState() {
        return state;
    }

    function showHideSearch() {

        if (state) {
            $('#vtp-res-list .top-toolbar').hide(400);
        } else {
            $('#vtp-res-list .top-toolbar').show(400);
        }
    }

    function createButton() {
        var icon;
        if (state) {
            icon = 'ui-icon-arrowthick-1-s';
        } else {
            icon = 'ui-icon-arrowthick-1-n';
        }
        $('#vtp-search-toggle').button({
            icons: {
                primary: icon
            },
            text: false,
            label: "toggle"
        });
        $('#vtp-search-toggle').on('click', toggler);
    }

    function toggler() {
        state = !state;
        saveSearchState();
        $('#vtp-search-toggle').off().button("destroy");
        createButton();
        showHideSearch();
    }

    function init() {
        loadSearchState();
        createButton();
        showHideSearch();
    }


    return {
        init: init,
        getState: getState
    };
}) ();

function unlinkRes(id)
{
    var projectID = $('#projectID').val();
    $.ajax({
        dataType: 'json',
        delegate: true,
        method: 'DELETE',
        url: '../api/project/' + projectID + '/resource/'+id,
        success: function (jqXHR) {
            if (jqXHR.status == 'error') {
                $('#vtp-projectdata-title').append('<span class="form-error">Vitoooops!: ' + jqXHR.message + '</span>');
            } else {
                var elemSuccess = $('<div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"><span class="vtp-icon ui-icon ui-icon-info"></span>'+jqXHR.message+'</div>');
                $('#vtp-projectdata-title').prepend(elemSuccess);
                $(elemSuccess, '#vtp-projectdata-title').hide("fade", 3000);
                resourceList.loadResourceListPage();
            }
        }
    });
}
/**
 * JavaScript GUI for Vitoop Module: user_interaction.js
 */

userInteraction = (function () {

    var init = function () {

        $('#user_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        $('#invitation_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        $('#invitations-toggle').button({

        });

        $('#button-terms-admin').button({

        });

        $('#invitations-toggle').click(function() {
            $.ajax({
                method: "PUT",
                url: "invitation/toggle",
                success: function(data){
                    var answer = JSON.parse(data);
                    $('#invitations-toggle > span > span').text(answer.invitation ? 'On' : 'Off');
                }
            });
        });

        !$('#vtp-form-invite .vtp-uiinfo-info').length || $('#vtp-form-invite .vtp-uiinfo-info').position({
            my: 'right bottom',
            at: 'left top',
            of: '#vtp-form-invite .vtp-uiinfo-anchor',
            collision: 'none'
        }).hide("fade", 5000);

        $('#vitoop_blog_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        !$('#vtp-form-vitoop-blog .vtp-uiinfo-info').length || $('#vtp-form-vitoop-blog .vtp-uiinfo-info').position({
            my: 'right bottom',
            at: 'left top',
            of: '#vtp-form-vitoop-blog .vtp-uiinfo-anchor',
            collision: 'none'
        }).hide("fade", 5000);

        tinymce.init({
            selector: 'textarea#vitoop_blog_sheet',
            width: 615,
            height: 600,
            plugins: 'textcolor link media code',
            skin : "vitoop",
            menubar: false,
            style_formats: [
                {title: 'p', block: 'p'},
                {title: 'h1', block: 'h1'},
                {title: 'h2', block: 'h2'},
                {title: 'h3', block: 'h3'},
                {title: 'h4', block: 'h4'},
                {title: 'h5', block: 'h5'},
                {title: 'h6', block: 'h6'}
            ],
            toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | media | code'
        });
    };

    return {
        init: init
    };
}());

/**
 * JavaScript GUI for Vitoop Module: VitoopUIAction
 */

var UIAction = {
    uiactions: [],
    initDone: false,
    register: function (action_name, action_func) {

    },
    clickHandler: function (e) {
        var target = $(e.target);
        var action = "noop";
        var arr_classes;
        if ('TD' == target.prop('tagName')) {
            target = target.parent();
        }
        arr_classes = target.attr('class');
        if (undefined != arr_classes) {
            arr_classes = arr_classes.split(' ');
            $.each(arr_classes, function (index, class_name) {
                if (-1 != class_name.indexOf('vtp-uiaction-')) {
                    action = class_name.substr(13);
                    return false;
                }
            });
            console.log(action);
        }
    },
    init: function () {
        if (this.initDone) {
            return;
        }
        // alert('INIT');
        // $('#vtp-application').click(this.clickHandler);
        //$('body').click(this.clickHandler);
        this.initDone = true;
    }
};

UIAction.register('showdetail', 'doDialog');

//# sourceMappingURL=vitoop.js.map
