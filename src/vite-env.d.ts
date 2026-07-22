/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Build vaqtida vite.config.ts define() orqali beriladi (git qisqa SHA).
declare const __APP_VERSION__: string;
