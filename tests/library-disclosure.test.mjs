import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('biblioteca mostra três setas sem abrir as seções inicialmente', () => {
  const component = fs.readFileSync(
    'components/portfolio/project-art.tsx',
    'utf8',
  );
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.equal(
    (component.match(/className="mascot-disclosure-arrow"/g) || []).length,
    3,
  );
  assert.ok(!component.includes('<details open'));
  assert.ok(
    css.includes(
      '.mascot-art-disclosure[open] > summary .mascot-disclosure-arrow',
    ),
  );
  assert.ok(css.includes('.mascot-art-disclosure > summary:focus-visible'));
});
