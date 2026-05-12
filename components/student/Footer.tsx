"use client";

import Link from "next/link";
import { Navigation2 } from "lucide-react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const footerLinks = {
  platform: [
    { label: "Browse Courses", href: "#" },
    { label: "Become an Instructor", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Certificates", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "FAQs", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <Navigation2 className="h-5 w-5" />
              </div>

              <span className="text-xl font-bold tracking-tight text-zinc-900">
                Ascend Academy
              </span>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-zinc-600">
              Learn in-demand skills with expert-led courses, hands-on projects,
              and structured learning paths built for modern careers.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: assets.facebook, href: "#" },
                { icon: assets.instagram, href: "#" },
                { icon: assets.twitter, href: "#" },
                { icon: assets.linkedin, href: "#" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:text-black"
                >
                  <Image
                    src={item.icon}
                    alt={`social-media-${index}`}
                    width={24}
                    height={24}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">
              Platform
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">
              Support
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-6 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Ascend Academy. All rights reserved.
          </p>

          <p className="text-sm text-zinc-500">Built for learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
