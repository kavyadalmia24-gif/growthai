import React, { useState, useRef, useEffect } from 'react';
import { createMindsetCoach } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';
import { Send, User, BrainCircuit, Medal, Quote, Sparkles } from 'lucide-react';
import { GenerateContentResponse } from '@google/genai';

const ConfidenceZone: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const badges = [
    { name: "First Sale", desc: "Generated revenue", unlocked: true, icon: "💰" },
    { name: "Content Machine", desc: "Posted 7 days in a row", unlocked: true, icon: "🔥" },
    { name: "Visionary", desc: "Completed 90-day plan", unlocked: false, icon: "🚀" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initChat = () => {
    chatSessionRef.current = createMindsetCoach();
    setMessages([{
      id: 'init',
      role: 'model',
      text: "I'm your Mindset Coach. Whether you're feeling overwhelmed, stuck, or just need a push, I'm here. What's on your mind?",
      timestamp: new Date()
    }]);
  };

  useEffect(() => {
    initChat();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(LoadingState.LOADING);

    try {
      const result: GenerateContentResponse = await chatSessionRef.current.sendMessage({ message: userMsg.text });
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.text || "Keep going. You've got this.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setStatus(LoadingState.IDLE);
    } catch (error) {
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] animate-fade-in">
      
      {/* Badges & Motivation */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 rounded-2xl p-6 border border-amber-200/60 shadow-lg shadow-amber-100/50">
          <div className="flex gap-3 mb-3">
             <div className="p-2 bg-amber-200/50 rounded-lg">
               <Quote className="h-5 w-5 text-amber-700" />
             </div>
             <h3 className="font-bold text-amber-900 text-lg">Daily Wisdom</h3>
          </div>
          <p className="text-amber-800 italic font-medium leading-relaxed text-sm">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-0.5 flex-1 bg-amber-200"></div>
            <p className="text-amber-700 text-xs font-bold uppercase tracking-wider">- Winston Churchill</p>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 shadow-sm">
           <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-lg">
             <Medal className="h-5 w-5 text-yellow-500" />
             Achievements
           </h3>
           <div className="space-y-3">
             {badges.map((b, i) => (
               <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${b.unlocked ? 'bg-gradient-to-r from-yellow-50 to-white border-yellow-200 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-60 grayscale'}`}>
                 <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl shadow-inner ${b.unlocked ? 'bg-white' : 'bg-slate-200'}`}>
                   {b.icon}
                 </div>
                 <div>
                   <p className="text-sm font-bold text-slate-900">{b.name}</p>
                   <p className="text-xs text-slate-500 mt-0.5">{b.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2 glass-panel rounded-2xl shadow-sm flex flex-col overflow-hidden border-0">
        <div className="p-5 border-b border-slate-100 bg-white/50 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white shadow-md">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">AI Mindset Coach</h3>
              <p className="text-xs font-medium text-slate-500">Online • Always here for you</p>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
            <Sparkles className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[85%] rounded-2xl px-6 py-4 shadow-sm text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-none shadow-indigo-200' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm'}
              `}>
                {msg.text}
              </div>
            </div>
          ))}
          {status === LoadingState.LOADING && (
            <div className="flex justify-start">
               <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-6 py-4 shadow-sm">
                 <div className="flex space-x-1.5">
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="I'm feeling stuck because..."
              className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={status === LoadingState.LOADING || !input.trim()}
              className="px-6 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200 hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfidenceZone;