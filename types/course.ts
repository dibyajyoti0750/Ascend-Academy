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
  isPublished: boolean;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  discount: number;
  courseThumbnail: string;
  enrolledStudents: string[];
  courseRatings: CourseRating[];
  courseContent: Chapter[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface EnrolledStudentData {
  courseTitle: string;
  student: {
    _id: string;
    name: string;
    imageUrl: string;
  };
}

export interface DashboardData {
  totalEarnings: number;
  enrolledStudentsData: EnrolledStudentData[];
  totalCourses: number;
}
