"use client";

import "quill/dist/quill.snow.css";
import { ChangeEvent, SubmitEvent, useEffect, useRef, useState } from "react";
import { Loader, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Lecture {
  lectureTitle: string;
  lectureDuration: string;
  lectureUrl: string;
  isPreviewFree: boolean;
}

interface Chapter {
  chapterTitle: string;
  lectures: Lecture[];
}

export default function AddCourse() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [courseData, setCourseData] = useState({
    courseTitle: "",
    coursePrice: "",
    discount: "",
    courseLevel: "beginner",

    thumbnail: null as File | null,

    courseDescription: "",
    courseRequirements: "",
  });

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      chapterTitle: "",
      lectures: [
        {
          lectureTitle: "",
          lectureDuration: "",
          lectureUrl: "",
          isPreviewFree: false,
        },
      ],
    },
  ]);

  const descriptionEditorRef = useRef<HTMLDivElement>(null);
  const requirementsEditorRef = useRef<HTMLDivElement>(null);

  const descriptionQuillRef = useRef<any>(null);
  const requirementsQuillRef = useRef<any>(null);

  // ---------------- COURSE INPUT ----------------

  const handleCourseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ---------------- CHAPTERS ----------------

  const addNewChapter = () => {
    setChapters((prev) => [
      ...prev,
      {
        chapterTitle: "",
        lectures: [
          {
            lectureTitle: "",
            lectureDuration: "",
            lectureUrl: "",
            isPreviewFree: false,
          },
        ],
      },
    ]);
  };

  const removeChapter = (chapterIndex: number) => {
    setChapters((prev) => prev.filter((_, index) => index !== chapterIndex));
  };

  const handleChapterTitle = (chapterIndex: number, value: string) => {
    const updated = [...chapters];
    updated[chapterIndex].chapterTitle = value;
    setChapters(updated);
  };

  // ---------------- LECTURES ----------------

  const addLecture = (chapterIndex: number) => {
    const updated = [...chapters];

    updated[chapterIndex].lectures.push({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });

    setChapters(updated);
  };

  const removeLecture = (chapterIndex: number, lectureIndex: number) => {
    const updated = [...chapters];

    updated[chapterIndex].lectures = updated[chapterIndex].lectures.filter(
      (_, index) => index !== lectureIndex,
    );

    setChapters(updated);
  };

  const handleLectureChange = (
    chapterIndex: number,
    lectureIndex: number,
    field: keyof Lecture,
    value: string | boolean,
  ) => {
    const updated = [...chapters];

    updated[chapterIndex].lectures[lectureIndex][field] = value as never;

    setChapters(updated);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const formattedCourseContent = chapters.map((chapter, chapterIndex) => ({
        chapterOrder: chapterIndex + 1,
        chapterTitle: chapter.chapterTitle,

        chapterContent: chapter.lectures.map((lecture, lectureIndex) => ({
          lectureOrder: lectureIndex + 1,
          lectureTitle: lecture.lectureTitle,
          lectureDuration: Number(lecture.lectureDuration),
          lectureUrl: lecture.lectureUrl,
          isPreviewFree: lecture.isPreviewFree,
        })),
      }));

      const finalCourseData = {
        courseTitle: courseData.courseTitle,
        courseDescription: courseData.courseDescription,
        courseRequirements: courseData.courseRequirements,
        coursePrice: Number(courseData.coursePrice),
        discount: Number(courseData.discount),
        courseLevel: courseData.courseLevel,
        courseContent: formattedCourseContent,
      };

      const formData = new FormData();

      formData.append("courseData", JSON.stringify(finalCourseData));

      if (courseData.thumbnail) {
        formData.append("thumbnail", courseData.thumbnail);
      }

      const response = await fetch("/api/courses", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      // reset
      setCourseData({
        courseTitle: "",
        coursePrice: "",
        discount: "",
        courseLevel: "beginner",
        thumbnail: null,
        courseDescription: "",
        courseRequirements: "",
      });

      setChapters([
        {
          chapterTitle: "",
          lectures: [
            {
              lectureTitle: "",
              lectureDuration: "",
              lectureUrl: "",
              isPreviewFree: false,
            },
          ],
        },
      ]);

      if (descriptionQuillRef.current) {
        descriptionQuillRef.current.root.innerHTML = "";
      }

      if (requirementsQuillRef.current) {
        requirementsQuillRef.current.root.innerHTML = "";
      }

      toast.success("Course created successfully");
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to create course";

      console.log(errMsg);

      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const initQuill = async () => {
      const Quill = (await import("quill")).default;

      if (descriptionEditorRef.current && !descriptionQuillRef.current) {
        descriptionQuillRef.current = new Quill(descriptionEditorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          },
          placeholder: "Write your course description...",
        });

        descriptionQuillRef.current.on("text-change", () => {
          setCourseData((prev) => ({
            ...prev,
            courseDescription: descriptionQuillRef.current.root.innerHTML,
          }));
        });
      }

      if (requirementsEditorRef.current && !requirementsQuillRef.current) {
        requirementsQuillRef.current = new Quill(
          requirementsEditorRef.current,
          {
            theme: "snow",
            modules: {
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            },
            placeholder: "Write your course requirements...",
          },
        );

        requirementsQuillRef.current.on("text-change", () => {
          setCourseData((prev) => ({
            ...prev,
            courseRequirements: requirementsQuillRef.current.root.innerHTML,
          }));
        });
      }
    };

    initQuill();

    return () => {
      descriptionQuillRef.current = null;
      requirementsQuillRef.current = null;
    };
  }, []);

  return (
    <section className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-6xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* HEADER */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Add New Course</h1>

            <p className="text-muted-foreground">
              Create your course with chapters and lectures.
            </p>
          </div>

          {/* COURSE DETAILS */}
          <Card className="overflow-hidden rounded-2xl bg-background shadow-sm">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Course Details</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {/* COURSE TITLE */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="courseTitle">Course Title</Label>

                  <Input
                    name="courseTitle"
                    value={courseData.courseTitle}
                    onChange={handleCourseChange}
                    placeholder="Full Stack MERN Bootcamp"
                    className="h-11"
                  />
                </div>

                {/* PRICE */}
                <div className="space-y-2">
                  <Label htmlFor="coursePrice">Course Price</Label>

                  <Input
                    name="coursePrice"
                    value={courseData.coursePrice}
                    onChange={handleCourseChange}
                    type="number"
                    placeholder="4999"
                    className="h-11"
                  />
                </div>

                {/* DISCOUNT */}
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>

                  <Input
                    name="discount"
                    value={courseData.discount}
                    onChange={handleCourseChange}
                    type="number"
                    placeholder="20"
                    className="h-11"
                  />
                </div>

                {/* THUMBNAIL */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        thumbnail: e.target.files?.[0] || null,
                      }))
                    }
                    className="cursor-pointer"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2 md:col-span-2">
                  <Label>Course Description</Label>

                  <div className="overflow-hidden bg-background">
                    <div ref={descriptionEditorRef} className="min-h-55" />
                  </div>
                </div>

                {/* REQUIREMENTS */}
                <div className="space-y-2 md:col-span-2">
                  <Label>Course Requirements</Label>

                  <div className="overflow-hidden bg-background">
                    <div ref={requirementsEditorRef} className="min-h-55" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CHAPTERS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Chapters</h2>

              <Button
                onClick={addNewChapter}
                type="button"
                className="cursor-pointer hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Chapter
              </Button>
            </div>

            {chapters.map((chapter, chapterIndex) => (
              <Card key={chapterIndex} className="rounded-2xl shadow-sm">
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <Label>Chapter Title</Label>

                      <Input
                        value={chapter.chapterTitle}
                        onChange={(e) =>
                          handleChapterTitle(chapterIndex, e.target.value)
                        }
                        placeholder={`Chapter ${chapterIndex + 1}`}
                      />
                    </div>

                    <Button
                      onClick={() => removeChapter(chapterIndex)}
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="mt-5 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* LECTURES */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Lectures</h3>

                      <Button
                        type="button"
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => addLecture(chapterIndex)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Lecture
                      </Button>
                    </div>

                    {chapter.lectures.map((lecture, lectureIndex) => (
                      <div
                        key={lectureIndex}
                        className="space-y-4 rounded-xl border bg-background p-5"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Lecture {lectureIndex + 1}
                          </h4>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                            onClick={() =>
                              removeLecture(chapterIndex, lectureIndex)
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Lecture Title</Label>

                            <Input
                              value={lecture.lectureTitle}
                              onChange={(e) =>
                                handleLectureChange(
                                  chapterIndex,
                                  lectureIndex,
                                  "lectureTitle",
                                  e.target.value,
                                )
                              }
                              placeholder="Introduction"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Duration</Label>

                            <Input
                              value={lecture.lectureDuration}
                              onChange={(e) =>
                                handleLectureChange(
                                  chapterIndex,
                                  lectureIndex,
                                  "lectureDuration",
                                  e.target.value,
                                )
                              }
                              placeholder="10 mins"
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label>Lecture URL</Label>

                            <Input
                              value={lecture.lectureUrl}
                              onChange={(e) =>
                                handleLectureChange(
                                  chapterIndex,
                                  lectureIndex,
                                  "lectureUrl",
                                  e.target.value,
                                )
                              }
                              placeholder="https://..."
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={lecture.isPreviewFree}
                              onCheckedChange={(checked) =>
                                handleLectureChange(
                                  chapterIndex,
                                  lectureIndex,
                                  "isPreviewFree",
                                  Boolean(checked),
                                )
                              }
                            />

                            <Label>Free Preview</Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              "Create Course"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
