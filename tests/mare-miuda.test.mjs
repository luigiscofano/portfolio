import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { matchesProject } from '../lib/project-search.mjs';
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

test('Maré keeps its playable release separate from the multilingual showcase', () => {
  for (const suffix of ['', '.en', '.es']) {
    const project = read(`content/portfolio${suffix}.json`).projects.find(
      (p) => p.id === 'mare-miuda',
    );
    assert.equal(
      project.url,
      'https://github.com/luigiscofano/mare-miuda-entre-ilhas',
    );
    assert.equal(project.demo, '');
    assert.equal(project.showImagePreview, false);
    assert.equal(project.imageKind, 'logo');
    assert.match(project.summary, /8/);
    assert.match(project.summary, /231/);
    assert.ok(
      matchesProject(
        project,
        'Software',
        suffix === '.en' ? 'Tiny Tide' : 'mare miuda',
      ),
    );
    assert.ok(!matchesProject(project, 'IA', ''));
  }
  const card = fs.readFileSync('components/portfolio/project-card.tsx', 'utf8');
  assert.match(card, /id=\{`projeto-\$\{project.id\}`\}/);
  assert.match(card, /project.url \?/);
  assert.match(card, /Repositório/);
});

test('only the approved original PNGs are published and captions explain their origin', () => {
  const hashes = {
    'mundo-01-baixa.png':
      '3f93a690085c916b244a9dbab60b8fa423bd8a0a5403a07e013b9900f277e8b8',
    'porto.png':
      '255521be2b890430445477f7f8020858e7117bbe79106439b16f729fb25d09c4',
    'logo-oficial.png':
      '3d96700e26c84adb3d222ade23c741fea37a3828606e415c5a949eec8e762e7c',
    'mundo-01-alta.png':
      'bd06e165cd7b1ab9f1a416be6425cfe1a95f165c294c33eec589846bdb85b572',
    'mundo-04-baixa.png':
      'bccb5f60b4a43239ab57b92aeef37e9b012f456047e4bf3c684797290e340c6a',
    'mundo-08-baixa.png':
      '4339e8a64fbf443963eaf80b02f2d726b82895bb10cbf541bf3375cc21c21072',
  };
  const dir = 'public/images/projects/mare-miuda/';
  assert.deepEqual(fs.readdirSync(dir).sort(), Object.keys(hashes).sort());
  for (const [name, hash] of Object.entries(hashes)) {
    assert.equal(
      createHash('sha256')
        .update(fs.readFileSync(dir + name))
        .digest('hex'),
      hash,
    );
  }
  const gallery = read('content/project-gallery.json').filter(
    (p) => p.projectId === 'mare-miuda',
  );
  assert.equal(gallery.length, 5);
  assert.equal(gallery[0].crop, 'menu');
  for (const item of gallery) {
    assert.ok(
      item.source.startsWith('https://github.com/luigiscofano/portfolio/'),
    );
    for (const lang of ['pt', 'en', 'es'])
      assert.ok(item.caption[lang].length > 50);
  }
  assert.match(gallery[0].caption.pt, /não uma captura de execução/);
  assert.match(gallery[0].caption.en, /not a runtime screenshot/);
  assert.ok(
    gallery.every(
      (item) =>
        !item.source.includes(
          'https://github.com/luigiscofano/mare-miuda-entre-ilhas',
        ),
    ),
  );
});

test('the close-up keeps the original image reachable and the case study is localized', () => {
  const gallery = fs.readFileSync(
    'components/portfolio/project-gallery.tsx',
    'utf8',
  );
  assert.match(gallery, /Abrir PNG completo/);
  assert.match(gallery, /href=\{sitePath\(item.image\)\}/);
  for (const locale of ['pt', 'en', 'es']) {
    const rows = read('content/project-cases.json')[locale]['mare-miuda'];
    assert.equal(rows.length, 4);
    assert.ok(rows.every((row) => row.url.endsWith('/docs/MARE-MIUDA.md')));
  }
});
