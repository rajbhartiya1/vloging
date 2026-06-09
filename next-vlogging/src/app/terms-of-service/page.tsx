export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.32),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.24),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent_36%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:120px_120px]" />

      <div className="relative max-w-4xl mx-auto py-12 sm:py-16 px-3 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Terms of Service</h1>
          <p className="text-base text-slate-300/90">Effective Date: October 2026</p>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">1. Agreement to Terms</h2>
            <p className="text-slate-300/90 leading-7">
              By accessing or using our services ("VlogHub", "Service", "Website"), you agree to be bound by these 
              Terms. If you disagree with any part of the terms then you may not access the Service.
            </p>
          </section>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">2. Accounts</h2>
            <p className="text-slate-300/90 leading-7">
              When you create an account with us, you must provide us with information that is accurate, complete, 
              and current at all times. Failure to do so constitutes a breach of the Terms, which may result in 
              immediate termination of your account on our Service.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li className="text-slate-300/90">You are responsible for safeguarding the password that you use to access the Service.</li>
              <li className="text-slate-300/90">You agree not to disclose your password to any third party.</li>
              <li className="text-slate-300/90">You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
            </ul>
          </section>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">3. Content and Intellectual Property</h2>
            <p className="text-slate-300/90 leading-7">
              Our Service allows you to post, link, store, share and otherwise make available certain information, 
              text, graphics, videos, or other material ("Content"). You are responsible for the Content that you 
              post to the Service, including its legality, reliability, and appropriateness.
            </p>
            <p className="mt-4 text-slate-300/90 leading-7">
              By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, 
              publicly display, reproduce, and distribute such Content on and through the Service.
            </p>
          </section>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">4. Acceptable Use Policy</h2>
            <p className="text-slate-300/90 leading-7">
              You agree not to use the Service in any way that violates any applicable national or international law or regulation. 
              You must not use the website to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li className="text-slate-300/90">Transmit spam, chain letters, or other unsolicited comms.</li>
              <li className="text-slate-300/90">Attempt to interfere with, compromise the system integrity or security.</li>
              <li className="text-slate-300/90">Upload invalid data, viruses, worms, or other software agents through the Service.</li>
            </ul>
          </section>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">5. Modifications to Service</h2>
            <p className="text-slate-300/90 leading-7">
              We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, 
              the Service (or any part thereof) with or without notice. You agree that we shall not be liable to you or to 
              any third party for any modification, suspension or discontinuance of the Service.
            </p>
          </section>

          <section className="rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Contact</h2>
            <p className="text-slate-300/90 leading-7">
              If you have any questions about these Terms, please contact us at terms@vloghub.example.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
