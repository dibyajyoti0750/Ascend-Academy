import slugify from "slugify";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";
import Course from "@/models/Course";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
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

    const dbUser = await User.findOne({
      clerkId: userId,
    });

    if (!dbUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const formData = await req.formData();

    const courseData = formData.get("courseData") as string;
    const thumbnail = formData.get("thumbnail") as File;

    if (!thumbnail) {
      return NextResponse.json(
        {
          success: false,
          message: "Thumbnail not attached",
        },
        { status: 400 },
      );
    }

    const parsedCourseData = JSON.parse(courseData);

    parsedCourseData.educator = dbUser._id;

    // Convert file to buffer
    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to cloudinary
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "Ascend-Academy" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    parsedCourseData.courseThumbnail = uploadResponse.secure_url;

    parsedCourseData.slug = slugify(parsedCourseData.courseTitle, {
      lower: true,
      strict: true,
    });

    await Course.create(parsedCourseData);

    return NextResponse.json({
      success: true,
      message: "Course created successfully",
    });
  } catch (error: any) {
    console.error("COURSE CREATE ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
        stack: error.stack,
      },
      { status: 500 },
    );
  }
}
