'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send } from 'lucide-react';
import { ChatMessage, LoadingMessage } from './chat-message';
import { getBotResponse } from '@/app/actions';

interface Message {
  id: number;
  role: 'user' | 'bot';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      content: "Hello! I'm Glow Haus, your personal salon assistant. How can I help you today? You can ask about services, book an appointment, or ask for recommendations.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await getBotResponse(input);
      const botMessage: Message = {
        id: messages.length + 1,
        role: 'bot',
        content: botResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 1,
        role: 'bot',
        content: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-xl transition-transform hover:scale-110"
          size="icon"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="font-headline text-center">Glow Haus Assistant</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {isLoading && <LoadingMessage />}
          </div>
        </ScrollArea>
        <div className="border-t p-4 bg-background">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
