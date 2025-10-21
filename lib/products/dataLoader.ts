export async function loadBrandData(brandKey: string) {
  // brandKey examples: "life", "mediqua", "medisoul", "kyron", "tycoon"
  switch (brandKey) {
    case "life":
      return (await import("../../data/products/life.json")).default;
    case "mediqua":
      return (await import("../../data/products/mediqua.json")).default;
    case "medisoul":
      return (await import("../../data/products/medisoul.json")).default;
    case "kyron":
      return (await import("../../data/products/kyron.json")).default;
    case "tycoon":
      return (await import("../../data/products/tycoon.json")).default;
    default:
      return null;
  }
}

