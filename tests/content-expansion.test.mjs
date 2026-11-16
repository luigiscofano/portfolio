import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('microinteractions preserve keyboard focus and reduced motion', () => {
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.ok(css.includes('(hover: hover) and (pointer: fine)'));
  assert.ok(css.includes('(prefers-reduced-motion: no-preference)'));
  assert.ok(css.includes('(prefers-reduced-motion: reduce)'));
  assert.ok(css.includes('.copy-email'));
  assert.ok(css.includes(':focus-visible'));
});
test('education and experience retain substantive verified descriptions', () => {
  for (const locale of ['portfolio.json', 'portfolio.en.json']) {
    const d = JSON.parse(fs.readFileSync('content/' + locale, 'utf8'));
    assert.equal(d.education.length, 3);
    assert.ok(d.education.every((e) => e.description.length > 90));
    assert.equal(d.experience.length, 6);
    assert.ok(
      d.experience
        .find((e) => e.company === 'BTG Pactual')
        .text.includes('front-end'),
    );
  }
});

test('Intuicao gallery uses original artwork and no interface previews', () => {
  const source = fs.readFileSync(
    'components/portfolio/project-art.tsx',
    'utf8',
  );
  assert.ok(source.includes('Manual da marca'));
  for (const name of [
    'intuicao-manual-marca.png',
    'intuicao-fauna-original.png',
    'intuicao-estalo-aiij.svg',
    'intuicao-renovo-aiij.svg',
    'intuicao-foz-aiij.svg',
  ])
    assert.ok(fs.existsSync('public/images/projects/art/' + name));
  assert.ok(source.includes('<details'));
  assert.ok(
    source.includes('https://github.com/luigiscofano/intuicao/blob/main/'),
  );
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.ok(css.includes('(min-width: 1000px) and (pointer: fine)'));
  assert.ok(css.includes('.project-art-strip'));
});
