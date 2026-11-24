import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { matchesProject } from '../lib/project-search.mjs';
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

test('Maré keeps its private release separate from the multilingual showcase', () => {
  for (const suffix of ['', '.en', '.es']) {
    const project = read(`content/portfolio${suffix}.json`).projects.find(
      (p) => p.id === 'mare-miuda',
    );
    assert.equal(project.sourceAccess, 'private');
    assert.equal(project.url, '');
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
  assert.match(card, /Código privado/);
});

test('only three approved original PNGs are published and captions explain their origin', () => {
  const hashes = {
    'mundo-01-baixa.png':
      '3f93a690085c916b244a9dbab60b8fa423bd8a0a5403a07e013b9900f277e8b8',
    'porto.png':
      '255521be2b890430445477f7f8020858e7117bbe79106439b16f729fb25d09c4',
    'logo-oficial.png':
      '3d96700e26c84adb3d222ade23c741fea37a3828606e415c5a949eec8e762e7c',
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
  assert.equal(gallery.length, 2);
  for (const item of gallery) {
    assert.ok(
      item.source.startsWith('https://github.com/luigiscofano/portfolio/'),
    );
    for (const lang of ['pt', 'en', 'es'])
      assert.ok(item.caption[lang].length > 50);
  }
  assert.match(gallery[0].caption.pt, /não uma captura de execução/);
  assert.match(gallery[0].caption.en, /not a runtime screenshot/);
  for (const file of [
    'portfolio.json',
    'portfolio.en.json',
    'portfolio.es.json',
    'project-gallery.json',
  ]) {
    assert.ok(
      !fs
        .readFileSync('content/' + file, 'utf8')
        .includes('github.com/luigiscofano/mare-miuda-entre-ilhas'),
    );
  }
});
