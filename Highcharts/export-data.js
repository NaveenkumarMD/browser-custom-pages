/*
 Highcharts JS v10.3.3 (2023-01-20)

 Exporting module

 (c) 2010-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (a) { "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/export-data", ["highcharts", "highcharts/modules/exporting"], function (p) { a(p); a.Highcharts = p; return a }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (a) {
    function p(a, f, c, y) { a.hasOwnProperty(f) || (a[f] = y.apply(null, c), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: f, module: a[f] } }))) }
    a = a ? a._modules : {}; p(a, "Extensions/ExportData/ExportDataDefaults.js", [], function () {
        ""; return {
            exporting: { csv: { annotations: { itemDelimiter: "; ", join: !1 }, columnHeaderFormatter: null, dateFormat: "%Y-%m-%d %H:%M:%S", decimalPoint: null, itemDelimiter: null, lineDelimiter: "\n" }, showTable: !1, useMultiLevelHeaders: !0, useRowspanHeaders: !0 }, lang: {
                downloadCSV: "Download CSV", downloadXLS: "Download XLS", exportData: { annotationHeader: "Annotations", categoryHeader: "Category", categoryDatetimeHeader: "DateTime" }, viewData: "View data table",
                hideData: "Hide data table"
            }
        }
    }); p(a, "Extensions/DownloadURL.js", [a["Core/Globals.js"]], function (a) {
        var f = a.isSafari, c = a.win, y = c.document, p = c.URL || c.webkitURL || c, D = a.dataURLtoBlob = function (a) {
            if ((a = a.replace(/filename=.*;/, "").match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/)) && 3 < a.length && c.atob && c.ArrayBuffer && c.Uint8Array && c.Blob && p.createObjectURL) {
                var m = c.atob(a[3]), v = new c.ArrayBuffer(m.length); v = new c.Uint8Array(v); for (var q = 0; q < v.length; ++q)v[q] = m.charCodeAt(q); a = new c.Blob([v], { type: a[1] });
                return p.createObjectURL(a)
            }
        }; a = a.downloadURL = function (a, p) {
            var v = c.navigator, q = y.createElement("a"); if ("string" === typeof a || a instanceof String || !v.msSaveOrOpenBlob) {
                a = "".concat(a); v = /Edge\/\d+/.test(v.userAgent); if (f && "string" === typeof a && 0 === a.indexOf("data:application/pdf") || v || 2E6 < a.length) if (a = D(a) || "", !a) throw Error("Failed to convert to blob"); if ("undefined" !== typeof q.download) q.href = a, q.download = p, y.body.appendChild(q), q.click(), y.body.removeChild(q); else try {
                    var m = c.open(a, "chart"); if ("undefined" ===
                        typeof m || null === m) throw Error("Failed to open window");
                } catch (Q) { c.location.href = a }
            } else v.msSaveOrOpenBlob(a, p)
        }; return { dataURLtoBlob: D, downloadURL: a }
    }); p(a, "Extensions/ExportData/ExportData.js", [a["Core/Renderer/HTML/AST.js"], a["Extensions/ExportData/ExportDataDefaults.js"], a["Core/Globals.js"], a["Core/Defaults.js"], a["Extensions/DownloadURL.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, p, c, y, W, P, m) {
        function f() {
            var b = this.getCSV(!0); R(S(b, "text/csv") || "data:text/csv,\ufeff" +
                encodeURIComponent(b), this.getFilename() + ".csv")
        } function v() {
            var b = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>' +
                this.getTable(!0) + "</body></html>"; R(S(b, "application/vnd.ms-excel") || "data:application/vnd.ms-excel;base64," + z.btoa(unescape(encodeURIComponent(b))), this.getFilename() + ".xls")
        } function q(b) {
            var a = "", g = this.getDataRows(), e = this.options.exporting.csv, x = A(e.decimalPoint, "," !== e.itemDelimiter && b ? (1.1).toLocaleString()[1] : "."), d = A(e.itemDelimiter, "," === x ? ";" : ","), c = e.lineDelimiter; g.forEach(function (b, e) {
                for (var u, n = b.length; n--;)u = b[n], "string" === typeof u && (u = '"' + u + '"'), "number" === typeof u && "." !== x &&
                    (u = u.toString().replace(".", x)), b[n] = u; b.length = g.length ? g[0].length : 0; a += b.join(d); e < g.length - 1 && (a += c)
            }); return a
        } function D(b) {
            var a = this.hasParallelCoordinates, g = this.time, e = this.options.exporting && this.options.exporting.csv || {}, c = this.xAxis, d = {}, n = [], p = [], K = [], t = this.options.lang.exportData, h = t.categoryHeader, m = t.categoryDatetimeHeader, v = function (a, d, g) {
                if (e.columnHeaderFormatter) { var l = e.columnHeaderFormatter(a, d, g); if (!1 !== l) return l } return a ? a instanceof X ? b ? { columnTitle: 1 < g ? d : a.name, topLevelColumnTitle: a.name } :
                    a.name + (1 < g ? " (" + d + ")" : "") : a.options.title && a.options.title.text || (a.dateTime ? m : h) : h
            }, T = function (a, b, d) { var g = {}, l = {}; b.forEach(function (b) { var e = (a.keyToAxis && a.keyToAxis[b] || b) + "Axis"; e = Y(d) ? a.chart[e][d] : a[e]; g[b] = e && e.categories || []; l[b] = e && e.dateTime }); return { categoryMap: g, dateTimeValueAxisMap: l } }, Z = function (a, b) {
                return a.data.filter(function (a) { return "undefined" !== typeof a.y && a.name }).length && b && !b.categories && !a.keyToAxis ? a.pointArrayMap && a.pointArrayMap.filter(function (a) { return "x" === a }).length ?
                    (a.pointArrayMap.unshift("x"), a.pointArrayMap) : ["x", "y"] : a.pointArrayMap || ["y"]
            }, q = [], w, B = 0; this.series.forEach(function (l) {
                var u = l.xAxis, x = l.options.keys || Z(l, u), n = x.length, k = !l.requireSorting && {}, t = c.indexOf(u), h = T(l, x), f; if (!1 !== l.options.includeInDataExport && !l.options.isInternal && !1 !== l.visible) {
                    aa(q, function (a) { return a[0] === t }) || q.push([t, B]); for (f = 0; f < n;)w = v(l, x[f], x.length), K.push(w.columnTitle || w), b && p.push(w.topLevelColumnTitle || w), f++; var m = {
                        chart: l.chart, autoIncrement: l.autoIncrement,
                        options: l.options, pointArrayMap: l.pointArrayMap, index: l.index
                    }; l.options.data.forEach(function (b, c) {
                        var w = { series: m }; a && (h = T(l, x, c)); l.pointClass.prototype.applyOptions.apply(w, [b]); var r = w.x; L(d[r]) && d[r].seriesIndices.includes(m.index) && (b = Object.keys(d).filter(function (a) { return d[a].seriesIndices.includes(m.index) && r }).filter(function (a) { return 0 === a.indexOf(String(r)) }), r = r.toString() + "," + b.length); b = l.data[c] && l.data[c].name; f = 0; if (!u || "name" === l.exportKey || !a && u && u.hasNames && b) r = b; k && (k[r] &&
                            (r += "|" + c), k[r] = !0); d[r] || (d[r] = [], d[r].xValues = []); d[r].x = w.x; d[r].name = b; d[r].xValues[t] = w.x; L(d[r].seriesIndices) || (d[r].seriesIndices = []); for (d[r].seriesIndices = E(E([], d[r].seriesIndices, !0), [m.index], !1); f < n;)c = x[f], b = w[c], d[r][B + f] = A(h.categoryMap[c][b], h.dateTimeValueAxisMap[c] ? g.dateFormat(e.dateFormat, b) : null, b), f++
                    }); B += f
                }
            }); for (f in d) Object.hasOwnProperty.call(d, f) && n.push(d[f]); t = b ? [p, K] : [K]; for (B = q.length; B--;) {
                var k = q[B][0]; var M = q[B][1]; var C = c[k]; n.sort(function (a, b) {
                    return a.xValues[k] -
                        b.xValues[k]
                }); var f = v(C); t[0].splice(M, 0, f); b && t[1] && t[1].splice(M, 0, f); n.forEach(function (a) { var b = a.name; C && !L(b) && (C.dateTime ? (a.x instanceof Date && (a.x = a.x.getTime()), b = g.dateFormat(e.dateFormat, a.x)) : b = C.categories ? A(C.names[a.x], C.categories[a.x], a.x) : a.x); a.splice(M, 0, b) })
            } t = t.concat(n); N(this, "exportData", { dataRows: t }); return t
        } function Q(a) {
            var b = function (a) {
                if (!a.tagName || "#text" === a.tagName) return a.textContent || ""; var e = a.attributes, c = "<".concat(a.tagName); e && Object.keys(e).forEach(function (a) {
                    var b =
                        e[a]; c += " ".concat(a, '="').concat(b, '"')
                }); c += ">"; c += a.textContent || ""; (a.children || []).forEach(function (a) { c += b(a) }); return c += "</".concat(a.tagName, ">")
            }; a = this.getTableAST(a); return b(a)
        } function ba(a) {
            var b = 0, c = [], e = this.options, f = a ? (1.1).toLocaleString()[1] : ".", d = A(e.exporting.useMultiLevelHeaders, !0); a = this.getDataRows(d); var n = d ? a.shift() : null, h = a.shift(), m = function (a, b, c, e) {
                var d = A(e, ""); b = "highcharts-text" + (b ? " " + b : ""); "number" === typeof d ? (d = d.toString(), "," === f && (d = d.replace(".", f)), b = "highcharts-number") :
                    e || (b = "highcharts-empty"); c = U({ "class": b }, c); return { tagName: a, attributes: c, textContent: d }
            }; !1 !== e.exporting.tableCaption && c.push({ tagName: "caption", attributes: { "class": "highcharts-table-caption" }, textContent: A(e.exporting.tableCaption, e.title.text ? e.title.text : "Chart") }); for (var t = 0, q = a.length; t < q; ++t)a[t].length > b && (b = a[t].length); c.push(function (a, b, c) {
                var u = [], g = 0; c = c || b && b.length; var f = 0, k; if (k = d && a && b) { a: if (k = a.length, b.length === k) { for (; k--;)if (a[k] !== b[k]) { k = !1; break a } k = !0 } else k = !1; k = !k } if (k) {
                    for (k =
                        []; g < c; ++g) { var n = a[g]; var h = a[g + 1]; n === h ? ++f : f ? (k.push(m("th", "highcharts-table-topheading", { scope: "col", colspan: f + 1 }, n)), f = 0) : (n === b[g] ? e.exporting.useRowspanHeaders ? (h = 2, delete b[g]) : (h = 1, b[g] = "") : h = 1, n = m("th", "highcharts-table-topheading", { scope: "col" }, n), 1 < h && n.attributes && (n.attributes.valign = "top", n.attributes.rowspan = h), k.push(n)) } u.push({ tagName: "tr", children: k })
                } if (b) {
                    k = []; g = 0; for (c = b.length; g < c; ++g)"undefined" !== typeof b[g] && k.push(m("th", null, { scope: "col" }, b[g])); u.push({
                        tagName: "tr",
                        children: k
                    })
                } return { tagName: "thead", children: u }
            }(n, h, Math.max(b, h.length))); var p = []; a.forEach(function (a) { for (var c = [], d = 0; d < b; d++)c.push(m(d ? "td" : "th", null, d ? {} : { scope: "row" }, a[d])); p.push({ tagName: "tr", children: c }) }); c.push({ tagName: "tbody", children: p }); c = { tree: { tagName: "table", id: "highcharts-data-table-".concat(this.index), children: c } }; N(this, "aftergetTableAST", c); return c.tree
        } function ca() { this.toggleDataTable(!1) } function da(b) {
            var c = (b = A(b, !this.isDataTableVisible)) && !this.dataTableDiv; c &&
                (this.dataTableDiv = ea.createElement("div"), this.dataTableDiv.className = "highcharts-data-table", this.renderTo.parentNode.insertBefore(this.dataTableDiv, this.renderTo.nextSibling)); if (this.dataTableDiv) { var g = this.dataTableDiv.style, e = g.display; g.display = b ? "block" : "none"; b && (this.dataTableDiv.innerHTML = a.emptyHTML, (new a([this.getTableAST()])).addToDOM(this.dataTableDiv), N(this, "afterViewData", { element: this.dataTableDiv, wasHidden: c || e !== g.display })) } this.isDataTableVisible = b; c = this.exportDivElements;
            e = (g = this.options.exporting) && g.buttons && g.buttons.contextButton.menuItems; b = this.options.lang; g && g.menuItemDefinitions && b && b.viewData && b.hideData && e && c && (c = c[e.indexOf("viewData")]) && a.setElementHTML(c, this.isDataTableVisible ? b.hideData : b.viewData)
        } function fa() { this.toggleDataTable(!0) } function S(a, c) {
            var b = z.navigator, e = -1 < b.userAgent.indexOf("WebKit") && 0 > b.userAgent.indexOf("Chrome"), f = z.URL || z.webkitURL || z; try {
                if (b.msSaveOrOpenBlob && z.MSBlobBuilder) { var d = new z.MSBlobBuilder; d.append(a); return d.getBlob("image/svg+xml") } if (!e) return f.createObjectURL(new z.Blob(["\ufeff" +
                    a], { type: c }))
            } catch (n) { }
        } function ha() {
            var a = this, c = a.dataTableDiv, g = function (a, b) { return function (c, d) { var e = (b ? c : d).children[a].textContent; c = (b ? d : c).children[a].textContent; return "" === e || "" === c || isNaN(e) || isNaN(c) ? e.toString().localeCompare(c) : e - c } }; if (c && a.options.exporting && a.options.exporting.allowTableSorting) {
                var e = c.querySelector("thead tr"); e && e.childNodes.forEach(function (b) {
                    var d = b.closest("table"); b.addEventListener("click", function () {
                        var e = E([], c.querySelectorAll("tr:not(thead tr)"),
                            !0), f = E([], b.parentNode.children, !0); e.sort(g(f.indexOf(b), a.ascendingOrderInTable = !a.ascendingOrderInTable)).forEach(function (a) { d.appendChild(a) }); f.forEach(function (a) { ["highcharts-sort-ascending", "highcharts-sort-descending"].forEach(function (b) { a.classList.contains(b) && a.classList.remove(b) }) }); b.classList.add(a.ascendingOrderInTable ? "highcharts-sort-ascending" : "highcharts-sort-descending")
                    })
                })
            }
        } function ia() {
            this.options && this.options.exporting && this.options.exporting.showTable && !this.options.chart.forExport &&
            this.viewData()
        } var E = this && this.__spreadArray || function (a, c, f) { if (f || 2 === arguments.length) for (var b = 0, g = c.length, d; b < g; b++)!d && b in c || (d || (d = Array.prototype.slice.call(c, 0, b)), d[b] = c[b]); return a.concat(d || Array.prototype.slice.call(c)) }, ea = c.doc, z = c.win, ja = y.getOptions, O = y.setOptions, R = W.downloadURL, X = P.series; c = P.seriesTypes; var F = c.arearange, G = c.gantt, H = c.map, I = c.mapbubble, J = c.treemap, V = m.addEvent, L = m.defined, U = m.extend, aa = m.find, N = m.fireEvent, Y = m.isNumber, A = m.pick, h = []; ""; return {
            compose: function (a) {
                -1 ===
                h.indexOf(a) && (h.push(a), V(a, "afterViewData", ha), V(a, "render", ia), a = a.prototype, a.downloadCSV = f, a.downloadXLS = v, a.getCSV = q, a.getDataRows = D, a.getTable = Q, a.getTableAST = ba, a.hideData = ca, a.toggleDataTable = da, a.viewData = fa); if (-1 === h.indexOf(O)) {
                    h.push(O); if (a = ja().exporting) U(a.menuItemDefinitions, { downloadCSV: { textKey: "downloadCSV", onclick: function () { this.downloadCSV() } }, downloadXLS: { textKey: "downloadXLS", onclick: function () { this.downloadXLS() } }, viewData: { textKey: "viewData", onclick: function () { this.toggleDataTable() } } }),
                        a.buttons && a.buttons.contextButton.menuItems && a.buttons.contextButton.menuItems.push("separator", "downloadCSV", "downloadXLS", "viewData"); O(p)
                } F && -1 === h.indexOf(F) && (h.push(F), F.prototype.keyToAxis = { low: "y", high: "y" }); G && -1 === h.indexOf(G) && (h.push(G), G.prototype.keyToAxis = { start: "x", end: "x" }); H && -1 === h.indexOf(H) && (h.push(H), H.prototype.exportKey = "name"); I && -1 === h.indexOf(I) && (h.push(I), I.prototype.exportKey = "name"); J && -1 === h.indexOf(J) && (h.push(J), J.prototype.exportKey = "name")
            }
        }
    }); p(a, "masters/modules/export-data.src.js",
        [a["Core/Globals.js"], a["Extensions/ExportData/ExportData.js"]], function (a, f) { f.compose(a.Chart) })
});
//# sourceMappingURL=export-data.js.map