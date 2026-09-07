# Domain Docs

This repo uses a single-context layout. The application is under `site/`; domain documentation belongs at the repo root.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root: domain terms and their meanings.
- **`docs/adr/`** at the repo root: read ADRs that touch the area you are about to work in.

If these files do not exist, **proceed silently**. Do not flag their absence or suggest creating them upfront. The `/domain-modeling` skill creates them lazily when terms or decisions are resolved.

## File structure

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       └── NNNN-decision-title.md
└── site/
```

## Use the glossary's vocabulary

When naming a domain concept in an issue title, refactor proposal, hypothesis, or test name, use the term defined in `CONTEXT.md`. Respect the glossary's preferred terms.

If a concept is missing, reconsider whether the project uses it or note a real gap for `/domain-modeling`.

## Flag ADR conflicts

If a proposal contradicts an existing ADR, identify the ADR and explain why reopening the decision may be warranted.
