export interface Educator {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  imageUrl: string;
  enrolledCourses: string[];
  role: "admin" | "educator" | "student";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
