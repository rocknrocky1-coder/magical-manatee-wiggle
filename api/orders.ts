/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, requireServerConfig, serverSupabase } from './_supabase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  try {
    requireServerConfig();
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body?.customerName || !body?.customerEmail || !body?.customerPhone || !body?.shippingAddress || !Array.isArray(body.items) || body.items.length === 0) {
      return json(res, 400, { error: 'Missing order details' });
    }
    const { data, error } = await serverSupabase.rpc('place_order', {
      p_customer_name: body.customerName,
      p_customer_email: body.customerEmail,
      p_customer_phone: body.customerPhone,
      p_shipping_address: body.shippingAddress,
      p_payment_method: body.paymentMethod || 'COD',
      p_items: body.items,
      p_coupon_code: body.couponCode || null,
    });
    if (error) return json(res, 400, { error: error.message });
    const { data: order, error: orderError } = await serverSupabase
      .from('orders')
      .select('*, order_items(*), order_timeline(*)')
      .eq('id', data.id)
      .single();
    if (orderError) return json(res, 500, { error: orderError.message });
    return json(res, 200, {
      id: order.id,
      orderNumber: order.order_number,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      shippingAddress: order.shipping_address,
      items: (order.order_items || []).map((item: any) => ({
        productId: item.product_id,
        variantId: item.variant_id,
        productName: item.product_name,
        size: item.size,
        colorName: item.color_name,
        sku: item.sku,
        barcode: item.barcode,
        unitPrice: item.unit_price,
        mrp: item.mrp,
        quantity: item.quantity,
        gstAmount: item.gst_amount,
        total: item.total,
        image: item.image,
      })),
      subtotal: order.subtotal,
      couponDiscount: order.coupon_discount,
      couponCode: order.coupon_code,
      gstAmount: order.gst_amount,
      shippingFee: order.shipping_fee,
      totalAmount: order.total_amount,
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status,
      orderStatus: order.order_status,
      trackingNumber: order.tracking_number,
      shippingProvider: order.shipping_provider,
      createdAt: order.created_at,
      timeline: (order.order_timeline || []).map((entry: any) => ({
        status: entry.status,
        timestamp: entry.created_at,
        note: entry.note,
      })),
    });
  } catch (error) {
    return json(res, 500, { error: error instanceof Error ? error.message : 'Unable to place order' });
  }
}
