"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Camera, ShieldCheck, Sparkles, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser, loginWithApple, loginWithGoogle } from "@/lib/authClient";

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (options: {
            client_id: string;
            use_fedcm_for_prompt?: boolean;
            callback: (response: { credential?: string }) => void;
          }) => void;
          prompt: (callback?: (notification: {
            isNotDisplayed?: () => boolean;
            isSkippedMoment?: () => boolean;
            isDismissedMoment?: () => boolean;
            getDismissedReason?: () => string;
          }) => void) => void;
        };
      };
    };
    AppleID?: {
      auth?: {
        init: (options: {
          clientId: string;
          scope: string;
          redirectURI: string;
          usePopup: boolean;
        }) => void;
        signIn: () => Promise<{ authorization?: { id_token?: string } }>;
      };
    };
  }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "";
const APPLE_REDIRECT_URI = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI || "";
const DJANGO_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE || "http://127.0.0.1:8000";

const perks = [
  {
    title: "Creator-first access",
    description: "Sign in to save shorts, track likes, and keep your watch history in sync.",
    icon: Video,
  },
  {
    title: "Secure social login",
    description: "Google and Apple sign-in are wired directly into the Django auth API.",
    icon: ShieldCheck,
  },
  {
    title: "Built for momentum",
    description: "Jump back into your feed in one tap with a fast, distraction-free flow.",
    icon: Sparkles,
  },
];

