"use client";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for your message! I'll reply soon. 🚀");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg mt-8">
      <h1 className="text-4xl font-bold mb-4">Get In Touch 📩</h1>
      <p className="text-lg text-gray-600 mb-8">
        Love my content? Have a collaboration idea? Send me a message!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
          <textarea
            id="message"
            rows={5}
            placeholder="Brand deals, collabs, feedback..."
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors shadow-md text-lg"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
        <h2 className="text-2xl font-bold mb-4 text-indigo-900">Business Inquiries</h2>
        <div className="space-y-3 text-lg text-indigo-800">
          <p><strong>Email:</strong> alex@vloghub.com</p>
          <p><strong>Social:</strong> @alexvloghub (Instagram, Twitter)</p>
          <p className="mt-4 text-indigo-600 italic">
            Perfect for brand sponsorships, affiliate partnerships & experiments!
          </p>
        </div>
      </div>

      <p className="text-center mt-8 text-gray-500 font-medium">
        I'll get back to you within 48 hours! 🚀
      </p>
    </div>
  );
}
