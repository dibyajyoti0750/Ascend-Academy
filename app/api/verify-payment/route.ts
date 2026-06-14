import connectDB from "@/lib/db";
import Course from "@/models/Course";
import Purchase from "@/models/Purchase";
import User from "@/models/User";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();

  await connectDB();

  const purchase = await Purchase.findOne({
    razorpayOrderId: razorpay_order_id,
  });

  if (!purchase) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  const isValid = generatedSignature === razorpay_signature;

  if (!isValid) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  purchase.paymentStatus = "completed";
  purchase.razorpayPaymentId = razorpay_payment_id;

  await purchase.save();

  await Course.findByIdAndUpdate(purchase.courseId, {
    $addToSet: { enrolledStudents: purchase.studentId },
  });

  await User.findByIdAndUpdate(purchase.studentId, {
    $addToSet: { enrolledCourses: purchase.courseId },
  });

  return NextResponse.json({
    success: true,
  });
}
