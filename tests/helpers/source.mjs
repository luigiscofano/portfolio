import fs from 'node:fs';
const files = [
  'app/page.tsx',
  'components/portfolio/profile-name.tsx',
  'components/portfolio/project-card.tsx',
  'hooks/use-portfolio-language.ts',
  'hooks/use-section-navigation.ts',
  'hooks/use-email-copy.ts',
];
export const readActiveSource = () =>
  files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
// Verificações estruturais não devem falhar por uma quebra de linha do formatador.
export const includesCode = (source, fragment) =>
  source.replace(/\s+/g, '').includes(fragment.replace(/\s+/g, ''));
