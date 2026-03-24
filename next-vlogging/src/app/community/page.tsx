"use client";

import { useState } from "react";
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, ChartBar } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const communityPosts = [
  {
    id: "1",
    author: { name: "VlogHub", handle: "@vloghub", avatar: "V" },
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    content: "What location should I visit next for the ultimate street food guide? Let me know in the comments! 🌍🍜",
    type: "poll",
    pollOptions: [
      { id: "p1", text: "Bangkok, Thailand", votes: 450 },
      { id: "p2", text: "Osaka, Japan", votes: 890 },
      { id: "p3", text: "Mexico City, Mexico", votes: 320 },
      { id: "p4", text: "Istanbul, Turkey", votes: 210 },
    ],
    likes: 1205,
    comments: 342,
  },
  {
    id: "2",
    author: { name: "VlogHub", handle: "@vloghub", avatar: "V" },
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    content: "Just dropped a new vlog discussing the gear I use for 2026. A lot has changed since my last setup video. Check it out!",
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    likes: 5400,
    comments: 890,
  },
  {
    id: "3",
    author: { name: "VlogHub", handle: "@vloghub", avatar: "V" },
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    content: "Quick tip for creators: Always carry an extra charged battery and an ND filter. The lighting can change in seconds when you're shooting outdoors! ☀️📸",
    type: "text",
    likes: 3200,
    comments: 154,
  }
];

function PostCard({ post }: { post: any }) {
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const totalVotes = post.pollOptions ? post.pollOptions.reduce((acc: number, opt: any) => acc + opt.votes, 0) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">
            {post.author.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{post.author.name}</h4>
            <div className="flex items-center text-sm text-zinc-500 gap-2">
              <span>{post.author.handle}</span>
              <span>•</span>
              <span>{formatDistanceToNow(post.date)} ago</span>
            </div>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 p-2">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <p className="text-zinc-800 dark:text-zinc-200 mb-4 whitespace-pre-wrap leading-relaxed">
        {post.content}
      </p>

      {post.type === 'image' && post.imageUrl && (
        <div className="rounded-xl overflow-hidden mb-4 border border-zinc-100 dark:border-zinc-800">
          <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-[500px] object-cover" />
        </div>
      )}

      {post.type === 'poll' && post.pollOptions && (
        <div className="space-y-3 mb-4">
          {post.pollOptions.map((option: any) => {
            const percentage = Math.round((option.votes / totalVotes) * 100) || 0;
            const isVoted = votedOption === option.id;
            return (
              <div 
                key={option.id}
                onClick={() => setVotedOption(option.id)}
                className={cn(
                  "relative h-10 rounded-lg overflow-hidden border cursor-pointer transition-colors flex items-center px-4",
                  isVoted ? "border-indigo-500 bg-indigo-500/10" : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                )}
              >
                {votedOption && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={cn(
                      "absolute top-0 left-0 h-full opacity-20 dark:opacity-40 pointer-events-none",
                      isVoted ? "bg-indigo-500" : "bg-zinc-400 dark:bg-zinc-600"
                    )}
                  />
                )}
                <div className="relative z-10 flex justify-between w-full font-medium">
                  <span className={cn(isVoted ? "text-indigo-700 dark:text-indigo-400" : "text-zinc-700 dark:text-zinc-300")}>
                    {option.text}
                  </span>
                  {votedOption && <span className="text-zinc-500">{percentage}%</span>}
                </div>
              </div>
            );
          })}
          <p className="text-xs text-zinc-500 mt-2">{totalVotes.toLocaleString()} votes</p>
        </div>
      )}

      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={cn(
            "flex items-center gap-2 group transition-colors",
            isLiked ? "text-red-500" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          )}
        >
          <ThumbsUp size={20} className={cn("group-hover:scale-110 transition-transform", isLiked && "fill-current")} />
          <span className="font-medium">{isLiked ? post.likes + 1 : post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 group transition-colors">
          <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium">{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 ml-auto group transition-colors">
          <Share2 size={20} className="group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline font-medium">Share</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen py-10 md:py-20 px-4 mt-16 md:mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-3 text-zinc-900 dark:text-zinc-100">Community</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Updates, polls, and behind-the-scenes content.</p>
        </div>

        {/* Create Post Input (Mock) */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 mb-10 shadow-sm flex gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center shrink-0">
            <span className="text-zinc-400 text-xs">You</span>
          </div>
          <div className="flex-1">
             <input 
               type="text" 
               placeholder="Write an update..." 
               className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all mb-3"
             />
             <div className="flex items-center justify-between">
               <div className="flex gap-2">
                 <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                   <ImageIcon size={20} />
                 </button>
                 <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                   <ChartBar size={20} />
                 </button>
               </div>
               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                 Post
               </button>
             </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {communityPosts.map((post) => (
             <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
