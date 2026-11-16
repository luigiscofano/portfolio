import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('normal entry starts closed at top while explicit fragments remain supported', () => {
  const hook = fs.readFileSync('hooks/use-section-navigation.ts', 'utf8');
  assert.ok(hook.includes("window.history.scrollRestoration = 'manual'"));
  assert.ok(hook.includes('if (window.location.hash)'));
  assert.ok(hook.includes('openHashSection();'));
  assert.ok(hook.includes('item.open = false'));
  assert.ok(hook.includes("behavior: 'instant'"));
  assert.ok(hook.includes('if (event?.persisted) return'));
  assert.ok(hook.includes("removeEventListener('pageshow'"));
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.equal(
    (page.match(/className="section-toggle" aria-hidden="true"/g) || []).length,
    5,
  );
  assert.ok(!page.includes('<details open'));
  const css = fs.readFileSync('app/globals.css', 'utf8');
  assert.ok(css.includes("content: '−'"));
  assert.ok(
    !css.includes('transform: rotate(45deg);\n}\n.section-disclosure-content'),
  );
});
