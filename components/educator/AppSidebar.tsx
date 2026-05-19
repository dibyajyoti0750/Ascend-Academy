"use client";

import Link from "next/link";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import {
  CircleUserRound,
  LayoutDashboard,
  Library,
  LogOut,
  Navigation2,
  PlusSquare,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const mainMenu = [
  {
    title: "Dashboard",
    url: "/educator-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Add Course",
    url: "/educator-dashboard/add-course",
    icon: PlusSquare,
  },
  {
    title: "My Courses",
    url: "/educator-dashboard/my-courses",
    icon: Library,
  },
  {
    title: "Students Enrolled",
    url: "/educator-dashboard/students-enrolled",
    icon: Users,
  },
];

export function AppSidebar() {
  const { user } = useUser();

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      {/* Header */}
      <SidebarHeader className="border-b border-slate-200 h-16 px-6">
        <Link
          href={"/"}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="rounded-xl bg-slate-900 p-2 text-white">
            <Navigation2 size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Ascend Academy
            </h1>

            <p className="text-xs text-slate-500">Educator Dashboard</p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-3 py-5">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500">
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-11 rounded-xl text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />

                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white">
            {user ? <UserButton /> : <CircleUserRound size={22} />}
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold text-slate-800">
              Hi, {user?.firstName || "Educator"}
            </p>

            <p className="truncate text-xs text-slate-500">Welcome back</p>
          </div>
        </div>

        <SignOutButton>
          <button className="mt-2 flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl px-3 text-sm text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </SignOutButton>
      </SidebarFooter>
    </Sidebar>
  );
}
