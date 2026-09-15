import { Shield, Database, Building, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-850 text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-850">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white font-black text-sm">
                α
              </span>
              <span className="text-white font-bold text-base">알파상권 AI</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-orange-400 border border-slate-700">
                천안 스마트도시 특화
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              ‘알파상권 AI’는 천안시 스마트도시 공공데이터와 BIS 버스 승하차 및 체류 빅데이터를 융합하여 외식업 자영업자의 3년 내 조기 폐업을 방지하고 정확한 손익분기점(BEP) 테이블 회전수를 사전 처방하는 지능형 의사결정 플랫폼입니다.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">연계 공공데이터 출처</h4>
            <ul className="text-xs space-y-1.5 text-slate-400">
              <li>• 천안시 스마트도시 플랫폼 (천안시청)</li>
              <li>• 천안시 교통정보센터 버스정보시스템 (BIS)</li>
              <li>• 국토교통부 버스 승하차 카드 빅데이터</li>
              <li>• 중소벤처기업부 소상공인 상권정보시스템</li>
              <li>• 통계청 외식업 3년 생존율 및 폐업 현황</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">천안시 서비스 권역</h4>
            <ul className="text-xs space-y-1.5 text-slate-400">
              <li>• 천안시 서북구 (불당동, 두정동, 쌍용동, 백석동 등)</li>
              <li>• 천안시 동남구 (신부동, 신방동, 청당동, 원성동 등)</li>
              <li>• 31개 읍면동 전역 버스 노선 100% 반영</li>
              <li>• 실시간 외식업 조기폐업 경보 알고리즘 탑재</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 알파상권 AI (Alpha Sangkwon AI). 천안시 스마트도시 공공데이터 기반 외식 상권분석 및 처방 플랫폼.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>공공데이터 이용약관 준수</span>
            <span>·</span>
            <span>개인정보 미수집 (안심 무료 진단)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
