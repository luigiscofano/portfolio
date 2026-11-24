'use client';
import { Icon } from '@/components/portfolio/icon';
import { sitePath } from '@/lib/site-path';
import { usePortfolioLanguage } from '@/hooks/use-portfolio-language';
import credits from '@/content/credits.json';

export default function Credits() {
  const { language } = usePortfolioLanguage();
  const copy = credits[language];
  const links = [
    [
      { href: sitePath('/licenses/Quicksand-OFL.txt'), label: copy.links[0] },
      {
        href: sitePath('/licenses/PlayfairDisplay-OFL.txt'),
        label: copy.links[1],
      },
    ],
    [
      { href: 'https://fontawesome.com/', label: 'Font Awesome' },
      {
        href: sitePath('/licenses/FontAwesome-LICENSE.txt'),
        label: copy.links[2],
      },
    ],
    [],
    [
      {
        href: 'https://github.com/luigiscofano/intuicao/blob/main/dist/sintonia/assets/chibi-user-roster.svg',
        label: copy.links[3],
      },
      {
        href: 'https://github.com/luigiscofano/intuicao/blob/main/docs/recursos/declaracao-autoria.md',
        label: copy.links[4],
      },
    ],
    [],
    [],
  ];
  return (
    <article className="update-page">
      <title>{copy.title} | Luigi Scofano</title>
      <a className="return-link" href={sitePath('/') + '?lang=' + language}>
        <Icon name="arrow-up" size={16} className="return-arrow" />
        {copy.back}
      </a>
      <h1>{copy.title}</h1>
      <p>{copy.copyright}</p>
      <p>
        {copy.intro}{' '}
        <a href="https://arturjordao.github.io/">{copy.reference}</a>.
      </p>
      <ul className="credit-list">
        {copy.items.map(([title, text], index) => (
          <li key={title}>
            <strong>{title}:</strong> {text}{' '}
            {(links[index] ?? []).map((link, i) => (
              <span key={link.href}>
                {i > 0 ? ' · ' : ''}
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </li>
        ))}
      </ul>
      <p>{copy.end}</p>
    </article>
  );
}
