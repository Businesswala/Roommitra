'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Image as ImageIcon } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to custom server socket
    const newSocket = io(); // Defaults to same host/port
    setSocket(newSocket);

    newSocket.emit('join-conversation', conversationId);

    newSocket.on('receive-message', (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    newSocket.on('user-typing', (user: string) => {
      if (user !== currentUserId) {
        setIsTyping(true);
      }
    });

    newSocket.on('user-stop-typing', (user: string) => {
      if (user !== currentUserId) {
        setIsTyping(false);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [conversationId, currentUserId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9), // Temp ID
      senderId: currentUserId,
      message: inputText,
      type: 'text',
      timestamp: new Date().toISOString()
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    socket?.emit('stop-typing', { conversationId, user: currentUserId });

    // Send to Socket Server
    socket?.emit('send-message', {
      conversationId,
      message: newMessage
    });

    // Also persist via API route (assuming typical DB saving)
    try {
      await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, senderId: currentUserId, message: newMessage.message }),
      });
    } catch(err) {
      console.error('Failed to save message', err);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (e.target.value) {
      socket?.emit('typing', { conversationId, user: currentUserId });
    } else {
      socket?.emit('stop-typing', { conversationId, user: currentUserId });
    }
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
        {isTyping && (
          <div className="flex w-full justify-start animate-pulse">
            <div className="bg-muted border rounded-2xl px-4 py-2 text-xs italic text-muted-foreground text-opacity-75">
              Typing...
            </div>
          </div>
        )}
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
