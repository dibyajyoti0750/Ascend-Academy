import { dummyCourses } from "@/assets/assets";
import MyEnrollments from "@/components/student/MyEnrollments";

export default function page() {
  const enrolledCourses = dummyCourses.slice(0, 3);

  return <MyEnrollments enrolledCourses={enrolledCourses} />;
}
