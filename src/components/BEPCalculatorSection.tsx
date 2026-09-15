import { useState, useMemo } from 'react';
import { Calculator, AlertCircle, CheckCircle2, Flame, RotateCw, TrendingUp, HelpCircle } from 'lucide-react';
import { BEPInputs } from '../types';
import { calculateBEP } from '../data/cheonanData';

interface BEPCalculatorSectionProps {
  onQuickDiagnoseWithBEP?: (turnover: number) => void;
}

export default function BEPCalculatorSection({ onQuickDiagnoseWithBEP }: BEPCalculatorSectionProps) {
  const [inputs, setInputs] = useState<BEPInputs>({
    tables: 10,
    monthlyFixedCost: 650, // 650만원 (임대료 250 + 직원 인건비 350 + 관리비 50)
    avgTicketPerTable: 35000, // 테이블당 35,000원
    variableCostRatio: 35, // 식자재 및 변동비 35%
    openDays: 26, // 월 26일 영업
  });

  const result = useMemo(() => calculateBEP(inputs), [inputs]);

  const handlePreset = (presetType: 'small' | 'medium' | 'large') => {
    if (presetType === 'small') {
      // 12평 분식/소형카페
      setInputs({
        tables: 6,
        monthlyFixedCost: 380,
        avgTicketPerTable: 18000,
        variableCostRatio: 32,
        openDays: 26,
      });
    } else if (presetType === 'medium') {
      // 25평 일반음식점/백반/파스타
      setInputs({
        tables: 12,
        monthlyFixedCost: 680,
        avgTicketPerTable: 38000,
        variableCostRatio: 36,
        openDays: 26,
      });
    } else {
      // 45평 고기집/주점
      setInputs({
        tables: 18,
        monthlyFixedCost: 1150,
        avgTicketPerTable: 68000,
        variableCostRatio: 40,
        openDays: 26,
      });
    }
  };

  return (
    <section className="py-16 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>핵심 생존 솔루션</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            "하루에 테이블을 몇 번 돌려야 살아남을까?"
            <br />
            <span className="text-emerald-400">BEP 테이블 회전 수 역산</span> 카드
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            월세와 인건비를 적고 나면, 당신의 매장이 살기 위해 <strong className="text-white">하루에 꼭 달성해야 하는 물리적 회전수</strong>가 나옵니다.
            <br className="hidden sm:inline" />
            천안시 외식 상권 평균 달성 회전수와 비교하여 생존 가능성을 즉각 판정합니다.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Sliders & Presets (7 cols) */}
          <div className="lg:col-span-7 bg-slate-850 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Quick Presets */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-750">
              <span className="text-xs text-slate-400 font-medium">업종별 표준 프리셋 불러오기:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handlePreset('small')}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                >
                  15평 분식·카페
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('medium')}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                >
                  25평 백반·파스타
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('large')}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                >
                  45평 고기집·주점
                </button>
              </div>
            </div>

            {/* Slider 1: 매장 테이블 수 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-200">
                  매장 테이블 수
                </label>
                <span className="text-base font-black text-emerald-400 font-mono">
                  {inputs.tables}개 테이블
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                step="1"
                value={inputs.tables}
                onChange={(e) => setInputs({ ...inputs, tables: Number(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>4개 (소형)</span>
                <span>15개 (중형)</span>
                <span>30개 (대형)</span>
              </div>
            </div>

            {/* Slider 2: 월 고정비 (임대료 + 인건비 + 관리비) */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-200">
                  월 총 고정비 (월세 + 인건비 + 관리비)
                </label>
                <span className="text-base font-black text-amber-300 font-mono">
                  {inputs.monthlyFixedCost.toLocaleString()}만원
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={inputs.monthlyFixedCost}
                onChange={(e) => setInputs({ ...inputs, monthlyFixedCost: Number(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>200만원</span>
                <span>1,000만원</span>
                <span>2,000만원</span>
              </div>
            </div>

            {/* Slider 3: 테이블당 평균 객단가 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-200">
                  테이블당 평균 결제금액 (객단가)
                </label>
                <span className="text-base font-black text-cyan-400 font-mono">
                  {inputs.avgTicketPerTable.toLocaleString()}원
                </span>
              </div>
              <input
                type="range"
                min="12000"
                max="120000"
                step="2000"
                value={inputs.avgTicketPerTable}
                onChange={(e) => setInputs({ ...inputs, avgTicketPerTable: Number(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>12,000원 (분식/식사)</span>
                <span>50,000원 (요리/구이)</span>
                <span>120,000원 (회식)</span>
              </div>
            </div>

            {/* 2 sub-inputs: 원가율 & 영업일수 */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300 font-medium">식자재/변동비율</span>
                  <span className="font-bold text-white font-mono">{inputs.variableCostRatio}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="55"
                  step="1"
                  value={inputs.variableCostRatio}
                  onChange={(e) => setInputs({ ...inputs, variableCostRatio: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-700 rounded appearance-none cursor-pointer accent-slate-400"
                />
              </div>

              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300 font-medium">월 영업 일수</span>
                  <span className="font-bold text-white font-mono">{inputs.openDays}일</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="31"
                  step="1"
                  value={inputs.openDays}
                  onChange={(e) => setInputs({ ...inputs, openDays: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-700 rounded appearance-none cursor-pointer accent-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Reverse Calculation Output Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-850 border-2 border-emerald-500/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-6">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5" />
                BEP 역산 진단 결과
              </span>
              <span className="text-[11px] text-slate-400">마진 한계선 계산 완료</span>
            </div>

            {/* Core Highlight: Required Daily Table Turnover */}
            <div className="text-center py-4 bg-slate-900/80 rounded-2xl border border-slate-700/80 mb-6">
              <div className="text-xs text-slate-400 mb-1">하루에 꼭 달성해야 하는 테이블 회전수</div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                일 <span className="text-emerald-400">{result.requiredDailyTableTurnover}</span>회전
              </div>
              <div className="text-xs text-slate-300 mt-2 font-medium">
                하루 최소 <strong className="text-emerald-400">{result.requiredDailyTotalTables}팀</strong>이 만석 회전되어야 손익분기점 도달
              </div>
            </div>

            {/* Financial Metrics */}
            <div className="space-y-3 mb-6 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-750">
                <span className="text-slate-400">월 필수 손익분기 매출액</span>
                <span className="font-bold text-white font-mono text-sm">
                  {(result.breakEvenMonthlyRevenue / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만원
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-750">
                <span className="text-slate-400">하루 최소 목표 매출액</span>
                <span className="font-bold text-white font-mono text-sm">
                  {(result.breakEvenDailyRevenue / 10000).toLocaleString(undefined, { maximumFractionDigits: 1 })}만원 / 일
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-750">
                <span className="text-slate-400">천안 평균 상권 회전수와 비교</span>
                <span className="font-bold text-cyan-400 font-mono">
                  천안 평균 1.8 ~ 2.2회전
                </span>
              </div>
            </div>

            {/* Status & Actionable Recommendation */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 mb-6">
              <div className="font-bold text-sm text-white mb-1">
                {result.statusMessage}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {result.recommendation}
              </p>
            </div>

            {/* Direct Action Trigger */}
            <button
              type="button"
              onClick={() => {
                if (onQuickDiagnoseWithBEP) {
                  onQuickDiagnoseWithBEP(result.requiredDailyTableTurnover);
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>내 매장 조건으로 천안 상권 무료 진단서 출력</span>
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
