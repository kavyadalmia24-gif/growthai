import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PenTool, 
  Workflow, 
  GraduationCap, 
  BrainCircuit, 
  Handshake,
  Menu, 
  X, 
  Rocket,
  ChevronRight,
  Trophy
} from 'lucide-react';
import { PageRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'brand', label: 'Brand Studio', icon: PenTool },
    { id: 'automation', label: 'Automation Hub', icon: Workflow },
    { id: 'academy', label: 'Growth Academy', icon: GraduationCap },
    { id: 'confidence', label: 'Confidence Zone', icon: BrainCircuit },
    { id: 'collab', label: 'Collaboration Hub', icon: Handshake },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden relative selection:bg-indigo-200 selection:text-indigo-900">
      {/* Rich Ambient Background */}
      <div className="fixed inset-0 z-0 bg-[#F0F4FF] pointer-events-none overflow-hidden">
         {/* Top Left Orb (Blue/Indigo) */}
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-[100px]" />
         {/* Bottom Right Orb (Purple/Pink) */}
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200/40 blur-[100px]" />
         {/* Center Accent (Teal/Emerald) */}
         <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-teal-200/30 blur-[100px]" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 text-white transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          bg-slate-900
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/5 bg-slate-900">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tight">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="text-white">GrowthAI</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as PageRoute);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden
                  ${isActive 
                    ? 'text-white shadow-lg shadow-indigo-900/20 bg-white/10' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                `}
              >
                {isActive && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500 rounded-r-full" />
                )}
                <div className="flex items-center gap-3 relative z-10">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white transition-colors'}`} />
                  <span className="font-medium tracking-wide text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4 relative z-10 opacity-75" />}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5 bg-slate-900">
          <div className="bg-gradient-to-br from-slate-800 to-slate-800 rounded-xl p-4 mb-4 shadow-lg border border-white/5">
             <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-white mb-2">
               <span>Level 3 Founder</span>
               <Trophy className="h-4 w-4 text-yellow-400" />
             </div>
             <div className="w-full bg-black/40 rounded-full h-1.5 mb-2">
               <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]" style={{ width: '75%' }}></div>
             </div>
             <div className="text-[10px] text-slate-400 flex justify-between font-medium">
               <span>1,250 XP</span>
               <span>Target: 1,500</span>
             </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white border-2 border-indigo-500 group-hover:border-indigo-400 transition-colors shadow-sm">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">John Doe</p>
              <p className="text-xs text-slate-400 truncate">Premium Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-20 bg-white/30 backdrop-blur-md border-b border-white/30 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors p-2 hover:bg-white/40 rounded-lg">
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500">
              <span className="hover:text-slate-800 transition-colors cursor-pointer">Overview</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <span className="font-semibold text-slate-800 bg-white/50 px-3 py-1 rounded-full border border-white/40 shadow-sm">
                {navItems.find(n => n.id === activePage)?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-100/60 backdrop-blur-sm text-orange-700 rounded-full text-xs font-bold border border-orange-200/50 shadow-sm">
               <span>🔥 5 Day Streak</span>
             </div>
             <div className="h-10 w-10 rounded-full bg-white/60 border border-white/50 shadow-sm text-indigo-600 flex items-center justify-center hover:bg-white hover:scale-105 transition-all cursor-pointer backdrop-blur-sm">
               <Trophy className="h-5 w-5" />
             </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;