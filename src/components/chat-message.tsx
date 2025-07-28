'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { GlamBotLogo } from './icons';

interface ChatMessageProps {
  role: 'user' | 'bot';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isBot = role === 'bot';

  return (
    <div className={cn('flex items-start gap-3', isBot ? '' : 'flex-row-reverse')}>
      <Avatar className="shadow">
        <AvatarImage src={isBot ? '/bot-avatar.png' : '/user-avatar.png'} />
        <AvatarFallback className={cn(isBot ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground')}>
          {isBot ? <GlamBotLogo className="size-5"/> : <User className="size-5" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'rounded-xl p-3 max-w-sm break-words',
          isBot ? 'bg-card text-card-foreground rounded-bl-none' : 'bg-primary text-primary-foreground rounded-br-none'
        )}
      >
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

export function LoadingMessage() {
    return (
        <div className="flex items-start gap-3">
            <Avatar className="shadow">
                <AvatarFallback className="bg-primary text-primary-foreground">
                    <GlamBotLogo className="size-5"/>
                </AvatarFallback>
            </Avatar>
            <div className="rounded-xl p-3 max-w-sm bg-card text-card-foreground rounded-bl-none flex items-center gap-2">
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
            </div>
        </div>
    );
}
