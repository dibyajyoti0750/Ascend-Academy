import { dummyCourses } from "@/assets/assets";
import CourseDetails from "@/components/student/CourseDetails";

interface Props {
  params: Promise<{ courseId: string }>;
}

export default async function page({ params }: Props) {
  const { courseId } = await params;
  const courseData = dummyCourses.find(({ _id }) => _id === courseId) || null;

  if (!courseData) {
    return <div>Course not found</div>;
  }

  return <CourseDetails courseData={courseData} />;
}
