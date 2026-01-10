"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ButtonComponent from "@/components/ui/ButtonComponent";

type TOverviewdata = {
  month:
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec";
  first?: string;
  second?: string;
  third?: string;
  fourth?: string;
  fifth?: string;
  sixth?: string;
  seventh?: string;
};

const CustomerOverview = () => {
  const keys = ["Chart", "M0", "M1", "M2", "M3", "M4", "M5", "M6"];

  const data: TOverviewdata[] = [
    {
      month: "Jan",
      first: "100%",
      second: "85%",
      third: "72%",
      fourth: "65%",
      fifth: "58%",
      sixth: "52%",
      seventh: "48%",
    },
    {
      month: "Feb",
      first: "100%",
      second: "88%",
      third: "75%",
      fourth: "68%",
      fifth: "61%",
      sixth: "55%",
    },
    {
      month: "Mar",
      first: "100%",
      second: "90%",
      third: "78%",
      fourth: "70%",
      fifth: "63%",
    },
    {
      month: "Apr",
      first: "100%",
      second: "87%",
      third: "74%",
      fourth: "66%",
    },
    {
      month: "May",
      first: "100%",
      second: "89%",
      third: "76%",
    },
    {
      month: "Jun",
      first: "100%",
      second: "91%",
    },
    {
      month: "Jul",
      first: "100%",
    },
    {
      month: "Aug",
      first: "100%",
      second: "85%",
    },
    {
      month: "Sep",
      first: "100%",
      second: "88%",
      third: "75%",
    },
    {
      month: "Oct",
      first: "100%",
      second: "90%",
      third: "78%",
      fourth: "70%",
    },
    {
      month: "Nov",
      first: "100%",
      second: "87%",
      third: "74%",
      fourth: "66%",
      fifth: "58%",
    },
    {
      month: "Dec",
      first: "100%",
      second: "89%",
      third: "76%",
      fourth: "66%",
      fifth: "58%",
      sixth: "52%",
    },
  ];

  const getCellBg = (value?: string) => {
    if (!value) return "transparent";
    const num = parseInt(value.replace("%", ""), 10);
    if (num >= 85) return "bg-[rgba(0,201,80,0.6)]";
    if (num >= 70) return "bg-[rgba(0,201,80,0.4)]";
    if (num >= 60) return "bg-[rgba(255,255,0,0.4)]";
    if (num >= 50) return "bg-[rgba(255,105,0,0.4)]";
    return "bg-[rgba(251,44,54,0.4)]";
  };

  return (
    <section className="min-h-screen bg-transparent text-foreground space-y-4 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Customer Overview</h1>
          <p className="text-[#A1A1A1] leading-5">
            Operational overview and quick actions.
          </p>
        </div>
        <ButtonComponent
          buttonName="Create New Team"
          icon={Plus}
          varient="dark yellow"
        />
      </div>
      <div className="w-full">
        {/* <ComboOverView /> */}
      </div>
      <LiquidGlass
        shadowIntensity="xxs"
        glowIntensity="none"
        className="rounded-3xl bg-white/5 backdrop-blur-3xl"
      >
        <Card className="bg-transparent rounded-3xl py-8 px-6">
          <CardHeader className="px-0">
            <CardTitle className="space-y-1">
              <h1 className="text-3xl">Customer Retention Analysis</h1>
              <p className="text-sm text-white/40">
                Monthly retention rate heatmap showing customer retention over
                time.
              </p>
            </CardTitle>
          </CardHeader>

          <div className="overflow-x-auto w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  {keys.map((label, ind) => (
                    <TableHead
                      first={ind === 0}
                      last={ind === keys.length - 1}
                      key={label}
                      className="text-left text-xs font-semibold uppercase text-muted-foreground"
                    >
                      {label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item: TOverviewdata, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="border-muted hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center justify-center">
                          <p className="font-medium">{item?.month}</p>
                        </div>
                      </TableCell>
                      {[
                        "first",
                        "second",
                        "third",
                        "fourth",
                        "fifth",
                        "sixth",
                        "seventh",
                      ].map((key) => {
                        const value = item[key as keyof TOverviewdata];
                        return (
                          <TableCell key={key} className="px-4 py-3">
                            <div
                              className={`px-4 py-3 text-sm text-center rounded-3xl ${
                                value
                                  ? getCellBg(value)
                                  : "bg-[rgba(255,255,255,0.05)]"
                              }`}
                            >
                              {value ?? "-"}
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-1">
              <span className="h-4 w-4 bg-[rgba(0,201,80,0.60)]"></span>
              <span className="text-white/50">High (85%+)</span>
            </p>
            <p className="flex items-center gap-1">
              <span className="h-4 w-4 bg-[rgba(0,201,80,0.40)]"></span>
              <span className="text-white/50">Good (70-84%)</span>
            </p>
            <p className="flex items-center gap-1">
              <span className="h-4 w-4 bg-[rgba(240,177,0,0.40)]"></span>
              <span className="text-white/50">Medium (60-69%)</span>
            </p>
            <p className="flex items-center gap-1">
              <span className="h-4 w-4 bg-[rgba(255,105,0,0.40)]"></span>
              <span className="text-white/50">Low (50-59%)</span>
            </p>
            <p className="flex items-center gap-1">
              <span className="h-4 w-4 bg-[rgba(251,4,54,0.40)]"></span>
              <span className="text-white/50">Poor (&lt;50%)</span>
            </p>
          </div>
        </Card>
      </LiquidGlass>
    </section>
  );
};

export default CustomerOverview;
