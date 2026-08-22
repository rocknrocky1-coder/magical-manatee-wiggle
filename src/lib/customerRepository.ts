/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Address, CartItem, CustomerAccount, Product, ProductVariant } from '@/types/ecommerce';
import { isSupabaseConfigured, supabase } from './supabase';

const requireClient = () => {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
};

const mapAddress = (row: Record<string, any>): Address => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  addressLine1: row.address_line1,
  addressLine2: row.address_line2 || undefined,
  city: row.city,
  state: row.state,
  pincode: row.pincode,
  type: row.type,
  isDefault: row.is_default,
});

const mapProduct = (row: any): Product => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  category: row.category,
  subcategory: row.subcategory,
  fabric: row.fabric,
  pattern: row.pattern,
  craftDetails: row.craft_details,
  description: row.description,
  specifications: row.specifications || {},
  careInstructions: row.care_instructions || [],
  images: row.images || [],
  mrp: Number(row.mrp),
  sellingPrice: Number(row.selling_price),
  discountPercentage: Number(row.discount_percentage),
  gstRate: Number(row.gst_rate),
  hsnCode: row.hsn_code,
  isNewArrival: row.is_new_arrival,
  isBestSeller: row.is_best_seller,
  isFeatured: row.is_featured,
  isPublished: row.is_published,
  rating: Number(row.rating),
  reviewCount: row.review_count,
  tags: row.tags || [],
  seoTitle: row.seo_title || '',
  seoDescription: row.seo_description || '',
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  variants: [],
});

const mapVariant = (row: any): ProductVariant => ({
  id: row.id,
  productId: row.product_id,
  size: row.size,
  colorName: row.color_name,
  colorHex: row.color_hex,
  sku: row.sku,
  barcode: row.barcode || undefined,
  mrp: Number(row.mrp),
  sellingPrice: Number(row.selling_price),
  costPrice: Number(row.cost_price),
  stock: row.stock,
  reservedStock: row.reserved_stock,
  lowStockThreshold: row.low_stock_threshold,
  image: row.image || undefined,
});

const mapCartItem = (row: any): CartItem => {
  const variant = mapVariant(row.variant);
  const product = mapProduct(row.variant.product);
  product.variants = [variant];
  return { id: `${row.cart_id}:${variant.id}`, product, variant, quantity: row.quantity };
};

