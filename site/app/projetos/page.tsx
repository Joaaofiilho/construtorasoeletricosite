import type { Metadata } from 'next';
import { ArrowDown, ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Photo, GalleryPhoto } from '@/components/photo';
import { SiteHeader, SiteFooter } from '@/components/site-navigation';
import { contact, gallery, projectId, projectTitle } from '@/lib/content';
import './projects.css';

export const metadata: Metadata = {
  title: 'Casa de Alto Padrão no Ouro Verde | Projetos Soelétrico',
  description:
    'Conheça a Casa de Alto Padrão no Ouro Verde, uma obra concluída pela Soelétrico. Veja as fotos da fachada, piscina, ambientes internos e acabamentos.',
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
              Uma casa, cada detalhe.
              <br />O mesmo cuidado em cada obra.
            </p>
          </div>
          <nav className="project-types" aria-label="Projetos disponíveis">
            <a href={`#${projectId}`}>
              <span>01</span>
              {projectTitle}
              <ArrowDown size={17} aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div className="projects-collection">
          <section
            className="project-category"
            id={projectId}
            aria-labelledby="house-title"
          >
            <div className="category-copy">
              <span className="eyebrow">01 / RESIDENCIAL · OBRA CONCLUÍDA</span>
              <h2 id="house-title">{projectTitle}</h2>
              <p className="category-subtitle">Espaços para viver.</p>
              <p className="category-description">
                Uma casa construída por João Sabiá, com piscina, jardim e
                ambientes integrados. Conheça os espaços e os detalhes de
                acabamento desta obra.
              </p>
              <a className="text-link" href="#galeria">
                Explore a galeria <ArrowDown size={18} />
              </a>
            </div>
            <Photo
              name="project"
              className="category-photo"
              priority
              sizes="(max-width: 800px) 100vw, 62vw"
            />
          </section>
          <section
            id="galeria"
            className="house-gallery"
            aria-labelledby="gallery-title"
          >
            <span className="eyebrow">UM OLHAR POR CADA AMBIENTE</span>
            <h2 id="gallery-title">Galeria da casa</h2>
            <p>
              43 fotos da obra concluída. Selecione uma imagem para ver em
              tamanho maior.
            </p>
            {gallery.map((group) => (
              <section
                className="gallery-group"
                key={group.title}
                aria-label={group.title}
              >
                <h3>{group.title}</h3>
                <div className="gallery-grid">
                  {group.photos.map((photo) => (
                    <GalleryPhoto photo={photo} key={photo.src} />
                  ))}
                </div>
              </section>
            ))}
          </section>
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
