import { auth } from "@clerk/nextjs/server";
import StudentsEnrolled from "@/components/educator/StudentsEnrolled";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import Purchase from "@/models/Purchase";
import User from "@/models/User";
import { EnrolledStudentData } from "@/types/student";
import { redirect } from "next/navigation";

export default async function page() {
  await connectDB();

  const { userId } = await auth();

  if (!userId) {
    redirect("/?error=signin-required");
  }

  const educator = await User.findOne({ clerkId: userId });

  if (!educator) {
    redirect("/");
  }

  const courses = await Course.find({
    educator: educator._id,
  }).lean();

  const courseIds = courses.map((course) => course._id);

  const purchases = await Purchase.find({
    courseId: { $in: courseIds },
    status: "completed",
  })
    .populate("studentId", "_id name imageUrl")
    .populate("courseId", "courseTitle")
    .lean();

  const enrolledStudentsData: EnrolledStudentData[] = purchases.map(
    (purchase) => ({
      student: purchase.studentId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }),
  );

  return <StudentsEnrolled enrolledStudentsData={enrolledStudentsData} />;
}
