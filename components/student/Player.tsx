"use client";

import { dummyCourses } from "@/assets/assets";
import {
  calcAverageRating,
  calcChapterTime,
  calcTotalHours,
  calcTotalLectures,
  humanizeDuration,
} from "@/lib/helpers";
import {
  BookOpen,
  ChevronDown,
  Clock,
  PlayCircle,
  Star,
  TvMinimalPlay,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { StarRating } from "./CourseCard";
import YouTube from "react-youtube";
import Footer from "./Footer";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Rating from "../Rating";

interface Props {
  courseId: string;
}

export default function Player({ courseId }: Props) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
  });

  const [playerData, setPlayerData] = useState<{
    videoId: string;
    chapter: number;
    lecture: number;
    title: string;
  } | null>(null);

  const courseData = dummyCourses.find(({ _id }) => _id === courseId);

  if (!courseData) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-slate-600">Course not found</p>
      </section>
    );
  }

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
          {/* LEFT COLUMN */}
          <div>
            {/* HERO */}
            <div className="space-y-5">
              <Badge className="rounded-full px-4 py-1 text-sm">
                Continue Learning...
              </Badge>

              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                  {courseData.courseTitle}
                </h1>

                <p className="mt-5 text-slate-600 text-base md:text-lg leading-7">
                  Continue your learning journey and track your course progress
                  section by section.
                </p>
              </div>

              {/* STATS */}
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">
                    {calcAverageRating(courseData.courseRatings)}
                  </span>

                  <StarRating
                    rating={calcAverageRating(courseData.courseRatings)}
                  />
                </div>

                <Separator orientation="vertical" className="h-5" />

                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">
                    {calcTotalLectures(courseData.courseContent)}
                  </span>{" "}
                  lectures
                </p>

                <Separator orientation="vertical" className="h-5" />

                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">
                    {calcTotalHours(courseData.courseContent)}
                  </span>{" "}
                  total hours
                </p>
              </div>
            </div>

            {/* COURSE CONTENT */}
            <div className="mt-14">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Course Structure
                  </h2>

                  <p className="text-slate-500 mt-1">
                    {courseData.courseContent.length} sections •{" "}
                    {calcTotalLectures(courseData.courseContent)} lectures •{" "}
                    {calcTotalHours(courseData.courseContent)} total hours
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {courseData.courseContent.map((chapter, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-slate-200 shadow-sm"
                  >
                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${
                              openSections[index] ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {chapter.chapterTitle}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            {chapter.chapterContent.length} lectures
                          </p>
                        </div>
                      </div>

                      <p className="hidden sm:block text-sm font-medium text-slate-500">
                        {calcChapterTime(chapter)}
                      </p>
                    </button>

                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        openSections[index] ? "max-h-250" : "max-h-0"
                      }`}
                    >
                      <Separator />

                      <div className="p-5 space-y-4 bg-white">
                        {chapter.chapterContent.map((lecture, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-between gap-4"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">
                                <TvMinimalPlay className="h-5 w-5 text-slate-500" />
                              </div>

                              <div>
                                <p className="font-medium text-slate-800">
                                  {lecture.lectureTitle}
                                </p>

                                <p className="text-sm text-slate-500 mt-1">
                                  Lecture {idx + 1}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-5">
                              {lecture.lectureUrl && (
                                <div
                                  onClick={() =>
                                    setPlayerData({
                                      videoId:
                                        lecture.lectureUrl?.split("/").pop() ??
                                        "",
                                      chapter: index + 1,
                                      lecture: idx + 1,
                                      title: lecture.lectureTitle,
                                    })
                                  }
                                  className="flex items-center gap-1 text-blue-600 text-sm font-medium cursor-pointer hover:underline"
                                >
                                  <PlayCircle className="h-4 w-4" />
                                  Watch
                                </div>
                              )}

                              <p className="text-sm text-slate-500 whitespace-nowrap">
                                {humanizeDuration(lecture.lectureDuration)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* RATE COURSE */}
            <Rating />
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:sticky lg:top-10">
            <Card className="overflow-hidden shadow-xl p-0 border-slate-200">
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                {playerData ? (
                  <YouTube
                    videoId={playerData.videoId}
                    className="h-full w-full"
                    iframeClassName="h-full w-full"
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                      },
                    }}
                  />
                ) : (
                  <Image
                    src={courseData.courseThumbnail}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <CardContent className="px-6 py-5">
                {playerData ? (
                  <div>
                    <Badge variant="secondary" className="mb-4">
                      Chapter {playerData.chapter} • Lecture{" "}
                      {playerData.lecture}
                    </Badge>

                    <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                      {playerData.title}
                    </h2>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="rounded-xl border bg-slate-50 p-3 text-center">
                        <BookOpen className="h-5 w-5 mx-auto text-slate-700" />

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {courseData.courseContent.length}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">Sections</p>
                      </div>

                      <div className="rounded-xl border bg-slate-50 p-3 text-center">
                        <Clock className="h-5 w-5 mx-auto text-slate-700" />

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {calcTotalHours(courseData.courseContent)}h
                        </p>

                        <p className="text-xs text-slate-500 mt-1">Hours</p>
                      </div>

                      <div className="rounded-xl border bg-slate-50 p-3 text-center">
                        <Star className="h-5 w-5 mx-auto fill-yellow-400 text-yellow-400" />

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {calcAverageRating(courseData.courseRatings)}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">Rating</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Badge className="mb-4">Start Watching</Badge>

                    <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                      Pick a lecture from the course structure to begin learning
                    </h2>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="rounded-xl border bg-slate-50 p-3 text-center">
                        <BookOpen className="h-5 w-5 mx-auto text-slate-700" />

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {courseData.courseContent.length}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">Sections</p>
                      </div>

                      <div className="rounded-xl border bg-slate-50 p-3 text-center">
                        <Clock className="h-5 w-5 mx-auto text-slate-700" />

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {calcTotalHours(courseData.courseContent)}h
                        </p>

                        <p className="text-xs text-slate-500 mt-1">Hours</p>
                      </div>

                      <div className="rounded-xl border bg-slate-50 p-3 text-center">
                        <Star className="h-5 w-5 mx-auto fill-yellow-400 text-yellow-400" />

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {calcAverageRating(courseData.courseRatings)}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">Rating</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
