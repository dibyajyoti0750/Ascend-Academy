"use client";

import { submitRating } from "@/actions/course.actions";
import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  courseId: string;
  userId: string;
  initialRating: number;
}

export default function Rating({ courseId, userId, initialRating }: Props) {
  const [rating, setRating] = useState(initialRating);
  const [loading, setLoading] = useState(false);

  const handleRating = async (value: number) => {
    try {
      setLoading(true);

      setRating(value);

      await submitRating(courseId, userId, value);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold">Enjoying the course?</h3>

          <p className="text-slate-500">Share your feedback.</p>
        </div>

        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={28}
              onClick={() => !loading && handleRating(index + 1)}
              className={`cursor-pointer transition ${
                rating > index
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
