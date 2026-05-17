"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function Rating() {
  const [rating, setRating] = useState(0);

  const handleRating = async (value: number) => {
    setRating(value);

    // save to DB here
  };

  return (
    <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Enjoying the course?
          </h3>

          <p className="mt-1 text-slate-500">
            Share your feedback and help other students.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={28}
              onClick={() => handleRating(index + 1)}
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
