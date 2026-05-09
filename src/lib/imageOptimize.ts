/**
 * Optimize Supabase Storage image URLs by routing them through the
 * image transformation endpoint (resizing + quality control).
 * Falls back to the original URL for non-Supabase or already-transformed URLs.
 */
export function optimizeImage(
  url: string | null | undefined,
  opts: { width?: number; quality?: number } = {}
): string | undefined {
  if (!url) return undefined;
  try {
    const { width = 1600, quality = 70 } = opts;
    // Convert /storage/v1/object/public/ -> /storage/v1/render/image/public/
    if (url.includes("/storage/v1/object/public/")) {
      const transformed = url.replace(
        "/storage/v1/object/public/",
        "/storage/v1/render/image/public/"
      );
      const sep = transformed.includes("?") ? "&" : "?";
      return `${transformed}${sep}width=${width}&quality=${quality}&resize=cover`;
    }
    return url;
  } catch {
    return url || undefined;
  }
}
