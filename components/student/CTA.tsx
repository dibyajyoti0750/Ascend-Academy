"use client";

import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 px-8 py-16 shadow-2xl md:px-16">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(99,102,241,0.18),transparent,rgba(168,85,247,0.12))]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-medium text-zinc-300">
                Trusted by thousands of learners
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              Start building real-world skills that actually matter
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Master development, design, and modern tech with structured
              courses, hands-on projects, and expert guidance.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={"/course-list"}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-200"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur transition-all duration-300 hover:bg-white/10">
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold text-white">15K+</h3>
                <p className="mt-1 text-sm text-zinc-400">Active learners</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold text-white">120+</h3>
                <p className="mt-1 text-sm text-zinc-400">Premium courses</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold text-white">4.9★</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Average student rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
