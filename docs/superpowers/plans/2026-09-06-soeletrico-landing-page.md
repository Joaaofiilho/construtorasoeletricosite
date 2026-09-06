# Soelétrico Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking. Site source stays under the ownership of the main agent; only photo research is delegated.

**Goal:** Deliver the approved editorial landing page with a real scroll-built 3D house and direct contact links.

**Architecture:** Statically rendered React page using the Sites Vinext starter and TypeScript. Keep commercial content separate from the procedural Three.js scene and client-side scroll effects. No backend, database, or public deployment in this iteration.

**Tech Stack:** Generated Vinext/React/Vite stack, TypeScript, CSS, Three.js, Node test runner. Preserve scaffold lockfile and packages; add only Three.js/types and image/font processing needed for the requested assets.

**Spec:** `docs/superpowers/specs/2026-09-06-soeletrico-landing-page-design.md` (user approved on 2026-09-06).

## Global Constraints

- Nome apresentado: **Soelétrico**.
- Região atendida: Trairi, Ceará, e região.
- WhatsApp: **(85) 99935-0248**, endereço `https://wa.me/5585999350248`.
- E-mail: **soeletrico@gmail.com**, endereço `mailto:soeletrico@gmail.com`.
- Serviços: construção de casas, obras comerciais e galpões, a partir de um projeto que o cliente já possui.
- Experiência de João Sabiá: mais de 15 anos. Não atribuir esse tempo à idade da empresa.
- Cada fotografia provisória: “Imagem ilustrativa — não representa obra executada pela Soelétrico.”
- Casa conceitual real em 3D, progressiva e reversível, sem sobrepor contatos ou texto.
- Manter rolagem nativa, conteúdo legível sem JavaScript, movimento reduzido e alternativa estática sem WebGL.
- A definição de domínio e a publicação pública são uma etapa posterior.

## Files and responsibilities

- `site/app/page.tsx`: server-rendered semantic sections and contact links.
- `site/app/layout.tsx`: Portuguese metadata, typography, stylesheet.
- `site/app/globals.css`: brand tokens, editorial responsive layout, reveal states.
- `site/lib/content.ts`: copy, contacts, provisional image metadata.
- `site/lib/build-progress.ts`: pure normalization and construction stages.
- `site/components/experience.tsx`: client lifecycle, section reveals, scroll and resize observers.
- `site/components/house/model.ts`: procedural groups and materials, no DOM.
- `site/components/house/scene.ts`: camera, renderer, stage transforms, resize and disposal.
- `site/public/images/`: optimized licensed photo variants and a still rendered from the actual model.
- `site/tests/build-progress.test.ts`: behavioral boundary tests.
- `site/scripts/`: repeatable source-photo processing and browser checks.
- `README.md`, `site/public/images/SOURCES.md`: run/replacement instructions and asset provenance.

### Task 1: Editorial page and licensed imagery

**Interfaces:** `content.ts` exports `contact: { whatsapp: string; email: string }`, `photos` entries with `src`, `srcSet`, `alt`, `caption`, `width`, `height`. `page.tsx` renders stable IDs `inicio`, `servicos`, `sobre`, `projeto`, `contato`.

- [x] Preserve scaffold under `site/` (root contains the approved documentation) and install dependencies. Set static export in `next.config.ts` and `static.directory` to `dist/client`.
- [x] Replace starter metadata/theme and implement the first coherent hero. Use sand `#f3f2ed`, graphite `#252921`, lime `#c8f45d`; large editorial titles, photography and an independently reserved right rail. Show local preview after the route compiles.
- [x] Integrate verified photo downloads using responsive WebP widths 768, 1536 and 2560, preserving a >=3840px source outside delivered page weight. Record license/author/source URLs. Never label reference photos as Soelétrico work.
- [x] Complete service rows, experience/accompaniment section, clearly illustrative project reference gallery, contact and footer. Use real native links:

```tsx
<a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">Converse sobre sua obra</a>
<a href={`mailto:${contact.email}`}>{contact.email}</a>
```

- [x] Check native link destinations and readable server output. No unit tests for static copy/CSS; validate these visually with the approved browser inspection.
- [x] Commit the coherent page and licensed assets.

### Task 2: Scroll construction and progressive enhancement

