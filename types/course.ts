import { Educator } from "./educator";

export interface Lecture {
  _id: string;
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

export interface CourseRating {
  userId: string;
  rating: number;
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
