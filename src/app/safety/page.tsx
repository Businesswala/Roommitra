import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ShieldCheck, UserCheck, Lock, AlertTriangle, CheckCircle2, Search } from "lucide-react";

export default function SafetyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6">Trust & Safety</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Your safety is our top priority. We're committed to building a platform you can trust.</p>
          </div>

          <div className="space-y-12 mb-20">
             <div className="flex flex-col md:flex-row gap-8 items-center bg-blue-50 dark:bg-blue-900/10 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-800 shadow-xl">
                <div className="bg-blue-600 p-6 rounded-[2rem] shadow-xl shadow-blue-500/30 shrink-0"><UserCheck className="w-12 h-12 text-white" /></div>
                <div>
                   <h2 className="text-3xl font-black mb-4 dark:text-white">Lister Verification</h2>
                   <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">Every provider on Roommitra undergoes a mandatory identity and property document verification process.</p>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-bold text-slate-500 dark:text-slate-300">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Aadhaar/PAN Verification</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Property Ownership Proof</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Business License Check</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> In-person Site Visits</li>
                   </ul>
                </div>
             </div>

             <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-orange-50 dark:bg-orange-900/10 p-10 rounded-[3rem] border border-orange-100 dark:border-orange-800 shadow-xl">
                <div className="bg-orange-600 p-6 rounded-[2rem] shadow-xl shadow-orange-500/30 shrink-0"><Search className="w-12 h-12 text-white" /></div>
                <div>
                   <h2 className="text-3xl font-black mb-4 dark:text-white">Listing Quality Control</h2>
                   <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">We use automated and manual review systems to ensure every listing accurately represents the property.</p>
                   <ul className="space-y-3 text-sm font-bold text-slate-500 dark:text-slate-300">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> AI-Powered Image Recognition</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Community Flagging System</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Data Validation e.g. Pin Code Check</li>
                   </ul>
                </div>
             </div>

             <div className="flex flex-col md:flex-row gap-8 items-center bg-indigo-50 dark:bg-indigo-900/10 p-10 rounded-[3rem] border border-indigo-100 dark:border-indigo-800 shadow-xl">
                <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-500/30 shrink-0"><Lock className="w-12 h-12 text-white" /></div>
                <div>
                   <h2 className="text-3xl font-black mb-4 dark:text-white">Secure Payments</h2>
                   <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">Your money is safe with us. We only release payments to listers after a successful check-in or service delivery.</p>
                   <p className="text-sm text-slate-500 font-medium italic">We comply with PCI-DSS standards to protect your financial information.</p>
                </div>
             </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-10 rounded-[3rem] border border-red-100 dark:border-red-900/50 text-center">
             <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-6" />
             <h2 className="text-3xl font-black mb-4 text-red-900 dark:text-red-400">Security Warning</h2>
             <p className="text-red-700 dark:text-red-300 max-w-xl mx-auto font-medium">NEVER pay outside the Roommitra platform. We cannot protect your money or guarantee safety if transactions happen externally through WhatsApp or cash upfront.</p>
             <button className="mt-8 bg-red-600 hover:bg-red-700 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-95">Report Suspicious Activity</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
