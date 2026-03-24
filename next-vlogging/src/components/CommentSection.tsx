"use client";
import { useState, useEffect } from "react";

export default function CommentSection({ videoId }: { videoId: string }) {
  const [comments, setComments] = useState<{user: string, text: string, id: number}[]>([]);
  const [newComment, setNewComment] = useState("");

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
      text: newComment
    };
    
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${videoId}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md mt-12">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors whitespace-nowrap">
          Post
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="font-bold text-indigo-600 mb-1">{c.user}</div>
            <div className="text-gray-700">{c.text}</div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-500 text-center py-4">Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
