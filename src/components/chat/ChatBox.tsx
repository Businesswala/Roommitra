'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Image as ImageIcon } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  message: string;
  type: string;
  timestamp: string;
}

interface ChatBoxProps {
  conversationId: string;
  currentUserId: string;
  otherUserName: string;
  initialMessages?: Message[];
}

export default function ChatBox({ conversationId, currentUserId, otherUserName, initialMessages = [] }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Polling for new messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/messages/${conversationId}`);
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error('Polling error', err);
      }
    };

    fetchMessages(); // Initial fetch
    const interval = setInterval(fetchMessages, 3000); // Poll every 3s

    return () => clearInterval(interval);
  }, [conversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const messageContent = inputText;
    setInputText('');

    // Persist via API route
    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, senderId: currentUserId, message: messageContent }),
      });
      const data = await res.json();
      if (data.success) {
        // Trigger a re-fetch or optimistically update
        setMessages((prev) => [...prev, {
          id: Math.random().toString(),
          senderId: currentUserId,
          message: messageContent,
          type: 'text',
          timestamp: new Date().toISOString()
        }]);
      }
    } catch(err) {
      console.error('Failed to save message', err);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <Card className="w-full max-w-md h-[500px] flex flex-col shadow-lg border-primary/10">
      <CardHeader className="py-3 border-b bg-card">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {otherUserName.charAt(0).toUpperCase()}
          </div>
          {otherUserName}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isMe ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted border rounded-tl-sm'}`}>
                {msg.type === 'image' ? (
                   // eslint-disable-next-line @next/next/no-img-element
                  <img src={msg.message} alt="attachment" className="rounded-md w-full" />
                ) : (
                  msg.message
                )}
                <div className={`text-[10px] mt-1 ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="p-3 border-t bg-card gap-2">
        <Button variant="outline" size="icon" className="shrink-0 rounded-full">
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Input 
          className="flex-1 rounded-full bg-muted/50" 
          placeholder="Type a message..." 
          value={inputText}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <Button onClick={handleSendMessage} size="icon" className="shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
