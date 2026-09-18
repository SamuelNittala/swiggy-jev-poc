# Domain docs

This repository uses a single-context layout.

## Before exploring

- Read root `CONTEXT.md` if it exists.
- Read relevant architectural decision records in `docs/adr/`.

If these files do not exist, proceed without flagging their absence.
Create them only when terminology or decisions are actually resolved,
using the domain-modeling skill.

## Vocabulary

Use domain terms as defined in `CONTEXT.md` when writing issues,
tests, documentation, and proposals. Avoid conflicting synonyms.

If a needed concept is missing, reconsider the terminology or note
the gap for domain modeling.

## Architectural decisions

Respect existing ADRs. If a proposal conflicts with one, name the
conflict explicitly rather than silently overriding the decision.

## Layout

- `CONTEXT.md`: domain glossary, not implementation details.
- `docs/adr/`: numbered architectural decision records.
