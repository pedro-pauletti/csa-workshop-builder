# 7. Run Northwind locally

## Goal

Run the Northwind MemberAssist app generated in module 6 on the CSA's laptop in
a single command. After this module, `http://localhost:8080` shows the same six
sections rendered in the [live demo](../demo/).

## Why it matters

Local-first means: no shared environments to break, no Azure subscription
required to rehearse, full demo control on customer Wi-Fi (or no Wi-Fi).

## Inputs

- Docker Desktop installed.
- Generated app with `Dockerfile` and `docker-compose.yml` (from Module 6).

## Step-by-step (Python directly)

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/macOS
# source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.app:app --reload --host 0.0.0.0 --port 8080
```

Open <http://localhost:8080>.

## Step-by-step (Docker Compose)

```bash
cp example.env .env   # do not commit .env
docker compose up --build
```

Open <http://localhost:8080>.

## Copilot prompt

```text
Audit the generated docker-compose.yml and Dockerfile.

Check:
- Multi-stage build for smaller image
- Non-root user
- Healthcheck on the FastAPI app
- Hot reload disabled in production stage
- example.env is committed; .env is gitignored
- No secrets baked into the image

Return: a diff with corrections.
```

## Validation checklist

- [ ] `docker compose up --build` works on a clean clone.
- [ ] App reachable on `http://localhost:8080`.
- [ ] No `.env` committed.
- [ ] Healthcheck returns OK.
- [ ] Logs are readable and not too noisy.

## Expected console output

A healthy first run looks like this:

```text
[+] Building 12.4s (14/14) FINISHED
[+] Running 1/1
 ✔ Container webapp  Created
Attaching to webapp
webapp  | INFO:     Started server process [1]
webapp  | INFO:     Waiting for application startup.
webapp  | INFO:     Loaded agenda.md (6 items)
webapp  | INFO:     Discovered 6 sections: ['coverage_lookup', 'claim_status',
webapp  |           'provider_search', 'eob_document_extraction',
webapp  |           'evaluation_scorecard', 'roadmap_next_steps']
webapp  | INFO:     Application startup complete.
webapp  | INFO:     Uvicorn running on http://0.0.0.0:8080
```

Two key signals: **agenda items match what you put in `agenda.md`**, and
**sections discovered match agenda items**. If those numbers diverge, you
have a slug-collision or a missing `__init__.py`.

## Verify with `/healthz`

```bash
curl -s http://localhost:8080/healthz
```

Expected response:

```json
{"status": "ok", "agenda_items": 6, "sections_loaded": 6}
```

If `sections_loaded < agenda_items`, the loader normalized two agenda
titles to the same slug or a section folder is missing its `router`
attribute. Check the `Discovered N sections:` line in the console.

## Advanced pattern — optional Application Insights

The reference architecture wires Application Insights only when you set
the connection string. No string → silent (great for local rehearsal).
String present → traces and metrics flow.

In `app.py`:

```python
import os
APPINSIGHTS = os.environ.get("APPINSIGHTS_CONNECTION_STRING")
if APPINSIGHTS:
    from azure.monitor.opentelemetry import configure_azure_monitor
    configure_azure_monitor(connection_string=APPINSIGHTS)
```

In `example.env`:

```text
# Leave blank for local rehearsal. Set in real Azure environments.
APPINSIGHTS_CONNECTION_STRING=
```

The same pattern applies to any optional integration: **unset → mock,
set → real**. No feature flags, no code paths to maintain.

## Common issues

!!! warning "Port already in use"
    Change the host port mapping in `docker-compose.yml`
    (e.g., `8081:8080`).

!!! tip "Rehearse offline"
    Disable Wi-Fi for one full rehearsal. If the demo breaks, your fallbacks
    aren't strong enough.

<div class="tips" markdown>
**Local-run tips**

- Run `docker compose build --no-cache` once a week. Stale base layers
  miss CVE patches and quietly drift from `requirements.txt`.
- Mount `agenda.md` as a volume in `docker-compose.yml` so you can
  hot-edit the sidebar during rehearsal without rebuilding.
- Disable Wi-Fi for the **final** rehearsal. Wi-Fi at customer sites
  blocks `localhost` more often than you'd expect (captive portals,
  proxy interception).
- Pin the host port to 8080 in your engagement repo even if you change
  it locally. The presenter deck has the URL hard-coded somewhere.
</div>

## Next step

Continue to **[8. Add explanatory sections](08-explanatory-sections.md)**.

<div class="module-step"><span class="pill">Module 7 of 12</span> Northwind app runs locally. Next: enrich the six sections with content.</div>
