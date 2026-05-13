# Customer scenario — Northwind Health "MemberAssist"

## Customer

**Northwind Health** (fictional). A mid-sized US regional health plan
serving ~1.2M members across employer-sponsored and individual products.

## Engagement context

Member-services call centre handles ~22k calls/week. Top three drivers:
benefits-coverage questions (38%), claim-status questions (29%), provider
search (14%). Average handle time 7m12s. First-call resolution 64%.

The Northwind innovation team has approved a 90-day pilot of a "member
copilot" that augments call-centre agents and (later) self-service. The
workshop is the kickoff — the goal is to align member-services, claims
operations, plan architects, and compliance on what *MemberAssist* will and
will not do, and to socialize a credible architecture.

## Audience

| Persona | Name (fictional) | What they care about |
|---|---|---|
| VP Member Services | Rosa Aoyama | Reducing handle time and complaint volume without inflating QA cost. |
| Director, Claims Ops | Marcus Boateng | Claim-status answers that match the source-of-truth adjudication system. |
| Principal Plan Architect | Hana Whitlock | Architecture that does not lock the plan into one vendor. |
| Compliance Officer | Daniel Erskine | PHI safeguarding, auditability, fallback to human, and traceable evaluations. |

## Requirements (vendor-neutral, testable)

| ID | Requirement |
|---|---|
| R1 | Answer benefits questions grounded in current plan documents with inline citations to the document and section. |
| R2 | Return a ranked provider-directory result given member location, specialty, and in-network status; show why each provider was ranked. |
| R3 | Resolve claim-status questions with a visual timeline (received → adjudicated → paid → notified) and show the source system and last-updated timestamp. |
| R4 | Extract structured fields from an Explanation-of-Benefits (EOB) PDF and explain each charge in plain English. |
| R5 | Score every response on groundedness, harm, and **PHI leakage**; expose a dashboard the compliance team can audit. |
| R6 | Hand off to a human agent on low-confidence answers, with the full conversation trace pre-loaded. |

## Success criteria (observable in the room)

1. Each persona can name *which demo* covers *which requirement* without a cheat sheet.
2. Compliance can articulate the PHI safeguards in their own words.
3. Architecture team agrees the design is not vendor-locked.
4. Member-services VP commits to a 30-day pilot with two named call-centre agents.
5. The roadmap slide gets at least one concrete edit from the room (proves engagement).

## Constraints

- No real PHI in the workshop environment. All data is synthetic.
- The demos must run **offline** during the executive read-out (hotel Wi-Fi rule).
- The presented architecture must include an explicit "human always wins" override.

## Out of scope (intentionally)

- Provider contracting workflow.
- Member enrollment and eligibility changes.
- Anything written back to the claims system. Read-only for v1.
