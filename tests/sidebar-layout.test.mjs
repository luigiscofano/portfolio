import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('sidebar ancora na viewport sem centralização do shell', () => {
  const css = fs.readFileSync('app/globals.css', 'utf8');
  const sidebar = css.match(/\.sidebar \{([^}]+)\}/)[1];
  const shell = css.match(/\.site-shell \{([^}]+)\}/)[1];
  assert.ok(sidebar.includes('left: 0;'));
  assert.ok(sidebar.includes('position: fixed;'));
  assert.ok(shell.includes('width: 100%;'));
  assert.ok(shell.includes('margin: 0;'));
  assert.ok(!shell.includes('auto'));
  assert.ok(css.includes('max-width: calc(100% - 45px)'));
  assert.ok(css.includes('transform: translateX(-100%)'));
});

test('modelo de larguras mantém espaço do conteúdo e não extrapola viewport', () => {
  for (const viewport of [
    320, 390, 768, 769, 1024, 1200, 1440, 1600, 1920, 2560, 3840,
  ]) {
    const shell = viewport;
    const sidebar = viewport <= 768 ? 0 : viewport * 0.2066;
    const content = shell - sidebar;
    assert.ok(content > 0);
    assert.ok(sidebar + content <= viewport);
  }
});

test('proporção desktop constante corresponde à referência sem limites artificiais', () => {
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.ok(css.includes('--sidebar-width: 20.66vw'));
  assert.ok(css.includes('@media (min-width: 769px)'));
  assert.ok(Math.abs(1365 * 0.2066 - 282) < 1);
  for (const viewport of [769, 1024, 1365, 1920, 2560, 3840]) {
    assert.ok(Math.abs((viewport * 0.2066) / viewport - 0.2066) < 0.00001);
  }
});
