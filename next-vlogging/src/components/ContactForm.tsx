"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API Call
    setTimeout(() => {
      setStatus("success");
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            required
            disabled={status !== "idle"}
            className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            required
            disabled={status !== "idle"}
            className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Subject
        </label>
        <select
          id="subject"
          required
          disabled={status !== "idle"}
          className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-50 appearance-none"
        >
          <option value="">Select a topic...</option>
          <option value="collab">Brand Collaboration</option>
          <option value="feedback">Channel Feedback</option>
          <option value="support">Technical Support</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Your Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="How can we work together?..."
          required
          disabled={status !== "idle"}
          className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-y disabled:opacity-50"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status !== "idle"}
        className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:hover:shadow-none flex items-center justify-center gap-2"
      >
        {status === "idle" && (
          <>
            Send Message <Send size={18} />
          </>
        )}
        {status === "loading" && "Sending..."}
        {status === "success" && (
          <>
            Message Sent! <CheckCircle2 size={18} />
          </>
        )}
      </button>
    </form>
  );
}
