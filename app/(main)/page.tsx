import Companies from "@/components/student/Companies";
import CoursesSection from "@/components/student/CoursesSection";
import CTA from "@/components/student/CTA";
import Footer from "@/components/student/Footer";
import Hero from "@/components/student/Hero";
import TestimonialsSection from "@/components/student/TestimonialsSection";
import ToastHandler from "@/components/ToastHandler";
import connectDB from "@/lib/db";
import Course from "@/models/Course";

export default async function page() {
  await connectDB();

  const courses = await Course.find({ isPublished: true })
    .select(["-courseContent", "-enrolledStudents"])
    .populate({ path: "educator" })
    .lean();

  return (
    <main className="overflow-hidden">
      <Hero />
      <Companies />
      <CoursesSection courses={courses} />
      <TestimonialsSection />
      <CTA />
      <Footer />
      <ToastHandler />
    </main>
  );
}
