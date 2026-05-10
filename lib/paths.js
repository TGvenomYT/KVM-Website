export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path) {
  if (!path) return basePath || "/";
  if (/^https?:\/\//i.test(path)) return path;
  return `${basePath}${path.startsWith("/") ? path : "/" + path}`;
}
