import { ShieldAlert, AlertTriangle, CheckCircle, Flame, BellRing, ArrowUpRight, RefreshCw } from 'lucide-react';

export default function EarlyWarningSection() {
  const levels = [
    {
      level: '1단계: 안전 (Safe)',
      color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      criteria: '월 임대료가 예상 매출의 10% 이하이며, 일 1.5회전 이하로도 손익분기점 도달이 가능한 안정적 상권',
      action: '단골 고객 멤버십 구축 및 계절 시그니처 메뉴로 객단가 지속 방어',
    },
    {
      level: '2단계: 주의 (Caution)',
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      criteria: '반경 300m 내 동일/유사 메뉴 경쟁 점포가 최근 3개월 내 2곳 이상 신규 출점하여 고객 분산 조짐',
      action: '점심 런치 타임 7분 조리 원플레이트 메뉴 도입으로 테이블 회전 0.5회전 끌어올리기',
    },
    {
      level: '3단계: 경고 (Warning)',
      color: 'border-orange-500/50 bg-orange-950/20 text-orange-400',
      badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      criteria: '월 임대료 비중 16% 초과 + 버스 승하차 체류 지속 시간이 35분 이하로 단축되며 저녁 객단가 급감',
      action: '퇴근 버스 이용객 타깃 포장·간편식 세트 개발 및 주 1회 원가율 정밀 재조정',
    },
    {
      level: '4단계: 심각 (Critical)',
      color: 'border-rose-500/50 bg-rose-950/20 text-rose-400',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      criteria: '필요 테이블 회전수 3.0회전 초과 (물리적 달성 불가 상태) + 3개월 연속 적자로 권리금 손실 위험',
      action: '긴급 업종 전환 검토 또는 임대료 감액 협상, 조기 권리금 보전 매각 골든타임 진단',
    },
  ];

  return (
    <section className="py-16 bg-slate-900/40 border-b border-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
            <BellRing className="w-3.5 h-3.5" />
            <span>상권 골든타임 사수 시스템</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            적자가 누적되기 전에 알려주는
            <br />
            <span className="text-orange-400">AI 조기폐업 경보</span> 시스템
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            매출이 바닥을 치고 보증금이 깎여 나갈 때까지 기다리지 마세요.
            <br className="hidden sm:inline" />
            천안시 공공데이터를 24시간 감시하여 <strong className="text-white">폐업 위험 징후를 4단계로 사전 경보</strong>하고 즉각 처방전을 발행합니다.
          </p>
        </div>

        {/* 4 Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {levels.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${item.color} backdrop-blur-sm relative overflow-hidden transition-all duration-200 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${item.badge}`}>
                  {item.level}
                </span>
                <span className="text-xs text-slate-400 font-mono">CODE #{idx + 1}</span>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-400 mb-1">상권 경보 트리거 기준</div>
                <p className="text-sm font-medium text-slate-200 leading-snug">{item.criteria}</p>
              </div>

              <div className="pt-3 border-t border-slate-700/60 flex items-start gap-2">
                <RefreshCw className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-orange-400">알파상권 맞춤 처방: </span>
                  <span className="text-xs text-slate-300">{item.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Early Warning Value Proposition Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-850 border border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">경보를 미리 알면 8,400만원 손실을 막을 수 있습니다</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                계약 전에는 입점 거절 결정권, 운영 중에는 메뉴 개편 및 권리금 보전 매각의 골든타임(최소 6개월)을 확보합니다.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">천안 31개 읍면동 실시간 모니터링</span>
          </div>
        </div>
      </div>
    </section>
  );
}
