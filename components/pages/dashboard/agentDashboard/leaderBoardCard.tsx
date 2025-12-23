import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Trophy } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Rafiq Ahmed", calls: 123, conversions: 98, rate: "89%" },
  { rank: 2, name: "Maya Sultana", calls: 34, conversions: 90, rate: "89%" },
  { rank: 3, name: "Sadia Khan", calls: 65, conversions: 89, rate: "89%" },
  { rank: 4, name: "Tariq Hossain", calls: 321, conversions: 66, rate: "89%" },
  { rank: 5, name: "Nabila Rahman", calls: 23, conversions: 50, rate: "89%" },
];

const LeaderBoardCard = () => {
  return (
    <LiquidGlass className="w-full max-w-[600px]">
      {/* Team Leaderboards */}
      <Card className="rounded-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-normal text-white">
            Team Leaderboards
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    "Rank",
                    "Agent Name",
                    "Calls",
                    "Conversions",
                    "Conv Rate",
                  ].map((label, ind) => (
                    <TableHead
                      first={ind === 0}
                      last={ind === 4}
                      key={label}
                      className="text-left text-xs font-semibold uppercase text-muted-foreground"
                    >
                      {label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((agent, i) => (
                  <TableRow
                    key={i}
                    className={`border-white/10 hover:bg-linear-to-r hover:from-green-500/10 hover:to-transparent`}
                  >
                    <TableCell className="text-center">
                      {agent.rank === 1 ? (
                        <Trophy className="w-5 h-5 text-amber-400 mx-auto" />
                      ) : agent.rank === 2 ? (
                        <Star className="w-5 h-5 text-white/80 mx-auto" />
                      ) : agent.rank === 3 ? (
                        <Star className="w-5 h-5 text-purple-400 mx-auto" />
                      ) : (
                        <span className="text-white/50">{agent.rank}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell className="text-center font-semibold">
                      {agent.calls}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-green-500">
                      {agent.conversions}
                    </TableCell>
                    <TableCell className="text-right text-white/70">
                      {agent.rate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </LiquidGlass>
  );
};

export default LeaderBoardCard;
