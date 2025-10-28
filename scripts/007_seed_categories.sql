-- Seed categories
insert into public.categories (name, slug, description, image) values
  ('Power Tools', 'power-tools', 'Electric and battery-powered tools for construction and DIY', '/power-tools-category.jpg'),
  ('Hand Tools', 'hand-tools', 'Manual tools for precision work', '/hand-tools-category.jpg'),
  ('Building Materials', 'building-materials', 'Cement, iron sheets, and construction supplies', '/building-materials-category.jpg'),
  ('Plumbing', 'plumbing', 'Pipes, fittings, and plumbing supplies', '/plumbing-category.jpg'),
  ('Electrical', 'electrical', 'Wiring, switches, and electrical components', '/electrical-category.jpg'),
  ('Paint & Supplies', 'paint-supplies', 'Paints, brushes, and finishing materials', '/paint-supplies-category.jpg'),
  ('Safety Equipment', 'safety-equipment', 'Protective gear and safety supplies', '/safety-equipment-category.jpg'),
  ('Hardware & Fasteners', 'hardware-fasteners', 'Nails, screws, bolts, and fasteners', '/hardware-fasteners-category.jpg')
on conflict (slug) do nothing;
