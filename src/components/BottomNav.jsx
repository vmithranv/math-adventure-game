import React from 'react';
import { Map, Calculator, Gift } from 'lucide-react';

export const BottomNav = ({ activeTab, onSelectTab, giftsCount }) => {
  const tabs = [
    { id: 'map', label: 'Play Map', icon: Map },
    { id: 'abacus', label: 'Abacus Lab', icon: Calculator },
    { id: 'gifts', label: 'My Gifts', icon: Gift, badge: giftsCount > 0 ? giftsCount : null }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 rounded-2xl transition-all relative ${
                isActive
                  ? 'text-indigo-600 font-black'
                  : 'text-slate-400 hover:text-slate-600 font-semibold'
              }`}
            >
              <div className={`p-1.5 rounded-2xl transition ${
                isActive ? 'bg-indigo-50 text-indigo-600 scale-105' : ''
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>

              {tab.badge && (
                <span className="absolute top-0 right-6 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
