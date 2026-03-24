export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Terms of Service</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Effective Date: October 2026</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using our services ("VlogHub", "Service", "Website"), you agree to be bound by these 
            Terms. If you disagree with any part of the terms then you may not access the Service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. Accounts</h2>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, 
            and current at all times. Failure to do so constitutes a breach of the Terms, which may result in 
            immediate termination of your account on our Service.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>You are responsible for safeguarding the password that you use to access the Service.</li>
            <li>You agree not to disclose your password to any third party.</li>
            <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. Content and Intellectual Property</h2>
          <p>
            Our Service allows you to post, link, store, share and otherwise make available certain information, 
            text, graphics, videos, or other material ("Content"). You are responsible for the Content that you 
            post to the Service, including its legality, reliability, and appropriateness.
          </p>
          <p className="mt-4">
            By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, 
            publicly display, reproduce, and distribute such Content on and through the Service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
          <p>
            You agree not to use the Service in any way that violates any applicable national or international law or regulation. 
            You must not use the website to:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Transmit spam, chain letters, or other unsolicited comms.</li>
            <li>Attempt to interfere with, compromise the system integrity or security.</li>
            <li>Upload invalid data, viruses, worms, or other software agents through the Service.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">5. Modifications to Service</h2>
          <p>
            We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, 
            the Service (or any part thereof) with or without notice. You agree that we shall not be liable to you or to 
            any third party for any modification, suspension or discontinuance of the Service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at terms@vloghub.example.com.
          </p>
        </section>
      </div>
    </div>
  );
}
