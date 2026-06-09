import Course from "@/models/Course";
import connectDB from "./db";

export async function getCourses() {
  await connectDB();

  return JSON.parse(
    JSON.stringify(
      await Course.find({ isPublished: true }).populate("educator").lean(),
    ),
  );
}
