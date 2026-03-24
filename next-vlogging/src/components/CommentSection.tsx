"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, ThumbsDown, Reply, MoreVertical } from "lucide-react";
import { Button } from "./ui/Button";

interface ReplyType {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
}

interface CommentType {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: ReplyType[];
}

export default function CommentSection({ videoId }: { videoId: string }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    // Generate some stable fake comments for demo if empty
    const generateDemoComments = (): CommentType[] => [
      {
        id: "c1",
        author: "Alex Rivers",
        avatar: "https://i.pravatar.cc/150?u=c1" + videoId,
        content: "This is exactly what I was looking for! The production quality has gone way up lately.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        likes: 342,
        replies: [
          {
            id: "r1",
            author: "CreatorName",
            avatar: "https://i.pravatar.cc/150?u=creator",
            content: "Thanks Alex! We've been working hard on lighting and audio.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
            likes: 120,
          }
        ]
      },
      {
        id: "c2",
        author: "Sam Witwicky",
        avatar: "https://i.pravatar.cc/150?u=c2" + videoId,
        content: "Honestly, the second half of this video really changed my perspective. Great job.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        likes: 89,
      }
    ];

    const stored = localStorage.getItem(`comments_v2_${videoId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Fix dates
        const mapped = parsed.map((c: any) => ({
          ...c,
          timestamp: new Date(c.timestamp),
          replies: c.replies?.map((r: any) => ({ ...r, timestamp: new Date(r.timestamp) }))
        }));
        setComments(mapped);
      } catch (e) {
        setComments(generateDemoComments());
      }
    } else {
      const demoComments = generateDemoComments();
      setComments(demoComments);
      localStorage.setItem(`comments_v2_${videoId}`, JSON.stringify(demoComments));
    }
  }, [videoId]);

  const saveToStorage = (updatedComments: CommentType[]) => {
    setComments(updatedComments);
    localStorage.setItem(`comments_v2_${videoId}`, JSON.stringify(updatedComments));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: CommentType = {
      id: `c_${Date.now()}`,
      author: "You",
      avatar: "https://i.pravatar.cc/150?u=you",
      content: newComment,
      timestamp: new Date(),
      likes: 0
    };
    
    saveToStorage([comment, ...comments]);
    setNewComment("");
  };

  const handleReplySubmit = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply: ReplyType = {
      id: `r_${Date.now()}`,
      author: "You",
      avatar: "https://i.pravatar.cc/150?u=you",
      content: replyText,
      timestamp: new Date(),
      likes: 0
    };

    const updatedComments = comments.map(c => {
      if (c.id === commentId) {
        return { ...c, replies: [...(c.replies || []), newReply] };
      }
      return c;
    });

    saveToStorage(updatedComments);
    setReplyText("");
    setActiveReplyId(null);
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-zinc-800">
      <h3 className="text-xl font-bold mb-6">{comments.length} Comments</h3>
      
      {/* Input Box */}
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <img src="https://i.pravatar.cc/150?u=you" alt="Your Avatar" className="w-10 h-10 rounded-full" />
        <div className="flex-1 flex flex-col">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-gray-300 dark:border-zinc-700 pb-2 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 resize-none min-h-[40px] text-sm"
            rows={1}
          />
          <div className="mt-2 flex justify-end gap-2 h-10">
            {newComment.trim() && (
              <>
                <Button variant="ghost" type="button" onClick={() => setNewComment("")}>Cancel</Button>
                <Button type="submit">Comment</Button>
              </>
            )}
          </div>
        </div>
      </form>

      {/* Threads */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="group flex gap-4">
            <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm dark:text-gray-100">{comment.author}</span>
                <span className="text-xs text-gray-500">{formatDistanceToNow(comment.timestamp)} ago</span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">{comment.content}</p>
              
              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-4">
                <button className="flex items-center gap-1 hover:text-indigo-500 dark:hover:text-indigo-400"><ThumbsUp size={16} /> {comment.likes > 0 ? comment.likes : ''}</button>
                <button className="flex items-center gap-1 hover:text-red-500"><ThumbsDown size={16} /></button>
                <button 
                  onClick={() => {
                    setActiveReplyId(activeReplyId === comment.id ? null : comment.id);
                    setReplyText("");
                  }}
                  className="flex items-center gap-1 hover:text-indigo-500 dark:hover:text-indigo-400 font-semibold "
                >
                  <Reply size={16} /> Reply
                </button>
              </div>

              {/* Reply Input */}
              {activeReplyId === comment.id && (
                <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="flex gap-3 mb-4 mt-2">
                  <img src="https://i.pravatar.cc/150?u=you" alt="You" className="w-6 h-6 rounded-full" />
                  <div className="flex-1 flex flex-col">
                    <input 
                      autoFocus
                      type="text"
                      className="w-full bg-transparent border-b border-gray-300 dark:border-zinc-700 pb-1 text-sm focus:outline-none focus:border-indigo-500"
                      placeholder="Add a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <Button variant="ghost" size="sm" type="button" onClick={() => setActiveReplyId(null)}>Cancel</Button>
                      <Button size="sm" type="submit" disabled={!replyText.trim()}>Reply</Button>
                    </div>
                  </div>
                </form>
              )}

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-2 space-y-4 border-l-2 border-gray-200 dark:border-zinc-800 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <img src={reply.avatar} alt={reply.author} className="w-8 h-8 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{reply.author}</span>
                          <span className="text-xs text-gray-500">{formatDistanceToNow(reply.timestamp)} ago</span>
                        </div>
                        <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">{reply.content}</p>
                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                          <button className="flex items-center gap-1 hover:text-indigo-500"><ThumbsUp size={14} /> {reply.likes > 0 ? reply.likes : ''}</button>
                          <button className="flex items-center gap-1 hover:text-red-500"><ThumbsDown size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="md:opacity-0 md:group-hover:opacity-100 self-start p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-opacity opacity-100">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
