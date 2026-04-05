import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Search, HelpCircle, MessageCircle, FileQuestion, BookOpen, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HelpPage() {
  const faqs = [
    {
      q: "How do I book a room?",
      a: "Once you find a listing you like, click on 'Initialize Session' to contact the lister. After discussing details, you can proceed with the booking through the platform's secure payment gateway."
    },
    {
      q: "Is my payment secure?",
      a: "Yes, Roommitra uses industry-standard encryption and trusted payment partners. We hold payments in escrow until the booking is confirmed by both parties."
    },
    {
      q: "How can I list my property?",
      a: "Go to the 'Become a Lister' section in the footer or navigation. You'll need to provide property details, photos, and identity verification documents."
    },
    {
      q: "What if the room doesn't match the listing?",
      a: "We recommend visiting the property before finalizing. If there's a significant discrepancy after booking, contact our support team immediately to initiate a dispute."
    },
    {
        q: "Can I find a roommate here?",
        a: "Absolutely! We have a dedicated 'Roommate' category where you can find compatible partners based on your living preferences."
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-blue-600 dark:bg-blue-900 border-b border-blue-700/50">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">How can we help you?</h1>
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-4 top-4 h-6 w-6 text-blue-300 group-focus-within:text-white transition-colors" />
            <Input 
              placeholder="Search for articles, guides, or FAQs..." 
              className="h-14 pl-12 bg-blue-700/50 border-blue-500/50 text-white placeholder:text-blue-300/80 rounded-2xl focus-visible:ring-offset-0 focus-visible:ring-blue-400 text-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer group">
             <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform"><BookOpen className="w-6 h-6 text-green-600" /></div>
             <h3 className="text-xl font-bold mb-2 dark:text-white">Getting Started</h3>
             <p className="text-slate-500 text-sm">New to Roommitra? Learn the basics of finding your new home.</p>
          </div>
          <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer group">
             <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform"><ShieldCircle className="w-6 h-6 text-purple-600" /></div>
             <h3 className="text-xl font-bold mb-2 dark:text-white">Trust & Safety</h3>
             <p className="text-slate-500 text-sm">How we verify listings and keep your transactions secure.</p>
          </div>
          <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer group">
             <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform"><AlertCircle className="w-6 h-6 text-orange-600" /></div>
             <h3 className="text-xl font-bold mb-2 dark:text-white">Account & Billing</h3>
             <p className="text-slate-500 text-sm">Manage your profile, payments, and subscription preferences.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-black mb-8 text-center dark:text-white flex items-center justify-center gap-3">
            <FileQuestion className="w-8 h-8 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6 bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800">
                <AccordionTrigger className="hover:no-underline py-5 text-left font-bold text-lg dark:text-slate-200">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 dark:text-slate-400 text-md leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-indigo-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10"><MessageCircle className="w-48 h-48" /></div>
          <h2 className="text-3xl font-black mb-4">Still need help?</h2>
          <p className="text-indigo-100 mb-8 max-w-lg mx-auto">Our support team is available 24/7 to answer your queries and resolve any issues.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 font-black px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg">Start Live Chat</button>
            <button className="bg-indigo-500 text-white font-black px-8 py-4 rounded-2xl hover:bg-indigo-400 transition-colors border border-indigo-400 shadow-lg">Email Support</button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function ShieldCircle({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <circle cx="12" cy="11" r="3" />
        </svg>
    );
}
