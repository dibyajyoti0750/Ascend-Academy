import { model, models, Schema } from "mongoose";

const purchaseSchema = new Schema(
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

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },

    paymentIntentId: {
      type: String,
    },

    provider: {
      type: String,
      default: "stripe",
    },
  },
  { timestamps: true },
);

purchaseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Purchase = models.Purchase || model("Purchase", purchaseSchema);

export default Purchase;
