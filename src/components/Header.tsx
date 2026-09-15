import { ShieldCheck, Activity, Database } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Public Data Mark - STRICTLY NO GNB NAV MENUS AS REQUESTED */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/20">
            α
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg tracking-tight">알파상권 AI</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full">
                천안 스마트도시 특화
              </span>
            </div>
            <p className="text-[11px] text-slate-400">천안시 외식업 공공데이터 상권분석 & 처방 엔진</p>
          </div>
        </div>

        {/* Live Public Data Engine Status */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full text-slate-300">
            <Database className="w-3.5 h-3.5 text-orange-400" />
            <span>천안 BIS 버스 승하차 · 소상공인 실시간 데이터</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 px-2.5 py-1 rounded-full text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>엔진 가동 중</span>
          </div>
        </div>
      </div>
    </header>
  );
}
