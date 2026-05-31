import { Educator } from "./educator";

export interface Lecture {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
}

export interface Chapter {
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  chapterContent: Lecture[];
}

interface CourseRating {
  userId: string;
  rating: number;
  _id: string;
}

export interface Course {
  _id: string;
  courseTitle: string;
  slug: string;
  courseDescription: string;
  courseRequirements: string;
  courseThumbnail: string;
  coursePrice: number;
  discount: number;
  isPublished: boolean;
  courseLevel: string;
  courseContent: Chapter[];
  educator: Educator;
  enrolledStudents: string[];
  courseRatings: CourseRating[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
