import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

// Confere a saída real: nenhum link local pode apontar para um arquivo ausente.
const root = path.resolve('out');
const prefix = '/portfolio/';
const checked = new Set();
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (!/\.(html|css)$/.test(file)) continue;
    const text = await readFile(file, 'utf8');
    const urls = [...text.matchAll(/(?:href|src)="([^"]+)"/g)].map(
      (match) => match[1],
    );
    urls.push(
      ...[...text.matchAll(/url\(['"]?([^)'"\s]+)/g)].map((match) => match[1]),
    );
    for (const url of urls) {
      if (!url.startsWith('/') || url.startsWith('//')) continue;
      const pathname = decodeURIComponent(
        new URL(url, 'https://example.invalid').pathname,
      );
      assert.ok(pathname.startsWith(prefix), `Prefixo ausente: ${pathname}`);
      const local = path.resolve(root, pathname.slice(prefix.length));
      assert.ok(
        local === root || local.startsWith(root + path.sep),
        `Caminho fora da exportação: ${url}`,
      );
      const info = await stat(local);
      if (info.isDirectory())
        assert.ok((await stat(path.join(local, 'index.html'))).isFile());
      checked.add(pathname);
    }
    if (file.endsWith('.html')) {
      const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map(
        (match) => match[1],
      );
      assert.equal(ids.length, new Set(ids).size, `IDs duplicados em ${file}`);
    }
  }
}
for (const route of [
  'index.html',
  'atualizar/index.html',
  'creditos/index.html',
  '.nojekyll',
])
  assert.ok((await stat(path.join(root, route))).isFile(), route);
await walk(root);
console.log(
  `Exportação verificada: três páginas, IDs únicos e ${checked.size} recursos/rotas locais.`,
);
