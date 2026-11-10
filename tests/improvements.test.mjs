import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
const pt = JSON.parse(fs.readFileSync('content/portfolio.json'));
const en = JSON.parse(fs.readFileSync('content/portfolio.en.json'));
const cases = JSON.parse(fs.readFileSync('content/project-cases.json'));
test('case studies pair factual PT/EN content and evidence', () => {
  for (const id of ['intuicao', 'tupi', 'gesturelab']) {
    assert.equal(cases.pt[id].length, 5);
    assert.deepEqual(
      cases.pt[id].map((x) => x.url),
      cases.en[id].map((x) => x.url),
    );
    for (const row of cases.pt[id])
      assert.match(row.url, /^https:\/\/github.com\/luigiscofano\//);
  }
});
test('both resume buttons use PDFs and preserved Portuguese source is unchanged', () => {
  for (const d of [pt, en]) {
    assert.match(d.profile.resume.url, /\.pdf$/);
    assert.match(d.profile.resumePt.url, /\.pdf$/);
  }
  assert.equal(
    createHash('sha256')
      .update(
        fs.readFileSync('public/documents/luigi-scofano-curriculo-pt.docx'),
      )
      .digest('hex'),
    '576f67b1633b6c6f9e7bb5321be6103b469233a00139bf6d4e0c2de3bd020f42',
  );
});
test('OCR example never claims measured or historical results', () => {
  const s = fs.readFileSync(
    'components/portfolio/research-example.tsx',
    'utf8',
  );
  assert.ok(s.includes('Exemplo fictício em português.'));
  assert.ok(s.includes('não apresenta resultados medidos'));
  assert.ok(s.includes('PROCEDENCIA.md'));
});

test('personal link opens details without losing keyboard focus to native hash navigation', () => {
  const source = fs.readFileSync('app/page.tsx', 'utf8').replace(/\s+/g, '');
  assert.ok(source.includes('event.preventDefault()'));
  assert.ok(source.includes("history.pushState(null,'','#mais-sobre-mim')"));
  assert.ok(
    source.includes(
      "details.querySelector('summary')?.focus({preventScroll:true})",
    ),
  );
});

test('Intuicao preview uses original icons rather than a catalog page', () => {
  const project = pt.projects.find((project) => project.id === 'intuicao');
  assert.equal(project.image, '/images/intuicao-icones-frente.png');
  assert.equal(project.imageWidth, 1079);
  assert.equal(project.imageHeight, 1458);
  assert.ok(project.imageSource.endsWith('/fauna-green-original.png'));
});
