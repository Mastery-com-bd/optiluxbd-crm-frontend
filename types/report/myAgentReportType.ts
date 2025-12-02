/* eslint-disable @typescript-eslint/no-explicit-any */
import { TeamPerformance, TWorkWindow } from "./hourlyTeamTarget";

export type TAGentHourlyBucket = {
  timestampLocal: string;
  bucketEndLocal: string;
  teams: any;
  totalOrders: number;
  totalAmount: number;
};

export type TPeriod = {
  startLocal: string;
  endLocal: string;
};

export type THourly = {
  reportType: string;
  period: TPeriod;
  intervalHours: number;
  generatedAt: string;
  buckets: TAGentHourlyBucket[];
};

export type THourlyTarget = {
  leaderId: number;
  date: string;
  intervalHours: number;
  workWindow: TWorkWindow;
  totalTarget: number;
  totalSale: number;
  totalAssignedTarget: number;
  overallAchievement: number;
  buckets: TeamPerformance[];
};

export type TMyAgentsReport = {
  leaderId: number;
  generatedAt: string;
  hourly: THourly;
  hourlyTarget: THourlyTarget;
};
