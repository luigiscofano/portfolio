/** Imagens e âncoras HTML precisam receber o prefixo do GitHub Pages explicitamente. */
export const basePath = '/portfolio';
export function sitePath(path: string): string {
  return path.startsWith('/') && !path.startsWith('//')
    ? `${basePath}${path}`
    : path;
}
