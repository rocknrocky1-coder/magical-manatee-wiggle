create extension if not exists pgcrypto;

create type public.account_role as enum ('customer', 'super_admin', 'inventory_manager', 'order_manager');
create type public.discount_type as enum ('percentage', 'fixed');
create type public.payment_method as enum ('COD', 'RAZORPAY', 'UPI', 'CARD');
create type public.payment_status as enum ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
create type public.order_status as enum ('CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURN_REQUESTED', 'EXCHANGE_REQUESTED', 'RETURNED', 'REFUNDED');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  phone text not null,
  role public.account_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id text primary key,
  name text not null,
  slug text not null unique,
  category text not null,
  subcategory text not null,
  fabric text not null,
  pattern text not null,
  craft_details text not null,
  description text not null,
  specifications jsonb not null default '{}'::jsonb,
  care_instructions text[] not null default '{}',
  images text[] not null default '{}',
  mrp numeric(12,2) not null check (mrp >= 0),
  selling_price numeric(12,2) not null check (selling_price >= 0),
  discount_percentage numeric(5,2) not null default 0,
  gst_rate numeric(5,2) not null default 0,
  hsn_code text not null,
  is_new_arrival boolean not null default false,
  is_best_seller boolean not null default false,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  rating numeric(3,2) not null default 0,
  review_count integer not null default 0,
  tags text[] not null default '{}',
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_category_published_idx on public.products(category, is_published);
create index products_tags_idx on public.products using gin(tags);
create index products_search_idx on public.products using gin(to_tsvector('simple', name));

