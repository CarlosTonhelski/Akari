/* AKARI — lógica da aplicação (rotas, filtros, modal, questionário, formulários). */
var AK_ROUTES = ["home", "receitas", "culturas", "destaques", "ingredientes", "experiencia", "sobre", "contato"];
var AK_NAV = [
  { r: "home", label: "Início", k: "一" }, { r: "receitas", label: "Receitas", k: "二" }, { r: "culturas", label: "Culturas", k: "三" },
  { r: "destaques", label: "Destaques", k: "四" }, { r: "ingredientes", label: "Ingredientes", k: "五" }, { r: "experiencia", label: "Experiência", k: "六" },
  { r: "sobre", label: "Sobre", k: "七" }, { r: "contato", label: "Contato", k: "八" }
];
var AK_META = {
  home: ["AKARI — Asian Culinary Experience", "Receitas, culturas, ingredientes e técnicas das cozinhas do Japão, China, Coreia, Tailândia e Vietnã."],
  receitas: ["Receitas orientais · AKARI", "Catálogo de receitas asiáticas com filtros por categoria, dificuldade e tempo de preparo."],
  culturas: ["Países e culturas · AKARI", "As tradições gastronômicas do Japão, China, Coreia do Sul, Tailândia e Vietnã."],
  destaques: ["Pratos em destaque · AKARI", "Galeria de pratos icônicos da culinária asiática: sushi, ramen, pad thai, bibimbap e mais."],
  ingredientes: ["Ingredientes e técnicas · AKARI", "Shoyu, missô, gochujang, capim-limão e as técnicas essenciais da cozinha asiática."],
  experiencia: ["Qual sabor oriental combina com você? · AKARI", "Questionário interativo com recomendações personalizadas de pratos asiáticos."],
  sobre: ["Sobre a AKARI", "Manifesto, valores e a história da AKARI — Asian Culinary Experience."],
  contato: ["Contato e newsletter · AKARI", "Fale com a AKARI e assine a newsletter semanal de receitas."],
  notfound: ["Página não encontrada · AKARI", "Este endereço não existe na AKARI."]
};
var AK_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function akNorm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
function akTime(m) {
  if (m < 60) return m + " min";
  var h = Math.floor(m / 60), r = m % 60;
  return h + " h" + (r ? " " + (r < 10 ? "0" : "") + r : "");
}
var AK_DIFF = { 1: "Fácil", 2: "Média", 3: "Avançada" };

class Component extends DCLogic {
  constructor(props) {
    super(props);
    var D = AKARI_DATA;
    this.D = D;
    this.countryById = {};
    D.COUNTRIES.forEach(function (c) { this.countryById[c.id] = c; }, this);
    this.catById = {};
    D.CATS.forEach(function (c) { this.catById[c.id] = c.label; }, this);
    this.gcatById = {};
    D.GCATS.forEach(function (c) { this.gcatById[c.id] = c.label; }, this);
    this.recipeById = {};
    D.RECIPES.forEach(function (r) {
      r.countryName = this.countryById[r.country].name;
      r.catLabel = this.catById[r.cat];
      r.timeLabel = akTime(r.time);
      r.diffLabel = AK_DIFF[r.diff];
      r.search = akNorm([r.title, r.countryName, r.catLabel, r.desc, r.ings.join(" ")].join(" "));
      this.recipeById[r.id] = r;
    }, this);

    var reduced = false;
    try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    this.reduced = reduced;

    this.state = {
      route: "home", badPath: "", intro: props.intro !== false && !reduced, menuOpen: false, showTop: false,
      q: "", cat: "all", diff: "all", time: "all", country: null, fAnim: 0,
      gCountry: "all", gCat: "all", gAnim: 0,
      cIdx: 0, cAnim: 0,
      openIng: null, tech: 0, tAnim: 0,
      facts: {},
      recipe: null, checked: {}, done: {},
      quizStep: -1, answers: {}, qAnim: 0,
      contact: { name: "", email: "", subject: "", message: "" }, cTouched: {}, cSubmitted: false, cSent: false,
      news: { email: "", consent: true, error: "", done: false },
      counters: [0, 0, 0, 0]
    };

    this.imgErr = function (e) { try { e.currentTarget.style.opacity = "0"; } catch (x) {} };
    this.closeRef = this.closeRef.bind(this);
    this.menuCloseRef = this.menuCloseRef.bind(this);
    this.counterRef = this.counterRef.bind(this);
    this.headRef = this.headRef.bind(this);
    this.okRef = this.okRef.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onPop = this.onPop.bind(this);
  }

