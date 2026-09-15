import { useState } from 'react';
import Header from './components/Header';
import HeroSearch from './components/HeroSearch';
import CrisisSection from './components/CrisisSection';
import BusMobilitySection from './components/BusMobilitySection';
import EarlyWarningSection from './components/EarlyWarningSection';
import BEPCalculatorSection from './components/BEPCalculatorSection';
import DiagnosisModal from './components/DiagnosisModal';
import Footer from './components/Footer';
import { generateDiagnosis } from './data/cheonanData';
import { DiagnosisReport } from './types';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [selectedReport, setSelectedReport] = useState<DiagnosisReport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = (address: string) => {
    setIsLoading(true);
    // Simulate smart city public data aggregation
    setTimeout(() => {
      const report = generateDiagnosis(address);
      setSelectedReport(report);
      setIsLoading(false);
      setIsModalOpen(true);
    }, 600);
  };

  const handleDiagnoseWithBEP = (turnover: number) => {
    // Quick diagnose using current BEP result
    handleAnalyze('충청남도 천안시 서북구 불당21로 67-12 (신불당)');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header - No GNB nav menus as strictly requested */}
      <Header />

      <main className="flex-1">
        {/* Main Hero & 1-Click Search: [천안시 도로명/지번 주소 입력칸] + Orange [1분 무료 상권 생존진단 받기] */}
        <HeroSearch onAnalyze={handleAnalyze} isLoading={isLoading} />

        {/* 1. 외식업 3년 내 폐업률 70% 문제점 */}
        <CrisisSection />

        {/* 2. 버스 승하차 결합 체류도 분석 */}
        <BusMobilitySection />

        {/* 3. 조기폐업 경보 시스템 */}
        <EarlyWarningSection />

        {/* 4. BEP 테이블 회전 수 역산 카드 */}
        <BEPCalculatorSection onQuickDiagnoseWithBEP={handleDiagnoseWithBEP} />

        {/* Bottom Fast CTA Banner */}
        <section className="py-14 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-black/20 rounded-full text-xs font-bold mb-3">
              천안 외식 소상공인 무료 공공 서비스
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              지금 입점하려는 자리, 과연 3년 뒤에도 살아남을까요?
            </h2>
            <p className="text-sm text-orange-100 mb-6 max-w-xl mx-auto">
              수천만 원 인테리어 계약서에 도장 찍기 전, 천안시 스마트도시 공공데이터와 체류 시간으로 1분 만에 검증하세요.
            </p>
            <button
              onClick={scrollToTop}
              className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-orange-400 hover:text-orange-300 font-black text-base rounded-2xl shadow-xl shadow-black/30 inline-flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span>무료 상권 생존진단 바로 받기 (주소 입력)</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer referencing Public Data sources */}
      <Footer />

      {/* Comprehensive Diagnosis Modal triggered on 1-click */}
      <DiagnosisModal
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
