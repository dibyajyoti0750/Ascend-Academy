interface Student {
  _id: string;
  name: string;
  imageUrl: string;
}

export interface EnrolledStudentData {
  student: Student;
  courseTitle: string;
  purchaseDate: string;
}

export interface DashboardData {
  totalEarnings: number;
  enrolledStudentsData: EnrolledStudentData[];
  totalCourses: number;
}
