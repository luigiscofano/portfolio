'use client';
import { useState } from 'react';
import { sitePath } from '@/lib/site-path';
import { externalLink as external } from '@/lib/portfolio';
import { Icon, ExternalIcon, type IconName } from '@/components/portfolio/icon';
import { ProfileName } from '@/components/portfolio/profile-name';
import { ResearchExample } from '@/components/portfolio/research-example';
import { ProjectCard } from '@/components/portfolio/project-card';
import { usePortfolioLanguage } from '@/hooks/use-portfolio-language';
import { useSectionNavigation } from '@/hooks/use-section-navigation';
import { useEmailCopy } from '@/hooks/use-email-copy';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}
export default function Home() {
  const { language, data, t, changeLanguage } = usePortfolioLanguage();
  const { active, menuOpen, setMenuOpen, menuButton, followSection } =
    useSectionNavigation();
  const { copied, copyError, copyEmail } = useEmailCopy();
  const [educationOpen, setEducationOpen] = useState<number | null>(0);
  const [filter, setFilter] = useState('Todos');
  const featuredTupi = data.projects.find((project) => project.id === 'tupi');
  const featuredIntuicao = data.projects.find(
    (project) => project.id === 'intuicao',
  );
  const filtered = data.projects.filter(
    (project) => filter === 'Todos' || project.category === filter,
  );
  const profileLinks = [
    {
      label: 'GitHub',
      icon: 'github' as IconName,
      url: data.profile.github,
      color: '#9b761c',
      internal: false,
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin' as IconName,
      url: data.profile.linkedin,
      color: '#467ca3',
      internal: false,
    },
    {
      label: t('E-mail'),
      icon: 'envelope' as IconName,
      url: `mailto:${data.profile.email}`,
      color: '#427569',
      internal: true,
    },
    {
      label: t('Pesquisa'),
      icon: 'graduation-cap' as IconName,
      url: '#pesquisa',
      color: '#507556',
      internal: true,
    },
    {
      label: t('Projetos'),
      icon: 'code' as IconName,
      url: '#projetos',
      color: '#88689e',
      internal: true,
    },
    {
      label: t('Documentação'),
      icon: 'file-lines' as IconName,
      url: data.profile.documentation,
      color: '#ad626d',
      internal: false,
    },
  ];
  return (
    <>
      <title>
        {language === 'en'
          ? 'Luigi Scofano | AI, data and software'
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
            {data.navigation.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={
                  {
                    '--nav-color': ['#d6ac37', '#548eb7', '#6e9675', '#977bad'][
                      index % 4
                    ],
                  } as React.CSSProperties
                }
                className={active === item.id ? 'active' : ''}
                aria-current={active === item.id ? 'location' : undefined}
                onClick={() => {
                  followSection(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="sidebar-links" aria-label={t('Links de Luigi')}>
            {profileLinks.map((item) => (
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
              <a href={sitePath('/atualizar/')}>{t('Como atualizar')}</a>
              <span aria-hidden="true"> · </span>
              <a href={sitePath('/creditos/')}>{t('Créditos')}</a>
            </p>
          </div>
        </aside>
        <main id="conteudo" tabIndex={-1} inert={menuOpen}>
          <section id="sobre" tabIndex={-1} className="section about-section">
            <div className="editorial-topline">
              <span>{t('Portfólio · pesquisa, dados e software')}</span>
              <span>{data.updated}</span>
            </div>
            <div className="language-row">
              <label htmlFor="portfolio-language">{t('Idioma')}</label>
              <select
                id="portfolio-language"
                value={language}
                onChange={(event) =>
                  changeLanguage(event.target.value as 'pt' | 'en')
                }
              >
                <option value="pt" lang="pt-BR">
                  Português
                </option>
                <option value="en" lang="en">
                  English
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
                  <a className="primary-link" href="#projetos">
                    {t('Explorar projetos')}{' '}
                    <Icon
                      name="arrow-up"
                      size={13}
                      className="cta-arrow-down"
                    />
                  </a>
                  <a href="#trajetoria">
                    {t('Minha trajetória')}{' '}
                    <Icon
                      name="arrow-up"
                      size={13}
                      className="cta-arrow-right"
                    />
                  </a>
                </div>
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
            <div className="featured-heading">
              <h2>{t('Pesquisa & projetos em destaque')}</h2>
              <a href="#projetos">
                {t('Ver todos')}{' '}
                <Icon name="arrow-up" size={13} className="cta-arrow" />
              </a>
            </div>
            {featuredTupi && (
              <div className="research-feature">
                <div className="research-feature-title">
                  <p className="feature-eyebrow">
                    {t('Iniciação científica · IME-USP')}
                  </p>
                  <h3>Tupi Antigo</h3>
                  <p>{t('Linguagem, memória e computação.')}</p>
                  <p className="research-process">
                    {t('Fonte original')}{' '}
                    <Icon
                      name="arrow-up"
                      size={13}
                      className="cta-arrow-right"
                    />{' '}
                    {t('OCR & PLN')}{' '}
                    <Icon
                      name="arrow-up"
                      size={13}
                      className="cta-arrow-right"
                    />{' '}
                    {t('Revisão humana')}
                  </p>
                </div>
                <div className="research-feature-description">
                  <h4>
                    {t('Tecnologia a serviço')}
                    <br />
                    {t('da pesquisa linguística.')}
                  </h4>
                  <p>{featuredTupi?.summary}</p>
                  <a href={featuredTupi?.url} {...external}>
                    {t('Explorar a pesquisa')}{' '}
                    <Icon name="arrow-up" size={13} className="cta-arrow" />
                  </a>
                </div>
              </div>
            )}
            {featuredTupi && <ResearchExample language={language} />}
            <div className="featured-secondary">
              {featuredIntuicao && (
                <article className="intuicao-feature">
                  <img
                    src={sitePath(featuredIntuicao.image)}
                    alt={featuredIntuicao.imageAlt}
                    width="154"
                    height="171"
                  />
                  <div>
                    <p className="feature-eyebrow">
                      {t('IA clássica & jogos')}
                    </p>
                    <h3>Intuição</h3>
                    <p>
                      {t('Jogos de lógica e estratégia.')}
                      <br />
                      {t('IA no próprio navegador.')}
                    </p>
                    <a
                      href={featuredIntuicao.demo || featuredIntuicao.url}
                      {...external}
                    >
                      {t('Experimentar')}{' '}
                      <Icon name="arrow-up" size={13} className="cta-arrow" />
                    </a>
                    <a
                      href={featuredIntuicao.url}
                      {...external}
                      className="feature-code-link"
                    >
                      {t('Ver código')} <ExternalIcon />
                    </a>
                  </div>
                </article>
              )}
              <article className="beyond-feature">
                <p className="feature-eyebrow">
                  {t('Pesquisa, desenvolvimento & ensino')}
                </p>
                <h3>{t('Além do código.')}</h3>
                <p>
                  {t(
                    'Pesquisa no IME-USP, museu virtual no LASSu-USP e ensino de jiu-jítsu. Uma trajetória entre áreas.',
                  )}
                </p>
                <a
                  href="#mais-sobre-mim"
                  onClick={() => {
                    const details = document.getElementById(
                      'mais-sobre-mim',
                    ) as HTMLDetailsElement | null;
                    if (details) {
                      details.open = true;
                      details.querySelector('summary')?.focus();
                    }
                  }}
                >
                  {t('Mais sobre mim')}{' '}
                  <Icon name="arrow-up" size={13} className="cta-arrow-right" />
                </a>
              </article>
            </div>
            <details id="mais-sobre-mim" className="about-details">
              <summary>{t('Mais sobre mim')}</summary>
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
            <SectionTitle>{t('Projetos e recursos')}</SectionTitle>
            <p className="section-intro">
              {t(
                'Aplicações, experimentos e materiais que desenvolvi ou dos quais participei. Cada projeto apresenta sua autoria, documentação e limites.',
              )}
            </p>
            <div className="filter-row">
              <div
                className="filters"
                aria-label={t('Filtrar projetos por área')}
              >
                {['Todos', 'IA', 'Dados', 'Software', 'Hardware'].map(
                  (item) => (
                    <button
                      key={item}
                      aria-pressed={filter === item}
                      className={filter === item ? 'selected' : ''}
                      onClick={() => setFilter(item)}
                    >
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
          </section>
          <section
            id="pesquisa"
            tabIndex={-1}
            className="section research-section"
          >
            <SectionTitle>{t('Pesquisa')}</SectionTitle>
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
                    <a className="inline-link" href={item.url} {...external}>
                      {item.linkLabel}
                      <ExternalIcon />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="research-note">
              {t(
                'Código e metodologia estão disponíveis nos links de cada iniciativa.',
              )}
            </p>
          </section>
          <section
            id="formacao"
            tabIndex={-1}
            className="section education-section"
          >
            <SectionTitle>{t('Formação')}</SectionTitle>
            <div className="education-accordion">
              {data.education.map((item, index) => (
                <div
                  className={`education-item ${educationOpen === index ? 'expanded' : ''}`}
                  key={item.title}
                >
                  <h3>
                    <button
                      onClick={() =>
                        setEducationOpen(educationOpen === index ? null : index)
                      }
                      aria-expanded={educationOpen === index}
                      aria-controls={`education-panel-${index}`}
                      id={`education-heading-${index}`}
                    >
                      {item.title}
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
          </section>
          <section
            id="trajetoria"
            tabIndex={-1}
            className="section experience-section"
          >
            <SectionTitle>{t('Trajetória')}</SectionTitle>
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
          </section>
          <section
            id="contato"
            tabIndex={-1}
            className="section contact-section"
          >
            <SectionTitle>{t('Contato')}</SectionTitle>
            <p className="section-intro">{data.contactText}</p>
            {/* Cada endereço mantém seu próprio feedback de cópia. */}
            {[
              { label: t('E-mail profissional'), email: data.profile.email },
              { label: t('E-mail pessoal'), email: data.profile.personalEmail },
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
                  <span className="copy-feedback" aria-live="polite">
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
              <span>
                © 2026 {data.profile.name}
                <br />
                {data.updated}
              </span>
            </span>
            <a href={sitePath('/atualizar/')}>
              {t('Como atualizar este portfólio')}
            </a>
            <a href="#sobre" aria-label={t('Voltar ao início')}>
              <Icon name="arrow-up" size={16} />
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
