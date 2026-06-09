import Companies from "@/components/student/Companies";
import CoursesSection from "@/components/student/CoursesSection";
import CTA from "@/components/student/CTA";
import Footer from "@/components/student/Footer";
import Hero from "@/components/student/Hero";
import TestimonialsSection from "@/components/student/TestimonialsSection";
import ToastHandler from "@/components/ToastHandler";
import connectDB from "@/lib/db";
import { getCourses } from "@/lib/getCourses";
import { Course as CourseType } from "@/types/course";

export default async function page() {
  await connectDB();

  const allCourses: CourseType[] = await getCourses();

  return (
    <main className="overflow-hidden">
      <Hero />
      <Companies />
      <CoursesSection allCourses={allCourses} />
      <TestimonialsSection />
      <CTA />
      <Footer />
      <ToastHandler />
    </main>
  );
}
