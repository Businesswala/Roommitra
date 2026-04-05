import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Newspaper, Image, Download, Share2, ArrowUpRight } from "lucide-react";

export default function PressPage() {
  const news = [
    {
      title: "Roommitra Raises $2M in Seed Funding to Expand Hyperlocal Marketplace",
      date: "March 15, 2026",
      source: "TechDaily Bharat"
    },
    {
      title: "How Hyperlocal Startups like Roommitra are Solving the Student Housing Crisis",
      date: "February 28, 2026",
      source: "The Economic News"
    },
    {
      title: "Roommitra Reaches 50k Active Listings in Bengaluru",
      date: "January 14, 2026",
      source: "Startup Monthly"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6">Press & Media</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Latest news and media assets from the Roommitra ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
             <div className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 text-center">
                <div className="bg-blue-600 p-3 rounded-2xl w-fit mx-auto mb-6"><Image className="w-6 h-6 text-white" /></div>
                <h3 className="font-bold dark:text-white mb-2">Media Kit</h3>
                <p className="text-sm text-slate-500 mb-6">Download logos, brand colors, and guidelines.</p>
                <button className="flex items-center gap-2 mx-auto text-blue-600 font-bold text-sm bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm">Download <Download className="w-4 h-4" /></button>
             </div>
             <div className="p-8 rounded-3xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800 text-center">
                <div className="bg-orange-600 p-3 rounded-2xl w-fit mx-auto mb-6"><Share2 className="w-6 h-6 text-white" /></div>
                <h3 className="font-bold dark:text-white mb-2">Brand Assets</h3>
                <p className="text-sm text-slate-500 mb-6">Official photography and executive headshots.</p>
                <button className="flex items-center gap-2 mx-auto text-orange-600 font-bold text-sm bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm">View Folder <ArrowUpRight className="w-4 h-4" /></button>
             </div>
             <div className="p-8 rounded-3xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 text-center">
                <div className="bg-indigo-600 p-3 rounded-2xl w-fit mx-auto mb-6"><Newspaper className="w-6 h-6 text-white" /></div>
                <h3 className="font-bold dark:text-white mb-2">PR Contact</h3>
                <p className="text-sm text-slate-500 mb-6">For media inquiries and interviews.</p>
                <button className="flex items-center gap-2 mx-auto text-indigo-600 font-bold text-sm bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm">Email PR Team</button>
             </div>
          </div>

          <div>
             <h2 className="text-3xl font-black mb-10 dark:text-white border-b pb-4">Recent Coverage</h2>
             <div className="space-y-8">
                {news.map((item, idx) => (
                   <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all cursor-pointer group shadow-sm hover:shadow-xl">
                      <div className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">{item.date} • {item.source}</span>
                        <h3 className="text-xl font-bold dark:text-slate-100 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                   </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
