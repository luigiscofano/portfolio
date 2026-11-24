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
  const labels = {
    pt: ['Imagens reais do projeto', 'Fonte da imagem', 'Abrir PNG completo'],
    en: ['Actual project images', 'Image source', 'Open full-size PNG'],
    es: [
      'Imágenes reales del proyecto',
      'Fuente de la imagen',
      'Abrir PNG completo',
    ],
  }[language];
  return (
    <details className="project-details project-gallery">
      <summary>
        <span>{labels[0]}</span>
        <span className="details-symbol" aria-hidden="true" />
      </summary>
      {!items.length && (
        <p className="gallery-empty">
          {
            {
              pt: 'Ainda não há imagens reais verificadas disponíveis para este projeto. O repositório reúne os materiais e a documentação existentes.',
              en: 'No verified actual images are available for this project yet. The repository contains the existing materials and documentation.',
              es: 'Todavía no hay imágenes reales verificadas disponibles para este proyecto. El repositorio reúne los materiales y la documentación existentes.',
            }[language]
          }
        </p>
      )}
      <div className="project-gallery-items">
        {items.map((item) => (
          <figure key={item.image}>
            <div
              className={
                item.crop === 'top'
                  ? 'project-capture-top'
                  : item.crop === 'menu'
                    ? 'project-capture-menu'
                    : undefined
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
              {item.crop === 'menu' && (
                <>
                  <a href={sitePath(item.image)} {...externalLink}>
                    {labels[2]}
                  </a>
                  {' · '}
                </>
              )}
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
