"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import type { DragControls } from "framer-motion";
import { Sparkles, X, Maximize, Minimize, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { chat } from "@/ai/flows/chat";
import type { ChatMessage } from "@/ai/types";

interface ChatWidgetProps {
  isMaximized: boolean;
  onClose: () => void;
  onToggleMaximize: () => void;
  dragControls: DragControls;
}

export default function ChatWidget({ isMaximized, onClose, onToggleMaximize, dragControls }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hi! I'm Inspira, your AI assistant. How can I help you with your creator marketing needs today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const responseMessage = await chat(newMessages);
      setMessages(prev => [...prev, responseMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        role: 'model',
        content: "Sorry, I seem to be having trouble connecting. Please try again in a moment."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-background shadow-2xl",
        isMaximized
          ? "h-full w-full"
          : "h-[70vh] w-96 max-h-[700px] max-w-[90vw]"
      )}
    >
      <header
        onPointerDown={(event) => {
          if (!isMaximized) {
            dragControls.start(event);
          }
        }}
        className={cn(
          "flex-shrink-0 flex items-center justify-between border-b p-3 pr-2",
          !isMaximized && "cursor-grab active:cursor-grabbing"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary" />
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/30 blur-md"></div>
          </div>
          <h3 className="font-headline text-lg font-semibold">Inspira AI</h3>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onToggleMaximize}>
            {isMaximized ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            <span className="sr-only">{isMaximized ? "Minimize" : "Maximize"}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </header>
      
      <ScrollArea className="flex-1" viewportRef={scrollViewportRef}>
        <div className="p-4 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.role === 'model' && (
                <Avatar className="flex-shrink-0 h-8 w-8 border-2 border-primary/50">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs rounded-2xl px-4 py-2 text-sm lg:max-w-md",
                  message.role === 'user'
                    ? "rounded-br-none bg-primary text-primary-foreground"
                    : "rounded-bl-none bg-muted"
                )}
              >
                {message.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
               {message.role === 'user' && (
                <Avatar className="flex-shrink-0 h-8 w-8">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3 justify-start">
                <Avatar className="flex-shrink-0 h-8 w-8 border-2 border-primary/50">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl px-4 py-3 bg-muted">
                    <Loader2 className="h-4 w-4 animate-spin" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="flex-shrink-0 border-t p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1"
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
