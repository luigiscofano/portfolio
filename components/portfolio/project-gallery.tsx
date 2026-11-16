import gallery from '@/content/project-gallery.json';
import { sitePath } from '@/lib/site-path';
import { externalLink } from '@/lib/portfolio';

export function ProjectGallery({
  projectId,
  language,
}: {
  projectId: string;
  language: 'pt' | 'en' | 'es';
}) {
  const items = gallery.filter((item) => item.projectId === projectId);
  if (!items.length) return null;
  const labels = {
    pt: ['Imagens reais do projeto', 'Fonte da imagem'],
    en: ['Actual project images', 'Image source'],
    es: ['Imágenes reales del proyecto', 'Fuente de la imagen'],
  }[language];
  return (
    <details className="project-details project-gallery">
      <summary>
        <span>{labels[0]}</span>
        <span className="details-symbol" aria-hidden="true" />
      </summary>
      <div className="project-gallery-items">
        {items.map((item) => (
          <figure key={item.image}>
            <div
              className={
                item.crop === 'top' ? 'project-capture-top' : undefined
              }
            >
              <img
                src={sitePath(item.image)}
                alt={item.caption[language]}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              {item.caption[language]}{' '}
              <a href={item.source} {...externalLink}>
                {labels[1]}
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </details>
  );
}
