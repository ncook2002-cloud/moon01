import { CheonanDistrict, BEPInputs, BEPResult, DiagnosisReport } from '../types';

export const CHEONAN_DISTRICTS: CheonanDistrict[] = [
  {
    id: 'buldang',
    name: '신불당 카페거리·상업지구',
    dong: '불당동',
    addressExample: '충청남도 천안시 서북구 불당21로 67-12',
    type: '신흥먹자',
    dailyBusRiders: 24800,
    dwellRate: 46.8,
    threeYearSurvivalRate: 34.2, // 3년 생존율
    averageTableTurnover: 2.1,
    warningLevel: '주의',
    keyRisk: '천안 최고 수준 임대료(평당 20~35만원) 대비 런치 회전 부족',
    peakHour: '18:30 ~ 21:30 (퇴근 후 직장인 & 가족 단위)',
    avgTicketPrice: 38000,
  },
  {
    id: 'dujeong',
    name: '두정동 먹자골목 중심상권',
    dong: '두정동',
    addressExample: '충청남도 천안시 서북구 원두정2길 18',
    type: '번화가/유흥',
    dailyBusRiders: 31200,
    dwellRate: 38.2,
    threeYearSurvivalRate: 26.5,
    averageTableTurnover: 1.8,
    warningLevel: '경고',
    keyRisk: '심야 주류 위주 과밀 출점 및 2차 회식 문화 축소로 객단가 하락',
    peakHour: '20:00 ~ 24:00 (2030 야간 소비층)',
    avgTicketPrice: 31000,
  },
  {
    id: 'shinbu',
    name: '신부동 터미널·야우리 문화상권',
    dong: '신부동',
    addressExample: '충청남도 천안시 동남구 만남로 43',
    type: '번화가/유흥',
    dailyBusRiders: 58900,
    dwellRate: 29.4,
    threeYearSurvivalRate: 31.8,
    averageTableTurnover: 2.4,
    warningLevel: '주의',
    keyRisk: '교통 환승·쇼핑 단순 통과 비중 70.6%로 체류 외식 전환율 저조',
    peakHour: '12:00 ~ 15:00 & 17:30 ~ 20:00',
    avgTicketPrice: 22000,
  },
  {
    id: 'shinbang',
    name: '신방동 통정지구 먹자골목',
    dong: '신방동',
    addressExample: '충청남도 천안시 동남구 통정4로 29',
    type: '주거/학원가',
    dailyBusRiders: 13600,
    dwellRate: 58.6,
    threeYearSurvivalRate: 38.0,
    averageTableTurnover: 1.7,
    warningLevel: '안전',
    keyRisk: '배후 대단지 아파트 가족 단위 고정 고객층으로 평일 점심 수요 한정',
    peakHour: '18:00 ~ 20:30 (패밀리 외식 집중)',
    avgTicketPrice: 42000,
  },
  {
    id: 'ssangyong',
    name: '쌍용동 나사렛대 대학상권',
    dong: '쌍용동',
    addressExample: '충청남도 천안시 서북구 쌍용19로 35',
    type: '대학가',
    dailyBusRiders: 19400,
    dwellRate: 41.2,
    threeYearSurvivalRate: 24.1,
    averageTableTurnover: 2.6,
    warningLevel: '심각',
    keyRisk: '방학 비수기(연간 4개월) 매출 급감 및 1인당 낮은 객단가(1만원 이하)',
    peakHour: '11:40 ~ 13:20 (학식 대체 점심)',
    avgTicketPrice: 14000,
  },
  {
    id: 'cheongsu',
    name: '청수·청당 행정타운 법원상권',
    dong: '청당동',
    addressExample: '충청남도 천안시 동남구 청수14로 96',
    type: '오피스/행정',
    dailyBusRiders: 16800,
    dwellRate: 52.4,
    threeYearSurvivalRate: 36.5,
    averageTableTurnover: 2.2,
    warningLevel: '안전',
    keyRisk: '주말·공휴일 오피스 공동화 현상으로 주 5일 영업 한계 극복 필요',
    peakHour: '11:30 ~ 13:00 (법원·세무서 공무원 런치)',
    avgTicketPrice: 34000,
  },
];

