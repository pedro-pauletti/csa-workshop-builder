/* Northwind MemberAssist — static workshop demo.
 * Single-file vanilla JS app. Hash-based routing.
 * No external calls; everything is mocked from /data/*.json. */

const AGENDA = [
  { slug: "home",                   title: "Welcome",                  icon: "fa-solid fa-house",            file: "sections/home.html" },
  { slug: "coverage-lookup",        title: "Coverage Lookup",          icon: "fa-solid fa-comments",         file: "sections/coverage-lookup.html" },
  { slug: "claim-status",           title: "Claim Status",             icon: "fa-solid fa-receipt",          file: "sections/claim-status.html" },
  { slug: "provider-search",        title: "Provider Search",          icon: "fa-solid fa-user-doctor",      file: "sections/provider-search.html" },
  { slug: "eob-extract",            title: "EOB Document Extraction",  icon: "fa-solid fa-file-invoice",     file: "sections/eob-extract.html" },
  { slug: "eval-scorecard",         title: "Evaluation Scorecard",     icon: "fa-solid fa-chart-line",       file: "sections/eval-scorecard.html" },
  { slug: "roadmap",                title: "Roadmap & Next Steps",     icon: "fa-solid fa-route",            file: "sections/roadmap.html" },
];

const menuEl = document.getElementById("menu");
const mainEl = document.getElementById("main");

// ---------- Sidebar ----------
function renderMenu(activeSlug) {
  menuEl.innerHTML = AGENDA.map(item => `
    <a class="menu-item ${item.slug === activeSlug ? "active" : ""}" href="#${item.slug}">
      <i class="${item.icon}"></i>
      <span>${item.title}</span>
    </a>
  `).join("");
}

// ---------- Router ----------
async function route() {
  const slug = (location.hash || "#home").replace(/^#/, "");
  const item = AGENDA.find(a => a.slug === slug) || AGENDA[0];
  renderMenu(item.slug);
  try {
    const res = await fetch(item.file, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.statusText);
    mainEl.innerHTML = await res.text();
  } catch (err) {
    mainEl.innerHTML = `
      <div class="card"><h3>Could not load section</h3>
      <p class="muted">${err}</p></div>`;
    return;
  }
  // Run per-section initializer if any
  const init = sectionInits[item.slug];
  if (init) init(mainEl);
  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);

// ---------- Mock helpers ----------
function loadJSON(path) {
  return fetch(path, { cache: "no-cache" }).then(r => r.json());
}
function delay(ms) { return new Promise(res => setTimeout(res, ms)); }

function addBubble(chatEl, role, text) {
  const b = document.createElement("div");
  b.className = `bubble ${role}`;
  b.textContent = text;
  chatEl.appendChild(b);
  chatEl.scrollTop = chatEl.scrollHeight;
  return b;
}

// ---------- Section initializers ----------
const sectionInits = {
  "coverage-lookup": initCoverage,
  "claim-status":    initClaimStatus,
  "provider-search": initProviderSearch,
  "eob-extract":     initEobExtract,
  "eval-scorecard":  initEvalScorecard,
};

// 1) Coverage Lookup — chat with mocked intent classifier + benefits answer.
async function initCoverage(root) {
  const coverage = await loadJSON("data/coverage.json");
  const chat = root.querySelector("#chat");
  const input = root.querySelector("#chat-input");
  const send  = root.querySelector("#chat-send");

  const seed = [
    { role: "system",    text: "Demo · grounded on synthetic Northwind benefits data." },
    { role: "assistant", text: "Hi! I'm MemberAssist. Ask me about your plan benefits — for example, 'is physical therapy covered?'" },
  ];
  seed.forEach(m => addBubble(chat, m.role, m.text));

  async function ask(q) {
    addBubble(chat, "user", q);
    const thinking = addBubble(chat, "assistant", "…");
    await delay(600);
    const key = Object.keys(coverage).find(k => q.toLowerCase().includes(k));
    const benefit = coverage[key];
    if (!benefit) {
      thinking.textContent = "I couldn't find that benefit in the plan. Try 'physical therapy', 'mental health', 'maternity', 'preventive', or 'vision'.";
      return;
    }
    thinking.textContent =
`✅ ${benefit.name} is covered under your plan.

• In-network: ${benefit.in_network}
• Out-of-network: ${benefit.out_of_network}
• Prior authorization: ${benefit.prior_auth ? "required" : "not required"}
• Annual limit: ${benefit.annual_limit}

Source: Northwind Plan Document §${benefit.section} (synthetic).`;
  }

  send.addEventListener("click", () => {
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    ask(q);
  });
  input.addEventListener("keydown", e => { if (e.key === "Enter") send.click(); });

  root.querySelectorAll(".quick-action").forEach(btn => {
    btn.addEventListener("click", () => ask(btn.dataset.q));
  });
}

// 2) Claim Status — lookup by member id + claim id
async function initClaimStatus(root) {
  const claims = await loadJSON("data/claims.json");
  const form = root.querySelector("#claim-form");
  const out  = root.querySelector("#claim-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    out.innerHTML = `<p class="muted">Looking up claim…</p>`;
    await delay(500);
    const member = form.member.value.trim().toUpperCase();
    const claim  = form.claim.value.trim().toUpperCase();
    const hit = claims.find(c => c.member_id === member && c.claim_id === claim)
             || claims.find(c => c.member_id === member)
             || claims[0];
    out.innerHTML = `
      <div class="grid-2">
        <div>
          <h3>Claim ${hit.claim_id}</h3>
          <p><span class="pill ${hit.status === 'Paid' ? '' : hit.status === 'Denied' ? 'warn' : 'violet'}">${hit.status}</span>
             <span class="pill">${hit.service}</span></p>
          <p class="muted">Member ${hit.member_id} · Date of service ${hit.dos}</p>
        </div>
        <div>
          <table class="simple">
            <tr><th>Billed</th><td>$${hit.billed.toFixed(2)}</td></tr>
            <tr><th>Allowed</th><td>$${hit.allowed.toFixed(2)}</td></tr>
            <tr><th>Plan paid</th><td>$${hit.plan_paid.toFixed(2)}</td></tr>
            <tr><th>Member responsibility</th><td>$${hit.member_resp.toFixed(2)}</td></tr>
          </table>
        </div>
      </div>
      <p class="muted">Source-of-truth: synthetic Northwind adjudication store.
      ${hit.notes ? "Notes: " + hit.notes : ""}</p>
    `;
  });
}

