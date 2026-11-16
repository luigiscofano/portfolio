import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('restaura animações anteriores e amplia apenas seções principais', () => {
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.ok(css.includes('/* Microinterações reforçam'));
  assert.ok(!css.includes(':where(button, a[href], summary, select)'));
  assert.ok(!css.includes('filter: brightness(1.1)'));
  assert.ok(css.includes('.section-disclosure > summary:hover'));
  assert.ok(css.includes('transform: scale(1.01)'));
  assert.ok(
    css.includes(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    ),
  );
  assert.ok(css.includes('(prefers-reduced-motion: reduce)'));
});
