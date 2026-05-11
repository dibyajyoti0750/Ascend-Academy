"use client";

import { Course } from "@/types/course";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen, Clock, Star, Users, Zap } from "lucide-react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

function calcAverageRating(ratings: Course["courseRatings"]): number {
  if (!ratings?.length) return 0;
  return ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
}

function calcTotalHours(content: Course["courseContent"]): number {
  const totalMinutes = content?.reduce((acc, chapter) => {
    const chapterMinutes = chapter.chapterContent?.reduce(
      (s, l) => s + (l.lectureDuration ?? 0),
      0,
    );
    return acc + (chapterMinutes ?? 0);
  }, 0);
  return Math.round((totalMinutes ?? 0) / 60);
}

function calcTotalLectures(content: Course["courseContent"]): number {
  return (
    content?.reduce((acc, ch) => acc + (ch.chapterContent?.length ?? 0), 0) ?? 0
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block">
            <Star
              className="h-3.5 w-3.5 text-muted-foreground/30"
              strokeWidth={0}
              fill="currentColor"
            />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
              >
                <Star
                  className="h-3.5 w-3.5 text-amber-400"
                  strokeWidth={0}
                  fill="currentColor"
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CourseCard
───────────────────────────────────────────── */

export default function CourseCard(course: Course) {
  const {
    courseTitle,
    courseDescription,
    coursePrice,
    discount,
    courseThumbnail,
    enrolledStudents,
    courseRatings,
    courseContent,
  } = course;

  const avgRating = calcAverageRating(courseRatings);
  const totalHours = calcTotalHours(courseContent);
  const totalLectures = calcTotalLectures(courseContent);
  const discountedPrice =
    discount > 0 ? coursePrice - (coursePrice * discount) / 100 : null;
  const hasDiscount = discount > 0;

  return (
    <TooltipProvider>
      <Card className="group relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl p-0 border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 cursor-pointer">
        {/* ── Thumbnail ── */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={courseThumbnail}
            alt={courseTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 384px"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Discount badge */}
          {hasDiscount && (
            <Badge className="absolute left-3 top-3 gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md backdrop-saturate-150 hover:bg-white/15">
              <Zap className="h-3 w-3 text-rose-300" />
              {discount}% OFF
            </Badge>
          )}

          {/* Rating pill — appears on hover */}
          {courseRatings?.length > 0 && (
            <div className="absolute bottom-3 left-3 flex translate-y-1 items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <StarRating rating={avgRating} />
              <span className="text-[11px] font-medium text-white">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-[11px] text-white/60">
                ({courseRatings.length})
              </span>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <CardContent className="flex flex-1 flex-col gap-3 p-4 pb-0">
          {/* Title */}
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-foreground">
            {courseTitle}
          </h3>

          {/* Description */}
          <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
            {courseDescription.replace(/<[^>]*>/g, "")}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
            {totalLectures > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex cursor-default items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    {totalLectures} lectures
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Total lectures in this course</p>
                </TooltipContent>
              </Tooltip>
            )}

            {totalLectures > 0 && totalHours > 0 && (
              <span className="text-border">·</span>
            )}

            {totalHours > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex cursor-default items-center gap-1">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    {totalHours}h content
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Total video hours</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <Separator className="mt-1" />
        </CardContent>

        {/* ── Footer ── */}
        <CardFooter className="flex items-center justify-between gap-2 p-4 pt-3">
          {/* Enrolled avatars */}
          <div className="flex items-center gap-2">
            {enrolledStudents?.length > 0 ? (
              <>
                <div className="flex -space-x-2">
                  {enrolledStudents.slice(0, 3).map((id, idx) => (
                    <Avatar
                      key={idx}
                      className="h-6 w-6 border-2 border-card"
                      style={{ zIndex: 3 - idx }}
                    >
                      <AvatarFallback className="bg-linear-to-br from-indigo-400 to-violet-500 text-[9px] font-bold text-white">
                        {String.fromCharCode(65 + ((idx * 7) % 26))}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {enrolledStudents.length.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-[12px] text-muted-foreground">
                Be the first to enroll
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col items-end">
            {hasDiscount && discountedPrice !== null ? (
              <>
                <span className="text-[17px] font-bold leading-none text-foreground">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-[11px] leading-none text-muted-foreground line-through">
                  ${coursePrice.toFixed(2)}
                </span>
              </>
            ) : coursePrice === 0 ? (
              <span className="text-[17px] font-bold leading-none text-emerald-500">
                Free
              </span>
            ) : (
              <span className="text-[17px] font-bold leading-none text-foreground">
                ${coursePrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
