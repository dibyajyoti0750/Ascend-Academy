import CourseDetails from "@/components/student/CourseDetails";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import type { Course as CourseType } from "@/types/course";

interface Props {
  params: Promise<{ courseId: string }>;
}

export default async function Page({ params }: Props) {
  await connectDB();

  const { courseId } = await params;

  const courseData: CourseType | null = JSON.parse(
    JSON.stringify(
      await Course.findById(courseId)
        .populate({
          path: "educator",
        })
        .lean(),
    ),
  );

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

  return <CourseDetails courseData={courseData} />;
}
