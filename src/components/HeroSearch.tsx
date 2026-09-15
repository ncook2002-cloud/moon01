import { useState, FormEvent } from 'react';
import { Search, ArrowRight, MapPin, Sparkles, AlertCircle, Building2, Bus } from 'lucide-react';
import { CHEONAN_DISTRICTS } from '../data/cheonanData';

interface HeroSearchProps {
  onAnalyze: (address: string) => void;
  isLoading: boolean;
}

export default function HeroSearch({ onAnalyze, isLoading }: HeroSearchProps) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      onAnalyze('충청남도 천안시 서북구 불당21로 67-12');
      return;
    }
    onAnalyze(address.trim());
  };

  const handleSelectQuickDistrict = (districtAddress: string) => {
    setAddress(districtAddress);
    onAnalyze(districtAddress);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-10 pb-16 px-4 sm:px-6">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-orange-500/10 blur-[100px] pointer-events-none -z-0"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Public Data Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs text-slate-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          <span className="font-semibold text-orange-400">천안시 스마트도시 공공데이터</span>
          <span className="text-slate-500">|</span>
          <span>BIS 버스 승하차 · 체류 빅데이터 융합 분석</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-4">
          유동인구에 속지 마세요.
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
            체류 시간과 승하차
          </span>
          가 증명하는 진짜 외식 상권
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          외식업 3년 내 폐업률 <strong className="text-orange-400 font-semibold underline underline-offset-4 decoration-orange-500/60">70%의 함정</strong>을 피하세요.
          <br className="hidden sm:inline" />
          단순 보행자가 아닌 <span className="text-white font-medium">실제 지갑을 여는 체류인구와 필수 BEP 테이블 회전수</span>를 역산 진단합니다.
        </p>

        {/* 1-Click Direct Conversion Search Form */}
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="p-2 sm:p-2.5 bg-slate-800/95 backdrop-blur border-2 border-orange-500/50 hover:border-orange-500 rounded-2xl shadow-2xl shadow-orange-950/40 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative flex-1 flex items-center">
                <MapPin className="absolute left-4 w-5 h-5 text-orange-400 shrink-0" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="천안시 도로명 또는 지번 주소 입력 (예: 불당21로 67-12, 두정동 18)"
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-slate-900/90 text-white placeholder-slate-400 text-sm sm:text-base rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium"
                />
              </div>

              {/* High-visibility Vibrant Orange Single Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#FF5A1F] hover:bg-[#ff4600] active:scale-[0.98] text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 flex items-center justify-center gap-2 shrink-0 transition-all duration-150 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>공공데이터 분석 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
                    <span>1분 무료 상권 생존진단 받기</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Cheonan District Selection Chips */}
          <div className="mt-4 pt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs">
            <span className="text-slate-400 flex items-center gap-1 mr-1">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>천안 주요 외식상권 1초 진단:</span>
            </span>
            {CHEONAN_DISTRICTS.map((district) => (
              <button
                key={district.id}
                type="button"
                onClick={() => handleSelectQuickDistrict(district.addressExample)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 hover:border-orange-500/60 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>{district.name.split(' ')[0]}</span>
                <span className="text-[10px] text-orange-400 font-mono">({district.dong})</span>
              </button>
            ))}
          </div>

          {/* Micro trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>회원가입 없이 즉시 진단</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>천안시 BIS 31개 읍면동 버스 노선 100% 반영</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>소상공인 맞춤 BEP 역산 처방</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