// 3) Provider Search — filter + render
async function initProviderSearch(root) {
  const providers = await loadJSON("data/providers.json");
  const form = root.querySelector("#prov-form");
  const out  = root.querySelector("#prov-result");

  function render(list) {
    if (!list.length) {
      out.innerHTML = `<p class="muted">No providers match those filters in the synthetic directory.</p>`;
      return;
    }
    out.innerHTML = `<ul class="result-list">${list.slice(0, 8).map(p => `
      <li>
        <span class="title">${p.name}, ${p.degree}</span>
        <span>${p.specialty} · ${p.city}, ${p.state} · ${p.distance_mi} mi</span>
        <span class="meta">Accepting new patients: ${p.accepting ? "yes" : "no"} · Languages: ${p.languages.join(", ")} · NPI ${p.npi}</span>
      </li>`).join("")}</ul>`;
  }
  render(providers);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    out.innerHTML = `<p class="muted">Searching…</p>`;
    await delay(400);
    const spec   = form.specialty.value;
    const zip    = form.zip.value.trim();
    const accept = form.accepting.checked;
    let list = providers.slice();
    if (spec) list = list.filter(p => p.specialty === spec);
    if (zip)  list = list.filter(p => p.zip.startsWith(zip.slice(0, 3)));
    if (accept) list = list.filter(p => p.accepting);
    render(list);
  });
}

// 4) EOB Extraction — paste text, "extract" with regex/heuristics
async function initEobExtract(root) {
  const ta  = root.querySelector("#eob-text");
  const btn = root.querySelector("#eob-extract");
  const out = root.querySelector("#eob-result");

  const sample = `EXPLANATION OF BENEFITS
Member: Maria Santos    Member ID: NW-4471
Provider: Riverdale Clinic
Claim #: CLM-9981   Date of service: 2026-03-12
Procedure: Office visit, established patient (CPT 99213)
Billed amount: $245.00
Allowed amount: $148.00
Plan paid: $118.40
Member responsibility: $29.60 (coinsurance 20%)`;
  ta.value = sample;

  btn.addEventListener("click", async () => {
    out.innerHTML = `<p class="muted">Extracting fields…</p>`;
    await delay(700);
    const t = ta.value;
    const grab = (re) => { const m = t.match(re); return m ? m[1].trim() : "—"; };
    const fields = {
      "Member name":      grab(/Member:\s*([^\n]+?)\s{2,}/i),
      "Member ID":        grab(/Member ID:\s*([^\n]+)/i),
      "Provider":         grab(/Provider:\s*([^\n]+)/i),
      "Claim #":          grab(/Claim #:\s*([^\s]+)/i),
      "Date of service":  grab(/Date of service:\s*([^\n]+)/i),
      "Procedure":        grab(/Procedure:\s*([^\n]+)/i),
      "Billed amount":    grab(/Billed amount:\s*\$([\d.,]+)/i),
      "Allowed amount":   grab(/Allowed amount:\s*\$([\d.,]+)/i),
      "Plan paid":        grab(/Plan paid:\s*\$([\d.,]+)/i),
      "Member responsibility": grab(/Member responsibility:\s*\$([\d.,]+)[^\n]*/i),
    };
    out.innerHTML = `
      <table class="simple">
        ${Object.entries(fields).map(([k, v]) =>
          `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}
      </table>
      <p class="muted">Mock extractor uses regex heuristics. In production, swap for
      Azure AI Document Intelligence (prebuilt or custom EOB model).</p>`;
  });
}

// 5) Evaluation Scorecard
async function initEvalScorecard(root) {
  const data = await loadJSON("data/eval.json");
  const kpis = root.querySelector("#kpis");
  const tbl  = root.querySelector("#eval-table");

  kpis.innerHTML = data.kpis.map(k => `
    <div class="kpi">
      <div class="label">${k.label}</div>
      <div class="value">${k.value}</div>
      <div class="delta ${k.delta_dir}">${k.delta}</div>
    </div>`).join("");

  tbl.innerHTML = `
    <table class="simple">
      <thead><tr>
        <th>Test query</th><th>Intent</th><th>Groundedness</th><th>Relevance</th><th>Latency</th><th>Verdict</th>
      </tr></thead>
      <tbody>
        ${data.rows.map(r => `
          <tr>
            <td>${r.query}</td>
            <td><span class="pill">${r.intent}</span></td>
            <td>${r.groundedness.toFixed(2)}</td>
            <td>${r.relevance.toFixed(2)}</td>
            <td>${r.latency_ms} ms</td>
            <td><span class="pill ${r.verdict === 'pass' ? '' : 'warn'}">${r.verdict}</span></td>
          </tr>`).join("")}
      </tbody>
    </table>`;
}