export const customerRepository = {
  async getCurrentAccount(): Promise<CustomerAccount | null> {
    const client = requireClient();
    const { data, error } = await client.auth.getSession();
    if (error || !data.session?.user) return null;
    const { data: profile, error: profileError } = await client.from('profiles').select('name, phone').eq('id', data.session.user.id).maybeSingle();
    if (profileError || !profile) return null;
    return { id: data.session.user.id, name: profile.name, email: data.session.user.email || '', phone: profile.phone, password: '' };
  },

  async signIn(email: string, password: string): Promise<CustomerAccount> {
    const client = requireClient();
    const { data, error } = await client.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    if (error || !data.user) throw new Error(error?.message || 'Unable to sign in');
    const { data: profile, error: profileError } = await client.from('profiles').select('name, phone').eq('id', data.user.id).single();
    if (profileError) throw profileError;
    return { id: data.user.id, name: profile.name, email: data.user.email || email, phone: profile.phone, password: '' };
  },

  async signUp(name: string, email: string, phone: string, password: string): Promise<CustomerAccount> {
    const client = requireClient();
    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await client.auth.signUp({ email: normalizedEmail, password });
    if (error || !data.user) throw new Error(error?.message || 'Unable to create account');
    const { error: profileError } = await client.from('profiles').insert({ id: data.user.id, name: name.trim(), phone: phone.trim() });
    if (profileError) throw profileError;
    return { id: data.user.id, name: name.trim(), email: normalizedEmail, phone: phone.trim(), password: '' };
  },

  async signOut() {
    if (isSupabaseConfigured) await requireClient().auth.signOut();
  },

  async updateProfile(accountId: string, details: Pick<CustomerAccount, 'name' | 'email' | 'phone'>): Promise<CustomerAccount> {
    const client = requireClient();
    const { data: userData, error: userError } = await client.auth.updateUser({ email: details.email.trim().toLowerCase() });
    if (userError) throw userError;
    const { error } = await client.from('profiles').update({ name: details.name.trim(), phone: details.phone.trim(), updated_at: new Date().toISOString() }).eq('id', accountId);
    if (error) throw error;
    return { id: accountId, name: details.name.trim(), email: userData.user?.email || details.email.trim().toLowerCase(), phone: details.phone.trim(), password: '' };
  },

  async listAddresses(userId: string): Promise<Address[]> {
    const { data, error } = await requireClient().from('addresses').select('*').eq('user_id', userId).order('is_default', { ascending: false }).order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(mapAddress);
  },

  async addAddress(userId: string, address: Omit<Address, 'id'>): Promise<Address> {
    const { data, error } = await requireClient().from('addresses').insert({ user_id: userId, name: address.name, phone: address.phone, address_line1: address.addressLine1, address_line2: address.addressLine2 || null, city: address.city, state: address.state, pincode: address.pincode, type: address.type, is_default: address.isDefault || false }).select().single();
    if (error) throw error;
    return mapAddress(data);
  },

  async deleteAddress(userId: string, addressId: string) {
    const { error } = await requireClient().from('addresses').delete().eq('id', addressId).eq('user_id', userId);
    if (error) throw error;
  },

  async loadCart(userId: string): Promise<{ items: CartItem[]; couponCode: string | null }> {
    const client = requireClient();
    const cartResult = await client.from('carts').select('id, applied_coupon_code').eq('user_id', userId).maybeSingle();
    let cart = cartResult.data;
    if (cartResult.error) throw cartResult.error;
    if (!cart) {
      const created = await client.from('carts').insert({ user_id: userId }).select('id, applied_coupon_code').single();
      if (created.error) throw created.error;
      cart = created.data;
    }
    const result = await client.from('cart_items').select('cart_id, quantity, variant:product_variants(*, product:products(*))').eq('cart_id', cart.id);
    if (result.error) throw result.error;
    return { items: (result.data || []).map(mapCartItem), couponCode: cart.applied_coupon_code };
  },

  async upsertCartItem(userId: string, variantId: string, quantity: number) {
    const client = requireClient();
    const { data: cart, error: cartError } = await client.from('carts').select('id').eq('user_id', userId).single();
    if (cartError) throw cartError;
    const { error } = await client.from('cart_items').upsert({ cart_id: cart.id, variant_id: variantId, quantity, updated_at: new Date().toISOString() });
    if (error) throw error;
  },

  async removeCartItem(userId: string, variantId: string) {
    const client = requireClient();
    const { data: cart, error: cartError } = await client.from('carts').select('id').eq('user_id', userId).single();
    if (cartError) throw cartError;
    const { error } = await client.from('cart_items').delete().eq('cart_id', cart.id).eq('variant_id', variantId);
    if (error) throw error;
  },

  async clearCart(userId: string) {
    const client = requireClient();
    const { data: cart, error: cartError } = await client.from('carts').select('id').eq('user_id', userId).single();
    if (cartError) throw cartError;
    const { error } = await client.from('cart_items').delete().eq('cart_id', cart.id);
    if (error) throw error;
    await client.from('carts').update({ applied_coupon_code: null, updated_at: new Date().toISOString() }).eq('id', cart.id);
  },

  async toggleWishlist(userId: string, productId: string): Promise<boolean> {
    const client = requireClient();
    const wishlistResult = await client.from('wishlists').select('id').eq('user_id', userId).maybeSingle();
    let wishlist = wishlistResult.data;
    if (wishlistResult.error) throw wishlistResult.error;
    if (!wishlist) {
      const created = await client.from('wishlists').insert({ user_id: userId }).select('id').single();
      if (created.error) throw created.error;
      wishlist = created.data;
    }
    const existing = await client.from('wishlist_items').select('product_id').eq('wishlist_id', wishlist.id).eq('product_id', productId).maybeSingle();
    if (existing.error) throw existing.error;
    if (existing.data) {
      const removed = await client.from('wishlist_items').delete().eq('wishlist_id', wishlist.id).eq('product_id', productId);
      if (removed.error) throw removed.error;
      return false;
    }
    const added = await client.from('wishlist_items').insert({ wishlist_id: wishlist.id, product_id: productId });
    if (added.error) throw added.error;
    return true;
  },

  async loadWishlist(userId: string): Promise<string[]> {
    const { data: wishlist, error } = await requireClient().from('wishlists').select('id').eq('user_id', userId).maybeSingle();
    if (error) throw error;
    if (!wishlist) return [];
    const { data, error: itemsError } = await requireClient().from('wishlist_items').select('product_id').eq('wishlist_id', wishlist.id);
    if (itemsError) throw itemsError;
    return (data || []).map(item => item.product_id);
  },
};
