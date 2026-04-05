import { getAllBookings } from "@/app/actions/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, User, Building, CreditCard, ChevronRight } from "lucide-react";

export default async function BookingManagement() {
  const result = await getAllBookings();
  const bookings = result.data || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Booking Matrix</h1>
        <p className="text-slate-500 mt-1 font-medium italic">Monitor reservation lifecycle and platform fulfillment status.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="font-black text-slate-500 py-6 px-8">Client Target</TableHead>
                <TableHead className="font-black text-slate-500 py-6 px-8">Asset Linked</TableHead>
                <TableHead className="font-black text-slate-500 py-6 px-8">Fiscal Status</TableHead>
                <TableHead className="font-black text-slate-500 py-6 px-8">Booking Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-slate-500 font-medium italic">No active bookings detected in the local network.</TableCell>
                </TableRow>
              ) : (
                bookings.map((booking: any) => (
                  <TableRow key={booking.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group">
                    <TableCell className="py-6 px-8">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            {booking.user?.name?.[0].toUpperCase()}
                         </div>
                         <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{booking.user?.name}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-black">{booking.user?.mobile}</p>
                         </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                       <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-blue-500" />
                          <div className="min-w-0">
                             <p className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px] text-sm">{booking.listing?.title}</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">By: {booking.listing?.lister?.name}</p>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                       <div className="flex flex-col gap-1.5">
                          <Badge variant="outline" className={`w-fit text-[9px] font-black uppercase tracking-widest ${
                            booking.status === 'CONFIRMED' ? 'bg-green-50 text-green-600 border-green-200 shadow-sm' :
                            booking.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-200 animate-pulse' :
                            'bg-red-50 text-red-600 border-red-200 shadow-sm'
                          }`}>
                            {booking.status}
                          </Badge>
                          <div className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                             <CreditCard size={10} className="text-slate-400" />
                             {booking.payment ? `₹${booking.payment.grossAmount} / ${booking.payment.gatewayStatus}` : 'UNPAID'}
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                       <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Reservation Marker</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                       </div>
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
