import { model, models, Schema } from "mongoose";

const courseProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    lectureCompleted: [{ type: Schema.Types.ObjectId, required: true }],
  },
  { minimize: false },
);

courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const CourseProgress =
  models.CourseProgress || model("CourseProgress", courseProgressSchema);

export default CourseProgress;
