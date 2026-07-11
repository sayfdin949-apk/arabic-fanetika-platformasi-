/* Kontent tiplari */

export interface NazVazifa {
  id: number;
  savol: string;
  variantlar: string[];
  togri: number;
}
export interface NazDars {
  id: number;
  nomi: string;
  icon: string;
  color: string;
  mavzu: string;
  vazifalar: NazVazifa[];
}

export interface AmalMaxraj { h: string; mx: string; iz: string; }
export interface AmalSifat { h: string; sf: string[]; }
export interface AmalShakl { h: string; m: string; b: string; o: string; x: string; iz: string; }
export interface AmalHarakat {
  h: string; f: string; k: string; d: string; s: string;
  of: string; ok: string; od: string; os: string;
}
export interface AmalSoz { ar: string; oq: string; tr: string; h: string; }
export interface AmalOqish { ar: string; iz: string; }
export interface AmalYozish { t: string; m: string; }
export interface AmalTest { s: string; v: string[]; t: number; }
export interface AmalBob {
  id: number;
  harflar: string[];
  nomlar: string[];
  /** Sifat-juftlik mavzusi (masalan "Jahr va Hams") — mavjud bo'lsa,
   * bob sarlavhasi sifatida harf nomlari o'rniga shu ko'rsatiladi. */
  mavzu?: string;
  maxraj: AmalMaxraj[];
  sifatlar: AmalSifat[];
  shakllar: AmalShakl[];
  harakatlar: AmalHarakat[];
  sozlar: AmalSoz[];
  oqish: AmalOqish[];
  yozish: AmalYozish[];
  uyvazifa: string[];
  test: AmalTest[];
}

export interface DasturKun { k: string; d: string; m: string; }
export interface DasturHafta { h: number; mavzu: string; kunlar: DasturKun[]; imtihon: string; }
export interface DasturOy {
  oy: number;
  nomi: string;
  color: string;
  imtihon: string;
  haftalar: DasturHafta[];
}
