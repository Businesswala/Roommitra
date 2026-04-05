"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Search, CheckCheck, MoreVertical, Phone, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { GetConversations, GetMessages, SendMessage } from "@/app/actions/chat";
import { toast } from "sonner";
import { format } from "date-fns";

export default function MessagesInbox() {
  const { user, profile, loading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Conversations on Mount
  useEffect(() => {
    if (user) {
      const fetchConvos = async () => {
        const data = await GetConversations(user.id);
        setConversations(data);
        setIsLoading(false);
        if (data.length > 0 && !activeConversationId) {
          setActiveConversationId(data[0].id);
        }
      };
      fetchConvos();
    }
  }, [user]);

  // 2. Polling for Messages
  useEffect(() => {
    if (activeConversationId) {
      const fetchMsgs = async () => {
        try {
          const data = await GetMessages(activeConversationId);
          setMessages(data);
          
          // Update last message in conversation list
          if (data.length > 0) {
            const lastMsg = data[data.length - 1];
            setConversations(prev => prev.map(c => 
              c.id === activeConversationId ? { ...c, messages: [lastMsg] } : c
            ));
          }
        } catch (err) {
          console.error("Fetch error", err);
        }
      };

      fetchMsgs(); // Initial fetch
      const interval = setInterval(fetchMsgs, 3000); // Poll every 3s
      return () => clearInterval(interval);
    }
  }, [activeConversationId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleSend = async () => {
    if (!inputText.trim() || !activeConversation || !profile) return;

    const receiverId = profile.id === activeConversation.userId 
      ? activeConversation.listerId 
      : activeConversation.userId;

    const msgData = {
      conversationId: activeConversationId!,
      senderId: profile.id,
      receiverId,
      message: inputText,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    // Optimistic Update
    setMessages(prev => [...prev, { ...msgData, id: Date.now().toString() }]);
    setInputText("");

    // Persistence
    const result = await SendMessage(msgData);
    if (!result.success) {
      toast.error("Failed to send message: " + result.error);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your messages</h1>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden font-sans">
      
      {/* Global Header Bounds */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-shrink-0 items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="font-black text-xl flex items-center gap-1">
            <span className="text-blue-600 dark:text-blue-500">Room</span>
            <span className="text-orange-500">mitra</span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Primary Inbox Interface */}
      <div className="flex-1 flex overflow-hidden max-w-[1600px] w-full mx-auto shadow-2xl">
        
        {/* Left Hand Thread Directory */}
        <aside className={`w-full md:w-[380px] lg:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col transition-all ${activeConversationId ? 'hidden md:flex' : 'flex'}`}>
           <div className="p-4 border-b border-slate-200 dark:border-slate-800">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 className="w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 border-none rounded-xl h-12 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none" 
                 placeholder="Search conversations..."
               />
             </div>
           </div>

           <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {conversations.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  No conversations yet.
                </div>
              )}
              {conversations.map((convo) => {
                 const otherUser = profile?.id === convo.userId ? convo.lister : convo.user;
                 const lastMsg = convo.messages?.[0];
                 const isActive = convo.id === activeConversationId;

                 return (
                   <div 
                     key={convo.id} 
                     onClick={() => setActiveConversationId(convo.id)}
                     className={`flex items-start gap-4 p-4 border-b border-slate-100 dark:border-slate-800/60 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 ${isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                   >
                     <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-500 ring-2 ring-white dark:ring-slate-800 shadow-sm overflow-hidden">
                        {otherUser?.profilePhoto ? (
                          <img src={otherUser.profilePhoto} alt={otherUser.name} className="w-full h-full object-cover" />
                        ) : (
                          otherUser?.name?.[0]?.toUpperCase()
                        )}
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest line-clamp-1">
                          {convo.listing?.title || "Direct Connection"}
                       </div>
                       <div className="flex justify-between items-center">
                         <h3 className={`font-bold truncate pr-3 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                           {otherUser?.name}
                         </h3>
                         <span className="text-[10px] text-slate-400 flex-shrink-0">
                           {lastMsg ? format(new Date(lastMsg.timestamp), 'h:mm a') : ''}
                         </span>
                       </div>
                       <p className={`text-sm truncate mt-1 ${isActive ? 'text-blue-600/80 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>
                         {lastMsg?.message || "Establish contact..."}
                       </p>
                     </div>
                   </div>
                 )
              })}
           </div>
        </aside>

        {/* Right Hand Live Transcript Engine */}
        {activeConversation ? (
          <main className={`flex-1 flex flex-col bg-[#F8FAFC] dark:bg-slate-950 relative ${!activeConversationId ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Chat Transcript Header */}
            <div className="h-[72px] border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-between px-6 z-10">
               <div className="flex items-center gap-4">
                  <button className="md:hidden text-slate-500" onClick={() => setActiveConversationId(null)}>
                    <ArrowLeft size={24} />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 overflow-hidden shadow-sm">
                    {profile?.id === activeConversation.userId 
                      ? activeConversation.lister?.profilePhoto 
                        ? <img src={activeConversation.lister.profilePhoto} /> 
                        : activeConversation.lister?.name?.[0]
                      : activeConversation.user?.profilePhoto
                        ? <img src={activeConversation.user.profilePhoto} />
                        : activeConversation.user?.name?.[0]
                    }
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">
                      {profile?.id === activeConversation.userId ? activeConversation.lister?.name : activeConversation.user?.name}
                    </h2>
                    <p className="text-xs font-semibold text-green-500 tracking-wide flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Active Network Node
                    </p>
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
              <div className="text-center my-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-blue-600/10 text-blue-600 dark:text-blue-400 py-1.5 px-4 rounded-full border border-blue-600/20">
                   Secure Channel Established
                </span>
              </div>

              {messages.map((msg) => {
                const isMe = msg.senderId === profile?.id;
                return (
                  <div key={msg.id} className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start animate-in slide-in-from-left-2 duration-300'}`}>
                     <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                       <p className="text-[15px] leading-relaxed font-medium">{msg.message}</p>
                     </div>
                     <div className={`flex items-center gap-1 mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter ${isMe ? 'flex-row-reverse' : ''}`}>
                       {format(new Date(msg.timestamp), 'h:mm a')}
                       {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                     </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer Logic */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
               <div className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-50 dark:bg-slate-950 p-2 rounded-2xl shadow-inner ring-1 ring-slate-200 dark:ring-slate-800 group focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <Input 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Enter message..."
                    className="flex-1 bg-transparent border-0 h-14 focus-visible:ring-0 text-base shadow-none placeholder:text-slate-400"
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={!inputText.trim()}
                    className="h-14 w-14 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 shrink-0 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Send className="w-6 h-6 text-white" />
                  </Button>
               </div>
               <p className="text-[10px] text-center mt-3 text-slate-400 font-bold uppercase tracking-widest">
                 Transmitting via Roommitra Real-time Engine
               </p>
            </div>

          </main>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">
             <div className="text-center p-8 max-w-sm">
               <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full mx-auto flex items-center justify-center mb-8 ring-8 ring-white dark:ring-slate-900 shadow-2xl animate-bounce duration-3000">
                 <Send size={40} className="text-blue-500 rotate-12" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">Unified Messaging</h3>
               <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium leading-relaxed">
                 Select a conversation to begin your next physical deployment. Direct data-flow enabled.
               </p>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
