import { Course } from "@/types/course";

export function calcAverageRating(ratings: Course["courseRatings"]): number {
  if (!ratings?.length) return 0;
  return ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
}

export function calcTotalHours(content: Course["courseContent"]): number {
  const totalMinutes = content?.reduce((acc, chapter) => {
    const chapterMinutes = chapter.chapterContent?.reduce(
      (sum, lecture) => sum + (lecture.lectureDuration ?? 0),
      0,
    );

    return acc + (chapterMinutes ?? 0);
  }, 0);

  return (totalMinutes ?? 0) / 60;
}

export function calcTotalLectures(content: Course["courseContent"]): number {
  return (
    content?.reduce((acc, ch) => acc + (ch.chapterContent?.length ?? 0), 0) ?? 0
  );
}

export function calcChapterTime(chapter: {
  chapterContent: { lectureDuration: number }[];
}) {
  const totalMinutes = chapter.chapterContent.reduce(
    (accumulator, lecture) => accumulator + lecture.lectureDuration,
    0,
  );

  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  if (hrs > 0 && mins > 0) {
    return `${hrs}h ${mins}m`;
  }

  if (hrs > 0) {
    return `${hrs}h`;
  }

  return `${mins}m`;
}

export function humanizeDuration(minutes: number) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hrs > 0 && mins > 0) {
    return `${hrs}h ${mins}m`;
  }

  if (hrs > 0) {
    return `${hrs}h`;
  }

  return `${mins}m`;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getCountdownTime(): Countdown {
  const now = new Date();

  const secondsSinceMidnight =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  const secondsRemainingInDay = 24 * 60 * 60 - secondsSinceMidnight;

  const totalSeconds = 4 * 24 * 60 * 60 + secondsRemainingInDay;

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export const formatCountdown = (num: number) => num.toString().padStart(2, "0");

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);

    document.body.appendChild(script);
  });
};
