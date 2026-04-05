import { getAllUsers, updateUserStatus } from "@/app/actions/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserX, UserCheck, ShieldCheck, Mail } from "lucide-react";
import { format } from "date-fns";

export default async function UserManagement() {
  const result = await getAllUsers();
  const users = result.data || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">User Operations</h1>
        <p className="text-slate-500 mt-1 font-medium">Govern access controls and identity nodes across the global network.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-bold text-slate-500 py-4 px-6 w-[300px]">Identity Target</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Role</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Stats</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">System Status</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500 font-medium italic">No human nodes registered in the system.</TableCell>
                </TableRow>
              ) : (
                users.map((user: any) => (
                  <TableRow key={user.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center font-black text-blue-600 ring-1 ring-blue-100 dark:ring-blue-800 shrink-0">
                          {user.name?.[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                          <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                            <Mail size={10} className="text-slate-400" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge variant="outline" className={`font-black uppercase tracking-widest text-[10px] ${
                        user.role === 'ADMIN' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-0' :
                        user.role === 'LISTER' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-0'
                      }`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                       <div className="flex gap-4 text-xs font-bold text-slate-400">
                          <div className="flex flex-col">
                             <span className="text-slate-900 dark:text-white">{user._count?.listings || 0}</span>
                             <span className="text-[10px] uppercase font-black tracking-tight">Listings</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-slate-900 dark:text-white">{user._count?.bookings || 0}</span>
                             <span className="text-[10px] uppercase font-black tracking-tight">Bookings</span>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                         user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                         'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                       }`}>
                         {user.status === 'ACTIVE' ? <UserCheck size={12} /> : <UserX size={12} />}
                         {user.status}
                       </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-xs font-bold text-slate-500 whitespace-nowrap">
                      {format(new Date(user.createdAt), 'MMM dd, yyyy')}
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
