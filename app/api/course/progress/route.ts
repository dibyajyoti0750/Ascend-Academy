import connectDB from "@/lib/db";
import CourseProgress from "@/models/CourseProgress";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const { courseId, lectureId } = await req.json();

    const progressData = await CourseProgress.findOne({
      userId: user._id,
      courseId,
    });

    if (
      progressData?.lectureCompleted.some(
        (id: string) => id.toString() === lectureId,
      )
    ) {
      return NextResponse.json({
        success: false,
        message: "Lecture already completed",
      });
    }

    await CourseProgress.findOneAndUpdate(
      { userId: user._id, courseId },
      {
        $addToSet: {
          lectureCompleted: lectureId,
        },
      },
      {
        upsert: true,
      },
    );

    return NextResponse.json({
      success: true,
      message: "Progress updated",
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

export async function GET(req: NextRequest) {
  // fetch becomes:
  // fetch(`/api/course/progress?courseId=${courseId}`)

  try {
    await connectDB();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const user = await User.findOne({
      clerkId: userId,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const courseId = req.nextUrl.searchParams.get("courseId");

    const progressData = await CourseProgress.findOne({
      userId: user._id,
      courseId,
    });

    return NextResponse.json({
      success: true,
      progressData,
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
