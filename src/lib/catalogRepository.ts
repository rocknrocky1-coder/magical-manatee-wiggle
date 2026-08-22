import type { Product, ProductVariant } from '@/types/ecommerce';
import { isSupabaseConfigured, supabase } from './supabase';

type ProductRow = Omit<Product, 'variants' | 'specifications' | 'careInstructions' | 'createdAt' | 'updatedAt' | 'sellingPrice' | 'discountPercentage' | 'isNewArrival' | 'isBestSeller' | 'isFeatured' | 'isPublished' | 'reviewCount' | 'seoTitle' | 'seoDescription' | 'craftDetails' | 'hsnCode' | 'gstRate' | 'mrp' | 'rating' | 'tags' | 'images'> & {
  specifications: Record<string, string>;
  care_instructions: string[];
  images: string[];
  mrp: number;
  selling_price: number;
  discount_percentage: number;
  gst_rate: number;
  hsn_code: string;
  craft_details: string;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_featured: boolean;
  is_published: boolean;
  review_count: number;
  rating: number;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  variants: ProductVariant[];
};

const mapProduct = (row: ProductRow): Product => ({
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
  mrp: row.mrp,
  sellingPrice: row.selling_price,
  discountPercentage: row.discount_percentage,
  gstRate: row.gst_rate,
  hsnCode: row.hsn_code,
  isNewArrival: row.is_new_arrival,
  isBestSeller: row.is_best_seller,
  isFeatured: row.is_featured,
  isPublished: row.is_published,
  rating: row.rating,
  reviewCount: row.review_count,
  tags: row.tags || [],
  seoTitle: row.seo_title || '',
  seoDescription: row.seo_description || '',
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  variants: row.variants || [],
});

export const catalogRepository = {
  async listPublished(): Promise<Product[] | null> {
    if (!isSupabaseConfigured || !supabase) return null;
    const { data, error } = await supabase
      .from('products')
      .select('*, variants:product_variants(*)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(row => mapProduct(row as ProductRow));
  },
};
