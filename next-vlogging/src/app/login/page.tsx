"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleClientId, setGoogleClientId] = useState(GOOGLE_CLIENT_ID);

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
    if (GOOGLE_CLIENT_ID) {
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
    <div className="min-h-dvh flex items-center justify-center py-6 sm:py-10 px-3 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 bg-white dark:bg-zinc-900 p-5 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800">
        <div className="text-center">
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome back to VlogHub
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Sign in to like, comment, and save your favorite videos.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full flex justify-center items-center py-5 sm:py-6 rounded-2xl gap-3 text-sm sm:text-base"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isAppleLoading || isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            {isGoogleLoading ? "Connecting Google..." : "Continue with Google"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full flex justify-center items-center py-5 sm:py-6 rounded-2xl gap-3 text-sm sm:text-base"
            onClick={handleAppleSignIn}
            disabled={isGoogleLoading || isAppleLoading || isLoading}
          >
            <svg className="w-5 h-5 dark:fill-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.79 2.08-.04 3.8.92 4.7 2.5-3.8 2.3-2.92 7.15.5 8.44-.92 2.25-2.2 4.54-3.86 6.02zm-3.66-14.71c.54-2.58-1.55-4.57-4.14-4.57-.42 2.61 2.22 4.67 4.14 4.57z"/>
            </svg>
            {isAppleLoading ? "Connecting Apple..." : "Continue with Apple"}
          </Button>
        </div>

        <div className="relative mt-6 sm:mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-zinc-900 text-gray-500 rounded-full">Or continue with email</span>
          </div>
        </div>

        {/* Auth Form (Email/Pass) */}
        <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="py-5 sm:py-6 rounded-xl text-base"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="py-5 sm:py-6 rounded-xl text-base"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-xl px-3 py-2">
              {error}
            </p>
          ) : null}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full py-5 sm:py-6 rounded-full text-base sm:text-lg font-bold shadow-md hover:shadow-lg transition-all">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        
        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Not a member?{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Sign up for an account
          </Link>
        </p>
      </div>
    </div>
  );
}
