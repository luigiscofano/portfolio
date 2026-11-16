import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

test('Rota 001 preserves the approved artwork and localized brand metadata', () => {
  const bytes = readFileSync('public/images/projects/pokedex-rota-001.png');
  assert.equal(
    createHash('sha256').update(bytes).digest('hex'),
    'dcfcba18024824b1c9b50e0ffca573dd0129d8ce550325479e94769c6af15272',
  );
  for (const language of ['', '.en', '.es']) {
    const content = JSON.parse(
      readFileSync(`content/portfolio${language}.json`, 'utf8'),
    );
    const project = content.projects.find(({ id }) => id === 'pokedex');
    assert.equal(project.name, 'Pokédex · Rota 001');
    assert.equal(project.image, '/images/projects/pokedex-rota-001.png');
    assert.equal(project.imageKind, 'logo');
    assert.equal(project.imageWidth, project.imageHeight);
    assert.ok(project.imageAlt.includes('Rota 001'));
    assert.equal(project.showImagePreview, false);
  }
});
