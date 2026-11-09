import { readActiveSource, includesCode } from './helpers/source.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
const pt = JSON.parse(fs.readFileSync('content/portfolio.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('content/portfolio.en.json', 'utf8'));
test('English content preserves structure, links, assets and factual scope', () => {
  const unchanged = new Set([
    'id',
    'category',
    'url',
    'demo',
    'image',
    'imageSource',
    'photo',
    'github',
    'linkedin',
    'email',
    'personalEmail',
    'source',
    'documentation',
    'sourcesDate',
  ]);
  function walk(a, b, key = '') {
    assert.equal(typeof a, typeof b, key);
    if (Array.isArray(a)) {
      assert.equal(a.length, b.length, key);
      a.forEach((v, i) => walk(v, b[i], key));
    } else if (a && typeof a === 'object') {
      assert.deepEqual(Object.keys(a), Object.keys(b));
      Object.keys(a).forEach((k) => walk(a[k], b[k], k));
    } else if (typeof a !== 'string' || unchanged.has(key))
      assert.equal(a, b, key);
  }
  walk(pt, en);
  assert.equal(en.profile.aboutOverview.length, 5);
  assert.ok(
    en.profile.aboutOverview[1].includes(
      'coordinated by Professor Tereza Cristina Melo de Brito Carvalho',
    ),
  );
  assert.ok(
    en.projects
      .find((p) => p.id === 'gesturelab')
      .limitation.includes('No custom models are trained'),
  );
});
test('Language selection and accessible navigation remain explicit', () => {
  const page = readActiveSource();
  assert.ok(includesCode(page, 'htmlFor="portfolio-language"'));
  assert.ok(includesCode(page, 'document.documentElement.lang='));
  assert.ok(includesCode(page, "localStorage.setItem('portfolio-language'"));
  assert.ok(includesCode(page, "url.searchParams.set('lang',value)"));
  assert.ok(includesCode(page, 'id="conteudo" tabIndex={-1}'));
  assert.ok(includesCode(page, "event.key==='Escape'"));
  assert.ok(includesCode(page, 'focus({preventScroll:true})'));
});
test('Main CSS palettes meet their text and graphic contrast thresholds', () => {
  const css = fs
    .readFileSync('app/globals.css', 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  function property(selector, name) {
    const block = blocks.find((match) => match[1].trim() === selector);
    assert.ok(block, selector);
    const value = block[2]
      .split(';')
      .map((line) => line.trim())
      .find((line) => line.startsWith(`${name}:`))
      ?.slice(name.length + 1)
      .trim();
    assert.ok(value, `${selector} / ${name}`);
    if (value.startsWith('var(')) return property(':root', value.slice(4, -1));
    return value;
  }
  const luminance = (value) => {
    let h = value.replace('#', '');
    if (h.length === 3) h = [...h].map((c) => c + c).join('');
    return h
      .match(/../g)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  };
  for (const [fgSelector, fgProperty, bgSelector, bgProperty, minimum] of [
    ['body', 'color', 'body', 'background', 4.5],
    ['a', 'color', 'body', 'background', 4.5],
    ['a', 'color', '.sidebar', 'background', 4.5],
    ['.tags li', 'color', '.tags li', 'background', 4.5],
    ['.primary-link', 'color', '.primary-link', 'background', 4.5],
    ['.intuicao-feature', 'color', '.intuicao-feature', 'background', 4.5],
    ['.beyond-feature', 'color', '.beyond-feature', 'background', 4.5],
    ['.hero-subtitle', 'color', 'body', 'background', 3],
    ['.timeline-icon', 'color', '.timeline-icon', 'background', 3],
  ]) {
    const a = luminance(property(fgSelector, fgProperty)),
      b = luminance(property(bgSelector, bgProperty));
    assert.ok(
      (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= minimum,
      `${fgSelector} / ${bgSelector}`,
    );
  }
});
test('Localized title has one owner and approved PDF remains downloadable', () => {
  const page = readActiveSource();
  const layout = fs.readFileSync('app/layout.tsx', 'utf8');
  assert.ok(includesCode(page, "<title>{language==='en'?"));
  assert.ok(!includesCode(page, 'document.title='));
  assert.ok(!layout.includes('title:'));
  assert.equal(pt.profile.resume.url, en.profile.resume.url);
  const pdf = fs.readFileSync(`public${pt.profile.resume.url}`);
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  assert.equal(pdf.length, 43686);
  assert.equal(
    createHash('sha256').update(pdf).digest('hex'),
    '49b07b4cbf364e2cda982e3f82388610a0b070f6eb12d1ff6f8c643bc689d13d',
  );
  assert.ok(includesCode(page, 'download={resume.downloadName}'));
});

test('Portuguese resume is the reviewed native document', () => {
  assert.equal(pt.profile.resumePt.url, en.profile.resumePt.url);
  const docx = fs.readFileSync(`public${pt.profile.resumePt.url}`);
  assert.equal(
    createHash('sha256').update(docx).digest('hex'),
    '576f67b1633b6c6f9e7bb5321be6103b469233a00139bf6d4e0c2de3bd020f42',
  );
});
