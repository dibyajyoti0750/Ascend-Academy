import Player from "@/components/student/Player";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import CourseProgress from "@/models/CourseProgress";
import User from "@/models/User";
import { Course as CourseType } from "@/types/course";
import { auth } from "@clerk/nextjs/server";

interface Props {
  params: Promise<{ courseId: string }>;
}

export default async function page({ params }: Props) {
  const { courseId } = await params;
  const { userId } = await auth();

  await connectDB();

  const user = await User.findOne({ clerkId: userId });

  const courseData: CourseType = JSON.parse(
    JSON.stringify(await Course.findById(courseId).lean()),
  );

  const userRating =
    courseData.courseRatings.find(
      (r) => r.userId.toString() === user._id.toString(),
    )?.rating ?? 0;

  const progressDoc = await CourseProgress.findOne({ courseId });

  return (
    <Player
      courseData={courseData}
      progressDoc={progressDoc}
      userId={user._id.toString()}
      userRating={userRating}
    />
  );
}
