"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Ban, Unlock, Trash2, Eye, UserX, UserCheck } from "lucide-react";

// Massive Mock Data Array simulating Seeker & Lister combinations
type SystemUser = {
  id: string;
  name: string;
  email: string;
  role: "SEEKER" | "LISTER" | "ADMIN";
  joined: string;
  status: "ACTIVE" | "BLOCKED" | "PENDING";
  avatar: string;
};

const initialUsers: SystemUser[] = [
  { id: "USR-001", name: "Rahul Sharma", email: "rahul@example.com", role: "LISTER", joined: "2026-01-12", status: "ACTIVE", avatar: "https://ui-avatars.com/api/?name=RS&background=2563eb&color=fff" },
  { id: "USR-002", name: "Ayesha Khan", email: "ayesha@example.com", role: "LISTER", joined: "2026-02-04", status: "ACTIVE", avatar: "https://ui-avatars.com/api/?name=AK&background=10b981&color=fff" },
  { id: "USR-003", name: "Vikram Singh", email: "vikram.s@example.com", role: "SEEKER", joined: "2026-03-15", status: "BLOCKED", avatar: "https://ui-avatars.com/api/?name=VS&background=ef4444&color=fff" },
  { id: "USR-004", name: "Neha Gupta", email: "neha.g@example.com", role: "SEEKER", joined: "2026-03-22", status: "ACTIVE", avatar: "https://ui-avatars.com/api/?name=NG&background=8b5cf6&color=fff" },
  { id: "USR-005", name: "Arjun Reddy", email: "arjun@example.com", role: "LISTER", joined: "2026-03-28", status: "PENDING", avatar: "https://ui-avatars.com/api/?name=AR&background=f59e0b&color=fff" },
  { id: "USR-006", name: "Priya Patel", email: "patel.p@example.com", role: "SEEKER", joined: "2026-04-01", status: "ACTIVE", avatar: "https://ui-avatars.com/api/?name=PP&background=ec4899&color=fff" },
  { id: "USR-007", name: "System Admin", email: "admin@roommitra.in", role: "ADMIN", joined: "2025-10-01", status: "ACTIVE", avatar: "https://ui-avatars.com/api/?name=SA&background=1e293b&color=fff" },
];

export default function UserManagement() {
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("ALL");

  const handleToggleBlock = (id: string, currentStatus: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: currentStatus === "BLOCKED" ? "ACTIVE" : "BLOCKED" };
      }
      return u;
    }));
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you absolutely sure you want to permanently delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Heavy Filter Logic mimicking DB queries
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "ALL" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Block constraints */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">User Operations</h1>
        <p className="text-slate-500 mt-1 font-medium">Govern access controls and identity nodes.</p>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search by Name, Email, or UUID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl w-full"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {["ALL", "SEEKER", "LISTER", "ADMIN"].map(role => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                filterRole === role 
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              {role === "ALL" ? "All Users" : role}s
            </button>
          ))}
        </div>
      </div>

      {/* Shadcn Data Table Engine */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-bold text-slate-500 py-4 px-6 w-[250px]">Identity Target</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Access Role</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Joined Matrix</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">System Status</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6 text-right">Overrides</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500 font-medium">No system targets matched your exact query.</TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 ring-2 ring-white dark:ring-slate-900 shadow-sm" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge variant="outline" className={`font-bold uppercase tracking-wider ${
                        user.role === 'ADMIN' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-0' :
                        user.role === 'LISTER' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-0'
                      }`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
                      {user.joined}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
                         user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                         user.status === 'BLOCKED' ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' :
                         'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                       }`}>
                         {user.status === 'BLOCKED' ? <UserX size={12} /> : <UserCheck size={12} />}
                         {user.status}
                       </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800" title="Inspect Node">
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleToggleBlock(user.id, user.status)}
                          className={`h-8 w-8 ${user.status === 'BLOCKED' ? 'text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10' : 'text-slate-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10'}`} 
                          title={user.status === 'BLOCKED' ? "Unblock Account" : "Force Block Account"}
                        >
                          {user.status === 'BLOCKED' ? <Unlock size={16} /> : <Ban size={16} />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(user.id)}
                          className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10" 
                          title="Purge Object"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Mock Pagination Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between text-sm text-slate-500 font-medium bg-slate-50/50 dark:bg-slate-900/50">
          <span>Showing 1 to {filteredUsers.length} of {filteredUsers.length} active nodes</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled className="h-8 shadow-none dark:border-slate-800">Previous</Button>
            <Button variant="outline" size="sm" disabled className="h-8 shadow-none dark:border-slate-800">Next Track</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
