// Arabic diacritics (harakat/tashkeel): U+064B–U+065F
export function stripHarakat(text: string): string {
  return text.replace(/[ً-ٟ]/g, "");
}

const B1_PLUS = new Set(["B1", "B2", "C1", "C2"]);

export function shouldStrip(daraja: string | null): boolean {
  return daraja ? B1_PLUS.has(daraja) : false;
}
