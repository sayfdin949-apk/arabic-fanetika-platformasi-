import type { Role } from "../auth/types";
import { LocalChatApi } from "./chatApi.local";
import { SupabaseChatApi } from "./chatApi.supabase";

export interface ChatMessage {
  id: string;
  guruhId: string;
  userId: string;
  userIsmFamilya: string;
  userRole: Role;
  matn: string;
  vaqt: string;
  replyTo?: { id: string; matn: string; userIsmFamilya: string };
}

export interface ChatApi {
  getMessages(guruhId: string): Promise<ChatMessage[]>;
  sendMessage(msg: Omit<ChatMessage, "id" | "vaqt">): Promise<void>;
  deleteMessage(guruhId: string, msgId: string): Promise<void>;
  setTyping(guruhId: string, userId: string, name: string): void;
  clearTyping(guruhId: string, userId: string): void;
  getTypers(guruhId: string, myUserId: string): string[];
  clearNew(guruhId: string): void;
  hasAnyNew(): boolean;
  /**
   * Guruh xabarlarini real vaqtda tinglaydi.
   * Supabase rejimida: Realtime websocket orqali.
   * Lokal rejimda: no-op (polling ChatView tomonidan amalga oshiriladi).
   * Qaytarilgan funksiyani cleanup uchun chaqiring.
   */
  subscribe(guruhId: string, onNew: () => void): () => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const chatApi: ChatApi =
  SUPABASE_URL && SUPABASE_KEY
    ? new SupabaseChatApi(SUPABASE_URL, SUPABASE_KEY)
    : new LocalChatApi();
