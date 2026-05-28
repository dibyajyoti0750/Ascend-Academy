import { model, models, Schema } from "mongoose";

const lectureSchema = new Schema({
  lectureTitle: {
    type: String,
    required: true,
    trim: true,
  },

  lectureDuration: {
    type: Number,
    required: true,
    min: 0,
  },

  lectureUrl: {
    type: String,
    required: true,
    trim: true,
  },

  isPreviewFree: {
    type: Boolean,
    default: false,
  },

  lectureOrder: {
    type: Number,
    required: true,
    min: 1,
  },
});

const chapterSchema = new Schema({
  chapterOrder: {
    type: Number,
    required: true,
    min: 1,
  },

  chapterTitle: {
    type: String,
    required: true,
    trim: true,
  },

  chapterContent: {
    type: [lectureSchema],
    default: [],
  },
});

const courseSchema = new Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    courseDescription: {
      type: String,
      required: true,
      trim: true,
    },

    courseRequirements: {
      type: String,
      required: true,
      trim: true,
    },

    courseThumbnail: {
      type: String,
      required: true,
      trim: true,
    },

    coursePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    courseLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    courseContent: {
      type: [chapterSchema],
      default: [],
    },

    educator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseRatings: {
      type: [
        {
          _id: false,

          userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },

          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
          },
        },
      ],
      default: [],
    },

    enrolledStudents: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
courseSchema.index({ educator: 1 });

courseSchema.index({ isPublished: 1 });

courseSchema.index({
  courseTitle: "text",
  courseDescription: "text",
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
