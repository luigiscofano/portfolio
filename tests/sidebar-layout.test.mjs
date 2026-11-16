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
    320, 390, 768, 769, 1024, 1200, 1440, 1600, 1920, 2560,
  ]) {
    const shell = Math.min(viewport, 1600);
    const sidebar = viewport <= 768 ? 0 : viewport <= 1200 ? 240 : 282;
    const content = shell - sidebar;
    assert.ok(content > 0);
    assert.ok(sidebar + content <= viewport);
  }
});
