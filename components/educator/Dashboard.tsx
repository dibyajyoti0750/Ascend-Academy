"use client";

import { BookOpen, Users, TrendingUp, DollarSign } from "lucide-react";

import { useStore } from "@/store/educator-store";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardData } from "@/types/course";

interface Props {
  dashboardData: DashboardData;
}

export default function Dashboard({ dashboardData }: Props) {
  const { currency } = useStore();

  const stats = [
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalEarnings}`,
      icon: DollarSign,
      description: "+12.5% from last month",
    },
    {
      title: "Total Courses",
      value: dashboardData.totalCourses,
      icon: BookOpen,
      description: "Published courses",
    },
    {
      title: "Total Students",
      value: dashboardData.enrolledStudentsData.length,
      icon: Users,
      description: "Active enrollments",
    },
    {
      title: "Growth Rate",
      value: "18%",
      icon: TrendingUp,
      description: "Student engagement",
    },
  ];

  return (
    <section className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Educator Dashboard
          </h1>

          <p className="text-muted-foreground">
            Monitor your courses, students, and earnings.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className="border-border/50 shadow-sm transition-all hover:shadow-md"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>

                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Enrollments */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Enrollments</CardTitle>

              <CardDescription>
                Students who recently enrolled in your courses
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {dashboardData.enrolledStudentsData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={item.student.imageUrl}
                                alt={item.student.name}
                              />

                              <AvatarFallback>
                                {item.student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <p className="font-medium">{item.student.name}</p>

                              <p className="text-sm text-muted-foreground">
                                ID: {item.student._id.slice(0, 10)}...
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="font-medium">
                          {item.courseTitle}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Earnings Card */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>

              <CardDescription>Your platform revenue overview</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Available Balance</p>

                    <h2 className="mt-2 text-4xl font-bold">
                      {currency}
                      {dashboardData.totalEarnings}
                    </h2>
                  </div>

                  <div className="rounded-full bg-white/20 p-3">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Courses
                    </p>

                    <h3 className="text-xl font-semibold">
                      {dashboardData.totalCourses}
                    </h3>
                  </div>

                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Students
                    </p>

                    <h3 className="text-xl font-semibold">
                      {dashboardData.enrolledStudentsData.length}
                    </h3>
                  </div>

                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
