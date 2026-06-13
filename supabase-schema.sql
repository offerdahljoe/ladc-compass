create table if not exists public.ladc_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  collection text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ladc_entries enable row level security;

drop policy if exists "Users can read their own LADC entries" on public.ladc_entries;
create policy "Users can read their own LADC entries"
on public.ladc_entries
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own LADC entries" on public.ladc_entries;
create policy "Users can insert their own LADC entries"
on public.ladc_entries
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own LADC entries" on public.ladc_entries;
create policy "Users can update their own LADC entries"
on public.ladc_entries
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own LADC entries" on public.ladc_entries;
create policy "Users can delete their own LADC entries"
on public.ladc_entries
for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists ladc_entries_user_collection_created_idx
on public.ladc_entries (user_id, collection, created_at desc);
