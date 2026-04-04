"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Search, CheckCheck, MoreVertical, Phone } from "lucide-react";

type Message = {
  id: string;
  senderId: "me" | "them";
  text: string;
  timestamp: string;
};

type Thread = {
  id: string;
  contactName: string;
  propertyContext: string;
  avatar: string;
  verified: boolean;
  messages: Message[];
};

const mockThreads: Thread[] = [
  {
    id: "thread-1001",
    contactName: "Rahul Sharma",
    propertyContext: "Luxury Studio Suite in Indiranagar",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=0D8ABC&color=fff",
    verified: true,
    messages: [
      { id: "m1", senderId: "me", text: "Hello Rahul! Is the Studio Suite still fully vacant for immediate deployment?", timestamp: "10:24 AM" },
      { id: "m2", senderId: "them", text: "Hi! Yes, the suite is available. I can schedule a physical walk-through for you tomorrow at 11 AM if that works?", timestamp: "10:30 AM" },
      { id: "m3", senderId: "me", text: "Brilliant. Does the 100Mbps Wifi grid natively cover the balcony bounds?", timestamp: "10:31 AM" },
      { id: "m4", senderId: "them", text: "Absolutely, we installed dedicated mesh routing extensions yesterday.", timestamp: "10:35 AM" }
    ]
  },
  {
    id: "thread-1002",
    contactName: "Ayesha Khan",
    propertyContext: "Home Style Veg Tiffin Service",
    avatar: "https://ui-avatars.com/api/?name=Ayesha+Khan&background=FF8A00&color=fff",
    verified: true,
    messages: [
      { id: "m1", senderId: "me", text: "Hey Ayesha, do you execute delivery bounds into the Koramangala 4th block sector?", timestamp: "Yesterday" },
      { id: "m2", senderId: "them", text: "Yes, we actively deliver there! Delivery is free for standard 30-day subscriptions.", timestamp: "Yesterday" },
    ]
  }
];

export default function MessagesInbox() {
  const [threads, setThreads] = useState<Thread[]>(mockThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>("thread-1001");
  const [inputText, setInputText] = useState("");
  
  // Track scroll position seamlessly when executing new messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find(t => t.id === activeThreadId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      text: inputText,
      timestamp: "Just now"
    };

    setThreads(currentThreads => 
      currentThreads.map(thread => {
        if (thread.id === activeThreadId) {
          return { ...thread, messages: [...thread.messages, newMessage] };
        }
        return thread;
      })
    );
    
    setInputText("");
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden">
      
      {/* Global Header Bounds */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-shrink-0 items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="font-black text-xl flex items-center gap-1">
            <span className="text-blue-600 dark:text-blue-500">Room</span>
            <span className="text-orange-500">mitra</span>
            <span className="hidden sm:inline ml-2 text-slate-300 dark:text-slate-700">|</span>
            <span className="hidden sm:inline ml-2 text-sm font-semibold text-slate-500">Unified Comms Portal</span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Primary Inbox Interface */}
      <div className="flex-1 flex overflow-hidden max-w-[1600px] w-full mx-auto shadow-2xl">
        
        {/* Left Hand Thread Directory */}
        <aside className={`w-full md:w-[380px] lg:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col transition-all ${activeThreadId ? 'hidden md:flex' : 'flex'}`}>
           <div className="p-4 border-b border-slate-200 dark:border-slate-800">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 className="w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 border-none rounded-xl h-12 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none" 
                 placeholder="Locate contact logs or specific leads..."
               />
             </div>
           </div>

           <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {threads.map((thread) => {
                 const lastMsg = thread.messages[thread.messages.length - 1];
                 const isActive = thread.id === activeThreadId;

                 return (
                   <div 
                     key={thread.id} 
                     onClick={() => setActiveThreadId(thread.id)}
                     className={`flex items-start gap-4 p-4 border-b border-slate-100 dark:border-slate-800/60 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 ${isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                   >
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={thread.avatar} alt={thread.contactName} className="w-14 h-14 rounded-full object-cover shadow-sm bg-slate-200" />
                     <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-center mb-1 text-sm font-semibold text-slate-500 dark:text-slate-400 line-clamp-1">
                          {thread.propertyContext}
                       </div>
                       <div className="flex justify-between items-center">
                         <h3 className={`font-bold truncate pr-3 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                           {thread.contactName}
                         </h3>
                         <span className="text-xs text-slate-400 flex-shrink-0">{lastMsg.timestamp}</span>
                       </div>
                       <p className={`text-sm truncate mt-1 ${isActive ? 'text-blue-600/80 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>
                         {lastMsg.senderId === 'me' ? 'You: ' : ''}{lastMsg.text}
                       </p>
                     </div>
                   </div>
                 )
              })}
           </div>
        </aside>

        {/* Right Hand Live Transcript Engine */}
        {activeThread ? (
          <main className={`flex-1 flex flex-col bg-[#F8FAFC] dark:bg-slate-950 relative ${!activeThreadId ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Chat Transcript Header */}
            <div className="h-[72px] border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-between px-6 z-10">
               <div className="flex items-center gap-4">
                  <button className="md:hidden text-slate-500" onClick={() => setActiveThreadId("")}>
                    <ArrowLeft size={24} />
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeThread.avatar} alt="Avatar" className="w-10 h-10 rounded-full shadow-sm" />
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{activeThread.contactName}</h2>
                    <p className="text-xs font-semibold text-green-500 tracking-wide">Online • Interacting via Marketplace</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full">
                   <Phone size={20} />
                 </Button>
                 <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                   <MoreVertical size={20} />
                 </Button>
               </div>
            </div>

            {/* Bubble Transcript Matrix */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="text-center my-6">
                <span className="text-xs font-bold bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 py-1.5 px-3 rounded-full">
                   End-to-End Encryption Target Acquired
                </span>
              </div>

              {activeThread.messages.map((msg) => {
                const isMe = msg.senderId === "me";
                return (
                  <div key={msg.id} className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}>
                     <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm'}`}>
                       <p className="text-[15px] leading-relaxed">{msg.text}</p>
                     </div>
                     <div className={`flex items-center gap-1 mt-1 text-[11px] font-medium text-slate-400 ${isMe ? 'flex-row-reverse' : ''}`}>
                       {msg.timestamp}
                       {isMe && <CheckCheck className="w-3 h-3 text-blue-500" />}
                     </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer Logic */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
               <div className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-50 dark:bg-slate-950 p-2 rounded-2xl shadow-inner ring-1 ring-slate-200 dark:ring-slate-800">
                  <Input 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Transmit pulse into active loop..."
                    className="flex-1 bg-transparent border-0 h-12 focus-visible:ring-0 text-base shadow-none"
                  />
                  <Button onClick={handleSend} className="h-12 w-12 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 shrink-0">
                    <Send className="w-5 h-5 text-white ml-0.5" />
                  </Button>
               </div>
            </div>

          </main>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">
             <div className="text-center p-8 max-w-sm">
               <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full mx-auto flex items-center justify-center mb-6 ring-8 ring-white dark:ring-slate-900 shadow-xl">
                 <Send size={32} className="text-blue-500 ml-1 mt-1" />
               </div>
               <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200 tracking-tight">Select an active grid thread</h3>
               <p className="text-slate-500 mt-2">Establish real-time data flow with verified marketplace objects to accelerate your physical deployments.</p>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
