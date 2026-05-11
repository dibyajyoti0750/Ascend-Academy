import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  discount: number;
  courseThumbnail: string;
  enrolledStudents: string[];
  courseRatings: {
    rating: number;
  }[];
  courseContent: {
    chapterContent: {
      lectureDuration: number;
    }[];
  }[];
}

interface CoursesSectionProps {
  courses: Course[];
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
  const getTotalDuration = (course: Course) => {
    return course.courseContent.reduce((total, chapter) => {
      return (
        total +
        chapter.chapterContent.reduce(
          (sum, lecture) => sum + lecture.lectureDuration,
          0,
        )
      );
    }, 0);
  };

  const getAverageRating = (course: Course) => {
    if (!course.courseRatings.length) return 0;

    const total = course.courseRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0,
    );

    return (total / course.courseRatings.length).toFixed(1);
  };

  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              Popular Courses
            </p>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Learn New Skills
            </h2>
          </div>

          <Button variant="outline" asChild>
            <Link href="/course-list">View All</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {courses.slice(0, 4).map((course) => {
            const totalDuration = getTotalDuration(course);
            const avgRating = getAverageRating(course);
            const discountedPrice = getDiscountedPrice(
              course.coursePrice,
              course.discount,
            );

            return (
              <Card
                key={course._id}
                className="group overflow-hidden rounded-2xl border p-0 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {course.discount > 0 && (
                    <Badge className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-xl">
                      {course.discount}% OFF
                    </Badge>
                  )}
                </div>

                <CardHeader className="space-y-3">
                  <h3 className="line-clamp-2 text-lg font-semibold">
                    {course.courseTitle}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      <span>{avgRating}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Users className="size-4" />
                      <span>{course.enrolledStudents.length}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{totalDuration}m</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div
                    className="line-clamp-3 text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: course.courseDescription,
                    }}
                  />
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">
                      ${discountedPrice.toFixed(2)}
                    </span>

                    {course.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${course.coursePrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Button asChild>
                    <Link href={`/courses/${course._id}`}>Enroll</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
