# Presenter notes — Northwind MemberAssist

One block per agenda item. Read these the morning of, not the night before.

## 1. Welcome and engagement framing

- Name the four personas in the room out loud. Use the names from
  `customer-scenario.md` even if their understudies are present.
- Drop the call-centre numbers (22k calls/week, 7m12s AHT, 64% FCR) in
  the *first* slide. Those numbers are the entire reason the day exists.
- Explicitly say what today is *not*: not a vendor pitch, not a buying
  decision, not a security review.

## 2. Member journeys today

- Walk three real (anonymized) call types. Pick one benefits, one
  provider search, one claim status. Start each with the member's
  literal opening sentence.
- Park the architecture conversation. If Hana raises it here, say
  "Architecture lives in section 6 — let's hold it."

## 3. The MemberAssist concept

- Four pillars, one slide each: **grounding · citations · human-in-the-
  loop · PHI promise**. Do not add a fifth.
- Land the PHI promise hard. Compliance is listening for it.

## 4. Demo 1 — Benefits chat

- Use the colonoscopy example from `data/chat.json`. It has the
  age-trigger nuance and a follow-up that exposes the diagnostic
  conversion.
- After the second turn, click into the citations *before* anyone asks.
- Then run the failure case ("how much will my surgery cost"). The
  handoff is the point.

## 5. Demo 2 — Provider search

- Pre-set the query to Endocrinology / 30308 / 10 mi / in-network.
- Hover the ranking-signals card on Dr. Ranganathan. Say each signal out
  loud: "distance 0.96, in-network 1.0, specialty match 1.0…"
- Toggle "include established-only" to surface Dr. Sullivan and explain
  the exclusion rule. Compliance likes this.

## 6. Demo 3 — Claim status

- See `sections/demo-3-claim-status.md` for the full presenter block.

## 7. Demo 4 — EOB document analysis

- Drag in `EOB_NW-CLM-2025-0418-77321.pdf`. The extracted-fields panel
  must populate within 2 seconds — if it doesn't, you skipped the warm
  cache step. Restart and re-warm.
- Read the plain-English bullets verbatim. They are written for member
  literacy, not yours.
- Then drag in `EOB_legacy_2019_scan.pdf` for the failure path. Show the
  fallback-to-human message.

## 8. Demo 5 — Evaluation dashboard

- Open with the **PHI-leak gauge**. Yes, it is in warn state. That is
  the point — the dashboard catches drift.
- Walk EVAL-INC-2025-031 end-to-end: incident → cause (new EOB template)
  → mitigation (allow-list + retrain). Compliance audits this exact
  flow.
- Do not promise the gauge will be green by next week. Promise the
  *process* that catches the next one.

## 9. Roadmap and next steps

- Whiteboard, not slides. 30/60/90 columns.
- One commitment from each persona, with a name and a date.
- Print the board, photograph it, attach to the engagement notes before
  you leave the room.
