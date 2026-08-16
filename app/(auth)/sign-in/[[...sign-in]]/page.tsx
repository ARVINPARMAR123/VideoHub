"use client";

import { SignIn } from "@clerk/nextjs";
import {
  Cloud,
  ShieldCheck,
  Sparkles,
  Zap,
  Video,
  ImageIcon,
} from "lucide-react";

export default function SignInPage() {
  return (
    <main className="relative min-h-svh overflow-x-hidden bg-[#050617] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-100 w-100 rounded-full bg-indigo-600/20 blur-[100px]" />

        <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-fuchsia-600/15 blur-[110px]" />

        <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-svh w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_420px] xl:gap-20">
          {/* Left branding */}
          <section className="hidden lg:block">
            {/* Logo */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
                <Cloud className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-xl font-black">Cloudinary Showcase</h2>

                <p className="text-sm text-white/40">Your media workspace</p>
              </div>
            </div>

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              Welcome back
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
              Your media.
              <br />
              Your workspace.
              <br />
              <span className="text-primary">Your creativity.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/40 xl:text-lg">
              Sign in to manage your videos, prepare social media images and
              keep everything organized in one place.
            </p>

            {/* Features */}
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                <Video className="mb-3 h-5 w-5 text-primary" />

                <p className="font-semibold">Video Library</p>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  Upload and manage your videos.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                <ImageIcon className="mb-3 h-5 w-5 text-secondary" />

                <p className="font-semibold">Social Images</p>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  Create platform-ready images.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-white/35">
              <ShieldCheck className="h-4 w-4 text-success" />
              Secure authentication powered by Clerk
            </div>
          </section>

          {/* Mobile heading */}
          <div className="text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
              <Cloud className="h-6 w-6" />
            </div>

            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Cloudinary Showcase
            </h1>

            <p className="mt-1 text-sm text-white/40">Your media workspace</p>
          </div>

          {/* Clerk */}
          <section className="flex w-full justify-center lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="w-full max-w-105">
              <SignIn />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
