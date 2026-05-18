"use client";

import { usePathname } from "next/navigation";
import { useStore } from "@/store/educator-store";
import { BookOpen, LayoutDashboard, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);

  const { isEducator } = useStore();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/educator-dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add Course",
      path: "/educator-dashboard/add-course",
      icon: PlusCircle,
    },
    {
      name: "My Courses",
      path: "/educator-dashboard/my-courses",
      icon: BookOpen,
    },
    {
      name: "Students",
      path: "/educator-dashboard/students-enrolled",
      icon: Users,
    },
  ];

  if (!isEducator) return null;

  return (
    <aside className="sticky top-0 h-screen w-72 border-r border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 p-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            const isActive =
              item.path === "/educator-dashboard"
                ? pathname === item.path
                : pathname.startsWith(item.path);

            return (
              <Link key={index} href={item.path}>
                <div
                  className={clsx(
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200",
                    isActive
                      ? "bg-black text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 hover:text-black",
                  )}
                >
                  <Icon
                    size={20}
                    className={clsx(
                      "transition-transform duration-200 group-hover:scale-110",
                    )}
                  />

                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-sm font-semibold text-slate-900">
              Keep Teaching 🚀
            </p>

            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Manage your courses, students, and track your growth from one
              place.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
