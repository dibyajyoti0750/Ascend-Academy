import { auth } from "@clerk/nextjs/server";
import Dashboard from "@/components/educator/Dashboard";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import Purchase from "@/models/Purchase";
import User from "@/models/User";
import { EnrolledStudentData, Student } from "@/types/student";

export default async function page() {
  await connectDB();

  const { userId } = await auth();
  const educator = await User.findOne({ clerkId: userId });

  const courses = await Course.find({
    educator: educator._id,
  })
    .populate("enrolledStudents", "_id name imageUrl")
    .lean();

  const totalCourses = courses.length;

  const courseIds = courses.map((course) => course._id);

  const purchases = await Purchase.find({
    courseId: { $in: courseIds },
    paymentStatus: "completed",
  }).lean();

  const totalEarnings = purchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0,
  );

  const enrolledStudentsData: EnrolledStudentData[] = [];

  courses.forEach((course) => {
    course.enrolledStudents.forEach((student: Student) => {
      const purchase = purchases.find(
        (purchase) =>
          purchase.userId.toString() === student._id.toString() &&
          purchase.courseId.toString() === course._id.toString(),
      );

      enrolledStudentsData.push({
        courseTitle: course.courseTitle,
        student,
        purchaseDate: purchase?.createdAt?.toISOString() || "",
      });
    });
  });

  const dashboardData = {
    totalEarnings,
    enrolledStudentsData,
    totalCourses,
  };

  return <Dashboard dashboardData={dashboardData} />;
}
