/* eslint-disable @typescript-eslint/no-explicit-any */
import { json } from '../_supabase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return json(res, 503, { error: 'Razorpay is not configured' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body?.amount || !body?.receipt) return json(res, 400, { error: 'Amount and receipt are required' });
    const credentials = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: { Authorization: `Basic ${credentials}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(Number(body.amount) * 100), currency: 'INR', receipt: body.receipt }),
    });
    const result = await response.json();
    return json(res, response.status, result);
  } catch {
    return json(res, 500, { error: 'Unable to create Razorpay order' });
  }
}
