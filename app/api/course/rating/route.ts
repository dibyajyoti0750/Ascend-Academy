import connectDB from "@/lib/db";
import Course from "@/models/Course";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface Rating {
  userId: string;
  rating: number;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId } = await auth();

    const { courseId, rating } = await req.json();

    if (!userId || !courseId || rating == null || rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid details",
        },
        { status: 400 },
      );
    }

    const user = await User.findOne({
      clerkId: userId,
    });

    if (
      !user ||
      !user.enrolledCourses.some((id: string) => id.toString() === courseId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "User has not purchased this course",
        },
        { status: 404 },
      );
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found",
        },
        { status: 404 },
      );
    }

    const existingRatingIndex = course.courseRatings.findIndex(
      (r: Rating) => r.userId.toString() === user._id.toString(),
    );

    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({
        userId: user._id,
        rating,
      });
    }

    await course.save();

    return NextResponse.json({
      success: true,
      message: "Rating added",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
