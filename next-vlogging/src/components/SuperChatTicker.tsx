import React from 'react';

const mockSuperChats = [
  { id: 1, user: 'Alex C.', amount: '$50.00', color: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30' },
  { id: 2, user: 'Sarah W.', amount: '$5.00', color: 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30' },
  { id: 3, user: 'Jane D.', amount: '$10.00', color: 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30' },
];

export default function SuperChatTicker() {
  return (
    <div className="w-full overflow-hidden bg-muted/40 border-y border-border py-2 mb-4 relative flex items-center">
      <div className="flex gap-3 px-4 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
        {mockSuperChats.map((sc) => (
          <div key={sc.id} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${sc.color}`}>
            <span>⭐</span>
            <span>{sc.user}</span>
            <span className="font-bold">{sc.amount}</span>
          </div>
        ))}
        {/* Duplicate for infinite loop illusion */}
        {mockSuperChats.map((sc) => (
          <div key={`dup-${sc.id}`} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${sc.color}`}>
            <span>⭐</span>
            <span>{sc.user}</span>
            <span className="font-bold">{sc.amount}</span>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
