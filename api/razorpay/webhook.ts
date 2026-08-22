/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'node:crypto';
import { json, requireServerConfig, serverSupabase } from '../_supabase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!process.env.RAZORPAY_WEBHOOK_SECRET) return json(res, 503, { error: 'Razorpay webhook is not configured' });
  try {
    requireServerConfig();
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const signature = req.headers['x-razorpay-signature'] || '';
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return json(res, 400, { error: 'Invalid webhook signature' });
    const payload = JSON.parse(rawBody);
    const payment = payload.payload?.payment?.entity;
    if (payment?.order_id) {
      await serverSupabase.from('payments').update({ provider_payment_id: payment.id, status: payload.event === 'payment.captured' ? 'PAID' : 'FAILED', raw_response: payload, updated_at: new Date().toISOString() }).eq('provider_order_id', payment.order_id);
    }
    return json(res, 200, { received: true });
  } catch (error) {
    return json(res, 400, { error: error instanceof Error ? error.message : 'Unable to process webhook' });
  }
}
