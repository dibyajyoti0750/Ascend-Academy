import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  const isValid = generatedSignature === razorpay_signature;

  if (!isValid) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Grant access here
  // Update database
  // Mark order as paid

  return NextResponse.json({
    success: true,
  });
}
