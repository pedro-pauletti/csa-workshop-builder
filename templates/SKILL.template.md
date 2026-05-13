---
name: workshop-creation
description: "Scaffold a local-first, Docker-based, agenda-driven workshop web app for {{CUSTOMER_NAME}}. The web app's left-nav menu and per-section sub-apps are driven dynamically by the sibling `agenda.md` (read at scaffold time — never hard-coded). Generates a FastAPI + Jinja2 web app, optional FastAPI microservices (chat / search / workflow / document-analysis / evaluation), per-service Dockerfile + docker-compose.yml + example.env, and applies the {{THEME_NAME}} design system. Optimized for short customer workshops where attendees run everything locally with `docker compose up` and the demos are mocked by default (no real Azure resources required to run). WHEN to use: \"customer workshop demo\", \"agenda-driven workshop app\", \"{{CUSTOMER_NAME}} workshop\", \"interactive copilot demo\", \"local FastAPI workshop\", \"scaffold AI workshop project\"."
license: MIT
metadata:
  customer: "{{CUSTOMER_NAME}}"
  product_focus: "{{PRODUCT_FOCUS}}"      # e.g. "Azure AI Foundry", "Microsoft Fabric", "M365 Copilot"
  theme: "{{THEME_NAME}}"                  # one of: foundry-violet (default), northwind-teal, fabric-indigo, azure-blue, citrus-orange
  basedOn: "csa-workshop-builder/templates/SKILL.template.md"
  version: "1.0.0"
---

# {{CUSTOMER_NAME}} Workshop — SKILL

> Reusable scaffold contract for a **local-first, container-based, agenda-driven workshop web app**
> tailored to {{CUSTOMER_NAME}}. The app is a single FastAPI service that renders a sidebar from
> `agenda.md` and mounts one **section sub-app** per agenda item. Optional microservices (chat,
> search, workflow, doc-analysis, eval) are added only when the scenario calls for them; everything
> ships with a mock implementation so the demo works offline.

This file is a **contract for GitHub Copilot**. Anything marked as a **Rule** below MUST be
respected. Anything marked as an **Example** can be adapted.

---

## When to use

Use this skill when the user asks to:

- Scaffold a new customer workshop app for **{{CUSTOMER_NAME}}** (or a similar engagement) that
  mixes explanatory sections with interactive demos.
- Add a new section sub-app driven by a new bullet in `agenda.md`.
- Add a new microservice (chat / search / workflow / document-analysis / evaluation) consumed by
  the web app via `httpx`, with a mock fallback by default.
- Re-skin an existing workshop app for another customer or product (swap palette + `agenda.md`).

Do **not** use this skill for:

- Production deployments to Azure Container Apps / AKS — hand off once the local demo is validated.
- Single-process notebooks or pure CLI samples.
- Apps that hard-code their menu / sections (the contract is agenda-driven).

---

## Rules

1. **Local-first.** Every service MUST run with `docker compose up` from its own folder, with no
   Azure resources created automatically. Cloud resources (Foundry, Cosmos, Search, App Insights)
   are *consumed* via env vars only.
2. **Mock-by-default.** Every interactive demo MUST have a mock implementation that runs with no
   secrets. Real Azure SDK calls only activate when the corresponding env var is set.
3. **Agenda-driven menu.** The web app's primary navigation is **always** generated from the
   sibling [`agenda.md`](./agenda.md). Parse the file at scaffold time and create one menu entry +
   one section sub-app per agenda item. **Never hard-code** the agenda items inside templates or
   Python code.
4. **One folder per service** under `src/app/<serviceName>/`. No shared `Dockerfile`.
5. **FastAPI + uvicorn + API-key header.** Every microservice authenticates via `X-API-Key` and
   falls back to "no auth" only when `API_KEY` is unset (dev-only behavior).
6. **`host.docker.internal` for inter-service URLs** in `example.env`. Never hard-code container
   names — services are intended to run as separate compose stacks so attendees can stop/start
   them independently.
