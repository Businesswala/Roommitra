import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Shield, Lock, Eye, Files } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6">Privacy Policy</h1>
            <p className="text-lg text-slate-500 font-medium italic">Last Updated: April 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
               <div className="bg-blue-600 p-2 rounded-lg w-fit mb-4"><Shield className="w-5 h-5 text-white" /></div>
               <h3 className="font-bold mb-2 dark:text-white">Data Protection</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">Enterprise-grade encryption for all your personal identifiers.</p>
            </div>
            <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
               <div className="bg-orange-600 p-2 rounded-lg w-fit mb-4"><Eye className="w-5 h-5 text-white" /></div>
               <h3 className="font-bold mb-2 dark:text-white">Transparency</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">We never sell your data. We only use it to improve your experience.</p>
            </div>
            <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
               <div className="bg-indigo-600 p-2 rounded-lg w-fit mb-4"><Lock className="w-5 h-5 text-white" /></div>
               <h3 className="font-bold mb-2 dark:text-white">Security First</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">Regular audits and protocol updates to ensure data integrity.</p>
            </div>
          </div>

          <article className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-black">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you create an account, post a listing, or communicate with other users. This includes your name, email, phone number, and any documents uploaded for verification.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black">2. How We Use Your Information</h2>
              <p>Your information is used to:</p>
              <ul>
                <li>Facilitate bookings and transactions.</li>
                <li>Verify the authenticity of listings.</li>
                <li>Personalize your experience on the platform.</li>
                <li>Provide customer support and resolve disputes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black">3. Information Sharing</h2>
              <p>We share necessary details with other users to facilitate transactions (e.g., sharing a seeker's contact with a lister after a confirmed interest). We do not share your data with third-party advertisers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black">4. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information at any time via your profile settings or by contacting our support team.</p>
            </section>
          </article>
        </div>
      </div>

      <Footer />
    </main>
  );
}
