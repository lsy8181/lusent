-- Schema setup for Lucent Management
-- Enable required extension
create extension if not exists "uuid-ossp";

-- 1) products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  artist_slug text not null,
  type text not null check (type in ('voice_pack','physical')),
  title text not null,
  description text not null,
  price_krw int not null,
  duration_sec int null,
  cover_url text null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2) orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  status text not null check (status in ('payment_pending','paid','production','shipping','delivered','cancelled')),
  deposit_name text null,
  deposit_due_at timestamptz null,
  memo text null,
  created_at timestamptz not null default now()
);

-- 3) order_items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders on delete cascade,
  product_id uuid references public.products,
  qty int not null,
  unit_price_krw int not null
);

-- 4) admin_users table
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.admin_users enable row level security;

-- Helper policy: function to check admin
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists(select 1 from public.admin_users where user_id = uid);
$$;

-- Products policies
create policy "Public can view active products" on public.products
  for select using (is_active = true);
create policy "Only admins manage products" on public.products
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Orders policies
create policy "Users can view own orders" on public.orders
  for select using (user_id = auth.uid());
create policy "Users can insert own orders" on public.orders
  for insert with check (user_id = auth.uid());
create policy "Admins can update order status" on public.orders
  for update using (public.is_admin(auth.uid()));

-- Order items policies
create policy "Users select their order items" on public.order_items
  for select using (exists(select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "Users insert their order items" on public.order_items
  for insert with check (exists(select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- Admin users policies (restrictive)
create policy "Admins view own admin row" on public.admin_users
  for select using (auth.uid() = user_id);
create policy "Only service role inserts admins" on public.admin_users
  for insert with check (auth.role() = 'service_role');

-- Seeds
insert into public.products (artist_slug, type, title, description, price_krw, duration_sec)
values
('miruru','voice_pack','Miruru Voice Pack 01','잔잔한 응원/인사 보이스 12종',12000,420),
('miruru','voice_pack','Miruru Voice Pack 02','포근한 수면 유도 보이스 8종',14000,360),
('miruru','voice_pack','Miruru Voice Pack 03','게임/스트리밍 알림용 보이스 10종',15000,400),
('miruru','physical','Miruru 아크릴 스탠드','하늘색 배경의 포근한 일러스트',18000,null),
('miruru','physical','Miruru 키링','말랑한 촉감의 하늘색 키링',9000,null),
('miruru','physical','Miruru 포스터','A3 사이즈 고퀄리티 포스터',7000,null)
on conflict do nothing;

-- Admin registration guide
-- After a user signs up, add them as admin (service role):
-- insert into public.admin_users (user_id) values ('<auth_user_id>');
