'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const mockChats = [
  { id: 1, user: 'TravelBug', message: 'Omg that view is amazing! 😍', isSponsor: true },
  { id: 2, user: 'TechGeek', message: 'What camera are you using today?', isSponsor: false },
  { id: 3, user: 'FoodieG', message: 'Yessss! Finally!!', isSponsor: false },
];

export default function LiveChatWindow() {
  const [chats, setChats] = useState(mockChats);
  const [newMessage, setNewMessage] = useState('');

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChats([...chats, { id: Date.now(), user: 'You', message: newMessage, isSponsor: false }]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[500px] lg:h-full bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="p-3 border-b border-border bg-muted/30 flex justify-between items-center">
        <h3 className="font-semibold text-sm">Top Chat</h3>
        <button className="text-muted-foreground hover:text-foreground text-sm">⋮</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
        {chats.map((chat) => (
          <div key={chat.id} className="text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-2">
            <span className={`font-semibold mr-2 ${chat.isSponsor ? 'text-green-500' : 'text-blue-500 dark:text-blue-400'}`}>
              {chat.user}
            </span>
            <span className="text-foreground/90">{chat.message}</span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border bg-background">
        <form onSubmit={sendChat} className="flex gap-2">
          <Input 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Say something..." 
            className="flex-1 h-9 text-sm"
          />
          <Button type="submit" size="sm" className="h-9">Send</Button>
        </form>
      </div>
    </div>
  );
}
