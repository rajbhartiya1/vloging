export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.32),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.24),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent_36%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:120px_120px]" />

      <div className="relative max-w-4xl mx-auto py-12 sm:py-16 px-3 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Privacy Policy</h1>
          <p className="text-base text-slate-300/90">Last Updated: October 2026</p>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">1. Introduction</h2>
            <p className="text-slate-300/90 leading-7">
              Welcome to VlogHub ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">2. The Data We Collect</h2>
            <p className="text-slate-300/90 leading-7">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li className="text-slate-300/90"><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li className="text-slate-300/90"><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li className="text-slate-300/90"><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, operating system and platform.</li>
              <li className="text-slate-300/90"><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">3. How We Use Your Data</h2>
            <p className="text-slate-300/90 leading-7">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li className="text-slate-300/90">Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li className="text-slate-300/90">Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li className="text-slate-300/90">Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">4. Data Security</h2>
            <p className="text-slate-300/90 leading-7">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">5. Contact Us</h2>
            <p className="text-slate-300/90 leading-7">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="mt-3 text-slate-300/90">
              <strong>Email:</strong> privacy@vloghub.example.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
