import MyEnrollments from "@/components/student/MyEnrollments";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
  const { userId } = await auth();

  await connectDB();

  const userData = await User.findOne({ clerkId: userId })
    .populate("enrolledCourses")
    .lean();

  if (!userData) {
    return <div>No user found</div>;
  }

  return <MyEnrollments enrolledCourses={userData.enrolledCourses} />;
}
