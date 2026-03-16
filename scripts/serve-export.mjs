import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 3000);
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath && rawBasePath !== "/" ? rawBasePath.replace(/\/+$/, "") : "";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".map": "application/octet-stream",
};

const safeResolve = (root, urlPath) => {
  const joined = path.join(root, urlPath);
  const resolved = path.resolve(joined);
  const resolvedRoot = path.resolve(root);
  if (!resolved.startsWith(resolvedRoot)) return null;
  return resolved;
};

const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(body);
};

const serveFile = async (res, filePath) => {
  try {
    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) {
      return serveFile(res, path.join(filePath, "index.html"));
    }

    const ext = path.extname(filePath).toLowerCase();
    res.statusCode = 200;
    res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
    res.setHeader("Content-Length", String(stat.size));
    res.setHeader("Accept-Ranges", "bytes");

    fs.createReadStream(filePath).pipe(res);
  } catch {
    // Fall back to exported 404 page if present.
    const notFound = path.join(outDir, "404.html");
    try {
      const stat = await fs.promises.stat(notFound);
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Content-Length", String(stat.size));
      fs.createReadStream(notFound).pipe(res);
    } catch {
      send(res, 404, "Not found");
    }
  }
};

const stripBasePath = (urlPath) => {
  if (!basePath) return urlPath;
  if (urlPath === "/") return urlPath;
  if (urlPath === basePath) return "/";
  if (urlPath.startsWith(basePath + "/")) return urlPath.slice(basePath.length) || "/";
  return null;
};

const server = http.createServer(async (req, res) => {
  const rawUrl = req.url ?? "/";
  const pathname = decodeURIComponent(rawUrl.split("?")[0] ?? "/");

  // In a GitHub Pages project site, the root is effectively mounted at basePath.
  // For local preview convenience, redirect / -> <basePath>/ when basePath is set.
  if (basePath && (pathname === "/" || pathname === "")) {
    res.statusCode = 302;
    res.setHeader("Location", `${basePath}/`);
    res.end();
    return;
  }

  const stripped = stripBasePath(pathname);
  if (stripped == null) {
    await serveFile(res, path.join(outDir, "404.html"));
    return;
  }

  const filePath = safeResolve(outDir, stripped);
  if (!filePath) {
    send(res, 400, "Bad request");
    return;
  }

  await serveFile(res, filePath);
});

server.listen(port, "0.0.0.0", () => {
  const baseMsg = basePath ? ` (basePath: ${basePath})` : "";
  // eslint-disable-next-line no-console
  console.log(`[export-preview] Serving ${outDir} on http://localhost:${port}${baseMsg}`);
});
