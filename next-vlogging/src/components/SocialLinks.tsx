
import { Video, Camera, MessageSquare, MonitorPlay } from "lucide-react";

export default function SocialLinks() {
  const socials = [
    { name: "YouTube", handle: "@VlogHub", icon: <Video size={24} />, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10", border: "hover:border-red-500", url: "https://www.youtube.com/channel/UC45vFavRDNW8kOqoAzbxWOg" },
    { name: "Instagram", handle: "@rajvlogs.1.10", icon: <Camera size={24} />, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10", border: "hover:border-pink-500", url: "https://www.instagram.com/rajvlogs.1.10?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "Twitter / X", handle: "@rajvloghub", icon: <MessageSquare size={24} />, color: "text-blue-400", bg: "bg-blue-50 dark:bg-blue-400/10", border: "hover:border-blue-400", url: "#" },
    { name: "Twitch", handle: "rajstreams", icon: <MonitorPlay size={24} />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10", border: "hover:border-purple-500", url: "#" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300 ${social.border}`}
        >
          <div className={`p-3 rounded-xl ${social.bg} ${social.color}`}>
            {social.icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{social.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{social.handle}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
