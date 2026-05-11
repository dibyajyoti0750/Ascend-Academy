export interface Course {
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
