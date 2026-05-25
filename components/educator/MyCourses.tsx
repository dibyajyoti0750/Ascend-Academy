"use client";

import Image from "next/image";
import Link from "next/link";

import {
  BookOpen,
  CalendarDays,
  Eye,
  IndianRupee,
  Star,
  Users,
} from "lucide-react";

import { Course } from "@/types/course";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

interface Props {
  courses: Course[];
}

export default function MyCourses({ courses }: Props) {
  const totalRevenue = courses.reduce((acc, course) => {
    const discountedPrice =
      course.coursePrice - (course.coursePrice * course.discount) / 100;

    return acc + discountedPrice * course.enrolledStudents.length;
  }, 0);

  const totalStudents = courses.reduce(
    (acc, course) => acc + course.enrolledStudents.length,
    0,
  );

  return (
    <section className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>

            <p className="text-muted-foreground">
              Track course performance, students, and revenue.
            </p>
          </div>

          <Button asChild>
            <Link href="/educator/add-course">Add Course</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>

                <h2 className="mt-2 text-3xl font-bold">{courses.length}</h2>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>

                <h2 className="mt-2 text-3xl font-bold">{totalStudents}</h2>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Users className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>

                <h2 className="mt-2 text-3xl font-bold">
                  ₹{totalRevenue.toFixed(2)}
                </h2>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <IndianRupee className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Courses Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {courses.map((course) => {
                    const discountedPrice =
                      course.coursePrice -
                      (course.coursePrice * course.discount) / 100;

                    const revenue =
                      discountedPrice * course.enrolledStudents.length;

                    const averageRating =
                      course.courseRatings.length > 0
                        ? (
                            course.courseRatings.reduce(
                              (acc, item) => acc + item.rating,
                              0,
                            ) / course.courseRatings.length
                          ).toFixed(1)
                        : "0";

                    return (
                      <TableRow key={course._id}>
                        {/* Course */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-14 w-24 overflow-hidden rounded-md">
                              <Image
                                src={course.courseThumbnail}
                                alt={course.courseTitle}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div>
                              <p className="max-w-55 truncate font-medium">
                                {course.courseTitle}
                              </p>

                              <p className="text-sm text-muted-foreground">
                                ₹{discountedPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge
                            variant={
                              course.isPublished ? "default" : "secondary"
                            }
                          >
                            {course.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>

                        {/* Students */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />

                            {course.enrolledStudents.length}
                          </div>
                        </TableCell>

                        {/* Revenue */}
                        <TableCell className="font-medium">
                          ₹{revenue.toFixed(2)}
                        </TableCell>

                        {/* Rating */}
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                            {averageRating}
                          </div>
                        </TableCell>

                        {/* Published Date */}
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />

                            {new Date(course.createdAt).toDateString()}
                          </div>
                        </TableCell>

                        {/* Action */}
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/course/${course._id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
