// Arab Fonetika Platformasi — Edge Function: admin-create-user
//
// Yangi foydalanuvchi yaratish va parolni tiklash — bu ikkalasi ham
// `supabase.auth.admin.*` (service-role) huquqini talab qiladi, shuning
// uchun anon klientdan to'g'ridan-to'g'ri (RLS orqali) qilib bo'lmaydi.
//
// Ochiq ro'yxatdan o'tish YO'Q (spec 03-bo'lim) — bu funksiyani faqat
// CEO yoki teacher (login qilgan holda, JWT bilan) chaqira oladi.
//
// Deploy: `supabase functions deploy admin-create-user`
// Kerakli sirlar (avtomatik mavjud bo'ladi): SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY.

import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function slugify(login: string): string {
  return login
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "user";
}

/** login "admin" -> email "admin@ichki.arabcha-fanetika.uz". Agar login
 * allaqachon email ko'rinishida bo'lsa ("@" bor), o'zgarishsiz ishlatiladi. */
function loginToEmail(login: string): string {
  const trimmed = login.trim().toLowerCase();
  if (trimmed.includes("@")) return trimmed;
  return `${slugify(trimmed)}@ichki.arabcha-fanetika.uz`;
}

interface CreateBody {
  action: "create";
  login: string;
  parol: string;
  ism: string;
  familya: string;
  role: "ceo" | "teacher" | "assistant" | "student";
  tel?: string;
  tugilgan?: string;
  telegramId?: number;
  tur?: "fonetika" | "grammatika";
}

interface ResetPasswordBody {
  action: "resetPassword";
  targetId: string;
  newParol: string;
}

type Body = CreateBody | ResetPasswordBody;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization") ?? "";
  const jwt = authHeader.replace(/^Bearer\s+/i, "");
  if (!jwt) return json({ ok: false, error: "Sessiya topilmadi" }, 401);

  // Chaqiruvchini JWT orqali aniqlash (anon client + caller token)
  const callerClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${jwt}` } },
  });
  const { data: authData, error: authErr } = await callerClient.auth.getUser();
  if (authErr || !authData?.user) return json({ ok: false, error: "Sessiya yaroqsiz" }, 401);
  const callerId = authData.user.id;

  // Service-role client — profiles jadvaliga RLS'siz kirish va admin API
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data: caller, error: callerErr } = await admin
    .from("profiles")
    .select("id, role, teacher_id")
    .eq("id", callerId)
    .single();
  if (callerErr || !caller) return json({ ok: false, error: "Profil topilmadi" }, 403);
  if (caller.role !== "ceo" && caller.role !== "teacher") {
    return json({ ok: false, error: "Ruxsat berilmagan" }, 403);
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Noto'g'ri so'rov" }, 400);
  }

  if (body.action === "create") {
    const { login, parol, ism, familya, role, tel, tugilgan, telegramId, tur } = body;
    if (!login?.trim() || !ism?.trim()) return json({ ok: false, error: "Ism va login majburiy" }, 400);
    if (!parol || parol.trim().length < 4) return json({ ok: false, error: "Parol kamida 4 ta belgi bo'lishi kerak" }, 400);

    // Teacher faqat student qo'sha oladi (mavjud v9 qoidasi bilan bir xil)
    if (caller.role === "teacher" && role !== "student") {
      return json({ ok: false, error: "O'qituvchi faqat o'quvchi qo'sha oladi" }, 403);
    }

    const { data: loginTaken } = await admin
      .from("profiles")
      .select("id")
      .eq("login", login.trim())
      .maybeSingle();
    if (loginTaken) return json({ ok: false, error: "Bu login band" }, 400);

    const email = loginToEmail(login);
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password: parol.trim(),
      email_confirm: true,
    });
    if (createErr || !created?.user) {
      return json({ ok: false, error: createErr?.message ?? "Foydalanuvchi yaratilmadi" }, 400);
    }

    const teacherId = role === "student" ? (caller.role === "teacher" ? caller.id : null) : null;

    const { data: profile, error: profileErr } = await admin
      .from("profiles")
      .insert({
        id: created.user.id,
        login: login.trim(),
        email,
        ism: ism.trim(),
        familya: familya?.trim() ?? "",
        role,
        teacher_id: teacherId,
        phone: tel?.trim() || null,
        tugilgan: tugilgan?.trim() || null,
        telegram_id: telegramId ?? null,
        tur: tur ?? null,
      })
      .select()
      .single();

    if (profileErr || !profile) {
      // Profil yozuvi muvaffaqiyatsiz bo'lsa, yaratilgan auth foydalanuvchisini
      // ortiqcha qoldirmaslik uchun bekor qilamiz.
      await admin.auth.admin.deleteUser(created.user.id);
      return json({ ok: false, error: profileErr?.message ?? "Profil yaratilmadi" }, 400);
    }

    return json({ ok: true, user: profile });
  }

  if (body.action === "resetPassword") {
    const { targetId, newParol } = body;
    if (!newParol || newParol.trim().length < 4) {
      return json({ ok: false, error: "Parol kamida 4 ta belgi bo'lishi kerak" }, 400);
    }

    const { data: target, error: targetErr } = await admin
      .from("profiles")
      .select("id, role, teacher_id")
      .eq("id", targetId)
      .single();
    if (targetErr || !target) return json({ ok: false, error: "Foydalanuvchi topilmadi" }, 404);

    if (caller.role === "teacher" && target.role !== "student") {
      return json({ ok: false, error: "O'qituvchi faqat o'quvchi parolini tiklaydi" }, 403);
    }

    const { error: updateErr } = await admin.auth.admin.updateUserById(targetId, {
      password: newParol.trim(),
    });
    if (updateErr) return json({ ok: false, error: updateErr.message }, 400);

    return json({ ok: true });
  }

  return json({ ok: false, error: "Noma'lum amal" }, 400);
});
