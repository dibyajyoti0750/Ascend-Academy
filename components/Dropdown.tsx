"use client";

import { Show, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, SquareArrowRightEnter } from "lucide-react";
import { featuredCourses } from "./student/Navbar";
import { useStore } from "@/store/educator-store";
import Link from "next/link";

export function Dropdown() {
  const { isEducator } = useStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">Home</Link>
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Courses</DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {featuredCourses.map((course) => (
                  <DropdownMenuItem asChild key={course.label}>
                    <Link href={`/course-list/${course.href}`}>
                      {course.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/course-list">More...</Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem asChild>
            <Link href="/about">About</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <Show when="signed-in">
          <DropdownMenuGroup>
            {isEducator && (
              <DropdownMenuItem asChild>
                <Link href="/educator-dashboard">Dashboard</Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <Link href="/my-enrollments">My Enrollments</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
        </Show>

        <Show when="signed-out">
          <DropdownMenuGroup>
            <SignInButton mode="modal">
              <DropdownMenuItem>Login</DropdownMenuItem>
            </SignInButton>

            <SignUpButton mode="modal">
              <DropdownMenuItem>Join Now</DropdownMenuItem>
            </SignUpButton>
          </DropdownMenuGroup>
        </Show>

        <Show when="signed-in">
          <DropdownMenuGroup>
            <SignOutButton>
              <DropdownMenuItem>
                <span>Log out</span>

                <SquareArrowRightEnter className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuGroup>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
