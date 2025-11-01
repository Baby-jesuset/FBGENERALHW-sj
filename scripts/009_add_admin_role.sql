-- Helper function to check for admin claims in the JWT
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select (auth.jwt()->'app_metadata'->>'is_admin')::boolean
$$;

-- Add is_admin column to profiles
alter table public.profiles add column if not exists is_admin boolean default false;

-- Create index for admin lookups
create index if not exists profiles_is_admin_idx on public.profiles(is_admin);

-- Drop old, inefficient policies before creating new ones
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;
drop policy if exists "Admins can insert categories" on public.categories;
drop policy if exists "Admins can update categories" on public.categories;
drop policy if exists "Admins can delete categories" on public.categories;
drop policy if exists "Admins can view all orders" on public.orders;
drop policy if exists "Admins can update all orders" on public.orders;
drop policy if exists "Admins can view all order items" on public.order_items;
drop policy if exists "Admins can view all profiles" on public.profiles;


-- RLS policies for products
create policy "Admins can manage products"
  on public.products for all
  using ( is_admin() )
  with check ( is_admin() );

-- RLS policies for categories
create policy "Admins can manage categories"
  on public.categories for all
  using ( is_admin() )
  with check ( is_admin() );

-- RLS policies for orders
create policy "Admins can view all orders"
  on public.orders for select
  using ( is_admin() );

create policy "Admins can update all orders"
  on public.orders for update
  using ( is_admin() );

-- RLS policies for order_items
create policy "Admins can view all order items"
  on public.order_items for select
  using ( is_admin() );

-- RLS policies for profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using ( is_admin() );
