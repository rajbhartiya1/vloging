"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/lib/authClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [devResetCode, setDevResetCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setDevResetCode("");
    setIsLoading(true);

    const result = await forgotPassword({ email });
    setIsLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setNotice(result.message || "If your email exists, a reset code has been sent.");
    localStorage.setItem("vloghub_reset_email", email);
    if (result.resetCode) {
      setDevResetCode(result.resetCode);
      localStorage.setItem("vloghub_reset_code", result.resetCode);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Forgot Password
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Enter your registered email and we will send a reset code.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

          {devResetCode ? (
            <p className="text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 rounded-xl px-3 py-2">
              Dev-only reset code: <strong>{devResetCode}</strong>
            </p>
          ) : null}

          <Button type="submit" disabled={isLoading} className="w-full py-6 rounded-full text-lg font-bold shadow-md hover:shadow-lg transition-all">
            {isLoading ? "Generating code..." : "Generate Reset Code"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>
            Have code already? <Link href="/reset-password" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">Reset Password</Link>
          </p>
          <p>
            Back to <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
