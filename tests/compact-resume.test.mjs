import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('currículos ficam disponíveis sem abrir Mais sobre mim', () => {
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.ok(page.indexOf('className="resume-links"') < page.indexOf('<details id="mais-sobre-mim"'));
  assert.ok(page.includes('download={resume.downloadName}'));
  assert.ok(page.includes('data.profile.resumePt'));
});

test('controles compactos preservam alvos de toque', () => {
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.ok(css.includes('@media (pointer: coarse), (max-width: 999px)'));
  assert.ok(css.includes('min-height: 44px'));
});
