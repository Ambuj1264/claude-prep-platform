import { NextRequest, NextResponse } from 'next/server';

const COUPON_CODE = 'CLAUDEEXAM';
const ORIGINAL_PRICE = 60;
const DISCOUNTED_PRICE = 30; // 50% off

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const trimmed = (code ?? '').trim().toUpperCase();

  if (trimmed === COUPON_CODE) {
    return NextResponse.json({
      valid: true,
      originalPrice: ORIGINAL_PRICE,
      discountedPrice: DISCOUNTED_PRICE,
      discount: ORIGINAL_PRICE - DISCOUNTED_PRICE,
    });
  }

  return NextResponse.json({ valid: false });
}
