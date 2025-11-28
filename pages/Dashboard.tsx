import React, { useState } from 'react';
import { PageRoute, LoadingState } from '../types';
import { generateGrowthPlan } from '../services/geminiService';
import { CheckCircle2, Circle, Target, Calendar, BarChart3, Loader2, Sparkles, Plus, TrendingUp } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: PageRoute) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [businessContext, setBusinessContext] = useState('');
  const [plan, setPlan] = useState('');
  const [planStatus, setPlanStatus] = useState<LoadingState>(LoadingState.IDLE);
  
  // Mock Data
  const [priorities, setPriorities] = useState([
    { id: 1, text: "Review weekly sales content", done: true },
    { id: 2, text: "Reach out to 5 potential partners", done: false },
    { id: 3, text: "Update website hero section", done: false },
  ]);

  const togglePriority = (id: number) => {
    setPriorities(priorities.map(p => p.id === id ? { ...p, done: !p.done } : p));
  };

  const handleGeneratePlan = async () => {
    if (!businessContext.trim()) return;
    setPlanStatus(LoadingState.LOADING);
    try {
      const result = await generateGrowthPlan(businessContext);
      setPlan(result);
      setPlanStatus(LoadingState.SUCCESS);
    } catch (e) {
      setPlanStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-xl shadow-indigo-900/10 group">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Good Morning, Founder 🚀</h1>
            <p className="text-indigo-100 mt-2 text-lg font-light">Your momentum is building. Let's crush your goals today.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('brand')}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold text-white hover:bg-white/20 transition-all shadow-lg shadow-black/5"
            >
              Create Content
            </button>
            <button 
               onClick={() => onNavigate('confidence')}
               className="px-5 py-2.5 bg-white text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 shadow-lg shadow-black/5 transition-all"
            >
              Boost Motivation
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel bg-gradient-to-br from-white/80 to-indigo-50/50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-white/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Monthly Revenue</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">$12,450</p>
            </div>
            <div className="h-12 w-12 bg-white text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center px-2 py-1 rounded-md bg-emerald-100/50 text-emerald-700 text-xs font-bold">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </div>
            <span className="text-xs text-slate-400">vs last month</span>
          </div>
        </div>
        
        <div className="glass-panel bg-gradient-to-br from-white/80 to-blue-50/50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-white/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Leads</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">42</p>
            </div>
            <div className="h-12 w-12 bg-white text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <Target className="h-6 w-6" />
            </div>
          </div>
           <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center px-2 py-1 rounded-md bg-blue-100/50 text-blue-700 text-xs font-bold">
              <Plus className="h-3 w-3 mr-1" />
              8 New
            </div>
            <span className="text-xs text-slate-400">this week</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-xl shadow-slate-900/10 text-white relative overflow-hidden group border border-slate-700/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:bg-indigo-500/30 transition-colors"></div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Current Mission</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-bold">Launch Podcast</p>
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="w-full bg-white/10 rounded-full h-2.5 mt-6 overflow-hidden">
             <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full w-[40%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-slate-400">Step 3 of 5 completed</p>
            <p className="text-xs font-bold text-white">40%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Priorities */}
        <div className="glass-panel bg-gradient-to-br from-white/80 to-emerald-50/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-white/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shadow-sm">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              Daily Priorities
            </h3>
            <span className="text-xs font-bold bg-white/60 border border-white/50 text-slate-500 px-2 py-1 rounded-md shadow-sm">3 Tasks</span>
          </div>
          <div className="space-y-3">
            {priorities.map(p => (
              <div 
                key={p.id}
                onClick={() => togglePriority(p.id)}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${p.done ? 'bg-slate-50/50 border-slate-200/50 opacity-60' : 'bg-white/70 border-white/60 shadow-sm hover:border-emerald-300 hover:shadow-md hover:bg-white'}`}
              >
                {p.done ? <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" /> : <Circle className="h-6 w-6 text-slate-300 flex-shrink-0" />}
                <span className={`text-sm font-medium ${p.done ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{p.text}</span>
              </div>
            ))}
            <button className="w-full py-3 mt-2 border-2 border-dashed border-slate-300/50 rounded-xl text-sm font-medium text-slate-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/30 transition-all flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
              Add new task
            </button>
          </div>
        </div>

        {/* 30-60-90 Day Planner */}
        <div className="glass-panel bg-gradient-to-br from-white/80 to-indigo-50/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col border border-white/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shadow-sm">
                 <Calendar className="h-5 w-5" />
              </div>
              Strategic Plan
            </h3>
            <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md shadow-indigo-200">AI Powered</div>
          </div>

          {!plan ? (
            <div className="flex-1 flex flex-col gap-4">
              <p className="text-sm text-slate-500 leading-relaxed">Describe your business stage and main goal to generate a comprehensive 30-60-90 day execution plan.</p>
              <textarea 
                value={businessContext}
                onChange={(e) => setBusinessContext(e.target.value)}
                placeholder="e.g. SaaS startup at $1k MRR looking to scale to $10k MRR through organic LinkedIn content..."
                className="w-full flex-1 p-4 rounded-xl border border-indigo-100 bg-white/40 focus:bg-white text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none min-h-[160px] transition-all"
              />
              <button
                onClick={handleGeneratePlan}
                disabled={planStatus === LoadingState.LOADING || !businessContext}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 disabled:opacity-50 flex justify-center items-center shadow-lg shadow-slate-900/20 transition-all hover:scale-[1.02]"
              >
                {planStatus === LoadingState.LOADING ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate Growth Plan"}
              </button>
            </div>
          ) : (
             <div className="flex-1 overflow-y-auto custom-scrollbar bg-white/50 rounded-xl border border-indigo-100 p-5 text-sm text-slate-700 whitespace-pre-wrap max-h-[350px] shadow-inner">
               {plan}
             </div>
          )}
          {plan && (
            <button onClick={() => setPlan('')} className="mt-4 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors text-center w-full">
              Start Over
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;