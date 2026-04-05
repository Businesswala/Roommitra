"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateConversation, SendMessage } from "@/app/actions/chat";
import { requestBooking } from "@/app/actions/booking";
import { useAuth } from "@/hooks/useAuth";

interface ListingInteractionProps {
  listingId: string;
  listerId: string;
  price: number;
}

export function ListingInteraction({ listingId, listerId, price }: ListingInteractionProps) {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryText, setInquiryText] = useState("");
  const [sending, setSending] = useState(false);
  const [booking, setBooking] = useState(false);

  const handleBooking = async () => {
    if (!user || !profile) {
      toast.error("Please login to request a booking");
      router.push("/login");
      return;
    }

    setBooking(true);
    const result = await requestBooking(listingId, price);
    setBooking(false);

    if (!result.error) {
       toast.success("Booking Request Transmitted! Redirecting to dashboard...");
       setTimeout(() => router.push("/user/dashboard"), 1500);
    } else {
       toast.error(result.error);
    }
  };

  const submitLead = async () => {
    if (!user || !profile) {
      toast.error("Please login to contact the lister");
      router.push("/login");
      return;
    }

    if (!inquiryText.trim()) return;

    setSending(true);
    try {
      // 1. Create/Get Conversation
      const conversation = await CreateConversation({
        userId: profile.id,
        listerId: listerId,
        listingId: listingId
      });

      if (!conversation) throw new Error("Failed to start secure channel");

      // 2. Send Initial Message
      await SendMessage({
        conversationId: conversation.id,
        senderId: profile.id,
        receiverId: listerId,
        message: inquiryText
      });

      toast.success("Inquiry perfectly transmitted! Redirecting to secure chat...");
      setTimeout(() => {
        router.push("/messages");
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "Transmission failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="sticky top-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 animate-in slide-in-from-right-8 duration-700">
      <div className="flex items-end gap-1 mb-8">
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">₹{price.toLocaleString("en-IN")}</h2>
        <span className="text-slate-500 font-medium text-lg leading-loose">/ month</span>
      </div>

      <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
          <ShieldCheck size={20} className="text-green-500 shrink-0" />
          Verified 100% Secure Transaction
        </div>
      </div>
      
      <Button 
        onClick={handleBooking}
        disabled={booking}
        className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 mb-4 transition-transform hover:scale-[1.02]"
      >
        {booking ? <Loader2 className="animate-spin" /> : "Request Secure Booking"}
      </Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger>
          <Button variant="outline" className="w-full h-12 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-4">
            Connect via Pulse Message
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-3xl overflow-hidden p-0 shadow-2xl">
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white">Secure Inquiry Portal</DialogTitle>
              <DialogDescription className="text-slate-500 tracking-wide mt-2">
                Your details are encrypted before touching the target Lister. Send an introductory pulse mapping your requirements safely.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mb-8">
              <textarea 
                placeholder="Hello, I am interested in inspecting this property..." 
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                className="w-full min-h-[140px] bg-slate-50 dark:bg-slate-900 border-none px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1 h-12 rounded-xl text-slate-600 border-slate-200 dark:border-slate-800">
                Cancel
              </Button>
              <Button onClick={submitLead} disabled={sending || !inquiryText.trim()} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg border-none shadow-blue-500/20">
                {sending ? <Loader2 className="animate-spin" /> : "Send Pulse"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Button variant="outline" className="w-full h-14 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        Schedule Physical Visit
      </Button>

      <p className="text-center text-xs text-slate-400 font-medium mt-6">
        Zero platform charges for executing direct grid queries!
      </p>
    </div>
  );
}
