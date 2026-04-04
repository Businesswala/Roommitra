"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShieldAlert, Trash2 } from "lucide-react";

export default function ReviewModeration() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Reputation Matrix</h1>
        <p className="text-slate-500 mt-1 font-medium">Moderate global object reviews ensuring community safety constraints.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="font-bold text-slate-500 py-4 px-6">Author Node</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Rating Vector</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Content Body</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6 text-right">Moderation Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                 <TableRow className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50">
                   <TableCell className="py-4 px-6 font-bold text-slate-900 dark:text-white">Vikram Singh</TableCell>
                   <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-1 text-yellow-500"><Star fill="currentColor" size={14}/><Star fill="currentColor" size={14}/></div>
                   </TableCell>
                   <TableCell className="py-4 px-6 text-sm font-semibold text-slate-600 truncate max-w-xs">The property completely misrepresented the WiFi bounds. No connection in the bedroom matrix.</TableCell>
                   <TableCell className="py-4 px-6 text-right">
                      <Button variant="ghost" size="sm" className="font-bold text-red-600 bg-red-50 hover:bg-red-100"><Trash2 size={14} className="mr-1"/> Delete Review</Button>
                   </TableCell>
                 </TableRow>
            </TableBody>
         </Table>
      </div>
    </div>
  );
}
