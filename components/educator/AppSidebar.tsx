"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  BookOpen,
  CircleUserRound,
  GraduationCap,
  LayoutDashboard,
  Library,
  LogOut,
  MessageSquare,
  Navigation2,
  Settings,
  Trophy,
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
    title: "My Courses",
    url: "/educator-dashboard/my-courses",
    icon: BookOpen,
  },
  {
    title: "Browse Courses",
    url: "/educator-dashboard/browse-courses",
    icon: Library,
  },
  {
    title: "Certificates",
    url: "/educator-dashboard/certificates",
    icon: GraduationCap,
  },
];

const learningMenu = [
  {
    title: "Leaderboard",
    url: "/educator-dashboard/leaderboard",
    icon: Trophy,
  },
  {
    title: "Messages",
    url: "/educator-dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "/educator-dashboard/settings",
    icon: Settings,
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

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-slate-500">
            Learning
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {learningMenu.map((item) => (
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

        <SidebarMenu className="mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton className="h-11 rounded-xl text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600">
              <LogOut className="h-4 w-4" />

              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
