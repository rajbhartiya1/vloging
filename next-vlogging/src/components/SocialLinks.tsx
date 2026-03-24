
import { Video, Camera, MessageSquare, MonitorPlay } from "lucide-react";

export default function SocialLinks() {
  const socials = [
    { name: "YouTube", handle: "@VlogHub", icon: <Video size={24} />, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10", border: "hover:border-red-500" },
    { name: "Instagram", handle: "@alexvloghub", icon: <Camera size={24} />, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10", border: "hover:border-pink-500" },
    { name: "Twitter / X", handle: "@alexvloghub", icon: <MessageSquare size={24} />, color: "text-blue-400", bg: "bg-blue-50 dark:bg-blue-400/10", border: "hover:border-blue-400" },
    { name: "Twitch", handle: "alexstreams", icon: <MonitorPlay size={24} />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10", border: "hover:border-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href="#"
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
