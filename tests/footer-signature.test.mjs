import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('assinatura maior preserva arte original e permite quebra móvel', () => {
  const css = fs.readFileSync('app/globals.css', 'utf8');
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.ok(css.includes('width: 118px'));
  assert.ok(css.includes('width: 94px'));
  assert.ok(css.includes('flex-wrap: wrap'));
  assert.ok(page.includes('src={sitePath(data.visualSignature.image)}'));
});