  /* ---------- refs ---------- */
  closeRef(el) { this._closeEl = el; }
  menuCloseRef(el) { this._menuCloseEl = el; }
  headRef(el) { this._headEl = el; }
  okRef(el) { if (el) { try { el.focus(); } catch (e) {} } }
  counterRef(el) {
    if (!el || this._ctrStarted) return;
    var self = this;
    var start = function () { if (!self._ctrStarted) { self._ctrStarted = true; self.runCounters(); } };
    try {
      if ("IntersectionObserver" in window) {
        if (this._io) this._io.disconnect();
        this._io = new IntersectionObserver(function (ents) {
          ents.forEach(function (en) { if (en.isIntersecting) { start(); self._io.disconnect(); } });
        }, { threshold: 0.3 });
        this._io.observe(el);
        return;
      }
    } catch (e) {}
    start();
  }
  runCounters() {
    var target = [this.D.RECIPES.length, this.D.COUNTRIES.length, this.D.INGREDIENTS.length, this.D.TECHS.length];
    if (this.reduced) { this.setState({ counters: target }); return; }
    var self = this, t0 = null, dur = 1400;
    var step = function (ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      self.setState({ counters: target.map(function (v) { return Math.round(v * e); }) });
      if (p < 1 && !self._unmounted) self._raf = requestAnimationFrame(step);
    };
    this._raf = requestAnimationFrame(step);
  }

  /* ---------- lifecycle ---------- */
  componentDidMount() {
    var self = this;
    if (this.state.intro) this._introT = setTimeout(function () { self.setState({ intro: false }); }, 2300);
    try { window.addEventListener("scroll", this.onScroll, { passive: true }); } catch (e) {}
    try { window.addEventListener("popstate", this.onPop); } catch (e) {}
    this._onImgErr = function (e) {
      var t = e && e.target;
      if (t && t.tagName === "IMG" && t.closest && t.closest(".ph") && t.getAttribute("src") && t.getAttribute("src").indexOf("{{") === -1) t.style.opacity = "0";
    };
    try { document.addEventListener("error", this._onImgErr, true); } catch (e) {}
    this._ps = Object.assign({}, this.state);
    this.readHash(true);
    this.applyMeta();
  }
  componentWillUnmount() {
    this._unmounted = true;
    clearTimeout(this._introT);
    cancelAnimationFrame(this._raf);
    if (this._io) this._io.disconnect();
    try { window.removeEventListener("scroll", this.onScroll); window.removeEventListener("popstate", this.onPop); document.removeEventListener("error", this._onImgErr, true); } catch (e) {}
    this.lockBody(false);
  }
  componentDidUpdate() {
    var s = this.state, ps = this._ps || {};
    this._ps = Object.assign({}, s);
    if (ps.recipe !== s.recipe || ps.menuOpen !== s.menuOpen) this.lockBody(!!(s.recipe || s.menuOpen));
    if (!ps.recipe && s.recipe) {
      this._returnFocus = this._lastFocus;
      if (this._closeEl) try { this._closeEl.focus({ preventScroll: true }); } catch (e) {}
    }
    if (ps.recipe && s.recipe && ps.recipe !== s.recipe && this._closeEl) {
      try { this._closeEl.focus({ preventScroll: true }); var o = this._closeEl.closest(".ovl"); if (o) o.scrollTop = 0; } catch (e) {}
    }
    if (ps.recipe && !s.recipe && this._returnFocus) { try { this._returnFocus.focus({ preventScroll: true }); } catch (e) {} this._returnFocus = null; }
    if (!ps.menuOpen && s.menuOpen && this._menuCloseEl) try { this._menuCloseEl.focus(); } catch (e) {}
    if (ps.quizStep !== s.quizStep && s.quizStep >= 0 && this._headEl) try { this._headEl.focus({ preventScroll: true }); } catch (e) {}
    if (ps.route !== s.route) {
      this.applyMeta();
      if (s.route !== "sobre") { this._ctrStarted = false; if (this._io) this._io.disconnect(); }
    }
  }
  lockBody(on) { try { document.body.style.overflow = on ? "hidden" : ""; } catch (e) {} }
  onScroll() {
    if (this._sTick) return;
    var self = this;
    this._sTick = true;
    requestAnimationFrame(function () {
      self._sTick = false;
      var y = window.scrollY || 0, show = y > 700;
      if (show !== self.state.showTop) self.setState({ showTop: show });
    });
  }
  applyMeta() {
    var m = AK_META[this.state.route] || AK_META.home;
    try {
      document.title = m[0];
      var d = document.querySelector('meta[name="description"]');
      if (d) d.setAttribute("content", m[1]);
    } catch (e) {}
  }

