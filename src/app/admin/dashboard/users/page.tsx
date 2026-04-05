import { getAllUsers } from "@/app/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User, Shield, UserCheck, Ban, Mail, Calendar } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default async function UserGovernancePage() {
  const { data: users, error } = await getAllUsers();

  if (error) {
    return <div className="p-8 text-red-600 font-bold bg-red-50 rounded-2xl border border-red-100">Error loading users: {error}</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">User Governance</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage platform profiles, roles, and access controls.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl font-bold border-slate-200">Export CSV</Button>
          <Button className="rounded-xl font-bold bg-blue-600 hover:bg-blue-700">Add Admin</Button>
        </div>
      </div>

      <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-6">
          <CardTitle className="text-xl font-black flex items-center gap-2">
            <UserCheck className="text-blue-600" size={24} />
            Platform Directory
            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {users?.length || 0} Registered Souls
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/30 dark:bg-slate-800/20">
              <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-bold text-slate-900 dark:text-slate-200">Member</TableHead>
                <TableHead className="font-bold text-slate-900 dark:text-slate-200">Role</TableHead>
                <TableHead className="font-bold text-slate-900 dark:text-slate-200">Network Activity</TableHead>
                <TableHead className="font-bold text-slate-900 dark:text-slate-200">Status</TableHead>
                <TableHead className="font-bold text-slate-900 dark:text-slate-200 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((u: any) => (
                <TableRow key={u.id} className="border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <TableCell className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center font-bold text-slate-500 overflow-hidden shadow-inner">
                        {u.avatarUrl ? <img src={u.avatarUrl} alt="" className="w-full h-full object-cover" /> : <User size={20} />}
                      </div>
                      <div>
                        <div className="font-black text-slate-900 dark:text-white leading-none">{u.fullName || "Anonymous Soul"}</div>
                        <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1">
                          <Mail size={10} /> {u.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`rounded-lg px-2 py-0.5 font-bold text-[10px] uppercase tracking-wider ${
                      u.role === 'ADMIN' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      u.role === 'LISTER' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                      'bg-slate-50 text-slate-600 border-slate-100'
                    } border shadow-none`}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <Calendar size={12} className="text-slate-400" />
                        Joined {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">
                        {u._count.listings} Deployments • {u._count.bookings} Engagements
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`rounded-full px-3 py-1 font-bold ${
                      u.status === 'ACTIVE' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-400 text-white'
                    } shadow-lg border-none`}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                          <MoreHorizontal size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl w-48 shadow-2xl border-slate-200">
                        <DropdownMenuLabel className="font-bold text-slate-400 text-xs uppercase p-3">User Control</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer font-bold gap-2 p-3">
                          <Shield size={16} /> Update Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer font-bold gap-2 p-3 text-rose-600 hover:text-rose-700">
                          <Ban size={16} /> Block Account
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer font-bold gap-2 p-3 text-slate-400">
                          View Activity Log
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
