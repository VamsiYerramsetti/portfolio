const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const basePath = rawBasePath.endsWith("/") && rawBasePath !== "/" ? rawBasePath.slice(0, -1) : rawBasePath;

export function withBasePath(url: string): string {
  if (!basePath) return url;
  if (!url.startsWith("/")) return url;
  return `${basePath}${url}`;
}
