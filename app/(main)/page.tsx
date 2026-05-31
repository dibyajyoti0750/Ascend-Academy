import { auth } from "@clerk/nextjs/server";
import Companies from "@/components/student/Companies";
import CoursesSection from "@/components/student/CoursesSection";
import CTA from "@/components/student/CTA";
import Footer from "@/components/student/Footer";
import Hero from "@/components/student/Hero";
import TestimonialsSection from "@/components/student/TestimonialsSection";
import ToastHandler from "@/components/ToastHandler";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import User from "@/models/User";
import { Course as CourseType } from "@/types/course";

export default async function page() {
  const { userId } = await auth();

  await connectDB();

  const allCourses: CourseType[] = JSON.parse(
    JSON.stringify(
      await Course.find({ isPublished: true })
        .populate({ path: "educator" })
        .lean(),
    ),
  );

  const userData = await User.findOne({ clerkId: userId }).lean();

  // console.log(userData);

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
