import { people } from "@/assets/assets";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import {
  ArrowRight,
  BookOpen,
  PlayCircle,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-background to-background" />

      {/* Decorative Blurs */}
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 top-1/3 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 py-24 lg:flex-row lg:gap-16">
        {/* Left Content */}
        <div className="max-w-2xl flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-sm shadow-sm backdrop-blur transition-colors hover:bg-background">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75" />

              <span className="relative flex h-2 w-2 rounded-full bg-green-500" />
            </div>
            Trusted by 25,000+ students worldwide
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Master Skills That Actually{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Move Your Career Forward
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Master web development, AI, design, and business with project-based
            courses designed to help you build real-world skills and land
            opportunities faster.
          </p>

          {/* Social Proof */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
            <div className="flex items-center gap-0.5">
              <AnimatedTooltip items={people} />
            </div>

            <span>25K+ active learners</span>

            <div className="flex items-center gap-1 font-medium text-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              4.9/5 rating
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <Button
              size="lg"
              className="group h-12 px-8 text-base shadow-lg shadow-primary/20 cursor-pointer"
            >
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base backdrop-blur cursor-pointer"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Preview
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t pt-8">
            <div>
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <h3 className="text-2xl font-bold">150+</h3>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">Courses</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <Users className="h-4 w-4 text-primary shrink-0" />
                <h3 className="text-2xl font-bold">25K+</h3>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">Students</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <TrendingUp className="h-4 w-4 text-primary shrink-0" />
                <h3 className="text-2xl font-bold">4.9</h3>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Right Side Card */}
        <div className="relative mt-20 flex flex-1 items-center justify-center lg:mt-0">
          {/* Glow */}
          <div className="absolute h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          {/* Floating Badge */}
          <div className="absolute -left-8 top-8 hidden rounded-2xl border bg-background/90 px-4 py-3 shadow-xl backdrop-blur lg:block">
            <p className="text-xs text-muted-foreground">Students enrolled</p>

            <h4 className="mt-1 text-lg font-bold">12,400+</h4>
          </div>

          {/* Main Card */}
          <div className="relative w-full max-w-lg rounded-[2rem] border bg-background/80 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] border bg-muted/40 p-6">
              {/* Fake Browser */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-yellow-400" />
                  <div className="size-3 rounded-full bg-green-400" />
                </div>

                <div className="hidden rounded-full bg-background px-3 py-1 text-xs text-muted-foreground sm:block">
                  ascendacademy.dev
                </div>
              </div>

              {/* Course Preview */}
              <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary to-primary/60 p-8 text-primary-foreground">
                {/* Noise Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

                <div className="relative">
                  <p className="mb-2 text-sm font-medium opacity-80">
                    Featured Course
                  </p>

                  <h3 className="text-3xl font-bold leading-tight">
                    Full Stack Web Development
                  </h3>

                  <p className="mt-4 text-sm opacity-90">
                    Build modern apps with Next.js, TypeScript, MongoDB &
                    Tailwind CSS.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <div className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
                      42 Lessons
                    </div>

                    <div className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
                      Beginner to Pro
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border bg-background p-4 transition-transform hover:-translate-y-1">
                  <p className="text-sm text-muted-foreground">
                    Completion Rate
                  </p>

                  <h4 className="mt-2 text-2xl font-bold">92%</h4>
                </div>

                <div className="rounded-xl border bg-background p-4 transition-transform hover:-translate-y-1">
                  <p className="text-sm text-muted-foreground">
                    Avg. Salary Boost
                  </p>

                  <h4 className="mt-2 text-2xl font-bold">+68%</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Review Card */}
          <div className="absolute -bottom-6 right-0 hidden rounded-2xl border bg-background/90 p-4 shadow-xl backdrop-blur lg:block">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              “One of the best platforms to learn modern development.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
