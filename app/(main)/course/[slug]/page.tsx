import CourseDetails from "@/components/student/CourseDetails";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import Purchase from "@/models/Purchase";
import User from "@/models/User";
import type { Course as CourseType } from "@/types/course";
import { auth } from "@clerk/nextjs/server";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  await connectDB();

  const { slug } = await params;
  const { userId } = await auth();

  const userData = await User.findOne({ clerkId: userId });

  const courseData: CourseType | null = JSON.parse(
    JSON.stringify(
      await Course.findOne({ slug })
        .populate({
          path: "educator",
        })
        .lean(),
    ),
  );

  const existingPurchase = await Purchase.findOne({
    studentId: userData._id,
    courseId: courseData?._id,
    paymentStatus: "completed",
  });

  const isAlreadyEnrolled = !!existingPurchase;

  if (!courseData) {
    return <div>Course not found</div>;
  }

  courseData.courseContent.forEach((chapter) => {
    chapter.chapterContent.forEach((lecture) => {
      if (!lecture.isPreviewFree) {
        lecture.lectureUrl = "";
      }
    });
  });

  return (
    <CourseDetails
      courseData={courseData}
      isAlreadyEnrolled={isAlreadyEnrolled}
    />
  );
}
