import { dummyStudentEnrolled } from "@/assets/assets";
import StudentsEnrolled from "@/components/educator/StudentsEnrolled";

export default function page() {
  if (!dummyStudentEnrolled) {
    return <div>Student data not found</div>;
  }

  return <StudentsEnrolled enrolledStudents={dummyStudentEnrolled} />;
}
