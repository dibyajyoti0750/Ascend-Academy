"use client";

import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddCourse() {
  const descriptionEditorRef = useRef<HTMLDivElement>(null);
  const requirementsEditorRef = useRef<HTMLDivElement>(null);

  const descriptionQuillRef = useRef<any>(null);
  const requirementsQuillRef = useRef<any>(null);

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
        <form className="space-y-8">
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
                    placeholder="Full Stack MERN Bootcamp"
                    className="h-11"
                  />
                </div>

                {/* PRICE */}
                <div className="space-y-2">
                  <Label htmlFor="coursePrice">Course Price</Label>

                  <Input type="number" placeholder="4999" className="h-11" />
                </div>

                {/* DISCOUNT */}
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>

                  <Input type="number" placeholder="20" className="h-11" />
                </div>

                {/* THUMBNAIL */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>

                  <Input
                    type="file"
                    accept="image/*"
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

              <Button type="button">
                <Plus className="mr-2 h-4 w-4" />
                Add Chapter
              </Button>
            </div>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <Label>Chapter Title</Label>

                    <Input />
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="mt-7"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* LECTURES */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Lectures</h3>

                    <Button type="button" variant="secondary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Lecture
                    </Button>
                  </div>

                  <div className="space-y-4 rounded-xl border bg-background p-5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Lecture</h4>

                      <Button type="button" variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Lecture Title</Label>

                        <Input placeholder="Introduction" />
                      </div>

                      <div className="space-y-2">
                        <Label>Duration</Label>

                        <Input placeholder="10 mins" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Lecture URL</Label>

                        <Input placeholder="https://..." />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox />

                        <Label>Free Preview</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
