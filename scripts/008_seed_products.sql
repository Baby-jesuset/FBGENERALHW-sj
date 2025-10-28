-- Seed products (get category IDs first)
do $$
declare
  power_tools_id uuid;
  building_materials_id uuid;
  hand_tools_id uuid;
  plumbing_id uuid;
  electrical_id uuid;
  paint_id uuid;
begin
  -- Get category IDs
  select id into power_tools_id from public.categories where slug = 'power-tools';
  select id into building_materials_id from public.categories where slug = 'building-materials';
  select id into hand_tools_id from public.categories where slug = 'hand-tools';
  select id into plumbing_id from public.categories where slug = 'plumbing';
  select id into electrical_id from public.categories where slug = 'electrical';
  select id into paint_id from public.categories where slug = 'paint-supplies';

  -- Insert products
  insert into public.products (name, description, price, original_price, category_id, image, images, badge, stock, is_featured, specs) values
    -- Featured products
    ('Tororo Cement 50kg', 'Premium quality Portland cement from Tororo. Perfect for all construction needs including foundations, blocks, and plastering.', 35000, null, building_materials_id, '/tororo-cement-bag-50kg.jpg', array['/tororo-cement-bag-50kg.jpg', '/bags-of-tororo-cement-stacked.jpg', '/small-cement-bag.jpg'], 'Best Seller', 500, true, '{"weight": "50kg", "type": "Portland Cement", "origin": "Tororo, Uganda", "coverage": "Approximately 0.5m³ when mixed"}'),
    
    ('Corrugated Iron Sheets 3m', 'High-quality galvanized corrugated iron roofing sheets. Durable, weather-resistant, and long-lasting.', 45000, 52000, building_materials_id, '/corrugated-iron-roofing-sheet.jpg', array['/corrugated-iron-roofing-sheet.jpg', '/corrugated-iron-roofing-sheets-stacked.jpg', '/corrugated-metal-roofing-sheet.jpg'], 'Sale', 200, true, '{"length": "3 meters", "material": "Galvanized Steel", "thickness": "0.5mm", "coverage": "Approximately 0.7m² per sheet"}'),
    
    ('Professional Power Drill', 'Heavy-duty cordless drill with 20V battery. Perfect for drilling and driving in wood, metal, and masonry.', 285000, 320000, power_tools_id, '/professional-power-drill.jpg', array['/professional-power-drill.jpg'], 'New', 45, true, '{"voltage": "20V", "battery": "Lithium-ion", "chuck_size": "13mm", "max_torque": "60Nm"}'),
    
    -- Regular products
    ('Angle Grinder 9"', 'Powerful 2000W angle grinder for cutting and grinding metal, concrete, and tiles.', 195000, null, power_tools_id, '/angle-grinder.jpg', array['/angle-grinder.jpg'], null, 30, false, '{"power": "2000W", "disc_size": "230mm (9 inch)", "speed": "6500 RPM"}'),
    
    ('Circular Saw', 'Professional circular saw with laser guide. Ideal for precise cutting of wood and plastic.', 245000, 280000, power_tools_id, '/circular-saw.jpg', array['/circular-saw.jpg'], 'Sale', 25, false, '{"power": "1800W", "blade_size": "185mm", "cutting_depth": "65mm"}'),
    
    ('Hammer Drill', 'Versatile hammer drill for drilling in concrete, brick, and stone.', 165000, null, power_tools_id, '/hammer-drill.jpg', array['/hammer-drill.jpg'], null, 40, false, '{"power": "850W", "chuck_size": "13mm", "impact_rate": "48000 BPM"}'),
    
    ('Claw Hammer 16oz', 'Professional claw hammer with fiberglass handle. Perfect for framing and general construction.', 25000, null, hand_tools_id, '/claw-hammer.jpg', array['/claw-hammer.jpg'], null, 100, false, '{"weight": "16oz", "handle": "Fiberglass", "head": "Forged Steel"}'),
    
    ('Screwdriver Set 12pc', 'Complete screwdriver set with magnetic tips. Includes Phillips and flathead in various sizes.', 35000, null, hand_tools_id, '/screwdriver-set.jpg', array['/screwdriver-set.jpg'], null, 75, false, '{"pieces": "12", "types": "Phillips & Flathead", "features": "Magnetic tips, ergonomic handles"}'),
    
    ('Adjustable Wrench 12"', 'Heavy-duty adjustable wrench with chrome finish. Opens up to 35mm.', 28000, null, hand_tools_id, '/adjustable-wrench.jpg', array['/adjustable-wrench.jpg'], null, 60, false, '{"size": "12 inch", "max_opening": "35mm", "material": "Chrome Vanadium Steel"}'),
    
    ('PVC Pipes 4" x 3m', 'High-quality PVC pipes for plumbing and drainage systems.', 18000, null, plumbing_id, '/pvc-pipes.jpg', array['/pvc-pipes.jpg'], null, 150, false, '{"diameter": "4 inches", "length": "3 meters", "material": "PVC", "pressure_rating": "10 bar"}'),
    
    ('Pipe Wrench 14"', 'Heavy-duty pipe wrench for plumbing work. Adjustable jaw for various pipe sizes.', 42000, null, plumbing_id, '/pipe-wrench.jpg', array['/pipe-wrench.jpg'], null, 35, false, '{"size": "14 inch", "capacity": "Up to 2 inch pipes", "material": "Drop Forged Steel"}'),
    
    ('Electrical Wire 2.5mm', 'High-quality copper electrical wire. Sold per meter.', 3500, null, electrical_id, '/electrical-wire.jpg', array['/electrical-wire.jpg'], null, 1000, false, '{"size": "2.5mm²", "material": "Copper", "insulation": "PVC", "voltage_rating": "450/750V"}'),
    
    ('Wall Paint 20L White', 'Premium quality interior wall paint. Excellent coverage and durability.', 125000, null, paint_id, '/wall-paint-white.jpg', array['/wall-paint-white.jpg'], null, 80, false, '{"volume": "20 liters", "color": "White", "finish": "Matt", "coverage": "Approximately 140m² per 20L"}'),
    
    ('Paint Roller Set', 'Complete paint roller set with tray and extension pole.', 22000, null, paint_id, '/paint-roller-set.jpg', array['/paint-roller-set.jpg'], null, 50, false, '{"includes": "Roller, tray, extension pole", "roller_width": "9 inch"}')
  on conflict do nothing;
end $$;
