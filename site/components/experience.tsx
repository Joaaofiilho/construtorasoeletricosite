'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Check } from 'lucide-react';
import { constructionState, scrollProgress } from '@/lib/build-progress';
import { Progress } from '@/components/ui/progress';

const labels = [
  'Fundação',
  'Estrutura e paredes',
  'Cobertura',
  'Esquadrias e acabamento',
  'Paisagismo e entrega',
];
const messages = [
  'Grandes histórias\ncomeçam pela base.',
  'Seu projeto começa\na ganhar forma.',
  'Proteção para\no que vem pela frente.',
  'O cuidado aparece\nem cada detalhe.',
  'Pronta para receber\nnovas histórias.',
];

type HouseScene = { update(progress: number): void; dispose(): void };

export function Experience() {
  const mount = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<'static' | 'live'>('static');
  const scene = useRef<HouseScene | null>(null);
  const progressRef = useRef(0);
  const { stage } = constructionState(progress);

  useEffect(() => {
    const shell = document.getElementById('page-scroll')!;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 800px)');
    let alive = true,
      frame = 0,
      generation = 0;
    let activeMobile = mobile.matches;
    const sections = [
      ...document.querySelectorAll<HTMLElement>('main section'),
    ];
    let readingSection: HTMLElement | undefined;
    let sectionFraction = 0;
    let atEnd = false;
    const revealElements = [
      ...document.querySelectorAll<HTMLElement>('.reveal'),
    ];
    let revealObserver: IntersectionObserver | undefined;
    const showAll = () =>
      revealElements.forEach((element) =>
        element.classList.remove('reveal-pending'),
      );
    const startReveals = () => {
      revealObserver?.disconnect();
      showAll();
      if (media.matches || !('IntersectionObserver' in window)) return;
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        {
          root: mobile.matches ? shell : null,
          threshold: 0.08,
          rootMargin: '0px 0px -20px 0px',
        },
      );
      revealElements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top > (mobile.matches ? shell.clientHeight : innerHeight)) {
          element.classList.add('reveal-pending');
          revealObserver?.observe(element);
        }
      });
    };
    const measure = () => {
      frame = 0;
      const height = mobile.matches ? shell.clientHeight : window.innerHeight;
      const total = mobile.matches
        ? shell.scrollHeight
        : document.documentElement.scrollHeight;
      let scrollY = mobile.matches ? shell.scrollTop : window.scrollY;
      if (activeMobile !== mobile.matches) {
        // Transfer the same reading point when rotation changes the native scroller.
        const bounds = readingSection?.getBoundingClientRect();
        const target = atEnd
          ? total - height
          : bounds
            ? scrollY +
              bounds.top +
              sectionFraction * bounds.height -
              height * 0.2
            : 0;
        const scroller = mobile.matches ? shell : window;
        scroller.scrollTo({ top: Math.max(0, target), behavior: 'instant' });
        activeMobile = mobile.matches;
        scrollY = mobile.matches ? shell.scrollTop : window.scrollY;
      }
      const contact = document.getElementById('contato');
      // Complete as the closing invitation enters the upper part of the viewport.
      const completion = contact
        ? scrollY + contact.getBoundingClientRect().top - height * 0.2
        : undefined;
      const p = media.matches
        ? 1
        : scrollProgress(scrollY, total, height, completion);
      progressRef.current = p;
      setProgress(p);
      scene.current?.update(p);
      atEnd = total - height - scrollY < 1;
      readingSection =
        scrollY > 0
          ? sections.findLast(
              (element) => element.getBoundingClientRect().top <= height * 0.2,
            )
          : undefined;
      if (readingSection) {
        const bounds = readingSection.getBoundingClientRect();
        sectionFraction = Math.max(
          0,
          Math.min(1, (height * 0.2 - bounds.top) / bounds.height),
        );
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const fallback = () => {
      scene.current?.dispose();
      scene.current = null;
      if (alive) setMode('static');
    };
    const initialize = async () => {
      const currentGeneration = ++generation;
      fallback();
      measure();
      startReveals();
      if (media.matches) return;
      try {
        const { createHouseScene } = await import('./house/scene');
        if (!alive || currentGeneration !== generation || !mount.current)
          return;
        scene.current = createHouseScene(mount.current, fallback);
        scene.current.update(progressRef.current);
        setMode('live');
      } catch {
        fallback();
      }
    };
    const onLayout = () => {
      startReveals();
      schedule();
    };
    void initialize();
    window.addEventListener('scroll', schedule, { passive: true });
    shell.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', initialize);
    mobile.addEventListener('change', onLayout);
    const sizeObserver = new ResizeObserver(schedule);
    sizeObserver.observe(shell);
    sizeObserver.observe(document.querySelector('main')!);
    return () => {
      alive = false;
      generation++;
      cancelAnimationFrame(frame);
      scene.current?.dispose();
      scene.current = null;
      revealObserver?.disconnect();
      sizeObserver.disconnect();
      showAll();
      window.removeEventListener('scroll', schedule);
      shell.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', initialize);
      mobile.removeEventListener('change', onLayout);
    };
  }, []);

  return (
    <aside
      className="build-rail"
      aria-label="Casa conceitual que ganha forma durante a leitura"
      data-mode={mode}
    >
      <span className="rail-top">DO PROJETO À REALIDADE</span>
      <div className="rail-stages" aria-hidden="true">
        {labels.map((label, i) => (
          <div
            className={`rail-stage ${stage >= i ? 'active' : ''}`}
            key={label}
          >
            <span>
              {progress >= (i + 1) / 5 ? (
                <Check size={10} />
              ) : (
                String(i + 1).padStart(2, '0')
              )}
            </span>
            <p>{label}</p>
          </div>
        ))}
      </div>
      <div className="rail-bottom">
        <div className="house-visual">
          <div className="house-mount" ref={mount} />
          <img
            className="house-fallback"
            src="/images/house-complete.png"
            alt="Miniatura conceitual de casa contemporânea pronta, com piscina e jardim."
            width={640}
            height={560}
            hidden={mode === 'live'}
          />
        </div>
        <div className="rail-copy">
          <span className="eyebrow">
            {mode === 'live'
              ? `ETAPA ${String(stage + 1).padStart(2, '0')} / 05`
              : 'CASA CONCEITUAL'}
          </span>
          <p className="rail-message">
            {mode === 'live'
              ? messages[stage]
              : 'Do projeto à vida.\nCuidado em cada etapa.'}
          </p>
          <div className="rail-progress">
            <span>
              {mode === 'live' ? labels[stage] : 'Ilustração conceitual'}
            </span>
            {mode === 'live' && <span>{Math.round(progress * 100)}%</span>}
          </div>
          {mode === 'live' && (
            <Progress
              className="house-progress"
              value={Math.round(progress * 100)}
              aria-label="Progresso da construção conceitual"
            />
          )}
          <span className="rail-hint">
            <ArrowDown size={12} />
            <span>
              {mode === 'live'
                ? 'A CASA GANHA FORMA AO ROLAR'
                : 'DO INÍCIO AO FIM'}
            </span>
          </span>
          <small className="concept-label">Modelo conceitual</small>
        </div>
      </div>
    </aside>
  );
}