7. **Each service exposes a unique port** in the 8080–8089 range. Reserve **8080** for `webApp`.
8. **Consistent design system.** Every front-end MUST import the shared CSS variable contract
   (see [Design system](#design-system--color-schemes)) and use Inter + Font Awesome 6 + Jinja2.
9. **No secrets in repo.** Always ship `example.env`; the real `.env` is in `.gitignore`.
10. **Telemetry optional but wired.** If `APPINSIGHTS_CONNECTION_STRING` is set, configure
    `azure-monitor-opentelemetry`. If unset, services must start cleanly.
11. **No real customer PII.** All sample data under `data/` is synthetic.
12. **Single source of truth per concept.** Customer name, product focus, and theme overrides live
    in one config file (`app/config.py`). Templates pull from there — they never embed the
    customer name as a string literal.

---

## Context (filled per engagement)

```text
[paste customer-scenario.md content here]
```

### Personas (audience matrix)

| Persona | Role | Top concern |
|---|---|---|
| {{PERSONA_1_NAME}} | {{PERSONA_1_ROLE}} | {{PERSONA_1_CONCERN}} |
| {{PERSONA_2_NAME}} | {{PERSONA_2_ROLE}} | {{PERSONA_2_CONCERN}} |
| {{PERSONA_3_NAME}} | {{PERSONA_3_ROLE}} | {{PERSONA_3_CONCERN}} |
| {{PERSONA_4_NAME}} | {{PERSONA_4_ROLE}} | {{PERSONA_4_CONCERN}} |

### Success criteria

- Attendees leave the workshop able to articulate {{OUTCOME_1}}.
- Each section produces a tangible artifact: {{ARTIFACT_1}}, {{ARTIFACT_2}}, …
- The demo runs end-to-end on a laptop with no Azure subscription.

---

## Technology stack (locked)

- Python 3.11
- FastAPI 0.115
- Uvicorn 0.30
- Jinja2 3.1
- httpx 0.27
- python-dotenv 1.0
- pydantic 2.x
- pytest + pytest-asyncio (tests)
- **Front-end:** server-rendered HTML (Jinja2), vanilla JavaScript (no framework), CSS-only design
  system, **Inter** + **JetBrains Mono** fonts, **Font Awesome 6** icons.
- Docker 24+ and Docker Compose v2.

---

## Standard project layout

```text
<project-root>/
├── README.md
├── agenda.md                     # SOURCE OF TRUTH for the web-app menu
├── customer-scenario.md          # narrative + personas + KPIs
├── docker-compose.yml            # boots webApp by default
├── example.env                   # master example for shared infra values
├── .github/
│   └── skills/
│       └── workshop-creation/
│           ├── SKILL.md          # this file, customized for the customer
│           └── agenda.md         # copy used by the skill at scaffold time
├── data/                         # synthetic JSON / images for mocks
├── infra/                        # optional Bicep / azd (out of scope here)
└── src/
    └── app/
        ├── webApp/               # Front-end (port 8080) — Jinja2 + static
        │   ├── Dockerfile
        │   ├── docker-compose.yml
        │   ├── example.env
        │   ├── requirements.txt
        │   └── app/
        │       ├── app.py                 # FastAPI root
        │       ├── agenda_loader.py       # parses ../../../../agenda.md
        │       ├── config.py              # customer name, product focus, theme
        │       ├── templates/
        │       │   ├── base.html
        │       │   └── home.html
        │       ├── static/{css,js,images}/
        │       └── sections/
        │           ├── __init__.py        # auto-discovery
        │           └── <slug>/            # one per agenda item
        │               ├── __init__.py    # router, MENU_TITLE, MENU_ICON
        │               ├── router.py
        │               └── templates/index.html
        ├── chatService/          # optional (port 8081)
        ├── searchService/        # optional (port 8082)
        ├── workflowService/      # optional (port 8083)
        ├── docAnalysisService/   # optional (port 8084)
        └── evalService/          # optional (port 8085)
```

> The folder names under `sections/` are **examples** generated from the current `agenda.md`.
> Re-running the skill with a different `agenda.md` MUST produce a different set of section
> folders — the agenda is the contract, not the code.

---

## Web app contracts

### `app/config.py` — single source of truth

```python
from dataclasses import dataclass
import os

@dataclass(frozen=True)
class WorkshopConfig:
    customer_name: str  = os.getenv("WORKSHOP_CUSTOMER", "{{CUSTOMER_NAME}}")
    product_focus: str  = os.getenv("WORKSHOP_PRODUCT", "{{PRODUCT_FOCUS}}")
    theme: str          = os.getenv("WORKSHOP_THEME",   "{{THEME_NAME}}")
    logo_path: str      = "/static/images/logo.svg"
    accent_icon: str    = "fa-solid fa-bolt"  # Font Awesome 6 class

CONFIG = WorkshopConfig()
```

### `app/agenda_loader.py` — re-reads `agenda.md` at startup

```python
import re
from dataclasses import dataclass
from pathlib import Path
from typing import List

AGENDA_FILE = Path(__file__).resolve().parents[3] / "agenda.md"
BULLET_RE = re.compile(r"^\s*[-*]\s*(?P<title>[^:]+?)\s*:\s*(?P<desc>.+?)\s*$")

@dataclass(frozen=True)
class AgendaItem:
    title: str
    description: str
    slug: str

def _slugify(text: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "_", text.lower()).strip("_")
    return s or "section"

def load_agenda(path: Path = AGENDA_FILE) -> List[AgendaItem]:
    items: List[AgendaItem] = []
    if not path.exists():
        return items
    in_block = False
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip().startswith("###") and "Workshop App" in line:
            in_block = True
            continue
        if in_block and line.strip().startswith("###"):
            break
        m = BULLET_RE.match(line)
        if in_block and m:
            title = m.group("title").strip().strip('"').strip("“”")
            desc  = m.group("desc").strip()
            items.append(AgendaItem(title=title, description=desc, slug=_slugify(title)))
    return items
```

### `app/sections/__init__.py` — auto-discovery

```python
import importlib, pkgutil
from fastapi import APIRouter

def collect_routers() -> list[tuple[str, APIRouter, str, str]]:
    """Returns (slug, router, menu_title, menu_icon) for every section package."""
    found = []
    for mod in pkgutil.iter_modules(__path__):
        pkg = importlib.import_module(f"{__name__}.{mod.name}")
        router = getattr(pkg, "router", None)
        if router is None:
            continue
        found.append((
            mod.name,
            router,
            getattr(pkg, "MENU_TITLE", mod.name.replace("_", " ").title()),
            getattr(pkg, "MENU_ICON", "fa-solid fa-cube"),
        ))
    return found
```

### `app/app.py` — wiring

```python
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path

from .agenda_loader import load_agenda
from .sections import collect_routers
from .config import CONFIG

base = Path(__file__).parent
app = FastAPI(title=f"{CONFIG.customer_name} Workshop")
templates = Jinja2Templates(directory=str(base / "templates"))
app.mount("/static", StaticFiles(directory=str(base / "static")), name="static")

AGENDA   = load_agenda()
SECTIONS = collect_routers()

@app.middleware("http")
async def inject_context(request: Request, call_next):
    request.state.menu = [
        {"slug": slug, "title": title, "icon": icon, "url": f"/sections/{slug}"}
        for slug, _, title, icon in SECTIONS
    ]
    request.state.config = CONFIG
    return await call_next(request)

for _, router, _, _ in SECTIONS:
    app.include_router(router)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        "home.html",
        {"request": request, "agenda": AGENDA, "menu": request.state.menu, "config": CONFIG},
    )
```

### `app/templates/base.html` — sidebar driven by `request.state.menu`

```jinja
<!doctype html>
<html lang="en" data-theme="{{ config.theme }}">
<head>
  <meta charset="utf-8">
  <title>{% block title %}{{ config.customer_name }} Workshop{% endblock %}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="/static/css/styles.css">
</head>
<body>
  <aside class="sidebar">
    <div class="sidebar-header">
      <i class="{{ config.accent_icon }}"></i>
      <span>{{ config.customer_name }}</span>
    </div>
    <nav class="sidebar-menu">
      {% for item in request.state.menu %}
        <a class="menu-item" href="{{ item.url }}">
          <i class="{{ item.icon }}"></i>
          <span>{{ item.title }}</span>
        </a>
      {% endfor %}
    </nav>
    <div class="sidebar-footer">
      <span class="status-dot"></span> <small>{{ config.product_focus }}</small>
    </div>
  </aside>
  <main class="main-area">
    {% block content %}{% endblock %}
  </main>
</body>
</html>
```

> **Important:** Do not bake the agenda items into `base.html`, `home.html`, or any Python
> constant. The menu MUST come from `agenda_loader.load_agenda()` at runtime so editing
> `agenda.md` updates the app without code changes.

---

## Section sub-app template

Each item parsed from `agenda.md` becomes a self-contained sub-app inside
`src/app/webApp/app/sections/<slug>/`.

### Slug rule

`slug = lowercase(title)` with non-alphanumeric runs collapsed to `_` and trimmed. Examples:

| Agenda title | Folder slug |
|---|---|
| Coverage Lookup | `coverage_lookup` |
| Claim Status | `claim_status` |
| Provider Search | `provider_search` |
| EOB Document Extraction | `eob_document_extraction` |
| Evaluation Scorecard | `evaluation_scorecard` |
| Roadmap & Next Steps | `roadmap_next_steps` |

### `sections/<slug>/__init__.py`

```python
from .router import router

MENU_TITLE = "<exact agenda title>"
MENU_ICON  = "fa-solid fa-diagram-project"   # pick from Font Awesome 6
__all__ = ["router", "MENU_TITLE", "MENU_ICON"]
```

### `sections/<slug>/router.py`

```python
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pathlib import Path

router = APIRouter(prefix="/sections/<slug>", tags=["<menu title>"])
templates = Jinja2Templates(directory=str(Path(__file__).parent / "templates"))

SECTION = {
    "title": "<agenda title>",
    "description": "<agenda description>",
}

@router.get("", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "section": SECTION, "config": request.state.config},
    )
```

### Per-section content contract (every section page MUST include)

1. **Customer context** — why this matters for {{CUSTOMER_NAME}}.
2. **Learning objective** — one sentence.
3. **Requirement mapping** — which customer requirement(s) this section addresses.
4. **Concept explanation** — short prose + Mermaid diagram when relevant.
5. **Architecture diagram** (Mermaid) — block-level, no real product names hard-coded.
6. **Interactive demo** (mocked by default) — chat / search / workflow / doc-analysis / eval.
7. **Presenter notes** — script the CSA reads while clicking.
8. **Success criteria** — what "good" looks like at the end of this section.
9. **Fallback** — what to show / say if the demo or backend fails.

---

## Microservice template (optional services)

Add a microservice only when the scenario demands it. Each follows the same shape.

### `Dockerfile` (identical for every Python microservice — only the port changes)

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "<PORT>"]
```

### `docker-compose.yml`

```yaml
services:
  <service-name>:
    build: .
    ports:
      - "<PORT>:<PORT>"
    env_file: .env
```

### `app/app.py` (microservice skeleton)

```python
from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
from typing import Optional
import os, secrets, logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

API_KEY = os.getenv("API_KEY")
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

async def verify_api_key(api_key: str = Security(api_key_header)):
    if not API_KEY:
        return None  # dev fallback
    if not api_key:
        raise HTTPException(status_code=401, detail="API key is missing")
    if not secrets.compare_digest(api_key, API_KEY):
        raise HTTPException(status_code=403, detail="Invalid API key")
    return api_key

app = FastAPI(
    title="<Service> API",
    description="{{CUSTOMER_NAME}} workshop microservice",
    dependencies=[Depends(verify_api_key)],
)

class ChatRequest(BaseModel):
    message: str
    thread_id: Optional[str] = None

@app.post("/chat", tags=["Chat"])
async def chat(req: ChatRequest):
    # Mock by default; replace with Azure AI Foundry call when env is configured.
    return {"thread_id": req.thread_id or "demo-thread", "response": f"(mock) you said: {req.message}"}
```

### Inter-service env conventions

```env
# webApp/example.env
CHAT_API_URL=http://host.docker.internal:8081
CHAT_API_KEY=<your-chat-api-key>
SEARCH_API_URL=http://host.docker.internal:8082
SEARCH_API_KEY=<your-search-api-key>
WORKFLOW_API_URL=http://host.docker.internal:8083
WORKFLOW_API_KEY=<your-workflow-api-key>
DOCANALYSIS_API_URL=http://host.docker.internal:8084
DOCANALYSIS_API_KEY=<your-docanalysis-api-key>
EVAL_API_URL=http://host.docker.internal:8085
EVAL_API_KEY=<your-eval-api-key>
```

---

## Design system & color schemes

All front-ends share a single CSS-variable contract so themes are swappable per workshop. Drop the
chosen palette block at the top of `static/css/styles.css`, then keep every downstream rule
referencing `var(--*)`.

### Required typography & icon stack

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### Variable contract (always present)

```css
:root {
  /* brand */
  --primary-color:    <hex>;
  --primary-hover:    <hex>;
  --primary-light:    <rgba>;
  --primary-gradient: linear-gradient(135deg, <hex> 0%, <hex> 100%);
  --secondary-color:  <hex>;
  --accent-color:     <hex>;

  /* surfaces */
  --background-dark:    <hex>;
  --background-main:    <hex>;
  --background-light:   <hex>;
  --background-lighter: <hex>;

  /* text */
  --text-primary:   <hex>;
  --text-secondary: <hex>;
  --text-muted:     <hex>;
  --border-color:   <rgba>;

  /* glass */
  --glass-bg:        <rgba>;
  --glass-bg-strong: <rgba>;
  --glass-border:    <rgba>;
  --glass-shadow:    0 18px 60px <rgba>;
  --glass-blur:      18px;

  /* page bg (radial spotlights + gradient) */
  --page-bg: <gradient>;

  /* shape & motion */
  --radius-sm: 12px;  --radius-md: 16px;  --radius-lg: 20px;  --radius-xl: 28px;
  --shadow-sm: 0 2px 4px  <rgba>;
  --shadow-md: 0 4px 14px <rgba>;
  --shadow-lg: 0 10px 40px <rgba>;
  --transition-fast:   0.15s ease;
  --transition-normal: 0.30s ease;
  --transition-smooth: 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

### Predefined palettes — pick one per workshop

#### 1. Foundry Violet — *AI / agent / Foundry-centric (DEFAULT — dark neon glow)*

Dark, near-black surfaces with a luminous violet → magenta border glow. Inspired by the Microsoft
Foundry "widest selection of models" panel.

```css
:root {
  --primary-color:    #a855f7;
  --primary-hover:    #c084fc;
  --primary-light:    rgba(168, 85, 247, 0.18);
  --primary-gradient: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  --secondary-color:  #8b5cf6;
  --accent-color:     #ec4899;

  --background-dark:    #050309;
  --background-main:    #080514;
  --background-light:   #100920;
  --background-lighter: #180f30;
  --border-color:       rgba(168, 85, 247, 0.22);

  --text-primary:   #f5f3ff;
  --text-secondary: #c4b5fd;
  --text-muted:     #7c6aa8;

  --glass-bg:        rgba(26, 16, 48, 0.55);
  --glass-bg-strong: rgba(26, 16, 48, 0.78);
  --glass-border:    rgba(168, 85, 247, 0.35);
  --glass-shadow:    0 0 0 1px rgba(168,85,247,0.45),
                     0 18px 60px rgba(168,85,247,0.28),
                     0 0 80px rgba(236, 72, 153, 0.18);

  --page-bg: radial-gradient(1200px 800px at 15% 5%,  rgba(168, 85, 247, 0.22), transparent 60%),
             radial-gradient(1000px 700px at 90% 25%, rgba(236,  72, 153, 0.14), transparent 55%),
             radial-gradient(900px  900px at 50% 110%, rgba(124, 58, 237, 0.18), transparent 60%),
             linear-gradient(180deg, #050309 0%, #080518 60%, #050309 115%);

  --shadow-sm: 0 2px 4px  rgba(0, 0, 0, 0.40);
  --shadow-md: 0 4px 14px rgba(168, 85, 247, 0.30);
  --shadow-lg: 0 10px 40px rgba(168, 85, 247, 0.40);
}

/* Glowing border for the "active" card */
.card--active,
.menu-item--selected,
.quick-action:hover {
  background: var(--background-light);
  border: 1px solid var(--glass-border);
  box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.55),
              0 0 24px rgba(168, 85, 247, 0.35),
              0 0 60px rgba(236,  72, 153, 0.20);
}
```

#### 2. Northwind Teal — *healthcare, member services, regulated industries*

Trustworthy deep teal with a warm coral accent. Good for health plans and patient-facing copilots.

```css
:root {
  --primary-color:    #0e7c86;
  --primary-hover:    #0a5d65;
  --primary-light:    rgba(14, 124, 134, 0.12);
  --primary-gradient: linear-gradient(135deg, #0e7c86 0%, #14b8a6 100%);
  --secondary-color:  #14b8a6;
  --accent-color:     #f97316;

  --background-dark:    #06222a;
  --background-main:    #0a2f38;
  --background-light:   #103e48;
  --background-lighter: #154c58;
  --border-color:       rgba(20, 184, 166, 0.22);

  --text-primary:   #ecfeff;
  --text-secondary: #a5f3fc;
  --text-muted:     #67a3ad;

  --glass-bg:        rgba(10, 47, 56, 0.60);
  --glass-bg-strong: rgba(10, 47, 56, 0.85);
  --glass-border:    rgba(20, 184, 166, 0.30);
  --glass-shadow:    0 0 0 1px rgba(20,184,166,0.35),
                     0 18px 60px rgba(14,124,134,0.30);

  --page-bg: radial-gradient(1100px 760px at 10% 0%,  rgba(20, 184, 166, 0.22), transparent 60%),
             radial-gradient(900px 700px at 95% 25%,  rgba(249, 115, 22, 0.12), transparent 55%),
             linear-gradient(180deg, #06222a 0%, #0a2f38 60%, #06222a 115%);

  --shadow-md: 0 4px 14px rgba(14, 124, 134, 0.30);
  --shadow-lg: 0 10px 40px rgba(14, 124, 134, 0.40);
}
```

#### 3. Fabric Indigo — *data platform, analytics, Microsoft Fabric workshops*

```css
:root {
  --primary-color:    #4f46e5;
  --primary-hover:    #4338ca;
  --primary-light:    rgba(79, 70, 229, 0.12);
  --primary-gradient: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  --secondary-color:  #6366f1;
  --accent-color:     #22d3ee;

  --background-dark:    #0b1024;
  --background-main:    #111634;
  --background-light:   #1a2150;
  --background-lighter: #232b66;
  --border-color:       rgba(99, 102, 241, 0.24);

  --text-primary:   #eef2ff;
  --text-secondary: #c7d2fe;
  --text-muted:     #7783b8;

  --glass-border:    rgba(99, 102, 241, 0.30);
  --glass-shadow:    0 18px 60px rgba(79, 70, 229, 0.30);
}
```

#### 4. Azure Blue — *Microsoft / Azure-centric enterprise sessions (light)*

```css
:root {
  --primary-color:    #0078d4;
  --primary-hover:    #106ebe;
  --primary-light:    rgba(0, 120, 212, 0.10);
  --primary-gradient: linear-gradient(135deg, #0078d4 0%, #50b0ff 100%);
  --secondary-color:  #2b88d8;
  --accent-color:     #50b0ff;

  --background-dark:    #f0f6fc;
  --background-main:    #ffffff;
  --background-light:   #f5f9fd;
  --background-lighter: #e6f1fb;
  --border-color:       #d0e3f5;

  --text-primary:   #1f2933;
  --text-secondary: #52606d;
  --text-muted:     #9aa5b1;

  --glass-bg:        rgba(255, 255, 255, 0.70);
  --glass-bg-strong: rgba(255, 255, 255, 0.92);
  --glass-border:    rgba(0, 120, 212, 0.18);
  --shadow-md: 0 4px 12px rgba(0, 120, 212, 0.15);
}
```

#### 5. Citrus Orange — *retail, marketplace, food*

```css
:root {
  --primary-color:    #ff6b35;
  --primary-hover:    #e55a2b;
  --primary-light:    rgba(255, 107, 53, 0.10);
  --primary-gradient: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  --secondary-color:  #ff9f1c;
  --accent-color:     #ffbf69;
  --background-dark:    #fff5f0;
  --background-main:    #ffffff;
  --background-light:   #fef7f3;
  --background-lighter: #fff0e8;
  --border-color:       #ffe4d6;
}
```

### Component conventions (apply across all front-ends)

- **Layout** = left **sidebar** (logo, menu, status footer) + **main area** (section header → body).
- **Header titles** use gradient text: `background: linear-gradient(135deg, var(--text-primary), var(--primary-color))` + `-webkit-background-clip: text`.
- **Welcome screen** = hero icon, headline, sub-copy, then 3–4 **quick-action buttons** (2×2 grid) that trigger demo flows.
- **Messages / cards** = `var(--glass-bg)` + `backdrop-filter: blur(var(--glass-blur))` + `border: 1px solid var(--glass-border)` + `box-shadow: var(--glass-shadow)` + `border-radius: var(--radius-xl)`.
- **Status indicator** = 8px dot with pulse animation (1s opacity 1 ↔ 0.5).
- **Buttons**: primary = solid `var(--primary-color)` + hover `translateY(-1px)` + `var(--shadow-md)`. Secondary = `var(--background-light)`.
- **Mermaid diagrams** = inline `<pre class="mermaid">…</pre>` rendered client-side; theme follows `data-theme` on `<html>`.

### Accessibility & motion

- Maintain **WCAG AA** contrast on text vs. surface.
- Respect reduced motion: `@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }`.
- All interactive controls need a visible `:focus-visible` ring using `var(--primary-color)` + `0 0 0 3px var(--primary-light)`.

---

## Workflow (Copilot, follow these steps in order)

1. **Confirm scope** with the user:
   - Customer name, product focus, target folder.
   - Which optional microservices to scaffold (default: none — all demos mocked in `webApp`).
   - Palette (default: `foundry-violet`; for {{CUSTOMER_NAME}} use `{{THEME_NAME}}`).
2. **Read `agenda.md`** from the project root. Parse every bullet under
   `### Data to be used by SKILL.md to create the Workshop App` into an ordered list of
   `(title, description)` pairs. If the file is missing, **stop and ask** — do not invent items.
3. **Scaffold the layout** in [Standard project layout](#standard-project-layout). Create
   `src/app/webApp/app/sections/<slug>/` for every parsed agenda item, plus any optional
   microservices the user requested.
4. **Generate the front-end** using the contracts in [Web app contracts](#web-app-contracts) and
   the chosen palette from [Design system](#design-system--color-schemes).
5. **Seed each section sub-app** from its agenda title + description, using the
   [Per-section content contract](#per-section-content-contract-every-section-page-must-include).
6. **Generate `example.env`** for every service. Use `host.docker.internal` for inter-service URLs.
7. **Generate a top-level `README.md`** with a **Quick Start** that boots the stack:
   ```bash
   cd src/app/webApp && cp example.env .env && docker compose up --build
   # open http://localhost:8080
   ```
8. **Validate**:
   - Each `Dockerfile` references its own port.
   - Every `app.py` exposes `app = FastAPI(...)` (uvicorn target).
   - The number of folders under `webApp/app/sections/` equals the number of bullets parsed from
     `agenda.md`.
   - Every parsed agenda title appears in the rendered sidebar of `/`.
   - No real secrets committed; only `example.env` files exist.
9. **Run the smoke test**: `docker compose up --build` boots cleanly, `/` renders the sidebar
   with N items, and each `/sections/<slug>` returns 200.

---

## Anti-patterns (never do this)

- ❌ Hard-coding the agenda items in `base.html`, `home.html`, or Python constants.
- ❌ Embedding the customer name as a string literal in templates (use `config.customer_name`).
- ❌ Calling real Azure SDKs without an env-gated fallback to mock data.
- ❌ Shipping a real `.env` file.
- ❌ Adding a frontend framework (React, Vue, Svelte) — vanilla JS only.
- ❌ Sharing a single `Dockerfile` across services.
- ❌ Using container names (e.g., `chat-service:8081`) instead of `host.docker.internal`.
- ❌ Skipping the per-section content contract (every section MUST have all 9 elements).

---

## Non-goals

- No real customer PII.
- No real secrets in the repo. `example.env` only.
- No production hardening (auth, multi-tenant, rate limiting, HA).
- No frontend framework.
- No automatic Azure resource provisioning.

---

## Reusability rules

- Customer name, product focus, and theme live in **one** file (`app/config.py`) + can be
  overridden via env vars (`WORKSHOP_CUSTOMER`, `WORKSHOP_PRODUCT`, `WORKSHOP_THEME`).
- Templates **never** hard-code customer or product names.
- New sections require editing **only** `agenda.md` and adding a `sections/<slug>/` folder.
- Switching customers = swap `customer-scenario.md` + `agenda.md` + palette block + logo. No code
  changes elsewhere.
