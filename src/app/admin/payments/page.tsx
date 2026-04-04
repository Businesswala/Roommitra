"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PaymentManagement() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Financial Ledgers</h1>
        <p className="text-slate-500 mt-1 font-medium">Verify Gateway Transactions & Commission Nodes.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800">
                <TableHead className="font-bold text-slate-500 py-4 px-6">Transaction Hash</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Gross Amount</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Platform Cut (5%)</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Target</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6 text-right">Gateway Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                 <TableRow className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50">
                   <TableCell className="py-4 px-6 font-mono text-xs text-slate-500">txn_HRK832M39JD</TableCell>
                   <TableCell className="py-4 px-6 font-black text-slate-900 dark:text-white">₹18,000</TableCell>
                   <TableCell className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400">₹900</TableCell>
                   <TableCell className="py-4 px-6 text-sm font-semibold text-slate-600">Rahul Sharma</TableCell>
                   <TableCell className="py-4 px-6 text-right">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 py-1">SUCCEEDED</Badge>
                   </TableCell>
                 </TableRow>
                 <TableRow className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50">
                   <TableCell className="py-4 px-6 font-mono text-xs text-slate-500">txn_LZP294X55BW</TableCell>
                   <TableCell className="py-4 px-6 font-black text-slate-900 dark:text-white">₹3,500</TableCell>
                   <TableCell className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400">₹175</TableCell>
                   <TableCell className="py-4 px-6 text-sm font-semibold text-slate-600">Ayesha Khan</TableCell>
                   <TableCell className="py-4 px-6 text-right">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 py-1">FAILED</Badge>
                   </TableCell>
                 </TableRow>
            </TableBody>
         </Table>
      </div>
    </div>
  );
}
