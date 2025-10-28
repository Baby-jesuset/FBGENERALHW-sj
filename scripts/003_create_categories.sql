-- Create categories table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.categories enable row level security;

-- RLS Policies for categories (public read, admin write)
create policy "Anyone can view categories"
  on public.categories for select
  using (true);

-- Add trigger for updated_at
create trigger set_updated_at
  before update on public.categories
  for each row
  execute function public.handle_updated_at();
