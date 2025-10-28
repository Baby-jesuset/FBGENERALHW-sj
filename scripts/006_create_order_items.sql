-- Create order_items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text,
  quantity integer not null check (quantity > 0),
  price decimal(10, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.order_items enable row level security;

-- RLS Policies for order_items (inherit from orders)
create policy "Users can view items from their own orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Users can create items for their own orders"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Create index for order lookups
create index if not exists order_items_order_id_idx on public.order_items(order_id);

-- Create index for product lookups
create index if not exists order_items_product_id_idx on public.order_items(product_id);
