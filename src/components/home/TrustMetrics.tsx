import { ShieldCheck, MessageCircleHeart, UsersRound } from "lucide-react";

export function TrustMetrics() {
  const steps = [
    { title: "Verified Listings", desc: "Every property and service is thoroughly checked by our team.", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { title: "Secure Chat", desc: "Connect instantly with listers securely right within our app.", icon: MessageCircleHeart, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    { title: "10,000+ Happy Users", desc: "Join our vibrant community of students and professionals.", icon: UsersRound, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Why Choose Roommitra?</h2>
          <p className="text-slate-500 text-lg">We bring transparency, trust, and ease to the hyperlocal living ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center group cursor-default">
                <div className={`w-20 h-20 rounded-full ${step.bg} flex items-center justify-center mb-6 ring-8 ring-white dark:ring-slate-900 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-slate-200/50 dark:shadow-none`}>
                  <Icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-slate-100">{step.title}</h3>
                <p className="text-slate-500">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