  /* ---------- routing ---------- */
  readHash(initial) {
    var raw = "", h = "";
    try { raw = window.location.hash || ""; } catch (e) {}
    if (raw && raw !== "#" && raw.indexOf("#/") !== 0) return; // âncora interna (ex.: #conteudo), não é rota
    try { h = decodeURIComponent(raw.replace(/^#\/?/, "")); } catch (e) {}
    if (!h || h === "inicio") { if (!initial) this.setState({ route: "home", recipe: null }); return; }
    var parts = h.split("/");
    var route = parts[0];
    if (AK_ROUTES.indexOf(route) === -1) { this.setState({ route: "notfound", badPath: "/" + h, recipe: null }); return; }
    var patch = { route: route, recipe: null };
    if (route === "receitas" && parts[1]) {
      if (this.recipeById[parts[1]]) { patch.recipe = parts[1]; patch.checked = {}; patch.done = {}; }
      else { patch.route = "notfound"; patch.badPath = "/" + h; }
    }
    if (route === "culturas" && parts[1]) {
      var idx = this.D.COUNTRIES.findIndex(function (c) { return c.id === parts[1]; });
      if (idx >= 0) patch.cIdx = idx;
    }
    this.setState(patch);
  }
  onPop() { this.readHash(false); }
  pushHash(path) {
    try { history.pushState(null, "", "#/" + path); } catch (e) {}
  }
  go(route, extra) {
    var patch = Object.assign({ route: route, menuOpen: false, recipe: null }, extra || {});
    this.setState(patch);
    var path = route === "home" ? "inicio" : route;
    if (route === "culturas" && extra && extra.cIdx != null) path += "/" + this.D.COUNTRIES[extra.cIdx].id;
    this.pushHash(path);
    try { window.scrollTo({ top: 0, behavior: "auto" }); } catch (e) { try { window.scrollTo(0, 0); } catch (x) {} }
  }

  /* ---------- recipes ---------- */
  openRecipe(id, ev) {
    try { this._lastFocus = (ev && ev.currentTarget) || document.activeElement; } catch (e) {}
    this.setState({ recipe: id, checked: {}, done: {} });
    if (this.state.route === "receitas") this.pushHash("receitas/" + id);
  }
  closeRecipe() {
    this.setState({ recipe: null });
    if (this.state.route === "receitas") this.pushHash("receitas");
  }
  card(r) {
    var self = this;
    return {
      id: r.id, title: r.title, img: r.img, alt: r.alt, desc: r.desc, countryName: r.countryName, catLabel: r.catLabel,
      timeLabel: r.timeLabel, diffLabel: r.diffLabel, yield: r.yield, tip: r.tip, plating: r.plating,
      d1: "f", d2: r.diff >= 2 ? "f" : "", d3: r.diff >= 3 ? "f" : "",
      open: function (e) { self.openRecipe(r.id, e); }
    };
  }
  filtered() {
    var s = this.state, q = akNorm(s.q).trim();
    return this.D.RECIPES.filter(function (r) {
      if (s.cat !== "all" && r.cat !== s.cat) return false;
      if (s.diff !== "all" && String(r.diff) !== s.diff) return false;
      if (s.time === "30" && r.time > 30) return false;
      if (s.time === "60" && (r.time <= 30 || r.time > 60)) return false;
      if (s.time === "61" && r.time <= 60) return false;
      if (s.country && r.country !== s.country) return false;
      if (q && q.split(/\s+/).some(function (w) { return r.search.indexOf(w) === -1; })) return false;
      return true;
    });
  }
  setF(patch) { this.setState(function (st) { return Object.assign({ fAnim: st.fAnim + 1 }, patch); }); }

  /* ---------- quiz ---------- */
  score(r, a) {
    var s = 0, why = [];
    var dI = Math.abs(r.int - a.int);
    s += (2 - dI) * 2;
    if (dI === 0) why.push(["", "Sabor delicado, como você prefere", "Sabores equilibrados, sem exageros", "Sabor intenso e marcante"][a.int]);
    if (r.spice > a.spice) s -= (r.spice - a.spice) * 3;
    else {
      s += r.spice === a.spice ? 2 : 1;
      if (a.spice >= 2 && r.spice >= 2) why.push("Picância de verdade, dentro do seu limite");
      else if (a.spice === 0 && r.spice === 0) why.push("Nenhuma pimenta na receita");
      else if (a.spice === 1 && r.spice === 1) why.push("Só um toque de pimenta, ajustável à mesa");
    }
    if (a.temp !== "any") {
      if (r.temp === a.temp) { s += 2; why.push(a.temp === "quente" ? "Servido quente e reconfortante" : "Servido frio ou em temperatura ambiente"); }
      else s -= 2;
    }
    if (a.protein !== "any") {
      if (r.protein === a.protein) { s += 4; why.push({ carne: "Carne no centro do prato", peixe: "Peixes e frutos do mar em destaque", vegetal: "Sem proteína animal" }[a.protein]); }
      else if (a.protein === "vegetal" && r.veg) { s += 3; why.push(r.veg); }
      else if (a.protein === "vegetal") s -= 5;
      else s -= 1;
    }
    if (r.time <= a.time) { s += 2; why.push("Fica pronto em " + r.timeLabel); }
    else s -= Math.min(4, (r.time - a.time) / 45);
    if (r.cat === "sobremesas") s -= 3;
    return { s: s, why: why.slice(0, 3) };
  }
  results() {
    var a = this.state.answers, self = this;
    var scored = this.D.RECIPES.filter(function (r) { return !r.drink; }).map(function (r) {
      var o = self.score(r, a); return { r: r, s: o.s, why: o.why };
    }).sort(function (x, y) { return y.s - x.s; });
    var picks = [], dessert = false;
    for (var i = 0; i < scored.length && picks.length < 3; i++) {
      var it = scored[i];
      if (it.r.cat === "sobremesas") { if (dessert) continue; dessert = true; }
      picks.push(it);
    }
    return picks;
  }
  profile(a) {
    if (a.spice >= 2 && a.int >= 2) return { k: "炎", name: "Chama viva", desc: "Você procura pratos que acendem: picância presente, molhos encorpados, o wok em fogo alto. Sichuan, a Coreia dos ensopados vermelhos e os curries tailandeses falam a sua língua." };
    if (a.int === 3) return { k: "旨", name: "Umami profundo", desc: "Seu paladar gosta de profundidade sem precisar de ardência: caldos longos, fermentados, braseados que laqueiam. A paciência é o seu tempero." };
    if (a.int === 1 && a.temp === "frio") return { k: "涼", name: "Frescor sereno", desc: "Você valoriza o ingrediente em estado puro: peixe impecável, ervas frescas, texturas limpas. Uma cozinha de precisão, onde nada sobra." };
    if (a.int === 1) return { k: "温", name: "Conforto delicado", desc: "Pratos quentes e gentis, que abraçam sem pesar. Você gosta de sabor claro, textura macia e aquele calor que acalma no fim do dia." };
    return { k: "和", name: "Harmonia", desc: "Equilíbrio é a sua palavra: um pouco de tudo, nada demais. Você é o comensal ideal para a mesa compartilhada, onde cada prato completa o outro." };
  }

  /* ---------- contact ---------- */
  cErrors(c) {
    var e = {};
    if (c.name.trim().length < 2) e.name = c.name.trim() ? "O nome precisa ter pelo menos 2 letras." : "Informe seu nome.";
    if (!c.email.trim()) e.email = "Informe seu e-mail.";
    else if (!AK_EMAIL.test(c.email.trim())) e.email = "Este e-mail não parece válido. Ex.: voce@exemplo.com";
    if (!c.subject) e.subject = "Escolha um assunto.";
    var m = c.message.trim().length;
    if (!m) e.message = "Escreva sua mensagem.";
    else if (m < 20) e.message = "A mensagem está curta: faltam " + (20 - m) + " caracteres.";
    return e;
  }

  /* ---------- render values ---------- */
  renderVals() {
    var self = this, s = this.state, D = this.D;
    var route = s.route;

    var nav = {};
    AK_NAV.forEach(function (n) { nav[n.r] = function () { self.go(n.r); }; });
    var navItems = AK_NAV.map(function (n, i) {
      var on = n.r === route;
      return { label: n.label, cls: on ? "on" : "", current: on ? "page" : undefined, go: nav[n.r], no: "0" + (i + 1), delay: 60 + i * 45 };
    });
    var navCur = AK_NAV.find(function (n) { return n.r === route; });

    var is = { notfound: route === "notfound" };
    AK_ROUTES.forEach(function (r) { is[r] = route === r; });

    var countries = D.COUNTRIES.map(function (c, i) {
      var sel = i === s.cIdx;
      return {
        id: c.id, name: c.name, native: c.native, lang: c.lang, motto: c.motto, no: "0" + (i + 1),
        tabCls: sel ? "on" : "", selected: sel, tabIndex: sel ? 0 : -1,
        goCulture: function () { self.go("culturas", { cIdx: i, cAnim: s.cAnim + 1 }); },
        pick: function () { self.setState({ cIdx: i, cAnim: s.cAnim + 1 }); self.pushHash("culturas/" + c.id); },
        tabKey: function (e) {
          var n = D.COUNTRIES.length, j = null;
          if (e.key === "ArrowRight") j = (i + 1) % n; else if (e.key === "ArrowLeft") j = (i - 1 + n) % n;
          else if (e.key === "Home") j = 0; else if (e.key === "End") j = n - 1;
          if (j === null) return;
          e.preventDefault();
          self.setState({ cIdx: j, cAnim: s.cAnim + 1 }, function () { try { document.getElementById("tab-" + D.COUNTRIES[j].id).focus(); } catch (x) {} });
        }
      };
    });
    var C = D.COUNTRIES[s.cIdx], nC = D.COUNTRIES.length;
    var prevI = (s.cIdx - 1 + nC) % nC, nextI = (s.cIdx + 1) % nC;
    var cc = Object.assign({}, C, {
      no: "0" + (s.cIdx + 1), anim: s.cAnim % 2 ? "swap-a" : "swap-b",
      prevName: D.COUNTRIES[prevI].name, nextName: D.COUNTRIES[nextI].name,
      prev: function () { self.setState({ cIdx: prevI, cAnim: s.cAnim + 1 }); self.pushHash("culturas/" + D.COUNTRIES[prevI].id); },
      next: function () { self.setState({ cIdx: nextI, cAnim: s.cAnim + 1 }); self.pushHash("culturas/" + D.COUNTRIES[nextI].id); },
      goRecipes: function () { self.go("receitas", { country: C.id, cat: "all", diff: "all", time: "all", q: "" }); }
    });

    // recipes filters
    var res = this.filtered();
    var anyF = !!(s.q || s.cat !== "all" || s.diff !== "all" || s.time !== "all" || s.country);
    var clearF = function () { self.setF({ q: "", cat: "all", diff: "all", time: "all", country: null }); };
    var f = {
      q: s.q, diff: s.diff, time: s.time,
      setQ: function (e) { self.setF({ q: e.target.value }); },
      setDiff: function (e) { self.setF({ diff: e.target.value }); },
      setTime: function (e) { self.setF({ time: e.target.value }); },
      cats: [{ id: "all", label: "Todas" }].concat(D.CATS).map(function (c) {
        var on = s.cat === c.id;
        return { label: c.label, on: on, cls: on ? "on" : "", pick: function () { self.setF({ cat: c.id }); } };
      }),
      results: res.map(function (r) { return self.card(r); }),
      count: res.length, countLabel: res.length === 1 ? "receita encontrada" : "receitas encontradas",
      empty: res.length === 0, any: anyF, clear: clearF,
      countryOn: !!s.country, countryName: s.country ? this.countryById[s.country].name : "",
      clearCountry: function () { self.setF({ country: null }); },
      gridCls: s.fAnim % 2 ? "grid-a" : "grid-b",
      emptyMsg: s.q ? "Nada combina com “" + s.q + "” nesses filtros. Tente outro termo ou remova algum filtro." : "Nenhuma receita reúne todos esses filtros ao mesmo tempo. Remova algum para ver mais opções."
    };

    // gallery
    var sizes = ["big", "tall", "", "", "wide", "", "tall", "", "", ""];
    var gAll = D.RECIPES.filter(function (r) { return r.gcat; });
    var gItems = gAll.filter(function (r) {
      return (s.gCountry === "all" || r.country === s.gCountry) && (s.gCat === "all" || r.gcat === s.gCat);
    });
    var g = {
      countries: [{ id: "all", label: "Todos" }].concat(D.COUNTRIES.map(function (c) { return { id: c.id, label: c.name }; })).map(function (c) {
        var on = s.gCountry === c.id;
        return { label: c.label, on: on, cls: on ? "on" : "", pick: function () { self.setState({ gCountry: c.id, gAnim: s.gAnim + 1 }); } };
      }),
      cats: [{ id: "all", label: "Todas" }].concat(D.GCATS).map(function (c) {
        var on = s.gCat === c.id;
        return { label: c.label, on: on, cls: on ? "on" : "", pick: function () { self.setState({ gCat: c.id, gAnim: s.gAnim + 1 }); } };
      }),
      items: gItems.map(function (r, i) {
        var k = self.card(r);
        k.size = gItems.length === gAll.length ? sizes[i] : (i === 0 && gItems.length > 2 ? "wide" : "");
        k.gcatLabel = self.gcatById[r.gcat];
        k.no = (i < 9 ? "0" : "") + (i + 1);
        return k;
      }),
      empty: gItems.length === 0,
      countLabel: gItems.length === 1 ? "1 prato" : gItems.length + " pratos",
      gridCls: s.gAnim % 2 ? "grid-a" : "grid-b",
      emptyMsg: "Ainda não temos um prato dessa categoria para o país escolhido.",
      clear: function () { self.setState({ gCountry: "all", gCat: "all", gAnim: s.gAnim + 1 }); }
    };

    // ingredients
    var ingredients = D.INGREDIENTS.map(function (it) {
      var open = s.openIng === it.id;
      return Object.assign({}, it, {
        open: open, cls: open ? "open" : "", btn: open ? "Fechar detalhes ↑" : "Saiba mais →",
        toggle: function () {
          self.setState({ openIng: open ? null : it.id }, function () {
            if (!open) try { document.getElementById("ing-" + it.id).scrollIntoView({ behavior: self.reduced ? "auto" : "smooth", block: "nearest" }); } catch (e) {}
          });
        }
      });
    });
    var T = D.TECHS[s.tech];
    var techTabs = D.TECHS.map(function (t, i) {
      var on = i === s.tech;
      return {
        id: t.id, label: t.label, on: on, cls: on ? "on" : "", tabIndex: on ? 0 : -1,
        pick: function () { self.setState({ tech: i, tAnim: s.tAnim + 1 }); },
        key: function (e) {
          var n = D.TECHS.length, j = null;
          if (e.key === "ArrowRight") j = (i + 1) % n; else if (e.key === "ArrowLeft") j = (i - 1 + n) % n;
          if (j === null) return;
          e.preventDefault();
          self.setState({ tech: j, tAnim: s.tAnim + 1 }, function () { try { document.getElementById("tt-" + D.TECHS[j].id).focus(); } catch (x) {} });
        }
      };
    });
    var tech = { id: T.id, no: "0" + (s.tech + 1), title: T.title, intro: T.intro, tip: T.tip, steps: T.steps, hasTastes: !!T.tastes, anim: s.tAnim % 2 ? "swap-a" : "swap-b" };

    // facts
    var facts = D.FACTS.map(function (x, i) {
      var on = !!s.facts[i];
      return Object.assign({}, x, {
        on: on, cls: on ? "on" : "", hint: on ? "Fechar" : "Revelar a história",
        toggle: function () { var nf = Object.assign({}, s.facts); nf[i] = !on; self.setState({ facts: nf }); }
      });
    });

    // seasonal
    var mk = function (id, tag, why) { var k = self.card(self.recipeById[id]); k.tag = tag; k.why = why; return k; };
    var season = {
      main: mk("kimchi-jjigae", "Outono na Coreia", "Na Coreia, outubro anuncia o kimjang, a grande preparação coletiva de kimchi. É também quando o kimchi do ano anterior está no ponto ideal de acidez para virar este ensopado."),
      side: [
        mk("arroz-glutinoso-manga", "Primavera no Brasil", "A safra brasileira de manga começa a ganhar força na primavera. Fruta madura e perfumada é metade desta sobremesa."),
        mk("ichigo-daifuku", "Últimos morangos", "O morango ainda está em boa fase nas feiras: aproveite os pequenos e bem vermelhos para o mochi.")
      ]
    };

    // newsletter
    var nw = s.news;
    var news = {
      email: nw.email, consent: nw.consent, error: nw.error, done: nw.done, form: !nw.done,
      cls: nw.error ? "bad" : "", invalid: nw.error ? "true" : undefined,
      change: function (e) { var v = e.target.value; self.setState({ news: Object.assign({}, s.news, { email: v, error: "" }) }); },
      toggleConsent: function (e) { self.setState({ news: Object.assign({}, s.news, { consent: e.target.checked, error: "" }) }); },
      submit: function (e) {
        e.preventDefault();
        var v = s.news.email.trim(), err = "";
        if (!v) err = "Informe um e-mail para se inscrever.";
        else if (!AK_EMAIL.test(v)) err = "Este e-mail não parece válido. Ex.: voce@exemplo.com";
        else if (!s.news.consent) err = "Marque a autorização para receber e-mails.";
        self.setState({ news: Object.assign({}, s.news, { email: v, error: err, done: !err }) });
      },
      reset: function () { self.setState({ news: { email: "", consent: true, error: "", done: false } }); }
    };

    // contact
    var c = s.contact, errs = this.cErrors(c), fields = ["name", "email", "subject", "message"];
    var labels = { name: "Nome", email: "E-mail", subject: "Assunto", message: "Mensagem" };
    var shown = {};
    fields.forEach(function (k) { shown[k] = (s.cSubmitted || s.cTouched[k]) && errs[k] ? errs[k] : ""; });
    var cv = {
      v: c, e: shown, sent: s.cSent, form: !s.cSent, okRef: this.okRef,
      cls: {}, inv: {}, on: {}, blur: {},
      msgLen: c.message.length,
      firstName: c.name.trim().split(/\s+/)[0] || "",
      subjectLabel: { receita: "Dúvida sobre uma receita", sugestao: "Sugestão de prato ou país", parceria: "Parcerias e eventos", imprensa: "Imprensa", outro: "Outro assunto" }[c.subject] || "",
      errList: s.cSubmitted ? fields.filter(function (k) { return errs[k]; }).map(function (k) { return labels[k] + ": " + errs[k]; }) : [],
      submit: function (e) {
        e.preventDefault();
        var ers = self.cErrors(self.state.contact), ks = Object.keys(ers);
        if (ks.length) {
          self.setState({ cSubmitted: true }, function () { try { document.getElementById({ name: "c-name", email: "c-email", subject: "c-subject", message: "c-msg" }[ks[0]]).focus(); } catch (x) {} });
        } else self.setState({ cSent: true, cSubmitted: false, cTouched: {} });
      },
      reset: function () { self.setState({ contact: { name: "", email: "", subject: "", message: "" }, cSent: false, cSubmitted: false, cTouched: {} }); }
    };
    cv.errCount = cv.errList.length;
    cv.hasSummary = cv.errList.length > 0;
    fields.forEach(function (k) {
      var bad = !!shown[k], ok = !errs[k] && (s.cTouched[k] || s.cSubmitted);
      cv.cls[k] = bad ? "bad" : ok ? "ok" : "";
      cv.inv[k] = bad ? "true" : undefined;
      cv.on[k] = function (e) {
        var v = e.target.value; if (k === "message") v = v.slice(0, 1200);
        var nc = Object.assign({}, self.state.contact); nc[k] = v; self.setState({ contact: nc });
      };
      cv.blur[k] = function () { if (!self.state.cTouched[k]) { var t = Object.assign({}, self.state.cTouched); t[k] = true; self.setState({ cTouched: t }); } };
    });

    // quiz
    var Q = D.QUESTIONS, step = s.quizStep, a = s.answers;
    var cur = step >= 0 && step < Q.length ? Q[step] : null;
    var kanji = ["一", "二", "三", "四"];
    var q = {
      isStart: step === -1, isQuestion: !!cur, isResult: step >= Q.length, headRef: this.headRef,
      num: step + 1, pct: Math.round(((step + 1) / Q.length) * 100), anim: s.qAnim % 2 ? "swap-a" : "swap-b",
      cur: cur || Q[0],
      backLabel: step === 0 ? "Voltar ao início" : "Pergunta anterior",
      start: function () { self.setState({ quizStep: 0, answers: {}, qAnim: s.qAnim + 1 }); },
      back: function () { self.setState({ quizStep: step - 1, qAnim: s.qAnim + 1 }); },
      restart: function () { self.setState({ quizStep: 0, answers: {}, qAnim: s.qAnim + 1 }); },
      opts: cur ? cur.opts.map(function (o, i) {
        var on = a[cur.key] === o.v;
        return {
          k: kanji[i], label: o.label, sub: o.sub, on: on, cls: on ? "on" : "",
          pick: function () {
            var na = Object.assign({}, s.answers); na[cur.key] = o.v;
            self.setState({ answers: na });
            clearTimeout(self._qT);
            self._qT = setTimeout(function () { self.setState({ quizStep: step + 1, qAnim: self.state.qAnim + 1 }); }, self.reduced ? 0 : 260);
          }
        };
      }) : []
    };
    if (q.isResult) {
      var picks = this.results();
      var top = picks.length ? picks[0].s : 1;
      q.profile = this.profile(a);
      q.recs = picks.map(function (p, i) {
        var k = self.card(p.r);
        k.rank = i + 1;
        k.reasons = p.why.length ? p.why : ["Uma boa porta de entrada para a cozinha de " + p.r.countryName];
        k.match = Math.max(52, Math.min(98, Math.round(96 - (top - p.s) * 4 - i * 2)));
        return k;
      });
      q.drink = (a.temp === "frio" || a.int === 3)
        ? "Para acompanhar: um cà phê sữa đá gelado, intenso e doce — a receita está na categoria Bebidas."
        : "Para acompanhar: uma tigela de matcha batido, vegetal e levemente amargo — a receita está na categoria Bebidas.";
    } else { q.profile = { k: "", name: "", desc: "" }; q.recs = []; q.drink = ""; }

    // modal
    var mr = s.recipe ? this.recipeById[s.recipe] : null;
    var m = { open: !!mr, closeRef: this.closeRef };
    if (mr) {
      m.r = this.card(mr);
      m.ings = mr.ings.map(function (t, i) {
        var on = !!s.checked[i];
        return { t: t, on: on, cls: on ? "on" : "", toggle: function () { var n = Object.assign({}, self.state.checked); n[i] = !on; self.setState({ checked: n }); } };
      });
      m.steps = mr.steps.map(function (t, i) {
        var on = !!s.done[i];
        return { t: t, n: i + 1, on: on, cls: on ? "on" : "", toggle: function () { var n = Object.assign({}, self.state.done); n[i] = !on; self.setState({ done: n }); } };
      });
      m.ingCount = mr.ings.length; m.stepCount = mr.steps.length;
      m.checkedCount = Object.keys(s.checked).filter(function (k) { return s.checked[k]; }).length;
      m.doneCount = Object.keys(s.done).filter(function (k) { return s.done[k]; }).length;
      var rel = D.RECIPES.filter(function (r) { return r.id !== mr.id && r.country === mr.country; })
        .concat(D.RECIPES.filter(function (r) { return r.id !== mr.id && r.cat === mr.cat && r.country !== mr.country; }));
      var seen = {};
      m.related = rel.filter(function (r) { if (seen[r.id]) return false; seen[r.id] = 1; return true; }).slice(0, 3).map(function (r) {
        var k = self.card(r); k.open = function () { self.openRecipe(r.id); }; return k;
      });
    } else {
      m.r = { title: "", img: "", alt: "" }; m.ings = []; m.steps = []; m.related = [];
    }
    m.close = function () { self.closeRecipe(); };
    m.backdrop = function (e) { if (e.target === e.currentTarget) self.closeRecipe(); };
    m.key = function (e) { if (e.key === "Escape") { e.stopPropagation(); self.closeRecipe(); } };

    var target = [D.RECIPES.length, D.COUNTRIES.length, D.INGREDIENTS.length, D.TECHS.length];
    var cl = ["receitas testadas e detalhadas", "cozinhas nacionais, cada uma com seu nome", "ingredientes essenciais explicados", "técnicas fundamentais passo a passo"];

    return {
      showIntro: s.intro,
      skipIntro: function () { clearTimeout(self._introT); self.setState({ intro: false }); },
      introEnd: function (e) { if (e.target === e.currentTarget) self.setState({ intro: false }); },
      nav: nav, navItems: navItems, is: is, badPath: s.badPath,
      menuOpen: s.menuOpen,
      openMenu: function () { self.setState({ menuOpen: true }); },
      closeMenu: function () { self.setState({ menuOpen: false }); },
      menuKey: function (e) { if (e.key === "Escape") self.setState({ menuOpen: false }); },
      menuCloseRef: this.menuCloseRef,
      railKanji: navCur ? navCur.k : "無", railLabel: navCur ? navCur.label : "404",
      openRamen: function (e) { self.openRecipe("ramen-tonkotsu", e); },
      scrollNext: function () { try { document.getElementById("home-next").scrollIntoView({ behavior: self.reduced ? "auto" : "smooth" }); } catch (e) {} },
      recipeCount: D.RECIPES.length,
      countries: countries, cc: cc,
      popular: D.RECIPES.filter(function (r) { return r.popular; }).map(function (r) { return self.card(r); }),
      season: season, facts: facts, news: news,
      f: f, g: g, ingredients: ingredients, techTabs: techTabs, tech: tech, tastes: D.TASTES,
      q: q, c: cv, m: m,
      timeline: D.TIMELINE,
      counterRef: this.counterRef,
      counters: target.map(function (v, i) { return { v: s.counters[i], l: cl[i] }; }),
      showTop: s.showTop && !s.recipe && !s.menuOpen,
      toTop: function () { try { window.scrollTo({ top: 0, behavior: self.reduced ? "auto" : "smooth" }); } catch (e) {} try { document.getElementById("conteudo").focus({ preventScroll: true }); } catch (e) {} }
    };
  }
}

/* ---------- inicialização ---------- */
(function boot() {
  var mount = document.getElementById("root");
  var root = ReactDOM.createRoot(mount);
  root.render(React.createElement(Component, { intro: true }));
  document.documentElement.classList.add("js-ready");
})();

/* Link "Pular para o conteúdo": move o foco sem criar uma entrada no histórico. */
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest("a.skip");
  if (!a) return;
  e.preventDefault();
  var main = document.getElementById("conteudo");
  if (main) main.focus();
});
