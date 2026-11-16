import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { projectPresentation } from '../lib/project-presentation.mjs';
import { includesCode } from './helpers/source.mjs';
const icons = JSON.parse(fs.readFileSync('content/icons.json', 'utf8'));
test('Known and new project IDs always receive a valid icon and color', () => {
  for (const id of [
    'intuicao',
    'tupi',
    'kaggle',
    'gesturelab',
    'pokedex',
    'labdig',
    'new-project',
    'toString',
    '__proto__',
  ]) {
    const presentation = projectPresentation(id);
    assert.ok(icons[presentation.icon]);
    assert.match(presentation.color, /^#[0-9a-f]{6}$/i);
  }
  assert.deepEqual(projectPresentation('new-project'), {
    icon: 'code',
    color: '#477b58',
  });
});
test('Optional highlights and clipboard cleanup have explicit safeguards', () => {
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.ok(includesCode(page, 'data.projects.filter('));
  assert.ok(includesCode(page, 'featured.map('));
  assert.doesNotMatch(page, /find\([^\n]*\)!/);
  const clipboard = fs.readFileSync('hooks/use-email-copy.ts', 'utf8');
  assert.ok(includesCode(clipboard, 'clearTimeout(timeout.current)'));
  assert.ok(includesCode(clipboard, 'current !== request.current'));
  assert.ok(includesCode(clipboard, 'request.current += 1'));
});

test('progressive sections preserve every destination and open direct links', () => {
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.equal((page.match(/className="section-disclosure"/g) || []).length, 5);
  assert.ok(page.includes('data.profile.aboutOverview.map'));
  assert.ok(page.includes('data.profile.resumePt'));
  const hero = page.slice(
    page.indexOf('className="hero-actions"'),
    page.indexOf('className="hero-portrait"'),
  );
  assert.equal((hero.match(/<a\b/g) || []).length, 1);
  const nav = fs.readFileSync('hooks/use-section-navigation.ts', 'utf8');
  assert.ok(nav.includes('disclosure.open = true'));
  assert.ok(nav.includes('openHashSection'));
});

test('control icons retain textual labels and decorative SVG semantics', () => {
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.ok(page.includes('sectionIcons[item.id]'));
  assert.ok(page.includes('filterIcons[item]'));
  for (const file of ['app/creditos/page.tsx']) {
    const source = fs.readFileSync(file, 'utf8');
    assert.ok(source.includes('return-arrow'));
    assert.ok(source.includes('Voltar ao portfólio'));
  }
  const icon = fs.readFileSync('components/portfolio/icon.tsx', 'utf8');
  assert.ok(icon.includes('aria-hidden="true"'));
  assert.ok(icon.includes('focusable="false"'));
});

test('maintenance guide is repository-only, not a visitor route', () => {
  assert.ok(fs.existsSync('docs/COMO-ATUALIZAR.md'));
  assert.equal(fs.existsSync('app/atualizar/page.tsx'), false);
  assert.ok(
    !fs
      .readFileSync('app/page.tsx', 'utf8')
      .includes("sitePath('/atualizar/')"),
  );
});

test('section visual maps are local, bilingual and have no executable content', () => {
  for (const section of ['formacao', 'trajetoria', 'pesquisa'])
    for (const lang of ['pt', 'en']) {
      const svg = fs.readFileSync(
        'public/images/sections/' + section + '-' + lang + '.svg',
        'utf8',
      );
      assert.match(svg, /<svg/);
      assert.doesNotMatch(
        svg,
        /<script|<foreignObject|onload=|https?:\/\/(?!www.w3.org)/i,
      );
    }
});

test('every public project has a sourced local image with honest alt text', () => {
  for (const lang of ['portfolio.json', 'portfolio.en.json']) {
    const data = JSON.parse(fs.readFileSync('content/' + lang, 'utf8'));
    assert.equal(data.projects.length, 14);
    for (const p of data.projects) {
      assert.ok(p.image && p.imageAlt && p.imageSource, p.id);
      assert.ok(p.imageWidth > 0 && p.imageHeight > 0, p.id);
      assert.ok(fs.existsSync('public' + p.image), p.id);
    }
  }
});
