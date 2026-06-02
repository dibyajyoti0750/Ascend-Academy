"use client";

import { Course } from "@/types/course";
import Image from "next/image";
import Link from "next/link";

import Footer from "./Footer";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { calcTotalHours, calcTotalLectures } from "@/lib/helpers";
import { Check } from "lucide-react";
import { CourseProgress } from "@/types/courseProgress";

interface Props {
  enrolledCourses: Course[];
  progressDocs: CourseProgress[];
}

export default function MyEnrollments({
  enrolledCourses,
  progressDocs,
}: Props) {
  const progressMap = progressDocs.reduce(
    (acc, progress) => {
      acc[progress.courseId.toString()] = progress.lectureCompleted.length;

      return acc;
    },
    {} as Record<string, number>,
  );

  const courseWithProgress = enrolledCourses.map((course) => {
    const completedLectures = progressMap[course._id] ?? 0;
    const totalLectures = calcTotalLectures(course.courseContent);
    const progress =
      totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;
    const isCompleted =
      totalLectures > 0 && completedLectures === totalLectures;

    return {
      ...course,
      completedLectures,
      totalLectures,
      progress,
      isCompleted,
    };
  });

  return (
    <section className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Enrollments</h1>

          <p className="mt-2 text-muted-foreground">
            Track your course progress and continue learning.
          </p>
        </div>

        {/* Empty State */}
        {enrolledCourses.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <h2 className="text-xl font-semibold">No enrolled courses yet</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Start learning by enrolling in a course.
              </p>

              <Link
                href="/course-list"
                className="mt-6 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Browse Courses
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop Table */}
            <Card className="hidden overflow-hidden md:block">
              <CardHeader className="border-b bg-background">
                <CardTitle className="text-lg">Enrolled Courses</CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-muted/50 text-sm">
                    <tr className="border-b">
                      <th className="px-6 py-4 text-left font-medium">
                        Course
                      </th>

                      <th className="px-6 py-4 text-left font-medium">
                        Duration
                      </th>

                      <th className="px-6 py-4 text-left font-medium">
                        Progress
                      </th>

                      <th className="px-6 py-4 text-right font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {courseWithProgress.map((course) => (
                      <tr
                        key={course._id}
                        className="border-b transition hover:bg-muted/40"
                      >
                        {/* Course */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <Image
                              src={course.courseThumbnail}
                              alt={course.courseTitle}
                              width={120}
                              height={70}
                              className="rounded-lg border object-cover"
                            />

                            <div className="min-w-0 flex-1">
                              <h3 className="line-clamp-1 font-medium">
                                {course.courseTitle}
                              </h3>

                              <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>Course Progress</span>

                                  <span>{course.progress.toFixed(0)}%</span>
                                </div>

                                <Progress value={course.progress} />
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Duration */}
                        <td className="px-6 py-5 text-sm text-muted-foreground">
                          {calcTotalHours(course.courseContent)}h
                        </td>

                        {/* Lectures */}
                        <td className="px-6 py-5 text-sm">
                          {course.completedLectures}/{course.totalLectures}{" "}
                          lectures
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Badge
                              className={`${course.isCompleted ? "bg-green-50 text-green-500" : "bg-blue-50 text-blue-500"}`}
                            >
                              {course.isCompleted ? (
                                <span className="flex items-center gap-2">
                                  Completed <Check size={10} />
                                </span>
                              ) : (
                                <span>Ongoing</span>
                              )}
                            </Badge>

                            <Link
                              href={`/player/${course._id}`}
                              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                            >
                              {course.isCompleted ? "Review" : "Continue"}
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {courseWithProgress.map((course) => (
                <Card key={course._id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Image
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        width={100}
                        height={70}
                        className="rounded-md border object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 font-medium">
                          {course.courseTitle}
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {calcTotalHours(course.courseContent)}h total
                        </p>

                        <div className="mt-3">
                          <div className="mb-1 flex justify-between text-xs">
                            <span>Progress</span>

                            <span>{course.progress.toFixed(0)}%</span>
                          </div>

                          <Progress value={course.progress} />
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <Badge
                            className={`${course.isCompleted ? "bg-green-50 text-green-500" : "bg-blue-50 text-blue-500"}`}
                          >
                            {course.isCompleted ? (
                              <span className="flex items-center gap-2">
                                Completed <Check size={10} />
                              </span>
                            ) : (
                              <span>Ongoing</span>
                            )}
                          </Badge>

                          <Link
                            href={`/player/${course._id}`}
                            className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                          >
                            Continue
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </section>
  );
}
