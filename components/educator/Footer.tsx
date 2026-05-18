import { assets } from "@/assets/assets";
import { Navigation2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 md:flex-row">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-slate-900 p-2.5 text-white">
            <Navigation2 size={18} />
          </div>

          <div>
            <h3 className="font-medium text-gray-900">Ascend Academy</h3>
            <p className="text-xs text-gray-500">© 2026 All rights reserved.</p>
          </div>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-gray-900">
            Home
          </Link>

          <Link
            href="/course-list"
            className="transition-colors hover:text-gray-900"
          >
            Courses
          </Link>

          <Link
            href="/contact"
            className="transition-colors hover:text-gray-900"
          >
            Contact
          </Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <a href="#" target="_blank">
            <Image
              src={assets.linkedin}
              alt="linkedin"
              width={18}
              height={18}
              className="opacity-70 transition-opacity hover:opacity-100"
            />
          </a>

          <a href="#" target="_blank">
            <Image
              src={assets.twitter}
              alt="twitter"
              width={18}
              height={18}
              className="opacity-70 transition-opacity hover:opacity-100"
            />
          </a>

          <a href="#" target="_blank">
            <Image
              src={assets.instagram}
              alt="instagram"
              width={18}
              height={18}
              className="opacity-70 transition-opacity hover:opacity-100"
            />
          </a>

          <a href="#" target="_blank">
            <Image
              src={assets.facebook}
              alt="facebook"
              width={18}
              height={18}
              className="opacity-70 transition-opacity hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
