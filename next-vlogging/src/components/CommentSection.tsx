"use client";
import { useState, useEffect } from "react";

export default function CommentSection({ videoId }: { videoId: string }) {
  const [comments, setComments] = useState<{user: string, text: string, id: number}[]>([]);
  const [newComment, setNewComment] = useState("");
  const maxLength = 280;

  useEffect(() => {
    // Load fake comments specific to this video
    const stored = localStorage.getItem(`comments_${videoId}`);
    if (stored) {
      setComments(JSON.parse(stored));
    } else {
      const initial = [
        { id: 1, user: "JohnD", text: "Great video!" },
        { id: 2, user: "SarahW", text: "Loved the editing on this one." }
      ];
      setComments(initial);
      localStorage.setItem(`comments_${videoId}`, JSON.stringify(initial));
    }
  }, [videoId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: "You (Guest)",
      text: newComment.trim()
    };
    
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${videoId}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  return (
    <section className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 mt-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Comments ({comments.length})</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Join the discussion and share your feedback.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 rounded-2xl p-4">
        <label htmlFor="comment-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Add a public comment
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="comment-input"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value.slice(0, maxLength))}
            placeholder="Write what you liked or ask a question"
            className="flex-grow p-3.5 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-gray-100"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-7 rounded-xl transition-colors whitespace-nowrap"
          >
            Post
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
          {newComment.length}/{maxLength}
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((c) => (
          <article key={c.id} className="border-b border-gray-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0">
            <div className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">{c.user}</div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{c.text}</p>
          </article>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-6 border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl">
            No comments yet. Be the first to start the conversation.
          </p>
        )}
      </div>
    </section>
  );
}