**Interfaces:** `scrollProgress(scrollY, scrollHeight, viewportHeight, completionY?): number` returns 0–1 and completes by final contact. `constructionState(progress): { stage: number; phases: number[] }` returns five normalized phases. `createHouseModel(): { root: Group; stages: Group[]; dispose(): void }`. `createHouseScene(container, onFailure): { update(progress): void; dispose(): void }` owns GPU lifecycle. `Experience` renders the reserved house panel and enables effects after mounting.

- [x] Write failing real boundary tests with Node `test`/`assert`: overscroll clamps, no-scroll page returns 1, end contact reaches 1, halfway progress remains intermediate, returning to top resets later stages. Hand-derived examples:

```ts
assert.equal(scrollProgress(-10, 3000, 1000), 0);
assert.equal(scrollProgress(1000, 3000, 1000), 0.5);
assert.equal(scrollProgress(3000, 3000, 1000), 1);
assert.equal(scrollProgress(0, 800, 1000), 1);
assert.deepEqual(constructionState(0).phases, [0, 0, 0, 0, 0]);
assert.deepEqual(constructionState(1).phases, [1, 1, 1, 1, 1]);
```

- [x] Run `node --experimental-strip-types --test tests/build-progress.test.ts` and verify missing behavior fails. Implement the pure functions with clamped fractions and phase thresholds; rerun to pass.
- [x] Build contemporary model using foundation, columns/walls, flat roof, dark-framed glazing/wood accents, final landscape/pool. Group by phase. Use orthographic camera, soft shadows, muted materials, no continuous rotation.
- [x] Render on progress changes only, cap device-pixel ratio at 1.6, resize with `ResizeObserver`, clean up materials/geometries/events. Async-load Three.js; abort integration on unmount and catch initialization failure/context loss.
- [x] Add one scroll listener scheduled through requestAnimationFrame and native IntersectionObserver reveals. Stop/cancel animation for reduced motion, unload failures fall back to the still. Recalculate on content resizing. Keep HTML visible before effects initialize.
- [x] Produce a static PNG from the actual complete scene for no-WebGL/reduced-motion/no-JS use. Place miniature in desktop rail and dedicated compact mobile dock with reserved space and final-contact scroll margins.
- [x] Run progress tests and commit the interactive experience.

### Task 3: QA and handoff

**Interfaces:** `npm run build` produces static `site/dist/client`; `npm run dev -- --host 0.0.0.0` provides local preview. README gives exact commands.

- [x] Run TypeScript, production build and focused tests; fix actual failures before proceeding.
- [x] Inspect the local page in the browser at desktop and 360px mobile width. Scroll start/middle/end/reverse and confirm distinct house stages, final completed house, native anchor behavior and no horizontal overflow/covered CTA.
- [x] Check reduced motion, WebGL unavailable, JavaScript disabled, all native contacts and images, keyboard focus. Capture evidence screenshots locally; inspect them and correct layout issues.
- [x] Document image provenance and how to replace illustrations with real project photos. Record commands and actual verification outcomes in README.
- [x] Review implementation against every spec requirement, run fresh final checks for any fixes, commit validated source and hand off the same live local preview. Keep the preview available for user review.

## Self-review

The three tasks cover all agreed sections, contact actions, visual direction, five 3D phases, mobile/fallback behavior, image disclosure/provenance, metadata and delivery. No external publication or additional product functionality is included. The static fallback is rendered from the 3D scene to keep both versions consistent. Browser QA is part of the user-approved specification.

## Resultado da execução — 06/09/2026

Implementação concluída em `site/`. A exportação estática passou nos mesmos testes de navegador que a versão de desenvolvimento. `npm test`: 4 testes aprovados; `typecheck`, `lint` e `build`: aprovados. QA em 1440×1000, 900×1000, 360×800 e 844×390; âncoras, contatos, fotos, progresso e reversão, leitura sem JavaScript, movimento reduzido, WebGL ausente, perda do contexto e rotação preservando o trecho de leitura. Revisão independente encontrou dois casos de rotação/paisagem, ambos corrigidos e cobertos por regressões.

Originais fotográficos acima de 4K e licenças estão preservados. A prévia permanece local, sem publicação. Os avisos de dependências herdadas do gerador e do tamanho do módulo Three.js estão registrados no README.
