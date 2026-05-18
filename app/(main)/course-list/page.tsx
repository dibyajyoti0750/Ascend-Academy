import { dummyCourses } from "@/assets/assets";
import CourseCard from "@/components/student/CourseCard";

interface Props {
  searchParams: Promise<{ query?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const { query } = await searchParams;

  const trimmedQuery = query?.trim() || "";

  const filteredCourses = trimmedQuery
    ? dummyCourses.filter((course) =>
        course.courseTitle.toLowerCase().includes(trimmedQuery.toLowerCase()),
      )
    : dummyCourses;

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-medium text-blue-600">
              Home / Course List
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              {trimmedQuery ? (
                <>
                  Search results for{" "}
                  <span className="text-blue-600">
                    &quot;{trimmedQuery}&quot;
                  </span>
                </>
              ) : (
                <>
                  Discover Our{" "}
                  <span className="text-blue-600">Top Courses</span>
                </>
              )}
            </h1>

            <p className="mt-4 text-base leading-7 text-zinc-600">
              Discover high quality courses from industry experts and improve
              your skills with hands-on learning.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
              {filteredCourses.length} Courses Found
            </div>
          </div>
        </div>
      </section>

      {/* Course Results */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredCourses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course, index) => (
              <CourseCard key={index} courseData={course} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-100 flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white px-6 text-center">
            <h2 className="text-2xl font-semibold text-zinc-900">
              No courses found
            </h2>

            <p className="mt-3 max-w-md text-zinc-500">
              We couldn&apos;t find any course matching{" "}
              <span className="font-medium text-zinc-700">
                &quot;{trimmedQuery}&quot;
              </span>
              . Try searching with a different keyword.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
