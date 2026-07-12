import { store } from "./storage";
import type { Role } from "../auth/types";

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

const MAX_MESSAGES = 200;
const TYPING_TTL = 4000;

const chatKey = (guruhId: string) => `chat_${guruhId}`;
const typingKey = (guruhId: string, userId: string) =>
  `afp:chat_typing_${guruhId}_${userId}`;
const newKey = (guruhId: string) => `afp:chat_new_${guruhId}`;

export const chatApi = {
  async getMessages(guruhId: string): Promise<ChatMessage[]> {
    const list = await store.get<ChatMessage[]>(chatKey(guruhId));
    return list ?? [];
  },

  async sendMessage(msg: Omit<ChatMessage, "id" | "vaqt">): Promise<void> {
    const existing =
      (await store.get<ChatMessage[]>(chatKey(msg.guruhId))) ?? [];
    const newMsg: ChatMessage = {
      ...msg,
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      vaqt: new Date().toISOString(),
    };
    await store.set(chatKey(msg.guruhId), [...existing, newMsg].slice(-MAX_MESSAGES));
    try { localStorage.setItem(newKey(msg.guruhId), "1"); } catch { /**/ }
  },

  async deleteMessage(guruhId: string, msgId: string): Promise<void> {
    const existing =
      (await store.get<ChatMessage[]>(chatKey(guruhId))) ?? [];
    await store.set(chatKey(guruhId), existing.filter((m) => m.id !== msgId));
  },

  // Typing indicator (localStorage only — ephemeral)
  setTyping(guruhId: string, userId: string, name: string): void {
    try {
      localStorage.setItem(
        typingKey(guruhId, userId),
        JSON.stringify({ name, at: Date.now() })
      );
    } catch { /**/ }
  },

  clearTyping(guruhId: string, userId: string): void {
    try { localStorage.removeItem(typingKey(guruhId, userId)); } catch { /**/ }
  },

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
  },

  // New-message dot (per guruh)
  clearNew(guruhId: string): void {
    try { localStorage.removeItem(newKey(guruhId)); } catch { /**/ }
  },

  hasAnyNew(): boolean {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)?.startsWith("afp:chat_new_")) return true;
      }
    } catch { /**/ }
    return false;
  },
};
