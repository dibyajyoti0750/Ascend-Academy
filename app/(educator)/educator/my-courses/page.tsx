import { dummyCourses } from "@/assets/assets";
import MyCourses from "@/components/educator/MyCourses";

export default function page() {
  if (!dummyCourses) {
    return <div>Courses not found</div>;
  }

  return <MyCourses courses={dummyCourses} />;
}
