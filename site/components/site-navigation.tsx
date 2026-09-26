import { ArrowUpRight } from 'lucide-react';
import { contact, projectHref } from '@/lib/content';

type NavigationProps = { page: 'home' | 'projects' };

export function SiteHeader({ page }: NavigationProps) {
  const home = page === 'home' ? '' : '/';

  return (
    <header className="header" id="inicio">
      <a
        className="wordmark"
        href={page === 'home' ? '#inicio' : '/'}
        aria-label="Soelétrico, início"
      >
        soelétrico<span className="brand-dot">.</span>
        <small>CONSTRUTORA</small>
      </a>
      <nav aria-label="Navegação principal">
        <a href={`${home}#servicos`}>O que fazemos</a>
        <a href={`${home}#sobre`}>Nossa essência</a>
        <a
          href={page === 'home' ? projectHref : '/projetos'}
          aria-current={page === 'projects' ? 'page' : undefined}
        >
          Projetos
        </a>
      </nav>
      <a
        className="header-contact"
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
      >
        Vamos conversar <ArrowUpRight size={17} />
      </a>
    </header>
  );
}

export function SiteFooter({ page }: NavigationProps) {
  return (
    <footer className="footer">
      <a className="wordmark" href={page === 'home' ? '#inicio' : '/'}>
        soelétrico<span className="brand-dot">.</span>
        <small>CONSTRUTORA</small>
      </a>
      <span>
        Construção com cuidado.
        <br />
        Trairi, Ceará e região.
      </span>
      <a href={page === 'home' ? '#inicio' : '/'} className="back-top">
        {page === 'home' ? 'Voltar ao início' : 'Voltar à página inicial'}{' '}
        <ArrowUpRight size={16} />
      </a>
    </footer>
  );
}
