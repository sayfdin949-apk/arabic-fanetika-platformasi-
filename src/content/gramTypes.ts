export interface GramJadvalRow {
  arabcha: string;
  oqilishi: string;
  tarjima: string;
  izoh?: string;
}

export interface GramQoida {
  sarlavha: string;
  tavsif: string;
  jadval?: GramJadvalRow[];
  misol?: string[];
}

export interface GramMaterial {
  arabcha: string;
  oqilishi: string;
  tarjima: string;
  izoh?: string;
}

export interface GramKitoba {
  topshiriq: string;
  misol?: string;
}

export interface GramTest {
  savol: string;
  variantlar: string[];
  togri: number;
}

export interface GramDars {
  id: number;
  nomi: string;
  daraja: "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  icon: string;
  rang: string;
  mavzu: string;
  qoida: GramQoida[];
  qiroa: GramMaterial[];
  istima: GramMaterial[];
  kitoba: GramKitoba[];
  test: GramTest[];
}

export interface GramDarajaKun {
  kuni: number;
  mavzu: string;
  darsId?: number;
  tur: "dars" | "tahlil" | "dam" | "imtihon";
}

export interface GramDarajaHafta {
  hafta: number;
  kunlar: GramDarajaKun[];
}

export interface GramDarajaInfo {
  kod: string;
  nomi: string;
  rang: string;
  davomiyligi: string;
  oylar: number;
  haftalar: number;
  jami_kunlar: number;
  darslar: number;
  jadval: GramDarajaHafta[];
}
