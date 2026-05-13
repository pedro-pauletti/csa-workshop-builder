// Azure AI Search Workshop — Contoso Outdoor (live demo)
// Static SPA: hash-routed sections, mock JSON data, no backend.

const AGENDA = [
  { slug: 'home',                      title: 'Welcome',                icon: 'fa-solid fa-house',           label: 'Overview' },
  { slug: 'what-is-ai-search',         title: 'What is Azure AI Search', icon: 'fa-solid fa-magnifying-glass', label: '1 / 6' },
  { slug: 'index-design',              title: 'Index design & ingestion', icon: 'fa-solid fa-database',     label: '2 / 6' },
  { slug: 'vector-hybrid',             title: 'Vector & hybrid search',  icon: 'fa-solid fa-vector-square', label: '3 / 6' },
  { slug: 'semantic-ranker',           title: 'Semantic ranker',         icon: 'fa-solid fa-wand-magic-sparkles', label: '4 / 6' },
  { slug: 'rag-chat',                  title: 'Grounded chat (RAG)',     icon: 'fa-solid fa-comments',      label: '5 / 6' },
  { slug: 'evaluation-next',           title: 'Evaluation & next steps', icon: 'fa-solid fa-chart-line',    label: '6 / 6' },
];

const SECTION_ROOT = document.getElementById('sectionRoot');
const SIDEBAR_NAV  = document.getElementById('sidebarNav');
const CRUMB        = document.getElementById('crumbSection');
const THEME_BTN    = document.getElementById('themeToggle');
const SIDEBAR_BTN  = document.getElementById('sidebarToggle');

// ---------- Sidebar collapse ---------- //

function applySidebar(state) {
  const root = document.documentElement;
  if (state === 'collapsed') {
    root.setAttribute('data-sidebar', 'collapsed');
    SIDEBAR_BTN.setAttribute('aria-expanded', 'false');
    SIDEBAR_BTN.setAttribute('title', 'Expand sidebar');
  } else {
    root.removeAttribute('data-sidebar');
    SIDEBAR_BTN.setAttribute('aria-expanded', 'true');
    SIDEBAR_BTN.setAttribute('title', 'Collapse sidebar');
  }
  try { localStorage.setItem('csa-demo-sidebar', state); } catch (e) {}
}
SIDEBAR_BTN.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-sidebar') === 'collapsed' ? 'collapsed' : 'expanded';
  applySidebar(current === 'collapsed' ? 'expanded' : 'collapsed');
});
applySidebar(document.documentElement.getAttribute('data-sidebar') === 'collapsed' ? 'collapsed' : 'expanded');

// ---------- Theme ---------- //

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('csa-demo-theme', theme); } catch (e) {}
  const icon = THEME_BTN.querySelector('i');
  icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}
THEME_BTN.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});
applyTheme(document.documentElement.getAttribute('data-theme') || 'light');

// ---------- Sidebar ---------- //

function renderSidebar() {
  SIDEBAR_NAV.innerHTML = AGENDA.map(item => `
    <a href="#${item.slug}" data-slug="${item.slug}" data-tooltip="${item.title}">
      <i class="${item.icon}"></i>
      <span>${item.title}</span>
      <span class="step-num">${item.label}</span>
    </a>
  `).join('');
}

function highlightActive(slug) {
  SIDEBAR_NAV.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.dataset.slug === slug);
  });
  const item = AGENDA.find(x => x.slug === slug);
  if (item) CRUMB.textContent = item.title;
}

// ---------- Routing ---------- //

