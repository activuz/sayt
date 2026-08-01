# Zotdor.uz — Чорвани сотиш ва сотиб олиш платформаси

Zotdor.uz — Ўзбекистонда чорва молларини (қорамол, қўй-эчки, от ва б.) воситачиларсиз, тўғридан-тўғри сотиш ва сотиб олиш учун мўлжалланган миллий рақамли платформа.

## 🚀 Тезкор Ишга Тўшириш (Local Development)

1. Клонлаш ва боғлиқликларни ўрнатиш:
```bash
npm install
```

2. `.env.local` файлини яратиш:
```env
# Telegram Bot Integratsiyasi
TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
TELEGRAM_CHAT_ID=-1001234567890

# Supabase Integratsiyasi
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Локал серверни юритиш:
```bash
npm run dev
```

---

## 🗄️ Supabase DB Sxemasi (SQL)

Supabase Dashboard -> **SQL Editor** bo'limida quyidagi skriptni bosing:

```sql
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  name text not null,
  region text not null,
  phone text not null,
  lang text default 'cyrl',
  source text default 'direct',
  user_agent text,
  role text,
  animal_types text[],
  price_range text,
  pain_points text[],
  comment text,
  survey_status text default 'none'
);

-- Row Level Security (RLS) Sozlash
alter table public.leads enable row level security;

-- Anon va Service Role uchun ruxsat berish:
create policy "Allow insert for everyone" on public.leads for insert with check (true);
create policy "Allow update by id" on public.leads for update using (true);
create policy "Allow read count for everyone" on public.leads for select using (true);
```

---

## 🌐 Vercel Deploy Yo'riqnomasi

1. Vercel dashboardida yangi loyiha qo'shing (`Import Repository`).
2. Environment Variables bo'limida quyidagilarni kiriting:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. **Deploy** tugmasini bosing!

---

## 📱 Texnik Xususiyatlari
- Next.js 14 App Router, TypeScript, Tailwind CSS
- Mobil birinchi navbatda (Mobile-first, 3G internet optimizatsiyasi)
- Офлайн сақлаш (LocalStorage fallback & retry logic)
- Икки алифбо (Кирилл ва Lotin) 100% `lib/i18n.ts` орқали
