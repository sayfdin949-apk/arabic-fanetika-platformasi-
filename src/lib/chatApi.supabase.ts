import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Role } from "../auth/types";
import type { ChatApi, ChatMessage } from "./chatApi";

const TYPING_TTL = 4000;
const MAX_MESSAGES = 200;

const typingKey = (guruhId: string, userId: string) =>
  `afp:chat_typing_${guruhId}_${userId}`;
const newKey = (guruhId: string) => `afp:chat_new_${guruhId}`;

// Supabase `afp_messages` jadvalidan qaytadigan ustun shakli
interface DbMessage {
  id: string;
  guruh_id: string;
  user_id: string;
  user_ism_familya: string;
  user_role: string;
  matn: string;
  vaqt: string;
  reply_to: ChatMessage["replyTo"] | null;
}

function toMessage(row: DbMessage): ChatMessage {
  return {
    id: row.id,
    guruhId: row.guruh_id,
    userId: row.user_id,
    userIsmFamilya: row.user_ism_familya,
    userRole: row.user_role as Role,
    matn: row.matn,
    vaqt: row.vaqt,
    replyTo: row.reply_to ?? undefined,
  };
}

export class SupabaseChatApi implements ChatApi {
  private client: SupabaseClient;

  constructor(url: string, anonKey: string) {
    this.client = createClient(url, anonKey);
  }

  async getMessages(guruhId: string): Promise<ChatMessage[]> {
    try {
      const { data, error } = await this.client
        .from("afp_messages")
        .select("id,guruh_id,user_id,user_ism_familya,user_role,matn,vaqt,reply_to")
        .eq("guruh_id", guruhId)
        .order("vaqt", { ascending: true })
        .limit(MAX_MESSAGES);
      if (error || !data) return [];
      return (data as DbMessage[]).map(toMessage);
    } catch {
      return [];
    }
  }

  async sendMessage(msg: Omit<ChatMessage, "id" | "vaqt">): Promise<void> {
    try {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const vaqt = new Date().toISOString();
      await this.client.from("afp_messages").insert({
        id,
        guruh_id: msg.guruhId,
        user_id: msg.userId,
        user_ism_familya: msg.userIsmFamilya,
        user_role: msg.userRole,
        matn: msg.matn,
        vaqt,
        reply_to: msg.replyTo ?? null,
      });
      // new-message dot (tab ichidagi ikonka uchun)
      try { localStorage.setItem(newKey(msg.guruhId), "1"); } catch { /**/ }
    } catch { /**/ }
  }

  async deleteMessage(_guruhId: string, msgId: string): Promise<void> {
    try {
      await this.client.from("afp_messages").delete().eq("id", msgId);
    } catch { /**/ }
  }

  // Yozish indikatori — localStorage orqali (efemer, serverga saqlanmaydi)
  setTyping(guruhId: string, userId: string, name: string): void {
    try {
      localStorage.setItem(
        typingKey(guruhId, userId),
        JSON.stringify({ name, at: Date.now() })
      );
    } catch { /**/ }
  }

  clearTyping(guruhId: string, userId: string): void {
    try { localStorage.removeItem(typingKey(guruhId, userId)); } catch { /**/ }
  }

  getTypers(guruhId: string, myUserId: string): string[] {
    const now = Date.now();
    const prefix = `afp:chat_typing_${guruhId}_`;
    const typers: string[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k?.startsWith(prefix)) continue;
        const uid = k.slice(prefix.length);
        if (uid === myUserId) continue;
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        const { name, at } = JSON.parse(raw) as { name: string; at: number };
        if (now - at < TYPING_TTL) typers.push(name.split(" ")[0]);
      }
    } catch { /**/ }
    return typers;
  }

  clearNew(guruhId: string): void {
    try { localStorage.removeItem(newKey(guruhId)); } catch { /**/ }
  }

  hasAnyNew(): boolean {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)?.startsWith("afp:chat_new_")) return true;
      }
    } catch { /**/ }
    return false;
  }

  /**
   * Supabase Realtime orqali xabarlarni tinglaydi.
   * INSERT yoki DELETE bo'lganda onNew() chaqiriladi — ChatView qayta yuklaydi.
   * Qaytarilgan funksiya kanaldan chiqish (unsubscribe) uchun.
   */
  subscribe(guruhId: string, onNew: () => void): () => void {
    const channel = this.client
      .channel(`afp_messages_${guruhId}_${Date.now()}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "afp_messages",
          filter: `guruh_id=eq.${guruhId}`,
        },
        () => onNew()
      )
      .subscribe();
    return () => { void this.client.removeChannel(channel); };
  }
}
