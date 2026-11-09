/** Public assets and plain anchors do not receive Next.js basePath automatically. */
export const basePath = "/portfolio";
export function sitePath(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
}
