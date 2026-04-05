import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Info, Target, Users, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Our Mission at <span className="text-blue-600">Room</span><span className="text-orange-500">mitra</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              We are building the ultimate hyperlocal hyper-market to simplify the lives of students and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-2xl w-fit mb-6">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Our Vision</h3>
              <p className="text-slate-500 dark:text-slate-400">To create a seamless ecosystem where finding a home, a roommate, or a meal is as easy as a single tap.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-2xl w-fit mb-6">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Community First</h3>
              <p className="text-slate-500 dark:text-slate-400">We believe in the power of local communities and strive to empower local providers and small businesses.</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-black mb-6">The Story Behind</h2>
            <p className="text-lg mb-6">
              Roommitra was born out of the struggle many of us faced when moving to new cities. From shady PG owners to unreliable tiffin services, the challenges were endless. We decided to build a platform that brings transparency, trust, and quality to hyperlocal services.
            </p>
            <p className="text-lg">
              Today, Roommitra is more than just a listing platform; it's a companion (mitra) for anyone looking to build a comfortable life in a new neighborhood.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
