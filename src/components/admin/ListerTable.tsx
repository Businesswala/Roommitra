"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ListerProps = {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  mobile1: string;
  status: string;
  documentNo: string;
  createdAt: Date;
};

export function ListerTable({ initialData }: { initialData: ListerProps[] }) {
  const [listers, setListers] = useState<ListerProps[]>(initialData);
  const [processing, setProcessing] = useState<string | null>(null);

  const handleAction = async (id: string, action: "APPROVED" | "REJECTED") => {
    setProcessing(id);
    try {
      const res = await fetch("/api/admin/lister/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listerId: id, status: action })
      });
      const data = await res.json();
      
      if(data.success) {
        setListers(prev => prev.filter(l => l.id !== id));
      } else {
        alert("Action failed: " + data.error);
      }
    } catch(e) {
      alert("Network exception directly modifying user states.");
    } finally {
      setProcessing(null);
    }
  };

  if(listers.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 font-semibold shadow-sm">
        No pending registration requests found! 🎉
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-950">
          <TableRow>
            <TableHead>Applicant Name</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Doc Number</TableHead>
            <TableHead>Date Filed</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Admin Directives</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listers.map((l) => (
            <TableRow key={l.id} className="group">
              <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                {l.firstName} {l.surname}
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm text-slate-500 gap-1 mt-1 font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{l.email}</span>
                  <span className="font-mono text-xs text-slate-400">{l.mobile1}</span>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">{l.documentNo}</TableCell>
              <TableCell className="text-slate-500">
                {new Date(l.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50">
                  {l.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2 whitespace-nowrap">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 dark:bg-green-950/40 dark:hover:bg-green-900/50 dark:text-green-400 dark:border-green-900"
                  disabled={processing === l.id}
                  onClick={() => handleAction(l.id, "APPROVED")}
                >
                  <Check className="h-4 w-4 mr-1" /> Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:hover:bg-red-900/50 dark:text-red-400 dark:border-red-900"
                  disabled={processing === l.id}
                  onClick={() => handleAction(l.id, "REJECTED")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
