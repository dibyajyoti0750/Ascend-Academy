"use server";

import connectDB from "@/lib/db";
import Course from "@/models/Course";
import { CourseRating } from "@/types/course";

export async function submitRating(
  courseId: string,
  userId: string,
  rating: number,
) {
  await connectDB();

  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const existingRating = course.courseRatings.find(
    (r: CourseRating) => r.userId.toString() === userId,
  );

  if (existingRating) {
    existingRating.rating = rating;
  } else {
    course.courseRatings.push({ userId, rating });
  }

  await course.save();

  return { success: true };
}
