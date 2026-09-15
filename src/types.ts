export interface CheonanDistrict {
  id: string;
  name: string;
  dong: string;
  addressExample: string;
  type: '번화가/유흥' | '오피스/행정' | '주거/학원가' | '대학가' | '신흥먹자';
  dailyBusRiders: number;
  dwellRate: number; // percentage of riders who dwell > 45min
  threeYearSurvivalRate: number;
  averageTableTurnover: number;
  warningLevel: '안전' | '주의' | '경고' | '심각';
  keyRisk: string;
  peakHour: string;
  avgTicketPrice: number;
}

export interface BEPInputs {
  tables: number;
  monthlyFixedCost: number; // in 10,000 KRW (e.g. 650 = 6,500,000 KRW)
  avgTicketPerTable: number; // in KRW (e.g. 35,000 KRW)
  variableCostRatio: number; // percentage (e.g. 35%)
  openDays: number; // days per month (e.g. 26)
}

export interface BEPResult {
  breakEvenMonthlyRevenue: number;
  breakEvenDailyRevenue: number;
  requiredDailyTableTurnover: number;
  requiredDailyTotalTables: number;
  isHighRisk: boolean;
  statusMessage: string;
  recommendation: string;
}

export interface DiagnosisReport {
  queryAddress: string;
  matchedDistrict: CheonanDistrict;
  survivalScore: number;
  busMobilityInsight: {
    totalBoardings: number;
    effectiveDiningDwellers: number;
    transitOnlyRatio: number;
    stopCatchmentName: string;
  };
  earlyWarningAlert: {
    level: '안전' | '주의' | '경고' | '심각';
    triggerFactors: string[];
    closureProbability: number;
  };
  bepPrescription: {
    recommendedTurnover: number;
    lunchTarget: number;
    dinnerTarget: number;
    actionablePlan: string[];
  };
}
