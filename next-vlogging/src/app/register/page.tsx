"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/lib/authClient";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    const result = await registerUser({ name, email, password });
    setIsLoading(false);

    if (!result.ok || !result.user) {
      if (result.code === "already_exists") {
        setError("This email is already registered. Please login.");
        setNotice("Account already exists. Use the Sign in page.");
        return;
      }
      setError(result.message);
      return;
    }

    document.cookie = "vloghub_auth=true; path=/;";
    localStorage.setItem("vloghub_user", JSON.stringify(result.user));
    window.location.href = "/";
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create an account
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Join VlogHub to start your personalized journey.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <Button variant="outline" className="w-full flex justify-center items-center py-6 rounded-2xl gap-3 text-base" disabled>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            Sign up with Google (Coming Soon)
          </Button>
          <Button variant="outline" className="w-full flex justify-center items-center py-6 rounded-2xl gap-3 text-base" disabled>
            <svg className="w-5 h-5 dark:fill-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.79 2.08-.04 3.8.92 4.7 2.5-3.8 2.3-2.92 7.15.5 8.44-.92 2.25-2.2 4.54-3.86 6.02zm-3.66-14.71c.54-2.58-1.55-4.57-4.14-4.57-.42 2.61 2.22 4.67 4.14 4.57z"/>
            </svg>
            Sign up with Apple (Coming Soon)
          </Button>
        </div>

        <div className="relative mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-zinc-900 text-gray-500 rounded-full">Or sign up with email</span>
          </div>
        </div>

        {/* Auth Form (Email/Pass) */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                required
                className="py-6 rounded-xl text-base"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="py-6 rounded-xl text-base"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                className="py-6 rounded-xl text-base"
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="py-6 rounded-xl text-base"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-xl px-3 py-2">
              {error}
            </p>
          ) : null}

          {notice ? (
            <p className="text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 rounded-xl px-3 py-2">
              {notice} <Link href="/login" className="underline font-semibold">Go to Login</Link>
            </p>
          ) : null}

          <Button type="submit" disabled={isLoading} className="w-full py-6 rounded-full text-lg font-bold shadow-md hover:shadow-lg transition-all text-white bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Sign in instead
          </Link>
        </p>

        <p className="mt-8 text-center text-xs text-gray-500">
          By signing up, you agree to our{' '}
          <Link href="/terms-of-service" className="underline">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
