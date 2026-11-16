import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const gallery = JSON.parse(
  fs.readFileSync('content/project-gallery.json', 'utf8'),
);
test('real gallery has sources, translations and valid bounded assets', () => {
  assert.ok(gallery.length >= 14);
  assert.ok(
    gallery.filter((item) => item.projectId === 'intuicao').length >= 5,
  );
  for (const item of gallery) {
    assert.ok(fs.existsSync('public' + item.image));
    assert.ok(item.source.startsWith('https://github.com/luigiscofano/'));
    for (const lang of ['pt', 'en', 'es'])
      assert.ok(item.caption[lang].length > 25);
    assert.ok(item.width > 0 && item.height > 0);
    assert.ok(fs.statSync('public' + item.image).size < 200000);
  }
  assert.ok(!gallery.some((i) => i.projectId === 'tetris-c'));
});
test('gallery and card motion preserve progressive disclosure and reduced motion', () => {
  const component = fs.readFileSync(
    'components/portfolio/project-gallery.tsx',
    'utf8',
  );
  assert.ok(component.includes('<details'));
  assert.ok(component.includes('loading="lazy"'));
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.ok(css.includes('.resource-card:focus-within'));
  assert.ok(css.includes('(prefers-reduced-motion: reduce)'));
  assert.ok(css.includes('--section-accent: #946c19'));
  assert.ok(css.includes('.project-capture-top'));
});

test('resume downloads are available without opening about disclosure', () => {
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  const resume = page.indexOf('className="resume-links"');
  const about = page.indexOf('<details id="mais-sobre-mim"');
  assert.ok(resume > 0 && resume < about);
  assert.ok(page.includes('download={resume.downloadName}'));
});
test('every project has an honest gallery section and compact touch controls', () => {
  const component = fs.readFileSync(
    'components/portfolio/project-gallery.tsx',
    'utf8',
  );
  assert.ok(!component.includes('if (!items.length) return null'));
  assert.ok(component.includes('Ainda não há imagens reais verificadas'));
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.ok(css.includes('@media (pointer: coarse), (max-width: 999px)'));
});
