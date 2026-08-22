/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'node:crypto';
import { json, requireServerConfig, serverSupabase } from '../_supabase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!process.env.RAZORPAY_KEY_SECRET) return json(res, 503, { error: 'Razorpay is not configured' });
  try {
    requireServerConfig();
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(body.razorpay_signature || ''))) return json(res, 400, { error: 'Invalid payment signature' });
    const { error } = await serverSupabase.from('payments').update({ provider_payment_id: body.razorpay_payment_id, status: 'PAID', updated_at: new Date().toISOString() }).eq('provider_order_id', body.razorpay_order_id);
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { verified: true });
  } catch (error) {
    return json(res, 400, { error: error instanceof Error ? error.message : 'Unable to verify payment' });
  }
}
