import React, { useState } from 'react';
import { generateSOP } from '../services/geminiService';
import { LoadingState } from '../types';
import { Workflow, BookOpen, Loader2, Bot, ArrowRight, FileText, Zap } from 'lucide-react';

const AutomationHub: React.FC = () => {
  const [task, setTask] = useState('');
  const [role, setRole] = useState('Virtual Assistant');
  const [sop, setSop] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleGenerateSOP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    setStatus(LoadingState.LOADING);
    try {
      const result = await generateSOP(task, role);
      setSop(result);
      setStatus(LoadingState.SUCCESS);
    } catch (e) {
      setStatus(LoadingState.ERROR);
    }
  };

  const suggestedAutomations = [
    { title: "Lead Qualification", tool: "Zapier + OpenAI", desc: "Auto-score leads from forms." },
    { title: "Social Scheduling", tool: "Buffer + Gemini", desc: "Generate and schedule posts." },
    { title: "Invoice Follow-up", tool: "QuickBooks + Gmail", desc: "Auto-remind unpaid clients." },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SOP Generator */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel bg-gradient-to-br from-white/80 to-blue-50/40 rounded-2xl shadow-sm p-8 border border-white/40">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-100">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">SOP Generator</h2>
                <p className="text-slate-500">Turn any task into a delegate-ready procedure.</p>
              </div>
            </div>

            <form onSubmit={handleGenerateSOP} className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 space-y-3">
                <input 
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Task Name (e.g. Handle Customer Refund)"
                  className="w-full p-4 rounded-xl border border-blue-100 bg-white/50 focus:bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                />
                <input 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role (e.g. Support Agent)"
                  className="w-full p-4 rounded-xl border border-blue-100 bg-white/50 focus:bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                />
              </div>
              <button 
                type="submit"
                disabled={status === LoadingState.LOADING || !task}
                className="h-auto py-4 sm:py-0 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center"
              >
                {status === LoadingState.LOADING ? <Loader2 className="animate-spin" /> : "Generate SOP"}
              </button>
            </form>

            {sop && (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-blue-100 prose prose-sm max-w-none text-slate-700 shadow-inner">
                <pre className="whitespace-pre-wrap font-sans leading-relaxed">{sop}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Flows */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-6 text-white border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
             
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Bot className="h-5 w-5 text-blue-300" />
               </div>
               <h3 className="font-bold text-lg">Smart Workflows</h3>
             </div>
             
             <div className="space-y-3 relative z-10">
               {suggestedAutomations.map((flow, idx) => (
                 <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group hover:border-white/20 hover:scale-[1.02]">
                   <div className="flex justify-between items-start">
                     <h4 className="font-semibold text-sm text-white/90">{flow.title}</h4>
                     <Zap className="h-4 w-4 opacity-50 group-hover:text-yellow-400 group-hover:opacity-100 transition-all" />
                   </div>
                   <p className="text-xs text-slate-400 mt-2 leading-relaxed">{flow.desc}</p>
                   <div className="mt-3 flex items-center gap-2">
                     <span className="text-[10px] font-bold bg-blue-500/20 text-blue-200 px-2 py-1 rounded-md border border-blue-500/20">
                       {flow.tool}
                     </span>
                   </div>
                 </div>
               ))}
             </div>
             <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-white/10">
               Explore Library
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationHub;