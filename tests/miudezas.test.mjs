import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('Miudezas has a consistent localized card and six sourced screenshots', () => {
  for (const suffix of ['', '.en', '.es']) {
    const data = JSON.parse(
      fs.readFileSync(`content/portfolio${suffix}.json`, 'utf8'),
    );
    const project = data.projects.find((item) => item.id === 'miudezas');
    assert.equal(project.demo, 'https://luigiscofano.github.io/Miudezas/');
    assert.equal(project.imageKind, 'logo');
    assert.equal(project.showImagePreview, false);
    assert.ok(fs.existsSync('public' + project.image));
  }
  const gallery = JSON.parse(
    fs.readFileSync('content/project-gallery.json', 'utf8'),
  ).filter((item) => item.projectId === 'miudezas');
  assert.equal(gallery.length, 6);
  assert.equal(new Set(gallery.map((item) => item.image)).size, 6);
  for (const item of gallery) {
    assert.ok(fs.existsSync('public' + item.image));
    assert.match(
      item.source,
      /Miudezas\/blob\/[a-f0-9]{40}\/docs\/imagens\/telas/,
    );
    for (const language of ['pt', 'en', 'es'])
      assert.ok(item.caption[language]);
  }
});
