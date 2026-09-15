import { useState } from 'react';
import { Bus, Clock, Footprints, ArrowRight, ShieldCheck, MapPin, BarChart3, Info } from 'lucide-react';
import { CHEONAN_DISTRICTS } from '../data/cheonanData';

export default function BusMobilitySection() {
  const [selectedId, setSelectedId] = useState(CHEONAN_DISTRICTS[0].id);

  const currentDistrict = CHEONAN_DISTRICTS.find((d) => d.id === selectedId) || CHEONAN_DISTRICTS[0];
  const transitRatio = Math.round((100 - currentDistrict.dwellRate) * 10) / 10;
  const effectiveDwellers = Math.round(currentDistrict.dailyBusRiders * (currentDistrict.dwellRate / 100));

  return (
    <section className="py-16 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Bus className="w-3.5 h-3.5" />
            <span>천안시 스마트도시 BIS 데이터 융합</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            지나가는 사람은 매출이 아닙니다.
            <br />
            <span className="text-cyan-400">버스 승하차 결합 체류도</span> 분석
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            천안시 BIS(버스정보시스템) 교통카드 승하차 데이터와 스마트도시 체류 센서를 결합하여,
            <br className="hidden sm:inline" />
            버스 정류장 반경 250m 내 <strong className="text-white">45분 이상 실제 머무르는 외식 소비층</strong>만 발라냅니다.
          </p>
        </div>

        {/* District Selector Tabs for Cheonan */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CHEONAN_DISTRICTS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                selectedId === d.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{d.name.split(' ')[0]}</span>
              <span className={`text-[10px] ${selectedId === d.id ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                ({d.dong})
              </span>
            </button>
          ))}
        </div>

        {/* Comparison Data Display Card */}
        <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-750">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">{currentDistrict.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-cyan-500/30">
                  {currentDistrict.type}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <span>기준 위치:</span>
                <span className="font-mono text-slate-300">{currentDistrict.addressExample}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
                <div className="text-slate-400">정류장 일 승하차량</div>
                <div className="text-lg font-bold text-white font-mono">
                  {currentDistrict.dailyBusRiders.toLocaleString()}명
                </div>
              </div>
              <div className="bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
                <div className="text-slate-400">외식 피크 시간</div>
                <div className="text-lg font-bold text-amber-300">
                  {currentDistrict.peakHour.split(' ')[0]}
                </div>
              </div>
            </div>
          </div>

          {/* Visualization: Passing vs Staying */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Split Bar Visualization */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="flex items-center gap-1 text-slate-400">
                  <Footprints className="w-3.5 h-3.5 text-slate-500" />
                  단순 통과형 환승·이동 인구 ({transitRatio}%)
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  실제 유효 외식 체류인구 ({currentDistrict.dwellRate}%)
                </span>
              </div>

              {/* Progress Stack */}
              <div className="w-full h-8 bg-slate-800 rounded-xl overflow-hidden p-1 flex border border-slate-700">
                <div
                  style={{ width: `${transitRatio}%` }}
                  className="h-full bg-slate-700 rounded-l-lg flex items-center justify-center text-[10px] text-slate-300 font-mono transition-all duration-500"
                >
                  {Math.round(currentDistrict.dailyBusRiders * (transitRatio / 100)).toLocaleString()}명
                </div>
                <div
                  style={{ width: `${currentDistrict.dwellRate}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-r-lg flex items-center justify-center text-[10px] text-slate-950 font-bold font-mono transition-all duration-500 shadow-sm"
                >
                  {effectiveDwellers.toLocaleString()}명
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-800/60 border border-slate-750 text-xs text-slate-300 leading-relaxed">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-cyan-400" />
                  <span>체류 분석 코멘트</span>
                </div>
                {currentDistrict.name} 일대 버스 이용객 중{' '}
                <strong className="text-cyan-400">{currentDistrict.dwellRate}%({effectiveDwellers.toLocaleString()}명)</strong>만이
                식당 반경 내에서 45분 이상 머무르는 유효 잠재 고객입니다.
                {transitRatio > 60 && (
                  <span className="text-amber-300 ml-1">
                    통과 비중이 매우 높아 점두 배너나 테이크아웃 전용 쇼케이스 없이 홀 영업만으로는 고전할 확률이 높습니다.
                  </span>
                )}
              </div>
            </div>

            {/* Smart City Insights Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="text-xs text-slate-400 mb-1">체류 소비 전환율</div>
                <div className="text-2xl font-black text-cyan-400 font-mono">
                  {currentDistrict.dwellRate}%
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  천안시 전역 평균 (38.5%) 대비{' '}
                  <span className={currentDistrict.dwellRate >= 38.5 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                    {currentDistrict.dwellRate >= 38.5 ? '높음' : '낮음'}
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="text-xs text-slate-400 mb-1">상권 평균 테이블 회전수</div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  일 {currentDistrict.averageTableTurnover}회전
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  평균 객단가 {currentDistrict.avgTicketPrice.toLocaleString()}원 기준
                </p>
              </div>

              <div className="sm:col-span-2 p-4 rounded-xl bg-slate-800/40 border border-slate-750">
                <div className="text-xs font-bold text-white mb-1">⚠️ 상권 주요 위험 요인</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentDistrict.keyRisk}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
