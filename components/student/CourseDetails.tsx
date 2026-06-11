"use client";

import YouTube from "react-youtube";
import {
  calcAverageRating,
  calcChapterTime,
  calcTotalHours,
  calcTotalLectures,
  humanizeDuration,
  loadRazorpay,
} from "@/lib/helpers";

import { Course } from "@/types/course";
import { useState } from "react";
import { StarRating } from "./CourseCard";
import {
  BookOpen,
  ChevronDown,
  Clock,
  Infinity,
  MonitorCheck,
  PlayCircle,
  Star,
  TimerReset,
  Trophy,
  TvMinimalPlay,
} from "lucide-react";
import Image from "next/image";
import Footer from "./Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface Props {
  courseData: Course;
}

export default function CourseDetails({ courseData }: Props) {
  const { currency } = useCurrentUser();

  const totalHours = calcTotalHours(courseData.courseContent);

  const durationText =
    totalHours < 1
      ? `${Math.round(totalHours * 60)} min`
      : `${totalHours.toFixed(1)}h`;

  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
  });
  const [playerData, setPlayerData] = useState<{
    videoId: string;
  } | null>(null);

  const [isAlreadyEnrolled] = useState(false);

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const discountedPrice = (
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100
  ).toFixed(2);

  const handlePayment = async () => {
    await loadRazorpay();

    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: discountedPrice,
      }),
    });

    const order = await orderRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      handler: async function (response: any) {
        await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
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
                ✨ Bestseller Course
              </Badge>

              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                  {courseData.courseTitle}
                </h1>

                <p
                  className="mt-5 line-clamp-2 text-slate-600 text-base md:text-lg leading-7"
                  dangerouslySetInnerHTML={{
                    __html: courseData.courseDescription,
                  }}
                />
              </div>

              {/* Rating Row */}
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
                    {courseData.courseRatings.length}
                  </span>{" "}
                  {courseData.courseRatings.length > 1 ? "ratings" : "rating"}
                </p>

                <Separator orientation="vertical" className="h-5" />

                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">
                    {courseData.enrolledStudents.length}
                  </span>{" "}
                  {courseData.enrolledStudents.length > 1
                    ? "students"
                    : "students"}
                </p>
              </div>

              <p className="text-slate-600">
                Created by{" "}
                <span className="font-semibold text-primary underline">
                  Dibyajyoti
                </span>
              </p>
            </div>

            {/* COURSE CONTENT */}
            <div className="mt-14">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Course Content
                  </h2>

                  <p className="text-slate-500 mt-1">
                    {courseData.courseContent.length} sections •{" "}
                    {calcTotalLectures(courseData.courseContent)} lectures •{" "}
                    {durationText}
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
                      className="w-full flex items-center justify-between px-5 text-left cursor-pointer outline-none transition"
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
                              </div>
                            </div>

                            <div className="flex items-center gap-5">
                              {lecture.isPreviewFree && (
                                <div
                                  onClick={() =>
                                    setPlayerData({
                                      videoId:
                                        lecture.lectureUrl?.split("/").pop() ??
                                        "",
                                    })
                                  }
                                  className="flex items-center gap-1 text-blue-600 text-sm font-medium cursor-pointer hover:underline"
                                >
                                  <PlayCircle className="h-4 w-4" />
                                  Free Preview
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

            {/* DESCRIPTION */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-slate-900">
                Course Description
              </h3>

              <div
                className="text-slate-800 max-w-none mt-5"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription,
                }}
              />
            </div>

            <div className="mt-8 rounded-lg bg-yellow-50 border border-slate-200 p-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-700">
                  Disclaimer:
                </span>{" "}
                Results may vary based on individual effort, consistency, and
                personal circumstances. The course content is for educational
                purposes only.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:sticky lg:top-10">
            <Card className="shadow-custom-card overflow-hidden shadow-xl p-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
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
                <div className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                  <TimerReset className="h-5 w-5" />
                  <p className="font-medium text-sm">
                    Price increases in 4 days
                  </p>
                </div>

                {/* PRICE */}
                <div className="mt-6 flex items-end gap-3 flex-wrap">
                  <h2 className="text-4xl font-bold text-slate-900">
                    {currency}
                    {discountedPrice}
                  </h2>

                  <p className="text-lg text-slate-400 line-through">
                    {currency}
                    {courseData.coursePrice}
                  </p>

                  <Badge
                    variant="secondary"
                    className="mb-1 bg-green-200 text-green-700"
                  >
                    {courseData.discount}% OFF
                  </Badge>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="rounded-xl border bg-slate-50 p-3 text-center">
                    <Star className="h-5 w-5 mx-auto fill-yellow-400 text-yellow-400" />
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {calcAverageRating(courseData.courseRatings)}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-slate-50 p-3 text-center">
                    <Clock className="h-5 w-5 mx-auto text-slate-700" />
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {durationText}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-slate-50 p-3 text-center">
                    <BookOpen className="h-5 w-5 mx-auto text-slate-700" />
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {calcTotalLectures(courseData.courseContent)}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={handlePayment}
                  className="w-full mt-7 h-12 text-base font-semibold cursor-pointer"
                >
                  {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
                </Button>

                {/* FEATURES */}
                <div className="mt-8">
                  <h4 className="font-semibold text-lg text-slate-900">
                    This course includes
                  </h4>

                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <Infinity className="h-5 w-5 text-primary" />
                      <p className="text-slate-600">
                        Lifetime access with future updates
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <MonitorCheck className="h-5 w-5 text-primary" />
                      <p className="text-slate-600">
                        Access on mobile, tablet & desktop
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Trophy className="h-5 w-5 text-primary" />
                      <p className="text-slate-600">
                        Certificate of completion
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
