export interface CourseProgress {
  userId: string;
  courseId: string;
  completed: boolean;
  lectureCompleted: string[];
}