export function calculateBEP(inputs: BEPInputs): BEPResult {
  const { tables, monthlyFixedCost, avgTicketPerTable, variableCostRatio, openDays } = inputs;

  // monthly fixed cost is in 10,000 KRW -> convert to KRW
  const fixedCostKRW = monthlyFixedCost * 10000;
  
  // Contribution Margin Ratio = 1 - (variableCostRatio / 100)
  const cmRatio = Math.max(0.1, 1 - (variableCostRatio / 100));
  
  // BEP Monthly Revenue = Fixed Cost / CM Ratio
  const breakEvenMonthlyRevenue = Math.round(fixedCostKRW / cmRatio);
  
  // BEP Daily Revenue
  const breakEvenDailyRevenue = Math.round(breakEvenMonthlyRevenue / Math.max(1, openDays));
  
  // Required Daily Total Table Bills = Daily Revenue / avgTicketPerTable
  const requiredDailyTotalTables = Math.round((breakEvenDailyRevenue / Math.max(1000, avgTicketPerTable)) * 10) / 10;
  
  // Required Daily Table Turnover = Required Daily Total Tables / tables
  const requiredDailyTableTurnover = Math.round((requiredDailyTotalTables / Math.max(1, tables)) * 100) / 100;

  const isHighRisk = requiredDailyTableTurnover > 2.8;
  const isModerateRisk = requiredDailyTableTurnover > 2.0 && requiredDailyTableTurnover <= 2.8;

  let statusMessage = '';
  let recommendation = '';

  if (requiredDailyTableTurnover > 3.2) {
    statusMessage = '🚨 극심한 폐업 고위험 (일 3.2회전 초과)';
    recommendation = `하루에 전 테이블이 최소 ${requiredDailyTableTurnover}번 만석 회전해야 겨우 본전입니다. 점심/저녁 2타임 구조상 물리적으로 불가능에 가깝습니다. 임대료를 낮추거나 객단가를 즉시 인상해야 합니다.`;
  } else if (requiredDailyTableTurnover > 2.3) {
    statusMessage = '⚠️ 위험 주의보 (일 2.3~3.2회전 필요)';
    recommendation = `하루 평균 ${requiredDailyTableTurnover}회전이 필요합니다. 점심 피크(1.2회전) 외에 저녁 시간대 테이블 회전이나 테이크아웃/배달 매출을 필수 결합해야 흑자 전환이 가능합니다.`;
  } else if (requiredDailyTableTurnover > 1.5) {
    statusMessage = '✅ 정상 영업 가능 (일 1.5~2.3회전 필요)';
    recommendation = `하루 ${requiredDailyTableTurnover}회전(일 ${requiredDailyTotalTables}팀)으로 손익분기 달성이 가능합니다. 피크타임 조기 서빙과 세트메뉴 유도로 안정적 영업 마진을 확보할 수 있습니다.`;
  } else {
    statusMessage = '🌟 최적 안전 마진 (일 1.5회전 이하)';
    recommendation = `낮은 고정비와 적정 객단가 구조로 일 ${requiredDailyTableTurnover}회전만으로 BEP를 넘깁니다. 단골 고객 관리와 식자재 로스율 통제에 집중하세요.`;
  }

  return {
    breakEvenMonthlyRevenue,
    breakEvenDailyRevenue,
    requiredDailyTableTurnover,
    requiredDailyTotalTables,
    isHighRisk,
    statusMessage,
    recommendation,
  };
}

export function generateDiagnosis(address: string): DiagnosisReport {
  const normalized = address.toLowerCase().trim();
  
  // Match district or default to Buldang
  let matched = CHEONAN_DISTRICTS[0];
  if (normalized.includes('두정')) {
    matched = CHEONAN_DISTRICTS[1];
  } else if (normalized.includes('신부') || normalized.includes('만남') || normalized.includes('터미널')) {
    matched = CHEONAN_DISTRICTS[2];
  } else if (normalized.includes('신방') || normalized.includes('통정')) {
    matched = CHEONAN_DISTRICTS[3];
  } else if (normalized.includes('쌍용') || normalized.includes('나사렛')) {
    matched = CHEONAN_DISTRICTS[4];
  } else if (normalized.includes('청수') || normalized.includes('청당')) {
    matched = CHEONAN_DISTRICTS[5];
  }

  const transitOnly = Math.round((100 - matched.dwellRate) * 10) / 10;
  const effectiveDwellers = Math.round(matched.dailyBusRiders * (matched.dwellRate / 100));

  let score = 76;
  if (matched.warningLevel === '심각') score = 48;
  else if (matched.warningLevel === '경고') score = 59;
  else if (matched.warningLevel === '주의') score = 68;
  else score = 84;

  const closureProb = Math.round(100 - matched.threeYearSurvivalRate);

  return {
    queryAddress: address || matched.addressExample,
    matchedDistrict: matched,
    survivalScore: score,
    busMobilityInsight: {
      totalBoardings: matched.dailyBusRiders,
      effectiveDiningDwellers: effectiveDwellers,
      transitOnlyRatio: transitOnly,
      stopCatchmentName: `${matched.dong} 중심 버스 정류장 반경 250m`,
    },
    earlyWarningAlert: {
      level: matched.warningLevel,
      triggerFactors: [
        matched.keyRisk,
        `반경 300m 내 버스 정류장 승하차 중 ${transitOnly}%가 식당 체류 없이 통과`,
        `동종 외식업체 평균 계약 유지기간 21.4개월 (임대료 압박 요인)`,
      ],
      closureProbability: closureProb,
    },
    bepPrescription: {
      recommendedTurnover: matched.averageTableTurnover,
      lunchTarget: Math.round((matched.averageTableTurnover * 0.55) * 10) / 10,
      dinnerTarget: Math.round((matched.averageTableTurnover * 0.45) * 10) / 10,
      actionablePlan: [
        `[체류 유입] ${matched.peakHour} 유입 승객을 위한 퇴근길 1차 직행 세트 개발`,
        `[테이블 회전] 단체석 위주 배치에서 2인/4인 모듈형 분리 테이블로 전환 (공실률 35% 감소)`,
        `[BEP 방어] 목표 일 ${matched.averageTableTurnover}회전 달성을 위해 런치 조리시간 7분 이내 원플레이트 메뉴 셋업`,
        `[공공데이터 연계] 천안시 버스 배차 간격에 맞춘 포장 사전예약(스마트오더) 연계`,
      ],
    },
  };
}
