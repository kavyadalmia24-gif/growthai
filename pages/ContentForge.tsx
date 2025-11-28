import React, { useState } from 'react';
import { generateBrandContent } from '../services/geminiService';
import { ContentParams, LoadingState, Platform } from '../types';
import { Copy, Check, Loader2, Sparkles, LayoutTemplate, PenTool, Hash, Instagram, Linkedin, Twitter, Youtube, Facebook, Video, Wand2 } from 'lucide-react';

const BrandStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'post' | 'story' | 'hook' | 'calendar'>('post');
  const [params, setParams] = useState<ContentParams>({
    type: 'post',
    platform: 'linkedin',
    topic: '',
    context: '',
    tone: 'Professional'
  });
  const [result, setResult] = useState<string>('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.topic) return;

    setStatus(LoadingState.LOADING);
    setResult('');
    
    try {
      const content = await generateBrandContent({ ...params, type: activeTab });
      setResult(content);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'post', label: 'Social Post', icon: PenTool },
    { id: 'hook', label: 'Viral Hooks', icon: Hash },
    { id: 'story', label: 'Brand Story', icon: Sparkles },
    { id: 'calendar', label: 'Content Calendar', icon: LayoutTemplate },
  ];

  const platforms: { id: Platform; label: string; icon: any; color: string; bg: string }[] = [
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
    { id: 'twitter', label: 'X (Twitter)', icon: Twitter, color: 'text-slate-900', bg: 'bg-slate-100' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-700', bg: 'bg-blue-50' },
    { id: 'tiktok', label: 'TikTok', icon: Video, color: 'text-black', bg: 'bg-gray-100' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)] animate-fade-in">
      {/* Input Section */}
      <div className="glass-panel rounded-2xl shadow-sm flex flex-col overflow-hidden">
        {/* Function Tabs */}
        <div className="border-b border-slate-200/60 bg-white/40 px-3 py-3 flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}
              `}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleGenerate} className="space-y-6">
            
            {/* Platform Selector */}
            {activeTab !== 'calendar' && activeTab !== 'story' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Select Platform
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {platforms.map((p) => {
                    const Icon = p.icon;
                    const isSelected = params.platform === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setParams({ ...params, platform: p.id })}
                        className={`
                          flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200
                          ${isSelected 
                            ? `bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-md transform scale-105` 
                            : 'bg-white/50 border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-sm'}
                        `}
                      >
                        <div className={`p-2 rounded-full mb-2 ${isSelected ? p.bg : 'bg-transparent'}`}>
                           <Icon className={`h-5 w-5 ${isSelected ? p.color : 'text-slate-400'}`} />
                        </div>
                        <span className={`text-[10px] font-semibold ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>{p.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {activeTab === 'story' ? 'Core Struggle / Challenge' : 'Topic / Key Message'}
              </label>
              <textarea
                value={params.topic}
                onChange={(e) => setParams({ ...params, topic: e.target.value })}
                className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none resize-none h-32 text-sm shadow-sm"
                placeholder={activeTab === 'calendar' ? "e.g. Launching a new vegan protein powder next week" : "e.g. Why consistency beats intensity in business"}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Audience
                </label>
                <input
                    type="text"
                    value={params.context}
                    onChange={(e) => setParams({ ...params, context: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm transition-all"
                    placeholder="e.g. Founders, 25-40yo"
                />
               </div>
               <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Tone
                </label>
                <div className="relative">
                    <select
                        value={params.tone}
                        onChange={(e) => setParams({ ...params, tone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm appearance-none transition-all cursor-pointer"
                    >
                        <option>Professional & Authoritative</option>
                        <option>Casual, Raw & Authentic</option>
                        <option>High Energy & Exciting</option>
                        <option>Empathetic & Vulnerable</option>
                        <option>Controversial & Bold</option>
                        <option>Witty & Humorous</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
               </div>
            </div>

            <button
              type="submit"
              disabled={status === LoadingState.LOADING || !params.topic}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {status === LoadingState.LOADING ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Working Magic...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  Generate Content
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Output Section */}
      <div className="rounded-2xl shadow-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-[#0f172a] p-1 flex flex-col h-full overflow-hidden relative group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="bg-slate-900/50 backdrop-blur-xl flex-1 rounded-xl flex flex-col overflow-hidden relative z-10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wide">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Result
                {params.platform && <span className="ml-2 px-2 py-0.5 rounded bg-white/10 text-white/80 text-[10px]">{params.platform}</span>}
            </h3>
            {result && (
                <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-xs font-medium border border-white/5"
                >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy Text'}
                </button>
            )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {status === LoadingState.LOADING ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-emerald-500 animate-pulse" />
                    </div>
                </div>
                <p className="text-sm font-medium animate-pulse">Crafting viral potential...</p>
                </div>
            ) : result ? (
                <div className="prose prose-invert prose-sm max-w-none">
                <div className="whitespace-pre-wrap font-mono leading-relaxed text-slate-300 selection:bg-emerald-500/30">
                    {result}
                </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <div className="h-20 w-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 transform rotate-3 transition-transform group-hover:rotate-6">
                    <PenTool className="h-10 w-10 opacity-40" />
                </div>
                <p className="text-sm font-medium text-slate-500">Ready to create? Select parameters and hit generate.</p>
                </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BrandStudio;