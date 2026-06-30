import { store } from "./storage";
import type { Complaint, ComplaintStatus } from "../features/shikoyat/types";

/* Shikoyatlar ombori — barcha qurilmalar o'rtasida umumiy `store'da
 * saqlanadi (Supabase yoki localStorage), shunda o'qituvchi qaysi
 * qurilmadan kirmasin barcha shikoyatlarni ko'radi. */
const KEY = "complaints";

export async function getComplaints(): Promise<Complaint[]> {
  const stored = await store.get<Complaint[]>(KEY);
  return stored ?? [];
}

export async function addComplaint(c: Omit<Complaint, "id" | "createdAt" | "status">): Promise<Complaint> {
  const list = await getComplaints();
  const newComplaint: Complaint = {
    ...c,
    id: "c" + Date.now(),
    createdAt: new Date().toISOString(),
    status: "open",
  };
  await store.set(KEY, [newComplaint, ...list]);
  return newComplaint;
}

export async function setComplaintStatus(id: string, status: ComplaintStatus): Promise<void> {
  const list = await getComplaints();
  const updated = list.map((c) => (c.id === id ? { ...c, status } : c));
  await store.set(KEY, updated);
}
