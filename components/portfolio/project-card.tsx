import { ProjectArt } from './project-art';
import cases from '@/content/project-cases.json';
import type data from '@/content/portfolio.json';
import institutions from '@/content/institutions.json';
import { sitePath } from '@/lib/site-path';
import { Icon, ExternalIcon, type IconName } from './icon';
import { externalLink as external } from '@/lib/portfolio';
import { projectPresentation } from '@/lib/project-presentation.mjs';
import type { Translate } from '@/hooks/use-portfolio-language';
type Project = (typeof data.projects)[number] & {
  imageKind?: string;
  institutionBrand?: string;
  institutionSource?: string;
  imageCrop?: {
    width: number;
    height: number;
    imageWidth: number;
    left: number;
    top: number;
  };
};

// Novos IDs continuam utilizáveis antes de receberem um ícone e uma cor próprios.
export function ProjectCard({
  project,
  t,
  language,
}: {
  project: Project;
  t: Translate;
  language: 'pt' | 'en' | 'es';
}) {
  const presentation = projectPresentation(project.id);
  const caseStudy = Object.hasOwn(cases[language], project.id)
    ? cases[language][project.id as keyof typeof cases.pt]
    : null;
  return (
    <article
      className="resource-card"
      style={
        {
          '--card-color': presentation.color,
        } as React.CSSProperties
      }
    >
      {project.image && project.imageKind === 'logo' && (
        <a className="project-logo" href={project.imageSource} {...external}>
          <span
            className={project.imageCrop ? 'project-logo-crop' : undefined}
            style={
              project.imageCrop
                ? {
                    width: project.imageCrop.width,
                    height: project.imageCrop.height,
                  }
                : undefined
            }
          >
            <img
              src={sitePath(project.image)}
              alt={project.imageAlt}
              width={project.imageWidth}
              height={project.imageHeight}
              loading="lazy"
              style={
                project.imageCrop
                  ? {
                      width: project.imageCrop.imageWidth,
                      left: project.imageCrop.left,
                      top: project.imageCrop.top,
                    }
                  : undefined
              }
            />
          </span>
        </a>
      )}
      {project.imageKind !== 'logo' &&
        project.institutionBrand &&
        Object.hasOwn(institutions, project.institutionBrand) && (
          <div className="project-institution">
            <div className="institution-marks">
              {institutions[
                project.institutionBrand as keyof typeof institutions
              ].map((mark) => (
                <a href={mark.source} {...external} key={mark.image}>
                  <img
                    src={sitePath(mark.image)}
                    alt={mark.label}
                    width={mark.width}
                    height={mark.height}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
            <a href={project.institutionSource} {...external}>
              {language === 'en'
                ? 'Academic context'
                : language === 'es'
                  ? 'Contexto académico'
                  : 'Contexto acadêmico'}{' '}
              · {project.institutionBrand === 'poli' ? 'Poli-USP' : 'IME-USP'}
            </a>
          </div>
        )}
      <div className="resource-heading">
        <Icon name={presentation.icon as IconName} size={29} />
        <span>{project.type}</span>
      </div>
      <h3>
        <a href={project.url} {...external}>
          {project.name}
          <ExternalIcon />
        </a>
      </h3>
      <p>{project.summary}</p>
      <ul className="tags" aria-label={t('Tecnologias')}>
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="resource-links">
        <a href={project.url} {...external}>
          <Icon name="github" size={15} />
          {t('Repositório')}
        </a>
        {project.demo && (
          <a href={project.demo} {...external}>
            {project.demoLabel}
            <ExternalIcon />
          </a>
        )}
      </div>
      {caseStudy && (
        <details className="project-details">
          <summary>
            <span className="control-label">
              <Icon name="flask" size={15} />
              {t('Estudo de caso')}
            </span>{' '}
            <span className="details-symbol" aria-hidden="true" />
          </summary>
          <div className="project-details-body">
            {caseStudy.map((item) => (
              <div key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
                <a href={item.url} {...external}>
                  {t('Evidência e documentação')}
                  <ExternalIcon />
                </a>
              </div>
            ))}
          </div>
        </details>
      )}
      <ProjectArt projectId={project.id} language={language} />
      <details className="project-details">
        <summary>
          <span className="control-label">
            <Icon name="file-lines" size={15} />
            {t('Detalhes, autoria e limites')}
          </span>{' '}
          <span className="details-symbol" aria-hidden="true" />
        </summary>
        <div className="project-details-body">
          <p>{project.details}</p>
          <h4>{t('Contribuição e autoria')}</h4>
          <p>{project.contribution}</p>
          <h4>{t('Escopo e limites')}</h4>
          <p>{project.limitation}</p>
          {project.image && project.imageKind !== 'logo' && (
            <figure>
              <a href={project.imageSource} {...external}>
                <img
                  src={sitePath(project.image)}
                  alt={project.imageAlt}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  loading="lazy"
                />
              </a>
              <figcaption>{project.caption || project.imageAlt}</figcaption>
            </figure>
          )}
        </div>
      </details>
    </article>
  );
}
