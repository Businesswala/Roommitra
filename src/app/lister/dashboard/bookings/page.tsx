import { dbCall } from "@/lib/db-utils";
import { createClient } from "@/utils/supabase/server";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, X, User, Building2, Calendar, Phone } from "lucide-react";
import { updateBookingStatus } from "@/app/actions/booking";
import { redirect } from "next/navigation";

export default async function ListerBookingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const result = await dbCall(async (db) => {
    const profile = await db.profile.findUnique({
      where: { supabaseId: user.id }
    });

    if (!profile) throw new Error("Profile not found");

    return await db.booking.findMany({
      where: {
        listing: { listerId: profile.id }
      },
      include: {
        user: true,
        listing: true,
        payment: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }, "Fetching lister's incoming bookings");

  const bookings = result.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Booking Requests</h1>
        <p className="text-slate-500 mt-1 font-medium italic">Moderate incoming reservations and manage platform fulfillment.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-950/50 text-[10px] uppercase font-black tracking-widest text-slate-400">
              <TableRow className="border-b border-slate-100 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="py-6 px-10">Seeker Identity</TableHead>
                <TableHead className="py-6 px-10">Asset Target</TableHead>
                <TableHead className="py-6 px-10">Fiscal Status</TableHead>
                <TableHead className="py-6 px-10">Reservation Date</TableHead>
                <TableHead className="py-6 px-10 text-right">Moderation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center text-slate-500 font-medium italic">No incoming requests detected on the platform frequency.</TableCell>
                </TableRow>
              ) : (
                bookings.map((booking: any) => (
                  <TableRow key={booking.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group">
                    <TableCell className="py-6 px-10">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                            {booking.user?.name?.[0].toUpperCase()}
                         </div>
                         <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{booking.user?.name}</p>
                            <p className="text-[10px] text-blue-500 uppercase font-black flex items-center gap-1"><Phone size={10} /> {booking.user?.mobile}</p>
                         </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 px-10">
                       <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          <p className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px] text-sm uppercase tracking-tight">{booking.listing?.title}</p>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 px-10">
                       <div className="flex flex-col gap-1.5">
                          <Badge variant="outline" className={`w-fit text-[9px] font-black uppercase tracking-widest px-3 py-1 ${
                            booking.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            booking.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' :
                            'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {booking.status}
                          </Badge>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">₹{booking.amount.toLocaleString()}</p>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 px-10">
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5"><Calendar size={14} className="text-slate-300" /> {format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">Platform Marker</span>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 px-10 text-right">
                       <form action={async (formData) => {
                          'use server'
                          const action = formData.get('action') as "CONFIRMED" | "CANCELLED";
                          await updateBookingStatus(booking.id, action);
                       }} className="flex items-center justify-end gap-2">
                         <Button name="action" value="CONFIRMED" disabled={booking.status !== 'PENDING'} className="h-10 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                            <Check size={14} className="mr-1" /> Approve
                         </Button>
                         <Button name="action" value="CANCELLED" disabled={booking.status !== 'PENDING'} variant="outline" className="h-10 px-4 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/20 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all">
                            <X size={14} className="mr-1" /> Reject
                         </Button>
                       </form>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
