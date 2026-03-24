import { ExternalLink, Camera, Mic, MonitorPlay } from "lucide-react";

export default function EquipmentGearList() {
  const gearList = [
    {
      category: "Cameras & Lenses",
      icon: <Camera className="text-indigo-500" />,
      items: [
        { name: "Sony A7S III", desc: "Main studio and high-end b-roll camera", link: "#" },
        { name: "Sony 16-35mm f/2.8 GM", desc: "The ultimate vlogging lens", link: "#" },
        { name: "DJI Osmo Pocket 3", desc: "For running and gunning travel shots", link: "#" },
      ]
    },
    {
      category: "Audio",
      icon: <Mic className="text-pink-500" />,
      items: [
        { name: "Shure SM7B", desc: "Studio voiceover mic", link: "#" },
        { name: "Rode Wireless GO II", desc: "Crisp audio on the move", link: "#" },
      ]
    },
    {
      category: "Editing Setup",
      icon: <MonitorPlay className="text-purple-500" />,
      items: [
        { name: "MacBook Pro 16\" (M3 Max)", desc: "Handles 4K timelines with ease", link: "#" },
        { name: "Final Cut Pro X", desc: "Primary NLE software", link: "#" },
      ]
    }
  ];

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Gear & Equipment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gearList.map((group, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                {group.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {group.category}
              </h3>
            </div>
            
            <ul className="space-y-4">
              {group.items.map((item, i) => (
                <li key={i} className="group pb-4 border-b border-gray-200 dark:border-zinc-700/50 last:border-0 last:pb-0">
                  <a href={item.link} className="flex items-start justify-between gap-2 text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <div>
                      <span className="font-semibold block mb-0.5">{item.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">{item.desc}</span>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-8 font-medium">
        * Some links above are affiliate links, meaning I get a small commission if you purchase through them.
      </p>
    </div>
  );
}
