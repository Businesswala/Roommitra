import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Mail, Phone, MapPin, Send, Globe, Share } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
            
            {/* Contact Info Sidebar */}
            <div className="bg-blue-600 p-12 text-white relative overflow-hidden">
               <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
               <div className="absolute top-24 -left-24 w-64 h-64 bg-indigo-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>

               <h1 className="text-4xl font-black mb-8 relative z-10">Get in Touch</h1>
               <p className="text-blue-100 text-lg mb-12 relative z-10 font-medium">Have questions or need assistance? Our team is here to help you find your perfect home.</p>

               <div className="space-y-8 relative z-10">
                 <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white group-hover:text-blue-600 transition-all duration-300 shadow-lg">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-blue-200 text-sm font-bold uppercase tracking-widest">Email Us</span>
                      <span className="text-xl font-black">support@roommitra.in</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white group-hover:text-blue-600 transition-all duration-300 shadow-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-blue-200 text-sm font-bold uppercase tracking-widest">Call Us</span>
                      <span className="text-xl font-black">+91 91234 56789</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white group-hover:text-blue-600 transition-all duration-300 shadow-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-blue-200 text-sm font-bold uppercase tracking-widest">Office</span>
                      <span className="text-xl font-black">HSR Layout, Bengaluru, Karnataka</span>
                    </div>
                 </div>
               </div>

               <div className="mt-20 relative z-10 flex gap-6">
                  <a href="#" className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300"><Globe className="w-6 h-6" /></a>
                  <a href="#" className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300"><Globe className="w-6 h-6" /></a>
                  <a href="#" className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300"><Share className="w-6 h-6" /></a>
               </div>
            </div>

            {/* Contact Form Content */}
            <div className="p-12">
               <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Send us a Message</h2>
               <p className="text-slate-500 mb-10 font-medium">Fill out the form below and we'll get back to you within 24 hours.</p>

               <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-black uppercase tracking-wider text-slate-400">Full Name</label>
                       <Input placeholder="John Doe" className="h-14 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl focus-visible:ring-blue-500 text-lg font-medium" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-black uppercase tracking-wider text-slate-400">Email Address</label>
                       <Input type="email" placeholder="john@example.com" className="h-14 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl focus-visible:ring-blue-500 text-lg font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider text-slate-400">Subject</label>
                    <Input placeholder="How can we help?" className="h-14 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl focus-visible:ring-blue-500 text-lg font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider text-slate-400">Message</label>
                    <Textarea placeholder="Tell us more about your query..." className="min-h-[180px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl focus-visible:ring-blue-500 text-lg font-medium p-4" />
                  </div>
                  <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-xl font-black rounded-2xl shadow-xl shadow-blue-500/20 transform active:scale-95 transition-all flex items-center gap-3">
                    Send Message <Send className="w-6 h-6" />
                  </Button>
               </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
