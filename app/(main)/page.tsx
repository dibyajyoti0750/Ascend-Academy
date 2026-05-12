import Companies from "@/components/student/Companies";
import CoursesSection from "@/components/student/CoursesSection";
import CTA from "@/components/student/CTA";
import Footer from "@/components/student/Footer";
import Hero from "@/components/student/Hero";
import TestimonialsSection from "@/components/student/TestimonialsSection";

export default function Page() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialsSection />
      <CTA />
      <Footer />
    </main>
  );
}
