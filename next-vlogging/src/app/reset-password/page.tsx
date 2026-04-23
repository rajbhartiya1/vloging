"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/authClient";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("vloghub_reset_email") || "";
    const savedCode = localStorage.getItem("vloghub_reset_code") || "";
    setEmail(savedEmail);
    setCode(savedCode);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    setIsLoading(true);
    const result = await resetPassword({ email, code, newPassword });
    setIsLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    localStorage.removeItem("vloghub_reset_code");
    setNotice("Password reset successful. Redirecting to login...");
    window.setTimeout(() => {
      window.location.href = "/login";
    }, 900);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Reset Password
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Enter your email, reset code, and a new password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="py-6 rounded-xl text-base"
                placeholder="Registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="code" className="sr-only">Reset Code</label>
              <Input
                id="code"
                type="text"
                required
                className="py-6 rounded-xl text-base"
                placeholder="6-digit reset code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <Input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                required
                className="py-6 rounded-xl text-base"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                placeholder="Confirm new password"
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
            <p className="text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-xl px-3 py-2">
              {notice}
            </p>
          ) : null}

          <Button type="submit" disabled={isLoading} className="w-full py-6 rounded-full text-lg font-bold shadow-md hover:shadow-lg transition-all">
            {isLoading ? "Resetting password..." : "Reset Password"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>
            Need a new code? <Link href="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">Generate Again</Link>
          </p>
          <p>
            Back to <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
