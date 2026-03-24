"use client";

import { useState } from "react";
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

const POSTS = [
  {
    id: 1,
    author: "Alex",
    avatar: "bg-indigo-500",
    time: "2 hours ago",
    content: "Just landed in Tokyo! 🇯ᱯ The vlog is going to be insane. Here's a sneak peek of the view from my hotel. Should I do a separate gear review for the travel setup?",
    image: "bg-gradient-to-br from-blue-900 to-indigo-900",
    likes: 1205,
    comments: 84
  },
  {
    id: 2,
    author: "Alex",
    avatar: "bg-indigo-500",
    time: "Yesterday",
    content: "Poll time: What should be the focus of next week's video?",
    poll: [
      { option: "Editing Tutorial", votes: 45 },
      { option: "Day in the Life", votes: 20 },
      { option: "Tech Review", votes: 35 },
    ],
    likes: 340,
    comments: 112
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(POSTS);

  // Simple poll interaction mock
  const handleVote = (postId: number, optionIndex: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.poll) {
        const newPoll = [...post.poll];
        newPoll[optionIndex].votes += 1;
        return { ...post, poll: newPoll };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="mb-10">
         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
           Community
         </h1>
         <p className="text-gray-600 dark:text-gray-400 text-lg">Connect with the creator and other subscribers.</p>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4 items-center">
              <div className={`w-12 h-12 rounded-full ${post.avatar} flex items-center justify-center text-white font-bold text-lg shadow-inner`}>
                {post.author[0]}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">{post.author}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{post.time}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              <MoreHorizontal />
            </button>
          </div>

          {/* Content */}
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>

          {/* Image Attachment */}
          {post.image && (
            <div className={`w-full aspect-video rounded-2xl ${post.image} mb-6 flex items-center justify-center opacity-90`}>
              {/* Fallback pattern */}
              <span className="text-white/20 text-4xl font-bold tracking-widest">TOKYO_001.RAW</span>
            </div>
          )}

          {/* Poll Attachment */}
          {post.poll && (
            <div className="space-y-3 mb-6">
              {post.poll.map((p, idx) => {
                const totalVotes = post.poll!.reduce((acc, curr) => acc + curr.votes, 0);
                const percent = Math.round((p.votes / totalVotes) * 100);
                
                return (
                  <button 
                    key={idx}
                    onClick={() => handleVote(post.id, idx)}
                    className="relative w-full overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 p-4 text-left transition-all hover:border-indigo-500 group"
                  >
                    <div 
                      className="absolute inset-y-0 left-0 bg-indigo-100 dark:bg-indigo-900/30 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                    <div className="relative flex justify-between items-center z-10 font-medium">
                      <span className="text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{p.option}</span>
                      <span className="text-gray-500">{percent}%</span>
                    </div>
                  </button>
                )
              })}
              <p className="text-sm text-gray-500 mt-2">{post.poll.reduce((acc, curr) => acc + curr.votes, 0)} total votes</p>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <Button variant="ghost" className="flex-1 rounded-xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 gap-2">
              <ThumbsUp size={18} /> {post.likes}
            </Button>
            <Button variant="ghost" className="flex-1 rounded-xl text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 gap-2">
              <MessageSquare size={18} /> {post.comments}
            </Button>
            <Button variant="ghost" className="flex-none px-4 rounded-xl text-gray-600 dark:text-gray-400">
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}