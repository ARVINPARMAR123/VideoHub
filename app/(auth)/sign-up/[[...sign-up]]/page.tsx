"use client";

import { SignUp } from "@clerk/nextjs";
import {
  Cloud,
  ShieldCheck,
  Sparkles,
  Zap,
  Video,
  ImageIcon,
} from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="relative min-h-svh overflow-x-hidden bg-[#050617] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-100 w-100 rounded-full bg-indigo-600/20 blur-[100px]" />

        <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-fuchsia-600/15 blur-[110px]" />

        <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/5 blur-[100px]" />
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
        <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[420px_1fr] xl:gap-20">
          {/* Clerk */}
          <section className="order-2 flex w-full justify-center lg:order-1">
            <div className="w-full max-w-105">
              <SignUp />
            </div>
          </section>

          {/* Branding */}
          <section className="order-1 hidden lg:order-2 lg:block">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
                <Cloud className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-xl font-black">Cloudinary Showcase</h2>

                <p className="text-sm text-white/40">Your media workspace</p>
              </div>
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              Create your account
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
              Build your.
              <br />
              <span className="text-primary">media workspace.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/40 xl:text-lg">
              Create your account and get a clean workspace for uploading
              videos, managing your media and preparing images for social
              platforms.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Zap className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold">Simple workflow</p>
                  <p className="text-xs text-white/35">
                    Upload and manage your content easily.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Video className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold">Video management</p>
                  <p className="text-xs text-white/35">
                    Keep your uploaded videos organized.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <ImageIcon className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold">Social image creator</p>
                  <p className="text-xs text-white/35">
                    Prepare images for different platforms.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-white/35">
              <ShieldCheck className="h-4 w-4 text-success" />
              Secure authentication powered by Clerk
            </div>
          </section>

          {/* Mobile brand */}
          <div className="order-1 text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
              <Cloud className="h-6 w-6" />
            </div>

            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Create your account
            </h1>

            <p className="mt-1 text-sm text-white/40">
              Start your media workspace
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
