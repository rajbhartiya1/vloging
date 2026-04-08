"use client";
import { useState } from "react";
import { SendIcon, CheckCircle2Icon } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-900/50 rounded-3xl p-6 md:p-10 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
          Never miss an adventure
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
          Get weekly updates on new vlogs, behind-the-scenes content, and exclusive merch drops.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            suppressHydrationWarning
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status !== "idle"}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
            required
          />
          <button
            suppressHydrationWarning
            type="submit"
            disabled={status !== "idle"}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {status === "idle" && (
              <>
                Subscribe <SendIcon className="w-4 h-4" />
              </>
            )}
            {status === "loading" && "Subscribing..."}
            {status === "success" && (
              <>
                Subscribed <CheckCircle2Icon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
        {status === "success" && (
          <p className="text-green-600 dark:text-green-400 text-sm mt-4 font-medium animate-pulse">
            Thanks for subscribing! Check your inbox soon.
          </p>
        )}
      </div>
    </div>
  );
}
