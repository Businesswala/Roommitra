'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, ShieldAlert, Ban, Trash2, ShieldCheck, MailOpen, AlertTriangle } from 'lucide-react'
import { analyzeMessage } from '@/utils/flagging'
import { toast } from 'sonner'

// Internal Types
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isFlagged?: boolean;
  reasons?: string[];
  severity?: 'high' | 'medium' | 'low';
}

interface ChatSession {
  id: string;
  userId: string;
  userName: string;
  listerId: string;
  listerName: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

// Robust Mock Data with Suspicious Content
const mockChatSessions: ChatSession[] = [
  {
    id: 'msg_101',
    userId: 'u1',
    userName: 'Aryan Sharma',
    listerId: 'l1',
    listerName: 'Sanjay Aggarwal',
    lastMessage: 'Is there any brokerage?',
    timestamp: '10:45 AM',
    messages: [
      { id: 'm1', senderId: 'u1', senderName: 'Aryan Sharma', text: 'Hi, I saw your PG listing in Gurgaon. Is it available?', timestamp: '10:30 AM' },
      { id: 'm2', senderId: 'l1', senderName: 'Sanjay Aggarwal', text: 'Yes, it is available from next week.', timestamp: '10:35 AM' },
      { id: 'm3', senderId: 'u1', senderName: 'Aryan Sharma', text: 'Great. Is there any brokerage or commission I need to pay?', timestamp: '10:40 AM' },
      { id: 'm4', senderId: 'l1', senderName: 'Sanjay Aggarwal', text: 'No brokerage, directly contact me at 9876543210 for visiting.', timestamp: '10:45 AM' },
    ]
  },
  {
    id: 'msg_102',
    userId: 'u2',
    userName: 'Payal Verma',
    listerId: 'l2',
    listerName: 'Meena Properties',
    lastMessage: 'Payment link sent.',
    timestamp: 'Yesterday',
    messages: [
      { id: 'm5', senderId: 'l2', senderName: 'Meena Properties', text: 'Please send a token amount of Rs 2000 to block the room.', timestamp: 'Yesterday 14:00' },
      { id: 'm6', senderId: 'l2', senderName: 'Meena Properties', text: 'Use this WhatsApp link for payment: bit.ly/fake-pay', timestamp: 'Yesterday 14:05' },
    ]
  }
];

export default function AdminChatsMonitor() {
  const [sessions, setSessions] = useState<ChatSession[]>(mockChatSessions);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  
  const selectedSession = useMemo(() => 
    sessions.find(s => s.id === selectedSessionId), [selectedSessionId, sessions]);

  // Analyze all messages for flagging
  const processedSessions = useMemo(() => {
    return sessions.map(session => {
      const analyzedMessages = session.messages.map(msg => ({
        ...msg,
        ...analyzeMessage(msg.text)
      }));
      
      return {
        ...session,
        messages: analyzedMessages,
        isFlagged: analyzedMessages.some(m => m.isFlagged),
        flagCount: analyzedMessages.filter(m => m.isFlagged).length
      };
    });
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    return processedSessions.filter(s => 
      s.userName.toLowerCase().includes(search.toLowerCase()) || 
      s.listerName.toLowerCase().includes(search.toLowerCase())
    );
  }, [processedSessions, search]);

  const handleDeleteMessage = (msgId: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === selectedSessionId) {
        return { ...s, messages: s.messages.filter(m => m.id !== msgId) };
      }
      return s;
    }));
    toast.success('Message deleted successfully');
  };

  const handleAction = (type: 'SUSPEND' | 'BLOCK') => {
    toast.success(`${type === 'SUSPEND' ? 'User suspended' : 'Lister blocked'} successfully.`);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* 🟢 Sidebar: Session List */}
      <div className="w-[350px] border-r flex flex-col bg-white dark:bg-slate-900 shadow-sm shrink-0">
        <div className="p-6 border-b space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Active Chats</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 bg-slate-50 dark:bg-slate-800 border-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          {filteredSessions.map((session) => (
            <div 
              key={session.id} 
              onClick={() => setSelectedSessionId(session.id)}
              className={`p-4 border-b cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 ${selectedSessionId === session.id ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-l-4 border-l-indigo-600' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm truncate">{session.userName} vs {session.listerName}</span>
                <span className="text-[10px] uppercase font-medium text-slate-400">{session.timestamp}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500 truncate max-w-[200px]">{session.lastMessage}</p>
                {session.isFlagged && (
                  <Badge variant="destructive" className="h-5 px-1.5 animate-pulse">
                    <ShieldAlert className="h-3 w-3 mr-1" />
                    {session.flagCount}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* 🔵 Main Area: Chat Transcript */}
      <div className="flex-1 flex flex-col bg-slate-50/30 dark:bg-slate-950/20 relative">
        {selectedSession ? (
          <>
            {/* Sticky Header with Actions */}
            <header className="sticky top-0 z-10 h-20 border-b flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{selectedSession.userName} × {selectedSession.listerName}</h3>
                  {analyzeMessage(selectedSession.messages[selectedSession.messages.length - 1].text).isFlagged && (
                     <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">FRAUD ALERT</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-mono">Session ID: {selectedSession.id}</p>
              </div>
              
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger render={
                    <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend User
                    </Button>
                  } />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Suspend User?</DialogTitle>
                      <DialogDescription>
                        This will prevent <b>{selectedSession.userName}</b> from sending messages or booking rooms for 7 days.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="ghost">Cancel</Button>
                      <Button variant="destructive" onClick={() => handleAction('SUSPEND')}>Confirm Suspension</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger render={
                    <Button variant="outline" size="sm" className="bg-red-600 text-white hover:bg-red-700">
                      <ShieldAlert className="h-4 w-4 mr-2" />
                      Block Lister
                    </Button>
                  } />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Block Lister Permanently?</DialogTitle>
                      <DialogDescription>
                        Lister <b>{selectedSession.listerName}</b> will be removed from the platform and all their property listings will be hidden.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="ghost">Cancel</Button>
                      <Button variant="destructive" onClick={() => handleAction('BLOCK')}>Block Lister</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </header>

            {/* Chat Transcript */}
            <ScrollArea className="flex-1 p-8">
              <div className="max-w-4xl mx-auto space-y-8 pb-10">
                {selectedSession.messages.map((msg, idx) => {
                  const analysis = analyzeMessage(msg.text);
                  const isUser = msg.senderId.startsWith('u');
                  
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col gap-2 w-full ${isUser ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {msg.senderName} • {msg.timestamp}
                        </span>
                        {analysis.isFlagged && (
                          <div className="flex items-center animate-bounce">
                            <AlertTriangle className={`h-3 w-3 ${analysis.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                          </div>
                        )}
                      </div>
                      
                      <div className="relative group max-w-[80%]">
                        <div className={`p-4 rounded-2xl shadow-sm text-sm border transition-all ${
                          analysis.isFlagged 
                            ? analysis.severity === 'high' 
                              ? 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-900/50' 
                              : 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-900/50'
                            : isUser 
                              ? 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800' 
                              : 'bg-indigo-600 border-indigo-500 text-white shadow-indigo-500/20'
                        }`}>
                          {msg.text}
                          
                          {analysis.isFlagged && (
                            <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-1">
                              {analysis.reasons.map((reason, i) => (
                                <Badge key={i} variant="outline" className="text-[9px] h-4 bg-black/5 dark:bg-white/5 border-none">
                                  {reason}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Action: Delete Message */}
                        <div className={`absolute -top-2 ${isUser ? '-right-10' : '-left-10'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                          <Dialog>
                            <DialogTrigger render={
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 shadow-md text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            } />
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Message?</DialogTitle>
                                <DialogDescription>
                                  This will permanently remove this message from the database for both participants.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="ghost">Cancel</Button>
                                <Button variant="destructive" onClick={() => handleDeleteMessage(msg.id)}>Delete</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-20">
            <div className="h-32 w-32 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-10 animate-pulse">
              <MailOpen className="h-16 w-16 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Roommitra Compliance Center</h3>
            <p className="max-w-md text-center text-slate-500 leading-relaxed">
              Select a conversation from the active list to monitor for brokerage bypassing, fraud links, or harassment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
