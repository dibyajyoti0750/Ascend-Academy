"use client";

import Image from "next/image";

import { EnrolledStudentData } from "@/types/student";

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

import { CalendarDays, GraduationCap, Users } from "lucide-react";

interface Props {
  enrolledStudentsData: EnrolledStudentData[];
}

export default function StudentsEnrolled({ enrolledStudentsData }: Props) {
  const totalStudents = enrolledStudentsData.length;

  const uniqueCourses = new Set(
    enrolledStudentsData.map((item) => item.courseTitle),
  ).size;

  return (
    <section className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Enrolled Students
          </h1>

          <p className="text-muted-foreground">
            View all students enrolled in your courses.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
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
                <p className="text-sm text-muted-foreground">Total Courses</p>

                <h2 className="mt-2 text-3xl font-bold">{uniqueCourses}</h2>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {enrolledStudentsData.map((item) => (
                    <TableRow key={`${item.student._id}-${item.courseTitle}`}>
                      {/* Student */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={item.student.imageUrl}
                              alt={item.student.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <p className="font-medium">{item.student.name}</p>

                            <p className="text-sm text-muted-foreground">
                              {item.student._id}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Course */}
                      <TableCell>
                        <p className="max-w-64 truncate font-medium">
                          {item.courseTitle}
                        </p>
                      </TableCell>

                      {/* Purchase Date */}
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />

                          {new Date(item.purchaseDate).toDateString()}
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge>Enrolled</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