const stats = [
  { label: "Shorts ready", value: "4K" },
  { label: "Creators", value: "120+" },
  { label: "Watchlists", value: "Live" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleClientId, setGoogleClientId] = useState(GOOGLE_CLIENT_ID);
  const [showPrompt, setShowPrompt] = useState(true);

  const completeAuth = (user: { id: number; name: string; email: string }) => {
    document.cookie = "vloghub_auth=true; path=/;";
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

  useEffect(() => {
    const googleScript = document.createElement("script");
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.async = true;
    googleScript.defer = true;
    document.body.appendChild(googleScript);

    const appleScript = document.createElement("script");
    appleScript.src = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    appleScript.async = true;
    appleScript.defer = true;
    document.body.appendChild(appleScript);

    return () => {
      document.body.removeChild(googleScript);
      document.body.removeChild(appleScript);
    };
  }, []);

  useEffect(() => {
    if (googleClientId) {
      return;
    }

    let isMounted = true;

    const loadGoogleClientId = async () => {
      try {
        const response = await fetch(`${DJANGO_BASE_URL}/api/auth/google-config/`, {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { clientId?: string };
        if (!isMounted) {
          return;
        }

        const value = String(payload.clientId || "").trim();
        if (value) {
          setGoogleClientId(value);
        }
      } catch {
        // Keep fallback empty state and show actionable message on click.
      }
    };

    void loadGoogleClientId();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setError("");
    if (!googleClientId) {
      setError("Google sign-in is not configured. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID or set GOOGLE_OAUTH_CLIENT_IDS in Django backend.");
      return;
    }

    if (!window.google?.accounts?.id) {
      setError("Google sign-in SDK is still loading. Please try again.");
      return;
    }

    setIsGoogleLoading(true);
    // Avoid initializing multiple times which the GSI logger warns about.
    try {
      if (!(window as any).__gsiInitialized) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          // Avoid noisy FedCM abort logs in some browser states and keep a stable popup flow.
          use_fedcm_for_prompt: false,
          callback: async ({ credential }) => {
            if (!credential) {
              setIsGoogleLoading(false);
              return;
            }

            const result = await loginWithGoogle({ idToken: credential });
            setIsGoogleLoading(false);

            if (!result.ok || !result.user) {
              setError(result.message);
              return;
            }

            completeAuth(result.user);
          },
        });
        (window as any).__gsiInitialized = true;
      }
    } catch (e) {
      // defensive: if Google SDK isn't ready, show a helpful message
      setIsGoogleLoading(false);
      setError("Google sign-in failed to initialize. Please try again in a moment or refresh the page.");
      return;
    }
    window.google.accounts.id.prompt((notification) => {
      const notDisplayed = notification.isNotDisplayed?.() ?? false;
      const skipped = notification.isSkippedMoment?.() ?? false;
      const dismissed = notification.isDismissedMoment?.() ?? false;
      const reason = notification.getDismissedReason?.() ?? "";

      // Keep UX quiet on non-fatal prompt moments (including user dismiss/abort states).
      if (notDisplayed || skipped || (dismissed && reason !== "credential_returned")) {
        setIsGoogleLoading(false);
      }
    });
  };

  const handleAppleSignIn = async () => {
    setError("");
    if (!APPLE_CLIENT_ID || !APPLE_REDIRECT_URI) {
      setError("Apple sign-in is not configured. Add NEXT_PUBLIC_APPLE_CLIENT_ID and NEXT_PUBLIC_APPLE_REDIRECT_URI.");
      return;
    }

    if (!window.AppleID?.auth) {
      setError("Apple sign-in SDK is still loading. Please try again.");
      return;
    }

    setIsAppleLoading(true);

    try {
      window.AppleID.auth.init({
        clientId: APPLE_CLIENT_ID,
        scope: "name email",
        redirectURI: APPLE_REDIRECT_URI,
        usePopup: true,
      });

      const response = await window.AppleID.auth.signIn();
      const token = response.authorization?.id_token;
      if (!token) {
        setError("Apple sign-in did not return a valid token.");
        setIsAppleLoading(false);
        return;
      }

      const result = await loginWithApple({ idToken: token });
      setIsAppleLoading(false);

      if (!result.ok || !result.user) {
        setError(result.message);
        return;
      }

      completeAuth(result.user);
    } catch {
      setIsAppleLoading(false);
      setError("Apple sign-in cancelled or failed.");
    }
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#07111f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.24),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.12),_transparent_35%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 xl:gap-10">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="absolute -right-20 top-10 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-fuchsia-400/15 blur-3xl" />

            <div className="relative space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100/90">
                <Camera className="h-4 w-4" />
                VlogHub Studio Login
              </div>

              <div className="max-w-xl space-y-4">
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-6xl">
                  A login page that feels like the front door to a creator platform.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-200/85 sm:text-lg">
                  Sign in once and get back to your videos, comments, watchlists, and saved shorts without fighting the UI.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-sm">
                    <div className="text-2xl font-extrabold text-white">{item.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-300/80">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {perks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <div key={perk.title} className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sky-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="mt-4 text-lg font-semibold text-white">{perk.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-200/80">{perk.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200/90">
                <div className="flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-emerald-200">
                  <Sparkles className="h-4 w-4" />
                  Built for fast return visits
                </div>
                <span className="text-slate-300/80">Google, Apple, or email sign-in all land you in the same experience.</span>
              </div>
            </div>
          </section>

          <section className="relative flex items-center">
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400" />

              <div className="space-y-2 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-200/80">Welcome back</p>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Sign in to VlogHub
                </h2>
                <p className="mx-auto max-w-sm text-sm leading-6 text-slate-300/80">
                  Use Google, Apple, or your email. The flow is intentionally simple and fast.
                </p>
              </div>

              {error ? (
                <p className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 shadow-sm">
                  {error}
                </p>
              ) : null}
              {showPrompt ? (
                <div className="mt-4 mb-4 flex items-start justify-between gap-4 rounded-lg border border-white/10 bg-slate-900/60 p-3 text-sm text-slate-200">
                  <div>
                    <div className="font-semibold text-white">Quick sign-in tip</div>
                    <div className="mt-1">Use Google or Apple for fast sign-in. If Google fails, ensure your Google OAuth client ID is configured and the origin (http://localhost:3000) is allowed in the Google Cloud Console. Try disabling adblockers or allowing cookies temporarily.</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => setShowPrompt(false)}
                      className="ml-2 rounded bg-white/6 px-3 py-1 text-xs font-medium text-sky-200 hover:bg-white/8"
                    >
                      Dismiss
                    </button>
                    <a
                      href="https://developers.google.com/identity/gsi/web/guides/fedcm-migration"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 text-xs text-slate-300 underline"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="group w-full justify-center gap-3 rounded-2xl border-white/10 bg-white/5 py-6 text-base font-semibold text-white shadow-none transition-transform hover:-translate-y-0.5 hover:bg-white/10"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading || isAppleLoading || isLoading}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                  {isGoogleLoading ? "Connecting Google..." : "Continue with Google"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="group w-full justify-center gap-3 rounded-2xl border-white/10 bg-white/5 py-6 text-base font-semibold text-white shadow-none transition-transform hover:-translate-y-0.5 hover:bg-white/10"
                  onClick={handleAppleSignIn}
                  disabled={isGoogleLoading || isAppleLoading || isLoading}
                >
                  <svg className="h-5 w-5 dark:fill-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.79 2.08-.04 3.8.92 4.7 2.5-3.8 2.3-2.92 7.15.5 8.44-.92 2.25-2.2 4.54-3.86 6.02zm-3.66-14.71c.54-2.58-1.55-4.57-4.14-4.57-.42 2.61 2.22 4.67 4.14 4.57z" />
                  </svg>
                  {isAppleLoading ? "Connecting Apple..." : "Continue with Apple"}
                </Button>
              </div>

              <div className="relative my-6 sm:my-7">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="rounded-full border border-white/10 bg-slate-950 px-4 py-1.5 text-slate-300/80">or use your email</span>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200/90">
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="h-12 rounded-2xl border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400/60"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200/90">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="h-12 rounded-2xl border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400/60"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-400">Need help signing in?</span>
                  <Link href="/forgot-password" className="font-semibold text-sky-300 transition-colors hover:text-sky-200">
                    Forgot password
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 py-6 text-base font-bold text-white shadow-[0_18px_50px_rgba(59,130,246,0.35)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(168,85,247,0.35)]"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  {!isLoading ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-300/80">
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
