import MyCourses from "@/components/educator/MyCourses";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
  await connectDB();
  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const educator = await User.findOne({ clerkId: userId });

  if (!educator) {
    return <div>User not found</div>;
  }

  const educatorCourses = JSON.parse(
    JSON.stringify(
      await Course.find({
        educator: educator._id,
      }),
    ),
  );

  return <MyCourses courses={educatorCourses} />;
}
