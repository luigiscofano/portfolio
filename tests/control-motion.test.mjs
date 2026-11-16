import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('microinterações abrangem controles nativos e respeitam acessibilidade', () => {
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.ok(css.includes(':where(button, a[href], summary, select)'));
  assert.ok(css.includes(":not(:disabled):not([aria-disabled='true'])"));
  assert.ok(css.includes(':focus-visible'));
  assert.ok(css.includes('(hover: hover) and (pointer: fine)'));
  assert.ok(css.includes('(prefers-reduced-motion: reduce)'));
  assert.ok(css.includes('transition: none'));
});
