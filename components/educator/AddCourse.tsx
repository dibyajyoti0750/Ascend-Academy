"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const descriptionEditorRef = useRef<HTMLDivElement>(null);
  const requirementsEditorRef = useRef<HTMLDivElement>(null);
  const descriptionQuillRef = useRef<Quill | null>(null);
  const requirementsQuillRef = useRef<Quill | null>(null);

  const [courseData, setCourseData] = useState({
    courseTitle: "",
    courseRequirements: "",
    courseDescription: "",
    coursePrice: "",
    discount: "",
    thumbnail: null as File | null,
    currentChapterId: "",
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

  // ---------------- COURSE INPUT ----------------

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCourseData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---------------- CHAPTERS ----------------

  const addChapter = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      ...courseData,
      chapters,
    };

    console.log(finalData);
  };

  useEffect(() => {
    if (descriptionEditorRef.current) {
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
    }

    if (requirementsEditorRef.current) {
      requirementsQuillRef.current = new Quill(requirementsEditorRef.current, {
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
      });
    }

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
                    id="courseTitle"
                    name="courseTitle"
                    placeholder="Full Stack MERN Bootcamp"
                    value={courseData.courseTitle}
                    onChange={handleCourseChange}
                    className="h-11"
                  />
                </div>

                {/* PRICE */}
                <div className="space-y-2">
                  <Label htmlFor="coursePrice">Course Price</Label>

                  <Input
                    id="coursePrice"
                    type="number"
                    name="coursePrice"
                    placeholder="4999"
                    value={courseData.coursePrice}
                    onChange={handleCourseChange}
                    className="h-11"
                  />
                </div>

                {/* DISCOUNT */}
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>

                  <Input
                    id="discount"
                    type="number"
                    name="discount"
                    placeholder="20"
                    value={courseData.discount}
                    onChange={handleCourseChange}
                    className="h-11"
                  />
                </div>

                {/* THUMBNAIL */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>

                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        thumbnail: e.target.files?.[0] || null,
                      }))
                    }
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

              <Button type="button" onClick={addChapter}>
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
                        placeholder={`Chapter ${chapterIndex + 1}`}
                        value={chapter.chapterTitle}
                        onChange={(e) =>
                          handleChapterTitle(chapterIndex, e.target.value)
                        }
                      />
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="mt-7"
                      onClick={() => removeChapter(chapterIndex)}
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
                              placeholder="Introduction"
                              value={lecture.lectureTitle}
                              onChange={(e) =>
                                handleLectureChange(
                                  chapterIndex,
                                  lectureIndex,
                                  "lectureTitle",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Duration</Label>

                            <Input
                              placeholder="10 mins"
                              value={lecture.lectureDuration}
                              onChange={(e) =>
                                handleLectureChange(
                                  chapterIndex,
                                  lectureIndex,
                                  "lectureDuration",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label>Lecture URL</Label>

                            <Input
                              placeholder="https://..."
                              value={lecture.lectureUrl}
                              onChange={(e) =>
                                handleLectureChange(
                                  chapterIndex,
                                  lectureIndex,
                                  "lectureUrl",
                                  e.target.value,
                                )
                              }
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
          <Button type="submit" size="lg" className="w-full">
            Create Course
          </Button>
        </form>
      </div>
    </section>
  );
}
