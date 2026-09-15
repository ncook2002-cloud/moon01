import { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Bus,
  Clock,
  RotateCw,
  Download,
  Share2,
  Printer,
  Sparkles,
  MapPin,
  TrendingDown,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { DiagnosisReport } from '../types';

interface DiagnosisModalProps {
  report: DiagnosisReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DiagnosisModal({ report, isOpen, onClose }: DiagnosisModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !report) return null;

  const { matchedDistrict, queryAddress, survivalScore, busMobilityInsight, earlyWarningAlert, bepPrescription } = report;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const warningColorMap = {
    안전: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    주의: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    경고: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    심각: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white my-8">
        {/* Top Header Bar */}
        <div className="bg-slate-850 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-black text-sm">
              α
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">알파상권 AI 긴급 외식 생존진단 처방전</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  천안시 스마트도시 공공데이터 인증
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>분석 대상: {queryAddress}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Summary Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Score 1: Survival Rating */}
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col justify-between">
              <div className="text-xs text-slate-400">상권 종합 생존지수</div>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white font-mono">{survivalScore}</span>
                <span className="text-sm font-semibold text-slate-400">/ 100점</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${warningColorMap[earlyWarningAlert.level]}`}>
                  {earlyWarningAlert.level} 단계 경보
                </span>
                <span className="text-[11px] text-slate-400">3년 생존율 {matchedDistrict.threeYearSurvivalRate}%</span>
              </div>
            </div>

            {/* Score 2: Bus Mobility Dwell Rate */}
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col justify-between">
              <div className="text-xs text-slate-400">버스 승하차 결합 유효 체류율</div>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-4xl font-black text-cyan-400 font-mono">{matchedDistrict.dwellRate}%</span>
                <span className="text-xs text-slate-400">45분 이상 체류</span>
              </div>
              <p className="text-[11px] text-slate-400">
                일 승하차 {busMobilityInsight.totalBoardings.toLocaleString()}명 중{' '}
                <strong className="text-cyan-300">{busMobilityInsight.effectiveDiningDwellers.toLocaleString()}명</strong> 유효
              </p>
            </div>

            {/* Score 3: Required BEP Turnover */}
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col justify-between">
              <div className="text-xs text-slate-400">필수 생존 테이블 회전수</div>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-4xl font-black text-emerald-400 font-mono">
                  일 {bepPrescription.recommendedTurnover}회전
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                점심 {bepPrescription.lunchTarget}회전 + 저녁 {bepPrescription.dinnerTarget}회전 분배 필요
              </p>
            </div>
          </div>

          {/* Core Diagnostic Section 1: Bus Data & Foot Traffic Illusion */}
          <div className="p-5 rounded-2xl bg-slate-850 border border-slate-750">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Bus className="w-4 h-4 text-cyan-400" />
              <span>천안시 BIS 버스 승하차 및 체류 인구 정밀 진단</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 mb-1">단순 통과형 인구 (환승·이동)</div>
                <div className="text-xl font-bold text-slate-300 font-mono">
                  {busMobilityInsight.transitOnlyRatio}%
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  식당 지출 의사 없이 지나치는 이동 인구입니다. 인테리어만 보고 들어오지 않으므로 점두 간판 및 퀵 런치 노출이 필수입니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 mb-1">골든타임 외식 피크 시간대</div>
                <div className="text-xl font-bold text-amber-300 font-mono">
                  {matchedDistrict.peakHour}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  해당 정류장 하차객이 식당가로 유입되는 집중 시간대입니다. 이 골든 3시간에 전일 매출의 75%를 뽑아내야 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Core Diagnostic Section 2: Early Warning Risk Triggers */}
          <div className="p-5 rounded-2xl bg-slate-850 border border-slate-750">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>조기폐업 위험 요인 감지 ({earlyWarningAlert.triggerFactors.length}건)</span>
            </h4>
            <div className="space-y-2.5">
              {earlyWarningAlert.triggerFactors.map((factor, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Diagnostic Section 3: Actionable BEP & Prescription Protocol */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40">
            <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>알파상권 AI 독점 맞춤 생존 처방전</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bepPrescription.actionablePlan.map((plan, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-750 text-xs text-slate-200 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{plan}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-slate-850 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>진단 데이터 출처: 천안시 스마트도시과 · 소상공인시장진흥공단</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>진단서 인쇄/PDF</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? '링크 복사 완료!' : '결과 공유하기'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold cursor-pointer transition-colors shadow-md"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
