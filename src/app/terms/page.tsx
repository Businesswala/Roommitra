import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { FileText, ShieldAlert, Scale, CheckCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6">Terms of Service</h1>
            <p className="text-lg text-slate-500 font-medium italic">Effective Date: April 4, 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
             <div className="flex gap-4 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
               <div className="bg-slate-200 dark:bg-slate-700 p-2.5 h-10 w-10 shrink-0 rounded-lg flex items-center justify-center font-bold text-slate-700 dark:text-slate-100">01</div>
               <div>
                  <h3 className="font-bold mb-1 dark:text-white">Acceptance</h3>
                  <p className="text-sm text-slate-500">By using Roommitra, you agree to these legal conditions without reservation.</p>
               </div>
             </div>
             <div className="flex gap-4 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <div className="bg-slate-200 dark:bg-slate-700 p-2.5 h-10 w-10 shrink-0 rounded-lg flex items-center justify-center font-bold text-slate-700 dark:text-slate-100">02</div>
                <div>
                   <h3 className="font-bold mb-1 dark:text-white">Fair Use</h3>
                   <p className="text-sm text-slate-500">Roommitra is intended for personal, non-commercial use by individuals seeking accommodation.</p>
                </div>
             </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
            <section>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <Scale className="w-8 h-8 text-blue-600" />
                User Responsibilities
              </h2>
              <p>All users must provide accurate and truthful information during registration and listing creation. Misleading information or fraudulent activity will result in immediate termination of account access.</p>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> <span>No harassment or discrimination against any platform members.</span></li>
                <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> <span>Listings must be authentic, and listers should have the right to lease the property.</span></li>
                <li className="flex gap-2 items-start"><CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" /> <span>Users are responsible for maintaining the confidentiality of their login credentials.</span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <ShieldAlert className="w-8 h-8 text-orange-600" />
                Disclaimers
              </h2>
              <p>Roommitra is a marketplace platform. We do not own or manage properties listed by users. We do not provide warranties regarding the quality or safety of listed accommodations beyond our verification processes.</p>
              <p>Transactions and agreements between users are at their own risk. We recommend visiting any property before making payments.</p>
            </section>

            <section>
              <h2 className="text-3xl font-black mb-6">Payment Terms</h2>
              <p>All platform fees associated with bookings or premium features are non-refundable. Service specific cancellation policies apply as defined in each individual listing.</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
