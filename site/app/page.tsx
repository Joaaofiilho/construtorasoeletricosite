import {
  ArrowUpRight,
  ArrowDown,
  MapPin,
  Check,
  MessageCircle,
  Mail,
  MoveUpRight,
} from 'lucide-react';
import { contact, projectTypes } from '@/lib/content';
import { Photo } from '@/components/photo';
import { SiteHeader, SiteFooter } from '@/components/site-navigation';
import { Experience } from '@/components/experience';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="page-shell" id="page-scroll">
        <SiteHeader page="home" />
        <main id="conteudo" tabIndex={-1}>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-top">
              <span className="eyebrow">
                <span className="lime-dot" />
                CONSTRUIR É CUIDAR DE CADA DETALHE
              </span>
              <span className="location">
                <MapPin size={14} /> Trairi, Ceará e região
              </span>
            </div>
            <div className="hero-content">
              <h1 id="hero-title">
                Seu projeto.
                <br />
                Nosso cuidado.
                <br />
                <span>Do início ao fim.</span>
              </h1>
              <div className="hero-side">
                <p>Seu projeto ganha forma com quem acompanha cada detalhe.</p>
                <p className="muted">
                  Construímos casas, espaços comerciais e galpões com atenção ao
                  que realmente importa: a sua obra.
                </p>
                <a
                  className="button lime"
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Converse sobre sua obra <ArrowUpRight size={19} />
                </a>
              </div>
            </div>
            <Photo name="hero" className="hero-photo" priority />
            <div className="hero-bottom">
              <a href="#servicos" className="scroll-link">
                <span className="circle-arrow">
                  <ArrowDown size={17} />
                </span>
                Uma boa obra começa com confiança
              </a>
              <span className="micro">SOELÉTRICO · CONSTRUÇÃO CIVIL</span>
            </div>
          </section>
          <section
            className="section services"
            id="servicos"
            aria-labelledby="services-title"
          >
            <div className="section-heading reveal">
              <span className="eyebrow">01 / O QUE FAZEMOS</span>
              <div className="heading-row">
                <h2 id="services-title">
                  Você traz o projeto.
                  <br />
                  <span>Nós construímos.</span>
                </h2>
                <p>
                  Da primeira etapa ao acabamento, colocamos seu projeto em
                  prática com atenção e presença.
                </p>
              </div>
            </div>
            <div className="service-list">
              {projectTypes.map(
                ({ id, number, title, subtitle, description }) => (
                  <a
                    className="service-row reveal"
                    key={id}
                    href={`/projetos#${id}`}
                  >
                    <span className="service-number">{number}</span>
                    <div className="service-name">
                      <h3>{title}</h3>
                      <span>{subtitle}</span>
                    </div>
                    <p>{description}</p>
                    <MoveUpRight
                      className="service-arrow"
                      size={29}
                      strokeWidth={1}
                    />
                  </a>
                ),
              )}
            </div>
            <p className="service-note">
              <Check size={16} /> Executamos a obra a partir do projeto de
              arquitetura e engenharia que você já possui.
            </p>
          </section>
          <section
            className="section about"
            id="sobre"
            aria-labelledby="about-title"
          >
            <div className="about-image reveal">
              <Photo name="detail" />
              <div className="experience-stamp">
                <strong>
                  15<span>+</span>
                </strong>
                <p>
                  anos de experiência
                  <br />
                  de João Sabiá
                </p>
              </div>
            </div>
            <div className="about-copy">
              <span className="eyebrow reveal">02 / NOSSA ESSÊNCIA</span>
              <h2 id="about-title" className="reveal">
                Uma obra bem-feita
                <br />
                começa com
                <br />
                <span>gente por perto.</span>
              </h2>
              <p className="about-lead reveal">
                Construir é uma decisão importante. Ter com quem contar faz toda
                a diferença.
              </p>
              <p className="muted reveal">
                À frente da Soelétrico, João Sabiá reúne mais de 15 anos de
                experiência na construção civil. Uma trajetória que se traduz em
                acompanhamento próximo e atenção ao acabamento.
              </p>
              <div className="value-item reveal">
                <span>01</span>
                <div>
                  <h3>Acompanhamento próximo</h3>
                  <p>
                    Presença durante a execução, para conversar sobre o
                    andamento e cuidar de cada etapa da sua obra.
                  </p>
                </div>
              </div>
              <div className="value-item reveal">
                <span>02</span>
                <div>
                  <h3>Qualidade no acabamento</h3>
                  <p>
                    Cuidado nos encontros, nas superfícies e nos detalhes que
                    dão forma ao resultado final.
                  </p>
                </div>
              </div>
              <a
                className="text-link reveal"
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Converse com João Sabiá <ArrowUpRight size={18} />
              </a>
            </div>
          </section>
          <section
            className="section project"
            id="projeto"
            aria-labelledby="project-title"
          >
            <div className="section-heading reveal">
              <span className="eyebrow">03 / PROJETO EM DESTAQUE</span>
              <div className="heading-row">
                <h2 id="project-title">
                  Construir espaços.
                  <br />
                  <span>Dar lugar à vida.</span>
                </h2>
                <span className="project-status">
                  <span className="lime-dot" /> OBRA CONCLUÍDA
                </span>
              </div>
            </div>
            <div className="project-info reveal">
              <h3>Residência de alto padrão</h3>
              <p>
                Uma casa de luxo com piscina ampla de lazer. Um projeto
                concluído que faz parte da história da Soelétrico.
              </p>
            </div>
            <div className="reference-label reveal">
              <span>REFERÊNCIA VISUAL</span>
              <p>
                As fotos abaixo são ilustrativas. Em breve, os registros reais
                da nossa obra estarão aqui.
              </p>
            </div>
            <Photo name="project" className="project-photo reveal" />
            <div className="project-footer reveal">
              <span>RESIDENCIAL · ÁREA DE LAZER · ACABAMENTOS</span>
              <a className="text-link" href="/projetos">
                Conheça nossos projetos <ArrowUpRight size={18} />
              </a>
            </div>
          </section>
          <section
            className="section contact"
            id="contato"
            aria-labelledby="contact-title"
          >
            <div className="contact-top reveal">
              <span className="eyebrow">
                <span className="lime-dot" />
                04 / VAMOS CONSTRUIR
              </span>
              <span className="contact-location">
                <MapPin size={14} /> TRAIRI, CEARÁ E REGIÃO
              </span>
            </div>
            <h2 id="contact-title" className="reveal">
              O seu projeto merece
              <br />
              <span>esse cuidado.</span>
            </h2>
            <div className="contact-grid reveal">
              <p>
                Já tem um projeto em mãos?
                <br />
                Vamos conversar sobre a sua próxima obra.
              </p>
              <a
                className="button lime"
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Converse sobre sua obra <ArrowUpRight size={21} />
              </a>
            </div>
            <div className="contact-channels reveal">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={21} strokeWidth={1.5} />
                <span>
                  <small>WHATSAPP</small>
                  {contact.phone}
                </span>
                <ArrowUpRight size={17} />
              </a>
              <a href={`mailto:${contact.email}`}>
                <Mail size={21} strokeWidth={1.5} />
                <span>
                  <small>E-MAIL</small>
                  {contact.email}
                </span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </section>
        </main>
        <SiteFooter page="home" />
      </div>
      <Experience />
    </>
  );
}
