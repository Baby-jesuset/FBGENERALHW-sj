-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price decimal(10, 2) not null,
  original_price decimal(10, 2),
  category_id uuid references public.categories(id) on delete set null,
  image text not null,
  images text[] default '{}',
  badge text,
  stock integer default 0,
  specs jsonb default '{}',
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;

-- RLS Policies for products (public read, admin write)
create policy "Anyone can view products"
  on public.products for select
  using (true);

-- Add trigger for updated_at
create trigger set_updated_at
  before update on public.products
  for each row
  execute function public.handle_updated_at();

-- Create index for category lookups
create index if not exists products_category_id_idx on public.products(category_id);

-- Create index for featured products
create index if not exists products_is_featured_idx on public.products(is_featured);
