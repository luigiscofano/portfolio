import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (file) =>
  fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8');
test('static export is configured for a GitHub project site', () => {
  const config = read('next.config.ts');
  assert.match(config, /output: "export"/);
  assert.match(config, /basePath: "\/portfolio"/);
  assert.match(config, /trailingSlash: true/);
  assert.ok(fs.existsSync(new URL('../public/.nojekyll', import.meta.url)));
});
test('raw anchors and assets use the project prefix', () => {
  for (const file of [
    'app/page.tsx',
    'app/atualizar/page.tsx',
    'app/creditos/page.tsx',
  ]) {
    const source = read(file);
    assert.doesNotMatch(source, /(?:href|src)="\/(?!\/)/);
    assert.match(source, /sitePath/);
  }
  assert.doesNotMatch(read('app/globals.css'), /url\(['"]?\/(?!portfolio\/)/);
  assert.match(read('app/layout.tsx'), /\/portfolio\/favicon.svg/);
});
test('publication workflow is manual and uploads only static output', () => {
  const workflow = read('.github/workflows/pages.yml');
  assert.match(workflow, /workflow_dispatch:/);
  assert.doesNotMatch(workflow, /^  (push|pull_request):/m);
  assert.match(workflow, /path: out/);
});
