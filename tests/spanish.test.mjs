import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const load = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const pt = load('content/portfolio.json');
const es = load('content/portfolio.es.json');

test('Spanish preserves full catalog, facts, resources and data structure', () => {
  const immutable = new Set([
    'id',
    'category',
    'url',
    'demo',
    'image',
    'imageSource',
    'photo',
    'github',
    'linkedin',
    'email',
    'personalEmail',
    'source',
    'documentation',
    'sourcesDate',
    'institutionBrand',
    'institutionSource',
    'imageKind',
    'downloadName',
    'backgroundSize',
    'backgroundPosition',
  ]);
  function compare(a, b, key = '') {
    assert.equal(typeof a, typeof b, key);
    if (Array.isArray(a)) {
      assert.equal(a.length, b.length, key);
      a.forEach((v, i) => compare(v, b[i], key));
    } else if (a && typeof a === 'object') {
      assert.deepEqual(Object.keys(a), Object.keys(b));
      Object.keys(a).forEach((k) => compare(a[k], b[k], k));
    } else if (typeof a !== 'string' || immutable.has(key))
      assert.equal(a, b, key);
  }
  compare(pt, es);
  assert.match(es.profile.intro, /estudiante/);
  assert.match(
    es.experience.find((e) => e.company === 'BTG Pactual').text,
    /front-end/,
  );
  assert.match(
    es.profile.aboutOverview[1],
    /Tereza Cristina Melo de Brito Carvalho/,
  );
  assert.match(
    es.projects.find((p) => p.id === 'gesturelab').limitation,
    /No se entrenan modelos propios/,
  );
  assert.match(es.profile.resume.label, /inglés/);
  assert.match(es.profile.resumePt.label, /portugués/);
});

test('Spanish covers every UI key, case study and diagram', () => {
  const en = load('content/ui.en.json'),
    labels = load('content/ui.es.json');
  for (const key of Object.keys(en)) assert.ok(labels[key], key);
  const cases = load('content/project-cases.json');
  assert.deepEqual(Object.keys(cases.pt), Object.keys(cases.es));
  for (const id of Object.keys(cases.pt)) {
    assert.equal(cases.pt[id].length, cases.es[id].length);
    cases.pt[id].forEach((row, i) =>
      assert.equal(row.url, cases.es[id][i].url),
    );
  }
  for (const locale of ['pt', 'en', 'es'])
    assert.match(cases[locale].intuicao[1].text, /19/);
  for (const section of ['formacao', 'trajetoria', 'pesquisa']) {
    const svg = fs.readFileSync(
      'public/images/sections/' + section + '-es.svg',
      'utf8',
    );
    assert.ok(svg.includes('<title>'));
    assert.ok(!/<script|onload=|javascript:/i.test(svg));
  }
});

test('Spanish selection persists and credits retain the selected language', () => {
  const hook = fs.readFileSync('hooks/use-portfolio-language.ts', 'utf8');
  assert.match(hook, /portfolio.es.json/);
  assert.match(hook, /localStorage.getItem/);
  assert.match(hook, /localStorage.setItem/);
  assert.match(hook, /searchParams.set/);
  assert.match(hook, /preferred === ['"]es['"]/);
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.match(page, /value="es" lang="es"/);
  assert.ok(page.includes('{item.description}'));
  const credits = load('content/credits.json');
  assert.deepEqual(Object.keys(credits.pt), Object.keys(credits.es));
  assert.equal(credits.es.items.length, credits.pt.items.length);
  assert.ok(
    fs
      .readFileSync('app/creditos/page.tsx', 'utf8')
      .includes("'?lang=' + language"),
  );
});