async function navigate() {
  const slug = (location.hash || '#home').slice(1);
  const item = AGENDA.find(x => x.slug === slug) || AGENDA[0];
  highlightActive(item.slug);
  SECTION_ROOT.innerHTML = '<div class="loading"><i class="fa-solid fa-spinner"></i> Loading section…</div>';
  try {
    const res = await fetch(`sections/${item.slug}.html`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    SECTION_ROOT.innerHTML = await res.text();
    window.scrollTo({ top: 0, behavior: 'instant' });
    const init = SECTION_INITS[item.slug];
    if (init) await init();
  } catch (err) {
    SECTION_ROOT.innerHTML = `<div class="concept"><h2>Section failed to load</h2><p>${err}</p></div>`;
  }
}

window.addEventListener('hashchange', navigate);

// ---------- Helpers ---------- //

const delay = (ms) => new Promise(r => setTimeout(r, ms));
async function loadJSON(name) {
  const res = await fetch(`data/${name}.json`, { cache: 'no-store' });
  return res.json();
}
function fmtScore(s) { return (Math.round(s * 1000) / 1000).toFixed(3); }

// ---------- Section initializers ---------- //

const SECTION_INITS = {
  'home': async () => {
    document.querySelectorAll('[data-go]').forEach(btn => {
      btn.addEventListener('click', () => { location.hash = '#' + btn.dataset.go; });
    });
  },

  'index-design': async () => {
    const out = document.getElementById('schemaOut');
    const select = document.getElementById('fieldKind');
    if (!select) return;
    const data = await loadJSON('schema');
    function render() {
      const kind = select.value;
      const field = data.fields.find(f => f.name === kind);
      const { explanation, ...definition } = field;
      out.innerHTML = `
        <pre class="schema-pre">${JSON.stringify(definition, null, 2)}</pre>
        <div class="schema-note">
          <i class="fa-solid fa-circle-info"></i>
          <p>${explanation}</p>
        </div>
      `;
    }
    select.addEventListener('change', render);
    render();

    // Filter builder
    const fbCat   = document.getElementById('fbCat');
    const fbPrice = document.getElementById('fbPrice');
    const fbStock = document.getElementById('fbStock');
    const odataOut = document.getElementById('odataOut');
    const fbResults = document.getElementById('fbResults');
    if (!fbCat) return;
    const products = (await loadJSON('products')).products;
    function fb() {
      const parts = [];
      if (fbCat.value)   parts.push(`category eq '${fbCat.value}'`);
      if (fbPrice.value) parts.push(`price le ${Number(fbPrice.value)}`);
      if (fbStock.value) parts.push(`stock ge ${Number(fbStock.value)}`);
      const expr = parts.length ? parts.join(' and ') : '—';
      odataOut.textContent = expr;

      const matches = products.filter(p =>
        (!fbCat.value   || p.category === fbCat.value) &&
        (!fbPrice.value || p.price <= Number(fbPrice.value)) &&
        (!fbStock.value || p.stock >= Number(fbStock.value))
      );
      fbResults.innerHTML = `
        <div class="result__meta" style="margin-bottom:8px;">
          <span><i class="fa-solid fa-list"></i> ${matches.length} document(s) match</span>
        </div>
        ${matches.slice(0,5).map(p => `
          <div class="result">
            <div class="result__head">
              <i class="${p.icon}"></i>
              <strong>${p.title}</strong>
              <span class="result__meta">$${p.price.toFixed(0)} · ${p.stock} in stock · ${p.category}</span>
            </div>
          </div>
        `).join('')}
      `;
    }
    [fbCat, fbPrice, fbStock].forEach(el => el.addEventListener('input', fb));
    fb();
  },

  'vector-hybrid': async () => {
    const data = await loadJSON('products');
    const input = document.getElementById('queryInput');
    const btn = document.getElementById('runQuery');
    const out = document.getElementById('resultsOut');
    const modeToggles = document.querySelectorAll('[data-mode]');
    let mode = 'hybrid';
    modeToggles.forEach(t => t.addEventListener('click', () => {
      mode = t.dataset.mode;
      modeToggles.forEach(x => x.classList.toggle('active', x === t));
    }));

    async function runQuery() {
      const q = (input.value || '').trim().toLowerCase();
      out.innerHTML = '<div class="loading"><i class="fa-solid fa-spinner"></i> Querying mock Contoso index…</div>';
      await delay(450);
      const ranked = data.products.map(p => {
        const titleHit = q ? (p.title + ' ' + p.description + ' ' + (p.tags || []).join(' ')).toLowerCase().includes(q) : false;
        const vector  = p.scores.vector  + (titleHit ? 0.05 : 0);
        const keyword = titleHit ? Math.min(0.99, p.scores.keyword + 0.15) : p.scores.keyword * 0.6;
        const blend = mode === 'vector' ? vector : mode === 'keyword' ? keyword : (vector * 0.6 + keyword * 0.4);
        return { ...p, _blend: blend, _vector: vector, _keyword: keyword };
      }).sort((a, b) => b._blend - a._blend).slice(0, 5);

      out.innerHTML = ranked.map(p => `
        <div class="result">
          <div class="result__thumb"><i class="${p.icon}"></i></div>
          <div>
            <h3 class="result__title">${p.title}</h3>
            <div class="result__meta">
              <span><i class="fa-solid fa-tag"></i> ${p.category}</span>
              <span><i class="fa-solid fa-coins"></i> $${p.price.toFixed(2)}</span>
              <span><i class="fa-solid fa-warehouse"></i> ${p.stock} in stock</span>
            </div>
            <p class="result__snippet">${p.description}</p>
            <div class="result__scores">
              <span class="score score--vector">vector ${fmtScore(p._vector)}</span>
              <span class="score score--keyword">bm25 ${fmtScore(p._keyword)}</span>
              <span class="score">blend ${fmtScore(p._blend)}</span>
            </div>
          </div>
        </div>
      `).join('');
    }
    btn.addEventListener('click', runQuery);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') runQuery(); });
    runQuery();

    // Semantic similarity playground
    const simSel = document.getElementById('simPhrase');
    const simOut = document.getElementById('simOut');
    if (!simSel) return;
    const SIM_MAP = {
      rain: [
        { t: 'Stormridge 3L Insulated Rain Jacket', s: 0.94 },
        { t: 'Featherline Ultralight Down Jacket', s: 0.71 },
        { t: 'Trailrunner Windbreaker',            s: 0.58 },
        { t: 'Riverstone Waterproof Hiking Shoe',  s: 0.41 },
        { t: 'Summit 45 Backpack',                 s: 0.22 },
      ],
      ultralight: [
        { t: 'Skylight 2 Ultralight Tent',         s: 0.96 },
        { t: 'Basecamp 2 Trekking Tent',           s: 0.79 },
        { t: 'Summit 45 Backpack',                 s: 0.38 },
        { t: 'Featherline Ultralight Down Jacket', s: 0.34 },
        { t: 'Trailrunner Windbreaker',            s: 0.27 },
      ],
      winter: [
        { t: 'Polaris -15 Sleeping Bag',           s: 0.93 },
        { t: 'Featherline Ultralight Down Jacket', s: 0.81 },
        { t: 'Stormridge 3L Insulated Rain Jacket',s: 0.62 },
        { t: 'Basecamp 2 Trekking Tent',           s: 0.35 },
        { t: 'Trailrunner Windbreaker',            s: 0.18 },
      ],
      wet: [
        { t: 'Riverstone Waterproof Hiking Shoe',  s: 0.95 },
        { t: 'Stormridge 3L Insulated Rain Jacket',s: 0.72 },
        { t: 'Summit 45 Backpack',                 s: 0.39 },
        { t: 'Trailrunner Windbreaker',            s: 0.31 },
        { t: 'Polaris -15 Sleeping Bag',           s: 0.21 },
      ],
    };
    function renderSim() {
      const rows = SIM_MAP[simSel.value];
      simOut.innerHTML = rows.map(r => `
        <div class="sim-row">
          <span class="sim-row__text">${r.t}</span>
          <span class="sim-row__bar"><span class="sim-row__fill" style="width:${(r.s*100).toFixed(0)}%"></span></span>
          <span class="sim-row__score">${r.s.toFixed(2)}</span>
        </div>
      `).join('');
    }
    simSel.addEventListener('change', renderSim);
    renderSim();
  },

  'semantic-ranker': async () => {
    const data = await loadJSON('semantic');
    const before = document.getElementById('beforeRanker');
    const after  = document.getElementById('afterRanker');
    const caption = document.getElementById('semCaption');
    function render(list, el) {
      el.innerHTML = list.map((r, i) => `
        <div class="result">
          <div class="result__thumb"><i class="${r.icon}"></i></div>
          <div>
            <h3 class="result__title">${i + 1}. ${r.title}</h3>
            <p class="result__snippet">${r.snippet}</p>
            <div class="result__scores">
              <span class="score score--keyword">bm25 ${fmtScore(r.bm25)}</span>
              ${r.semantic ? `<span class="score score--semantic">semantic ${fmtScore(r.semantic)}</span>` : ''}
            </div>
          </div>
        </div>
      `).join('');
    }
    render(data.before, before);
    render(data.after, after);
    caption.innerHTML = `<strong>Semantic caption:</strong> ${data.caption}<br><strong>Semantic answer:</strong> ${data.answer}`;
  },

  'rag-chat': async () => {
    const data = await loadJSON('rag');
    const chat = document.getElementById('chatLog');
    const form = document.getElementById('chatForm');
    const inp  = document.getElementById('chatInput');
    const quick = document.querySelectorAll('[data-prompt]');

    function appendUser(text) {
      const div = document.createElement('div');
      div.className = 'chat__turn chat__turn--user';
      div.textContent = text;
      chat.appendChild(div);
    }
    function appendAssistant(turn) {
      const div = document.createElement('div');
      div.className = 'chat__turn chat__turn--assistant';
      div.innerHTML = `
        <div>${turn.text}</div>
        <div class="chat__citations">
          <strong>Sources:</strong>
          ${turn.citations.map((c, i) => `<a href="${c.url}" target="_blank" rel="noopener">[${i + 1}] ${c.title}</a>`).join('')}
        </div>
      `;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }

    async function ask(q) {
      appendUser(q);
      const loading = document.createElement('div');
      loading.className = 'chat__turn chat__turn--assistant';
      loading.innerHTML = '<div class="loading"><i class="fa-solid fa-spinner"></i> Retrieving from index + generating grounded answer…</div>';
      chat.appendChild(loading);
      await delay(700);
      loading.remove();
      const match = data.turns.find(t => q.toLowerCase().includes(t.match)) || data.fallback;
      appendAssistant(match);
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = inp.value.trim();
      if (!v) return;
      inp.value = '';
      ask(v);
    });
    quick.forEach(b => b.addEventListener('click', () => ask(b.dataset.prompt)));

    // Seed the chat
    ask('What rain jacket do you recommend for a 3-day hike in cold weather?');
  },

  'evaluation-next': async () => {
    const data = await loadJSON('evaluation');
    const metrics = document.getElementById('metricsBox');
    metrics.innerHTML = data.metrics.map(m => `
      <div class="metric">
        <div class="metric__label">${m.label}</div>
        <div class="metric__value">${m.value}</div>
        <div class="metric__hint">${m.hint}</div>
        ${typeof m.percent === 'number' ? `<div class="metric__bar"><span style="width:${m.percent}%"></span></div>` : ''}
      </div>
    `).join('');

    const timeline = document.getElementById('roadmapTimeline');
    timeline.innerHTML = data.roadmap.map((step, i) => `
      <li>
        <span class="timeline__dot">${i + 1}</span>
        <div>
          <p class="timeline__title">${step.title}</p>
          <p class="timeline__desc">${step.desc}</p>
        </div>
        <span class="timeline__when">${step.when}</span>
      </li>
    `).join('');
  },
};

// ---------- Boot ---------- //

renderSidebar();
navigate();
