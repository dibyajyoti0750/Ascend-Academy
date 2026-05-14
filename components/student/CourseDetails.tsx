"use client";

import {
  calcAverageRating,
  calcChapterTime,
  humanizeDuration,
} from "@/lib/helpers";
import { useStore } from "@/store/educator-store";
import { Course } from "@/types/course";
import { useState } from "react";
import { StarRating } from "./CourseCard";
import {
  ChevronDown,
  CirclePlay,
  PlayCircle,
  TvMinimalPlay,
} from "lucide-react";

interface Props {
  courseData: Course;
}

export default function CourseDetails({ courseData }: Props) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
  });
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const { currency } = useStore();

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section>
      <div className="w-full relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left">
        {/* left column */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="text-[26px] leading-9 md:text-[36px] md:leading-11 font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* reviews and ratings */}
          <div className="flex items-center gap-2 pt-3 pb-1 text-sm">
            <p>{calcAverageRating(courseData.courseRatings)}</p>

            <StarRating rating={calcAverageRating(courseData.courseRatings)} />

            <p className="text-blue-600">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>

          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-600 underline">Dibyajyoti</span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronDown
                        className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`}
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-base">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calcChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, idx) => (
                        <li key={idx} className="flex items-start gap-2 py-1">
                          <TvMinimalPlay size={20} />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex items-center gap-2">
                              {lecture.isPreviewFree && (
                                <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                                  <PlayCircle size={16} />
                                  Preview
                                </div>
                              )}
                              <p>{humanizeDuration(lecture.lectureDuration)}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
