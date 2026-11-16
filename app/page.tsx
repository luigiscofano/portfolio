'use client';
import { useState } from 'react';
import { matchesProject } from '@/lib/project-search.mjs';
import { sitePath } from '@/lib/site-path';
import { externalLink as external } from '@/lib/portfolio';
import { Icon, ExternalIcon, type IconName } from '@/components/portfolio/icon';
import { ProfileName } from '@/components/portfolio/profile-name';
import { ResearchExample } from '@/components/portfolio/research-example';
import { ProjectCard } from '@/components/portfolio/project-card';
import { usePortfolioLanguage } from '@/hooks/use-portfolio-language';
import { useSectionNavigation } from '@/hooks/use-section-navigation';
import { useEmailCopy } from '@/hooks/use-email-copy';

const sectionIcons: Record<string, IconName> = {
  sobre: 'book-open',
  projetos: 'code',
  pesquisa: 'flask',
  formacao: 'graduation-cap',
  trajetoria: 'diagram-project',
  contato: 'envelope',
};
const sectionColors: Record<string, string> = {
  sobre: '#3d7095',
  projetos: '#28725d',
  pesquisa: '#946c19',
  formacao: '#3d7095',
  trajetoria: '#ad4946',
  contato: '#28725d',
};
const filterIcons: Record<string, IconName> = {
  Todos: 'diagram-project',
  IA: 'flask',
  Dados: 'database',
  Software: 'code',
  Hardware: 'microchip',
};
function SectionTitle({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: IconName;
}) {
  return (
    <h2 className="section-title control-label">
      <Icon name={icon} size={20} />
      {children}
    </h2>
  );
}
function SectionVisual({
  section,
  language,
}: {
  section: 'formacao' | 'trajetoria' | 'pesquisa';
  language: 'pt' | 'en' | 'es';
}) {
  const labels = {
    formacao: {
      pt: 'Mapa da formação',
      en: 'Education map',
      es: 'Mapa de formación',
    },
    trajetoria: {
      pt: 'Mapa das áreas de atuação',
      en: 'Experience map',
      es: 'Mapa de experiencia',
    },
    pesquisa: {
      pt: 'Mapa das iniciativas de pesquisa',
      en: 'Research map',
      es: 'Mapa de investigación',
    },
  };
  return (
    <details className="about-details section-visual">
      <summary>
        <span className="control-label">
          <Icon name="diagram-project" size={16} />
          {labels[section][language]}
        </span>
      </summary>
      <figure>
        <img
          src={sitePath(
            '/images/sections/' + section + '-' + language + '.svg',
          )}
          alt={labels[section][language]}
          width={560}
          height={
            section === 'trajetoria' ? 684 : section === 'formacao' ? 354 : 244
          }
          loading="lazy"
        />
        <figcaption>
          {language === 'en'
            ? 'Informational diagram based on the profile, not a photograph or an institutional endorsement.'
            : language === 'es'
              ? 'Diagrama informativo basado en el perfil, no una fotografía ni un respaldo institucional.'
              : 'Diagrama informativo baseado no perfil, não uma fotografia nem endosso institucional.'}
        </figcaption>
      </figure>
    </details>
  );
}

