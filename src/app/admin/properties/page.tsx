"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle, Trash2, Edit, Image as ImageIcon, MapPin } from "lucide-react";

// Mock Data Array for Properties
type Property = {
  id: string;
  title: string;
  type: "ROOM" | "PG" | "TIFFIN" | "LAUNDRY";
  listerName: string;
  price: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  thumbnail: string;
  location: string;
};

const initialProperties: Property[] = [
  { id: "PRP-401", title: "Luxury Single Room with Balcony", type: "ROOM", listerName: "Rahul Sharma", price: "₹18,000/mo", status: "PENDING", location: "Indiranagar, Bangalore", thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop" },
  { id: "PRP-402", title: "Home Style Veg Tiffin (3 Meals)", type: "TIFFIN", listerName: "Ayesha Khan", price: "₹3,500/mo", status: "APPROVED", location: "Koramangala", thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop" },
  { id: "PRP-403", title: "Express Dry Clean Services", type: "LAUNDRY", listerName: "Wash King", price: "₹50/kg", status: "APPROVED", location: "HSR Layout", thumbnail: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=300&h=200&fit=crop" },
  { id: "PRP-404", title: "Shared PG for Men - Tech Park", type: "PG", listerName: "Vikram Singh", price: "₹8,500/mo", status: "REJECTED", location: "Whitefield", thumbnail: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop" },
];

export default function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");

  const changeStatus = (id: string, newStatus: Property["status"]) => {
    setProperties(properties.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const deleteProperty = (id: string) => {
     if(confirm("Permanently erase this physical asset node from the global market?")) {
       setProperties(properties.filter(p => p.id !== id));
     }
  };

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || prop.id.includes(searchTerm) || prop.listerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || prop.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Asset Governance</h1>
        <p className="text-slate-500 mt-1 font-medium">Verify, approve, and globally manage physical properties & services.</p>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search Assets by Title, ID, or Lister..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl w-full"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {["ALL", "ROOM", "PG", "TIFFIN", "LAUNDRY"].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                filterType === type 
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              {type === "ALL" ? "All Categories" : type}
            </button>
          ))}
        </div>
      </div>

      {/* Complex Asset DataTable */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-bold text-slate-500 py-4 px-6 w-[350px]">Physical Asset</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Pricing Node</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6">Live Status</TableHead>
                <TableHead className="font-bold text-slate-500 py-4 px-6 text-right">Governing Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-slate-500 font-medium">No assets resolved to active query strings.</TableCell>
                </TableRow>
              ) : (
                filteredProperties.map((prop) => (
                  <TableRow key={prop.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    
                    {/* Visual Asset Definition */}
                    <TableCell className="py-4 px-6 flex items-center gap-4">
                      <div className="relative group shrink-0">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={prop.thumbnail} alt="Thumbnail" className="w-20 h-14 rounded-lg object-cover shadow-sm bg-slate-200 dark:bg-slate-800 transition-transform duration-300 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center cursor-pointer backdrop-blur-[1px]">
                           <ImageIcon size={20} className="text-white" />
                         </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-slate-900 dark:text-white truncate" title={prop.title}>{prop.title}</p>
                          <Badge variant="outline" className={`text-[10px] py-0 border-0 uppercase ${
                            prop.type === 'ROOM' || prop.type === 'PG' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>{prop.type}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                           <span className="flex items-center gap-0.5"><MapPin size={12} className="text-red-500" /> {prop.location}</span>
                           <span className="text-slate-300 dark:text-slate-700">|</span>
                           <span>By: <span className="text-slate-700 dark:text-slate-300">{prop.listerName}</span></span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Fiscal Bounds */}
                    <TableCell className="py-4 px-6 font-black text-slate-700 dark:text-slate-300">
                      {prop.price}
                    </TableCell>

                    {/* State Management */}
                    <TableCell className="py-4 px-6">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                         prop.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)]' :
                         prop.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 shadow-[inset_0_0_0_1px_rgba(239,68,68,0.2)]' :
                         'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.3)] animate-pulse'
                       }`}>
                         {prop.status}
                       </span>
                    </TableCell>

                    {/* Operational Mutations */}
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        {prop.status !== 'APPROVED' && (
                          <Button 
                            variant="ghost" size="sm"
                            onClick={() => changeStatus(prop.id, 'APPROVED')}
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 px-3 text-xs font-bold"
                          >
                            <CheckCircle size={14} className="mr-1" /> Approve
                          </Button>
                        )}
                        {prop.status !== 'REJECTED' && (
                          <Button 
                            variant="ghost" size="sm"
                            onClick={() => changeStatus(prop.id, 'REJECTED')}
                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 px-3 text-xs font-bold"
                          >
                            <XCircle size={14} className="mr-1" /> Reject
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" title="Edit Metadata">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteProperty(prop.id)} className="h-8 w-8 text-slate-400 hover:text-red-600" title="Evaporate Asset">
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
      </div>

    </div>
  );
}
