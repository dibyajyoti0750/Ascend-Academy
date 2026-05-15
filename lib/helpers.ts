import { Course } from "@/types/course";

export function calcAverageRating(ratings: Course["courseRatings"]): number {
  if (!ratings?.length) return 0;
  return ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
}

export function calcTotalHours(content: Course["courseContent"]): number {
  const totalMinutes = content?.reduce((acc, chapter) => {
    const chapterMinutes = chapter.chapterContent?.reduce(
      (s, l) => s + (l.lectureDuration ?? 0),
      0,
    );
    return acc + (chapterMinutes ?? 0);
  }, 0);
  return Math.round((totalMinutes ?? 0) / 60);
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
