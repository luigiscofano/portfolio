// Preview the exported site at http://localhost:4173/portfolio/.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8" };
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/portfolio") { res.writeHead(301, { Location: "/portfolio/" }); res.end(); return; }
    if (!url.pathname.startsWith("/portfolio/")) throw new Error("Not found");
    const file = path.resolve(root, decodeURIComponent(url.pathname.slice("/portfolio/".length)) || ".");
    if (file !== root && !file.startsWith(root + path.sep)) throw new Error("Not found");
    const info = await stat(file);
    if (info.isDirectory() && !url.pathname.endsWith("/")) { res.writeHead(301, { Location: url.pathname + "/" + url.search }); res.end(); return; }
    const target = info.isDirectory() ? path.join(file, "index.html") : file;
    res.writeHead(200, { "Content-Type": types[path.extname(target)] || "application/octet-stream" });
    res.end(await readFile(target));
  } catch { res.writeHead(404); res.end("Not found"); }
}).listen(Number(process.env.PORT || 4173), "127.0.0.1", () => console.log("Preview: http://127.0.0.1:" + (process.env.PORT || 4173) + "/portfolio/"));
