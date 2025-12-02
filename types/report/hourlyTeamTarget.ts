export type TeamPerformance = {
  timestampLocal: string;
  bucketEndLocal: string;
  teamTarget: number;
  teamSale: number;
  achievementPercent: number;
  orderCount: number;
};

export type TWorkWindow = {
  start: "string";
  end: "string";
  startLocal: "string";
  endLocal: "string";
};

export type TTeamTargetReport = {
  leaderId: number | null;
  date: string;
  intervalHours: number;
  totalTarget: number;
  totalSale: number;
  totalAssignedTarget: number;
  overallAchievement: number;
  workWindow: TWorkWindow;
  buckets: TeamPerformance[];
};
