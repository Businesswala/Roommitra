"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Plus, Calendar, Image as ImageIcon } from "lucide-react";

export default function OffersManagement() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Marketing Bounds</h1>
          <p className="text-slate-500 mt-1 font-medium">Inject promotional constants directly into the App UI.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold rounded-xl hidden sm:flex truncate"><Plus size={16} className="mr-1" /> New Campaign</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="font-bold text-slate-500 py-4 px-6">Render Target</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Discount Coefficient</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Cron Schedule</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                 <TableRow className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50">
                   <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                         <div className="w-16 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <ImageIcon size={20} />
                         </div>
                         <span className="font-bold">Diwali Mega Splash Banner</span>
                      </div>
                   </TableCell>
                   <TableCell className="py-4 px-6 font-black text-emerald-600">50% OFF FEES</TableCell>
                   <TableCell className="py-4 px-6 text-sm font-semibold text-slate-500 flex items-center gap-1.5"><Calendar size={14}/> Oct 20 - Nov 5</TableCell>
                   <TableCell className="py-4 px-6 text-right">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-1">SCHEDULED</Badge>
                   </TableCell>
                 </TableRow>
            </TableBody>
         </Table>
      </div>
    </div>
  );
}
