import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('escala estrutural desktop segue referência sem reduzir o documento por zoom', () => {
  const css = fs.readFileSync('app/globals.css', 'utf8');
  const desktop = css.slice(css.indexOf('/* Escala estrutural desktop'));
  assert.ok(desktop.includes('@media (min-width: 769px)'));
  assert.ok(desktop.includes('--desktop-unit: 0.073260073vw'));
  assert.ok(desktop.includes('.site-shell'));
  assert.ok(desktop.includes('max-width: none'));
  assert.ok(!/\bzoom\s*:/.test(desktop));
  assert.ok(desktop.includes('max(14px, calc(15 * var(--desktop-unit)))'));
  assert.ok(desktop.includes('minmax(0, 1.2fr) minmax(0, 1fr)'));
});

test('modelo proporcional: margens, foto e colunas cabem em larguras desktop', () => {
  for (const width of [769, 1024, 1180, 1365, 1600, 1920, 2560, 3840]) {
    const unit = width / 1365;
    const sidebar = width * 0.2066;
    const inner = width - sidebar - 120 * unit;
    const gap = 24 * unit;
    const photoColumn = (inner - gap) / 2.2;
    const photo = 360 * unit;
    assert.ok(photo <= photoColumn);
    assert.ok(inner > 0);
    assert.ok(
      Math.abs((sidebar + 60 * unit) / width - (0.2066 + 60 / 1365)) < 0.00001,
    );
    assert.ok(Math.max(14, 15 * unit) >= 14);
  }
});
