"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  {
    href: "/home",
    icon: LayoutDashboardIcon,
    label: "Home Page",
  },
  {
    href: "/social-share",
    icon: Share2Icon,
    label: "Social Share",
  },
  {
    href: "/video-upload",
    icon: UploadIcon,
    label: "Video Upload",
  },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen w-full overflow-x-hidden">
      {/* Drawer checkbox */}
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="drawer-content flex min-h-screen min-w-0 flex-col lg:ml-64">
        {/* ================= NAVBAR ================= */}
        <header className="sticky top-0 z-40 w-full border-b border-base-300 bg-base-200">
          <div className="navbar mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
            {/* Mobile menu */}
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <MenuIcon />
              </label>
            </div>

            {/* Logo / Title */}
            <div className="min-w-0 flex-1">
              <Link
                href="/"
                onClick={handleLogoClick}
                className="inline-flex max-w-full"
              >
                <div className="btn btn-ghost min-h-10 whitespace-nowrap px-2 text-lg font-bold tracking-tight sm:text-2xl">
                  VideoHub
                </div>
              </Link>
            </div>

            {/* User */}
            <div className="flex flex-none items-center gap-2 sm:gap-4">
              {user && (
                <>
                  <div className="avatar">
                    <div className="h-8 w-8 overflow-hidden rounded-full sm:h-9 sm:w-9">
                      <img
                        src={user.imageUrl}
                        alt={
                          user.username ||
                          user.emailAddresses[0]?.emailAddress ||
                          "User"
                        }
                      />
                    </div>
                  </div>

                  <span className="hidden max-w-50 truncate text-sm sm:block lg:max-w-75">
                    {user.username || user.emailAddresses[0]?.emailAddress}
                  </span>

                  <button
                    onClick={handleSignOut}
                    className="btn btn-ghost btn-circle"
                    aria-label="Sign out"
                  >
                    <LogOutIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      <div className="drawer-side z-50">
        {/* Mobile overlay */}
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>

        <aside
          className="
          flex
          h-screen
          w-64
          flex-col
          bg-base-200
          shadow-xl
          lg:fixed
          lg:left-0
          lg:top-0
          lg:z-50 
        "
        >
          {/* Sidebar logo */}
          <div className="flex shrink-0 items-center justify-center py-4">
            <ImageIcon className="h-10 w-10 text-primary" />
          </div>

          {/* Navigation */}
          <ul className="menu w-full grow overflow-y-auto p-4 text-base-content">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-4 rounded-lg px-4 py-3 ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <item.icon className="h-6 w-6 shrink-0" />

                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Sign Out */}
          {user && (
            <div className="shrink-0 p-4">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
