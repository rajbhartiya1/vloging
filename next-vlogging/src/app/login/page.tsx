"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Camera, ShieldCheck, Sparkles, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/authClient";

const perks = [
  {
    title: "Fast access",
    description: "Get back to your saved videos, comments, and playlists without friction.",
    icon: Video,
  },
  {
    title: "Email-based security",
    description: "A single email login keeps the experience simple and reliable.",
    icon: ShieldCheck,
  },
  {
    title: "Creator continuity",
    description: "Preserve your watch history, likes, and channel activity across sessions.",
    icon: Sparkles,
  },
];

const stats = [
  { label: "Rapid sign-in", value: "< 5 sec" },
  { label: "Creator-ready", value: "100%" },
  { label: "Secure email", value: "Always" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const completeAuth = (user: { id: number; name: string; email: string }) => {
    if (rememberMe) {
      document.cookie = "vloghub_auth=true; path=/; max-age=2592000";
    } else {
      document.cookie = "vloghub_auth=true; path=/;";
    }
    localStorage.setItem("vloghub_user", JSON.stringify(user));
    window.location.href = "/";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await loginUser({ email, password });
    setIsLoading(false);

    if (!result.ok || !result.user) {
      setError(result.message);
      return;
    }

    completeAuth(result.user);
  };


  return (
    <div className="relative min-h-dvh overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.32),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.24),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent_36%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl items-center px-3 py-8 sm:px-4 md:px-6 lg:px-8">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 xl:gap-10">
          <section className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-6 sm:p-8 lg:p-12 shadow-[0_30px_90px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="absolute -right-20 top-10 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between gap-6 sm:gap-8">
              <div className="space-y-5 sm:space-y-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                  <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                  Creator account access
                </div>

                <div className="max-w-2xl space-y-4 sm:space-y-5">
                  <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                    A smarter login for creators.
                  </h1>
                  <p className="max-w-xl text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 text-slate-300">
                    One email-based entry point that keeps your channel, history, and upload tools always within reach.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((item) => (
                    <div key={item.label} className="rounded-[1.75rem] border border-slate-700/70 bg-slate-950/70 px-5 py-6 backdrop-blur-sm shadow-sm shadow-slate-950/20">
                      <div className="text-3xl font-extrabold text-white">{item.value}</div>
                      <div className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-300/80">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {perks.map((perk) => {
                    const Icon = perk.icon;
                    return (
                      <div key={perk.title} className="rounded-[1.75rem] border border-slate-700/70 bg-slate-950/70 p-5 backdrop-blur-sm">
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/70 text-cyan-300">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h2 className="mt-4 text-lg font-semibold text-white">{perk.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300/80">{perk.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-700/70 bg-slate-950/80 p-5 text-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.20)]">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                  <p className="text-sm leading-6 text-slate-300">
                    Enjoy a cleaner login experience built for creators and built to move fast.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex items-center">
            <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] border border-slate-700/70 bg-slate-950/95 p-6 sm:p-8 lg:p-12 shadow-[0_35px_110px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500" />

              <div className="space-y-4 sm:space-y-6 text-center">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200/90">Welcome back</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                  Sign in to your creator workspace
                </h2>
                <p className="mx-auto max-w-md text-sm sm:text-base leading-6 sm:leading-7 text-slate-300/90">
                  Use your email and password to continue managing your videos, saved shorts, and channel dashboard.
                </p>
              </div>

              {error ? (
                <p className="mt-4 sm:mt-6 rounded-lg sm:rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs sm:text-sm text-rose-200 shadow-sm">
                  {error}
                </p>
              ) : null}

              <div className="relative my-4 sm:my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/80" />
                </div>
                <div className="relative flex justify-center">
                  <span className="rounded-full border border-slate-700/80 bg-slate-900 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm text-slate-300/80">Email login</span>
                </div>
              </div>

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label htmlFor="email" className="mb-1.5 sm:mb-2 block text-sm sm:text-base font-medium text-slate-200/90">
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="h-11 sm:h-14 rounded-lg sm:rounded-[1.5rem] border-white/10 bg-white/5 px-4 sm:px-5 text-base text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400/60"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="mb-1.5 sm:mb-2 block text-sm sm:text-base font-medium text-slate-200/90">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="h-11 sm:h-14 rounded-lg sm:rounded-[1.5rem] border-white/10 bg-white/5 px-4 sm:px-5 text-base text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400/60"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm sm:text-base">
                  <span className="text-slate-400">Need help signing in?</span>
                  <Link href="/forgot-password" className="font-semibold text-cyan-300 transition-colors hover:text-cyan-200">
                    Forgot password
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-3 text-sm sm:text-base text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-sky-500 focus:ring-sky-400 cursor-pointer"
                    />
                    Keep me signed in
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-[1.75rem] bg-gradient-to-r from-cyan-500 via-sky-600 to-fuchsia-500 py-5 sm:py-7 text-base font-semibold text-white shadow-[0_22px_65px_rgba(59,130,246,0.40)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_26px_75px_rgba(168,85,247,0.45)] active:translate-y-0"
                >
                  {isLoading ? "Signing in..." : "Continue with email"}
                  {!isLoading ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
                </Button>
              </form>

              <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-slate-300/80">
                Not a member?{' '}
                <Link href="/register" className="font-semibold text-sky-300 transition-colors hover:text-sky-200">
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
