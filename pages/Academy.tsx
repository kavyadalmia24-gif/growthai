import React from 'react';
import { PlayCircle, Lock, CheckCircle, Clock, BookOpen, Star } from 'lucide-react';

const Academy: React.FC = () => {
  const courses = [
    { 
      title: "Foundations of Growth", 
      desc: "Master the basics of funnel building and customer psychology.",
      progress: 100,
      locked: false,
      color: "from-emerald-400 to-teal-500",
      icon: <BookOpen className="h-6 w-6 text-white" />
    },
    { 
      title: "AI Automation Mastery", 
      desc: "Implement agents, automated emails, and CRM workflows.",
      progress: 45,
      locked: false,
      color: "from-blue-400 to-indigo-500",
      icon: <CheckCircle className="h-6 w-6 text-white" />
    },
    { 
      title: "Viral Content Formula", 
      desc: "How to write hooks that stop the scroll on LinkedIn and X.",
      progress: 10,
      locked: false,
      color: "from-purple-400 to-pink-500",
      icon: <Star className="h-6 w-6 text-white" />
    },
    { 
      title: "Financial Fortitude", 
      desc: "Cash flow management for non-finance founders.",
      progress: 0,
      locked: true,
      color: "from-slate-400 to-slate-500",
      icon: <Lock className="h-6 w-6 text-white" />
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <div className="glass-panel p-10 rounded-2xl shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600"></div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Growth Academy</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Level up your skills. Complete courses to earn XP, unlock badges, and apply strategies directly to your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <div key={idx} className={`glass-panel rounded-2xl p-1 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${course.locked ? 'opacity-80' : 'group'}`}>
            <div className="bg-white rounded-xl h-full p-6 flex flex-col relative overflow-hidden">
               {/* Header Background */}
               <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>
               
               <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-6 shadow-lg shadow-black/5 relative z-10`}>
                 {course.icon}
               </div>
               
               <h3 className="font-bold text-xl text-slate-900 mb-2 relative z-10">{course.title}</h3>
               <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed relative z-10">{course.desc}</p>
               
               <div className="mt-auto relative z-10">
                 <div className="flex justify-between text-xs font-bold mb-2">
                   <span className={course.locked ? 'text-slate-400' : 'text-slate-700'}>
                     {course.locked ? 'LOCKED' : `${course.progress}% COMPLETE`}
                   </span>
                   {!course.locked && <span className="text-emerald-600 flex items-center gap-1"><Clock className="h-3 w-3" /> 2h left</span>}
                 </div>
                 <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                   <div 
                     className={`h-full rounded-full transition-all duration-1000 ${course.locked ? 'bg-slate-300' : `bg-gradient-to-r ${course.color}`}`} 
                     style={{ width: `${course.progress}%` }}
                   ></div>
                 </div>
               </div>
               
               <button 
                 disabled={course.locked}
                 className={`mt-6 w-full py-3 rounded-xl text-sm font-bold transition-all relative z-10 ${
                   course.locked 
                     ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                     : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10'
                 }`}
               >
                 {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Academy;