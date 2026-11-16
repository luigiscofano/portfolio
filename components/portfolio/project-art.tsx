import { sitePath } from '@/lib/site-path';
import { externalLink } from '@/lib/portfolio';

const copy = {
  pt: {
    title: 'Biblioteca visual do Intuição',
    manual: 'Manual da marca',
    fauna: 'Os 15 mascotes',
    art: 'Ilustrações originais dos jogos',
    caption: 'Identidade e arte do projeto, sem capturas de interface.',
  },
  en: {
    title: 'Intuição visual library',
    manual: 'Brand manual',
    fauna: 'The 15 mascots',
    art: 'Original game illustrations',
    caption: 'Project identity and artwork, not interface screenshots.',
  },
  es: {
    title: 'Biblioteca visual de Intuição',
    manual: 'Manual de marca',
    fauna: 'Los 15 personajes',
    art: 'Ilustraciones originales de los juegos',
    caption: 'Identidad y arte del proyecto, sin capturas de interfaz.',
  },
};
const root = 'https://github.com/luigiscofano/intuicao/blob/main/';
const illustrations = [
  {
    name: 'Estalo',
    file: 'intuicao-estalo-aiij.svg',
    source: 'dist/platform-assets/estalo-aiij-aprovada.svg',
  },
  {
    name: 'Renovo',
    file: 'intuicao-renovo-aiij.svg',
    source: 'dist/platform-assets/renovo-aiij-c1.svg',
  },
  {
    name: 'Foz',
    file: 'intuicao-foz-aiij.svg',
    source: 'dist/platform-assets/foz-aiij-mosaico.svg',
  },
];

export function ProjectArt({
  projectId,
  language,
}: {
  projectId: string;
  language: 'pt' | 'en' | 'es';
}) {
  if (projectId !== 'intuicao') return null;
  const text = copy[language];
  return (
    <details className="project-details project-art-library">
      <summary>
        <span>{text.title}</span>
        <span className="details-symbol" aria-hidden="true" />
      </summary>
      <div className="project-details-body">
        <p>{text.caption}</p>
        <a
          className="brand-manual-card"
          href={`${root}docs/identidade/manual/Intuicao_Manual_da_Marca_2026.pdf`}
          {...externalLink}
        >
          <img
            src={sitePath('/images/projects/art/intuicao-manual-marca.png')}
            alt={text.manual}
            loading="lazy"
          />
          <span>{text.manual} · PDF ↗</span>
        </a>
        <h4>{text.art}</h4>
        <div className="project-art-strip">
          {illustrations.map((art) => (
            <figure key={art.name}>
              <a href={root + art.source} {...externalLink}>
                <img
                  src={sitePath('/images/projects/art/' + art.file)}
                  alt={`${text.art}: ${art.name}`}
                  width="180"
                  height="140"
                  loading="lazy"
                />
              </a>
              <figcaption>{art.name}</figcaption>
            </figure>
          ))}
        </div>
        <details className="mascot-art-disclosure">
          <summary>{text.fauna}</summary>
          <a
            href={`${root}docs/identidade/manual/assets/Intuicao_Icones_Fauna_Frente_Verde_sobre_Branco.png`}
            {...externalLink}
          >
            <img
              className="mascot-art-sheet"
              src={sitePath('/images/projects/art/intuicao-fauna-original.png')}
              alt={text.fauna}
              loading="lazy"
            />
          </a>
        </details>
      </div>
    </details>
  );
}
