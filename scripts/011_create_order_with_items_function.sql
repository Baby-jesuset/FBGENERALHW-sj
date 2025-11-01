-- This function creates an order and its items in a single transaction.
CREATE OR REPLACE FUNCTION public.create_order_with_items(
  user_id_input UUID,
  order_data JSONB,
  order_items_input JSONB
)
RETURNS JSONB AS $$
DECLARE
  new_order_id UUID;
  new_order JSONB;
BEGIN
  -- Insert the order and get the new ID
  INSERT INTO public.orders (
    user_id, status, total, subtotal, shipping, tax,
    email, phone, full_name, address, city, postal_code, country,
    payment_method, payment_status, notes
  )
  VALUES (
    user_id_input,
    order_data->>'status',
    (order_data->>'total')::NUMERIC,
    (order_data->>'subtotal')::NUMERIC,
    (order_data->>'shipping')::NUMERIC,
    (order_data->>'tax')::NUMERIC,
    order_data->>'email',
    order_data->>'phone',
    order_data->>'full_name',
    order_data->>'address',
    order_data->>'city',
    order_data->>'postal_code',
    order_data->>'country',
    order_data->>'payment_method',
    order_data->>'payment_status',
    order_data->>'notes'
  ) RETURNING id INTO new_order_id;

  -- Insert the order items
  INSERT INTO public.order_items (order_id, product_id, product_name, product_image, quantity, price)
  SELECT
    new_order_id,
    (item->>'product_id')::UUID,
    item->>'product_name',
    item->>'product_image',
    (item->>'quantity')::INT,
    (item->>'price')::NUMERIC
  FROM jsonb_array_elements(order_items_input) AS item;
  
  -- Fetch the newly created order with its items to return
  SELECT jsonb_build_object(
    'id', o.id,
    'created_at', o.created_at,
    'user_id', o.user_id,
    'status', o.status,
    'total', o.total,
    -- Add all other relevant fields from the orders table
    'subtotal', o.subtotal,
    'shipping', o.shipping,
    'tax', o.tax,
    'email', o.email,
    'phone', o.phone,
    'full_name', o.full_name,
    'address', o.address,
    'city', o.city,
    'postal_code', o.postal_code,
    'country', o.country,
    'payment_method', o.payment_method,
    'payment_status', o.payment_status,
    'notes', o.notes,
    'items', (SELECT jsonb_agg(oi) FROM public.order_items oi WHERE oi.order_id = o.id)
  )
  INTO new_order
  FROM public.orders o
  WHERE o.id = new_order_id;

  RETURN new_order;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
