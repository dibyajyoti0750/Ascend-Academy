import connectDB from "@/lib/db";
import Course from "@/models/Course";
import Purchase from "@/models/Purchase";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await req.json();

  await connectDB();

  const student = await User.findOne({ clerkId: userId });

  const course = await Course.findById(courseId);

  if (!student || !course) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const amount =
    course.coursePrice - (course.coursePrice * course.discount) / 100;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  await Purchase.create({
    studentId: student._id,
    courseId: course._id,
    amount,
    razorpayOrderId: order.id,
  });

  return NextResponse.json(order);
}
