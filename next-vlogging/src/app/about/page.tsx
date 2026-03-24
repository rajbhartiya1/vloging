import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg mt-8">
      <h1 className="text-4xl font-bold mb-6">My Story 🌟</h1>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Hey there! I'm Alex, a passionate vlogger who's been exploring the world through my camera for the past 5 years.
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8">Why I Started Vlogging</h2>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        I love sharing real experiences - from street food adventures in Delhi to unboxing the latest tech gadgets. My goal is to inspire you to live more, learn more, and enjoy life!
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8">What You'll Find Here</h2>
      <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2 mb-8">
        <li>✈️ Travel vlogs from India &amp; beyond</li>
        <li>💻 Honest tech reviews &amp; buying guides</li>
        <li>🌿 Lifestyle tips for better living</li>
        <li>🍲 Street food tours &amp; recipes</li>
      </ul>

      <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 italic text-xl text-gray-600 my-8 bg-indigo-50 rounded-r-lg">
        "Life's too short for boring content!"
      </blockquote>

      <div className="text-center mt-12 bg-gray-50 p-8 rounded-2xl">
        <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-xl">
          🚀
        </div>
        <p className="text-xl font-medium mb-6">Follow my journey! 👇</p>
        <Link 
          href="/" 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full inline-block transition-transform hover:scale-105 shadow-md"
        >
          Watch Latest Videos
        </Link>
      </div>
    </div>
  );
}