export default function Home() {
  const { language, data, t, changeLanguage } = usePortfolioLanguage();
  const { active, menuOpen, setMenuOpen, menuButton, followSection } =
    useSectionNavigation();
  const { copied, copyError, copyEmail } = useEmailCopy();
  const [educationOpen, setEducationOpen] = useState<number | null>(null);
  const [filter, setFilter] = useState('Todos');
  const [query, setQuery] = useState('');
  const featured = data.projects.filter((project) =>
    ['tupi', 'intuicao', 'trilha-viva'].includes(project.id),
  );
  const filtered = data.projects.filter((project) =>
    matchesProject(project, filter, query),
  );
  const profileLinks = [
    {
      label: 'GitHub',
      icon: 'github' as IconName,
      url: data.profile.github,
      color: '#946c19',
      internal: false,
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin' as IconName,
      url: data.profile.linkedin,
      color: '#3d7095',
      internal: false,
    },
    {
      label: t('E-mail'),
      icon: 'envelope' as IconName,
      url: `mailto:${data.profile.email}`,
      color: '#ad4946',
      internal: true,
    },
    {
      label: t('Pesquisa'),
      icon: 'graduation-cap' as IconName,
      url: '#pesquisa',
      color: '#3d7095',
      internal: true,
    },
    {
      label: t('Projetos'),
      icon: 'code' as IconName,
      url: '#projetos',
      color: '#3d7095',
      internal: true,
    },
    {
      label: t('Documentação'),
      icon: 'file-lines' as IconName,
      url: data.profile.documentation,
      color: '#28725d',
      internal: false,
    },
  ];
  return (
    <>
      <title>
        {language === 'en'
          ? 'Luigi Scofano | AI, data and software'
          : language === 'es'
            ? 'Luigi Scofano | IA, datos y software'
            : 'Luigi Scofano | IA, dados e software'}
      </title>
      <a className="skip-link" href="#conteudo">
        {t('Ir para o conteúdo')}
      </a>
      <div className="site-shell" id="inicio">
        <header className="mobile-header">
          <a
            tabIndex={menuOpen ? -1 : undefined}
            href="#sobre"
            aria-label={data.profile.name}
          >
            <ProfileName />
          </a>
          <button
            ref={menuButton}
            aria-label={menuOpen ? t('Fechar menu') : t('Abrir menu')}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'xmark' : 'bars'} size={23} />
          </button>
        </header>
        {menuOpen && (
          <button
            className="menu-overlay"
            tabIndex={-1}
            aria-label={t('Fechar menu de navegação')}
            onClick={() => {
              setMenuOpen(false);
              menuButton.current?.focus();
            }}
          />
        )}
        <aside
          className={`sidebar ${menuOpen ? 'is-open' : ''}`}
          aria-label={t('Perfil e navegação')}
        >
          <a
            href="#sobre"
            aria-label={data.profile.name}
            className="sidebar-name"
            onClick={() => setMenuOpen(false)}
          >
            <ProfileName />
          </a>
          <p className="sidebar-description">
            {t('ENGENHARIA DE COMPUTAÇÃO')}
            <br />
            <a href="#formacao" onClick={() => setMenuOpen(false)}>
              POLI-USP
            </a>
          </p>
          <nav id="main-nav" aria-label={t('Navegação principal')}>
            {data.navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={
                  {
                    '--nav-color': sectionColors[item.id],
                  } as React.CSSProperties
                }
                className={active === item.id ? 'active' : ''}
                aria-current={active === item.id ? 'location' : undefined}
                onClick={() => {
                  followSection(item.id);
                }}
              >
                <Icon name={sectionIcons[item.id] || 'file-lines'} size={17} />
                {item.label}
              </a>
            ))}
          </nav>
          <div className="sidebar-links" aria-label={t('Links de Luigi')}>
            {profileLinks
              .filter((item) => !['#pesquisa', '#projetos'].includes(item.url))
              .map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  {...(!item.internal ? external : {})}
                  onClick={() => {
                    if (item.url.startsWith('#'))
                      followSection(item.url.slice(1));
                    else {
                      setMenuOpen(false);
                      if (menuOpen) menuButton.current?.focus();
                    }
                  }}
                  style={{ '--link-color': item.color } as React.CSSProperties}
                >
                  <Icon name={item.icon} size={22} />
                  <span>{item.label}</span>
                </a>
              ))}
          </div>
          <div className="sidebar-bottom">
            {data.visualSignature.enabled && (
              <div className="sidebar-signature">
                <img
                  src={sitePath(data.visualSignature.image)}
                  alt={data.visualSignature.alt}
                  width={data.visualSignature.width}
                  height={data.visualSignature.height}
                />
              </div>
            )}
            <p className="sidebar-footer">
              © 2026 {data.profile.name}
              <br />
              {data.profile.location}
              <br />
              <a href={sitePath('/creditos/') + '?lang=' + language}>
                {t('Créditos')}
              </a>
            </p>
          </div>
        </aside>
        <main id="conteudo" tabIndex={-1} inert={menuOpen}>
          <section id="sobre" tabIndex={-1} className="section about-section">
            <div className="editorial-topline">
              <span>{t('Portfólio · pesquisa, dados e software')}</span>
            </div>
            <div className="language-row">
              <label htmlFor="portfolio-language">{t('Idioma')}</label>
              <select
                id="portfolio-language"
                value={language}
                onChange={(event) =>
                  changeLanguage(event.target.value as 'pt' | 'en' | 'es')
                }
              >
                <option value="pt" lang="pt-BR">
                  Português
                </option>
                <option value="en" lang="en">
                  English
                </option>
                <option value="es" lang="es">
                  Español
                </option>
              </select>
            </div>
            <div className="hero">
              <div className="hero-copy">
                <p className="hero-eyebrow">{data.profile.hero.eyebrow}</p>
                <h1>{data.profile.hero.title}</h1>
                <p className="hero-subtitle">{data.profile.hero.subtitle}</p>
                <p className="hero-description">
                  {data.profile.hero.description}
                </p>
                <div className="hero-actions">
                  <a
                    className="primary-link"
                    href="#projetos"
                    onClick={() => followSection('projetos')}
                  >
                    {t('Explorar projetos')}{' '}
                    <Icon
                      name="arrow-up"
                      size={13}
                      className="cta-arrow-down"
                    />
                  </a>
                </div>
              </div>
              <figure className="hero-portrait">
                <div className="portrait-frame">
                  <img
                    src={sitePath(data.profile.photo)}
                    alt={data.profile.photoAlt}
                    width="1152"
                    height="1536"
                    fetchPriority="high"
                  />
                </div>
                <figcaption>{data.profile.name}</figcaption>
              </figure>
            </div>
            <details id="mais-sobre-mim" className="about-details">
              <summary>
                <span className="control-label">
                  <Icon name="book-open" size={16} />
                  {t('Mais sobre mim')}
                </span>
              </summary>
              <div className="resume-links">
                {(language === 'en'
                  ? [data.profile.resume, data.profile.resumePt]
                  : [data.profile.resumePt, data.profile.resume]
                ).map((resume) => (
                  <a
                    key={resume.url}
                    className="resume-link"
                    href={sitePath(resume.url)}
                    download={resume.downloadName}
                  >
                    <Icon name="file-lines" size={16} />
                    {resume.label}
                  </a>
                ))}
              </div>
              <div className="about-prose">
                {data.profile.aboutOverview.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </details>
          </section>
          <section
            id="projetos"
            tabIndex={-1}
            className="section projects-section"
          >
            <details className="section-disclosure">
              <summary>
                <SectionTitle icon="code">
                  {t('Projetos e recursos')}
                </SectionTitle>
                <Icon name="plus" size={18} />
              </summary>
              <div className="section-disclosure-content">
                {' '}
                <div className="featured-heading">
                  <h2>{t('Pesquisa & projetos em destaque')}</h2>
                  <a
                    href="#projetos"
                    onClick={() => {
                      setFilter('Todos');
                      setQuery('');
                      followSection('projetos');
                    }}
                  >
                    {t('Ver todos')}{' '}
                    <Icon name="arrow-up" size={13} className="cta-arrow" />
                  </a>
                </div>
                <div className="selected-work">
                  {featured.map((project, index) => (
                    <a
                      key={project.id}
                      href="#projetos"
                      className="selected-work-item"
                      onClick={() => {
                        setFilter('Todos');
                        setQuery(project.name);
                      }}
                    >
                      <span className="selected-index">0{index + 1}</span>
                      <div>
                        <h3>{project.name}</h3>
                        <p>{project.summary}</p>
                      </div>
                      <Icon name="arrow-up" size={16} className="cta-arrow" />
                    </a>
                  ))}
                </div>
                <p className="section-intro">
                  {t(
                    'Aplicações, experimentos e materiais que desenvolvi ou dos quais participei. Cada projeto apresenta sua autoria, documentação e limites.',
                  )}
                </p>
                <label className="project-search">
                  <span>
                    {language === 'en'
                      ? 'Find a project'
                      : language === 'es'
                        ? 'Encuentra un proyecto'
                        : 'Encontre um projeto'}
                  </span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={
                      language === 'en'
                        ? 'Name, technology or subject'
                        : language === 'es'
                          ? 'Nombre, tecnología o tema'
                          : 'Nome, tecnologia ou assunto'
                    }
                  />
                </label>
                <div className="filter-row">
                  <div
                    className="filters"
                    aria-label={t('Filtrar projetos por área')}
                  >
                    {['Todos', 'IA', 'Dados', 'Software', 'Hardware'].map(
                      (item) => (
                        <button
                          key={item}
                          data-category={item}
                          aria-pressed={filter === item}
                          className={filter === item ? 'selected' : ''}
                          onClick={() => setFilter(item)}
                        >
                          <Icon name={filterIcons[item]} size={14} />
                          {t(item)}
                        </button>
                      ),
                    )}
                  </div>
                  <span aria-live="polite" className="project-count">
                    {filtered.length}{' '}
                    {filtered.length === 1 ? t('projeto') : t('projetos')}
                  </span>
                </div>
                {filtered.length === 0 && (
                  <p role="status">
                    {language === 'en'
                      ? 'No projects match this search.'
                      : language === 'es'
                        ? 'Ningún proyecto coincide con la búsqueda.'
                        : 'Nenhum projeto corresponde à busca.'}
                  </p>
                )}
                <div className="resource-grid">
                  {filtered.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      t={t}
                      language={language}
                    />
                  ))}
                </div>
                <a
                  className="all-projects"
                  href={`${data.profile.github}?tab=repositories`}
                  {...external}
                >
                  <Icon name="github" size={17} />
                  {t('Todos os repositórios no GitHub')}
                  <ExternalIcon />
                </a>
              </div>
            </details>
          </section>
          <section
            id="pesquisa"
            tabIndex={-1}
            className="section research-section"
          >
            <details className="section-disclosure">
              <summary>
                <SectionTitle icon="flask">{t('Pesquisa')}</SectionTitle>
                <Icon name="plus" size={18} />
              </summary>
              <div className="section-disclosure-content">
                <SectionVisual section="pesquisa" language={language} />
                <p className="section-intro">
                  {t(
                    'Iniciativas que conectam computação, linguagem, educação e interação.',
                  )}
                </p>
                <div className="timeline">
                  {data.research.map((item, index) => (
                    <article className="timeline-item" key={item.title}>
                      <a
                        className={`timeline-icon tone-${index}`}
                        href={item.url}
                        aria-label={item.title}
                        {...external}
                      >
                        <Icon
                          name={index === 0 ? 'book-open' : 'graduation-cap'}
                          size={21}
                        />
                      </a>
                      <div className="timeline-content">
                        <span className="item-meta">{item.institution}</span>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                        <a
                          className="inline-link"
                          href={item.url}
                          {...external}
                        >
                          {item.linkLabel}
                          <ExternalIcon />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
                <details className="about-details">
                  <summary>
                    <Icon name="flask" size={16} />{' '}
                    {language === 'en'
                      ? 'Explore a research example'
                      : language === 'es'
                        ? 'Explorar un ejemplo de la investigación'
                        : 'Explorar um exemplo da pesquisa'}
                  </summary>
                  <ResearchExample language={language} />
                </details>
                <p className="research-note">
                  {t(
                    'Código e metodologia estão disponíveis nos links de cada iniciativa.',
                  )}
                </p>
              </div>
            </details>
          </section>
          <section
            id="formacao"
            tabIndex={-1}
            className="section education-section"
          >
            <details className="section-disclosure">
              <summary>
                <SectionTitle icon="graduation-cap">
                  {t('Formação')}
                </SectionTitle>
                <Icon name="plus" size={18} />
              </summary>
              <div className="section-disclosure-content">
                <SectionVisual section="formacao" language={language} />
                <div className="education-accordion">
                  {data.education.map((item, index) => (
                    <div
                      className={`education-item ${educationOpen === index ? 'expanded' : ''}`}
                      key={item.title}
                    >
                      <h3>
                        <button
                          onClick={() =>
                            setEducationOpen(
                              educationOpen === index ? null : index,
                            )
                          }
                          aria-expanded={educationOpen === index}
                          aria-controls={`education-panel-${index}`}
                          id={`education-heading-${index}`}
                        >
                          <span className="control-label">
                            <Icon name="graduation-cap" size={16} />
                            {item.title}
                          </span>
                          <Icon
                            name={educationOpen === index ? 'minus' : 'plus'}
                            size={14}
                          />
                        </button>
                      </h3>
                      <div
                        role="region"
                        id={`education-panel-${index}`}
                        aria-labelledby={`education-heading-${index}`}
                        hidden={educationOpen !== index}
                        className="education-panel"
                      >
                        <p>
                          <strong>{item.institution}</strong>
                        </p>
                        <p>{item.status}.</p>
                        <p>{item.description}</p>
                        <a
                          href={`${data.profile.source}#formação-e-aprendizado`}
                          {...external}
                        >
                          {t('Informações no perfil público')}
                          <ExternalIcon />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </section>
          <section
            id="trajetoria"
            tabIndex={-1}
            className="section experience-section"
          >
            <details className="section-disclosure">
              <summary>
                <SectionTitle icon="diagram-project">
                  {t('Trajetória')}
                </SectionTitle>
                <Icon name="plus" size={18} />
              </summary>
              <div className="section-disclosure-content">
                <SectionVisual section="trajetoria" language={language} />
                <p className="section-intro">
                  {t(
                    'Experiências com dados, tecnologia e necessidades de negócio.',
                  )}
                </p>
                <div className="timeline">
                  {data.experience.map((item, index) => (
                    <article className="timeline-item" key={item.company}>
                      <span className={`timeline-icon tone-${index}`}>
                        <Icon
                          name={
                            index === 0
                              ? 'diagram-project'
                              : index === 1
                                ? 'code'
                                : 'database'
                          }
                          size={21}
                        />
                      </span>
                      <div className="timeline-content">
                        <h3>{item.company}</h3>
                        <span className="item-meta">{item.area}</span>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <a
                  className="inline-link"
                  href={`${data.profile.github}#trajetória-profissional`}
                  {...external}
                >
                  {t('Mais sobre a trajetória')}
                  <ExternalIcon />
                </a>
              </div>
            </details>
          </section>
          <section
            id="contato"
            tabIndex={-1}
            className="section contact-section"
          >
            <details className="section-disclosure">
              <summary>
                <SectionTitle icon="envelope">{t('Contato')}</SectionTitle>
                <Icon name="plus" size={18} />
              </summary>
              <div className="section-disclosure-content">
                <p className="section-intro">{data.contactText}</p>
                {/* Cada endereço mantém seu próprio feedback de cópia. */}
                {[
                  {
                    label: t('E-mail profissional'),
                    email: data.profile.email,
                  },
                  {
                    label: t('E-mail pessoal'),
                    email: data.profile.personalEmail,
                  },
                ].map(({ label, email }) => (
                  <div className="contact-item" key={email}>
                    <span className="contact-icon">
                      <Icon name="envelope" size={29} />
                    </span>
                    <div>
                      <p>{label}</p>
                      <a className="contact-email" href={`mailto:${email}`}>
                        {email}
                      </a>
                      <button
                        className="copy-email"
                        onClick={() => copyEmail(email)}
                        aria-label={
                          copied === email
                            ? `${label} ${t('copiado')}`
                            : `${t('Copiar')} ${label.toLowerCase()}`
                        }
                      >
                        <Icon
                          name={copied === email ? 'check' : 'copy'}
                          size={16}
                        />
                      </button>
                      <span
                        className="copy-feedback"
                        data-state={
                          copied === email
                            ? 'success'
                            : copyError === email
                              ? 'error'
                              : undefined
                        }
                        aria-live="polite"
                      >
                        {copied === email
                          ? t('E-mail copiado.')
                          : copyError === email
                            ? t('Selecione o endereço para copiá-lo.')
                            : ''}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="contact-item">
                  <span className="contact-icon">
                    <Icon name="location-dot" size={29} />
                  </span>
                  <div>
                    <p>{data.profile.location}</p>
                    <span>{t('Engenharia de Computação · Poli-USP')}</span>
                  </div>
                </div>
                <div className="contact-social">
                  <a href={data.profile.github} {...external}>
                    <Icon name="github" size={18} />
                    GitHub
                    <ExternalIcon />
                  </a>
                  <a href={data.profile.linkedin} {...external}>
                    <Icon name="linkedin" size={18} />
                    LinkedIn
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            </details>
          </section>
          <footer className="page-footer">
            <span className="footer-signature">
              {data.visualSignature.enabled && (
                <img
                  src={sitePath(data.visualSignature.image)}
                  alt=""
                  aria-hidden="true"
                  width={data.visualSignature.width}
                  height={data.visualSignature.height}
                />
              )}
              <span>© 2026 {data.profile.name}</span>
            </span>
            <a href="#sobre" aria-label={t('Voltar ao início')}>
              <Icon name="arrow-up" size={16} />
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
