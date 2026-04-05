import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Rocket, Sparkles, Heart, Zap } from "lucide-react";

export default function CareersPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">Join the Revolution</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">We're on a mission to redefine hyperlocal living. Come build the future with us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <div className="space-y-6">
               <h2 className="text-3xl font-black mb-8 dark:text-white">Why Roommitra?</h2>
               <div className="flex gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-2xl h-fit"><Rocket className="w-6 h-6 text-blue-600" /></div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">Fast Growth</h3>
                    <p className="text-slate-500">Work in a high-velocity environment where your impact is immediate and visible.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-2xl h-fit"><Heart className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">Inclusive Culture</h3>
                    <p className="text-slate-500">A community where every voice matters and diverse perspectives are celebrated.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-2xl h-fit"><Zap className="w-6 h-6 text-indigo-600" /></div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">Modern Tech Stack</h3>
                    <p className="text-slate-500">We use the latest tools and technologies to solve complex hyperlocal challenges.</p>
                  </div>
               </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <span className="text-slate-400 font-black uppercase tracking-widest text-xs">Open Positions</span>
               </div>
               <div className="space-y-4">
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center group">
                     <div>
                        <h4 className="font-bold dark:text-white">Senior Frontend Engineer</h4>
                        <p className="text-sm text-slate-500">Remote / Bengaluru • Full-time</p>
                     </div>
                     <span className="text-blue-600 font-black text-sm group-hover:translate-x-1 transition-transform">Apply →</span>
                  </div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center group">
                     <div>
                        <h4 className="font-bold dark:text-white">Product Designer (UI/UX)</h4>
                        <p className="text-sm text-slate-500">Bengaluru • Full-time</p>
                     </div>
                     <span className="text-blue-600 font-black text-sm group-hover:translate-x-1 transition-transform">Apply →</span>
                  </div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center group">
                     <div>
                        <h4 className="font-bold dark:text-white">Marketing Strategist</h4>
                        <p className="text-sm text-slate-500">Remote • Part-time</p>
                     </div>
                     <span className="text-blue-600 font-black text-sm group-hover:translate-x-1 transition-transform">Apply →</span>
                  </div>
               </div>
               <p className="mt-8 text-center text-sm text-slate-400">Don't see a fit? Email us at <span className="text-blue-500 font-bold">careers@roommitra.in</span></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
