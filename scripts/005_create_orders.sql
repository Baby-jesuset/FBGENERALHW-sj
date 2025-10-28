-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total decimal(10, 2) not null,
  subtotal decimal(10, 2) not null,
  shipping decimal(10, 2) default 0,
  tax decimal(10, 2) default 0,
  
  -- Contact info
  email text not null,
  phone text not null,
  
  -- Shipping address
  full_name text not null,
  address text not null,
  city text not null,
  postal_code text,
  country text default 'Uganda',
  
  -- Payment
  payment_method text not null check (payment_method in ('mobile_money', 'cash_on_delivery')),
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.orders enable row level security;

-- RLS Policies for orders
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own orders"
  on public.orders for update
  using (auth.uid() = user_id);

-- Add trigger for updated_at
create trigger set_updated_at
  before update on public.orders
  for each row
  execute function public.handle_updated_at();

-- Create index for user lookups
create index if not exists orders_user_id_idx on public.orders(user_id);

-- Create index for status
create index if not exists orders_status_idx on public.orders(status);
