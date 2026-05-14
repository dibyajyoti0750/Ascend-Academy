"use client";

import { dummyCourses } from "@/assets/assets";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CoursesSection() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            {/* Eyebrow */}
            <Badge
              variant="secondary"
              className="w-fit gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium tracking-wide"
            >
              <Sparkles className="h-3 w-3 text-amber-500" /> Handpicked for you
            </Badge>

            {/* Headline */}
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Featured{" "}
              <span className="relative inline-block">
                Courses
                {/* Underline accent */}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500"
                />
              </span>
            </h2>

            <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Expand your skills with expert-led courses — curated from
              thousands of learners&apos; favourites.
            </p>
          </div>

          {/* Desktop CTA */}
          <Button
            asChild
            variant="outline"
            className="hidden shrink-0 gap-2 rounded-full border-border/80 sm:flex"
          >
            <Link href="/course-list" className="group">
              Browse all courses
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dummyCourses.slice(0, 4).map((course, index) => (
            <div
              key={index}
              className="animate-fade-up opacity-0"
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: "forwards",
              }}
            >
              <CourseCard courseData={course} />
            </div>
          ))}
        </div>

        {/* ── Mobile CTA ── */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Button
            asChild
            variant="outline"
            className="gap-2 rounded-full border-border/80"
          >
            <Link href="/courses">
              Browse all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Keyframe injection ── */}
      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation-name: fade-up;
          animation-duration: 500ms;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </section>
  );
}
