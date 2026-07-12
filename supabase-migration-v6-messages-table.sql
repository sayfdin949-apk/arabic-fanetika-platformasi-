-- Arab Fonetika Platformasi — Chat xabarlari jadval migratsiyasi v6
-- Supabase dashboard → SQL Editor da ishga tushiring
--
-- NIMA O'ZGARDI: avvalgi yondashuvda barcha xabarlar afp_kv jadvalida
-- bitta katta JSONB massiv sifatida saqlanardi. Bu:
--   - bir vaqtda ikki kishi yozsa, bitta xabar yo'qolib ketishiga olib kelardi
--     (o'qib-o'zgartirib-yozish irqi sharti)
--   - Realtime imkoniyatini bloklab qo'yardi
-- Yangi yondashuvda har bir xabar alohida qator — irqi sharti yo'q,
-- Supabase Realtime bilan darhol yangilanish ishlaydi.

CREATE TABLE IF NOT EXISTS afp_messages (
  id               TEXT PRIMARY KEY,
  guruh_id         TEXT NOT NULL,
  user_id          TEXT NOT NULL,
  user_ism_familya TEXT NOT NULL,
  user_role        TEXT NOT NULL,
  matn             TEXT NOT NULL,
  vaqt             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reply_to         JSONB
);

-- Indeks: guruh bo'yicha so'rovlar tezlashadi
CREATE INDEX IF NOT EXISTS afp_messages_guruh_id_vaqt
  ON afp_messages (guruh_id, vaqt ASC);

ALTER TABLE afp_messages ENABLE ROW LEVEL SECURITY;

-- Anon foydalanuvchi ham o'qishi va yozishi mumkin (xuddi afp_kv kabi)
CREATE POLICY "afp_messages_all" ON afp_messages
  FOR ALL USING (true) WITH CHECK (true);

-- Supabase Realtime: INSERT/UPDATE/DELETE hodisalari websocket orqali uzatiladi
ALTER PUBLICATION supabase_realtime ADD TABLE afp_messages;
