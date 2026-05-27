import { auth } from "@clerk/nextjs/server";
import StudentsEnrolled from "@/components/educator/StudentsEnrolled";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import Purchase from "@/models/Purchase";
import User from "@/models/User";
import { EnrolledStudentData } from "@/types/student";

export default async function Page() {
  await connectDB();

  const { userId } = await auth();
  const educator = await User.findOne({ clerkId: userId });
  const courses = await Course.find({
    educator: educator._id,
  }).lean();
  const courseIds = courses.map((course) => course._id);

  const purchases = await Purchase.find({
    courseId: { $in: courseIds },
    status: "completed",
  })
    .populate("userId", "_id name imageUrl")
    .populate("courseId", "courseTitle")
    .lean();

  const enrolledStudentsData: EnrolledStudentData[] = purchases.map(
    (purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }),
  );

  return <StudentsEnrolled enrolledStudentsData={enrolledStudentsData} />;
}
