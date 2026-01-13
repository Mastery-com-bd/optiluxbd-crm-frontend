import { Phone, Target, TrendingUp, TrendingDown, Minus, Trophy, Gem, Award } from "lucide-react";

const fullRankings = [
    {
        rank: 1,
        name: "Rahim Ahmed",
        initials: "RA",
        team: "Team Beta",
        points: 1850,
        conversion: 71.2,
        calls: 1024,
        sales: 89,
        badges: ["Top Performer", "Call Champion"],
        trend: "up",
    },
    {
        rank: 2,
        name: "Amina Begum",
        initials: "AB",
        team: "Team Alpha",
        points: 1720,
        conversion: 75.4,
        calls: 678,
        sales: 76,
        badges: ["Team Leader", "Conversion King"],
        trend: "neutral",
    },
    {
        rank: 3,
        name: "Karim Hossain",
        initials: "KH",
        team: "Team Alpha",
        points: 1650,
        conversion: 68.5,
        calls: 892,
        sales: 72,
        badges: ["Senior Agent", "Consistent"],
        trend: "up",
    },
    {
        rank: 4,
        name: "Fatima Rahman",
        initials: "FR",
        team: "Team Alpha",
        points: 1420,
        conversion: 62.3,
        calls: 756,
        sales: 58,
        badges: ["Rising Star"],
        trend: "up",
    },
    {
        rank: 5,
        name: "Salam Mia",
        initials: "SM",
        team: "Team Gamma",
        points: 980,
        conversion: 58.9,
        calls: 234,
        sales: 32,
        badges: [],
        trend: "down",
    },
];

const RankingsTable = () => {
    return (
        <div className="effect rounded-4xl p-6 mt-6">
            <h2 className="text-2xl font-bold text-white border-b-2 pb-4">Full Rankings</h2>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className=" text-sm">
                            <th className="px-2 py-4 border-b-2  font-medium">Rank</th>
                            <th className="px-2 py-4 border-b-2  font-medium">Agent</th>
                            <th className="px-2 py-4 border-b-2  font-medium">Team</th>
                            <th className="px-2 py-4 border-b-2  font-medium">Points</th>
                            <th className="px-2 py-4 border-b-2  font-medium">Conversion%</th>
                            <th className="px-2 py-4 border-b-2  font-medium">Calls Made</th>
                            <th className="px-2 py-4 border-b-2  font-medium">Sales Closed</th>
                            <th className="px-2 py-4 border-b-2  font-medium">Badges</th>
                            <th className="px-2 py-4 border-b-2  font-medium text-center">Trend</th>
                        </tr>
                    </thead>

                    <tbody className="text-white">
                        {fullRankings.map((agent) => (
                            <tr key={agent.rank} className="group border-b-2 hover:bg-white/5 transition-colors duration-200">
                                {/* Rank with Trophy icons for Top 3 */}
                                <td className="px-2 py-4 first:rounded-l-2xl">
                                    <div className="flex items-center gap-2 font-bold text-lg">
                                        {agent.rank === 1 && <Trophy className="text-yellow-500 size-5" />}
                                        {agent.rank === 2 && <Trophy className="text-gray-300 size-5" />}
                                        {agent.rank === 3 && <Trophy className="text-orange-500 size-5" />}
                                        <span className={agent.rank <= 3 ? "text-white" : "text-gray-500"}>
                                            #{agent.rank}
                                        </span>
                                    </div>
                                </td>

                                {/* Agent with Avatar Initials */}
                                <td className="px-2 py-4 border-b-2" >
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-amber-700/40 flex items-center justify-center text-amber-200 font-semibold border border-amber-500/30">
                                            {agent.initials}
                                        </div>
                                        <span className="font-medium whitespace-nowrap">{agent.name}</span>
                                    </div>
                                </td>

                                <td className="px-2 py-4 text-gray-300 border-b-2">{agent.team}</td>

                                {/* Points with Gem Icon */}
                                <td className="px-2 py-4 border-b-2">
                                    <div className="flex items-center gap-2 text-blue-400 font-bold">
                                        <Award size={16} />
                                        {agent.points}
                                    </div>
                                </td>

                                {/* Conversion with Indicator */}
                                <td className="px-2 py-4 border-b-2">
                                    <div className="flex items-center gap-2">
                                        {/* Progress bar container */}
                                        <div className="w-[50px] bg-white/10 rounded-full h-2 overflow-hidden">
                                            {/* Dynamic Progress Fill */}
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${agent.conversion > 70 ? 'bg-blue-500' : 'bg-purple-500'
                                                    }`}
                                                style={{ width: `${agent.conversion}%` }}
                                            />
                                        </div>
                                        <span className="font-semibold text-sm">{agent.conversion}%</span>
                                    </div>
                                </td>

                                <td className="px-2 py-4 gap-2 text-gray-300 border-b-2">
                                    <span className="flex gap-2 items-center justify-center"><Phone size={14} className="opacity-60" /> {agent.calls}</span>
                                </td>

                                <td className="px-2 py-4 border-b-2">
                                    <div className="flex items-center gap-2">
                                        <div className="size-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] opacity-60">S</div>
                                        {agent.sales}
                                    </div>
                                </td>

                                {/* Badges */}
                                <td className="px-2 py-4 border-b-2">
                                    <div className="flex flex-wrap gap-2">
                                        {agent.badges.length > 0 ? agent.badges.map((badge, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-300 whitespace-nowrap">
                                                {badge}
                                            </span>
                                        )) : <span className="text-gray-600">-</span>}
                                    </div>
                                </td>

                                {/* Trend Icons with Condition */}
                                <td className="px-2 py-4 last:rounded-r-2xl text-center  border-b-2">
                                    <div className="flex justify-center">
                                        {agent.trend === "up" && <TrendingUp className="text-green-500 size-5" />}
                                        {agent.trend === "down" && <TrendingDown className="text-red-500 size-5" />}
                                        {agent.trend === "neutral" && <Minus className="text-gray-500 size-5" />}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RankingsTable;