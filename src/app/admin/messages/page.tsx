'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ShieldAlert, Ban, Trash2, ShieldCheck, MailOpen } from 'lucide-react';

// Note: These would normally come from the API payload
interface AdminConversation {
  id: string;
  userName: string;
  userType: 'User' | 'Lister';
  otherName: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'flagged' | 'closed';
}

const mockConversations: AdminConversation[] = [
  { id: 'c1', userName: 'Alice Tenant', userType: 'User', otherName: 'Bob Landlord', lastMessage: 'Is the room still available?', timestamp: '10:30 AM', status: 'active' },
  { id: 'c2', userName: 'Charlie Owner', userType: 'Lister', otherName: 'David Seeker', lastMessage: 'Let us meet tomorrow.', timestamp: 'Yesterday', status: 'active' },
  { id: 'c3', userName: 'Eve Spam', userType: 'User', otherName: 'Frank Host', lastMessage: '[Suspicious Link Attached]', timestamp: '2 days ago', status: 'flagged' },
];

export default function AdminMessagesDashboard() {
  const [conversations, setConversations] = useState<AdminConversation[]>(mockConversations);
  const [selectedConvo, setSelectedConvo] = useState<AdminConversation | null>(null);
  const [search, setSearch] = useState('');

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background">
      {/* Sidebar - Conversation List */}
      <div className="w-80 border-r flex flex-col bg-card shrink-0">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-4">Chat Monitoring</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search user, lister, property..."
              className="pl-8 bg-muted/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
             <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">All</Badge>
             <Badge variant="outline" className="cursor-pointer hover:bg-secondary text-destructive border-destructive/20"><ShieldAlert className="h-3 w-3 mr-1"/> Flagged</Badge>
             <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Active</Badge>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations
            .filter(c => c.userName.toLowerCase().includes(search.toLowerCase()) || c.otherName.toLowerCase().includes(search.toLowerCase()))
            .map((convo) => (
            <div 
              key={convo.id} 
              onClick={() => setSelectedConvo(convo)}
              className={`p-4 border-b cursor-pointer transition-colors hover:bg-accent ${selectedConvo?.id === convo.id ? 'bg-accent border-l-4 border-l-primary' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-sm truncate">{convo.userName} & {convo.otherName}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{convo.timestamp}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground truncate max-w-[180px]">{convo.lastMessage}</p>
                {convo.status === 'flagged' && <ShieldAlert className="h-4 w-4 text-destructive" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel - Selected Chat Details */}
      <div className="flex-1 flex flex-col bg-muted/10">
        {selectedConvo ? (
          <>
            {/* Context Header */}
            <header className="h-20 border-b flex items-center justify-between px-6 bg-card">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Conversation: {selectedConvo.id}
                  {selectedConvo.status === 'flagged' ? (
                     <Badge variant="destructive">Flagged</Badge>
                  ) : <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Monitored</Badge>}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Participants: <span className="font-medium">{selectedConvo.userName} ({selectedConvo.userType})</span> ↔ <span className="font-medium">{selectedConvo.otherName} (Lister)</span>
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-orange-600 border-orange-200 hover:bg-orange-50">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Flag
                </Button>
                <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                  <Ban className="h-4 w-4 mr-2" />
                  Block Participant
                </Button>
              </div>
            </header>

            {/* Messages View */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               <div className="text-center p-4">
                  <Badge variant="outline" className="bg-card">Today</Badge>
               </div>
               
               {/* Mock Message Flow */}
               <div className="flex flex-col gap-1 w-full max-w-2xl mx-auto">
                 <div className="flex justify-start">
                   <div className="bg-card border rounded-2xl px-4 py-2 shadow-sm text-sm p-4 w-fit group relative">
                     {selectedConvo.lastMessage}
                     
                     <div className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                         <Trash2 className="h-4 w-4" />
                       </Button>
                     </div>
                   </div>
                 </div>
                 <span className="text-xs text-muted-foreground ml-2">10:30 AM • {selectedConvo.userName}</span>
               </div>
               
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <MailOpen className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">Admin Chat Monitoring</h3>
            <p className="max-w-sm text-center">Select a conversation from the sidebar to view message history, monitor live chats in real-time, or take moderation actions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
