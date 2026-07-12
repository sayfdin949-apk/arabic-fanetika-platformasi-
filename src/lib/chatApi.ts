import { store } from "./storage";
import type { Role } from "../auth/types";

export interface ChatMessage {
  id: string;
  guruhId: string;
  userId: string;
  userIsmFamilya: string;
  userRole: Role;
  matn: string;
  vaqt: string; // ISO
}

const MAX_MESSAGES = 200;
const chatKey = (guruhId: string) => `chat_${guruhId}`;

export const chatApi = {
  async getMessages(guruhId: string): Promise<ChatMessage[]> {
    const list = await store.get<ChatMessage[]>(chatKey(guruhId));
    return list ?? [];
  },

  async sendMessage(msg: Omit<ChatMessage, "id" | "vaqt">): Promise<void> {
    const existing = await store.get<ChatMessage[]>(chatKey(msg.guruhId)) ?? [];
    const newMsg: ChatMessage = {
      ...msg,
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      vaqt: new Date().toISOString(),
    };
    const updated = [...existing, newMsg].slice(-MAX_MESSAGES);
    await store.set(chatKey(msg.guruhId), updated);
  },

  async deleteMessage(guruhId: string, msgId: string): Promise<void> {
    const existing = await store.get<ChatMessage[]>(chatKey(guruhId)) ?? [];
    await store.set(chatKey(guruhId), existing.filter((m) => m.id !== msgId));
  },
};
