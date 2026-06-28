-- Arab Fonetika Platformasi — Supabase jadval migratsiyasi
-- Supabase dashboard → SQL Editor da ishga tushiring

CREATE TABLE IF NOT EXISTS afp_kv (
  key        TEXT PRIMARY KEY,
  value      JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hozircha ochiq siyosat (kelajakda RLS qo'shiladi)
ALTER TABLE afp_kv ENABLE ROW LEVEL SECURITY;

CREATE POLICY "afp_open" ON afp_kv
  FOR ALL
  USING (true)
  WITH CHECK (true);