create table public.product_variants (
  id text primary key,
  product_id text not null references public.products(id) on delete cascade,
  size text not null,
  color_name text not null,
  color_hex text not null,
  sku text not null unique,
  barcode text unique,
  mrp numeric(12,2) not null check (mrp >= 0),
  selling_price numeric(12,2) not null check (selling_price >= 0),
  cost_price numeric(12,2) not null check (cost_price >= 0),
  stock integer not null default 0 check (stock >= 0),
  reserved_stock integer not null default 0 check (reserved_stock >= 0 and reserved_stock <= stock),
  low_stock_threshold integer not null default 0 check (low_stock_threshold >= 0),
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index product_variants_product_idx on public.product_variants(product_id);

create table public.coupons (
  code text primary key check (code = upper(code)),
  description text not null,
  discount_type public.discount_type not null,
  discount_value numeric(12,2) not null check (discount_value >= 0),
  min_order_value numeric(12,2) not null default 0,
  max_discount numeric(12,2),
  is_active boolean not null default true,
  valid_from timestamptz,
  valid_until timestamptz,
  usage_limit integer,
  used_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  phone text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  type text not null check (type in ('home', 'work', 'other')),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index addresses_user_idx on public.addresses(user_id);
create unique index addresses_one_default_idx on public.addresses(user_id) where is_default;

create table public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table public.wishlist_items (
  wishlist_id uuid not null references public.wishlists(id) on delete cascade,
  product_id text not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (wishlist_id, product_id)
);

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.profiles(id) on delete cascade,
  guest_token_hash text unique,
  applied_coupon_code text references public.coupons(code),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((user_id is not null) <> (guest_token_hash is not null))
);
create table public.cart_items (
  cart_id uuid not null references public.carts(id) on delete cascade,
  variant_id text not null references public.product_variants(id),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (cart_id, variant_id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references public.profiles(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  shipping_address jsonb not null,
  subtotal numeric(12,2) not null,
  coupon_discount numeric(12,2) not null default 0,
  coupon_code text references public.coupons(code),
  gst_amount numeric(12,2) not null default 0,
  shipping_fee numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null,
  payment_method public.payment_method not null,
  payment_status public.payment_status not null default 'PENDING',
  order_status public.order_status not null default 'CONFIRMED',
  tracking_number text,
  shipping_provider text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index orders_user_created_idx on public.orders(user_id, created_at desc);
create index orders_email_idx on public.orders(customer_email);
create index orders_status_created_idx on public.orders(order_status, created_at desc);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null,
  variant_id text references public.product_variants(id) on delete set null,
  product_name text not null,
  size text not null,
  color_name text not null,
  sku text not null,
  barcode text,
  unit_price numeric(12,2) not null,
  mrp numeric(12,2) not null,
  quantity integer not null check (quantity > 0),
  gst_amount numeric(12,2) not null default 0,
  total numeric(12,2) not null,
  image text
);
create index order_items_order_idx on public.order_items(order_id);

create table public.order_timeline (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status public.order_status not null,
  note text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
create index order_timeline_order_idx on public.order_timeline(order_id, created_at);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_payment_id text unique,
  provider_order_id text,
  amount numeric(12,2) not null,
  status public.payment_status not null default 'PENDING',
  raw_response jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reviews (
  id text primary key,
  product_id text not null references public.products(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  user_name text not null,
  rating smallint not null check (rating between 1 and 5),
  title text,
  comment text not null,
  verified_purchase boolean not null default false,
  created_at timestamptz not null default now()
);
create index reviews_product_created_idx on public.reviews(product_id, created_at desc);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  variant_id text not null references public.product_variants(id),
  order_id uuid references public.orders(id) on delete set null,
  change_type text not null check (change_type in ('ORDER_PLACED', 'MANUAL_ADJUSTMENT')),
  quantity_change integer not null,
  previous_stock integer not null,
  new_stock integer not null,
  performed_by uuid references public.profiles(id) on delete set null,
  performed_by_label text,
  note text,
  created_at timestamptz not null default now()
);
create index inventory_movements_variant_idx on public.inventory_movements(variant_id, created_at desc);

create table public.return_requests (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  request_type text not null check (request_type in ('return', 'exchange')),
  reason text not null,
  status text not null default 'requested' check (status in ('requested', 'approved', 'rejected', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.store_settings (
  id text primary key default 'default' check (id = 'default'),
  returns_enabled boolean not null default true,
  exchanges_enabled boolean not null default true,
  return_window_days integer not null default 7,
  exchange_window_days integer not null default 10,
  free_shipping_threshold numeric(12,2) not null default 1999,
  default_shipping_fee numeric(12,2) not null default 99,
  default_gst_percentage numeric(5,2) not null default 5,
  store_name text not null default 'TIRZAH Indian Luxury',
  support_email text not null,
  support_phone text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('super_admin', 'inventory_manager', 'order_manager'));
$$;

create or replace function public.place_order(
  p_customer_name text, p_customer_email text, p_customer_phone text,
  p_shipping_address jsonb, p_payment_method public.payment_method,
  p_items jsonb, p_coupon_code text default null
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_order_id uuid := gen_random_uuid();
  v_order_number text := 'TRZ-' || lpad((floor(random() * 900000) + 100000)::text, 6, '0');
  v_subtotal numeric(12,2) := 0;
  v_total numeric(12,2) := 0;
  v_item jsonb;
  v_variant product_variants%rowtype;
  v_quantity integer;
  v_discount numeric(12,2) := 0;
  v_shipping numeric(12,2) := 0;
  v_gst numeric(12,2) := 0;
  v_coupon coupons%rowtype;
begin
  for v_item in select value from jsonb_array_elements(p_items) loop
    v_quantity := (v_item->>'quantity')::integer;
    select * into v_variant from product_variants where id = v_item->>'variantId' for update;
    if not found or v_quantity <= 0 or v_variant.stock - v_variant.reserved_stock < v_quantity then
      raise exception 'Insufficient stock for variant %', v_item->>'variantId';
    end if;
    v_subtotal := v_subtotal + v_variant.selling_price * v_quantity;
  end loop;
  if p_coupon_code is not null then
    select * into v_coupon from coupons where code = upper(p_coupon_code) and is_active
      and (valid_from is null or valid_from <= now()) and (valid_until is null or valid_until >= now()) for update;
    if found and v_subtotal >= v_coupon.min_order_value and (v_coupon.usage_limit is null or v_coupon.used_count < v_coupon.usage_limit) then
      v_discount := case when v_coupon.discount_type = 'percentage' then least(v_subtotal * v_coupon.discount_value / 100, coalesce(v_coupon.max_discount, v_subtotal)) else v_coupon.discount_value end;
    end if;
  end if;
  v_gst := round((v_subtotal - v_discount) * 0.05);
  v_shipping := case when v_subtotal >= 1999 or v_subtotal = 0 then 0 else 99 end;
  v_total := greatest(0, v_subtotal - v_discount + v_shipping);
  insert into orders(id, order_number, user_id, customer_name, customer_email, customer_phone, shipping_address, subtotal, coupon_discount, coupon_code, gst_amount, shipping_fee, total_amount, payment_method, payment_status)
  values (v_order_id, v_order_number, auth.uid(), p_customer_name, lower(trim(p_customer_email)), p_customer_phone, p_shipping_address, v_subtotal, v_discount, case when found then v_coupon.code else null end, v_gst, v_shipping, v_total, p_payment_method, case when p_payment_method = 'COD' then 'PENDING' else 'PENDING' end);
  for v_item in select value from jsonb_array_elements(p_items) loop
    select * into v_variant from product_variants where id = v_item->>'variantId' for update;
    v_quantity := (v_item->>'quantity')::integer;
    update product_variants set stock = stock - v_quantity, updated_at = now() where id = v_variant.id;
    insert into order_items(order_id, product_id, variant_id, product_name, size, color_name, sku, barcode, unit_price, mrp, quantity, gst_amount, total, image)
      select v_order_id, p.id, v.id, p.name, v.size, v.color_name, v.sku, v.barcode, v.selling_price, v.mrp, v_quantity, round(v.selling_price * v_quantity * p.gst_rate / 100), v.selling_price * v_quantity, coalesce(v.image, p.images[1]) from product_variants v join products p on p.id = v.product_id where v.id = v_variant.id;
    insert into inventory_movements(variant_id, order_id, change_type, quantity_change, previous_stock, new_stock, performed_by_label) values (v_variant.id, v_order_id, 'ORDER_PLACED', -v_quantity, v_variant.stock, v_variant.stock - v_quantity, 'Checkout');
  end loop;
  insert into order_timeline(order_id, status, note) values (v_order_id, 'CONFIRMED', 'Order placed via ' || p_payment_method);
  if found and v_coupon.code is not null then update coupons set used_count = used_count + 1 where code = v_coupon.code; end if;
  return jsonb_build_object('id', v_order_id, 'orderNumber', v_order_number, 'totalAmount', v_total);
end;
$$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.coupons enable row level security;
alter table public.addresses enable row level security;
alter table public.wishlists enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_timeline enable row level security;
alter table public.payments enable row level security;
alter table public.reviews enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.return_requests enable row level security;
alter table public.store_settings enable row level security;

create policy products_public_read on public.products for select using (is_published or public.is_admin());
create policy variants_public_read on public.product_variants for select using (exists (select 1 from products p where p.id = product_id and (p.is_published or public.is_admin())));
create policy coupons_public_read on public.coupons for select using (is_active and (valid_from is null or valid_from <= now()) and (valid_until is null or valid_until >= now()) or public.is_admin());
create policy profiles_owner on public.profiles for all using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy addresses_owner on public.addresses for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy wishlist_owner on public.wishlists for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy wishlist_items_owner on public.wishlist_items for all using (exists (select 1 from wishlists w where w.id = wishlist_id and w.user_id = auth.uid()));
create policy carts_owner on public.carts for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy cart_items_owner on public.cart_items for all using (exists (select 1 from carts c where c.id = cart_id and c.user_id = auth.uid()));
create policy orders_owner_read on public.orders for select using (user_id = auth.uid() or public.is_admin());
create policy order_items_owner_read on public.order_items for select using (exists (select 1 from orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())));
create policy timeline_owner_read on public.order_timeline for select using (exists (select 1 from orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())));
create policy payments_owner_read on public.payments for select using (exists (select 1 from orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())));
create policy reviews_public_read on public.reviews for select using (true);
create policy reviews_owner_write on public.reviews for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy inventory_admin on public.inventory_movements for all using (public.is_admin()) with check (public.is_admin());
create policy return_owner on public.return_requests for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy settings_public_read on public.store_settings for select using (true);
create policy settings_admin_write on public.store_settings for all using (public.is_admin()) with check (public.is_admin());
