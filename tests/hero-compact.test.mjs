import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('introdução compacta preserva texto, foto e layout móvel', () => {
  const css = fs.readFileSync('app/globals.css', 'utf8');
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.ok(css.includes('/* A primeira dobra fica mais leve'));
  assert.ok(css.includes('@media (min-width: 951px)'));
  assert.ok(css.includes('aspect-ratio: 467/390'));
  assert.ok(css.includes('max-width: 360px'));
  assert.ok(page.includes('{data.profile.hero.description}'));
  assert.ok(page.includes('src={sitePath(data.profile.photo)}'));
});
