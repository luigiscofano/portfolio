import fs from 'node:fs';
const out = 'public/images/sections';
fs.mkdirSync(out, { recursive: true });
const esc = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[c],
  );
for (const lang of ['pt', 'en']) {
  const data = JSON.parse(
    fs.readFileSync(`content/portfolio${lang === 'en' ? '.en' : ''}.json`),
  );
  const maps = {
    formacao: data.education.map((x) => ({
      title: x.title,
      detail: x.institution,
    })),
    trajetoria: data.experience.map((x) => ({
      title: x.company,
      detail: x.area,
    })),
    pesquisa: data.research.map((x) => ({
      title: x.institution,
      detail: x.title,
    })),
  };
  for (const [section, items] of Object.entries(maps)) {
    const height = items.length * 110 + 24;
    const rows = items
      .map((item, i) => {
        const y = 12 + i * 110;
        const color = ['#3d7095', '#28665e', '#72518c'][i % 3];
        return `<g transform="translate(12 ${y})"><rect width="536" height="96" rx="4" fill="#f5f7f9"/><rect width="4" height="96" fill="${color}"/><circle cx="30" cy="30" r="10" fill="${color}"/><text x="52" y="36" font-family="Arial,sans-serif" font-size="20" font-weight="bold" fill="#253344">${esc(item.title)}</text><text x="24" y="70" font-family="Arial,sans-serif" font-size="15" fill="#465569">${esc(item.detail)}</text></g>`;
      })
      .join('');
    fs.writeFileSync(
      `${out}/${section}-${lang}.svg`,
      `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="${height}" viewBox="0 0 560 ${height}"><title>${section === 'formacao' ? 'Formação' : section === 'trajetoria' ? 'Áreas de atuação' : 'Pesquisa'}</title>${rows}</svg>`,
    );
  }
}
