export const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

export function getPrimaryProductImage(p: { image?: string; variants?: { image: string }[] }) {
  if (p?.image) return p.image;
  if (Array.isArray(p?.variants) && p.variants.length > 0) {
    return p.variants[0].image;
  }
  return ''; // fallback: empty string (caller can handle "no image")
}