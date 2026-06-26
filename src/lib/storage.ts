/* Saqlash qatlami (abstraksiya)
 *
 * Maqsad: frontend faqat `store` interfeysiga bog'lanadi.
 * Hozir: LocalStorageAdapter (brauzer localStorage).
 * Bosqich B: xuddi shu interfeysni amalga oshiruvchi SupabaseAdapter ulanadi —
 * frontend kodi o'zgarmaydi, faqat shu fayldagi `store` almashadi.
 */

export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  del(key: string): Promise<void>;
}

const PREFIX = "afp:"; // "Arab Fonetika Platformasi" namespace

/** Brauzer localStorage asosidagi adapter (lokal bosqich). */
export class LocalStorageAdapter implements StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* kvota/private rejimda jim o'tamiz */
    }
  }

  async del(key: string): Promise<void> {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch {
      /* ignore */
    }
  }
}

/** Ilova bo'ylab yagona saqlash nuqtasi. Bosqich B'da bu qator almashadi. */
export const store: StorageAdapter = new LocalStorageAdapter();
