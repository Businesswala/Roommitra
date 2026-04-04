import Link from "next/link";
import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-300 py-12 md:py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-b border-slate-800 pb-12 mb-8">
          
          <div className="md:col-span-1">
            <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-1">
              <span className="text-blue-500">Room</span>
              <span className="text-orange-500">mitra</span>
            </h3>
            <p className="text-slate-400 mb-6 text-sm">Everything You Need for Living – All in One Place. The premium hyperlocal hyper-market.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Globe className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Rooms & PGs</Link></li>
              <li><Link href="/" className="hover:text-orange-400 transition-colors">Find a Roommate</Link></li>
              <li><Link href="/" className="hover:text-rose-400 transition-colors">Tiffin Suppliers</Link></li>
              <li><Link href="/" className="hover:text-purple-400 transition-colors">Laundry Providers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Press & Media</Link></li>
              <li><Link href="/lister/register" className="hover:text-white transition-colors">Become a Lister</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Trust & Safety</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Roommitra Platforms. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
