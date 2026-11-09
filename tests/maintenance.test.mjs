import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { projectPresentation } from '../lib/project-presentation.mjs';
import { includesCode } from './helpers/source.mjs';
const icons = JSON.parse(fs.readFileSync('content/icons.json', 'utf8'));
test('Known and new project IDs always receive a valid icon and color', () => {
  for (const id of [
    'intuicao',
    'tupi',
    'kaggle',
    'gesturelab',
    'pokedex',
    'labdig',
    'new-project',
    'toString',
    '__proto__',
  ]) {
    const presentation = projectPresentation(id);
    assert.ok(icons[presentation.icon]);
    assert.match(presentation.color, /^#[0-9a-f]{6}$/i);
  }
  assert.deepEqual(projectPresentation('new-project'), {
    icon: 'code',
    color: '#477b58',
  });
});
test('Optional highlights and clipboard cleanup have explicit safeguards', () => {
  const page = fs.readFileSync('app/page.tsx', 'utf8');
  assert.ok(includesCode(page, 'featuredTupi &&'));
  assert.ok(includesCode(page, 'featuredIntuicao &&'));
  assert.doesNotMatch(page, /find\([^\n]*\)!/);
  const clipboard = fs.readFileSync('hooks/use-email-copy.ts', 'utf8');
  assert.ok(includesCode(clipboard, 'clearTimeout(timeout.current)'));
  assert.ok(includesCode(clipboard, 'current !== request.current'));
  assert.ok(includesCode(clipboard, 'request.current += 1'));
});
