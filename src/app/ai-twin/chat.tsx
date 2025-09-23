
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Send, Bot } from 'lucide-react';
import { askAiTwinAction } from './actions';
import { useAuth } from '@/context/auth-context';
import { student as defaultStudent } from '@/lib/mock-data';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const student = user || defaultStudent;
    
  // Initial greeting from AI Twin
  useEffect(() => {
    async function getInitialGreeting() {
        if (messages.length === 0 && !isLoading) {
            setIsLoading(true);
            const result = await askAiTwinAction([]);
            if (result.message) {
                setMessages([{role: 'model', content: result.message}]);
            } else if (result.error) {
                setMessages([{role: 'model', content: result.error}]);
            }
            setIsLoading(false);
        }
    }
    getInitialGreeting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = [...messages, userMessage];
    
    const result = await askAiTwinAction(history);

    setIsLoading(false);

    if (result.error) {
        const errorMessage: Message = { role: 'model', content: result.error };
        setMessages((prev) => [...prev, errorMessage]);
    } else if(result.message) {
        const modelMessage: Message = { role: 'model', content: result.message };
        setMessages((prev) => [...prev, modelMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[75vh] w-full max-w-3xl mx-auto bg-card border rounded-xl shadow-2xl">
      <div className="flex-1 p-6 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'model' && (
                  <Avatar className="h-9 w-9 border-2 border-primary/50">
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                        {message.content}
                    </div>
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={student.avatarUrl} alt={student.name} />
                    <AvatarFallback>
                      {student.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && messages.length > 0 && (
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border-2 border-primary/50">
                   <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                </Avatar>
                <div className="max-w-[75%] rounded-xl bg-muted px-4 py-3 text-sm flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
             {isLoading && messages.length === 0 && (
                 <div className="flex justify-center items-center h-full">
                     <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
             )}
          </div>
        </ScrollArea>
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Chat with your AI Twin..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
