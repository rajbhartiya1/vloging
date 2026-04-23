import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import SocialLinks from "@/components/SocialLinks";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
          Let's Connect
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-balance">
          Whether you want to sponsor a video, collaborate on a project, or just say hi, I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start mb-24">
        {/* Left Col: Contact Form (Takes 3 columns) */}
        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Send a Message</h2>
          <ContactForm />
        </div>

        {/* Right Col: Info & Socials (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Other ways to reach me</h2>
            <SocialLinks />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 text-indigo-500/10 dark:text-indigo-500/20">
              <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-300 relative z-10">Business Inquiries Only</h3>
            <div className="space-y-3 text-lg text-indigo-800 dark:text-indigo-400 relative z-10">
              <p><strong>Email:</strong> <a href="mailto:raj@vloghub.com" className="hover:underline">raj@vloghub.com</a></p>
              <p className="mt-4 text-sm bg-white/50 dark:bg-black/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                Please note: For fan mail and channel feedback, use the contact form or hit me up on X/Twitter! ??
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <FAQAccordion />
      </div>
    </div>
  );
}
