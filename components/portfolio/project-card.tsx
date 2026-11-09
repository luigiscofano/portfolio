import type data from '@/content/portfolio.json';
import { sitePath } from '@/lib/site-path';
import { Icon, ExternalIcon, type IconName } from './icon';
import { externalLink as external } from '@/lib/portfolio';
import { projectPresentation } from '@/lib/project-presentation.mjs';
import type { Translate } from '@/hooks/use-portfolio-language';
type Project = (typeof data.projects)[number];

// Novos IDs continuam utilizáveis antes de receberem um ícone e uma cor próprios.
export function ProjectCard({
  project,
  t,
}: {
  project: Project;
  t: Translate;
}) {
  const presentation = projectPresentation(project.id);
  return (
    <article
      className="resource-card"
      style={
        {
          '--card-color': presentation.color,
        } as React.CSSProperties
      }
    >
      {project.showImagePreview && project.image && (
        <figure className="project-preview">
          <a href={project.imageSource} {...external}>
            <img
              src={sitePath(project.image)}
              alt={project.imageAlt}
              width={project.imageWidth}
              height={project.imageHeight}
              loading="lazy"
              decoding="async"
            />
          </a>
          <figcaption>
            {project.caption}{' '}
            <a href={project.imageSource} {...external}>
              {t('Fonte')}
              <ExternalIcon />
            </a>
          </figcaption>
        </figure>
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
      <details className="project-details">
        <summary>
          {t('Detalhes, autoria e limites')}{' '}
          <span className="details-symbol" aria-hidden="true" />
        </summary>
        <div className="project-details-body">
          <p>{project.details}</p>
          <h4>{t('Contribuição e autoria')}</h4>
          <p>{project.contribution}</p>
          <h4>{t('Escopo e limites')}</h4>
          <p>{project.limitation}</p>
          {project.image && !project.showImagePreview && (
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
              <figcaption>{project.caption}</figcaption>
            </figure>
          )}
        </div>
      </details>
    </article>
  );
}
