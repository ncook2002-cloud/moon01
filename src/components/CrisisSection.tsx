import { AlertTriangle, TrendingDown, Users, DollarSign, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function CrisisSection() {
  return (
    <section className="py-16 bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>외식업 현실 진단 리포트</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            대한민국 외식업 <span className="text-rose-400 underline decoration-rose-500/60 underline-offset-4">3년 내 폐업률 70%</span>의 참혹한 진실
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            10곳이 부푼 꿈을 안고 개업하지만, 36개월 뒤 살아남는 매장은 채 3곳이 되지 않습니다.
            <br className="hidden sm:inline" />
            열심히 일하지 않아서가 아니라, <strong className="text-white">‘상권 데이터의 착시’</strong> 때문입니다.
          </p>
        </div>

        {/* 3 Core Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              71.4<span className="text-xl text-rose-400 font-bold">%</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">3년 내 누적 폐업률</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              천안시 외식업 개업 점포 10곳 중 7곳 이상이 3년 이내 문을 닫습니다. (1년 차 폐업률 34.2%)
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              8,400<span className="text-xl text-amber-400 font-bold">만원</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">평균 매몰비용 손실</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              인테리어 공사비, 주방 집기 감가상각, 권리금 미회수 및 원상복구 철거비로 평생 모은 자본금이 증발합니다.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              64.8<span className="text-xl text-orange-400 font-bold">%</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">단순 통과형 유동인구 착시</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              길거리에 사람이 많아 보여도, 천안 주요 상권 보행자의 64.8%는 식당에 머무르지 않고 환승·이동하는 통과 인구입니다.
            </p>
          </div>
        </div>

        {/* Why failure happens: 3 fatal traps */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>외식 창업자가 가장 많이 빠지는 3대 치명적 함정</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-2 border-rose-500 pl-4">
              <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">함정 01</div>
              <h4 className="text-base font-bold text-white mb-1">유동인구 수치만 맹신</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                부동산 중개업자가 말하는 "하루 3만 명 유동인구"의 70%는 버스를 타러 급히 걷는 출퇴근자나 학원생입니다. 체류하지 않는 인구는 매출을 단 1원도 일으키지 못합니다.
              </p>
            </div>

            <div className="border-l-2 border-amber-500 pl-4">
              <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">함정 02</div>
              <h4 className="text-base font-bold text-white mb-1">BEP(손익분기) 역산 부재</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                월세 350만원, 직원 2명을 고용할 때 하루 최소 몇 번 테이블을 회전시켜야 하는지 계산하지 않고 계약합니다. 현실적으로 불가능한 3.5회전 목표를 안고 시작합니다.
              </p>
            </div>

            <div className="border-l-2 border-orange-500 pl-4">
              <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">함정 03</div>
              <h4 className="text-base font-bold text-white mb-1">조기폐업 경보의 부재</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                손익 구조가 꺾여도 "다음 달엔 나아지겠지" 하다가 보증금까지 다 까먹고 나옵니다. 6개월 전 경보를 받고 메뉴나 영업 전략을 바꿨다면 살릴 수 있었습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
