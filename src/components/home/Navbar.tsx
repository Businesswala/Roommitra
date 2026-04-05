"use client"

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15L10 45H90L50 15Z" fill="#1D4ED8" />
              <path d="M20 45V85H80V45" fill="none" stroke="#1D4ED8" strokeWidth="8"/>
              <circle cx="35" cy="55" r="10" fill="#F97316"/>
              <circle cx="65" cy="55" r="10" fill="#22C55E"/>
              <path d="M35 85C35 70 45 65 50 65C55 65 65 70 65 85" fill="none" stroke="#F97316" strokeWidth="8"/>
              <path d="M65 85C65 70 55 65 50 65" fill="none" stroke="#22C55E" strokeWidth="8"/>
            </svg>
            <span className="text-2xl font-bold hidden sm:inline-block tracking-tight">
              <span className="text-blue-700 dark:text-blue-500">Room</span>
              <span className="text-orange-500 dark:text-orange-500">mitra</span>
            </span>
          </Link>
          
          {/* Location Selector (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span>Select Location</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link 
            href="/register" 
            className={cn(buttonVariants({ variant: "outline" }), "hidden sm:inline-flex border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-900 dark:hover:bg-blue-900 dark:hover:text-blue-100 h-10 px-4 py-2")}
          >
            List your Property
          </Link>
          <div className="hidden sm:flex border-l h-6 mx-2 border-slate-300 dark:border-slate-700"></div>
          <Link 
            href="/login" 
            className={cn(buttonVariants({ variant: "ghost" }), "font-semibold px-3 h-10 py-2")}
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className={cn(buttonVariants(), "font-semibold bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg shadow-orange-500/25 hidden md:flex h-10 px-4 py-2")}
          >
            Sign Up
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
