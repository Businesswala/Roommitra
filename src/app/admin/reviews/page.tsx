import { getAllReviews } from "@/app/actions/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Star, MessageSquare, Building2, User2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ReviewManagement() {
  const result = await getAllReviews();
  const reviews = result.data || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Review Governance</h1>
        <p className="text-slate-500 mt-1 font-medium font-mono text-xs uppercase tracking-widest bg-orange-50 dark:bg-orange-950/20 w-fit px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/30">
           Verified user feedback monitoring and moderation.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden relative group">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800 font-black text-slate-500">
                <TableHead className="py-6 px-8">Platform Metadata</TableHead>
                <TableHead className="py-6 px-8">Narrative Content</TableHead>
                <TableHead className="py-6 px-8">Rating Matrix</TableHead>
                <TableHead className="py-6 px-8 text-right">Moderation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-slate-500 font-medium italic">No human feedback registered in the platform ledger.</TableCell>
                </TableRow>
              ) : (
                reviews.map((review: any) => (
                  <TableRow key={review.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group/row">
                    <TableCell className="py-6 px-8">
                       <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                             <User2 className="h-3 w-3 text-blue-500" />
                             <span className="text-xs font-black text-slate-900 dark:text-white tracking-tighter truncate max-w-[150px]">{review.user?.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <Building2 className="h-3 w-3 text-orange-500" />
                             <span className="text-[10px] font-bold text-slate-400 truncate max-w-[150px]">{review.listing?.title}</span>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 px-8 max-w-[400px]">
                       <p className="text-sm font-medium text-slate-600 dark:text-slate-300 italic line-clamp-2">"{review.content}"</p>
                       <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{format(new Date(review.createdAt), 'MMM dd, HH:mm')}</p>
                    </TableCell>
                    <TableCell className="py-6 px-8">
                       <div className="flex items-center gap-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? "fill-orange-500 text-orange-500" : "text-slate-200 dark:text-slate-700"} />
                          ))}
                          <Badge variant="outline" className="ml-2 bg-slate-100 dark:bg-slate-800 border-0 h-4 px-1.5 text-[9px] font-black text-slate-500 tracking-tighter">
                             {review.rating}.0
                          </Badge>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                       <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors">
                          <ShieldAlert size={20} />
                       </Button>
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
