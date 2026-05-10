"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Navigation2 } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import SearchBar from "@/components/student/SearchBar";

const featuredCourses = [
  {
    href: "/all-courses/web-dev",
    label: "Web Development",
    description: "Learn full stack development with MERN.",
  },
  {
    href: "/all-courses/design",
    label: "UI/UX Design",
    description: "Master clean and modern interface design.",
  },
  {
    href: "/all-courses/ai",
    label: "AI & Automation",
    description: "Build AI powered applications and workflows.",
  },
  {
    href: "/all-courses/marketing",
    label: "Marketing",
    description: "Learn branding, growth and content strategy.",
  },
];

const navLinkClass =
  "px-4 py-2 text-sm font-medium rounded-md p-3 transition-colors hover:bg-muted";

const Navbar = () => {
  // Replace this later with real auth logic
  const isEducator = true;

  return (
    <header className="border-b">
      <div className="grid h-16 grid-cols-3 items-center px-16">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-1">
            <Navigation2 size={24} className="shrink-0" />

            <span className="text-2xl font-bold tracking-tight">
              Ascend Academy
            </span>
          </Link>

          <SearchBar />
        </div>

        {/* Center */}
        <div className="flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="px-4 py-2 text-sm font-medium"
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Courses */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="grid w-[450px] gap-3 p-4 md:grid-cols-2">
                    {featuredCourses.map((course) => (
                      <Link
                        key={course.label}
                        href={course.href}
                        className="rounded-md p-3 transition-colors hover:bg-muted"
                      >
                        <div className="text-sm font-medium">
                          {course.label}
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {course.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="px-4 py-2 text-sm font-medium"
                >
                  <Link href="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-2">
          <Show when={"signed-out"}>
            <SignInButton>
              <span className="cursor-pointer text-sm font-medium">Login</span>
            </SignInButton>

            <SignUpButton>
              <span className="cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black">
                Join Now
              </span>
            </SignUpButton>
          </Show>

          <Show when={"signed-in"}>
            {isEducator && (
              <Link href="/educator" className={navLinkClass}>
                Dashboard
              </Link>
            )}

            <Link href="/my-enrollments" className={navLinkClass}>
              My Enrollments
            </Link>

            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
