import { dummyCourses } from "@/assets/assets";
import Companies from "@/components/student/Companies";
import CoursesSection from "@/components/student/CoursesSection";
import Hero from "@/components/student/Hero";

export default function Page() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Companies />
      <CoursesSection courses={dummyCourses} />
    </main>
  );
}
