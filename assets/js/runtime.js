/*
 * AKARI — mini motor de templates.
 *
 * Lê o HTML de <template id="app-template"> e o renderiza com React.
 * Sintaxe suportada:
 *   {{ caminho.ate.valor }}                 interpolação (texto ou atributo)
 *   atributo="{{ fn }}"                     valor bruto (função, booleano, ref…)
 *   <sc-if value="{{ cond }}">…</sc-if>     renderização condicional
 *   <sc-for list="{{ itens }}" as="item">   repetição ({{ $index }} disponível)
 * O componente da página estende DCLogic e devolve os valores em renderVals().
 */
(function () {
  "use strict";
  var React = window.React;
  var h = React.createElement;

  var ATTR_MAP = {
    "class": "className", "for": "htmlFor", "tabindex": "tabIndex", "inputmode": "inputMode",
    "autocomplete": "autoComplete", "maxlength": "maxLength", "readonly": "readOnly", "novalidate": "noValidate",
    "colspan": "colSpan", "rowspan": "rowSpan", "srcset": "srcSet", "crossorigin": "crossOrigin",
    "enterkeyhint": "enterKeyHint", "spellcheck": "spellCheck", "autofocus": "autoFocus"
  };
  var EVENTS = {
    click: "Click", change: "Change", submit: "Submit", keydown: "KeyDown", keyup: "KeyUp", input: "Input",
    blur: "Blur", focus: "Focus", animationend: "AnimationEnd", mouseenter: "MouseEnter", mouseleave: "MouseLeave",
    error: "Error", load: "Load", scroll: "Scroll", pointerdown: "PointerDown"
  };
  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;

  function camel(s) { return s.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); }

  function lookup(path, scope) {
    path = path.trim();
    if (path === "true") return true;
    if (path === "false") return false;
    if (path === "null") return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    if (/^(['"]).*\1$/.test(path)) return path.slice(1, -1);
    var parts = path.split("."), v;
    for (var i = scope.length - 1; i >= 0; i--) {
      if (scope[i] && Object.prototype.hasOwnProperty.call(scope[i], parts[0])) { v = scope[i][parts[0]]; break; }
    }
    for (var j = 1; j < parts.length && v != null; j++) v = v[parts[j]];
    return v;
  }

  function interp(str, scope) {
    return str.replace(HOLE, function (_, p) { var v = lookup(p, scope); return v == null ? "" : String(v); });
  }

  function parseStyle(str) {
    var out = {};
    str.split(";").forEach(function (decl) {
      var i = decl.indexOf(":");
      if (i < 0) return;
      var k = decl.slice(0, i).trim(), v = decl.slice(i + 1).trim();
      if (!k) return;
      out[k.indexOf("--") === 0 ? k : camel(k)] = v;
    });
    return out;
  }

  /* ---------- compile the template DOM into a light tree ---------- */
  function compile(node, inSvg) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      if (!t.trim() && /\n/.test(t)) return null;
      return { k: "text", hasHole: t.indexOf("{{") !== -1, t: t };
    }
    if (node.nodeType !== 1) return null;
    var tag = node.localName;
    var svg = inSvg || tag === "svg";
    var attrs = [];
    for (var i = 0; i < node.attributes.length; i++) {
      var a = node.attributes[i];
      attrs.push({ n: a.name, v: a.value, whole: WHOLE.exec(a.value), hole: a.value.indexOf("{{") !== -1 });
    }
    var kids = [];
    var src = tag === "template" ? node.content.childNodes : node.childNodes;
    for (var c = 0; c < src.length; c++) {
      var k = compile(src[c], svg && tag !== "foreignObject");
      if (k) kids.push(k);
    }
    if (tag === "sc-if") return { k: "if", attrs: attrs, kids: kids };
    if (tag === "sc-for") return { k: "for", attrs: attrs, kids: kids };
    return { k: "el", tag: tag, svg: svg, attrs: attrs, kids: kids };
  }

  function attrVal(a, scope) {
    if (a.whole) return lookup(a.whole[1], scope);
    if (a.hole) return interp(a.v, scope);
    return a.v;
  }
  function getAttr(node, name, scope) {
    for (var i = 0; i < node.attrs.length; i++) if (node.attrs[i].n === name) return attrVal(node.attrs[i], scope);
    return undefined;
  }

  function renderKids(kids, scope) {
    var out = [];
    for (var i = 0; i < kids.length; i++) {
      var r = renderNode(kids[i], scope);
      if (r == null || r === false) continue;
      if (Array.isArray(r)) Array.prototype.push.apply(out, r); else out.push(r);
    }
    return out;
  }

  function renderNode(node, scope) {
    if (node.k === "text") return node.hasHole ? interp(node.t, scope) : node.t;
    if (node.k === "if") {
      return getAttr(node, "value", scope) ? h(React.Fragment, null, renderKids(node.kids, scope)) : null;
    }
    if (node.k === "for") {
      var list = getAttr(node, "list", scope) || [];
      var as = getAttr(node, "as", scope) || "item";
      return list.map(function (item, idx) {
        var frame = { $index: idx }; frame[as] = item;
        return h(React.Fragment, { key: (item && item.id != null ? item.id + ":" : "") + idx }, renderKids(node.kids, scope.concat([frame])));
      });
    }
    var props = {};
    for (var i = 0; i < node.attrs.length; i++) {
      var a = node.attrs[i], name = a.n, v = attrVal(a, scope);
      if (name.indexOf("hint-") === 0) continue;
      if (name.slice(0, 2) === "on" && EVENTS[name.slice(2).toLowerCase()]) {
        if (typeof v === "function") props["on" + EVENTS[name.slice(2).toLowerCase()]] = v;
        continue;
      }
      if (name === "ref") { if (typeof v === "function") props.ref = v; continue; }
      if (v === undefined) continue;
      if (name === "style") { props.style = typeof v === "string" ? parseStyle(v) : v; continue; }
      if (name === "value" && (node.tag === "input" || node.tag === "textarea" || node.tag === "select")) { props.value = v == null ? "" : v; continue; }
      if (name === "checked") { props.checked = !!v; continue; }
      if (name === "disabled") { props.disabled = !!v && v !== "false"; continue; }
      if (ATTR_MAP[name]) name = ATTR_MAP[name];
      else if (node.svg && name.indexOf("aria-") !== 0 && name.indexOf("data-") !== 0 && name.indexOf("-") > 0) name = camel(name);
      props[name] = v;
    }
    var children = renderKids(node.kids, scope);
    if (node.tag === "textarea" || node.tag === "input" || node.tag === "img" || node.tag === "br" || node.tag === "hr") return h(node.tag, props);
    return h.apply(null, [node.tag, props].concat(children));
  }

  var compiled = null;
  function getTree() {
    if (!compiled) {
      var tpl = document.getElementById("app-template");
      compiled = renderableRoot(compile(tpl, false));
    }
    return compiled;
  }
  function renderableRoot(t) { return t.kids; }

  class DCLogic extends React.Component {
    render() {
      var vals = this.renderVals ? this.renderVals() : {};
      var kids = renderKids(getTree(), [vals]);
      return h(React.Fragment, null, kids);
    }
  }
  window.DCLogic = DCLogic;
})();
