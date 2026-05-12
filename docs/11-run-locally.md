# 10. Run locally with Docker Compose

## Goal

Run the generated workshop app on a CSA's laptop in a single command.

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

## Common issues

!!! warning "Port already in use"
    Change the host port mapping in `docker-compose.yml`
    (e.g., `8081:8080`).

!!! tip "Rehearse offline"
    Disable Wi-Fi for one full rehearsal. If the demo breaks, your fallbacks
    aren't strong enough.

## Next step

Continue to **[11. Publish with GitHub Pages](12-publish-github-pages.md)**.
