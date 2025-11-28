import React, { useState } from 'react';
import { generateCollabStrategy } from '../services/geminiService';
import { LoadingState, CollabProfile } from '../types';
import { Handshake, Search, Loader2, Mail, Users, X, Check, Gauge, Target, Sparkles, TrendingUp, Info } from 'lucide-react';

const MOCK_PROFILES: CollabProfile[] = [
  {
    id: '1',
    name: "Sarah Green",
    role: "Influencer",
    niche: "Sustainable Living",
    followers: "45K",
    engagement: "5.2%",
    bio: "Eco-conscious lifestyle creator passionate about zero-waste brands. Moms 25-35 demographic.",
    requirements: ["Must be plastic-free", "Paid partnership only", "Minimum 6 month commitment"],
    viabilityScore: 94,
    matchReason: "High niche overlap with your eco-brand. Her audience matches your target demographic perfectly.",
  },
  {
    id: '2',
    name: "TechTrends Daily",
    role: "Brand",
    niche: "Consumer Electronics",
    followers: "120K",
    engagement: "1.8%",
    bio: "We review the latest gadgets. Looking for creators to unbox our new solar power banks.",
    requirements: ["Video content required", "Youtube focus", "Tech savvy"],
    viabilityScore: 65,
    matchReason: "Good reach, but engagement is lower than your benchmark. Audience might be too broad.",
  },
  {
    id: '3',
    name: "FitFam Mike",
    role: "Influencer",
    niche: "Fitness & Nutrition",
    followers: "82K",
    engagement: "4.5%",
    bio: "High energy fitness tips and meal preps. Seeking supplement partners.",
    requirements: ["Product samples required", "Affiliate commission"],
    viabilityScore: 88,
    matchReason: "Strong engagement and aligned goals. Your protein product fits his 'Meal Prep' series.",
  }
];

const CollabHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matchmaker' | 'strategy'>('matchmaker');
  
  // Strategy State
  const [niche, setNiche] = useState('');
  const [strategy, setStrategy] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  // Matchmaker State
  const [profiles, setProfiles] = useState<CollabProfile[]>(MOCK_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;
    setStatus(LoadingState.LOADING);
    try {
      const result = await generateCollabStrategy(niche);
      setStrategy(result);
      setStatus(LoadingState.SUCCESS);
    } catch (e) {
      setStatus(LoadingState.ERROR);
    }
  };

  const handleMatchAction = (action: 'accept' | 'reject') => {
    // In a real app, this would send an API request
    setTimeout(() => {
        if (currentIndex < profiles.length) {
            setCurrentIndex(prev => prev + 1);
        }
    }, 200);
  };

  const currentProfile = profiles[currentIndex];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="h-[calc(100vh-140px)] animate-fade-in flex flex-col">
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="glass-panel p-1.5 rounded-xl inline-flex shadow-sm">
           <button
             onClick={() => setActiveTab('matchmaker')}
             className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'matchmaker' ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}
           >
             <div className="flex items-center gap-2">
               <Users className="h-4 w-4" />
               <span>Matchmaker</span>
             </div>
           </button>
           <button
             onClick={() => setActiveTab('strategy')}
             className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'strategy' ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}
           >
             <div className="flex items-center gap-2">
               <Target className="h-4 w-4" />
               <span>Strategy AI</span>
             </div>
           </button>
        </div>
      </div>

      {activeTab === 'strategy' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          <div className="glass-panel rounded-2xl shadow-sm p-10 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="h-16 w-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Handshake className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Find Partners</h2>
              <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                Tell us your niche, and AI will identify the best influencer types to partner with and write your outreach scripts.
              </p>
              
              <form onSubmit={handleGenerate} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Niche / Industry</label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400 group-hover:text-pink-500 transition-colors" />
                    <input 
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      placeholder="e.g. Organic Skincare for Teens"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={status === LoadingState.LOADING || !niche}
                  className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-pink-900/20 hover:scale-[1.02] flex justify-center items-center gap-2"
                >
                  {status === LoadingState.LOADING ? <Loader2 className="animate-spin h-5 w-5" /> : "Generate Strategy"}
                </button>
              </form>
            </div>
          </div>

          <div className="glass-panel rounded-2xl shadow-inner p-1 flex flex-col h-full">
             <div className="bg-slate-50/50 backdrop-blur-sm rounded-xl flex-1 p-6 flex flex-col overflow-hidden">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 px-2">
                  <Mail className="h-5 w-5 text-slate-400" />
                  Outreach Strategy
                </h3>
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                  {status === LoadingState.LOADING ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <div className="relative mb-4">
                         <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-pink-500 animate-spin"></div>
                      </div>
                      <p className="font-medium">Analyzing market trends...</p>
                    </div>
                  ) : strategy ? (
                    <div className="prose prose-sm prose-pink max-w-none">
                        <div className="whitespace-pre-wrap leading-relaxed text-slate-700">{strategy}</div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8">
                      <Target className="h-12 w-12 mb-4 opacity-20" />
                      <p>Enter your niche to generate a targeted partnership plan.</p>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-4 relative">
             {/* Background decorative elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

            {currentProfile ? (
                <div className="w-full max-w-3xl glass-panel rounded-3xl shadow-2xl border-white/50 overflow-hidden flex flex-col md:flex-row h-[520px] relative z-10 transition-all duration-500">
                    {/* Left: Profile Info */}
                    <div className="md:w-3/5 p-8 flex flex-col bg-white/60 backdrop-blur-md">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 shadow-sm ${currentProfile.role === 'Influencer' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {currentProfile.role === 'Influencer' ? <Sparkles className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                                    {currentProfile.role}
                                </span>
                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{currentProfile.name}</h2>
                                <p className="text-slate-500 font-medium mt-1">{currentProfile.niche}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white p-4 rounded-xl text-center border border-slate-100 shadow-sm">
                                <p className="text-2xl font-bold text-slate-900">{currentProfile.followers}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Audience</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl text-center border border-slate-100 shadow-sm">
                                <p className="text-2xl font-bold text-slate-900">{currentProfile.engagement}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Engagement</p>
                            </div>
                        </div>

                        <div className="mb-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Info className="h-3 w-3" /> Bio
                            </h4>
                            <p className="text-sm text-slate-700 leading-relaxed mb-6">{currentProfile.bio}</p>
                            
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Requirements</h4>
                            <div className="flex flex-wrap gap-2">
                                {currentProfile.requirements.map((req, i) => (
                                    <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg">{req}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: AI Analysis & Actions */}
                    <div className="md:w-2/5 bg-gradient-to-b from-slate-900 to-[#1e1b4b] text-white p-8 flex flex-col justify-between relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full w-fit backdrop-blur-sm border border-emerald-400/20">
                                <Gauge className="h-4 w-4" />
                                <span className="font-bold text-xs tracking-wide">AI MATCH SCORE</span>
                            </div>
                            
                            <div className="relative h-40 w-40 mx-auto mb-8 flex items-center justify-center">
                                {/* Glow effect */}
                                <div className={`absolute inset-0 rounded-full blur-xl opacity-20 ${currentProfile.viabilityScore >= 90 ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
                                <svg className="transform -rotate-90 w-full h-full drop-shadow-lg">
                                    <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="transparent" />
                                    <circle 
                                      cx="80" cy="80" r="70" 
                                      stroke="currentColor" strokeWidth="10" fill="transparent" 
                                      strokeDasharray={440} 
                                      strokeDashoffset={440 - (440 * currentProfile.viabilityScore) / 100} 
                                      className={`${getScoreColor(currentProfile.viabilityScore)} transition-all duration-1000 ease-out`} 
                                      strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className={`text-4xl font-bold tracking-tighter ${getScoreColor(currentProfile.viabilityScore)}`}>{currentProfile.viabilityScore}</span>
                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Viability</span>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-md border border-white/10">
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-2 tracking-wider">AI Insight</p>
                                <p className="text-sm text-slate-200 italic leading-relaxed">"{currentProfile.matchReason}"</p>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6 relative z-10">
                            <button 
                                onClick={() => handleMatchAction('reject')}
                                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center group"
                            >
                                <X className="h-6 w-6 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-red-400" />
                            </button>
                            <button 
                                onClick={() => handleMatchAction('accept')}
                                className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center group shadow-lg shadow-pink-900/40 hover:scale-105"
                            >
                                <Check className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center max-w-md mx-auto glass-panel p-12 rounded-3xl shadow-xl">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Check className="h-12 w-12 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">All Caught Up!</h2>
                    <p className="text-slate-500 leading-relaxed mb-8">You've reviewed all potential matches for your niche today. Check back tomorrow for new opportunities.</p>
                    <button 
                        onClick={() => {
                            setCurrentIndex(0);
                            setProfiles(MOCK_PROFILES);
                        }}
                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all"
                    >
                        Review Again
                    </button>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default CollabHub;