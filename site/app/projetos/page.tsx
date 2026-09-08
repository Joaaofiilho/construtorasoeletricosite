import type { Metadata } from 'next';
import { ArrowDown, ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Photo } from '@/components/photo';
import { SiteHeader, SiteFooter } from '@/components/site-navigation';
import { contact, projectTypes } from '@/lib/content';
import './projects.css';

export const metadata: Metadata = {
  title: 'Projetos | Soelétrico — Casas, obras comerciais e galpões',
  description:
    'Conheça a construção de casas, obras comerciais e galpões da Soelétrico em Trairi, Ceará e região. Do seu projeto à execução, com acompanhamento próximo.',
};

export default function Projects() {
  return (
    <div className="projects-page">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader page="projects" />
      <main id="conteudo" tabIndex={-1}>
        <div className="projects-intro">
          <a className="projects-home" href="/">
            <ArrowLeft size={15} /> Página inicial
          </a>
          <div className="projects-heading">
            <div>
              <span className="eyebrow">
                <span className="lime-dot" /> O QUE CONSTRUÍMOS
              </span>
              <h1>Projetos</h1>
            </div>
            <p>
              Casas, espaços comerciais e galpões.
              <br />O mesmo cuidado em cada obra.
            </p>
          </div>
          <nav className="project-types" aria-label="Tipos de projeto">
            {projectTypes.map(({ id, number, title }) => (
              <a key={id} href={`#${id}`} aria-label={title}>
                <span aria-hidden="true">{number}</span>
                {title}
                <ArrowDown size={17} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <p className="projects-note">
            As imagens são referências ilustrativas. Os registros reais das
            nossas obras serão adicionados em breve.
          </p>
        </div>

        <div className="projects-collection">
          {projectTypes.map(
            (
              { id, number, title, subtitle, description, photo, label },
              index,
            ) => (
              <section
                className="project-category"
                id={id}
                key={id}
                aria-labelledby={`${id}-title`}
              >
                <div className="category-copy">
                  <span className="eyebrow">
                    {number} / {label}
                  </span>
                  <h2 id={`${id}-title`}>{title}</h2>
                  <p className="category-subtitle">{subtitle}</p>
                  <p className="category-description">{description}</p>
                  {id === 'casas' && (
                    <div className="category-featured">
                      <span className="eyebrow">
                        <span className="lime-dot" /> OBRA CONCLUÍDA
                      </span>
                      <h3>Residência de alto padrão</h3>
                      <p>
                        Uma casa de luxo com piscina ampla de lazer, que faz
                        parte da história da Soelétrico. Registros reais em
                        breve.
                      </p>
                    </div>
                  )}
                  <a
                    className="text-link"
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Converse sobre sua obra <ArrowUpRight size={18} />
                  </a>
                </div>
                <Photo
                  name={photo}
                  className="category-photo"
                  priority={index === 0}
                  sizes="(max-width: 800px) 100vw, 62vw"
                />
              </section>
            ),
          )}
        </div>

        <section
          className="projects-contact contact"
          aria-labelledby="projects-contact-title"
        >
          <div>
            <span className="eyebrow">
              <span className="lime-dot" /> DO PROJETO À EXECUÇÃO
            </span>
            <h2 id="projects-contact-title">
              Vamos construir
              <br />
              <span>o seu próximo projeto?</span>
            </h2>
            <p>
              <Check size={17} /> Executamos a obra a partir do projeto de
              arquitetura e engenharia que você já possui.
            </p>
          </div>
          <div className="projects-contact-links">
            <a
              className="button lime"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Converse com João Sabiá <ArrowUpRight size={20} />
            </a>
            <a className="text-link" href={`mailto:${contact.email}`}>
              {contact.email} <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter page="projects" />
    </div>
  );
}
