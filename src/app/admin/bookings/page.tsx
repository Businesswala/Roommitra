"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CalendarDays, CheckCircle2, Clock } from "lucide-react";

const initialBookings = [
  { id: "BKG-1049", user: "Vikram Singh", property: "Luxury Single Room", date: "2026-04-05", amount: "₹18,000", status: "CONFIRMED" },
  { id: "BKG-1050", user: "Neha Gupta", property: "PG 4 Men - Bed 2", date: "2026-04-12", amount: "₹8,500", status: "PENDING" },
  { id: "BKG-1051", user: "Rahul Sharma", property: "Home Style Tiffin - Monthly", date: "2026-04-01", amount: "₹3,500", status: "CONFIRMED" },
  { id: "BKG-1052", user: "Priya Patel", property: "Dry Clean Premium", date: "2026-04-08", amount: "₹450", status: "CANCELLED" },
];

export default function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Booking Pipeline</h1>
        <p className="text-slate-500 mt-1 font-medium">Global view of physical reservations and service schedules.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full max-w-md">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <Input placeholder="Search Booking IDs or Users..." className="pl-10 h-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="font-bold text-slate-500 py-4 px-6">Booking Tag</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Seeker</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Asset Mapping</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Value</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">State</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6 text-right">Overrides</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
               {initialBookings.map((b) => (
                 <TableRow key={b.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                   <TableCell className="py-4 px-6 font-bold text-slate-900 dark:text-white">{b.id}</TableCell>
                   <TableCell className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-400">{b.user}</TableCell>
                   <TableCell className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-400 truncate max-w-[200px]">{b.property}</TableCell>
                   <TableCell className="py-4 px-6 font-black text-slate-700 dark:text-slate-300">{b.amount}</TableCell>
                   <TableCell className="py-4 px-6">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide ${b.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : b.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {b.status}
                       </span>
                   </TableCell>
                   <TableCell className="py-4 px-6 text-right">
                      <Button variant="ghost" size="sm" className="font-bold text-blue-600">Resolve</Button>
                   </TableCell>
                 </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
    </div>
  );
}
