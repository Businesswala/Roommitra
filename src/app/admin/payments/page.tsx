import { getFinancialLedger, getSystemStats } from "@/app/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, FileText, TrendingUp, Wallet } from "lucide-react";
import { format } from "date-fns";

export default async function PaymentsLedgerPage() {
  const [ledgerData, statsData] = await Promise.all([
    getFinancialLedger(),
    getSystemStats()
  ]);

  const ledger = ledgerData.data || [];
  const stats = statsData.data || { revenue: 0, bookings: 0 };

  const totalFees = ledger.reduce((acc: any, curr: any) => acc + (curr.platformFee || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Financial Hub</h1>
        <p className="text-slate-500 mt-2 font-medium">Verified transaction ledger and revenue intelligence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-blue-600 text-white overflow-hidden relative group transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={80} />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-bold uppercase tracking-wider opacity-80">Gross Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 opacity-80" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black">₹{stats.revenue.toLocaleString()}</div>
            <p className="text-xs mt-1 opacity-80">Lifetime volume processed</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-orange-500 text-white overflow-hidden relative group transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={80} />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-bold uppercase tracking-wider opacity-80">Platform Fees</CardTitle>
            <Wallet className="h-4 w-4 opacity-80" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black">₹{totalFees.toLocaleString()}</div>
            <p className="text-xs mt-1 opacity-80">Roommitra net revenue</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-slate-900 text-white overflow-hidden relative group transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText size={80} />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-bold uppercase tracking-wider opacity-80">Total Transactions</CardTitle>
            <FileText className="h-4 w-4 opacity-80" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black">{ledger.length}</div>
            <p className="text-xs mt-1 opacity-80">Verified bookings</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none dark:ring-1 dark:ring-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-blue-600" />
            Transaction Ledger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-black">Transaction ID</th>
                  <th className="px-6 py-4 font-black">Entity</th>
                  <th className="px-6 py-4 font-black text-right">Gross</th>
                  <th className="px-6 py-4 font-black text-right">Fee</th>
                  <th className="px-6 py-4 font-black text-right">Net</th>
                  <th className="px-6 py-4 font-black">Status</th>
                  <th className="px-6 py-4 font-black">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {ledger.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 font-medium italic">
                      No transaction records found in the ledger. Platform dormant.
                    </td>
                  </tr>
                )}
                {ledger.map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600 font-mono text-xs">
                      #{tx.transactionHash.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate font-semibold">
                      {tx.booking.listing.title}
                    </td>
                    <td className="px-6 py-4 text-right font-bold">₹{tx.grossAmount}</td>
                    <td className="px-6 py-4 text-right text-orange-600 font-medium">-₹{tx.platformFee}</td>
                    <td className="px-6 py-4 text-right font-black text-green-600">₹{tx.netToLister}</td>
                    <td className="px-6 py-4">
                      <Badge variant={tx.gatewayStatus === "SUCCEEDED" ? "outline" : "destructive"} className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                        {tx.gatewayStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap font-medium">
                      {format(new Date(tx.createdAt), 'MMM dd, yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
